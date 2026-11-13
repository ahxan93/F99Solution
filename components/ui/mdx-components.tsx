import type { ComponentProps } from "react";
import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { slugify } from "@/lib/slug";

type Components = NonNullable<MDXRemoteProps["components"]>;

/** Tailwind-styled element mapping for MDX content (no typography plugin needed). */
export const mdxComponents: Components = {
  // Headings get stable anchor ids (same slug function as the table of contents) and scroll offset for the fixed navbar.
  h2: ({ children, ...p }: ComponentProps<"h2">) => (
    <h2
      id={slugify(String(children))}
      className="mt-12 mb-4 scroll-mt-28 text-2xl font-bold md:text-3xl"
      {...p}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...p }: ComponentProps<"h3">) => (
    <h3
      id={slugify(String(children))}
      className="mt-8 mb-3 scroll-mt-28 text-xl font-semibold"
      {...p}
    >
      {children}
    </h3>
  ),
  table: (p: ComponentProps<"table">) => (
    <div className="border-border my-8 overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-base" {...p} />
    </div>
  ),
  th: (p: ComponentProps<"th">) => (
    <th className="bg-surface-2 border-border border-b px-4 py-3 text-sm font-semibold" {...p} />
  ),
  td: (p: ComponentProps<"td">) => (
    <td className="text-muted border-border border-b px-4 py-3 align-top text-sm" {...p} />
  ),
  p: (p: ComponentProps<"p">) => <p className="text-muted my-5 text-lg leading-8" {...p} />,
  ul: (p: ComponentProps<"ul">) => (
    <ul className="text-muted my-5 list-disc space-y-2 pl-6 text-lg leading-8" {...p} />
  ),
  ol: (p: ComponentProps<"ol">) => (
    <ol className="text-muted my-5 list-decimal space-y-2 pl-6 text-lg leading-8" {...p} />
  ),
  li: (p: ComponentProps<"li">) => <li className="pl-1" {...p} />,
  strong: (p: ComponentProps<"strong">) => (
    <strong className="text-foreground font-semibold" {...p} />
  ),
  blockquote: (p: ComponentProps<"blockquote">) => (
    <blockquote className="border-accent text-muted my-6 border-l-4 pl-5 italic" {...p} />
  ),
  a: ({ href = "", ...rest }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link
        href={href}
        className="text-accent font-medium underline underline-offset-4"
        {...rest}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent font-medium underline underline-offset-4"
        {...rest}
      />
    ),
  hr: () => <hr className="border-border my-10" />,
};
