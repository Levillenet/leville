import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Snowflake, Mountain, ThermometerSun, Star, Clock, Euro, Bike, Heart, Info } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { springSkiingTranslations } from "./springSkiingTranslations";

interface SpringSkiingLeviProps {
  lang?: Language;
}

const localeMap: Record<string, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const breadcrumbConfig: Record<string, { home: string; homeHref: string; guide: string; guideHref: string }> = {
  fi: { home: "Etusivu", homeHref: "/", guide: "Opas", guideHref: "/levi" },
  en: { home: "Home", homeHref: "/en", guide: "Guide", guideHref: "/en/levi" },
  nl: { home: "Home", homeHref: "/nl", guide: "Gids", guideHref: "/nl/levi" },
  sv: { home: "Hem", homeHref: "/sv", guide: "Guide", guideHref: "/sv/levi" },
  de: { home: "Startseite", homeHref: "/de", guide: "Ratgeber", guideHref: "/de/levi" },
  es: { home: "Inicio", homeHref: "/es", guide: "Guía", guideHref: "/es/levi" },
  fr: { home: "Accueil", homeHref: "/fr", guide: "Guide", guideHref: "/fr/levi" },
};

const SpringSkiingLevi = ({ lang = "fi" }: SpringSkiingLeviProps) => {
  const t = springSkiingTranslations[lang as keyof typeof springSkiingTranslations] || springSkiingTranslations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/kevatlaskettelu-levi",
    en: "/guide/spring-skiing-in-levi",
    nl: "/nl/gids/voorjaarsskien-levi",
    sv: "/sv/guide/varskidakning-levi",
    de: "/de/ratgeber/fruehlingsskifahren-levi",
    es: "/es/guia/esqui-primavera-levi",
    fr: "/fr/guide/ski-printemps-levi"
  };

  const bc = breadcrumbConfig[lang] || breadcrumbConfig.fi;
  const breadcrumbItems = [
    { label: bc.home, href: bc.homeHref },
    { label: bc.guide, href: bc.guideHref },
    { label: t.breadcrumbLabel, href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.h1, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getFAQSchema(t.faq.items.map(item => ({ question: item.q, answer: item.a })))} />
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
        <meta property="og:locale" content={localeMap[lang] || "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={t.h1} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={t.h1} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.h1}</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Why spring */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.why.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.why.content}</p>
            </section>

            {/* Conditions */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <ThermometerSun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.conditions.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-3">
                {t.sections.conditions.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">{t.sections.conditions.disclaimer}</p>
            </section>

            {/* Terrace skiing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.terrace.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.terrace.content}</p>
            </section>

            {/* Ylläs-Levi */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.yllasLevi.title}</h2>
              <p className="text-muted-foreground">{t.sections.yllasLevi.content}</p>
            </section>

            {/* Other activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.other.title}</h2>
              <ul className="space-y-3">
                {t.sections.other.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prices */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Euro className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.prices.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.prices.content}</p>
              <Link to={t.sections.prices.linkHref} className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
                {t.sections.prices.linkText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <GuideDisclaimer lang={lang} />

            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                <Button asChild>
                  <Link to={t.cta.link}>
                    {t.cta.button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
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

export default SpringSkiingLevi;
