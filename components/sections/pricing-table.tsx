"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { formatINR, pricingPlans, quarterlyDiscount } from "@/data/pricing";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "quarterly";

export function PricingTable() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const quarterly = billing === "quarterly";
  const pct = Math.round(quarterlyDiscount * 100);

  return (
    <div>
      <div
        role="group"
        aria-label="Billing period"
        className="border-border bg-surface mx-auto flex w-fit rounded-full border p-1"
      >
        {(["monthly", "quarterly"] as const).map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={billing === b}
            onClick={() => setBilling(b)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors",
              billing === b
                ? "bg-accent-solid text-accent-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {b}
            {b === "quarterly" && <span className="ml-1.5 text-xs opacity-90">Save {pct}%</span>}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((p, i) => {
          const perMonth = quarterly
            ? Math.round(p.priceMonthly * (1 - quarterlyDiscount))
            : p.priceMonthly;
          return (
            <Reveal key={p.id} delay={i * 0.08}>
              <div
                className={cn(
                  "bg-surface relative flex h-full flex-col rounded-3xl border p-8",
                  p.highlighted ? "border-accent shadow-glow" : "border-border",
                )}
              >
                {p.highlighted && (
                  <span className="bg-accent-solid text-accent-foreground absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-muted mt-1 text-sm">{p.blurb}</p>
                <p className="mt-6">
                  <span className="font-display text-4xl font-bold">{formatINR(perMonth)}</span>
                  <span className="text-muted text-sm"> / month</span>
                </p>
                <p className="text-muted mt-1 h-5 text-xs">
                  {quarterly
                    ? `Billed ${formatINR(perMonth * 3)} every 3 months`
                    : "Billed monthly"}
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`/contact?plan=${p.id}`}
                  variant={p.highlighted ? "primary" : "outline"}
                  className="mt-8 w-full"
                >
                  Get started with {p.name}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="text-muted mt-6 text-center text-xs">
        Placeholder prices in ₹, exclusive of GST and ad spend (paid directly to Meta/Google).
      </p>
    </div>
  );
}
