#!/usr/bin/env node
/**
 * Björndahlin pyöreän punaisen B-logon tunnistin.
 *
 * Etsii kuvista punaisia, lähes pyöreitä alueita, joiden keskellä on vaalea B-kirjain.
 * Palauttaa virhekoodin 1, jos yksikin logo löytyy – ajetaan osana `npm run images`
 * ja erikseen `npm run check:images`, jotta logot eivät palaa kuviin päivityksissä.
 *
 * Käyttö:
 *   node scripts/check-logos.mjs                 # public/img (kaikki julkaistavat kuvat)
 *   node scripts/check-logos.mjs <kansio|tiedosto> ...
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1000; // analyysileveys
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function isRed(r, g, b) {
  return r > 115 && r - g > 70 && r - b > 60 && b < 120;
}

/** Palauttaa löydetyt logot [{x, y, d}] analyysikuvan koordinaateissa. */
export async function findLogos(file) {
  const { data, info } = await sharp(file).resize({ width: WIDTH }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const red = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) red[i] = isRed(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) ? 1 : 0;

  // Yhtenäiset punaiset alueet (4-naapurusto)
  const seen = new Uint8Array(w * h);
  const found = [];
  for (let start = 0; start < w * h; start++) {
    if (!red[start] || seen[start]) continue;
    const stack = [start];
    seen[start] = 1;
    let area = 0, minX = w, maxX = 0, minY = h, maxY = 0;
    while (stack.length) {
      const p = stack.pop();
      const x = p % w, y = (p / w) | 0;
      area++;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      for (const q of [p - 1, p + 1, p - w, p + w]) {
        if (q >= 0 && q < w * h && !seen[q] && red[q] && Math.abs((q % w) - x) <= 1) {
          seen[q] = 1;
          stack.push(q);
        }
      }
    }
    const bw = maxX - minX + 1, bh = maxY - minY + 1;
    if (bw < 14 || bh < 14 || bw > 160 || bh > 160) continue;
    const aspect = bw / bh;
    if (aspect < 0.75 || aspect > 1.33) continue;
    const fill = area / (bw * bh); // täysi kiekko ≈ 0,785, B-reikä pienentää
    if (fill < 0.4 || fill > 0.8) continue;
    // Keskellä vaalea B: vaaleita pikseleitä kiekon sisäosassa
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, r = Math.min(bw, bh) * 0.35;
    let inner = 0, light = 0;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) {
      for (let x = Math.floor(cx - r); x <= cx + r; x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
        inner++;
        const i = (y * w + x) * 3;
        const R = data[i], G = data[i + 1], B = data[i + 2];
        if (R > 140 && G > 140 && B > 130 && Math.max(R, G, B) - Math.min(R, G, B) < 50) light++;
      }
    }
    const lightShare = light / inner;
    if (lightShare < 0.12 || lightShare > 0.6) continue;
    found.push({ x: Math.round(cx), y: Math.round(cy), d: Math.max(bw, bh), fill: +fill.toFixed(2), light: +lightShare.toFixed(2) });
  }
  return found;
}

async function collect(target) {
  const stat = await fs.stat(target);
  if (stat.isFile()) return EXT.has(path.extname(target).toLowerCase()) ? [target] : [];
  const out = [];
  for (const entry of await fs.readdir(target)) out.push(...(await collect(path.join(target, entry))));
  return out;
}

async function main() {
  const targets = process.argv.length > 2 ? process.argv.slice(2) : ["public/img"];
  const files = (await Promise.all(targets.map((t) => collect(path.resolve(t))))).flat().sort();
  let hits = 0;
  for (const f of files) {
    const logos = await findLogos(f);
    if (logos.length) {
      hits++;
      console.error(`  LOGO: ${path.relative(process.cwd(), f)} → ${JSON.stringify(logos)}`);
    }
  }
  console.log(`Logotarkistus: ${files.length} kuvaa, ${hits} logollista.`);
  if (hits) {
    console.error("Björndahlin logo löytyi. Poista se: scripts/remove-logos.py (ks. README).");
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
