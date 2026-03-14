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
import { ArrowRight, Heart, Info, Star, Calendar, Trophy, Sun, TreePine, Leaf, Music } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import EventTimeline from "@/components/guide/EventTimeline";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EventsInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Tapahtumat Levillä — Kalenteri, kisat ja ohjelma | Leville.net",
      description: "Levin tapahtumakalenteri: World Cup -alppihiihto, Ylläs-Levi hiihto, Ruskamaraton ja muut tapahtumat ympäri vuoden.",
      canonical: "https://leville.net/opas/tapahtumat-levilla"
    },
    h1: "Tapahtumat Levillä — mitä tapahtuu ja milloin?",
    intro: "Levi on ympärivuotinen tapahtumakohde — alppihiihdon maailmancupista ruskamaratoniin.",
    sections: {
      overview: {
        title: "Levin tapahtumavuosi yleiskatsaus",
        content: "Levi on ympärivuotinen tapahtumakohde. Talvella isot hiihtokisat, keväällä urheilutapahtumat, kesällä musiikkifestivaalit ja syksyllä ruskan juhlinta. Alla yleiskatsaus vuoden tärkeimmistä tapahtumista — tarkat päivämäärät vaihtelevat vuosittain.",
        disclaimer: "Disclaimer: Tarkista aina ajantasaiset päivämäärät ja ohjelma osoitteesta levi.fi."
      },
      winter: {
        title: "Talvi (marras–maaliskuu)",
        events: [
          { name: "FIS Alpine World Cup Slalom (marraskuu)", desc: "Levin kauden avauskisa — kansainvälinen alppihiihtotapahtuma joka tuo maailman huiput Leville. Yleisölle ilmainen katselu rinteeltä." },
          { name: "Joulusesonki (joulu–tammikuu)", desc: "Joulupukki, joulumarkkinat, erikoisohjelma ravintoloissa ja safariyrityksissä." },
          { name: "Hiihtolomaviikot (helmi–maaliskuu)", desc: "Erityisohjelmaa perheille, laskettelukilpailuja, tapahtumia kylässä." }
        ]
      },
      spring: {
        title: "Kevät (maalis–toukokuu)",
        events: [
          { name: "Ylläs-Levi hiihto (huhtikuu)", desc: "Perinteinen pitkän matkan hiihtotapahtuma (55 km ja 70 km). Myös harrastajille avoin. Maali Levin keskustassa." },
          { name: "Kevätlaskettelutapahtumat", desc: "Rinteillä teemapäiviä, musiikkia ja kevättunnelmaa." },
          { name: "Kauden päätös (huhti–toukokuu)", desc: "Viimeiset laskettelu- ja hiihtopäivät rennossa tunnelmassa." }
        ]
      },
      summer: {
        title: "Kesä (kesä–elokuu)",
        events: [
          { name: "Musiikkitapahtumat ja festivaalit", desc: "Vaihtelee vuosittain — tarkista ohjelma etukäteen." },
          { name: "Keskiyön aurinko -golf", desc: "Erikoiskierroksia Euroopan pohjoisimmalla golfkentällä." },
          { name: "Vaellustapahtumia ja luontoretkiä", desc: "Opastettuja ryhmävaelluksia kansallispuistoon." }
        ]
      },
      autumn: {
        title: "Syksy (syys–lokakuu)",
        events: [
          { name: "Ruskamaraton (syyskuu)", desc: "Juoksutapahtuma ruskan väreissä — maraton, puolimaraton ja lyhyempiä matkoja. Osallistua voi omalla tasolla." },
          { name: "Ruska-aika", desc: "Ei yksittäinen tapahtuma mutta luonnon oma spektaakkeli — tunturimaisema muuttuu kullankeltaiseksi ja tulipunaiseksi syyskuussa." }
        ]
      },
      stayUpdated: {
        title: "Miten pysyä ajan tasalla?",
        content: "Levin virallinen tapahtumakalenteri: levi.fi/tapahtumat. Seuraa myös Levin sosiaalista mediaa (Instagram, Facebook) ajantasaisesta ohjelmasta. Sesonkiaikoina Levin matkailuinfopiste kylän keskustassa on hyvä tietolähde."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Mikä on Levin isoin tapahtuma?", a: "FIS Alpine World Cup marraskuussa on kansainvälisesti näkyvin. Kotimaisesti hiihtolomaviikot ovat vilkkaimmat." },
        { q: "Onko tapahtumiin pääsy ilmaista?", a: "World Cup -katselu rinteeltä on ilmainen. Ruskamaraton on maksullinen osallistujille. Monet kesätapahtumat ovat ilmaisia." },
        { q: "Miten löydän ajantasaisen ohjelman?", a: "levi.fi/tapahtumat on virallinen lähde. Tarkista aina sieltä." }
      ]
    },
    cta: {
      text: "Suunnittele loma tapahtuman ympärille — varaa majoitus ajoissa.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "Rinteet ja hissit", href: "/opas/laskettelu-levi" },
        { title: "Vuodenajat", desc: "Levi ympäri vuoden", href: "/opas/vuodenajat-levi" },
        { title: "Kesä Levillä", desc: "Kesäaktiviteetit", href: "/opas/kesa-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Tapahtumat"
  },
  en: {
    meta: {
      title: "Events in Levi — Calendar, Competitions & Activities | Leville.net",
      description: "Levi event calendar: FIS Alpine World Cup, Ylläs-Levi ski race, Ruskamarathon and more events throughout the year.",
      canonical: "https://leville.net/guide/events-in-levi"
    },
    h1: "Events in Levi — What's Happening and When?",
    intro: "Levi is a year-round event destination — from FIS Alpine World Cup to the Ruskamarathon.",
    sections: {
      overview: {
        title: "Levi's Event Year Overview",
        content: "Levi is a year-round event destination. Winter brings major ski competitions, spring has sports events, summer features music festivals and autumn celebrates the ruska colours. Below is an overview of the year's main events — exact dates vary annually.",
        disclaimer: "Disclaimer: Always check current dates and programme at levi.fi."
      },
      winter: {
        title: "Winter (Nov–Mar)",
        events: [
          { name: "FIS Alpine World Cup Slalom (November)", desc: "Levi's season-opening race — an international alpine skiing event bringing the world's best to Levi. Free spectating from the slope." },
          { name: "Christmas season (Dec–Jan)", desc: "Santa Claus, Christmas markets, special programmes at restaurants and safari companies." },
          { name: "Finnish ski holiday weeks (Feb–Mar)", desc: "Special family programmes, skiing competitions, village events." }
        ]
      },
      spring: {
        title: "Spring (Mar–May)",
        events: [
          { name: "Ylläs-Levi Ski Race (April)", desc: "Traditional long-distance skiing event (55 km and 70 km). Open to amateurs too. Finish line in Levi centre." },
          { name: "Spring skiing events", desc: "Theme days on the slopes, music and spring atmosphere." },
          { name: "Season closing (Apr–May)", desc: "Last skiing and snowboarding days in a relaxed atmosphere." }
        ]
      },
      summer: {
        title: "Summer (Jun–Aug)",
        events: [
          { name: "Music events and festivals", desc: "Varies yearly — check the programme in advance." },
          { name: "Midnight Sun Golf", desc: "Special rounds at Europe's northernmost golf course." },
          { name: "Hiking events and nature trips", desc: "Guided group hikes to the national park." }
        ]
      },
      autumn: {
        title: "Autumn (Sep–Oct)",
        events: [
          { name: "Ruskamarathon (September)", desc: "Running event in autumn colours — marathon, half marathon and shorter distances. Participate at your own level." },
          { name: "Ruska season", desc: "Not a single event but nature's own spectacle — the fell landscape turns golden and fiery red in September." }
        ]
      },
      stayUpdated: {
        title: "How to Stay Updated?",
        content: "Levi's official event calendar: levi.fi/tapahtumat. Also follow Levi's social media (Instagram, Facebook) for current programmes. During peak seasons, the Levi Tourist Information point in the village centre is a good source."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What is Levi's biggest event?", a: "The FIS Alpine World Cup in November is the most internationally visible. Domestically, ski holiday weeks are the busiest." },
        { q: "Is admission to events free?", a: "World Cup spectating from the slope is free. Ruskamarathon has an entry fee for participants. Many summer events are free." },
        { q: "How do I find the current programme?", a: "levi.fi/tapahtumat is the official source. Always check there." }
      ]
    },
    cta: {
      text: "Plan your holiday around an event — book accommodation early.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "Slopes and lifts", href: "/guide/skiing-in-levi" },
        { title: "Seasons", desc: "Levi year-round", href: "/guide/seasons" },
        { title: "Summer in Levi", desc: "Summer activities", href: "/guide/summer-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Events"
  }
};

const seasonIcons: Record<string, typeof Calendar> = {
  winter: Trophy,
  spring: Sun,
  summer: Music,
  autumn: Leaf,
};

const EventsInLevi = ({ lang = "fi" }: EventsInLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/tapahtumat-levilla",
    en: "/guide/events-in-levi"
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

            {/* Interactive Event Calendar */}
            <EventTimeline lang={lang} />

            {/* Overview */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.overview.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.overview.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.overview.disclaimer}</p>
                </div>
              </Card>
            </section>

            {/* Seasonal sections */}
            {(["winter", "spring", "summer", "autumn"] as const).map((season) => {
              const section = t.sections[season];
              const Icon = seasonIcons[season] || Calendar;
              return (
                <section key={season} className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.events.map((event, idx) => (
                      <Card key={idx} className="glass-card border-border/30 p-4">
                        <h3 className="font-semibold text-foreground mb-1">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Stay updated */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.stayUpdated.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.stayUpdated.content}</p>
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
        
      </div>
    </>
  );
};

export default EventsInLevi;
