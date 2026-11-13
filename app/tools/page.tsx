import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowUpRight, Calculator, ScanSearch } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = buildMetadata(pageSeo["/tools"], "/tools");

const tools = [
  {
    href: "/tools/roi-calculator",
    Icon: Calculator,
    title: "Ad Budget & ROI Calculator",
    text: "Enter your budget, CPC, conversion rate and order value to estimate leads, sales and ROAS.",
    cta: "Open calculator",
  },
  {
    href: "/tools/free-audit",
    Icon: ScanSearch,
    title: "Free Website / SEO Audit",
    text: "Tell us about your site and we'll send back a personalised review with quick wins.",
    cta: "Request audit",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title={
          <>
            Free digital marketing tools for{" "}
            <span className="text-gradient">Indian businesses</span>
          </>
        }
        description="Our free digital marketing tools help you plan an ad budget and find quick wins on your website. Use the calculator instantly, or request a free audit and we do the heavy lifting."
      />
      <section className="container-page grid gap-5 pb-24 md:grid-cols-2">
        {tools.map(({ href, Icon, title, text, cta }) => (
          <TiltCard key={href}>
            <Link href={href} className="block h-full p-8">
              <span className="bg-accent/10 text-accent grid size-14 place-items-center rounded-2xl">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
              <p className="text-muted mt-2">{text}</p>
              <span className="text-accent mt-6 inline-flex items-center gap-1 font-semibold">
                {cta} <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </TiltCard>
        ))}
      </section>
    </>
  );
}
