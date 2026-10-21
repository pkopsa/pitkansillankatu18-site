# pitkansillankatu18.com

Myynti- ja vuokrasivusto toimitilalle As Oy Kokkolan Pitkänsillankatu 18:ssa (Terassitalo, LH 19, 225 m²).

**Versio:** 6.0.0 (21.10.2026) – muutokset: [CHANGELOG.md](CHANGELOG.md), päätökset: [DECISIONS-v6.md](DECISIONS-v6.md)
**Live:** https://pitkansillankatu18.com (kieliversiot `/sv` ja `/en`)
**Vercel-projekti:** pitkansillankatu18-site

## Stack

- Next.js 15 · App Router · React 19 · TypeScript
- Tailwind CSS v4 (@tailwindcss/postcss)
- Vercel – **automaattinen julkaisu masterista** (`vercel.json`: `deploymentEnabled: true`)

## Kehitys

```bash
npm run dev      # localhost:3000 (Webpack, ei Turbopack)
npm run build    # Tuotantobuild
npm run lint     # ESLint
npm run images   # Kuvat pk18-aineistosta → public/img/pk18 (WebP)
```

> **Huom.** Tämän koneen CPU ei tue BMI2-käskyjä — Turbopack kaatuu. Älä lisää `--turbopack`-lippua.

## Julkaisu

Push tai merge **masteriin julkaisee tuotantoon automaattisesti**. Tee muutokset haarassa –
Vercel tekee haarasta esikatselun (preview) – ja mergeä vasta hyväksynnän jälkeen.

## Muuttuvat tiedot – yksi totuuden lähde

`src/config/site.ts`: velaton hinta, pinta-ala, jakoesityksen pinta-alat, välittäjä, omistajan
yhteystiedot, ekosysteemilinkit, päivitetty-päivä ja vuokrapakettien arviohinnat.
Sivu, metatiedot (`src/config/seo.ts`) ja JSON-LD (`src/app/layout.tsx`) lukevat arvot sieltä.

## Rakenne

```
src/
  app/
    page.tsx, sv/page.tsx, en/page.tsx — kieliversiot (metatiedot) → HomeContent
    layout.tsx        — root layout, yhteiset metatiedot, JSON-LD
    sitemap.ts        — kolme kieliversiota
    api/contact/      — yhteydenottolomakkeen API-reitti (Nodemailer)
  components/
    HomeContent       — koko sivu (kaikki osiot, kiosk-skrollaus)
    RentPackages      — tilapaketit EH1–EH3 + koko tila, kuukausikustannuslaskuri
    ContactSection    — lomake
    GrowthStory       — Kokkolan kasvutarina
    PropertyMap       — Leaflet-kartta (ladataan vasta näkyvissä)
    Lightbox          — kuvakatselu (näppäimistö + kosketus)
    LanguageSwitcher  — fi / sv / en
  config/site.ts      — muuttuvat tiedot
  config/seo.ts       — title/description/OpenGraph kielittäin
  data/gallery.ts     — gallerian osiot + WebP-kuvanlataaja
  data/pk18-images.json — kuvien mitat (npm run images kirjoittaa)
  translations.ts     — kaikki UI-tekstit kolmella kielellä + alt-tekstit
public/
  img/pk18/           — tilakuvat WebP 800/1200/1600 (+ 2400 lightboxiin)
  img/pohjapiirros/   — pohjapiirrokset WebP
  docs/               — pohjapiirros-PDF:t (LH 19A / A 19B)
  og-image.jpg        — 1200×630
scripts/
  optimize-images.mjs — kuvien optimointi (sharp)
  blur-plates.mjs     — rekisterikilpien sumennus lähdekuviin
  generate-og-image.mjs — og-image.jpg julkisivukuvasta
  render-pdf.swift    — PDF → PNG (macOS PDFKit; korvaa pdftoppm:n)
```

Lähdekuvat ja -asiakirjat ovat repon ulkopuolella: `~/kopsa-web/pk18-aineisto`.

## Kiosk-tila

Sivu skrollaa automaattisesti ja vaihtaa kieltä (fi → sv → en → fi) kiosk-näyttöä varten.
Touch/pyörä/näppäimistö pysäyttää automaattiskrollauksen; jatkuu 30 s kuluttua.
Wake Lock API pitää näytön päällä Chromium-pohjaisissa selaimissa.

## Muutosloki

Katso [CHANGELOG.md](CHANGELOG.md). Tagit: `git tag --sort=-version:refname`.
