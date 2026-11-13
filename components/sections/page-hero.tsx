import type { ReactNode } from "react";
import { FadeUp } from "@/components/ui/fade-up";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  /** Optional full-bleed background (e.g. a SlotImage with overlay="background"). */
  background?: ReactNode;
}

/** Shared hero used by inner pages (services, about, pricing, ...). */
export function PageHero({ eyebrow, title, description, children, background }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {background}
      <div
        aria-hidden="true"
        className="bg-accent/20 absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <div className="container-page py-20 text-center md:py-28">
        {eyebrow && (
          <FadeUp>
            <p className="text-accent mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              {eyebrow}
            </p>
          </FadeUp>
        )}
        <FadeUp delay={0.06}>
          <h1 className="mx-auto max-w-4xl text-4xl leading-[1.08] font-bold md:text-6xl">
            {title}
          </h1>
        </FadeUp>
        {description && (
          <FadeUp delay={0.12}>
            <p className="text-muted mx-auto mt-6 max-w-2xl text-base md:text-lg">{description}</p>
          </FadeUp>
        )}
        {children && (
          <FadeUp delay={0.18}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
