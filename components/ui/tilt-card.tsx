"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/**
 * 3D tilt-on-hover card with a moving glare. Pointer handlers write CSS values straight to the
 * element (no animation library, no React re-render per move); a CSS transition smooths it.
 * Static for reduced motion / touch.
 */
export function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (reduce || e.pointerType === "touch" || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - py) * 2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, var(--accent-glow), transparent 60%)`;
    }
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(
          "group border-border bg-surface hover:border-accent/60 relative h-full overflow-hidden rounded-3xl border transition-[transform,border-color] duration-200 ease-out",
          className,
        )}
      >
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
