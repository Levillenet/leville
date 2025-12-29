import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";

const IndexEN = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Leville.net",
    "description": "Leville.net offers quality accommodation in Levi center. Modern apartments, spacious family homes and cozy log cabins.",
    "url": "https://leville.net/en",
    "telephone": "+358 44 131 313",
    "email": "info@leville.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Levi Center",
      "addressLocality": "Sirkka",
      "postalCode": "99130",
      "addressCountry": "FI"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "67.80",
      "longitude": "24.80"
    },
    "priceRange": "€€"
  };

  return (
    <>
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
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leville.net – Accommodation in Levi Center" />
        <meta name="twitter:description" content="Quality accommodation in Levi center. Modern apartments and cozy log cabins." />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero lang="en" />
          <About lang="en" />
          <Features lang="en" />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IndexEN;
