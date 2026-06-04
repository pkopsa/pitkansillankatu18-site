import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://pitkansillankatu18.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Pitkänsillankatu 18 – Coworking & Executive Housing | VE2 | Kokkola 119 000 €",
    template: "%s | Pitkänsillankatu 18 Kokkola",
  },
  description:
    "225 m² Coworking-tila (Terassitalo) + Executive Housing PK33 — projektitiimin all-in-one paketti Kokkolassa. 119 000 €. VE2-ehdotus vireillä: mahdollinen jako liikehuoneistoon (~131 m²) ja loft-/asuintilaan (~94 m²).",

  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    // Coworking & toimisto
    "coworking Kokkola",
    "coworking-tila Kokkola",
    "projektitoimisto Kokkola",
    "tiimivuokraus Kokkola",
    "toimitila vuokraus Kokkola",
    "palaveritila Kokkola",
    "kokoustila Kokkola",
    "edustustila Kokkola",
    "päivävuokra toimisto Kokkola",
    // Executive Housing & majoitus
    "executive housing Kokkola",
    "lyhytmajoitus Kokkola",
    "executive suite Kokkola",
    "Pitkänsillankatu 33 majoitus",
    "tiimipaketti majoitus Kokkola",
    "lyhytaikainen majoitus Kokkola",
    "projektitiimi majoitus Kokkola",
    "merenrantamajoitus Kokkola",
    // Myynti & sijoitus
    "liiketila myytävänä Kokkola",
    "sijoituskiinteistö Kokkola",
    "toimitila Kokkola myynti",
    "Pitkänsillankatu 18",
    "Kokkola ydinkeskusta liiketila",
    "liiketila 225 m² Kokkola",
    "sijoitustuotto Kokkola",
    // VE2 & loft
    "VE2 ehdotus Kokkola",
    "loft asunto Kokkola",
    "liikehuoneisto asuinhuoneisto Kokkola",
    // KIP & teollisuus (#Arctial #Aluminium #LowCarbon #Kronoby)
    "KIP-alue toimitila",
    "Keliber toimisto Kokkola",
    "Arctial projektitiimi Kokkola",
    "Arctial alumiinitehdas Kokkola",
    "vähähiilinen alumiini Kokkola",
    "vähähiilinen teollisuus Kokkola",
    "alumiinitehdas Kruunupyy",
    "Kruunupyy Kokkola teollisuus",
    "Kronoby industri Karleby",
    // ── RUOTSI ─────────────────────────────────────────────────────
    "coworking Karleby",
    "coworking-lokal Karleby",
    "executive housing Karleby",
    "korttidsboende Karleby",
    "projektpaket boende Karleby",
    "affärslokal till salu Karleby",
    "investeringsfastighet Karleby",
    "Pitkänsillankatu 18 Karleby",
    "Karleby centrum affärslokal",
    "VE2 förslag Karleby",
    "projektkontor Karleby",
    "KIP-området Karleby",
    "möteslokal Karleby",
    "Arctial aluminium Karleby",
    "lågkol aluminium Finland",
    "Kronoby Karleby industri",
    // ── ENGLANTI ───────────────────────────────────────────────────
    "coworking space Kokkola",
    "executive housing Kokkola",
    "short-term accommodation Kokkola",
    "executive suite Kokkola Finland",
    "project team accommodation Kokkola",
    "team package office Kokkola",
    "commercial property for sale Kokkola",
    "investment property Kokkola Finland",
    "Pitkansillankatu 18 Kokkola",
    "VE2 proposal Kokkola",
    "project office Kokkola",
    "KIP zone office space",
    "Keliber Boliden Arctial office Kokkola",
    "Arctial low carbon aluminium Finland",
    "low carbon aluminium Kokkola",
    "aluminium plant Kronoby Finland",
    "Kokkola industrial park KIP",
    "meeting room Kokkola",
    "business hub Kokkola Finland",
  ],
  authors: [{ name: "Petri Kopsa", url: BASE_URL }],
  creator: "Petri Kopsa",
  publisher: "Terassitalo",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "fi": BASE_URL,
      "sv": BASE_URL,
      "en": BASE_URL,
      "x-default": BASE_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "fi_FI",
    alternateLocale: ["sv_SE", "en_US"],
    url: BASE_URL,
    siteName: "Pitkänsillankatu 18 – Terassitalo Kokkola",
    title: "Pitkänsillankatu 18 – Coworking & Executive Housing | VE2 | Kokkola 119 000 €",
    description:
      "225 m² Coworking-tila + Executive Housing PK33 — projektitiimin all-in-one paketti Kokkolassa. 119 000 €. VE2-ehdotus vireillä: jako liikehuoneistoon (~131 m²) ja loft-/asuintilaan (~94 m²).",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pitkänsillankatu 18 – projekti office, Kokkola",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pitkänsillankatu 18 – Coworking & Executive Housing | VE2 | Kokkola 119 000 €",
    description:
      "225 m² Coworking-tila + Executive Housing PK33 — projektitiimin all-in-one paketti Kokkolassa. VE2-ehdotus vireillä. KIP-alue kasvaa.",
    images: ["/og-image.jpg"],
  },

  other: {
    "geo.region": "FI-07",
    "geo.placename": "Kokkola",
    "geo.position": "63.83768;23.13689",
    "ICBM": "63.83768, 23.13689",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Office",
      "@id": `${BASE_URL}/#office`,
      name: "Pitkänsillankatu 18 – Liiketila & VE2-kohde | Kokkola",
      description:
        "225 m² liiketila Kokkolan ydinkeskustassa. 119 000 €. Alustava VE2-ehdotus mahdollisesta jaosta liikehuoneistoon (n. 131 m²) ja loft-/asuintilaan (n. 94 m²) — ei vielä hyväksytty. Sopii sijoittajalle, yritykselle tai projektitoimistokäyttöön.",
      url: BASE_URL,
      image: `${BASE_URL}/og-image.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pitkänsillankatu 18",
        addressLocality: "Kokkola",
        postalCode: "67100",
        addressCountry: "FI",
        addressRegion: "Keski-Pohjanmaa",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 63.83768,
        longitude: 23.13689,
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: 225,
        unitCode: "MTK",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Myynti",
          price: 119000,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Person",
            name: "Petri Kopsa",
            telephone: "+358503060635",
            email: "petri.kopsa@gmail.com",
          },
        },
        {
          "@type": "Offer",
          name: "Vuokraus yrityksille",
          description: "1 500–2 500 €/kk. Sopii projekteille ja kokouksille.",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 1500,
            maxPrice: 2500,
            priceCurrency: "EUR",
            unitCode: "MON",
          },
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Person",
            name: "Petri Kopsa",
            telephone: "+358503060635",
            email: "petri.kopsa@gmail.com",
          },
        },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Coworking-tila (Terassitalo)", value: true },
        { "@type": "LocationFeatureSpecification", name: "Executive Housing EH1 — PK33", value: true },
        { "@type": "LocationFeatureSpecification", name: "Executive Housing EH2 — Merenranta", value: true },
        { "@type": "LocationFeatureSpecification", name: "Tiimipaketti 1–15 hlö", value: true },
        { "@type": "LocationFeatureSpecification", name: "KIP-alue", value: true },
        { "@type": "LocationFeatureSpecification", name: "225 m² liiketila (VE2: 131 m² + 94 m²)", value: true },
        { "@type": "LocationFeatureSpecification", name: "VE2-ehdotus vireillä 2026", value: true },
        { "@type": "LocationFeatureSpecification", name: "Loft-asunto mahdollinen", value: true },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Pitkänsillankatu 18 – Kokkola",
      inLanguage: ["fi", "sv", "en"],
      publisher: {
        "@type": "Person",
        name: "Petri Kopsa",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Etusivu",
          item: BASE_URL,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}
