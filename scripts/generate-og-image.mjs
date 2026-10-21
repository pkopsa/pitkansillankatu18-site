#!/usr/bin/env node
/**
 * OpenGraph-kuva 1200×630 julkisivukuvasta (rekisterikilvet jo sumennettu).
 * Lähde: npm run images -ajon tuottama 2400 px WebP.
 *
 * Käyttö: node scripts/generate-og-image.mjs
 */

import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("public/img/pk18/pk18-julkisivu-pitkansillankatu-2400.webp");
const TARGET = path.resolve("public/og-image.jpg");

const info = await sharp(SRC)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(TARGET);

console.log(`og-image.jpg: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} kt`);
