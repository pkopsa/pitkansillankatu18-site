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
    default: "Pitkänsillankatu 18 – Tuleva asuinhuoneisto / projektitoimisto | Kokkola",
    template: "%s | Pitkänsillankatu 18 Kokkola",
  },
  description:
    "225 m² ainutlaatuinen tila Kokkolan ydinkeskustassa. Käyttötarkoituksen muutos asuinhuoneistoksi vireillä yhtiökokouksessa 19.5.2026. Soveltuu pitkäaikaiseen asumiseen, projektitoimistoksi, sekä lyhytaikaisesti pop-up- ja edustustilaksi.",

  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    "asuinhuoneisto Kokkola",
    "kotitoimisto Kokkola",
    "projektitoimisto Kokkola",
    "pop-up tila Kokkola",
    "edustustila Kokkola",
    "kokoustila Kokkola",
    "liiketila Kokkola",
    "liiketila myytävänä Kokkola",
    "Pitkänsillankatu 18",
    "Kokkola ydinkeskusta toimitila",
    "KIP-alue Kokkola",
    "palaveritila Kokkola",
    "sijoituskiinteistö Kokkola",
    "Keliber projektitiimi Kokkola",
    "Boliden koordinaatio Kokkola",
    "Arctial toimisto Kokkola",
    "toimitila vuokraus Kokkola",
    "149000 liiketila Kokkola",
    "käyttötarkoituksen muutos Kokkola",

    // ── RUOTSI ─────────────────────────────────────────────────────
    "affärslokal Karleby",
    "projektteam kontor Karleby",
    "KIP-området Karleby",
    "bostadslägenhet Karleby",
    "projektkontorsbruk Karleby",
    "pop-up lokal Karleby",
    "representationslokal Karleby",
    "mötesrum Karleby",
    "möteslokal Karleby",

    // ── ENGLANTI ───────────────────────────────────────────────────
    "commercial space Kokkola",
    "residential apartment Kokkola",
    "project team office Kokkola",
    "Pitkansillankatu 18",
    "KIP zone Kokkola",
    "investment property Kokkola",
    "pop-up space Kokkola",
    "corporate event space Kokkola",
    "meeting room Kokkola",
    "business hub Finland",
    "Keliber Boliden Arctial office Kokkola",
    "change of use residential Kokkola",
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
    title: "Pitkänsillankatu 18 – Käyttötarkoituksen muutos vireillä | Kokkola",
    description:
      "225 m² tila Kokkolan keskustassa. Yhtiökokouksen käsittelyssä 19.5.2026: muutos asuinhuoneistoksi. 149 000 € tai 1 500–2 500 €/kk.",
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
    title: "Pitkänsillankatu 18 – Käyttötarkoituksen muutos vireillä | Kokkola",
    description:
      "225 m² tila Kokkolan ydinkeskustassa. Yhtiökokouksen asialistalla 19.5.2026: muutos asuinhuoneistoksi. Sopii pitkäaikaiseen asumiseen, projektitoimistoksi tai pop-up-tilaksi. 149 000 €.",
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
      name: "Pitkänsillankatu 18",
      description:
        "225 m² liiketila / tuleva asuinhuoneisto Kokkolan ydinkeskustassa. Käyttötarkoituksen muutos asuinhuoneistoksi vireillä (yhtiökokous 19.5.2026). Soveltuu pitkäaikaiseen asumiseen, projektitoimistoksi tai pop-up-tilaksi. 149 000 € tai 1 500–2 500 €/kk.",
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
          price: 149000,
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
        { "@type": "LocationFeatureSpecification", name: "225 m² liiketila / tuleva asuinhuoneisto", value: true },
        { "@type": "LocationFeatureSpecification", name: "Käyttötarkoituksen muutos vireillä 2026", value: true },
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
