import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Flame, 
  Waves, 
  AirVent, 
  Phone,
  ArrowLeft,
  Info
} from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";

// Import images
import electricRadiatorImg from "@/assets/heating/electric-radiator.jpg";
import waterRadiatorImg from "@/assets/heating/water-radiator.jpg";
import thermostatWaterFloorImg from "@/assets/heating/thermostat-water-floor.jpg";
import thermostatElectricFloorImg from "@/assets/heating/thermostat-electric-floor.jpg";
import openFireplaceImg from "@/assets/heating/open-fireplace.jpg";
import heatStoringFireplaceImg from "@/assets/heating/heat-storing-fireplace.jpg";
import heatPumpImg from "@/assets/heating/heat-pump.jpg";

interface HeatingSystemsInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Mökin lämmitys Levillä – Lämmitysjärjestelmät mökeissä | Leville.net",
      description:
        "Levin mökkien lämmitysjärjestelmät: sähköpatterit, lattialämmitys, vesikiertoinen lämmitys, ilmalämpöpumput ja takat. Miten mökin lämmitys toimii Lapissa.",
      canonical: "https://leville.net/opas/lammitysjarjestelmat-levi",
    },
    title: "Mökin lämmitys Levillä",
    subtitle: "Lämmitysjärjestelmät mökeissä ja huoneistoissa",
    intro: {
      title: "Yleistä mökkien lämmityksestä Levillä",
      text: "Levin mökeissä ja huoneistoissa on useita erilaisia lämmitysjärjestelmiä, joilla kaikilla on omat ominaisuutensa. Normaali sisälämpötila on tyypillisesti noin 20–22 astetta. Kovilla pakkasilla vanhemmissa kohteissa maksimilämpötila voi jäädä noin 20 asteeseen, mikä on arktisissa olosuhteissa täysin normaalia. Tällä sivulla esittelemme yleisimmät lämmitystavat, jotta voit tunnistaa oman majoituksesi järjestelmän ja ymmärtää sen toimintaperiaatteet.",
    },
    sections: {
      electricRadiators: {
        title: "Suora sähkölämmitys pattereilla",
        description: "Yleisin lämmitysmuoto Levin mökeissä ja huoneistoissa.",
        items: [
          "Seinille sijoitetut sähköpatterit, joissa on oma termostaatti",
          "Reagoi nopeasti lämpötilan muutoksiin – lämpö tuntuu minuuteissa",
          "Tehokas ja luotettava järjestelmä",
          "Termostaatti on yleensä patterin kyljessä tai seinällä",
        ],
        note: "Vanhemmissa hirsimökeissä eristyksen puutteet ja hirsien eläminen voivat aiheuttaa vetoa, erityisesti nurkissa. Tämä on normaalia ja johtuu rakennuksen luonteesta. Kovalla pakkasella sisälämpötila saattaa jäädä noin 20 asteeseen, vaikka lämmitys toimii täysillä.",
        imageAlt: "Tyypillinen sähköpatteri termostaatilla",
      },
      electricFloor: {
        title: "Sähköinen lattialämmitys",
        description: "Miellyttävä ja tasainen lämpö suoraan lattiasta.",
        items: [
          "Lattian alla oleva sähkölämmitysverkko tuo tasaista lämpöä",
          "Erityisen mukava kylpyhuoneissa ja eteisessä",
          "Toimintavarma järjestelmä vähäisellä huoltotarpeella",
          "Hitaampi reagoimaan kuin sähköpatterit – muutokset näkyvät tuntien kuluessa",
        ],
        note: "Säätö tapahtuu seinässä olevasta termostaatista. Termostaatissa on usein numeroasteikko (esim. 1–6), joka ei vastaa suoraan lämpötila-asteita. Säädä maltillisesti ja odota tuloksia.",
        imageAlt: "Sähköisen lattialämmityksen termostaatti",
      },
      waterFloor: {
        title: "Vesikiertoinen lattialämmitys",
        description: "Uudemmissa mökeissä yleinen, erittäin energiatehokas järjestelmä.",
        items: [
          "Lämpimän veden kierrättämä lattialämmitys tuottaa tasaisen ja miellyttävän lämmön",
          "Lämpötila säätyy usein automaattisesti ulkolämpötilan mukaan",
          "Erittäin energiatehokas ja ympäristöystävällinen",
          "Lämpö jakautuu tasaisesti koko lattiapinta-alalle",
        ],
        note: "Tämä järjestelmä reagoi hyvin hitaasti. Lämpötilan nostaminen tai laskeminen voi kestää 1–2 vuorokautta. Esimerkiksi jos edellinen asiakas on pitänyt 20 astetta ja sinä haluat 23 astetta, lämpötilan nousu vie aikaa. Järjestelmä on suunniteltu tasaiseen lämpötilaan, ei nopeisiin muutoksiin.",
        imageAlt: "Vesikiertoisen lattialämmityksen termostaatti",
      },
      waterRadiators: {
        title: "Vesikiertoiset patterit",
        description: "Perinteinen ja tehokas lämmitystapa.",
        items: [
          "Patterit, joissa kiertää lämmitysjärjestelmän kuuma vesi",
          "Tunnistettavissa tasaisesta pinnoitteesta ilman ilma-aukkoja",
          "Patterikohtainen termostaatti patterin kyljessä",
          "Reagoi melko nopeasti lämpötilan muutoksiin",
          "Usein käytetään vesikiertoisen lattialämmityksen rinnalla",
        ],
        note: "Vesikiertoisen patterin termostaatti on yleensä valkoinen nuppi patterin kyljessä. Numeroasteikko (esim. 1–5) säätelee läpikulkevan veden määrää, ei suoraan lämpötilaa.",
        imageAlt: "Vesikiertoinen patteri",
      },
      fireplaces: {
        title: "Takat mökeissä",
        description: "Tunnelmallinen lisälämmitys – kaksi eri tyyppiä.",
        items: [
          "Avotakka (koristetakka): Liekki menee suoraan savupiippuun. Matala lämmitysteho – voi jopa viilentää tilaa vetämällä lämmintä ilmaa ulos.",
          "Varaava takka: Lämpö varastoituu takan rakenteisiin ja vapautuu hitaasti huoneeseen. Erittäin tehokas lämmityskeino.",
        ],
        note: "Lue aina mökkikohtaiset ohjeet ennen takan käyttöä. Varaavan takan oikea käyttö voi lämmittää mökin useiksi tunneiksi yhden lämmityksen jälkeen.",
        openFireplaceImageAlt: "Avotakka mökkissä – liekki menee suoraan piippuun",
        heatStoringFireplaceImageAlt: "Varaavia takkoja – lämpö varastoituu rakenteisiin",
      },
      heatPump: {
        title: "Ilmalämpöpumppu mökissä",
        description: "Edullinen ja ekologinen lämmitys- ja viilennysjärjestelmä.",
        items: [
          "Näyttää ilmastointilaitteelta seinällä – mutta se ON lämmityslaite!",
          "Monet luulevat virheellisesti, että ilmalämpöpumppu on vain viilennyslaite, mutta se on ensisijaisesti tehokas lämmityslaite",
          "Ohjataan kaukosäätimellä – lämpötila, puhallusnopeus ja suunta säädettävissä",
          "Nostaa tai laskee lämpötilaa nopeasti",
          "Erittäin energiatehokas normaaleissa olosuhteissa",
        ],
        note: "TÄRKEÄÄ: Ilmalämpöpumppua EI SAA sammuttaa pakkasella – se voi rikkoutua! Teho heikkenee merkittävästi noin –20 asteen pakkasessa, mutta laite pitää silti jättää päälle. Käytä sitä muun lämmityksen tukena kovilla pakkasilla. Kaukosäädin on yleensä pöydällä tai seinätelineessä.",
        imageAlt: "Ilmalämpöpumppu seinällä – tehokas lämmityslaite",
      },
      coldCabin: {
        title: "Mitä tehdä, jos mökki tuntuu kylmältä?",
        description: "Käytännön ohjeita epämukavan tilanteen varalle.",
        items: [
          "Tarkista, että kaikki termostaatit ovat päällä ja säädetty riittävän korkealle",
          "Anna lämmitysjärjestelmälle aikaa reagoida (erityisesti lattialämmitys)",
          "Käytä ilmalämpöpumppua tukena, jos sellainen on",
          "Kovilla pakkasilla noin 20 astetta voi olla normaali maksimilämpötila",
        ],
        note: "Jos lämpötila on selvästi alle 15–17 astetta, kyseessä voi olla vikatilanne. Ota tällöin yhteyttä majoituksen omistajaan tai huoltoyhtiöön.",
      },
    },
    summary: {
      title: "Yhteenveto",
      text: "Levin mökeissä lämmitys on suunniteltu tasaiseen ja miellyttävään asumiseen. Jokainen järjestelmä toimii omalla tavallaan, ja reagointinopeus vaihtelee merkittävästi. Luonnonolosuhteet ja rakennuksen ikä vaikuttavat aina lopputulokseen. Pienellä kärsivällisyydellä ja oikeilla odotuksilla talviloma Levillä on lämmin ja mukava kokemus.",
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
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Majoitukset", desc: "Varaa lämmin mökki tai huoneisto", href: "/majoitukset" },
        { title: "Sauna Levillä", desc: "Saunan käyttöohjeet ja vinkit", href: "/opas/sauna-levilla" },
        { title: "Talvivarusteet", desc: "Pukeutuminen myös sisätiloissa", href: "/opas/talvivarusteet-leville" },
        { title: "Talvi Levillä", desc: "Mitä odottaa pakkaskaudelta", href: "/opas/talvi-levi" },
      ],
    },
  },

  en: {
    meta: {
      title: "Cabin Heating in Levi – Heating Systems in Finnish Cabins | Leville.net",
      description:
        "Heating systems in Levi cabins and apartments: electric radiators, underfloor heating, water-based heating, heat pumps and fireplaces. How cabin heating works in Lapland.",
      canonical: "https://leville.net/guide/heating-systems-in-levi",
    },
    title: "Cabin Heating in Levi",
    subtitle: "Heating systems in cabins and apartments",
    intro: {
      title: "General Information About Cabin Heating in Levi",
      text: "Cabins and apartments in Levi use various heating systems, each with its own characteristics. Normal indoor temperature is typically around 20–22°C. During extreme cold, older properties may only reach around 20°C, which is completely normal in Arctic conditions. This page introduces the most common heating methods so you can identify your accommodation's system and understand how it works.",
    },
    sections: {
      electricRadiators: {
        title: "Direct Electric Heating with Radiators",
        description: "The most common heating type in Levi cabins and apartments.",
        items: [
          "Wall-mounted electric radiators with built-in thermostats",
          "Reacts quickly to temperature changes – heat felt within minutes",
          "Efficient and reliable system",
          "Thermostat usually on the radiator side or wall-mounted",
        ],
        note: "In older log cabins, insulation gaps and natural log movement may cause drafts, especially in corners. This is normal and due to the building's nature. During severe cold, indoor temperature may stay around 20°C even at maximum heating.",
        imageAlt: "Typical electric radiator with thermostat",
      },
      electricFloor: {
        title: "Electric Underfloor Heating",
        description: "Pleasant and even heat directly from the floor.",
        items: [
          "Electric heating cables under the floor provide even warmth",
          "Especially comfortable in bathrooms and entrance areas",
          "Reliable system with minimal maintenance needs",
          "Slower to react than radiators – changes take hours to feel",
        ],
        note: "Adjustment is done via wall thermostat. The thermostat often has a numbered scale (e.g., 1–6) that doesn't directly correspond to temperature degrees. Adjust moderately and wait for results.",
        imageAlt: "Electric underfloor heating thermostat",
      },
      waterFloor: {
        title: "Water-Based Underfloor Heating",
        description: "Common in newer cabins, highly energy-efficient system.",
        items: [
          "Hot water circulation provides even and pleasant warmth",
          "Temperature often adjusts automatically based on outdoor temperature",
          "Very energy-efficient and environmentally friendly",
          "Heat distributes evenly across the entire floor area",
        ],
        note: "This system reacts very slowly. Raising or lowering temperature can take 1–2 days. For example, if the previous guest kept it at 20°C and you want 23°C, warming up takes time. The system is designed for stable temperature, not quick changes.",
        imageAlt: "Water-based underfloor heating thermostat",
      },
      waterRadiators: {
        title: "Water-Filled Radiators",
        description: "Traditional and effective heating method.",
        items: [
          "Radiators circulating hot water from the heating system",
          "Recognizable by smooth surface without air vents",
          "Individual thermostat on each radiator",
          "Responds fairly quickly to temperature changes",
          "Often used alongside water-based underfloor heating",
        ],
        note: "Water radiator thermostat is usually a white knob on the radiator side. The numbered scale (e.g., 1–5) regulates water flow, not temperature directly.",
        imageAlt: "Water-filled radiator",
      },
      fireplaces: {
        title: "Fireplaces in Cabins",
        description: "Atmospheric supplementary heating – two different types.",
        items: [
          "Open fireplace (decorative): Flames go directly to chimney. Low heating efficiency – may even cool the space by drawing warm air out.",
          "Heat-storing fireplace: Heat is stored in the fireplace structure and released slowly. Very effective heating method.",
        ],
        note: "Always read cabin-specific instructions before using a fireplace. Proper use of a heat-storing fireplace can warm the cabin for many hours after a single heating.",
        openFireplaceImageAlt: "Open fireplace in cabin – flames go directly to chimney",
        heatStoringFireplaceImageAlt: "Heat-storing fireplaces – heat is stored in the structure",
      },
      heatPump: {
        title: "Air-Source Heat Pump in Cabin",
        description: "Affordable and ecological heating and cooling system.",
        items: [
          "Looks like an air conditioning unit on the wall – but it IS a heating device!",
          "Many people mistakenly think heat pumps are only for cooling, but they are primarily efficient heating devices",
          "Controlled by remote – temperature, fan speed and direction adjustable",
          "Raises or lowers temperature quickly",
          "Very energy-efficient in normal conditions",
        ],
        note: "IMPORTANT: The heat pump must NEVER be turned off in freezing temperatures – it can break! Efficiency drops significantly below approximately –20°C, but the device must still be left on. Use it to support other heating in very cold weather. The remote is usually on a table or wall holder.",
        imageAlt: "Air-source heat pump on wall – efficient heating device",
      },
      coldCabin: {
        title: "What to Do If the Cabin Feels Cold?",
        description: "Practical advice for uncomfortable situations.",
        items: [
          "Check that all thermostats are on and set high enough",
          "Give the heating system time to react (especially floor heating)",
          "Use heat pump for support if available",
          "During extreme cold, around 20°C may be the normal maximum temperature",
        ],
        note: "If temperature stays clearly below 15–17°C, there may be a malfunction. In such cases, contact the accommodation owner or maintenance service.",
      },
    },
    summary: {
      title: "Summary",
      text: "Heating in Levi cabins is designed for even and comfortable living. Each system works in its own way, and response times vary significantly. Natural conditions and building age always affect the outcome. With a little patience and the right expectations, your winter holiday in Levi will be a warm and comfortable experience.",
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
    readNext: {
      title: "Read Next",
      links: [
        { title: "Accommodations", desc: "Book a warm cabin or apartment", href: "/en/accommodations" },
        { title: "Finnish Sauna", desc: "Sauna instructions and tips", href: "/guide/finnish-sauna-in-levi" },
        { title: "Winter Clothing", desc: "Dressing for indoors and out", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Winter in Levi", desc: "What to expect in the cold season", href: "/guide/winter-in-levi" },
      ],
    },
  },
};

type SectionKey = 
  | "electricRadiators" 
  | "electricFloor" 
  | "waterFloor" 
  | "waterRadiators" 
  | "fireplaces" 
  | "heatPump" 
  | "coldCabin";

interface SectionImages {
  electricRadiators: string;
  electricFloor: string;
  waterFloor: string;
  waterRadiators: string;
  heatPump: string;
}

const sectionImages: SectionImages = {
  electricRadiators: electricRadiatorImg,
  electricFloor: thermostatElectricFloorImg,
  waterFloor: thermostatWaterFloorImg,
  waterRadiators: waterRadiatorImg,
  heatPump: heatPumpImg,
};

const sectionIcons: Record<SectionKey, React.ReactNode> = {
  electricRadiators: <Thermometer className="w-6 h-6 text-primary" />,
  electricFloor: <Waves className="w-6 h-6 text-primary" />,
  waterFloor: <Waves className="w-6 h-6 text-primary" />,
  waterRadiators: <Thermometer className="w-6 h-6 text-primary" />,
  fireplaces: <Flame className="w-6 h-6 text-primary" />,
  heatPump: <AirVent className="w-6 h-6 text-primary" />,
  coldCabin: <Phone className="w-6 h-6 text-primary" />,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.meta.description,
    "author": {
      "@type": "Organization",
      "name": "Leville.net"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Leville.net",
      "logo": {
        "@type": "ImageObject",
        "url": "https://leville.net/leville-logo.png"
      }
    },
    "mainEntityOfPage": t.meta.canonical
  };

  const sectionKeys: SectionKey[] = [
    "electricRadiators",
    "electricFloor",
    "waterFloor",
    "waterRadiators",
    "fireplaces",
    "heatPump",
    "coldCabin",
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
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
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

          {/* Intro Section */}
          <section className="mb-12">
            <Card className="bg-card/80">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold mb-3">{t.intro.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{t.intro.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Heating System Sections */}
          {sectionKeys.map((key) => {
            const section = t.sections[key];
            const hasImage = key in sectionImages;
            const image = hasImage ? sectionImages[key as keyof SectionImages] : null;
            const imageAlt = "imageAlt" in section ? section.imageAlt : "";
            const isFireplaces = key === "fireplaces";
            const openFireplaceAlt = "openFireplaceImageAlt" in section ? section.openFireplaceImageAlt : "";
            const heatStoringAlt = "heatStoringFireplaceImageAlt" in section ? section.heatStoringFireplaceImageAlt : "";
            
            return (
              <section key={key} className="mb-10">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                  {sectionIcons[key]}
                  {section.title}
                </h2>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                
                <Card>
                  <CardContent className="pt-5">
                    {/* Fireplace section with two images */}
                    {isFireplaces && (
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <img 
                            src={openFireplaceImg} 
                            alt={openFireplaceAlt}
                            className="w-full rounded-lg shadow-md"
                            loading="lazy"
                          />
                          <p className="text-xs text-muted-foreground text-center mt-2">{openFireplaceAlt}</p>
                        </div>
                        <div>
                          <img 
                            src={heatStoringFireplaceImg} 
                            alt={heatStoringAlt}
                            className="w-full rounded-lg shadow-md bg-white"
                            loading="lazy"
                          />
                          <p className="text-xs text-muted-foreground text-center mt-2">{heatStoringAlt}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Single image for other sections */}
                    {image && !isFireplaces && (
                      <div className="mb-6">
                        <img 
                          src={image} 
                          alt={imageAlt}
                          className="w-full max-w-md mx-auto rounded-lg shadow-md bg-white"
                          loading="lazy"
                        />
                        <p className="text-xs text-muted-foreground text-center mt-2">{imageAlt}</p>
                      </div>
                    )}
                    
                    <ul className="space-y-3 mb-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary mt-1 font-bold">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {section.note && (
                      <div className="bg-muted/50 rounded-lg p-4 mt-4 border-l-4 border-primary/30">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.note}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            );
          })}

          {/* Summary Section */}
          <section className="mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-3">{t.summary.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.summary.text}</p>
              </CardContent>
            </Card>
          </section>

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

export default HeatingSystemsInLevi;
