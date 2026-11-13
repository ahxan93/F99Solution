"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { leadStatuses, leadStatusLabels, type LeadStatus } from "@/lib/lead-constants";
import { inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

interface Note {
  id: string;
  text: string;
  createdAt: string;
}

interface LeadEditorProps {
  id: string;
  initialStatus: LeadStatus;
  initialFollowUp: string; // yyyy-mm-dd or ""
  initialNotes: Note[];
}

export function LeadEditor({ id, initialStatus, initialFollowUp, initialNotes }: LeadEditorProps) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [followUp, setFollowUp] = useState(initialFollowUp);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [noteText, setNoteText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function patch(body: Record<string, unknown>, okText: string) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { error?: string; notes?: Note[] };
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      if (data.notes) setNotes(data.notes);
      setMsg({ type: "ok", text: okText });
      router.refresh();
      return true;
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "Update failed" });
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this lead permanently?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/leads");
      router.refresh();
    } else {
      setBusy(false);
      setMsg({ type: "err", text: "Could not delete the lead" });
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-border bg-surface grid gap-4 rounded-2xl border p-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="lead-status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="lead-status"
            value={status}
            disabled={busy}
            onChange={(e) => {
              const next = e.target.value as LeadStatus;
              setStatus(next);
              void patch({ status: next }, "Status updated");
            }}
            className={inputClass}
          >
            {leadStatuses.map((s) => (
              <option key={s} value={s}>
                {leadStatusLabels[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-followup" className="text-sm font-medium">
            Follow-up date
          </label>
          <div className="flex gap-2">
            <input
              id="lead-followup"
              type="date"
              value={followUp}
              disabled={busy}
              onChange={(e) => setFollowUp(e.target.value)}
              className={inputClass}
            />
            <Button
              type="button"
              size="md"
              variant="outline"
              disabled={busy}
              onClick={() =>
                patch(
                  { followUpDate: followUp || null },
                  followUp ? "Follow-up saved" : "Follow-up cleared",
                )
              }
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <section className="border-border bg-surface rounded-2xl border p-5">
        <h2 className="font-semibold">Notes</h2>
        <form
          className="mt-3 space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!noteText.trim()) return;
            if (await patch({ addNote: noteText.trim() }, "Note added")) setNoteText("");
          }}
        >
          <label htmlFor="lead-note" className="sr-only">
            Add a note
          </label>
          <textarea
            id="lead-note"
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Call summary, quote details, next steps…"
            className={`${inputClass} h-auto py-3`}
          />
          <Button type="submit" size="sm" disabled={busy || !noteText.trim()}>
            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : "Add note"}
          </Button>
        </form>
        <ul className="divide-border mt-4 divide-y">
          {notes.length === 0 && <li className="text-muted py-2 text-sm">No notes yet.</li>}
          {[...notes].reverse().map((n) => (
            <li key={n.id} className="flex items-start justify-between gap-3 py-3">
              <div>
                <p className="text-sm whitespace-pre-wrap">{n.text}</p>
                <p className="text-muted mt-1 text-xs">{formatDate(n.createdAt.slice(0, 10))}</p>
              </div>
              <button
                type="button"
                aria-label="Delete note"
                disabled={busy}
                onClick={() => patch({ removeNoteId: n.id }, "Note removed")}
                className="text-muted hover:text-danger p-1"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center justify-between">
        <p
          role="status"
          className={msg?.type === "err" ? "text-danger text-sm" : "text-success text-sm"}
        >
          {msg?.text}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={remove}
          disabled={busy}
          className="text-danger"
        >
          <Trash2 className="size-4" aria-hidden="true" /> Delete lead
        </Button>
      </div>
    </div>
  );
}
