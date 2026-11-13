/**
 * Photo credits for the stock photos in public/images/. Written by `npm run images:fetch`
 * (scripts/fetch-images.ts), keyed by slot key (see data/image-slots.ts). A slot shows a photo only
 * when it has an entry here AND its file exists. `alt` describes what the photo actually shows;
 * edit it by hand after reviewing the photo.
 */
export interface ImageCredit {
  /** Pexels photo id (each id is used for one slot only). */
  id: number;
  photographer: string;
  photographerUrl: string;
  /** Pexels page of the photo. */
  url: string;
  /** What the photo shows (reviewed). */
  alt: string;
  /** Tiny WebP data URI used as the blur placeholder. */
  blur: string;
  /** Search query that found it. */
  query: string;
}

export const imageCredits: Record<string, ImageCredit> = {};
