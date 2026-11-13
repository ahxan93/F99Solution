import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/blog";
import { getCaseStudies } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/tools", priority: 0.6 },
    { path: "/tools/roi-calculator", priority: 0.6 },
    { path: "/tools/free-audit", priority: 0.6 },
    { path: "/careers", priority: 0.3 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  const [caseStudies, posts] = [await getCaseStudies(), getAllPosts()];

  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), priority: p.priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.8 })),
    ...caseStudies.map((c) => ({ url: absoluteUrl(`/portfolio/${c.slug}`), priority: 0.6 })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(`${p.updated}T00:00:00Z`),
      priority: 0.6,
    })),
  ];
}
