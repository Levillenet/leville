import { Link } from "react-router-dom";
import { Mountain, TreePine, Flame, UtensilsCrossed, Plane, Thermometer, ChevronRight, ArrowRight, LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Language } from "@/translations";

interface GuideCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
}

interface GuideContent {
  badge: string;
  heading: string;
  subtitle: string;
  cards: GuideCard[];
  allGuidesText: string;
  allGuidesHref: string;
}

const content: Record<Language, GuideContent> = {
  fi: {
    badge: "Matkaopas Leville",
    heading: "Kaikki mitä tarvitset tietää Levin lomasta",
    subtitle: "Paikalliset vinkit majoituksesta, aktiviteeteista ja käytännön asioista",
    cards: [
      { icon: Mountain, title: "Laskettelu Levillä", desc: "43 rinnettä, 28 hissiä ja Suomen suurin hiihtokeskus. Aloittelijan ja kokeneemman laskijan opas.", href: "/opas/laskettelu-levi" },
      { icon: TreePine, title: "Hiihtoladut ja murtomaahiihto", desc: "Yli 230 km huollettua latua tunturimaisemissa. Reitit, palvelut ja vinkit.", href: "/opas/hiihtoladut-levi" },
      { icon: Flame, title: "Sauna ja saunaelämykset", desc: "Savusaunat, avantouinti ja sähkökiukaan käyttöohje – opas suomalaiseen saunaan.", href: "/opas/sauna-levilla" },
      { icon: UtensilsCrossed, title: "Ravintolat ja palvelut", desc: "Levin parhaat ravintolat, kaupat, Alko ja käytännön palvelut keskustassa.", href: "/opas/ravintolat-ja-palvelut-levilla" },
      { icon: Plane, title: "Miten Leville pääsee?", desc: "Lennot, junat, bussit ja autoilu. Käytännön opas perille pääsemiseen.", href: "/matka/miten-paasee-leville-helsingista" },
      { icon: Thermometer, title: "Pukeutuminen talvella", desc: "Miten pukeutua −25 °C pakkaseen? Kerrosvaatetus ja pakolliset varusteet.", href: "/opas/talvivarusteet-leville" },
    ],
    allGuidesText: "Katso kaikki oppaat",
    allGuidesHref: "/levi",
  },
  en: {
    badge: "Levi Travel Guide",
    heading: "Everything you need to know about Levi",
    subtitle: "Local tips on accommodation, activities and practical info",
    cards: [
      { icon: Mountain, title: "Skiing in Levi", desc: "43 slopes, 28 lifts and Finland's largest ski resort. A guide for all levels.", href: "/guide/skiing-in-levi" },
      { icon: TreePine, title: "Cross-Country Trails", desc: "Over 230 km of groomed trails in fell landscapes. Routes, services and tips.", href: "/guide/cross-country-skiing-in-levi" },
      { icon: Flame, title: "Finnish Sauna", desc: "Smoke saunas, ice swimming and electric sauna guide – Finnish sauna culture explained.", href: "/guide/finnish-sauna-in-levi" },
      { icon: UtensilsCrossed, title: "Restaurants & Services", desc: "The best restaurants, shops and practical services in Levi centre.", href: "/guide/restaurants-and-services-in-levi" },
      { icon: Plane, title: "How to Get to Levi", desc: "Flights, trains, buses and driving. A practical guide to reaching Levi.", href: "/guide/travel-to-levi" },
      { icon: Thermometer, title: "Winter Clothing Guide", desc: "How to dress for –25 °C? Layering guide and essential gear for Lapland.", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
    ],
    allGuidesText: "View all guides",
    allGuidesHref: "/en/levi",
  },
  de: {
    badge: "Levi Reiseführer",
    heading: "Alles, was du über Levi wissen musst",
    subtitle: "Lokale Tipps zu Unterkunft, Aktivitäten und praktischen Infos",
    cards: [
      { icon: Mountain, title: "Skifahren in Levi", desc: "43 Pisten, 27 Lifte und Finnlands größtes Skigebiet. Ein Guide für alle Könnensstufen.", href: "/de/levi" },
      { icon: TreePine, title: "Langlaufloipen", desc: "Über 230 km gepflegte Loipen in der Fjälllandschaft. Routen, Services und Tipps.", href: "/de/levi" },
      { icon: Flame, title: "Finnische Sauna", desc: "Rauchsauna, Eisbaden und Anleitungen – dein Guide zur finnischen Saunakultur.", href: "/de/levi" },
      { icon: UtensilsCrossed, title: "Restaurants & Services", desc: "Die besten Restaurants, Geschäfte und Services im Zentrum von Levi.", href: "/de/levi" },
      { icon: Plane, title: "Anreise nach Levi", desc: "Flüge, Züge, Busse und Autofahren. Praktischer Guide für die Anreise.", href: "/de/levi" },
      { icon: Thermometer, title: "Winterkleidung", desc: "Wie kleidet man sich bei –25 °C? Schichtenprinzip und unverzichtbare Ausrüstung.", href: "/de/levi" },
    ],
    allGuidesText: "Alle Guides anzeigen",
    allGuidesHref: "/de/levi",
  },
  sv: {
    badge: "Reseguide till Levi",
    heading: "Allt du behöver veta om Levi",
    subtitle: "Lokala tips om boende, aktiviteter och praktisk info",
    cards: [
      { icon: Mountain, title: "Skidåkning i Levi", desc: "43 backar, 27 liftar och Finlands största skidort. Guide för alla nivåer.", href: "/sv/levi" },
      { icon: TreePine, title: "Längdskidspår", desc: "Över 230 km preparerade spår i fjällandskap. Rutter, service och tips.", href: "/sv/levi" },
      { icon: Flame, title: "Finsk bastuupplevelse", desc: "Rökbastu, vinterbad och guide till elbastu – finsk bastukultur förklarad.", href: "/sv/levi" },
      { icon: UtensilsCrossed, title: "Restauranger & service", desc: "De bästa restaurangerna, butikerna och servicen i Levi centrum.", href: "/sv/levi" },
      { icon: Plane, title: "Så tar du dig till Levi", desc: "Flyg, tåg, bussar och bilkörning. Praktisk guide för resan till Levi.", href: "/sv/levi" },
      { icon: Thermometer, title: "Vinterkläder", desc: "Hur klär man sig vid –25 °C? Lagerklädsel och nödvändig utrustning.", href: "/sv/levi" },
    ],
    allGuidesText: "Visa alla guider",
    allGuidesHref: "/sv/levi",
  },
  fr: {
    badge: "Guide de voyage Levi",
    heading: "Tout ce que vous devez savoir sur Levi",
    subtitle: "Conseils locaux sur l'hébergement, les activités et les infos pratiques",
    cards: [
      { icon: Mountain, title: "Ski alpin à Levi", desc: "43 pistes, 27 remontées et la plus grande station de Finlande. Guide pour tous niveaux.", href: "/fr/levi" },
      { icon: TreePine, title: "Ski de fond", desc: "Plus de 230 km de pistes damées dans les paysages de fjell. Itinéraires et conseils.", href: "/fr/levi" },
      { icon: Flame, title: "Sauna finlandais", desc: "Sauna à fumée, bain glacé et mode d'emploi – guide de la culture du sauna finlandais.", href: "/fr/levi" },
      { icon: UtensilsCrossed, title: "Restaurants et services", desc: "Les meilleurs restaurants, boutiques et services pratiques au centre de Levi.", href: "/fr/levi" },
      { icon: Plane, title: "Comment se rendre à Levi", desc: "Vols, trains, bus et voiture. Guide pratique pour rejoindre Levi.", href: "/fr/levi" },
      { icon: Thermometer, title: "Vêtements d'hiver", desc: "Comment s'habiller par –25 °C ? Superposition et équipement indispensable.", href: "/fr/levi" },
    ],
    allGuidesText: "Voir tous les guides",
    allGuidesHref: "/fr/levi",
  },
  es: {
    badge: "Guía de viaje a Levi",
    heading: "Todo lo que necesitas saber sobre Levi",
    subtitle: "Consejos locales sobre alojamiento, actividades e información práctica",
    cards: [
      { icon: Mountain, title: "Esquí en Levi", desc: "43 pistas, 27 remontes y la estación más grande de Finlandia. Guía para todos los niveles.", href: "/es/levi" },
      { icon: TreePine, title: "Esquí de fondo", desc: "Más de 230 km de pistas preparadas en paisajes de tunturi. Rutas y consejos.", href: "/es/levi" },
      { icon: Flame, title: "Sauna finlandesa", desc: "Sauna de humo, baño en hielo y guía de uso – la cultura de la sauna finlandesa explicada.", href: "/es/levi" },
      { icon: UtensilsCrossed, title: "Restaurantes y servicios", desc: "Los mejores restaurantes, tiendas y servicios prácticos en el centro de Levi.", href: "/es/levi" },
      { icon: Plane, title: "Cómo llegar a Levi", desc: "Vuelos, trenes, autobuses y coche. Guía práctica para llegar a Levi.", href: "/es/levi" },
      { icon: Thermometer, title: "Ropa de invierno", desc: "¿Cómo vestirse a –25 °C? Capas y equipamiento imprescindible para Laponia.", href: "/es/levi" },
    ],
    allGuidesText: "Ver todas las guías",
    allGuidesHref: "/es/levi",
  },
  nl: {
    badge: "Reisgids Levi",
    heading: "Alles wat je moet weten over Levi",
    subtitle: "Lokale tips over accommodatie, activiteiten en praktische info",
    cards: [
      { icon: Mountain, title: "Skiën in Levi", desc: "43 pistes, 28 liften en het grootste skigebied van Finland. Gids voor alle niveaus.", href: "/nl/gids/skieen-in-levi" },
      { icon: TreePine, title: "Langlaufen", desc: "Meer dan 230 km geprepareerde loipes in het fjälllandschap. Routes en tips.", href: "/nl/gids/langlaufen-in-levi" },
      { icon: Flame, title: "Finse sauna", desc: "Rooksauna's, ijszwemmen en instructies – jouw gids voor de Finse saunacultuur.", href: "/nl/levi" },
      { icon: UtensilsCrossed, title: "Restaurants en voorzieningen", desc: "De beste restaurants, winkels en voorzieningen in het centrum van Levi.", href: "/nl/levi" },
      { icon: Plane, title: "Hoe kom je in Levi?", desc: "Vluchten, treinen, bussen en autorijden. Praktische gids voor de reis naar Levi.", href: "/nl/gids/hoe-kom-je-in-levi" },
      { icon: Thermometer, title: "Winterkleding", desc: "Hoe kleed je je bij –25 °C? Laagjes en onmisbare uitrusting voor Lapland.", href: "/nl/gids/winterkleding-levi-lapland" },
    ],
    allGuidesText: "Bekijk alle gidsen",
    allGuidesHref: "/nl/levi",
  },
};

interface GuideLinksSectionProps {
  lang?: Language;
}

const GuideLinksSection = ({ lang = "fi" }: GuideLinksSectionProps) => {
  const t = content[lang];

  return (
    <section className="relative py-16 md:py-24 bg-[hsl(218,30%,8%)]">
      <div className="container max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {t.cards.map((card, i) => (
            <ScrollReveal key={card.href + card.title} delay={i * 0.07}>
              <Link
                to={card.href}
                className="group flex flex-col justify-between h-full rounded-xl border border-border/30 bg-[hsl(218,28%,12%)] p-5 md:p-6 hover:bg-[hsl(218,28%,16%)] hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  <card.icon className="w-7 h-7 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.45}>
          <div className="mt-10 text-center">
            <Link
              to={t.allGuidesHref}
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t.allGuidesText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GuideLinksSection;
