"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { calculateRoi, type RoiInputs } from "@/lib/roi";
import { calculatorReportSchema, type CalculatorReportInput } from "@/lib/validators";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { formatINR } from "@/data/pricing";
import { FormField, Honeypot, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FieldKey = keyof RoiInputs;

const fields: {
  key: FieldKey;
  label: string;
  hint: string;
  prefix?: string;
  suffix?: string;
  step: number;
}[] = [
  {
    key: "budget",
    label: "Monthly ad budget",
    hint: "Total you plan to spend on ads",
    prefix: "₹",
    step: 1000,
  },
  {
    key: "cpc",
    label: "Cost per click (CPC)",
    hint: "Average price of one click",
    prefix: "₹",
    step: 1,
  },
  {
    key: "conversionRate",
    label: "Click → lead conversion rate",
    hint: "Share of visitors who enquire or sign up",
    suffix: "%",
    step: 0.1,
  },
  {
    key: "closeRate",
    label: "Lead → sale close rate",
    hint: "Share of leads who become customers (use 100 for direct e-commerce sales)",
    suffix: "%",
    step: 1,
  },
  {
    key: "orderValue",
    label: "Average order value",
    hint: "Revenue from one customer",
    prefix: "₹",
    step: 100,
  },
];

const defaults: Record<FieldKey, string> = {
  budget: "50000",
  cpc: "20",
  conversionRate: "4",
  closeRate: "25",
  orderValue: "5000",
};

const num = (v: string): number => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const fmtNum = (n: number, dp = 0) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: dp, minimumFractionDigits: dp });

export function RoiCalculator() {
  const [values, setValues] = useState<Record<FieldKey, string>>(defaults);

  const inputs: RoiInputs = useMemo(
    () => ({
      budget: num(values.budget),
      cpc: num(values.cpc),
      conversionRate: Math.min(100, num(values.conversionRate)),
      closeRate: Math.min(100, num(values.closeRate)),
      orderValue: num(values.orderValue),
    }),
    [values],
  );
  const r = useMemo(() => calculateRoi(inputs), [inputs]);

  const { status, error, submit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorReportInput>({
    resolver: zodResolver(calculatorReportSchema),
    defaultValues: { source: "calculator" },
  });

  const onSend = (form: CalculatorReportInput) =>
    submit({
      ...form,
      details: {
        ...inputs,
        clicks: Math.round(r.clicks),
        leads: Number(r.leads.toFixed(1)),
        sales: Number(r.sales.toFixed(1)),
        revenue: Math.round(r.revenue),
        roas: Number(r.roas.toFixed(2)),
      },
    });

  const roasTone = r.roas >= 3 ? "text-success" : r.roas >= 1 ? "text-accent" : "text-danger";
  const stats = [
    { label: "Clicks", value: fmtNum(r.clicks) },
    { label: "Leads", value: fmtNum(r.leads, 1) },
    { label: "Sales", value: fmtNum(r.sales, 1) },
    { label: "Revenue", value: formatINR(r.revenue) },
    { label: "Cost per lead", value: formatINR(r.costPerLead) },
    { label: "Cost per sale", value: formatINR(r.costPerSale) },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border-border bg-surface space-y-5 rounded-3xl border p-6 md:p-8"
        aria-label="Calculator inputs"
      >
        {fields.map((f) => (
          <FormField key={f.key} label={f.label} htmlFor={`roi-${f.key}`} hint={f.hint}>
            <div className="relative">
              {f.prefix && (
                <span className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm">
                  {f.prefix}
                </span>
              )}
              <input
                id={`roi-${f.key}`}
                type="number"
                inputMode="decimal"
                min={0}
                step={f.step}
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className={cn(inputClass, f.prefix && "pl-9", f.suffix && "pr-9")}
              />
              {f.suffix && (
                <span className="text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm">
                  {f.suffix}
                </span>
              )}
            </div>
          </FormField>
        ))}
      </form>

      <div className="space-y-5">
        <div
          className="from-accent/15 to-surface border-border rounded-3xl border bg-gradient-to-br p-8 text-center"
          aria-live="polite"
        >
          <p className="text-muted text-sm">Estimated return on ad spend (ROAS)</p>
          <p className={cn("font-display mt-2 text-6xl font-bold", roasTone)}>
            {r.roas.toFixed(2)}x
          </p>
          <p className="text-muted mt-2 text-xs">
            {r.roas >= 1
              ? `Every ₹1 spent returns about ₹${r.roas.toFixed(2)} in revenue.`
              : "At these numbers, ad spend exceeds revenue."}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="border-border bg-surface rounded-2xl border p-4">
              <dt className="text-muted text-xs">{s.label}</dt>
              <dd className="font-display mt-1 text-lg font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-muted text-xs">
          Estimates only — based on the figures you enter. Real results vary with market, creative
          and landing-page quality.
        </p>

        {status === "success" ? (
          <div
            role="status"
            className="border-border bg-surface rounded-3xl border p-6 text-center"
          >
            <CheckCircle2 className="text-success mx-auto size-10" aria-hidden="true" />
            <p className="mt-3 font-semibold">Report on its way!</p>
            <p className="text-muted text-sm">Check your inbox for your ROI report.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSend)}
            noValidate
            className="border-border bg-surface relative space-y-4 rounded-3xl border p-6"
          >
            <h2 className="font-semibold">Email me this report</h2>
            <input type="hidden" {...register("source")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Name" htmlFor="roi-name" required error={errors.name?.message}>
                <input
                  id="roi-name"
                  autoComplete="name"
                  className={inputClass}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
              </FormField>
              <FormField label="Email" htmlFor="roi-email" required error={errors.email?.message}>
                <input
                  id="roi-email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </FormField>
            </div>
            <Honeypot {...register("hp")} />
            {error && (
              <p role="alert" className="text-danger text-sm">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                "Send me the report"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
