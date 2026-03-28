import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight, Snowflake, Star, Route, TreePine, Moon } from "lucide-react";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import OptimizedImage from "@/components/OptimizedImage";
import springCrossCountry from "@/assets/seasons/spring-cross-country.jpg";
import crossCountrySunny from "@/assets/seasons/cross-country-sunny.jpg";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CrossCountrySkiingProps {
  lang?: Language;
}

import { crossCountrySkiingTranslations as translations } from "./crossCountrySkiingTranslations";

const CrossCountrySkiingInLevi = ({ lang = "fi" }: CrossCountrySkiingProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/hiihtoladut-levi",
    en: "/guide/cross-country-skiing-in-levi",
    nl: "/nl/gids/langlaufen-in-levi",
    de: "/de/ratgeber/langlauf-in-levi",
    sv: "/sv/guide/langdskidakning-i-levi",
    fr: "/fr/guide/ski-de-fond-a-levi",
    es: "/es/guia/esqui-de-fondo-en-levi"
  };

  const homeLabelMap: Record<string, string> = { fi: "Etusivu", en: "Home", nl: "Home", de: "Startseite", sv: "Startsida", fr: "Accueil", es: "Inicio" };
  const homeHrefMap: Record<string, string> = { fi: "/", en: "/en", nl: "/nl", de: "/de", sv: "/sv", fr: "/fr", es: "/es" };
  const leviHrefMap: Record<string, string> = { fi: "/levi", en: "/en/levi", nl: "/nl/levi", de: "/de/levi", sv: "/sv/levi", fr: "/fr/levi", es: "/es/levi" };
  const breadcrumbItems = [
    { label: homeLabelMap[lang] || "Home", href: homeHrefMap[lang] || "/en" },
    { label: "Levi", href: leviHrefMap[lang] || "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    route: <Route className="w-5 h-5 text-primary" />,
    moon: <Moon className="w-5 h-5 text-primary" />,
    mountain: <TreePine className="w-5 h-5 text-primary" />,
    snowflake: <Snowflake className="w-5 h-5 text-primary" />
  };

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : lang === "de" ? "de_DE" : lang === "sv" ? "sv_SE" : lang === "fr" ? "fr_FR" : lang === "es" ? "es_ES" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": t.title,
            "description": t.meta.description,
            "author": { "@type": "Organization", "name": "Leville.net" },
            "publisher": { "@type": "Organization", "name": "Leville.net" }
          })}
        </script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${lang === "fi" ? "/" : "/en"}` },
        { name: lang === "fi" ? "Aktiviteetit" : "Activities", url: `https://leville.net${lang === "fi" ? "/opas/aktiviteetit-levi" : "/guide/activities-in-levi"}` },
        { name: t.title, url: t.meta.canonical }
      ])} />
      <JsonLd data={getFAQSchema(t.faq.items.map(i => ({ question: i.q, answer: i.a })))} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Cross-country trail image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={springCrossCountry} alt={lang === "fi" ? "Huollettu hiihtoladun mutka kevätauringossa Levillä" : "Groomed cross-country ski trail in spring sunshine in Levi"} className="w-full h-64 sm:h-80 md:h-96" priority />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Huollettu latu kaartaa metsän halki kevätauringossa — Levin latuverkosto on yli 230 km" : "A groomed trail curves through the forest in spring sunshine — Levi's trail network spans over 230 km"}
              </p>
            </section>

            {/* Sunny cross-country trail image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={crossCountrySunny} alt={lang === "fi" ? "Hiihtoladut aurinkoisena kevätpäivänä suolla" : "Cross-country ski tracks on a sunny spring day on the marsh"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Hiihtoladut aurinkoisena kevätpäivänä — Levin latuverkostosta löytyy reittejä avosuolle ja metsiin" : "Cross-country ski tracks on a sunny spring day — Levi's trail network includes routes across open marshes and through forests"}
              </p>
            </section>

            {/* Trail maps and services links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {lang === "fi" ? "Latukartta ja latupalvelu" : lang === "nl" ? "Loipekaart en loipeservice" : "Trail Map and Trail Service"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://kittila.fi/sites/default/files/2022-10/Levin%20latukartta%202022-2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="glass-card border-border/30 p-4 hover:border-primary/50 transition-colors h-full">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {lang === "fi" ? "Levin ja Kittilän latukartta (PDF)" : lang === "nl" ? "Loipekaart Levi en Kittilä (PDF)" : "Levi and Kittilä Trail Map (PDF)"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {lang === "fi" ? "Tulostettava latukartta koko alueen laduista" : lang === "nl" ? "Printbare kaart van alle loipes in het gebied" : "Printable trail map of the entire area"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
                <a
                  href="https://www.infogis.fi/levi/?lang=fi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="glass-card border-border/30 p-4 hover:border-primary/50 transition-colors h-full">
                    <div className="flex items-start gap-3">
                      <Route className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {lang === "fi" ? "Sähköinen latupalvelu" : lang === "nl" ? "Online loipeservice" : "Online Trail Service"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {lang === "fi" ? "Tarkista latujen kunnossapito ja kunto reaaliajassa" : lang === "nl" ? "Controleer loipe-onderhoud en -condities in realtime" : "Check trail maintenance and conditions in real time"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              </div>
            </section>

            {/* Stats */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t.sections.network.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.sections.network.stats.map((stat, idx) => (
                  <Card key={idx} className="glass-card border-border/30 text-center p-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                      {iconMap[stat.icon]}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Trails */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.trails.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.trails.items.map((trail, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{trail.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{trail.length}</p>
                    <p className="text-sm text-muted-foreground">{trail.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.tips.title}</h2>
              <ul className="space-y-3">
                {t.sections.tips.items.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.services.title}</h2>
              <p className="text-muted-foreground">{t.sections.services.content}</p>
            </section>

            {/* Conditions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.conditions.title}</h2>
              <p className="text-muted-foreground">{t.sections.conditions.content}</p>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <GuideDisclaimer lang={lang} />

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={t.cta.hubLink}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t.cta.hub}
                </Link>
              </Button>
              <Button asChild>
                <Link to={t.cta.accommodationLink}>
                  {t.cta.accommodation}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </section>
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

export default CrossCountrySkiingInLevi;
