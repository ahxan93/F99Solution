import type { CSSProperties, ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  /** Delay in seconds. */
  delay?: number;
  className?: string;
}

/**
 * Above-the-fold entrance animation done in pure CSS (a server component, no JS).
 * Unlike a JS-driven reveal, the content is painted immediately and is not held
 * back until hydration, which keeps Largest Contentful Paint fast on phones.
 */
export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <div
      className={`animate-fade-up ${className ?? ""}`}
      style={{ "--delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
