import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Leville.net – Majoitus Levin keskustassa | Huoneistot & Mökit</title>
        <meta 
          name="description" 
          content="Leville.net tarjoaa laadukasta majoitusta Levin keskustassa. Modernit huoneistot, tilavat perheasunnot ja tunnelmalliset hirsimökit parhailla paikoilla. Varaa suoraan meiltä!" 
        />
        <meta name="keywords" content="Levi majoitus, Levi huoneisto, Levi mökki, Levi keskusta, Levin majoitus, loma Levi" />
        <link rel="canonical" href="https://leville.net" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Features />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
