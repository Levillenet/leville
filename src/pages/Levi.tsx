import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getTouristDestinationSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Mountain, Plane, ArrowRight, Brain, Gift, Star, Snowflake, Flame, Video, Volume2, CloudSun, Sparkles, Scale } from "lucide-react";
import { routeConfig } from "@/translations";
import { getTranslations, Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import PageCTA from "@/components/PageCTA";
import OptimizedImage from "@/components/OptimizedImage";

// Import images
import leviSunsetSlope from "@/assets/levi-sunset-slope.jpg";
import leviSlopes from "@/assets/levi-slopes.jpg";
import leviCampfire from "@/assets/levi-campfire.jpg";

interface LeviProps {
  lang?: Language;
}

const Levi = ({ lang = "fi" }: LeviProps) => {
  const t = getTranslations(lang).levi;
  const location = useLocation();

  const getModerUrl = () => {
    if (lang === "fi") return "https://app.moder.fi/levillenet";
    if (lang === "sv") return "https://app.moder.fi/levillenet?lang=sv";
    return "https://app.moder.fi/levillenet?lang=en";
  };


  // Multilingual content for the simplified HUB
  const content: Record<Language, {
    intro: string;
    seasonsHubTitle: string;
    seasonsHubDesc: string;
    activitiesHubTitle: string;
    activitiesHubDesc: string;
    travelHubTitle: string;
    travelHubDesc: string;
    exploreButton: string;
    bookCta: string;
    bookNow: string;
    readyHeading: string;
    readyDesc: string;
    accommodationsLink: string;
    quizTitle: string;
    quizDesc: string;
    quizButton: string;
    christmasTitle: string;
    christmasDesc: string;
    christmasButton: string;
    liveCamera: string;
    liveCameraDesc: string;
    pronounceLabel: string;
    atmosphereTitle: string;
    quickLinksTitle: string;
    weatherLinkTitle: string;
    weatherLinkDesc: string;
    northernLightsTitle: string;
    northernLightsDesc: string;
    comparisonTitle: string;
    comparisonDesc: string;
    comparisonRovTitle: string;
    comparisonRovDesc: string;
    saunaTitle: string;
    saunaDesc: string;
    eventsTitle: string;
    eventsDesc: string;
  }> = {
    fi: {
      intro: "Löydä kaikki tarvitsemasi Levi-matkaa varten. Tutustu vuodenaikoihin, aktiviteetteihin ja käytännön matkailuoppaisiin.",
      seasonsHubTitle: "Vuodenajat Levillä",
      seasonsHubDesc: "Talven kaamoksesta kesän yöttömään yöhön – jokaisella vuodenajalla on oma erityinen luonteensa.",
      activitiesHubTitle: "Aktiviteetit Levillä",
      activitiesHubDesc: "Laskettelua, hiihtoa, revontulia ja moottorikelkkasafareita – elämyksiä kaikille.",
      travelHubTitle: "Matkaopas Leville",
      travelHubDesc: "Miten pääset perille, mitä vaatteita tarvitset ja käytännön vinkit matkallesi.",
      exploreButton: "Tutustu",
      bookCta: "Varaa majoitus Leviltä",
      bookNow: "Varaa majoitus",
      readyHeading: "Oletko valmis Levi-lomaan?",
      readyDesc: "Tutustu vapaana oleviin majoituksiin ja varaa suoraan meiltä – paras hinta ilman välittäjiä.",
      accommodationsLink: "/majoitukset",
      quizTitle: "Testaa Levi-tietämyksesi!",
      quizDesc: "Pelaa hauska tietovisa Suomen suosituimmasta hiihtokeskuksesta.",
      quizButton: "Aloita visa",
      christmasTitle: "Joulu Lapissa",
      christmasDesc: "Koe taianomainen joulu joulupukin kotimaassa.",
      christmasButton: "Lue lisää",
      liveCamera: "Levin live-kamera",
      liveCameraDesc: "Suora näkymä Levin hiihtokeskuksesta",
      pronounceLabel: "Miten Levi lausutaan?",
      atmosphereTitle: "Levin tunnelmaa",
      quickLinksTitle: "Hyödyllistä tietoa",
      weatherLinkTitle: "Säätietoa Leviltä",
      weatherLinkDesc: "Lumensyvyys, lämpötilat ja vuodenajat",
      northernLightsTitle: "Revontulet Levillä",
      northernLightsDesc: "Opas revontulien katseluun ja ennusteet",
      comparisonHubTitle: "Miksi valita Levi?",
      comparisonHubDesc: "Vertaile Leviä muihin suosittuihin lomakohteisiin",
      saunaTitle: "Saunaopas",
      saunaDesc: "Saunakulttuuri, ohjeet ja elämykset Levillä",
      eventsTitle: "Tapahtumat Levillä",
      eventsDesc: "World Cup, Ylläs-Levi hiihto, Ruskamaraton ja muut tapahtumat"
    },
    en: {
      intro: "Find everything you need for your Levi trip. Explore seasons, activities and practical travel guides.",
      seasonsHubTitle: "Seasons in Levi",
      seasonsHubDesc: "From winter's polar night to summer's midnight sun – each season has its own special character.",
      activitiesHubTitle: "Activities in Levi",
      activitiesHubDesc: "Skiing, cross-country, northern lights and snowmobile safaris – experiences for everyone.",
      travelHubTitle: "Travel Guide to Levi",
      travelHubDesc: "How to get there, what clothes you need and practical tips for your trip.",
      exploreButton: "Explore",
      bookCta: "Book accommodation in Levi",
      bookNow: "Book accommodation",
      readyHeading: "Ready for your Levi holiday?",
      readyDesc: "Browse available accommodations and book directly from us – best price without middlemen.",
      accommodationsLink: "/en/accommodations",
      quizTitle: "Test Your Levi Knowledge!",
      quizDesc: "Take our fun quiz about Finland's favorite ski resort.",
      quizButton: "Start Quiz",
      christmasTitle: "Christmas in Lapland",
      christmasDesc: "Experience a magical Christmas in the home of Santa Claus.",
      christmasButton: "Read more",
      liveCamera: "Levi Live Camera",
      liveCameraDesc: "Live view from Levi ski resort",
      pronounceLabel: "How to pronounce Levi?",
      atmosphereTitle: "Levi Atmosphere",
      quickLinksTitle: "Useful Information",
      weatherLinkTitle: "Weather in Levi",
      weatherLinkDesc: "Snow depth, temperatures and seasons",
      northernLightsTitle: "Northern Lights in Levi",
      northernLightsDesc: "Guide to aurora viewing and forecasts",
      comparisonHubTitle: "Why Choose Levi?",
      comparisonHubDesc: "Compare Levi to other popular resort destinations",
      saunaTitle: "Sauna Guide",
      saunaDesc: "Sauna culture, tips and experiences in Levi",
      eventsTitle: "Events in Levi",
      eventsDesc: "World Cup, Ylläs-Levi ski race, Ruskamarathon and more events"
    },
    sv: {
      intro: "Hitta allt du behöver för din Levi-resa. Utforska årstider, aktiviteter och praktiska reseguider.",
      seasonsHubTitle: "Årstider i Levi",
      seasonsHubDesc: "Från vinterns polarnatt till sommarens midnattssol – varje årstid har sin egen speciella karaktär.",
      activitiesHubTitle: "Aktiviteter i Levi",
      activitiesHubDesc: "Skidåkning, längdskidåkning, norrsken och snöskotursafari – upplevelser för alla.",
      travelHubTitle: "Reseguide till Levi",
      travelHubDesc: "Hur du tar dig dit, vilka kläder du behöver och praktiska tips för din resa.",
      exploreButton: "Utforska",
      bookCta: "Boka boende i Levi",
      bookNow: "Boka boende",
      readyHeading: "Redo för din Levi-semester?",
      readyDesc: "Bläddra bland lediga boenden och boka direkt från oss – bästa pris utan mellanhänder.",
      accommodationsLink: "/sv/boende",
      quizTitle: "Testa din Levi-kunskap!",
      quizDesc: "Spela ett roligt quiz om Finlands populäraste skidort.",
      quizButton: "Starta quiz",
      christmasTitle: "Jul i Lappland",
      christmasDesc: "Upplev en magisk jul i jultomtens hemland.",
      christmasButton: "Läs mer",
      liveCamera: "Levi livekamera",
      liveCameraDesc: "Direktsändning från Levi skidort",
      pronounceLabel: "Hur uttalas Levi?",
      atmosphereTitle: "Levi atmosfär",
      quickLinksTitle: "Användbar information",
      weatherLinkTitle: "Väder i Levi",
      weatherLinkDesc: "Snödjup, temperaturer och årstider",
      northernLightsTitle: "Norrsken i Levi",
      northernLightsDesc: "Guide till norrskensskådning och prognoser",
      comparisonHubTitle: "Varför välja Levi?",
      comparisonHubDesc: "Jämför Levi med andra populära semesterdestinationer",
      saunaTitle: "Bastuguide",
      saunaDesc: "Bastukultur, tips och upplevelser i Levi",
      eventsTitle: "Evenemang i Levi",
      eventsDesc: "World Cup, Ylläs-Levi skidlopp, Ruskamaraton och fler evenemang"
    },
    de: {
      intro: "Finden Sie alles, was Sie für Ihre Levi-Reise brauchen. Entdecken Sie Jahreszeiten, Aktivitäten und praktische Reiseführer.",
      seasonsHubTitle: "Jahreszeiten in Levi",
      seasonsHubDesc: "Von der Polarnacht des Winters bis zur Mitternachtssonne des Sommers – jede Jahreszeit hat ihren besonderen Charakter.",
      activitiesHubTitle: "Aktivitäten in Levi",
      activitiesHubDesc: "Skifahren, Langlauf, Nordlichter und Schneemobilsafaris – Erlebnisse für jeden.",
      travelHubTitle: "Reiseführer nach Levi",
      travelHubDesc: "Wie Sie dorthin kommen, welche Kleidung Sie brauchen und praktische Tipps für Ihre Reise.",
      exploreButton: "Entdecken",
      bookCta: "Unterkunft in Levi buchen",
      bookNow: "Unterkunft buchen",
      readyHeading: "Bereit für Ihren Levi-Urlaub?",
      readyDesc: "Durchsuchen Sie verfügbare Unterkünfte und buchen Sie direkt bei uns – bester Preis ohne Zwischenhändler.",
      accommodationsLink: "/de/unterkuenfte",
      quizTitle: "Teste dein Levi-Wissen!",
      quizDesc: "Spiele unser lustiges Quiz über Finnlands beliebtestes Skigebiet.",
      quizButton: "Quiz starten",
      christmasTitle: "Weihnachten in Lappland",
      christmasDesc: "Erlebe ein magisches Weihnachten in der Heimat des Weihnachtsmanns.",
      christmasButton: "Mehr lesen",
      liveCamera: "Levi Live-Kamera",
      liveCameraDesc: "Live-Blick aus dem Skigebiet Levi",
      pronounceLabel: "Wie spricht man Levi aus?",
      atmosphereTitle: "Levi Atmosphäre",
      quickLinksTitle: "Nützliche Informationen",
      weatherLinkTitle: "Wetter in Levi",
      weatherLinkDesc: "Schneehöhe, Temperaturen und Jahreszeiten",
      northernLightsTitle: "Nordlichter in Levi",
      northernLightsDesc: "Leitfaden zur Polarlichtbeobachtung und Vorhersagen",
      comparisonHubTitle: "Warum Levi wählen?",
      comparisonHubDesc: "Vergleichen Sie Levi mit anderen beliebten Urlaubszielen",
      saunaTitle: "Sauna-Guide",
      saunaDesc: "Saunakultur, Tipps und Erlebnisse in Levi",
      eventsTitle: "Veranstaltungen in Levi",
      eventsDesc: "World Cup, Ylläs-Levi Skilanglauf, Ruskamarathon und weitere Events"
    },
    es: {
      intro: "Encuentra todo lo que necesitas para tu viaje a Levi. Explora estaciones, actividades y guías de viaje prácticas.",
      seasonsHubTitle: "Estaciones en Levi",
      seasonsHubDesc: "Desde la noche polar del invierno hasta el sol de medianoche del verano – cada estación tiene su carácter especial.",
      activitiesHubTitle: "Actividades en Levi",
      activitiesHubDesc: "Esquí, esquí de fondo, auroras boreales y safaris en moto de nieve – experiencias para todos.",
      travelHubTitle: "Guía de viaje a Levi",
      travelHubDesc: "Cómo llegar, qué ropa necesitas y consejos prácticos para tu viaje.",
      exploreButton: "Explorar",
      bookCta: "Reservar alojamiento en Levi",
      bookNow: "Reservar alojamiento",
      readyHeading: "¿Listo para tus vacaciones en Levi?",
      readyDesc: "Explora alojamientos disponibles y reserva directamente con nosotros – mejor precio sin intermediarios.",
      accommodationsLink: "/es/alojamientos",
      quizTitle: "¡Pon a prueba tus conocimientos sobre Levi!",
      quizDesc: "Juega nuestro divertido quiz sobre la estación de esquí más popular de Finlandia.",
      quizButton: "Comenzar quiz",
      christmasTitle: "Navidad en Laponia",
      christmasDesc: "Vive una Navidad mágica en el hogar de Papá Noel.",
      christmasButton: "Leer más",
      liveCamera: "Cámara en vivo de Levi",
      liveCameraDesc: "Vista en directo desde la estación de esquí de Levi",
      pronounceLabel: "¿Cómo se pronuncia Levi?",
      atmosphereTitle: "Ambiente de Levi",
      quickLinksTitle: "Información útil",
      weatherLinkTitle: "Clima en Levi",
      weatherLinkDesc: "Profundidad de nieve, temperaturas y estaciones",
      northernLightsTitle: "Auroras Boreales en Levi",
      northernLightsDesc: "Guía para ver auroras y pronósticos",
      comparisonTitle: "Levi vs Ylläs vs Ruka",
      comparisonDesc: "Compara las estaciones de esquí más populares de Laponia",
      comparisonRovTitle: "Levi vs Rovaniemi",
      comparisonRovDesc: "¿Pueblo de montaña o capital de Laponia?",
      saunaTitle: "Guía de sauna",
      saunaDesc: "Cultura de sauna, consejos y experiencias en Levi",
      eventsTitle: "Eventos en Levi",
      eventsDesc: "World Cup, esquí de fondo Ylläs-Levi, Ruskamaratón y más eventos"
    },
    fr: {
      intro: "Trouvez tout ce dont vous avez besoin pour votre voyage à Levi. Explorez les saisons, les activités et les guides de voyage pratiques.",
      seasonsHubTitle: "Saisons à Levi",
      seasonsHubDesc: "De la nuit polaire de l'hiver au soleil de minuit de l'été – chaque saison a son caractère particulier.",
      activitiesHubTitle: "Activités à Levi",
      activitiesHubDesc: "Ski, ski de fond, aurores boréales et safaris en motoneige – des expériences pour tous.",
      travelHubTitle: "Guide de voyage à Levi",
      travelHubDesc: "Comment y arriver, quels vêtements vous avez besoin et conseils pratiques pour votre voyage.",
      exploreButton: "Explorer",
      bookCta: "Réserver un hébergement à Levi",
      bookNow: "Réserver un hébergement",
      readyHeading: "Prêt pour vos vacances à Levi ?",
      readyDesc: "Parcourez les hébergements disponibles et réservez directement chez nous – meilleur prix sans intermédiaires.",
      accommodationsLink: "/fr/hebergements",
      quizTitle: "Testez vos connaissances sur Levi !",
      quizDesc: "Jouez à notre quiz amusant sur la station de ski la plus populaire de Finlande.",
      quizButton: "Commencer le quiz",
      christmasTitle: "Noël en Laponie",
      christmasDesc: "Vivez un Noël magique dans le pays du Père Noël.",
      christmasButton: "En savoir plus",
      liveCamera: "Caméra en direct de Levi",
      liveCameraDesc: "Vue en direct de la station de ski de Levi",
      pronounceLabel: "Comment prononcer Levi ?",
      atmosphereTitle: "Atmosphère de Levi",
      quickLinksTitle: "Informations utiles",
      weatherLinkTitle: "Météo à Levi",
      weatherLinkDesc: "Épaisseur de neige, températures et saisons",
      northernLightsTitle: "Aurores Boréales à Levi",
      northernLightsDesc: "Guide d'observation des aurores et prévisions",
      comparisonTitle: "Levi vs Ylläs vs Ruka",
      comparisonDesc: "Comparez les stations de ski les plus populaires de Laponie",
      comparisonRovTitle: "Levi vs Rovaniemi",
      comparisonRovDesc: "Village de montagne ou capitale de la Laponie ?",
      saunaTitle: "Guide du sauna",
      saunaDesc: "Culture du sauna, conseils et expériences à Levi",
      eventsTitle: "Événements à Levi",
      eventsDesc: "World Cup, ski de fond Ylläs-Levi, Ruskamarathon et plus d'événements"
    },
    nl: {
      intro: "Vind alles wat je nodig hebt voor je Levi-reis. Ontdek seizoenen, activiteiten en praktische reisgidsen.",
      seasonsHubTitle: "Seizoenen in Levi",
      seasonsHubDesc: "Van de poolnacht in de winter tot de middernachtzon in de zomer – elk seizoen heeft zijn eigen bijzondere karakter.",
      activitiesHubTitle: "Activiteiten in Levi",
      activitiesHubDesc: "Skiën, langlaufen, noorderlicht en sneeuwscootersafari's – ervaringen voor iedereen.",
      travelHubTitle: "Reisgids naar Levi",
      travelHubDesc: "Hoe je er komt, welke kleding je nodig hebt en praktische tips voor je reis.",
      exploreButton: "Ontdekken",
      bookCta: "Boek accommodatie in Levi",
      bookNow: "Boek accommodatie",
      readyHeading: "Klaar voor je Levi-vakantie?",
      readyDesc: "Bekijk beschikbare accommodaties en boek rechtstreeks bij ons – beste prijs zonder tussenpersonen.",
      accommodationsLink: "/nl/accommodaties",
      quizTitle: "Test je Levi-kennis!",
      quizDesc: "Speel onze leuke quiz over het populairste skigebied van Finland.",
      quizButton: "Start quiz",
      christmasTitle: "Kerst in Lapland",
      christmasDesc: "Beleef een magische kerst in het thuisland van de Kerstman.",
      christmasButton: "Lees meer",
      liveCamera: "Levi live camera",
      liveCameraDesc: "Live beeld van het skigebied Levi",
      pronounceLabel: "Hoe spreek je Levi uit?",
      atmosphereTitle: "Levi sfeer",
      quickLinksTitle: "Nuttige informatie",
      weatherLinkTitle: "Weer in Levi",
      weatherLinkDesc: "Sneeuwdiepte, temperaturen en seizoenen",
      northernLightsTitle: "Noorderlicht in Levi",
      northernLightsDesc: "Gids voor het bekijken van noorderlicht en voorspellingen",
      comparisonTitle: "Levi vs Ylläs vs Ruka",
      comparisonDesc: "Vergelijk de populairste skigebieden van Lapland",
      comparisonRovTitle: "Levi vs Rovaniemi",
      comparisonRovDesc: "Fjeldorp of hoofdstad van Lapland?",
      saunaTitle: "Saunagids",
      saunaDesc: "Saunacultuur, tips en ervaringen in Levi",
      eventsTitle: "Evenementen in Levi",
      eventsDesc: "World Cup, Ylläs-Levi langlauf, Ruskamarathon en meer evenementen"
    }
  };

  const localeMap: Record<Language, string> = {
    fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
  };

  // HUB links
  const hubLinks: Record<Language, { seasons: string; activities: string; travel: string }> = {
    fi: {
      seasons: "/opas/vuodenajat-levi",
      activities: "/opas/aktiviteetit-levi",
      travel: "/opas/matkaopas-levi"
    },
    en: {
      seasons: "/guide/seasons-in-levi",
      activities: "/guide/activities-in-levi",
      travel: "/guide/travel-to-levi"
    },
    sv: { seasons: "/guide/seasons-in-levi", activities: "/guide/activities-in-levi", travel: "/guide/travel-to-levi" },
    de: { seasons: "/guide/seasons-in-levi", activities: "/guide/activities-in-levi", travel: "/guide/travel-to-levi" },
    es: { seasons: "/guide/seasons-in-levi", activities: "/guide/activities-in-levi", travel: "/guide/travel-to-levi" },
    fr: { seasons: "/guide/seasons-in-levi", activities: "/guide/activities-in-levi", travel: "/guide/travel-to-levi" },
    nl: { seasons: "/guide/seasons-in-levi", activities: "/guide/activities-in-levi", travel: "/guide/travel-to-levi" }
  };

  const quizLinks: Record<Language, string> = {
    fi: "/tietovisa", en: "/en/quiz", sv: "/sv/quiz", de: "/de/quiz", es: "/es/quiz", fr: "/fr/quiz", nl: "/nl/quiz"
  };

  const christmasLinks: Record<Language, string> = {
    fi: "/levi/joulu-lapissa",
    en: "/en/levi/christmas-in-lapland",
    sv: "/sv/levi/jul-i-lappland",
    de: "/de/levi/weihnachten-in-lappland",
    es: "/es/levi/navidad-en-laponia",
    fr: "/fr/levi/noel-en-laponie",
    nl: "/nl/levi/kerst-in-lapland"
  };

  const weatherLinks: Record<Language, string> = {
    fi: "/levi/saatieto-levilta",
    en: "/en/levi/weather-in-levi",
    sv: "/levi/saatieto-levilta",
    de: "/levi/saatieto-levilta",
    es: "/levi/saatieto-levilta",
    fr: "/levi/saatieto-levilta",
    nl: "/en/levi/weather-in-levi"
  };

  const comparisonLinks: Record<Language, { yllas: string; rovaniemi: string }> = {
    fi: { yllas: "/opas/levi-vs-yllas-vs-ruka", rovaniemi: "/opas/levi-vs-rovaniemi" },
    en: { yllas: "/guide/levi-vs-yllas-vs-ruka-comparison", rovaniemi: "/guide/levi-vs-rovaniemi-comparison" },
    sv: { yllas: "/guide/levi-vs-yllas-vs-ruka-comparison", rovaniemi: "/guide/levi-vs-rovaniemi-comparison" },
    de: { yllas: "/de/guide/levi-vs-yllas-vs-ruka", rovaniemi: "/de/guide/levi-vs-rovaniemi" },
    es: { yllas: "/es/guia/levi-vs-yllas-vs-ruka", rovaniemi: "/es/guia/levi-vs-rovaniemi" },
    fr: { yllas: "/fr/guide/levi-vs-yllas-vs-ruka", rovaniemi: "/fr/guide/levi-vs-rovaniemi" },
    nl: { yllas: "/nl/gids/levi-vs-yllas-vs-ruka", rovaniemi: "/nl/gids/levi-vs-rovaniemi" },
  };

  const c = content[lang];
  const hubs = hubLinks[lang];
  const hasDetailedHubs = lang === "fi" || lang === "en";

  const hubCards = [
    {
      icon: Calendar,
      title: c.seasonsHubTitle,
      description: c.seasonsHubDesc,
      href: hubs.seasons,
      gradient: "from-sky-500/10 via-blue-500/5 to-transparent"
    },
    {
      icon: Mountain,
      title: c.activitiesHubTitle,
      description: c.activitiesHubDesc,
      href: hubs.activities,
      gradient: "from-emerald-500/10 via-green-500/5 to-transparent"
    },
    {
      icon: Plane,
      title: c.travelHubTitle,
      description: c.travelHubDesc,
      href: hubs.travel,
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent"
    }
  ];

  const galleryImages = [
    { src: leviSunsetSlope, alt: t.gallery[0]?.alt || "Levi sunset" },
    { src: leviSlopes, alt: t.gallery[1]?.alt || "Levi slopes" },
    { src: leviCampfire, alt: t.gallery[2]?.alt || "Lapland campfire" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getTouristDestinationSchema(lang)} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={localeMap[lang]} />
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
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-10 sm:mb-14 px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2">
                {t.subtitle}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mx-auto">
                {c.intro}
              </p>
            </section>

            {/* Booking CTA after hero */}
            <section className="mb-10 sm:mb-14 text-center">
              <Button asChild size="lg" className="text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 shadow-lg animate-pulse-subtle">
                <a href={getModerUrl()} target="_blank" rel="noopener noreferrer">
                  {c.bookNow}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </section>


            <section className="mb-12 sm:mb-16">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {hubCards.map((hub) => {
                  const Icon = hub.icon;
                  const isDetailedLink = hasDetailedHubs || hub.href !== hubLinks[lang].seasons;
                  
                  return (
                    <Link 
                      key={hub.title}
                      to={hub.href}
                      className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
                      aria-label={`${c.exploreButton}: ${hub.title}`}
                    >
                      <Card className={`glass-card border-border/30 hover:border-primary/50 transition-all duration-300 h-full cursor-pointer group overflow-hidden bg-gradient-to-br ${hub.gradient}`}>
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Icon className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {hub.title}
                              </h2>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {hub.description}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                              {c.exploreButton}
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Quick Links Section */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 text-center">
                {c.quickLinksTitle}
              </h2>
              <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
                {/* Weather Link */}
                <Link 
                  to={weatherLinks[lang]}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <CloudSun className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                            {c.weatherLinkTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {c.weatherLinkDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Northern Lights Link */}
                <Link 
                  to={routeConfig.northernLights[lang]}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                            {c.northernLightsTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {c.northernLightsDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Comparison Link */}
                <Link 
                  to={comparisonLinks[lang]?.yllas || "/guide/levi-vs-yllas-vs-ruka-comparison"}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Scale className="w-5 h-5 text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                            {c.comparisonTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {c.comparisonDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Levi vs Rovaniemi Link */}
                <Link 
                  to={comparisonLinks[lang]?.rovaniemi || "/guide/levi-vs-rovaniemi-comparison"}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-rose-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Scale className="w-5 h-5 text-rose-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                            {c.comparisonRovTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {c.comparisonRovDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Sauna Guide Link */}
                <Link 
                  to={routeConfig.finnishSauna[lang]}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Flame className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                            {c.saunaTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {c.saunaDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Events Link */}
                <Link 
                  to={routeConfig.events[lang]}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Calendar className="w-5 h-5 text-sky-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                            {c.eventsTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {c.eventsDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>

            {/* Booking Banner */}
            <section className="mb-12 sm:mb-16">
              <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 overflow-hidden">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {c.readyHeading}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-5 max-w-lg mx-auto">
                    {c.readyDesc}
                  </p>
                  <Button asChild size="lg" className="text-base px-8">
                    <a href={getModerUrl()} target="_blank" rel="noopener noreferrer">
                      {c.bookNow}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </section>


            <section className="mb-12 sm:mb-16 grid sm:grid-cols-2 gap-4">
              {/* Quiz CTA */}
              <Card className="glass-card border-primary/30 bg-primary/5 overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {c.quizTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {c.quizDesc}
                      </p>
                    </div>
                    <Button asChild size="default" className="text-sm">
                      <Link to={quizLinks[lang]}>
                        {c.quizButton}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Christmas CTA */}
              <Card className="relative overflow-hidden border-red-500/40 bg-gradient-to-br from-red-950/40 via-red-900/20 to-background">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <Star className="absolute top-3 left-4 w-4 h-4 text-amber-400/40 animate-pulse" style={{ animationDelay: '0s' }} />
                  <Snowflake className="absolute top-4 right-6 w-5 h-5 text-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <Flame className="absolute bottom-4 left-6 w-4 h-4 text-amber-500/35 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <CardContent className="p-4 sm:p-6 relative z-10">
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/25 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                      <Gift className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {c.christmasTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {c.christmasDesc}
                      </p>
                    </div>
                    <Button asChild size="default" className="text-sm bg-red-600 hover:bg-red-700 text-white border-0">
                      <Link to={christmasLinks[lang]}>
                        {c.christmasButton}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Atmosphere Gallery Section */}
            <section className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 text-center">
                {c.atmosphereTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-2xl aspect-[4/3]">
                    <OptimizedImage 
                      src={image.src} 
                      alt={image.alt}
                      priority={index === 0}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </section>

            {/* Live Camera Section */}
            <section className="mb-10 sm:mb-14">
              <Card className="glass-card border-border/30 overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4">
                    <div className="relative">
                      <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{c.liveCamera}</h3>
                  </div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.youtube.com/embed/Wr9b5aYA4mI?autoplay=0&rel=0"
                      title="Levi Live Camera"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-center">
                    {c.liveCameraDesc}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Strong Booking CTA */}
            <section className="mb-10 text-center">
              <Button asChild size="lg" className="text-base px-8">
                <a href={getModerUrl()} target="_blank" rel="noopener noreferrer">
                  {c.bookCta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </section>

            {/* Pronunciation Link */}
            <section className="text-center">
              <Link 
                to="/levi-pronounce" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Volume2 className="w-4 h-4 group-hover:text-primary" />
                <span className="text-sm underline-offset-4 group-hover:underline">{c.pronounceLabel}</span>
              </Link>
            </section>
            <GuideDisclaimer lang={lang} />
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

export default Levi;
