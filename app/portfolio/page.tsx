import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { getCaseStudies } from "@/lib/content";
import { PageHero } from "@/components/sections/page-hero";
import { getSlotPhoto, caseSlot } from "@/lib/slot-photos";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = buildMetadata(pageSeo["/portfolio"], "/portfolio");

export const revalidate = 3600;

export default async function PortfolioPage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Digital marketing case studies from <span className="text-gradient">India</span>
          </>
        }
        description="Browse digital marketing case studies from India by service, from SEO to Meta Ads and CRM. Each one shows the challenge, strategy and results. Sample entries are labelled."
      />
      <section className="container-page pb-24">
        <PortfolioGrid
          items={caseStudies}
          photos={Object.fromEntries(
            caseStudies.map((c) => [c.slug, getSlotPhoto(caseSlot(c.slug))]),
          )}
        />
      </section>
      <FinalCta />
    </>
  );
}
