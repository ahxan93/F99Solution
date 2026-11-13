import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { requireAdmin } from "@/lib/admin";
import { CaseStudyModel } from "@/models/CaseStudy";
import { getServiceNav } from "@/lib/service-nav";
import { CaseStudyForm, type CaseStudyFormValues } from "@/components/admin/case-study-form";

export const metadata: Metadata = { title: "Edit case study" };

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();
  const c = await CaseStudyModel.findById(id).lean();
  if (!c) notFound();

  const initial: CaseStudyFormValues = {
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
    strategy: c.strategy.join("\n"),
    results: c.results
      .map((r) =>
        [r.label, r.before, r.after, r.unit ?? "", r.lowerIsBetter ? "lower" : ""]
          .join(" | ")
          .replace(/( \| )+$/, ""),
      )
      .join("\n"),
    trendLabel: c.trend?.label ?? "",
    trendUnit: c.trend?.unit ?? "",
    trendPoints: (c.trend?.points ?? []).join(", "),
    published: c.published,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit case study</h1>
      <CaseStudyForm id={String(c._id)} initial={initial} services={getServiceNav().items} />
    </div>
  );
}
