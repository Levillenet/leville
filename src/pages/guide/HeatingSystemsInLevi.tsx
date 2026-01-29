import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Flame, 
  Waves, 
  AirVent, 
  Gauge, 
  Phone,
  ArrowLeft
} from "lucide-react";
import { Language } from "@/translations";

interface HeatingSystemsInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Lämmitysjärjestelmät Levin mökeissä ja huoneistoissa | Leville.net",
      description:
        "Lämmitysjärjestelmät Levin mökeissä ja huoneistoissa: sähköpatterit, lattialämmitys, vesikiertoinen lämmitys, ilmalämpöpumput ja takat. Käytännön vinkit lämpimään talvilomaan.",
      canonical: "https://leville.net/opas/lammitysjarjestelmat-levi",
    },
    title: "Mökkien ja huoneistojen lämmitysjärjestelmät Levillä",
    subtitle: "Näin pysyt lämpimänä arktisessa talvilomassa",
    intro:
      "Levin mökit ja huoneistot käyttävät erilaisia lämmitysjärjestelmiä. Niiden ymmärtäminen auttaa viettämään mukavan loman, erityisesti talvella. Arktisissa olosuhteissa kaikki järjestelmät eivät reagoi yhtä nopeasti, joten pieni kärsivällisyys on valttia.",
    sections: {
      electricRadiators: {
        title: "Suora sähkölämmitys (sähköpatterit)",
        items: [
          "Yleisin lämmitysjärjestelmä Levillä",
          "Seinään kiinnitetyt patterit, joissa oma termostaatti",
          "Reagoi melko nopeasti säätöihin",
          "Toimii tehokkaasti, kun patterit ovat riittävän suuret ja eristys kunnossa",
        ],
        note: "Vanhemmissa hirsimökeissä eristys voi olla heikompi. Nurkista tai hirsien välistä voi tulla vetoa. Kovalla pakkasella sisälämpötila saattaa jäädä noin 20 asteeseen, vaikka lämmitys toimii täysillä.",
      },
      electricFloor: {
        title: "Sähköinen lattialämmitys",
        items: [
          "Lämmityskaapelit lattian pinnan alla",
          "Mukava ja tasainen lämpö",
          "Hitaampi reagoimaan kuin sähköpatterit",
          "Termostaatit yleensä seinällä",
        ],
      },
      waterFloor: {
        title: "Vesikiertoinen lattialämmitys",
        items: [
          "Erittäin yleinen uudemmissa mökeissä ja huoneistoissa",
          "Lämpö jakautuu tasaisesti lattian kautta",
          "Lämpötila säätää usein automaattisesti ulkolämpötilan mukaan",
          "Erittäin mukava ja energiatehokas",
        ],
        note: "Reagoi hyvin hitaasti – lämpötilamuutokset voivat kestää 1–2 päivää. Järjestelmä on suunniteltu tasaiseen lämpötilaan, ei nopeisiin säätöihin. Jos edelliset vieraat ovat pitäneet viileämpää, lämpeneminen vie aikaa.",
      },
      waterRadiators: {
        title: "Vesikiertoiset patterit",
        items: [
          "Patterit, joissa kiertää kuuma vesi",
          "Nopeampi reagointi kuin lattialämmityksessä",
          "Termostaatti patterin kyljessä",
          "Usein käytetään muiden järjestelmien rinnalla",
        ],
      },
      fireplaces: {
        title: "Takat ja tulisijat",
        items: [
          "Koristetakka: liekki menee suoraan savupiippuun, matala lämmitysteho, voi jopa viilentää tilaa",
          "Varaava takka: lämpö kiertää rakenteen sisällä, erittäin tehokas, vapauttaa lämpöä hitaasti",
        ],
        note: "Lue aina mökkikohtaiset ohjeet ennen takan käyttöä.",
      },
      heatPump: {
        title: "Ilmalämpöpumppu",
        items: [
          "Erittäin yleinen ja energiatehokas",
          "Ohjataan kaukosäätimellä",
          "Lämmittää nopeasti ja tasaisesti",
          "Erinomainen mukavan lämpötilan ylläpitämiseen",
        ],
        note: "Lämmitysteho heikkenee merkittävästi noin –20°C alapuolella. Toimii silti hyvin tukilämmityksenä.",
      },
      thermostats: {
        title: "Termostaattien käyttö – miksi pienet säädöt toimivat parhaiten",
        items: [
          "Monet termostaatit eivät näytä lämpötilaa asteina",
          "Asteikon sijaan voi olla symboleita tai numeroita ilman yksikköä",
          "Säädä lämpötilaa aina vähitellen",
          "Vältä äärimmäisiä säätöjä – liian alas kääntäminen viilentää mökkiä merkittävästi",
          "Mökki ei lämpene nopeasti takaisin",
        ],
        note: "Monissa termostaateissa on merkkivalo (vihreä tai punainen), joka kertoo onko lämmitys päällä. Jos valo ei pala, järjestelmä ei lämmitä sillä hetkellä. Pienet säädöt ja kärsivällisyys tuottavat parhaan tuloksen.",
      },
      contact: {
        title: "Milloin ottaa yhteyttä omistajaan tai huoltoon",
        items: [
          "Normaali sisälämpötila on noin 20–22°C",
          "Kovalla pakkasella korkeampi lämpötila ei aina ole mahdollinen",
          "Jos lämpötila pysyy selvästi alle 15–17°C, kyseessä voi olla vika",
          "Ota tällöin yhteyttä omistajaan tai huoltopalveluun",
        ],
      },
    },
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Lämmitysjärjestelmät", href: "/opas/lammitysjarjestelmat-levi" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    travelHubText: "Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
    ctaTitle: "Varaa lämmin majoitus Leviltä",
    ctaButton: "Katso majoitukset",
  },

  en: {
    meta: {
      title: "Heating Systems in Levi Cabins and Apartments | Leville.net",
      description:
        "Heating systems in Levi cabins and apartments: electric radiators, floor heating, water-based heating, heat pumps and fireplaces. Practical tips for a warm winter holiday.",
      canonical: "https://leville.net/guide/heating-systems-in-levi",
    },
    title: "Heating Systems in Cabins and Apartments in Levi",
    subtitle: "How to stay warm during your Arctic holiday",
    intro:
      "Cabins and apartments in Levi use different heating systems. Understanding how they work helps you stay comfortable, especially in winter. In Arctic conditions, not all systems react instantly, so a little patience goes a long way.",
    sections: {
      electricRadiators: {
        title: "Direct Electric Heating (Radiators)",
        items: [
          "Most common heating system in Levi",
          "Wall-mounted radiators with built-in thermostats",
          "Reacts fairly quickly to adjustments",
          "Effective when radiators are sufficient and insulation is good",
        ],
        note: "In older log cabins, insulation may be weaker. Drafts from corners or between logs may occur. During very cold weather, indoor temperature may stay around 20°C despite maximum heating.",
      },
      electricFloor: {
        title: "Electric Underfloor Heating",
        items: [
          "Heating cables under floor surface",
          "Comfortable and even heat",
          "Slower to react than radiators",
          "Thermostats usually located on walls",
        ],
      },
      waterFloor: {
        title: "Water-Based Underfloor Heating",
        items: [
          "Very common in newer cabins and apartments",
          "Heat distributed evenly through floors",
          "Temperature often adjusts automatically based on outdoor temperature",
          "Very comfortable and energy efficient",
        ],
        note: "Reacts very slowly – temperature changes may take 1–2 days. Designed for stable temperature, not quick adjustments. If previous guests preferred lower temperature, warming up takes time.",
      },
      waterRadiators: {
        title: "Water-Filled Radiators",
        items: [
          "Radiators with hot water circulation",
          "Faster response than floor heating",
          "Thermostat located on radiator",
          "Often used alongside other systems",
        ],
      },
      fireplaces: {
        title: "Fireplaces and Stoves",
        items: [
          "Decorative fireplace: flame goes directly to chimney, low heating efficiency, may even cool the space",
          "Heat-storing fireplace: heat circulates inside structure, very efficient, releases heat slowly",
        ],
        note: "Always read cabin-specific instructions before using a fireplace.",
      },
      heatPump: {
        title: "Air-Source Heat Pump",
        items: [
          "Very common and energy efficient",
          "Controlled with remote control",
          "Heats quickly and evenly",
          "Excellent for maintaining comfortable temperature",
        ],
        note: "Heating efficiency drops significantly below approx. –20°C. Still useful as supporting heating.",
      },
      thermostats: {
        title: "Using Thermostats – Why Small Adjustments Work Best",
        items: [
          "Many thermostats do not show temperature in degrees",
          "May have symbols or numbers without units instead of scale",
          "Always adjust temperature gradually",
          "Avoid extreme adjustments – turning too low cools cabin significantly",
          "Cabin will not warm up quickly afterwards",
        ],
        note: "Many thermostats have indicator lights (green or red) showing whether heating is active. If the light is off, the system is not heating at that moment. Small adjustments and patience give the best result.",
      },
      contact: {
        title: "When to Contact the Owner or Maintenance",
        items: [
          "Normal indoor temperature is approx. 20–22°C",
          "During extreme cold, higher temperatures may not be achievable",
          "If temperature stays clearly below 15–17°C, there may be a fault",
          "In such cases, contact the owner or maintenance service",
        ],
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Heating Systems", href: "/guide/heating-systems-in-levi" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "Back to travel guide",
    accommodationsHref: "/en/accommodations",
    ctaTitle: "Book a warm accommodation in Levi",
    ctaButton: "View accommodations",
  },
};

type SectionKey = 
  | "electricRadiators" 
  | "electricFloor" 
  | "waterFloor" 
  | "waterRadiators" 
  | "fireplaces" 
  | "heatPump" 
  | "thermostats" 
  | "contact";

const sectionIcons: Record<SectionKey, React.ReactNode> = {
  electricRadiators: <Thermometer className="w-6 h-6 text-primary" />,
  electricFloor: <Waves className="w-6 h-6 text-primary" />,
  waterFloor: <Waves className="w-6 h-6 text-primary" />,
  waterRadiators: <Thermometer className="w-6 h-6 text-primary" />,
  fireplaces: <Flame className="w-6 h-6 text-primary" />,
  heatPump: <AirVent className="w-6 h-6 text-primary" />,
  thermostats: <Gauge className="w-6 h-6 text-primary" />,
  contact: <Phone className="w-6 h-6 text-primary" />,
};

const HeatingSystemsInLevi = ({ lang = "fi" }: HeatingSystemsInLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/opas/lammitysjarjestelmat-levi",
    en: "https://leville.net/guide/heating-systems-in-levi",
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

  const sectionKeys: SectionKey[] = [
    "electricRadiators",
    "electricFloor",
    "waterFloor",
    "waterRadiators",
    "fireplaces",
    "heatPump",
    "thermostats",
    "contact",
  ];

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

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-10">
        <Breadcrumbs items={t.breadcrumbs} />

        <div className="mb-6">
          <Link 
            to={t.travelHubLink} 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.travelHubText}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-lg text-primary font-medium">{t.subtitle}</p>
          </header>

          <p className="mb-10 text-lg text-muted-foreground">{t.intro}</p>

          {sectionKeys.map((key) => {
            const section = t.sections[key];
            return (
              <section key={key} className="mb-10">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
                  {sectionIcons[key]}
                  {section.title}
                </h2>
                <Card>
                  <CardContent className="pt-5">
                    <ul className="space-y-2 mb-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {"note" in section && section.note && (
                      <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 mt-4">
                        {section.note}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </section>
            );
          })}

          {/* CTA */}
          <section className="text-center bg-card rounded-xl p-8 mt-12">
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

export default HeatingSystemsInLevi;
