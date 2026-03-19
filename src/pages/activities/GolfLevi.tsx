import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import OptimizedImage from "@/components/OptimizedImage";
import { getWebsiteSchema, getArticleSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Info, Star, Sun, MapPin, Phone, Mail } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

import golfAerialFells from "@/assets/activities/golf-aerial-fells.jpg";
import golfPlayerSun from "@/assets/activities/golf-player-sun.jpg";
import golfAerialFairways from "@/assets/activities/golf-aerial-fairways.jpg";
import golfGreenClose from "@/assets/activities/golf-green-close.jpg";

interface Props { lang?: Language; }

const translations = {
  fi: {
    meta: {
      title: "Golf Levillä — Euroopan pohjoisin kenttä ja keskiyön aurinko | Leville.net",
      description: "Golfopas Leville: Levi Golf & Country Club, keskiyön aurinko -golf, kenttätiedot ja edullisia golflippuja Leville.netin kautta.",
      canonical: "https://leville.net/aktiviteetit/golf-levi"
    },
    h1: "Golf Levillä — pelaa keskiyön auringon alla",
    intro: "Yksi Euroopan pohjoisimpia 18-reikäisiä kenttiä tunturimaisemissa — ja kesällä aurinko ei laske.",
    images: {
      hero: { alt: "Ilmakuva Levin golfkentästä ja tuntureista", caption: "Levin golfkenttä tunturimaisemissa" },
      player: { alt: "Golfari pelaamassa auringonpaisteessa Levillä", caption: "Golfia keskiyön auringossa" },
      fairways: { alt: "Ilmakuva golfväylistä ja järvestä", caption: "Väylät kietoutuvat Lapin luonnon keskelle" },
      green: { alt: "Golfgreeni lähikuvassa", caption: "Hyvin hoidetut greenit tunturin juurella" },
    },
    sections: {
      club: {
        title: "Levi Golf & Country Club",
        content: "Levin golfkenttä on yksi Euroopan pohjoisimpia 18-reikäisiä kenttiä. Se sijaitsee tunturin juurella kauniin luonnon keskellä — väylien reunoilla koivikkoa ja taustalla tunturit. Kenttä on avoinna tyypillisesti kesäkuusta syyskuuhun."
      },
      midnight: {
        title: "Keskiyön aurinko -golf",
        content: "Levin erikoisuus on mahdollisuus pelata golfia keskellä yötä. Kesä–heinäkuussa aurinko ei laske lainkaan — voit ottaa tee-ajan klo 23 tai klo 2 yöllä. Illat ja yöt ovat usein tyyniä ja rauhallisia — parhaat olosuhteet."
      },
      courseInfo: {
        title: "Kenttätiedot",
        items: [
          "18 reikää, par 70",
          "Sopii kaikentasoisille pelaajille",
          "Driving range ja harjoitusalue",
          "Klubirakennus, ravintola ja pro shop"
        ],
        disclaimer: "Disclaimer: Aukioloajat ja hinnat voivat muuttua — tarkista aina kentän omat sivut."
      },
      discount: {
        title: "Edullisia golflippuja meiltä",
        content: "Leville.netin kautta voit hankkia edullisesti golflippuja Levin kentälle. Ota yhteyttä niin kerromme tarkemmin:",
        email: "info@leville.net",
        phone: "+358 44 131 313"
      },
      other: {
        title: "Muuta huomioitavaa",
        items: [
          "Varusteet: omia mailoja ei tarvitse tuoda — vuokraus onnistuu kentältä",
          "Varaaminen: tee-ajat varattavissa verkosta tai puhelimitse",
          "Sijainti: kenttä noin 3–4 km keskustasta (Golf-alue). Talvella sama alue on Koillisrinteiden laskettelualue."
        ]
      },
      holiday: {
        title: "Golf osana Levi-lomaa",
        content: "Golf on erinomainen osa kesälomaa Levillä. Päivällä golfia, illalla patikointia tunturille, yöllä grillaus terassilla keskiyön auringossa. Yhdistä golfin kanssa kalastusta, vaellusta tai maastopyöräilyä."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Milloin golfkausi on?", a: "Tyypillisesti kesäkuusta syyskuuhun." },
        { q: "Voiko pelata keskellä yötä?", a: "Kyllä, kesä–heinäkuussa aurinko ei laske." },
        { q: "Tarvitseeko omat mailat?", a: "Ei, vuokraus onnistuu kentältä." }
      ]
    },
    cta: { text: "Kesäloma Levillä — golf, vaellus ja keskiyön aurinko. Kysy samalla edullisia golflippuja!", link: "/majoitukset", button: "Katso majoitukset" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Kesä Levillä", desc: "Keskiyön aurinko ja luonto", href: "/opas/kesa-levi" },
        { title: "Vaellus ja pyöräily", desc: "Tunturireitit ja polut", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Golf Levillä"
  },
  en: {
    meta: {
      title: "Golf in Levi — Europe's Northernmost Course & Midnight Sun | Leville.net",
      description: "Golf guide for Levi: Levi Golf & Country Club, midnight sun golf, course info and discounted green fees through Leville.net.",
      canonical: "https://leville.net/activities/golf-in-levi"
    },
    h1: "Golf in Levi — Play Under the Midnight Sun",
    intro: "One of Europe's northernmost 18-hole courses amid fell landscapes — and in summer, the sun never sets.",
    images: {
      hero: { alt: "Aerial view of Levi golf course and fells", caption: "Levi golf course amid fell scenery" },
      player: { alt: "Golfer playing in sunshine in Levi", caption: "Golf under the midnight sun" },
      fairways: { alt: "Aerial view of fairways and lake", caption: "Fairways winding through Lapland nature" },
      green: { alt: "Golf green close-up", caption: "Well-maintained greens at the foot of the fells" },
    },
    sections: {
      club: {
        title: "Levi Golf & Country Club",
        content: "Levi's golf course is one of Europe's northernmost 18-hole courses. It sits at the foot of the fells surrounded by beautiful nature — birch groves line the fairways with fells in the background. The course is typically open from June to September."
      },
      midnight: {
        title: "Midnight Sun Golf",
        content: "Levi's speciality is the chance to play golf in the middle of the night. In June–July the sun doesn't set at all — you can book a tee time at 11 pm or 2 am. Evenings and nights are often calm and peaceful — the best conditions."
      },
      courseInfo: {
        title: "Course Information",
        items: [
          "18 holes, par 70",
          "Suitable for all skill levels",
          "Driving range and practice area",
          "Clubhouse, restaurant and pro shop"
        ],
        disclaimer: "Disclaimer: Opening hours and prices may change — always check the course's own website."
      },
      discount: {
        title: "Discounted Green Fees Through Us",
        content: "Get discounted green fees for Levi's golf course through Leville.net. Contact us for details:",
        email: "info@leville.net",
        phone: "+358 44 131 313"
      },
      other: {
        title: "Good to Know",
        items: [
          "Equipment: no need to bring your own clubs — rental available at the course",
          "Booking: tee times can be booked online or by phone",
          "Location: the course is about 3–4 km from the centre (Golf area). In winter the same area is the Northeast Slopes ski area."
        ]
      },
      holiday: {
        title: "Golf as Part of Your Levi Holiday",
        content: "Golf is an excellent part of a summer holiday in Levi. Golf during the day, hiking to the fell in the evening, barbecue on the terrace under the midnight sun at night. Combine golf with fishing, hiking or mountain biking."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "When is the golf season?", a: "Typically from June to September." },
        { q: "Can you play in the middle of the night?", a: "Yes, in June–July the sun doesn't set." },
        { q: "Do I need my own clubs?", a: "No, rental is available at the course." }
      ]
    },
    cta: { text: "Summer holiday in Levi — golf, hiking and midnight sun. Ask about discounted green fees!", link: "/en/accommodations", button: "View accommodations" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Summer in Levi", desc: "Midnight sun and nature", href: "/guide/summer-in-levi" },
        { title: "Hiking & Biking", desc: "Fell trails and routes", href: "/activities/hiking-and-biking-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Golf in Levi"
  }
};

const GolfImage = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <figure className="my-8">
    <div className="rounded-xl overflow-hidden aspect-video">
      <OptimizedImage src={src} alt={alt} className="w-full h-full" />
    </div>
    <figcaption className="text-sm text-muted-foreground italic text-center mt-2">{caption}</figcaption>
  </figure>
);

const GolfLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/aktiviteetit/golf-levi", en: "/activities/golf-in-levi" };
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Activities" : "Aktiviteetit", href: lang === "en" ? "/en/levi" : "/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.h1, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getFAQSchema(t.faq.items.map(i => ({ question: i.q, answer: i.a })))} />
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

            {/* Hero image */}
            <GolfImage src={golfAerialFells} alt={t.images.hero.alt} caption={t.images.hero.caption} />

            {/* Club */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.club.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.club.content}</p>
            </section>

            {/* Player image */}
            <GolfImage src={golfPlayerSun} alt={t.images.player.alt} caption={t.images.player.caption} />

            {/* Midnight sun */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.midnight.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.midnight.content}</p>
            </section>

            {/* Fairways image */}
            <GolfImage src={golfAerialFairways} alt={t.images.fairways.alt} caption={t.images.fairways.caption} />

            {/* Course info */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.courseInfo.title}</h2>
              </div>
              <ul className="space-y-3 mb-4">
                {t.sections.courseInfo.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{t.sections.courseInfo.disclaimer}</p>
            </section>

            {/* Green image */}
            <GolfImage src={golfGreenClose} alt={t.images.green.alt} caption={t.images.green.caption} />

            {/* Discount CTA */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.discount.title}</h2>
              <Card className="border-primary/30 bg-primary/5 p-6">
                <p className="text-muted-foreground mb-4">{t.sections.discount.content}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`mailto:${t.sections.discount.email}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="w-4 h-4" /> {t.sections.discount.email}
                  </a>
                  <a href={`tel:${t.sections.discount.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="w-4 h-4" /> {t.sections.discount.phone}
                  </a>
                </div>
              </Card>
            </section>

            {/* Other */}
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

            {/* Holiday */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.holiday.title}</h2>
              <p className="text-muted-foreground">{t.sections.holiday.content}</p>
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

            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                <Button asChild>
                  <Link to={t.cta.link}>{t.cta.button}<ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </Card>
            </section>
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

export default GolfLevi;
