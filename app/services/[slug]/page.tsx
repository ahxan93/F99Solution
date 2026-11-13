import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, X } from "lucide-react";
import { getService, services } from "@/data/services";
import { serviceSeo } from "@/data/seo-keywords";
import { getPost, toMeta } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SlotImage } from "@/components/ui/slot-image";
import { FinalCta } from "@/components/sections/final-cta";
import { TrustSignals } from "@/components/sections/trust-signals";
import { AreasServed } from "@/components/sections/areas-served";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";

type Params = { slug: string };

/** Services where a budget calculator is the natural next step. */
const AD_SERVICES = new Set([
  "meta-ads",
  "google-ads",
  "landing-pages-funnels",
  "ecommerce-marketing",
]);

const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = serviceSeo[slug];
  if (!seo || !getService(slug)) return {};
  return buildMetadata(seo, `/services/${slug}`);
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold md:text-3xl">
      {children}
    </h2>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => services.find((s) => s.slug === r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const post = getPost(service.blog);
  const postMeta = post ? toMeta(post) : null;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.category}
        title={service.h1}
        description={service.intro}
        background={
          <SlotImage
            slot={`${service.slug}-hero`}
            icon={service.icon}
            overlay="background"
            preload
            sizes="100vw"
            className="absolute inset-0 -z-20"
          />
        }
      >
        <ButtonLink href="/tools/free-audit" size="lg">
          Get a free audit <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="outline">
          Book a call
        </ButtonLink>
      </PageHero>

      <div className="container-page max-w-5xl space-y-20 pb-20">
        <nav aria-label="Breadcrumb" className="text-muted -mt-6 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="hover:text-accent">
                Digital marketing services in Mumbai
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{service.title}</li>
          </ol>
        </nav>

        {/* What it is */}
        <section aria-labelledby="what-heading" className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              The basics
            </p>
            <H2 id="what-heading">What is {service.topic}?</H2>
          </div>
          <div className="text-muted space-y-4 text-lg leading-relaxed">
            {service.what.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section aria-labelledby="who-heading">
          <H2 id="who-heading">Who needs {service.topic}?</H2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {service.whoFor.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 2) * 0.05}
                className="border-border bg-surface flex gap-3 rounded-2xl border p-5"
              >
                <Check className="text-accent mt-1 size-4 shrink-0" aria-hidden="true" />
                <span className="text-sm leading-relaxed md:text-base">{item}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* What's included */}
        <section aria-labelledby="included-heading">
          <H2 id="included-heading">What&apos;s included in our {service.title} service</H2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="bg-surface-2 flex gap-3 rounded-2xl p-4 text-sm">
                  <ServiceIcon name={service.icon} className="text-accent size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <SlotImage
              slot={`${service.slug}-support`}
              icon={service.icon}
              sizes="(min-width: 1024px) 380px, 100vw"
              className="border-border aspect-[3/2] rounded-3xl border"
            />
          </div>
        </section>

        {/* Approach + process */}
        <section aria-labelledby="process-heading">
          <H2 id="process-heading">How we approach {service.topic}</H2>
          <p className="text-muted mt-4 max-w-3xl text-lg leading-relaxed">{service.approach}</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.06}
                className="border-border bg-surface rounded-2xl border p-5"
              >
                <span className="font-display text-accent text-2xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="text-muted mt-1.5 text-sm leading-relaxed">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Mistakes + measure */}
        <section
          className="grid gap-10 lg:grid-cols-2"
          aria-label="Mistakes we fix and what we measure"
        >
          <div>
            <H2>Common mistakes we fix</H2>
            <ul className="mt-6 space-y-3">
              {service.mistakes.map((m) => (
                <li key={m} className="flex gap-3">
                  <X className="text-danger mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span className="text-muted leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>What we measure</H2>
            <ul className="mt-6 space-y-3">
              {service.measure.map((m) => (
                <li key={m} className="flex gap-3">
                  <Check className="text-success mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span className="text-muted leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Deliverables / tools / prepare */}
        <section
          className="grid gap-10 lg:grid-cols-3"
          aria-label="Deliverables, tools and requirements"
        >
          <div>
            <H2>Deliverables</H2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <Check className="text-accent mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span className="text-muted leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>Tools we use</H2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {service.tools.map((t) => (
                <li
                  key={t}
                  className="border-border bg-surface rounded-full border px-4 py-2 text-sm font-medium"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>What we need from you</H2>
            <ul className="mt-6 space-y-3">
              {service.prepare.map((d) => (
                <li key={d} className="flex gap-3">
                  <Check className="text-accent mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span className="text-muted leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cost */}
        <section
          aria-labelledby="cost-heading"
          className="border-border bg-surface rounded-3xl border p-8 md:p-10"
        >
          <H2 id="cost-heading">What affects the cost of {service.topic}?</H2>
          <p className="text-muted mt-3 max-w-3xl">
            We quote a fixed price after we understand your goals, so there are no surprises. These
            are the factors that move it:
          </p>
          <ul className="mt-6 space-y-3">
            {service.costFactors.map((c) => (
              <li key={c} className="flex gap-3">
                <Check className="text-accent mt-1 size-4 shrink-0" aria-hidden="true" />
                <span className="text-muted leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            Compare our{" "}
            <Link href="/pricing" className="text-accent underline underline-offset-4">
              digital marketing packages and pricing in India
            </Link>
            {AD_SERVICES.has(slug) ? (
              <>
                , or estimate your return with the{" "}
                <Link
                  href="/tools/roi-calculator"
                  className="text-accent underline underline-offset-4"
                >
                  free ad budget calculator for India
                </Link>
                .
              </>
            ) : (
              <>
                , or{" "}
                <Link href="/tools/free-audit" className="text-accent underline underline-offset-4">
                  request a free audit in Mumbai
                </Link>{" "}
                to get a tailored quote.
              </>
            )}
          </p>
        </section>

        {/* Results */}
        <section aria-labelledby="results-heading" className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Honest expectations
            </p>
            <H2 id="results-heading">What results can you expect?</H2>
          </div>
          <div className="text-muted space-y-4 text-lg leading-relaxed">
            {service.results.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <TrustSignals variant="compact" />

        {/* FAQs */}
        <section aria-labelledby="faq-heading">
          <H2 id="faq-heading">{service.title}: frequently asked questions</H2>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={service.faqs} />
          </div>
        </section>

        <AreasServed topic={service.title} />

        {/* Related: descriptive internal links */}
        <section aria-labelledby="related-heading">
          <H2 id="related-heading">Related services and reading</H2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border-border bg-surface hover:border-accent/60 flex items-start gap-4 rounded-2xl border p-5 transition-colors"
              >
                <span className="bg-accent/10 text-accent grid size-10 shrink-0 place-items-center rounded-xl">
                  <ServiceIcon name={s.icon} className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold">
                    {sentenceCase(serviceSeo[s.slug].primary)}
                  </span>
                  <span className="text-muted text-sm">{s.short}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {postMeta && (
              <Link
                href={`/blog/${postMeta.slug}`}
                className="text-accent inline-flex items-center gap-2 underline underline-offset-4"
              >
                <BookOpen className="size-4" aria-hidden="true" /> Read our guide: {postMeta.title}
              </Link>
            )}
            <Link
              href={`/contact?plan=custom`}
              className="text-accent underline underline-offset-4"
            >
              Contact our Mumbai team about {service.topic}
            </Link>
            <Link href="/portfolio" className="text-accent underline underline-offset-4">
              See digital marketing case studies from India
            </Link>
          </div>
        </section>
      </div>

      <FinalCta />
    </>
  );
}
