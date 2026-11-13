import type { Metadata } from "next";
import { caseStudySeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Check } from "lucide-react";
import { trendMonths } from "@/data/case-studies";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { PageHero } from "@/components/sections/page-hero";
import { SlotImage } from "@/components/ui/slot-image";
import { caseSlot } from "@/lib/slot-photos";
import { FinalCta } from "@/components/sections/final-cta";
import { BeforeAfterBar, LineTrend } from "@/components/ui/charts";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

type Params = { slug: string };

export const revalidate = 3600;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) return {};
  const clip = (text: string, max: number) =>
    text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
  return buildMetadata(
    {
      primary: caseStudySeo.primary,
      secondary: [`${c.serviceLabel} case study`, ...caseStudySeo.secondary.slice(0, 3)],
      // Admin-created case studies have no hand-written SEO copy, so build a safe fallback.
      title: c.seoTitle ?? clip(`${c.serviceLabel} Case Study: ${c.client} | F99 Solution`, 60),
      description:
        c.seoDescription ??
        clip(`${c.summary || c.title}. See the challenge, strategy and results.`, 158),
    },
    `/portfolio/${c.slug}`,
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = await getCaseStudyBySlug(slug);
  if (!c) notFound();

  const meta = [
    { label: "Client", value: c.client },
    { label: "Industry", value: c.industry },
    { label: "Service", value: c.serviceLabel },
    { label: "Duration", value: c.duration },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: c.title, path: `/portfolio/${c.slug}` },
        ])}
      />
      <PageHero
        eyebrow={`Case study · ${c.serviceLabel}`}
        title={c.title}
        description={c.summary}
        background={
          <SlotImage
            slot={caseSlot(c.slug)}
            icon={Briefcase}
            overlay="background"
            preload
            sizes="100vw"
            className="absolute inset-0 -z-20"
          />
        }
      >
        {c.slug.startsWith("sample-") && (
          <p className="border-border bg-surface text-muted rounded-full border px-4 py-1.5 text-xs">
            Sample case study — fictional client and figures
          </p>
        )}
      </PageHero>

      <div className="container-page max-w-5xl pb-24">
        <Link
          href="/portfolio"
          className="text-muted hover:text-accent mb-8 inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All case studies
        </Link>

        <dl className="border-border bg-surface grid gap-6 rounded-3xl border p-6 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-muted text-xs tracking-wide uppercase">{m.label}</dt>
              <dd className="mt-1 font-semibold">{m.value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              01 · Challenge
            </p>
            <h2 className="mt-2 text-2xl font-bold">The problem</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-muted text-lg leading-relaxed">{c.challenge}</p>
          </Reveal>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              02 · Strategy
            </p>
            <h2 className="mt-2 text-2xl font-bold">What we did</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-4">
              {c.strategy.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="bg-accent/10 text-accent mt-1 grid size-6 shrink-0 place-items-center rounded-full">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-16">
          <Reveal>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              03 · Results
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              <span className="text-gradient">{c.metric}</span>{" "}
              {c.metricLabel.replace(" (sample)", "")}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {c.results.map((r) => (
              <BeforeAfterBar key={r.label} {...r} />
            ))}
          </div>
          <div className="mt-5">
            <LineTrend
              title={`${c.trend.label} over ${c.duration}`}
              labels={trendMonths}
              points={c.trend.points}
              unit={c.trend.unit}
            />
          </div>
        </section>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Want results like these?</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/tools/free-audit" size="lg">
              Get Free Audit
            </ButtonLink>
            <ButtonLink href={`/services/${c.serviceSlug}`} size="lg" variant="outline">
              Explore {c.serviceLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
      <FinalCta />
    </>
  );
}
