"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { FormField, inputClass } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

export interface TestimonialRow {
  id: string;
  quote: string;
  name: string;
  role: string;
  published: boolean;
  order: number;
}

const empty = { quote: "", name: "", role: "", published: true, order: 0 };

export function TestimonialManager({ items }: { items: TestimonialRow[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (t: TestimonialRow) => {
    setEditingId(t.id);
    setForm({ quote: t.quote, name: t.name, role: t.role, published: t.published, order: t.order });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancel = () => {
    setEditingId(null);
    setForm(empty);
    setError(null);
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(
        editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not save");
      cancel();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={save} className="border-border bg-surface space-y-4 rounded-2xl border p-5">
        <h2 className="font-semibold">{editingId ? "Edit testimonial" : "Add testimonial"}</h2>
        <FormField label="Quote" htmlFor="t-quote" required>
          <textarea
            id="t-quote"
            rows={3}
            required
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className={`${inputClass} h-auto py-3`}
          />
        </FormField>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Client name" htmlFor="t-name" required>
            <input
              id="t-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </FormField>
          <FormField label="Role / company" htmlFor="t-role">
            <input
              id="t-role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inputClass}
            />
          </FormField>
          <FormField label="Sort order" htmlFor="t-order" hint="Lower numbers appear first">
            <input
              id="t-order"
              type="number"
              min={0}
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 0 })}
              className={inputClass}
            />
          </FormField>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="size-4 accent-[var(--accent)]"
          />
          Published on the website
        </label>
        {error && (
          <p role="alert" className="text-danger text-sm">
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <Button type="submit" disabled={busy}>
            {busy ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : editingId ? (
              "Save changes"
            ) : (
              "Add testimonial"
            )}
          </Button>
          {editingId && (
            <Button type="button" variant="ghost" onClick={cancel}>
              Cancel
            </Button>
          )}
        </div>
        <p className="text-muted text-xs">
          Only add real testimonials you have permission to publish. Once any are published here,
          they replace the sample ones on the site.
        </p>
      </form>

      <ul className="space-y-3">
        {items.length === 0 && (
          <li className="text-muted text-sm">
            No testimonials yet — the site is showing sample placeholders.
          </li>
        )}
        {items.map((t) => (
          <li
            key={t.id}
            className="border-border bg-surface flex items-start justify-between gap-4 rounded-2xl border p-5"
          >
            <div className="min-w-0">
              <p className="text-sm">“{t.quote}”</p>
              <p className="mt-2 text-sm font-semibold">
                {t.name} <span className="text-muted font-normal">{t.role && `· ${t.role}`}</span>
              </p>
              <p className="text-muted mt-1 text-xs">
                {t.published ? "Published" : "Hidden"} · order {t.order}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label={`Edit ${t.name}`}
                onClick={() => startEdit(t)}
                className="hover:text-accent p-2"
              >
                <Pencil className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${t.name}`}
                onClick={() => remove(t.id)}
                className="hover:text-danger p-2"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
