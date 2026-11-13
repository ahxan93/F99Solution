"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import { SlotFrame, type SlotPhoto } from "@/components/ui/slot-frame";
import { TiltCard } from "@/components/ui/tilt-card";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function PortfolioGrid({
  items,
  photos,
}: {
  items: CaseStudy[];
  /** Cover photo per case study slug (null = branded illustration). */
  photos: Record<string, SlotPhoto | null>;
}) {
  const [active, setActive] = useState("all");

  const filters = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((c) => map.set(c.serviceSlug, c.serviceLabel));
    return [...map.entries()].map(([slug, label]) => ({ slug, label }));
  }, [items]);

  const visible = active === "all" ? items : items.filter((c) => c.serviceSlug === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by service"
        className="flex flex-wrap justify-center gap-2"
      >
        {[{ slug: "all", label: "All" }, ...filters].map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={active === f.slug}
            onClick={() => setActive(f.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === f.slug
                ? "border-accent bg-accent-solid text-accent-foreground"
                : "border-border text-muted hover:border-accent hover:text-accent",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} case studies shown
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <TiltCard key={c.slug}>
            <Link href={`/portfolio/${c.slug}`} className="flex h-full flex-col">
              <SlotFrame
                asset={photos[c.slug]}
                icon={Briefcase}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
                className="aspect-[3/2]"
              />
              <div className="flex flex-1 flex-col p-7">
                <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                  {c.serviceLabel}
                </span>
                <p className="font-display text-gradient mt-5 text-5xl font-bold">{c.metric}</p>
                <p className="text-muted mt-1 text-sm">{c.metricLabel}</p>
                <h2 className="mt-5 text-lg leading-snug font-semibold">{c.title}</h2>
                <p className="text-muted mt-2 text-sm">{c.client}</p>
                <span className="text-accent mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold">
                  Read case study <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
