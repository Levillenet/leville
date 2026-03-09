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
import { ArrowRight, Calendar, Clock, Star, Info, Heart, Mountain, Users, Euro, Snowflake } from "lucide-react";
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

interface SkiHolidayLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Hiihtoloma Levillä — Opas, vinkit ja varaaminen | Leville.net",
      description: "Suunnitteletko hiihtolomaa Leville? Käytännön opas: milloin varata, mitä tehdä, miten välttyä ruuhkilta ja parhaat vinkit paikalliselta.",
      canonical: "https://leville.net/opas/hiihtoloma-levilla"
    },
    h1: "Hiihtoloma Levillä — käytännön opas",
    intro: "Hiihtoloma Levillä on suomalaisten suosikkeja. Tämä opas kattaa kaiken: milloin varata, mitä tehdä, miten välttää ruuhkat ja paljonko se maksaa.",
    sections: {
      weeks: {
        title: "Hiihtolomaviikot Suomessa",
        content: "Suomalaiset hiihtolomat ovat kolmella peräkkäisellä viikolla helmi–maaliskuussa (viikot 8, 9 ja 10). Eri alueet lomailevat eri viikolla. Nämä ovat Levin vilkkaimmat ja kalleimmat viikot — mutta myös tunnelmaltaan parhaita.",
        note: "Ulkomaalaisille matkailijoille: hiihtolomaviikot vastaavat eurooppalaista \"half term\" -lomaa."
      },
      booking: {
        title: "Milloin varata?",
        items: [
          { label: "Hiihtolomaviikot", desc: "Varaa majoitus 3–6 kk etukäteen, suosituimmat kohteet täyttyvät jo syksyllä" },
          { label: "Joulu", desc: "Varaa 6–12 kk etukäteen" },
          { label: "Tammi ja maalis (off-peak)", desc: "Valinnanvaraa enemmän, usein edullisempaa" }
        ],
        tip: "Lennot kannattaa varata samaan aikaan kuin majoitus — suorat lennot Helsinki–Kittilä täyttyvät nopeasti sesonkiaikoina."
      },
      whatToDo: {
        title: "Mitä tehdä hiihtolomalla?",
        days: [
          "Päivä 1: Saapuminen, majoitukseen asettuminen, välinevuokraus, kevyt tutustuminen kylään",
          "Päivät 2–4: Laskettelu ja/tai hiihto, välipäivinä aktiviteetti (huskyajelu, porosafari, moottorikelkka)",
          "Päivä 5–6: Rauhallisempi päivä — luontoretkeilyä, kylpylä, ostoksia, afterski",
          "Viimeinen päivä: Lähtöpäivä, viimeiset tunnit rinteessä aamulla"
        ],
        tip: "Vinkki: älä suunnittele liikaa — jätä tilaa spontaanille hetkille ja rentoutumiselle."
      },
      avoidCrowds: {
        title: "Miten välttää ruuhkat",
        items: [
          "Laskettelu aamulla klo 9–10 tai iltapäivällä klo 15 jälkeen — ruuhkahuippu on klo 11–14",
          "Koillisrinteet (Lift 6) ovat tyypillisesti rauhallisemmat kuin eturinteet",
          "Ravintolat: lounas hieman ennen tai jälkeen klo 12 — tai kokkaa itse",
          "Safareille varaus ennakkoon — walk-in ei toimi sesonkiviikkoina"
        ]
      },
      budget: {
        title: "Budjetti hiihtolomalle",
        content: "Hiihtoloman kustannukset koostuvat majoituksesta, hissilipuista, ruoasta ja aktiviteeteista. Tarkat hinnat riippuvat majoitustyypistä ja kauden ajankohdasta.",
        linkText: "Katso tarkemmat hinnat: Hintaopas Leville",
        linkHref: "/opas/hinnat-levilla"
      },
      families: {
        title: "Vinkkejä perheen hiihtolomaan",
        items: [
          "Laskettelukoulu lapsille (Wernerin koulu) — varaa ennakkoon",
          "Leevilandia-alue pienemmille lapsille",
          "Lasten välineet: vuokraa paikan päältä, ei tarvitse raahata matkassa",
          "Ota rauhallisesti — lasten kanssa yksi iso juttu päivässä riittää"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Milloin ovat hiihtolomaviikot?", a: "Viikot 8, 9 ja 10 (helmi–maaliskuussa), alueen mukaan." },
        { q: "Kuinka aikaisin pitää varata?", a: "3–6 kk etukäteen hiihtolomalle, joululle jopa vuosi." },
        { q: "Onko hiihtolomaviikolla ruuhkaa?", a: "Kyllä — Levin suosituin aika. Mutta vinkeillämme vältät pahimmat jonot." },
        { q: "Paljonko hiihtoloma maksaa?", a: "Riippuu majoitustyypistä ja aktiviteeteista. Katso hintaopas." }
      ]
    },
    cta: {
      text: "Varaa hiihtolomamajoitus ajoissa — suosituimmat kohteet täyttyvät nopeasti.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja vinkit", href: "/opas/laskettelu-levi" },
        { title: "Hiihto Levillä", desc: "Yli 230 km latuja", href: "/opas/hiihtoladut-levi" },
        { title: "Hinnat Levillä", desc: "Mitä loma maksaa?", href: "/opas/hinnat-levilla" },
        { title: "Lapsiperheet Levillä", desc: "Vinkit perheen lomaan", href: "/opas/lapsiperheet-levilla" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Hiihtoloma"
  },
  en: {
    meta: {
      title: "Ski Holiday in Levi — Guide, Tips & Booking | Leville.net",
      description: "Planning a ski holiday in Levi? Practical guide: when to book, what to do, how to avoid crowds and best tips from a local host.",
      canonical: "https://leville.net/guide/ski-holiday-in-levi"
    },
    h1: "Ski Holiday in Levi — A Practical Guide",
    intro: "A ski holiday in Levi is a Finnish favourite. This guide covers everything: when to book, what to do, how to avoid crowds and how much it costs.",
    sections: {
      weeks: {
        title: "Finnish Ski Holiday Weeks",
        content: "Finnish ski holidays span three consecutive weeks in February–March (weeks 8, 9 and 10). Different regions have different weeks off. These are Levi's busiest and most expensive weeks — but also the most atmospheric.",
        note: "For international visitors: ski holiday weeks correspond to the European 'half term' break."
      },
      booking: {
        title: "When to Book?",
        items: [
          { label: "Ski holiday weeks", desc: "Book accommodation 3–6 months in advance; popular properties fill up in autumn" },
          { label: "Christmas", desc: "Book 6–12 months in advance" },
          { label: "January & March (off-peak)", desc: "More choice, often cheaper" }
        ],
        tip: "Book flights at the same time as accommodation — direct flights Helsinki–Kittilä fill up quickly during peak season."
      },
      whatToDo: {
        title: "What to Do on a Ski Holiday?",
        days: [
          "Day 1: Arrival, settling in, equipment rental, gentle village exploration",
          "Days 2–4: Skiing and/or cross-country, activity days (husky ride, reindeer safari, snowmobile)",
          "Day 5–6: Quieter day — nature walks, spa, shopping, après-ski",
          "Last day: Departure, final morning hours on the slopes"
        ],
        tip: "Tip: don't over-plan — leave room for spontaneous moments and relaxation."
      },
      avoidCrowds: {
        title: "How to Avoid Crowds",
        items: [
          "Ski in the morning 9–10 am or after 3 pm — peak crowds are 11 am–2 pm",
          "Northeast slopes (Lift 6) are typically quieter than the front slopes",
          "Restaurants: lunch slightly before or after noon — or cook yourself",
          "Book safaris in advance — walk-in doesn't work during peak weeks"
        ]
      },
      budget: {
        title: "Budget for a Ski Holiday",
        content: "Ski holiday costs consist of accommodation, lift passes, food and activities. Exact prices depend on accommodation type and timing within the season.",
        linkText: "See detailed prices: Price Guide for Levi",
        linkHref: "/guide/prices-in-levi"
      },
      families: {
        title: "Tips for Family Ski Holidays",
        items: [
          "Ski school for children (Werner's school) — book in advance",
          "Leevilandia area for younger children",
          "Children's equipment: rent locally, no need to drag it along",
          "Take it easy — with children, one big activity per day is enough"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "When are the ski holiday weeks?", a: "Weeks 8, 9 and 10 (February–March), depending on the region." },
        { q: "How early should I book?", a: "3–6 months ahead for ski holidays, up to a year for Christmas." },
        { q: "Is it crowded during ski holiday week?", a: "Yes — Levi's busiest time. But with our tips you'll avoid the worst queues." },
        { q: "How much does a ski holiday cost?", a: "Depends on accommodation type and activities. See our price guide." }
      ]
    },
    cta: {
      text: "Book your ski holiday accommodation early — the most popular properties fill up quickly.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "43 slopes and tips", href: "/guide/skiing-in-levi" },
        { title: "Cross-Country Skiing", desc: "Over 230 km of trails", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Prices in Levi", desc: "What does it cost?", href: "/guide/prices-in-levi" },
        { title: "Levi With Children", desc: "Tips for family holidays", href: "/guide/levi-with-children" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Ski Holiday"
  }
};

const SkiHolidayLevi = ({ lang = "fi" }: SkiHolidayLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/hiihtoloma-levilla",
    en: "/guide/ski-holiday-in-levi"
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
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

            {/* Ski holiday weeks */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.weeks.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.weeks.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.weeks.note}</p>
                </div>
              </Card>
            </section>

            {/* When to book */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.booking.title}</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {t.sections.booking.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">{t.sections.booking.tip}</p>
            </section>

            {/* What to do */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.whatToDo.title}</h2>
              </div>
              <ul className="space-y-3 mb-4">
                {t.sections.whatToDo.days.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground">{t.sections.whatToDo.tip}</p>
                </div>
              </Card>
            </section>

            {/* Avoid crowds */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.avoidCrowds.title}</h2>
              <ul className="space-y-3">
                {t.sections.avoidCrowds.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Budget */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Euro className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.budget.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.budget.content}</p>
              <Link to={t.sections.budget.linkHref} className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
                {t.sections.budget.linkText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </section>

            {/* Family tips */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.families.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.families.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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

export default SkiHolidayLevi;
