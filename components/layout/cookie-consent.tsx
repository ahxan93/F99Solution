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
      // Pinned just under the navbar (never at the bottom) so it cannot cover the hero buttons,
      // which always sit lower on the page than the badge / headline. z-40 keeps it BELOW the header
      // layer (z-50) so the open mobile menu and the services mega-menu always stay tappable.
      className="border-border bg-surface fixed inset-x-3 top-[4.75rem] z-40 rounded-2xl border p-3 shadow-2xl lg:inset-x-auto lg:top-[5.75rem] lg:right-4 lg:w-[22rem] lg:p-4"
    >
      <div className="flex gap-3">
        <Cookie className="text-accent mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div className="text-sm">
          <p className="font-semibold">Cookies</p>
          <p className="text-muted mt-0.5 text-xs leading-snug">
            Optional analytics &amp; ad cookies.{" "}
            <Link href="/privacy-policy" className="text-accent underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
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
