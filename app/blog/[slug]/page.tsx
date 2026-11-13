import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, ListOrdered, Newspaper } from "lucide-react";
import { SlotImage } from "@/components/ui/slot-image";
import { blogSlot } from "@/lib/slot-photos";
import { siteConfig } from "@/config/site";
import { blogSeo } from "@/data/seo-keywords";
import { getAllPosts, getPost, getRelatedPosts, toMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo";
import { mdxComponents } from "@/components/ui/mdx-components";
import { ShareButtons } from "@/components/ui/share-buttons";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const seo = blogSeo[slug] ?? {
    primary: post.title,
    secondary: post.tags,
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
  };
  return buildMetadata(seo, `/blog/${post.slug}`, {
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(toMeta(post)),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="container-page max-w-3xl py-16 md:py-20">
        <Link
          href="/blog"
          className="text-muted hover:text-accent mb-8 inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All digital marketing guides
        </Link>
        <p className="text-accent text-xs font-semibold tracking-widest uppercase">
          {post.category}
        </p>
        <h1 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">{post.title}</h1>
        <p className="text-muted mt-5 text-lg leading-relaxed">{post.description}</p>
        <SlotImage
          slot={blogSlot(post.slug)}
          icon={Newspaper}
          overlay="card"
          preload
          sizes="(min-width: 768px) 768px, 100vw"
          className="border-border mt-8 aspect-[3/2] rounded-3xl border"
        />

        <div className="text-muted mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span>
            By <strong className="text-foreground font-semibold">{post.author}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Published <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" aria-hidden="true" /> {post.readingMinutes} min read
          </span>
        </div>

        <div className="border-border mt-6 border-y py-4">
          <ShareButtons url={url} title={post.title} />
        </div>

        {post.headings.length > 2 && (
          <nav
            aria-labelledby="toc-heading"
            className="border-border bg-surface mt-8 rounded-2xl border p-6"
          >
            <p id="toc-heading" className="flex items-center gap-2 font-semibold">
              <ListOrdered className="text-accent size-4" aria-hidden="true" /> In this guide
            </p>
            <ol className="mt-4 grid list-decimal gap-x-8 gap-y-2 pl-5 text-sm sm:grid-cols-2">
              {post.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-muted hover:text-accent">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-6">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <aside className="border-border bg-surface mt-12 rounded-2xl border p-6">
          <p className="font-semibold">About the author</p>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            Written by the {siteConfig.name} team: specialists in SEO, performance advertising,
            content and web development based in {siteConfig.contact.address.city}. Guides are
            reviewed and updated when platforms or best practice change.{" "}
            <Link href="/about" className="text-accent underline underline-offset-4">
              Meet our digital marketing team
            </Link>
            .
          </p>
        </aside>

        <div className="border-border mt-8 border-t pt-6">
          <ShareButtons url={url} title={post.title} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-page max-w-5xl pb-20">
          <h2 className="mb-6 text-2xl font-bold">More digital marketing guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="border-border bg-surface hover:border-accent/60 rounded-2xl border p-5 transition-colors"
              >
                <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                  {r.category}
                </span>
                <span className="mt-2 block font-semibold">{r.title}</span>
                <span className="text-muted mt-2 block text-xs">{r.readingMinutes} min read</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <FinalCta />
    </>
  );
}
