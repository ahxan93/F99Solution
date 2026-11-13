import { after, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { leadSchema } from "@/lib/validators";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendAdminNotification, sendAutoReply, type LeadMailData } from "@/lib/mail";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
/** 5 submissions per IP per 10 minutes. */
const LIMIT = { limit: 5, windowSeconds: 600 };

const json = (body: Record<string, unknown>, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(req: Request) {
  // 1. Parse (with a size cap so oversized payloads are rejected early)
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // 2. Honeypot: bots fill the hidden field. Pretend success, save nothing.
  if (
    typeof body === "object" &&
    body !== null &&
    "hp" in body &&
    typeof body.hp === "string" &&
    body.hp.length > 0
  ) {
    return json({ ok: true });
  }

  // 3. Validate with the same Zod schemas the client uses
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // Only field-level messages are user-friendly; schema-shape errors get a generic one.
    const issue = parsed.error.issues[0];
    const friendly =
      issue && issue.path.length > 0 && issue.path[0] !== "source"
        ? issue.message
        : "Please check the form and try again.";
    return json({ error: friendly }, 400);
  }
  const { hp, ...data } = parsed.data;
  void hp;

  try {
    await connectDB();

    // 4. Rate limit per IP
    const ip = getClientIp(req.headers);
    const rl = await rateLimit({ key: `lead:${ip}`, ...LIMIT });
    if (!rl.allowed) {
      return json({ error: "Too many requests. Please try again later." }, 429, {
        "Retry-After": String(rl.retryAfterSeconds),
      });
    }

    // 5. Save
    const lead = await Lead.create({ ...data, ip });

    // 6. Emails run after the response is sent so the visitor isn't kept waiting.
    const mailData: LeadMailData = { ...data };
    after(async () => {
      const results = await Promise.allSettled([
        sendAdminNotification(mailData),
        sendAutoReply(mailData),
      ]);
      results.forEach((r) => {
        if (r.status === "rejected") console.error("[mail] failed:", r.reason);
      });
    });

    return json({ ok: true, id: String(lead._id) }, 201);
  } catch (err) {
    console.error("[api/leads] error:", err);
    return json(
      { error: "Something went wrong on our side. Please try again or WhatsApp us." },
      500,
    );
  }
}

// Other methods are not allowed.
export function GET() {
  return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
}
