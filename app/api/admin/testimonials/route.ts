import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/admin";
import { testimonialInputSchema } from "@/lib/admin-schemas";
import { Testimonial } from "@/models/Testimonial";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const parsed = testimonialInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  }
  const doc = await Testimonial.create(parsed.data);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
}
