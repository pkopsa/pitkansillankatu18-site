import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Pitkänsillankatu 18 – Projekti Office | Kokkola | 225 m²",
    template: "%s | Pitkänsillankatu 18 Kokkola",
  },
  description:
    "225 m² liiketila KIP-alueella Kokkolassa. 149 000 € tai vuokrattavissa 1 500–2 500 €/kk, bruttotuotto jopa 12–20 %. Ota yhteyttä projektitiimitilasta.",

  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    // Myynti
    "sijoitusasunto Kokkola",
    "asuinhuoneisto Kokkola",
    "kaksio Kokkola",
    "Pitkänsillankatu 33",
    "Kokkolan keskusta asunto",
    "asunto myytävänä Kokkola",
    "Kokkola kiinteistö",
    "huipputuotto sijoitus",
    "myynti Kokkola",
    "kerrostaloasunto Kokkola",
    "1930-luvun kerrostalo Kokkola",
    // Vuokraus yrityksille
    "vuokra-asunto Kokkola",
    "vuokra-asunto yritykselle Kokkola",
    "yritysasunto Kokkola",
    "lyhytaikainen vuokra Kokkola",
    "asunto yrityksille Kokkola",
    "työsuhde-asunto Kokkola",
    "kuukausivuokra Kokkola",
    "kalustettu asunto Kokkola",
    "väliaikaismajoitus yrityksille Kokkola",
    "Kokkola yritysvuokraus",
    "asunto vierailijoille Kokkola",
    "majoitus yrityksille Kokkola",
    "business asunto Kokkola",

    // ── RUOTSI ─────────────────────────────────────────────────────
    "affärslokal Karleby",
    "projektteam kontor Karleby",
    "Pitkänsillankatu 18",
    "KIP-området Karleby",
    "kommersiell fastighet Karleby",
    "investering Karleby",
    "företagslokal Karleby",
    "hyreslokal Karleby",
    "hyresavkastning 12-20 %",
    "mötesrum Karleby",

    // ── ENGLANTI ───────────────────────────────────────────────────
    "commercial space Kokkola",
    "project team office Kokkola",
    "Pitkansillankatu 18",
    "KIP zone Kokkola",
    "investment property Kokkola",
    "office space Kokkola",
    "corporate rental Kokkola",
    "gross yield 12-20%",
    "meeting room Kokkola",
    "day lounge Kokkola",
    "business hub Finland",
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
    siteName: "Pitkänsillankatu 18 – Projekti Office",
    title: "Pitkänsillankatu 18 – 225 m² liiketila KIP-alueella | Kokkola",
    description:
      "225 m² liiketila KIP-alueella. 149 000 € tai vuokrattavissa 1 500–2 500 €/kk, bruttotuotto jopa 12–20 %.",
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
    title: "Pitkänsillankatu 18 – Projekti Office | Kokkola",
    description:
      "225 m² KIP-alueen liiketila. 149 000 € tai vuokrattavissa 1 500–2 500 €/kk, sopii projektitiimeille.",
    images: ["/og-image.jpg"],
  },

  other: {
    "geo.region": "FI-07",
    "geo.placename": "Kokkola",
    "geo.position": "63.83768;23.13045",
    "ICBM": "63.83768, 23.13045",
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
        "225 m² liiketila KIP-alueella, vuokrattavissa 1 500–2 500 €/kk tai myytävänä 149 000 €.",
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
        longitude: 23.13045,
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
          description: "1 500–2 500 €/kk. Sopii projekteille, kokouksille ja 24/7 Day Lounge -käyttöön.",
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
        { "@type": "LocationFeatureSpecification", name: "225 m² liiketila", value: true },
        { "@type": "LocationFeatureSpecification", name: "Vuokratuotto 12–20 %", value: true },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
