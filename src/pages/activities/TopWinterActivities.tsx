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
import { 
  Snowflake, 
  Mountain,
  Dog,
  TreePine,
  Fish,
  Footprints,
  Bike,
  Heart
} from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TopWinterActivitiesProps {
  lang?: Language;
}

import { topWinterActivitiesTranslations as translations } from "./topWinterActivitiesTranslations";

const TopWinterActivities = ({ lang = "fi" }: TopWinterActivitiesProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;
  
  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/parhaat-talviaktiviteetit-levi",
    en: "https://leville.net/activities/top-winter-activities-in-levi-lapland",
    nl: "https://leville.net/nl/activiteiten/winteractiviteiten-levi",
    de: "https://leville.net/de/aktivitaeten/winteraktivitaeten-levi",
    sv: "https://leville.net/sv/aktiviteter/vinteraktiviteter-levi",
    fr: "https://leville.net/fr/activites/activites-hiver-levi",
    es: "https://leville.net/es/actividades/actividades-invierno-levi",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "mountain": return <Mountain className="w-6 h-6" />;
      case "dog": return <Dog className="w-6 h-6" />;
      case "treepine": return <TreePine className="w-6 h-6" />;
      case "fish": return <Fish className="w-6 h-6" />;
      case "footprints": return <Footprints className="w-6 h-6" />;
      case "bike": return <Bike className="w-6 h-6" />;
      case "heart": return <Heart className="w-6 h-6" />;
      default: return <Snowflake className="w-6 h-6" />;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.sections.faq.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.meta.description,
    "author": {
      "@type": "Organization",
      "name": "Leville.net"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://leville.net${item.href}`
    }))
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : lang === "de" ? "de_DE" : lang === "sv" ? "sv_SE" : lang === "fr" ? "fr_FR" : lang === "es" ? "es_ES" : "en_US"} />
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

      <HreflangTags 
        currentPath={location.pathname}
        customUrls={hreflangUrls}
      />

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </header>

          {/* Introduction */}
          <p className="text-lg text-foreground/90 mb-10 leading-relaxed">
            {t.intro}
          </p>

          {/* Skiing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.skiing.icon)}
              <span className="text-primary">{t.sections.skiing.title}</span>
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.skiing.intro}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {t.sections.skiing.subsections.map((sub, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">{sub.title}</h3>
                    <ul className="space-y-2 text-sm">
                      {sub.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Cross-Country Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.crossCountry.icon)}
              <span className="text-primary">{t.sections.crossCountry.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.crossCountry.intro}</p>
            <ul className="space-y-2">
              {t.sections.crossCountry.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Husky Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.husky.icon)}
              <span className="text-primary">{t.sections.husky.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.husky.intro}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {t.sections.husky.options.map((option, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{option.name}</h3>
                    <p className="text-sm text-foreground/80">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm bg-primary/10 p-4 rounded-lg">
              💡 {t.sections.husky.tip}
            </p>
          </section>

          {/* Reindeer Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.reindeer.icon)}
              <span className="text-primary">{t.sections.reindeer.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.reindeer.intro}</p>
            <div className="space-y-4">
              {t.sections.reindeer.options.map((option, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{option.name}</h3>
                    <p className="text-sm text-foreground/80">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Ice Fishing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.iceFishing.icon)}
              <span className="text-primary">{t.sections.iceFishing.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.iceFishing.intro}</p>
            <ul className="space-y-2">
              {t.sections.iceFishing.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Snowshoeing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.snowshoeing.icon)}
              <span className="text-primary">{t.sections.snowshoeing.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.snowshoeing.intro}</p>
            <ul className="space-y-2">
              {t.sections.snowshoeing.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Fat Biking Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.fatBiking.icon)}
              <span className="text-primary">{t.sections.fatBiking.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.fatBiking.intro}</p>
            <ul className="space-y-2">
              {t.sections.fatBiking.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Connecting Activities */}
          <section className="mb-12 bg-primary/5 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t.sections.connecting.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.connecting.intro}</p>
            <ul className="space-y-2">
              {t.sections.connecting.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-foreground/80">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t.sections.faq.title}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {item.a}
                  </AccordionContent>
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
                <Link
                  key={index}
                  to={link.href}
                  className="text-primary hover:underline"
                >
                  {link.text} →
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

export default TopWinterActivities;
