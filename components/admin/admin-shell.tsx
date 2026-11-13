import type { ReactNode } from "react";
import Link from "next/link";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Briefcase,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { logoutAction } from "@/app/admin/login/actions";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", Icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { href: "/admin/case-studies", label: "Case studies", Icon: Briefcase },
];

export function AdminShell({ email, children }: { email?: string | null; children: ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-border bg-surface border-b lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
        <div className="flex flex-col gap-4 p-4 lg:h-full lg:p-5">
          <div className="flex items-center justify-between lg:block">
            <p className="font-display font-semibold">{siteConfig.name}</p>
            <p className="text-muted hidden truncate text-xs lg:block">{email}</p>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>
          <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
            {links.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="hover:bg-surface-2 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap"
              >
                <Icon className="text-accent size-4" aria-hidden="true" /> {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto hidden space-y-2 lg:block">
            <ThemeToggle />
            <Link
              href="/"
              target="_blank"
              className="text-muted hover:text-accent flex items-center gap-2 px-3 py-2 text-sm"
            >
              <ExternalLink className="size-4" aria-hidden="true" /> View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-muted hover:text-danger flex w-full items-center gap-2 px-3 py-2 text-sm"
              >
                <LogOut className="size-4" aria-hidden="true" /> Sign out
              </button>
            </form>
          </div>
          <form action={logoutAction} className="lg:hidden">
            <button type="submit" className="text-muted text-sm underline">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 p-5 md:p-8">{children}</main>
    </div>
  );
}
