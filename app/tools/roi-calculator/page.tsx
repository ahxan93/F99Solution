import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { RoiCalculator } from "@/components/sections/roi-calculator";

export const metadata: Metadata = buildMetadata(
  pageSeo["/tools/roi-calculator"],
  "/tools/roi-calculator",
);

export default function RoiCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool"
        title="Free ad budget calculator for India: estimate leads, sales and ROAS"
        description="Use this ad budget calculator for India to estimate the leads, sales and return on ad spend your Meta Ads or Google Ads budget could generate, from your own numbers."
      />
      <section className="container-page pb-24">
        <RoiCalculator />
      </section>
    </>
  );
}
