"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type LeadInput } from "@/lib/validators";
import { budgetRanges } from "@/lib/lead-constants";
import { useLeadSubmit } from "@/lib/use-lead-submit";
import { FormField, Honeypot, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

type ContactValues = Extract<LeadInput, { source: "contact" }>;

interface ContactFormProps {
  serviceTitles: string[];
  defaultService?: string;
  defaultMessage?: string;
}

export function ContactForm({
  serviceTitles,
  defaultService = "",
  defaultMessage = "",
}: ContactFormProps) {
  const { status, error, submit } = useLeadSubmit();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { source: "contact", service: defaultService, message: defaultMessage },
  });

  const onSubmit = async (values: ContactValues) => {
    if (await submit(values)) reset({ source: "contact", service: "", message: "" });
  };

  if (status === "success") {
    return (
      <div role="status" className="border-border bg-surface rounded-3xl border p-10 text-center">
        <CheckCircle2 className="text-success mx-auto size-12" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold">Message sent</h2>
        <p className="text-muted mt-2">
          Thank you! We&apos;ll get back to you within one working day. A confirmation is on its way
          to your inbox.
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
        <FormField label="Full name" htmlFor="c-name" required error={errors.name?.message}>
          <input
            id="c-name"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField label="Email" htmlFor="c-email" required error={errors.email?.message}>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FormField>
        <FormField
          label="Phone / WhatsApp"
          htmlFor="c-phone"
          required
          error={errors.phone?.message}
        >
          <input
            id="c-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
        <FormField
          label="Service interested in"
          htmlFor="c-service"
          required
          error={errors.service?.message}
        >
          <select
            id="c-service"
            className={inputClass}
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            <option value="">Select a service…</option>
            {serviceTitles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
            <option value="Not sure / multiple services">Not sure / multiple services</option>
          </select>
        </FormField>
      </div>
      <FormField label="Budget range" htmlFor="c-budget" required error={errors.budget?.message}>
        <select
          id="c-budget"
          className={inputClass}
          aria-invalid={!!errors.budget}
          {...register("budget")}
          defaultValue=""
        >
          <option value="" disabled>
            Select a range…
          </option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        label="How can we help?"
        htmlFor="c-message"
        required
        error={errors.message?.message}
      >
        <textarea
          id="c-message"
          rows={5}
          className={`${inputClass} h-auto py-3`}
          aria-invalid={!!errors.message}
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
          "Send message"
        )}
      </Button>
    </form>
  );
}
