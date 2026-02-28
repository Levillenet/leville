const BASE_URL = "https://leville.net";

const publisher = {
  "@type": "Organization",
  "name": "Leville.net",
  "url": BASE_URL,
};

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Leville.net",
    "url": BASE_URL,
    "description": "Travel guide and accommodation booking for Levi ski resort in Finnish Lapland",
    "inLanguage": ["fi", "en", "sv", "de", "fr", "es", "nl"],
    "publisher": publisher,
  };
}

export function getTouristDestinationSchema(lang: string) {
  const isFi = lang === "fi";
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": isFi ? "Levin hiihtokeskus" : "Levi Ski Resort",
    "description": isFi
      ? "Levi on Suomen suurin ja suosituin hiihtokeskus Kittilässä, Lapissa, 170 km napapiirin yläpuolella."
      : "Levi is the largest and most popular ski resort in Finland, located in Kittilä, Finnish Lapland, 170 km above the Arctic Circle.",
    "url": isFi ? `${BASE_URL}/levi` : `${BASE_URL}/en/levi`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 67.8039,
      "longitude": 24.8141,
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Levi",
      "addressRegion": "Kittilä",
      "addressCountry": "FI",
    },
    "touristType": isFi
      ? ["Lasketteluloma", "Talviurheilu", "Revontulien katselu", "Perheloma"]
      : ["Ski tourism", "Winter sports", "Northern Lights viewing", "Family holidays"],
    "includesAttraction": [
      {
        "@type": "SkiResort",
        "name": isFi ? "Levin hiihtokeskus" : "Levi Ski Resort",
        "description": isFi
          ? "43 rinnettä, 28 hissiä, pisin rinne 2,5 km, korkeusero 325 m"
          : "43 slopes, 28 lifts, longest run 2.5 km, vertical drop 325 m",
      },
      {
        "@type": "TouristAttraction",
        "name": isFi ? "Revontulien katselu" : "Northern Lights viewing",
        "description": isFi
          ? "Levi sijaitsee revontulivyöhykkeellä ja revontulia voi nähdä syyskuusta maaliskuuhun"
          : "Levi is located in the aurora zone with excellent Northern Lights visibility from September to March",
      },
    ],
  };
}

export interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  lang: string;
  datePublished?: string;
  dateModified?: string;
}

export function getArticleSchema(options: ArticleSchemaOptions) {
  const {
    title,
    description,
    url,
    lang,
    datePublished = "2025-01-15",
    dateModified = "2025-06-01",
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "inLanguage": lang,
    "author": publisher,
    "publisher": publisher,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "mainEntityOfPage": url,
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function getLodgingBusinessSchema(lang: string) {
  const isFi = lang === "fi";
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Leville.net",
    "description": isFi
      ? "Varaa mökit, huoneistot ja lomakoteja suoraan Levin hiihtokeskuksesta. Paras hinta, ei välikäsiä."
      : "Book cabins, apartments, and holiday homes directly in Levi ski resort, Finnish Lapland. Best price guarantee, no middleman fees.",
    "url": isFi ? `${BASE_URL}/majoitukset` : `${BASE_URL}/en/accommodations`,
    "telephone": "+358 44 131 313",
    "email": "info@leville.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": isFi ? "Levin keskusta" : "Levi Center",
      "addressLocality": "Sirkka",
      "postalCode": "99130",
      "addressCountry": "FI",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 67.8039,
      "longitude": 24.8141,
    },
    "priceRange": "€€-€€€",
  };
}
