import type { Metadata } from "next";
import type { PageSeo } from "@/data/seo-keywords";

/**
 * Builds the <head> metadata for a page from the single SEO plan in data/seo-keywords.ts:
 * exact title (absolute, so the root layout's template is not appended again), meta description,
 * keywords, canonical URL, and Open Graph / Twitter tags.
 *
 * The share image is passed explicitly: when a page defines its own `openGraph`, Next does not
 * inherit the root `opengraph-image` file automatically.
 */
export function buildMetadata(
  seo: Pick<PageSeo, "title" | "description" | "primary" | "secondary">,
  path: string,
  extra: { type?: "website" | "article"; publishedTime?: string; modifiedTime?: string } = {},
): Metadata {
  const images = [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "F99 Solution: digital marketing agency in Mumbai",
    },
  ];
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: [seo.primary, ...seo.secondary],
    alternates: { canonical: path },
    openGraph: {
      type: extra.type ?? "website",
      url: path,
      title: seo.title,
      description: seo.description,
      images,
      ...(extra.publishedTime ? { publishedTime: extra.publishedTime } : {}),
      ...(extra.modifiedTime ? { modifiedTime: extra.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/opengraph-image"],
    },
  };
}
