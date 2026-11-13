"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Newspaper, Search } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SlotFrame, type SlotPhoto } from "@/components/ui/slot-frame";

export function BlogList({
  posts,
  photos,
}: {
  posts: PostMeta[];
  /** Cover photo per post slug (null = branded illustration). */
  photos: Record<string, SlotPhoto | null>;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(posts.map((p) => p.category))], [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCat = category === "All" || p.category === category;
      const inText =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return inCat && inText;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c
                  ? "border-accent bg-accent-solid text-accent-foreground"
                  : "border-border text-muted hover:border-accent hover:text-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <Search
            className="text-muted pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="border-border bg-surface placeholder:text-muted focus:border-accent h-11 w-full rounded-full border pr-4 pl-10 text-sm outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} articles found
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted mt-16 text-center">No articles match your search.</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="border-border bg-surface hover:border-accent/60 group relative flex flex-col overflow-hidden rounded-3xl border transition-colors"
            >
              <SlotFrame
                asset={photos[p.slug]}
                icon={Newspaper}
                overlay="card"
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
                className="aspect-[3/2]"
              />
              <div className="flex flex-1 flex-col p-7">
                <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                  {p.category}
                </span>
                <h2 className="mt-3 text-xl leading-snug font-semibold">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group-hover:text-accent after:absolute after:inset-0"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="text-muted mt-3 text-sm leading-relaxed">{p.description}</p>
                <div className="text-muted mt-auto flex items-center gap-3 pt-6 text-xs">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" /> {p.readingMinutes} min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
