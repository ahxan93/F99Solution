"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useLeadSubmit } from "@/lib/use-lead-submit";

/** Compact newsletter signup (footer). Validated with the shared Zod schema. */
export function NewsletterForm() {
  const { status, error, submit } = useLeadSubmit();
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Loaded on submit only: keeps Zod (~30 KB gzip) out of the JS every page ships.
    const { newsletterSchema } = await import("@/lib/validators");
    const parsed = newsletterSchema.safeParse({ source: "newsletter", email, hp });
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      return;
    }
    setLocalError(null);
    if (await submit(parsed.data)) setEmail("");
  };

  if (status === "success") {
    return (
      <p role="status" className="text-success flex items-center gap-2 text-sm">
        <CheckCircle2 className="size-4" aria-hidden="true" /> Subscribed — check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative max-w-sm">
      <label htmlFor="newsletter-email" className="font-display mb-2 block text-sm font-semibold">
        Get marketing tips in your inbox
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-invalid={!!(localError ?? error)}
          className="border-border bg-background placeholder:text-muted/70 focus:border-accent h-11 min-w-0 flex-1 rounded-full border px-4 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Subscribe"
          className="bg-accent-solid text-accent-foreground hover:bg-accent-solid-hover grid size-11 shrink-0 place-items-center rounded-full transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>
      {(localError ?? error) && (
        <p role="alert" className="text-danger mt-2 text-xs">
          {localError ?? error}
        </p>
      )}
    </form>
  );
}
