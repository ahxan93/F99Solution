import { ArrowRight, MessageCircle, Rocket } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { SlotImage } from "@/components/ui/slot-image";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="container-page pb-8">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#0a2a8a] p-10 text-center text-white md:p-16">
          <SlotImage
            slot="home-cta"
            icon={Rocket}
            overlay="navy"
            sizes="(min-width: 1280px) 1200px, 96vw"
            className="absolute inset-0 -z-10"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold md:text-5xl">
            Ready to grow? Start with a free, no-obligation audit.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/80">
            We&apos;ll review your website, SEO and ads, and send back clear, prioritised quick
            wins.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <ButtonLink
                href="/tools/free-audit"
                size="lg"
                className="bg-white text-[#1747d6] shadow-none hover:bg-white/90"
              >
                Get Free Audit <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-white/40 px-8 text-base font-semibold transition-colors hover:bg-white/10"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
