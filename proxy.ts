import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistic redirect only: bounce visitors with no session cookie away from
 * /admin. Real authorization happens in requireAdmin()/requireAdminApi(),
 * which verify the signed session on every page and API call.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const hasSession =
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token");

  if (!hasSession) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
