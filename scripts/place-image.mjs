// Converts one incoming image to the exact slot file: WebP, resized to the slot size, then deletes
// the original.   Usage: node scripts/place-image.mjs <incoming file> <slot file name>
//   e.g. node scripts/place-image.mjs public/images/Gemini_Generated_1.png service-seo.webp
// Slot names and sizes come from data/image-slots.ts (card 1536x1024, wide 2400x1600, both 3:2).
import { existsSync } from "node:fs";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , input, slotFile] = process.argv;
const modPath = "../data/image-slots.ts"; // variable path: Node strips the types at runtime
const { slotList } = await import(modPath);

const slot = slotList.find((s) => s.file === slotFile);
if (!input || !slot) {
  console.error(`Usage: node scripts/place-image.mjs <incoming file> <slot file>\nUnknown slot: ${slotFile}`);
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`Not found: ${input}`);
  process.exit(1);
}

const [w, h] = slot.size === "wide" ? [2400, 1600] : [1536, 1024];
const out = path.join("public", "images", slot.file);
const buf = await readFile(input); // read first: input and output may be the same path
const meta = await sharp(buf).metadata();
const info = await sharp(buf)
  .rotate()
  // Slots are 3:2: cover-crop only if the source ratio differs; never upscale beyond the source.
  .resize({ width: w, height: h, fit: "cover", position: "centre", withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(out);
if (path.resolve(input) !== path.resolve(out)) await rm(input);
console.log(
  `${slot.file}: ${meta.width}x${meta.height} ${meta.format} -> ${info.width}x${info.height} webp, ${Math.round(info.size / 1024)} KB`,
);
