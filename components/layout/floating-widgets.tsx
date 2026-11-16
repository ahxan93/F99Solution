"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/config/site";
import { WhatsappIcon } from "@/components/ui/social-icons";
import { DeferredExitIntent } from "./deferred-exit-intent";

/** Pages where the audit CTA / popup would be redundant (already on a conversion page). */
const CONVERSION_PATHS = ["/tools/free-audit", "/contact"];

/** Scroll distance after which the bar appears on pages that have no `[data-hero-cta]` element. */
const FALLBACK_SCROLL_PX = 480;

/** True once the visitor has scrolled past the hero CTA buttons (or far enough on other pages). */
function usePastHero(pathname: string): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const cta = document.querySelector("[data-hero-cta]");
      setPast(cta ? cta.getBoundingClientRect().bottom < 0 : window.scrollY > FALLBACK_SCROLL_PX);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);
  return past;
}

/** WhatsApp button, mobile sticky CTA and exit-intent popup. Public pages only. */
export function FloatingWidgets() {
  const pathname = usePathname();
  const onConversionPage = CONVERSION_PATHS.includes(pathname);
  const pastHero = usePastHero(pathname);
  const barVisible = !onConversionPage && pastHero;

  return (
    <>
      {/*
        Floating WhatsApp (pre-filled message). On phones it is 52px and rides above the sticky bar
        (bar = 72px + safe area; 16px gap). It stays hidden until the bar appears, so it never sits
        on top of the hero text / buttons. On conversion pages (no bar) it sits in the corner.
      */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        tabIndex={onConversionPage || barVisible ? undefined : -1}
        className={cn(
          "fixed right-4 z-40 grid size-[52px] place-items-center rounded-full bg-[#0f7a40] text-white shadow-lg transition-[transform,opacity] duration-300 hover:scale-105 md:right-6 md:bottom-6 md:size-14 md:translate-y-0 md:opacity-100",
          onConversionPage
            ? "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
            : "bottom-[calc(5.5rem+env(safe-area-inset-bottom))]",
          !onConversionPage && !barVisible && "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <WhatsappIcon className="size-6 md:size-7" />
      </a>

      {/* Sticky "Get Free Audit" bar (mobile only). Slides in once the hero buttons are scrolled past. */}
      {!onConversionPage && (
        <div
          aria-hidden={!barVisible}
          className={cn(
            "glass border-border fixed inset-x-0 bottom-0 z-40 border-t px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden",
            !barVisible && "pointer-events-none translate-y-full",
          )}
        >
          <Link
            href="/tools/free-audit"
            tabIndex={barVisible ? undefined : -1}
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
