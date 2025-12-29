import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroEN from "@/components/en/Hero";
import AboutEN from "@/components/en/About";
import FeaturesEN from "@/components/en/Features";

const IndexEN = () => {
  return (
    <>
      <Helmet>
        <title>Leville.net – Accommodation in Levi Center | Apartments & Cabins</title>
        <meta 
          name="description" 
          content="Leville.net offers quality accommodation in Levi center. Modern apartments, spacious family homes and cozy log cabins in the best locations. Book directly from us!" 
        />
        <meta name="keywords" content="Levi accommodation, Levi apartment, Levi cabin, Levi center, Levi holiday" />
        <link rel="canonical" href="https://leville.net/en" />
        <html lang="en" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroEN />
          <AboutEN />
          <FeaturesEN />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IndexEN;
