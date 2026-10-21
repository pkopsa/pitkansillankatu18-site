#!/usr/bin/env node
/**
 * Rekisterikilpien sumennus ennen julkaisua.
 *
 * Lukee lähdekuvat aineistokansiosta (repon ulkopuolella) ja kirjoittaa samaan
 * kansioon versiot "<nimi>-sumennettu.jpg". Alueet ovat alkuperäisen 4000 px
 * kuvan pikselikoordinaatteja (rajataan alue, blur 30, composite takaisin).
 *
 * Käyttö:
 *   node scripts/blur-plates.mjs ~/kopsa-web/pk18-aineisto/kuvat-katutaso
 */

import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve(process.argv[2] ?? "../../kopsa-web/pk18-aineisto/kuvat-katutaso");
const BLUR_SIGMA = 30;

const TARGETS = {
  "pk18-katu-nayteikkunat.jpg": [
    { left: 3620, top: 2280, width: 330, height: 170 }, // valkoinen VW, oikea alakulma
  ],
  "pk18-julkisivu-pitkansillankatu.jpg": [
    { left: 2400, top: 2405, width: 110, height: 65 }, // valkoinen VW
    { left: 3075, top: 1980, width: 90, height: 55 },  // harmaa Audi
    { left: 3360, top: 1800, width: 70, height: 45 },  // sininen farmari
    { left: 3240, top: 1855, width: 80, height: 50 },  // musta maasturi
  ],
};

async function blurFile(file, regions) {
  const input = path.join(SRC, file);
  const output = path.join(SRC, file.replace(/\.jpg$/, "-sumennettu.jpg"));
  const patches = await Promise.all(
    regions.map(async (r) => ({
      input: await sharp(input).extract(r).blur(BLUR_SIGMA).toBuffer(),
      left: r.left,
      top: r.top,
    })),
  );
  await sharp(input).composite(patches).jpeg({ quality: 92 }).toFile(output);
  console.log(`${file} → ${path.basename(output)} (${regions.length} aluetta)`);
}

for (const [file, regions] of Object.entries(TARGETS)) {
  await blurFile(file, regions);
}
