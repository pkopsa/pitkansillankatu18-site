import type { ImageLoaderProps } from "next/image";
import manifest from "@/data/pk18-images.json";

type ManifestEntry = { width: number; height: number; widths: number[]; v?: string };
const MANIFEST = manifest as Record<string, ManifestEntry>;

// Pohjapiirrosten WebP-versiot (scripts/render-pdf.swift → sharp); vaihda versio, jos kuvat muuttuvat
const FLOOR_PLAN_WIDTHS = [800, 1600];
const FLOOR_PLAN_VERSION = "20261017";

export type GalleryImage = { base: string; src: string; width: number; height: number };

function pk18(base: string): GalleryImage {
  const m = MANIFEST[base];
  if (!m) throw new Error(`Kuvaa ei löydy manifestista: ${base} (aja npm run images)`);
  return { base, src: `/img/pk18/${base}`, width: m.width, height: m.height };
}

// Galleria kolmessa osiossa: ulkoa (4), katutaso (19), pohjakerros (5)
export const GALLERY = {
  outdoor: [
    "pk18-julkisivu-pitkansillankatu",
    "pk18-katu-nayteikkunat",
    "pk18-katu-nayteikkunat-2",
    "pk18-katu-sisapihan-suunta",
  ].map(pk18),
  street: [
    "pk18-katutaso-pitka-poyta-ikkunat",
    "pk18-katutaso-keittio-yleiskuva",
    "pk18-katutaso-pitka-poyta-nojatuolit",
    "pk18-katutaso-valkokangas-ja-naytto",
    "pk18-katutaso-keltaiset-tuolit",
    "pk18-katutaso-sisaankaynti-neuvottelupoyta",
    "pk18-katutaso-pitka-poyta-naytto",
    "pk18-katutaso-pitka-poyta-keittioon",
    "pk18-katutaso-keittio-yleiskuva-2",
    "pk18-katutaso-keittio-saareke",
    "pk18-katutaso-keittio-baaritaso",
    "pk18-katutaso-keittio-kukat",
    "pk18-katutaso-kahvipiste",
    "pk18-katutaso-lasikaappi-astiasto",
    "pk18-katutaso-koulutustila-naytto",
    "pk18-katutaso-koulutustila-sisapiha",
    "pk18-katutaso-ryijy-ja-poyta",
    "pk18-katutaso-tyohuone",
    "pk18-katutaso-wc",
  ].map(pk18),
  lower: [
    "pk18-alakerta-oleskelu",
    "pk18-alakerta-keittio",
    "pk18-alakerta-tyotila-kirjahylly",
    "pk18-alakerta-huone",
    "pk18-alakerta-portaat",
  ].map(pk18),
  // v5.5-sivuston kuvat, sävy sovitettu ammattikuviin (scripts/grade-v5-photos.py)
  extra: [
    "pk18-v5-avoin-toimisto",
    "pk18-v5-kokouspoyta",
    "pk18-v5-taukotila-naytto",
    "pk18-v5-neuvottelutila",
    "pk18-v5-keittioalue",
    "pk18-v5-keittio",
    "pk18-v5-toimisto",
    "pk18-v5-julkisivu",
    "pk18-v5-julkisivu-sisaankaynti",
    "pk18-v5-katunakyma",
  ].map(pk18),
};

export const HERO_IMAGE = pk18("pk18-katutaso-pitka-poyta-ikkunat");

// Valmiiksi optimoidut WebP-versiot: valitaan pienin leveys, joka riittää.
// src on muotoa "/img/pk18/<base>" tai "/img/pohjapiirros/<base>" ilman päätettä.
// ?v= = sisällön tarkiste: kuvat välimuistitetaan vuodeksi ("immutable"), joten muuttunut
// kuva tarvitsee uuden URL:n – muuten selain näyttää vanhan version.
export function webpLoader({ src, width }: ImageLoaderProps): string {
  const base = src.slice(src.lastIndexOf("/") + 1);
  const isPlan = src.startsWith("/img/pohjapiirros/");
  const widths = isPlan ? FLOOR_PLAN_WIDTHS : MANIFEST[base]?.widths ?? [];
  if (widths.length === 0) return src;
  const w = widths.find((x) => x >= width) ?? widths[widths.length - 1];
  const v = isPlan ? FLOOR_PLAN_VERSION : MANIFEST[base]?.v;
  return `${src}-${w}.webp${v ? `?v=${v}` : ""}`;
}
