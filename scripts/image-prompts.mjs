// Writes docs/image-prompts.md: every image slot with its exact file name, size, alt text and a
// paste-ready AI prompt. Source of truth: data/image-slots.ts.   Run: npm run images:prompts
import { mkdirSync, writeFileSync } from "node:fs";

const modPath = "../data/image-slots.ts"; // variable path: Node strips the types at runtime
const { slotList, buildPrompt, SLOT_PIXELS, STYLE } = await import(modPath);

const out = [
  "# Image prompts",
  "",
  "Generate each image, save it in `public/images/` under the exact file name, then rebuild the site.",
  "All images: landscape 3:2, hands + device + floating generic holographic icons, no logos, no text.",
  "",
  "**Shared style (already included in every prompt below):**",
  "",
  `> ${STYLE}`,
  "",
];
for (const s of slotList) {
  out.push(
    `## ${s.file}`,
    "",
    `- Size: ${SLOT_PIXELS[s.size]} px (3:2)`,
    `- Alt text: ${s.alt}`,
    "",
    "```",
    buildPrompt(s),
    "```",
    "",
  );
}
mkdirSync("docs", { recursive: true });
writeFileSync("docs/image-prompts.md", out.join("\n"));
console.log(`Wrote docs/image-prompts.md (${slotList.length} prompts)`);
