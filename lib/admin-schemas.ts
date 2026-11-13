import { z } from "zod";
import { leadStatuses } from "@/lib/lead-constants";

export const leadUpdateSchema = z
  .object({
    status: z.enum(leadStatuses),
    /** ISO date string, or null to clear. */
    followUpDate: z.string().date().nullable(),
    addNote: z.string().trim().min(1).max(2000),
    removeNoteId: z.string().regex(/^[a-f\d]{24}$/i),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type LeadUpdate = z.infer<typeof leadUpdateSchema>;

export const testimonialInputSchema = z.object({
  quote: z.string().trim().min(10, "Quote is too short").max(1000),
  name: z.string().trim().min(2).max(80),
  role: z.string().trim().max(120).optional().default(""),
  published: z.boolean().default(true),
  order: z.number().int().min(0).max(9999).default(0),
});
export type TestimonialInput = z.input<typeof testimonialInputSchema>;

const resultSchema = z.object({
  label: z.string().trim().min(1),
  before: z.number(),
  after: z.number(),
  unit: z.string().trim().optional(),
  lowerIsBetter: z.boolean().optional(),
});

export const caseStudyInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
  client: z.string().trim().min(2),
  industry: z.string().trim().default(""),
  serviceSlug: z.string().trim().min(1),
  serviceLabel: z.string().trim().min(1),
  title: z.string().trim().min(5),
  summary: z.string().trim().default(""),
  metric: z.string().trim().min(1),
  metricLabel: z.string().trim().min(1),
  duration: z.string().trim().default(""),
  challenge: z.string().trim().min(10),
  strategy: z.array(z.string().trim().min(1)).min(1),
  results: z.array(resultSchema).min(1),
  trend: z.object({
    label: z.string().trim().default(""),
    unit: z.string().trim().optional(),
    points: z.array(z.number()).default([]),
  }),
  published: z.boolean().default(true),
});
export type CaseStudyInput = z.input<typeof caseStudyInputSchema>;
