import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Bus, Car, Footprints, Snowflake, MapPin } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";

interface GettingAroundLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Liikkuminen Levillä | Leville.net",
      description:
        "Näin pääset Leville ja liikut perillä. Lentokenttäkuljetukset, hiihtobussa, taksit, autonvuokraus ja talviajotipat.",
      canonical: "https://leville.net/opas/liikkuminen-levilla",
    },
    title: "Liikkuminen Levillä",
    subtitle: "Kuljetukset, taksit, autonvuokraus ja talviajovinkit",
    intro:
      "Leville pääset helposti Kittilän lentokentältä tai omalla autolla. Perillä liikkuminen onnistuu hiihtobussilla, taksilla tai kävellen. Tässä oppaassa kaikki tarvittava tieto kulkemiseen.",
    sections: {
      airport: {
        title: "Lentokenttäkuljetukset",
        items: [
          "Kittilän lentokenttä sijaitsee noin 15 km Levin keskustasta",
          "Bussikuljetukset lentojen mukaan (Airport Bus Levi)",
          "Taksikuljetus noin 15–20 min, varaa etukäteen sesonkina",
          "Vuokra-autot saatavilla lentokentältä",
        ],
      },
      skibus: {
        title: "Hiihtobussa ja paikallisliikenne",
        items: [
          "Ilmainen Ski Bus kiertää Levin keskustan ja rinteet",
          "Bussit kulkevat noin 15–30 min välein sesonkina",
          "Reittejä keskustasta eri hisseille ja majoitusalueille",
          "Aikataulut ja reitit: levi.fi/ski-bus",
        ],
      },
      taxi: {
        title: "Taksit ja kyytipalvelut",
        items: [
          "Levin Taksi: 0600 300 72",
          "Lappland Taxi: 0200 60 060",
          "Varaa etukäteen erityisesti ilta-aikaan ja viikonloppuisin",
          "Sovelluksia kuten Uber ei ole käytössä Levillä",
        ],
      },
      car: {
        title: "Autonvuokraus ja pysäköinti",
        items: [
          "Vuokra-autoja Kittilän lentokentältä (Avis, Hertz, Europcar)",
          "Talvirenkaiden käyttö pakollista marraskuusta maaliskuuhun",
          "Lohkolämmitin suositeltava pakkasjaksoille",
          "Ilmainen pysäköinti useimmissa majoituskohteissa",
        ],
      },
      walking: {
        title: "Kävely ja etäisyydet",
        items: [
          "Levin keskusta on kompakti, noin 500 m kävelyalue",
          "Rinteiden alatuloasemille noin 5–15 min kävely keskustasta",
          "Talvella huomioi liukkaus ja pakkanen",
          "Hyvät kengät ja taskulamppu pimeään aikaan",
        ],
      },
      winterDriving: {
        title: "Talviajovinkit",
        items: [
          "Nastarenkaat tai kitkarenkaat pakollisia",
          "Tiet hoidetaan hyvin, mutta lumisade voi yllättää",
          "Pidä pesunesteeseen riittävästi pakkaskestävyyttä (-40°C)",
          "Aja rauhallisesti ja varaudu pidempään jarrutusmatkaan",
          "Huomioi porot tiellä erityisesti hämärässä",
        ],
      },
    },
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Liikkuminen Levillä", href: "/opas/liikkuminen-levilla" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    travelHubText: "Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
    ctaTitle: "Varaa majoitus Levin keskustasta",
    ctaButton: "Katso majoitukset",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Miten pääsee Leville", desc: "Lennot, junat ja autoilu", href: "/matka/miten-paasee-leville-helsingista" },
        { title: "Levi ilman autoa", desc: "Kattava opas autottomaan lomaan", href: "/opas/levi-ilman-autoa" },
        { title: "Ravintolat ja palvelut", desc: "Levin keskustan palvelut", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Lapsiperheet Levillä", desc: "Liikkuminen lasten kanssa", href: "/opas/lapsiperheet-levilla" },
      ],
    },
  },

  en: {
    meta: {
      title: "Getting Around Levi | Leville.net",
      description:
        "How to get to Levi and travel around. Airport transfers, ski bus, taxis, car rental and winter driving tips.",
      canonical: "https://leville.net/guide/getting-around-in-levi",
    },
    title: "Getting Around Levi",
    subtitle: "Transfers, taxis, car rental and winter driving tips",
    intro:
      "Getting to Levi is easy from Kittilä Airport or by car. Once there, you can use the free ski bus, taxis or walk. This guide covers everything you need for getting around.",
    sections: {
      airport: {
        title: "Airport Transfers",
        items: [
          "Kittilä Airport is located about 15 km from Levi center",
          "Bus transfers according to flight schedules (Airport Bus Levi)",
          "Taxi ride takes about 15–20 min, book ahead during peak season",
          "Rental cars available at the airport",
        ],
      },
      skibus: {
        title: "Ski Bus and Local Transport",
        items: [
          "Free Ski Bus runs around Levi center and slopes",
          "Buses run every 15–30 minutes during season",
          "Routes from center to different lifts and accommodation areas",
          "Schedules and routes: levi.fi/ski-bus",
        ],
      },
      taxi: {
        title: "Taxis and Ride Services",
        items: [
          "Levin Taksi: 0600 300 72",
          "Lappland Taxi: 0200 60 060",
          "Book ahead especially in evenings and weekends",
          "Apps like Uber are not available in Levi",
        ],
      },
      car: {
        title: "Car Rental and Parking",
        items: [
          "Rental cars available at Kittilä Airport (Avis, Hertz, Europcar)",
          "Winter tires mandatory from November to March",
          "Block heater recommended for cold spells",
          "Free parking at most accommodations",
        ],
      },
      walking: {
        title: "Walking and Distances",
        items: [
          "Levi center is compact, about 500 m walking area",
          "Walk to slope base stations takes 5–15 min from center",
          "In winter, watch for ice and cold temperatures",
          "Good shoes and a flashlight for dark hours",
        ],
      },
      winterDriving: {
        title: "Winter Driving Tips",
        items: [
          "Studded or friction tires mandatory",
          "Roads are well maintained but snow can surprise",
          "Use windshield washer fluid rated for -40°C",
          "Drive calmly and expect longer braking distances",
          "Watch for reindeer on roads especially at dusk",
        ],
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Getting Around Levi", href: "/guide/getting-around-in-levi" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "Back to travel guide",
    accommodationsHref: "/en/accommodations",
    ctaTitle: "Book accommodation in Levi center",
    ctaButton: "View accommodations",
    readNext: {
      title: "Read Next",
      links: [
        { title: "How to Get to Levi", desc: "Flights, trains and driving", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
        { title: "Levi Without a Car", desc: "Complete car-free guide", href: "/guide/levi-without-a-car" },
        { title: "Restaurants & Services", desc: "Levi center services", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Levi With Children", desc: "Getting around with kids", href: "/guide/levi-with-children" },
      ],
    },
  },
};

type SectionKey = "airport" | "skibus" | "taxi" | "car" | "walking" | "winterDriving";

const sectionIcons: Record<SectionKey, React.ReactNode> = {
  airport: <Plane className="w-6 h-6 text-primary" />,
  skibus: <Bus className="w-6 h-6 text-primary" />,
  taxi: <Car className="w-6 h-6 text-primary" />,
  car: <MapPin className="w-6 h-6 text-primary" />,
  walking: <Footprints className="w-6 h-6 text-primary" />,
  winterDriving: <Snowflake className="w-6 h-6 text-primary" />,
};

const GettingAroundLevi = ({ lang = "fi" }: GettingAroundLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/opas/liikkuminen-levilla",
    en: "https://leville.net/guide/getting-around-in-levi",
  };


  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://leville.net${item.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-10">
        <Breadcrumbs items={t.breadcrumbs} />

        <div className="mb-6">
          <Link to={t.travelHubLink} className="text-sm text-muted-foreground hover:text-primary">
            {t.travelHubText}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </header>

          <p className="mb-10 text-lg">{t.intro}</p>

          {(Object.keys(t.sections) as Array<"airport" | "skibus" | "taxi" | "car" | "walking" | "winterDriving">).map((key) => {
            const section = t.sections[key];
            return (
              <section key={key} className="mb-10">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  {sectionIcons[key]}
                  {section.title}
                </h2>
                <Card>
                  <CardContent className="pt-5">
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            );
          })}

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          {/* CTA */}
          <section className="text-center bg-card rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-3">{t.ctaTitle}</h3>
            <Button asChild>
              <Link to={t.accommodationsHref}>{t.ctaButton}</Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default GettingAroundLevi;
