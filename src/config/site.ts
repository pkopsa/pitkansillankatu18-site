// Yksi totuuden lähde muuttuville tiedoille (hinta, pinta-ala, yhteystiedot, linkit).
// Muuta arvot vain täältä – sivu, metatiedot ja JSON-LD lukevat ne tästä tiedostosta.

export type Lang = "fi" | "sv" | "en";

export const SITE_URL = "https://pitkansillankatu18.com";

// Päivitetty-päivämäärä (ISO) – näkyy footerissa ja sitemapissa
export const LAST_UPDATED = "2026-10-21";

export const SALE = {
  salePriceDebtFree: 108000,
  label: "108 000 €", // velaton
  area: 225,
  areaBasis: {
    fi: "yhtiöjärjestyksen mukainen, sisältää pohjakerroksen",
    sv: "enligt bolagsordningen, inkluderar nedre våningen",
    en: "per the articles of association, includes the lower floor",
  },
} as const;

// Osakkaan 17.10.2026 jakoluonnos – ei yhtiökokouksen hyväksymä muutos.
export const SPLIT = {
  commercial: { id: "LH 19A", area: 107, shares: [2226, 2332] as const },
  residential: { id: "A 19B", area: 118, shares: [2333, 2450] as const },
} as const;

export const SALE_PRICE_PER_SQM = SALE.salePriceDebtFree / SALE.area;
export const SPLIT_SUMMARY_PDF = "/docs/pk18-jakoehdotus-julkinen-yhteenveto-20261017.pdf";

export const BROKER = {
  company: "Asunto Björndahl Kokkola LKV Oy",
  name: "Petri Kaskilahti",
  title: "Kiinteistönvälittäjä LKV",
  phone: "040 148 0636",
  email: "petri@asuntobjorndahl.fi",
  // TODO v6.0.1: vaihdetaan julkiseen Etuovi/Dixu-ilmoituslinkkiin. Ei esikatselulinkkejä.
  listingUrl: "https://www.asuntobjorndahl.fi",
} as const;

export const OWNER = {
  name: "Petri Kopsa",
  phone: "050 306 0635",
  email: "info@terassitalo.com",
} as const;

export const LINKS = {
  terassitalo: "https://terassitalo.com",
  booking: "https://terassitalo.com/varauskalenteri",
  pk33: "https://pitkansillankatu33.com",
  petrikopsa: "https://petrikopsa.com",
} as const;

// Vuokrauksen arviohinnat (€/kk + alv) – ARVIOITA, eivät sitovia tarjouksia.
// Lähde: v5.5:n vuokrahaarukka 1 500–2 500 €/kk ja kiinteä projektikuukausi 1 800 €/kk.
export const RENT = {
  monthlyRange: [1500, 2500] as const,
  vat: 0.255,
  packages: {
    eh1: { persons: [1, 4] as const, months: [1, 3] as const, monthly: 1500 },
    eh2: { persons: [5, 10] as const, months: [1, 6] as const, monthly: 1800 },
    eh3: { persons: [11, 15] as const, months: [3, 12] as const, monthly: 2500 },
  },
  // Kuukausikustannuslaskurin vertailukohta: coworking-työpiste €/hlö/kk (arvio)
  coworkingDeskMonthly: 350,
  teamSizes: [1, 2, 4, 6, 8, 10, 12, 15] as const,
  durations: [1, 3, 6, 12] as const,
} as const;

// Muotoilee euromäärän kielen mukaan: fi/sv "108 000 €", en "€108,000"
export function formatEur(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "en" ? "en-IE" : lang === "sv" ? "sv-FI" : "fi-FI", {
    style: "currency", currency: "EUR",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
}

// "050 306 0635" → "+358503060635" (tel:-linkkejä varten)
export function telHref(phone: string): string {
  return "tel:+358" + phone.replace(/\s/g, "").replace(/^0/, "");
}

// "2026-10-21" → "21.10.2026" (fi/sv) tai "21 October 2026" (en)
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (lang === "en") {
    const month = new Date(Date.UTC(y, m - 1, d)).toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
    return `${d} ${month} ${y}`;
  }
  return `${d}.${m}.${y}`;
}
