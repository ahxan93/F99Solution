import fs from "node:fs";
import path from "node:path";
import { imageSlots } from "@/data/image-slots";
import type { SlotPhoto } from "@/components/ui/slot-frame";

/** Tiny navy placeholder shown while an image loads (same colour family as the site). */
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzIDInPjxyZWN0IHdpZHRoPSczJyBoZWlnaHQ9JzInIGZpbGw9JyMwYjE2NDAnLz48L3N2Zz4=";

/**
 * Photo for a slot key (see data/image-slots.ts), or null when its file is not in public/images/
 * yet. Null makes the page show the branded illustration, so a missing file never breaks a page.
 * Runs on the server at build/render time.
 */
export function getSlotPhoto(slot: string): SlotPhoto | null {
  const s = imageSlots[slot];
  if (!s) return null;
  if (!fs.existsSync(path.join(process.cwd(), "public", "images", s.file))) return null;
  return { src: `/images/${s.file}`, alt: s.alt, blurDataURL: BLUR };
}

/** Blog post slug -> image slot key. */
export const blogSlot = (slug: string): string =>
  ({
    "meta-ads-vs-google-ads-india": "blog-meta-vs-google",
    "local-seo-mumbai-guide": "blog-local-seo",
    "digital-marketing-cost-india": "blog-cost",
  })[slug] ?? `blog-${slug}`;

/** Case study slug -> image slot key. */
export const caseSlot = (slug: string): string =>
  ({
    "sample-d2c-fashion-meta-ads": "case-d2c-fashion",
    "sample-local-clinic-seo": "case-clinic",
    "sample-b2b-saas-crm": "case-b2b-saas",
    "sample-real-estate-google-ads": "case-real-estate",
    "sample-restaurant-social-media": "case-restaurant",
    "sample-coaching-website-funnel": "case-coaching",
  })[slug] ?? `case-${slug}`;
