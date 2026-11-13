"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import type { ServiceNavItem } from "@/lib/service-nav";
import { FormField, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

export interface CaseStudyFormValues {
  slug: string;
  client: string;
  industry: string;
  serviceSlug: string;
  serviceLabel: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  duration: string;
  challenge: string;
  strategy: string; // one per line
  results: string; // "Label | before | after | unit | lower?" per line
  trendLabel: string;
  trendUnit: string;
  trendPoints: string; // comma separated
  published: boolean;
}

export const emptyCaseStudy: CaseStudyFormValues = {
  slug: "",
  client: "",
  industry: "",
  serviceSlug: "",
  serviceLabel: "",
  title: "",
  summary: "",
  metric: "",
  metricLabel: "",
  duration: "",
  challenge: "",
  strategy: "",
  results: "",
  trendLabel: "",
  trendUnit: "",
  trendPoints: "",
  published: true,
};

function parseResults(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, before, after, unit, lower] = line.split("|").map((p) => p.trim());
      return {
        label,
        before: Number(before),
        after: Number(after),
        unit: unit || undefined,
        lowerIsBetter: /^(lower|true|yes|1)$/i.test(lower ?? "") || undefined,
      };
    });
}

export function CaseStudyForm({
  id,
  initial,
  services,
}: {
  id?: string;
  initial?: CaseStudyFormValues;
  services: ServiceNavItem[];
}) {
  const router = useRouter();
  const [v, setV] = useState<CaseStudyFormValues>(
    initial ?? { ...emptyCaseStudy, serviceSlug: services[0]?.slug ?? "" },
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof CaseStudyFormValues>(k: K, val: CaseStudyFormValues[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const results = parseResults(v.results);
    if (results.some((r) => !r.label || Number.isNaN(r.before) || Number.isNaN(r.after))) {
      setError(
        'Results: use one per line as "Label | before | after | unit | lower" (numbers for before/after).',
      );
      return;
    }
    const points = v.trendPoints
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map(Number);
    if (points.some(Number.isNaN)) {
      setError("Trend points must be comma-separated numbers.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(id ? `/api/admin/case-studies/${id}` : "/api/admin/case-studies", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: v.slug,
          client: v.client,
          industry: v.industry,
          serviceSlug: v.serviceSlug,
          serviceLabel:
            v.serviceLabel ||
            services.find((s) => s.slug === v.serviceSlug)?.title ||
            v.serviceSlug,
          title: v.title,
          summary: v.summary,
          metric: v.metric,
          metricLabel: v.metricLabel,
          duration: v.duration,
          challenge: v.challenge,
          strategy: v.strategy
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          results,
          trend: { label: v.trendLabel, unit: v.trendUnit || undefined, points },
          published: v.published,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not save");
      router.push("/admin/case-studies");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
      setBusy(false);
    }
  }

  async function remove() {
    if (!id || !confirm("Delete this case study?")) return;
    const res = await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/case-studies");
      router.refresh();
    }
  }

  const text = (
    k: keyof CaseStudyFormValues,
    label: string,
    opts: { required?: boolean; hint?: string } = {},
  ) => (
    <FormField label={label} htmlFor={`cs-${k}`} required={opts.required} hint={opts.hint}>
      <input
        id={`cs-${k}`}
        required={opts.required}
        value={String(v[k])}
        onChange={(e) => set(k, e.target.value as never)}
        className={inputClass}
      />
    </FormField>
  );

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5">
      <div className="border-border bg-surface grid gap-4 rounded-2xl border p-5 sm:grid-cols-2">
        {text("title", "Title", { required: true })}
        {text("slug", "URL slug", {
          required: true,
          hint: "e.g. acme-meta-ads (lowercase, hyphens)",
        })}
        {text("client", "Client name", { required: true })}
        {text("industry", "Industry")}
        <FormField
          label="Service"
          htmlFor="cs-serviceSlug"
          required
          hint="Used for the portfolio filter"
        >
          <select
            id="cs-serviceSlug"
            value={v.serviceSlug}
            onChange={(e) => set("serviceSlug", e.target.value)}
            className={inputClass}
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </FormField>
        {text("serviceLabel", "Service label (short)", {
          hint: "e.g. Meta Ads. Blank = full service name",
        })}
        {text("metric", "Headline metric", { required: true, hint: "e.g. 4.2x or +312%" })}
        {text("metricLabel", "Metric label", { required: true, hint: "e.g. ROAS" })}
        {text("duration", "Duration", { hint: "e.g. 6 months" })}
      </div>

      <div className="border-border bg-surface space-y-4 rounded-2xl border p-5">
        <FormField label="Summary" htmlFor="cs-summary">
          <input
            id="cs-summary"
            value={v.summary}
            onChange={(e) => set("summary", e.target.value)}
            className={inputClass}
          />
        </FormField>
        <FormField label="Challenge" htmlFor="cs-challenge" required>
          <textarea
            id="cs-challenge"
            required
            rows={3}
            value={v.challenge}
            onChange={(e) => set("challenge", e.target.value)}
            className={`${inputClass} h-auto py-3`}
          />
        </FormField>
        <FormField label="Strategy" htmlFor="cs-strategy" required hint="One step per line">
          <textarea
            id="cs-strategy"
            required
            rows={4}
            value={v.strategy}
            onChange={(e) => set("strategy", e.target.value)}
            className={`${inputClass} h-auto py-3`}
          />
        </FormField>
        <FormField
          label="Results"
          htmlFor="cs-results"
          required
          hint='One per line: Label | before | after | unit | lower  (add "lower" if a lower number is better)'
        >
          <textarea
            id="cs-results"
            required
            rows={4}
            value={v.results}
            onChange={(e) => set("results", e.target.value)}
            placeholder={"ROAS | 1.6 | 4.2 | x\nCost per lead | 920 | 540 | ₹ | lower"}
            className={`${inputClass} h-auto py-3 font-mono`}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-3">
          {text("trendLabel", "Trend chart label", { hint: "e.g. ROAS" })}
          {text("trendUnit", "Trend unit")}
          {text("trendPoints", "Trend points", { hint: "Comma-separated, one per month" })}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={v.published}
          onChange={(e) => set("published", e.target.checked)}
          className="size-4 accent-[var(--accent)]"
        />
        Published on the website
      </label>

      {error && (
        <p
          role="alert"
          className="border-danger/40 text-danger rounded-xl border px-4 py-3 text-sm"
        >
          {error}
        </p>
      )}

      <div className="flex items-center justify-between">
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : id ? (
            "Save changes"
          ) : (
            "Create case study"
          )}
        </Button>
        {id && (
          <Button type="button" variant="ghost" onClick={remove} className="text-danger">
            <Trash2 className="size-4" aria-hidden="true" /> Delete
          </Button>
        )}
      </div>
    </form>
  );
}
