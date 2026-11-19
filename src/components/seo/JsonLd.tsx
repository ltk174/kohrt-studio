import { owner, pricing, site } from "@/config/site";

/** Strukturierte Daten für Suchmaschinen (schema.org). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.shortName,
    url: site.url,
    slogan: site.claim,
    description: site.description,
    founder: { "@type": "Person", name: owner.name },
    areaServed: "DE",
    knowsLanguage: "de",
    makesOffer: [
      {
        "@type": "Offer",
        name: pricing.website.name,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: pricing.website.price,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
        },
      },
      {
        "@type": "Offer",
        name: pricing.care.name,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: pricing.care.price,
          priceCurrency: "EUR",
          unitText: "MONAT",
          valueAddedTaxIncluded: false,
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
