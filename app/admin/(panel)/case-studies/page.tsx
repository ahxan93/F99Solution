import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { CaseStudyModel } from "@/models/CaseStudy";

export const metadata: Metadata = { title: "Case studies" };

export default async function CaseStudiesAdminPage() {
  await requireAdmin();
  const rows = await CaseStudyModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Case studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="bg-accent-solid text-accent-foreground inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
        >
          <Plus className="size-4" aria-hidden="true" /> New
        </Link>
      </div>
      <p className="text-muted text-sm">
        While none are published here, the website shows the sample case studies from{" "}
        <code>data/case-studies.ts</code>. Publishing even one replaces them.
      </p>
      <ul className="space-y-3">
        {rows.length === 0 && <li className="text-muted text-sm">No case studies yet.</li>}
        {rows.map((c) => (
          <li key={String(c._id)}>
            <Link
              href={`/admin/case-studies/${c._id}`}
              className="border-border bg-surface hover:border-accent/60 flex items-center justify-between gap-4 rounded-2xl border p-5"
            >
              <span className="min-w-0">
                <span className="block truncate font-semibold">{c.title}</span>
                <span className="text-muted text-sm">
                  {c.client} · {c.serviceLabel}
                </span>
              </span>
              <span className="text-muted shrink-0 text-xs">
                {c.published ? "Published" : "Hidden"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
