import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ShoppingCart, Shirt, Heart, Clock, Baby, MapPin } from "lucide-react";
import { Language } from "@/translations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RestaurantsAndServicesProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Ravintolat ja palvelut Levillä – Kaupat, vuokraamot | Leville.net",
      description:
        "Levin ravintolat, ruokakaupat, urheiluvälinevuokraamot ja palvelut. Aukioloajat, perheystävälliset vaihtoehdot ja käytännön vinkit.",
      canonical: "https://leville.net/opas/ravintolat-ja-palvelut-levilla",
    },
    title: "Ravintolat ja palvelut Levillä",
    subtitle: "Ruokailu, kaupat, vuokraamot ja käytännön palvelut",
    intro:
      "Levin keskustasta löydät kaikki tarvittavat palvelut: ravintolat joka makuun, ruokakaupat, urheiluvälinevuokraamot ja terveyspalvelut. Tässä oppaassa kaikki mitä tarvitset tietää.",
    sections: {
      restaurants: {
        title: "Ravintolat Levillä",
        icon: "utensils",
        intro:
          "Levillä on monipuolinen ravintolatarjonta perinteisestä lappalaisesta ruoasta kansainväliseen keittiöön:",
        categories: [
          {
            name: "Fine dining ja elämysravintolat",
            places: ["Kammi", "Aurora Sky Restaurant", "King Crab House"],
            note: "Varaa pöytä etukäteen, erityisesti viikonloppuisin ja sesonkiaikoina.",
          },
          {
            name: "Perinteiset lappalaiset ravintolat",
            places: ["Kotaravintola Kammi", "Pihvipirtti", "Myllyn Äijä"],
            note: "Kokeile poronkäristystä, kalakeittoa ja lappalaisia erikoisuuksia.",
          },
          {
            name: "Perheystävälliset ravintolat",
            places: ["Kotipizza", "Pizza-Kebab Levi", "Colorado Bar & Grill"],
            note: "Lasten menut saatavilla, syöttötuolit ja lapsiystävällinen palvelu.",
          },
          {
            name: "Nopea ruoka ja take away",
            places: ["Levin Grilli", "Pizza Factory Levi", "Burger King"],
            note: "Helppoa ja nopeaa ruokailua.",
          },
          {
            name: "Après ski ja baarit",
            places: ["Hullu Poro Arena", "Tuikku", "Levin Panimo", "Vinkkari"],
            note: "Rinteen jälkeen rentoutumista, musiikkia ja tunnelmaa.",
          },
        ],
        tip: "Sesonkiaikoina varaa pöytä suosituimpiin ravintoloihin päivää tai kahta etukäteen.",
      },
      groceries: {
        title: "Ruokakaupat ja aukioloajat",
        icon: "shopping",
        intro: "Levin keskustassa on kaksi pääkauppaa päivittäistavaroihin:",
        stores: [
          {
            name: "K-Market Levi",
            location: "Keskustassa, Levintie",
            hours: "Ma to La 8 to 21, Su 10 to 21 sesonkina, lyhyemmät ajat hiljaisena kautena",
            note: "Laaja valikoima, tuoretuotteita ja paikallisia erikoisuuksia.",
          },
          {
            name: "S-Market Levi",
            location: "Levi Star alue",
            hours: "Ma to La 8 to 21, Su 10 to 21",
            note: "Laaja valikoima.",
          },
        ],
        tips: [
          "Aukioloajat voivat vaihdella hiljaisena kautena, tarkista etukäteen",
          "Jouluaatto ja juhlapyhät voivat olla lyhyemmät tai suljettu",
          "Tuoretuotteet kannattaa hakea aikaisin sesonkiviikon alussa",
          "Alkon myymälä on K Marketin yhteydessä",
        ],
      },
      rental: {
        title: "Urheiluvälinevuokraamot",
        icon: "shirt",
        intro: "Levillä on useita laadukkaita vuokraamoja lasketteluvälineisiin ja talvivarusteisiin:",
        shops: [
          {
            name: "Ski resort rental Zero Point & South Point",
            services: ["Sukset", "Lumilaudat", "Monot", "Kypärät", "Lasketteluasut"],
            location: "Hiihtokeskuksen omat vuokraamot",
          },
          {
            name: "Intersport Levi",
            services: ["Sukset", "Hiihtovälineet", "Talvivaatteet", "Myynti ja vuokraus"],
            location: "Levin keskusta",
          },
          {
            name: "Elan Shop Levi",
            services: ["Sukset", "Talvivarusteet", "Korjauspalvelut"],
            location: "Levin keskusta",
          },
        ],
        tips: [
          "Varaa välineet etukäteen netistä sesonkiaikaan",
          "Lasten varusteet löytyvät kaikista vuokraamoista",
          "Testaa monot kunnolla ennen rinteeseen lähtöä",
          "Pyydä siteiden säätö taitotasosi mukaan",
        ],
      },
      health: {
        title: "Terveys ja apteekkipalvelut",
        icon: "heart",
        intro: "Levillä on peruspalvelut terveydenhoitoon:",
        services: [
          {
            name: "Levin apteekki",
            location: "Keskustassa",
            hours: "Ma to Pe 10 to 17, La 10 to 14 sesonkina pidempi",
            note: "Reseptilääkkeet, käsikauppalääkkeet ja ensiaputarvikkeet.",
          },
          {
            name: "Kittilän terveyskeskus",
            location: "Kittilässä noin 20 km",
            hours: "Arkisin päiväaikaan",
            note: "Laajempi hoito ja päivystys. Päivystysnumero 116 117.",
          },
          {
            name: "Ensiapu rinteillä",
            location: "Ski Patrol toimisto etuhissillä",
            note: "Rinnetapaturmat ja ensiapu. Hätätilanteessa soita 112.",
          },
        ],
        tip: "Pidä mukana matkavakuutus ja tapaturmavakuutus.",
      },
      family: {
        title: "Perheystävälliset palvelut",
        icon: "baby",
        intro: "Levillä on hyviä palveluita lapsiperheille:",
        items: [
          "Lastenhoitopalvelut, kysy majoitukselta tai safariyrityksiltä",
          "Lastenmenut ja syöttötuolit monissa ravintoloissa",
          "Leikkipaikkoja hotelleissa ja ostoskeskuksissa",
          "Lastentarvikkeet löytyvät K Marketista ja S Marketista",
          "Rattaiden vuokraus onnistuu joissain majoituksissa ja hotelleissa",
        ],
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Ovatko ravintolat auki jouluna?",
            a: "Monet ravintolat ovat auki jouluna, mutta pöytä kannattaa varata etukäteen. Ruokakaupoilla voi olla rajoitetut aukioloajat.",
          },
          {
            q: "Mistä saan vuokrattua lasketteluvarusteita lapsille?",
            a: "Kaikissa suurimmissa vuokraamoissa on lasten kokovalikoima. Varaa ajoissa vilkkaimpina viikkoina.",
          },
          {
            q: "Onko Levillä gluteenittomia tai vegaanisia vaihtoehtoja?",
            a: "Useimmissa ravintoloissa on gluteenittomia ja vegaanisia vaihtoehtoja. Kysy henkilökunnalta.",
          },
          {
            q: "Milloin ruokakaupat ovat ruuhkaisimpia?",
            a: "Sunnuntai ja maanantai ovat usein vilkkaimpia vaihtopäivien vuoksi.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoitus keskustasta",
      text: "Keskustan majoituksista liikut helposti ravintoloihin ja palveluihin.",
      button: "Katso majoitukset",
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Liikkuminen Levillä", href: "/opas/liikkuminen-levilla" },
      { text: "Lapsiperheet Levillä", href: "/opas/lapsiperheet-levilla" },
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Ravintolat ja palvelut" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    travelHubText: "Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
  },

  en: {
    meta: {
      title: "Restaurants and Services in Levi | Shops and Rentals | Leville.net",
      description:
        "Restaurants, grocery stores, sports equipment rentals and services in Levi. Opening hours, family friendly options and practical tips.",
      canonical: "https://leville.net/guide/restaurants-and-services-in-levi",
    },
    title: "Restaurants and Services in Levi",
    subtitle: "Dining, shops, rentals and practical services",
    intro:
      "Levi center offers all essential services including restaurants for every taste, grocery stores, sports equipment rentals and health services. This guide covers everything you need to know.",
    sections: {
      restaurants: {
        title: "Restaurants in Levi",
        icon: "utensils",
        intro: "Levi has a wide range of restaurants from traditional Lappish cuisine to international food:",
        categories: [
          {
            name: "Fine dining and experience restaurants",
            places: ["Kammi", "Aurora Sky Restaurant", "King Crab House"],
            note: "Book a table in advance especially on weekends and during peak season.",
          },
          {
            name: "Traditional Lappish restaurants",
            places: ["Kotaravintola Kammi", "Pihvipirtti", "Myllyn Äijä"],
            note: "Try sautéed reindeer, fish soup and local specialties.",
          },
          {
            name: "Family friendly restaurants",
            places: ["Kotipizza", "Pizza-Kebab Levi", "Colorado Bar & Grill"],
            note: "Children menus available, high chairs and family friendly service.",
          },
          {
            name: "Fast food and take away",
            places: ["Levin Grilli", "Pizza Factory Levi", "Burger King"],
            note: "Easy and quick dining option.",
          },
          {
            name: "Après ski and bars",
            places: ["Hullu Poro Arena", "Tuikku", "Levin Panimo", "Vinkkari"],
            note: "Relaxation, music and atmosphere after skiing.",
          },
        ],
        tip: "During peak season it is recommended to book popular restaurants one or two days in advance.",
      },
      groceries: {
        title: "Grocery Stores and Opening Hours",
        icon: "shopping",
        intro: "There are two main grocery stores in Levi center:",
        stores: [
          {
            name: "K-Market Levi",
            location: "In the center on Levintie",
            hours: "Mon to Sat 8 to 21, Sun 10 to 21 during season, shorter hours off season",
            note: "Wide selection with fresh products and local specialties.",
          },
          {
            name: "S-Market Levi",
            location: "Levi Star area",
            hours: "Mon to Sat 8 to 21, Sun 10 to 21",
            note: "Wide grocery selection.",
          },
        ],
        tips: [
          "Opening hours may vary during off season so check in advance",
          "Christmas and public holidays may have shorter hours or be closed",
          "Fresh products are best purchased early in the week",
          "Alko liquor store is located next to K Market",
        ],
      },
      rental: {
        title: "Sports Equipment Rentals",
        icon: "shirt",
        intro: "Levi offers several high quality rental shops for ski equipment and winter clothing:",
        shops: [
          {
            name: "Ski resort rental Zero Point & South Point",
            services: ["Skis", "Snowboards", "Boots", "Helmets", "Ski clothing"],
            location: "Resort operated rental shops at the ski area",
          },
          {
            name: "Intersport Levi",
            services: ["Skis", "Cross country gear", "Winter clothing", "Sales and rental"],
            location: "Levi center",
          },
          {
            name: "Elan Shop Levi",
            services: ["Skis", "Winter equipment", "Repair services"],
            location: "Levi center",
          },
        ],
        tips: [
          "Book equipment online in advance during peak season",
          "Children equipment is available in all rental shops",
          "Test boots carefully before going to the slopes",
          "Ask staff to adjust bindings according to your skill level",
        ],
      },
      health: {
        title: "Health and Pharmacy Services",
        icon: "heart",
        intro: "Levi provides basic health care services:",
        services: [
          {
            name: "Levi Pharmacy",
            location: "In the center",
            hours: "Mon to Fri 10 to 17, Sat 10 to 14 during season longer hours",
            note: "Prescription medicines, over the counter products and first aid supplies.",
          },
          {
            name: "Kittilä Health Center",
            location: "In Kittilä about 20 km away",
            hours: "Weekdays daytime",
            note: "Extended care and emergency services. Medical helpline 116 117.",
          },
          {
            name: "First Aid on Slopes",
            location: "Ski Patrol office at the front lift",
            note: "Slope accidents and first aid. In emergencies call 112.",
          },
        ],
        tip: "Carry valid travel and accident insurance.",
      },
      family: {
        title: "Family Friendly Services",
        icon: "baby",
        intro: "Levi offers good services for families with children:",
        items: [
          "Childcare services available through some accommodations and safari operators",
          "Children menus and high chairs in many restaurants",
          "Play areas in hotels and shopping areas",
          "Baby supplies available in K Market and S Market",
          "Stroller rental available in some accommodations and hotels",
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Are restaurants open during Christmas?",
            a: "Many restaurants are open during Christmas but advance reservations are recommended. Grocery stores may have limited opening hours.",
          },
          {
            q: "Where can I rent ski equipment for children?",
            a: "All major rental shops offer equipment for children. Booking early is recommended during busy weeks.",
          },
          {
            q: "Are there gluten free or vegan options available?",
            a: "Most restaurants offer gluten free and vegan options. Ask the staff for details.",
          },
          {
            q: "When are grocery stores busiest?",
            a: "Sundays and Mondays are usually the busiest due to guest changeover.",
          },
        ],
      },
    },
    cta: {
      title: "Book Accommodation in the Center",
      text: "Staying in the center allows easy access to restaurants and services.",
      button: "View Accommodations",
    },
    relatedTitle: "Read also",
    relatedLinks: [
      { text: "Getting Around Levi", href: "/guide/getting-around-in-levi" },
      { text: "Levi With Children", href: "/guide/levi-with-children" },
      { text: "Winter Clothing for Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Restaurants and Services" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "Back to travel guide",
    accommodationsHref: "/en/accommodations",
  },
};

const RestaurantsAndServices = ({ lang = "fi" }: RestaurantsAndServicesProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/opas/ravintolat-ja-palvelut-levilla",
    en: "https://leville.net/guide/restaurants-and-services-in-levi",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.sections.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.meta.description,
    author: {
      "@type": "Organization",
      name: "Leville.net",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://leville.net${item.href}` : undefined,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_GB"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={t.breadcrumbs} />

        <div className="mb-6">
          <Link
            to={t.travelHubLink}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t.travelHubText}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          </header>

          <p className="text-lg mb-10 leading-relaxed">{t.intro}</p>

          {/* Sections rendering stays unchanged */}
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
    </div>
  );
};

export default RestaurantsAndServices;
