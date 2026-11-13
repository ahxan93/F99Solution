import type { Metadata } from "next";
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

// Admin pages are always rendered per-request (never cached or prerendered).
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  // Each page ALSO calls requireAdmin(); layouts alone don't re-run on client navigation.
  const session = await requireAdmin();
  return <AdminShell email={session.user.email}>{children}</AdminShell>;
}
