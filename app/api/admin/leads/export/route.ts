import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { buildLeadFilter, csvEscape } from "@/lib/admin-queries";
import { leadStatusLabels, type LeadStatus } from "@/lib/lead-constants";
import { Lead } from "@/models/Lead";

export const runtime = "nodejs";

/** CSV export honouring the same filters as the leads table. */
export async function GET(req: Request) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const sp = new URL(req.url).searchParams;
  const filter = buildLeadFilter({
    q: sp.get("q") ?? undefined,
    status: sp.get("status") ?? undefined,
    service: sp.get("service") ?? undefined,
    source: sp.get("source") ?? undefined,
    from: sp.get("from") ?? undefined,
    to: sp.get("to") ?? undefined,
  });

  const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(10_000).lean();

  const header = [
    "Date",
    "Name",
    "Email",
    "Phone",
    "Source",
    "Service",
    "Budget",
    "Website",
    "Status",
    "Follow-up",
    "Message",
    "Notes",
  ];
  const rows = leads.map((l) =>
    [
      l.createdAt.toISOString(),
      l.name,
      l.email,
      l.phone,
      l.source,
      l.service,
      l.budget,
      l.website,
      leadStatusLabels[l.status as LeadStatus] ?? l.status,
      l.followUpDate?.toISOString().slice(0, 10),
      l.message,
      (l.notes ?? []).map((n) => n.text).join(" | "),
    ]
      .map(csvEscape)
      .join(","),
  );

  // BOM so Excel opens UTF-8 (₹ symbols etc.) correctly.
  const csv = "﻿" + [header.map(csvEscape).join(","), ...rows].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
