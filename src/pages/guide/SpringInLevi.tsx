import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Snowflake, Mountain, ArrowRight, Star, Coffee, Thermometer } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import OptimizedImage from "@/components/OptimizedImage";
import laavuOutside from "@/assets/seasons/laavu-outside.jpg";
import laavuInside from "@/assets/seasons/laavu-inside.jpg";
import springSlopesWind from "@/assets/seasons/spring-slopes-wind.jpg";
import familySlopesBench from "@/assets/seasons/family-slopes-bench.jpg";
import apresSkiTuikku from "@/assets/seasons/apres-ski-tuikku.jpg";
import bistroWestSummit from "@/assets/seasons/bistro-west-summit.jpg";
import fellSpringView from "@/assets/seasons/fell-spring-view.jpg";
import kidsSkiingSpring from "@/assets/seasons/kids-skiing-spring.jpg";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SpringInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Kevät Levillä – Kevätaurinko ja laskettelu | Leville.net",
      description: "Kattava opas Levin kevääseen. Kevätaurinko, lumitilanne, lasketteluolosuhteet ja aktiviteetit maalis-huhtikuussa. Suunnittele kevätlomasi Leville.",
      canonical: "https://leville.net/opas/kevat-levi"
    },
    title: "Kevät Levillä",
    subtitle: "Kevätauringon loistetta ja parhaita lasketteluolosuhteita",
    intro: "Levin kevät on yksi parhaista ajoista vierailla. Päivät pitenevät huimaa vauhtia, aurinko lämmittää rinteillä ja lunta on runsaasti. Kevätlaskettelu on ainutlaatuinen kokemus – terassit täyttyvät aurinkoa nauttivista ihmisistä ja luonto herää talviunestaan.",
    sections: {
      conditions: {
        title: "Kevätolosuhteet",
        stats: [
          { label: "Lämpötilat", value: "-10 – +5°C", icon: "temp" },
          { label: "Lumisyvyys", value: "80–120 cm", icon: "snow" },
          { label: "Päivän pituus", value: "12–18 h", icon: "sun" },
          { label: "Rinteet auki", value: "Huhtikuulle", icon: "mountain" }
        ]
      },
      sunshine: {
        title: "Kevätauringon aika",
        content: "Maaliskuusta alkaen päivät pitenevät nopeasti. Huhtikuussa valoisaa on jo lähes 18 tuntia vuorokaudessa. Aurinko lämmittää mukavasti, vaikka lämpötilat pysyvät vielä pakkasen puolella. Kevätauringossa lasketteleminen on ainutlaatuinen kokemus – UV-säteily on voimakasta, joten aurinkovoide on välttämätön."
      },
      activities: {
        title: "Kevätaktiviteetit",
        items: [
          { name: "Kevätlaskettelu", desc: "Parhaat olosuhteet, terassielämä" },
          { name: "Murtomaahiihto", desc: "Ladut hyvässä kunnossa" },
          { name: "Lumikenkäily", desc: "Lämmin sää, kauniit maisemat" },
          { name: "Pilkkiminen", desc: "Jäällä on vielä turvallista" },
          { name: "Moottorikelkkailu", desc: "Viimeiset safarit" },
          { name: "Terassielämä", desc: "Nauti auringosta after ski" }
        ]
      },
      temperatures: {
        title: "Kuukauden mukaan",
        months: [
          { month: "Maaliskuun alku", temp: "-10 – -5°C", desc: "Valoa palaa, pakkasia vielä" },
          { month: "Maaliskuun loppu", temp: "-5 – 0°C", desc: "Kevätaurinko lämmittää" },
          { month: "Huhtikuun alku", temp: "-5 – +5°C", desc: "Päivällä plusasteita" },
          { month: "Huhtikuun loppu", temp: "0 – +10°C", desc: "Lumi sulaa hiljalleen" }
        ]
      },
      tips: {
        title: "Vinkit kevätkävijälle",
        items: [
          "Aurinkolasit ja aurinkovoide ovat välttämättömät",
          "Pukeudu kerroksittain – lämpötila vaihtelee varjossa ja auringossa",
          "Rinteet ovat parhaimmillaan aamupäivällä ennen pehmenemistä",
          "Varaa terassipöytä etukäteen suosituissa paikoissa",
          "Tämä on edullisempaa aikaa kuin huippusesonki"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Kuinka pitkään rinteet ovat auki keväällä?",
          a: "Levin rinteet ovat tyypillisesti auki toukokuun alkuun asti. Tarkista tarkat päivämäärät Levin sivuilta."
        },
        {
          q: "Onko keväällä vielä tarpeeksi lunta?",
          a: "Kyllä! Kevät on usein lumisinta aikaa Levillä. Lunta on tyypillisesti 80–120 cm."
        },
        {
          q: "Mikä on lämpötila keväällä?",
          a: "Maaliskuussa on yleensä -10 – 0°C, huhtikuussa jo -5 – +10°C. Aurinko lämmittää päivisin."
        },
        {
          q: "Onko kevät hyvä aika perheille?",
          a: "Ehdottomasti! Lämpimämpi sää ja pitkät päivät tekevät aktiviteeteista mukavampia lapsille."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa kevätmajoitus",
      accommodationLink: "/majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "Rinteet auki toukokuulle asti", href: "/opas/laskettelu-levi" },
        { title: "Hiihto Levillä", desc: "Yli 230 km latuja – kevät on parasta hiihtoaikaa", href: "/opas/hiihtoladut-levi" },
        { title: "Talvivarusteet", desc: "Pukeutuminen keväthangille", href: "/opas/talvivarusteet-leville" },
        { title: "Maaliskuu Levillä", desc: "Kevätaurinko ja parhaat lumikelit", href: "/opas/levi-maaliskuussa" },
        { title: "Huhtikuu Levillä", desc: "Kevään huippu ja pitkät päivät", href: "/opas/levi-huhtikuussa" }
      ]
    },
    breadcrumbLabel: "Kevät Levillä"
  },
  en: {
    meta: {
      title: "Spring in Levi – Spring Sun & Skiing | Leville.net",
      description: "Complete guide to spring in Levi. Spring sunshine, snow conditions, skiing conditions and activities in March-April. Plan your spring holiday in Levi.",
      canonical: "https://leville.net/guide/spring-in-levi"
    },
    title: "Spring in Levi",
    subtitle: "Brilliant spring sun and the best skiing conditions",
    intro: "Spring in Levi is one of the best times to visit. Days lengthen rapidly, the sun warms the slopes, and there's plenty of snow. Spring skiing is a unique experience – terraces fill with people enjoying the sun and nature awakens from winter sleep.",
    sections: {
      conditions: {
        title: "Spring Conditions",
        stats: [
          { label: "Temperatures", value: "-10 – +5°C", icon: "temp" },
          { label: "Snow depth", value: "80–120 cm", icon: "snow" },
          { label: "Day length", value: "12–18 h", icon: "sun" },
          { label: "Slopes open", value: "Until April", icon: "mountain" }
        ]
      },
      sunshine: {
        title: "Spring Sunshine",
        content: "From March onwards, days lengthen rapidly. By April, there's almost 18 hours of daylight. The sun warms nicely even though temperatures stay below freezing. Skiing in spring sunshine is a unique experience – UV radiation is strong, so sunscreen is essential."
      },
      activities: {
        title: "Spring Activities",
        items: [
          { name: "Spring skiing", desc: "Best conditions, terrace life" },
          { name: "Cross-country skiing", desc: "Trails in great condition" },
          { name: "Snowshoeing", desc: "Warm weather, beautiful scenery" },
          { name: "Ice fishing", desc: "Still safe on the ice" },
          { name: "Snowmobiling", desc: "Last safaris of the season" },
          { name: "Terrace life", desc: "Enjoy the sun après-ski" }
        ]
      },
      temperatures: {
        title: "By Month",
        months: [
          { month: "Early March", temp: "-10 – -5°C", desc: "Light returns, still cold" },
          { month: "Late March", temp: "-5 – 0°C", desc: "Spring sun warms" },
          { month: "Early April", temp: "-5 – +5°C", desc: "Plus degrees during day" },
          { month: "Late April", temp: "0 – +10°C", desc: "Snow slowly melting" }
        ]
      },
      tips: {
        title: "Tips for Spring Visitors",
        items: [
          "Sunglasses and sunscreen are essential",
          "Dress in layers – temperature varies in shade and sun",
          "Slopes are best in the morning before softening",
          "Book terrace tables in advance at popular spots",
          "This is a more affordable time than peak season"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How long are slopes open in spring?",
          a: "Levi's slopes are typically open until early May. Check exact dates on Levi's website."
        },
        {
          q: "Is there still enough snow in spring?",
          a: "Yes! Spring is often the snowiest time in Levi. There's typically 80–120 cm of snow."
        },
        {
          q: "What's the temperature in spring?",
          a: "In March usually -10 – 0°C, in April already -5 – +10°C. The sun warms during the day."
        },
        {
          q: "Is spring a good time for families?",
          a: "Absolutely! Warmer weather and long days make activities more comfortable for children."
        }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book spring accommodation",
      accommodationLink: "/en/accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "Slopes open until May", href: "/guide/skiing-in-levi" },
        { title: "Cross-Country Skiing", desc: "230+ km of trails – spring is prime time", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Winter Clothing", desc: "What to wear for spring skiing", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "March in Levi", desc: "Spring sun and best snow conditions", href: "/guide/levi-in-march" },
        { title: "April in Levi", desc: "Peak spring and long days", href: "/guide/levi-in-april" }
      ]
    },
    breadcrumbLabel: "Spring in Levi"
  },
  nl: {
    meta: {
      title: "Lente in Levi – Lentezon & skiën | Leville.net",
      description: "Complete gids voor de lente in Levi. Lentezon, sneeuwcondities en activiteiten in maart–april. Plan je lentevakantie in Levi.",
      canonical: "https://leville.net/nl/gids/lente-in-levi"
    },
    title: "Lente in Levi",
    subtitle: "Stralende lentezon en de beste ski-omstandigheden",
    intro: "De lente in Levi is een van de beste periodes om te bezoeken. De dagen worden snel langer, de zon verwarmt de pistes en er ligt volop sneeuw. Lenteskiën is een unieke ervaring – terrassen vullen zich met zonnende mensen en de natuur ontwaakt uit de winterslaap.",
    sections: {
      conditions: {
        title: "Lenteomstandigheden",
        stats: [
          { label: "Temperaturen", value: "-10 – +5°C", icon: "temp" },
          { label: "Sneeuwdiepte", value: "80–120 cm", icon: "snow" },
          { label: "Daglengte", value: "12–18 u", icon: "sun" },
          { label: "Pistes open", value: "Tot april", icon: "mountain" }
        ]
      },
      sunshine: {
        title: "De lentezon",
        content: "Vanaf maart worden de dagen snel langer. In april is het al bijna 18 uur licht. De zon verwarmt aangenaam, hoewel de temperatuur nog rond het vriespunt blijft. Skiën in de lentezon is een unieke ervaring – UV-straling is sterk, dus zonnebrandcrème is essentieel."
      },
      activities: {
        title: "Lenteactiviteiten",
        items: [
          { name: "Lenteskiën", desc: "Beste omstandigheden, terrasleven" },
          { name: "Langlaufen", desc: "Loipes in topconditie" },
          { name: "Sneeuwschoenwandelen", desc: "Warm weer, prachtige vergezichten" },
          { name: "IJsvissen", desc: "Nog veilig op het ijs" },
          { name: "Sneeuwscooteren", desc: "Laatste safari's van het seizoen" },
          { name: "Terrasleven", desc: "Genieten van de zon na het skiën" }
        ]
      },
      temperatures: {
        title: "Per maand",
        months: [
          { month: "Begin maart", temp: "-10 – -5°C", desc: "Licht keert terug, nog koud" },
          { month: "Eind maart", temp: "-5 – 0°C", desc: "Lentezon verwarmt" },
          { month: "Begin april", temp: "-5 – +5°C", desc: "Overdag plusgraden" },
          { month: "Eind april", temp: "0 – +10°C", desc: "Sneeuw smelt langzaam" }
        ]
      },
      tips: {
        title: "Tips voor lentebezoekers",
        items: [
          "Zonnebril en zonnebrandcrème zijn essentieel",
          "Kleed je in lagen – temperatuur verschilt in schaduw en zon",
          "Pistes zijn het best 's ochtends vóór ze zacht worden",
          "Reserveer terrastafels vooraf bij populaire spots",
          "Dit is een voordeligere periode dan het hoogseizoen"
        ]
      }
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Hoe lang zijn de pistes open in de lente?", a: "De pistes van Levi zijn doorgaans open tot begin mei. Check de exacte data op de website van Levi." },
        { q: "Is er nog genoeg sneeuw in de lente?", a: "Ja! De lente is vaak de sneeuwrijkste periode in Levi. Er ligt doorgaans 80–120 cm sneeuw." },
        { q: "Wat is de temperatuur in de lente?", a: "In maart meestal -10 tot 0°C, in april al -5 tot +10°C. De zon verwarmt overdag." },
        { q: "Is de lente geschikt voor gezinnen?", a: "Absoluut! Warmer weer en lange dagen maken activiteiten comfortabeler voor kinderen." }
      ]
    },
    cta: {
      hub: "Terug naar Levi-reisgids",
      hubLink: "/nl/levi",
      accommodation: "Boek lenteaccommodatie",
      accommodationLink: "/nl/accommodaties"
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Skiën in Levi", desc: "Pistes open tot mei", href: "/nl/gids/skieen-in-levi" },
        { title: "Langlaufen in Levi", desc: "230+ km loipes – lente is de beste tijd", href: "/nl/gids/langlaufen-in-levi" },
        { title: "Winterkleding", desc: "Wat aantrekken voor lenteskiën", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Maart in Levi", desc: "Lentezon en beste sneeuw", href: "/guide/levi-in-march" },
        { title: "April in Levi", desc: "Hoogtepunt van de lente", href: "/guide/levi-in-april" }
      ]
    },
    breadcrumbLabel: "Lente in Levi"
  }
};

const SpringInLevi = ({ lang = "fi" }: SpringInLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = { fi: "/opas/kevat-levi", en: "/guide/spring-in-levi", nl: "/nl/gids/lente-in-levi" };

  const homeHref = lang === "fi" ? "/" : lang === "nl" ? "/nl" : "/en";
  const leviHref = lang === "fi" ? "/levi" : lang === "nl" ? "/nl/levi" : "/en/levi";
  const seasonsUrl = lang === "fi" ? "/opas/vuodenajat-levi" : lang === "nl" ? "/nl/gids/seizoenen-in-levi" : "/guide/seasons-in-levi";

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: homeHref },
    { label: "Levi", href: leviHref },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    temp: <Thermometer className="w-5 h-5 text-primary" />,
    snow: <Snowflake className="w-5 h-5 text-primary" />,
    sun: <Sun className="w-5 h-5 text-primary" />,
    mountain: <Mountain className="w-5 h-5 text-primary" />
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
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${homeHref}` },
        { name: lang === "fi" ? "Vuodenajat" : "Seizoenen", url: `https://leville.net${seasonsUrl}` },
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

            {/* Spring slopes image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={springSlopesWind} alt={lang === "fi" ? "Levin laskettelurinteet keväällä — lunta riittää huhtikuulle" : "Levi ski slopes in spring — plenty of snow until April"} className="w-full h-64 sm:h-80 md:h-96" priority />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Levin laskettelurinteet kevätauringossa — lunta riittää tunturissa yleensä huhtikuun loppuun asti" : "Levi ski slopes in the spring sun — snow usually lasts on the fell until the end of April"}
              </p>
            </section>

            {/* Stats */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t.sections.conditions.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.sections.conditions.stats.map((stat, idx) => (
                  <Card key={idx} className="glass-card border-border/30 text-center p-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                      {iconMap[stat.icon]}
                    </div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Sunshine */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.sunshine.title}</h2>
              <p className="text-muted-foreground">{t.sections.sunshine.content}</p>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.activities.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.activities.items.map((activity, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{activity.name}</h3>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Laavu outside image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={laavuOutside} alt={lang === "fi" ? "Laavu retkeilyreitin varrella Levillä" : "A laavu shelter along a hiking trail in Levi"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Laavu on avoin tulentekopaikka retkeilijöille — niitä voi käyttää ilmaiseksi ympäri Levin retkeilyreitistöä" : "A laavu is an open-air shelter for hikers — they can be used for free across Levi's trail network"}
              </p>
            </section>

            {/* Laavu inside image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={laavuInside} alt={lang === "fi" ? "Nuotio laavussa kevätretkellä" : "Campfire in a laavu during a spring outing"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Nuotio laavussa kevätretkellä — eväsretki nuotion ääressä kuuluu Lapin retkeilykulttuuriin" : "Campfire in a laavu during a spring outing — a fireside snack break is an essential part of Lapland hiking culture"}
              </p>
            </section>

            {/* Temperatures */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.temperatures.title}</h2>
              <div className="space-y-3">
                {t.sections.temperatures.months.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="w-32 font-medium text-foreground">{item.month}</div>
                    <div className="w-28 text-primary font-medium">{item.temp}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Family at slopes image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={familySlopesBench} alt={lang === "fi" ? "Perhe tauolla laskettelurinteillä Levillä" : "Family taking a break at Levi ski slopes"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Perhe tauolla laskettelurinteiden äärellä — kevätauringossa riittää ihailtavaa tunturimaisemissa" : "A family taking a break by the ski slopes — spring sunshine makes the fell scenery even more stunning"}
              </p>
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

            {/* Après-ski Tuikku image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={apresSkiTuikku} alt={lang === "fi" ? "Après-ski ravintola Tuikun terassilla Levillä" : "Après-ski at restaurant Tuikku terrace in Levi"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Après-ski ravintola Tuikun terassilla — kevätaurinko lämmittää ja tunnelma on katossa Levin huipulla" : "Après-ski at restaurant Tuikku terrace — the spring sun warms and the atmosphere is electric on top of Levi"}
              </p>
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

            <GuideDisclaimer lang={lang} />

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

        <PageCTA lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default SpringInLevi;
