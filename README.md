# pitkansillankatu18.com

Myynti- ja vuokrasivusto toimitilalle As Oy Kokkolan Pitkänsillankatu 18:ssa (Terassitalo, LH 19, 225 m²).

**Versio:** 6.0.1 (21.10.2026) – muutokset: [CHANGELOG.md](CHANGELOG.md), päätökset: [DECISIONS-v6.md](DECISIONS-v6.md)
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
npm run images   # Kuvat pk18-aineistosta → public/img/pk18 (WebP) + logotarkistus
npm run check:images  # Björndahl-logotarkistus public/img-kuville (ajetaan myös ennen buildia)
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
    (fi)/page.tsx, (sv)/sv/page.tsx, (en)/en/page.tsx — kieliversiot → HomeContent
    (fi|sv|en)/layout.tsx — palvelimen kieli; yhteinen components/RootDocument
    sitemap.ts        — kolme kieliversiota
    api/contact/      — yhteydenottolomakkeen API-reitti (Nodemailer)
  components/
    HomeContent       — koko sivu (kaikki osiot, kiosk-skrollaus)
    RentPackages      — tilapaketit EH1–EH3 + koko tila, kuukausikustannuslaskuri
    ContactSection    — lomake
    GrowthStory       — Kokkolan kasvutarina
    PropertyMap       — Leaflet-kartta (ladataan vasta näkyvissä)
    Lightbox          — kuvakatselu (näppäimistö + kosketus)
    LanguageSwitcher  — fi / sv / en reittilinkkeinä
  config/site.ts      — muuttuvat tiedot
  config/seo.ts       — title/description/OpenGraph kielittäin
  config/structured-data.ts — RealEstateListing, Place, LocalBusiness ja tarjoukset
  data/gallery.ts     — gallerian osiot + WebP-kuvanlataaja
  data/pk18-images.json — kuvien mitat (npm run images kirjoittaa)
  translations.ts     — kaikki UI-tekstit kolmella kielellä + alt-tekstit
public/
  img/pk18/           — tilakuvat WebP 800/1200/1600 (+ 2400 lightboxiin)
  img/pohjapiirros/   — pohjapiirrokset WebP
  docs/               — pohjapiirros-PDF:t + julkinen, päivätty jakoehdotuksen yhteenveto
  og-image.jpg        — 1200×630
scripts/
  optimize-images.mjs — kuvien optimointi (sharp), versiotarkiste ?v=
  check-logos.mjs     — Björndahlin B-logon tunnistin (prebuild + images)
  remove-logos.py     — B-logon poisto lähdekuvista (OpenCV, erillinen venv)
  grade-v5-photos.py  — v5.5-kuvien sävysovitus ammattikuviin (OpenCV)
  blur-plates.mjs     — rekisterikilpien sumennus lähdekuviin
  generate-og-image.mjs — og-image.jpg julkisivukuvasta
  render-pdf.swift    — PDF → PNG (macOS PDFKit; korvaa pdftoppm:n)
```

Lähdekuvat ja -asiakirjat ovat repon ulkopuolella: `~/kopsa-web/pk18-aineisto`.

### Kuvat: Björndahlin logo EI saa palata

Kuvaajan lähdekuvissa on Asunto Björndahlin pyöreä punainen B-logo (julkisivu, näyteikkunat-2).
- Julkaistava versio tehdään aina `scripts/remove-logos.py`:llä (`…-muokattu.jpg`); `npm run images` hylkää näistä kuvista muun version.
- `scripts/check-logos.mjs` tunnistaa logon: se ajetaan `npm run images` -ajossa jokaiselle lähdekuvalle ja `prebuild`-vaiheessa kaikille `public/img`-kuville – build epäonnistuu, jos logo löytyy. Älä ohita tarkistusta.
- Uudet kuvat lisätään vain `npm run images` -putken kautta (ei suoraan `public/`-kansioon).
- Kuvien URL:issa on sisällön tarkiste (`?v=`), koska kuvat välimuistitetaan vuodeksi (`immutable`); älä poista sitä.

## Kiosk-tila

Sivu skrollaa automaattisesti ja vaihtaa kieltä (fi → sv → en → fi) kiosk-näyttöä varten.
Touch/pyörä/näppäimistö pysäyttää automaattiskrollauksen; jatkuu 30 s kuluttua.
Wake Lock API pitää näytön päällä Chromium-pohjaisissa selaimissa.

## Muutosloki

Katso [CHANGELOG.md](CHANGELOG.md). Tagit: `git tag --sort=-version:refname`.

## Hyväksymistestaus (UAT)

`npm ci` → `npx playwright install chromium` → `npm run test:uat`. Testit rakentavat tuotantoversion ja käynnistävät sen paikallisesti porttiin 3118; `BASE_URL` voi osoittaa erikseen käynnistettyyn paikalliseen testipalvelimeen. Lomakelähetykset korvataan testivastauksilla. Testit tarkastavat FI/SV/EN, desktop/mobiili, hinnat, jakoesityksen, kolme PDF:ää, laskurin, kuvat, linkit ja indeksointivalmiuden.

Auditointi ja liiketoiminnan avoimet asiat: [docs/uat/PK18-UAT-raportti.md](docs/uat/PK18-UAT-raportti.md).
Petrikopsa.comin synkronointisuunnitelma ja valmis FI/SV/EN-osio: [docs/uat/PETRIKOPSA-SYNKRONOINTI.md](docs/uat/PETRIKOPSA-SYNKRONOINTI.md).

Huomaa: teknisesti vihreä UAT ei vahvista taloyhtiön tekemää päätöstä, konsultoinnin hintaa tai Googlen indeksointia. 17.10. jakoluonnos ja 7.10. pöytäkirja erotetaan toisistaan. Julkinen yhteenveto generoidaan `scripts/generate-split-summary.py`:llä (Python + reportlab); yksityisiä alkuperäisasiakirjoja ei sisällytetä repoon.
