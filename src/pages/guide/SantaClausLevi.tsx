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
import { ArrowRight, Star, Gift, Mountain, Users, MapPin, Info, Camera, Heart, Download, TreePine } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import santaCabinImage from "@/assets/santa-cabin-fell.jpg";
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
      description: "Opas joulupukin tapaamiseen Levillä: Joulupukin mökki tunturilla, Elves Village ja muut jouluelämykset. Vertailu Rovaniemen Pajakylään.",
      canonical: "https://leville.net/opas/joulupukki-levilla"
    },
    h1: "Joulupukki Levillä — missä tavata pukki?",
    intro: "Levi tarjoaa ainutlaatuisia jouluelämyksiä koko perheelle — tunturin huipun ikonisesta joulupukin mökistä elämysyritysten pukkitapaamisiin. Tässä oppaassa kerromme mitä Levillä on tarjolla ja miten Levi vertautuu Rovaniemeen.",
    sections: {
      cabin: {
        title: "Joulupukin mökki Levin tunturilla",
        content: "Levin tunturin huipulla sijaitsee ikoninen Joulupukin mökki — Levin kuvatuin kohde, joka tunnetaan Joulutarina-elokuvasta. Mökki on upea nähtävyys ja valokuvauspaikka henkeäsalpaavine näköaloineen, mutta joulupukki ei yleensä ole siellä paikalla.",
        access: "Mökille pääsee gondolihissillä ja kävellen alas rinnettä, kesällä patikoiden Tuikku-ravintolalta tai talvella suksilla laskettelun yhteydessä. Retki mökille kannattaa ehdottomasti tehdä Levin-vierailun aikana!",
        note: "Mökki on nähtävyys — ei varsinainen joulupukkielämys. Pukkitapaamiset järjestävät Levin elämysyritykset."
      },
      experiences: {
        title: "Joulupukkielämykset Levillä",
        content: "Levillä toimii useita elämysyrityksiä jotka järjestävät joulupukkitapaamisia. Suurin ja suosituin näistä on Elves Village, joka tarjoaa monipuolisen jouluisen elämyksen tonttutoimintoineen.",
        note: "Levillä on monia muitakin pukkielämysten järjestäjiä — tarkista ajantasaiset vaihtoehdot Visit Levi -matkailuneuvonnasta.",
        letterTitle: "Joulupukin tervetulokirje",
        letterDesc: "Lataa joulupukin tervetulokirje tulostettavaksi — mukava yllätys lapsille majoitukseen saapuessa!",
        letterButton: "Lataa tervetulokirje (PDF)"
      },
      other: {
        title: "Muut jouluelämykset Levillä",
        items: [
          "Porosafari joulutunnelmassa — porotiloilla on usein jouluinen ohjelma",
          "Joulumarkkinat (ajankohdasta riippuen)",
          "Jouluilta omassa mökissä — sauna, joulupöytä ja hiljaisuus",
          "Joulupukin voi tilata myös omaan majoitukseen! Kysy lisää Visit Levi -matkailuneuvonnasta."
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
          "Elämysyritysten pukkitapaamiset + ikoninen mökki nähtävyytenä",
          "Joulupukki + laskettelu + safarit + oma mökki — monipuolisempi loma"
        ],
        daytrip: "Päiväretki Rovaniemelle Leviltä on mahdollinen (noin 2,5 h suuntaan) jos haluat molemmat.",
        tip: "Vinkki: jos pääasia on tavata joulupukki, molemmat toimivat. Jos haluat monipuolisen joululoman, Levi on parempi tukikohta."
      },
      familyTips: {
        title: "Vinkkejä perheille",
        items: [
          "Varaa joulupukkitapaamiset etukäteen — erityisesti joulu- ja hiihtolomasesonkina",
          "Retki Joulupukin mökille tunturiin on elämys itsessään — upeat maisemat ja valokuvauspaikka",
          "Ota kamera mukaan — mökillä on mahtavat näköalat ja jouluinen tunnelma",
          "Yhdistä pukkielämys poroajeluun samana päivänä"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Onko joulupukki Levillä ympäri vuoden?", a: "Joulupukkielämyksiä on tarjolla joulusesongin aikana. Ympärivuotiseen pukkitapaamiseen Rovaniemen Pajakylä on vaihtoehto." },
        { q: "Paljonko joulupukkitapaaminen maksaa?", a: "Riippuu elämyksestä ja palveluntarjoajasta. Tarkista ajantasaiset hinnat esim. Elves Villagelta tai Visit Levi -matkailuneuvonnasta." },
        { q: "Sopiiko pienille lapsille?", a: "Ehdottomasti — pukkielämykset on suunniteltu perheille. Myös retki tunturin joulupukin mökille sopii kaiken ikäisille." },
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
      description: "Guide to meeting Santa in Levi: Santa's Cabin on the fell, Elves Village and other Christmas experiences. Comparison with Rovaniemi.",
      canonical: "https://leville.net/guide/santa-claus-in-levi"
    },
    h1: "Santa Claus in Levi — Where to Meet Santa?",
    intro: "Levi offers unique Christmas experiences for the whole family — from the iconic Santa's Cabin on top of the fell to Santa meetings organised by experience companies. This guide tells you what's on offer and how Levi compares to Rovaniemi.",
    sections: {
      cabin: {
        title: "Santa's Cabin on Levi Fell",
        content: "On top of Levi fell sits the iconic Santa's Cabin — Levi's most photographed spot, known from the Finnish film 'Christmas Story' (Joulutarina). The cabin is a stunning landmark and photo spot with breathtaking views, but Santa is not usually present there.",
        access: "You can reach the cabin via the gondola lift and walking down the slope, by hiking from Tuikku restaurant in summer, or by skiing in winter. A trip to the cabin is an absolute must during your visit to Levi!",
        note: "The cabin is a landmark — not a Santa experience as such. Santa meetings are organised by Levi's experience companies."
      },
      experiences: {
        title: "Santa Claus Experiences in Levi",
        content: "Several experience companies in Levi organise Santa Claus meetings. The largest and most popular is Elves Village, which offers a comprehensive Christmas experience with elf activities and more.",
        note: "There are many other Santa experience providers in Levi — check current options from Visit Levi tourist information.",
        letterTitle: "Santa's Welcome Letter",
        letterDesc: "Download Santa's welcome letter to print — a lovely surprise for children upon arrival at your accommodation!",
        letterButton: "Download welcome letter (PDF)"
      },
      other: {
        title: "Other Christmas Experiences in Levi",
        items: [
          "Reindeer safari in a Christmas atmosphere — reindeer farms often have festive programmes",
          "Christmas markets (depending on dates)",
          "Christmas Eve in your own cabin — sauna, festive dinner and peace",
          "You can even book Santa to visit your accommodation! Ask Visit Levi tourist information for details."
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
          "Santa experiences by local companies + iconic cabin as a landmark",
          "Santa + skiing + safaris + own cabin — a more versatile holiday"
        ],
        daytrip: "A day trip from Levi to Rovaniemi is possible (about 2.5 hours each way) if you want both.",
        tip: "Tip: if meeting Santa is the main thing, both work. If you want a versatile Christmas holiday, Levi is the better base."
      },
      familyTips: {
        title: "Tips for Families",
        items: [
          "Book Santa meetings in advance — especially during Christmas and ski holiday season",
          "A trip to Santa's Cabin on the fell is an experience in itself — stunning views and a great photo spot",
          "Bring a camera — the cabin has amazing views and a festive atmosphere",
          "Combine a Santa experience with a reindeer sleigh ride on the same day"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is Santa in Levi year-round?", a: "Santa experiences are available during the Christmas season. For year-round Santa meetings, Rovaniemi's Santa Claus Village is an option." },
        { q: "How much does a Santa meeting cost?", a: "Depends on the experience and provider. Check current prices from e.g. Elves Village or Visit Levi tourist information." },
        { q: "Is it suitable for small children?", a: "Absolutely — Santa experiences are designed for families. The trip to Santa's Cabin on the fell is also suitable for all ages." },
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

  const letterPdf = lang === "en" ? "/docs/tervetulokirje.pdf" : "/docs/tervetulokirje.pdf";

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

            {/* Santa's Cabin — landmark */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.cabin.title}</h2>
              </div>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={santaCabinImage}
                  alt={lang === "fi" ? "Joulupukin mökki Levin tunturilla" : "Santa's Cabin on Levi fell"}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.cabin.content}</p>
              <p className="text-muted-foreground mb-3">{t.sections.cabin.access}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.cabin.note}</p>
                </div>
              </Card>
            </section>

            {/* Santa experiences */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.experiences.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.experiences.content}</p>
              <Card className="glass-card border-border/30 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.experiences.note}</p>
                </div>
              </Card>

              {/* Welcome letter PDF */}
              <Card className="glass-card border-border/30 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TreePine className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">{t.sections.experiences.letterTitle}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t.sections.experiences.letterDesc}</p>
                <Button variant="outline" asChild>
                  <a href={letterPdf} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    {t.sections.experiences.letterButton}
                  </a>
                </Button>
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
