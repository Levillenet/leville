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
import { UtensilsCrossed } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";

interface RestaurantsAndServicesProps {
  lang?: Language;
}

const externalLinks = {
  kingCrabHouse: "https://www.kingcrabhouse.fi/",
  colorado: "https://www.ravintolacolorado.fi/en/colorado-levi/",
  lostTacos: "https://www.losttacos.fi/",
  kekale: "https://kekale.levihotelspa.fi/",
  visitLeviFood: "https://www.levi.fi/en/eat-and-drink/",
};

const translations = {
  fi: {
    meta: {
      title: "Ravintolat ja palvelut Levillä | Leville.net",
      description:
        "Levin ravintolat, ruokakaupat, vuokraamot ja palvelut. Aukioloajat, perheystävälliset vaihtoehdot ja käytännön vinkit.",
      canonical: "https://leville.net/opas/ravintolat-ja-palvelut-levilla",
    },
    title: "Ravintolat ja palvelut Levillä",
    subtitle: "Ruokailu, kaupat, vuokraamot ja käytännön palvelut",
    intro:
      "Levin keskustasta löydät kaikki tarvittavat palvelut. Ravintolat joka makuun, hyvin varustellut ruokakaupat, urheiluvälinevuokraamot ja terveyspalvelut. Tässä oppaassa tärkeimmät vinkit yhdellä sivulla.",
    sections: {
      restaurants: {
        title: "Ravintolat Levillä",
        intro:
          "Levin ravintolatarjonta on monipuolinen. Löydät niin fine dining elämyksiä, perinteistä lappilaista ruokaa kuin nopeaa syötävää rinteiden läheltä.",
        categories: [
          {
            name: "Fine dining ja elämysravintolat",
            places: ["Kammi", "Aurora Sky Restaurant", "King Crab House"],
            note: "Varaa pöytä etukäteen erityisesti viikonloppuisin ja sesonkina.",
          },
          {
            name: "Perinteiset lappalaiset ravintolat",
            places: ["Kotaravintola Kammi", "Pihvipirtti", "Myllyn Äijä"],
            note: "Kokeile poroa, riistaa ja paikallisia erikoisuuksia.",
          },
          {
            name: "Perheystävälliset ravintolat",
            places: ["Kotipizza", "Pizza Kebab Levi", "Colorado Bar & Grill"],
            note: "Lasten menut ja helppo asiointi perheille.",
          },
          {
            name: "Nopea ruoka ja take away",
            places: ["Levin Grilli", "Pizza Factory Levi", "Burger King"],
            note: "Nopea vaihtoehto laskupäivän keskelle.",
          },
          {
            name: "Après ski ja baarit",
            places: ["Hullu Poro Arena", "Tuikku", "Levin Panimo", "Vinkkari"],
            note: "Tunnelmaa ja musiikkia rinteen jälkeen.",
          },
        ],
      },
      groceries: {
        title: "Ruokakaupat",
        stores: [
          {
            name: "K Market Levi",
            location: "Levintie, keskusta",
            hours: "Ma La 8 21, Su 10 21 sesonkina",
          },
          {
            name: "S Market Levi",
            location: "Levi Star alue",
            hours: "Ma La 8 21, Su 10 21",
          },
        ],
      },
      rental: {
        title: "Urheiluvälinevuokraamot",
        shops: ["Ski resort rental Zero Point ja South Point", "Intersport Levi", "Elan Shop Levi"],
      },
      health: {
        title: "Terveys ja apteekkipalvelut",
        items: [
          "Levin apteekki keskustassa",
          "Kittilän terveyskeskus noin 20 km",
          "Ski Patrol rinteillä tapaturmia varten",
        ],
      },
      family: {
        title: "Perheystävälliset palvelut",
        items: [
          "Lastenhoitopalveluja saatavilla erikseen",
          "Lasten menuja useimmissa ravintoloissa",
          "Vaipat ja lastenruoat ruokakaupoissa",
          "Rattaiden vuokraus joissakin majoituksissa",
        ],
      },
    },
    linksTitle: "Suositellut ravintolat ja hyödylliset linkit",
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Ravintolat ja palvelut", href: "/opas/ravintolat-ja-palvelut-levilla" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    travelHubText: "Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Liikkuminen Levillä", desc: "Miten pääset ravintoloihin", href: "/opas/liikkuminen-levilla" },
        { title: "Lapsiperheet Levillä", desc: "Perheystävälliset ravintolat", href: "/opas/lapsiperheet-levilla" },
        { title: "Sauna Levillä", desc: "Rentoudu ruokailun jälkeen", href: "/opas/sauna-levilla" },
        { title: "Levi ilman autoa", desc: "Ravintolat kävelyetäisyydellä", href: "/opas/levi-ilman-autoa" },
      ],
    },
  },

  en: {
    meta: {
      title: "Restaurants and Services in Levi | Leville.net",
      description:
        "Levi restaurants, grocery stores, rentals and services. Practical tips, opening hours and family friendly options.",
      canonical: "https://leville.net/guide/restaurants-and-services-in-levi",
    },
    title: "Restaurants and Services in Levi",
    subtitle: "Dining, shops, rentals and practical services",
    intro:
      "Levi center offers all essential services. You will find restaurants for every taste, well stocked grocery stores, sports equipment rentals and health services. This guide highlights the most important tips in one place.",
    sections: {
      restaurants: {
        title: "Restaurants in Levi",
        intro:
          "Levi offers a wide restaurant selection. From fine dining experiences to traditional Lapland cuisine and quick meals near the slopes.",
        categories: [
          {
            name: "Fine dining and experience restaurants",
            places: ["Kammi", "Aurora Sky Restaurant", "King Crab House"],
            note: "Reserve a table in advance during weekends and peak season.",
          },
          {
            name: "Traditional Lapland restaurants",
            places: ["Kotaravintola Kammi", "Pihvipirtti", "Myllyn Äijä"],
            note: "Try reindeer, game dishes and local specialties.",
          },
          {
            name: "Family friendly restaurants",
            places: ["Kotipizza", "Pizza Kebab Levi", "Colorado Bar & Grill"],
            note: "Children menus and easy access for families.",
          },
          {
            name: "Fast food and take away",
            places: ["Levin Grilli", "Pizza Factory Levi", "Burger King"],
            note: "Quick option during ski days.",
          },
          {
            name: "Après ski and bars",
            places: ["Hullu Poro Arena", "Tuikku", "Levin Panimo", "Vinkkari"],
            note: "Atmosphere and live music after skiing.",
          },
        ],
      },
      groceries: {
        title: "Grocery Stores",
        stores: [
          {
            name: "K Market Levi",
            location: "Levintie, center",
            hours: "Mon Sat 8 21, Sun 10 21 during season",
          },
          {
            name: "S Market Levi",
            location: "Levi Star area",
            hours: "Mon Sat 8 21, Sun 10 21",
          },
        ],
      },
      rental: {
        title: "Equipment Rentals",
        shops: ["Ski resort rental Zero Point and South Point", "Intersport Levi", "Elan Shop Levi"],
      },
      health: {
        title: "Health and Pharmacy Services",
        items: ["Levi pharmacy in the center", "Kittilä health center about 20 km", "Ski Patrol for slope accidents"],
      },
      family: {
        title: "Family Services",
        items: [
          "Childcare services available separately",
          "Children menus in many restaurants",
          "Baby supplies available in grocery stores",
          "Stroller rental in some accommodations",
        ],
      },
    },
    linksTitle: "Recommended Restaurants and Useful Links",
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Restaurants and Services", href: "/guide/restaurants-and-services-in-levi" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "Back to travel guide",
    accommodationsHref: "/en/accommodations",
    readNext: {
      title: "Read Next",
      links: [
        { title: "Getting Around Levi", desc: "How to reach restaurants", href: "/guide/getting-around-in-levi" },
        { title: "Levi With Children", desc: "Family-friendly restaurants", href: "/guide/levi-with-children" },
        { title: "Finnish Sauna", desc: "Relax after dinner", href: "/guide/finnish-sauna-in-levi" },
        { title: "Levi Without a Car", desc: "Restaurants within walking distance", href: "/guide/levi-without-a-car" },
      ],
    },
  },
};

const RestaurantsAndServices = ({ lang = "fi" }: RestaurantsAndServicesProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/opas/ravintolat-ja-palvelut-levilla",
    en: "https://leville.net/guide/restaurants-and-services-in-levi",
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
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
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

          {/* Restaurants */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              {t.sections.restaurants.title}
            </h2>

            {t.sections.restaurants.categories.map((cat, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="pt-5">
                  <h3 className="font-semibold mb-1">{cat.name}</h3>
                  <p className="text-primary text-sm mb-1">{cat.places.join(" • ")}</p>
                  <p className="text-sm text-muted-foreground">{cat.note}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* External Links */}
          <section className="mb-12">
            <h3 className="text-lg font-semibold mb-4">{t.linksTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={externalLinks.kingCrabHouse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  King Crab House
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.colorado}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Colorado Bar and Grill Levi
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.lostTacos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Lost Tacos Levi
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.kekale}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Kekäle Levi Hotel Spa
                </a>
              </li>
              <li>
                <a
                  href={externalLinks.visitLeviFood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Levi Eat and Drink
                </a>
              </li>
            </ul>
          </section>

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          {/* CTA */}
          <section className="text-center bg-card rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-3">Varaa majoitus keskustasta</h3>
            <Button asChild>
              <Link to={t.accommodationsHref}>Katso majoitukset</Link>
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

export default RestaurantsAndServices;
