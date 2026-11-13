import { leadStatusLabels, type LeadStatus } from "@/lib/lead-constants";
import { cn } from "@/lib/utils";

const tone: Record<LeadStatus, string> = {
  new: "bg-accent/15 text-accent",
  contacted: "bg-amber-500/15 text-amber-500",
  "proposal-sent": "bg-purple-500/15 text-purple-400",
  won: "bg-success/15 text-success",
  lost: "bg-danger/15 text-danger",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold", tone[status])}
    >
      {leadStatusLabels[status] ?? status}
    </span>
  );
}
