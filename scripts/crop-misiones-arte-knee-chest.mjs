import path from "path";
import sharp from "sharp";

const src = process.argv[2];
const out = path.join(process.cwd(), "public", "images", "cms", "misiones-arte-knee-chest.jpg");

if (!src) {
  console.error("Usage: node scripts/crop-misiones-arte-knee-chest.mjs <input.jpg>");
  process.exit(1);
}

const meta = await sharp(src).metadata();
const w = meta.width ?? 713;
const h = meta.height ?? 951;

/** Encuadre en el doctor + mesa knee-chest (centro-derecha, tercio inferior) */
const left = Math.round(w * 0.14);
const top = Math.round(h * 0.34);
const width = Math.round(w * 0.72);
const height = Math.round(h * 0.5);

await sharp(src)
  .extract({
    left: Math.min(left, w - 1),
    top: Math.min(top, h - 1),
    width: Math.min(width, w - left),
    height: Math.min(height, h - top),
  })
  .resize(1200, 900, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);

console.log("Wrote", out);
