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
import { ArrowRight, Sparkles, Star, Info, Heart, PartyPopper, Users, Utensils, Music } from "lucide-react";
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

interface NewYearsEveLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Uusivuosi Levillä — Ilotulitukset, ohjelma ja vinkit | Leville.net",
      description: "Uudenvuodenaatto Levillä: ilotulitukset, ravintolat, ohjelma ja tunnelma. Käytännön vinkit uudenvuoden juhlintaan tunturissa.",
      canonical: "https://leville.net/opas/uusivuosi-levilla"
    },
    h1: "Uusivuosi Levillä — juhli vuodenvaihdetta tunturissa",
    intro: "Uudenvuodenaatto lumisessa tunturimaisemassa, ilotulitukset taivaan halki ja sen jälkeen lämmin sauna — harva paikka maailmassa tarjoaa vastaavaa yhdistelmää.",
    sections: {
      atmosphere: {
        title: "Uudenvuoden tunnelma Levillä",
        content: "Uudenvuodenaatto Levillä on jotain aivan erityistä. Luminen tunturimaisema, pakkanen, ilotulitukset taivaan halki ja sen jälkeen lämmin sauna — harva paikka maailmassa tarjoaa vastaavaa yhdistelmää. Levi on kompakti kylä, joten kaikki tapahtuu kävelymatkan päässä."
      },
      fireworks: {
        title: "Ilotulitukset",
        content: "Levin ilotulitus ammutaan perinteisesti keskustan tuntumasta keskiyöllä. Paras katselupaikka on eturinteiden alue (Zero Point) tai Hullu Poron terassi. Kylmään kannattaa varautua — pakkanen voi olla kova yöllä.",
        disclaimer: "Ilotulituksen tarkka paikka ja ajankohta vahvistetaan vuosittain. Tarkista ajantasainen tieto Levin matkailuinfosta."
      },
      restaurants: {
        title: "Ravintoloissa juhlistaminen",
        content: "Monet Levin ravintolat järjestävät uudenvuoden illallisia ja juhlia. Tarjolla on gaala-illallisia, teemailtoja ja à la carte -menuja. Varaa pöytä hyvissä ajoin — suositut ravintolat täyttyvät viikkoja ennen.",
        tip: "Vinkki: jos haluat kokata itse, Levin kaupoista saa hyvin aineksia juhlaillalliseen. Kotikokkaus mökissä tai huoneistossa on tunnelmallinen vaihtoehto."
      },
      nightlife: {
        title: "Baarit ja yöelämä",
        content: "Uudenvuodenaattona Levin baarit ovat täynnä tunnelmaa. Hullu Poro, Colorado ja muut paikat järjestävät ohjelmaa ja ovat auki myöhään. Ikäraja (18+, yökerhoissa usein 20+) kannattaa huomioida."
      },
      families: {
        title: "Lapsiperheet ja uusivuosi",
        content: "Lasten kanssa uusivuosi voi olla myös rauhallinen — oma sauna, hyvä ruoka ja ilotulituksen katsominen pihalta tai parvekkeelta. Pienempiä lapsia ei kannata viedä pakkaseen keskiyöllä — ilotulituksen näkee myös ikkunasta."
      },
      tips: {
        title: "Käytännön vinkit",
        items: [
          "Varaa majoitus ja ravintolat ajoissa — uusivuosi on Levin suosituimpia aikoja joulun ohella",
          "Pukeudu lämpimästi ilotulitusta katsoessa — voi olla -20…-30 °C",
          "Taksi kotiin: tilaa ajoissa (puh. 0200 99800)",
          "Alko on suljettu uudenvuodenpäivänä — osta juomat etukäteen",
          "Suksibussi ei kulje yöllä — kävely tai taksi"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Onko Levillä ilotulitukset?", a: "Kyllä, perinteisesti keskiyöllä keskustan tuntumasta. Tarkka paikka vaihtelee vuosittain." },
        { q: "Tarvitseeko varata ravintola?", a: "Ehdottomasti — viikkoja etukäteen uudenvuodenaatolle." },
        { q: "Onko lapsille sopivaa ohjelmaa?", a: "Uusivuosi on enemmän aikuisten juhla, mutta ilotulitukset näkyvät kaikkialle. Rauhallinen perheillallinen mökissä on suosittu vaihtoehto." }
      ]
    },
    cta: {
      text: "Varaa uudenvuoden majoitus ajoissa — suosituimmat kohteet täyttyvät nopeasti.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Afterski ja yöelämä", desc: "Baarit ja tunnelma", href: "/opas/afterski-ja-yoelama-levilla" },
        { title: "Ravintolat ja palvelut", desc: "Ruokailupaikat Levillä", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Joulu Lapissa", desc: "Tunnelmallinen jouluopas", href: "/levi/joulu-lapissa" },
        { title: "Hinnat Levillä", desc: "Mitä loma maksaa?", href: "/opas/hinnat-levilla" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Uusivuosi Levillä"
  },
  en: {
    meta: {
      title: "New Year's Eve in Levi — Fireworks, Events & Tips | Leville.net",
      description: "New Year's Eve in Levi: fireworks, restaurants, events and atmosphere. Practical tips for celebrating New Year's in the fells.",
      canonical: "https://leville.net/guide/new-years-eve-in-levi"
    },
    h1: "New Year's Eve in Levi — Celebrate in the Fells",
    intro: "New Year's Eve in a snowy fell landscape, fireworks across the sky and a warm sauna afterwards — few places in the world offer this combination.",
    sections: {
      atmosphere: {
        title: "New Year's Atmosphere in Levi",
        content: "New Year's Eve in Levi is something truly special. A snowy fell landscape, frost, fireworks across the sky and a warm sauna afterwards — few places in the world offer this combination. Levi is a compact village, so everything happens within walking distance."
      },
      fireworks: {
        title: "Fireworks",
        content: "Levi's fireworks are traditionally launched from near the centre at midnight. The best viewing spots are the front slope area (Zero Point) or Hullu Poro's terrace. Be prepared for cold — temperatures can be harsh at night.",
        disclaimer: "The exact location and timing of fireworks are confirmed annually. Check current information from Levi tourist info."
      },
      restaurants: {
        title: "Celebrating at Restaurants",
        content: "Many Levi restaurants organise New Year's Eve dinners and parties. Options include gala dinners, themed evenings and à la carte menus. Book your table well in advance — popular restaurants fill up weeks before.",
        tip: "Tip: if you prefer to cook yourself, Levi's shops are well-stocked for a festive dinner. Cooking at home in your cabin or apartment is an atmospheric alternative."
      },
      nightlife: {
        title: "Bars and Nightlife",
        content: "On New Year's Eve, Levi's bars are full of atmosphere. Hullu Poro, Colorado and other venues have programmes and stay open late. Note the age limits (18+, nightclubs often 20+)."
      },
      families: {
        title: "Families and New Year's",
        content: "With children, New Year's can be peaceful too — your own sauna, good food and watching the fireworks from the yard or balcony. Don't take small children out into the frost at midnight — you can see the fireworks from the window too."
      },
      tips: {
        title: "Practical Tips",
        items: [
          "Book accommodation and restaurants early — New Year's is one of Levi's most popular times alongside Christmas",
          "Dress warmly when watching fireworks — it can be -20…-30 °C",
          "Taxi home: book early (tel. 0200 99800)",
          "Alko (state liquor store) is closed on New Year's Day — buy drinks in advance",
          "Ski bus doesn't run at night — walk or taxi"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Are there fireworks in Levi?", a: "Yes, traditionally at midnight from near the centre. The exact location varies yearly." },
        { q: "Do I need to book a restaurant?", a: "Absolutely — weeks in advance for New Year's Eve." },
        { q: "Is there anything for children?", a: "New Year's is more of an adult celebration, but fireworks can be seen from everywhere. A peaceful family dinner in a cabin is a popular alternative." }
      ]
    },
    cta: {
      text: "Book your New Year's accommodation early — the most popular properties fill up quickly.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Après-Ski & Nightlife", desc: "Bars and atmosphere", href: "/guide/apres-ski-and-nightlife-in-levi" },
        { title: "Restaurants & Services", desc: "Dining in Levi", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Christmas in Lapland", desc: "Festive guide", href: "/levi/joulu-lapissa" },
        { title: "Prices in Levi", desc: "What does it cost?", href: "/guide/prices-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "New Year's Eve in Levi"
  }
};

const NewYearsEveLevi = ({ lang = "fi" }: NewYearsEveLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/uusivuosi-levilla",
    en: "/guide/new-years-eve-in-levi"
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

            {/* Atmosphere */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.atmosphere.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.atmosphere.content}</p>
            </section>

            {/* Fireworks */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <PartyPopper className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.fireworks.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.fireworks.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.fireworks.disclaimer}</p>
                </div>
              </Card>
            </section>

            {/* Restaurants */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.restaurants.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.restaurants.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.restaurants.tip}</p>
                </div>
              </Card>
            </section>

            {/* Nightlife */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.nightlife.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.nightlife.content}</p>
            </section>

            {/* Families */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.families.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.families.content}</p>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.tips.title}</h2>
              <ul className="space-y-3">
                {t.sections.tips.items.map((item, idx) => (
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

export default NewYearsEveLevi;
