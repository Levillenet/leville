import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

interface SpringSkiingLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Kevätlaskettelu Levillä — Aurinko, hanki ja pitkät päivät | Leville.net",
      description: "Kevätlaskettelu on Levin parasta aikaa: aurinkoisia päiviä, pehmeitä rinteitä ja rento tunnelma. Opas keväiseen Levi-lomaan.",
      canonical: "https://leville.net/opas/kevatlaskettelu-levi"
    },
    h1: "Kevätlaskettelu Levillä — aurinko, hanki ja pitkät päivät",
    intro: "Monet paikalliset sanovat, että kevät on Levin paras kausi. Aurinko paistaa pitkään, lunta on eniten ja tunnelma on rento. Tämä opas kertoo kaiken kevätlaskettelusta Levillä.",
    sections: {
      why: {
        title: "Miksi kevät on Levin parasta aikaa?",
        content: "Monet paikalliset sanovat, että kevät (maalis–huhtikuu) on Levin paras kausi. Syy on yksinkertainen: aurinko paistaa jo pitkään (maaliskuussa 10–14h päivänvaloa, huhtikuussa vielä enemmän), lunta on eniten koko talvesta, rinteet ovat pehmeät ja tunnelma on rento. Hiihtolomaruuhkat ovat ohi, hinnat ovat kohtuullisemmat ja luonto herää."
      },
      conditions: {
        title: "Olosuhteet",
        items: [
          { label: "Lämpötila", value: "Maaliskuu: -5…-15 °C, huhtikuu: -5…+5 °C" },
          { label: "Lumi", value: "Parhaimmillaan — kertynyt koko talven, kantava hanki aamuisin, pehmeä lumi iltapäivisin" },
          { label: "Valo", value: "Aurinko nousee korkeammalle ja päivä pitenee nopeasti — huhtikuussa yötön yö lähestyy" },
          { label: "Rinteet", value: "Avoinna tyypillisesti huhtikuun loppuun, joskus toukokuun alkuun asti" }
        ],
        disclaimer: "Rinteiden sulkemisajankohta vaihtelee vuosittain sääolosuhteiden mukaan."
      },
      terrace: {
        title: "Terassilaskettelu",
        content: "Kevään erikoisuus on terassilaskettelu — auringon paisteessa istuminen rinneravintolan terassilla on Levin suosituimpia kevätperinteitä. Ihmiset laskettelevat aamupäivän, istuvat terassilla lounasaikaan ja palaavat rinteeseen iltapäivällä. Rento ja sosiaalinen tunnelma."
      },
      yllasLevi: {
        title: "Ylläs-Levi hiihto",
        content: "Huhtikuussa järjestetään perinteinen Ylläs-Levi hiihtotapahtuma (55 km ja 70 km). Vaikkei osallistuisi kilpailuun, ladut ovat erinomaisessa kunnossa ja tunnelma tarttuva. Ladut ovat yleensä auki vappuun asti."
      },
      other: {
        title: "Muuta keväällä",
        items: [
          "Fatbike kantavalla hangella — aamupäivällä pääsee melkein minne vain",
          "Lumikenkäily auringonpaisteessa",
          "Revontulet: maaliskuussa vielä mahdollisia, huhtikuussa yöt liian valoisat",
          "Lasten kanssa: pitkä päivänvalo tarkoittaa enemmän ulkoiluaikaa"
        ]
      },
      prices: {
        title: "Hinnat keväällä",
        content: "Kevätkausi (maalis–huhtikuu) on Levin edullisimpia aikoja jouluun ja hiihtolomaan verrattuna. Majoitukset, lennot ja aktiviteetit ovat usein 20–40 % halvempia kuin sesonkihuipulla.",
        linkText: "Katso tarkemmat hinnat: Hintaopas",
        linkHref: "/opas/hinnat-levilla"
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Kuinka kauan rinteet ovat auki keväällä?", a: "Tyypillisesti huhtikuun loppuun, joskus toukokuun alkuun. Tarkista aina levi.fi:stä ajantasainen tilanne." },
        { q: "Onko kevätlaskettelu aloittelijoille?", a: "Ehdottomasti — pehmeä lumi on anteeksiantavampaa kuin kova talvilumi, ja pitkät päivät antavat enemmän aikaa harjoitella." },
        { q: "Näkeekö keväällä revontulia?", a: "Maaliskuussa vielä mahdollista. Huhtikuussa yöt ovat jo liian valoisia." }
      ]
    },
    cta: {
      text: "Kevätloma Levillä — edullisempaa ja aurinkoisempaa kuin talvella.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja vinkit", href: "/opas/laskettelu-levi" },
        { title: "Kevät Levillä", desc: "Kattava kevätopas", href: "/opas/kevat-levi" },
        { title: "Hiihto Levillä", desc: "Yli 230 km latuja", href: "/opas/hiihto-levi" },
        { title: "Hinnat Levillä", desc: "Mitä loma maksaa?", href: "/opas/hinnat-levilla" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Kevätlaskettelu"
  },
  en: {
    meta: {
      title: "Spring Skiing in Levi — Sun, Snow & Long Days | Leville.net",
      description: "Spring skiing is Levi at its best: sunny days, soft slopes and a relaxed atmosphere. Guide to a spring holiday in Levi.",
      canonical: "https://leville.net/guide/spring-skiing-in-levi"
    },
    h1: "Spring Skiing in Levi — Sun, Snow and Long Days",
    intro: "Many locals say spring is the best season in Levi. The sun shines for long hours, snow is at its deepest and the atmosphere is relaxed. This guide covers everything about spring skiing in Levi.",
    sections: {
      why: {
        title: "Why Is Spring Levi's Best Season?",
        content: "Many locals say that spring (March–April) is the best season in Levi. The reason is simple: the sun shines for a long time (10–14 hours of daylight in March, even more in April), snow is at its deepest of the entire winter, slopes are soft and the atmosphere is relaxed. Ski holiday crowds are over, prices are more reasonable and nature awakens."
      },
      conditions: {
        title: "Conditions",
        items: [
          { label: "Temperature", value: "March: -5…-15 °C, April: -5…+5 °C" },
          { label: "Snow", value: "At its best — accumulated all winter, firm crust in the mornings, soft snow in the afternoons" },
          { label: "Light", value: "Sun rises higher and days lengthen rapidly — in April the midnight sun approaches" },
          { label: "Slopes", value: "Typically open until end of April, sometimes into early May" }
        ],
        disclaimer: "Slope closing dates vary yearly depending on weather conditions."
      },
      terrace: {
        title: "Terrace Skiing",
        content: "Spring's speciality is terrace skiing — sitting in the sunshine on a slope restaurant terrace is one of Levi's most beloved spring traditions. People ski in the morning, sit on the terrace at lunch and return to the slopes in the afternoon. A relaxed and social atmosphere."
      },
      yllasLevi: {
        title: "Ylläs-Levi Ski Event",
        content: "In April, the traditional Ylläs-Levi ski event takes place (55 km and 70 km). Even if you don't compete, the trails are in excellent condition and the atmosphere is infectious. Trails usually stay open until May Day."
      },
      other: {
        title: "Other Spring Activities",
        items: [
          "Fatbiking on firm snow crust — in the morning you can go almost anywhere",
          "Snowshoeing in sunshine",
          "Northern lights: still possible in March, April nights too bright",
          "With children: long daylight means more outdoor time"
        ]
      },
      prices: {
        title: "Prices in Spring",
        content: "Spring season (March–April) is one of Levi's most affordable periods compared to Christmas and ski holidays. Accommodation, flights and activities are often 20–40% cheaper than peak season.",
        linkText: "See detailed prices: Price Guide",
        linkHref: "/guide/prices-in-levi"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "How long are the slopes open in spring?", a: "Typically until the end of April, sometimes into early May. Always check the current situation on levi.fi." },
        { q: "Is spring skiing for beginners?", a: "Absolutely — soft snow is more forgiving than hard winter snow, and long days give you more time to practise." },
        { q: "Can you see the northern lights in spring?", a: "Still possible in March. In April the nights are already too bright." }
      ]
    },
    cta: {
      text: "Spring holiday in Levi — more affordable and sunnier than winter.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "43 slopes and tips", href: "/guide/skiing-in-levi" },
        { title: "Spring in Levi", desc: "Complete spring guide", href: "/guide/spring-in-levi" },
        { title: "Cross-Country Skiing", desc: "Over 230 km of trails", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Prices in Levi", desc: "What does it cost?", href: "/guide/prices-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Spring Skiing"
  }
};

const SpringSkiingLevi = ({ lang = "fi" }: SpringSkiingLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/kevatlaskettelu-levi",
    en: "/guide/spring-skiing-in-levi"
  };

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Guide" : "Opas", href: lang === "en" ? "/en/levi" : "/levi" },
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Kevätlaskettelu Levillä" : "Spring skiing in Levi"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Kevätlaskettelu Levillä" : "Spring skiing in Levi"} />
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

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default SpringSkiingLevi;
