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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Moon, Thermometer, Mountain, ArrowRight, Star, Sparkles } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import winterSunset from "@/assets/seasons/winter-sunset.jpg";
import tykkyTrees from "@/assets/seasons/tykky-trees.jpg";
import tykkyKaamos from "@/assets/seasons/tykky-kaamos.jpg";
import nightTrailTykky from "@/assets/seasons/night-trail-tykky.jpg";
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

interface WinterInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Talvi Levillä – Kaamos, lumi ja aktiviteetit | Leville.net",
      description: "Kattava opas Levin talveen. Kaamoksen tunnelma, lumitilanne, lämpötilat ja talviaktiviteetit marraskuusta maaliskuuhun. Suunnittele talvilomasi Leville.",
      canonical: "https://leville.net/opas/talvi-levi"
    },
    title: "Talvi Levillä",
    subtitle: "Luminen taikaa ja arktista rauhaa marraskuusta maaliskuuhun",
    intro: "Levin talvi on ainutlaatuinen kokemus. Kaamos tuo mystisen sinisen valon, rinteet täyttyvät lumesta ja revontulet tanssivat taivaalla. Talvikausi kestää marraskuusta maaliskuuhun, ja tarjoaa unohtumattomia elämyksiä laskettelusta revontulisafareihin.",
    sections: {
      conditions: {
        title: "Talviolosuhteet",
        stats: [
          { label: "Lämpötilat", value: "-5 – -35°C", icon: "temp" },
          { label: "Lumisyvyys", value: "60–120 cm", icon: "snow" },
          { label: "Kaamos", value: "Joulu-tammikuu", icon: "moon" },
          { label: "Laskettelukausi", value: "200+ päivää", icon: "mountain" }
        ]
      },
      kaamos: {
        title: "Kaamoksen aika",
        content: "Kaamos kestää Levillä noin kuukauden joulukuusta tammikuuhun, jolloin aurinko ei nouse horisontin yläpuolelle. Tämä ei tarkoita täyttä pimeyttä – päivisin vallitsee kaunis sininen valo, ja kirkkaat öt tarjoavat parhaat mahdollisuudet revontulien näkemiseen. Kaamoksen mystinen tunnelma on yksi Lapin vetonauloista."
      },
      activities: {
        title: "Talviaktiviteetit",
        items: [
          { name: "Laskettelu ja lumilautailu", desc: "43 rinnettä ja 28 hissiä" },
          { name: "Murtomaahiihto", desc: "230 km huollettuja latuja" },
          { name: "Moottorikelkkasafarit", desc: "Opastetut retket tunturiin" },
          { name: "Husky- ja porosafari", desc: "Ainutlaatuisia elämyksiä" },
          { name: "Revontulien metsästys", desc: "Parhaat mahdollisuudet" },
          { name: "Lumikenkäily", desc: "Rauhallinen luontokokemus" }
        ]
      },
      temperatures: {
        title: "Lämpötilat kuukausittain",
        months: [
          { month: "Marraskuu", temp: "-5 – -15°C", desc: "Ensimmäinen lumi, kausi alkaa" },
          { month: "Joulukuu", temp: "-10 – -25°C", desc: "Kaamos, luminen maisema" },
          { month: "Tammikuu", temp: "-15 – -35°C", desc: "Kylmimmät päivät, revontulet" },
          { month: "Helmikuu", temp: "-10 – -30°C", desc: "Valoa palaa, pakkaset jatkuvat" },
          { month: "Maaliskuu", temp: "-5 – -20°C", desc: "Kevätaurinko, lunta runsaasti" }
        ]
      },
      tips: {
        title: "Vinkit talvimatkailijalle",
        items: [
          "Pukeudu kerroksittain – aluskerros, välikerros, ulkokerros",
          "Suojaa kasvot ja sormet kovalla pakkasella",
          "Varaa aktiviteetit etukäteen sesonkiaikaan",
          "Ota mukaan taskulamppu pimeään aikaan",
          "Tutustu revontuliennusteisiin – parhaat illat ovat kirkkaita"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Miten kylmää Levillä on talvella?",
          a: "Lämpötilat vaihtelevat -5°C:sta jopa -35°C:seen. Tyypillisesti joulu-helmikuussa on -15 – -25°C."
        },
        {
          q: "Onko Levillä lunta jouluna?",
          a: "Kyllä, Levillä on tyypillisesti 50–80 cm lunta joulun aikaan. Lumitilanne on lähes aina taattu."
        },
        {
          q: "Milloin on paras aika nähdä revontulia?",
          a: "Revontulikausi kestää syyskuusta maaliskuuhun. Parhaat mahdollisuudet ovat kirkkaana pakkasyönä."
        },
        {
          q: "Sopiiko Levi lapsiperheille talvella?",
          a: "Ehdottomasti! Levillä on laskettelukouluja lapsille, perheystävällisiä aktiviteetteja ja paljon tekemistä koko perheelle."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa talvimajoitus",
      accommodationLink: "/majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
        { title: "Revontulet", desc: "Revontulien bongausopas", href: "/revontulet" },
        { title: "Talvivarusteet", desc: "Pukeutumisvinkit pakkaseen", href: "/opas/talvivarusteet-leville" },
        { title: "Marraskuu Levillä", desc: "Kaamos alkaa, ensimmäiset rinteet aukeavat", href: "/opas/levi-marraskuussa" },
        { title: "Joulukuu Levillä", desc: "Joulukausi ja tähtitaivas", href: "/opas/levi-joulukuussa" },
        { title: "Tammikuu Levillä", desc: "Kaamoksen taika ja revontulet", href: "/opas/levi-tammikuussa" },
        { title: "Helmikuu Levillä", desc: "Valo palaa ja hiihtokausi alkaa", href: "/opas/levi-helmikuussa" },
        { title: "Maaliskuu Levillä", desc: "Kevätaurinko ja parhaat lumikelit", href: "/opas/levi-maaliskuussa" }
      ]
    },
    breadcrumbLabel: "Talvi Levillä"
  },
  en: {
    meta: {
      title: "Winter in Levi – Polar Night, Snow & Activities | Leville.net",
      description: "Complete guide to winter in Levi. Polar night atmosphere, snow conditions, temperatures and winter activities from November to March. Plan your winter holiday in Levi.",
      canonical: "https://leville.net/guide/winter-in-levi"
    },
    title: "Winter in Levi",
    subtitle: "Snowy magic and arctic tranquility from November to March",
    intro: "Winter in Levi is a unique experience. The polar night brings mystical blue light, slopes fill with snow, and the Northern Lights dance across the sky. The winter season runs from November to March, offering unforgettable experiences from skiing to aurora safaris.",
    sections: {
      conditions: {
        title: "Winter Conditions",
        stats: [
          { label: "Temperatures", value: "-5 – -35°C", icon: "temp" },
          { label: "Snow depth", value: "60–120 cm", icon: "snow" },
          { label: "Polar night", value: "Dec–Jan", icon: "moon" },
          { label: "Ski season", value: "200+ days", icon: "mountain" }
        ]
      },
      kaamos: {
        title: "The Polar Night",
        content: "The polar night (kaamos) lasts about a month in Levi from December to January, when the sun doesn't rise above the horizon. This doesn't mean complete darkness – during the day there's beautiful blue light, and clear nights offer the best opportunities for seeing the Northern Lights. The mystical atmosphere of the polar night is one of Lapland's main attractions."
      },
      activities: {
        title: "Winter Activities",
        items: [
          { name: "Skiing and snowboarding", desc: "43 slopes and 28 lifts" },
          { name: "Cross-country skiing", desc: "230 km of groomed trails" },
          { name: "Snowmobile safaris", desc: "Guided tours into the fells" },
          { name: "Husky and reindeer safaris", desc: "Unique experiences" },
          { name: "Northern Lights hunting", desc: "Best opportunities" },
          { name: "Snowshoeing", desc: "Peaceful nature experience" }
        ]
      },
      temperatures: {
        title: "Monthly Temperatures",
        months: [
          { month: "November", temp: "-5 – -15°C", desc: "First snow, season begins" },
          { month: "December", temp: "-10 – -25°C", desc: "Polar night, snowy landscape" },
          { month: "January", temp: "-15 – -35°C", desc: "Coldest days, Northern Lights" },
          { month: "February", temp: "-10 – -30°C", desc: "Light returns, frost continues" },
          { month: "March", temp: "-5 – -20°C", desc: "Spring sun, plenty of snow" }
        ]
      },
      tips: {
        title: "Tips for Winter Travelers",
        items: [
          "Dress in layers – base layer, mid layer, outer layer",
          "Protect your face and fingers in severe cold",
          "Book activities in advance during peak season",
          "Bring a flashlight for dark hours",
          "Check aurora forecasts – best nights are clear"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How cold does it get in Levi in winter?",
          a: "Temperatures range from -5°C to as low as -35°C. Typically December-February sees -15 to -25°C."
        },
        {
          q: "Is there snow in Levi at Christmas?",
          a: "Yes, Levi typically has 50–80 cm of snow at Christmas time. Snow is almost always guaranteed."
        },
        {
          q: "When is the best time to see Northern Lights?",
          a: "The aurora season runs from September to March. Best chances are on clear, cold nights."
        },
        {
          q: "Is Levi suitable for families in winter?",
          a: "Absolutely! Levi has ski schools for children, family-friendly activities, and plenty to do for the whole family."
        }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book winter accommodation",
      accommodationLink: "/en/accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
        { title: "Northern Lights", desc: "Aurora viewing guide", href: "/en/northern-lights" },
        { title: "Winter Clothing Guide", desc: "How to dress for the frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "November in Levi", desc: "Polar night begins, first slopes open", href: "/guide/levi-in-november" },
        { title: "December in Levi", desc: "Christmas season and starry skies", href: "/guide/levi-in-december" },
        { title: "January in Levi", desc: "Polar night magic and northern lights", href: "/guide/levi-in-january" },
        { title: "February in Levi", desc: "Light returns and ski season begins", href: "/guide/levi-in-february" },
        { title: "March in Levi", desc: "Spring sun and best snow conditions", href: "/guide/levi-in-march" }
      ]
    },
    breadcrumbLabel: "Winter in Levi"
  },
  nl: {
    meta: {
      title: "Winter in Levi – Poolnacht, sneeuw & activiteiten | Leville.net",
      description: "Complete gids voor de winter in Levi. Poolnacht, sneeuwcondities, temperaturen en winteractiviteiten van november tot maart.",
      canonical: "https://leville.net/nl/gids/winter-in-levi"
    },
    title: "Winter in Levi",
    subtitle: "Besneeuwd sprookje en arctische rust van november tot maart",
    intro: "De winter in Levi is een unieke ervaring. De poolnacht brengt mystiek blauw licht, de pistes vullen zich met sneeuw en het noorderlicht danst aan de hemel. Het winterseizoen loopt van november tot maart en biedt onvergetelijke ervaringen van skiën tot noorderlicht-safari's.",
    sections: {
      conditions: {
        title: "Winteromstandigheden",
        stats: [
          { label: "Temperaturen", value: "-5 – -35°C", icon: "temp" },
          { label: "Sneeuwdiepte", value: "60–120 cm", icon: "snow" },
          { label: "Poolnacht", value: "Dec–jan", icon: "moon" },
          { label: "Skiseizoen", value: "200+ dagen", icon: "mountain" }
        ]
      },
      kaamos: {
        title: "De poolnacht",
        content: "De poolnacht (kaamos) duurt ongeveer een maand in Levi, van december tot januari, wanneer de zon niet boven de horizon uitkomt. Dit betekent geen volledige duisternis – overdag is er prachtig blauw licht en heldere nachten bieden de beste kansen om het noorderlicht te zien. De mystieke sfeer van de poolnacht is een van de grootste attracties van Lapland."
      },
      activities: {
        title: "Winteractiviteiten",
        items: [
          { name: "Skiën en snowboarden", desc: "43 pistes en 28 liften" },
          { name: "Langlaufen", desc: "230 km geprepareerde loipes" },
          { name: "Sneeuwscootersafari's", desc: "Begeleide tochten de fjells in" },
          { name: "Husky- en rendierensafari's", desc: "Unieke ervaringen" },
          { name: "Noorderlicht jagen", desc: "Beste kansen" },
          { name: "Sneeuwschoenwandelen", desc: "Rustige natuurervaring" }
        ]
      },
      temperatures: {
        title: "Maandelijkse temperaturen",
        months: [
          { month: "November", temp: "-5 – -15°C", desc: "Eerste sneeuw, seizoen begint" },
          { month: "December", temp: "-10 – -25°C", desc: "Poolnacht, besneeuwd landschap" },
          { month: "Januari", temp: "-15 – -35°C", desc: "Koudste dagen, noorderlicht" },
          { month: "Februari", temp: "-10 – -30°C", desc: "Licht keert terug, vorst gaat door" },
          { month: "Maart", temp: "-5 – -20°C", desc: "Lentezon, volop sneeuw" }
        ]
      },
      tips: {
        title: "Tips voor winterreizigers",
        items: [
          "Kleed je in lagen – basislaag, middenlaag, buitenlaag",
          "Bescherm je gezicht en vingers bij strenge kou",
          "Boek activiteiten vooraf tijdens het hoogseizoen",
          "Neem een zaklamp mee voor de donkere uren",
          "Check noorderlichtvoorspellingen – heldere nachten zijn het best"
        ]
      }
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Hoe koud wordt het in Levi in de winter?", a: "Temperaturen variëren van -5°C tot -35°C. Doorgaans is het in december–februari -15 tot -25°C." },
        { q: "Ligt er sneeuw in Levi met Kerstmis?", a: "Ja, Levi heeft doorgaans 50–80 cm sneeuw met Kerstmis. Sneeuw is bijna altijd gegarandeerd." },
        { q: "Wanneer is de beste tijd om noorderlicht te zien?", a: "Het noorderlichtseizoen loopt van september tot maart. De beste kansen zijn op heldere, koude nachten." },
        { q: "Is Levi geschikt voor gezinnen in de winter?", a: "Absoluut! Levi heeft skischolen voor kinderen, gezinsvriendelijke activiteiten en volop te doen voor het hele gezin." }
      ]
    },
    cta: {
      hub: "Terug naar Levi-reisgids",
      hubLink: "/nl/levi",
      accommodation: "Boek winteraccommodatie",
      accommodationLink: "/nl/accommodaties"
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/nl/gids/skieen-in-levi" },
        { title: "Noorderlicht", desc: "Noorderlicht-gids", href: "/nl/noorderlicht" },
        { title: "Winterkleding", desc: "Hoe kleed je je voor de kou", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "November in Levi", desc: "Poolnacht begint, eerste pistes open", href: "/guide/levi-in-november" },
        { title: "December in Levi", desc: "Kerstseizoen en sterrenhemel", href: "/guide/levi-in-december" },
        { title: "Januari in Levi", desc: "Poolnachtmagie en noorderlicht", href: "/guide/levi-in-january" }
      ]
    },
    breadcrumbLabel: "Winter in Levi"
  }
};

const WinterInLevi = ({ lang = "fi" }: WinterInLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls = lang === "fi" 
    ? { fi: "/opas/talvi-levi", en: "/guide/winter-in-levi" }
    : { en: "/guide/winter-in-levi", fi: "/opas/talvi-levi" };

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : "/en" },
    { label: lang === "fi" ? "Levi" : "Levi", href: lang === "fi" ? "/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    temp: <Thermometer className="w-5 h-5 text-primary" />,
    snow: <Snowflake className="w-5 h-5 text-primary" />,
    moon: <Moon className="w-5 h-5 text-primary" />,
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${lang === "fi" ? "/" : "/en"}` },
        { name: lang === "fi" ? "Vuodenajat" : "Seasons", url: `https://leville.net${lang === "fi" ? "/opas/vuodenajat-levi" : "/guide/seasons-in-levi"}` },
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

            {/* Winter sunset image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={winterSunset} alt={lang === "fi" ? "Auringonlasku Levin rinteiden yllä talvella" : "Sunset over Levi slopes in winter"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Levin taivas voi näyttäytyä erityisen kauniina auringonlaskun aikaan talvella" : "The sky above Levi can look spectacular at sunset during winter"}
              </p>
            </section>

            {/* Kaamos */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.kaamos.title}</h2>
              <p className="text-muted-foreground">{t.sections.kaamos.content}</p>
            </section>

            {/* Tykky trees image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={tykkyTrees} alt={lang === "fi" ? "Tykkylumisia puita Levin tunturissa" : "Snow-laden tykky trees on Levi fell"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Tykkylumisia puita Levin tunturissa — tykky tarkoittaa puihin jäätynyttä paksua lumikerrosta, jota esiintyy tyypillisesti joulukuusta helmikuuhun" : "Snow-laden 'tykky' trees on Levi fell — tykky refers to thick frozen snow coating on trees, typically seen from December to February"}
              </p>
            </section>

            {/* Tykky kaamos image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={tykkyKaamos} alt={lang === "fi" ? "Tykkyluminen puu kaamoksen hämärässä Levin tunturilla" : "Snow-covered tykky tree in polar twilight on Levi fell"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Kaamoksen sininen valo ja tykkyluminen maisema Levin tunturin huipulla joulukuussa" : "The blue light of polar night and snow-laden landscape on top of Levi fell in December"}
              </p>
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

            {/* Night trail tykky image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={nightTrailTykky} alt={lang === "fi" ? "Valaistu latu tykkylumisten puiden keskellä yöllä" : "Illuminated ski trail among snow-laden trees at night"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Valaistu latu tykkylumisten puiden keskellä — Levillä voi hiihtää myös kaamosaikaan valaistuja latuja pitkin" : "Illuminated trail among snow-laden trees — in Levi you can ski along lit trails even during the polar night"}
              </p>
            </section>

            {/* Temperatures */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.temperatures.title}</h2>
              <div className="space-y-3">
                {t.sections.temperatures.months.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="w-24 font-medium text-foreground">{item.month}</div>
                    <div className="w-32 text-primary font-medium">{item.temp}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
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

export default WinterInLevi;
