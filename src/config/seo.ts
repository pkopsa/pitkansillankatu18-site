import type { Metadata } from "next";
import { LAST_UPDATED, SALE, SALE_PRICE_PER_SQM, SITE_URL, formatEur, type Lang } from "@/config/site";

const A = SALE.area;

// Hakukonetekstit kielittäin – hinta ja pinta-ala configista
const SEO: Record<Lang, { title: string; description: string; ogAlt: string; locale: string }> = {
  fi: {
    title: `Projektitoimisto Kokkola | ${A} m² | ${formatEur(SALE.salePriceDebtFree, "fi")} · ${formatEur(SALE_PRICE_PER_SQM, "fi")}/m²`,
    description: `${A} m² projekti- ja toimistotila Kokkolan keskustassa. Kuukausivuokraus tai myynti: velaton hinta ${formatEur(SALE.salePriceDebtFree, "fi")} (${formatEur(SALE_PRICE_PER_SQM, "fi")}/m²). Katutaso ja pohjakerros.`,
    ogAlt: "Pitkänsillankatu 18, Kokkola – julkisivu",
    locale: "fi_FI",
  },
  sv: {
    title: `Projektkontor Karleby | ${A} m² | ${formatEur(SALE.salePriceDebtFree, "sv")} · ${formatEur(SALE_PRICE_PER_SQM, "sv")}/m²`,
    description: `${A} m² projekt- och kontorslokal i Karleby centrum. Månadshyra eller köp: skuldfritt pris ${formatEur(SALE.salePriceDebtFree, "sv")} (${formatEur(SALE_PRICE_PER_SQM, "sv")}/m²). Gatuplan och nedre våning.`,
    ogAlt: "Pitkänsillankatu 18, Karleby – fasad",
    locale: "sv_FI",
  },
  en: {
    title: `Project office in Kokkola | ${A} m² | ${formatEur(SALE.salePriceDebtFree, "en")} · ${formatEur(SALE_PRICE_PER_SQM, "en")}/m²`,
    description: `${A} m² project and office space in Kokkola city centre. Monthly rent or purchase: debt-free price ${formatEur(SALE.salePriceDebtFree, "en")} (${formatEur(SALE_PRICE_PER_SQM, "en")}/m²). Street level and lower floor.`,
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
