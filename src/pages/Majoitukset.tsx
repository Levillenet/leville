import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getLodgingBusinessSchema, getFAQSchema } from "@/utils/structuredData";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, Users, Mountain, Wifi, Car, Snowflake, Download, LucideIcon, Tag, ArrowRight, Building, ShieldCheck, KeyRound, LogOut, Bed } from "lucide-react";
import { getTranslations, Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import PageCTA from "@/components/PageCTA";
import OptimizedImage from "@/components/OptimizedImage";
import { supabase } from "@/integrations/supabase/client";

// Import accommodation background images
import karhupirttiImg from "@/assets/accommodations/karhupirtti.jpg";
import skistarImg from "@/assets/accommodations/skistar.png";
import perheasunnotImg from "@/assets/accommodations/perheasunnot.png";
import glacierImg from "@/assets/accommodations/glacier.png";

const accommodationIcons: LucideIcon[] = [Home, Users, Mountain, Building];

// Custom ski icon component
const SkiIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="20" x2="19" y2="4" />
    <line x1="8" y1="20" x2="22" y2="4" />
    <circle cx="4" cy="21" r="1" />
    <circle cx="7" cy="21" r="1" />
  </svg>
);

const amenityIcons = [Wifi, Car, Snowflake, SkiIcon];
const accommodationImages = [skistarImg, perheasunnotImg, karhupirttiImg, glacierImg];

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  KeyRound,
  LogOut,
  Bed,
  Car,
};

interface MajoituksetProps {
  lang?: Language;
}

const Majoitukset = ({ lang = "fi" }: MajoituksetProps) => {
  const t = getTranslations(lang).majoitukset;
  const location = useLocation();
  const isEnglish = lang === "en";
  
  // Welcome letter is shown only for English, Swedish, and Spanish (NOT French)
  const showWelcomeLetter = ["en", "sv", "es"].includes(lang);

  const trackDownload = async () => {
    try {
      await supabase.functions.invoke('log-download', {
        body: { document_type: 'welcome_letter', language: lang }
      });
    } catch (error) {
      console.error('Failed to log download:', error);
    }
  };

  const bookingLinks = [
    "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=412",
    "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=413",
    "https://app.moder.fi/levillenet/303?step=1",
    "https://app.moder.fi/levillenet?filters_types=&filters_amenities=&filters_sort=&filters_places=214"
  ];

  const faqItems = useMemo(() => t.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  })), [t.faqs]);

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getLodgingBusinessSchema(lang)} />
      <JsonLd data={getFAQSchema(faqItems)} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "en" ? "en_US" : lang === "sv" ? "sv_SE" : lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "nl" ? "nl_NL" : "fr_FR"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Mökit ja loma-asunnot Levin hiihtokeskuksessa" : "Cabins and holiday homes in Levi ski resort"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Mökit ja loma-asunnot Levin hiihtokeskuksessa" : "Cabins and holiday homes in Levi ski resort"} />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-6 md:mb-8 px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  {t.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* Discount code banner */}
            <ScrollReveal>
              <div className="text-center mb-10 md:mb-16">
                <a 
                  href={lang === "fi" ? "/ajankohtaista" : lang === "en" ? "/en/news" : lang === "nl" ? "/nl/nieuws" : `/${lang}/news`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-aurora-green/20 backdrop-blur-sm border border-primary/40 rounded-full px-4 py-2 hover:border-primary/60 transition-colors group"
                >
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {lang === "nl" ? "Gebruik code" : isEnglish ? "Use code" : "Käytä koodia"} <span className="text-primary">winter10</span> {lang === "nl" ? "– 10% korting op voorjaar 2026!" : isEnglish ? "– 10% off spring 2026!" : "– 10% alennus keväälle 2026!"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
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
                          <OptimizedImage 
                            src={accommodationImages[index]} 
                            alt=""
                            className={`w-full h-full opacity-35 sm:opacity-45 group-hover:opacity-55 transition-opacity duration-500 rounded-xl sm:rounded-2xl ${index === 2 ? 'object-top' : ''}`}
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
                            href={bookingLinks[index]}
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

            {/* Map Link */}
            <ScrollReveal>
              <Link
                to="/levi-map"
                className="flex items-center gap-3 glass-card border-border/30 hover:border-primary/50 rounded-xl p-5 mb-16 md:mb-20 transition-all duration-300 group max-w-md mx-auto"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {isEnglish ? "View locations on the map" : "Katso kohteet kartalla"}
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-auto flex-shrink-0" />
              </Link>
            </ScrollReveal>

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

            {/* Booking & Payment Section */}
            <ScrollReveal delay={0.2}>
              <section className="mb-16 md:mb-20">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  {t.bookingTitle}
                </h2>
                <div className="max-w-3xl mx-auto mb-8">
                  {t.bookingText.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-primary font-semibold mt-4">
                    {t.cancellationNote}
                  </p>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {t.infoCards.map((card) => {
                    const CardIcon = iconMap[card.icon] || ShieldCheck;
                    return (
                      <div
                        key={card.title}
                        className="glass-card border-border/30 rounded-xl p-4 sm:p-5 text-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                          <CardIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1.5">{card.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* FAQ Section */}
            <ScrollReveal delay={0.2}>
              <section className="mb-16 md:mb-20 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  {t.faqTitle}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {t.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="glass-card border-border/30 rounded-xl px-5 overflow-hidden"
                    >
                      <AccordionTrigger className="text-foreground text-left font-medium hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                        {faq.link && (
                          <>
                            {" "}
                            <Link to={faq.link} className="text-primary hover:underline font-medium">
                              {faq.linkText}
                            </Link>
                          </>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </ScrollReveal>

            {/* Welcome Letter - Only for EN, SV, ES */}
            {showWelcomeLetter && (
              <ScrollReveal delay={0.3}>
                <section>
                  <div className="glass-card border-primary/30 bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">🎅</span>
                      </div>
                      <div className="text-center md:text-left flex-grow">
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                          {lang === "es" ? "Carta de Bienvenida a Levi" : 
                           lang === "sv" ? "Välkomstbrev till Levi" : 
                           "Welcome Letter to Levi"}
                        </h2>
                        <p className="text-muted-foreground">
                          {lang === "es" 
                            ? "¡Con esta carta, puedes dar a tus hijos una maravillosa bienvenida a Levi de parte de Papá Noel!" 
                            : lang === "sv"
                            ? "Med detta brev kan du ge dina barn ett underbart välkomnande till Levi från Tomten själv!"
                            : "With this letter, you can give your children a wonderful welcome to Levi from Santa himself!"}
                        </p>
                      </div>
                      <a
                        href={lang === "es" ? "/docs/tervetulokirje-es.pdf" : "/docs/tervetulokirje.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={trackDownload}
                        className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        {lang === "es" ? "Descargar Carta" : 
                         lang === "sv" ? "Ladda ner Brev" : 
                         "Download Letter"}
                      </a>
                    </div>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* Read Also / Lue myös */}
            <ScrollReveal delay={0.2}>
              <section className="mt-16 md:mt-20 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  {isEnglish ? "Read Also" : "Lue myös"}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(isEnglish ? [
                    { title: "Cabin or Apartment? How to Choose", href: "/guide/cabin-vs-apartment-levi" },
                    { title: "Last-Minute Deals in Levi", href: "/en/last-minute" },
                    { title: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
                  ] : [
                    { title: "Mökki vai huoneisto? Näin valitset oikean majoituksen", href: "/opas/mokki-vai-huoneisto-levi" },
                    { title: "Äkkilähdöt Levi – Viime hetken tarjoukset", href: "/akkilahdot" },
                    { title: "Miten pääsee Leville?", href: "/matka/miten-paasee-leville-helsingista" },
                  ]).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="glass-card border-border/30 hover:border-primary/50 rounded-xl p-5 flex items-center justify-between gap-3 transition-all duration-300 group"
                    >
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <PageCTA lang={lang} />
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Majoitukset;
