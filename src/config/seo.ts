import type { Metadata } from "next";
import { LAST_UPDATED, SALE, SITE_URL, formatEur, type Lang } from "@/config/site";

const A = SALE.area;

// Hakukonetekstit kielittäin – hinta ja pinta-ala configista
const SEO: Record<Lang, { title: string; description: string; ogAlt: string; locale: string }> = {
  fi: {
    title: `Pitkänsillankatu 18 – toimisto- ja projektitila Kokkolan keskustassa | ${A} m² | ${formatEur(SALE.salePriceDebtFree, "fi")}`,
    description: `${A} m² toimisto-, projekti- ja edustustila Kokkolan ydinkeskustassa. Vuokralle kuukausittain tai myyntiin, velaton hinta ${formatEur(SALE.salePriceDebtFree, "fi")}. Katutason projektitoimisto ja pohjakerroksen tiimitilat.`,
    ogAlt: "Pitkänsillankatu 18, Kokkola – julkisivu",
    locale: "fi_FI",
  },
  sv: {
    title: `Pitkänsillankatu 18 – kontors- och projektlokal i Karleby centrum | ${A} m² | ${formatEur(SALE.salePriceDebtFree, "sv")}`,
    description: `${A} m² kontor, projekt- och representationslokal i Karlebys stadskärna. Att hyra per månad eller köpa, skuldfritt pris ${formatEur(SALE.salePriceDebtFree, "sv")}. Projektkontor på gatuplan och teamutrymmen på nedre våningen.`,
    ogAlt: "Pitkänsillankatu 18, Karleby – fasad",
    locale: "sv_FI",
  },
  en: {
    title: `Pitkänsillankatu 18 – office and project space in Kokkola city centre | ${A} m² | ${formatEur(SALE.salePriceDebtFree, "en")}`,
    description: `${A} m² office, project and representation space in Kokkola city centre. For monthly rent or for sale, debt-free price ${formatEur(SALE.salePriceDebtFree, "en")}. Street-level project office and lower-floor team rooms.`,
    ogAlt: "Pitkänsillankatu 18, Kokkola – facade",
    locale: "en_GB",
  },
};

const PATHS: Record<Lang, string> = { fi: "/", sv: "/sv", en: "/en" };

// Versio kuvan URL:iin, jotta somepalvelut ja selaimet hakevat päivitetyn kuvan
export const OG_IMAGE = `/og-image.jpg?v=${LAST_UPDATED}`;

export function pageUrl(lang: Lang): string {
  return lang === "fi" ? SITE_URL : `${SITE_URL}${PATHS[lang]}`;
}

export function buildMetadata(lang: Lang): Metadata {
  const s = SEO[lang];
  const others = (Object.keys(SEO) as Lang[]).filter((l) => l !== lang);
  return {
    title: { absolute: s.title },
    description: s.description,
    alternates: {
      canonical: pageUrl(lang),
      languages: { fi: pageUrl("fi"), sv: pageUrl("sv"), en: pageUrl("en"), "x-default": pageUrl("fi") },
    },
    openGraph: {
      type: "website",
      locale: s.locale,
      alternateLocale: others.map((l) => SEO[l].locale),
      url: pageUrl(lang),
      siteName: "Pitkänsillankatu 18 – Kokkola",
      title: s.title,
      description: s.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: s.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.description,
      images: [OG_IMAGE],
    },
  };
}
