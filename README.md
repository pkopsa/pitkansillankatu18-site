# pitkansillankatu18.com

Myynti- ja markkinointisivusto toimitilahuoneistolle As Oy Kokkolan Pitkänsillankatu 18:ssa (Terassitalo, LH 19, 225 m²).

**Live:** https://pitkansillankatu18.com  
**Vercel-projekti:** pkopsas-projects/pitkansillankatu18-site

## Stack

- Next.js 15 · App Router · React 19 · TypeScript
- Tailwind CSS v4 (@tailwindcss/postcss)
- Vercel (manuaalinen deploy — `git.deploymentEnabled: false`)

## Kehitys

```bash
npm run dev      # localhost:3000 (Webpack, ei Turbopack)
npm run build    # Tuotantobuild
npm run lint     # ESLint
```

> **Huom.** Tämän koneen CPU ei tue BMI2-käskyjä — Turbopack kaatuu. Älä lisää `--turbopack`-lippua.

## Deploy

```bash
vercel --prod
```

Git-push ei triggeröi automaattideploya (`vercel.json`: `deploymentEnabled: false`).

## Versiointi

Tagit: `v4.x` — katso `git tag --sort=-version:refname`.  
Julkaisukandidaatti merkitään tagilla ennen jokaista merkittävää esittelyä tai yhtiökokousta.

## Rakenne

```
src/
  app/
    page.tsx          — pääsivu (kaikki osiot)
    layout.tsx        — root layout, metadata, JSON-LD
    api/contact/      — yhteydenottolomakkeen API-reitti (Nodemailer)
  components/
    ContactSection    — lomake
    DayRental         — päivävuokrausosio
    CostComparison    — kustannusvertailu (piilotettu yhtiökokoukseen asti)
    InvestorSection   — sijoittajatiedot (piilotettu yhtiökokoukseen asti)
    GrowthStory       — Kokkolan kasvutarina
    FloorPlan         — pohjapiirros (SVG)
    PropertyMap       — Leaflet-kartta
    Lightbox          — kuvakatselumoduuli
    LanguageSwitcher  — fi / sv / en
  translations.ts     — kaikki UI-tekstit kolmella kielellä
public/
  *.jpg / *.jpeg      — tilakuvat
  katu-historia.jpeg  — historiallinen katukuva
  docs/               — taloyhtiön PDF-asiakirjat
```

## Kiosk-tila

Sivu skrollaa automaattisesti ja vaihtaa kieltä (fi → sv → en → fi) kiosk-näyttöä varten.  
Touch/pyörä/näppäimistö pysäyttää automaattiskrollauksen.

Wake Lock API pitää näytön päällä Chromium-pohjaisissa selaimissa.
