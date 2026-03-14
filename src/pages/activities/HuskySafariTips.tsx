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
import { Dog, Clock, Heart, Users, Thermometer, Shield, CheckCircle, MapPin, Snowflake } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HuskySafariTipsProps {
  lang?: Language;
}

import { huskySafariTranslations } from "./huskySafariTranslations";
const translations = huskySafariTranslations;

const HuskySafariTips = ({ lang = "fi" }: HuskySafariTipsProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/koiravaljakkoajelu-levi",
    en: "https://leville.net/activities/husky-safari-levi",
    nl: "https://leville.net/nl/activiteiten/husky-safari-levi",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock":
        return <Clock className="w-5 h-5" />;
      case "mappin":
        return <MapPin className="w-5 h-5" />;
      case "snowflake":
        return <Snowflake className="w-5 h-5" />;
      default:
        return <Dog className="w-5 h-5" />;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.sections.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.meta.description,
    author: {
      "@type": "Organization",
      name: "Leville.net",
    },
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : "en_US"} />
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

      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          {/* Back to Hub */}
          <div className="mb-6">
            <Link
              to={t.activitiesHubLink}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t.activitiesHubText}
            </Link>
          </div>

          {/* Hero */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Dog className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">{t.intro}</p>
          </section>

          {/* What to Expect */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  {t.sections.expect.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.expect.intro}</p>
                <ul className="space-y-2">
                  {t.sections.expect.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Tour Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.sections.tours.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.sections.tours.items.map((tour, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      {getIcon(tour.icon)}
                      <span className="text-sm font-medium">{tour.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tour.type}</h3>
                    <p className="text-muted-foreground text-sm">{tour.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Dogs and Welfare */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary" />
                  {t.sections.dogs.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.dogs.intro}</p>
                <ul className="space-y-2 mb-4">
                  {t.sections.dogs.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-primary bg-primary/5 p-3 rounded-lg">💡 {t.sections.dogs.tip}</p>
              </CardContent>
            </Card>
          </section>

          {/* Clothing */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-primary" />
                  {t.sections.clothing.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.clothing.intro}</p>
                <ul className="space-y-2 mb-4">
                  {t.sections.clothing.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  ⚠️ {t.sections.clothing.tip}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Driving Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              {t.sections.driving.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {t.sections.driving.items.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Time */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Snowflake className="w-6 h-6 text-primary" />
                  {t.sections.bestTime.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.bestTime.intro}</p>
                <div className="space-y-4">
                  {t.sections.bestTime.times.map((time, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="font-semibold text-primary min-w-[140px]">{time.period}</span>
                      <span className="text-muted-foreground">{time.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Booking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.sections.booking.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.providers.title}</h3>
                  <ul className="space-y-2">
                    {t.sections.booking.providers.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.prices.title}</h3>
                  <ul className="space-y-2">
                    {t.sections.booking.prices.list.map((item, index) => (
                      <li key={index} className="text-muted-foreground text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary mt-4 bg-primary/5 p-3 rounded-lg">💡 {t.sections.booking.tip}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.sections.faq.title}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card/80 backdrop-blur-sm border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          {/* CTA */}
          <section className="mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-2xl font-bold mb-3">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t.cta.text}</p>
                <Button asChild size="lg">
                  <Link to={t.accommodationsHref}>{t.cta.button}</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Related Links */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t.relatedTitle}</h3>
            <div className="flex flex-wrap gap-3">
              {t.relatedLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-sm text-primary hover:underline bg-primary/5 px-4 py-2 rounded-full"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <PageCTA lang={lang} />

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default HuskySafariTips;
