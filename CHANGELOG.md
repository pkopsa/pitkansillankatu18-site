# Muutosloki

## 6.0.0 – 2026-10-21

### Muutettu
- **Hinta:** velaton hinta 108 000 € (oli 119 000 €). Myynti Asunto Björndahl Kokkola LKV Oy / Petri Kaskilahti.
- **Viesti:** toimisto-, projekti- ja edustustila – vuokralle tai myyntiin. Uusi hero ja alaotsikko (FI/SV/EN).
- **Executive Suite / EH1–EH3** ovat nyt tilapaketteja (kenelle, tila, kesto, arviohinta €/kk + alv).
  Uusi paketti "Koko tila 225 m²" – pitkäaikainen vuokraus, pyydä tarjous.
- **Laskuri:** kuukausikustannuslaskuri vuokra-asiakkaalle (paketti, €/kk, €/hlö, vertailu coworkingiin).
- **Metatiedot:** title, description ja OpenGraph kolmella kielellä. Uudet reitit `/sv` ja `/en` (hreflang).
  JSON-LD: Offer Sell 108 000 € + Offer LeaseOut. Uusi og-image julkisivukuvasta.
- **Kartta:** OpenStreetMapin tiilet (CARTO vaati API-avaimen). Kartta ladataan vasta näkyvissä.
- ESLint-konfiguraatio FlatCompat-muotoon – `npm run lint` toimii taas.
- Paketin nimi `pitkansillankatu18-site`, versio 6.0.0.

### Lisätty
- **Kuvat:** 28 uutta kuvaa kolmessa galleriaosiossa (Ulkoa ja sijainti 4, Katutaso 19, Pohjakerros – A 19B 5),
  WebP 800/1200/1600 px + 2400 px lightboxiin. Rekisterikilvet sumennettu. Alt-tekstit FI/SV/EN.
- **Huoneiston jako -osio:** hallituksen käsittely 7.10.2026 (pöytäkirja 5/2026, § 4) ja 17.10.2026 esitys:
  LH 19A 107 m² ja A 19B 118 m² (yhtiöjärjestyksen vastikepinta-alat). Pohjapiirrokset kuvina ja PDF:inä.
- **Kohde myynnissä -osio** välittäjän yhteystiedoilla ja myynti-ilmoituslinkillä.
- **Ekosysteemilinkit:** petrikopsa.com, terassitalo.com (varauskalenteri), pitkansillankatu33.com.
- Kuvaskriptit: `npm run images`, `scripts/blur-plates.mjs`, `scripts/generate-og-image.mjs`, `scripts/render-pdf.swift`.
- .gitignore: `.DS_Store`, `.claude/`, `*.csv`, `*.zip`, `*.tsbuildinfo`.

### Poistettu
- VE2-banneri ja -osiot, "~131 m²" / "~94 m²", huonekohtaiset neliöt ja SVG-pohjapiirros.
- Sijoittaja- ja tuottolaskurit, sijoittajan tarkistuslista, vastikelaskelmat.
- Majoitus- ja yöhinnat (EH1–EH3), hotellivertailu, päivävuokrahinnat (→ terassitalo.com).
- Vanhat yhtiökokous- ja taloyhtiön PDF:t (`public/docs/`) sekä vanhat kip18-kuvat.
- Oikotie-linkki (vanha ilmoitus) ja vercel.json:n väärä pitkansillankatu33.com-ohjaus.

### Katselmointi 21.10.2026 (Petrin palaute)
- Björndahlin pyöreä punainen B-logo poistettu kuvista (julkisivu, näyteikkunat-2) – `scripts/remove-logos.py`.
- Hero: otsikko pienempi (myös ruotsiksi mahtuu), teksti ylempänä, taustakuva näkyy tekstin alla; painikkeet samankokoisia.
- "Kohde myynnissä": hinta skaalautuu laatikon leveyteen eikä katkea.
- Fonttikoot yhtenäistetty: osio-otsikot ja tunnisteet samankokoisia; "Miksi tämä toimitila" ei enää kahteen kertaan.
- Laskurin ja kasvutarinan tekstien ylivuodot kapeilla näytöillä korjattu.

### Korjattu
- Lomakkeen API: käyttäjän syöte koodataan HTML-sähköpostissa; sähköpostin muototarkistus.
- `npm audit fix`: Next.js 15.5.14 → 15.5.28 (kriittinen haavoittuvuus).
- Lightbox: dialog-rooli, fokuksen hallinta, käännetyt painiketekstit.
- Kontrastit ja kovakoodatut suomenkieliset tekstit sv/en-versioissa.
