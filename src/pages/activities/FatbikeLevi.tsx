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
import { ArrowRight, Bike, MapPin, Clock, Star, Info, Heart, Sun, Users, Snowflake } from "lucide-react";
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

interface FatbikeLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Fatbike Levillä — Talvipyöräily reitit, vuokraus ja vinkit | Leville.net",
      description: "Fatbike-opas Leville: talvipyöräilyn reitit, pyörän vuokraus, opastetut retket ja parhaat olosuhteet. Paikallisen majoittajan vinkit.",
      canonical: "https://leville.net/aktiviteetit/fatbike-levi"
    },
    h1: "Fatbike Levillä — talvipyöräilyä tunturimaisemissa",
    intro: "Fatbike yhdistää ulkoilun, liikunnan ja upeat maisemat — ja on yllättävän helppo aloittaa. Tässä oppaassa kerromme reitit, vuokrauksen ja parhaat olosuhteet.",
    sections: {
      what: {
        title: "Mikä on fatbike?",
        content: "Fatbike eli leveärenkainen maastopyörä on suunniteltu pehmeille alustoille — lumelle, hiekalle ja soramaalle. Leveät renkaat (tyypillisesti 4–5 tuumaa) antavat pidon jossa normaali pyörä uppoaisi. Levillä fatbike on suosittu talviaktiviteetti joka yhdistää ulkoilun, liikunnan ja maisemat."
      },
      routes: {
        title: "Reitit Levillä",
        content: "Levillä on merkittyjä talvipyöräilyreittejä sekä tunturikylän ympäristössä että kauempana erämaassa.",
        levels: [
          "Helppoja reittejä kylän ympäristössä ja jäällä (tasainen maasto, sopii aloittelijoille)",
          "Keskitason metsäreittejä (mäkiä ja polkuja, vaatii peruskuntoa)",
          "Vaativampia tunturireittejä (nousu + tekninen maasto)"
        ],
        summer: "Kesällä fatbike toimii myös maastopyöränä Levin bike park -reiteillä ja vaellusreiteillä.",
        tip: "Vinkki: kysy vuokraamosta tai oppaalta ajantasainen reittitilanne — olosuhteet vaihtelevat talven aikana."
      },
      rental: {
        title: "Vuokraus",
        content: "Fatbikeja vuokraavat Levin välinevuokraamot ja osa safariyrityksistä. Vuokrahintaan sisältyy yleensä pyörä, kypärä ja perusohjeet. Ennakkovaraus suositeltava sesonkiaikaan."
      },
      guided: {
        title: "Opastetut retket",
        content: "Opastetut fatbike-retket kestävät tyypillisesti 2–3 tuntia ja sisältävät varusteet, ohjeistuksen ja reitin valinnan olosuhteiden mukaan. Opas vie parhaille reiteille ja huolehtii turvallisuudesta — suosittelemme erityisesti ensikertaisille."
      },
      bestTime: {
        title: "Milloin paras aika?",
        seasons: [
          { label: "Talvi (joulu–huhtikuu)", desc: "Lumireiteillä, pakkasessa renkaat pitävät hyvin tallautuneella lumella" },
          { label: "Kevät (maalis–huhti)", desc: "Pitkät valoisat päivät + kantava hanki = nautinnollisin yhdistelmä" },
          { label: "Kesä (kesä–syyskuu)", desc: "Maastopyöräily tunturireiteillä, Levi Bike Park" }
        ],
        note: "Kevät on monien paikallisten mielestä paras aika — aurinko lämmittää mutta lunta riittää."
      },
      whoFor: {
        title: "Kenelle sopii?",
        content: "Peruskuntoinen aikuinen pärjää hyvin. Ei vaadi aiempaa kokemusta — fatbiken ajaminen on helpompaa kuin luulisi (leveät renkaat stabiloivat). Lapsille (~10 v+) on saatavilla pienempiä pyöriä osasta vuokraamoista."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Tarvitseeko oman pyörän?", a: "Ei, vuokraat paikan päältä." },
        { q: "Onko vaikeaa ajaa lumella?", a: "Ei, leveät renkaat pitävät yllättävän hyvin. Aloittelijoille helppoja reittejä." },
        { q: "Mitä pukea?", a: "Kerrospukeutuminen kuten muussa talviurheilussa, mutta huomioi liikkuessa syntyvä lämpö — kevyempi ulkokerros riittää kuin esim. moottorikelkkailussa." },
        { q: "Voiko ajaa ympäri vuoden?", a: "Kyllä, talvella lumireiteillä ja kesällä maastoreiteillä." }
      ]
    },
    cta: {
      text: "Majoitu Levin keskustassa lähellä vuokraamoja ja reittejä.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Vaellus ja maastopyöräily", desc: "Kesäaktiviteetit Levillä", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Talvivarusteet", desc: "Mitä pukea Leville", href: "/opas/talvivarusteet-leville" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Fatbike"
  },
  en: {
    meta: {
      title: "Fatbiking in Levi — Winter Cycling Routes, Rental & Tips | Leville.net",
      description: "Fatbiking guide for Levi: winter cycling routes, bike rental, guided tours and best conditions. Tips from a local host.",
      canonical: "https://leville.net/activities/fatbiking-in-levi"
    },
    h1: "Fatbiking in Levi — Winter Cycling in Fell Landscapes",
    intro: "Fatbiking combines outdoor activity, exercise and stunning scenery — and is surprisingly easy to start. This guide covers routes, rental and the best conditions.",
    sections: {
      what: {
        title: "What Is a Fatbike?",
        content: "A fatbike is a wide-tyre mountain bike designed for soft surfaces — snow, sand and gravel. Wide tyres (typically 4–5 inches) provide grip where a normal bike would sink. In Levi, fatbiking is a popular winter activity that combines outdoor exercise and scenery."
      },
      routes: {
        title: "Routes in Levi",
        content: "Levi has marked winter cycling routes both around the fell village and further into the wilderness.",
        levels: [
          "Easy routes around the village and on ice (flat terrain, suitable for beginners)",
          "Intermediate forest trails (hills and paths, requires basic fitness)",
          "Challenging fell routes (climbing + technical terrain)"
        ],
        summer: "In summer, fatbikes also work as mountain bikes on Levi Bike Park trails and hiking routes.",
        tip: "Tip: ask the rental shop or guide for current route conditions — they vary throughout winter."
      },
      rental: {
        title: "Rental",
        content: "Fatbikes are available from Levi's equipment rental shops and some safari companies. The rental price usually includes the bike, helmet and basic instructions. Advance booking recommended during peak season."
      },
      guided: {
        title: "Guided Tours",
        content: "Guided fatbike tours typically last 2–3 hours and include equipment, instruction and route selection based on conditions. The guide takes you to the best routes and ensures safety — especially recommended for first-timers."
      },
      bestTime: {
        title: "When Is the Best Time?",
        seasons: [
          { label: "Winter (Dec–Apr)", desc: "On snow routes, tyres grip well on packed snow in cold weather" },
          { label: "Spring (Mar–Apr)", desc: "Long bright days + firm snow crust = the most enjoyable combination" },
          { label: "Summer (Jun–Sep)", desc: "Mountain biking on fell trails, Levi Bike Park" }
        ],
        note: "Spring is many locals' favourite time — the sun warms but there's still plenty of snow."
      },
      whoFor: {
        title: "Who Is It For?",
        content: "Any reasonably fit adult can manage it. No prior experience needed — riding a fatbike is easier than you'd think (the wide tyres provide stability). Smaller bikes for children (~10+) are available from some rental shops."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need my own bike?", a: "No, you can rent one locally." },
        { q: "Is it hard to ride on snow?", a: "No, the wide tyres grip surprisingly well. Easy routes available for beginners." },
        { q: "What to wear?", a: "Layer up as for other winter sports, but account for the heat generated — a lighter outer layer works better than for snowmobiling, for example." },
        { q: "Can you ride year-round?", a: "Yes, on snow routes in winter and trail routes in summer." }
      ]
    },
    cta: {
      text: "Stay in Levi centre, close to rental shops and routes.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Hiking & Mountain Biking", desc: "Summer activities in Levi", href: "/activities/hiking-and-biking-in-levi" },
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Winter Clothing", desc: "What to wear in Levi", href: "/guide/winter-clothing-guide-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Fatbiking"
  }
};

const FatbikeLevi = ({ lang = "fi" }: FatbikeLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/aktiviteetit/fatbike-levi",
    en: "/activities/fatbiking-in-levi"
  };

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Activities" : "Aktiviteetit", href: lang === "en" ? "/en/levi" : "/levi" },
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

            {/* What is fatbike */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bike className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.what.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.what.content}</p>
            </section>

            {/* Routes */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.routes.title}</h2>
              </div>
              <p className="text-muted-foreground mb-4">{t.sections.routes.content}</p>
              <ul className="space-y-3 mb-4">
                {t.sections.routes.levels.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mb-3">{t.sections.routes.summer}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.routes.tip}</p>
                </div>
              </Card>
            </section>

            {/* Rental */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.rental.title}</h2>
              <p className="text-muted-foreground">{t.sections.rental.content}</p>
            </section>

            {/* Guided tours */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.guided.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.guided.content}</p>
            </section>

            {/* Best time */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.bestTime.title}</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {t.sections.bestTime.seasons.map((s, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{s.label}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">{t.sections.bestTime.note}</p>
            </section>

            {/* Who is it for */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.whoFor.title}</h2>
              <p className="text-muted-foreground">{t.sections.whoFor.content}</p>
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

export default FatbikeLevi;
