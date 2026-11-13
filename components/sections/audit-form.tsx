"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { auditSchema, type AuditInput } from "@/lib/validators";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { FormField, Honeypot, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

export function AuditForm() {
  const { status, error, submit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditInput>({
    resolver: zodResolver(auditSchema),
    defaultValues: { source: "audit" },
  });

  const onSubmit = async (values: AuditInput) => {
    if (await submit(values)) reset({ source: "audit" });
  };

  if (status === "success") {
    return (
      <div role="status" className="border-border bg-surface rounded-3xl border p-10 text-center">
        <CheckCircle2 className="text-success mx-auto size-12" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Audit request received</h2>
        <p className="text-muted mt-2">
          Thank you! We&apos;ll review your website and email your audit within 2 working days.
          Check your inbox for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border-border bg-surface relative space-y-5 rounded-3xl border p-6 md:p-8"
    >
      <input type="hidden" {...register("source")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="audit-name" required error={errors.name?.message}>
          <input
            id="audit-name"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField label="Email" htmlFor="audit-email" required error={errors.email?.message}>
          <input
            id="audit-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FormField>
        <FormField
          label="Phone / WhatsApp"
          htmlFor="audit-phone"
          required
          error={errors.phone?.message}
        >
          <input
            id="audit-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
        <FormField
          label="Website address"
          htmlFor="audit-website"
          required
          error={errors.website?.message}
          hint="e.g. www.yourbusiness.com"
        >
          <input
            id="audit-website"
            autoComplete="url"
            className={inputClass}
            aria-invalid={!!errors.website}
            {...register("website")}
          />
        </FormField>
      </div>
      <FormField label="Type of business" htmlFor="audit-biz" error={errors.businessType?.message}>
        <input
          id="audit-biz"
          placeholder="e.g. Dental clinic, online fashion store"
          className={inputClass}
          {...register("businessType")}
        />
      </FormField>
      <FormField
        label="What would you like us to focus on?"
        htmlFor="audit-msg"
        error={errors.message?.message}
      >
        <textarea
          id="audit-msg"
          rows={4}
          className={`${inputClass} h-auto py-3`}
          placeholder="SEO, ads, website speed, social media…"
          {...register("message")}
        />
      </FormField>

      <Honeypot {...register("hp")} />

      {error && (
        <p
          role="alert"
          className="border-danger/40 text-danger rounded-xl border px-4 py-3 text-sm"
        >
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Get My Free Audit"
        )}
      </Button>
      <p className="text-muted text-center text-xs">
        No spam, no obligation. We only use your details to prepare and send your audit.
      </p>
    </form>
  );
}
