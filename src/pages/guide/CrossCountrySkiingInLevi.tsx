import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight, Snowflake, Star, Route, TreePine, Moon } from "lucide-react";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CrossCountrySkiingProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Hiihto Levillä – Ladut, reitit ja vinkit | Leville.net",
      description: "Kattava opas Levin hiihtoon. 230 km latuja, reittikartat ja parhaat hiihtovinkit. Suunnittele murtomaahiihto- tai perinteisen hiihdon lomasi Levillä.",
      canonical: "https://leville.net/opas/hiihto-levi"
    },
    title: "Hiihto Levillä",
    subtitle: "230 km huollettuja latuja Lapin tunturimaisemissa",
    intro: "Levin latuverkosto on yksi Suomen laajimmista ja kauneimmista. 230 kilometriä huollettuja latuja vie sinut läpi lumisten metsien ja avoimien tunturimaisemien. Ladut sopivat sekä perinteiseen hiihtoon että luistelutyyliin, ja valaistuja latuja on hiihtäjille myös pimeään aikaan.",
    sections: {
      network: {
        title: "Latuverkosto",
        stats: [
          { label: "Latuja yhteensä", value: "230 km", icon: "route" },
          { label: "Valaistuja latuja", value: "28 km", icon: "moon" },
          { label: "Tunturilatuja", value: "Useita", icon: "mountain" },
          { label: "Lumetuslatu", value: "Aina auki", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Suosituimmat ladut",
        items: [
          {
            name: "Immeljärven lenkit",
            length: "5–15 km",
            desc: "Helpot ladut aloittelijoille, kauniit järvinäkymät"
          },
          {
            name: "Tunturilatu",
            length: "10–25 km",
            desc: "Vaihtelevia nousuja ja laskuja, upeat maisemat"
          },
          {
            name: "Kätkäntunturin latu",
            length: "20 km",
            desc: "Haastava reitti kokeneille hiihtäjille"
          },
          {
            name: "Valaistu keskustalatu",
            length: "7 km",
            desc: "Täydellinen iltahiihtoon pimeinä kuukausina"
          }
        ]
      },
      tips: {
        title: "Hiihtovinkit",
        items: [
          "Tarkista latujen kunto Levi Ski Resortin sivuilta ennen lähtöä",
          "Varaa tarpeeksi aikaa – tunturiladuilla aika kuluu nopeasti",
          "Ota mukaan lämmin juoma ja pieni evästä pidemmille reiteille",
          "Vuokraa välineet Leviltä jos et omista – laaja valikoima",
          "Kokeile molempia tyylejä: perinteinen ja luistelu"
        ]
      },
      services: {
        title: "Latupalvelut",
        content: "Levin ladut huolletaan päivittäin. Latukarttoja saa turistineuvonnasta ja latukahviloista. Hiihtokoulussa on opetusta kaikentasoisille. Välinevuokraamoista saat sekki- ja luisteluhiihtosukset."
      },
      conditions: {
        title: "Latukausi ja olosuhteet",
        content: "Latukausi alkaa tyypillisesti marraskuussa ja jatkuu huhtikuun loppuun. Lumetuslatu varmistaa hiihtomahkollisuudet jo aikaisessa vaiheessa. Tunturiladuilla lunta on usein toukokuuhun asti."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Milloin Levin ladut aukeavat?",
          a: "Latukausi alkaa tyypillisesti marraskuun alussa lumetuslaturilla. Täysi latuverkosto avautuu riittävien lumisateiden jälkeen."
        },
        {
          q: "Onko Levillä hiihdon opetusta?",
          a: "Kyllä, Levin hiihtokoulut tarjoavat opetusta kaikentasoisille hiihtäjille, sekä perinteiseen että luisteluhiihtoon."
        },
        {
          q: "Voinko hiihtää illalla?",
          a: "Kyllä, Levillä on 28 km valaistuja latuja, jotka ovat auki myös pimeään aikaan."
        },
        {
          q: "Tarvitseeko latumaksun?",
          a: "Levin ladut ovat maksuttomia. Välineet voi vuokrata paikan päältä."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa majoitus Leviltä",
      accommodationLink: "/majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talvi Levillä", desc: "Kaamos, lumi ja aktiviteetit", href: "/opas/talvi-levi" },
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
        { title: "Sää ja lumitilanne", desc: "Lämpötilat ja olosuhteet", href: "/levi/saatieto-levilta" },
        { title: "Talvivarusteet", desc: "Pukeutumisvinkit Levin pakkasiin", href: "/opas/talvivarusteet-leville" },
        { title: "Kevät Levillä", desc: "Parhaat hiihtokelit kevätauringossa", href: "/opas/kevat-levi" },
        { title: "Levi ilman autoa", desc: "Miten pääset laduille ilman autoa", href: "/opas/levi-ilman-autoa" }
      ]
    },
    breadcrumbLabel: "Hiihto Levillä"
  },
  en: {
    meta: {
      title: "Cross-Country Skiing in Levi – Trails, Routes & Tips | Leville.net",
      description: "Complete guide to cross-country skiing in Levi. 230 km of trails, route maps and best skiing tips. Plan your Nordic skiing holiday in Levi, Lapland.",
      canonical: "https://leville.net/guide/cross-country-skiing-in-levi"
    },
    title: "Cross-Country Skiing in Levi",
    subtitle: "230 km of groomed trails in Lapland's fell landscapes",
    intro: "Levi's trail network is one of the most extensive and beautiful in Finland. 230 kilometers of groomed trails take you through snowy forests and open fell landscapes. Trails are suitable for both classic and skating styles, and illuminated trails are available for skiing in the dark season.",
    sections: {
      network: {
        title: "Trail Network",
        stats: [
          { label: "Total trails", value: "230 km", icon: "route" },
          { label: "Illuminated trails", value: "28 km", icon: "moon" },
          { label: "Fell trails", value: "Multiple", icon: "mountain" },
          { label: "Snow-making trail", value: "Always open", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Most Popular Trails",
        items: [
          { name: "Immeljärvi loops", length: "5–15 km", desc: "Easy trails for beginners, beautiful lake views" },
          { name: "Fell trail", length: "10–25 km", desc: "Varied climbs and descents, stunning scenery" },
          { name: "Kätkätunturi trail", length: "20 km", desc: "Challenging route for experienced skiers" },
          { name: "Illuminated center trail", length: "7 km", desc: "Perfect for evening skiing in dark months" }
        ]
      },
      tips: {
        title: "Skiing Tips",
        items: [
          "Check trail conditions on Levi Ski Resort's website before heading out",
          "Allow plenty of time – hours fly by on fell trails",
          "Bring a warm drink and snacks for longer routes",
          "Rent equipment in Levi if you don't own any – wide selection",
          "Try both styles: classic and skating"
        ]
      },
      services: {
        title: "Trail Services",
        content: "Levi's trails are groomed daily. Trail maps are available at the tourist information and trail cafés. Ski schools offer lessons for all skill levels. Rental shops have both classic and skating skis."
      },
      conditions: {
        title: "Season and Conditions",
        content: "The trail season typically begins in November and continues until late April. The snow-making trail ensures skiing opportunities early in the season. Fell trails often have snow until May."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "When do Levi's trails open?", a: "The trail season typically starts in early November on the snow-making trail. The full trail network opens after sufficient snowfall." },
        { q: "Is there ski instruction in Levi?", a: "Yes, Levi's ski schools offer lessons for all skill levels, in both classic and skating techniques." },
        { q: "Can I ski in the evening?", a: "Yes, Levi has 28 km of illuminated trails that are open during dark hours." },
        { q: "Is there a trail fee?", a: "Levi's trails are free of charge. Equipment can be rented on site." }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book accommodation in Levi",
      accommodationLink: "/en/accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
        { title: "Winter Clothing Guide", desc: "How to dress for Levi's frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Spring in Levi", desc: "Best skiing in spring sunshine", href: "/guide/spring-in-levi" },
        { title: "Levi Without a Car", desc: "How to reach the trails car-free", href: "/guide/levi-without-a-car" }
      ]
    },
    breadcrumbLabel: "Cross-Country Skiing in Levi"
  },
  nl: {
    meta: {
      title: "Langlaufen in Levi – 230 km loipes in Fins Lapland | Leville.net",
      description: "Ontdek 230+ km geprepareerde langlaufloipes in Levi. Routes voor beginners en gevorderden, verhuur, lessen en de beste seizoenen voor langlaufen.",
      canonical: "https://leville.net/nl/gids/langlaufen-in-levi"
    },
    title: "Langlaufen in Levi",
    subtitle: "230 km geprepareerde loipes in het fjelllandschap van Lapland",
    intro: "Langlaufen is enorm populair onder Nederlandse bezoekers die meer willen dan alleen alpineskiën. Het loipenetwerk van Levi is een van de meest uitgebreide en mooiste in Finland. 230 kilometer aan geprepareerde loipes voeren je door besneeuwde bossen en open fjelllandschappen. De loipes zijn geschikt voor zowel klassiek als skating, en verlichte loipes zijn beschikbaar voor langlaufen in het donkere seizoen.",
    sections: {
      network: {
        title: "Loipenetwerk",
        stats: [
          { label: "Totaal loipes", value: "230 km", icon: "route" },
          { label: "Verlichte loipes", value: "28 km", icon: "moon" },
          { label: "Fjellloipes", value: "Meerdere", icon: "mountain" },
          { label: "Kunstsneeuwloipe", value: "Altijd open", icon: "snowflake" }
        ]
      },
      trails: {
        title: "Populairste loipes",
        items: [
          { name: "Immeljärvi-rondjes", length: "5–15 km", desc: "Makkelijke loipes voor beginners, prachtig uitzicht op het meer" },
          { name: "Fjellloipe", length: "10–25 km", desc: "Afwisselende klimmen en dalen, schitterend landschap" },
          { name: "Kätkätunturi-loipe", length: "20 km", desc: "Uitdagende route voor ervaren langlaufers" },
          { name: "Verlichte centrumloipe", length: "7 km", desc: "Perfect voor avondlanglaufen in de donkere maanden" }
        ]
      },
      tips: {
        title: "Langlauftips",
        items: [
          "Controleer de loipecondities op de website van Levi Ski Resort voor vertrek",
          "Neem genoeg tijd – de uren vliegen voorbij op de fjellloipes",
          "Neem een warme drank en snacks mee voor langere routes",
          "Huur uitrusting bij verhuurwinkels in Levi (~€25-35/dag) als je geen eigen ski's hebt",
          "Probeer beide stijlen: klassiek en skating",
          "Gratis loipekaart beschikbaar bij Tourist Information of online op levi.fi"
        ]
      },
      services: {
        title: "Loipeservice",
        content: "De loipes van Levi worden dagelijks geprepareerd. Loipekaarten zijn verkrijgbaar bij de toeristinformatie en bij loipecafés. De Levi Ski School biedt langlauflessen voor alle niveaus. Bij verhuurwinkels in de buurt van de pistes kun je zowel klassieke als skating-ski's huren."
      },
      conditions: {
        title: "Seizoen en omstandigheden",
        content: "Het loipeseizoen begint meestal in november en loopt door tot eind april. De kunstsneeuwloipe garandeert vroeg in het seizoen langlaufmogelijkheden. Op de fjellloipes ligt vaak sneeuw tot mei. Het beste seizoen voor langlaufen is maart-april: lentezon met uitstekende sneeuw."
      }
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Wanneer gaan de loipes in Levi open?", a: "Het loipeseizoen begint meestal begin november op de kunstsneeuwloipe. Het volledige loipenetwerk opent na voldoende sneeuwval." },
        { q: "Zijn er langlauflessen in Levi?", a: "Ja, de skischolen van Levi bieden lessen voor alle niveaus, zowel klassiek als skating." },
        { q: "Kan ik 's avonds langlaufen?", a: "Ja, Levi heeft 28 km verlichte loipes die ook in het donker open zijn." },
        { q: "Moet ik betalen voor de loipes?", a: "Nee, de loipes van Levi zijn gratis. Uitrusting kun je ter plaatse huren." }
      ]
    },
    cta: {
      hub: "Terug naar Levi-gids",
      hubLink: "/nl/levi",
      accommodation: "Boek accommodatie in Levi",
      accommodationLink: "/nl/accommodaties"
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/nl/gids/skieen-in-levi" },
        { title: "Winterkleding", desc: "Kledingstips voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Seizoenen in Levi", desc: "Wanneer is het beste seizoen?", href: "/nl/gids/seizoenen-in-levi" },
        { title: "Accommodaties", desc: "Chalets en appartementen in Levi", href: "/nl/accommodaties" }
      ]
    },
    breadcrumbLabel: "Langlaufen in Levi"
  }
};

const CrossCountrySkiingInLevi = ({ lang = "fi" }: CrossCountrySkiingProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/hiihto-levi",
    en: "/guide/cross-country-skiing-in-levi",
    nl: "/nl/gids/langlaufen-in-levi"
  };

  const homeLabelMap: Record<string, string> = { fi: "Etusivu", en: "Home", nl: "Home" };
  const homeHrefMap: Record<string, string> = { fi: "/", en: "/en", nl: "/nl" };
  const leviHrefMap: Record<string, string> = { fi: "/levi", en: "/en/levi", nl: "/nl/levi" };
  const breadcrumbItems = [
    { label: homeLabelMap[lang] || "Home", href: homeHrefMap[lang] || "/en" },
    { label: "Levi", href: leviHrefMap[lang] || "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    route: <Route className="w-5 h-5 text-primary" />,
    moon: <Moon className="w-5 h-5 text-primary" />,
    mountain: <TreePine className="w-5 h-5 text-primary" />,
    snowflake: <Snowflake className="w-5 h-5 text-primary" />
  };

  return (
    <>
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": t.title,
            "description": t.meta.description,
            "author": { "@type": "Organization", "name": "Leville.net" },
            "publisher": { "@type": "Organization", "name": "Leville.net" }
          })}
        </script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${lang === "fi" ? "/" : "/en"}` },
        { name: lang === "fi" ? "Aktiviteetit" : "Activities", url: `https://leville.net${lang === "fi" ? "/opas/aktiviteetit-levi" : "/guide/activities-in-levi"}` },
        { name: t.title, url: t.meta.canonical }
      ])} />
      <JsonLd data={getFAQSchema(t.faq.items.map(i => ({ question: i.q, answer: i.a })))} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Stats */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t.sections.network.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.sections.network.stats.map((stat, idx) => (
                  <Card key={idx} className="glass-card border-border/30 text-center p-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                      {iconMap[stat.icon]}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Trails */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.trails.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.trails.items.map((trail, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{trail.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{trail.length}</p>
                    <p className="text-sm text-muted-foreground">{trail.desc}</p>
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

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.services.title}</h2>
              <p className="text-muted-foreground">{t.sections.services.content}</p>
            </section>

            {/* Conditions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.conditions.title}</h2>
              <p className="text-muted-foreground">{t.sections.conditions.content}</p>
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

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={t.cta.hubLink}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t.cta.hub}
                </Link>
              </Button>
              <Button asChild>
                <Link to={t.cta.accommodationLink}>
                  {t.cta.accommodation}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
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

export default CrossCountrySkiingInLevi;
