import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BROKER, LAST_UPDATED, OWNER, PRICE_PER_M2, SALE, SITE_URL, telHref } from "@/config/site";
import { OG_IMAGE } from "@/config/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Yhteiset metatiedot – kielikohtaiset title/description/OG: src/config/seo.ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    "toimitila Kokkola",
    "toimisto vuokralle Kokkola",
    "projektitoimisto Kokkola",
    "projektitila Kokkola",
    "edustustila Kokkola",
    "kokoustila Kokkola",
    "koulutustila Kokkola",
    "tiimitila Kokkola",
    "coworking Kokkola",
    "liiketila myytävänä Kokkola",
    "toimitila myynti Kokkola",
    "Kokkola ydinkeskusta toimitila",
    "Pitkänsillankatu 18",
    "Terassitalo Kokkola",
    "KIP-alue toimitila",
    "Arctial projektitiimi Kokkola",
    "Keliber toimisto Kokkola",
    // ── RUOTSI ─────────────────────────────────────────────────────
    "kontorslokal Karleby",
    "projektkontor Karleby",
    "möteslokal Karleby",
    "affärslokal till salu Karleby",
    "Karleby centrum lokal",
    "Pitkänsillankatu 18 Karleby",
    // ── ENGLANTI ───────────────────────────────────────────────────
    "office space Kokkola",
    "project office Kokkola",
    "meeting room Kokkola",
    "commercial property for sale Kokkola",
    "office for rent Kokkola Finland",
    "KIP zone office space",
    "Arctial project office Kokkola",
  ],
  authors: [{ name: OWNER.name, url: SITE_URL }],
  creator: OWNER.name,
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

  other: {
    "geo.region": "FI-07",
    "geo.placename": "Kokkola",
    "geo.position": "63.83768;23.13689",
    "ICBM": "63.83768, 23.13689",
  },
};

// Rakenteinen data (JSON-LD) Googlelle:
//  - LocalBusiness = itse toimitila (osoite, sijainti, pinta-ala, yhteystieto vuokraukseen)
//  - RealEstateListing = myynti-/vuokrausilmoitus (hinta, €/m², julkaisupäivä)
//  - WebSite = sivusto ja kielet
const intl = (phone: string) => telHref(phone).replace("tel:", "");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#premises`,
      name: "Pitkänsillankatu 18 – toimisto- ja projektitila | Kokkola",
      description: `${SALE.area} m² toimisto-, projekti- ja edustustila Kokkolan ydinkeskustassa. Vuokralle kuukausittain tai myyntiin.`,
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE}`,
      telephone: intl(OWNER.phone),
      email: OWNER.email,
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
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Katutason projektitoimisto", value: true },
        { "@type": "LocationFeatureSpecification", name: "Pohjakerroksen tiimitilat", value: true },
        { "@type": "LocationFeatureSpecification", name: "Keittiö", value: true },
        { "@type": "LocationFeatureSpecification", name: "Ydinkeskusta", value: true },
      ],
    },
    {
      "@type": "RealEstateListing",
      "@id": `${SITE_URL}/#listing`,
      url: SITE_URL,
      name: `Pitkänsillankatu 18, Kokkola – ${SALE.area} m² toimitila, velaton hinta ${SALE.label}`,
      description: `Velaton hinta ${SALE.label} (${PRICE_PER_M2} €/m²), ${SALE.area} m² yhtiöjärjestyksen mukainen pinta-ala, sisältää pohjakerroksen. Myös vuokrattavissa kuukausittain.`,
      datePosted: LAST_UPDATED,
      dateModified: LAST_UPDATED,
      inLanguage: ["fi", "sv", "en"],
      image: `${SITE_URL}${OG_IMAGE}`,
      about: { "@id": `${SITE_URL}/#premises` },
      offers: [
        {
          "@type": "Offer",
          name: "Myynti",
          businessFunction: "http://purl.org/goodrelations/v1#Sell",
          price: SALE.salePriceDebtFree,
          priceCurrency: "EUR",
          priceSpecification: [
            { "@type": "PriceSpecification", price: SALE.salePriceDebtFree, priceCurrency: "EUR", valueAddedTaxIncluded: false },
            {
              "@type": "UnitPriceSpecification",
              price: PRICE_PER_M2,
              priceCurrency: "EUR",
              unitCode: "MTK",
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MTK" },
            },
          ],
          availability: "https://schema.org/InStock",
          url: BROKER.listingUrl,
          itemOffered: {
            "@type": "Place",
            name: "Pitkänsillankatu 18, Kokkola",
            additionalProperty: { "@type": "PropertyValue", name: "Pinta-ala (yhtiöjärjestys)", value: SALE.area, unitCode: "MTK" },
          },
          seller: {
            "@type": "RealEstateAgent",
            name: BROKER.company,
            url: BROKER.listingUrl,
            telephone: intl(BROKER.phone),
            email: BROKER.email,
          },
        },
        {
          "@type": "Offer",
          name: "Vuokraus yrityksille",
          businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#tilapaketit`,
          seller: {
            "@type": "Person",
            name: OWNER.name,
            telephone: intl(OWNER.phone),
            email: OWNER.email,
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Pitkänsillankatu 18 – Kokkola",
      inLanguage: ["fi", "sv", "en"],
      publisher: {
        "@type": "Person",
        name: OWNER.name,
      },
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
