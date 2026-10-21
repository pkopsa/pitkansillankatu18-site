#!/usr/bin/env node
/**
 * Kuvien optimointi: pk18-aineiston lähdekuvat → public/img/pk18/
 *
 * Pohja: terassitalo-webin optimize-images.mjs (sovitettu tähän repoon).
 * Jokaisesta kuvasta tehdään WebP-versiot leveyksillä 1600, 1200 ja 800 px
 * (vain ne, joihin alkuperäinen riittää; pienestä kuvasta vähintään yksi
 * alkuperäisen kokoinen versio). Laatua lasketaan portaittain ja tarvittaessa
 * mittoja pienennetään, kunnes tiedosto on alle 250 kt. Jos raja ei täyty,
 * skripti ilmoittaa virheen eikä kirjoita tiedostoa.
 * LARGE-listan kuvista tehdään lisäksi 2400 px versio lightboxia varten
 * (q85, raja 900 kt).
 * EXIF-metatiedot (sijainti, kamera) poistetaan; EXIF-suunta huomioidaan.
 *
 * Jos lähdekansiossa on "<nimi>-sumennettu.jpg", sitä käytetään alkuperäisen
 * sijaan ja tulostiedoston nimi on ilman "-sumennettu"-päätettä
 * (ks. scripts/blur-plates.mjs).
 *
 * Käyttö:
 *   npm run images                                   # oletuskansiot alla
 *   npm run images -- ~/polku/kuvat-a ~/polku/kuvat-b
 *
 * Manifesti (mitat sivun width/height-arvoja varten): src/data/pk18-images.json
 */

import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const AINEISTO = path.join(os.homedir(), "kopsa-web/pk18-aineisto");
const SRCS = (process.argv.length > 2
  ? process.argv.slice(2)
  : [path.join(AINEISTO, "kuvat-katutaso"), path.join(AINEISTO, "kuvat-alakerta")]
).map((p) => path.resolve(p));
const OUT = path.resolve("public/img/pk18");
const MANIFEST = path.resolve("src/data/pk18-images.json");
const WIDTHS = [1600, 1200, 800];
const MAX_BYTES = 250 * 1024;
const QUALITIES = [82, 74, 66, 58, 50];
const SHRINK_STEPS = [1, 0.85, 0.7]; // jos laatu ei riitä, pienennä mittoja
const EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".avif", ".heic", ".heif"]);
const BLURRED_SUFFIX = "-sumennettu";

// Lightboxin täysikokoiset (2400 px, q85, ≤ 900 kt)
const LARGE = {
  width: 2400,
  quality: 85,
  maxBytes: 900 * 1024,
  bases: new Set([
    "pk18-julkisivu-pitkansillankatu",
    "pk18-katutaso-keittio-yleiskuva",
    "pk18-katutaso-pitka-poyta-nojatuolit",
    "pk18-katutaso-pitka-poyta-ikkunat",
    "pk18-katutaso-keltaiset-tuolit",
    "pk18-katutaso-valkokangas-ja-naytto",
    "pk18-alakerta-oleskelu",
    "pk18-alakerta-keittio",
  ]),
};

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // poista aksentit: ä → a
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Leveys EXIF-suunnan jälkeen: suunnat 5–8 kääntävät kuvan 90°. */
function orientedWidth(meta) {
  const rotated = meta.orientation && meta.orientation >= 5;
  return rotated ? meta.height : meta.width;
}

/** Yrittää tuottaa WebP:n annetulla leveydellä kokorajan alle; palauttaa null, jos ei onnistu. */
async function encodeUnderLimit(input, width, qualities = QUALITIES, maxBytes = MAX_BYTES) {
  for (const shrink of SHRINK_STEPS) {
    const w = Math.max(200, Math.round(width * shrink));
    for (const q of qualities) {
      const buf = await input
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: q, effort: 5 })
        .toBuffer();
      if (buf.length <= maxBytes) return { buf, q, w };
    }
  }
  return null;
}

/** Valitsee lähdetiedostot: sumennettu versio korvaa alkuperäisen. */
async function listSources(dir) {
  const files = (await fs.readdir(dir)).filter((f) => EXT.has(path.extname(f).toLowerCase())).sort();
  const blurred = new Set(
    files.filter((f) => path.parse(f).name.endsWith(BLURRED_SUFFIX))
      .map((f) => path.parse(f).name.slice(0, -BLURRED_SUFFIX.length)),
  );
  return files
    .filter((f) => !blurred.has(path.parse(f).name))
    .map((f) => ({ dir, file: f, base: slugify(path.parse(f).name.replace(BLURRED_SUFFIX, "")) }));
}

async function writeVariant(base, encoded) {
  const info = await sharp(encoded.buf).metadata();
  const outName = `${base}-${info.width}.webp`; // nimi = todellinen leveys
  await fs.writeFile(path.join(OUT, outName), encoded.buf);
  return { outName, width: info.width, height: info.height, kb: Math.round(encoded.buf.length / 1024), q: encoded.q };
}

async function processOne({ dir, file, base }, seen) {
  if (seen.has(base)) {
    throw new Error(`Nimikonflikti: "${file}" ja "${seen.get(base)}" normalisoituvat samaksi nimeksi "${base}". Nimeä toinen uudelleen.`);
  }
  seen.set(base, file);

  const input = sharp(path.join(dir, file), { failOn: "none" }).rotate(); // rotate() = EXIF-suunta
  let meta;
  try {
    meta = await input.metadata();
  } catch (e) {
    throw new Error(`"${file}": kuvaa ei voitu lukea (${e.message})`);
  }

  const srcWidth = orientedWidth(meta);
  if (!srcWidth) throw new Error(`"${file}": leveyttä ei saatu selville`);

  // Leveydet, joihin alkuperäinen riittää; pienestä kuvasta vähintään alkuperäinen koko
  let targets = WIDTHS.filter((w) => srcWidth >= w);
  if (targets.length === 0) targets = [srcWidth];

  const results = [];
  for (const width of targets) {
    const encoded = await encodeUnderLimit(input, width);
    if (!encoded) {
      throw new Error(`"${file}" (${width} px): ei saatu alle ${MAX_BYTES / 1024} kt edes pienentämällä. Rajaa tai pienennä kuva käsin.`);
    }
    results.push({ ...(await writeVariant(base, encoded)), shrunk: encoded.w !== width });
  }

  if (LARGE.bases.has(base) && srcWidth >= LARGE.width) {
    const encoded = await encodeUnderLimit(input, LARGE.width, [LARGE.quality, 78, 70], LARGE.maxBytes);
    if (!encoded) throw new Error(`"${file}" (${LARGE.width} px): ei saatu alle ${LARGE.maxBytes / 1024} kt.`);
    results.push({ ...(await writeVariant(base, encoded)), shrunk: encoded.w !== LARGE.width });
  }
  return { file, base, results };
}

async function main() {
  for (const src of SRCS) {
    try {
      await fs.access(src);
    } catch {
      console.error(`Lähdekansiota ei löydy: ${src}`);
      process.exit(1);
    }
  }
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  const sources = (await Promise.all(SRCS.map(listSources))).flat();
  if (sources.length === 0) {
    console.log(`Ei kuvia kansioissa ${SRCS.join(", ")}`);
    return;
  }

  console.log(`Optimoidaan ${sources.length} kuvaa → ${OUT}\n`);
  const manifest = [];
  const seen = new Map();
  let failed = 0;
  for (const s of sources) {
    try {
      const r = await processOne(s, seen);
      for (const x of r.results) {
        const flag = x.shrunk ? "  (pienennetty kokorajan takia)" : "";
        console.log(`  ${x.outName.padEnd(52)} ${String(x.width).padStart(4)}×${String(x.height).padEnd(4)} ${String(x.kb).padStart(4)} kt  q=${x.q}${flag}`);
      }
      manifest.push(r);
    } catch (e) {
      failed++;
      console.error(`  VIRHE: ${e.message}`);
    }
  }

  // Manifesti: sivu lukee tästä kuvien mitat ja saatavilla olevat leveydet
  await fs.writeFile(
    MANIFEST,
    JSON.stringify(
      Object.fromEntries(
        manifest.map((m) => [
          m.base,
          {
            width: m.results[0].width,
            height: m.results[0].height,
            widths: m.results.map((x) => x.width).sort((a, b) => a - b),
          },
        ]),
      ),
      null,
      2,
    ) + "\n",
  );
  console.log(`\nValmis: ${manifest.length} kuvaa, ${failed} virhettä. Manifesti: ${MANIFEST}\nMuista alt-tekstit kaikilla kielillä!`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
