import { stats } from "@/data/home";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

/** Figures are SAMPLE placeholders defined in data/home.ts. */
export function Stats() {
  return (
    <section aria-label="Results" className="container-page py-24">
      <div className="from-accent/15 to-surface border-border grid gap-8 rounded-[2rem] border bg-gradient-to-br p-10 sm:grid-cols-2 lg:grid-cols-4 lg:p-14">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="text-center">
              <p className="font-display text-gradient text-5xl font-bold md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
              </p>
              <p className="text-muted mt-3 text-sm">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
