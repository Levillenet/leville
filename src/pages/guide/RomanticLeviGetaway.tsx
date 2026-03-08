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
import { ArrowRight, Heart, Info, Star, Moon, Flame, UtensilsCrossed, Home, Calendar } from "lucide-react";
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

interface RomanticLeviGetawayProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Romanttinen loma Levillä — Ideoita pariskunnille | Leville.net",
      description: "Suunnittele romanttinen Levi-loma: revontulet, sauna kahdelle, fine dining ja parhaat elämykset pariskunnille.",
      canonical: "https://leville.net/opas/romanttinen-loma-levilla"
    },
    h1: "Romanttinen loma Levillä — ideoita pariskunnille",
    intro: "Revontulet, oma sauna, hiljaisuus ja lämmin tunnelma — Levi on täydellinen romanttiseen irtiottoon.",
    sections: {
      why: {
        title: "Miksi Levi on romanttinen lomakohde?",
        content: "Levi yhdistää luonnon, hiljaisuuden ja luksuksen tavalla jota harvat kohteet pystyvät tarjoamaan. Revontulet taivaalla, lämmin sauna kynttilänvalossa, illallinen poronkäristyksellä ja luminen maisema ikkunasta — ei tarvita trooppista rantaa romantiikkaan. Kaamos-aika (joulu–tammikuu) on erityisen tunnelmallinen sinisen valon ja pimeyden ansiosta."
      },
      experiences: {
        title: "Romanttisia elämyksiä",
        items: [
          "Revontulien katselu kahdestaan — ei tarvitse varata safaria, oma terassi tai lyhyt kävely pimeään riittää. Jos haluatte taattua elämystä, revontulisafari vie parhaille paikoille.",
          "Sauna kahdelle — kaikissa majoituksissamme on oma sauna. Lämmitä kiuas, sammuta valot, nauti hiljaisuudesta.",
          "Huskyajelu kahdelle — aja omaa valjakkoa lumisessa erämaassa. Intiimimpi kuin isossa ryhmässä.",
          "Poroajelu hiljaisuudessa — rauhallinen rekiajelu kahden metsän halki on meditatiivinen kokemus."
        ]
      },
      dining: {
        title: "Illallinen kahdelle",
        content: "Levillä on yllättävän laadukkaita ravintoloita: Ämmilä tarjoaa lappilaista fine diningia, King Crab House kuningasrapua, ja Pihvipirtti lihaa grillistä. Varaa pöytä etukäteen sesonkina.",
        disclaimer: "Disclaimer: Ravintoloiden aukioloajat ja menut vaihtelevat sesongin mukaan."
      },
      accommodation: {
        title: "Majoitus romanttiseen lomaan",
        content: "Pariskunnille sopivat erityisesti:",
        items: [
          "Kompakti studiohuoneisto keskustassa — kaikki lähellä, oma sauna, helppo arki",
          "Lasi-iglut ja erikoismajoitukset — revontulia katseltu sängystä käsin",
          "Rauhallinen mökki kahdelle — takka, sauna, yksityisyys"
        ]
      },
      bestTimes: {
        title: "Parhaat ajankohdat",
        seasons: [
          { label: "Kaamos (joulu–tammikuu)", desc: "Sininen valo, revontulet, äärimmäinen tunnelma" },
          { label: "Kevät (maalis–huhtikuu)", desc: "Aurinko, pitkät päivät, terassilaskettelu" },
          { label: "Syyskuu", desc: "Ruska, hiljaisuus, revontulikausi alkaa, vähän turisteja" }
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Mikä on romanttisin aika tulla Leville?", a: "Kaamos (joulu–tammikuu) on tunnelmallisin, kevät aurinkoisin." },
        { q: "Tarvitseeko varata safariat etukäteen?", a: "Kyllä sesonkina. Hiljaisempina aikoina usein saatavilla lyhyellä varoitusajalla." },
        { q: "Sopiiko Levi häämatkalle?", a: "Ehdottomasti — oma mökki, sauna, revontulet ja hiljaisuus tekevät siitä unohtumattoman." }
      ]
    },
    cta: {
      text: "Suunnittele romanttinen Levi-loma — ota yhteyttä niin autamme valinnassa.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet", desc: "Revontuliopas Leville", href: "/revontulet" },
        { title: "Ravintolat ja palvelut", desc: "Syömään Levillä", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Sauna Levillä", desc: "Suomalainen saunakokemus", href: "/opas/sauna-levilla" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Romanttinen loma"
  },
  en: {
    meta: {
      title: "Romantic Getaway in Levi — Ideas for Couples | Leville.net",
      description: "Plan a romantic Levi holiday: northern lights, private sauna, fine dining and the best experiences for couples.",
      canonical: "https://leville.net/guide/romantic-getaway-in-levi"
    },
    h1: "Romantic Getaway in Levi — Ideas for Couples",
    intro: "Northern lights, private sauna, silence and warm atmosphere — Levi is perfect for a romantic escape.",
    sections: {
      why: {
        title: "Why Is Levi a Romantic Destination?",
        content: "Levi combines nature, silence and luxury in a way few destinations can match. Northern lights in the sky, a warm sauna by candlelight, dinner with sautéed reindeer and a snowy landscape outside — no tropical beach needed for romance. The polar night season (December–January) is especially atmospheric with its blue light and darkness."
      },
      experiences: {
        title: "Romantic Experiences",
        items: [
          "Northern lights viewing for two — no need to book a safari, your own terrace or a short walk into the dark is enough. For a guaranteed experience, a northern lights safari takes you to the best spots.",
          "Private sauna — all our accommodations have their own sauna. Heat it up, turn off the lights, enjoy the silence.",
          "Husky ride for two — drive your own team through snowy wilderness. More intimate than in a large group.",
          "Reindeer ride in silence — a peaceful sled ride through the forest is a meditative experience."
        ]
      },
      dining: {
        title: "Dinner for Two",
        content: "Levi has surprisingly high-quality restaurants: Ämmilä offers Lappish fine dining, King Crab House serves king crab, and Pihvipirtti grills premium steaks. Book a table in advance during peak season.",
        disclaimer: "Disclaimer: Restaurant opening hours and menus vary by season."
      },
      accommodation: {
        title: "Accommodation for a Romantic Holiday",
        content: "Especially suitable for couples:",
        items: [
          "Compact studio apartment in the centre — everything nearby, private sauna, easy living",
          "Glass igloos and special accommodations — watch northern lights from bed",
          "Peaceful cabin for two — fireplace, sauna, privacy"
        ]
      },
      bestTimes: {
        title: "Best Times to Visit",
        seasons: [
          { label: "Polar night (Dec–Jan)", desc: "Blue light, northern lights, ultimate atmosphere" },
          { label: "Spring (Mar–Apr)", desc: "Sunshine, long days, terrace skiing" },
          { label: "September", desc: "Autumn colours, silence, aurora season begins, few tourists" }
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "When is the most romantic time to visit Levi?", a: "Polar night (December–January) is the most atmospheric, spring the sunniest." },
        { q: "Do I need to book safaris in advance?", a: "Yes during peak season. During quieter times, often available at short notice." },
        { q: "Is Levi suitable for a honeymoon?", a: "Absolutely — your own cabin, sauna, northern lights and silence make it unforgettable." }
      ]
    },
    cta: {
      text: "Plan a romantic Levi holiday — contact us and we'll help you choose.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights", desc: "Aurora guide for Levi", href: "/en/northern-lights" },
        { title: "Restaurants & Services", desc: "Dining in Levi", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Finnish Sauna", desc: "The sauna experience", href: "/guide/finnish-sauna-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Romantic Getaway"
  }
};

const RomanticLeviGetaway = ({ lang = "fi" }: RomanticLeviGetawayProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/romanttinen-loma-levilla",
    en: "/guide/romantic-getaway-in-levi"
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

            {/* Why romantic */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.why.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.why.content}</p>
            </section>

            {/* Experiences */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.experiences.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.experiences.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Dining */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.dining.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.dining.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.dining.disclaimer}</p>
                </div>
              </Card>
            </section>

            {/* Accommodation */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.accommodation.title}</h2>
              </div>
              <p className="text-muted-foreground mb-4">{t.sections.accommodation.content}</p>
              <ul className="space-y-3">
                {t.sections.accommodation.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Best times */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.bestTimes.title}</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {t.sections.bestTimes.seasons.map((s, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{s.label}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
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

export default RomanticLeviGetaway;
