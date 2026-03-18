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
import {
  ArrowRight, ArrowLeft, Plane, Shirt, Bus, UtensilsCrossed, Baby, Footprints,
  Thermometer, Flame, BookOpen, Euro, Droplets, Calendar, ListChecks, Wine,
  Compass, Ticket, Gift, Heart, Map, Home, Mountain, MapPin, Accessibility
} from "lucide-react";
import { Language } from "@/translations";
import { travelHubContent, type GuideItem, type CategoryGroup } from "@/data/travelHubContent";

interface TravelHubProps {
  lang?: Language;
}

const iconMap: Record<string, typeof Plane> = {
  plane: Plane,
  shirt: Shirt,
  bus: Bus,
  utensils: UtensilsCrossed,
  baby: Baby,
  footprints: Footprints,
  thermometer: Thermometer,
  flame: Flame,
  droplets: Droplets,
  book: BookOpen,
  euro: Euro,
  calendar: Calendar,
  list: ListChecks,
  glass: Wine,
  compass: Compass,
  ticket: Ticket,
  gift: Gift,
  heart: Heart,
  map: Map,
  home: Home,
  mountain: Mountain,
  mapPin: MapPin,
  accessibility: Accessibility,
  ski: Footprints,
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

const CategorySection = ({
  category,
  readMore,
}: {
  category: CategoryGroup;
  readMore: string;
}) => (
  <section className="mb-16">
    <div className="mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        {category.title}
      </h2>
      <p className="text-base text-muted-foreground max-w-2xl">
        {category.subtitle}
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.guides.map((guide) => {
        const Icon = iconMap[guide.iconKey] || Compass;
        return (
          <GuideHubCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            href={guide.href}
            icon={Icon}
            readMoreText={readMore}
          />
        );
      })}
    </div>
  </section>
);

const TravelHub = ({ lang = "fi" }: TravelHubProps) => {
  const location = useLocation();
  const c = travelHubContent[lang];

  const allGuides: GuideItem[] = [
    ...c.planning.guides,
    ...c.onsite.guides,
    ...c.accommodation.guides,
  ];

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
              itemListElement: allGuides.map((g, i) => ({
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
            <section className="text-center mb-14">
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

            {/* Category Sections */}
            <CategorySection category={c.planning} readMore={c.readMore} />
            <CategorySection category={c.onsite} readMore={c.readMore} />
            <CategorySection category={c.accommodation} readMore={c.readMore} />

            {/* Read Next */}
            {(() => {
              const readNextData: Record<string, { title: string; links: { title: string; desc: string; href: string }[] }> = {
                fi: {
                  title: "Lue myös",
                  links: [
                    { title: "Vuodenajat Levillä", desc: "Valitse paras ajankohta", href: "/opas/vuodenajat-levi" },
                    { title: "Aktiviteetit Levillä", desc: "Mitä tehdä perillä", href: "/opas/aktiviteetit-levi" },
                    { title: "Majoitukset", desc: "Varaa majoitus Leviltä", href: "/majoitukset" },
                    { title: "Levi vs Rovaniemi", desc: "Kumpi on parempi lomakohde?", href: "/opas/levi-vs-rovaniemi" },
                  ],
                },
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Seasons in Levi", desc: "Choose the best time to visit", href: "/guide/seasons-in-levi" },
                    { title: "Activities in Levi", desc: "What to do when you arrive", href: "/guide/activities-in-levi" },
                    { title: "Accommodations", desc: "Book your stay in Levi", href: "/en/accommodations" },
                    { title: "Levi vs Rovaniemi", desc: "Which destination is better?", href: "/guide/levi-vs-rovaniemi-comparison" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Seizoenen in Levi", desc: "Kies de beste tijd om te bezoeken", href: "/nl/gids/seizoenen-in-levi" },
                    { title: "Activiteiten in Levi", desc: "Wat te doen als je er bent", href: "/nl/gids/activiteiten-in-levi" },
                    { title: "Accommodaties", desc: "Boek je verblijf in Levi", href: "/nl/accommodaties" },
                    { title: "Levi vs Rovaniemi", desc: "Welke bestemming is beter?", href: "/guide/levi-vs-rovaniemi-comparison" },
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
