"use client";

import { useEffect, useState } from "react";

/**
 * Becomes true `delayMs` after the window `load` event, once the main thread is idle. Used to keep
 * non-critical overlays (cookie banner, exit-intent popup) out of the load window entirely.
 */
export function useIdle(delayMs = 0): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const fire = () => !cancelled && setIdle(true);

    const afterLoad = () => {
      const t = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") {
          const id = window.requestIdleCallback(fire, { timeout: 2000 });
          cleanups.push(() => window.cancelIdleCallback(id));
        } else fire();
      }, delayMs);
      cleanups.push(() => window.clearTimeout(t));
    };

    if (document.readyState === "complete") afterLoad();
    else {
      window.addEventListener("load", afterLoad, { once: true });
      cleanups.push(() => window.removeEventListener("load", afterLoad));
    }
    return () => {
      cancelled = true;
      cleanups.forEach((c) => c());
    };
  }, [delayMs]);

  return idle;
}
