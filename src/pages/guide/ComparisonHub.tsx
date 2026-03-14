import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import GuideHubCard from "@/components/guide/GuideHubCard";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Mountain, MapPin, Home, Calendar, Thermometer, Scale } from "lucide-react";
import { Language } from "@/translations";

interface ComparisonHubProps {
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
  guides: {
    id: string;
    title: string;
    description: string;
    href: string;
    iconKey: string;
  }[];
}> = {
  fi: {
    title: "Miksi valita Levi?",
    subtitle: "Vertailut ja päätöksenteon tueksi",
    intro: "Mietitkö mikä hiihtokeskus sopii sinulle parhaiten, tai millainen majoitus olisi juuri oikea? Täältä löydät vertailut ja oppaat päätöksenteon tueksi.",
    metaTitle: "Miksi valita Levi? Vertailut ja oppaat | Leville.net",
    metaDescription: "Vertaile Leviä muihin hiihtokeskuksiin ja löydä sinulle sopiva majoitustyyppi. Levi vs Ylläs, Rovaniemi, Saariselkä – paikallisen vertailu.",
    backToHub: "Takaisin Levi-oppaaseen",
    readMore: "Lue vertailu",
    bookCta: "Varaa Levin lomasi tästä!",
    accommodationsLink: "/majoitukset",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Suomen kolmen suurimman hiihtokeskuksen rinteet, hissit, ladut ja palvelut vertailussa.", href: "/opas/levi-vs-yllas-vs-ruka", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "Kumpi sopii sinulle paremmin lomakohteeksi? Rinteet, sijainti, palvelut ja tunnelma.", href: "/opas/levi-vs-rovaniemi", iconKey: "mapPin" },
      { id: "saariselka", title: "Levi vs Saariselkä", description: "Vilkkaampi tunturikylä vai rauhaisaa hiljaista oleilua? Vertailemme molempia.", href: "/opas/levi-vs-saariselka", iconKey: "mapPin" },
      { id: "cabin-apartment", title: "Mökki vai huoneisto?", description: "Kumpi sopii sinulle – oma rauhallinen mökki vai keskustan lomahuoneisto? Hinnat, sijainti ja erot.", href: "/opas/mokki-vai-huoneisto-levi", iconKey: "home" },
      { id: "best-time", title: "Paras aika vierailla Levillä", description: "Kuukausittainen opas: milloin on paras aika lasketteluun, revontuliin, ruskan ihailuun tai kesälomaan.", href: "/opas/paras-aika-vierailla-levilla", iconKey: "calendar" },
      { id: "weather", title: "Sää ja lämpötilat Levillä", description: "Kuukausittaiset keskiarvot, lumitilanne ja mitä odottaa Levin säältä ympäri vuoden.", href: "/levi/saatieto-levilta", iconKey: "thermometer" },
    ]
  },
  en: {
    title: "Why Choose Levi?",
    subtitle: "Comparisons and decision guides",
    intro: "Wondering which ski resort suits you best, or what type of accommodation to choose? Find honest comparisons and guides to help you decide.",
    metaTitle: "Why Choose Levi? Resort Comparisons & Guides | Leville.net",
    metaDescription: "Compare Levi to Ylläs, Rovaniemi, Saariselkä and more. Honest local comparisons of Finland's top ski resorts and accommodation types.",
    backToHub: "Back to Levi Guide",
    readMore: "Read comparison",
    bookCta: "Book your Levi holiday here!",
    accommodationsLink: "/en/accommodations",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Finland's three biggest ski resorts compared: slopes, lifts, trails and services.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "Which one suits you better? Slopes, location, services and atmosphere.", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
      { id: "saariselka", title: "Levi vs Saariselkä", description: "A lively fell village or peaceful quiet retreat? We compare both.", href: "/guide/levi-vs-saariselka-comparison", iconKey: "mapPin" },
      { id: "cabin-apartment", title: "Cabin or Apartment?", description: "Which suits you – a peaceful cabin or a central holiday apartment? Prices, location and differences.", href: "/guide/cabin-vs-apartment-in-levi", iconKey: "home" },
      { id: "best-time", title: "Best Time to Visit Levi", description: "Monthly guide: the best time for skiing, northern lights, autumn colors or summer holidays.", href: "/guide/best-time-to-visit-levi", iconKey: "calendar" },
      { id: "weather", title: "Weather in Levi", description: "Monthly averages, snow conditions and what to expect from Levi's weather year-round.", href: "/en/levi/weather-in-levi", iconKey: "thermometer" },
    ]
  },
  sv: {
    title: "Varför välja Levi?",
    subtitle: "Jämförelser och beslutsguider",
    intro: "Undrar du vilken skidort som passar dig bäst? Här hittar du ärliga jämförelser och guider.",
    metaTitle: "Varför välja Levi? Jämförelser och guider | Leville.net",
    metaDescription: "Jämför Levi med Ylläs, Rovaniemi och Saariselkä. Lokala jämförelser av Finlands bästa skidorter.",
    backToHub: "Tillbaka till Levi-guiden",
    readMore: "Läs jämförelse",
    bookCta: "Boka din Levi-semester här!",
    accommodationsLink: "/sv/boende",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Finlands tre största skidorter jämförda.", href: "/guide/levi-vs-yllas-vs-ruka-comparison", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "Vilken passar dig bäst som semesterdestination?", href: "/guide/levi-vs-rovaniemi-comparison", iconKey: "mapPin" },
      { id: "saariselka", title: "Levi vs Saariselkä", description: "Livlig fjällby eller lugn och ro?", href: "/guide/levi-vs-saariselka-comparison", iconKey: "mapPin" },
    ]
  },
  de: {
    title: "Warum Levi wählen?",
    subtitle: "Vergleiche und Entscheidungshilfen",
    intro: "Sie fragen sich, welches Skigebiet am besten zu Ihnen passt? Hier finden Sie ehrliche Vergleiche und Guides.",
    metaTitle: "Warum Levi wählen? Vergleiche und Guides | Leville.net",
    metaDescription: "Vergleichen Sie Levi mit Ylläs, Rovaniemi und Saariselkä. Lokale Vergleiche der besten Skigebiete Finnlands.",
    backToHub: "Zurück zum Levi-Guide",
    readMore: "Vergleich lesen",
    bookCta: "Buchen Sie Ihren Levi-Urlaub hier!",
    accommodationsLink: "/de/unterkuenfte",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Finlands drei größte Skigebiete im Vergleich.", href: "/de/guide/levi-vs-yllas-vs-ruka", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "Welches passt besser zu Ihnen als Urlaubsziel?", href: "/de/guide/levi-vs-rovaniemi", iconKey: "mapPin" },
    ]
  },
  es: {
    title: "¿Por qué elegir Levi?",
    subtitle: "Comparaciones y guías de decisión",
    intro: "¿Te preguntas qué estación de esquí es mejor para ti? Aquí encontrarás comparaciones honestas y guías.",
    metaTitle: "¿Por qué elegir Levi? Comparaciones y guías | Leville.net",
    metaDescription: "Compara Levi con Ylläs, Rovaniemi y Saariselkä. Comparaciones locales de las mejores estaciones de esquí de Finlandia.",
    backToHub: "Volver a la guía de Levi",
    readMore: "Leer comparación",
    bookCta: "¡Reserva tus vacaciones en Levi aquí!",
    accommodationsLink: "/es/alojamientos",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Las tres estaciones de esquí más grandes de Finlandia comparadas.", href: "/es/guia/levi-vs-yllas-vs-ruka", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "¿Cuál te conviene más como destino vacacional?", href: "/es/guia/levi-vs-rovaniemi", iconKey: "mapPin" },
    ]
  },
  fr: {
    title: "Pourquoi choisir Levi ?",
    subtitle: "Comparaisons et guides de décision",
    intro: "Vous vous demandez quelle station de ski vous convient le mieux ? Trouvez des comparaisons honnêtes et des guides.",
    metaTitle: "Pourquoi choisir Levi ? Comparaisons et guides | Leville.net",
    metaDescription: "Comparez Levi avec Ylläs, Rovaniemi et Saariselkä. Comparaisons locales des meilleures stations de ski de Finlande.",
    backToHub: "Retour au guide de Levi",
    readMore: "Lire la comparaison",
    bookCta: "Réservez vos vacances à Levi ici !",
    accommodationsLink: "/fr/hebergements",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "Les trois plus grandes stations de ski de Finlande comparées.", href: "/fr/guide/levi-vs-yllas-vs-ruka", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "Laquelle vous convient le mieux comme destination de vacances ?", href: "/fr/guide/levi-vs-rovaniemi", iconKey: "mapPin" },
    ]
  },
  nl: {
    title: "Waarom Levi kiezen?",
    subtitle: "Vergelijkingen en keuzegidsen",
    intro: "Vraag je je af welk skigebied het beste bij je past? Hier vind je eerlijke vergelijkingen en gidsen.",
    metaTitle: "Waarom Levi kiezen? Vergelijkingen en gidsen | Leville.net",
    metaDescription: "Vergelijk Levi met Ylläs, Rovaniemi en Saariselkä. Lokale vergelijkingen van de beste skigebieden in Finland.",
    backToHub: "Terug naar Levi-gids",
    readMore: "Lees vergelijking",
    bookCta: "Boek uw Levi-vakantie hier!",
    accommodationsLink: "/nl/accommodaties",
    guides: [
      { id: "yllas-ruka", title: "Levi vs Ylläs vs Ruka", description: "De drie grootste skigebieden van Finland vergeleken.", href: "/nl/gids/levi-vs-yllas-vs-ruka", iconKey: "mountain" },
      { id: "rovaniemi", title: "Levi vs Rovaniemi", description: "Welke past het beste bij jou als vakantiebestemming?", href: "/nl/gids/levi-vs-rovaniemi", iconKey: "mapPin" },
    ]
  }
};

const iconMap: Record<string, typeof Mountain> = {
  mountain: Mountain,
  mapPin: MapPin,
  home: Home,
  calendar: Calendar,
  thermometer: Thermometer,
  scale: Scale
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const hubLinks: Record<Language, string> = {
  fi: "/levi", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi"
};

const canonicalUrls: Record<Language, string> = {
  fi: "https://leville.net/opas/miksi-valita-levi",
  en: "https://leville.net/guide/why-choose-levi",
  sv: "https://leville.net/sv/guide/why-choose-levi",
  de: "https://leville.net/de/guide/why-choose-levi",
  es: "https://leville.net/es/guide/why-choose-levi",
  fr: "https://leville.net/fr/guide/why-choose-levi",
  nl: "https://leville.net/nl/gids/waarom-levi-kiezen"
};

const ComparisonHub = ({ lang = "fi" }: ComparisonHubProps) => {
  const location = useLocation();
  const c = content[lang];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={{ fi: "/opas/miksi-valita-levi", en: "/guide/why-choose-levi", nl: "/nl/gids/waarom-levi-kiezen" }} />
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.metaTitle} />
        <meta name="twitter:description" content={c.metaDescription} />

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
              itemListElement: c.guides.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://leville.net${g.href}`,
                name: g.title,
              })),
            },
          })}
        </script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${lang === "fi" ? "/" : "/en"}` },
        { name: lang === "fi" ? "Levi-opas" : "Levi Guide", url: `https://leville.net${hubLinks[lang]}` },
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

            {/* Guide Cards */}
            <section className="mb-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {c.guides.map((guide) => {
                  const Icon = iconMap[guide.iconKey] || Scale;
                  return (
                    <GuideHubCard
                      key={guide.id}
                      title={guide.title}
                      description={guide.description}
                      href={guide.href}
                      icon={Icon}
                      readMoreText={c.readMore}
                    />
                  );
                })}
              </div>
            </section>

            {/* Read Next */}
            {(() => {
              const readNextData: Record<string, { title: string; links: { title: string; desc: string; href: string }[] }> = {
                fi: {
                  title: "Lue myös",
                  links: [
                    { title: "Vuodenajat Levillä", desc: "Valitse paras ajankohta", href: "/opas/vuodenajat-levi" },
                    { title: "Aktiviteetit Levillä", desc: "Mitä tehdä perillä", href: "/opas/aktiviteetit-levi" },
                    { title: "Matkaopas Leville", desc: "Miten pääset perille", href: "/opas/matkaopas-levi" },
                  ],
                },
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Seasons in Levi", desc: "Choose the best time to visit", href: "/guide/seasons-in-levi" },
                    { title: "Activities in Levi", desc: "What to do when you arrive", href: "/guide/activities-in-levi" },
                    { title: "Travel Guide to Levi", desc: "How to get there", href: "/guide/travel-to-levi" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Seizoenen in Levi", desc: "Kies de beste tijd", href: "/nl/gids/seizoenen-in-levi" },
                    { title: "Activiteiten in Levi", desc: "Wat te doen als je er bent", href: "/nl/gids/activiteiten-in-levi" },
                    { title: "Reisgids Levi", desc: "Hoe kom je er", href: "/nl/gids/reisgids-levi" },
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

export default ComparisonHub;
