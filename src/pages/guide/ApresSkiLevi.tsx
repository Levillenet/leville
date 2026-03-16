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
import { ArrowRight, Music, MapPin, Info, Wine, Moon, Star, Utensils, PartyPopper } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import apresSkiTuikku from "@/assets/seasons/apres-ski-tuikku.jpg";
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
    intro: "Levin afterski on legendaarinen — ja yksi syy miksi tunturikylä on Suomen suosituin hiihtokeskus myös illan pimetessä. Levin afterski jakautuu kahteen osaan: iltapäivän ulkoilmajuhlintaan rinteillä hiihtovaatteissa ja myöhemmin illalla ravintoloihin ja yökerhoihin.",
    sections: {
      culture: {
        title: "Afterski-kulttuuri Levillä",
        content: "Afterski alkaa iltapäivällä rinneravintoloissa ja terasseilla — hiihtovaatteet päällä, lasi kädessä. Tunnelma on rento ja kansainvälinen. Iltapäivän afterski tapahtuu nimenomaan ulkona tai rinneravintoloiden terasseilla, suoraan rinteiden juurella. Siitä ilta jatkuu usein saunomisen ja illallisen kautta yökerhoihin ja baareille.",
        imageAlt: "Afterski Tuikussa Levin rinteillä",
        imageCaption: "Tuikku — suosittu afterski-paikka suoraan Levin rinteiden vieressä"
      },
      afterski: {
        title: "Afterski-paikat — ulkona hiihtovaatteissa",
        description: "Varsinainen afterski on ulkona tapahtuvaa ilonpitoa hiihtovaatteissa. Näissä paikoissa tunnelma alkaa heti rinteiden sulkeuduttua:",
        items: [
          { name: "Vinkkari", desc: "Legendaarinen afterski-paikka eturinteen juurella — tanssia, DJ:t ja uskomaton tunnelma. Levin suosituin ulko-afterski." },
          { name: "Tuikku", desc: "Päivä-afterski tunturissa, suoraan rinteiden vieressä — rento meininki ja kylmät juomat auringossa." },
          { name: "Hullu Poro Areena", desc: "Levin suurin afterski-paikka — live-bändejä ja ohjelmaa, aukeaa iltapäivällä/illalla." }
        ]
      },
      restaurants: {
        title: "Ravintolat — illallinen ja tunnelma",
        description: "Afterski-iltapäivän jälkeen on aika saunoa ja nauttia hyvä illallinen ennen iltaa:",
        items: [
          { name: "Colorado", desc: "Ruokaravintola hyvässä tunnelmassa" },
          { name: "King Crab House", desc: "Hienoa merenelävien ruokaa" },
          { name: "Ämmilä", desc: "Lappalaista tunnelmaa ja perinteistä ruokaa" }
        ],
        disclaimer: "Aukioloajat ja ohjelma vaihtelevat sesongin mukaan. Tarkista aina ajantasaiset tiedot paikan omilta sivuilta."
      },
      nightlife: {
        title: "Yökerhot — illan jatko",
        description: "Illallisen jälkeen ilta jatkuu Levin yökerhoissa ja baareilla:",
        items: [
          { name: "Ihku", desc: "Levin tunnetuin yökerho — bailuja myöhään yöhön" },
          { name: "Hullu Poro Areena", desc: "Bändejä, karaokea ja yökerho saman katon alla" }
        ]
      },
      tips: {
        title: "Käytännön vinkit",
        items: [
          "Suomessa alkoholia yli 5,5 % vain Alkosta",
          "Ikäraja 18 (yökerhoissa usein 20 tai 22)",
          "Korttimaksu kaikkialla — käteistä harvoin tarvitsee",
          "Afterski hiihtovaatteissa on normaalia — ihmiset tulevat suoraan rinteiltä",
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
        { q: "Mikä on suosituin afterski-paikka?", a: "Vinkkari eturinteen juurella on Levin legendaarisin afterski-paikka. DJ:t, tanssia ja uskomaton tunnelma ulkona hiihtovaatteissa. Hullu Poro Areena on suurin paikka, jossa live-bändejä." },
        { q: "Onko Levillä yökerhoa?", a: "Kyllä, Ihku on Levin tunnetuin yökerho. Sesonkiaikoina auki myöhään. Ikäraja yleensä 20 tai 22." },
        { q: "Voiko mennä afterskille hiihtovaatteissa?", a: "Kyllä! Afterski on nimenomaan hiihtovaatteissa tapahtuvaa ulkona juhlintaa — ihmiset tulevat suoraan rinteiltä Vinkkarille ja Tuikkuun." }
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
    intro: "Levi's après-ski scene is legendary — and one of the reasons why this resort village is Finland's most popular ski destination even after the sun goes down. Après-ski in Levi has two parts: the outdoor afternoon celebration at the slopes in ski clothes, and later in the evening the restaurants and nightclubs.",
    sections: {
      culture: {
        title: "Après-Ski Culture in Levi",
        content: "Après-ski starts in the afternoon at slope-side restaurants and terraces — in ski clothes, drink in hand. The atmosphere is relaxed and international. The afternoon après-ski is very much an outdoor affair, right at the base of the slopes. From there, the evening often continues with a sauna, dinner and then nightclubs and bars.",
        imageAlt: "Après-ski at Tuikku on Levi slopes",
        imageCaption: "Tuikku — a popular après-ski spot right next to the Levi slopes"
      },
      afterski: {
        title: "Après-Ski Spots — Outdoors in Ski Clothes",
        description: "Real après-ski is outdoor celebration in ski clothes. These are the places where the party starts right after the slopes close:",
        items: [
          { name: "Vinkkari", desc: "The legendary après-ski spot at the base of the front slope — dancing, DJs and incredible atmosphere. Levi's most popular outdoor après-ski." },
          { name: "Tuikku", desc: "Daytime après-ski on the fell, right next to the slopes — relaxed vibes and cold drinks in the sun." },
          { name: "Hullu Poro Arena", desc: "Levi's biggest après-ski venue — live bands and entertainment, opens in the afternoon/evening." }
        ]
      },
      restaurants: {
        title: "Restaurants — Dinner & Atmosphere",
        description: "After the afternoon après-ski, it's time for a sauna and a great dinner before the evening:",
        items: [
          { name: "Colorado", desc: "Restaurant with great atmosphere" },
          { name: "King Crab House", desc: "Fine seafood dining" },
          { name: "Ämmilä", desc: "Lappish atmosphere and traditional cuisine" }
        ],
        disclaimer: "Opening hours and programmes vary by season. Always check the latest info on each venue's own pages."
      },
      nightlife: {
        title: "Nightclubs — The Evening Continues",
        description: "After dinner, the night continues at Levi's nightclubs and bars:",
        items: [
          { name: "Ihku", desc: "Levi's most famous nightclub — parties until late" },
          { name: "Hullu Poro Arena", desc: "Live bands, karaoke and nightclub all under one roof" }
        ]
      },
      tips: {
        title: "Practical Tips",
        items: [
          "In Finland, alcohol over 5.5% is only sold at Alko stores",
          "Minimum age 18 (nightclubs often 20 or 22)",
          "Card payments accepted everywhere — cash rarely needed",
          "Coming in ski clothes is completely normal — people come straight from the slopes",
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
        { q: "What's the most popular après-ski spot?", a: "Vinkkari at the base of the front slope is Levi's most legendary après-ski spot. DJs, dancing and incredible atmosphere outdoors in ski clothes. Hullu Poro Arena is the biggest venue with live bands." },
        { q: "Is there a nightclub in Levi?", a: "Yes, Ihku is Levi's best-known nightclub. Open late during peak season. Age limit usually 20 or 22." },
        { q: "Can you go out in ski clothes?", a: "Yes! Après-ski is specifically an outdoor celebration in ski clothes — people come straight from the slopes to Vinkkari and Tuikku." }
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
              <p className="text-muted-foreground mb-4">{t.sections.culture.content}</p>
              <div className="rounded-xl overflow-hidden">
                <OptimizedImage src={apresSkiTuikku} alt={t.sections.culture.imageAlt} className="w-full h-64 sm:h-80 md:h-96 object-cover" />
                <p className="text-xs text-muted-foreground mt-2 text-center italic">
                  {t.sections.culture.imageCaption}
                </p>
              </div>
            </section>

            {/* Après-ski spots */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t.sections.afterski.title}</h2>
              <p className="text-muted-foreground mb-6">{t.sections.afterski.description}</p>
              <div className="space-y-3">
                {t.sections.afterski.items.map((place, idx) => (
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
            </section>

            {/* Restaurants */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t.sections.restaurants.title}</h2>
              <p className="text-muted-foreground mb-6">{t.sections.restaurants.description}</p>
              <div className="space-y-3">
                {t.sections.restaurants.items.map((place, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Utensils className="w-4 h-4 text-primary" />
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
                  <p className="text-sm text-muted-foreground italic">{t.sections.restaurants.disclaimer}</p>
                </div>
              </Card>
            </section>

            {/* Nightlife */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t.sections.nightlife.title}</h2>
              <p className="text-muted-foreground mb-6">{t.sections.nightlife.description}</p>
              <div className="space-y-3">
                {t.sections.nightlife.items.map((place, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <PartyPopper className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{place.name}</h3>
                        <p className="text-sm text-muted-foreground">{place.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
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

            <GuideDisclaimer lang={lang} />

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
          </div>
        </main>

        <PageCTA lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default ApresSkiLevi;