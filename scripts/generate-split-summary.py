"""Julkinen, lähteistetty yhteenveto 17.10.2026 jakoluonnoksesta; ei pöytäkirjaa.
Kehitystyökalu: Python + reportlab. Alkuperäisiä yksityisiä asiakirjoja ei lueta eikä julkaista.
Päivätty faktatilanne: uusi jako tai päätös vaatii uuden asiakirjan ja version.
"""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

font = next((p for p in [Path('/System/Library/Fonts/Supplemental/Arial.ttf'), Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')] if p.exists()), None)
if not font:
    raise SystemExit('Asenna Arial- tai DejaVu Sans -fontti ennen PDF:n generointia.')
pdfmetrics.registerFont(TTFont('PublicSans', str(font)))
styles = getSampleStyleSheet()
for name in ['Normal', 'Title', 'Heading2']:
    styles[name].fontName = 'PublicSans'
styles['Normal'].fontSize = 10
styles['Normal'].leading = 14
styles['Title'].fontSize = 19
styles['Title'].leading = 24
styles['Title'].alignment = TA_LEFT
styles['Heading2'].fontSize = 12
styles['Heading2'].leading = 16
styles.add(ParagraphStyle('SmallPublic', parent=styles['Normal'], fontSize=8, leading=11, textColor=colors.HexColor('#475569')))
out = Path('public/docs/pk18-jakoehdotus-julkinen-yhteenveto-20261017.pdf')
doc = SimpleDocTemplate(str(out), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=36, bottomMargin=36, title='LH 19:n jakoehdotus – julkinen yhteenveto, luonnos 17.10.2026', author='Terassitalo')
story = []
def p(text, style='Normal'):
    story.append(Paragraph(text, styles[style]))
    story.append(Spacer(1, 7))
p('LH 19:n jakoehdotus<br/>Julkinen yhteenveto', 'Title')
p('Pitkänsillankatu 18, Kokkola · Luonnos 17.10.2026 · Tilannetieto 21.10.2026', 'SmallPublic')
p('<b>Tämä on osakkaan jakoluonnoksen julkinen yhteenveto.</b> Se ei ole kokouskutsu, hallituksen hyväksymä lopullinen esitys, yhtiökokouksen päätös tai rekisteröity yhtiöjärjestysmuutos.')
p('Nykytila ja suunniteltu jako', 'Heading2')
p('Nykyinen LH 19 on yksi liikehuoneisto, jonka yhtiöjärjestyksen mukainen pinta-ala on 225 m² ja osakkeet 2226–2450. Luonnoksessa ehdotetaan seuraavaa jakoa:')
rows = [
    [Paragraph('<b>Luonnoksen yksikkö</b>', styles['Normal']), Paragraph('<b>Pinta-ala</b>', styles['Normal']), Paragraph('<b>Osakkeet</b>', styles['Normal'])],
    [Paragraph('LH 19A – liikehuoneisto<br/>Katutaso, kadun puoli (sininen)', styles['Normal']), '107 m²', '2226–2332'],
    [Paragraph('A 19B – asuinhuoneisto<br/>Katutaso, pihan puoli ja pohjakerros (vihreä)', styles['Normal']), '118 m²', '2333–2450'],
    [Paragraph('<b>Yhteensä</b>', styles['Normal']), '225 m²', '2226–2450'],
]
table = Table(rows, colWidths=[303, 72, 136])
table.setStyle(TableStyle([('FONTNAME',(0,0),(-1,-1),'PublicSans'),('FONTSIZE',(0,0),(-1,-1),10),('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e2e8f0')),('BACKGROUND',(0,1),(-1,1),colors.HexColor('#eff6ff')),('BACKGROUND',(0,2),(-1,2),colors.HexColor('#f0fdf4')),('BOTTOMPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('LINEBELOW',(0,0),(-1,-1),0.4,colors.HexColor('#cbd5e1'))]))
story += [table, Spacer(1, 12)]
p('Pinta-alat ovat ehdotettuja yhtiöjärjestyksen vastikepinta-aloja, eivät mitattuja huoneistoaloja. Pohjakerros sisältyy A 19B:n 118 m²:iin; sitä ei lisätä pinta-alaan toistamiseen.', 'SmallPublic')
p('Käsittelyn tila', 'Heading2')
p('Hallitus käsitteli LH 19:n muutosehdotusta 7.10.2026. Pöytäkirjan 5/2026 § 4 mukaan ehdotusta yksinkertaistetaan hallituksen jatkokäsittelyä varten. Osakkaan päivitetty luonnos on päivätty 17.10.2026.')
p('Omistajan ilmoittama tavoite on käsittely marraskuulle 2026 suunnitellussa ylimääräisessä yhtiökokouksessa. Päivää tai lopullista esitystä ei ole tässä yhteenvedossa vahvistettu. Jakoa ja yhtiöjärjestyksen muutosta ei ole hyväksytty.')
p('Mahdollinen toteutus edellyttää asianmukaiset taloyhtiön päätökset, viranomaisluvat, rekisteröinnit ja tarvittavat rakennustyöt. Luonnoksen mukaan osakas vastaisi toteutuskustannuksista; lopulliset vastuut vahvistetaan päätöksissä ja asiakirjoissa.')
p('Liitteet ja lisätiedot', 'Heading2')
p('Värikoodatut pohjapiirrokset: ARK 1-1 (katutaso) ja ARK 1-2 (pohjakerros), alkuperäiset työpiirustukset 28.9.2026, jaon värirajaus 17.10.2026. Ladattavissa sivun jakoesitysosiosta.')
p('Lähteet: osakkaan jakoluonnos 17.10.2026 ja hallituksen pöytäkirjan 5/2026 § 4. Alkuperäistä pöytäkirjaa tai kutsuluonnosta ei julkaista tämän yhteenvedon mukana. Lisätiedot: info@terassitalo.com · pitkansillankatu18.com', 'SmallPublic')
doc.build(story)
print(out)
