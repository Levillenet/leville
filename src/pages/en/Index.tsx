import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import NewsHighlight from "@/components/NewsHighlight";
import WhatsAppChat from "@/components/WhatsAppChat";
import ModerBookingWidget from "@/components/ModerBookingWidget";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getLodgingBusinessSchema } from "@/utils/structuredData";
const GuideLinksSection = lazy(() => import("@/components/GuideLinksSection"));
const ActivitiesLinksSection = lazy(() => import("@/components/ActivitiesLinksSection"));
import PromoBanner from "@/components/PromoBanner";

const IndexEN = () => {
  const location = useLocation();
  
  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getLodgingBusinessSchema("en")} />
      <HreflangTags currentPath={location.pathname} currentLang="en" />
      <Helmet>
        <html lang="en" />
        <title>Leville.net – Accommodation in Levi Center | Apartments & Cabins</title>
        <meta 
          name="description" 
          content="Leville.net offers quality accommodation in Levi center. Modern apartments, spacious family homes and cozy log cabins in the best locations. Book directly from us!" 
        />
        <meta name="keywords" content="Levi accommodation, Levi apartment, Levi cabin, Levi center, Levi holiday, Lapland" />
        <link rel="canonical" href="https://leville.net/en" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leville.net/en" />
        <meta property="og:title" content="Leville.net – Accommodation in Levi Center" />
        <meta property="og:description" content="Quality accommodation in Levi center. Modern apartments and cozy log cabins in the best locations." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content="Levi ski resort in Finnish Lapland" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leville.net – Accommodation in Levi Center" />
        <meta name="twitter:description" content="Quality accommodation in Levi center. Modern apartments and cozy log cabins." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content="Levi ski resort in Finnish Lapland" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero lang="en" />
          <PromoBanner lang="en" />
          <About lang="en" />
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <GuideLinksSection lang="en" />
            <ActivitiesLinksSection lang="en" />
          </Suspense>
          <NewsHighlight lang="en" />
          <Features lang="en" />
        </main>
        <Footer lang="en" />
        <WhatsAppChat lang="en" />
        <ModerBookingWidget lang="en" />
      </div>
    </>
  );
};

export default IndexEN;
