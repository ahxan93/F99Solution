"use client";

import { useEffect, useState, type RefObject } from "react";

/** True once the element has entered the viewport (fires once). Tiny IntersectionObserver wrapper. */
export function useInViewOnce(ref: RefObject<Element | null>, rootMargin = "0px"): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setSeen(true)); // very old browser: just show the content
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}
