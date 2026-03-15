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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, MapPin, Clock, Euro, Users, ArrowRight, Snowflake, Star, Cable } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import sunsetSlopesTykky from "@/assets/seasons/sunset-slopes-tykky.jpg";
import frontSlopesSpring from "@/assets/seasons/front-slopes-spring.jpg";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
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
    intro: "Levi on Suomen suurin ja suosituin hiihtokeskus. Moderni hissijärjestelmä, monipuoliset rinteet kaikille tasoille ja yli 200 laskettelupäivää kaudessa tekevät Levistä täydellisen kohteen laskettelulomalle. Kausi kestää tyypillisesti lokakuusta toukokuuhun.",
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
        content: "Levin moderni hissijärjestelmä sisältää useita erilaisia hissejä. Gondolihissi vie sinut tunturin huipulle vain muutamassa minuutissa, ja Leevilandiassa on lapsille sopivia hissejä. Hissien kapasiteetti on yli 30 000 henkilöä tunnissa."
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
          a: "Levin kausi alkaa tyypillisesti lokakuun alussa tykkilumella ja ensilumen ladulla, ja päättyy toukokuun alussa. Tarkista aukioloajat Levin virallisilta sivuilta."
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
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talvi Levillä", desc: "Kaamos, lumi ja aktiviteetit marraskuusta maaliskuuhun", href: "/opas/talvi-levi" },
        { title: "Hiihto Levillä", desc: "Yli 230 km huollettuja latuja", href: "/opas/hiihtoladut-levi" },
        { title: "Sää ja lumitilanne", desc: "Lämpötilat ja olosuhteet kuukausittain", href: "/levi/saatieto-levilta" },
        { title: "Talvivarusteet", desc: "Pukeutumisvinkit Levin pakkasiin", href: "/opas/talvivarusteet-leville" },
        { title: "Parhaat talviaktiviteetit", desc: "Kattava opas Levin talveen", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Liikkuminen Levillä", desc: "Skibussit, taksit ja autonvuokraus", href: "/opas/liikkuminen-levilla" }
      ]
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
    intro: "Levi is Finland's largest and most popular ski resort. A modern lift system, diverse slopes for all skill levels, and over 200 skiing days per season make Levi the perfect destination for a ski holiday. The season typically runs from October to May.",
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
        content: "Levi's modern lift system includes various types of lifts. The gondola takes you to the summit in just a few minutes, and Leevilandia has child-friendly lifts. The lift capacity exceeds 30,000 people per hour."
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
          a: "The Levi season typically begins in early October with machine-made snow and the first snow track, and ends in early May. Check opening times on Levi's official website."
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
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter in Levi", desc: "Polar night, snow and winter activities", href: "/guide/winter-in-levi" },
        { title: "Cross-Country Skiing", desc: "Over 230 km of groomed trails", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Weather in Levi", desc: "Temperatures and conditions by month", href: "/en/levi/weather-in-levi" },
        { title: "Winter Clothing Guide", desc: "How to dress for Levi's frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Top Winter Activities", desc: "Complete guide to Levi winter", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Getting Around Levi", desc: "Ski buses, taxis and car rental", href: "/guide/getting-around-in-levi" }
      ]
    },
    breadcrumbLabel: "Skiing in Levi"
  },
  nl: {
    meta: {
      title: "Skiën in Levi – Pistes, Liften & Tips | Leville.net",
      description: "Complete gids voor skiën in Levi. 43 pistes, 28 liften, moeilijkheidsgraden en tips voor skiërs. Plan uw skivakantie in Levi, Fins Lapland.",
      canonical: "https://leville.net/nl/gids/skieen-in-levi"
    },
    title: "Skiën in Levi",
    subtitle: "Het populairste skigebied van Finland – 43 pistes en 28 liften",
    intro: "Levi is het grootste en populairste skigebied van Finland. Een modern liftensysteem, gevarieerde pistes voor alle niveaus en meer dan 200 skidagen per seizoen maken Levi de perfecte bestemming voor een skivakantie. Het seizoen loopt doorgaans van oktober tot mei.",
    sections: {
      overview: {
        title: "Skigebied Levi",
        stats: [
          { label: "Pistes", value: "43", icon: "mountain" },
          { label: "Liften", value: "28", icon: "cable" },
          { label: "Hoogteverschil", value: "325 m", icon: "arrow" },
          { label: "Langste afdaling", value: "2.500 m", icon: "route" }
        ]
      },
      slopes: {
        title: "Pistes en Moeilijkheidsgraden",
        intro: "De pistes van Levi bieden uitdaging voor skiërs van alle niveaus:",
        levels: [
          { name: "Groen (beginners)", count: "9 pistes", desc: "Zachte en brede pistes om te leren" },
          { name: "Blauw (gemiddeld)", count: "17 pistes", desc: "Geschikte uitdaging voor recreatieve skiërs" },
          { name: "Rood (gevorderd)", count: "10 pistes", desc: "Steilere en technischere pistes" },
          { name: "Zwart (experts)", count: "7 pistes", desc: "De meest veeleisende pistes voor ervaren skiërs" }
        ]
      },
      tips: {
        title: "Tips voor Skiërs",
        items: [
          "Koop uw skipas online van tevoren – bespaar tijd en geld",
          "Vermijd drukte: ski 's ochtends of laat in de middag",
          "Huur uitrusting ter plaatse – ruime keuze beschikbaar",
          "Controleer de pistecondities via LiveCam voor vertrek",
          "Bereid u voor op de kou – neem pauze in bergcafés"
        ]
      },
      lifts: {
        title: "Liftensysteem",
        content: "Het moderne liftensysteem van Levi omvat diverse soorten liften. De gondel brengt u in slechts enkele minuten naar de top, en Leevilandia heeft kindvriendelijke liften. De liftcapaciteit bedraagt meer dan 30.000 personen per uur."
      },
      passes: {
        title: "Skipassen",
        content: "Skipassen zijn beschikbaar van uurpassen tot seizoenpassen. Dag- en weekpassen zijn het populairst. Gezinnen kunnen voordelige pakketdeals vinden."
      }
    },
    faq: {
      title: "Veelgestelde Vragen",
      items: [
        {
          q: "Wanneer begint het skiseizoen in Levi?",
          a: "Het seizoen in Levi begint doorgaans begin oktober met kunstsneeuw en het eerste sneeuwspoor, en eindigt begin mei. Controleer de openingstijden op de officiële website van Levi."
        },
        {
          q: "Kan ik ski-uitrusting huren in Levi?",
          a: "Ja, Levi heeft verschillende verhuurwinkels. Boek van tevoren tijdens het hoogseizoen."
        },
        {
          q: "Is Levi geschikt voor beginners?",
          a: "Absoluut! Levi heeft 9 groene pistes voor beginners en skischolen voor alle leeftijdsgroepen."
        },
        {
          q: "Hoe kom ik in Levi?",
          a: "De luchthaven van Kittilä ligt op slechts 15 minuten van Levi. Er zijn dagelijks meerdere vluchten van Helsinki naar Kittilä."
        }
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
        { title: "Cross-Country Skiing", desc: "Over 230 km of groomed trails", href: "/guide/cross-country-skiing-in-levi" },
        { title: "Winter Clothing Guide", desc: "How to dress for Levi's frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Top Winter Activities", desc: "Complete guide to Levi winter", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Getting Around Levi", desc: "Ski buses, taxis and car rental", href: "/guide/getting-around-in-levi" }
      ]
    },
    breadcrumbLabel: "Skiën in Levi"
  }
};

const SkiingInLevi = ({ lang = "fi" }: SkiingInLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/laskettelu-levi",
    en: "/guide/skiing-in-levi",
    nl: "/nl/gids/skieen-in-levi"
  };

  const homeLabels: Record<string, string> = { fi: "Etusivu", en: "Home", nl: "Home" };
  const homeLinks: Record<string, string> = { fi: "/", en: "/en", nl: "/nl" };
  const leviLinks: Record<string, string> = { fi: "/levi", en: "/en/levi", nl: "/nl/levi" };

  const breadcrumbItems = [
    { label: homeLabels[lang] || "Etusivu", href: homeLinks[lang] || "/" },
    { label: "Levi", href: leviLinks[lang] || "/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.title, description: t.meta.description, url: t.meta.canonical, lang })} />
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

            {/* Sunset slopes image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={sunsetSlopesTykky} alt={lang === "fi" ? "Laskettelu auringonlaskussa tykkylumisten puiden keskellä Levin tunturilla" : "Skiing at sunset among snow-laden tykky trees on Levi fell"} className="w-full h-64 sm:h-80 md:h-96 object-cover" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Laskettelu auringonlaskussa tykkylumisten puiden keskellä — Levin rinteiltä avautuvat henkeäsalpaavat näkymät erityisesti marraskuussa ja joulukuussa" : "Skiing at sunset among snow-laden tykky trees — the slopes of Levi offer breathtaking views especially in November and December"}
              </p>
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

export default SkiingInLevi;
