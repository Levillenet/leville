import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import WhatsAppChat from "@/components/WhatsAppChat";
import GuideHubCard from "@/components/guide/GuideHubCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Mountain, Snowflake, Sun, Sparkles, Dog, TreePine } from "lucide-react";
import { Language } from "@/translations";

interface ActivitiesHubProps {
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
  activities: {
    id: string;
    title: string;
    description: string;
    href: string;
    iconKey: string;
  }[];
}> = {
  fi: {
    title: "Aktiviteetit Levillä",
    subtitle: "Elämyksiä jokaiselle",
    intro: "Levi tarjoaa monipuolisia aktiviteetteja ympäri vuoden. Laskettelusta revontulisafareihin, hiihdosta koiravaljakkoajeluihin – löydä täydellinen elämys Lapissa.",
    metaTitle: "Aktiviteetit Levillä – Laskettelu, hiihto, revontulet | Leville.net",
    metaDescription: "Tutustu Levin parhaisiin aktiviteetteihin: laskettelu, hiihto, revontulet, moottorikelkkasafarit ja paljon muuta. Löydä unelmien Lappi-elämys.",
    backToHub: "Takaisin Levi-oppaaseen",
    readMore: "Lue opas",
    bookCta: "Varaa majoitus Leviltä",
    accommodationsLink: "/majoitukset",
    activities: [
      { id: "skiing", title: "Laskettelu", description: "43 rinnettä ja 28 hissiä – Suomen suosituin hiihtokeskus tarjoaa laskettelua kaikille tasoille.", href: "/opas/laskettelu-levi", iconKey: "mountain" },
      { id: "cross-country", title: "Hiihto", description: "Yli 230 kilometriä huollettuja latuja upeissa Lapin maisemissa.", href: "/opas/hiihto-levi", iconKey: "snowflake" },
      { id: "aurora", title: "Revontulet", description: "Levillä nähdään revontulia noin 200 yönä vuodessa. Opi parhaat bongauspaikat.", href: "/revontulet", iconKey: "sparkles" },
      { id: "snowmobile", title: "Moottorikelkkasafari", description: "Koe Lapin erämaiden huima vauhti ja vapaus moottorikelkkasafarilla.", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi", iconKey: "sun" },
      { id: "husky", title: "Koiravaljakkoajelu", description: "Unohtumaton elämys huskyjen kanssa Lapin talvisessa luonnossa.", href: "/levi", iconKey: "dog" },
      { id: "hiking", title: "Vaellus", description: "Tunturireittejä ja luontopolkuja kaikentasoisille vaeltajille.", href: "/levi", iconKey: "treepine" }
    ]
  },
  en: {
    title: "Activities in Levi",
    subtitle: "Experiences for everyone",
    intro: "Levi offers diverse activities year-round. From skiing to aurora safaris, cross-country to husky rides – find your perfect Lapland experience.",
    metaTitle: "Activities in Levi – Skiing, Cross-Country, Northern Lights | Leville.net",
    metaDescription: "Explore the best activities in Levi: skiing, cross-country, northern lights, snowmobile safaris and more. Find your dream Lapland experience.",
    backToHub: "Back to Levi Guide",
    readMore: "Read guide",
    bookCta: "Book accommodation in Levi",
    accommodationsLink: "/en/accommodations",
    activities: [
      { id: "skiing", title: "Skiing", description: "43 slopes and 28 lifts – Finland's most popular ski resort offers skiing for all levels.", href: "/guide/skiing-in-levi", iconKey: "mountain" },
      { id: "cross-country", title: "Cross-Country Skiing", description: "Over 230 kilometers of groomed trails in stunning Lapland scenery.", href: "/guide/cross-country-skiing-in-levi", iconKey: "snowflake" },
      { id: "aurora", title: "Northern Lights", description: "Aurora can be seen on about 200 nights per year in Levi. Learn the best viewing spots.", href: "/en/northern-lights", iconKey: "sparkles" },
      { id: "snowmobile", title: "Snowmobile Safari", description: "Experience the thrill and freedom of Lapland wilderness on a snowmobile safari.", href: "/activities/snowmobile-safari-tips-levi", iconKey: "sun" },
      { id: "husky", title: "Husky Safari", description: "An unforgettable experience with huskies in Lapland's winter nature.", href: "/en/levi", iconKey: "dog" },
      { id: "hiking", title: "Hiking", description: "Fell trails and nature paths for hikers of all levels.", href: "/en/levi", iconKey: "treepine" }
    ]
  },
  sv: {
    title: "Aktiviteter i Levi",
    subtitle: "Upplevelser för alla",
    intro: "Levi erbjuder varierade aktiviteter året runt. Från skidåkning till norrskensafari, längdskidåkning till hundspann – hitta din perfekta Lapplands-upplevelse.",
    metaTitle: "Aktiviteter i Levi – Skidåkning, längdskidåkning, norrsken | Leville.net",
    metaDescription: "Utforska de bästa aktiviteterna i Levi: skidåkning, längdskidåkning, norrsken, snöskotursafari och mer.",
    backToHub: "Tillbaka till Levi-guiden",
    readMore: "Läs guide",
    bookCta: "Boka boende i Levi",
    accommodationsLink: "/sv/boende",
    activities: [
      { id: "skiing", title: "Skidåkning", description: "43 backar och 28 liftar – Finlands populäraste skidort erbjuder skidåkning för alla nivåer.", href: "/sv/levi", iconKey: "mountain" },
      { id: "cross-country", title: "Längdskidåkning", description: "Över 230 kilometer preparerade spår i fantastiska Lapplands-landskap.", href: "/sv/levi", iconKey: "snowflake" },
      { id: "aurora", title: "Norrsken", description: "Norrsken kan ses cirka 200 nätter per år i Levi. Lär dig de bästa platserna.", href: "/sv/norrsken", iconKey: "sparkles" },
      { id: "snowmobile", title: "Snöskotursafari", description: "Upplev spänningen och friheten i Lapplands vildmark på snöskotersafari.", href: "/sv/levi", iconKey: "sun" },
      { id: "husky", title: "Hundspann", description: "En oförglömlig upplevelse med huskies i Lapplands vinternatur.", href: "/sv/levi", iconKey: "dog" },
      { id: "hiking", title: "Vandring", description: "Fjälleder och naturstigar för vandrare på alla nivåer.", href: "/sv/levi", iconKey: "treepine" }
    ]
  },
  de: {
    title: "Aktivitäten in Levi",
    subtitle: "Erlebnisse für jeden",
    intro: "Levi bietet vielfältige Aktivitäten das ganze Jahr. Von Skifahren bis Nordlichtsafari, Langlauf bis Hundeschlittenfahrt – finden Sie Ihr perfektes Lappland-Erlebnis.",
    metaTitle: "Aktivitäten in Levi – Skifahren, Langlauf, Nordlichter | Leville.net",
    metaDescription: "Entdecken Sie die besten Aktivitäten in Levi: Skifahren, Langlauf, Nordlichter, Schneemobilsafaris und mehr.",
    backToHub: "Zurück zum Levi-Guide",
    readMore: "Guide lesen",
    bookCta: "Unterkunft in Levi buchen",
    accommodationsLink: "/de/unterkuenfte",
    activities: [
      { id: "skiing", title: "Skifahren", description: "43 Pisten und 28 Lifte – Finnlands beliebtestes Skigebiet bietet Skifahren für alle Levels.", href: "/de/levi", iconKey: "mountain" },
      { id: "cross-country", title: "Langlauf", description: "Über 230 Kilometer präparierte Loipen in atemberaubender Lappland-Landschaft.", href: "/de/levi", iconKey: "snowflake" },
      { id: "aurora", title: "Nordlichter", description: "Nordlichter sind an etwa 200 Nächten pro Jahr in Levi sichtbar.", href: "/de/nordlichter", iconKey: "sparkles" },
      { id: "snowmobile", title: "Schneemobilsafari", description: "Erleben Sie den Nervenkitzel der Lappland-Wildnis auf einer Schneemobilsafari.", href: "/de/levi", iconKey: "sun" },
      { id: "husky", title: "Hundeschlittenfahrt", description: "Ein unvergessliches Erlebnis mit Huskies in Lapplands Winternatur.", href: "/de/levi", iconKey: "dog" },
      { id: "hiking", title: "Wandern", description: "Fjellwege und Naturpfade für Wanderer aller Niveaus.", href: "/de/levi", iconKey: "treepine" }
    ]
  },
  es: {
    title: "Actividades en Levi",
    subtitle: "Experiencias para todos",
    intro: "Levi ofrece diversas actividades durante todo el año. Desde esquí hasta safaris de auroras boreales, esquí de fondo hasta paseos en trineo – encuentra tu experiencia perfecta en Laponia.",
    metaTitle: "Actividades en Levi – Esquí, esquí de fondo, auroras boreales | Leville.net",
    metaDescription: "Explora las mejores actividades en Levi: esquí, esquí de fondo, auroras boreales, safaris en moto de nieve y más.",
    backToHub: "Volver a la guía de Levi",
    readMore: "Leer guía",
    bookCta: "Reservar alojamiento en Levi",
    accommodationsLink: "/es/alojamientos",
    activities: [
      { id: "skiing", title: "Esquí", description: "43 pistas y 28 remontes – La estación de esquí más popular de Finlandia ofrece esquí para todos los niveles.", href: "/es/levi", iconKey: "mountain" },
      { id: "cross-country", title: "Esquí de fondo", description: "Más de 230 kilómetros de pistas preparadas en impresionantes paisajes de Laponia.", href: "/es/levi", iconKey: "snowflake" },
      { id: "aurora", title: "Auroras boreales", description: "Las auroras se pueden ver unas 200 noches al año en Levi.", href: "/es/auroras-boreales", iconKey: "sparkles" },
      { id: "snowmobile", title: "Safari en moto de nieve", description: "Experimenta la emoción y libertad de la naturaleza de Laponia en un safari en moto de nieve.", href: "/es/levi", iconKey: "sun" },
      { id: "husky", title: "Safari de huskies", description: "Una experiencia inolvidable con huskies en la naturaleza invernal de Laponia.", href: "/es/levi", iconKey: "dog" },
      { id: "hiking", title: "Senderismo", description: "Rutas de montaña y senderos naturales para excursionistas de todos los niveles.", href: "/es/levi", iconKey: "treepine" }
    ]
  },
  fr: {
    title: "Activités à Levi",
    subtitle: "Expériences pour tous",
    intro: "Levi offre des activités variées toute l'année. Du ski aux safaris aurores boréales, du ski de fond aux balades en traîneau – trouvez votre expérience parfaite en Laponie.",
    metaTitle: "Activités à Levi – Ski, ski de fond, aurores boréales | Leville.net",
    metaDescription: "Découvrez les meilleures activités à Levi : ski, ski de fond, aurores boréales, safaris en motoneige et plus.",
    backToHub: "Retour au guide de Levi",
    readMore: "Lire le guide",
    bookCta: "Réserver un hébergement à Levi",
    accommodationsLink: "/fr/hebergements",
    activities: [
      { id: "skiing", title: "Ski", description: "43 pistes et 28 remontées – La station de ski la plus populaire de Finlande offre du ski pour tous les niveaux.", href: "/fr/levi", iconKey: "mountain" },
      { id: "cross-country", title: "Ski de fond", description: "Plus de 230 kilomètres de pistes damées dans des paysages époustouflants de Laponie.", href: "/fr/levi", iconKey: "snowflake" },
      { id: "aurora", title: "Aurores boréales", description: "Les aurores sont visibles environ 200 nuits par an à Levi.", href: "/fr/aurores-boreales", iconKey: "sparkles" },
      { id: "snowmobile", title: "Safari motoneige", description: "Vivez le frisson et la liberté de la nature lapone lors d'un safari en motoneige.", href: "/fr/levi", iconKey: "sun" },
      { id: "husky", title: "Safari chiens de traîneau", description: "Une expérience inoubliable avec des huskies dans la nature hivernale de Laponie.", href: "/fr/levi", iconKey: "dog" },
      { id: "hiking", title: "Randonnée", description: "Sentiers de fjell et chemins naturels pour randonneurs de tous niveaux.", href: "/fr/levi", iconKey: "treepine" }
    ]
  }
};

const iconMap: Record<string, typeof Mountain> = {
  mountain: Mountain,
  snowflake: Snowflake,
  sun: Sun,
  sparkles: Sparkles,
  dog: Dog,
  treepine: TreePine
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR"
};

const hubLinks: Record<Language, string> = {
  fi: "/levi", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi"
};

const canonicalUrls: Record<Language, string> = {
  fi: "https://leville.net/opas/aktiviteetit-levi",
  en: "https://leville.net/guide/activities-in-levi",
  sv: "https://leville.net/sv/guide/activities-in-levi",
  de: "https://leville.net/de/guide/activities-in-levi",
  es: "https://leville.net/es/guide/activities-in-levi",
  fr: "https://leville.net/fr/guide/activities-in-levi"
};

const ActivitiesHub = ({ lang = "fi" }: ActivitiesHubProps) => {
  const location = useLocation();
  const c = content[lang];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
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
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.metaTitle} />
        <meta name="twitter:description" content={c.metaDescription} />
      </Helmet>
      
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

            {/* Activity Cards */}
            <section className="mb-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {c.activities.map((activity) => {
                  const Icon = iconMap[activity.iconKey];
                  return (
                    <GuideHubCard
                      key={activity.id}
                      title={activity.title}
                      description={activity.description}
                      href={activity.href}
                      icon={Icon}
                      readMoreText={c.readMore}
                    />
                  );
                })}
              </div>
            </section>

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
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default ActivitiesHub;
