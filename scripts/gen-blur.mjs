// Builds lib/blur-data.json: { [src]: { b: blurDataURL, r: width/height } } for every image in lib/images.ts.
// Works for remote (Unsplash) and local (/images/...) sources. Also reports broken URLs.
// Run: `npm run blur`
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const file = (await readFile(path.join(ROOT, "lib/images.ts"), "utf8"))
  .split("\n")
  .filter((l) => !/^\s*(\*|\/\/)/.test(l)) // ignore comment lines
  .join("\n");

const remote = [...file.matchAll(/img\("(photo-[\w-]+)"/g)].map(
  (m) => `https://images.unsplash.com/${m[1]}?auto=format&fit=crop&w=2400&q=80`,
);
const local = [...file.matchAll(/slot\("(\/images\/[^"]+)"/g)].map((m) => m[1]);

const out = {};
let failed = 0;

async function handle(src) {
  try {
    let buf;
    if (src.startsWith("http")) {
      const id = src.split("?")[0];
      const res = await fetch(`${id}?w=40&q=50&fm=jpg`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
    } else {
      buf = await readFile(path.join(ROOT, "public", src));
    }
    const meta = await sharp(buf).metadata();
    const tiny = await sharp(buf).resize(12).blur(0.6).jpeg({ quality: 50 }).toBuffer();
    out[src] = { b: `data:image/jpeg;base64,${tiny.toString("base64")}`, r: +(meta.width / meta.height).toFixed(4) };
  } catch (e) {
    failed++;
    console.error("✗", src, e.message);
  }
}

const all = [...new Set([...remote, ...local])];
for (let i = 0; i < all.length; i += 8) await Promise.all(all.slice(i, i + 8).map(handle));

await writeFile(path.join(ROOT, "lib/blur-data.json"), JSON.stringify(out, null, 0));
console.log(`✓ ${Object.keys(out).length} images, ${failed} failed`);
