// Fills image slots in data/image-slots.ts with real stock photos from Pixabay.
//   npm run images:fetch                 all slots without a Pixabay photo, in priority order
//   npm run images:fetch -- --only=seo-card,home-cta
//   npm run images:fetch -- --dry        list slots / queries only (no API key needed)
// Needs PIXABAY_API_KEY in .env.local (never commit it). Each photo is downloaded to our own server
// (Pixabay forbids hotlinking) into public/images/new/<slot name>.jpg, then scripts/images-sync.ts
// converts it to the slot's size as WebP, replaces the illustration and regenerates the blur data.
// Slots that already have a credit are skipped, so re-running is safe.
// To REPLACE a photo: add its Pixabay id to scripts/image-rejects.json, delete its credit entry in
// data/image-credits.ts, restore the illustration (git checkout) or leave it, and run again.
// Each Pixabay photo is used for one slot only.
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { slotList, type ImageSlot } from "../data/image-slots.ts";
import { imageCredits, type ImageCredit } from "../data/image-credits.ts";

const KEY = process.env.PIXABAY_API_KEY;
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args
  .find((a) => a.startsWith("--only="))
  ?.slice(7)
  .split(",");
const NEW_DIR = path.join("public", "images", "new");
const CREDITS_FILE = path.join("data", "image-credits.ts");
const REJECTS_FILE = path.join("scripts", "image-rejects.json");
const DELAY_MS = 1500;

/** Tags/description words that suggest a logo, readable text or a brand: skip those candidates. */
const BAD =
  /logo|brand name|sign\b|signage|billboard|poster|banner|newspaper|magazine|watermark|neon|lettering|typography|trademark|iphone|apple|samsung|google|facebook|instagram|whatsapp|youtube|twitter|linkedin|meta\b|cartoon|illustration|vector|3d render|clipart|icon/i;

/** Priority: service cards, home, contact, blog, case studies, about, then service hero + support. */
const rank = (s: ImageSlot): number => {
  if (s.key.endsWith("-card")) return 0;
  if (s.key.startsWith("home-")) return 1;
  if (s.key.startsWith("contact-")) return 2;
  if (s.key.startsWith("blog-")) return 3;
  if (s.key.startsWith("case-")) return 4;
  if (s.key.startsWith("about-")) return 5;
  return 6; // -hero, -support
};
const queue = slotList
  .map((s, i) => ({ s, i }))
  .sort((a, b) => rank(a.s) - rank(b.s) || a.i - b.i)
  .map((x) => x.s)
  .filter((s) => !only || only.includes(s.key));

interface PixabayHit {
  id: number;
  pageURL: string;
  tags: string;
  description?: string;
  heading?: string;
  imageWidth: number;
  imageHeight: number;
  largeImageURL: string;
  fullHDURL?: string;
  user: string;
  user_id: number;
  userURL?: string;
  isAiGenerated?: boolean;
}

const STOP = new Set(["top", "view", "close", "up", "over", "the", "a", "of", "and", "in", "on"]);
const keywords = (q: string) => q.toLowerCase().split(/\s+/).filter((w) => w && !STOP.has(w));
const matchScore = (words: string[], p: PixabayHit) => {
  const hay = `${p.tags} ${p.description ?? ""} ${p.heading ?? ""}`.toLowerCase();
  return words.filter((w) => hay.includes(w.replace(/s$/, ""))).length;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function search(query: string): Promise<PixabayHit[]> {
  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", KEY!);
  url.searchParams.set("q", query.slice(0, 100));
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("orientation", "horizontal");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", "30");
  url.searchParams.set("min_width", "1536");
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(15000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`Pixabay ${res.status} ${res.statusText}`);
    return ((await res.json()) as { hits: PixabayHit[] }).hits;
  }
  throw new Error("Pixabay rate limit: try again later");
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
    console.error("PIXABAY_API_KEY is not set. Add it to .env.local (project root).");
    process.exit(1);
  }
  await mkdir(NEW_DIR, { recursive: true });
  const rejects: number[] = existsSync(REJECTS_FILE)
    ? JSON.parse(await readFile(REJECTS_FILE, "utf8"))
    : [];
  const credits: Record<string, ImageCredit> = { ...imageCredits };
  const used = new Set<number>([...Object.values(credits).map((c) => c.id), ...rejects]);

  let done = 0;
  let skipped = 0;
  const failed: string[] = [];
  for (const slot of queue) {
    if (credits[slot.key]) {
      skipped++;
      continue;
    }
    try {
      // Prefer South-Asian people / settings, then fall back to the plain query.
      let pick: PixabayHit | undefined;
      let usedQuery = slot.query;
      for (const q of [`indian ${slot.query}`, slot.query]) {
        const hits = await search(q);
        await sleep(DELAY_MS);
        // Relevance: at least half of the query's keywords (min 2) must appear in the photo's
        // tags / description, so a loose Pixabay match (a dog on a beach) is never chosen.
        const words = keywords(slot.query);
        const need = Math.max(2, Math.ceil(words.length / 2));
        const scored = hits
          .filter(
            (p) =>
              !used.has(p.id) &&
              !p.isAiGenerated &&
              p.imageWidth / p.imageHeight >= 1.3 &&
              !BAD.test(`${p.tags} ${p.description ?? ""} ${p.heading ?? ""}`),
          )
          .map((p) => ({ p, score: matchScore(words, p) }))
          .filter((x) => x.score >= need);
        pick = scored.sort((x, y) => y.score - x.score)[0]?.p; // ties keep Pixabay's popularity order
        if (pick) {
          usedQuery = q;
          break;
        }
      }
      if (!pick) throw new Error(`no usable result for "${slot.query}"`);
      // Best size Pixabay gives us (fullHDURL needs full API access; largeImageURL is 1280 px wide).
      let res = await fetch(pick.fullHDURL || pick.largeImageURL);
      for (let attempt = 1; res.status === 429 && attempt <= 4; attempt++) {
        await sleep(20000 * attempt); // Pixabay rate-limits downloads too: back off and retry
        res = await fetch(pick.fullHDURL || pick.largeImageURL);
      }
      if (!res.ok) throw new Error(`download ${res.status}`);
      const base = path.basename(slot.file, ".webp");
      await writeFile(path.join(NEW_DIR, `${base}.jpg`), Buffer.from(await res.arrayBuffer()));
      credits[slot.key] = {
        id: pick.id,
        photographer: pick.user,
        photographerUrl: pick.userURL || `https://pixabay.com/users/${pick.user_id}/`,
        url: pick.pageURL,
        alt: (pick.description || pick.heading || `Photo: ${pick.tags}`).trim(),
        query: usedQuery,
      };
      used.add(pick.id);
      await writeCredits(credits); // save after every photo so an interrupted run loses nothing
      done++;
      console.log(`ok   ${slot.key}: ${pick.id} (${usedQuery}) "${credits[slot.key].alt}"`);
    } catch (e) {
      failed.push(slot.key);
      console.warn(`FAIL ${slot.key}: ${(e as Error).message}`);
    }
    await sleep(DELAY_MS);
  }
  console.log(
    `\nDownloaded ${done}, skipped ${skipped} (already have a photo), failed ${failed.length}${failed.length ? ": " + failed.join(", ") : ""}`,
  );
  // Convert the downloads to slot-size WebP, replace the illustrations, regenerate blur data.
  spawnSync(process.execPath, ["scripts/images-sync.ts"], { stdio: "inherit" });
}

await main();
