import "server-only";
import type { QueryFilter } from "mongoose";
import { escapeRegex } from "@/lib/admin";
import { leadStatuses, type LeadStatus } from "@/lib/lead-constants";
import { leadSources, type LeadSource } from "@/lib/validators";
import type { LeadDoc } from "@/models/Lead";

export interface LeadFilters {
  q?: string;
  status?: string;
  service?: string;
  source?: string;
  from?: string; // yyyy-mm-dd
  to?: string; // yyyy-mm-dd
}

const isDate = (v?: string): v is string => !!v && /^\d{4}-\d{2}-\d{2}$/.test(v);

/** Builds a Mongo filter from untrusted query-string values (all validated/escaped). */
export function buildLeadFilter(f: LeadFilters): QueryFilter<LeadDoc> {
  const filter: QueryFilter<LeadDoc> = {};

  if (f.status && (leadStatuses as readonly string[]).includes(f.status))
    filter.status = f.status as LeadStatus;
  if (f.source && (leadSources as readonly string[]).includes(f.source))
    filter.source = f.source as LeadSource;
  if (f.service) filter.service = f.service;

  if (isDate(f.from) || isDate(f.to)) {
    const range: { $gte?: Date; $lt?: Date } = {};
    if (isDate(f.from)) range.$gte = new Date(`${f.from}T00:00:00.000Z`);
    if (isDate(f.to))
      range.$lt = new Date(new Date(`${f.to}T00:00:00.000Z`).getTime() + 86_400_000);
    filter.createdAt = range;
  }

  const q = f.q?.trim().slice(0, 100);
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { message: rx }, { website: rx }];
  }
  return filter;
}

export const csvEscape = (v: unknown): string => {
  let s = v === undefined || v === null ? "" : String(v);
  // Neutralise spreadsheet formula injection (=, +, -, @ at the start of a cell).
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};
