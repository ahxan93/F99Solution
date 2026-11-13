import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/slug";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** Published date, ISO yyyy-mm-dd. */
  date: string;
  /** Last substantive update, ISO yyyy-mm-dd (falls back to the published date). */
  updated: string;
  category: string;
  tags: string[];
  author: string;
  readingMinutes: number;
}

export interface Heading {
  id: string;
  text: string;
}

export interface Post extends PostMeta {
  content: string;
  /** H2 headings, for the table of contents. */
  headings: Heading[];
}

const WORDS_PER_MINUTE = 200;

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function isoDate(v: unknown): string {
  return v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? "");
}

function extractHeadings(content: string): Heading[] {
  return content
    .split(/\r?\n/)
    .map((line) => /^##\s+(.+?)\s*$/.exec(line)?.[1])
    .filter((t): t is string => Boolean(t))
    .map((text) => ({ id: slugify(text), text }));
}

function parse(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const date = isoDate(data.date);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date,
    updated: data.updated ? isoDate(data.updated) : date,
    category: String(data.category ?? "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? siteConfig.blogAuthor),
    readingMinutes: readingMinutes(content),
    content,
    headings: extractHeadings(content),
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Strip the heavy `content` field for client components. */
export const toMeta = ({ content: _content, headings: _headings, ...meta }: Post): PostMeta => {
  void _content;
  void _headings;
  return meta;
};
