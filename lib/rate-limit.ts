import "server-only";
import { RateLimit } from "@/models/RateLimit";

interface Options {
  /** Unique bucket, e.g. `lead:${ip}`. */
  key: string;
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Fixed-window rate limiter stored in MongoDB, so it works across serverless
 * instances (an in-memory counter would reset on every cold start).
 * Caller must have called connectDB() first.
 */
export async function rateLimit({ key, limit, windowSeconds }: Options): Promise<RateLimitResult> {
  const now = Date.now();
  const expiresAt = new Date(now + windowSeconds * 1000);

  // Atomic: create the window if missing, otherwise increment.
  const doc = await RateLimit.findOneAndUpdate(
    { key },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
    { upsert: true, new: true },
  );

  const retryAfterSeconds = Math.max(1, Math.ceil((doc.expiresAt.getTime() - now) / 1000));
  return {
    allowed: doc.count <= limit,
    remaining: Math.max(0, limit - doc.count),
    retryAfterSeconds,
  };
}

/** Best-effort client IP from proxy headers. */
export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
