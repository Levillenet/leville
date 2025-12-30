import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import HreflangTags from "@/components/HreflangTags";
import { Language, getTranslations } from "@/translations";

interface IndexProps {
  lang?: Language;
}

const Index = ({ lang = "fi" }: IndexProps) => {
  const t = getTranslations(lang);
  const location = useLocation();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Leville.net",
    "description": "Leville.net tarjoaa laadukasta majoitusta Levin keskustassa. Modernit huoneistot, tilavat perheasunnot ja tunnelmalliset hirsimökit.",
    "url": "https://leville.net",
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
  };

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>Leville.net – Majoitus Levin keskustassa | Huoneistot & Mökit</title>
        <meta 
          name="description" 
          content="Leville.net tarjoaa laadukasta majoitusta Levin keskustassa. Modernit huoneistot, tilavat perheasunnot ja tunnelmalliset hirsimökit parhailla paikoilla. Varaa suoraan meiltä!" 
        />
        <meta name="keywords" content="Levi majoitus, Levi huoneisto, Levi mökki, Levi keskusta, Levin majoitus, loma Levi" />
        <link rel="canonical" href="https://leville.net" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leville.net" />
        <meta property="og:title" content="Leville.net – Majoitus Levin keskustassa" />
        <meta property="og:description" content="Leville.net tarjoaa laadukasta majoitusta Levin keskustassa. Modernit huoneistot ja tunnelmalliset mökit parhailla paikoilla." />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leville.net – Majoitus Levin keskustassa" />
        <meta name="twitter:description" content="Leville.net tarjoaa laadukasta majoitusta Levin keskustassa. Modernit huoneistot ja tunnelmalliset mökit." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero lang={lang} />
          <About lang={lang} />
          <Features lang={lang} />
        </main>
        <Footer lang={lang} />
        <WhatsAppChat />
      </div>
    </>
  );
};

export default Index;
