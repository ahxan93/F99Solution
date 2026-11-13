import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { buildLeadFilter, type LeadFilters } from "@/lib/admin-queries";
import { leadSources } from "@/lib/validators";
import { leadStatuses, leadStatusLabels, type LeadStatus } from "@/lib/lead-constants";
import { formatDate } from "@/lib/format";
import { Lead } from "@/models/Lead";
import { StatusBadge } from "@/components/admin/status-badge";
import { inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Leads" };

const PAGE_SIZE = 20;

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

export default async function LeadsPage({ searchParams }: { searchParams: SP }) {
  await requireAdmin();
  const sp = await searchParams;

  const filters: LeadFilters = {
    q: one(sp.q),
    status: one(sp.status),
    service: one(sp.service),
    source: one(sp.source),
    from: one(sp.from),
    to: one(sp.to),
  };
  const filter = buildLeadFilter(filters);
  const page = Math.max(1, parseInt(one(sp.page) ?? "1", 10) || 1);

  const [total, leads, services] = await Promise.all([
    Lead.countDocuments(filter),
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    Lead.distinct("service"),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Preserve active filters in pagination / export links.
  const qs = (extra: Record<string, string>) => {
    const p = new URLSearchParams();
    Object.entries({ ...filters, ...extra }).forEach(([k, v]) => v && p.set(k, v));
    return p.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          Leads <span className="text-muted text-lg font-normal">({total})</span>
        </h1>
        <a
          href={`/api/admin/leads/export?${qs({})}`}
          className="border-border hover:border-accent hover:text-accent inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium"
        >
          <Download className="size-4" aria-hidden="true" /> Export CSV
        </a>
      </div>

      {/* Plain GET form: filters live in the URL, no client JS needed */}
      <form
        method="get"
        className="border-border bg-surface grid gap-3 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        <input
          name="q"
          defaultValue={filters.q}
          placeholder="Search name, email, phone…"
          aria-label="Search"
          className={`${inputClass} lg:col-span-2`}
        />
        <select
          name="status"
          defaultValue={filters.status ?? ""}
          aria-label="Status"
          className={inputClass}
        >
          <option value="">All statuses</option>
          {leadStatuses.map((s) => (
            <option key={s} value={s}>
              {leadStatusLabels[s]}
            </option>
          ))}
        </select>
        <select
          name="service"
          defaultValue={filters.service ?? ""}
          aria-label="Service"
          className={inputClass}
        >
          <option value="">All services</option>
          {services.filter(Boolean).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          name="source"
          defaultValue={filters.source ?? ""}
          aria-label="Source"
          className={inputClass}
        >
          <option value="">All sources</option>
          {leadSources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            name="from"
            defaultValue={filters.from}
            aria-label="From date"
            className={inputClass}
          />
          <input
            type="date"
            name="to"
            defaultValue={filters.to}
            aria-label="To date"
            className={inputClass}
          />
        </div>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-6">
          <Button type="submit" size="sm">
            Apply filters
          </Button>
          <Link
            href="/admin/leads"
            className="text-muted hover:text-accent inline-flex h-9 items-center px-3 text-sm"
          >
            Reset
          </Link>
        </div>
      </form>

      <div className="border-border bg-surface overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="border-border text-muted border-b text-xs uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">
                Date
              </th>
              <th scope="col" className="px-4 py-3">
                Contact
              </th>
              <th scope="col" className="px-4 py-3">
                Source
              </th>
              <th scope="col" className="px-4 py-3">
                Service
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Follow-up
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="text-muted px-4 py-10 text-center">
                  No leads match these filters.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={String(l._id)} className="hover:bg-surface-2">
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatDate(l.createdAt.toISOString().slice(0, 10))}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/leads/${l._id}`}
                    className="text-accent font-medium hover:underline"
                  >
                    {l.name || l.email}
                  </Link>
                  {l.name && <span className="text-muted block text-xs">{l.email}</span>}
                </td>
                <td className="px-4 py-3">{l.source}</td>
                <td className="px-4 py-3">{l.service || "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={l.status as LeadStatus} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {l.followUpDate ? formatDate(l.followUpDate.toISOString().slice(0, 10)) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link
              href={`/admin/leads?${qs({ page: String(page - 1) })}`}
              className="text-accent hover:underline"
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link
              href={`/admin/leads?${qs({ page: String(page + 1) })}`}
              className="text-accent hover:underline"
            >
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
