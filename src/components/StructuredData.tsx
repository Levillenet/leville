import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://leville.net";

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
      addressLocality: "Levi",
      addressRegion: "Lapland",
      addressCountry: "FI",
    },
    areaServed: "Levi Finland",
    image: `${BASE_URL}/og-image.png`,
    telephone: "+358 44 131 313",
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

function getTouristDestination() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Levi Ski Resort",
    description:
      "Levi is the largest ski resort in Finland located in Lapland.",
    touristType: ["Skiers", "Winter travellers", "Families"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 67.804,
      longitude: 24.806,
    },
  };
}

function getWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Leville.net",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function getFAQPage() {
  const faqs = [
    {
      q: "What is the best area to stay in Levi?",
      a: "The Levi centre area is the most popular for accommodation, offering direct access to ski slopes, restaurants, and services within walking distance.",
    },
    {
      q: "Is Levi good for skiing holidays?",
      a: "Yes, Levi is Finland's largest ski resort with 43 slopes, 28 lifts, and a vertical drop of 325 metres. The ski season typically runs from November to May.",
    },
    {
      q: "How far are the apartments from Levi ski slopes?",
      a: "Most Leville.net apartments are located in Levi centre, within 50–500 metres of the nearest ski slopes and lifts.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

function getBreadcrumbList(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const items = [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: BASE_URL },
  ];

  let path = "";
  segments.forEach((seg, i) => {
    path += `/${seg}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `${BASE_URL}${path}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

const StructuredData = () => {
  const { pathname } = useLocation();

  const schemas: Record<string, unknown>[] = [
    getLodgingBusiness(),
    getVacationRental(),
    getTouristDestination(),
    getWebSite(),
    getFAQPage(),
  ];

  const breadcrumb = getBreadcrumbList(pathname);
  if (breadcrumb) schemas.push(breadcrumb);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemas)}</script>
    </Helmet>
  );
};

export default StructuredData;
