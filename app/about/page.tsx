import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BarChart3,
  Briefcase,
  Code2,
  GraduationCap,
  Megaphone,
  PenTool,
  Quote,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { pageSeo } from "@/data/seo-keywords";
import { certifications, mission, toolGroups, values } from "@/data/about";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { aboutPageSchemas, breadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { TrustSignals } from "@/components/sections/trust-signals";
import { AreasServed } from "@/components/sections/areas-served";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { SlotImage } from "@/components/ui/slot-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata(pageSeo["/about"], "/about");

/**
 * SAMPLE / PLACEHOLDER: role cards only. No names, photos, headcount or credentials are claimed.
 * When you are ready, replace these with real team members (name, role, photo, short bio).
 */
const teamRoles = [
  {
    Icon: Search,
    title: "SEO Specialists",
    text: "Technical audits, on-page optimisation, local SEO and content planning that grow organic enquiries.",
  },
  {
    Icon: Megaphone,
    title: "Performance Marketers",
    text: "Meta Ads and Google Ads, tracking and conversion work, managed against cost per lead and return on ad spend.",
  },
  {
    Icon: PenTool,
    title: "Content & Creative",
    text: "Writers, designers and video editors who produce posts, reels, ad creatives and website copy.",
  },
  {
    Icon: Code2,
    title: "Web & CRM Developers",
    text: "Developers who build websites, web applications, tracking setups and CRM automations.",
  },
  {
    Icon: UserCheck,
    title: "Account Managers",
    text: "Your day-to-day contact. They coordinate the team, run reviews and keep reporting clear.",
  },
];

/**
 * DRAFT founder copy, written in the third person for the About page only. Please read it, edit
 * anything that is not accurate and have Ahsan approve the quote before launch.
 */
const founderStory = [
  `${siteConfig.founder.name}, ${siteConfig.founder.title} of ${siteConfig.name}, holds an ${siteConfig.founder.qualification} and has spent more than ${siteConfig.founder.experienceYears} years working across digital marketing, performance advertising on Meta and Google, CRM implementation and full-stack web development.`,
  "He started the agency after noticing a gap many businesses run into: marketing teams that could run ads but could not fix the website or tracking behind them, and developers who could build a site without understanding how customers find it. He set out to bring both skills into one team, so strategy, creative and technology work together.",
  "His approach is data-driven. Every plan starts with what a customer is worth to the business, every campaign is tracked from day one and every client receives transparent monthly reporting they can understand. He prefers long-term growth to quick tricks, and he will tell a client when a channel is not yet worth their money.",
];
const founderQuote =
  "Good marketing should be easy to explain and easy to measure. If we cannot show you what it earns, we should change it.";

export default function AboutPage() {
  const { founder } = siteConfig;
  const facts = [
    { Icon: GraduationCap, label: "Qualification", value: founder.qualification },
    { Icon: Briefcase, label: "Experience", value: `${founder.experienceYears}+ years` },
    {
      Icon: BarChart3,
      label: "Focus",
      value: "Meta and Google Ads, CRM, full-stack development",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          ...aboutPageSchemas(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About us"
        title={
          <>
            A digital marketing company in Mumbai{" "}
            <span className="text-gradient">built around specialists</span>
          </>
        }
        description={`${siteConfig.name} is a digital marketing company in Mumbai. Our team of SEO specialists, performance marketers, creatives and developers helps businesses across India grow with strategy, content and technology.`}
      />

      {/* Who we are */}
      <section className="container-page grid gap-10 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Who we are</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            One team for marketing and technology
          </h2>
          <SlotImage
            slot="about-story"
            icon={Users}
            sizes="(min-width: 1024px) 460px, 100vw"
            className="border-border mt-8 aspect-[3/2] rounded-3xl border"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="text-muted space-y-4 leading-relaxed">
            <p>
              We started {siteConfig.name} to close a gap we kept seeing. Businesses were stuck
              between agencies that run ads but cannot fix the website, and developers who build
              sites without understanding marketing. We bring both under one roof, so planning,
              creative, ads, search and technology work as a single system.
            </p>
            <p>
              Today we offer {services.length} specialised services, from{" "}
              <Link href="/services/seo" className="text-accent underline underline-offset-4">
                SEO services in Mumbai
              </Link>{" "}
              to{" "}
              <Link
                href="/services/crm-automation"
                className="text-accent underline underline-offset-4"
              >
                CRM setup and automation
              </Link>
              . Every project follows the same documented process, and every client gets
              plain-language reporting on the numbers that matter to their business.
            </p>
            <p>
              We are based in {siteConfig.contact.address.city}, India, and we work with clients
              across the country and abroad. See{" "}
              <Link href="/services" className="text-accent underline underline-offset-4">
                all of our digital marketing services
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-accent underline underline-offset-4">
                contact our team
              </Link>{" "}
              to talk about your goals.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="bg-surface border-border border-y py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our mission" title={mission} className="max-w-4xl" />
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-24">
        <SectionHeading eyebrow="Our values" title="What we stand for" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.08}>
              <div className="border-border bg-surface h-full rounded-3xl border p-8">
                <span className="font-display text-accent text-sm font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{v.title}</h3>
                <p className="text-muted mt-2 leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Meet the Founder (the only place the founder is named) */}
      <section
        aria-labelledby="founder-heading"
        className="bg-surface border-border border-y py-24"
      >
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <figure className="mx-auto w-full max-w-[560px]">
              <div className="border-accent/30 bg-background relative aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-[0_0_40px_-12px_var(--accent)]">
                <Image
                  src={founder.photo}
                  alt={founder.photoAlt}
                  fill
                  sizes="(min-width: 640px) 560px, 100vw"
                  className="object-cover object-[50%_0%]"
                />
              </div>
              <figcaption className="text-muted mt-3 text-center text-sm">
                {founder.photoCaption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Meet the founder
            </p>
            <h2 id="founder-heading" className="mt-3 text-3xl font-bold md:text-4xl">
              {founder.name}, {founder.title}
            </h2>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="border-border bg-background rounded-2xl border p-4">
                  <Icon className="text-accent size-5" aria-hidden="true" />
                  <dt className="text-muted mt-2 text-xs">{label}</dt>
                  <dd className="text-sm font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="text-muted mt-6 space-y-4 leading-relaxed">
              {founderStory.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <figure className="border-accent bg-background mt-8 rounded-2xl border-l-4 p-6">
              <Quote className="text-accent/40 size-6" aria-hidden="true" />
              <blockquote className="mt-2 text-lg leading-relaxed font-medium">
                “{founderQuote}”
              </blockquote>
              <figcaption className="text-muted mt-3 text-sm">
                {founder.name}, {founder.title}, {siteConfig.name}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Our Team (roles only) */}
      <section aria-labelledby="team-heading" className="container-page py-24">
        <SectionHeading
          eyebrow="Our team"
          title="Our team of digital marketing specialists"
          description="We organise our work around specialist roles, so each part of your campaign is handled by someone who does it every day."
        />
        <h2 id="team-heading" className="sr-only">
          Team roles
        </h2>
        <SlotImage
          slot="about-team"
          icon={Users}
          sizes="(min-width: 1280px) 1200px, 92vw"
          className="border-border mt-12 aspect-[16/7] rounded-3xl border"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teamRoles.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.07}>
              <div className="border-border bg-surface h-full rounded-3xl border p-7">
                <span className="bg-accent/10 text-accent grid size-12 place-items-center rounded-2xl">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-page">
        <TrustSignals />
      </div>

      {/* Tools */}
      <section className="bg-surface border-border border-y py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Tools & platforms" title="The stack behind your growth" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {toolGroups.map((g) => (
              <Reveal key={g.group}>
                <h3 className="text-sm font-semibold tracking-wide">{g.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="border-border bg-background rounded-full border px-3 py-1.5 text-xs font-medium"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications (placeholder) */}
      <section className="container-page py-24">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials"
          description="Placeholder entries: add your real certifications in data/about.ts."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {certifications.map((c, i) => (
            <div
              key={i}
              className="border-border bg-surface flex items-start gap-4 rounded-2xl border border-dashed p-6"
            >
              <Award className="text-accent size-6 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-muted text-sm">
                  {c.issuer} · {c.year}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/contact" size="lg">
            Talk to our team about your goals
          </ButtonLink>
        </div>
      </section>

      <div className="container-page pb-16">
        <AreasServed />
      </div>

      <FinalCta />
    </>
  );
}
