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
import { Sun, TreePine, Mountain, ArrowRight, Star, Bike, Fish, Thermometer, Tag, Sparkles } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import OptimizedImage from "@/components/OptimizedImage";
import { Language } from "@/translations";
import summerToboggan from "@/assets/summer/summer-toboggan.jpg";
import lakeView from "@/assets/summer/lake-view.jpg";
import leipajuusto from "@/assets/summer/leipajuusto-campfire.jpg";
import beachFamilies from "@/assets/summer/beach-families.jpg";
import storedSnow from "@/assets/summer/stored-snow.jpg";
import hikingTrailSummer from "@/assets/summer/hiking-trail-summer.jpg";
import palovartijaSummer from "@/assets/summer/palovartija-summer.jpg";
import adventureParkRopes from "@/assets/summer/adventure-park-ropes.jpg";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import MajoitusCallout from "@/components/MajoitusCallout";
import InlineBookingLink from "@/components/InlineBookingLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SummerInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: `Tekemistä Levillä kesällä ${new Date().getFullYear()} — 15 parasta aktiviteettia`,
      description: "Mitä tehdä Levillä kesällä? Vaellus, pyöräily, golf, kalastus, kesäkelkkarata ja yötön yö. Paikallisen vinkit ja edullisemmat majoitushinnat.",
      canonical: "https://leville.net/opas/kesa-levi"
    },
    title: "Tekemistä Levillä kesällä",
    subtitle: "Yöttömän yön taika ja arktinen luonto parhaimmillaan",
    intro: "Levin kesä on rauhoittumisen ja luonnon aikaa. Yötön yö tuo aivan erityisen tunnelman, kun aurinko ei laske lainkaan kesäkuun ja heinäkuun aikana. Tunturimaisemat vihertävät, vaellusreitit kutsuvat ja luonto tarjoaa ainutlaatuisen pakopaikan arjesta.",
    sections: {
      conditions: {
        title: "Kesäolosuhteet",
        stats: [
          { label: "Lämpötilat", value: "+10 – +25°C", icon: "temp" },
          { label: "Yötön yö", value: "6 viikkoa", icon: "sun" },
          { label: "Vaellusreittejä", value: "Satoja km", icon: "mountain" },
          { label: "Luonto", value: "Vihreä", icon: "tree" }
        ]
      },
      midnightSun: {
        title: "Yöttömän yön aika",
        content: "Kesäkuun alusta heinäkuun puoliväliin aurinko ei laske lainkaan Levillä. Tämä ainutlaatuinen ilmiö luo maagisen tunnelman – voit vaeltaa tunturissa keskiyöllä auringon paisteessa tai nauttia iltayön rauhasta järven rannalla. Valoisat yöt antavat aikaa nauttia luonnosta ilman kiirettä."
      },
      activities: {
        title: "Kesäaktiviteetit",
        items: [
          { name: "Vaellus ja patikointi", desc: "Merkityt reitit kaikentasoisille" },
          { name: "Maastopyöräily", desc: "Bike Park ja tunturireitit" },
          { name: "Kalastus", desc: "Tunturijoet ja järvet" },
          { name: "Melonta", desc: "Kanootit ja kajakit vuokrattavissa" },
          { name: "Golf", desc: "Levin 18-reikäinen kenttä" },
          { name: "Marjastus", desc: "Mustikkaa ja lakkoja elokuussa" }
        ]
      },
      hiking: {
        title: "Suosituimmat vaellusreitit",
        trails: [
          { name: "Kätkätunturi", length: "5–15 km", desc: "Helppo perhereitti, upeat näkymät" },
          { name: "Levitunturi", length: "3–8 km", desc: "Huipulle gondolilla tai kävellen" },
          { name: "Immeljärven kierros", length: "8 km", desc: "Järvimaisemat ja metsäpolut" },
          { name: "Pallas-Yllästunturin kansallispuisto", length: "Useita reittejä", desc: "Lapin upeimmat maisemat" }
        ]
      },
      tips: {
        title: "Vinkit kesäkävijälle",
        items: [
          "Varaudu hyttysiin – hyttyskarkoite on välttämätön",
          "Pukeudu kerroksittain – säa voi vaihdella nopeasti",
          "Yötön yö voi häiritä unta – ota mukaan unimaski",
          "Nauti hiljaisuudesta – Levi on kesällä rauhallinen",
          "Maista paikallisia herkkuja – poronlihaa ja lakkoja"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Mikä on yötön yö?",
          a: "Yötön yö tarkoittaa aikaa, jolloin aurinko ei laske lainkaan. Levillä tämä kestää noin 6 viikkoa kesäkuusta heinäkuuhun."
        },
        {
          q: "Miten lämmin Levillä on kesällä?",
          a: "Kesälämpötilat vaihtelevat +10 – +25°C välillä. Heinäkuu on lämpimin kuukausi."
        },
        {
          q: "Onko hyttysiä paljon?",
          a: "Heinäkuussa hyttysiä voi olla paljon erityisesti kosteilla alueilla. Hyttyskarkoite auttaa."
        },
        {
          q: "Sopiiko Levi kesällä perheille?",
          a: "Ehdottomasti! Helpot vaellusreitit, Bike Park ja luontokokemukset sopivat koko perheelle."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa kesämajoitus",
      accommodationLink: "/majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Vaellus ja pyöräily", desc: "Tunturivaelluksia ja maastopyöräilyä", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
        { title: "Syksy ja ruska Levillä", desc: "Upeimmat ruska-ajat ja -reitit", href: "/opas/syksy-ruska-levi" },
        { title: "Ravintolat ja palvelut", desc: "Kesän ravintolat ja kaupat", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Toukokuu Levillä", desc: "Kevät kääntyy kesäksi", href: "/opas/levi-toukokuussa" },
        { title: "Kesäkuu Levillä", desc: "Yötön yö ja luonto herää", href: "/opas/levi-kesakuussa" },
        { title: "Heinäkuu Levillä", desc: "Keskiyön aurinko ja vaellukset", href: "/opas/levi-heinakuussa" },
        { title: "Elokuu Levillä", desc: "Marjastuskausi ja ensimmäiset ruskan merkit", href: "/opas/levi-elokuussa" }
      ]
    },
    breadcrumbLabel: "Kesä Levillä"
  },
  en: {
    meta: {
      title: `Things to Do in Levi in Summer ${new Date().getFullYear()} — 15 Best Activities`,
      description: "What to do in Levi in summer? Hiking, biking, golf, fishing, summer toboggan and midnight sun. Local tips and affordable accommodation rates.",
      canonical: "https://leville.net/guide/summer-in-levi"
    },
    title: "Things to Do in Levi in Summer",
    subtitle: "Midnight sun magic and arctic nature at its finest",
    intro: "Summer in Levi is a time for relaxation and nature. The midnight sun brings a very special atmosphere, as the sun doesn't set at all during June and July. The fell landscapes turn green, hiking trails beckon, and nature offers a unique escape from everyday life.",
    sections: {
      conditions: {
        title: "Summer Conditions",
        stats: [
          { label: "Temperatures", value: "+10 – +25°C", icon: "temp" },
          { label: "Midnight sun", value: "6 weeks", icon: "sun" },
          { label: "Hiking trails", value: "Hundreds km", icon: "mountain" },
          { label: "Nature", value: "Green", icon: "tree" }
        ]
      },
      midnightSun: {
        title: "The Midnight Sun",
        content: "From early June to mid-July, the sun doesn't set at all in Levi. This unique phenomenon creates a magical atmosphere – you can hike in the fells at midnight in sunshine or enjoy the peace of the evening by a lake. The bright nights give you time to enjoy nature without any hurry."
      },
      activities: {
        title: "Summer Activities",
        items: [
          { name: "Hiking and trekking", desc: "Marked trails for all levels" },
          { name: "Mountain biking", desc: "Bike Park and fell trails" },
          { name: "Fishing", desc: "Fell rivers and lakes" },
          { name: "Canoeing", desc: "Canoes and kayaks for rent" },
          { name: "Golf", desc: "Levi's 18-hole course" },
          { name: "Berry picking", desc: "Blueberries and cloudberries in August" }
        ]
      },
      hiking: {
        title: "Most Popular Hiking Trails",
        trails: [
          { name: "Kätkätunturi", length: "5–15 km", desc: "Easy family route, stunning views" },
          { name: "Levitunturi", length: "3–8 km", desc: "To the summit by gondola or on foot" },
          { name: "Immeljärvi loop", length: "8 km", desc: "Lake scenery and forest paths" },
          { name: "Pallas-Yllästunturi National Park", length: "Multiple routes", desc: "Lapland's most beautiful scenery" }
        ]
      },
      tips: {
        title: "Tips for Summer Visitors",
        items: [
          "Be prepared for mosquitoes – repellent is essential",
          "Dress in layers – weather can change quickly",
          "Midnight sun may disturb sleep – bring an eye mask",
          "Enjoy the silence – Levi is peaceful in summer",
          "Taste local delicacies – reindeer meat and cloudberries"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is the midnight sun?",
          a: "The midnight sun is the period when the sun doesn't set at all. In Levi, this lasts about 6 weeks from June to July."
        },
        {
          q: "How warm is Levi in summer?",
          a: "Summer temperatures range from +10 to +25°C. July is the warmest month."
        },
        {
          q: "Are there many mosquitoes?",
          a: "In July there can be many mosquitoes especially in wet areas. Mosquito repellent helps."
        },
        {
          q: "Is Levi suitable for families in summer?",
          a: "Absolutely! Easy hiking trails, Bike Park and nature experiences suit the whole family."
        }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book summer accommodation",
      accommodationLink: "/en/accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Hiking & Biking", desc: "Fell hikes and mountain biking trails", href: "/activities/hiking-and-biking-levi" },
        { title: "Autumn Ruska in Levi", desc: "Stunning fall colours and best routes", href: "/guide/autumn-ruska-in-levi" },
        { title: "Restaurants & Services", desc: "Summer dining and shops", href: "/guide/restaurants-and-services-in-levi" },
        { title: "May in Levi", desc: "Spring turns to summer", href: "/guide/levi-in-may" },
        { title: "June in Levi", desc: "Midnight sun and nature awakens", href: "/guide/levi-in-june" },
        { title: "July in Levi", desc: "Midnight sun and hiking", href: "/guide/levi-in-july" },
        { title: "August in Levi", desc: "Berry season and first signs of ruska", href: "/guide/levi-in-august" }
      ]
    },
    breadcrumbLabel: "Summer in Levi"
  },
  nl: {
    meta: {
      title: "Zomer in Levi – Middernachtzon & activiteiten | Leville.net",
      description: "Complete gids voor de zomer in Levi. Middernachtzon, wandelpaden, mountainbiken en vissen. Plan je zomervakantie in Lapland.",
      canonical: "https://leville.net/nl/gids/zomer-in-levi"
    },
    title: "Zomer in Levi",
    subtitle: "Middernachtzonmagie en arctische natuur op haar mooist",
    intro: "De zomer in Levi is een tijd voor ontspanning en natuur. De middernachtzon brengt een bijzondere sfeer, omdat de zon in juni en juli helemaal niet ondergaat. De fjelllandschappen kleuren groen, wandelpaden lonken en de natuur biedt een unieke ontsnapping aan het dagelijks leven.",
    sections: {
      conditions: {
        title: "Zomeromstandigheden",
        stats: [
          { label: "Temperaturen", value: "+10 – +25°C", icon: "temp" },
          { label: "Middernachtzon", value: "6 weken", icon: "sun" },
          { label: "Wandelpaden", value: "Honderden km", icon: "mountain" },
          { label: "Natuur", value: "Groen", icon: "tree" }
        ]
      },
      midnightSun: {
        title: "De middernachtzon",
        content: "Van begin juni tot half juli gaat de zon helemaal niet onder in Levi. Dit unieke fenomeen creëert een magische sfeer – je kunt midden in de nacht wandelen in de fjells bij zonneschijn of genieten van de avondrust aan een meer. De lichte nachten geven je alle tijd om te genieten van de natuur zonder haast."
      },
      activities: {
        title: "Zomeractiviteiten",
        items: [
          { name: "Wandelen en trekken", desc: "Gemarkeerde routes voor alle niveaus" },
          { name: "Mountainbiken", desc: "Bike Park en fjellroutes" },
          { name: "Vissen", desc: "Fjellrivieren en meren" },
          { name: "Kanoën", desc: "Kano's en kajaks te huur" },
          { name: "Golf", desc: "Levi's 18-holes baan" },
          { name: "Bessen plukken", desc: "Bosbessen en kruipbraam in augustus" }
        ]
      },
      hiking: {
        title: "Populairste wandelroutes",
        trails: [
          { name: "Kätkätunturi", length: "5–15 km", desc: "Makkelijke gezinsroute, prachtig uitzicht" },
          { name: "Levitunturi", length: "3–8 km", desc: "Naar de top met gondel of te voet" },
          { name: "Immeljärvi-ronde", length: "8 km", desc: "Meergebied en bospaden" },
          { name: "Pallas-Yllästunturi Nationaal Park", length: "Meerdere routes", desc: "Het mooiste landschap van Lapland" }
        ]
      },
      tips: {
        title: "Tips voor zomerbezoekers",
        items: [
          "Bereid je voor op muggen – insectenspray is essentieel",
          "Kleed je in lagen – het weer kan snel wisselen",
          "De middernachtzon kan je slaap verstoren – neem een slaapmasker mee",
          "Geniet van de stilte – Levi is rustig in de zomer",
          "Proef lokale lekkernijen – rendierenvlees en kruipbraam"
        ]
      }
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Wat is de middernachtzon?", a: "De middernachtzon is de periode waarin de zon helemaal niet ondergaat. In Levi duurt dit ongeveer 6 weken van juni tot juli." },
        { q: "Hoe warm is het in Levi in de zomer?", a: "Zomertemperaturen variëren van +10 tot +25°C. Juli is de warmste maand." },
        { q: "Zijn er veel muggen?", a: "In juli kunnen er veel muggen zijn, vooral in natte gebieden. Muggenspray helpt." },
        { q: "Is Levi geschikt voor gezinnen in de zomer?", a: "Absoluut! Makkelijke wandelpaden, Bike Park en natuurervaringen zijn geschikt voor het hele gezin." }
      ]
    },
    cta: {
      hub: "Terug naar Levi-reisgids",
      hubLink: "/nl/levi",
      accommodation: "Boek zomeraccommodatie",
      accommodationLink: "/nl/accommodaties"
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Wandelen & fietsen", desc: "Fjellwandelingen en mountainbikeroutes", href: "/activities/hiking-and-biking-levi" },
        { title: "Herfst Ruska in Levi", desc: "Prachtige herfstkleuren", href: "/nl/gids/herfst-ruska-in-levi" },
        { title: "Mei in Levi", desc: "Lente wordt zomer", href: "/guide/levi-in-may" },
        { title: "Juni in Levi", desc: "Middernachtzon en natuur ontwaakt", href: "/guide/levi-in-june" },
        { title: "Juli in Levi", desc: "Middernachtzon en wandelen", href: "/guide/levi-in-july" },
        { title: "Augustus in Levi", desc: "Bessenseizoen en eerste ruska", href: "/guide/levi-in-august" }
      ]
    },
    breadcrumbLabel: "Zomer in Levi"
  }
};

const SummerInLevi = ({ lang = "fi" }: SummerInLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = { fi: "/opas/kesa-levi", en: "/guide/summer-in-levi", nl: "/nl/gids/zomer-in-levi" };

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
    sun: <Sun className="w-5 h-5 text-primary" />,
    mountain: <Mountain className="w-5 h-5 text-primary" />,
    tree: <TreePine className="w-5 h-5 text-primary" />
  };

  // Inline booking link helper — soft contextual CTA tracked separately per placement
  const moderUrl = lang === "fi"
    ? "https://app.moder.fi/levillenet"
    : "https://app.moder.fi/levillenet?lang=en";

  const inlineCopy = {
    fi: {
      intro: { lead: "Suunnitteletko kesälomaa Levillä?", link: "Tarkista vapaat majoitukset ja ajantasaiset hintamme tästä →" },
      activities: { lead: "Useimmat majoituksemme sijaitsevat askelten päässä näistä aktiviteeteista —", link: "katso saatavuus ja hinnat." },
      hiking: { lead: "Reittien lähtöpisteille pääsee kävellen useimmista huoneistoistamme.", link: "Katso vapaat viikot ja hinnat tästä." },
      footer: { lead: "Kiinnostuitko?", link: "Tarkista vapaat majoitukset ja hintamme", tail: "tai selaa kaikki", browse: "kesän huoneistot ja mökit", dot: "." },
    },
    en: {
      intro: { lead: "Planning a summer trip to Levi?", link: "Check live availability and our latest prices here →" },
      activities: { lead: "Most of our apartments are a short walk from these activities —", link: "see availability and rates." },
      hiking: { lead: "Most trailheads are within walking distance from our apartments.", link: "Check open weeks and prices here." },
      footer: { lead: "Interested?", link: "Check live availability and prices", tail: "or browse all", browse: "summer apartments and cabins", dot: "." },
    },
    nl: {
      intro: { lead: "Plan je een zomerreis naar Levi?", link: "Bekijk beschikbaarheid en actuele prijzen hier →" },
      activities: { lead: "Onze accommodaties liggen op loopafstand van deze activiteiten —", link: "bekijk beschikbaarheid en prijzen." },
      hiking: { lead: "De startpunten van de routes zijn vanaf onze appartementen te belopen.", link: "Bekijk vrije weken en prijzen hier." },
      footer: { lead: "Interesse?", link: "Bekijk beschikbaarheid en prijzen", tail: "of bekijk alle", browse: "zomerappartementen en chalets", dot: "." },
    },
  } as const;
  const ic = (inlineCopy as any)[lang] || inlineCopy.en;
  const browseHref = lang === "fi" ? "/majoitukset" : lang === "nl" ? "/nl/accommodaties" : "/en/accommodations";

  const trackInline = (placement: string) => {
    import("@/lib/logPromoClick").then(({ logPromoClick }) =>
      logPromoClick({
        banner_id: null,
        banner_title: `Summer page inline — ${placement}`,
        placement: `summer_page_inline_${placement}`,
        language: lang,
        target_url: moderUrl,
      })
    );
  };

  const InlineLink = ({ placement, children }: { placement: string; children: React.ReactNode }) => (
    <a
      href={moderUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackInline(placement)}
      className="text-primary underline underline-offset-4 hover:text-primary/80 font-medium"
    >
      {children}
    </a>
  );

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
              <div className="max-w-2xl mx-auto text-left">
                <InlineBookingLink variant="tip" intent="summerStay" lang={lang} />
                <InlineBookingLink variant="tip" intent="glacierPrime" lang={lang} />
                <InlineBookingLink variant="tip" intent="groupCabin" lang={lang} />
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-4">
                {ic.intro.lead} <InlineLink placement="intro">{ic.intro.link}</InlineLink>
              </p>
            </section>


            {/* Summer campaign banner */}
            {(() => {
              const moderUrl = lang === "fi"
                ? "https://app.moder.fi/levillenet"
                : lang === "nl"
                ? "https://app.moder.fi/levillenet?lang=en"
                : "https://app.moder.fi/levillenet?lang=en";
              const copy = {
                fi: {
                  badge: "Kesäkampanja",
                  title: "Varaa kesän loma Levillä – 10 % alennus",
                  desc: "Käytä koodia SUMMER varauksen yhteydessä ja saat 10 % alennuksen kesämajoituksista. Etu on voimassa rajoitetun ajan – varaa suoraan meiltä.",
                  code: "Alennuskoodi",
                  cta: "Varaa kesäloma",
                },
                en: {
                  badge: "Summer campaign",
                  title: "Book your Levi summer holiday – 10% off",
                  desc: "Use code SUMMER at checkout and get 10% off summer accommodations. Limited-time offer – book directly with us.",
                  code: "Promo code",
                  cta: "Book summer stay",
                },
                nl: {
                  badge: "Zomercampagne",
                  title: "Boek je zomervakantie in Levi – 10% korting",
                  desc: "Gebruik code SUMMER bij het boeken en ontvang 10% korting op zomeraccommodaties. Aanbieding voor beperkte tijd – boek direct bij ons.",
                  code: "Kortingscode",
                  cta: "Boek zomerverblijf",
                },
              } as const;
              const c = (copy as any)[lang] || copy.en;
              return (
                <section className="mb-12">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500 shadow-xl">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <Sun className="absolute top-4 right-6 w-24 h-24 text-white" />
                      <Sparkles className="absolute bottom-4 left-6 w-16 h-16 text-white" />
                    </div>
                    <div className="relative z-10 p-6 md:p-10 text-white">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> {c.badge}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
                        {c.title}
                      </h2>
                      <p className="text-white/90 mb-6 max-w-2xl">{c.desc}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3 bg-white text-foreground rounded-xl px-4 py-3 shadow-md">
                          <Tag className="w-5 h-5 text-emerald-600" />
                          <div>
                            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.code}</div>
                            <div className="text-lg font-extrabold tracking-widest text-emerald-700">SUMMER</div>
                          </div>
                          <div className="ml-2 px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-sm font-bold">-10%</div>
                        </div>
                        <a
                          href={moderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            import("@/lib/logPromoClick").then(({ logPromoClick }) =>
                              logPromoClick({
                                banner_id: null,
                                banner_title: "Summer campaign – SUMMER 10%",
                                placement: "summer_page",
                                language: lang,
                                target_url: moderUrl,
                              })
                            );
                          }}
                          className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 transition-colors font-bold rounded-xl px-6 py-3 shadow-lg"
                        >
                          {c.cta}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* Hero image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={lakeView} alt={lang === "fi" ? "Järvimaisema Levillä kesällä – tunturit ja kirkas vesi" : "Lake view in Levi during summer – fells and clear water"} className="w-full h-64 sm:h-80 md:h-96" priority />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Levin hiekkarannat ja kristallinkirkas järvivesi houkuttelevat uimaan kesäpäivinä" : "Levi's sandy beaches and crystal-clear lake water invite swimmers on summer days"}
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

            {/* Midnight Sun */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.midnightSun.title}</h2>
              <p className="text-muted-foreground">{t.sections.midnightSun.content}</p>
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
              <p className="text-sm text-muted-foreground mt-5">
                {ic.activities.lead} <InlineLink placement="activities">{ic.activities.link}</InlineLink>
              </p>
            </section>

            {/* Summer toboggan image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={summerToboggan} alt={lang === "fi" ? "Kesäkelkkarata Levillä – vauhdikas lasku tunturilta" : "Summer toboggan run in Levi – thrilling ride down the fell"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Kesäkelkkaradalla lasketaan vauhdikkaasti tunturin laelta alas – huippuhauskaa koko perheelle!" : "The summer toboggan run takes you racing down the fell – incredible fun for the whole family!"}
              </p>
            </section>

            {/* Adventure park image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={adventureParkRopes} alt={lang === "fi" ? "Seikkailurata Levillä kesällä – köysiradat ja kiipeilyä" : "Adventure park in Levi in summer – high ropes and climbing"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Levillä on upeita seikkailuratoja ja todella pitkiä vaijeriliukuja — hauskaa koko perheelle kesäpäivänä" : "Levi offers impressive adventure parks and long ziplines — fun for the whole family on a summer day"}
              </p>
            </section>

            {/* Summer hiking trail image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={hikingTrailSummer} alt={lang === "fi" ? "Kesäinen kävelyreitti Levin metsässä" : "Summer hiking trail in Levi forest"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Merkityt kävelyreitit kulkevat koivumetsien ja mustikkakankaiden halki — Levin reitistö sopii kaikentasoisille" : "Marked hiking trails wind through birch forests and blueberry heaths — Levi's trail network suits all levels"}
              </p>
            </section>

            {/* Hiking Trails */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.hiking.title}</h2>
              <div className="space-y-3">
                {t.sections.hiking.trails.map((trail, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="w-40 font-medium text-foreground">{trail.name}</div>
                    <div className="w-24 text-primary font-medium text-sm">{trail.length}</div>
                    <div className="text-sm text-muted-foreground">{trail.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-5">
                {ic.hiking.lead} <InlineLink placement="hiking">{ic.hiking.link}</InlineLink>
              </p>
            </section>

            {/* Beach families image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={beachFamilies} alt={lang === "fi" ? "Perheitä uimarannalla Immeljärvellä Levillä" : "Families at the beach at Immeljärvi lake in Levi"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Immeljärven uimaranta täyttyy perheistä aurinkoisina kesäpäivinä — vesi lämpenee heinäkuussa jopa yli 20 asteeseen" : "Immeljärvi beach fills with families on sunny summer days — the water warms up to over 20°C in July"}
              </p>
            </section>

            {/* Palovartija restaurant image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={palovartijaSummer} alt={lang === "fi" ? "Ravintola Palovartija Levin tunturin huipulla kesällä" : "Restaurant Palovartija on top of Levi fell in summer"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Ravintola Palovartija Levin tunturin huipulla — terassille pääsee gondolihissillä ja näkymät ulottuvat kauas Lapin erämaahan" : "Restaurant Palovartija on top of Levi fell — reach the terrace by gondola lift and enjoy views stretching far into Lapland wilderness"}
              </p>
            </section>

            {/* Stored snow image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={storedSnow} alt={lang === "fi" ? "Säilöttyä lunta Levin eturinteessä elokuussa" : "Stored snow on Levi's front slope in August"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Säilöttyä lunta Levin eturinteessä elokuussa — lunta varastoidaan sahanpurun alla kesän yli laskettelukauden aikaistamiseksi" : "Stored snow on Levi's front slope in August — snow is preserved under sawdust over summer to enable an early ski season start"}
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

            {/* Leipäjuusto image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                <img src={leipajuusto} alt={lang === "fi" ? "Leipäjuusto kermassa lakkahillolla nuotiolla Levillä" : "Finnish bread cheese with cream and cloudberry jam over campfire in Levi"} loading="lazy" className="w-full h-full object-cover object-bottom" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Paikallinen herkku – leipäjuusto kermassa haudutettuna lakkahillolla, nautittuna nuotiolla järven rannalla" : "Local delicacy – bread cheese simmered in cream with cloudberry jam, enjoyed by a campfire at the lakeside"}
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

            {/* CTA — soft inline version */}
            <section className="mt-8 flex flex-col items-center gap-4 text-center">
              <p className="text-base text-muted-foreground max-w-2xl">
                {ic.footer.lead}{" "}
                <InlineLink placement="footer">{ic.footer.link}</InlineLink>{" "}
                {ic.footer.tail}{" "}
                <Link to={browseHref} className="text-primary underline underline-offset-4 hover:text-primary/80 font-medium">
                  {ic.footer.browse}
                </Link>
                {ic.footer.dot}
              </p>
              <Button asChild variant="outline">
                <Link to={t.cta.hubLink}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t.cta.hub}
                </Link>
              </Button>
            </section>
          </div>
        </main>

        <PageCTA lang={lang} />
<MajoitusCallout lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default SummerInLevi;
