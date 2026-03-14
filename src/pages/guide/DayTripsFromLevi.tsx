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
import { ArrowRight, Heart, Info, Star, MapPin, Car, Mountain, Globe, TreePine, Compass } from "lucide-react";
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

interface DayTripsFromLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Päiväretket Leviltä — Rovaniemi, Ylläs, Tromsø ja muut | Leville.net",
      description: "Päiväretkiopas Leviltä: Rovaniemen Joulupukin Pajakylä, Ylläs, Muonio, Tromsø ja Pallas-Yllästunturi. Etäisyydet, kulkuyhteydet ja vinkit.",
      canonical: "https://leville.net/opas/paivaretket-levilla"
    },
    h1: "Päiväretket Leviltä — minne lähteä?",
    intro: "Levi sijaitsee erinomaisesti — päiväretkien päässä on Joulupukin Pajakylä, kansallispuistoja, naapurikeskuksia ja jopa Norjan rannikko.",
    sections: {
      base: {
        title: "Levi tukikohtana",
        content: "Levi sijaitsee erinomaisesti päiväretkien kannalta. Kittilän kunnasta pääsee helposti useisiin mielenkiintoisiin kohteisiin. Auto on lähes välttämätön useimmille retkille, mutta osaan löytyy myös opastettuja kuljetuksia."
      },
      rovaniemi: {
        title: "Rovaniemi ja Joulupukin Pajakylä",
        distance: "Etäisyys: noin 170 km, 2–2,5 h autolla.",
        content: "Joulupukin Pajakylä on maailman tunnetuin joulukohde — napapiirin ylitys, joulupukin tapaaminen (ilmainen!), pääpostikonttori ja lukuisat kaupat. Sopii erityisesti lapsiperheille. Myös Arktikum-tiedemuseo on näkemisen arvoinen. Opastettuja päiväretkiä on saatavilla Leviltä.",
        tip: "Vinkki: lähde aikaisin aamulla, niin ehdit viettää Rovaniemellä 4–5 tuntia mukavasti."
      },
      yllas: {
        title: "Ylläs",
        distance: "Etäisyys: noin 60 km, 45 min autolla.",
        content: "Ylläs on Levin naapurihiihtokeskus ja Suomen suurin korkeusero (718 m). Äkäslompolo ja Ylläsjärvi ovat viehättäviä tunturikyliä. Pallas-Yllästunturi kansallispuiston reitit alkavat täältä. Hiihtäjille Ylläs-Levi -yhdistelmä on houkutteleva — eri rinteet, eri maisemat."
      },
      pallas: {
        title: "Pallas-Yllästunturi kansallispuisto",
        distance: "Etäisyys: 50–80 km (eri sisäänkäynnit).",
        content: "Suomen kolmanneksi suosituin kansallispuisto tarjoaa upeita vaellusreittejä, tunturinäkymiä ja erämaaluontoa. Talvella hiihtolatuja, kesällä vaelluspolkuja. Kellokas-luontokeskus Äkäslompolossa on hyvä lähtöpiste."
      },
      muonio: {
        title: "Muonio ja Enontekiö",
        distance: "Etäisyys Muonioon: noin 80 km, 1 h.",
        content: "Muonio on rauhallinen pieni kylä Ruotsin rajalla — autenttinen Lapin kylätunnelma. Enontekiö (noin 150 km) tarjoaa erämaaluontoa ja saamelaiskulttuuria. Molemmat sopivat niille jotka haluavat kokea \"oikean\" Lapin."
      },
      tromso: {
        title: "Tromsø (Norja)",
        distance: "Etäisyys: noin 400 km, 5–6 h autolla.",
        content: "Pitkä päivä mutta mahdollinen kaksipäiväisenä retkena. Tromsø on \"arktinen pääkaupunki\" — vilkas yliopistokaupunki, Arktinen katedraali, Polaria-museokeskus ja meren äärellä. Talvella valashavainnot mahdollisia. Rajan ylitykseen riittää passi tai EU-henkilökortti.",
        note: "Huom: Tromsø on kokonaisen päivän tai yön-yli-retki — ei varsinainen päiväretki."
      },
      tips: {
        title: "Käytännön vinkit päiväretkiin",
        items: [
          "Auto on kätevin — vuokraa jos ei ole omaa (Kittilän lentokenttä tai Levin keskusta)",
          "Tankkaa ennen lähtöä — huoltoasemien välit voivat olla pitkiä Lapissa",
          "Talvella varaudu: nastarenkaat (vuokra-autoissa vakiona), taskulamppu, lämmin vaatetus autossa",
          "Tarkista ajokeli — tie voi olla jäinen ja pimeä talvella, ajonopeus hitaampi kuin etelässä"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Pääseekö Rovaniemelle ilman autoa?", a: "Kyllä, opastettuja päiväretkiä on saatavilla. Myös bussi kulkee mutta aikataulu on rajallinen." },
        { q: "Kannattaako Ylläs-päiväretki?", a: "Ehdottomasti — 45 minuutin ajomatka ja eri maisemat. Hyvä yhdistelmä Levin kanssa." },
        { q: "Tarvitseeko Norjaan passia?", a: "EU/ETA-kansalaisille riittää henkilökortti. Muut tarvitsevat passin." },
        { q: "Onko talvella turvallista ajaa Lapissa?", a: "Kyllä, kunhan ajat rauhallisesti ja tilannenopeuteen. Vuokra-autoissa on aina nastarenkaat." }
      ]
    },
    cta: {
      text: "Käytä Leviä tukikohtana ja tutustu koko Lappiin.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Miten pääsee Leville", desc: "Kulkuyhteydet Helsingistä", href: "/matka/miten-paasee-leville-helsingista" },
        { title: "Liikkuminen Levillä", desc: "Autolla, bussilla ja taksilla", href: "/opas/liikkuminen-levilla" },
        { title: "Levi vs Ylläs vs Ruka", desc: "Hiihtokeskusvertailu", href: "/opas/levi-vs-yllas-vs-ruka" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Päiväretket"
  },
  en: {
    meta: {
      title: "Day Trips from Levi — Rovaniemi, Ylläs, Tromsø & More | Leville.net",
      description: "Day trip guide from Levi: Santa Claus Village in Rovaniemi, Ylläs, Muonio, Tromsø and Pallas-Yllästunturi National Park.",
      canonical: "https://leville.net/guide/day-trips-from-levi"
    },
    h1: "Day Trips from Levi — Where to Go?",
    intro: "Levi is perfectly located — within day trip distance you'll find Santa Claus Village, national parks, neighbouring resorts and even the Norwegian coast.",
    sections: {
      base: {
        title: "Levi as a Base",
        content: "Levi is excellently located for day trips. From Kittilä municipality you can easily reach several interesting destinations. A car is almost essential for most trips, but guided transport is available for some."
      },
      rovaniemi: {
        title: "Rovaniemi and Santa Claus Village",
        distance: "Distance: approx. 170 km, 2–2.5 hrs by car.",
        content: "Santa Claus Village is the world's most famous Christmas destination — cross the Arctic Circle, meet Santa (free!), visit the Main Post Office and numerous shops. Especially suitable for families. The Arktikum Science Museum is also worth seeing. Guided day trips available from Levi.",
        tip: "Tip: leave early in the morning and you'll have a comfortable 4–5 hours in Rovaniemi."
      },
      yllas: {
        title: "Ylläs",
        distance: "Distance: approx. 60 km, 45 min by car.",
        content: "Ylläs is Levi's neighbouring ski resort and has Finland's largest vertical drop (718 m). Äkäslompolo and Ylläsjärvi are charming fell villages. Pallas-Yllästunturi National Park trails start here. For skiers, the Ylläs-Levi combination is attractive — different slopes, different scenery."
      },
      pallas: {
        title: "Pallas-Yllästunturi National Park",
        distance: "Distance: 50–80 km (various entrances).",
        content: "Finland's third most popular national park offers stunning hiking trails, fell views and wilderness nature. Cross-country ski trails in winter, hiking paths in summer. Kellokas Nature Centre in Äkäslompolo is a good starting point."
      },
      muonio: {
        title: "Muonio and Enontekiö",
        distance: "Distance to Muonio: approx. 80 km, 1 hr.",
        content: "Muonio is a peaceful small village on the Swedish border — authentic Lapland village atmosphere. Enontekiö (approx. 150 km) offers wilderness nature and Sámi culture. Both suit those wanting to experience the \"real\" Lapland."
      },
      tromso: {
        title: "Tromsø (Norway)",
        distance: "Distance: approx. 400 km, 5–6 hrs by car.",
        content: "A long day but possible as a two-day trip. Tromsø is the \"Arctic capital\" — a lively university city, Arctic Cathedral, Polaria experience centre and located by the sea. Whale sightings possible in winter. A passport or EU ID card is sufficient for the border crossing.",
        note: "Note: Tromsø is a full-day or overnight trip — not a typical day trip."
      },
      tips: {
        title: "Practical Tips for Day Trips",
        items: [
          "A car is most convenient — rent one if you don't have your own (Kittilä airport or Levi centre)",
          "Fill up before leaving — distances between petrol stations can be long in Lapland",
          "In winter be prepared: studded tyres (standard on rental cars), torch, warm clothing in the car",
          "Check driving conditions — roads can be icy and dark in winter, driving speeds slower than in the south"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Can I get to Rovaniemi without a car?", a: "Yes, guided day trips are available. Buses also run but schedules are limited." },
        { q: "Is a day trip to Ylläs worth it?", a: "Absolutely — 45-minute drive and different scenery. A great combination with Levi." },
        { q: "Do I need a passport for Norway?", a: "EU/EEA citizens need only an ID card. Others need a passport." },
        { q: "Is it safe to drive in Lapland in winter?", a: "Yes, as long as you drive calmly and adapt to conditions. Rental cars always have studded tyres." }
      ]
    },
    cta: {
      text: "Use Levi as your base and explore all of Lapland.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "How to Get to Levi", desc: "Transport from Helsinki", href: "/travel/how-to-get-to-levi-from-helsinki" },
        { title: "Getting Around Levi", desc: "By car, bus and taxi", href: "/guide/getting-around-levi" },
        { title: "Levi vs Ylläs vs Ruka", desc: "Ski resort comparison", href: "/guide/levi-vs-yllas-vs-ruka" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Day Trips"
  }
};

const DayTripsFromLevi = ({ lang = "fi" }: DayTripsFromLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/paivaretket-levilla",
    en: "/guide/day-trips-from-levi"
  };

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Guide" : "Opas", href: lang === "en" ? "/en/levi" : "/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const destinationIcon = (key: string) => {
    const icons: Record<string, typeof MapPin> = {
      rovaniemi: Star,
      yllas: Mountain,
      pallas: TreePine,
      muonio: Compass,
      tromso: Globe,
    };
    return icons[key] || MapPin;
  };

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

            {/* Base */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.base.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.base.content}</p>
            </section>

            {/* Destinations */}
            {(["rovaniemi", "yllas", "pallas", "muonio", "tromso"] as const).map((key) => {
              const section = t.sections[key];
              const Icon = destinationIcon(key);
              return (
                <section key={key} className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <p className="text-sm font-medium text-primary mb-2">{section.distance}</p>
                  <p className="text-muted-foreground mb-3">{section.content}</p>
                  {"tip" in section && section.tip && (
                    <Card className="glass-card border-border/30 p-4 mb-3">
                      <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground italic">{section.tip}</p>
                      </div>
                    </Card>
                  )}
                  {"note" in section && section.note && (
                    <Card className="glass-card border-border/30 p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground italic">{section.note}</p>
                      </div>
                    </Card>
                  )}
                </section>
              );
            })}

            {/* Practical tips */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.tips.title}</h2>
              </div>
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

        <PageCTA lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default DayTripsFromLevi;
