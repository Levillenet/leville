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
import { Snowflake, Clock, Shield, Users, Thermometer, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SnowmobileSafariTipsProps {
  lang?: Language;
}

import { snowmobileSafariTranslations } from "./snowmobileSafariTranslations";
const translations = snowmobileSafariTranslations;

const SnowmobileSafariTips = ({ lang = "fi" }: SnowmobileSafariTipsProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/moottorikelkkasafari-vinkit-levi",
    en: "https://leville.net/activities/snowmobile-safari-tips-levi",
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
        return <Snowflake className="w-5 h-5" />;
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

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={t.breadcrumbs} />

        {/* Back to Activities HUB */}
        <div className="mb-6">
          <Link
            to={t.activitiesHubLink}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t.activitiesHubText}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          </header>

          {/* Introduction */}
          <p className="text-lg text-foreground/90 mb-10 leading-relaxed">{t.intro}</p>

          {/* What to Expect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              {t.sections.expect.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.expect.intro}</p>
            <ul className="space-y-3">
              {t.sections.expect.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tour Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              {t.sections.tours.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.sections.tours.items.map((tour, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{getIcon(tour.icon)}</div>
                      <span className="text-sm font-medium text-primary">{tour.duration}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tour.type}</h3>
                    <p className="text-sm text-foreground/80">{tour.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What to Wear */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              {t.sections.clothing.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.clothing.intro}</p>
            <ul className="space-y-2 mb-4">
              {t.sections.clothing.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm bg-yellow-500/10 p-4 rounded-lg text-foreground/90 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              {t.sections.clothing.tip}
            </p>
          </section>

          {/* Driving Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              {t.sections.driving.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {t.sections.driving.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/80">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Time */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.bestTime.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.bestTime.intro}</p>
            <div className="space-y-3">
              {t.sections.bestTime.times.map((time, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card/50 rounded-lg">
                  <span className="font-semibold text-primary whitespace-nowrap">{time.period}</span>
                  <span className="text-foreground/80">{time.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Booking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              {t.sections.booking.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.providers.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.booking.providers.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.prices.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.booking.prices.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm bg-primary/10 p-4 rounded-lg text-foreground/90">💡 {t.sections.booking.tip}</p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.faq.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          {/* CTA Section */}
          <section className="bg-primary/10 rounded-2xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.cta.title}</h2>
            <p className="text-foreground/80 mb-6 max-w-xl mx-auto">{t.cta.text}</p>
            <Button asChild size="lg">
              <Link to={t.accommodationsHref}>{t.cta.button}</Link>
            </Button>
          </section>

          {/* Related Links */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.relatedTitle}</h3>
            <div className="flex flex-wrap gap-4">
              {t.relatedLinks.map((link, index) => (
                <Link key={index} to={link.href} className="text-primary hover:underline">
                  {link.text} →
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default SnowmobileSafariTips;
