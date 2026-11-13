import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = buildMetadata(pageSeo["/tools/free-audit"], "/tools/free-audit");

const included = [
  "Website speed, mobile and usability review",
  "On-page and technical SEO health check",
  "Google Business Profile and local visibility check",
  "Ad account and conversion-tracking review",
  "A short list of prioritised quick wins",
];

export default function FreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free audit"
        title={
          <>
            Free SEO audit in Mumbai for your <span className="text-gradient">website and ads</span>
          </>
        }
        description="Request a free SEO audit from our Mumbai team. Share a few details and we send a personalised review of your website, search visibility, ads and tracking, with no obligation."
      />
      <section className="container-page grid gap-10 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-bold">What you&apos;ll get</h2>
          <ul className="mt-6 space-y-4">
            {included.map((i) => (
              <li key={i} className="flex gap-3">
                <span className="bg-accent/10 text-accent mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {i}
              </li>
            ))}
          </ul>
          <p className="text-muted mt-8 text-sm">
            Your audit is prepared personally and delivered by email within 2 working days.
          </p>
        </div>
        <AuditForm />
      </section>
    </>
  );
}
