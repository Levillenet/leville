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
import { Bus, Car, Plane, Footprints, Snowflake, MapPin, Clock, AlertTriangle } from "lucide-react";
import { Language } from "@/translations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface GettingAroundLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Liikkuminen Levillä – Skibussit, taksit, autoilu | Leville.net",
      description:
        "Miten liikut Levillä? Opas skibusseihin, takseihin, autonvuokraukseen ja kävelyetäisyyksiin. Käytännön vinkit talviajoon Lapissa.",
      canonical: "https://leville.net/opas/liikkuminen-levilla",
    },
    title: "Liikkuminen Levillä",
    subtitle: "Skibussit, taksit, autonvuokraus ja kävelyetäisyydet",
    intro:
      "Levillä liikkuminen on helppoa ja käytännöllistä. Tässä oppaassa käymme läpi kaikki liikkumisvaihtoehdot lentokenttäkuljetuksista skibusseihin ja talviajoon.",
    sections: {
      airport: {
        title: "Lentokenttäkuljetukset Kittilästä",
        icon: "plane",
        intro: "Kittilän lentokenttä sijaitsee vain 15 km Levin keskustasta. Kuljetusvaihtoehtoina:",
        items: [
          {
            title: "Lentokenttäbussi",
            desc: "Ajoitettu lentoaikatauluihin. Hinta noin 10–15€/suunta. Varaa etukäteen tai osta paikan päältä.",
          },
          {
            title: "Taksi",
            desc: "Matka-aika 15–20 min. Hinta noin 40–60€ suunnasta riippuen. Varaa etukäteen sesonkina.",
          },
          {
            title: "Vuokra-auto",
            desc: "Vuokraamot lentokentällä: Hertz, Avis, Europcar, Budget. Varaa ajoissa talvisesonkina.",
          },
          {
            title: "Majoituksen noutopalvelu",
            desc: "Monet majoitukset tarjoavat lentokenttäkuljetusta lisämaksusta tai ilmaiseksi.",
          },
        ],
      },
      skibus: {
        title: "Skibussit Levillä",
        icon: "bus",
        intro: "Levin skibussit kulkevat säännöllisesti keskustan ja eri rinnealueiden välillä:",
        items: [
          "Skibussit Levi-lipulla (hissilippu tai kausikortti joihin voi liittää lisämaksusta Skibussin vaikka viikoksi)",
          "Reitti kiertää keskustan majoitukset ja rinteiden alaasemat",
          "Lähdöt 15–30 minuutin välein sesonkina",
          "Ensimmäinen bussi noin klo 9, viimeinen klo 17–18",
          "Iltabussi hiihtolomaviikoilla ja sesonkihuipuissa",
        ],
        tip: "Skibussin aikataulut löydät Visit Levin verkkosivuilta ja Levin hissilippujen mobiilisovelluksesta.",
      },
      taxi: {
        title: "Taksit ja kyytipalvelut",
        icon: "car",
        intro: "Takseja on saatavilla Levillä, mutta sesonkiaikoina kannattaa varata etukäteen:",
        items: [
          { title: "Levi Taxi", desc: "Paikallinen taksipalvelu. Puh: +358 16 641 100" },
          { title: "Kittilän Taksit", desc: "Alueellinen taksipalvelu lentokenttäkuljetuksiin." },
          { title: "Safari-operaattorit", desc: "Monet safari-yritykset tarjoavat kuljetuspalveluita." },
        ],
        tip: "Sesonkiaikoina (joulu, hiihtoloma) takseja on rajoitetusti. Varaa vähintään päivää ennen.",
      },
      rental: {
        title: "Autonvuokraus ja pysäköinti",
        icon: "car",
        intro: "Oma auto antaa vapautta liikkua, mutta talviajamiseen kannattaa varautua:",
        rentalInfo: [
          "Vuokraamot: Kittilän lentokenttä (Hertz, Avis, Europcar, Budget)",
          "Talvirenkaat ja nastarenkaat kuuluvat aina hintaan Lapissa",
          "Neliveto suositeltava mutta ei välttämätön",
          "Varaa ajoissa – autot loppuvat nopeasti sesonkina",
        ],
        parkingInfo: [
          "Ilmainen pysäköinti useimmissa majoituksissa",
          "Rinteiden parkkipaikat ilmaisia",
          "Levin keskustan pysäköinti pääosin ilmaista",
          "Autolämmityspistokkeet saatavilla useimmissa majoituksissa",
        ],
      },
      walking: {
        title: "Kävelyetäisyydet Levin keskustassa",
        icon: "footprints",
        intro: "Levin keskusta on kompakti ja helppo kävellä:",
        distances: [
          { from: "Keskusta → Etuhissi", time: "5–10 min" },
          { from: "Keskusta → Gondolihissi", time: "10–15 min" },
          { from: "Keskusta → Hullu Poro", time: "5 min" },
          { from: "Zero Point → Keskusta", time: "1–2 min" },
        ],
        tip: "Talvella kävelytiet pidetään hyvin aurattuna",
      },
      winterDriving: {
        title: "Talviajo Lapissa – vinkit",
        icon: "snowflake",
        intro: "Talviajaminen Lapissa vaatii varovaisuutta ja valmistautumista:",
        items: [
          {
            title: "Tarkista sää ennen lähtöä",
            desc: "Lumi- ja pakkasvaroitukset ilmatieteenlaitokselta. Näkyvyys voi olla heikko pyryssä.",
          },
          {
            title: "Pidä turvaväli",
            desc: "Jarrutusmatkat voivat olla 5–10-kertaisia kesään verrattuna jäisellä tiellä.",
          },
          {
            title: "Porot tiellä",
            desc: "Porot liikkuvat vapaasti ja ylittävät teitä. Aja varovasti, erityisesti hämärässä.",
          },
          { title: "Tankki täyteen", desc: "Etäisyydet ovat pitkiä. Pidä tankki vähintään puoliksi täynnä." },
          {
            title: "Autolämmitys",
            desc: "Kytke auto lämmityspistorasiaan yöksi -20°C pakkasissa. 1 tunti ennen lähtöä riittää.",
          },
        ],
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Tarvitsenko autoa Levillä?",
            a: "Ei välttämättä. Jos majoitut keskustassa ja liikut pääasiassa rinteillä, skibussit ja kävelyetäisyydet riittävät. Auto on hyödyllinen, jos haluat tehdä retkiä ympäristöön.",
          },
          {
            q: "Ovatko skibussit ilmaisia?",
            a: "Ei Levin skibussit ovat maksullisia ja sen voi hankkia osaksi hissilippua. Bussi kiertää keskustan ja rinteiden väliä säännöllisesti.",
          },
          {
            q: "Miten pääsen lentokentältä Leville myöhään illalla?",
            a: "Varaa taksi etukäteen tai tarkista, tarjoaako majoituksesi lentokenttäkuljetusta. Lentokenttäbussit ajoitetaan lentoaikatauluihin.",
          },
          {
            q: "Onko Levillä Uber tai Bolt?",
            a: "Molemmat palvelevat Levillä. Käytä paikallisia takseja ja varaa etukäteen sesonkiaikoina.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoitus kävelyetäisyydellä rinteistä",
      text: "Keskustan majoituksistamme pääset kätevästi rinteille ja palveluiden ääreen ilman autoa.",
      button: "Katso majoitukset",
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista" },
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Ravintolat ja palvelut", href: "/opas/ravintolat-ja-palvelut-levilla" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Liikkuminen Levillä" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    travelHubText: "← Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
  },
  en: {
    meta: {
      title: "Getting Around Levi – Ski Buses, Taxis, Driving | Leville.net",
      description:
        "How to get around in Levi? Guide to ski buses, taxis, car rental and walking distances. Practical tips for winter driving in Lapland.",
      canonical: "https://leville.net/guide/getting-around-in-levi",
    },
    title: "Getting Around Levi",
    subtitle: "Ski buses, taxis, car rental and walking distances",
    intro:
      "Getting around Levi is easy and practical. This guide covers all transportation options from airport transfers to ski buses and winter driving tips.",
    sections: {
      airport: {
        title: "Airport Transfers from Kittilä",
        icon: "plane",
        intro: "Kittilä Airport is only 15 km from Levi center. Transportation options include:",
        items: [
          {
            title: "Airport Bus",
            desc: "Timed to flight schedules. Price around €10–15 one way. Book in advance or buy on site.",
          },
          {
            title: "Taxi",
            desc: "Travel time 15–20 min. Price around €40–60 depending on direction. Book in advance during season.",
          },
          {
            title: "Rental Car",
            desc: "Rental companies at airport: Hertz, Avis, Europcar, Budget. Book early during winter season.",
          },
          {
            title: "Accommodation Pickup",
            desc: "Many accommodations offer airport transfers for additional fee or free of charge.",
          },
        ],
      },
      skibus: {
        title: "Ski Buses in Levi",
        icon: "bus",
        intro: "Levi's free ski buses run regularly between the center and slopes:",
        items: [
          "Free ski buses with Levi lift ticket (day pass or season pass)",
          "Route circles center accommodations and slope base stations",
          "Departures every 15–30 minutes during season",
          "First bus around 9 AM, last at 5–6 PM",
          "Evening bus during ski holiday weeks and peak season",
        ],
        tip: "Ski bus schedules available on Visit Levi website and Levi lift ticket mobile app.",
      },
      taxi: {
        title: "Taxis and Ride Services",
        icon: "car",
        intro: "Taxis are available in Levi, but during peak season booking in advance is recommended:",
        items: [
          { title: "Levi Taxi", desc: "Local taxi service. Phone: +358 16 641 100" },
          { title: "Kittilä Taxis", desc: "Regional taxi service for airport transfers." },
          { title: "Safari Operators", desc: "Many safari companies offer transportation services." },
        ],
        tip: "During peak season (Christmas, ski holidays) taxis are limited. Book at least a day before.",
      },
      rental: {
        title: "Car Rental and Parking",
        icon: "car",
        intro: "Having your own car gives freedom to move around, but be prepared for winter driving:",
        rentalInfo: [
          "Rental companies: Kittilä Airport (Hertz, Avis, Europcar, Budget)",
          "Winter tires and studded tires always included in Lapland",
          "4WD recommended but not required",
          "Book early – cars sell out quickly during season",
        ],
        parkingInfo: [
          "Free parking at most accommodations",
          "Slope parking free on weekdays, paid on weekends during season",
          "Levi center parking mostly free",
          "Car heating outlets available at most accommodations",
        ],
      },
      walking: {
        title: "Walking Distances in Levi Center",
        icon: "footprints",
        intro: "Levi center is compact and easy to walk:",
        distances: [
          { from: "Center → Front Lift", time: "5–10 min" },
          { from: "Center → Gondola Lift", time: "10–15 min" },
          { from: "Center → Hullu Poro", time: "5 min" },
          { from: "Zero Point → Center", time: "15–20 min" },
        ],
        tip: "In winter, walkways are well plowed. Ice cleats for shoes are a good investment.",
      },
      winterDriving: {
        title: "Winter Driving in Lapland – Tips",
        icon: "snowflake",
        intro: "Winter driving in Lapland requires caution and preparation:",
        items: [
          {
            title: "Check weather before departure",
            desc: "Snow and frost warnings from Finnish Meteorological Institute. Visibility can be poor in snowstorms.",
          },
          {
            title: "Keep safe distance",
            desc: "Braking distances can be 5–10 times longer compared to summer on icy roads.",
          },
          {
            title: "Reindeer on roads",
            desc: "Reindeer roam freely and cross roads. Drive carefully, especially in twilight.",
          },
          { title: "Full tank", desc: "Distances are long. Keep tank at least half full." },
          {
            title: "Car heating",
            desc: "Plug car into heating outlet overnight in -20°C frost. 2 hours before departure is enough.",
          },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Do I need a car in Levi?",
            a: "Not necessarily. If you stay in the center and mainly visit slopes, ski buses and walking distances are sufficient. A car is useful if you want to make trips to the surrounding area.",
          },
          {
            q: "Are ski buses free?",
            a: "Yes, Levi ski buses are free for lift ticket holders. The bus circles between center and slopes regularly.",
          },
          {
            q: "How do I get from airport to Levi late at night?",
            a: "Book a taxi in advance or check if your accommodation offers airport transfer. Airport buses are timed to flight schedules.",
          },
          {
            q: "Is there Uber or Bolt in Levi?",
            a: "No. Levi doesn't have Uber or Bolt. Use local taxis and book in advance during peak season.",
          },
        ],
      },
    },
    cta: {
      title: "Book Accommodation Walking Distance from Slopes",
      text: "From our center accommodations, you can conveniently reach slopes and services without a car.",
      button: "View Accommodations",
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
      { text: "Winter Clothing for Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Restaurants and Services", href: "/guide/restaurants-and-services-in-levi" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Getting Around Levi" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "← Back to Travel Guide",
    accommodationsHref: "/en/accommodations",
  },
};

const GettingAroundLevi = ({ lang = "fi" }: GettingAroundLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/opas/liikkuminen-levilla",
    en: "https://leville.net/guide/getting-around-in-levi",
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

          {/* Airport Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-primary" />
              {t.sections.airport.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.airport.intro}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.sections.airport.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Ski Buses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Bus className="w-6 h-6 text-primary" />
              {t.sections.skibus.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.skibus.intro}</p>
            <ul className="space-y-2 mb-4">
              {t.sections.skibus.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>💡 Vinkki:</strong> {t.sections.skibus.tip}
              </p>
            </div>
          </section>

          {/* Taxis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Car className="w-6 h-6 text-primary" />
              {t.sections.taxi.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.taxi.intro}</p>
            <div className="space-y-3 mb-4">
              {t.sections.taxi.items.map((item, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <AlertTriangle className="w-4 h-4 inline mr-2 text-amber-500" />
                {t.sections.taxi.tip}
              </p>
            </div>
          </section>

          {/* Car Rental & Parking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Car className="w-6 h-6 text-primary" />
              {t.sections.rental.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.rental.intro}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{lang === "fi" ? "Autonvuokraus" : "Car Rental"}</h3>
                  <ul className="space-y-2">
                    {t.sections.rental.rentalInfo.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{lang === "fi" ? "Pysäköinti" : "Parking"}</h3>
                  <ul className="space-y-2">
                    {t.sections.rental.parkingInfo.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Walking Distances */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Footprints className="w-6 h-6 text-primary" />
              {t.sections.walking.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.walking.intro}</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {t.sections.walking.distances.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-card/30 p-3 rounded-lg">
                  <span className="text-foreground/80">{item.from}</span>
                  <span className="font-semibold text-primary flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>💡 Vinkki:</strong> {t.sections.walking.tip}
              </p>
            </div>
          </section>

          {/* Winter Driving */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.winterDriving.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.winterDriving.intro}</p>
            <div className="space-y-4">
              {t.sections.winterDriving.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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

export default GettingAroundLevi;
