interface BarListProps {
  title: string;
  items: { label: string; value: number }[];
  emptyText?: string;
}

/** Accessible horizontal bar chart (CSS only). */
export function BarList({ title, items, emptyText = "No data yet" }: BarListProps) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <section className="border-border bg-surface rounded-2xl border p-6">
      <h2 className="font-semibold">{title}</h2>
      {items.length === 0 ? (
        <p className="text-muted mt-4 text-sm">{emptyText}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i.label}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="truncate">{i.label}</span>
                <span className="font-semibold">{i.value}</span>
              </div>
              <div className="bg-surface-2 h-2 overflow-hidden rounded-full" aria-hidden="true">
                <div
                  className="bg-accent h-full rounded-full"
                  style={{ width: `${(i.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
