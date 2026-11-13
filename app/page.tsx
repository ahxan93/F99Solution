import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyUs } from "@/components/sections/why-us";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { getCaseStudies, getTestimonials } from "@/lib/content";
import { Faq } from "@/components/sections/faq";
import { SeoIntro } from "@/components/sections/seo-intro";
import { TrustSignals } from "@/components/sections/trust-signals";
import { AreasServed } from "@/components/sections/areas-served";
import { JsonLd } from "@/components/seo/json-ld";
import { homeFaqs } from "@/data/home";
import { faqSchema } from "@/lib/seo";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = buildMetadata(pageSeo["/"], "/");

/** Re-generate at most hourly; admin edits also trigger revalidation. */
export const revalidate = 3600;

export default async function HomePage() {
  const [caseStudies, testimonials] = await Promise.all([getCaseStudies(), getTestimonials()]);
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <TrustedBy />
      <SeoIntro />
      <ServicesOverview />
      <WhyUs />
      <Stats />
      <Process />
      <div className="container-page">
        <TrustSignals />
      </div>
      <CaseStudies items={caseStudies} />
      <Testimonials testimonials={testimonials} />
      <PricingPreview />
      <div className="container-page pt-4 pb-4">
        <AreasServed />
      </div>
      <Faq />
      <FinalCta />
    </>
  );
}
