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
    default: "Pitkänsillankatu 18 | Myytävä ja vuokrattava toimitila Kokkolan keskustassa",
    template: "%s | Pitkänsillankatu 18 Kokkola",
  },
  description:
    "225 m² moderni liiketila Kokkolan ydinkeskustassa. Täydellinen projektitoimistoksi Arctial- ja KIP-hankkeisiin tai tuottavaksi sijoituskohteeksi. Tutustu ja pyydä esittely!",

  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    "projekti office Kokkola",
    "projektitiimi toimisto Kokkola",
    "liiketila Kokkola",
    "liiketila myytävänä Kokkola",
    "Pitkänsillankatu 18",
    "Kokkola ydinkeskusta toimitila",
    "KIP-alue Kokkola",
    "turnkey toimisto Kokkola",
    "palaveritila Kokkola",
    "palaverihuone Kokkola",
    "konfidentiaalinen kokoustila Kokkola",
    "sijoituskiinteistö Kokkola",
    "liiketila sijoitus Kokkola",
    "vuokratuotto 12-20 prosenttia",
    "Keliber projektitiimi Kokkola",
    "Boliden koordinaatio Kokkola",
    "Arctial toimisto Kokkola",
    "suurhanke toimisto Kokkola",
    "24/7 työtila Kokkola",
    "toimitila vuokraus Kokkola",
    "yritysvuokraus Kokkola",
    "149000 liiketila Kokkola",

    // ── RUOTSI ─────────────────────────────────────────────────────
    "affärslokal Karleby",
    "projektteam kontor Karleby",
    "KIP-området Karleby",
    "kommersiell fastighet Karleby",
    "investering Karleby",
    "företagslokal Karleby",
    "hyreslokal Karleby",
    "hyresavkastning 12-20 %",
    "mötesrum Karleby",
    "möteslokal Karleby",
    "storprojekt kontor Karleby",

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
    "meeting room Kokkola",
    "business hub Finland",
    "Keliber Boliden Arctial office Kokkola",
    "turnkey project office Finland",
    "confidential meeting space Kokkola",
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
    title: "Pitkänsillankatu 18 – Turnkey Projekti Office | Kokkola",
    description:
      "225 m² konfidentiaalinen projekti office Kokkolan ydinkeskustassa. 7 min KIP-alueelle. 149 000 € tai 1 500–2 500 €/kk. Bruttotuotto 12–20 %.",
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
    title: "Pitkänsillankatu 18 – Turnkey Projekti Office | Kokkola",
    description:
      "225 m² turnkey projekti office Kokkolan ydinkeskustassa, 7 min KIP-alueelle. Konfidentiaalinen palaveri- ja koordinaatiotila suurhankkeille. 149 000 € tai 1 500–2 500 €/kk.",
    images: ["/og-image.jpg"],
  },

  other: {
    "geo.region": "FI-07",
    "geo.placename": "Kokkola",
    "geo.position": "63.83795;23.13010",
    "ICBM": "63.83795, 23.13010",
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
        "225 m² turnkey projekti office Kokkolan ydinkeskustassa. Konfidentiaalinen palaveri- ja koordinaatiotila suurhankkeille (Keliber, Boliden, Arctial). 7 min KIP-alueelle. Vuokrattavissa 1 500–2 500 €/kk tai myytävänä 149 000 €.",
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
        latitude: 63.83795,
        longitude: 23.13010,
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
      <body className="min-h-full flex flex-col">
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}
