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
import { ArrowRight, Snowflake, Smartphone, Baby, XCircle, Sun, CheckCircle } from "lucide-react";
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

interface PackingListLaplandProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Pakkauslista Lapin lomalle — Mitä mukaan Leville? | Leville.net",
      description: "Täydellinen pakkauslista Lapin-lomalle: talvivaatteet, tekniikka, lasten varusteet ja mitä EI tarvitse tuoda.",
      canonical: "https://leville.net/opas/pakkauslista-lapin-lomalle"
    },
    h1: "Pakkauslista Lapin lomalle — mitä mukaan Leville?",
    intro: "Lapin-lomalle pakkaaminen voi tuntua haastavalta, varsinkin jos tulet lämpimämmästä maasta. Tämä käytännön pakkauslista auttaa sinua ottamaan oikeat asiat mukaan — ja jättämään turhat kotiin.",
    sections: {
      clothing: {
        title: "Vaatteet (talvi)",
        icon: "snowflake",
        items: [
          { label: "Aluskerros", desc: "Merinovilla tai tekninen kerrastoi — kosteutta siirtävä" },
          { label: "Välikerros", desc: "Fleece tai villaneule — eristää lämmön" },
          { label: "Ulkokerros", desc: "Tuulenpitävä toppatakki + housut" },
          { label: "Pipo", desc: "Paksu, korvia suojaava pipo" },
          { label: "Tuubihuivi / balaclava", desc: "Suojaa kasvot pakkaselta" },
          { label: "Hanskat", desc: "2 paria — ohuet (sisäkäyttö) + paksut (ulkona)" },
          { label: "Talvikengät", desc: "-30°C luokitus, riittävä koko villasukkien kanssa" },
          { label: "Villasukat", desc: "2–3 paria" }
        ],
        tip: "Vinkki: älä osta kaikkea uutena — hyvä kerrasto ja laadukkaat kengät ovat tärkeimmät."
      },
      tech: {
        title: "Tekniikka ja dokumentit",
        icon: "smartphone",
        items: [
          { label: "Passi / ID", desc: "Tarkista voimassaolo" },
          { label: "Vakuutustiedot", desc: "Matkavakuutus mukaan" },
          { label: "Puhelin + varavirtalähde", desc: "Kylmyys tyhjentää akun nopeasti" },
          { label: "Kamera", desc: "Revontulikuviin — kolmijalka on bonus" },
          { label: "Pistokeadapteri", desc: "UK-matkailijat tarvitsevat (Suomessa Schuko-pistoke, sama kuin Keski-Euroopassa)" }
        ]
      },
      kids: {
        title: "Lasten varusteet",
        icon: "baby",
        items: [
          { label: "Kerrasto + haalari", desc: "Samat kerrokset kuin aikuisilla" },
          { label: "Varahanskat / -lapaset", desc: "Lapset kastelevat ne nopeasti" },
          { label: "Matkasänky", desc: "Usein järjestettävissä — kysy majoittajalta" },
          { label: "Lasten lääkkeet", desc: "Kuumemittari, peruskipulääkkeet" }
        ]
      },
      notNeeded: {
        title: "Mitä EI tarvitse tuoda",
        icon: "x",
        items: [
          { label: "Lasketteluvälineet", desc: "Vuokraa paikan päältä — helpompaa kuin raahata lennossa" },
          { label: "Pyyhkeet ja liinavaatteet", desc: "Sisältyvät kaikkiin majoituksiimme" },
          { label: "Hiustenkuivaaja", desc: "Löytyy useimmista huoneistoista" },
          { label: "Liikaa ruokaa", desc: "Levin kaupat ovat hyvin varusteltuja" }
        ]
      },
      summer: {
        title: "Kesäloman pakkauslista (lyhyt)",
        icon: "sun",
        items: [
          { label: "Kevyet vaelluskengät", desc: "Polut voivat olla kivikkoisia" },
          { label: "Sadeasusteet", desc: "Säätila vaihtelee nopeasti" },
          { label: "Hyttyssuoja", desc: "Erityisesti kesä–heinäkuussa" },
          { label: "Aurinkovoide + lasit", desc: "Yötön yö tarkoittaa paljon aurinkoa" }
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Tarvitseeko omat sukset?", a: "Ei, vuokraus paikan päältä on paljon kätevämpää. Laaja valikoima kaikkien tasojen välineitä." },
        { q: "Millaisia kenkiä?", a: "Lämpimät, vähintään -30°C luokitellut talvikengät. Niiden tulee olla tarpeeksi isot villasukkien kanssa." },
        { q: "Mistä varusteita lainaan?", a: "Safarioperaattorit lainaavat usein haalareita ja kenkiä aktiviteettien ajaksi." },
        { q: "Tarvitseeko adapteria?", a: "EU-matkailijat eivät tarvitse. UK-matkailijat tarvitsevat Schuko-adapterin." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talvivaateopas", desc: "Näin pukeudut Levin pakkasiin", href: "/opas/talvivarusteet-leville" },
        { title: "Miten pääset Leville", desc: "Lennot, junat ja autot", href: "/matka/miten-paasee-leville-helsingista" },
        { title: "Hinnat Levillä", desc: "Mitä Lapin loma maksaa?", href: "/opas/hinnat-levilla" }
      ]
    },
    breadcrumbLabel: "Pakkauslista"
  },
  en: {
    meta: {
      title: "Packing List for Lapland — What to Bring to Levi? | Leville.net",
      description: "Complete packing list for a Lapland holiday: winter clothes, tech, kids' gear and what NOT to bring.",
      canonical: "https://leville.net/guide/packing-list-for-lapland"
    },
    h1: "Packing List for Lapland — What to Bring to Levi?",
    intro: "Packing for Lapland can feel overwhelming, especially if you're coming from a warmer country. This practical packing list helps you bring the right things — and leave the unnecessary stuff at home.",
    sections: {
      clothing: {
        title: "Clothing (Winter)",
        icon: "snowflake",
        items: [
          { label: "Base layer", desc: "Merino wool or synthetic — moisture-wicking" },
          { label: "Mid layer", desc: "Fleece or wool sweater — insulation" },
          { label: "Outer layer", desc: "Windproof padded jacket + trousers" },
          { label: "Hat", desc: "Thick, ear-covering beanie" },
          { label: "Neck gaiter / balaclava", desc: "Protects face from frost" },
          { label: "Gloves", desc: "2 pairs — thin (indoors) + thick (outdoors)" },
          { label: "Winter boots", desc: "-30°C rated, large enough for wool socks" },
          { label: "Wool socks", desc: "2–3 pairs" }
        ],
        tip: "Tip: don't buy everything new — good base layers and quality boots are the most important."
      },
      tech: {
        title: "Tech & Documents",
        icon: "smartphone",
        items: [
          { label: "Passport / ID", desc: "Check validity" },
          { label: "Insurance details", desc: "Bring travel insurance" },
          { label: "Phone + power bank", desc: "Cold drains battery fast" },
          { label: "Camera", desc: "For aurora photos — tripod is a bonus" },
          { label: "Plug adapter", desc: "UK travellers need one (Finland uses Schuko, same as Central Europe)" }
        ]
      },
      kids: {
        title: "Kids' Gear",
        icon: "baby",
        items: [
          { label: "Layered clothing + snowsuit", desc: "Same layering as adults" },
          { label: "Spare mittens", desc: "Kids get them wet quickly" },
          { label: "Travel cot", desc: "Often available — ask your host" },
          { label: "Children's medicine", desc: "Thermometer, basic pain relief" }
        ]
      },
      notNeeded: {
        title: "What NOT to Bring",
        icon: "x",
        items: [
          { label: "Ski equipment", desc: "Rent on site — easier than dragging it on a flight" },
          { label: "Towels & bed linen", desc: "Included in all our accommodations" },
          { label: "Hair dryer", desc: "Found in most apartments" },
          { label: "Too much food", desc: "Levi's shops are well-stocked" }
        ]
      },
      summer: {
        title: "Summer Packing List (Short)",
        icon: "sun",
        items: [
          { label: "Light hiking boots", desc: "Trails can be rocky" },
          { label: "Rain gear", desc: "Weather changes quickly" },
          { label: "Insect repellent", desc: "Especially in June–July" },
          { label: "Sunscreen + sunglasses", desc: "Midnight sun means lots of UV" }
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need my own skis?", a: "No, renting on site is much more convenient. Wide selection for all levels." },
        { q: "What kind of shoes?", a: "Warm winter boots rated for at least -30°C. They should be large enough for wool socks." },
        { q: "Where can I borrow gear?", a: "Safari operators often lend snowsuits and boots for the duration of activities." },
        { q: "Do I need a plug adapter?", a: "EU travellers don't need one. UK travellers need a Schuko adapter." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter Clothing Guide", desc: "How to dress for Levi's frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "How to Get to Levi", desc: "Flights, trains and cars", href: "/travel/how-to-get-to-levi-from-helsinki" },
        { title: "Prices in Levi", desc: "What does a Lapland holiday cost?", href: "/guide/prices-in-levi" }
      ]
    },
    breadcrumbLabel: "Packing List"
  }
};

const sectionIcons: Record<string, React.ReactNode> = {
  snowflake: <Snowflake className="w-5 h-5 text-primary" />,
  smartphone: <Smartphone className="w-5 h-5 text-primary" />,
  baby: <Baby className="w-5 h-5 text-primary" />,
  x: <XCircle className="w-5 h-5 text-destructive" />,
  sun: <Sun className="w-5 h-5 text-primary" />,
};

const PackingListLapland = ({ lang = "fi" }: PackingListLaplandProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/pakkauslista-lapin-lomalle",
    en: "/guide/packing-list-for-lapland"
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

  const sectionKeys = ["clothing", "tech", "kids", "notNeeded", "summer"] as const;

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
        <meta property="og:image:alt" content={lang === "fi" ? "Pakkauslista Lapin lomalle" : "Packing list for Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Pakkauslista Lapin lomalle" : "Packing list for Lapland"} />
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

            {/* Packing sections */}
            {sectionKeys.map((key) => {
              const section = t.sections[key];
              const isNotNeeded = key === "notNeeded";
              return (
                <section key={key} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg ${isNotNeeded ? 'bg-destructive/20' : 'bg-primary/20'} flex items-center justify-center`}>
                      {sectionIcons[section.icon]}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {section.items.map((item, idx) => (
                      <Card key={idx} className="glass-card border-border/30 p-4">
                        <div className="flex items-start gap-3">
                          {isNotNeeded ? (
                            <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {"tip" in section && section.tip && (
                    <p className="text-sm text-muted-foreground italic mt-3">{section.tip}</p>
                  )}
                </section>
              );
            })}

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

export default PackingListLapland;
