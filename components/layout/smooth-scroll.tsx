"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Lenis smooth scrolling, loaded lazily on the first wheel / key press so it never touches page load.
 * Skipped for reduced motion and on touch devices (native momentum scrolling is better there).
 * (GSAP / ScrollTrigger were removed: nothing on the site used them besides this ticker.)
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  // The admin panel has nested scroll areas, so it keeps native scrolling.
  const isAdmin = usePathname().startsWith("/admin");

  useEffect(() => {
    if (
      isAdmin ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      let raf = 0;
      const tick = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };

    // Lenis only matters once the visitor actually scrolls, so load it on the first wheel / key press
    // instead of at idle (keeps it out of the load window entirely).
    const events = ["wheel", "keydown"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      void init();
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, start));
      cleanup?.();
    };
  }, [isAdmin]);

  return <>{children}</>;
}
