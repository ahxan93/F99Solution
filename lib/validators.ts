import { z } from "zod";

/**
 * Shared Zod schemas — used by React Hook Form on the client AND by the
 * API route handlers on the server (Phase 5), so rules never drift.
 */

/** Hidden honeypot field. Real users never fill it; bots usually do. */
const honeypot = z.string().max(0).optional();

const phone = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s()-]{7,18}$/, "Enter a valid phone number");

const name = z.string().trim().min(2, "Please enter your name").max(80);
const email = z.string().trim().toLowerCase().email("Enter a valid email address");

export const leadSources = ["contact", "audit", "calculator", "newsletter", "exit-intent"] as const;
export type LeadSource = (typeof leadSources)[number];

export const auditSchema = z.object({
  source: z.literal("audit"),
  name,
  email,
  phone,
  website: z
    .string()
    .trim()
    .min(3, "Enter your website address")
    .max(200)
    .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
    .pipe(z.string().url("Enter a valid website address")),
  businessType: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
  hp: honeypot,
});

export const calculatorReportSchema = z.object({
  source: z.literal("calculator"),
  name,
  email,
  phone: phone.optional().or(z.literal("")),
  /** Snapshot of the calculator inputs/results sent with the lead. */
  details: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  hp: honeypot,
});

export const contactSchema = z.object({
  source: z.literal("contact"),
  name,
  email,
  phone,
  service: z.string().trim().min(1, "Please choose a service"),
  budget: z.string().trim().min(1, "Please choose a budget range"),
  message: z.string().trim().min(10, "Tell us a little more (min 10 characters)").max(2000),
  hp: honeypot,
});

export const newsletterSchema = z.object({
  source: z.literal("newsletter"),
  email,
  name: name.optional(),
  hp: honeypot,
});

export const exitIntentSchema = z.object({
  source: z.literal("exit-intent"),
  email,
  name: name.optional(),
  hp: honeypot,
});

/** Any lead submission accepted by POST /api/leads. */
export const leadSchema = z.discriminatedUnion("source", [
  auditSchema,
  calculatorReportSchema,
  contactSchema,
  newsletterSchema,
  exitIntentSchema,
]);

export type AuditInput = z.input<typeof auditSchema>;
export type CalculatorReportInput = z.input<typeof calculatorReportSchema>;
export type LeadInput = z.input<typeof leadSchema>;
