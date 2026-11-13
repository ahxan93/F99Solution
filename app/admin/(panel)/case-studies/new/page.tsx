import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { getServiceNav } from "@/lib/service-nav";
import { CaseStudyForm } from "@/components/admin/case-study-form";

export const metadata: Metadata = { title: "New case study" };

export default async function NewCaseStudyPage() {
  await requireAdmin();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New case study</h1>
      <CaseStudyForm services={getServiceNav().items} />
    </div>
  );
}
