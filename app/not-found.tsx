import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-gradient text-8xl font-bold md:text-9xl" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">This page wandered off</h1>
      <p className="text-muted mt-3 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="outline">
          Contact us
        </ButtonLink>
      </div>
      <ul className="text-muted mt-10 flex max-w-xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        {services.slice(0, 6).map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="hover:text-accent underline-offset-4 hover:underline"
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
