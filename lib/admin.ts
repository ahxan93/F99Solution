import "server-only";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";

/**
 * Data-access-layer guard for admin PAGES. Call at the top of every admin
 * page (not only the layout — layouts don't re-render on client navigation).
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  await connectDB();
  return session;
}

/** Guard for admin API route handlers. Returns a 401 response when not signed in. */
export async function requireAdminApi(): Promise<
  { ok: true } | { ok: false; response: NextResponse }
> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  await connectDB();
  return { ok: true };
}

/** Escape user text for use inside a RegExp. */
export const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
