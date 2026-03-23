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
      "Accommodation in Levi centre. Apartments and chalets located in the best locations in Levi, Finland.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Levin keskusta",
      addressLocality: "Sirkka",
      postalCode: "99130",
      addressRegion: "Lapland",
      addressCountry: "FI",
    },
    areaServed: "Levi Finland",
    image: `${BASE_URL}/og-image.png`,
    telephone: "+358 44 13 13 13",
    email: "info@leville.net",
    priceRange: "€€-€€€",
    sameAs: [BASE_URL],
  };
}

function getVacationRental() {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: "Levi Apartments by Leville.net",
    alternateName: [
      "Levillenet Glacier Alpine Chalets at Levi Centre",
      "Levillenet Levi centre chalets",
      "Levillenet Bearlodge at Levi city centre",
      "Levillenet Bears Watch Apartments",
      "Levillenet Skistar Superior Studios",
      "Levillenet Skistar Superior 1-bedroom apartments",
      "Levillenet Skistar Superior 2 bedroom apartments",
      "Levi Platinum Superior Apartments",
      "Levi Centre Moonlight Studio with Sauna 415",
    ],
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Levi",
      addressRegion: "Lapland",
      addressCountry: "FI",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Ski access", value: true },
      { "@type": "LocationFeatureSpecification", name: "Central location", value: true },
      { "@type": "LocationFeatureSpecification", name: "Short stay apartments", value: true },
    ],
  };
}

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

  // Only LodgingBusiness, VacationRental, and WebSite are safe globally.
  // Everything else (Article, FAQPage, BreadcrumbList, TouristDestination)
  // is page-specific and already handled by individual page components.
  const schemas: Record<string, unknown>[] = [
    getWebSite(),
    getLodgingBusiness(),
    getVacationRental(),
  ];

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemas)}</script>
    </Helmet>
  );
};

export default StructuredData;
