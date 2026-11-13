"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { FloatingWidgets } from "./floating-widgets";

interface SiteShellProps {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

/** Wraps public pages with the navbar/footer; admin routes render bare. */
export function SiteShell({ navbar, footer, children }: SiteShellProps) {
  const isAdmin = usePathname().startsWith("/admin");
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <a
        href="#main"
        className="bg-accent-solid text-accent-foreground sr-only z-[60] rounded-full px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      {navbar}
      <main id="main" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      {footer}
      <FloatingWidgets />
    </>
  );
}
