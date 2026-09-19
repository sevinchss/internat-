// Generates every brand asset from the one real logo file (./logo.png).
// The logo is never redrawn: all outputs are crops / alpha / recolours of its pixels.
// Run once: `npm run logo`
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "logo.png");
const OUT = path.join(ROOT, "public", "brand");
const APP = path.join(ROOT, "app");

await mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const idx = (x, y) => (y * W + x) * 4;

// 1. Remove white background (if the source has one): near-white -> transparent,
//    with a soft ramp so anti-aliased edges stay clean.
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const min = Math.min(r, g, b);
  const sat = Math.max(r, g, b) - min;
  if (sat < 14 && min > 238) {
    const a = Math.round(((255 - min) / 17) * 255);
    data[i + 3] = Math.min(data[i + 3], Math.max(0, a));
  }
}

// 2. Locate the wordmark: the navy text block sits to the right of the ring's opening.
//    Scan rows in the right half for navy-ish pixels that are *not* part of the emblem.
const isNavy = (i) => data[i + 3] > 40 && data[i + 2] > data[i] + 60 && data[i + 2] > data[i + 1] + 30 && data[i] < 60;
// a) rows: navy pixels far right of the ring (x > 55% of width) belong only to the wordmark
let tx0 = W,
  tx1 = 0,
  ty0 = H,
  ty1 = 0;
for (let y = 0; y < H; y++)
  for (let x = Math.round(W * 0.55); x < W; x++) {
    if (isNavy(idx(x, y))) {
      ty0 = Math.min(ty0, y);
      ty1 = Math.max(ty1, y);
      tx1 = Math.max(tx1, x);
    }
  }
// b) columns: within those rows, the leftmost navy pixel is where the wordmark starts
for (let y = ty0; y <= ty1; y++)
  for (let x = Math.round(W * 0.3); x < W; x++) {
    if (isNavy(idx(x, y))) {
      tx0 = Math.min(tx0, x);
      break;
    }
  }
// pad the text box a little for anti-aliasing
const pad = 6;
const text = {
  x0: Math.max(0, tx0 - pad),
  y0: Math.max(0, ty0 - pad),
  x1: Math.min(W - 1, tx1 + pad),
  y1: Math.min(H - 1, ty1 + pad),
};
console.log("Wordmark box:", text);

const inText = (x, y) => x >= text.x0 && x <= text.x1 && y >= text.y0 && y <= text.y1;

// 3. Emblem bounding box = opaque pixels outside the wordmark box.
let ex0 = W,
  ex1 = 0,
  ey0 = H,
  ey1 = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    if (inText(x, y)) continue;
    if (data[idx(x, y) + 3] > 24) {
      ex0 = Math.min(ex0, x);
      ex1 = Math.max(ex1, x);
      ey0 = Math.min(ey0, y);
      ey1 = Math.max(ey1, y);
    }
  }
console.log("Emblem box:", { ex0, ey0, ex1, ey1 });

const rawOpts = { raw: { width: W, height: H, channels: 4 } };

// logo-full.png (transparent, trimmed)
await sharp(Buffer.from(data), rawOpts)
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, "logo-full.png"));

// logo-full-dark.png — wordmark recoloured to white, emblem untouched
const dark = Buffer.from(data);
for (let y = text.y0; y <= text.y1; y++)
  for (let x = text.x0; x <= text.x1; x++) {
    const i = idx(x, y);
    if (dark[i + 3] > 0) {
      dark[i] = 255;
      dark[i + 1] = 255;
      dark[i + 2] = 255;
    }
  }
await sharp(dark, rawOpts)
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, "logo-full-dark.png"));

// logo-wordmark(-dark).png — just the "International Language School" text, for the loader
const tw = text.x1 - text.x0 + 1,
  th = text.y1 - text.y0 + 1;
await sharp(
  await sharp(Buffer.from(data), rawOpts)
    .extract({ left: text.x0, top: text.y0, width: tw, height: th })
    .png()
    .toBuffer(),
)
  .trim({ threshold: 1 })
  .png()
  .toFile(path.join(OUT, "logo-wordmark.png"));
await sharp(await sharp(dark, rawOpts).extract({ left: text.x0, top: text.y0, width: tw, height: th }).png().toBuffer())
  .trim({ threshold: 1 })
  .png()
  .toFile(path.join(OUT, "logo-wordmark-dark.png"));

// logo-mark.png — only the circular emblem (wordmark erased), squared canvas
const markBuf = Buffer.from(data);
for (let y = text.y0; y <= text.y1; y++) for (let x = text.x0; x <= text.x1; x++) markBuf[idx(x, y) + 3] = 0;
const mw = ex1 - ex0 + 1,
  mh = ey1 - ey0 + 1;
const side = Math.max(mw, mh);
const markCrop = await sharp(markBuf, rawOpts).extract({ left: ex0, top: ey0, width: mw, height: mh }).png().toBuffer();
const mark = await sharp({
  create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  // left-aligned so the canvas centre == the ring centre (the ring is open on the right)
  .composite([{ input: markCrop, left: 0, top: Math.round((side - mh) / 2) }])
  .png({ compressionLevel: 9 })
  .toBuffer();
await sharp(mark).toFile(path.join(OUT, "logo-mark.png"));
await sharp(mark).resize(512, 512).png().toFile(path.join(OUT, "logo-mark-512.png"));
// small, fast version for the intro loader (painted before hydration, so it bypasses next/image)
await sharp(mark).resize(360, 360).webp({ quality: 88, alphaQuality: 90 }).toFile(path.join(OUT, "logo-mark-360.webp"));

// Favicons
async function markOn(size, bg, inset) {
  const inner = await sharp(mark)
    .resize(Math.round(size * inset), Math.round(size * inset))
    .png()
    .toBuffer();
  const off = Math.round((size - Math.round(size * inset)) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: inner, left: off, top: off }])
    .png()
    .toBuffer();
}
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const paper = { r: 250, g: 251, b: 253, alpha: 1 };
await writeFile(path.join(APP, "icon.png"), await markOn(512, transparent, 1));
await writeFile(path.join(APP, "apple-icon.png"), await markOn(180, paper, 0.82));

// favicon.ico with embedded PNGs (16, 32, 48)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => markOn(s, transparent, 1)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, k) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[k].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[k].length;
  return e;
});
await writeFile(path.join(APP, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

// OG image base (1200x630): full logo on the light paper colour
const full = await sharp(path.join(OUT, "logo-full.png")).resize({ width: 980 }).png().toBuffer();
const fm = await sharp(full).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: paper } })
  .composite([{ input: full, left: Math.round((1200 - fm.width) / 2), top: Math.round((630 - fm.height) / 2) }])
  .png()
  .toFile(path.join(OUT, "og-base.png"));

// 4. Sample brand colours: most frequent fully-opaque, saturated colour per hue family
const buckets = new Map();
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = idx(x, y);
    if (data[i + 3] < 255) continue;
    const key = `${data[i] >> 2},${data[i + 1] >> 2},${data[i + 2] >> 2}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }
const hex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
const families = { navy: [], purple: [], green: [], orange: [], amber: [], red: [], ring: [] };
for (const [k, n] of buckets) {
  const [r, g, b] = k.split(",").map((v) => (Number(v) << 2) + 2);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    s = max - min;
  let h = 0;
  if (s > 0) {
    if (max === r) h = ((g - b) / s) % 6;
    else if (max === g) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    h = (h * 60 + 360) % 360;
  }
  let fam = null;
  if (s < 12 && max > 180 && max < 225) fam = "ring";
  else if (s > 80) {
    if (h >= 200 && h < 225 && max < 170) fam = "navy";
    else if (h >= 260 && h < 300) fam = "purple";
    else if (h >= 140 && h < 175) fam = "green";
    else if (h >= 12 && h < 28) fam = "orange";
    else if (h >= 30 && h < 50) fam = "amber";
    else if (h < 6 || h >= 350) fam = "red";
  }
  if (fam) families[fam].push({ c: hex(r, g, b), n });
}
const sampled = {};
for (const [f, list] of Object.entries(families)) {
  list.sort((a, b) => b.n - a.n);
  sampled[f] = list[0]?.c ?? null;
}
console.log("\nSampled brand colours:");
console.table(sampled);
await writeFile(path.join(OUT, "colors.json"), JSON.stringify(sampled, null, 2));
console.log("\nDone -> public/brand/*, app/icon.png, app/apple-icon.png, app/favicon.ico");
