import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Mountain, Wifi, Car, Snowflake, Download, LucideIcon, Tag, ArrowRight, Building } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import WhatsAppChat from "@/components/WhatsAppChat";
import { supabase } from "@/integrations/supabase/client";

// Import accommodation background images
import karhupirttiImg from "@/assets/accommodations/karhupirtti.jpg";
import skistarImg from "@/assets/accommodations/skistar.png";
import perheasunnotImg from "@/assets/accommodations/perheasunnot.png";
import glacierImg from "@/assets/accommodations/glacier.png";

const accommodationIcons: LucideIcon[] = [Home, Users, Mountain, Building];
const amenityIcons: LucideIcon[] = [Wifi, Car, Snowflake];
const accommodationImages = [skistarImg, perheasunnotImg, karhupirttiImg, glacierImg];

interface MajoituksetProps {
  lang?: Language;
}

const Majoitukset = ({ lang = "fi" }: MajoituksetProps) => {
  const t = getTranslations(lang).majoitukset;
  const isEnglish = lang === "en";

  const trackDownload = async () => {
    try {
      await supabase.functions.invoke('log-download', {
        body: { document_type: 'welcome_letter', language: lang }
      });
    } catch (error) {
      console.error('Failed to log download:', error);
    }
  };

  return (
    <>
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Discount code banner */}
            <ScrollReveal>
              <div className="text-center mb-6">
                <a 
                  href={isEnglish ? "/en/news" : "/ajankohtaista"}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-aurora-green/20 backdrop-blur-sm border border-primary/40 rounded-full px-4 py-2 hover:border-primary/60 transition-colors group"
                >
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {isEnglish ? "Use code" : "Käytä koodia"} <span className="text-primary">winter10</span> {isEnglish ? "– 10% off spring 2026!" : "– 10% alennus keväälle 2026!"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </ScrollReveal>

            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-10 md:mb-16 px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  {t.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* Accommodations Grid */}
            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 md:mb-20">
              {t.accommodations.map((acc, index) => {
                const Icon = accommodationIcons[index];
                return (
                  <ScrollReveal key={acc.title} delay={index * 0.15} direction="up">
                    <TiltCard className="h-full">
                      <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                        {/* Background image */}
                        <div className={`absolute -right-4 sm:-right-6 w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 overflow-hidden pointer-events-none z-0 ${index === 2 ? 'bottom-12 sm:bottom-16' : '-bottom-4 sm:-bottom-8'}`}>
                          <img 
                            src={accommodationImages[index]} 
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-cover opacity-35 sm:opacity-45 group-hover:opacity-55 transition-opacity duration-500 rounded-xl sm:rounded-2xl ${index === 2 ? 'object-top' : ''}`}
                            style={{
                              maskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 80%)',
                              WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 25%, transparent 80%)',
                            }}
                          />
                        </div>
                        
                        <CardHeader className="relative z-10 p-4 sm:p-6">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                            <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl text-foreground">{acc.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow relative z-10">
                          <p className="text-muted-foreground mb-4">{acc.description}</p>
                          <ul className="space-y-2 mb-6 flex-grow">
                            {acc.features.map((feature) => (
                              <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <a
                            href="https://app.moder.fi/levillenet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full text-center py-2.5 sm:py-3 px-3 sm:px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm sm:text-base hover:bg-primary/90 transition-colors mt-auto"
                          >
                            {t.bookCta}
                          </a>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </section>

            {/* Amenities */}
            <ScrollReveal delay={0.2}>
              <section className="text-center mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-8">{t.amenitiesTitle}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {t.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[index];
                    return (
                      <div key={amenity.label} className="flex items-center gap-3 text-muted-foreground">
                        <Icon className="w-5 h-5 text-primary" />
                        <span>{amenity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* Welcome Letter */}
            <ScrollReveal delay={0.3}>
              <section>
                <div className="glass-card border-primary/30 bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🎅</span>
                    </div>
                    <div className="text-center md:text-left flex-grow">
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        {isEnglish ? "Welcome Letter to Levi" : "Tervetulokirje Leville"}
                      </h2>
                      <p className="text-muted-foreground">
                        {isEnglish 
                          ? "With this letter, you can give your children a wonderful welcome to Levi from Santa himself!" 
                          : "Tällä kirjeellä on mukava toivottaa lapsetkin tervetulleeksi Leville – Joulupukin tervehdyksellä!"}
                      </p>
                    </div>
                    <a
                      href="/docs/tervetulokirje.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackDownload}
                      className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      {isEnglish ? "Download Letter" : "Lataa kirje"}
                    </a>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Majoitukset;
