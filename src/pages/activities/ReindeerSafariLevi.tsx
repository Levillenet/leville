import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Clock, Euro, Users, Camera, ThermometerSnowflake, Heart, MapPin, ArrowRight, Info } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ReindeerSafariLeviProps {
  lang?: Language;
}

import { reindeerSafariTranslations } from "./reindeerSafariTranslations";
const translations = reindeerSafariTranslations;

const ReindeerSafariLevi = ({ lang = "fi" }: ReindeerSafariLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/porosafari-levi",
    en: "https://leville.net/activities/reindeer-safari-levi",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock": return <Clock className="w-5 h-5" />;
      case "heart": return <Heart className="w-5 h-5" />;
      case "snowflake": return <Snowflake className="w-5 h-5" />;
      case "users": return <Users className="w-5 h-5" />;
      case "thermometer": return <ThermometerSnowflake className="w-5 h-5" />;
      case "camera": return <Camera className="w-5 h-5" />;
      case "info": return <Info className="w-5 h-5" />;
      default: return <Snowflake className="w-5 h-5" />;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.sections.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.meta.description,
    author: { "@type": "Organization", name: "Leville.net" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://leville.net${item.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={hreflangUrls} />

      <SubpageBackground />
      <Header />
      <Breadcrumbs lang={lang} />

      <main id="main-content" className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          {/* Back to Hub */}
          <div className="mb-6">
            <Link to={t.activitiesHubLink} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t.activitiesHubText}
            </Link>
          </div>

          {/* Hero */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Snowflake className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">{t.intro}</p>
          </section>

          {/* Experiences */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              {t.sections.experiences.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.sections.experiences.items.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{item.type}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What Happens */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  {t.sections.whatHappens.title}
                </h2>
                <div className="space-y-4">
                  {t.sections.whatHappens.paragraphs.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How to Prepare */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ThermometerSnowflake className="w-6 h-6 text-primary" />
              {t.sections.preparation.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.sections.preparation.items.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tips for Families */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {t.sections.families.title}
                </h2>
                <ul className="space-y-3">
                  {t.sections.families.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Best Time */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.bestTime.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.sections.bestTime.times.map((time, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">{time.period}</h3>
                    <p className="text-muted-foreground text-sm">{time.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" />
              {t.sections.faq.title}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-3">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t.cta.text}</p>
                <Link to={t.accommodationsHref}>
                  <Button size="lg" className="gap-2">
                    {t.cta.button}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection
            title={t.readNext.title}
            links={t.readNext.links}
          />
        </div>
      </main>

      <Footer />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default ReindeerSafariLevi;
