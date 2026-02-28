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
  Plane, 
  Train, 
  Car, 
  Bus,
  MapPin,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ReadNextSection from "@/components/guide/ReadNextSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HowToGetToLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Miten pääsee Leville – Lennot, junat ja autot | Leville.net",
      description: "Suunnittele matkasi Leville. Vertaa lentoja Kittilään, junayhteydet Kolariin ja ajoreitit Helsingistä. Kattava matkustusopas Lappiin.",
      canonical: "https://leville.net/matka/miten-paasee-leville-helsingista"
    },
    title: "Miten pääsee Leville",
    subtitle: "Kattava opas matkustamiseen Helsingistä ja ulkomailta",
    intro: "Levi sijaitsee Kittilän kunnassa, Lapin sydämessä. Vaikka etäisyydet ovat pitkät, Leville pääsee mukavasti lentäen, junalla tai autolla. Tämä opas auttaa sinua löytämään parhaan tavan matkustaa.",
    sections: {
      flying: {
        title: "Lentäen Leville – Kittilän lentoasema (KTT)",
        intro: "Lentäminen on nopein tapa päästä Leville. Kittilän lentoasema sijaitsee vain 15 minuutin ajomatkan päässä Levin keskustasta.",
        domestic: {
          title: "Lennot Helsingistä",
          items: [
            "Finnair lentää Helsinki–Kittilä päivittäin",
            "Lentoaika noin 1 tunti 30 minuuttia",
            "Sesonkiaikana jopa 3–4 vuoroa päivässä",
            "Hinnat alkaen 100€ (varaa ajoissa!)"
          ]
        },
        international: {
          title: "Kansainväliset yhteydet",
          items: [
            "Suorat lennot Lontoosta (talvisesonki)",
            "Yhteydet Keski-Euroopasta Helsingin kautta",
            "Charter-lennot Saksasta, Britanniasta ja Hollannista sesonkiaikoina"
          ]
        },
        transfer: {
          title: "Lentokenttäkuljetus Leville",
          text: "Kittilän lentoasemalta Levin keskustaan on vain 15 km. Kuljetusvaihtoehdot:",
          options: [
            "Lentokenttäbussi – noin 10€/suunta, odottaa jokaista lentoa",
            "Taksi – noin 40–50€ koko auto",
            "Vuokra-auto – suositeltava, jos haluat liikkua vapaasti"
          ]
        }
      },
      train: {
        title: "Junalla + bussilla – reitti Kolarin kautta",
        intro: "Yöjuna on elämys itsessään ja ekologinen valinta. VR:n yöjuna kulkee Helsingistä Kolariin.",
        route: {
          title: "Reitti",
          items: [
            "Yöjuna Helsinki → Kolari (lähtö illalla, perillä aamulla)",
            "Matka-aika noin 12–14 tuntia",
            "Makuuvaunu- ja autovaunu-vaihtoehdot",
            "Jatkoyhteys bussilla Kolari → Levi (noin 40 min)"
          ]
        },
        tips: {
          title: "Vinkkejä junamatkaan",
          items: [
            "Varaa makuuvaunu ajoissa – ne täyttyvät nopeasti",
            "Autovaunulla voit tuoda oman auton",
            "Bussiyhteys odottaa junaa Kolarissa",
            "Hinnat alkaen 80€ istumapaikka, 150€+ makuuvaunu"
          ]
        }
      },
      driving: {
        title: "Autolla Leville",
        intro: "Oma auto tarjoaa vapautta liikkumiseen Lapissa. Matka on pitkä mutta maisemallisesti upea.",
        routes: [
          {
            from: "Helsingistä",
            distance: "noin 1 100 km",
            time: "12–14 tuntia",
            desc: "Reitti kulkee E75-tietä pitkin Oulun kautta. Suosittelemme yöpymistä matkalla, esim. Oulussa."
          },
          {
            from: "Rovaniemeltä",
            distance: "noin 170 km",
            time: "2 tuntia",
            desc: "Helppo ajomatka hyvää tietä pitkin. Matkalla voi pysähtyä Napapiirillä."
          },
          {
            from: "Oulusta",
            distance: "noin 380 km",
            time: "4,5 tuntia",
            desc: "Suosittu välietappi yöjunalta tai etelästä tultaessa."
          }
        ],
        winterTips: {
          title: "Talviajaminen",
          items: [
            "Talvirenkaat pakollisia 1.12.–31.3.",
            "Nastarenkaat suositeltavia Lapissa",
            "Varaudu lumisateisiin ja pakkaseen (-30°C mahdollinen)",
            "Täytä tankki ajoissa – huoltoasemien välit voivat olla pitkiä",
            "Pidä mukana lämpimiä vaatteita varmuuden vuoksi"
          ]
        }
      },
      gettingAround: {
        title: "Liikkuminen Levillä",
        options: [
          {
            name: "Skibussi",
            desc: "Ilmainen skibussi kiertää Levin keskustan, hotellit ja rinteet. Kulkee noin 15 min välein sesonkiaikana."
          },
          {
            name: "Taksi",
            desc: "Takseja löytyy Levin keskustasta. Tilaa etukäteen sesonkiaikoina."
          },
          {
            name: "Vuokra-auto",
            desc: "Autonvuokraus Kittilän lentoasemalla (Avis, Hertz, Europcar). Suositeltava, jos haluat tutustua ympäristöön."
          }
        ]
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Kuinka kaukana Levi on Helsingistä?",
            a: "Levi sijaitsee noin 1 100 km Helsingistä. Lentäen matka kestää noin 1,5 tuntia, junalla 12–14 tuntia ja autolla 12–14 tuntia."
          },
          {
            q: "Onko Kittilän lentoasema lähellä Leviä?",
            a: "Kyllä! Kittilän lentoasema (KTT) on vain 15 km Levin keskustasta, noin 15 minuutin ajomatka. Lentokenttäbussit odottavat jokaista lentoa."
          },
          {
            q: "Voinko ajaa ilman talvirenkaita?",
            a: "Et. Talvirenkaat ovat pakollisia 1.12.–31.3. Lapissa suosittelemme nastarenkaita, sillä tiet voivat olla jäisiä ja lumisia."
          },
          {
            q: "Onko Rovaniemeltä bussiyhteyttä Leville?",
            a: "Kyllä. Esim. Eskelisen Lapin Linjat ja Matkahuollon bussit kulkevat Rovaniemeltä Leville. Matka kestää noin 2,5 tuntia."
          }
        ]
      }
    },
    cta: {
      title: "Varaa majoituksesi Levillä",
      text: "Nyt kun tiedät miten pääset Leville, varaa mukava majoitus ja suunnittele unelmiesi Lapin loma!",
      button: "Katso majoitukset"
    },
    relatedTitle: "Hyödyllistä luettavaa",
    relatedLinks: [
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Parhaat talviaktiviteetit", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" }
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista" }
    ],
    accommodationsHref: "/majoitukset",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Liikkuminen Levillä", desc: "Skibussit, taksit ja vuokra-autot", href: "/opas/liikkuminen-levilla" },
        { title: "Levi ilman autoa", desc: "Vinkit autoiluttomaan lomaan", href: "/opas/levi-ilman-autoa" },
        { title: "Talvivarusteet", desc: "Mitä pakata mukaan Leville", href: "/opas/talvivarusteet-leville" },
        { title: "Majoitukset", desc: "Varaa majoitus Leviltä", href: "/majoitukset" },
      ],
    },
  },
  en: {
    meta: {
      title: "How to Get to Levi from Helsinki & Abroad | Travel Guide | Leville.net",
      description: "Plan your journey to Levi, Lapland. Compare flights to Kittilä, trains to Kolari, and driving routes from Helsinki. Complete travel planning guide.",
      canonical: "https://leville.net/travel/how-to-get-to-levi-from-helsinki-and-abroad"
    },
    title: "How to Get to Levi from Helsinki and Abroad",
    subtitle: "Complete travel guide for planning your journey to Lapland",
    intro: "Levi is located in Kittilä municipality, in the heart of Finnish Lapland. While distances are long, Levi is easily accessible by plane, train or car. This guide helps you find the best way to travel.",
    sections: {
      flying: {
        title: "Flying to Levi – Kittilä Airport (KTT)",
        intro: "Flying is the fastest way to reach Levi. Kittilä Airport is just a 15-minute drive from Levi center.",
        domestic: {
          title: "Flights from Helsinki",
          items: [
            "Finnair flies Helsinki–Kittilä daily",
            "Flight time approximately 1 hour 30 minutes",
            "During peak season, up to 3–4 flights per day",
            "Prices from €100 (book early!)"
          ]
        },
        international: {
          title: "International Connections",
          items: [
            "Direct flights from London (winter season)",
            "Connections from Central Europe via Helsinki",
            "Charter flights from Germany, UK and Netherlands during peak seasons"
          ]
        },
        transfer: {
          title: "Airport Transfer to Levi",
          text: "From Kittilä Airport to Levi center is only 15 km. Transfer options:",
          options: [
            "Airport bus – approximately €10/way, waits for every flight",
            "Taxi – approximately €40–50 for the whole car",
            "Rental car – recommended if you want freedom to explore"
          ]
        }
      },
      train: {
        title: "Train + Bus – Route via Kolari",
        intro: "The night train is an experience in itself and an ecological choice. VR's night train runs from Helsinki to Kolari.",
        route: {
          title: "Route",
          items: [
            "Night train Helsinki → Kolari (departs evening, arrives morning)",
            "Journey time approximately 12–14 hours",
            "Sleeper cabin and car carriage options available",
            "Bus connection Kolari → Levi (approximately 40 min)"
          ]
        },
        tips: {
          title: "Tips for Train Travel",
          items: [
            "Book sleeper cabins early – they fill up quickly",
            "With the car carriage, you can bring your own car",
            "Bus connection waits for the train in Kolari",
            "Prices from €80 seat, €150+ sleeper cabin"
          ]
        }
      },
      driving: {
        title: "Driving to Levi",
        intro: "Your own car offers freedom to explore Lapland. The journey is long but scenically beautiful.",
        routes: [
          {
            from: "From Helsinki",
            distance: "approximately 1,100 km",
            time: "12–14 hours",
            desc: "Route follows E75 road via Oulu. We recommend an overnight stop, e.g., in Oulu."
          },
          {
            from: "From Rovaniemi",
            distance: "approximately 170 km",
            time: "2 hours",
            desc: "Easy drive on good roads. You can stop at the Arctic Circle on the way."
          },
          {
            from: "From Oulu",
            distance: "approximately 380 km",
            time: "4.5 hours",
            desc: "Popular stopover point when arriving by night train or from the south."
          }
        ],
        winterTips: {
          title: "Winter Driving Tips",
          items: [
            "Winter tires mandatory December 1 – March 31",
            "Studded tires recommended in Lapland",
            "Be prepared for snowfall and cold (-30°C possible)",
            "Fill your tank early – gas stations can be far apart",
            "Keep warm clothes in the car as a precaution"
          ]
        }
      },
      gettingAround: {
        title: "Getting Around Levi",
        options: [
          {
            name: "Ski Bus",
            desc: "Free ski bus circulates Levi center, hotels and slopes. Runs approximately every 15 minutes during peak season."
          },
          {
            name: "Taxi",
            desc: "Taxis available in Levi center. Book in advance during peak season."
          },
          {
            name: "Rental Car",
            desc: "Car rental at Kittilä Airport (Avis, Hertz, Europcar). Recommended if you want to explore the surrounding area."
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "How far is Levi from Helsinki?",
            a: "Levi is approximately 1,100 km from Helsinki. By plane, the journey takes about 1.5 hours; by train, 12–14 hours; and by car, 12–14 hours."
          },
          {
            q: "Is Kittilä Airport close to Levi?",
            a: "Yes! Kittilä Airport (KTT) is only 15 km from Levi center, about a 15-minute drive. Airport buses wait for every flight."
          },
          {
            q: "Can I drive without winter tires?",
            a: "No. Winter tires are mandatory from December 1 to March 31. In Lapland, we recommend studded tires as roads can be icy and snowy."
          },
          {
            q: "Is there a bus connection from Rovaniemi to Levi?",
            a: "Yes. For example, Eskelisen Lapin Linjat and Matkahuolto buses run from Rovaniemi to Levi. The journey takes about 2.5 hours."
          }
        ]
      }
    },
    cta: {
      title: "Book Your Accommodation in Levi",
      text: "Now that you know how to get to Levi, book comfortable accommodation and plan your dream Lapland holiday!",
      button: "View Accommodations"
    },
    relatedTitle: "Useful Reading",
    relatedLinks: [
      { text: "How to Dress for Winter in Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Top Winter Activities", href: "/activities/top-winter-activities-in-levi-lapland" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" }
    ],
    accommodationsHref: "/en/accommodations",
    readNext: {
      title: "Read Next",
      links: [
        { title: "Getting Around Levi", desc: "Ski buses, taxis and car rental", href: "/guide/getting-around-in-levi" },
        { title: "Levi Without a Car", desc: "Tips for a car-free holiday", href: "/guide/levi-without-a-car" },
        { title: "Winter Clothing", desc: "What to pack for Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Accommodations", desc: "Book your stay in Levi", href: "/en/accommodations" },
      ],
    },
  },
  nl: {
    meta: {
      title: "Hoe kom je in Levi? Vliegen, trein en auto naar Lapland | Leville.net",
      description: "Alle reisopties naar Levi in Fins Lapland. Directe vluchten naar Kittilä, treinverbindingen via Rovaniemi en Kolari, en autoroutes vanuit Helsinki.",
      canonical: "https://leville.net/nl/gids/hoe-kom-je-in-levi"
    },
    title: "Hoe kom je in Levi, Fins Lapland?",
    subtitle: "Alle reisopties: vliegen, trein en auto naar Lapland",
    intro: "Levi ligt in de gemeente Kittilä, in het hart van Fins Lapland. Vanuit Nederland zijn er in het winterseizoen directe chartervluchten via Voigt Travel en TUI naar Kittilä (KTT) – slechts 15 minuten rijden van Levi centrum. Ook op eigen houtje is Levi goed bereikbaar via Helsinki.",
    sections: {
      flying: {
        title: "Vliegen naar Levi – Kittilä Airport (KTT)",
        intro: "Vliegen is de snelste manier om Levi te bereiken. Kittilä Airport ligt op slechts 15 minuten rijden van het centrum van Levi.",
        domestic: {
          title: "Chartervluchten vanuit Nederland",
          items: [
            "Voigt Travel en TUI bieden directe chartervluchten Amsterdam → Kittilä in het winterseizoen",
            "Vliegtijd circa 3 uur direct",
            "Inclusief transfer naar je accommodatie bij de meeste pakketreizen",
            "Boek vroeg – wintervluchten zijn snel uitverkocht!"
          ]
        },
        international: {
          title: "Zelf boeken via Helsinki",
          items: [
            "Finnair vliegt Amsterdam → Helsinki → Kittilä (overstap)",
            "Norwegian/SAS hebben soms routes via Stockholm",
            "Totale reistijd met overstap: 5–7 uur",
            "Vergelijk prijzen op Skyscanner of Google Flights"
          ]
        },
        transfer: {
          title: "Luchthaventransfer naar Levi",
          text: "Van Kittilä Airport naar Levi centrum is slechts 15 km. Transferopties:",
          options: [
            "Pakketreizen (Voigt/TUI) – shuttle inbegrepen",
            "Taxi – circa €30, vooraf reserveren aanbevolen",
            "Vooraf geboekte shuttle – diverse aanbieders",
            "Huurauto – beschikbaar op Kittilä Airport voor meer vrijheid"
          ]
        }
      },
      train: {
        title: "Trein + bus – Route via Kolari",
        intro: "De nachttrein is een belevenis op zich en een ecologische keuze. De VR-nachttrein rijdt van Helsinki naar Kolari.",
        route: {
          title: "Route",
          items: [
            "Nachttrein Helsinki → Kolari (vertrekt 's avonds, aankomst 's ochtends)",
            "Reistijd circa 12 uur",
            "Slaap- en autocoupé beschikbaar",
            "Busverbinding Kolari → Levi (circa 1 uur)"
          ]
        },
        tips: {
          title: "Tips voor de treinreis",
          items: [
            "Boek slaapplaatsen vroeg – ze zijn snel vol",
            "Met de autocoupé kun je je eigen auto meenemen",
            "De bus wacht op de trein in Kolari",
            "Prijzen vanaf €80 zitplaats, €150+ slaapplaats"
          ]
        }
      },
      driving: {
        title: "Met de auto naar Levi",
        intro: "Vanuit Nederland is autorijden naar Levi niet aan te raden (2.500+ km). Maar als je al in Finland bent, is het een prachtige rit door het Finse landschap.",
        routes: [
          {
            from: "Vanuit Helsinki",
            distance: "circa 1.100 km",
            time: "12–14 uur",
            desc: "Route via de E75 langs Oulu. We raden een overnachting onderweg aan, bijvoorbeeld in Oulu."
          },
          {
            from: "Vanuit Rovaniemi",
            distance: "circa 170 km",
            time: "2 uur",
            desc: "Makkelijke rit over goede wegen. Onderweg kun je stoppen bij de Poolcirkel."
          },
          {
            from: "Vanuit Oulu",
            distance: "circa 380 km",
            time: "4,5 uur",
            desc: "Populaire tussenstop als je vanuit het zuiden komt."
          }
        ],
        winterTips: {
          title: "Winterrijden in Finland",
          items: [
            "Winterbanden verplicht van 1 december tot 31 maart",
            "Spijkerbanden aanbevolen in Lapland",
            "Wees voorbereid op sneeuwval en strenge kou (tot -30°C)",
            "Tank op tijd – tankstations kunnen ver uit elkaar liggen",
            "Houd warme kleding in de auto voor noodgevallen"
          ]
        }
      },
      gettingAround: {
        title: "Vervoer in Levi",
        options: [
          {
            name: "Skibus",
            desc: "Gratis skibus rijdt door het centrum, langs hotels en naar de pistes. Rijdt circa elke 15 minuten in het seizoen."
          },
          {
            name: "Taxi",
            desc: "Taxi's beschikbaar in het centrum. Reserveer vooraf in het hoogseizoen."
          },
          {
            name: "Huurauto",
            desc: "Autoverhuur op Kittilä Airport (Avis, Hertz, Europcar). Handig om de omgeving te verkennen, maar niet noodzakelijk in het centrum."
          }
        ]
      },
      faq: {
        title: "Veelgestelde vragen",
        items: [
          {
            q: "Zijn er directe vluchten vanuit Nederland naar Levi?",
            a: "Ja! In het winterseizoen bieden Voigt Travel en TUI directe chartervluchten van Amsterdam naar Kittilä Airport, op slechts 15 minuten van Levi."
          },
          {
            q: "Hoe ver is Kittilä Airport van Levi?",
            a: "Slechts 15 km, circa 15 minuten rijden. Bij pakketreizen is de transfer inbegrepen. Zelfstandige reizigers kunnen een taxi (~€30) of shuttle boeken."
          },
          {
            q: "Heb ik een huurauto nodig in Levi?",
            a: "Niet per se. De gratis skibus rijdt regelmatig en het centrum is compact. Een huurauto is wel handig als je de omgeving wilt verkennen."
          },
          {
            q: "Hoe koud wordt het echt in Levi?",
            a: "December tot februari: typisch -10 tot -25°C, kan oplopen tot -35°C. Maar droge kou voelt warmer aan dan Nederlandse natte kou!"
          }
        ]
      }
    },
    cta: {
      title: "Boek je accommodatie in Levi",
      text: "Nu je weet hoe je in Levi komt, boek een comfortabele accommodatie en plan je droomvakantie in Lapland!",
      button: "Bekijk accommodaties"
    },
    relatedTitle: "Handige gidsen",
    relatedLinks: [
      { text: "Winterkleding voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
      { text: "Beste winteractiviteiten", href: "/activities/top-winter-activities-in-levi-lapland" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/nl" },
      { label: "Reisgids", href: "/nl/gids/reisgids-levi" },
      { label: "Hoe kom je in Levi", href: "/nl/gids/hoe-kom-je-in-levi" }
    ],
    accommodationsHref: "/nl/accommodaties",
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Levi zonder auto", desc: "Tips voor een vakantie zonder auto", href: "/nl/levi" },
        { title: "Winterkleding", desc: "Wat moet je meenemen", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Reisgids Levi", desc: "Praktische tips voor je reis", href: "/nl/gids/reisgids-levi" },
        { title: "Accommodaties", desc: "Boek je verblijf in Levi", href: "/nl/accommodaties" },
      ],
    },
  }
};

const HowToGetToLevi = ({ lang = "fi" }: HowToGetToLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;
  
  const hreflangUrls = {
    fi: "https://leville.net/matka/miten-paasee-leville-helsingista",
    en: "https://leville.net/travel/how-to-get-to-levi-from-helsinki-and-abroad",
    nl: "https://leville.net/nl/gids/hoe-kom-je-in-levi"
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
    "@type": "Article",
    "headline": t.title,
    "description": t.meta.description,
    "author": {
      "@type": "Organization",
      "name": "Leville.net"
    }
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
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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

          {/* Flying Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Plane className="w-6 h-6 text-primary" />
              {t.sections.flying.title}
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.flying.intro}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.flying.domestic.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.flying.domestic.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.flying.international.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.flying.international.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bus className="w-5 h-5 text-primary" />
                  {t.sections.flying.transfer.title}
                </h3>
                <p className="text-foreground/80 mb-3">{t.sections.flying.transfer.text}</p>
                <ul className="space-y-2 text-sm">
                  {t.sections.flying.transfer.options.map((option, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/80">{option}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Train Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Train className="w-6 h-6 text-primary" />
              {t.sections.train.title}
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.train.intro}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t.sections.train.route.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.train.route.items.map((item, index) => (
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
                  <h3 className="font-semibold mb-3">{t.sections.train.tips.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {t.sections.train.tips.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">💡</span>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Driving Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Car className="w-6 h-6 text-primary" />
              {t.sections.driving.title}
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.driving.intro}</p>
            
            <div className="space-y-4 mb-6">
              {t.sections.driving.routes.map((route, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <h3 className="font-semibold text-primary">{route.from}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{route.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80">{route.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  {t.sections.driving.winterTips.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {t.sections.driving.winterTips.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠</span>
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Getting Around */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Bus className="w-6 h-6 text-primary" />
              {t.sections.gettingAround.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {t.sections.gettingAround.options.map((option, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{option.name}</h3>
                    <p className="text-sm text-foreground/80">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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

export default HowToGetToLevi;
