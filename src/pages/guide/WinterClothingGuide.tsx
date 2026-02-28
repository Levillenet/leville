import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Layers, 
  Shirt, 
  Footprints, 
  Snowflake,
  Sun,
  Wind,
  Shield
} from "lucide-react";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WinterClothingGuideProps {
  lang?: Language;
}

const translations: Record<string, {
  meta: { title: string; description: string; canonical: string };
  title: string;
  subtitle: string;
  intro: string;
  sections: {
    temperatures: { title: string; intro: string; ranges: { range: string; temp: string; desc: string }[] };
    layering: { title: string; intro: string; layers: { name: string; icon: string; items: string[] }[] };
    accessories: { title: string; items: { name: string; tips: string[] }[] };
    activities: { title: string; items: { activity: string; tips: string }[] };
    gear: { title: string; intro: string; options: string[]; tip: string };
    faq: { title: string; items: { q: string; a: string }[] };
  };
  cta: { title: string; text: string; button: string };
  readNext: { title: string; links: ReadNextLink[] };
  relatedTitle: string;
  relatedLinks: { text: string; href: string }[];
  breadcrumbs: { label: string; href: string }[];
  accommodationsHref: string;
}> = {
  fi: {
    meta: {
      title: "Talvivarusteet Leville – Näin pukeutuu pakkasella | Leville.net",
      description: "Kattava opas talvipukeutumiseen Levillä. Kerrospukeutuminen, välttämättömät varusteet ja lämpötilavinkit -5°C:sta -35°C:seen. Suunnittele Lapin lomasi.",
      canonical: "https://leville.net/opas/talvivarusteet-leville"
    },
    title: "Talvivarusteet Leville",
    subtitle: "Näin pukeutuu Lapin pakkasilla – opas talvilomalle",
    intro: "Levin talvi tarjoaa unohtumattomia elämyksiä, mutta oikea pukeutuminen on avain mukavaan lomaan. Lämpötilat voivat vaihdella muutamasta pakkasasteesta jopa -35°C:seen. Tämä opas auttaa sinua pukeutumaan oikein joka tilanteessa.",
    sections: {
      temperatures: {
        title: "Levin talvilämpötilat",
        intro: "Levillä talvikausi kestää marraskuusta huhtikuuhun. Tyypilliset lämpötilat:",
        ranges: [
          { range: "Marras-joulukuu", temp: "-5°C – -20°C", desc: "Kaamos, vähäinen päivänvalo" },
          { range: "Tammi-helmikuu", temp: "-15°C – -35°C", desc: "Kylmimmät kuukaudet" },
          { range: "Maalis-huhtikuu", temp: "-10°C – +5°C", desc: "Kevätaurinko lämmittää" }
        ]
      },
      layering: {
        title: "Kerrospukeutumisen perusteet",
        intro: "Kerrospukeutuminen on tehokkain tapa pysyä lämpimänä. Kolme kerrosta pitää sinut kuivana ja lämpimänä:",
        layers: [
          {
            name: "Aluskerros (ihoa vasten)",
            icon: "shirt",
            items: [
              "Merinovilla on paras valinta – lämmittää kosteanakin",
              "Synteettinen tekniikkakerros toimii myös",
              "Vältä puuvillaa – se pysyy kosteana ja viilentää"
            ]
          },
          {
            name: "Välikerros (eristys)",
            icon: "layers",
            items: [
              "Fleece-takki tai -paita",
              "Untuvaliivi tai -takki kovempiin pakkasiin",
              "Villaneule perinteisempi vaihtoehto"
            ]
          },
          {
            name: "Ulkokerros (suoja)",
            icon: "shield",
            items: [
              "Tuulen- ja vedenpitävä kuoritakki",
              "Hengittävä materiaali estää hikoilun",
              "Lumipuvut ja lasketteluvaatteet toimivat hyvin"
            ]
          }
        ]
      },
      accessories: {
        title: "Välttämättömät asusteet",
        items: [
          {
            name: "Päähineet ja kasvosuojat",
            tips: [
              "Lämmin pipo, joka peittää korvat",
              "Tuubihuivi tai balaklava kasvoille",
              "Laskettelulasit suojaavat tuulelta ja auringolta"
            ]
          },
          {
            name: "Käsineet ja lapaset",
            tips: [
              "Lapaset lämpimämmät kuin sormikkaat",
              "Kaksikerroksinen järjestelmä: ohuet liner-hanskat + paksut lapaset",
              "Lämpöhanskat -25°C ja kylmempään"
            ]
          },
          {
            name: "Jalkineet",
            tips: [
              "Lämpöpohjallinen talvisaappaat (-30°C luokitus)",
              "Nastoitettavat jääkengät liukkaalle",
              "Villaiset tai lämpösukat",
              "Vältä tiukkoja kenkiä – ilma jalkojen ympärillä lämmittää"
            ]
          }
        ]
      },
      activities: {
        title: "Pukeutuminen aktiviteettien mukaan",
        items: [
          {
            activity: "Laskettelu ja lumilautailu",
            tips: "Toiminnalliset lasketteluvaatteet, kypärä, lasit, lämpimät käsineet. Välikerros ei saa olla liian paksu, koska hikoilu viilentää."
          },
          {
            activity: "Moottorikelkkasafari",
            tips: "Safari-operaattorit tarjoavat yleensä lämpimät haalarit ja kypärät. Ota silti mukaan omat villasukat ja lämpöalusasut."
          },
          {
            activity: "Revontulien katselu",
            tips: "Kun seisot paikallaan, tarvitset eniten lämpöä. Paksu untuvatakki, lämpöhousut, kemikaalilämmiittimet käsiin ja jalkoihin."
          },
          {
            activity: "Hiihto ja kävely",
            tips: "Kevyempi pukeutuminen, koska liikkuminen lämmittää. Hengittävät materiaalit välttämättömiä."
          }
        ]
      },
      gear: {
        title: "Mistä varusteet Levillä?",
        intro: "Kaikkea ei tarvitse tuoda mukana. Levillä on hyvät vuokrauspalvelut:",
        options: [
          "Lappset Rental – talvivaatteet ja varusteet",
          "Levi Ski Resort – lasketteluvälineet",
          "Safari-operaattorit – lämpövarusteet safarien yhteydessä"
        ],
        tip: "Vinkkimme: Vuokraa paikan päältä raskas varustus ja tuo kotoa laadukkaat aluskerrokset."
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Onko -30°C vaarallista?",
            a: "Ei, kunhan olet pukeutunut oikein. Tärkeintä on suojata iho, erityisesti kasvot, korvat ja sormet. Vältä pitkää paikallaan oloa ja kuuntele kehoasi."
          },
          {
            q: "Voiko Levillä vuokrata talvivaatteita?",
            a: "Kyllä! Levillä on useita vuokraamoja, jotka tarjoavat talvivaatteita aikuisille ja lapsille. Safari-operaattorit sisällyttävät yleensä lämpövarusteet hintaan."
          },
          {
            q: "Mitkä kengät toimivat jäällä?",
            a: "Nastoitetut tai liukuestepohjaiset talvisaappaat ovat välttämättömät. Voit ostaa myös irrotettavat liukuesteet tavallisiin kenkiin."
          },
          {
            q: "Tarvitsevatko lapset erikoisvarusteita?",
            a: "Lapset tarvitsevat samat kerrokset kuin aikuiset. Varmista erityisesti lämpimät lapaset, kunnon talvikengät ja kasvosuoja. Lapset kylmettyvät nopeammin kuin aikuiset."
          },
          {
            q: "Miten pidän puhelimen toiminnassa pakkasella?",
            a: "Pidä puhelin lähellä vartaloa, esim. sisätaskussa. Kylmässä akku tyhjenee nopeasti. Powerbank kannattaa myös pitää lämpimänä."
          }
        ]
      }
    },
    cta: {
      title: "Varaa majoituksesi Levillä",
      text: "Tutustu mukaviin majoitusvaihtoehtoihimme ja suunnittele unelmiesi talviloma Levillä.",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talvi Levillä", desc: "Mitä odottaa Levin talvelta", href: "/opas/talvi-levi" },
        { title: "Miten pääsee Leville", desc: "Lento-, juna- ja autoyhteydet", href: "/matka/miten-paasee-leville-helsingista" },
        { title: "Parhaat talviaktiviteetit", desc: "Kattava opas aktiviteetteihin", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Lapsiperheet Levillä", desc: "Vinkit perheen pukeutumiseen", href: "/opas/lapsiperheet-levilla" }
      ]
    },
    relatedTitle: "Hyödyllisiä oppaita",
    relatedLinks: [
      { text: "Talviaktiviteetit Levillä", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
      { text: "Moottorikelkkasafari-vinkit", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" }
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Talvivarusteet", href: "/opas/talvivarusteet-leville" }
    ],
    accommodationsHref: "/majoitukset"
  },
  en: {
    meta: {
      title: "How to Dress for Winter in Levi, Lapland | Leville.net",
      description: "Complete guide to dressing for Arctic winter in Levi. Learn layering, essential gear, and temperature tips from -5°C to -35°C. Plan your Lapland holiday.",
      canonical: "https://leville.net/guide/how-to-dress-for-winter-in-levi-lapland"
    },
    title: "How to Dress for Winter in Levi, Lapland",
    subtitle: "Your complete guide to staying warm in Arctic conditions",
    intro: "Levi's winter offers unforgettable experiences, but proper clothing is key to an enjoyable holiday. Temperatures can range from a few degrees below zero to -35°C. This guide will help you dress appropriately for every situation.",
    sections: {
      temperatures: {
        title: "Winter Temperatures in Levi",
        intro: "Levi's winter season runs from November to April. Typical temperatures:",
        ranges: [
          { range: "November–December", temp: "-5°C – -20°C", desc: "Polar night, limited daylight" },
          { range: "January–February", temp: "-15°C – -35°C", desc: "Coldest months" },
          { range: "March–April", temp: "-10°C – +5°C", desc: "Spring sun warms up" }
        ]
      },
      layering: {
        title: "The Layering System",
        intro: "Layering is the most effective way to stay warm. Three layers keep you dry and warm:",
        layers: [
          {
            name: "Base Layer (next to skin)",
            icon: "shirt",
            items: [
              "Merino wool is the best choice – warms even when wet",
              "Synthetic technical fabrics also work well",
              "Avoid cotton – it stays damp and cools you down"
            ]
          },
          {
            name: "Mid Layer (insulation)",
            icon: "layers",
            items: [
              "Fleece jacket or pullover",
              "Down vest or jacket for extreme cold",
              "Wool sweater as a traditional option"
            ]
          },
          {
            name: "Outer Layer (protection)",
            icon: "shield",
            items: [
              "Wind and waterproof shell jacket",
              "Breathable material prevents sweating",
              "Ski suits and ski wear work great"
            ]
          }
        ]
      },
      accessories: {
        title: "Essential Winter Accessories",
        items: [
          {
            name: "Headwear and Face Protection",
            tips: [
              "Warm beanie that covers your ears",
              "Neck gaiter or balaclava for face",
              "Ski goggles protect from wind and sun"
            ]
          },
          {
            name: "Gloves and Mittens",
            tips: [
              "Mittens are warmer than gloves",
              "Two-layer system: thin liner gloves + thick mittens",
              "Heated gloves for -25°C and colder"
            ]
          },
          {
            name: "Footwear",
            tips: [
              "Insulated winter boots (rated to -30°C)",
              "Studded or grip soles for ice",
              "Wool or thermal socks",
              "Avoid tight shoes – air around feet provides warmth"
            ]
          }
        ]
      },
      activities: {
        title: "Dressing for Different Activities",
        items: [
          {
            activity: "Skiing and Snowboarding",
            tips: "Technical ski wear, helmet, goggles, warm gloves. Mid layer shouldn't be too thick as sweating will cool you down."
          },
          {
            activity: "Snowmobile Safari",
            tips: "Safari operators usually provide warm overalls and helmets. Still bring your own wool socks and thermal base layers."
          },
          {
            activity: "Aurora Hunting",
            tips: "Standing still means you need maximum warmth. Thick down jacket, insulated pants, chemical hand and toe warmers."
          },
          {
            activity: "Cross-Country Skiing and Walking",
            tips: "Lighter clothing as movement generates heat. Breathable materials are essential."
          }
        ]
      },
      gear: {
        title: "Where to Get Gear in Levi",
        intro: "You don't need to bring everything. Levi has excellent rental services:",
        options: [
          "Lappset Rental – winter clothing and equipment",
          "Levi Ski Resort – skiing equipment",
          "Safari operators – thermal gear included with safaris"
        ],
        tip: "Our tip: Rent heavy gear locally and bring quality base layers from home."
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Is -30°C dangerous?",
            a: "Not if you're properly dressed. The key is to protect exposed skin, especially face, ears and fingers. Avoid standing still for too long and listen to your body."
          },
          {
            q: "Can I rent winter clothes in Levi?",
            a: "Yes! Levi has several rental shops offering winter clothing for adults and children. Safari operators usually include thermal gear in the price."
          },
          {
            q: "What shoes work on ice?",
            a: "Studded or non-slip winter boots are essential. You can also buy detachable ice grips for regular shoes."
          },
          {
            q: "Do children need special gear?",
            a: "Children need the same layers as adults. Pay special attention to warm mittens, proper winter boots and face protection. Children get cold faster than adults."
          },
          {
            q: "How do I keep my phone working in cold weather?",
            a: "Keep your phone close to your body, e.g., in an inner pocket. Batteries drain quickly in cold. A power bank should also be kept warm."
          }
        ]
      }
    },
    cta: {
      title: "Book Your Accommodation in Levi",
      text: "Explore our comfortable accommodation options and plan your dream winter holiday in Levi.",
      button: "View Accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter in Levi", desc: "What to expect from Levi winter", href: "/guide/winter-in-levi" },
        { title: "How to Get to Levi", desc: "Flights, trains and driving", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
        { title: "Top Winter Activities", desc: "Complete guide to activities", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Levi With Children", desc: "Tips for dressing kids warm", href: "/guide/levi-with-children" }
      ]
    },
    relatedTitle: "Useful Guides",
    relatedLinks: [
      { text: "Top Winter Activities in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
      { text: "Snowmobile Safari Tips", href: "/activities/snowmobile-safari-tips-levi" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Winter Clothing", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
    ],
    accommodationsHref: "/en/accommodations"
  },
  nl: {
    meta: {
      title: "Winterkleding voor Levi Lapland – Wat moet je meenemen? | Leville.net",
      description: "Praktische kledingstips van een local voor je wintervakantie in Levi, Fins Lapland. Het lagenprincipe, wat je ter plaatse kunt huren en wat je zelf mee moet nemen.",
      canonical: "https://leville.net/nl/gids/winterkleding-levi-lapland"
    },
    title: "Winterkleding voor Levi – Wat trek je aan bij -30°C?",
    subtitle: "Praktische kledingstips voor je wintervakantie in Fins Lapland",
    intro: "Veel Nederlandse reizigers komen via Voigt Travel of Nordic naar Levi en krijgen ter plaatse thermo-overalls. Maar wat trek je eronder aan? En wat heb je nodig voor vrije tijd buiten de georganiseerde activiteiten? Deze gids helpt je met het lagenprincipe en praktische tips.",
    sections: {
      temperatures: {
        title: "Wintertemperaturen in Levi",
        intro: "Het winterseizoen in Levi loopt van november tot april. Typische temperaturen:",
        ranges: [
          { range: "November–december", temp: "-5°C – -20°C", desc: "Poolnacht, weinig daglicht" },
          { range: "Januari–februari", temp: "-15°C – -35°C", desc: "Koudste maanden" },
          { range: "Maart–april", temp: "-10°C – +5°C", desc: "Lentezon verwarmt" }
        ]
      },
      layering: {
        title: "Het lagenprincipe",
        intro: "Lagen dragen is de beste manier om warm te blijven. Drie lagen houden je droog en warm:",
        layers: [
          {
            name: "Basislaag (op de huid)",
            icon: "shirt",
            items: [
              "Merinowol is de beste keuze – verwarmt zelfs als het vochtig is",
              "Synthetische thermokleding werkt ook goed",
              "Vermijd katoen – het blijft vochtig en koelt je af"
            ]
          },
          {
            name: "Tussenlaag (isolatie)",
            icon: "layers",
            items: [
              "Fleecevest of -trui",
              "Donsjas of -vest voor extreme kou",
              "Wollen trui als traditioneel alternatief"
            ]
          },
          {
            name: "Buitenlaag (bescherming)",
            icon: "shield",
            items: [
              "Wind- en waterdichte jas",
              "Ademend materiaal voorkomt zweten",
              "Skipakken en ski-kleding werken uitstekend"
            ]
          }
        ]
      },
      accessories: {
        title: "Onmisbare winteraccessoires",
        items: [
          {
            name: "Hoofdbedekking en gezichtsbescherming",
            tips: [
              "Warme muts die je oren bedekt",
              "Nekwarmer of buff voor je gezicht",
              "Skibril beschermt tegen wind en zon"
            ]
          },
          {
            name: "Wanten (niet handschoenen!)",
            tips: [
              "Wanten zijn warmer dan handschoenen",
              "Twee lagen: dunne binnenhandschoenen + dikke wanten",
              "Verwarmde wanten voor -25°C en kouder"
            ]
          },
          {
            name: "Schoeisel",
            tips: [
              "Waterdichte winterlaarzen (geschikt tot -30°C)",
              "TIP: In Levi kun je snowboots huren bij Levi Ski Resort verhuurwinkels",
              "Dikke wollen sokken",
              "Vermijd te strakke schoenen – lucht rond je voeten isoleert"
            ]
          }
        ]
      },
      activities: {
        title: "Kleding per activiteit",
        items: [
          {
            activity: "Skiën en snowboarden",
            tips: "Technische ski-kleding, helm, skibril, warme handschoenen. De tussenlaag mag niet te dik zijn, want zweten koelt je af."
          },
          {
            activity: "Sneeuwscootersafari",
            tips: "Safari-aanbieders leveren meestal warme overalls en helmen. Breng toch je eigen wollen sokken en thermokleding mee."
          },
          {
            activity: "Noorderlicht kijken",
            tips: "Als je stilstaat heb je maximale warmte nodig. Dikke donsjas, thermobroek, hand- en voetenwarmers."
          },
          {
            activity: "Langlaufen en wandelen",
            tips: "Lichtere kleding omdat beweging warmte genereert. Ademende materialen zijn essentieel."
          }
        ]
      },
      gear: {
        title: "Wat kun je huren in Levi?",
        intro: "Je hoeft niet alles mee te nemen. In Levi kun je veel huren:",
        options: [
          "Thermo-overalls bij verhuurwinkels bij de pistes",
          "Ski-uitrusting bij Levi Ski Resort (voor- en zuidpistes)",
          "Snowboots bij verhuurwinkels in het centrum",
          "Safari-aanbieders leveren warme kleding bij activiteiten"
        ],
        tip: "Onze tip: Huur zware uitrusting ter plaatse, maar breng zelf mee: thermokleding, fleece, je eigen winterjas, wollen sokken, muts en wanten."
      },
      faq: {
        title: "Veelgestelde vragen",
        items: [
          {
            q: "Moet ik winterkleding kopen voor Lapland?",
            a: "De meeste verhuurpakketten bevatten thermo-overalls en laarzen. Breng wel je eigen basislagen mee: thermokleding, fleece en wollen sokken."
          },
          {
            q: "Wat trek ik aan onder de thermo-overall?",
            a: "Thermokleding (merinowol of synthetisch) als basislaag en een fleecevest of -trui als tussenlaag. Geen jeans of katoen!"
          },
          {
            q: "Kan ik ski-uitrusting huren in Levi?",
            a: "Ja, er zijn meerdere verhuurwinkels bij de voorpistes en zuidpistes. Je kunt ook snowboots en winterkleding huren."
          },
          {
            q: "Hoe koud wordt het echt in Levi?",
            a: "December tot februari: typisch -10 tot -25°C, kan oplopen tot -35°C. Maar droge kou voelt warmer aan dan Nederlandse natte kou. Met goede kleding is het prima te doen!"
          },
          {
            q: "Speciale tips voor kinderen?",
            a: "Kinderen hebben een extra laag nodig. Zorg voor goede gezichtsbescherming bij wind, warme wanten en waterdichte laarzen. Kinderen koelen sneller af dan volwassenen."
          }
        ]
      }
    },
    cta: {
      title: "Boek je accommodatie in Levi",
      text: "Bekijk onze comfortabele accommodaties en plan je droomvakantie in Fins Lapland.",
      button: "Bekijk accommodaties"
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/nl/gids/skieen-in-levi" },
        { title: "Activiteiten in Levi", desc: "Alle activiteiten in Levi", href: "/nl/gids/activiteiten-in-levi" },
        { title: "Reisgids Levi", desc: "Praktische tips voor je reis", href: "/nl/gids/reisgids-levi" },
        { title: "Accommodaties", desc: "Boek je verblijf in Levi", href: "/nl/accommodaties" }
      ]
    },
    relatedTitle: "Handige gidsen",
    relatedLinks: [
      { text: "Beste winteractiviteiten in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
      { text: "Sneeuwscootersafari-tips", href: "/activities/snowmobile-safari-tips-levi" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/nl" },
      { label: "Reisgids", href: "/nl/gids/reisgids-levi" },
      { label: "Winterkleding", href: "/nl/gids/winterkleding-levi-lapland" }
    ],
    accommodationsHref: "/nl/accommodaties"
  }
};

const WinterClothingGuide = ({ lang = "fi" }: WinterClothingGuideProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;
  
  const hreflangUrls = {
    fi: "https://leville.net/opas/talvivarusteet-leville",
    en: "https://leville.net/guide/how-to-dress-for-winter-in-levi-lapland",
    nl: "https://leville.net/nl/gids/winterkleding-levi-lapland"
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shirt": return <Shirt className="w-6 h-6" />;
      case "layers": return <Layers className="w-6 h-6" />;
      case "shield": return <Shield className="w-6 h-6" />;
      default: return <Snowflake className="w-6 h-6" />;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.sections.faq.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t.title,
    "description": t.meta.description,
    "step": t.sections.layering.layers.map((layer, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": layer.name,
      "text": layer.items.join(". ")
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://leville.net${item.href}`
    }))
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : "en_GB"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />

      <HreflangTags 
        currentPath={location.pathname}
        customUrls={hreflangUrls}
      />

      <Header />
      <SubpageBackground />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={t.breadcrumbs} />
        
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </header>

          {/* Introduction */}
          <p className="text-lg text-foreground/90 mb-10 leading-relaxed">
            {t.intro}
          </p>

          {/* Temperature Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              {t.sections.temperatures.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.temperatures.intro}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {t.sections.temperatures.ranges.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <p className="font-semibold text-primary">{item.range}</p>
                    <p className="text-2xl font-bold my-2">{item.temp}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Layering Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              {t.sections.layering.title}
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.layering.intro}</p>
            <div className="space-y-6">
              {t.sections.layering.layers.map((layer, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {getIcon(layer.icon)}
                      </div>
                      <h3 className="text-lg font-semibold">{layer.name}</h3>
                    </div>
                    <ul className="space-y-2">
                      {layer.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Accessories Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Wind className="w-6 h-6 text-primary" />
              {t.sections.accessories.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.sections.accessories.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">{item.name}</h3>
                    <ul className="space-y-2 text-sm">
                      {item.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-foreground/80">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.activities.title}
            </h2>
            <div className="space-y-4">
              {t.sections.activities.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{item.activity}</h3>
                    <p className="text-foreground/80">{item.tips}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Gear Rental Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sun className="w-6 h-6 text-primary" />
              {t.sections.gear.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.gear.intro}</p>
            <ul className="space-y-2 mb-4">
              {t.sections.gear.options.map((option, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{option}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm bg-primary/10 p-4 rounded-lg text-foreground/90">
              💡 {t.sections.gear.tip}
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t.sections.faq.title}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

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
                <Link
                  key={index}
                  to={link.href}
                  className="text-primary hover:underline"
                >
                  {link.text} →
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default WinterClothingGuide;
