"use client";

import { useEffect, useRef } from "react";
import { useInViewOnce } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/** Counts up from 0 once visible. Shows the final value immediately for reduced motion. */
export function Counter({ value, prefix = "", suffix = "", decimals }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref, "0px 0px -40px 0px");
  const reduce = useReducedMotion();
  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      // No animation: jump straight to the final value (after hydration, so server and
      // client HTML match).
      el.textContent = `${prefix}${value.toFixed(dp)}${suffix}`;
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) * (1 - t); // ease-out
      el.textContent = `${prefix}${(value * eased).toFixed(dp)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, prefix, suffix, dp]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      {`${prefix}${(0).toFixed(dp)}${suffix}`}
    </span>
  );
}
