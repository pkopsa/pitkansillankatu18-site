# DECISIONS – v6.0.0 (21.10.2026)

Päätökset, jotka tehtiin itsenäisesti PROMPTI_B_v6.md:n toteutuksessa. **Petri lukee ja kuittaa.**
Lähtötila: master = origin/master = tuotanto (`12bb0ff`, v5.5-1). Haara: `release/v6.0.0`.

## ⚠️ Tarkista ennen pushia / mergeä

1. **Pohjapiirros-PDF:issä näkyvät osakenumerot (2226–2332, 2333–2450) ja huonekohtaiset neliöt**
   (94,7 / 49,4 / 9,6 / 5,1 / 3,1 / 2,5 m²) sekä nimi "Kopsa Petri" otsikkokentässä. Ohje käski julkaista
   PDF:t sellaisinaan (README: "JULKAISTAAN"), joten ne ovat mukana – sivun omissa teksteissä näitä lukuja
   ei käytetä. Jos osakenumerot/neliöt eivät saa näkyä, PDF:t ja WebP-kuvat pitää peittää ennen julkaisua.
2. **Vuokrapakettien arviohinnat ja henkilö-/kestorajat** (src/config/site.ts → `RENT`) ovat minun
   johtamiani v5.5:n luvuista: EH1 1–4 hlö, 1–3 kk, 1 500 €/kk · EH2 5–10 hlö, 1–6 kk, 1 800 €/kk ·
   EH3 11–15 hlö, 3–12 kk, 2 500 €/kk (+ alv). Coworking-vertailu 350 €/hlö/kk (v5.5). Kaikki merkitty "arvio".
3. **Välittäjän linkki** `BROKER.listingUrl` = https://www.asuntobjorndahl.fi (yleinen etusivu, ohjeen mukaan).
4. **Kartta on tuotannossa nyt todennäköisesti rikki:** CARTO-karttatiilet vaativat API-avaimen
   ("API KEY REQUIRED"). v6.0.0 vaihtaa OpenStreetMapin tiiliin.

## Vaihe 0 – haara ja versio
- package.json: `version` 4.14.0 → 6.0.0 ja `name` `pitkansillankatu-site` → `pitkansillankatu18-site` (nimi oli kopioitu PK33-reposta).
- package-lock.json synkronoitu; ei uusia riippuvuuksia (paitsi sharp, ks. vaihe 2).
- .gitignore: lisätty `.DS_Store`, `.claude/`, `*.csv`, `*.zip`, `*.tsbuildinfo`. `.env*` oli jo mukana.
- eslint.config.mjs otettu käsin haarasta `origin/vercel/install-vercel-web-analytics-tej0o4` (FlatCompat). Haaraa ei mergetty.

## Vaihe 1 – yksi totuuden lähde
- `src/config/site.ts`: hinta, pinta-ala + areaBasis (FI/SV/EN), jakoesityksen pinta-alat (LH 19A 107, A 19B 118),
  välittäjä, omistaja, linkit, `LAST_UPDATED` (21.10.2026), vuokrapakettien arviot, `formatEur`/`telHref`/`formatDate`.
- Hinnat, puhelinnumerot ja linkit luetaan configista (sivu, metatiedot, JSON-LD). `git grep "119 000\|119000"` → 0.
- **petri.kopsa@gmail.com poistettu sivulta**: omistajan sähköposti on configin mukaan info@terassitalo.com.
- Yhteystiedot jaettu: Myynti → välittäjä, Vuokraus ja esittelyt → Petri Kopsa (050 306 0635, info@terassitalo.com).

## Vaihe 2 – kuvat
- Lähde: kuvat-katutaso (23) + kuvat-alakerta (5). kuvat-alkuperaiset-raw ei käytössä.
- **Rekisterikilvet:** pk18-katu-nayteikkunat.jpg (ohjeen mukaan) ja lisäksi **pk18-julkisivu-pitkansillankatu.jpg**,
  jossa oli 2 luettavaa kilpeä (valkoinen VW, harmaa Audi) + 2 osittaista. Sumennetut versiot repon ulkopuolelle:
  `kuvat-katutaso/*-sumennettu.jpg`. Koordinaatit: `scripts/blur-plates.mjs`.
- `scripts/optimize-images.mjs` (pohja: pk18-aineiston skripti): OUT `public/img/pk18`, sumennettu versio korvaa
  alkuperäisen, 2400 px (q85, ≤ 900 kt) 8 kuvasta, manifesti `src/data/pk18-images.json`. Tulos: 92 tiedostoa,
  suurin 800–1600 px 247 kt, suurin 2400 px 766 kt. EXIF poistettu.
- sharp lisätty devDependencyksi (0.34.5 = sama kuin Next.js:n). `npm run images`.
- next/image + oma loader (`src/data/gallery.ts`) valitsee valmiin WebP-version → ei Vercelin kuvaoptimointia.
  width/height/aspect-ratio → CLS 0. Hero `priority`.
- Galleria: Ulkoa ja sijainti (4), Katutaso (19), Pohjakerros – A 19B (5). Hero: pitka-poyta-ikkunat.
- Alt-tekstit FI/SV/EN tiedostonimen mukaan (`translations.ts` → `alt`).
- Historiallinen katukuva `katu-historia.jpeg` säilytetty sijaintiosiossa (ei korvaavaa).
- **Poistetut vanhat kuvat:** public/kip18-daylounge-avara.jpg, kip18-daylounge-kokous.jpg, kip18-daylounge-naytto.jpg,
  kip18-julkisivu-sisaankaynti.jpg, kip18-julkisivu.jpg, kip18-kaytatava.jpg, kip18-keittio.jpg, kip18-keittioalue.jpg,
  kip18-neuvottelu.jpg, kip18-toimisto.jpg, katu-nyt.jpeg, retta-logo-dark.svg (ei käytössä),
  public/docs/katu-historia.jpeg ja public/docs/katu-nyt.jpeg (kaksoiskappaleita). og-image.jpg uusittu.

## Vaihe 3 – asiakirjat
- **Poistetut PDF:t (git rm, eivät enää julkisia):** Ehdotus_Yhtiokokoukselle_VE2.pdf, osakas-aloite-kayttotarkoituksen-muutos.pdf,
  yhtiokokouskutsu-19-5-2026.pdf, tilinpaatos-2025.pdf, isannoitsijantodistus.pdf, kunnossapito2025.pdf,
  kunnossapitotarveselvitys-2026.pdf. Perustelu: yhtiökokous-/suunnitelma-aineistoja tai vastike-/velkaosuustietoja
  sisältäviä taloyhtiön asiakirjoja, jotka vanhenevat – ajantasaiset välittäjältä ("Taloyhtiön asiakirjat … saat välittäjältä").
  Huom: tiedostot ovat yhä git-historiassa ja vanhassa tuotannossa, kunnes v6.0.0 julkaistaan.
- Pohjapiirrokset → `public/docs/pk18-pohjapiirros-katutaso-lh19a-a19b.pdf` ja `…-pohjakerros-a19b.pdf` (tavu tavulta samat).
  Web-kuvat 200 dpi → WebP 800/1600. **pdftoppm puuttuu koneelta** → `scripts/render-pdf.swift` (macOS PDFKit).
- Esitys-docx/PDF ja pöytäkirja eivät ole repossa eivätkä sivulla.
- Jakoesityksen FI-teksti sanatarkasti ohjeesta; pinta-alat interpoloidaan configista (tulos sama).
- Taloyhtiöosio säilytetty ilman rahalukuja: tehdyt korjaukset + tulevat hankkeet (ei kassavaroja, ylijäämää tai vastiketta).
- Poistettu SVG-pohjapiirros (huonekohtaiset neliöt) ja "katutaso n. 166 m² + kellari n. 59 m²" -teksti.

## Vaihe 4 – myynti ja metatiedot
- Sivu on nyt kolmessa reitissä `/`, `/sv`, `/en` (sisältö `src/components/HomeContent.tsx`), jotta title/description/OG
  voivat olla kielikohtaisia (`src/config/seo.ts`). Kielivalitsin vaihtaa kielen kuten ennen (URL ei vaihdu).
- `<html lang>` on palvelimen HTML:ssä aina "fi" (root layout); selain päivittää sen valitun kielen mukaan.
- JSON-LD: `Office` (kuten v5.5), Offer Sell (businessFunction Sell, 108 000 €, seller RealEstateAgent Asunto Björndahl)
  + Offer LeaseOut ilman hintaa. BreadcrumbList (1 kohta) poistettu tarpeettomana. Hakusanoista poistettu VE2, sijoitus, majoitus.
- og-image.jpg 1200×630 sumennetusta julkisivukuvasta (`scripts/generate-og-image.mjs`).

## Vaihe 5 – kaupallinen viesti
- EH1 Executive Suite / EH2 Projektitoimisto / EH3 Projektikeskus + Koko tila 225 m² (pyydä tarjous). Ei yöhintoja, ei majoitusta;
  majoituksesta linkki pitkansillankatu33.comiin.
- Vanha kustannusvertailu (hotelli + EH-majoitus) poistettu kokonaan – siinä oli majoitushinnat. Tilalle uusi
  kuukausikustannuslaskuri (`RentPackages.tsx`), jossa ei myynti- eikä tuottolukuja.
- Poistetut komponentit: InvestorSection, CostComparison, ExecutiveHousingSection, DayRental, FloorPlan, lib/pricing.ts.
- Päivävuokraosio (hinnat 50/150/300 €) → ekosysteemikortti "Tarvitsetko tilaa vain päiväksi?" → terassitalo.com/varauskalenteri.
- "Miksi tämä toimitila" #6 "B2B-Sijoituskohde" → "Tilat, projektinjohto ja majoitus". Edut #3 "Kannattava investointi" → "Vuokralle tai omaksi".
- Yhteydenottolomake näkyvissä (ei ollut piilossa); heron ja pakettien painikkeet esitäyttävät viestin.
- Oikotie-linkki (vanha 119 000 € -ilmoitus) poistettu; korvattu broker.listingUrl:lla.

## Vaihe 6 – ekosysteemi
- Kolme korttia (petrikopsa.com, terassitalo.com/varauskalenteri, pitkansillankatu33.com) ja footerin linkit + Asunto Björndahl.

## Vaihe 7 – korjaukset
- vercel.json: poistettu pitkansillankatu33.com-ohjaus; `deploymentEnabled: true` säilytetty (= tuotannon nykytila).
  www → apex on myös next.config.ts:ssä (pysyvä). **Ehdotus (Petri tekee Vercelissä):** Domains → www.pitkansillankatu18.com →
  Redirect to pitkansillankatu18.com → muuta 307 (Temporary) → **308 (Permanent)**. En muuttanut Vercel-/DNS-asetuksia.
- api/contact: käyttäjän syöte HTML-koodataan sähköpostissa (aiemmin HTML-injektio mahdollinen), sähköpostin muototarkistus.
- Kartta: CARTO → OpenStreetMap-tiilet; Leaflet ladataan vasta kun kartta on lähellä näkymää.
- `npm audit fix` (ilman --force): next 15.5.14 → 15.5.28 (kriittinen poistui). 15 → 9 haavoittuvuutta.
  **Jäljellä (vaativat major-päivityksen, ei tehty):** next → 16 (moderate, sis. postcss), nodemailer 8 → 10 (high),
  sharp 0.34 → 0.35 (high, libvips), eslint-config-next / @next/eslint-plugin-next / braces / micromatch / fast-glob (high, vain kehitys).

## Vaihe 8 – laatu
- FI/SV/EN samalla sisällöllä. **Petri tarkistaa sv/en** – käänsin itse (mm. pohjakerros = "nedre våning" / "lower floor").
- `npm run lint` ✔, `npm run build` ✔ (9 sivua). Mobiili 390 px ja desktop 1440 px tarkistettu kuvakaappauksin: ei vaakaskrollia.
- **Lighthouse 13.5 (paikallinen tuotantobuild, `next start`):**
  | | Performance | Accessibility | Best practices | SEO | LCP | CLS |
  |---|---|---|---|---|---|---|
  | Mobiili (2 ajoa) | 95 / 96 | 100 / 100 | 96 | 100 | 2,7–2,9 s | 0 |
  | Desktop | 98 | 97 | 96 | 100 | 1,1 s | 0 |
  - Best practices 96: Vercel Analytics -skriptit puuttuvat paikallisesti (404) – Vercelissä ok.
  - Desktop accessibility 97: kontrastihuomiot mitattiin FadeIn-animaation aikana (läpinäkyvyys kesken); samat luokat läpäisevät mobiilissa.
- git grep 119 000, 119000, VE2, VEN0, vastike, sijoittaja, preview=true, pöytäkirja → ei osumia sisällössä,
  paitsi "pöytäkirja 5/2026, § 4" ja "vastikepinta-aloja" (VE2-osumat ovat satunnaisia tavuja WebP-kuvissa).

## Katselmointi 21.10.2026 (Petrin palaute esikatselusta)
- **B-logot:** löytyi 3 (julkisivu 2 ikkunaa, näyteikkunat-2 porras); sisäkuvissa ei. Ne olivat kuvaan lisättyjä merkkejä,
  eivät fyysisiä tarroja. Poisto `scripts/remove-logos.py` (OpenCV, ajettu erillisessä venvissä): vasen ikkuna shiftmap,
  oikea ikkuna kloonattu vasemmasta, porras rivi-interpolointi + kivetyksen tekstuuri. Tulos `kuvat-katutaso/*-muokattu.jpg`
  (repon ulkopuolella); kuvaskripti käyttää muokattu > sumennettu > alkuperäinen. og-image uusittu.
- **Hero:** otsikko 2xl → 5xl (oli 1.9rem → 7xl), `225 m²` sitovalla välilyönnillä, sisältö ylhäällä ja liukuvärjäys
  vaalenee alaspäin → taustakuva näkyy. Pienille teksteille varjo luettavuuden vuoksi.
- **Painikkeet:** samankokoiset (leveys 16/18 rem, min. korkeus 3,5 rem); pidempi teksti rivittyy kahdelle riville.
- **Myyntihinta:** `clamp(2rem, 5,5vw, 3,5rem)` + `nowrap`.
- **Fonttikoot:** kaikki osio-otsikot 3xl/5xl (paitsi pitkä jakoesityksen otsikko 2xl–4xl), tunnisteet sm/base,
  "Ota yhteyttä" pienennetty muiden tasolle, "Miksi tämä toimitila" -tunniste poistettu (oli otsikon toisto).
- **Tarkistus:** automaattinen ylivuototesti 9 leveydellä (320–1440 px) × FI/SV/EN → 0 ylivuotoa (ennen 6).
  Lighthouse mobiili /sv: 95 / 100 / 96 / 100.

## Katselmointi 2 (21.10.2026): logot, välimuisti ja v5.5-kuvat
- **"Logot jäivät kuviin" = selaimen välimuisti:** julkaistavissa tiedostoissa ei ollut logoja (tarkistettu), mutta kuvat
  julkaistiin samoilla URL:eilla ja `Cache-Control: immutable, max-age=1 v` piti vanhat versiot selaimessa. Korjaus:
  manifestiin sisällön SHA-1-tarkiste → loader lisää `?v=`; pohjapiirroksille `?v=20261017`, og-imagelle `?v=LAST_UPDATED`.
- **Logojen paluun esto (3 kerrosta):** (1) `REQUIRED_EDITS` – julkisivu ja näyteikkunat-2 vain `-muokattu`-versiona;
  (2) `findLogos` jokaiselle lähdekuvalle `npm run images` -ajossa; (3) `prebuild` ajaa tunnistimen kaikille `public/img`-kuville
  → Vercel-build epäonnistuu, jos logo pääsee kuviin. Testattu: alkuperäiset 3/3 logoa tunnistettu, 0 väärää hälytystä
  muissa 26 + 10 kuvassa; virheellinen ajo ei kirjoita manifestia. Sääntö kirjattu CLAUDE.md:hen ja README:hen.
- **v5.5-kuvat:** 11 kuvaa git-historiasta → `pk18-aineisto/kuvat-v5-live/`. Sävysovitus LAB-avaruudessa
  (valkotasapaino, L-prosenttipisteet, kroma vain lisäten; sisäkuvat sisäkuviin, ulkokuvat lievemmin) →
  `kuvat-v5-sovitettu/`. Omana galleriaosionaan "Lisäkuvia – tila projektitoimistona", jotta ammattikuvaosiot pysyvät yhtenäisinä.
  Pilvisen sään ulkokuvia ei voi muuttaa aurinkoisiksi – ne poikkeavat hieman ammattikuvien ulkokuvista.
- **Jätetty pois:** `kip18-kaytatava.jpg` – oviaukosta näkyy sänky, mikä liiketilan markkinoinnissa voi herättää kysymyksiä
  asumiskäytöstä. Lisätään, jos Petri haluaa.
- **Kilvet v5.5-kuvissa:** katunäkymän Volvo ja kahden julkisivukuvan ikkunaheijastukset sumennettu (eivät olleet selvästi luettavia).

## Avoimet asiat
- **v6.0.1:** julkinen Etuovi/Dixu-ilmoituslinkki `BROKER.listingUrl`:iin.
- **v6.0.1:** sv/en-tekstien tarkistus (Petri).
- Ilmakuvat (raw d_4, d_7: logo-pinni keskellä) – ei käytetty.
- Kiosk-automaattiskrollaus on päällä kaikille kävijöille (kuten v5.5). Harkitse rajausta esim. `?kiosk=1` – vaatii TV:n URL-muutoksen.
- npm audit -major-päivitykset (Next 16, nodemailer 10, sharp 0.35).
- Vercel Domains 307 → 308 (ks. vaihe 7).
- Kielivalitsin ei vaihda URL:ia (/sv, /en) – voisi ohjata reitille.
- Repo-siivous myöhemmin (ei tässä): `feature/ve2-executive-housing`- ja `vercel/install-vercel-web-analytics-…`-haarat GitHubissa;
  masterin `stash@{0}` (package-lock versiokenttä) voi poistaa.
- pk18-aineisto: `kuvat-katutaso/*-sumennettu.jpg` uusia tiedostoja repon ulkopuolella (Drive-kopio päivitettävä tarvittaessa).
