import { processSteps } from "@/data/home";
import { Workflow } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SlotImage } from "@/components/ui/slot-image";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section className="relative isolate overflow-hidden py-24">
      <SlotImage
        slot="home-process"
        icon={Workflow}
        alt=""
        overlay="background"
        sizes="100vw"
        className="absolute inset-0 -z-10 opacity-60"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="A proven process, from first call to monthly report"
        />
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* connector line (desktop) */}
          <div
            aria-hidden="true"
            className="from-accent/0 via-accent/50 to-accent/0 absolute top-6 right-[10%] left-[10%] hidden h-px bg-gradient-to-r lg:block"
          />
          {processSteps.map((s, i) => (
            <li key={s.step}>
              <Reveal delay={i * 0.1}>
                <div className="flex gap-5 lg:block lg:text-center">
                  <span className="bg-background border-accent text-accent shadow-glow font-display relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 text-sm font-bold lg:mx-auto">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold lg:mt-5">{s.title}</h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
