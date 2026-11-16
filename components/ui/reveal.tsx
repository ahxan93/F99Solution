"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
}

/**
 * Fades + slides content in once it scrolls into view. A tiny IntersectionObserver + CSS
 * transition (no animation library), so below-the-fold sections add almost no JavaScript.
 * The hidden state is applied by CSS only when JS and motion are available, so content is never
 * stuck invisible (see `.reveal` in globals.css). No-op for reduced motion.
 */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // "Armed" = JS is alive and will reveal this element. Un-armed elements are revealed by a CSS
    // failsafe after a few seconds (globals.css), so a failed hydration never leaves them invisible.
    el.dataset.armed = "";
    if (!("IntersectionObserver" in window)) {
      el.dataset.shown = "";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = as;
  const style = { "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties;
  return (
    <Comp ref={ref as never} className={`reveal${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </Comp>
  );
}
