# petrikopsa.com – PMO Hubin synkronointisuunnitelma

## Todennettu lähtötilanne 21.10.2026

Petrikopsa.com palauttaa 200 ja ohjautuu www-osoitteeseen. Nykyinen sivusto markkinoi SAFe-sertifiointikursseja ja tekoälytyöpajoja Kokkolassa tai etänä; navigaatiossa Kurssit, Kouluttaja ja Ehdot. Kurssikohtaiset /kurssit/*-sivut ja /yhteystiedot ovat olemassa. Tässä auditoinnissa ei oleteta sen koodipinoa eikä muokata sen repoa. PK18:n lähdeversio: 6.0.0 / 0d151bd; UAT-korjaukset omassa haarassa.

## Sivustojen vastuut

| Sivusto | Mitä se myy / ensisijainen toiminto | Mitä se ei toista |
|---|---|---|
| petrikopsa.com | Strategic PMO, hankejohto, SAFe-valmennus, viralliset kurssit ja AI-konsultointi; konsultointikeskustelu / kurssi-ilmoittautuminen | Ei PK18:n myyntihintaa tai vuokrapakettien numeroita; nykyisiä kursseja ja ehtoja ei korvata kiinteistösisällöllä |
| pitkansillankatu18.com | Project Hubin tilat, katutaso ja pohjakerros, EH1–EH3:n vuokra-arviot ja pitkä vuokraus; esittely / tilatarjous. Myynti välittäjän kautta | Ei konsultoinnin hinnastoa eikä kurssiaikatauluja |
| terassitalo.com | Lyhytaikainen kokous-, koulutus- ja juhlatila, hinnasto, kalenteri ja tiedustelu | Ei PK18:n myyntitietoja tai PMO-palvelun hintaa |
| pitkansillankatu33.com | Corporate Housing / kalustettu 69 m² kaksio, majoitustiedustelu tai Airbnb-varaus | Ei toimistotilan hinnoittelua eikä konsultointitarjousta |

PK18:n PMO-optio tarkoittaa erillisen konsultointitarjouksen pyytämistä. Konsultoinnin tai majoituksen hintaa ei lisätä laskuriin ennen vahvistettua hinnoittelua. Majoitus ei sisälly EH1–EH3-tilapaketteihin. Yksi vahvistettu hinta pidetään yhden sivuston vastuulla.

## Valmis etusivuteksti

**Otsikko:** Strategic PMO, SAFe ja AI – projektitiimin tueksi Kokkolassa tai etänä

Yhdistä projektin johtaminen, tiimin osaaminen ja toimiva työympäristö. Petri Kopsa tukee hankkeen ohjausta ja käytännön toteutusta; Pitkänsillankatu 18:n Project Hub tarjoaa tilat tiimille.

- **Strategic PMO ja hankejohto:** tilannekuva, priorisointi, päätöksenteon rytmi ja etenemisen seuranta – asiakkaan tavoitteista sovittavaksi kokonaisuudeksi.
- **SAFe-valmennus ja työpajat:** projektitiimin toimintatavat, yhteistyö ja käytännön työpajat. Viralliset sertifiointikurssit löytyvät erikseen nykyisestä kurssivalikoimasta.
- **AI-konsultointi:** hyödyllisten käyttökohteiden tunnistaminen ja rajattu kokeilu organisaation tietoturva- ja tiedonkäsittelyvaatimusten mukaisesti.

**Tilat ja palvelut sovitaan erikseen.** Katutason projektitoimisto ja pohjakerroksen tiimitilat ovat tarjolla pitkäaikaiseen käyttöön, laajuus ja saatavuus sovitaan. Konsultointi, tilavuokra ja majoitus hinnoitellaan erikseen.

Ensisijainen CTA: **Keskustellaan projektisi tarpeesta** → nykyinen `/yhteystiedot` (täydennetään konsultointitiedustelun aiheella).
Toissijainen CTA: **Tutustu tiloihin ja vuokra-arvioon** → `https://pitkansillankatu18.com/#tilapaketit`.
Lisälinkit: Terassitalon varauskalenteri; PK33 Corporate Housing.

Valmis siirrettävä FI/SV/EN React/Tailwind-komponentti: [petrikopsa/ProjectHubSection.tsx](petrikopsa/ProjectHubSection.tsx). Se käyttää olemassa olevaa `/yhteystiedot`-osoitetta, mutta ottaa myös `contactHref`-parametrin. Komponentti ei ole käytössä PK18-sovelluksessa; sen integrointi ja visuaalinen sovitus tehdään petrikopsa.comin omassa repossa. Kielikohtaiset ulkoiset reitit on toteutettava ja tarkistettava siellä samalla. Ei uusia numerohintoja.

## Toteutusjärjestys seuraavassa repossa

1. Tunnista petrikopsa.comin oikea GitHub-repo, haara ja julkaisuasetukset; lue sen omat ohjeet. Tallenna kurssireittien ja yhteydenottopolun lähtötilanne.
2. Lisää etusivulle PMO-osio nykyisen kurssiesittelyn rinnalle ja navigaatioon “Konsultointi”. Säilytä kurssien URLit, hinnat, ilmoittautuminen ja ehdot.
3. Toteuta `/konsultointi` palvelusivuksi: Strategic PMO / SAFe / AI, kohderyhmä, asiakkaan ongelma, sovittava työn sisältö, konsultointikeskustelu. Esimerkkitoimituksina nykytilakartoitus, sovittu PMO-tuki ja rajattu AI-kokeilu; ei keksittyjä hintoja, referenssejä, tuloslupauksia tai sertifikaatteja.
4. Täydennä nykyistä `/yhteystiedot`-polkua aiheilla Strategic PMO, SAFe-valmennus ja AI-konsultointi. Jos tekninen toteutus tukee esitäyttöä, lisää se vasta palvelin-/lomakerajapinnan tarkistamisen jälkeen. Älä ohjaa konsultointiliidiä pelkälle kurssiodotuslistalle.
5. Lisää ristiinlinkit tämän dokumentin työnjaon mukaan. PK18:sta voi jatkossa linkittää suoraan `/konsultointi#strategic-pmo`, kun reitti on julkaistu ja vastaa 200; siihen asti nykyinen toimiva etusivulinkki säilyy.
6. Lisää palvelusivulle oma title, description, canonical, hreflang ja sitemap-polku. Mallinna Person / ProfessionalService / Service; säilytä nykyisten kurssien Course-rakenne. Älä mallinna PK18-tilaa uutena konsultoinnin omistamana myyntikohteena.
7. Tarkista FI/SV/EN:n toimivuus sivuston todellisen kielirakenteen mukaisesti; jos kaikkia kieliä ei vielä ole, vaiheista ne eikä lisätä toimimattomia hreflang-osoitteita.
8. Aja olemassa olevat testit ja alla oleva UAT, avaa esikatselu. Tuotantomergen jälkeen tarkista live-versio ja Search Console. Ei automaattista päähaaran mergeä tämän suunnitelman nojalla.

## Hyväksymiskriteerit

- PMO-, SAFe- ja AI-viesti vastaa PK18:n PMO-korttia ja tarjousoptiota; konsultoinnin rajaus on sama.
- Kurssien vanhat osoitteet, ilmoittautuminen ja hinnat toimivat edelleen.
- Konsultoinnin CTA vie oikeaan yhteydenottopolkuun eikä odotuslistaan.
- Vuokrahintoja ei kopioida petrikopsa.comiin; PK18-laskuri vastaa niistä.
- Maailmanlaajuisia saatavuus-, tuotto- tai tuloslupauksia ei lisätä. Majoitus ja konsultointi hinnoitellaan erikseen.
- Kolme ulkoista kohdetta palauttaa 200; mobiilikäyttö, näppäimistö, otsikkotasot ja sivukohtainen SEO tarkistettu.

**Valmiuden raja:** suunnitelma ja komponentti ovat valmiit. Petrikopsa.com ei ole vielä tämän työn tuloksena muuttunut eikä sen täydellistä yhteensopivuutta voi kuitata ennen siellä tehtävää integraatiotestiä.
