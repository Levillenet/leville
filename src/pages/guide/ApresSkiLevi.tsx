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
import { ArrowRight, Music, MapPin, Info, Wine, Moon, Star } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ApresSkiLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Afterski ja yöelämä Levillä — Baarit, tunnelma ja vinkit | Leville.net",
      description: "Levin afterski ja yöelämä: suositut baarit, tunnelma ja paikallisen vinkit.",
      canonical: "https://leville.net/opas/afterski-ja-yoelama-levilla"
    },
    h1: "Afterski ja yöelämä Levillä",
    intro: "Levin afterski on legendaarinen — ja yksi syy miksi tunturikylä on Suomen suosituin hiihtokeskus myös illan pimetessä. Tässä oppaassa kerromme mistä löydät parhaan tunnelman, mitä odottaa ja mitä paikallinen tietää.",
    sections: {
      culture: {
        title: "Afterski-kulttuuri Levillä",
        content: "Afterski alkaa noin klo 15–16 rinteiden sulkeuduttua. Terasseilla nautitaan olut tai glögi, live-musiikki on yleistä erityisesti viikonloppuisin ja sesonkiaikoina. Tunnelma on rento ja kansainvälinen — hiihtovaatteet ovat täysin hyväksyttävä asuvalinta."
      },
      places: {
        title: "Suosittuja paikkoja",
        items: [
          { name: "Hullu Poro", desc: "Tunnetuin — afterski, ravintola ja yökerho saman katon alla" },
          { name: "Colorado Bar", desc: "Live-musiikki, rennompi tunnelma" },
          { name: "Ihku", desc: "Cocktailbaari, trendikkäämpi ilmapiiri" },
          { name: "Tuikkubaari ja rinneravintolat", desc: "Afterski suoraan rinteellä" },
          { name: "Ravintolabaarit", desc: "King Crab House, Ämmilä ym. — hyvää ruokaa ja juomaa" }
        ],
        disclaimer: "Aukioloajat ja ohjelma vaihtelevat sesongin mukaan. Tarkista aina ajantasaiset tiedot paikan omilta sivuilta."
      },
      tips: {
        title: "Käytännön vinkit",
        items: [
          "Suomessa alkoholia yli 5,5 % vain Alkosta",
          "Ikäraja 18 (yökerhoissa usein 20 tai 22)",
          "Korttimaksu kaikkialla — käteistä harvoin tarvitsee",
          "Afterski hiihtovaatteissa ok — ihmiset tulevat suoraan rinteiltä",
          "Taksi sesonkina: tilaa ajoissa (puh. 0200 99800)"
        ]
      },
      quiet: {
        title: "Hiljainen ilta — vaihtoehtoja",
        items: [
          "Oma sauna majoituksessa + viinilasi terassilla",
          "Ravintolaillallinen tunnelmallisessa paikassa",
          "Revontulien katselu pihalta tai tunturilla",
          "Levin Spa iltakäyttöön"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Mikä on suosituin afterski-paikka?", a: "Hullu Poro on ylivoimaisesti tunnetuin afterski-paikka Levillä. Live-musiikkia, karaokea ja yökerho samassa paketissa." },
        { q: "Onko Levillä yökerhoa?", a: "Kyllä, Hullu Poron yhteydessä. Sesonkiaikoina auki myöhään. Ikäraja yleensä 20 tai 22." },
        { q: "Voiko mennä afterskille hiihtovaatteissa?", a: "Kyllä, afterski on rento ja ihmiset tulevat suoraan rinteiltä. Hiihtovaatteet ovat normaalia." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Ravintolat ja palvelut", desc: "Kattava opas Levin palveluihin", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Hinnat Levillä", desc: "Mitä Lapin loma maksaa?", href: "/opas/hinnat-levilla" },
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja vinkit", href: "/opas/laskettelu-levi" }
      ]
    },
    breadcrumbLabel: "Afterski ja yöelämä"
  },
  en: {
    meta: {
      title: "Après-Ski & Nightlife in Levi — Bars, Atmosphere & Tips | Leville.net",
      description: "Levi's après-ski and nightlife: popular bars, atmosphere and local tips.",
      canonical: "https://leville.net/guide/apres-ski-and-nightlife-in-levi"
    },
    h1: "Après-Ski and Nightlife in Levi",
    intro: "Levi's après-ski scene is legendary — and one of the reasons why this resort village is Finland's most popular ski destination even after the sun goes down. Here's what to expect, where to go and what the locals know.",
    sections: {
      culture: {
        title: "Après-Ski Culture in Levi",
        content: "Après-ski starts around 3–4 PM as the slopes close. Terraces fill up with beer or hot glögi, live music is common especially on weekends and during peak season. The atmosphere is relaxed and international — ski clothes are a perfectly acceptable outfit."
      },
      places: {
        title: "Popular Spots",
        items: [
          { name: "Hullu Poro", desc: "The most famous — après-ski, restaurant and nightclub under one roof" },
          { name: "Colorado Bar", desc: "Live music, more laid-back vibe" },
          { name: "Ihku", desc: "Cocktail bar, trendier atmosphere" },
          { name: "Tuikkubaari & slope restaurants", desc: "Après-ski right on the slopes" },
          { name: "Restaurant bars", desc: "King Crab House, Ämmilä etc. — great food and drinks" }
        ],
        disclaimer: "Opening hours and programmes vary by season. Always check the latest info on each venue's own pages."
      },
      tips: {
        title: "Practical Tips",
        items: [
          "In Finland, alcohol over 5.5% is only sold at Alko stores",
          "Minimum age 18 (nightclubs often 20 or 22)",
          "Card payments accepted everywhere — cash rarely needed",
          "Coming in ski clothes is totally fine — people come straight from the slopes",
          "Taxis in peak season: book early (tel. 0200 99800)"
        ]
      },
      quiet: {
        title: "Quiet Evening — Alternatives",
        items: [
          "Private sauna in your accommodation + wine on the terrace",
          "Restaurant dinner at an atmospheric venue",
          "Northern lights watching from the yard or hilltop",
          "Levi Spa for evening relaxation"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What's the most popular après-ski spot?", a: "Hullu Poro is by far the most famous après-ski venue in Levi. Live music, karaoke and nightclub all in one." },
        { q: "Is there a nightclub in Levi?", a: "Yes, connected to Hullu Poro. Open late during peak season. Age limit usually 20 or 22." },
        { q: "Can you go out in ski clothes?", a: "Yes, après-ski is casual and people come straight from the slopes. Ski clothes are completely normal." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Restaurants & Services", desc: "Complete guide to Levi's services", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Prices in Levi", desc: "What does a Lapland holiday cost?", href: "/guide/prices-in-levi" },
        { title: "Skiing in Levi", desc: "43 slopes and tips", href: "/guide/skiing-in-levi" }
      ]
    },
    breadcrumbLabel: "Après-Ski & Nightlife"
  }
};

const ApresSkiLevi = ({ lang = "fi" }: ApresSkiLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/afterski-ja-yoelama-levilla",
    en: "/guide/apres-ski-and-nightlife-in-levi"
  };

  const homeLabels: Record<string, string> = { fi: "Etusivu", en: "Home" };
  const homeLinks: Record<string, string> = { fi: "/", en: "/en" };
  const guideLabels: Record<string, string> = { fi: "Opas", en: "Guide" };
  const guideLinks: Record<string, string> = { fi: "/levi", en: "/en/levi" };

  const breadcrumbItems = [
    { label: homeLabels[lang] || "Etusivu", href: homeLinks[lang] || "/" },
    { label: guideLabels[lang] || "Opas", href: guideLinks[lang] || "/levi" },
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
        <meta property="og:image:alt" content={lang === "fi" ? "Afterski Levillä" : "Après-ski in Levi"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Afterski Levillä" : "Après-ski in Levi"} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.h1}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Culture */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.culture.title}</h2>
              <p className="text-muted-foreground">{t.sections.culture.content}</p>
            </section>

            {/* Popular places */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.places.title}</h2>
              <div className="space-y-3">
                {t.sections.places.items.map((place, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Music className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{place.name}</h3>
                        <p className="text-sm text-muted-foreground">{place.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Card className="glass-card border-border/30 p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.places.disclaimer}</p>
                </div>
              </Card>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.tips.title}</h2>
              <ul className="space-y-3">
                {t.sections.tips.items.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quiet evening */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.quiet.title}</h2>
              <ul className="space-y-3">
                {t.sections.quiet.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Moon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
          </div>
        </main>

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default ApresSkiLevi;
