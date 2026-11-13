"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  readonly q: string;
  readonly a: string;
}

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="divide-border border-border bg-surface divide-y overflow-hidden rounded-3xl border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                id={`${uid}-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="hover:text-accent flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold transition-colors md:text-lg"
              >
                {item.q}
                <ChevronDown
                  className={cn("size-5 shrink-0 transition-transform", isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`${uid}-panel-${i}`}
              role="region"
              aria-labelledby={`${uid}-btn-${i}`}
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-muted px-6 pb-5 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
