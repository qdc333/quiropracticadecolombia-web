import fs from "fs";
import path from "path";
import sharp from "sharp";

const SECTION_BG = { r: 244, g: 232, b: 232 }; // #f4e8e8 — section--tint

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error("Usage: node scripts/optimize-vision-map.mjs <input> <output>");
  process.exit(1);
}

fs.mkdirSync(path.dirname(output), { recursive: true });

const trimmed = await sharp(input).trim({ threshold: 14 }).toBuffer();

const meta = await sharp(trimmed).metadata();
const targetHeight = 960;
const scale = targetHeight / (meta.height || targetHeight);
const targetWidth = Math.round((meta.width || 720) * scale);

await sharp(trimmed)
  .resize({
    width: targetWidth,
    height: targetHeight,
    fit: "inside",
    withoutEnlargement: false,
  })
  .flatten({ background: SECTION_BG })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);

const outMeta = await sharp(output).metadata();
console.log("Wrote", output, `${outMeta.width}x${outMeta.height}`);
