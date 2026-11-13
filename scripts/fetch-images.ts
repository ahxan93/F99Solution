// Fills every image slot in data/image-slots.ts with a real stock photo from Pexels.
//   npm run images:fetch                 all missing slots, in priority order
//   npm run images:fetch -- --only=seo-card,home-cta
//   npm run images:fetch -- --dry        list slots / queries only (no API key needed)
// Needs PEXELS_API_KEY in .env.local. Existing files (with a credit entry) are skipped, so re-running
// is safe. To REPLACE a photo: delete its file in public/images/, add its Pexels id to
// scripts/image-rejects.json, run again. Each Pexels photo is used for one slot only.
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { slotList, type ImageSlot } from "../data/image-slots.ts";
import { imageCredits, type ImageCredit } from "../data/image-credits.ts";

const KEY = process.env.PEXELS_API_KEY;
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args
  .find((a) => a.startsWith("--only="))
  ?.slice(7)
  .split(",");
const OUT = path.join("public", "images");
const CREDITS_FILE = path.join("data", "image-credits.ts");
const REJECTS_FILE = path.join("scripts", "image-rejects.json");
const DELAY_MS = 1000;
const QUALITY = 75;
const SIZE_PX = { card: [1536, 1024], wide: [2400, 1600] } as const;

/** Alt-text words that suggest a logo, readable text, a sign or a brand: skip those candidates. */
const BAD_ALT =
  /logo|brand name|sign\b|signage|billboard|poster|banner|newspaper|magazine|watermark|neon|text on|letters|lettering|typography|trademark|iphone|apple|samsung|google|facebook|instagram|whatsapp|meta\b/i;

/** Priority: service cards, home, contact, about, blog, case studies, then service hero + support. */
const rank = (s: ImageSlot): number => {
  if (s.key.endsWith("-card")) return 0;
  if (s.key.startsWith("home-")) return 1;
  if (s.key.startsWith("contact-")) return 2;
  if (s.key.startsWith("about-")) return 3;
  if (s.key.startsWith("blog-")) return 4;
  if (s.key.startsWith("case-")) return 5;
  return 6; // -hero, -support
};
const queue = slotList
  .map((s, i) => ({ s, i }))
  .sort((a, b) => rank(a.s) - rank(b.s) || a.i - b.i)
  .map((x) => x.s)
  .filter((s) => !only || only.includes(s.key));

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  alt: string;
  src: { original: string };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function search(query: string): Promise<PexelsPhoto[]> {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("size", "large");
  url.searchParams.set("per_page", "30");
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { Authorization: KEY! } });
    if (res.status === 429) {
      await sleep(5000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`Pexels ${res.status} ${res.statusText}`);
    return ((await res.json()) as { photos: PexelsPhoto[] }).photos;
  }
  throw new Error("Pexels rate limit: try again later");
}

async function writeCredits(c: Record<string, ImageCredit>) {
  const head = (await readFile(CREDITS_FILE, "utf8")).split("export const imageCredits")[0];
  await writeFile(
    CREDITS_FILE,
    `${head}export const imageCredits: Record<string, ImageCredit> = ${JSON.stringify(c, null, 2)};\n`,
  );
}

async function main() {
  if (dry) {
    queue.forEach((s, n) =>
      console.log(`${String(n + 1).padStart(2)}. [${s.key}] "${s.query}" -> ${s.file}`),
    );
    console.log(`\n${queue.length} slots.`);
    return;
  }
  if (!KEY) {
    console.error(
      "PEXELS_API_KEY is not set. Add it to .env.local (project root) and run: npm run images:fetch",
    );
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });
  const rejects: number[] = existsSync(REJECTS_FILE)
    ? JSON.parse(await readFile(REJECTS_FILE, "utf8"))
    : [];
  const credits: Record<string, ImageCredit> = { ...imageCredits };
  const used = new Set<number>([...Object.values(credits).map((c) => c.id), ...rejects]);

  let done = 0;
  let skipped = 0;
  const failed: string[] = [];
  for (const slot of queue) {
    const file = path.join(OUT, slot.file);
    if (existsSync(file) && credits[slot.key]) {
      skipped++;
      continue;
    }
    try {
      const photos = await search(slot.query);
      await sleep(DELAY_MS);
      const [w, h] = SIZE_PX[slot.size];
      const pick = photos.find(
        (p) =>
          !used.has(p.id) &&
          p.width >= w &&
          p.width / p.height >= 1.3 &&
          !BAD_ALT.test(p.alt ?? ""),
      );
      if (!pick) throw new Error(`no usable result for "${slot.query}"`);
      const img = await fetch(`${pick.src.original}?auto=compress&cs=tinysrgb&w=${w}`);
      if (!img.ok) throw new Error(`download ${img.status}`);
      const buf = Buffer.from(await img.arrayBuffer());
      const info = await sharp(buf)
        .rotate()
        .resize({ width: w, height: h, fit: "cover", position: "attention", withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(file);
      const blur = (
        await sharp(buf).rotate().resize(16, 11, { fit: "cover" }).webp({ quality: 40 }).toBuffer()
      ).toString("base64");
      credits[slot.key] = {
        id: pick.id,
        photographer: pick.photographer,
        photographerUrl: pick.photographer_url,
        url: pick.url,
        alt: (pick.alt || "").trim() || `Stock photo: ${slot.query}`,
        blur: `data:image/webp;base64,${blur}`,
        query: slot.query,
      };
      used.add(pick.id);
      await writeCredits(credits); // save after every photo so an interrupted run loses nothing
      done++;
      console.log(
        `ok   ${slot.key}: ${pick.id} ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB  "${pick.alt}"`,
      );
    } catch (e) {
      failed.push(slot.key);
      console.warn(`FAIL ${slot.key}: ${(e as Error).message}`);
    }
    await sleep(DELAY_MS);
  }
  console.log(
    `\nDownloaded ${done}, skipped ${skipped} (already present), failed ${failed.length}${failed.length ? ": " + failed.join(", ") : ""}`,
  );
}

await main();
