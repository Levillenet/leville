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
import { ArrowRight, Heart, Info, Star, Users, Snowflake, Fish, Sun, Shirt, MapPin } from "lucide-react";
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

interface IceFishingLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Pilkkiminen ja kalastus Levillä — Opas, paikat ja vinkit | Leville.net",
      description: "Pilkkimisopas Leville: talvikalastus jäällä, kesäkalastus Ounasjoella, luvat, paikat ja opastetut retket.",
      canonical: "https://leville.net/aktiviteetit/pilkkiminen-ja-kalastus-levi"
    },
    h1: "Pilkkiminen ja kalastus Levillä",
    intro: "Rauhallista pilkkimistä jäällä tai jännittävää perhokalastusta Ounasjoella — Levillä kalastetaan ympäri vuoden.",
    sections: {
      iceFishing: {
        title: "Pilkkiminen — talvikalastusta jäällä",
        content: "Pilkkiminen on rauhallinen ja meditatiivinen tapa nauttia Lapin talvesta. Istut jäällä, poraat reiän ja odotat — ympärilläsi avautuu ääretön valkoinen maisema. Levillä pilkkimistä voi harrastaa Immeljärvellä, Sirkkajärvellä ja pienemmillä lampareilla. Opastetut retket ovat suosituin tapa — opas hoitaa varusteet, reiän porauksen ja opastaa tekniikassa."
      },
      whatHappens: {
        title: "Mitä pilkkimisessä tapahtuu?",
        content: "Tyypillinen opastettu pilkkimisretki: kuljetus majoituksesta järvelle, varusteiden jako, lyhyt opastus, kalastusta 1–2 tuntia, usein tulentekohetki ja kuuma juoma. Saaliiksi voi saada ahventa, haukea tai siikaa. Monella retkellä kalan voi grillata paikan päällä.",
        tip: "Vinkki: pilkkiminen on erinomainen vaihtoehto hiljaisempaan päivään safarien välissä."
      },
      clothing: {
        title: "Pukeutuminen ja varusteet",
        content: "Pilkkimisessä istutaan paikallaan pitkään → jäähtyy nopeammin kuin liikkuessa. Erittäin lämmin pukeutuminen on välttämätöntä: paksu aluskerros, villa, toppahousut ja takki, lämminvuoriset kengät. Monet operaattorit lainaavat lisähaalareita ja istuinalustoja.",
        note: "Ei tarvitse omia pilkkimisvälineitä — kaikki sisältyy opastettuihin retkiin."
      },
      summerFishing: {
        title: "Kesäkalastus",
        content: "Ounasjoki virtaa Levin kupeessa ja tarjoaa erinomaisen kalastuskokemuksen kesällä (kesäkuu–syyskuu). Joessa on harjusta, taimenta ja haukea. Perhokalastus on suosituin muoto. Kalastukseen tarvitaan kalastuslupa — yleinen kalastonhoitomaksu (valtion lupa) sekä mahdollinen alueen oma lupa. Luvan voi ostaa verkosta (kalastusrajoitukset.fi) tai Levin matkailuinfosta.",
        note: "Keskiyön aurinko + perhokalastus Ounasjoella on unohtumaton kokemus."
      },
      guided: {
        title: "Opastetut retket",
        content: "Sekä talvi- että kesäkalastukseen on saatavilla opastettuja retkiä. Opas tuntee parhaat paikat, hoitaa luvat ja varusteet. Retket kestävät tyypillisesti 2–4 tuntia. Perheille on tarjolla lyhyempiä ja helpompia versioita."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Tarvitseeko omat pilkkimisvälineet?", a: "Ei, opastetut retket sisältävät kaiken." },
        { q: "Sopiiko lapsille?", a: "Kyllä, erityisesti opastetut lyhyet retket. Lapset nauttivat kalan odottelusta ja nuotion äärellä istumisesta." },
        { q: "Tarvitseeko kalastuslupaa?", a: "Opastetut retket sisältävät luvat. Omatoimiseen kalastukseen tarvitset luvan — ostettavissa verkosta." },
        { q: "Mitä kalaa Levillä saa?", a: "Talvella ahventa, haukea, siikaa. Kesällä lisäksi harjusta ja taimenta Ounasjoesta." }
      ]
    },
    cta: {
      text: "Majoitu lähellä järviä ja jokea — kysy vinkkejä kalastuspaikkoihin.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Kesä Levillä", desc: "Kesäaktiviteetit ja vinkit", href: "/opas/kesa-levi" },
        { title: "Talvivarusteet", desc: "Mitä pukea Leville", href: "/opas/talvivarusteet-leville" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Pilkkiminen ja kalastus"
  },
  en: {
    meta: {
      title: "Ice Fishing & Fishing in Levi — Guide, Spots & Tips | Leville.net",
      description: "Fishing guide for Levi: winter ice fishing, summer fly fishing on Ounasjoki, permits, spots and guided tours.",
      canonical: "https://leville.net/activities/ice-fishing-and-fishing-levi"
    },
    h1: "Ice Fishing and Fishing in Levi",
    intro: "Peaceful ice fishing on frozen lakes or exciting fly fishing on the Ounasjoki river — Levi offers fishing year-round.",
    sections: {
      iceFishing: {
        title: "Ice Fishing — Winter Fishing on Ice",
        content: "Ice fishing is a peaceful and meditative way to enjoy Lapland's winter. You sit on the ice, drill a hole and wait — surrounded by an endless white landscape. In Levi, you can ice fish on Immeljärvi, Sirkkajärvi and smaller ponds. Guided trips are the most popular option — the guide provides equipment, drills the hole and teaches the technique."
      },
      whatHappens: {
        title: "What Happens on an Ice Fishing Trip?",
        content: "A typical guided ice fishing trip: transfer from accommodation to the lake, equipment distribution, short briefing, 1–2 hours of fishing, often a campfire break with a hot drink. You might catch perch, pike or whitefish. On many trips, you can grill the fish right there.",
        tip: "Tip: ice fishing is an excellent option for a quieter day between safaris."
      },
      clothing: {
        title: "Clothing and Equipment",
        content: "Ice fishing involves sitting still for long periods → you cool down faster than when moving. Very warm clothing is essential: thick base layer, wool, insulated trousers and jacket, warm-lined boots. Many operators lend extra overalls and seat pads.",
        note: "No need for your own fishing equipment — everything is included in guided trips."
      },
      summerFishing: {
        title: "Summer Fishing",
        content: "The Ounasjoki river flows past Levi and offers excellent fishing in summer (June–September). The river has grayling, trout and pike. Fly fishing is the most popular form. Fishing requires a permit — the general fisheries management fee (state permit) and possibly a local area permit. Permits can be purchased online (kalastusrajoitukset.fi) or from Levi Tourist Information.",
        note: "Midnight sun + fly fishing on the Ounasjoki is an unforgettable experience."
      },
      guided: {
        title: "Guided Tours",
        content: "Guided tours are available for both winter and summer fishing. The guide knows the best spots, handles permits and equipment. Tours typically last 2–4 hours. Shorter, easier versions are available for families."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need my own fishing equipment?", a: "No, guided trips include everything." },
        { q: "Is it suitable for children?", a: "Yes, especially shorter guided trips. Children enjoy waiting for fish and sitting by the campfire." },
        { q: "Do I need a fishing permit?", a: "Guided trips include permits. For independent fishing you need a permit — available online." },
        { q: "What fish can you catch in Levi?", a: "In winter: perch, pike, whitefish. In summer also grayling and trout from the Ounasjoki." }
      ]
    },
    cta: {
      text: "Stay close to the lakes and river — ask us for fishing spot tips.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Summer in Levi", desc: "Summer activities and tips", href: "/guide/summer-in-levi" },
        { title: "Winter Clothing", desc: "What to wear in Levi", href: "/guide/winter-clothing-guide-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Ice Fishing & Fishing"
  }
};

const IceFishingLevi = ({ lang = "fi" }: IceFishingLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/aktiviteetit/pilkkiminen-ja-kalastus-levi",
    en: "/activities/ice-fishing-and-fishing-levi"
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

            {/* Ice fishing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Fish className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.iceFishing.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.iceFishing.content}</p>
            </section>

            {/* What happens */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.whatHappens.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.whatHappens.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.whatHappens.tip}</p>
                </div>
              </Card>
            </section>

            {/* Clothing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shirt className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.clothing.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.clothing.content}</p>
              <p className="text-sm text-muted-foreground italic">{t.sections.clothing.note}</p>
            </section>

            {/* Summer fishing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.summerFishing.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.summerFishing.content}</p>
              <p className="text-sm text-muted-foreground italic">{t.sections.summerFishing.note}</p>
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

export default IceFishingLevi;
