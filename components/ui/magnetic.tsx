"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element follows the cursor (0 to 1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps a child so it gently follows the cursor on hover. Plain pointer handlers set a CSS
 * transform (no animation library); a CSS transition gives the springy settle. Disabled for
 * reduced motion and touch.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (reduce || e.pointerType === "touch" || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`${className ?? "inline-block"} transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
    >
      {children}
    </div>
  );
}
