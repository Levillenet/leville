import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, MapPin, Clock, Euro, Users, ArrowRight, Snowflake, Star, Cable } from "lucide-react";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SkiingInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Laskettelu Levillä – Rinteet, hissit ja vinkit | Leville.net",
      description: "Kattava opas Levin lasketteluun. 43 rinnettä, 28 hissiä, rinteiden vaikeustasot ja vinkit laskettelijoille. Suunnittele laskettelulomasi Leville.",
      canonical: "https://leville.net/opas/laskettelu-levi"
    },
    title: "Laskettelu Levillä",
    subtitle: "Suomen suosituin hiihtokeskus – 43 rinnettä ja 28 hissiä",
    intro: "Levi on Suomen suurin ja suosituin hiihtokeskus. Moderni hissijärjestelmä, monipuoliset rinteet kaikille tasoille ja yli 200 laskettelupäivää kaudessa tekevät Levistä täydellisen kohteen laskettelulomalle. Kausi kestää tyypillisesti marraskuusta toukokuuhun.",
    sections: {
      overview: {
        title: "Levin laskettelukeskus",
        stats: [
          { label: "Rinteitä", value: "43", icon: "mountain" },
          { label: "Hissejä", value: "28", icon: "cable" },
          { label: "Korkeusero", value: "325 m", icon: "arrow" },
          { label: "Pisimmät rinteet", value: "2 500 m", icon: "route" }
        ]
      },
      slopes: {
        title: "Rinteet ja vaikeustasot",
        intro: "Levin rinteet tarjoavat haasteita kaikentasoisille laskettelijoille:",
        levels: [
          { name: "Vihreät (aloittelijat)", count: "9 rinnettä", desc: "Loivat ja leveät rinteet opetteluun" },
          { name: "Siniset (keskitaso)", count: "17 rinnettä", desc: "Sopiva haaste harrastelijoille" },
          { name: "Punaiset (edistyneet)", count: "10 rinnettä", desc: "Jyrkemmät ja teknisemmät rinteet" },
          { name: "Mustat (ekspertit)", count: "7 rinnettä", desc: "Vaativimmat rinteet kokeneille" }
        ]
      },
      tips: {
        title: "Vinkit laskettelijoille",
        items: [
          "Osta hissilippu etukäteen verkosta – säästät aikaa ja rahaa",
          "Vältä ruuhkia: laskettele aamulla tai iltapäivällä",
          "Vuokraa välineet paikan päältä – laaja valikoima",
          "Tutustu rinteiden kuntoon LiveCam-palvelusta ennen lähtöä",
          "Varaudu pakkaseen – tauota laskettelua kahviloissa"
        ]
      },
      lifts: {
        title: "Hissijärjestelmä",
        content: "Levin moderni hissijärjestelmä sisältää gondolihissin, useita tuolihissejä ja ankkurihissejä. Gondolihissi vie sinut tunturin huipulle vain muutamassa minuutissa. Hissien kapasiteetti on yli 30 000 henkilöä tunnissa."
      },
      passes: {
        title: "Hissiliput",
        content: "Hissilippuja on saatavilla tuntilipuista koko kauden lippuihin. Suosituimpia ovat päivä- ja viikkoliput. Lapsiperheille on tarjolla edullisia paketteja."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Milloin Levin rinteet aukeavat?",
          a: "Levin kausi alkaa tyypillisesti marraskuun alussa ja päättyy toukokuun alussa. Tarkista aukioloajat Levin virallisilta sivuilta."
        },
        {
          q: "Voinko vuokrata lasketteluvälineet Leviltä?",
          a: "Kyllä, Levillä on useita välinevuokraamoja. Varaa välineet etukäteen sesonkiaikaan."
        },
        {
          q: "Onko Levi sopiva aloittelijoille?",
          a: "Ehdottomasti! Levillä on 9 vihreää rinnettä aloittelijoille ja laskettelukouluja kaikille ikäryhmille."
        },
        {
          q: "Miten pääsen Levin rinteille?",
          a: "Kittilän lentokenttä on vain 15 minuutin päässä Leviltä. Lentoja Helsinki-Kittilä on useita päivässä."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa majoitus Leviltä",
      accommodationLink: "/majoitukset"
    },
    breadcrumbLabel: "Laskettelu Levillä"
  },
  en: {
    meta: {
      title: "Skiing in Levi – Slopes, Lifts & Tips | Leville.net",
      description: "Complete guide to skiing in Levi. 43 slopes, 28 lifts, difficulty levels and tips for skiers. Plan your ski holiday in Levi, Finnish Lapland.",
      canonical: "https://leville.net/guide/skiing-in-levi"
    },
    title: "Skiing in Levi",
    subtitle: "Finland's most popular ski resort – 43 slopes and 28 lifts",
    intro: "Levi is Finland's largest and most popular ski resort. A modern lift system, diverse slopes for all skill levels, and over 200 skiing days per season make Levi the perfect destination for a ski holiday. The season typically runs from November to May.",
    sections: {
      overview: {
        title: "Levi Ski Resort",
        stats: [
          { label: "Slopes", value: "43", icon: "mountain" },
          { label: "Lifts", value: "28", icon: "cable" },
          { label: "Vertical drop", value: "325 m", icon: "arrow" },
          { label: "Longest runs", value: "2,500 m", icon: "route" }
        ]
      },
      slopes: {
        title: "Slopes and Difficulty Levels",
        intro: "Levi's slopes offer challenges for skiers of all levels:",
        levels: [
          { name: "Green (beginners)", count: "9 slopes", desc: "Gentle and wide slopes for learning" },
          { name: "Blue (intermediate)", count: "17 slopes", desc: "Suitable challenge for recreational skiers" },
          { name: "Red (advanced)", count: "10 slopes", desc: "Steeper and more technical slopes" },
          { name: "Black (experts)", count: "7 slopes", desc: "Most demanding slopes for experienced skiers" }
        ]
      },
      tips: {
        title: "Tips for Skiers",
        items: [
          "Buy your lift pass online in advance – save time and money",
          "Avoid crowds: ski in the morning or late afternoon",
          "Rent equipment on site – wide selection available",
          "Check slope conditions via LiveCam before heading out",
          "Prepare for cold weather – take breaks in mountain cafés"
        ]
      },
      lifts: {
        title: "Lift System",
        content: "Levi's modern lift system includes a gondola, several chairlifts, and T-bar lifts. The gondola takes you to the summit in just a few minutes. The lift capacity exceeds 30,000 people per hour."
      },
      passes: {
        title: "Lift Passes",
        content: "Lift passes are available from hourly to full-season passes. Day and week passes are most popular. Families can find affordable package deals."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "When does the Levi ski season start?",
          a: "The Levi season typically begins in early November and ends in early May. Check opening times on Levi's official website."
        },
        {
          q: "Can I rent ski equipment in Levi?",
          a: "Yes, Levi has several equipment rental shops. Book in advance during peak season."
        },
        {
          q: "Is Levi suitable for beginners?",
          a: "Absolutely! Levi has 9 green slopes for beginners and ski schools for all age groups."
        },
        {
          q: "How do I get to Levi?",
          a: "Kittilä airport is just 15 minutes from Levi. There are several daily flights from Helsinki to Kittilä."
        }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book accommodation in Levi",
      accommodationLink: "/en/accommodations"
    },
    breadcrumbLabel: "Skiing in Levi"
  }
};

const SkiingInLevi = ({ lang = "fi" }: SkiingInLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls = lang === "fi" 
    ? { fi: "/opas/laskettelu-levi", en: "/guide/skiing-in-levi" }
    : { en: "/guide/skiing-in-levi", fi: "/opas/laskettelu-levi" };

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : "/en" },
    { label: lang === "fi" ? "Levi" : "Levi", href: lang === "fi" ? "/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

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
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
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
                {t.sections.overview.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.sections.overview.stats.map((stat, idx) => (
                  <Card key={idx} className="glass-card border-border/30 text-center p-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                      {stat.icon === "mountain" && <Mountain className="w-5 h-5 text-primary" />}
                      {stat.icon === "cable" && <Cable className="w-5 h-5 text-primary" />}
                      {stat.icon === "arrow" && <ArrowRight className="w-5 h-5 text-primary rotate-[-90deg]" />}
                      {stat.icon === "route" && <MapPin className="w-5 h-5 text-primary" />}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Slopes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.slopes.title}</h2>
              <p className="text-muted-foreground mb-6">{t.sections.slopes.intro}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.slopes.levels.map((level, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{level.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{level.count}</p>
                    <p className="text-sm text-muted-foreground">{level.desc}</p>
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

            {/* Lift System */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.lifts.title}</h2>
              <p className="text-muted-foreground">{t.sections.lifts.content}</p>
            </section>

            {/* Lift Passes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.passes.title}</h2>
              <p className="text-muted-foreground">{t.sections.passes.content}</p>
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
      </div>
    </>
  );
};

export default SkiingInLevi;
