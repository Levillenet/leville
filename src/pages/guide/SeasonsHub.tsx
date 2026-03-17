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
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import GuideHubCard from "@/components/guide/GuideHubCard";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Language } from "@/translations";

// Import season images
import winterImg from "@/assets/seasons/winter.jpg";
import autumnImg from "@/assets/seasons/autumn.jpg";
import summerImg from "@/assets/seasons/summer.jpg";
import springImg from "@/assets/seasons/spring.jpg";

interface SeasonsHubProps {
  lang?: Language;
}

const content: Record<Language, {
  title: string;
  subtitle: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  backToHub: string;
  readMore: string;
  bookCta: string;
  accommodationsLink: string;
  seasons: {
    id: string;
    title: string;
    description: string;
    href: string;
    image: string;
  }[];
}> = {
  fi: {
    title: "Levin vuodenajat",
    subtitle: "Koe Lappi ympäri vuoden",
    intro: "Levi tarjoaa ainutlaatuisia elämyksiä jokaisena vuodenaikana. Talven lumisista maisemista kesän yöttömään yöhön – jokaisella kaudella on oma erityinen luonteensa.",
    metaTitle: "Levin vuodenajat – Talvi, kevät, kesä ja syksy | Leville.net",
    metaDescription: "Tutustu Levin neljään vuodenaikaan: talven kaamoksesta kesän yöttömään yöhön. Löydä paras matkustusaika ja koe Lapin ainutlaatuinen luonto.",
    backToHub: "Takaisin Levi-oppaaseen",
    readMore: "Lue lisää",
    bookCta: "Varaa majoitus Leviltä",
    accommodationsLink: "/majoitukset",
    seasons: [
      {
        id: "winter",
        title: "Talvi ja kaamos",
        description: "Koe arktinen talvi, revontulet ja luminen tunturimaisema. Marraskuusta maaliskuuhun.",
        href: "/opas/talvi-levi",
        image: winterImg
      },
      {
        id: "spring",
        title: "Kevät ja kevätaurinko",
        description: "Nauti kirkkaasta kevätauringosta ja parhaista lumiolosuhteista. Maaliskuusta huhtikuuhun.",
        href: "/opas/kevat-levi",
        image: springImg
      },
      {
        id: "summer",
        title: "Kesä ja yötön yö",
        description: "Koe keskiyön aurinko ja luonnon herääminen. Kesäkuusta heinäkuuhun.",
        href: "/opas/kesa-levi",
        image: summerImg
      },
      {
        id: "autumn",
        title: "Syksy ja ruska",
        description: "Ihaile ruska-ajan väriloistoa ja rauhallista luontoa. Syyskuusta lokakuuhun.",
        href: "/opas/syksy-ruska-levi",
        image: autumnImg
      }
    ]
  },
  en: {
    title: "Seasons in Levi",
    subtitle: "Experience Lapland year-round",
    intro: "Levi offers unique experiences in every season. From snowy winter landscapes to the midnight sun of summer – each season has its own special character.",
    metaTitle: "Seasons in Levi – Winter, Spring, Summer, Autumn | Leville.net",
    metaDescription: "Discover the four seasons of Levi: from winter's polar night to summer's midnight sun. Find the best time to visit and experience Lapland's unique nature.",
    backToHub: "Back to Levi Guide",
    readMore: "Read more",
    bookCta: "Book accommodation in Levi",
    accommodationsLink: "/en/accommodations",
    seasons: [
      {
        id: "winter",
        title: "Winter and Polar Night",
        description: "Experience arctic winter, northern lights and snow-covered fell landscapes. November to March.",
        href: "/guide/winter-in-levi",
        image: winterImg
      },
      {
        id: "spring",
        title: "Spring and Spring Sun",
        description: "Enjoy bright spring sunshine and the best snow conditions. March to April.",
        href: "/guide/spring-in-levi",
        image: springImg
      },
      {
        id: "summer",
        title: "Summer and Midnight Sun",
        description: "Experience the midnight sun and nature awakening. June to July.",
        href: "/guide/summer-in-levi",
        image: summerImg
      },
      {
        id: "autumn",
        title: "Autumn and Ruska",
        description: "Admire the autumn colors and peaceful nature. September to October.",
        href: "/guide/autumn-ruska-in-levi",
        image: autumnImg
      }
    ]
  },
  sv: {
    title: "Årstider i Levi",
    subtitle: "Upplev Lappland året runt",
    intro: "Levi erbjuder unika upplevelser varje årstid. Från snöiga vinterlandskap till midnattssolen på sommaren – varje säsong har sin egen speciella karaktär.",
    metaTitle: "Årstider i Levi – Vinter, vår, sommar, höst | Leville.net",
    metaDescription: "Upptäck Levis fyra årstider: från vinterns polarnatt till sommarens midnattssol. Hitta den bästa tiden att besöka och upplev Lapplands unika natur.",
    backToHub: "Tillbaka till Levi-guiden",
    readMore: "Läs mer",
    bookCta: "Boka boende i Levi",
    accommodationsLink: "/sv/boende",
    seasons: [
      { id: "winter", title: "Vinter och polarnatt", description: "Upplev arktisk vinter, norrsken och snötäckta fjällandskap. November till mars.", href: "/sv/levi", image: winterImg },
      { id: "spring", title: "Vår och vårsol", description: "Njut av ljus vårsol och bästa snöförhållanden. Mars till april.", href: "/sv/levi", image: springImg },
      { id: "summer", title: "Sommar och midnattssol", description: "Upplev midnattssolen och naturens uppvaknande. Juni till juli.", href: "/sv/levi", image: summerImg },
      { id: "autumn", title: "Höst och Ruska", description: "Beundra höstens färger och fridfull natur. September till oktober.", href: "/sv/levi", image: autumnImg }
    ]
  },
  de: {
    title: "Jahreszeiten in Levi",
    subtitle: "Erleben Sie Lappland das ganze Jahr",
    intro: "Levi bietet einzigartige Erlebnisse in jeder Jahreszeit. Von verschneiten Winterlandschaften bis zur Mitternachtssonne im Sommer – jede Saison hat ihren eigenen besonderen Charakter.",
    metaTitle: "Jahreszeiten in Levi – Winter, Frühling, Sommer, Herbst | Leville.net",
    metaDescription: "Entdecken Sie die vier Jahreszeiten von Levi: von der Polarnacht im Winter bis zur Mitternachtssonne im Sommer.",
    backToHub: "Zurück zum Levi-Guide",
    readMore: "Mehr lesen",
    bookCta: "Unterkunft in Levi buchen",
    accommodationsLink: "/de/unterkuenfte",
    seasons: [
      { id: "winter", title: "Winter und Polarnacht", description: "Erleben Sie arktischen Winter, Nordlichter und schneebedeckte Fjelllandschaften. November bis März.", href: "/de/levi", image: winterImg },
      { id: "spring", title: "Frühling und Frühlingssonne", description: "Genießen Sie helle Frühlingssonne und beste Schneeverhältnisse. März bis April.", href: "/de/levi", image: springImg },
      { id: "summer", title: "Sommer und Mitternachtssonne", description: "Erleben Sie die Mitternachtssonne und das Erwachen der Natur. Juni bis Juli.", href: "/de/levi", image: summerImg },
      { id: "autumn", title: "Herbst und Ruska", description: "Bewundern Sie die Herbstfarben und friedliche Natur. September bis Oktober.", href: "/de/levi", image: autumnImg }
    ]
  },
  es: {
    title: "Estaciones en Levi",
    subtitle: "Experimenta Laponia todo el año",
    intro: "Levi ofrece experiencias únicas en cada estación. Desde paisajes nevados de invierno hasta el sol de medianoche en verano – cada temporada tiene su propio carácter especial.",
    metaTitle: "Estaciones en Levi – Invierno, primavera, verano, otoño | Leville.net",
    metaDescription: "Descubre las cuatro estaciones de Levi: desde la noche polar del invierno hasta el sol de medianoche del verano.",
    backToHub: "Volver a la guía de Levi",
    readMore: "Leer más",
    bookCta: "Reservar alojamiento en Levi",
    accommodationsLink: "/es/alojamientos",
    seasons: [
      { id: "winter", title: "Invierno y noche polar", description: "Experimenta el invierno ártico, auroras boreales y paisajes cubiertos de nieve. Noviembre a marzo.", href: "/es/levi", image: winterImg },
      { id: "spring", title: "Primavera y sol primaveral", description: "Disfruta del sol brillante de primavera y las mejores condiciones de nieve. Marzo a abril.", href: "/es/levi", image: springImg },
      { id: "summer", title: "Verano y sol de medianoche", description: "Experimenta el sol de medianoche y el despertar de la naturaleza. Junio a julio.", href: "/es/levi", image: summerImg },
      { id: "autumn", title: "Otoño y Ruska", description: "Admira los colores otoñales y la naturaleza tranquila. Septiembre a octubre.", href: "/es/levi", image: autumnImg }
    ]
  },
  fr: {
    title: "Saisons à Levi",
    subtitle: "Découvrez la Laponie toute l'année",
    intro: "Levi offre des expériences uniques à chaque saison. Des paysages enneigés d'hiver au soleil de minuit en été – chaque saison a son caractère particulier.",
    metaTitle: "Saisons à Levi – Hiver, printemps, été, automne | Leville.net",
    metaDescription: "Découvrez les quatre saisons de Levi : de la nuit polaire de l'hiver au soleil de minuit de l'été.",
    backToHub: "Retour au guide de Levi",
    readMore: "En savoir plus",
    bookCta: "Réserver un hébergement à Levi",
    accommodationsLink: "/fr/hebergements",
    seasons: [
      { id: "winter", title: "Hiver et nuit polaire", description: "Vivez l'hiver arctique, les aurores boréales et les paysages enneigés. Novembre à mars.", href: "/fr/levi", image: winterImg },
      { id: "spring", title: "Printemps et soleil printanier", description: "Profitez du soleil printanier et des meilleures conditions de neige. Mars à avril.", href: "/fr/levi", image: springImg },
      { id: "summer", title: "Été et soleil de minuit", description: "Vivez le soleil de minuit et l'éveil de la nature. Juin à juillet.", href: "/fr/levi", image: summerImg },
      { id: "autumn", title: "Automne et Ruska", description: "Admirez les couleurs d'automne et la nature paisible. Septembre à octobre.", href: "/fr/levi", image: autumnImg }
    ]
  },
  nl: {
    title: "Seizoenen in Levi",
    subtitle: "Ervaar Lapland het hele jaar door",
    intro: "Levi biedt unieke ervaringen in elk seizoen. Van besneeuwde winterlandschappen tot de middernachtzon in de zomer – elk seizoen heeft zijn eigen bijzondere karakter.",
    metaTitle: "Seizoenen in Levi – Wanneer naar Lapland? | Leville.net",
    metaDescription: "Ontdek het beste seizoen voor jouw reis naar Levi in Fins Lapland. Winter, lente, zomer en herfst – elk seizoen heeft zijn eigen magie.",
    backToHub: "Terug naar Levi-gids",
    readMore: "Lees meer",
    bookCta: "Boek accommodatie in Levi",
    accommodationsLink: "/nl/accommodaties",
    seasons: [
      { id: "winter", title: "Winter en poolnacht", description: "Ervaar de arctische winter, noorderlicht en besneeuwde fjelllandschappen. November tot maart.", href: "/nl/levi", image: winterImg },
      { id: "spring", title: "Lente en lentezon", description: "Geniet van heldere lentezon en de beste sneeuwcondities. Maart tot april.", href: "/nl/levi", image: springImg },
      { id: "summer", title: "Zomer en middernachtzon", description: "Ervaar de middernachtzon en het ontwaken van de natuur. Juni tot juli.", href: "/nl/levi", image: summerImg },
      { id: "autumn", title: "Herfst en Ruska", description: "Bewonder de herfstkleuren en vredige natuur. September tot oktober.", href: "/nl/levi", image: autumnImg }
    ]
  }
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const hubLinks: Record<Language, string> = {
  fi: "/levi", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi"
};

const canonicalUrls: Record<Language, string> = {
  fi: "https://leville.net/opas/vuodenajat-levi",
  en: "https://leville.net/guide/seasons-in-levi",
  sv: "https://leville.net/sv/guide/seasons-in-levi",
  de: "https://leville.net/de/guide/seasons-in-levi",
  es: "https://leville.net/es/guide/seasons-in-levi",
  fr: "https://leville.net/fr/guide/seasons-in-levi",
  nl: "https://leville.net/nl/gids/seizoenen-in-levi"
};

const monthlyData: Partial<Record<Language, { month: string; temp: string; href: string; tag: string }[]>> = {
  fi: [
    { month: "Tammikuu", temp: "−14°C", href: "/opas/levi-tammikuussa", tag: "Keskitalven rauhaa" },
    { month: "Helmikuu", temp: "−12°C", href: "/opas/levi-helmikuussa", tag: "Valo palaa tuntureille" },
    { month: "Maaliskuu", temp: "−7°C", href: "/opas/levi-maaliskuussa", tag: "Kevätauringon paistetta" },
    { month: "Huhtikuu", temp: "−2°C", href: "/opas/levi-huhtikuussa", tag: "Hankilumien aikaa" },
    { month: "Toukokuu", temp: "+5°C", href: "/opas/levi-toukokuussa", tag: "Kevät herää" },
    { month: "Kesäkuu", temp: "+12°C", href: "/opas/levi-kesakuussa", tag: "Yötön yö" },
    { month: "Heinäkuu", temp: "+14°C", href: "/opas/levi-heinakuussa", tag: "Lapin kesä" },
    { month: "Elokuu", temp: "+12°C", href: "/opas/levi-elokuussa", tag: "Marjastusta ja kalastusta" },
    { month: "Syyskuu", temp: "+6°C", href: "/opas/levi-syyskuussa", tag: "Ruska-aika" },
    { month: "Lokakuu", temp: "−1°C", href: "/opas/levi-lokakuussa", tag: "Ensimmäiset revontulet" },
    { month: "Marraskuu", temp: "−7°C", href: "/opas/levi-marraskuussa", tag: "Kaamos ja hiljaisuus" },
    { month: "Joulukuu", temp: "−12°C", href: "/opas/levi-joulukuussa", tag: "Joulun tunnelmaa" },
  ],
  en: [
    { month: "January", temp: "−14°C", href: "/guide/levi-in-january", tag: "Midwinter magic" },
    { month: "February", temp: "−12°C", href: "/guide/levi-in-february", tag: "Light returns" },
    { month: "March", temp: "−7°C", href: "/guide/levi-in-march", tag: "Spring sunshine" },
    { month: "April", temp: "−2°C", href: "/guide/levi-in-april", tag: "Crispy snow" },
    { month: "May", temp: "+5°C", href: "/guide/levi-in-may", tag: "Spring awakens" },
    { month: "June", temp: "+12°C", href: "/guide/levi-in-june", tag: "Midnight sun" },
    { month: "July", temp: "+14°C", href: "/guide/levi-in-july", tag: "Arctic summer" },
    { month: "August", temp: "+12°C", href: "/guide/levi-in-august", tag: "Berries & fishing" },
    { month: "September", temp: "+6°C", href: "/guide/levi-in-september", tag: "Autumn colours" },
    { month: "October", temp: "−1°C", href: "/guide/levi-in-october", tag: "First auroras" },
    { month: "November", temp: "−7°C", href: "/guide/levi-in-november", tag: "Polar night begins" },
    { month: "December", temp: "−12°C", href: "/guide/levi-in-december", tag: "Christmas spirit" },
  ],
  nl: [
    { month: "Januari", temp: "−14°C", href: "/guide/levi-in-january", tag: "Midwintermagie" },
    { month: "Februari", temp: "−12°C", href: "/guide/levi-in-february", tag: "Licht keert terug" },
    { month: "Maart", temp: "−7°C", href: "/guide/levi-in-march", tag: "Lentezon" },
    { month: "April", temp: "−2°C", href: "/guide/levi-in-april", tag: "Knapperige sneeuw" },
    { month: "Mei", temp: "+5°C", href: "/guide/levi-in-may", tag: "Lente ontwaakt" },
    { month: "Juni", temp: "+12°C", href: "/guide/levi-in-june", tag: "Middernachtzon" },
    { month: "Juli", temp: "+14°C", href: "/guide/levi-in-july", tag: "Arctische zomer" },
    { month: "Augustus", temp: "+12°C", href: "/guide/levi-in-august", tag: "Bessen & vissen" },
    { month: "September", temp: "+6°C", href: "/guide/levi-in-september", tag: "Herfstkleuren" },
    { month: "Oktober", temp: "−1°C", href: "/guide/levi-in-october", tag: "Eerste noorderlicht" },
    { month: "November", temp: "−7°C", href: "/guide/levi-in-november", tag: "Poolnacht begint" },
    { month: "December", temp: "−12°C", href: "/guide/levi-in-december", tag: "Kerstsfeer" },
  ],
  sv: [
    { month: "Januari", temp: "−14°C", href: "/guide/levi-in-january", tag: "Midvinterro" },
    { month: "Februari", temp: "−12°C", href: "/guide/levi-in-february", tag: "Ljuset återvänder" },
    { month: "Mars", temp: "−7°C", href: "/guide/levi-in-march", tag: "Vårsol" },
    { month: "April", temp: "−2°C", href: "/guide/levi-in-april", tag: "Skareföre" },
    { month: "Maj", temp: "+5°C", href: "/guide/levi-in-may", tag: "Våren vaknar" },
    { month: "Juni", temp: "+12°C", href: "/guide/levi-in-june", tag: "Midnattssol" },
    { month: "Juli", temp: "+14°C", href: "/guide/levi-in-july", tag: "Arktisk sommar" },
    { month: "Augusti", temp: "+12°C", href: "/guide/levi-in-august", tag: "Bär & fiske" },
    { month: "September", temp: "+6°C", href: "/guide/levi-in-september", tag: "Höstfärger" },
    { month: "Oktober", temp: "−1°C", href: "/guide/levi-in-october", tag: "Första norrskenet" },
    { month: "November", temp: "−7°C", href: "/guide/levi-in-november", tag: "Polarnatt börjar" },
    { month: "December", temp: "−12°C", href: "/guide/levi-in-december", tag: "Julstämning" },
  ],
  de: [
    { month: "Januar", temp: "−14°C", href: "/guide/levi-in-january", tag: "Mittwinterruhe" },
    { month: "Februar", temp: "−12°C", href: "/guide/levi-in-february", tag: "Licht kehrt zurück" },
    { month: "März", temp: "−7°C", href: "/guide/levi-in-march", tag: "Frühlingssonne" },
    { month: "April", temp: "−2°C", href: "/guide/levi-in-april", tag: "Knuspriger Schnee" },
    { month: "Mai", temp: "+5°C", href: "/guide/levi-in-may", tag: "Frühling erwacht" },
    { month: "Juni", temp: "+12°C", href: "/guide/levi-in-june", tag: "Mitternachtssonne" },
    { month: "Juli", temp: "+14°C", href: "/guide/levi-in-july", tag: "Arktischer Sommer" },
    { month: "August", temp: "+12°C", href: "/guide/levi-in-august", tag: "Beeren & Angeln" },
    { month: "September", temp: "+6°C", href: "/guide/levi-in-september", tag: "Herbstfarben" },
    { month: "Oktober", temp: "−1°C", href: "/guide/levi-in-october", tag: "Erste Polarlichter" },
    { month: "November", temp: "−7°C", href: "/guide/levi-in-november", tag: "Polarnacht beginnt" },
    { month: "Dezember", temp: "−12°C", href: "/guide/levi-in-december", tag: "Weihnachtsstimmung" },
  ],
  es: [
    { month: "Enero", temp: "−14°C", href: "/guide/levi-in-january", tag: "Magia invernal" },
    { month: "Febrero", temp: "−12°C", href: "/guide/levi-in-february", tag: "Vuelve la luz" },
    { month: "Marzo", temp: "−7°C", href: "/guide/levi-in-march", tag: "Sol primaveral" },
    { month: "Abril", temp: "−2°C", href: "/guide/levi-in-april", tag: "Nieve crujiente" },
    { month: "Mayo", temp: "+5°C", href: "/guide/levi-in-may", tag: "Primavera despierta" },
    { month: "Junio", temp: "+12°C", href: "/guide/levi-in-june", tag: "Sol de medianoche" },
    { month: "Julio", temp: "+14°C", href: "/guide/levi-in-july", tag: "Verano ártico" },
    { month: "Agosto", temp: "+12°C", href: "/guide/levi-in-august", tag: "Bayas y pesca" },
    { month: "Septiembre", temp: "+6°C", href: "/guide/levi-in-september", tag: "Colores otoñales" },
    { month: "Octubre", temp: "−1°C", href: "/guide/levi-in-october", tag: "Primeras auroras" },
    { month: "Noviembre", temp: "−7°C", href: "/guide/levi-in-november", tag: "Noche polar" },
    { month: "Diciembre", temp: "−12°C", href: "/guide/levi-in-december", tag: "Espíritu navideño" },
  ],
  fr: [
    { month: "Janvier", temp: "−14°C", href: "/guide/levi-in-january", tag: "Magie hivernale" },
    { month: "Février", temp: "−12°C", href: "/guide/levi-in-february", tag: "La lumière revient" },
    { month: "Mars", temp: "−7°C", href: "/guide/levi-in-march", tag: "Soleil printanier" },
    { month: "Avril", temp: "−2°C", href: "/guide/levi-in-april", tag: "Neige croustillante" },
    { month: "Mai", temp: "+5°C", href: "/guide/levi-in-may", tag: "Le printemps s'éveille" },
    { month: "Juin", temp: "+12°C", href: "/guide/levi-in-june", tag: "Soleil de minuit" },
    { month: "Juillet", temp: "+14°C", href: "/guide/levi-in-july", tag: "Été arctique" },
    { month: "Août", temp: "+12°C", href: "/guide/levi-in-august", tag: "Baies et pêche" },
    { month: "Septembre", temp: "+6°C", href: "/guide/levi-in-september", tag: "Couleurs d'automne" },
    { month: "Octobre", temp: "−1°C", href: "/guide/levi-in-october", tag: "Premières aurores" },
    { month: "Novembre", temp: "−7°C", href: "/guide/levi-in-november", tag: "Nuit polaire" },
    { month: "Décembre", temp: "−12°C", href: "/guide/levi-in-december", tag: "Esprit de Noël" },
  ],
};

const SeasonsHub = ({ lang = "fi" }: SeasonsHubProps) => {
  const location = useLocation();
  const c = content[lang];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={{ fi: "/opas/vuodenajat-levi", en: "/guide/seasons-in-levi", nl: "/nl/gids/seizoenen-in-levi" }} />
      <Helmet>
        <html lang={lang} />
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href={canonicalUrls[lang]} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrls[lang]} />
        <meta property="og:title" content={c.metaTitle} />
        <meta property="og:description" content={c.metaDescription} />
        <meta property="og:locale" content={localeMap[lang]} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.metaTitle} />
        <meta name="twitter:description" content={c.metaDescription} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: c.title,
            description: c.metaDescription,
            url: canonicalUrls[lang],
            isPartOf: { "@type": "WebSite", name: "Leville.net", url: "https://leville.net" },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: c.seasons.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://leville.net${s.href}`,
                name: s.title,
              })),
            },
          })}
        </script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${lang === "fi" ? "/" : "/en"}` },
        { name: c.title, url: canonicalUrls[lang] }
      ])} />
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Back to Hub */}
            <div className="mb-6">
              <Link 
                to={hubLinks[lang]} 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {c.backToHub}
              </Link>
            </div>

            {/* Hero Section */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {c.title}
              </h1>
              <p className="text-lg sm:text-xl text-primary font-medium mb-4">
                {c.subtitle}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {c.intro}
              </p>
            </section>

            {/* Season Cards */}
            <section className="mb-12">
              <div className="grid sm:grid-cols-2 gap-6">
                {c.seasons.map((season) => (
                  <GuideHubCard
                    key={season.id}
                    title={season.title}
                    description={season.description}
                    href={season.href}
                    image={season.image}
                    imageAlt={season.title}
                    readMoreText={c.readMore}
                  />
                ))}
              </div>
            </section>

            {/* Monthly Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {lang === "fi" ? "Levi kuukausi kuukaudelta" : lang === "nl" ? "Levi maand voor maand" : lang === "sv" ? "Levi månad för månad" : lang === "de" ? "Levi Monat für Monat" : lang === "es" ? "Levi mes a mes" : lang === "fr" ? "Levi mois par mois" : "Levi Month by Month"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {monthlyData[lang]?.map((m) => (
                  <Link
                    key={m.month}
                    to={m.href}
                    className="group block rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/50 hover:bg-card/80 transition-all"
                  >
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                      {m.month}
                    </div>
                    <div className="text-xs text-primary/70 mt-0.5 italic">{m.tag}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.temp}</div>
                  </Link>
                )) || null}
              </div>
            </section>

            {/* Read Next */}
            {(() => {
              const readNextData: Record<string, { title: string; links: { title: string; desc: string; href: string }[] }> = {
                fi: {
                  title: "Lue myös",
                  links: [
                    { title: "Aktiviteetit Levillä", desc: "Kaikki Levin aktiviteetit", href: "/opas/aktiviteetit-levi" },
                    { title: "Matkaopas", desc: "Käytännön vinkit Levin lomaan", href: "/opas/matkaopas-levi" },
                    { title: "Majoitukset", desc: "Varaa majoitus Leviltä", href: "/majoitukset" },
                  ],
                },
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Activities in Levi", desc: "All Levi activities", href: "/guide/activities-in-levi" },
                    { title: "Travel Guide", desc: "Practical tips for your Levi trip", href: "/guide/travel-to-levi" },
                    { title: "Accommodations", desc: "Book your stay in Levi", href: "/en/accommodations" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Activiteiten in Levi", desc: "Alle activiteiten in Levi", href: "/nl/gids/activiteiten-in-levi" },
                    { title: "Reisgids", desc: "Praktische tips voor je Levi-reis", href: "/nl/gids/reisgids-levi" },
                    { title: "Accommodaties", desc: "Boek je verblijf in Levi", href: "/nl/accommodaties" },
                  ],
                },
              };
              const rn = readNextData[lang] || readNextData.en;
              return <><GuideDisclaimer lang={lang} /><ReadNextSection title={rn.title} links={rn.links} /></>;
            })()}

            {/* Booking CTA */}
            <section className="text-center">
              <Button asChild size="lg">
                <Link to={c.accommodationsLink}>
                  {c.bookCta}
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

export default SeasonsHub;
