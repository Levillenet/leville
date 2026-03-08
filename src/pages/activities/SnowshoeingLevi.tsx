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
import { ArrowRight, Snowflake, Users, MapPin, Clock, Shirt, Calendar, Star } from "lucide-react";
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

interface SnowshoeingLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Lumikenkäily Levillä — Reitit, vuokraus ja vinkit | Leville.net",
      description: "Lumikenkäilyopas Leville: reitit, vuokraus, opastetut retket ja kenelle sopii.",
      canonical: "https://leville.net/aktiviteetit/lumikenkaily-levi"
    },
    h1: "Lumikenkäily Levillä — rauhallinen tapa kokea Lappi",
    intro: "Lumikenkäily on yksi Lapin rauhallisimmista ja kauneimmista tavoista nauttia talvisesta luonnosta. Se ei vaadi erityistaitoja eikä huippukuntoa — riittää että osaat kävellä. Tämä opas kertoo kaiken mitä tarvitset tietää lumikenkäilystä Levillä.",
    sections: {
      who: {
        title: "Kenelle sopii?",
        icon: "users",
        points: [
          "Kaikille — matalan kynnyksen aktiviteetti",
          "Ei vaadi aiempaa kokemusta eikä huippukuntoa",
          "Sopii lapsille noin 6-vuotiaasta ylöspäin",
          "Loistava vaihtoehto niille jotka haluavat liikkua omaan tahtiin"
        ]
      },
      routes: {
        title: "Reitit ja maasto",
        icon: "map",
        items: [
          { label: "Helpot reitit", desc: "Tunturikylän ympäristössä (1–3 km), tasaista maastoa" },
          { label: "Keskitason reitit", desc: "Kohti Kätkätunturia tai Immeljärveä, vaihtelevaa maastoa" },
          { label: "Vaativammat reitit", desc: "Tunturiin, enemmän korkeusvaihtelua ja kestävyyttä" }
        ],
        tip: "Kysy ajantasaiset reittitiedot Levin matkailuinfosta tai majoittajalta."
      },
      rental: {
        title: "Vuokraus ja opastetut retket",
        icon: "snowflake",
        points: [
          "Lumikenkiä saa vuokraamoista ja osasta hotelleja",
          "Opastetut retket tyypillisesti 2–3 tuntia, varusteet sisältyvät",
          "Opas tietää parhaat reitit ja huolehtii turvallisuudesta"
        ]
      },
      clothing: {
        title: "Mitä pukea lumikenkäilyyn?",
        icon: "shirt",
        points: [
          "Fyysisempää kuin poroajelu — hikoilua enemmän",
          "Hyvä aluskerrasto ja tuulenpitävä ulkokerros tärkeimmät",
          "Kengät: lämpimät, nilkan yli ulottuvat talvikengät",
          "Vältä liikaa kerroksia — kuumana hikoileminen kylmettää nopeasti"
        ]
      },
      bestTime: {
        title: "Milloin paras aika?",
        icon: "calendar",
        items: [
          { label: "Tammi–maaliskuu", desc: "Eniten lunta, paksut hanget kantavat hyvin" },
          { label: "Maalis–huhtikuu", desc: "Nautinnollisin — aurinko + lumi yhdessä" },
          { label: "Joulu", desc: "Tunnelmallinen mutta lyhyt päivänvalo" }
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Tarvitseeko omat lumikengät?", a: "Ei, vuokraat paikan päältä helposti. Opastettuihin retkiin varusteet sisältyvät." },
        { q: "Voiko lumikenkäillä yksin?", a: "Merkityillä reiteillä kyllä. Erämaahan suosittelemme opasta turvallisuussyistä." },
        { q: "Sopiiko lumikenkäily lapsille?", a: "Noin 6-vuotiaasta ylöspäin helpommilla reiteillä. Pienemmät voivat kyllästyä nopeasti." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Vaellus ja pyöräily", desc: "Reitit Levin ympäristössä", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
        { title: "Talvivaateopas", desc: "Näin pukeudut Levin pakkasiin", href: "/opas/talvivarusteet-leville" },
        { title: "Parhaat talviaktiviteetit", desc: "Kattava opas Levin talveen", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" }
      ]
    },
    breadcrumbLabel: "Lumikenkäily"
  },
  en: {
    meta: {
      title: "Snowshoeing in Levi — Routes, Rental & Tips | Leville.net",
      description: "Snowshoeing guide for Levi: routes, rental, guided tours and who it suits.",
      canonical: "https://leville.net/activities/snowshoeing-in-levi"
    },
    h1: "Snowshoeing in Levi — A Peaceful Way to Experience Lapland",
    intro: "Snowshoeing is one of the most peaceful and beautiful ways to enjoy Lapland's winter nature. It requires no special skills or peak fitness — if you can walk, you can snowshoe. This guide covers everything you need to know about snowshoeing in Levi.",
    sections: {
      who: {
        title: "Who Is It For?",
        icon: "users",
        points: [
          "Everyone — a very accessible activity",
          "No previous experience or peak fitness required",
          "Suitable for children from about 6 years old",
          "Great option for those who want to move at their own pace"
        ]
      },
      routes: {
        title: "Routes and Terrain",
        icon: "map",
        items: [
          { label: "Easy routes", desc: "Around the resort village (1–3 km), flat terrain" },
          { label: "Intermediate routes", desc: "Towards Kätka fell or Immeljärvi lake, varied terrain" },
          { label: "Challenging routes", desc: "Into the fells, more elevation and endurance required" }
        ],
        tip: "Ask for up-to-date route information from Levi tourist info or your host."
      },
      rental: {
        title: "Rental and Guided Tours",
        icon: "snowflake",
        points: [
          "Snowshoes available from rental shops and some hotels",
          "Guided tours typically 2–3 hours, equipment included",
          "Guides know the best routes and ensure safety"
        ]
      },
      clothing: {
        title: "What to Wear?",
        icon: "shirt",
        points: [
          "More physical than a reindeer sleigh ride — you'll sweat more",
          "Good base layer and windproof outer layer are most important",
          "Boots: warm, above-the-ankle winter boots",
          "Avoid too many layers — sweating in the heat cools you down fast"
        ]
      },
      bestTime: {
        title: "Best Time to Go?",
        icon: "calendar",
        items: [
          { label: "January–March", desc: "Most snow, thick snowpack supports well" },
          { label: "March–April", desc: "Most enjoyable — sunshine + snow together" },
          { label: "Christmas", desc: "Atmospheric but short daylight" }
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need my own snowshoes?", a: "No, you can easily rent them on site. Guided tours include equipment." },
        { q: "Can I snowshoe alone?", a: "On marked trails, yes. For wilderness trips we recommend a guide for safety." },
        { q: "Is snowshoeing suitable for children?", a: "From about 6 years old on easier routes. Younger children may lose interest quickly." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Hiking & Biking", desc: "Routes around Levi", href: "/activities/hiking-and-biking-in-levi" },
        { title: "Winter Clothing Guide", desc: "How to dress for Levi's frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Top Winter Activities", desc: "Complete guide to Levi winter", href: "/activities/top-winter-activities-in-levi-lapland" }
      ]
    },
    breadcrumbLabel: "Snowshoeing"
  }
};

const sectionIconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5 text-primary" />,
  map: <MapPin className="w-5 h-5 text-primary" />,
  snowflake: <Snowflake className="w-5 h-5 text-primary" />,
  shirt: <Shirt className="w-5 h-5 text-primary" />,
  calendar: <Calendar className="w-5 h-5 text-primary" />,
};

const SnowshoeingLevi = ({ lang = "fi" }: SnowshoeingLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/aktiviteetit/lumikenkaily-levi",
    en: "/activities/snowshoeing-in-levi"
  };

  const homeLabels: Record<string, string> = { fi: "Etusivu", en: "Home" };
  const homeLinks: Record<string, string> = { fi: "/", en: "/en" };
  const guideLabels: Record<string, string> = { fi: "Aktiviteetit", en: "Activities" };
  const guideLinks: Record<string, string> = { fi: "/levi", en: "/en/levi" };

  const breadcrumbItems = [
    { label: homeLabels[lang] || "Etusivu", href: homeLinks[lang] || "/" },
    { label: guideLabels[lang] || "Aktiviteetit", href: guideLinks[lang] || "/levi" },
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
        <meta property="og:image:alt" content={lang === "fi" ? "Lumikenkäily Levillä" : "Snowshoeing in Levi"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Lumikenkäily Levillä" : "Snowshoeing in Levi"} />
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

            {/* Who */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {sectionIconMap[t.sections.who.icon]}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.who.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.who.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Routes */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {sectionIconMap[t.sections.routes.icon]}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.routes.title}</h2>
              </div>
              <div className="space-y-3">
                {t.sections.routes.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mt-3">{t.sections.routes.tip}</p>
            </section>

            {/* Rental */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {sectionIconMap[t.sections.rental.icon]}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.rental.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.rental.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Clothing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {sectionIconMap[t.sections.clothing.icon]}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.clothing.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.clothing.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Best time */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  {sectionIconMap[t.sections.bestTime.icon]}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.bestTime.title}</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {t.sections.bestTime.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4 text-center">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
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

export default SnowshoeingLevi;
