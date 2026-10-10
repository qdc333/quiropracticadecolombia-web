import fs from "fs";
import path from "path";
import sharp from "sharp";

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

const input = process.argv[2];
const output = process.argv[3];
const bgHex = process.argv[4] || "#f4e8e8";
const targetHeight = Number(process.argv[5] || 960);

if (!input || !output) {
  console.error(
    "Usage: node scripts/optimize-section-image.mjs <input> <output> [bgHex] [targetHeight]"
  );
  process.exit(1);
}

const background = hexToRgb(bgHex);

fs.mkdirSync(path.dirname(output), { recursive: true });

const trimmed = await sharp(input).trim({ threshold: 14 }).toBuffer();
const meta = await sharp(trimmed).metadata();
const scale = targetHeight / (meta.height || targetHeight);
const targetWidth = Math.round((meta.width || 720) * scale);

await sharp(trimmed)
  .resize({
    width: targetWidth,
    height: targetHeight,
    fit: "inside",
    withoutEnlargement: false,
  })
  .flatten({ background })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);

const outMeta = await sharp(output).metadata();
console.log("Wrote", output, `${outMeta.width}x${outMeta.height}`, "bg", bgHex);
