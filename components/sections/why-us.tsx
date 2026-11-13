import { BarChart3, Code2, Shield, Target, Users, Workflow, type LucideIcon } from "lucide-react";
import { whyUs } from "@/data/home";
import { Reveal } from "@/components/ui/reveal";
import { SlotImage } from "@/components/ui/slot-image";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap: Record<(typeof whyUs)[number]["icon"], LucideIcon> = {
  target: Target,
  code: Code2,
  chart: BarChart3,
  users: Users,
  shield: Shield,
  workflow: Workflow,
};

export function WhyUs() {
  return (
    <section className="bg-surface border-border border-y py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why choose us"
          title="An agency that behaves like your in-house growth team"
        />
        <Reveal>
          <SlotImage
            slot="home-why-us"
            icon={Users}
            sizes="(min-width: 1280px) 1200px, 92vw"
            className="border-border mt-12 aspect-[16/7] rounded-3xl border"
          />
        </Reveal>
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="flex gap-4">
                  <span className="bg-accent/10 text-accent grid size-11 shrink-0 place-items-center rounded-xl">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
