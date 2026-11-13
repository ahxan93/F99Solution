/**
 * SEO + content checker. Crawls the sitemap of a RUNNING site and verifies every page.
 *
 *   npm run build && npm start          # in one terminal
 *   npm run seo:check -- http://localhost:3000
 *
 * Checks per page: HTTP 200, exactly one <h1>, <title> 50–60 chars, meta description 140–160 chars,
 * canonical URL, valid JSON-LD, the primary keyword (data/seo-keywords.ts) in the H1 and in the first
 * 100 words, word-count targets (services 900–1,300; blog 1,500+), no banned AI-sounding phrases, and
 * the founder named ONLY on /about. Exits with code 1 if anything fails.
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const BANNED = [
  "in today's fast-paced",
  "in today’s fast-paced",
  "fast-paced digital world",
  "unlock",
  "elevate",
  "game-changer",
  "game changer",
];
const STOP = new Set(["in", "for", "of", "and", "the", "a", "to", "vs"]);
const stem = (w) =>
  w
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 5);
const stems = (text) => text.split(/\s+/).map(stem).filter(Boolean);

let seo = null;
try {
  seo = await import(new URL("../data/seo-keywords.ts", import.meta.url).href);
} catch {
  console.warn("(could not load data/seo-keywords.ts; keyword checks skipped)");
}
const primaryFor = (path) => {
  if (!seo) return null;
  if (seo.pageSeo[path]) return seo.pageSeo[path].primary;
  const svc = /^\/services\/([^/]+)$/.exec(path)?.[1];
  if (svc && seo.serviceSeo[svc]) return seo.serviceSeo[svc].primary;
  const post = /^\/blog\/([^/]+)$/.exec(path)?.[1];
  if (post && seo.blogSeo[post]) return seo.blogSeo[post].primary;
  return null;
};

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const strip = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (paths.length === 0) {
  console.error("No URLs found in sitemap.xml. Is the site running at", BASE, "?");
  process.exit(1);
}

const rows = [];
let failures = 0;

for (const path of paths) {
  const res = await fetch(BASE + path);
  const html = await res.text();
  const problems = [];

  if (res.status !== 200) problems.push(`status ${res.status}`);

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  if (h1s.length !== 1) problems.push(`${h1s.length} <h1>`);

  const title = decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "");
  const desc = decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "");
  const caseStudy = path.startsWith("/portfolio/");
  if (title.length < 50 || title.length > 60) problems.push(`title ${title.length} chars`);
  if (desc.length < 140 || desc.length > 160) problems.push(`description ${desc.length} chars`);

  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
  if (!canonical) problems.push("no canonical");
  else if (new URL(canonical, BASE).pathname.replace(/\/$/, "") !== path.replace(/\/$/, ""))
    problems.push(`canonical ${new URL(canonical, BASE).pathname}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      problems.push("invalid JSON-LD");
    }
  }

  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? html;
  const text = strip(main);
  const words = text.split(/\s+/).filter(Boolean);
  const wc = words.length;
  const isService = /^\/services\/[^/]+$/.test(path);
  const isPost = /^\/blog\/[^/]+$/.test(path);
  if (isService && (wc < 900 || wc > 1300)) problems.push(`${wc} words (want 900–1,300)`);
  if (isPost && wc < 1500) problems.push(`${wc} words (want 1,500+)`);

  const primary = primaryFor(path);
  if (primary && h1s[0]) {
    const needed = stems(primary).filter((w) => !STOP.has(w));
    const h1Stems = new Set(stems(h1s[0]));
    const missing = needed.filter((w) => !h1Stems.has(w));
    if (missing.length) problems.push(`H1 lacks keyword "${primary}"`);
    const first100 = new Set(stems(words.slice(0, 100).join(" ")));
    const missing100 = needed.filter((w) => !first100.has(w));
    if (missing100.length) problems.push(`keyword not in first 100 words`);
  }

  const lower = text.toLowerCase();
  for (const b of BANNED) if (lower.includes(b)) problems.push(`banned phrase "${b}"`);

  if (path !== "/about") {
    if (
      /\bMCA\b|University of Mumbai|4\+ ?years|founder/i.test(text) &&
      !path.startsWith("/privacy") &&
      !path.startsWith("/terms")
    )
      problems.push("founder/personal detail outside About");
    if (/Ahsan/.test(text)) problems.push("'Ahsan' used as a person");
  }

  if (!caseStudy || problems.length) {
    rows.push({
      path,
      title: title.length,
      desc: desc.length,
      words: wc,
      ok: problems.length === 0,
      problems,
    });
  }
  if (problems.length) failures++;
}

const w = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`\nChecked ${paths.length} pages on ${BASE}\n`);
console.log(w("page", 46), w("title", 6), w("desc", 6), w("words", 6), "result");
for (const r of rows) {
  console.log(
    w(r.path, 46),
    w(r.title, 6),
    w(r.desc, 6),
    w(r.words, 6),
    r.ok ? "OK" : "FAIL: " + r.problems.join("; "),
  );
}
console.log(failures === 0 ? "\nAll pages passed." : `\n${failures} page(s) have problems.`);
process.exit(failures === 0 ? 0 : 1);
