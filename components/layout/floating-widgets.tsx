"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/config/site";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { DeferredExitIntent } from "./deferred-exit-intent";

/** Pages where the audit CTA / popup would be redundant (already on a conversion page). */
const CONVERSION_PATHS = ["/tools/free-audit", "/contact"];

/** WhatsApp button, mobile sticky CTA and exit-intent popup. Public pages only. */
export function FloatingWidgets() {
  const pathname = usePathname();
  const onConversionPage = CONVERSION_PATHS.includes(pathname);

  return (
    <>
      {/* Floating WhatsApp (pre-filled message). Sits above the sticky CTA on mobile. */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-4 bottom-20 z-40 grid size-14 place-items-center rounded-full bg-[#0f7a40] text-white shadow-lg transition-transform hover:scale-105 md:right-6 md:bottom-6"
      >
        <WhatsappIcon className="size-7" />
      </a>

      {/* Sticky "Get Free Audit" bar — mobile only */}
      {!onConversionPage && (
        <div className="glass border-border fixed inset-x-0 bottom-0 z-40 border-t p-3 md:hidden">
          <Link
            href="/tools/free-audit"
            className="bg-accent-solid text-accent-foreground shadow-glow flex h-12 items-center justify-center rounded-full text-sm font-semibold"
          >
            Get Free Audit
          </Link>
        </div>
      )}

      {!onConversionPage && <DeferredExitIntent />}
    </>
  );
}
