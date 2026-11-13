"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { TestimonialItem } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/** Testimonials come from the DB, or SAMPLE fallback data (see lib/content.ts). */
export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, reduce, count]);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const t = testimonials[index];

  return (
    <section
      className="container-page py-24"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SectionHeading eyebrow="Testimonials" title="What clients say" />
      <div className="border-border bg-surface relative mx-auto mt-12 max-w-3xl rounded-[2rem] border p-8 md:p-12">
        <Quote className="text-accent/30 absolute top-6 left-6 size-10" aria-hidden="true" />
        <div aria-live="polite" className="relative min-h-[11rem]">
          <>
            <figure key={index} className="animate-testimonial pt-8 text-center">
              <blockquote className="text-lg leading-relaxed md:text-xl">“{t.quote}”</blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold">{t.name}</p>
                <p className="text-muted text-sm">{t.role}</p>
              </figcaption>
            </figure>
          </>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="border-border hover:border-accent hover:text-accent grid size-10 place-items-center rounded-full border"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="grid size-6 place-items-center"
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "bg-accent w-6" : "bg-border w-2",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="border-border hover:border-accent hover:text-accent grid size-10 place-items-center rounded-full border"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
