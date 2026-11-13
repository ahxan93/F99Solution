import Link from "next/link";
import { ClipboardCheck, FileBarChart, KeyRound, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * E-E-A-T trust signals. Every statement describes how we actually work (documented process,
 * monthly reporting, client-owned accounts, privacy-aware data handling). No awards, client names,
 * reviews or statistics are claimed here.
 */
const signals = [
  {
    Icon: ClipboardCheck,
    title: "A documented process",
    text: "Every engagement follows the same steps: audit, plan, execute, optimise and report. You always know what happens next.",
  },
  {
    Icon: FileBarChart,
    title: "Transparent reporting",
    text: "You get a plain-language report every month, with the numbers that matter to your business and what we will change.",
  },
  {
    Icon: KeyRound,
    title: "You own your accounts",
    text: "Ad accounts, analytics, domains and websites stay in your name, with full access for you at all times.",
  },
  {
    Icon: ShieldCheck,
    title: "Privacy-safe data handling",
    text: "We collect only the data we need, use consent-aware tracking and never sell or share your customer information.",
  },
];

interface TrustSignalsProps {
  /** "full" adds a heading and link to the process; "compact" is for use inside long pages. */
  variant?: "full" | "compact";
}

export function TrustSignals({ variant = "full" }: TrustSignalsProps) {
  return (
    <section aria-labelledby="trust-heading" className={variant === "full" ? "py-20" : "py-2"}>
      {variant === "full" ? (
        <SectionHeading
          eyebrow="Why you can trust us"
          title="How we work, and what you can expect"
          description="Marketing works best when it is measurable and honest. These are the standards every project follows."
        />
      ) : (
        <h2 id="trust-heading" className="text-2xl font-bold md:text-3xl">
          How we work with you
        </h2>
      )}
      <div
        className={`grid gap-4 sm:grid-cols-2 ${variant === "full" ? "mt-12 lg:grid-cols-4" : "mt-6 lg:grid-cols-4"}`}
      >
        {signals.map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06}>
            <div className="border-border bg-surface h-full rounded-2xl border p-5">
              <span className="bg-accent/10 text-accent grid size-10 place-items-center rounded-xl">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {variant === "full" && (
        <p className="text-muted mt-8 text-center text-sm">
          Read how we handle personal data in our{" "}
          <Link href="/privacy-policy" className="text-accent underline underline-offset-4">
            privacy policy
          </Link>{" "}
          or see the{" "}
          <Link href="/about" className="text-accent underline underline-offset-4">
            specialists behind our digital marketing company in Mumbai
          </Link>
          .
        </p>
      )}
    </section>
  );
}
