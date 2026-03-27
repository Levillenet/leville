import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getFAQSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Mountain, ExternalLink, MapPin, TrendingUp, Calendar } from "lucide-react";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import SnowDepthChart from "@/components/SnowDepthChart";

import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import ReadNextSection from "@/components/guide/ReadNextSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface LeviSnowReportProps {
  lang?: Language;
}

const year = new Date().getFullYear();

const translations = {
  fi: {
    meta: {
      title: `Levin lumitilanne nyt — lumensyvyys ja latujen kunto ${year}`,
      description: "Lumensyvyys Levillä juuri nyt, latujen kunto ja historiadata Ilmatieteen laitokselta. Tarkista lumitilanne ennen Leville lähtöä.",
      canonical: "https://leville.net/lumitilanne",
    },
    hero: {
      subtitle: "Lumensyvyys Levillä nyt",
      source: "Lähde: Open-Meteo / Ilmatieteen laitos",
      noData: "Ei dataa",
      cm: "cm",
    },
    h1: "Levin lumitilanne",
    trails: {
      title: "Latujen ja rinteiden kunto",
      intro: "Tarkista reaaliaikainen latujen kunto ja rinnetilanne virallisista lähteistä ennen liikkeelle lähtöä.",
      trailMap: "Levin latukartta ja kuntotiedot",
      slopeStatus: "Levin rinnetilanne",
    },
    snowChart: {
      title: "Lumensyvyys eri vuosina",
      intro: "Ilmatieteen laitoksen mittausdata Kittilän mittausasemalta näyttää tyypillisen lumipeitteen kehityksen talvikaudella.",
    },
    comparison: {
      title: "Levi vs Rovaniemi — lumensyvyys",
      intro: "Levillä on tyypillisesti 20–30 cm enemmän lunta kuin Rovaniemellä. Pohjoisempi sijainti ja tunturin läheisyys takaavat paremman lumitilanteen.",
    },
    season: {
      title: "Lumikausi Levillä",
      facts: [
        { icon: "snowflake", label: "Ensimmäinen lumi: lokakuun loppu" },
        { icon: "trending", label: "Paras lumitilanne: helmi–maaliskuu (60–90 cm)" },
        { icon: "calendar", label: "Lumi sulaa: toukokuu" },
        { icon: "mountain", label: "Lumitykit: rinteet avataan jo lokakuussa" },
      ],
    },
    cta: {
      title: "Varaa lumilomasi Levillä",
      text: "Kaikki kohteemme sijaitsevat rinteiden ja latujen välittömässä läheisyydessä. Varaa suoraan meiltä ja saat parhaan hinnan.",
      button: "Katso vapaat majoitukset →",
      secondary: "Kysy tarjous majoitus + hissiliput -paketista!",
      phone: "+358 44 13 13 13",
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Kuinka paljon lunta Levillä on nyt?",
          a: "Ajankohtainen lumensyvyys näkyy tämän sivun yläosassa reaaliajassa. Data tulee Ilmatieteen laitokselta.",
        },
        {
          q: "Milloin Levillä on parhaiten lunta?",
          a: "Paras lumitilanne on tyypillisesti helmikuun lopusta maaliskuun loppuun, jolloin lumensyvyys on 60–90 cm. Huhtikuussa lunta on vielä runsaasti ja aurinko paistaa.",
        },
        {
          q: "Onko Levillä lunta jouluna?",
          a: "Kyllä, Levillä on lähes aina lunta joulun aikaan. Tyypillisesti lumensyvyys joulukuussa on 40–70 cm. Lumitykit takaavat rinteiden toiminnan myös vähälumisina vuosina.",
        },
        {
          q: "Mistä näen latujen kunnon?",
          a: "Levin virallinen latupalvelu löytyy osoitteesta infogis.fi/levi. Sieltä näet reaaliaikaisesti kunnostetut ladut ja niiden kunnon.",
        },
      ],
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Säätietoa Leviltä", desc: "Lämpötilat ja olosuhteet", href: "/levi/saatieto-levilta" },
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
        { title: "Hiihtoladut Levillä", desc: "230 km huollettuja latuja", href: "/opas/hiihtoladut-levi" },
        { title: "Paras aika matkustaa Leville", desc: "Mikä kuukausi sopii sinulle", href: "/opas/paras-aika-matkustaa-leville" },
      ],
    },
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Levi", href: "/levi" },
      { label: "Lumitilanne", href: "/lumitilanne" },
    ],
  },
  en: {
    meta: {
      title: `Levi Snow Report — Current Snow Depth & Conditions ${year}`,
      description: "Current snow depth in Levi, ski trail conditions, and historical snowfall data from FMI. Check conditions before your trip.",
      canonical: "https://leville.net/en/snowreport",
    },
    hero: {
      subtitle: "Snow depth in Levi now",
      source: "Source: Open-Meteo / Finnish Meteorological Institute",
      noData: "No data",
      cm: "cm",
    },
    h1: "Levi Snow Report",
    trails: {
      title: "Trail & Slope Conditions",
      intro: "Check real-time trail conditions and slope status from official sources before heading out.",
      trailMap: "Levi trail map and conditions",
      slopeStatus: "Levi slope status",
    },
    snowChart: {
      title: "Snow Depth by Year",
      intro: "Measurement data from the Finnish Meteorological Institute shows typical snow cover development during winter season.",
    },
    comparison: {
      title: "Levi vs Rovaniemi — Snow Depth",
      intro: "Levi typically has 20–30 cm more snow than Rovaniemi. Its northern location and proximity to the fells ensure better snow conditions.",
    },
    season: {
      title: "Snow Season in Levi",
      facts: [
        { icon: "snowflake", label: "First snow: late October" },
        { icon: "trending", label: "Peak snow: Feb–Mar (60–90 cm)" },
        { icon: "calendar", label: "Snow melts: May" },
        { icon: "mountain", label: "Snow cannons: slopes open in October" },
      ],
    },
    cta: {
      title: "Book Your Snow Holiday in Levi",
      text: "All our properties are located next to slopes and ski trails. Book directly with us for the best price.",
      button: "Check Available Accommodation →",
      secondary: "Ask about accommodation + ski pass packages!",
      phone: "+358 44 13 13 13",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How much snow is there in Levi now?",
          a: "Current snow depth is shown at the top of this page in real time. Data comes from the Finnish Meteorological Institute.",
        },
        {
          q: "When does Levi have the most snow?",
          a: "Peak snow conditions are typically from late February to late March, with 60–90 cm of snow. April still has plenty of snow with sunshine.",
        },
        {
          q: "Does Levi have snow at Christmas?",
          a: "Yes, Levi almost always has snow at Christmas. Typical December snow depth is 40–70 cm. Snow cannons ensure slopes operate even in low-snow years.",
        },
        {
          q: "Where can I check trail conditions?",
          a: "Levi's official trail service is at infogis.fi/levi. You can see real-time groomed trails and their conditions.",
        },
      ],
    },
    readNext: {
      title: "Read Also",
      links: [
        { title: "Weather in Levi", desc: "Temperatures and conditions", href: "/en/levi/weather-in-levi" },
        { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
        { title: "Cross-Country Skiing", desc: "230 km groomed trails", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Best Time to Visit Levi", desc: "Which month suits you", href: "/guide/best-time-to-visit-levi" },
      ],
    },
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Levi", href: "/en/levi" },
      { label: "Snow Report", href: "/en/snowreport" },
    ],
  },
};

const factIcons: Record<string, React.ReactNode> = {
  snowflake: <Snowflake className="w-6 h-6 text-primary" />,
  trending: <TrendingUp className="w-6 h-6 text-primary" />,
  calendar: <Calendar className="w-6 h-6 text-primary" />,
  mountain: <Mountain className="w-6 h-6 text-primary" />,
};

const LeviSnowReport = ({ lang = "fi" }: LeviSnowReportProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const [snowDepth, setSnowDepth] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchTime, setFetchTime] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=67.6603&longitude=24.9076&current=temperature_2m,weather_code,snow_depth&timezone=Europe%2FHelsinki"
        );
        const data = await res.json();
        if (data.current) {
          setSnowDepth(Math.round((data.current.snow_depth || 0) * 100));
          setTemperature(data.current.temperature_2m);
          setFetchTime(
            new Date(data.current.time).toLocaleString(lang === "fi" ? "fi-FI" : "en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lang]);

  const hreflangUrls = {
    fi: "https://leville.net/lumitilanne",
    en: "https://leville.net/en/snowreport",
  };

  const faqSchema = getFAQSchema(t.faq.items.map((item) => ({ question: item.q, answer: item.a })));

  return (
    <div className="min-h-screen bg-background text-foreground">
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>

      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={faqSchema} />

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />

      {/* Hero — The Big Number */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-background dark:from-sky-950 dark:via-sky-900/30 dark:to-background pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-28 w-48 rounded-xl" />
              <Skeleton className="h-6 w-64" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-6 mb-4">
                <div>
                  <span className="text-8xl sm:text-9xl font-black tracking-tight text-primary leading-none">
                    {snowDepth !== null ? snowDepth : "—"}
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-primary ml-2">{t.hero.cm}</span>
                </div>
                {temperature !== null && (
                  <div className="text-2xl sm:text-3xl font-semibold text-muted-foreground">
                    {temperature > 0 ? "+" : ""}
                    {temperature}°C
                  </div>
                )}
              </div>
              <p className="text-lg font-medium text-foreground/80 mb-2">{t.hero.subtitle}</p>
              <p className="text-xs text-foreground/60">
                {t.hero.source} · {fetchTime}
              </p>
            </>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <Breadcrumbs items={t.breadcrumbs} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{t.h1}</h1>

          {/* Section 1: Trail & Slope Conditions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{t.trails.title}</h2>
            <p className="text-muted-foreground mb-4">{t.trails.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://www.infogis.fi/levi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium">{t.trails.trailMap}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
              </a>
              <a
                href="https://www.levi.fi/rinteet-ja-ladut/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <Mountain className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium">{t.trails.slopeStatus}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
              </a>
            </div>
          </section>

          {/* Section 2: Snow Depth Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{t.snowChart.title}</h2>
            <p className="text-muted-foreground mb-6">{t.snowChart.intro}</p>
            <SnowDepthChart lang={lang} />
          </section>


          {/* Section 4: Snow Season Facts */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.season.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.season.facts.map((fact, idx) => (
                <Card key={idx}>
                  <CardContent className="flex items-center gap-4 p-5">
                    {factIcons[fact.icon]}
                    <span className="font-medium">{fact.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 5: Booking CTA */}
          <section className="mb-12 rounded-2xl bg-gradient-to-br from-sky-100 to-primary/10 dark:from-sky-950/50 dark:to-primary/10 border border-border p-8 text-center">
            <Snowflake className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">{t.cta.title}</h2>
            <p className="text-foreground/70 mb-6 max-w-xl mx-auto">{t.cta.text}</p>
            <Button asChild size="lg" className="mb-4">
              <a href="https://app.moder.fi/levillenet" target="_blank" rel="noopener noreferrer">
                {t.cta.button}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">{t.cta.secondary}</p>
            <p className="text-sm font-medium mt-1">
              <a href={`tel:${t.cta.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                {t.cta.phone}
              </a>
            </p>
          </section>

          {/* Section 6: FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.faq.title}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.faq.items.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="border border-border/30 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
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

          {/* Section 7: Related Links */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default LeviSnowReport;
