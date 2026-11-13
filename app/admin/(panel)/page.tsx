import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { formatDate } from "@/lib/format";
import { Lead } from "@/models/Lead";
import type { LeadStatus } from "@/lib/lead-constants";
import { BarList } from "@/components/admin/bar-list";
import { StatusBadge } from "@/components/admin/status-badge";

export default async function DashboardPage() {
  await requireAdmin();

  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 86_400_000);
  today.setUTCHours(23, 59, 59, 999);

  const [total, thisWeek, newCount, won, byService, bySource, recent, followUps] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: weekAgo } }),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "won" }),
      Lead.aggregate<{ _id: string | null; n: number }>([
        { $group: { _id: "$service", n: { $sum: 1 } } },
        { $sort: { n: -1 } },
        { $limit: 8 },
      ]),
      Lead.aggregate<{ _id: string; n: number }>([
        { $group: { _id: "$source", n: { $sum: 1 } } },
        { $sort: { n: -1 } },
      ]),
      Lead.find().sort({ createdAt: -1 }).limit(6).lean(),
      Lead.find({ followUpDate: { $lte: today }, status: { $nin: ["won", "lost"] } })
        .sort({ followUpDate: 1 })
        .limit(6)
        .lean(),
    ]);

  const cards = [
    { label: "Total leads", value: total },
    { label: "Leads this week", value: thisWeek },
    { label: "New (uncontacted)", value: newCount },
    { label: "Won", value: won },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="border-border bg-surface rounded-2xl border p-5">
            <dt className="text-muted text-sm">{c.label}</dt>
            <dd className="font-display mt-1 text-4xl font-bold">{c.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5 lg:grid-cols-2">
        <BarList
          title="Leads by service"
          items={byService.map((r) => ({ label: r._id || "Not specified", value: r.n }))}
        />
        <BarList
          title="Leads by source"
          items={bySource.map((r) => ({ label: r._id, value: r.n }))}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="border-border bg-surface rounded-2xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent leads</h2>
            <Link href="/admin/leads" className="text-accent text-sm hover:underline">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-muted mt-4 text-sm">No leads yet.</p>
          ) : (
            <ul className="divide-border mt-3 divide-y">
              {recent.map((l) => (
                <li key={String(l._id)}>
                  <Link
                    href={`/admin/leads/${l._id}`}
                    className="hover:bg-surface-2 -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {l.name || l.email}
                      </span>
                      <span className="text-muted block text-xs">
                        {l.source} · {formatDate(l.createdAt.toISOString().slice(0, 10))}
                      </span>
                    </span>
                    <StatusBadge status={l.status as LeadStatus} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border-border bg-surface rounded-2xl border p-6">
          <h2 className="font-semibold">Follow-ups due</h2>
          {followUps.length === 0 ? (
            <p className="text-muted mt-4 text-sm">
              Nothing due. Set follow-up dates on leads to see them here.
            </p>
          ) : (
            <ul className="divide-border mt-3 divide-y">
              {followUps.map((l) => (
                <li key={String(l._id)}>
                  <Link
                    href={`/admin/leads/${l._id}`}
                    className="hover:bg-surface-2 -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3"
                  >
                    <span className="truncate text-sm font-medium">{l.name || l.email}</span>
                    <span className="text-danger shrink-0 text-xs font-semibold">
                      Due{" "}
                      {l.followUpDate ? formatDate(l.followUpDate.toISOString().slice(0, 10)) : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
