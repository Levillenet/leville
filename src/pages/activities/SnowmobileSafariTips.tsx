import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Clock, Shield, Users, Thermometer, AlertTriangle, CheckCircle, MapPin } from "lucide-react";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SnowmobileSafariTipsProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Moottorikelkkasafari Levillä – Vinkit ensikertalaiselle | Leville.net",
      description:
        "Ensimmäinen moottorikelkkasafari Levillä? Lue käytännön vinkit pukeutumiseen, ajamiseen ja varaamiseen. Koe Lapin erämaa itsevarmuudella.",
      canonical: "https://leville.net/aktiviteetit/moottorikelkkasafari-vinkit-levi",
    },
    title: "Moottorikelkkasafari Levillä",
    subtitle: "Käytännön vinkit ensikertalaiselle – kaikki mitä sinun tarvitsee tietää",
    intro:
      "Moottorikelkkasafari on yksi Lapin suosituimmista talvielämyksistä. Se tarjoaa ainutlaatuisen tavan kokea Lapin erämaa – luminen maisema, hiljaisuus ja vauhti yhdistyvät unohtumattomaksi seikkailuksi. Tämä opas auttaa ensikertalaista valmistautumaan safarille.",
    sections: {
      expect: {
        title: "Mitä odottaa moottorikelkkasafarilta",
        intro: "Tyypillinen moottorikelkkasafari sisältää:",
        items: [
          "Lyhyt perehdytys kelkan ajamiseen ennen lähtöä",
          "Ajoa merkityillä reiteillä tunturimaisemissa",
          "Taukoja nuotiopaikoilla kuuman mehun ja makkaranpaiston merkeissä",
          "Mahdollisuus nähdä poroja ja muuta arktista luontoa",
          "Kokeneita oppaita, jotka tuntevat alueen ja huolehtivat turvallisuudesta",
        ],
      },
      tours: {
        title: "Safarityypit Levillä",
        items: [
          {
            type: "Lyhyet 2 tunnin safarit",
            desc: "Täydellinen ensikertalaisialle. Tutustut kelkan ajamiseen ja pääset tunturin päälle nauttimaan maisemista. Hinta tyypillisesti 100–150€ per henkilö.",
            duration: "2 tuntia",
            icon: "clock",
          },
          {
            type: "Puolen päivän seikkailut",
            desc: "4–5 tunnin retki vie sinut syvemmälle erämaahan. Sisältää pidempiä ajojaksoja ja tauon laavulla. Hinta 180–250€ per henkilö.",
            duration: "4–5 tuntia",
            icon: "mappin",
          },
          {
            type: "Usean päivän expeditiot",
            desc: "Kokeneiden ajajien unelma. Yövy erämaakämpillä ja aja satoja kilometrejä Lapin sydämessä. Hinta alkaen 500€/päivä.",
            duration: "2–5 päivää",
            icon: "snowflake",
          },
        ],
      },
      clothing: {
        title: "Mitä pukea moottorikelkkasafarille",
        intro: "Safari-operaattorit tarjoavat yleensä lämpimät haalarit, kypärän ja käsineet. Tuo silti mukana:",
        items: [
          "Villa- tai lämpöalusasu (ei puuvillaa)",
          "Villasukat – omat jalat kiittävät",
          "Ohut pipo, joka mahtuu kypärän alle",
          "Aurinkolasit tai lasit kypärän visiirin alle aurinkoisena päivänä",
          "Kasvosuoja tai tuubihuivi, jos haluaa lisäsuojaa",
        ],
        tip: "Älä pukeudu liian lämpimästi – haalarit ovat todella paksut ja hikoilu viilentää.",
      },
      driving: {
        title: "Moottorikelkan ajaminen – käytännön vinkit",
        items: [
          {
            title: "Ajokortti",
            text: "Kelkan ajamiseen tarvitset B-ajokortin (henkilöauto). Alle 18-vuotiaat eivät saa ajaa itse, mutta voivat matkustaa kyydissä.",
          },
          {
            title: "Turvallisuus reitillä",
            text: "Pysy merkityllä reitillä ja noudata oppaan ohjeita. Turvaväli edellä ajavaan on tärkeää – lumi pöllyää ja näkyvyys voi olla heikko.",
          },
          {
            title: "Matkustajana ajaminen",
            text: "Matkustajan paikka on takana. Pidä kiinni ja nojaa kuljettajan mukana kaarteissa. Se on helpompaa kuin luulet!",
          },
          {
            title: "Ensimmäinen kerta?",
            text: "Kelkan ajaminen on helpompaa kuin auto. Ohjaustanko kääntyy kevyesti ja jarru on vasemmalla puolella. Opit muutamassa minuutissa.",
          },
        ],
      },
      bestTime: {
        title: "Paras aika moottorikelkkasafarille",
        intro: "Levillä voi ajaa moottorikelkkaa marraskuusta toukokuulle, mutta parhaat olosuhteet:",
        times: [
          {
            period: "Joulu–tammikuu",
            desc: "Kaamos tuo pimeän tunnelman ja mahdollisuuden nähdä revontulia safarilla",
          },
          {
            period: "Helmi–maaliskuu",
            desc: "Ihanteelliset olosuhteet: paksu lumipeite, pidempi päivä, auringonpaistetta",
          },
          { period: "Huhti–toukokuu", desc: "Kevätaurinko, upeat hankikelit, mutta lumi alkaa sulaa" },
        ],
      },
      booking: {
        title: "Safarin varaaminen",
        providers: {
          title: "Missä varata",
          list: [
            "Safari-operaattorit Levin keskustassa",
            "Hotellien ja majoitusyritysten vastaanotot",
            "Online-varaukset suoraan operaattoreilta",
            "Levintie 50 Visit Levi -palvelupiste",
          ],
        },
        prices: {
          title: "Tyypilliset hinnat (2024–2025)",
          list: [
            "2h safari: 100–160€ / henkilö",
            "4h safari: 180–260€ / henkilö",
            "Iltasafari (revontulimahdollisuus): 150–220€ / henkilö",
            "Omat käsineet ja kasvosuoja: mukana tai 10–20€ lisämaksu",
          ],
        },
        tip: "Varaa ajoissa sesonkiaikoina (joulu, hiihtoloma). Suosituimmat safarit täyttyvät nopeasti.",
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Tarvitsenko ajokorttia moottorikelkan ajamiseen?",
            a: "Kyllä, B-ajokortti (henkilöauto) vaaditaan kuljettajalta. Ilman ajokorttia voit matkustaa kyydissä. Joissakin tapauksissa AM-kortti riittää pienille moottorikelkoille.",
          },
          {
            q: "Voivatko lapset osallistua safarille?",
            a: "Kyllä! Lapset voivat matkustaa aikuisen kyydissä. Yleensä alaraja on noin 4 vuotta. Lapsille on tarjolla omat lämpöhaalarit ja kypärät.",
          },
          {
            q: "Onko moottorikelkkasafarilla kylmä?",
            a: "Kylmyys riippuu säästä ja safarin pituudesta. Operaattorit tarjoavat lämpimät haalarit. Eniten kylmenee seisoessa tauoilla – pukeudu kerroksittain ja liiku välillä.",
          },
          {
            q: "Voinko ajaa, vaikka en ole koskaan ajanut moottorikelkkaa?",
            a: "Ehdottomasti! Suurin osa asiakkaista on ensikertalaisia. Opas perehdyttää kelkan käyttöön ennen lähtöä, ja ajaminen on helpompaa kuin luulet. Moottorikelkassa on automaattivaihteisto.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoituksesi lähelle safari-lähtöpaikkoja",
      text: "Levin keskustan majoituksistamme pääset kätevästi safari-operaattoreiden lähtöpaikoille. Monet safarit noutavat asiakkaat suoraan majoituksesta!",
      button: "Katso majoitukset",
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Parhaat talviaktiviteetit Levillä", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Aktiviteetit Levillä", href: "/opas/aktiviteetit-levi" },
      { label: "Moottorikelkkasafari", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
    ],
    activitiesHubLink: "/opas/aktiviteetit-levi",
    activitiesHubText: "← Takaisin aktiviteettioppaaseen",
    accommodationsHref: "/majoitukset",
  },
  en: {
    meta: {
      title: "Snowmobile Safari Tips for Levi | First-Timer's Guide | Leville.net",
      description:
        "First snowmobile safari in Levi? Get practical tips on clothing, driving, safety and booking. Experience Arctic wilderness with confidence.",
      canonical: "https://leville.net/activities/snowmobile-safari-tips-levi",
    },
    title: "Snowmobile Safari Tips for Levi",
    subtitle: "A first-timer's guide – everything you need to know",
    intro:
      "A snowmobile safari is one of Lapland's most popular winter experiences. It offers a unique way to explore the Arctic wilderness – snowy landscapes, silence and speed combine for an unforgettable adventure. This guide helps first-timers prepare for their safari.",
    sections: {
      expect: {
        title: "What to Expect on a Snowmobile Safari",
        intro: "A typical snowmobile safari includes:",
        items: [
          "Brief instruction on operating the snowmobile before departure",
          "Riding on marked trails through fell landscapes",
          "Breaks at campfire sites with hot drinks and sausages",
          "Opportunity to spot reindeer and other Arctic wildlife",
          "Experienced guides who know the area and ensure safety",
        ],
      },
      tours: {
        title: "Types of Snowmobile Tours in Levi",
        items: [
          {
            type: "Short 2-Hour Tours",
            desc: "Perfect for first-timers. Learn to operate the snowmobile and enjoy fell-top views. Price typically €100–150 per person.",
            duration: "2 hours",
            icon: "clock",
          },
          {
            type: "Half-Day Adventures",
            desc: "4–5 hour trip takes you deeper into the wilderness. Includes longer riding periods and a break at a cabin. Price €180–250 per person.",
            duration: "4–5 hours",
            icon: "mappin",
          },
          {
            type: "Multi-Day Expeditions",
            desc: "An experienced rider's dream. Stay overnight in wilderness cabins and cover hundreds of kilometers through Lapland. Price from €500/day.",
            duration: "2–5 days",
            icon: "snowflake",
          },
        ],
      },
      clothing: {
        title: "What to Wear on a Snowmobile Safari",
        intro: "Safari operators usually provide warm overalls, helmet and gloves. Still bring with you:",
        items: [
          "Wool or thermal base layers (no cotton)",
          "Wool socks – your feet will thank you",
          "Thin beanie that fits under the helmet",
          "Sunglasses or goggles under the visor on sunny days",
          "Face protection or neck gaiter for extra coverage",
        ],
        tip: "Don't overdress – the overalls are very thick and sweating will cool you down.",
      },
      driving: {
        title: "Driving a Snowmobile – Practical Tips",
        items: [
          {
            title: "License Requirements",
            text: "You need a B driver's license (car) to drive a snowmobile. Under-18s cannot drive themselves but can ride as passengers.",
          },
          {
            title: "Safety on the Trail",
            text: "Stay on marked trails and follow the guide's instructions. Keep a safe distance from the snowmobile in front – snow spray can reduce visibility.",
          },
          {
            title: "Riding as a Passenger",
            text: "Passengers sit in the back. Hold on and lean with the driver through turns. It's easier than you might think!",
          },
          {
            title: "First Time?",
            text: "Driving a snowmobile is easier than a car. The handlebars turn easily and the brake is on the left side. You'll learn in a few minutes.",
          },
        ],
      },
      bestTime: {
        title: "Best Time for Snowmobile Safaris",
        intro: "Snowmobile tours run in Levi from November to May, but best conditions are:",
        times: [
          {
            period: "Christmas–January",
            desc: "Polar night brings dark atmosphere and chance to see northern lights during safari",
          },
          { period: "February–March", desc: "Ideal conditions: thick snow cover, longer days, sunny weather" },
          { period: "April–May", desc: "Spring sun, excellent snow crust, but snow starts melting" },
        ],
      },
      booking: {
        title: "Booking Your Safari",
        providers: {
          title: "Where to Book",
          list: [
            "Safari operators in Levi center",
            "Hotel and accommodation reception desks",
            "Online bookings directly from operators",
            "Visit Levi service point at Levintie 50",
          ],
        },
        prices: {
          title: "Typical Prices (2024–2025)",
          list: [
            "2h safari: €100–160 / person",
            "4h safari: €180–260 / person",
            "Evening safari (aurora chance): €150–220 / person",
            "Own gloves and face protection: included or €10–20 extra",
          ],
        },
        tip: "Book early during peak seasons (Christmas, ski holidays). Popular safaris fill up quickly.",
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Do I need a driving license for snowmobiling?",
            a: "Yes, a B driver's license (car) is required for drivers. Without a license, you can ride as a passenger. In some cases, an AM license is sufficient for small snowmobiles.",
          },
          {
            q: "Can children participate in safaris?",
            a: "Yes! Children can ride as passengers with an adult. Usually the minimum age is around 4 years. Thermal overalls and helmets are provided for children.",
          },
          {
            q: "Is it cold on a snowmobile safari?",
            a: "Cold depends on weather and safari length. Operators provide warm overalls. You'll feel coldest during breaks when standing still – dress in layers and keep moving.",
          },
          {
            q: "Can I drive if I've never driven a snowmobile before?",
            a: "Absolutely! Most customers are first-timers. The guide will instruct you before departure, and driving is easier than you think. Snowmobiles have automatic transmission.",
          },
        ],
      },
    },
    cta: {
      title: "Book Your Accommodation Near Safari Departure Points",
      text: "Our Levi center accommodations provide easy access to safari operators' departure points. Many safaris pick up guests directly from accommodation!",
      button: "View Accommodations",
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "How to Dress for Winter in Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Top Winter Activities in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Activities in Levi", href: "/guide/activities-in-levi" },
      { label: "Snowmobile Safari", href: "/activities/snowmobile-safari-tips-levi" },
    ],
    activitiesHubLink: "/guide/activities-in-levi",
    activitiesHubText: "← Back to Activities Guide",
    accommodationsHref: "/en/accommodations",
  },
};

const SnowmobileSafariTips = ({ lang = "fi" }: SnowmobileSafariTipsProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/moottorikelkkasafari-vinkit-levi",
    en: "https://leville.net/activities/snowmobile-safari-tips-levi",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock":
        return <Clock className="w-5 h-5" />;
      case "mappin":
        return <MapPin className="w-5 h-5" />;
      case "snowflake":
        return <Snowflake className="w-5 h-5" />;
      default:
        return <Snowflake className="w-5 h-5" />;
    }
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
        
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={t.breadcrumbs} />

        {/* Back to Activities HUB */}
        <div className="mb-6">
          <Link
            to={t.activitiesHubLink}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t.activitiesHubText}
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

          {/* What to Expect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              {t.sections.expect.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.expect.intro}</p>
            <ul className="space-y-3">
              {t.sections.expect.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tour Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              {t.sections.tours.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.sections.tours.items.map((tour, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{getIcon(tour.icon)}</div>
                      <span className="text-sm font-medium text-primary">{tour.duration}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tour.type}</h3>
                    <p className="text-sm text-foreground/80">{tour.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What to Wear */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              {t.sections.clothing.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.clothing.intro}</p>
            <ul className="space-y-2 mb-4">
              {t.sections.clothing.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm bg-yellow-500/10 p-4 rounded-lg text-foreground/90 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              {t.sections.clothing.tip}
            </p>
          </section>

          {/* Driving Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              {t.sections.driving.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {t.sections.driving.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/80">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Time */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.bestTime.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.bestTime.intro}</p>
            <div className="space-y-3">
              {t.sections.bestTime.times.map((time, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card/50 rounded-lg">
                  <span className="font-semibold text-primary whitespace-nowrap">{time.period}</span>
                  <span className="text-foreground/80">{time.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Booking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              {t.sections.booking.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.providers.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.booking.providers.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.prices.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.booking.prices.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm bg-primary/10 p-4 rounded-lg text-foreground/90">💡 {t.sections.booking.tip}</p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.faq.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/80">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section */}
          <section className="bg-primary/10 rounded-2xl p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.cta.title}</h2>
            <p className="text-foreground/80 mb-6 max-w-xl mx-auto">{t.cta.text}</p>
            <Button asChild size="lg">
              <Link to={t.accommodationsHref}>{t.cta.button}</Link>
            </Button>
          </section>

          {/* Related Links */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.relatedTitle}</h3>
            <div className="flex flex-wrap gap-4">
              {t.relatedLinks.map((link, index) => (
                <Link key={index} to={link.href} className="text-primary hover:underline">
                  {link.text} →
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default SnowmobileSafariTips;
