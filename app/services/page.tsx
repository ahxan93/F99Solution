import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { serviceCategories, services } from "@/data/services";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { AreasServed } from "@/components/sections/areas-served";
import { TrustSignals } from "@/components/sections/trust-signals";
import { ServiceCard } from "@/components/sections/service-card";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata(pageSeo["/services"], "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Digital marketing services in <span className="text-gradient">Mumbai</span> and across
            India
          </>
        }
        description="Our digital marketing services in Mumbai cover SEO, paid ads, social media, web development and CRM automation. Choose one service or combine them into a complete growth system."
      >
        <ButtonLink href="/tools/free-audit" size="lg">
          Get Free Audit
        </ButtonLink>
        <ButtonLink href="/pricing" size="lg" variant="outline">
          See Pricing
        </ButtonLink>
      </PageHero>

      <div className="container-page space-y-20 pb-24">
        {serviceCategories.map((cat) => (
          <section key={cat} aria-labelledby={`cat-${cat}`}>
            <h2 id={`cat-${cat}`} className="mb-8 text-2xl font-bold md:text-3xl">
              {cat}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === cat)
                .map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                    <ServiceCard service={s} cta="View details" />
                  </Reveal>
                ))}
            </div>
          </section>
        ))}
      </div>
      <div className="container-page space-y-4 pb-10">
        <AreasServed />
      </div>
      <div className="container-page">
        <TrustSignals />
      </div>
      <FinalCta />
    </>
  );
}
