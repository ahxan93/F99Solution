"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig, whatsappLink } from "@/config/site";

/** Segment-level error boundary: shown inside the site layout when a page throws. */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-bold md:text-4xl">Something went wrong</h1>
      <p className="text-muted mt-3 max-w-md">
        An unexpected error occurred while loading this page. You can try again, or reach us
        directly and we&apos;ll help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="bg-accent-solid text-accent-foreground inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-border hover:border-accent inline-flex h-12 items-center rounded-full border px-7 text-sm font-semibold"
        >
          Back to home
        </Link>
      </div>
      <p className="text-muted mt-8 text-sm">
        Or email{" "}
        <a className="text-accent underline" href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        /{" "}
        <a className="text-accent underline" href={whatsappLink()}>
          WhatsApp
        </a>
      </p>
    </section>
  );
}
