import type { Metadata } from "next";
import { pageSeo } from "@/data/seo-keywords";
import { buildMetadata } from "@/lib/metadata";
import { getAllPosts, toMeta } from "@/lib/blog";
import { PageHero } from "@/components/sections/page-hero";
import { getSlotPhoto, blogSlot } from "@/lib/slot-photos";
import { BlogList } from "@/components/sections/blog-list";

export const metadata: Metadata = buildMetadata(pageSeo["/blog"], "/blog");

export default function BlogPage() {
  const posts = getAllPosts().map(toMeta);
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Digital marketing blog for <span className="text-gradient">Indian businesses</span>
          </>
        }
        description="Our digital marketing blog for India publishes in-depth guides on SEO, Meta Ads, Google Ads and pricing, written by our team of specialists in Mumbai."
      />
      <section className="container-page relative pb-24">
        <BlogList
          posts={posts}
          photos={Object.fromEntries(posts.map((p) => [p.slug, getSlotPhoto(blogSlot(p.slug))]))}
        />
      </section>
    </>
  );
}
