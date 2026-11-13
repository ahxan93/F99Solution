import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/page-hero";

export interface LegalSection {
  heading: string;
  /** Paragraphs. */
  body?: ReactNode[];
  /** Optional bullet list shown after the paragraphs. */
  list?: ReactNode[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/** Shared layout for Privacy Policy / Terms. */
export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <article className="container-page max-w-3xl pb-24">
        <p className="text-muted mb-10 text-sm">Last updated: {updated}</p>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-xl font-bold md:text-2xl">
                {i + 1}. {s.heading}
              </h2>
              {s.body?.map((p, j) => (
                <p key={j} className="text-muted mt-3 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="text-muted mt-3 list-disc space-y-1.5 pl-6 leading-relaxed">
                  {s.list.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
