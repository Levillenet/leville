import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
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

const isInvalidLegacyRental = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const schema = value as Record<string, unknown>;
  return (
    schema["@type"] === "VacationRental" &&
    schema.name === "Levi Apartments by Leville.net" &&
    (!schema.identifier || !schema.containsPlace || !schema.geo || !schema.image)
  );
};

/**
 * Removes only the obsolete sitewide VacationRental left in an old prerendered
 * HTML snapshot. Real property schemas have identifiers, images, coordinates
 * and containsPlace, so they are never matched by this cleanup.
 */
const removeInvalidLegacyRental = () => {
  document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]').forEach((script) => {
    try {
      const parsed: unknown = JSON.parse(script.textContent ?? "");

      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter((item) => !isInvalidLegacyRental(item));
        if (cleaned.length !== parsed.length) script.textContent = JSON.stringify(cleaned);
        return;
      }

      if (isInvalidLegacyRental(parsed)) script.remove();
    } catch {
      // Leave unrelated or temporarily incomplete JSON-LD untouched.
    }
  });
};

const StructuredData = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    removeInvalidLegacyRental();
  }, [pathname]);

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
