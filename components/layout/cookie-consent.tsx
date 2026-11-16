"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { setConsent, useConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const consent = useConsent();
  if (consent !== "unset") return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      // Phones: compact bottom sheet (above the sticky CTA bar, z-[45]) so it never covers the
      // headline. Desktop: card under the navbar's right edge. Stays below the header (z-50) and the
      // full-screen mobile menu (z-[100]) so neither is ever blocked.
      className="border-border bg-surface fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[45] rounded-2xl border p-3 shadow-2xl lg:inset-x-auto lg:top-[5.75rem] lg:right-4 lg:bottom-auto lg:w-[22rem] lg:p-4"
    >
      <div className="flex gap-3">
        <Cookie className="text-accent mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div className="text-sm">
          <p className="hidden font-semibold lg:block">Cookies</p>
          <p className="text-muted text-xs leading-snug lg:mt-0.5">
            Optional analytics &amp; ad cookies.{" "}
            <Link href="/privacy-policy" className="text-accent underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          <div className="mt-2 flex flex-wrap gap-2 lg:mt-3">
            <Button size="sm" onClick={() => setConsent("granted")}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => setConsent("denied")}>
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
