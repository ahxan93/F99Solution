import { trustedBy } from "@/data/home";

/** SAMPLE placeholder logos (text wordmarks) — replace with real client logos in data/home.ts. */
export function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="border-border border-y py-10">
      <div className="container-page">
        <p className="text-muted mb-6 text-center text-xs font-semibold tracking-[0.2em] uppercase">
          Trusted by growing brands (sample placeholders)
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustedBy.map((name) => (
            <li
              key={name}
              className="font-display text-muted hover:text-foreground text-lg font-semibold tracking-tight transition-colors"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
