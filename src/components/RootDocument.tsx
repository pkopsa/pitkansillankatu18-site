import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OWNER, SITE_URL, type Lang } from "@/config/site";
import "@/app/globals.css";
import { buildJsonLd } from "@/config/structured-data";

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

export default function RootDocument({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: Lang;
}>) {
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c") }}
        />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}
