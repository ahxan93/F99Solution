/** Lightweight route-transition placeholder (shown while a dynamic page streams in). */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="container-page py-24">
      <span className="sr-only">Loading…</span>
      <div className="bg-surface-2 mx-auto h-10 w-2/3 max-w-xl animate-pulse rounded-xl" />
      <div className="bg-surface-2 mx-auto mt-4 h-5 w-1/2 max-w-md animate-pulse rounded-lg" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-surface-2 h-48 animate-pulse rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
