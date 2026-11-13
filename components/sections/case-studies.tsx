import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { ButtonLink } from "@/components/ui/button";

/** Shows the first three case studies (DB, or SAMPLE fallback data). */
export function CaseStudies({ items }: { items: CaseStudy[] }) {
  return (
    <section className="bg-surface border-border border-y py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured work"
          title="Results that speak in rupees, not impressions"
          description="A selection of recent work and the outcomes it delivered."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {items.slice(0, 3).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <TiltCard className="bg-background">
                <Link href={`/portfolio/${c.slug}`} className="flex h-full flex-col p-7">
                  <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                    {c.serviceLabel}
                  </span>
                  <p className="font-display text-gradient mt-6 text-6xl font-bold">{c.metric}</p>
                  <p className="text-muted mt-1 text-sm">{c.metricLabel}</p>
                  <h3 className="mt-6 text-lg leading-snug font-semibold">{c.title}</h3>
                  <p className="text-muted mt-2 text-sm">{c.client}</p>
                  <span className="text-accent mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold">
                    Read case study <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/portfolio" variant="outline" size="lg">
            View all work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
