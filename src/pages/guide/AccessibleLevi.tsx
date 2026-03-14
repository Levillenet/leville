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
import { ArrowRight, Heart, Info, Star, Accessibility, Bus, Mountain, Eye, Phone } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

interface Props { lang?: Language; }

const translations = {
  fi: {
    meta: {
      title: "Esteetön Levi — Opas liikuntarajoitteisille matkailijoille | Leville.net",
      description: "Levin esteettömyysopas: liikkuminen pyörätuolilla, esteettömät majoitukset, rinteet ja aktiviteetit.",
      canonical: "https://leville.net/opas/esteetton-levi"
    },
    h1: "Esteetön Levi — opas liikuntarajoitteisille matkailijoille",
    intro: "Levi kehittää esteettömyyttään jatkuvasti. Tässä oppaassa kerromme mitä on tarjolla.",
    sections: {
      general: {
        title: "Levin esteettömyydestä yleisesti",
        content: "Levi on kehittänyt esteettömyyttään merkittävästi. Kaikkialla on vielä parannettavaa — Lappi on luonteeltaan vaativaa maastoa — mutta monet palvelut ja aktiviteetit ovat saavutettavia.",
        note: "Huomio: esteettömyystiedot voivat muuttua. Suosittelemme soittamaan suoraan kohteeseen."
      },
      mobility: {
        title: "Liikkuminen Levillä",
        items: [
          "Keskustan kadut talvella lumisia — pyörätuolilla haastavaa ilman avustajaa",
          "Suksibussit ovat esteettömiä (kaikki Levin Ski Bussit)",
          "Esteetön taksi: tilaa etukäteen (puh. 0200 99800) — rajallinen saatavuus"
        ],
        tip: "Vinkki: talvella nastakengät tai liukuesteet välttämättömät kaikille."
      },
      accommodation: {
        title: "Esteettömät majoitukset",
        content: "Osa hotelleista ja huoneistoista tarjoaa esteettömiä huoneita. Mökeissä esteettömyys vaihtelee — monikerroksiset hirsimökit usein haastavia. Kysy aina tarkasti ennen varausta.",
        contact: "Ota yhteyttä niin kerromme mitkä kohteistamme sopivat: +358 44 131 313."
      },
      activities: {
        title: "Laskettelu ja aktiviteetit",
        items: [
          "Erityislaskettelu: Levin hiihtokoulussa kokemusta, sit-ski saatavilla — kysy etukäteen",
          "Suksibussi esteettömästi rinteiden juurelle",
          "Gondolihissi esteetön — tunturille pyörätuolilla",
          "Safarit: osa porosafarioperaattoreista järjestää esteettömiä rekiä. Kysy operaattorilta.",
          "Levin Spa pääosin esteetön"
        ]
      },
      sensory: {
        title: "Näkö- ja kuulovammaiset",
        content: "Näkövammaisille Levin luonto tarjoaa upean aistikokemuksen (tuoksut, äänet, lumen tuntu). Opastetut retket suositeltavia. Kuulovammaisille visuaalinen viestintä toimii, tulkkipalvelut kannattaa järjestää etukäteen."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Onko keskusta pyörätuolilla kuljettavissa?", a: "Osittain, talvella lumi vaikeuttaa. Avustaja suositeltava." },
        { q: "Voiko pyörätuolilla lasketella?", a: "Kyllä, sit-ski saatavilla hiihtokoulusta." },
        { q: "Ovatko suksibussit esteettömiä?", a: "Kyllä, kaikki Levin Ski Bussit ovat esteettömiä." }
      ]
    },
    cta: { text: "Kerromme mielellämme lisää esteettömistä vaihtoehdoista — ota yhteyttä.", link: "/yhteystiedot", button: "Ota yhteyttä" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Liikkuminen Levillä", desc: "Bussit, taksit ja kulkuyhteydet", href: "/opas/liikkuminen-levilla" },
        { title: "Laskettelu Levillä", desc: "Rinteet ja hissit", href: "/opas/laskettelu-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Esteetön Levi"
  },
  en: {
    meta: {
      title: "Accessible Levi — Guide for Visitors with Disabilities | Leville.net",
      description: "Accessibility guide for Levi: wheelchair access, accessible accommodation, adapted skiing and activities.",
      canonical: "https://leville.net/guide/accessible-levi"
    },
    h1: "Accessible Levi — A Guide for Visitors with Disabilities",
    intro: "Levi is continuously improving accessibility. This guide covers what's available.",
    sections: {
      general: {
        title: "Accessibility in Levi — Overview",
        content: "Levi has significantly improved its accessibility. There's still room for improvement everywhere — Lapland is naturally demanding terrain — but many services and activities are accessible.",
        note: "Note: accessibility information may change. We recommend calling the venue directly."
      },
      mobility: {
        title: "Getting Around Levi",
        items: [
          "Centre streets are snowy in winter — challenging for wheelchairs without assistance",
          "Ski buses are accessible (all Levi Ski Buses)",
          "Accessible taxi: book in advance (tel. 0200 99800) — limited availability"
        ],
        tip: "Tip: studded shoes or anti-slip grips are essential for everyone in winter."
      },
      accommodation: {
        title: "Accessible Accommodation",
        content: "Some hotels and apartments offer accessible rooms. Cabin accessibility varies — multi-storey log cabins are often challenging. Always ask in detail before booking.",
        contact: "Contact us to find out which of our properties are suitable: +358 44 131 313."
      },
      activities: {
        title: "Skiing and Activities",
        items: [
          "Adaptive skiing: Levi Ski School has experience, sit-ski available — ask in advance",
          "Ski bus accessible to the foot of the slopes",
          "Gondola lift accessible — reach the fell top by wheelchair",
          "Safaris: some reindeer safari operators arrange accessible sleighs. Ask the operator.",
          "Levi Spa mostly accessible"
        ]
      },
      sensory: {
        title: "Visual and Hearing Impairments",
        content: "For visually impaired visitors, Levi's nature offers a wonderful sensory experience (scents, sounds, feel of snow). Guided trips recommended. For hearing impaired visitors, visual communication works well; interpreter services should be arranged in advance."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is the centre wheelchair accessible?", a: "Partially — snow makes it challenging in winter. An assistant is recommended." },
        { q: "Can you ski in a wheelchair?", a: "Yes, sit-ski is available from the ski school." },
        { q: "Are ski buses accessible?", a: "Yes, all Levi Ski Buses are accessible." }
      ]
    },
    cta: { text: "We're happy to tell you more about accessible options — get in touch.", link: "/en/contact", button: "Contact us" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Getting Around Levi", desc: "Buses, taxis and connections", href: "/guide/getting-around-levi" },
        { title: "Skiing in Levi", desc: "Slopes and lifts", href: "/guide/skiing-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Accessible Levi"
  }
};

const AccessibleLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/esteetton-levi", en: "/guide/accessible-levi" };
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Guide" : "Opas", href: lang === "en" ? "/en/levi" : "/levi" },
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

            {/* General */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Accessibility className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.general.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.general.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.general.note}</p>
                </div>
              </Card>
            </section>

            {/* Mobility */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.mobility.title}</h2>
              </div>
              <ul className="space-y-3 mb-4">
                {t.sections.mobility.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.mobility.tip}</p>
                </div>
              </Card>
            </section>

            {/* Accommodation */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.accommodation.title}</h2>
              <p className="text-muted-foreground mb-3">{t.sections.accommodation.content}</p>
              <Card className="border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t.sections.accommodation.contact}</p>
                </div>
              </Card>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.activities.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.activities.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Sensory */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.sensory.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.sensory.content}</p>
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

export default AccessibleLevi;
