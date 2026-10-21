import { BROKER, LAST_UPDATED, LINKS, OWNER, SALE, SALE_PRICE_PER_SQM, SITE_URL, telHref, type Lang } from "@/config/site";
import { buildMetadata, OG_IMAGE, pageUrl } from "@/config/seo";
import { translations } from "@/translations";

/** Listaus, vuokrattava tila, toimija ja tarjoukset ovat eri asioita. */
export function buildJsonLd(lang: Lang) {
  const address = {
    "@type": "PostalAddress", streetAddress: "Pitkänsillankatu 18",
    addressLocality: "Kokkola", postalCode: "67100", addressCountry: "FI",
  };
  const placeId = `${SITE_URL}/#premises`;
  const businessId = `${SITE_URL}/#rental-business`;
  const saleId = `${SITE_URL}/#sale-offer`;
  const leaseId = `${SITE_URL}/#lease-offer`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing", "@id": `${pageUrl(lang)}#listing`,
        url: pageUrl(lang), name: translations[lang].heroTitle,
        description: buildMetadata(lang).description, inLanguage: lang,
        dateModified: LAST_UPDATED,
        image: `${SITE_URL}${OG_IMAGE}`,
        mainEntity: { "@id": placeId },
        publisher: { "@id": businessId },
        offers: [{ "@id": saleId }, { "@id": leaseId }],
        relatedLink: [LINKS.petrikopsa, LINKS.booking, LINKS.pk33],
      },
      {
        "@type": "Place", "@id": placeId,
        name: "Pitkänsillankatu 18, LH 19", address,
        geo: { "@type": "GeoCoordinates", latitude: 63.83768, longitude: 23.13689 },
        additionalProperty: [{
          "@type": "PropertyValue", name: SALE.areaBasis[lang],
          value: SALE.area, unitCode: "MTK",
        }],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: translations[lang].space1Title, value: true },
          { "@type": "LocationFeatureSpecification", name: translations[lang].space2Title, value: true },
        ],
      },
      {
        "@type": "LocalBusiness", "@id": businessId,
        name: "Terassitalo", url: LINKS.terassitalo, address,
        telephone: telHref(OWNER.phone).replace("tel:", ""), email: OWNER.email,
        hasOfferCatalog: { "@type": "OfferCatalog", name: translations[lang].pkgTitle, itemListElement: [{ "@id": leaseId }] },
      },
      {
        "@type": "Offer", "@id": saleId,
        businessFunction: "http://purl.org/goodrelations/v1#Sell",
        price: SALE.salePriceDebtFree, priceCurrency: "EUR", url: BROKER.listingUrl,
        itemOffered: { "@id": placeId },
        priceSpecification: {
          "@type": "UnitPriceSpecification", price: SALE_PRICE_PER_SQM, priceCurrency: "EUR",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MTK" },
        },
        seller: {
          "@type": "RealEstateAgent", name: BROKER.company, url: BROKER.listingUrl,
          telephone: telHref(BROKER.phone).replace("tel:", ""), email: BROKER.email,
        },
      },
      {
        "@type": "Offer", "@id": leaseId,
        businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
        url: `${pageUrl(lang)}#tilapaketit`, itemOffered: { "@id": placeId },
        seller: { "@id": businessId },
        // Sitova vuokrahinta ja saatavuus sovitaan tarjouksessa.
      },
      {
        "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL,
        name: "Pitkänsillankatu 18 – Kokkola", inLanguage: ["fi", "sv", "en"],
        publisher: { "@id": businessId },
      },
    ],
  };
}
