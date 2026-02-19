import { useMemo, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const About = lazy(() => import("@/components/About"));
const Features = lazy(() => import("@/components/Features"));
const NewsHighlight = lazy(() => import("@/components/NewsHighlight"));
const GuideTeaser = lazy(() => import("@/components/GuideTeaser"));
import WhatsAppChat from "@/components/WhatsAppChat";
import HreflangTags from "@/components/HreflangTags";
import ModerBookingWidget from "@/components/ModerBookingWidget";
import { Language, getTranslations } from "@/translations";

interface IndexProps {
  lang?: Language;
}

// SEO content per language
const seoContent: Record<Language, {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  locale: string;
}> = {
  fi: {
    title: "Leville.net – Majoitus Levin keskustassa | Huoneistot & Mökit",
    description: "Leville.net tarjoaa laadukasta majoitusta Levin keskustassa. Modernit huoneistot, tilavat perheasunnot ja tunnelmalliset hirsimökit parhailla paikoilla. Varaa suoraan meiltä!",
    keywords: "Levi majoitus, Levi huoneisto, Levi mökki, Levi keskusta, Levin majoitus, loma Levi",
    canonical: "https://leville.net",
    locale: "fi_FI"
  },
  en: {
    title: "Leville.net – Accommodation in Levi Center | Apartments & Cabins",
    description: "Leville.net offers quality accommodation in Levi center. Modern apartments, spacious family homes and cozy log cabins in the best locations. Book directly from us!",
    keywords: "Levi accommodation, Levi apartment, Levi cabin, Levi center, Levi holiday, Lapland",
    canonical: "https://leville.net/en",
    locale: "en_US"
  },
  sv: {
    title: "Leville.net – Boende i Levi centrum | Lägenheter & Stugor",
    description: "Leville.net erbjuder kvalitetsboende i Levis centrum. Moderna lägenheter, rymliga familjelägenheter och mysiga timmerstugor på bästa platser. Boka direkt från oss!",
    keywords: "Levi boende, Levi lägenhet, Levi stuga, Levi centrum, Levi semester, Lappland",
    canonical: "https://leville.net/sv",
    locale: "sv_SE"
  },
  de: {
    title: "Leville.net – Unterkunft im Levi Zentrum | Apartments & Hütten",
    description: "Leville.net bietet hochwertige Unterkünfte im Zentrum von Levi. Moderne Apartments, geräumige Familienwohnungen und gemütliche Blockhütten an besten Standorten. Direkt buchen!",
    keywords: "Levi Unterkunft, Levi Apartment, Levi Hütte, Levi Zentrum, Levi Urlaub, Lappland",
    canonical: "https://leville.net/de",
    locale: "de_DE"
  },
  es: {
    title: "Leville.net – Alojamiento en el centro de Levi | Apartamentos y Cabañas",
    description: "Leville.net ofrece alojamiento de calidad en el centro de Levi. Apartamentos modernos, amplios pisos familiares y acogedoras cabañas de madera. ¡Reserva directamente!",
    keywords: "Levi alojamiento, Levi apartamento, Levi cabaña, Levi centro, vacaciones Levi, Laponia",
    canonical: "https://leville.net/es",
    locale: "es_ES"
  },
  fr: {
    title: "Leville.net – Hébergement au centre de Levi | Appartements & Chalets",
    description: "Leville.net propose des hébergements de qualité au centre de Levi. Appartements modernes, logements familiaux spacieux et chalets en bois confortables. Réservez directement!",
    keywords: "Levi hébergement, Levi appartement, Levi chalet, Levi centre, vacances Levi, Laponie",
    canonical: "https://leville.net/fr",
    locale: "fr_FR"
  },
  nl: {
    title: "Leville.net – Accommodatie in Levi centrum | Appartementen & Chalets",
    description: "Leville.net biedt kwaliteitsaccommodatie in het centrum van Levi. Moderne appartementen, ruime familiewoningen en gezellige houten chalets op de beste locaties. Boek direct bij ons!",
    keywords: "Levi accommodatie, Levi appartement, Levi chalet, Levi centrum, Levi vakantie, Lapland",
    canonical: "https://leville.net/nl",
    locale: "nl_NL"
  }
};

const Index = ({ lang = "fi" }: IndexProps) => {
  const location = useLocation();
  const seo = seoContent[lang];

  const schemaData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Leville.net",
    "description": seo.description,
    "url": seo.canonical,
    "telephone": "+358 44 131 313",
    "email": "info@leville.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Levin keskusta",
      "addressLocality": "Sirkka",
      "postalCode": "99130",
      "addressCountry": "FI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "67.80",
      "longitude": "24.80"
    },
    "priceRange": "€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  }), [seo.description, seo.canonical]);

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:locale" content={seo.locale} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero lang={lang} />
          <Suspense fallback={<div className="min-h-[200px]" />}>
            {lang !== "fi" && <GuideTeaser lang={lang} />}
            <About lang={lang} />
            <NewsHighlight lang={lang} />
            <Features lang={lang} />
          </Suspense>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat />
        <ModerBookingWidget lang={lang} />
      </div>
    </>
  );
};

export default Index;
