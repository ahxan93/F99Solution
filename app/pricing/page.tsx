import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { Code2, Workflow, Layout } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PricingTable } from "@/components/sections/pricing-table";
import { FinalCta } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata(pageSeo["/pricing"], "/pricing");

const pricingFaqs = [
  {
    q: "Is ad spend included in the package price?",
    a: "No. Ad budgets are paid directly to Meta or Google from your own account. Packages cover strategy, creative, management and reporting.",
  },
  {
    q: "Is there a minimum contract?",
    a: "Monthly plans are month-to-month with 30 days' notice. Quarterly plans are billed every three months at a discount.",
  },
  {
    q: "Are prices inclusive of GST?",
    a: "Prices are exclusive of GST, which is added to the invoice as applicable.",
  },
  {
    q: "Can I customise a package?",
    a: "Yes. Tell us your goals and budget and we will tailor the scope, or mix services from different plans.",
  },
];

const custom = [
  {
    Icon: Layout,
    title: "Websites & landing pages",
    text: "Scoped by pages, features and integrations.",
  },
  {
    Icon: Code2,
    title: "Full-stack web apps",
    text: "Milestone-based pricing after a scoping call.",
  },
  {
    Icon: Workflow,
    title: "CRM & automation",
    text: "Priced by pipelines, integrations and training.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(pricingFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Digital marketing packages in India with{" "}
            <span className="text-gradient">clear, no lock-in pricing</span>
          </>
        }
        description="Our digital marketing packages in India are priced monthly in INR for social media and ads. Switch to quarterly billing and save, or ask for a custom quote."
      />

      <section className="container-page pb-24">
        <PricingTable />
        <p className="text-muted mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed">
          Not sure how much to budget? Read our guide to{" "}
          <Link
            href="/blog/digital-marketing-cost-india"
            className="text-accent underline underline-offset-4"
          >
            digital marketing cost in India
          </Link>
          , try the{" "}
          <Link href="/tools/roi-calculator" className="text-accent underline underline-offset-4">
            free ad budget calculator
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-accent underline underline-offset-4">
            talk to our Mumbai team about a custom plan
          </Link>
          .
        </p>
      </section>

      <section className="bg-surface border-border border-y py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Custom projects"
            title="Web, app and CRM work is quoted to fit"
            description="Every build is different, so we price it after understanding your requirements."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {custom.map(({ Icon, title, text }) => (
              <div key={title} className="border-border bg-background rounded-3xl border p-7">
                <span className="bg-accent/10 text-accent grid size-11 place-items-center rounded-xl">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="text-muted mt-1 text-sm">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/contact?plan=custom" size="lg">
              Request a custom quote
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <SectionHeading eyebrow="FAQ" title="Pricing questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={pricingFaqs} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
