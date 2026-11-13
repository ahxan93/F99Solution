import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { formatDate } from "@/lib/format";
import type { LeadStatus } from "@/lib/lead-constants";
import { Lead } from "@/models/Lead";
import { LeadEditor } from "@/components/admin/lead-editor";
import { StatusBadge } from "@/components/admin/status-badge";

export const metadata: Metadata = { title: "Lead" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  const lead = await Lead.findById(id).lean();
  if (!lead) notFound();

  const phoneDigits = lead.phone?.replace(/\D/g, "");
  const details =
    lead.details && typeof lead.details === "object"
      ? Object.entries(lead.details as Record<string, unknown>)
      : [];

  const fields: [string, string | undefined][] = [
    ["Source", lead.source],
    ["Service", lead.service ?? undefined],
    ["Budget", lead.budget ?? undefined],
    ["Website", lead.website ?? undefined],
    ["Business type", lead.businessType ?? undefined],
    ["Received", formatDate(lead.createdAt.toISOString().slice(0, 10))],
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/admin/leads"
        className="text-muted hover:text-accent inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All leads
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{lead.name || lead.email}</h1>
          <div className="text-muted mt-2 flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${lead.email}`}
              className="hover:text-accent inline-flex items-center gap-1.5"
            >
              <Mail className="size-4" aria-hidden="true" /> {lead.email}
            </a>
            {lead.phone && (
              <>
                <a
                  href={`tel:${lead.phone}`}
                  className="hover:text-accent inline-flex items-center gap-1.5"
                >
                  <Phone className="size-4" aria-hidden="true" /> {lead.phone}
                </a>
                <a
                  href={`https://wa.me/${phoneDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
        <StatusBadge status={lead.status as LeadStatus} />
      </header>

      <dl className="border-border bg-surface grid gap-4 rounded-2xl border p-5 sm:grid-cols-2">
        {fields
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted text-xs uppercase">{k}</dt>
              <dd className="mt-0.5 text-sm font-medium break-words">{v}</dd>
            </div>
          ))}
        {lead.message && (
          <div className="sm:col-span-2">
            <dt className="text-muted text-xs uppercase">Message</dt>
            <dd className="mt-0.5 text-sm whitespace-pre-wrap">{lead.message}</dd>
          </div>
        )}
        {details.length > 0 && (
          <div className="sm:col-span-2">
            <dt className="text-muted text-xs uppercase">Calculator details</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {details.map(([k, v]) => (
                <span key={k} className="bg-surface-2 rounded-lg px-2.5 py-1 text-xs">
                  {k}: <strong>{String(v)}</strong>
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      <LeadEditor
        id={String(lead._id)}
        initialStatus={lead.status as LeadStatus}
        initialFollowUp={lead.followUpDate ? lead.followUpDate.toISOString().slice(0, 10) : ""}
        initialNotes={(lead.notes ?? []).map((n) => ({
          id: String(n._id),
          text: n.text,
          createdAt: n.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
