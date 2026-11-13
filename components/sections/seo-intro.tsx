import Link from "next/link";
import { Check, Compass, Layers, LineChart, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";

/**
 * Home page SEO section (~450 words). Written for people first: short paragraphs, four scannable
 * cards and a checklist, with descriptive internal links. No statistics, awards or client claims.
 */
const cards = [
  {
    Icon: Users,
    title: "A full team, not a one-person shop",
    text: "Strategists, SEO specialists, performance marketers, designers, writers and developers work on every account. You get the depth of a full agency with one point of contact, so nothing falls between the cracks.",
  },
  {
    Icon: LineChart,
    title: "Built around results you can measure",
    text: "Before we spend a rupee, we agree what a lead or a sale is worth to you and set targets for cost per lead and return on ad spend. Tracking is tested first, and every month you receive a plain-language report that shows what we did, what it earned and what we will change next.",
  },
  {
    Icon: Layers,
    title: "Marketing and technology together",
    text: "Many agencies hand websites, tracking and CRM to someone else. We build them in-house, so your SEO, Meta Ads, Google Ads, landing pages and lead follow-up connect properly and your data stays clean.",
  },
  {
    Icon: Compass,
    title: "Local knowledge, national reach",
    text: "We know how customers in Mumbai search, compare and buy, from Andheri clinics to Thane startups. We also serve businesses in Navi Mumbai, Pune and across India, and we work with international clients remotely.",
  },
];

const checklist = [
  "A free audit and a clear plan before you commit",
  "Ad accounts, analytics and websites kept in your name",
  "Plain-language reporting every month",
  "Month-to-month engagements with clear notice terms",
  "Privacy-aware tracking and data handling",
];

export function SeoIntro() {
  return (
    <section aria-labelledby="why-heading" className="container-page py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
            Why choose {siteConfig.name}
          </p>
          <h2 id="why-heading" className="mt-3 text-3xl leading-tight font-bold md:text-4xl">
            Why {siteConfig.name} is a results-driven digital marketing agency in Mumbai
          </h2>
          <div className="text-muted mt-6 space-y-4 leading-relaxed">
            <p>
              {siteConfig.name} is a digital marketing agency in Mumbai that measures success by
              enquiries and revenue, not impressions. Our team of specialists plans, builds and runs
              your marketing in one place, so your ads, website, content and follow-up all work
              toward the same goal.
            </p>
            <p>
              Our approach is simple. We find what holds your growth back, fix the foundations
              first, such as tracking, website speed and a clear offer, and then scale the channels
              that pay back. When something is not working, we say so and change it.
            </p>
            <p>
              Our services suit clinics, coaching centres, real estate firms, ecommerce brands, B2B
              companies and local service businesses that want steady, trackable growth.
            </p>
            <p>
              We also publish practical guides, such as{" "}
              <Link
                href="/blog/digital-marketing-cost-india"
                className="text-accent underline underline-offset-4"
              >
                how much digital marketing costs in India
              </Link>{" "}
              and{" "}
              <Link
                href="/blog/local-seo-mumbai-guide"
                className="text-accent underline underline-offset-4"
              >
                how local SEO works for Mumbai businesses
              </Link>
              , so you can judge our advice before you speak to us.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div className="border-border bg-surface h-full rounded-3xl border p-6">
                <span className="bg-accent/10 text-accent grid size-11 place-items-center rounded-xl">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg leading-snug font-semibold">{title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="border-border from-accent/10 to-surface mt-14 grid gap-8 rounded-3xl border bg-gradient-to-br p-8 md:p-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed">
              Whether you need{" "}
              <Link href="/services/seo" className="text-accent underline underline-offset-4">
                SEO services in Mumbai
              </Link>
              , a{" "}
              <Link href="/services/meta-ads" className="text-accent underline underline-offset-4">
                Meta Ads agency in India
              </Link>{" "}
              or a{" "}
              <Link
                href="/services/website-design-development"
                className="text-accent underline underline-offset-4"
              >
                website development company in Mumbai
              </Link>
              , we start with a free audit of what you have today. You will see the quick wins,
              which channels deserve budget and what a realistic plan looks like.
            </p>
            <p className="text-muted mt-4 text-sm">
              Explore all our{" "}
              <Link href="/services" className="text-accent underline underline-offset-4">
                digital marketing services
              </Link>
              , compare{" "}
              <Link href="/pricing" className="text-accent underline underline-offset-4">
                packages and pricing
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-accent underline underline-offset-4">
                contact our Mumbai team
              </Link>{" "}
              to talk it through.
            </p>
          </div>
          <div>
            <p className="font-semibold">What working with us looks like</p>
            <ul className="mt-4 space-y-2.5">
              {checklist.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm">
                  <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
