# PK18 – hyväksymistestauksen lähtötilanne 21.10.2026

Lähdecommit 0d151bd, versio 6.0.0. Kolme julkaistua kieliversiota haettiin suoraan sivustolta; hakutyökalun vanhaa indeksoitua kopiota ei käytetä nykytilan todisteena. Tämä raportti kirjoitettiin ennen sovelluskorjauksia.

| Tunnus | Tulos ennen korjausta | Todennettu havainto |
|---|---|---|
| PK18-UAT-01 | osittain | 108 000 € oikein sivulla, title/description/OG ja myynti-Offerissa. Aktiivisessa src/public/scripts-tekstisisällössä ei pyydettyjä vanhoja hintoja. 480 €/m² ei sisälly metatietoihin tai hinnan yhteyteen. Dokumentaation muutoshistoriassa vanha hinta kuuluu jäljitettävyyteen; kuvamitat eivät ole myyntihintoja. |
| PK18-UAT-02 | osittain | 107/118 m² ja 17.10. luonnos oikein. Vanhoja 131/94 m² -yksikköjakoja tai VEN02:ta ei aktiivisessa sisällössä. Osakenumerot ovat PDF:issä, mutta puuttuvat sivun korteista ja konfiguraatiosta. Pohjakuvan 94,7 m² huoneala ei ole vanha 94 m² huoneistojako. |
| PK18-UAT-03 | osittain | Molemmat värilliset ARK 1-1 / ARK 1-2 -pohjakuvat ja alkuperäisiä vastaavat PDF:t löytyvät ja live-linkit palauttavat 200 application/pdf. Julkista jakoesityksen yhteenveto-PDF:ää ei ole. Varsinaista esitystä ja pöytäkirjaa ei ole julkaistu aiemman päätöksen mukaisesti. |
| PK18-UAT-04 | täsmennettävä | Sivusto ei väitä jakoa hyväksytyksi. Pyynnön väite hallituksen 7.10. hyväksymästä esityksestä ei vastaa pöytäkirjan § 4:ää: siinä sovitaan ehdotuksen yksinkertaistamisesta ja jatkokäsittelystä. 17.10. asiakirja on osakkaan luonnos. Marraskuu on tämän toimeksiannon ilmoittama tavoite, ei lähdeaineistolla vahvistettu kokouskutsu. Turvallinen korjaus on kuvata nämä erikseen, ei vahvistaa hyväksyntää. |
| PK18-UAT-05 | osittain | EH1–EH3 ovat jo B2B-tilapaketteja, eivät sijoittajan tuottolaskureita. EH3 ja koko tila sisältävät pohjakerroksen. Laskuri valitsee paketin vain henkilömäärällä, joten esim. EH1 12 kk ja EH3 1 kk rikkovat korttien omia kestorajoja. PMO-tarjousoptio ja laskurin tiedoilla täytetty tarjouspyyntö puuttuvat. Arviohinnat ovat aiemman toteuttajan johtamia, eivät vahvistettu hinnasto. |
| PK18-UAT-06 | osittain | Galleria on ryhmitelty katutasoon/pohjakerrokseen ja alt-tekstit ovat kielittäin. 800–1600 px WebP:t ovat alle 300 kt; kahdeksan 2400 px lightbox-kuvaa on 424 818–783 330 tavua, yli nyt pyydetyn 400 kt. Vanhassa tehtävässä niille sallittiin 900 KiB. |
| PK18-UAT-07 | osittain | Terassitalon kalenteri, petrikopsa.com ja PK33 palauttavat 200 (petrikopsa ohjautuu www-osoitteeseen). PMO-kortin palvelulista ei mainitse SAFe-palvelua erikseen, ja PK33-kortista puuttuu 69 m². Petrikopsa-sivun synkronointi vaatii oman toteutuksen. |
| PK18-UAT-08 | osittain | Robots ja sitemap palauttavat 200; kielikohtaiset canonical/hreflang ovat olemassa. JSON-LD käyttää Office-tyyppiä RealEstateListing/LocalBusiness-roolien sijaan. Palvelimen html lang on fi myös /sv ja /en:ssä; kielipainikkeet vaihtavat sisältöä vaihtamatta URLia ja metadataa. Google-indeksointia ei voi todistaa site-haulla eikä luvata metatietoja muuttamalla; Search Consolen URL-tarkistus tarvitaan. |

## Korjauslinja

Hinta, yksikköhinta ja osakeryhmät yhteen konfiguraatioon. Laskurin kestorajat ja erikseen hinnoiteltu PMO-tarjousoptio. Oikeat kielireitit ja palvelimen kieli. Listaus-, tila-, yritys- ja tarjousentiteetit erikseen JSON-LD:hen. Kuvien uusi kokoraja ajamalla samaa logotarkistavaa kuvaputkea. Julkinen, selvästi yhteenvedoksi merkitty PDF; ei pöytäkirjaa, raakaa kutsuluonnosta tai yksityisiä yhteystietoja.

Tuotantoon ei tehdä tässä auditoinnissa mergeä. Korjaukset todetaan paikallisesti omassa haarassa.
