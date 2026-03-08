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
import { ArrowRight, Star, Gift, Mountain, Users, MapPin, Info, Camera, Heart } from "lucide-react";
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

interface SantaClausLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Joulupukki Levillä — Missä tavata pukki ja jouluelämykset | Leville.net",
      description: "Opas joulupukin tapaamiseen Levillä: Joulupukin mökki tunturilla, Arcandia ja muut jouluelämykset. Vertailu Rovaniemen Pajakylään.",
      canonical: "https://leville.net/opas/joulupukki-levilla"
    },
    h1: "Joulupukki Levillä — missä tavata pukki?",
    intro: "Levin tunturin huipulla sijaitsee Joulupukin mökki — tunnelmallinen elämys koko perheelle. Tässä oppaassa kerromme missä ja miten tapaat pukin, mitä muita jouluelämyksiä Levillä on ja miten Levi vertautuu Rovaniemeen.",
    sections: {
      cabin: {
        title: "Joulupukin mökki Levin tunturilla",
        content: "Levin tunturin huipulla sijaitsee Joulupukin mökki, jonne pääsee Levi Black -gondolihissillä. Mökki on tunnelmallinen elämys — ei suuri kaupallinen teemapuisto vaan intiimi tapaaminen joulupukin kanssa. Gondolimatka itsessään on elämys lapsille ja aikuisille.",
        note: "Tarkista aukioloajat Levin matkailuinfosta — mökki on auki tyypillisesti joulu–maaliskuussa."
      },
      arcandia: {
        title: "Arcandia",
        content: "Arcandia on elämyskeskus joka sijaitsee hylätyssä elokuvalavasteessa Levin lähettyvillä. Tarjolla on joulupukkitapaamisia, tonttutoimintaa, jousiammuntaa ja muita elämyksiä seikkailullisessa ympäristössä. Sopii erityisesti lapsiperheille.",
        note: "Tarkista ajantasaiset aukioloajat ja hinnat Arcandian omilta sivuilta."
      },
      other: {
        title: "Muut jouluelämykset Levillä",
        items: [
          "Porosafari joulutunnelmassa — porotiloilla on usein jouluinen ohjelma",
          "Joulumarkkinat (ajankohdasta riippuen)",
          "Jouluilta omassa mökissä — sauna, joulupöytä ja hiljaisuus"
        ],
        disclaimer: "Joulusesongin ohjelma vaihtelee vuosittain. Tarkista ajantasaiset tiedot etukäteen."
      },
      comparison: {
        title: "Levi vs Rovaniemen Joulupukin Pajakylä",
        rovaniemi: [
          "Suurempi, kaupallisempi ja tunnetumpi",
          "Joulupukki ympäri vuoden",
          "Napapiirin ylitys ja postikonttori"
        ],
        levi: [
          "Intiimimpi ja autenttisempi — ei massaturismia",
          "Rauhallinen tapaaminen tunturin huipulla",
          "Joulupukki + laskettelu + safarit + oma mökki — monipuolisempi loma"
        ],
        daytrip: "Päiväretki Rovaniemelle Leviltä on mahdollinen (noin 2,5 h suuntaan) jos haluat molemmat.",
        tip: "Vinkki: jos pääasia on tavata joulupukki, molemmat toimivat. Jos haluat monipuolisen joululoman, Levi on parempi tukikohta."
      },
      familyTips: {
        title: "Vinkkejä perheille",
        items: [
          "Varaa joulupukkitapaamiset etukäteen — erityisesti joulu- ja hiihtolomasesonkina",
          "Pienimmille lapsille (~2–4 v) gondolimatka + pukkitapaaminen on riittävä elämys",
          "Ota kamera mukaan — mutta pukkimökeissä on usein myös valokuvaaja",
          "Yhdistä pukkitapaaminen poroajeluun samana päivänä"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Onko joulupukki Levillä ympäri vuoden?", a: "Joulupukin mökki on auki joulusesongin aikana (tyypillisesti joulu–maaliskuu). Ympärivuotiseen pukkitapaamiseen Rovaniemen Pajakylä on vaihtoehto." },
        { q: "Paljonko joulupukkitapaaminen maksaa?", a: "Riippuu elämyksestä. Gondolimatka + mökki on eri hinta kuin Arcandia. Tarkista ajantasaiset hinnat etukäteen." },
        { q: "Sopiiko pienille lapsille?", a: "Ehdottomasti — sekä Joulupukin mökki että Arcandia on suunniteltu perheille." },
        { q: "Voiko tehdä päiväretken Rovaniemelle?", a: "Kyllä, matka on noin 2,5 tuntia suuntaan. Opastettuja päiväretkiä on myös saatavilla." }
      ]
    },
    cta: {
      text: "Joulusesonki on erittäin kysytty — varaa majoitus ajoissa.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Joulu Lapissa", desc: "Tunnelmallinen jouluopas", href: "/levi/joulu-lapissa" },
        { title: "Lapsiperheet Levillä", desc: "Vinkit perheen lomaan", href: "/opas/lapsiperheet-levilla" },
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Joulupukki Levillä"
  },
  en: {
    meta: {
      title: "Santa Claus in Levi — Where to Meet Santa & Christmas Experiences | Leville.net",
      description: "Guide to meeting Santa in Levi: Santa's Cabin on the fell, Arcandia and other Christmas experiences. Comparison with Rovaniemi.",
      canonical: "https://leville.net/guide/santa-claus-in-levi"
    },
    h1: "Santa Claus in Levi — Where to Meet Santa?",
    intro: "On top of Levi fell sits Santa's Cabin — an atmospheric experience for the whole family. This guide tells you where and how to meet Santa, what other Christmas experiences Levi offers and how it compares to Rovaniemi.",
    sections: {
      cabin: {
        title: "Santa's Cabin on Levi Fell",
        content: "On top of Levi fell sits Santa's Cabin, accessible via the Levi Black gondola lift. The cabin offers an authentic, atmospheric experience — not a large commercial theme park but an intimate meeting with Santa. The gondola ride itself is an experience for children and adults alike.",
        note: "Check opening times from Levi tourist info — the cabin is typically open from Christmas to March."
      },
      arcandia: {
        title: "Arcandia",
        content: "Arcandia is an experience centre located in an abandoned film set near Levi. It offers Santa meetings, elf activities, archery and other experiences in an adventurous setting. Particularly suitable for families with children.",
        note: "Check current opening times and prices on Arcandia's own website."
      },
      other: {
        title: "Other Christmas Experiences in Levi",
        items: [
          "Reindeer safari in a Christmas atmosphere — reindeer farms often have festive programmes",
          "Christmas markets (depending on dates)",
          "Christmas Eve in your own cabin — sauna, festive dinner and peace"
        ],
        disclaimer: "Christmas season programmes vary yearly. Check up-to-date info in advance."
      },
      comparison: {
        title: "Levi vs Rovaniemi's Santa Claus Village",
        rovaniemi: [
          "Larger, more commercial and better known",
          "Santa available year-round",
          "Arctic Circle crossing and post office"
        ],
        levi: [
          "More intimate and authentic — no mass tourism",
          "Peaceful meeting on top of a fell",
          "Santa + skiing + safaris + own cabin — a more versatile holiday"
        ],
        daytrip: "A day trip from Levi to Rovaniemi is possible (about 2.5 hours each way) if you want both.",
        tip: "Tip: if meeting Santa is the main thing, both work. If you want a versatile Christmas holiday, Levi is the better base."
      },
      familyTips: {
        title: "Tips for Families",
        items: [
          "Book Santa meetings in advance — especially during Christmas and ski holiday season",
          "For the youngest children (~2–4 years) the gondola ride + Santa meeting is enough",
          "Bring a camera — but Santa's cabins usually have a photographer too",
          "Combine the Santa visit with a reindeer sleigh ride on the same day"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is Santa in Levi year-round?", a: "Santa's Cabin is open during the Christmas season (typically December–March). For year-round Santa meetings, Rovaniemi's Santa Claus Village is an option." },
        { q: "How much does a Santa meeting cost?", a: "Depends on the experience. The gondola ride + cabin is a different price than Arcandia. Check current prices in advance." },
        { q: "Is it suitable for small children?", a: "Absolutely — both Santa's Cabin and Arcandia are designed for families." },
        { q: "Can I take a day trip to Rovaniemi?", a: "Yes, the journey is about 2.5 hours each way. Guided day trips are also available." }
      ]
    },
    cta: {
      text: "Christmas season is extremely popular — book your accommodation early.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Christmas in Lapland", desc: "Atmospheric Christmas guide", href: "/levi/joulu-lapissa" },
        { title: "Levi With Children", desc: "Tips for family holidays", href: "/guide/levi-with-children" },
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Santa Claus in Levi"
  }
};

const SantaClausLevi = ({ lang = "fi" }: SantaClausLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/joulupukki-levilla",
    en: "/guide/santa-claus-in-levi"
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
        <meta property="og:image:alt" content={lang === "fi" ? "Joulupukki Levillä" : "Santa Claus in Levi"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Joulupukki Levillä" : "Santa Claus in Levi"} />
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

            {/* Santa's Cabin */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.cabin.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.cabin.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.cabin.note}</p>
                </div>
              </Card>
            </section>

            {/* Arcandia */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.arcandia.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.arcandia.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.arcandia.note}</p>
                </div>
              </Card>
            </section>

            {/* Other experiences */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.other.title}</h2>
              <ul className="space-y-3 mb-4">
                {t.sections.other.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{t.sections.other.disclaimer}</p>
            </section>

            {/* Comparison */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.comparison.title}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card className="glass-card border-border/30 p-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Rovaniemi
                  </h3>
                  <ul className="space-y-2">
                    {t.sections.comparison.rovaniemi.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="glass-card border-border/30 p-6 ring-1 ring-primary/30">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-primary" />
                    Levi
                  </h3>
                  <ul className="space-y-2">
                    {t.sections.comparison.levi.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{t.sections.comparison.daytrip}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground">{t.sections.comparison.tip}</p>
                </div>
              </Card>
            </section>

            {/* Family tips */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.familyTips.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.familyTips.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Camera className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
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

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default SantaClausLevi;
