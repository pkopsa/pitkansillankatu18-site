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
    default: "Pitkänsillankatu 18 – Liiketila + Loft | VE2-ehdotus | Kokkola 119 000 €",
    template: "%s | Pitkänsillankatu 18 Kokkola",
  },
  description:
    "225 m² liiketila Kokkolan ydinkeskustassa, 119 000 €. Vireillä VE2-ehdotus: jako liikehuoneistoon (~131 m²) ja Loft-asuntoon (~94 m²). KIP-alueen projektitiimeille tai sijoittajalle. Vuokratuotto ~9–10 %.",

  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    // Myynti & sijoitus
    "liiketila myytävänä Kokkola",
    "sijoituskiinteistö Kokkola",
    "toimitila Kokkola myynti",
    "Pitkänsillankatu 18",
    "Kokkola ydinkeskusta liiketila",
    "liiketila 225 m² Kokkola",
    "119000 liiketila Kokkola",
    "sijoitustuotto Kokkola",
    // VE2 & loft
    "VE2 ehdotus Kokkola",
    "loft asunto Kokkola",
    "liiketilan jako Kokkola",
    "liikehuoneisto asuinhuoneisto Kokkola",
    // Projektitoimisto & KIP
    "projektitoimisto Kokkola",
    "KIP-alue toimitila",
    "Keliber toimisto Kokkola",
    "Boliden koordinaatio Kokkola",
    "Arctial projektitiimi Kokkola",
    "toimitila vuokraus Kokkola",
    "palaveritila Kokkola",
    "kokoustila Kokkola",
    "edustustila Kokkola",
    // ── RUOTSI ─────────────────────────────────────────────────────
    "affärslokal till salu Karleby",
    "investeringsfastighet Karleby",
    "Pitkänsillankatu 18 Karleby",
    "Karleby centrum affärslokal",
    "VE2 förslag Karleby",
    "loftlägenhet Karleby",
    "projektkontor Karleby",
    "KIP-området Karleby",
    "affärslokal uthyrning Karleby",
    "möteslokal Karleby",
    // ── ENGLANTI ───────────────────────────────────────────────────
    "commercial property for sale Kokkola",
    "investment property Kokkola Finland",
    "Pitkansillankatu 18 Kokkola",
    "commercial space Kokkola city centre",
    "VE2 proposal Kokkola",
    "loft apartment Kokkola",
    "project office Kokkola",
    "KIP zone office space",
    "Keliber Boliden Arctial office Kokkola",
    "meeting room Kokkola",
    "corporate event space Kokkola",
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
    title: "Pitkänsillankatu 18 – Liiketila + Loft VE2 | Kokkola 119 000 €",
    description:
      "225 m² liiketila Kokkolan ydinkeskustassa. VE2-ehdotus: jako liikehuoneistoon (~131 m²) ja Loft-asuntoon (~94 m²) vireillä. Hinta 119 000 €. KIP-alueen kasvu takaa kysynnän.",
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
    title: "Pitkänsillankatu 18 – Liiketila + Loft VE2 | Kokkola 119 000 €",
    description:
      "225 m² liiketila Kokkolan ydinkeskustassa, 119 000 €. VE2-ehdotus: jako liikehuoneistoon + Loft-asuntoon. KIP-alue kasvaa — projektitiimeille tai sijoittajalle.",
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
        "225 m² liiketila Kokkolan ydinkeskustassa. 119 000 €. Vireillä VE2-ehdotus: jakaminen liikehuoneistoksi (n. 131 m²) ja Loft-asuinhuoneistoksi (n. 94 m²). Sopii sijoittajalle, yritykselle tai projektitoimistokäyttöön. Vuokra 1 500–2 500 €/kk.",
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
        { "@type": "LocationFeatureSpecification", name: "KIP-alue", value: true },
        { "@type": "LocationFeatureSpecification", name: "225 m² liiketila (VE2: 131 m² + 94 m²)", value: true },
        { "@type": "LocationFeatureSpecification", name: "VE2-ehdotus vireillä 2026", value: true },
        { "@type": "LocationFeatureSpecification", name: "VE2-ehdotus vireillä", value: true },
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
