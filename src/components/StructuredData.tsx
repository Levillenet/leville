import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://leville.net";

/**
 * Global structured data component.
 * 
 * ONLY injects schemas that are safe to show on every page.
 * Page-specific schemas (Article, FAQPage, BreadcrumbList, TouristDestination)
 * are handled by each individual page component — NOT here.
 * 
 * This avoids duplicate/conflicting schemas that confuse Google.
 */

function getLodgingBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Leville.net",
    url: BASE_URL,
    description:
      "Local accommodation company in Levi centre since 2012. Apartments and cabins in the best locations, booked directly from the owner.",
    foundingDate: "2012",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Levin keskusta",
      addressLocality: "Sirkka",
      postalCode: "99130",
      addressRegion: "Lapland",
      addressCountry: "FI",
    },
    alternateName: [
      "Levi Apartments by Leville.net",
      "Levillenet Glacier Alpine Chalets at Levi Centre",
      "Levillenet Bearlodge at Levi city centre",
      "Levillenet Bears Watch Apartments",
      "Levillenet Skistar Superior Studios",
      "Levi Platinum Superior Apartments",
    ],
    areaServed: "Levi Finland",
    image: `${BASE_URL}/og-image.png`,
    telephone: "+358 44 13 13 13",
    email: "info@leville.net",
    priceRange: "€€-€€€",
    sameAs: [BASE_URL],
  };
}

// Sivustonlaajuinen VacationRental poistettu: se ei kuvannut yhtä oikeaa
// vuokrakohdetta (puuttui identifier/containsPlace/geo/image) ja Google merkitsi
// sen virheelliseksi. Brändinimet elävät nyt LodgingBusiness.alternateName-kentässä.


function getWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Leville.net",
    url: BASE_URL,
    description: "Travel guide and accommodation booking for Levi ski resort in Finnish Lapland",
    inLanguage: ["fi", "en", "sv", "de", "fr", "es", "nl"],
    publisher: {
      "@type": "Organization",
      name: "Leville.net",
      url: BASE_URL,
    },
  };
}

const StructuredData = () => {
  const { pathname } = useLocation();

  // Don't inject global schemas on admin or utility pages
  if (pathname.startsWith("/admin") || pathname === "/unsubscribe") {
    return null;
  }

  // Only LodgingBusiness and WebSite are safe globally.
  // Everything else (Article, FAQPage, BreadcrumbList, TouristDestination)
  // is page-specific and already handled by individual page components.
  // Property and street-hub pages emit their own, property-specific
  // VacationRental / ApartmentComplex schema.
  const schemas: Record<string, unknown>[] = [getWebSite(), getLodgingBusiness()];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemas)}</script>
    </Helmet>
  );
};

export default StructuredData;
