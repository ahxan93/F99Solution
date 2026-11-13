import { Check } from "lucide-react";
import { formatINR, pricingPlans } from "@/data/pricing";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section className="bg-surface border-border border-y py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple monthly packages in ₹"
          description="Ad spend is paid directly to the platforms. Need web, app or CRM work? Ask for a custom quote."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div
                className={cn(
                  "bg-background relative flex h-full flex-col rounded-3xl border p-8",
                  p.highlighted ? "border-accent shadow-glow" : "border-border",
                )}
              >
                {p.highlighted && (
                  <span className="bg-accent-solid text-accent-foreground absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-muted mt-1 text-sm">{p.blurb}</p>
                <p className="mt-6">
                  <span className="font-display text-4xl font-bold">
                    {formatINR(p.priceMonthly)}
                  </span>
                  <span className="text-muted text-sm"> / month</span>
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="text-accent mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/pricing"
                  variant={p.highlighted ? "primary" : "outline"}
                  className="mt-auto w-full"
                >
                  View {p.name} details
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-muted mt-6 text-center text-xs">
          Prices shown are placeholders and exclude GST and ad spend.
        </p>
      </div>
    </section>
  );
}
