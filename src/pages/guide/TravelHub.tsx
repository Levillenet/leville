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
import { ArrowRight, ArrowLeft, Plane, Shirt, Bus, UtensilsCrossed, Baby, Footprints, Thermometer, Flame, BookOpen, Euro, Droplets } from "lucide-react";
import { Language } from "@/translations";

interface TravelHubProps {
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
    title: "Matkaopas Leville",
    subtitle: "Kaikki mitä tarvitset matkallesi",
    intro: "Suunnitteletko matkaa Leville? Löydä käytännölliset oppaat matkustamiseen, pukeutumiseen ja palveluihin Levin hiihtokeskuksessa.",
    metaTitle: "Matkaopas Leville – Matkustaminen, pukeutuminen, palvelut | Leville.net",
    metaDescription: "Suunnittele täydellinen Levi-matka: miten pääset perille, mitä vaatteita tarvitset, paikalliset palvelut ja vinkit lapsiperheille.",
    backToHub: "Takaisin Levi-oppaaseen",
    readMore: "Lue opas",
    bookCta: "Varaa majoitus Leviltä",
    accommodationsLink: "/majoitukset",
    guides: [
      { id: "getting-there", title: "Miten pääsee Leville", description: "Lentoyhteydet, junayhteydet ja autoilutiedot Leville. Kaikki matkustusvaihtoehdot.", href: "/matka/miten-paasee-leville-helsingista", iconKey: "plane" },
      { id: "clothing", title: "Talvivarusteet", description: "Mitä vaatteita tarvitset Levin talveen? Pukeutumisvinkit -30°C pakkasiin.", href: "/opas/talvivarusteet-leville", iconKey: "shirt" },
      { id: "transport", title: "Liikkuminen Levillä", description: "Skibussit, taksit ja autonvuokraus. Miten liikut kätevästi Levillä.", href: "/opas/liikkuminen-levilla", iconKey: "bus" },
      { id: "services", title: "Ravintolat ja palvelut", description: "Ravintolat, kaupat, vuokraamot ja muut palvelut Levin keskustassa.", href: "/opas/ravintolat-ja-palvelut-levilla", iconKey: "utensils" },
      { id: "family", title: "Lapsiperheet Levillä", description: "Lasten rinteet, aktiviteetit ja käytännön vinkit perhematkoille.", href: "/opas/lapsiperheet-levilla", iconKey: "baby" },
      { id: "car-free", title: "Levi ilman autoa", description: "Miten saavut ja liikut Levillä ilman omaa autoa. Skibussit, kävelyetäisyydet ja keskustamajoitus.", href: "/opas/levi-ilman-autoa", iconKey: "footprints" },
      { id: "heating", title: "Lämmitys mökeissä ja huoneistoissa", description: "Näin toimivat lämmitysjärjestelmät Levillä. Sähköpatterit, lattialämmitys, takat ja ilmalämpöpumput.", href: "/opas/lammitysjarjestelmat-levi", iconKey: "thermometer" },
      { id: "sauna", title: "Saunaopas", description: "Saunakulttuuri, sähkökiukaan käyttöohje ja ainutlaatuiset saunaelämykset Levillä.", href: "/opas/sauna-levilla", iconKey: "flame" },
      { id: "glossary", title: "Lapin sanasto", description: "40+ suomalaista sanaa selityksineen – tykkylumi, kuksa, poronkäristys ja muut.", href: "/opas/lapin-sanasto", iconKey: "book" },
      { id: "prices", title: "Hinnat Levillä", description: "Hissilippujen, ravintoloiden, aktiviteettien ja ruokakauppojen hinnat. Suunnittele budjettisi etukäteen.", href: "/opas/hinnat-levilla", iconKey: "euro" }
    ]
  },
  en: {
    title: "Travel Guide to Levi",
    subtitle: "Everything you need for your trip",
    intro: "Planning a trip to Levi? Find practical guides for traveling, clothing and services at Levi ski resort.",
    metaTitle: "Travel Guide to Levi – Getting There, Clothing, Services | Leville.net",
    metaDescription: "Plan your perfect Levi trip: how to get there, what clothes you need, local services and tips for families with children.",
    backToHub: "Back to Levi Guide",
    readMore: "Read guide",
    bookCta: "Book accommodation in Levi",
    accommodationsLink: "/en/accommodations",
    guides: [
      { id: "getting-there", title: "Getting to Levi", description: "Flight connections, train routes and driving directions to Levi. All travel options.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", iconKey: "plane" },
      { id: "clothing", title: "Winter Clothing", description: "What clothes do you need for Levi winter? Dressing tips for -30°C frost.", href: "/guide/how-to-dress-for-winter-in-levi-lapland", iconKey: "shirt" },
      { id: "transport", title: "Getting Around Levi", description: "Ski buses, taxis and car rental. How to get around conveniently in Levi.", href: "/guide/getting-around-in-levi", iconKey: "bus" },
      { id: "services", title: "Restaurants and Services", description: "Restaurants, shops, rentals and other services in Levi center.", href: "/guide/restaurants-and-services-in-levi", iconKey: "utensils" },
      { id: "family", title: "Families in Levi", description: "Kids' slopes, activities and practical tips for family trips.", href: "/guide/levi-with-children", iconKey: "baby" },
      { id: "car-free", title: "Levi Without a Car", description: "How to arrive and get around in Levi without your own car. Ski buses, walking distances and central accommodation.", href: "/guide/levi-without-a-car", iconKey: "footprints" },
      { id: "heating", title: "Heating Systems in Cabins", description: "How heating systems work in Levi. Electric radiators, floor heating, fireplaces and heat pumps.", href: "/guide/heating-systems-in-levi", iconKey: "thermometer" },
      { id: "sauna", title: "Finnish Sauna Guide", description: "Sauna culture, how to use an electric heater and unique sauna experiences in Levi.", href: "/guide/finnish-sauna-in-levi", iconKey: "flame" },
      { id: "glossary", title: "Lapland Glossary", description: "40+ Finnish words with pronunciations and explanations for visitors.", href: "/guide/lapland-glossary", iconKey: "book" },
      { id: "prices", title: "Prices in Levi", description: "Ski passes, dining, activities and grocery prices. Plan your budget before you go.", href: "/guide/prices-in-levi", iconKey: "euro" }
    ]
  },
  sv: {
    title: "Reseguide till Levi",
    subtitle: "Allt du behöver för din resa",
    intro: "Planerar du en resa till Levi? Hitta praktiska guider för resor, kläder och tjänster vid Levi skidort.",
    metaTitle: "Reseguide till Levi – Resa, kläder, tjänster | Leville.net",
    metaDescription: "Planera din perfekta Levi-resa: hur du tar dig dit, vilka kläder du behöver, lokala tjänster och tips för barnfamiljer.",
    backToHub: "Tillbaka till Levi-guiden",
    readMore: "Läs guide",
    bookCta: "Boka boende i Levi",
    accommodationsLink: "/sv/boende",
    guides: [
      { id: "getting-there", title: "Ta sig till Levi", description: "Flygförbindelser, tågförbindelser och körvägbeskrivningar till Levi.", href: "/sv/levi", iconKey: "plane" },
      { id: "clothing", title: "Vinterkläder", description: "Vilka kläder behöver du för Levis vinter? Klädtips för -30°C frost.", href: "/sv/levi", iconKey: "shirt" },
      { id: "transport", title: "Ta sig runt i Levi", description: "Skidbusar, taxi och biluthyrning. Hur du tar dig runt bekvämt i Levi.", href: "/sv/levi", iconKey: "bus" },
      { id: "services", title: "Restauranger och tjänster", description: "Restauranger, butiker, uthyrning och andra tjänster i Levi centrum.", href: "/sv/levi", iconKey: "utensils" },
      { id: "family", title: "Familjer i Levi", description: "Barnbackar, aktiviteter och praktiska tips för familjeresor.", href: "/sv/levi", iconKey: "baby" }
    ]
  },
  de: {
    title: "Reiseführer nach Levi",
    subtitle: "Alles was Sie für Ihre Reise brauchen",
    intro: "Planen Sie eine Reise nach Levi? Finden Sie praktische Guides für Anreise, Kleidung und Services im Skigebiet Levi.",
    metaTitle: "Reiseführer nach Levi – Anreise, Kleidung, Services | Leville.net",
    metaDescription: "Planen Sie Ihre perfekte Levi-Reise: wie Sie dorthin kommen, welche Kleidung Sie brauchen, lokale Services und Tipps für Familien.",
    backToHub: "Zurück zum Levi-Guide",
    readMore: "Guide lesen",
    bookCta: "Unterkunft in Levi buchen",
    accommodationsLink: "/de/unterkuenfte",
    guides: [
      { id: "getting-there", title: "Anreise nach Levi", description: "Flugverbindungen, Zugverbindungen und Anfahrtswege nach Levi.", href: "/de/levi", iconKey: "plane" },
      { id: "clothing", title: "Winterkleidung", description: "Welche Kleidung brauchen Sie für den Levi-Winter? Kleidungstipps für -30°C Frost.", href: "/de/levi", iconKey: "shirt" },
      { id: "transport", title: "Unterwegs in Levi", description: "Skibusse, Taxis und Autovermietung. Wie Sie bequem in Levi unterwegs sind.", href: "/de/levi", iconKey: "bus" },
      { id: "services", title: "Restaurants und Services", description: "Restaurants, Geschäfte, Verleihe und andere Services im Zentrum von Levi.", href: "/de/levi", iconKey: "utensils" },
      { id: "family", title: "Familien in Levi", description: "Kinderpisten, Aktivitäten und praktische Tipps für Familienreisen.", href: "/de/levi", iconKey: "baby" }
    ]
  },
  es: {
    title: "Guía de viaje a Levi",
    subtitle: "Todo lo que necesitas para tu viaje",
    intro: "¿Planeas un viaje a Levi? Encuentra guías prácticas para viajar, vestimenta y servicios en la estación de esquí de Levi.",
    metaTitle: "Guía de viaje a Levi – Cómo llegar, ropa, servicios | Leville.net",
    metaDescription: "Planifica tu viaje perfecto a Levi: cómo llegar, qué ropa necesitas, servicios locales y consejos para familias.",
    backToHub: "Volver a la guía de Levi",
    readMore: "Leer guía",
    bookCta: "Reservar alojamiento en Levi",
    accommodationsLink: "/es/alojamientos",
    guides: [
      { id: "getting-there", title: "Cómo llegar a Levi", description: "Conexiones de vuelo, rutas de tren e indicaciones para conducir a Levi.", href: "/es/levi", iconKey: "plane" },
      { id: "clothing", title: "Ropa de invierno", description: "¿Qué ropa necesitas para el invierno en Levi? Consejos de vestimenta para -30°C.", href: "/es/levi", iconKey: "shirt" },
      { id: "transport", title: "Moverse por Levi", description: "Autobuses de esquí, taxis y alquiler de coches. Cómo moverte cómodamente en Levi.", href: "/es/levi", iconKey: "bus" },
      { id: "services", title: "Restaurantes y servicios", description: "Restaurantes, tiendas, alquileres y otros servicios en el centro de Levi.", href: "/es/levi", iconKey: "utensils" },
      { id: "family", title: "Familias en Levi", description: "Pistas para niños, actividades y consejos prácticos para viajes familiares.", href: "/es/levi", iconKey: "baby" }
    ]
  },
  fr: {
    title: "Guide de voyage à Levi",
    subtitle: "Tout ce dont vous avez besoin pour votre voyage",
    intro: "Vous planifiez un voyage à Levi ? Trouvez des guides pratiques pour voyager, s'habiller et les services à la station de ski de Levi.",
    metaTitle: "Guide de voyage à Levi – Comment y aller, vêtements, services | Leville.net",
    metaDescription: "Planifiez votre voyage parfait à Levi : comment y arriver, quels vêtements vous avez besoin, services locaux et conseils pour les familles.",
    backToHub: "Retour au guide de Levi",
    readMore: "Lire le guide",
    bookCta: "Réserver un hébergement à Levi",
    accommodationsLink: "/fr/hebergements",
    guides: [
      { id: "getting-there", title: "Se rendre à Levi", description: "Connexions aériennes, liaisons ferroviaires et itinéraires routiers vers Levi.", href: "/fr/levi", iconKey: "plane" },
      { id: "clothing", title: "Vêtements d'hiver", description: "De quels vêtements avez-vous besoin pour l'hiver à Levi ? Conseils vestimentaires pour -30°C.", href: "/fr/levi", iconKey: "shirt" },
      { id: "transport", title: "Se déplacer à Levi", description: "Bus de ski, taxis et location de voiture. Comment se déplacer facilement à Levi.", href: "/fr/levi", iconKey: "bus" },
      { id: "services", title: "Restaurants et services", description: "Restaurants, boutiques, locations et autres services au centre de Levi.", href: "/fr/levi", iconKey: "utensils" },
      { id: "family", title: "Familles à Levi", description: "Pistes pour enfants, activités et conseils pratiques pour les voyages en famille.", href: "/fr/levi", iconKey: "baby" }
    ]
  },
  nl: {
    title: "Reisgids naar Levi",
    subtitle: "Alles wat je nodig hebt voor je reis",
    intro: "Plan je een reis naar Levi? Vind praktische gidsen voor reizen, kleding en diensten bij skigebied Levi.",
    metaTitle: "Reisgids Levi – Praktische tips voor je Lapland vakantie | Leville.net",
    metaDescription: "Alles wat je moet weten voor je reis naar Levi. Vervoer, winterkleding, restaurants, gezinstips en meer.",
    backToHub: "Terug naar Levi-gids",
    readMore: "Lees gids",
    bookCta: "Boek accommodatie in Levi",
    accommodationsLink: "/nl/accommodaties",
    guides: [
      { id: "getting-there", title: "Naar Levi reizen", description: "Vliegverbindingen, treinverbindingen en routebeschrijvingen naar Levi.", href: "/nl/gids/hoe-kom-je-in-levi", iconKey: "plane" },
      { id: "clothing", title: "Winterkleding", description: "Welke kleding heb je nodig voor de winter in Levi? Kledingstips voor -30°C vorst.", href: "/nl/gids/winterkleding-levi-lapland", iconKey: "shirt" },
      { id: "transport", title: "Vervoer in Levi", description: "Skibussen, taxi's en autoverhuur. Hoe je je gemakkelijk verplaatst in Levi.", href: "/nl/levi", iconKey: "bus" },
      { id: "services", title: "Restaurants en diensten", description: "Restaurants, winkels, verhuur en andere diensten in het centrum van Levi.", href: "/nl/levi", iconKey: "utensils" },
      { id: "family", title: "Gezinnen in Levi", description: "Kinderpistes, activiteiten en praktische tips voor gezinsvakanties.", href: "/nl/gids/levi-met-kinderen", iconKey: "baby" },
      { id: "car-free", title: "Levi zonder auto", description: "Hoe je in Levi komt en je verplaatst zonder eigen auto.", href: "/nl/levi", iconKey: "footprints" },
      { id: "heating", title: "Verwarming in huisjes", description: "Hoe verwarmingssystemen werken in Levi.", href: "/nl/levi", iconKey: "thermometer" },
      { id: "sauna", title: "Finse sauna gids", description: "Saunacultuur en unieke sauna-ervaringen in Levi.", href: "/nl/levi", iconKey: "flame" },
      { id: "glossary", title: "Lapland woordenlijst", description: "40+ Finse woorden met uitspraak en uitleg voor bezoekers.", href: "/guide/lapland-glossary", iconKey: "book" },
      { id: "prices", title: "Prijzen in Levi", description: "Skipassen, restaurants, activiteiten en boodschappenprijzen. Plan je budget vooraf.", href: "/nl/gids/prijzen-in-levi", iconKey: "euro" }
    ]
  }
};

const iconMap: Record<string, typeof Plane> = {
  plane: Plane,
  shirt: Shirt,
  bus: Bus,
  utensils: UtensilsCrossed,
  baby: Baby,
  footprints: Footprints,
  thermometer: Thermometer,
  flame: Flame,
  book: BookOpen,
  euro: Euro
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const hubLinks: Record<Language, string> = {
  fi: "/levi", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi"
};

const canonicalUrls: Record<Language, string> = {
  fi: "https://leville.net/opas/matkaopas-levi",
  en: "https://leville.net/guide/travel-to-levi",
  sv: "https://leville.net/sv/guide/travel-to-levi",
  de: "https://leville.net/de/guide/travel-to-levi",
  es: "https://leville.net/es/guide/travel-to-levi",
  fr: "https://leville.net/fr/guide/travel-to-levi",
  nl: "https://leville.net/nl/gids/reisgids-levi"
};

const TravelHub = ({ lang = "fi" }: TravelHubProps) => {
  const location = useLocation();
  const c = content[lang];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={{ fi: "/opas/matkaopas-levi", en: "/guide/travel-to-levi", nl: "/nl/gids/reisgids-levi" }} />
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
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />

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
                  const Icon = iconMap[guide.iconKey];
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
                    { title: "Majoitukset", desc: "Varaa majoitus Leviltä", href: "/majoitukset" },
                  ],
                },
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Seasons in Levi", desc: "Choose the best time to visit", href: "/guide/seasons-in-levi" },
                    { title: "Activities in Levi", desc: "What to do when you arrive", href: "/guide/activities-in-levi" },
                    { title: "Accommodations", desc: "Book your stay in Levi", href: "/en/accommodations" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Seizoenen in Levi", desc: "Kies de beste tijd om te bezoeken", href: "/nl/gids/seizoenen-in-levi" },
                    { title: "Activiteiten in Levi", desc: "Wat te doen als je er bent", href: "/nl/gids/activiteiten-in-levi" },
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

export default TravelHub;
