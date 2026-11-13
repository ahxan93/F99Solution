import "server-only";
import { connectDB } from "@/lib/db";
import { CaseStudyModel } from "@/models/CaseStudy";
import { Testimonial } from "@/models/Testimonial";
import { caseStudies as sampleCaseStudies, type CaseStudy } from "@/data/case-studies";
import { testimonials as sampleTestimonials } from "@/data/home";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

/**
 * Public content comes from MongoDB (managed in /admin). If the database is
 * not configured, unreachable or has no published items yet, we fall back to
 * the SAMPLE data files so the site always renders.
 */
async function tryDb<T>(fn: () => Promise<T[]>): Promise<T[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    await connectDB();
    return await fn();
  } catch (err) {
    console.warn(
      "[content] DB unavailable, using sample data:",
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const rows = await tryDb(async () =>
    (await Testimonial.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean()).map(
      (t) => ({
        quote: t.quote,
        name: t.name,
        role: t.role ?? "",
      }),
    ),
  );
  return rows.length ? rows : sampleTestimonials.map((t) => ({ ...t }));
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const rows = await tryDb(async () =>
    (await CaseStudyModel.find({ published: true }).sort({ createdAt: -1 }).lean()).map(
      (c): CaseStudy => ({
        slug: c.slug,
        client: c.client,
        industry: c.industry ?? "",
        serviceSlug: c.serviceSlug,
        serviceLabel: c.serviceLabel,
        title: c.title,
        summary: c.summary ?? "",
        metric: c.metric,
        metricLabel: c.metricLabel,
        duration: c.duration ?? "",
        challenge: c.challenge,
        strategy: [...c.strategy],
        results: c.results.map((r) => ({
          label: r.label,
          before: r.before,
          after: r.after,
          unit: r.unit ?? undefined,
          lowerIsBetter: r.lowerIsBetter ?? undefined,
        })),
        trend: {
          label: c.trend?.label ?? "",
          unit: c.trend?.unit ?? undefined,
          points: [...(c.trend?.points ?? [])],
        },
      }),
    ),
  );
  return rows.length ? rows : sampleCaseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}
