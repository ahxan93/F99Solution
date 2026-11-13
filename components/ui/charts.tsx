"use client";

import { useId, useRef } from "react";
import { useInViewOnce } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Compact, dependency-free SVG charts that follow the theme tokens. */

interface BeforeAfterProps {
  label: string;
  before: number;
  after: number;
  unit?: string;
  lowerIsBetter?: boolean;
}

const fmt = (n: number, unit?: string) => {
  const v = Number.isInteger(n) ? n.toLocaleString("en-IN") : n.toFixed(1);
  if (unit === "₹") return `₹${v}`;
  return unit ? `${v}${unit}` : v;
};

/** Horizontal before/after bars for one metric. */
export function BeforeAfterBar({ label, before, after, unit, lowerIsBetter }: BeforeAfterProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInViewOnce(ref);
  const max = Math.max(before, after, 1);
  const improved = lowerIsBetter ? after < before : after > before;
  const change = before === 0 ? null : Math.round(((after - before) / before) * 100);

  const bar = (value: number, tone: string, name: string) => (
    <div className="flex items-center gap-3">
      <span className="text-muted w-14 shrink-0 text-xs">{name}</span>
      <div className="bg-surface-2 h-3 flex-1 overflow-hidden rounded-full">
        <div
          className={`h-full rounded-full ${tone} transition-[width] duration-[900ms] ease-out`}
          style={{ width: reduce || seen ? `${(value / max) * 100}%` : "0%" }}
        />
      </div>
      <span className="w-20 shrink-0 text-right text-sm font-semibold">{fmt(value, unit)}</span>
    </div>
  );

  return (
    <div ref={ref} className="border-border bg-surface rounded-2xl border p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="font-semibold">{label}</h3>
        {change !== null && (
          <span className={`text-sm font-semibold ${improved ? "text-success" : "text-danger"}`}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
      <div className="space-y-2.5">
        {bar(before, "bg-muted/50", "Before")}
        {bar(after, "bg-accent", "After")}
      </div>
    </div>
  );
}

interface LineTrendProps {
  title: string;
  labels: string[];
  points: number[];
  unit?: string;
}

/** Simple area/line chart with value labels. */
export function LineTrend({ title, labels, points, unit }: LineTrendProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const seen = useInViewOnce(ref);
  const W = 600;
  const H = 220;
  const pad = { l: 16, r: 16, t: 28, b: 32 };
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const x = (i: number) => pad.l + (i / (points.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / span) * (H - pad.t - pad.b);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p)}`).join(" ");
  const area = `${line} L${x(points.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`;

  return (
    <figure ref={ref} className="border-border bg-surface rounded-2xl border p-6">
      <figcaption className="mb-2 font-semibold">{title}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${title}: ${points.map((p, i) => `${labels[i]} ${fmt(p, unit)}`).join(", ")}`}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={pad.l}
            x2={W - pad.r}
            y1={pad.t + t * (H - pad.t - pad.b)}
            y2={pad.t + t * (H - pad.t - pad.b)}
            stroke="var(--border)"
            strokeDasharray="4 4"
          />
        ))}
        <path d={area} fill={`url(#${id}-fill)`} />
        <path
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={reduce || seen ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={x(i)}
              cy={y(p)}
              r="4.5"
              fill="var(--background)"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <text
              x={x(i)}
              y={y(p) - 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--foreground)"
            >
              {fmt(p, unit)}
            </text>
            <text x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--muted)">
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
