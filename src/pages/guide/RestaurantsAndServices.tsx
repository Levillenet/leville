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
            name: "Fine dining & elämysravintolat",
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
            name: "Nopea ruoka & take-away",
            places: ["Levin Grillit", "Pizza Factory Levi", "Burger King"],
            note: "Helppoa ja nopeaa",
          },
          {
            name: "Après-ski & baarit",
            places: ["Hullu Poro Arena", "Tuikku", "Levin Panimo", "Vinkkari"],
            note: "Rinteen jälkeen rentoutumista, tanssia ja tunnelmaa.",
          },
        ],
        tip: "Sesonkiaikoina (joulu, hiihtoloma) varaa pöytä suosituimpiin ravintoloihin päivää tai kahta etukäteen.",
      },
      groceries: {
        title: "Ruokakaupat ja aukioloajat",
        icon: "shopping",
        intro: "Levin keskustassa on kaksi pääkauppaa päivittäistavaroihin:",
        stores: [
          {
            name: "K-Market Levi",
            location: "Keskustassa, Levintie",
            hours: "Ma–La 8–21, Su 10–21 (sesonki), lyhyemmät ajat off-season",
            note: "Laaja valikoima, tuoretuotteita, paikallisia erikoisuuksia.",
          },
          {
            name: "S-market Levi",
            location: "Levi Star alue",
            hours: "Ma–La 8–21, Su 10–21",
            note: "Laaja valikoima",
          },
        ],
        tips: [
          "Aukioloajat voivat vaihdella off-season – tarkista etukäteen",
          "Jouluaatto ja juhlapyhät: lyhyemmät aukioloajat tai suljettu",
          "Tuoretuotteet ja liha kannattaa hakea aikaisin sesonkiviikon alussa",
          "Alkon myymälä on K-Marketin yhteydessä (alkoholi yli 5.5%)",
        ],
      },
      rental: {
        title: "Urheiluvälinevuokraamot",
        icon: "shirt",
        intro: "Levillä on useita laadukkaita vuokraamoja lasketteluvälineisiin ja talvivarusteisiin:",
        shops: [
          {
            name: "Ski resort rental Zero point & South point",
            services: ["Sukset", "Lumilaudat", "Monot", "Kypärät", "Lasketteluasut"],
            location: "Hiihtokeskuksen omat vuokraamot",
          },
          {
            name: "Intersport Levi",
            services: ["Sukset", "Hiihtovälineet", "Talvivaatteet", "Myynti + vuokraus"],
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
          "Lastensukset ja -varusteet saatavilla kaikissa vuokraamoissa",
          "Testaa saappaat kunnolla ennen rinnettä",
          "Pyydä säätö suksiesi taitotasoon sopivaksi",
        ],
      },
      health: {
        title: "Terveys- ja apteekkipalvelut",
        icon: "heart",
        intro: "Levillä on peruspalvelut terveydenhoitoon:",
        services: [
          {
            name: "Levin apteekki",
            location: "Keskustassa",
            hours: "Ma–Pe 10–17, La 10–14 (sesonkina pidempi)",
            note: "Reseptilääkkeet, käsikauppalääkkeet, ensiapuvälineet.",
          },
          {
            name: "Kittilän terveyskeskus",
            location: "Kittilässä (20 km)",
            hours: "Arkisin päiväaikaan",
            note: "Päivystys ja laajempi hoito. Lääkäripäivystys puh. 116 117.",
          },
          {
            name: "Ensiapu rinteillä",
            location: "Ski Patrol -toimisto etuhissillä",
            note: "Rinnetapaturmat ja ensiapu. Soita 112 hätätilanteessa.",
          },
        ],
        tip: "Pidä mukana matka- ja tapaturmavakuutus. Eurooppalainen sairaanhoitokortti (EU-kansalaiset) kelpaa julkisissa palveluissa.",
      },
      family: {
        title: "Perheystävälliset palvelut",
        icon: "baby",
        intro: "Levillä on hyviä palveluita lapsiperheille:",
        items: [
          "Lastenhoitopalvelut: kysy majoitukseltasi tai safari-operaattoreilta",
          "Perheravintoloissa lastenmenut ja syöttötuolit",
          "Lasten leikkipaikat ostoskeskuksissa ja hotelleissa",
          "Lastentarvikkeet: vaipat, lastenruoat K-Marketista ja Salesta",
          "Rattaiden vuokraus: kysy majoitukselta tai hotelleista",
        ],
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Ovatko ravintolat auki jouluna?",
            a: "Monet ravintolat ovat auki jouluaattona ja joulupäivänä, mutta kannattaa varata pöytä etukäteen. Ruokakaupat voivat olla kiinni tai auki rajoitetusti.",
          },
          {
            q: "Mistä saan vuokrattua lasketteluvarusteita lapsille?",
            a: "Kaikissa suurimmissa vuokraamoissa (Levi Ski Rent, Intersport, Sport Shop) on lasten kokovalikoima. Varaa etukäteen hiihtolomaviikolla.",
          },
          {
            q: "Onko Levillä gluteenittomia tai vegaanisia ravintoloita?",
            a: "Monet ravintolat tarjoavat gluteenittomia ja vegaanisia vaihtoehtoja. Kysy tarjoilijalta erikoisruokavalioista – palvelu on yleensä joustavaa.",
          },
          {
            q: "Milloin ruokakaupat ovat täysimpiä?",
            a: "Sunnuntai-iltapäivä ja maanantai ovat ruuhkaisimpia kun vieras vaihto tapahtuu. Käy kaupassa arkiaamuisin rauhallisemmin.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoitus keskustasta",
      text: "Keskustan majoituksistamme pääset kätevästi ravintoloihin, kauppoihin ja kaikille palveluille.",
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
    travelHubText: "← Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
  },
  en: {
    meta: {
      title: "Restaurants and Services in Levi – Shops, Rentals | Leville.net",
      description:
        "Levi restaurants, grocery stores, sports equipment rentals and services. Opening hours, family-friendly options and practical tips.",
      canonical: "https://leville.net/guide/restaurants-and-services-in-levi",
    },
    title: "Restaurants and Services in Levi",
    subtitle: "Dining, shops, rentals and practical services",
    intro:
      "Levi center has all the services you need: restaurants for every taste, grocery stores, sports equipment rentals and health services. This guide covers everything you need to know.",
    sections: {
      restaurants: {
        title: "Restaurants in Levi",
        icon: "utensils",
        intro: "Levi has a diverse restaurant selection from traditional Lappish cuisine to international fare:",
        categories: [
          {
            name: "Fine dining & experience restaurants",
            places: ["Kammi", "Aurora Sky Restaurant", "King Crab House"],
            note: "Book a table in advance, especially on weekends and during peak season.",
          },
          {
            name: "Traditional Lappish restaurants",
            places: ["Kotaravintola Loimu", "Pihvikeisari", "Levin Panimo"],
            note: "Try sautéed reindeer, fish soup and Lappish specialties.",
          },
          {
            name: "Family-friendly restaurants",
            places: ["Hullu Poro", "Pizza-Kebab Levi", "Colorado Bar & Grill"],
            note: "Children's menus available, high chairs and family-friendly service.",
          },
          {
            name: "Fast food & take-away",
            places: ["Levin Grilli", "Pizza-Kebab Levi", "Hesburger"],
            note: "Take-away near slopes for lunch breaks.",
          },
          {
            name: "Après-ski & bars",
            places: ["Hullu Poro Arena", "Tuikku", "Levin Panimo"],
            note: "Relaxation and atmosphere after the slopes.",
          },
        ],
        tip: "During peak season (Christmas, ski holidays) book a table at popular restaurants a day or two in advance.",
      },
      groceries: {
        title: "Grocery Stores and Opening Hours",
        icon: "shopping",
        intro: "Levi center has two main stores for daily groceries:",
        stores: [
          {
            name: "K-Market Levi",
            location: "In center, Levintie",
            hours: "Mon–Sat 8–21, Sun 10–21 (season), shorter off-season",
            note: "Wide selection, fresh products, local specialties.",
          },
          {
            name: "Sale Levi",
            location: "Zero Point area",
            hours: "Mon–Sat 8–21, Sun 10–21",
            note: "Basic selection, more affordable option.",
          },
        ],
        tips: [
          "Opening hours may vary off-season – check in advance",
          "Christmas Eve and holidays: shorter hours or closed",
          "Fresh products and meat best to get early in season week",
          "Alko liquor store next to K-Market (alcohol over 5.5%)",
        ],
      },
      rental: {
        title: "Sports Equipment Rentals",
        icon: "shirt",
        intro: "Levi has several quality rental shops for ski equipment and winter gear:",
        shops: [
          {
            name: "Levi Ski Rent",
            services: ["Skis", "Snowboards", "Boots", "Helmets", "Ski suits"],
            location: "Multiple locations at slopes and center",
          },
          {
            name: "Intersport Levi",
            services: ["Skis", "Cross-country gear", "Winter clothing", "Sales + rental"],
            location: "Levi center",
          },
          {
            name: "Sport Shop Levi",
            services: ["Skis", "Winter equipment", "Repair services"],
            location: "Levi center",
          },
        ],
        tips: [
          "Book equipment online in advance during peak season",
          "Children's skis and gear available at all rental shops",
          "Test boots properly before hitting slopes",
          "Ask for binding adjustment to match your skill level",
        ],
      },
      health: {
        title: "Health and Pharmacy Services",
        icon: "heart",
        intro: "Levi has basic health care services:",
        services: [
          {
            name: "Levi Pharmacy",
            location: "In center",
            hours: "Mon–Fri 10–17, Sat 10–14 (longer in season)",
            note: "Prescription medicines, over-the-counter drugs, first aid supplies.",
          },
          {
            name: "Kittilä Health Center",
            location: "In Kittilä (20 km)",
            hours: "Weekdays daytime",
            note: "Emergency and extended care. Medical helpline 116 117.",
          },
          {
            name: "First Aid on Slopes",
            location: "Ski Patrol office at front lift",
            note: "Slope accidents and first aid. Call 112 in emergency.",
          },
        ],
        tip: "Carry travel and accident insurance. European Health Insurance Card (EU citizens) is valid in public services.",
      },
      family: {
        title: "Family-Friendly Services",
        icon: "baby",
        intro: "Levi has good services for families with children:",
        items: [
          "Childcare services: ask your accommodation or safari operators",
          "Children's menus and high chairs at family restaurants",
          "Play areas in shopping centers and hotels",
          "Baby supplies: diapers, baby food at K-Market and Sale",
          "Stroller rental: ask accommodation or hotels",
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Are restaurants open on Christmas?",
            a: "Many restaurants are open on Christmas Eve and Christmas Day, but booking in advance is recommended. Grocery stores may be closed or have limited hours.",
          },
          {
            q: "Where can I rent ski equipment for children?",
            a: "All major rental shops (Levi Ski Rent, Intersport, Sport Shop) have children's size range. Book in advance during ski holiday week.",
          },
          {
            q: "Are there gluten-free or vegan restaurants in Levi?",
            a: "Many restaurants offer gluten-free and vegan options. Ask your server about special diets – service is usually flexible.",
          },
          {
            q: "When are grocery stores busiest?",
            a: "Sunday afternoon and Monday are busiest when guest changeover happens. Shop on weekday mornings for quieter experience.",
          },
        ],
      },
    },
    cta: {
      title: "Book Accommodation in the Center",
      text: "From our center accommodations, you have convenient access to restaurants, shops and all services.",
      button: "View Accommodations",
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "Getting Around Levi", href: "/guide/getting-around-in-levi" },
      { text: "Families in Levi", href: "/guide/levi-with-children" },
      { text: "Winter Clothing for Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Restaurants and Services" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "← Back to Travel Guide",
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

        {/* Back to Travel HUB */}
        <div className="mb-6">
          <Link
            to={t.travelHubLink}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t.travelHubText}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          </header>

          {/* Introduction */}
          <p className="text-lg text-foreground/90 mb-10 leading-relaxed">{t.intro}</p>

          {/* Restaurants */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              {t.sections.restaurants.title}
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.restaurants.intro}</p>
            <div className="space-y-4">
              {t.sections.restaurants.categories.map((cat, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{cat.name}</h3>
                    <p className="text-sm text-primary mb-2">{cat.places.join(" • ")}</p>
                    <p className="text-sm text-muted-foreground">{cat.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg mt-4">
              <p className="text-sm text-foreground/80">
                <strong>💡 Vinkki:</strong> {t.sections.restaurants.tip}
              </p>
            </div>
          </section>

          {/* Grocery Stores */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              {t.sections.groceries.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.groceries.intro}</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {t.sections.groceries.stores.map((store, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{store.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" /> {store.location}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <Clock className="w-3 h-3" /> {store.hours}
                    </p>
                    <p className="text-sm text-foreground/80">{store.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ul className="space-y-2">
              {t.sections.groceries.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          {/* Equipment Rentals */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shirt className="w-6 h-6 text-primary" />
              {t.sections.rental.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.rental.intro}</p>
            <div className="space-y-4 mb-4">
              {t.sections.rental.shops.map((shop, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{shop.name}</h3>
                    <p className="text-sm text-primary mb-1">{shop.services.join(" • ")}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {shop.location}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <ul className="space-y-1">
                {t.sections.rental.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-foreground/80">
                    ✓ {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Health Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              {t.sections.health.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.health.intro}</p>
            <div className="space-y-4 mb-4">
              {t.sections.health.services.map((service, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" /> {service.location}
                    </p>
                    {service.hours && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                        <Clock className="w-3 h-3" /> {service.hours}
                      </p>
                    )}
                    <p className="text-sm text-foreground/80">{service.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>⚠️</strong> {t.sections.health.tip}
              </p>
            </div>
          </section>

          {/* Family Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Baby className="w-6 h-6 text-primary" />
              {t.sections.family.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.family.intro}</p>
            <ul className="space-y-2">
              {t.sections.family.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.faq.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="text-center bg-card/50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">{t.cta.title}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
            <Button asChild size="lg">
              <Link to={t.accommodationsHref}>{t.cta.button}</Link>
            </Button>
          </section>

          {/* Related Links */}
          <section>
            <h3 className="text-lg font-semibold mb-4">{t.relatedTitle}</h3>
            <div className="flex flex-wrap gap-3">
              {t.relatedLinks.map((link, index) => (
                <Link key={index} to={link.href} className="text-primary hover:underline text-sm">
                  {link.text} →
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
    </div>
  );
};

export default RestaurantsAndServices;
