import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { FadeUp } from "@/components/ui/fade-up";
import { getHeroServiceItems } from "@/lib/service-nav";
import { HeroCanvas } from "@/components/three/hero-canvas";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden xl:flex xl:min-h-[calc(100svh-5rem)] xl:items-center">
      <div className="container-page py-16 xl:py-16">
        <div className="max-w-2xl">
          <FadeUp>
            <p className="border-border bg-surface/60 text-muted inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur">
              <span className="bg-success size-2 rounded-full" aria-hidden="true" />
              Digital marketing agency · Mumbai, India
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold sm:text-5xl md:text-6xl">
              A <span className="text-gradient">digital marketing agency in Mumbai</span> that turns
              clicks into customers.
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
              We blend SEO, performance ads, content and custom web technology into one growth
              system, run by a team of specialists in strategy, design, ads and development.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <ButtonLink href="/tools/free-audit" size="lg">
                  Get Free Audit <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="/contact" size="lg" variant="outline">
                  <CalendarCheck className="size-4" aria-hidden="true" /> Book a Call
                </ButtonLink>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </div>

      {/*
        3D scene stage. Below xl it sits under the text (so cards can never overlap the headline);
        from xl up it is the right-hand column. `xl:contents` lets the stage position itself against
        the section.
      */}
      <div className="container-page pb-12 xl:contents">
        <div className="relative h-[26rem] overflow-hidden rounded-3xl bg-[#060a17] ring-1 ring-white/10 sm:h-[30rem] md:h-[34rem] xl:absolute xl:inset-y-5 xl:right-5 xl:left-[52%] xl:h-auto xl:ring-white/5">
          <HeroCanvas heroServices={getHeroServiceItems()} />
        </div>
      </div>
    </section>
  );
}
