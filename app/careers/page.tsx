import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { careerValues, openRoles } from "@/data/careers";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata(pageSeo["/careers"], "/careers");

export default function CareersPage() {
  const { email } = siteConfig.contact;

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Digital marketing jobs in Mumbai:{" "}
            <span className="text-gradient">build your career with us</span>
          </>
        }
        description="We are a growing digital marketing agency in Mumbai hiring for SEO, ads, content and development. We look for curious people who like owning results."
      />

      <section className="container-page pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {careerValues.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="border-border bg-surface h-full rounded-3xl border p-7">
                <h2 className="text-lg font-semibold">{v.title}</h2>
                <p className="text-muted mt-2 text-sm leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface border-border border-y py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Open roles" title="Current openings" />
          {openRoles.length === 0 ? (
            <div className="border-border bg-background mt-10 rounded-3xl border p-8 text-center">
              <p className="font-semibold">No open roles right now</p>
              <p className="text-muted mt-2 text-sm">
                We&apos;re always happy to meet talented people. Send your CV and a few lines about
                what you&apos;d like to work on, and we&apos;ll keep you in mind.
              </p>
              <ButtonLink
                href={`mailto:${email}?subject=${encodeURIComponent("Open application")}`}
                size="lg"
                className="mt-6"
              >
                <Mail className="size-4" aria-hidden="true" /> Send an open application
              </ButtonLink>
            </div>
          ) : (
            <ul className="mt-10 space-y-4">
              {openRoles.map((r) => (
                <li key={r.title} className="border-border bg-background rounded-3xl border p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold">{r.title}</h3>
                    <span className="text-muted text-sm">
                      {r.type} · {r.location}
                    </span>
                  </div>
                  <p className="text-muted mt-2 text-sm">{r.summary}</p>
                  <ul className="text-muted mt-3 list-disc space-y-1 pl-5 text-sm">
                    {r.requirements.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={`mailto:${email}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                    variant="outline"
                    className="mt-5"
                  >
                    Apply by email
                  </ButtonLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
