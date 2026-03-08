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
import { Dog, Clock, Heart, Users, Thermometer, Shield, CheckCircle, MapPin, Snowflake } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HuskySafariTipsProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Koiravaljakkoajelu Levillä – Vinkit ensikertalaiselle | Leville.net",
      description:
        "Ensimmäinen koiravaljakkoajelu Levillä? Lue opas huskyjen kanssa seikkailuun: mitä odottaa, miten pukeutua ja mistä varata. Unohtumatonta Lapin taikaa.",
      canonical: "https://leville.net/aktiviteetit/koiravaljakkoajelu-levi",
    },
    title: "Koiravaljakkoajelu Levillä",
    subtitle: "Elämys huskyjen kanssa – opas ensikertalaiselle",
    intro:
      "Koiravaljakkoajelu on yksi Lapin taianomaisia elämyksiä. Innokkaat huskyt vetävät rekiä lumisessa maisemassa, ja koet aitoa arktista seikkailua. Tämä opas auttaa sinua valmistautumaan unohtumattomaan koiravaljakkoelämykseen.",
    sections: {
      expect: {
        title: "Mitä odottaa koiravaljakkoajelulta",
        intro: "Tyypillinen koiravaljakkoajelu sisältää:",
        items: [
          "Tutustuminen huskyihin ja rekkojen käsittely ennen lähtöä",
          "Ajo lumisessa metsässä tai tunturimaisemissa",
          "Mahdollisuus ohjata omaa rekeä tai matkustaa asiakkaana",
          "Tauko nuotiolla kuuman mehun ja välipalan kera",
          "Läheinen kontakti ystävällisiin rekikoiriin",
        ],
      },
      tours: {
        title: "Safarityypit Levillä",
        items: [
          {
            type: "Lyhyet ajelut (30 min – 1 h)",
            desc: "Täydellinen tutustuminen koiravaljakkoajeluun. Sopii perheille ja ensikertalaisille. Hinta esim. alkaen n. 80 € / henkilö – tarkista ajantasainen hinta palveluntuottajalta.",
            duration: "30–60 min",
            icon: "clock",
          },
          {
            type: "Puolen päivän safarit",
            desc: "3–4 tunnin retki vie syvemmälle erämaahan. Sisältää pidemmän ajomatkan ja eväätauon. Hinta esim. alkaen n. 150 € / henkilö – tarkista palveluntuottajalta.",
            duration: "3–4 tuntia",
            icon: "mappin",
          },
          {
            type: "Yön yli expeditiot",
            desc: "Uskomaton seikkailu yöpymisellä erämaakämpällä. Tähtitaivas, revontulet ja hiljaisuus. Hinta esim. alkaen n. 400 € / yö – tarkista palveluntuottajalta.",
            duration: "1–3 yötä",
            icon: "snowflake",
          },
        ],
      },
      dogs: {
        title: "Huskyt ja eläinten hyvinvointi",
        intro: "Levillä toimivat koiratarhat huolehtivat eläinten hyvinvoinnista:",
        items: [
          "Koirat rakastavat vetää ja ovat koulutettuja työhön",
          "Jokaista koiraa hoidetaan yksilöllisesti",
          "Koirat käyvät säännöllisesti eläinlääkärillä",
          "Työ- ja lepojaksojen tasapaino huolehditaan",
          "Eläkeikäiset koirat sijoitetaan rakentaviin koteihin",
        ],
        tip: "Koirille saa antaa rapsutuksia ennen ja jälkeen ajelun – ne rakastavat huomiota!",
      },
      clothing: {
        title: "Mitä pukea koiravaljakkoajelulle",
        intro: "Safari-operaattorit tarjoavat yleensä lämpimät haalarit. Tuo silti mukana:",
        items: [
          "Villa- tai lämpöalusasu (ei puuvillaa)",
          "Lämpimät villasukat",
          "Ohut pipo kypärän tai hupun alle",
          "Kasvosuoja tai tuubihuivi",
          "Omat käsineet varmuuden vuoksi (jos omasi ovat lämpimämmät)",
        ],
        tip: "Istut reessä melko paikallaan, joten pukeudu lämpimästi! Ohjaaja liikkuu enemmän ja lämmittelee.",
      },
      driving: {
        title: "Reen ohjaaminen – käytännön vinkit",
        items: [
          {
            title: "Ei ajokorttia tarvita",
            text: "Koiravaljakkoajeluun ei tarvita ajokorttia. Opas neuvoo reen käsittelyn ja jarrutuksen ennen lähtöä.",
          },
          {
            title: "Jarrutus ja ohjaaminen",
            text: "Reessä on jarru, jota poljet jalalla. Koirat vetävät – sinun tehtäväsi on jarruttaa ja ohjata painonsiirrolla.",
          },
          {
            title: "Matkustajana",
            text: "Voit myös istua reessä matkustajana. Tämä on hyvä valinta lapsille tai niille, jotka haluavat vain nauttia maisemista.",
          },
          {
            title: "Koirien kohtelu",
            text: "Kohtele koiria lempeästi. Rapsuttele, mutta älä ruoki ilman lupaa. Koirat ovat ystävällisiä ja innokkaita.",
          },
        ],
      },
      bestTime: {
        title: "Paras aika koiravaljakkoajelulle",
        intro: "Koiravaljakkoajeluja järjestetään marraskuusta huhtikuulle, mutta parhaat ajat:",
        times: [
          {
            period: "Joulu–tammikuu",
            desc: "Kaamos tuo taianomaisen tunnelman. Mahdollisuus yhdistää revontulien katselu.",
          },
          {
            period: "Helmi–maaliskuu",
            desc: "Parhaat olosuhteet: runsas lumi, pidempi päivänvalo, aurinkoa.",
          },
          {
            period: "Maaliskuu–huhtikuu",
            desc: "Kevätaurinko lämmittää, mutta lunta on vielä riittävästi. Erityisen kaunis aika.",
          },
        ],
      },
      booking: {
        title: "Safarin varaaminen",
        providers: {
          title: "Missä varata",
          list: [
            "Koiratarhat ja safari-operaattorit Levin lähellä",
            "Hotellien ja majoitusten vastaanotot",
            "Online-varaukset suoraan operaattoreilta",
            "Visit Levi -palvelupiste",
          ],
        },
        prices: {
           title: "Suuntaa-antavat hinnat",
           list: [
             "30 min ajelu: esim. alkaen n. 80 € / henkilö",
             "1h ajelu: esim. alkaen n. 100 € / henkilö",
             "Puolipäiväsafari: esim. alkaen n. 150 € / henkilö",
             "Tarkista ajantasaiset hinnat suoraan palveluntuottajalta",
           ],
        },
        tip: "Varaa ajoissa sesonkiaikoina! Koiravaljakkoajelut ovat suosittuja ja täyttyvät nopeasti.",
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Tarvitsenko ajokorttia koiravaljakkoajeluun?",
            a: "Ei, koiravaljakkoajeluun ei tarvita ajokorttia. Opas antaa ohjeet reen käsittelyyn ennen lähtöä. Kuka tahansa aikuinen voi ohjata rekeä.",
          },
          {
            q: "Voivatko lapset osallistua koiravaljakkoajelulle?",
            a: "Kyllä! Lapset voivat matkustaa reen sisällä tai vanhemman kanssa. Yleensä alaraja on noin 4 vuotta. Lämpimät haalarit ja varusteet tarjotaan lapsille.",
          },
          {
            q: "Onko koiravaljakkoajelulla kylmä?",
            a: "Istut reessä melko paikallaan, joten pukeudu lämpimästi. Operaattorit tarjoavat haalarit ja peitot. Tauoilla voi lämmitellä nuotion ääressä.",
          },
          {
            q: "Ovatko huskyt ystävällisiä?",
            a: "Kyllä! Rekikoirat ovat koulutettuja ja tottuneet ihmisiin. Ne rakastavat huomiota ja rapsutuksia. Saat usein tutustua koiriin ennen ja jälkeen ajelun.",
          },
          {
            q: "Kuinka monta koiraa vetää rekeä?",
            a: "Tyypillisesti 4–6 koiraa vetää yhtä rekeä. Pidemmillä safarilla voi olla enemmän koiria. Koirat ovat innokkaita ja rakastavat työtään!",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoitus ja koe koiravaljakkoajelu",
      text: "Levin keskustan majoituksistamme pääset helposti koiratarhoille. Monet operaattorit noutavat asiakkaat majoituksesta.",
      button: "Katso majoitukset",
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Moottorikelkkasafari", desc: "Toinen suosittu talvielämys", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
        { title: "Parhaat talviaktiviteetit", desc: "Kaikki Levin aktiviteetit", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Lapsiperheet Levillä", desc: "Huskyajelu sopii koko perheelle", href: "/opas/lapsiperheet-levilla" },
        { title: "Talvivarusteet", desc: "Mitä pukea huskyajelulle", href: "/opas/talvivarusteet-leville" }
      ]
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Moottorikelkkasafari-vinkit", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
      { text: "Parhaat talviaktiviteetit Levillä", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Aktiviteetit Levillä", href: "/opas/aktiviteetit-levi" },
      { label: "Koiravaljakkoajelu", href: "/aktiviteetit/koiravaljakkoajelu-levi" },
    ],
    activitiesHubLink: "/opas/aktiviteetit-levi",
    activitiesHubText: "← Takaisin aktiviteettioppaaseen",
    accommodationsHref: "/majoitukset",
  },
  en: {
    meta: {
      title: "Husky Safari in Levi – First-Timer's Guide | Leville.net",
      description:
        "First husky safari in Levi? Read our guide to dog sledding: what to expect, what to wear and where to book. Unforgettable Arctic magic awaits.",
      canonical: "https://leville.net/activities/husky-safari-levi",
    },
    title: "Husky Safari in Levi",
    subtitle: "An adventure with sled dogs – guide for first-timers",
    intro:
      "A husky safari is one of Lapland's most magical experiences. Eager huskies pull sleds through snowy landscapes, offering an authentic Arctic adventure. This guide helps you prepare for an unforgettable dog sledding experience.",
    sections: {
      expect: {
        title: "What to Expect on a Husky Safari",
        intro: "A typical husky safari includes:",
        items: [
          "Meeting the huskies and sled handling instructions before departure",
          "Riding through snowy forests or fell landscapes",
          "Opportunity to drive your own sled or ride as a passenger",
          "Break at a campfire with hot drinks and snacks",
          "Close contact with friendly sled dogs",
        ],
      },
      tours: {
        title: "Types of Husky Tours in Levi",
        items: [
          {
            type: "Short Rides (30 min – 1 h)",
            desc: "Perfect introduction to dog sledding. Suitable for families and first-timers. Price e.g. from approx. €80 / person – check current prices with operator.",
            duration: "30–60 min",
            icon: "clock",
          },
          {
            type: "Half-Day Safaris",
            desc: "3–4 hour trip takes you deeper into the wilderness. Includes longer ride and lunch break. Price e.g. from approx. €150 / person – check with operator.",
            duration: "3–4 hours",
            icon: "mappin",
          },
          {
            type: "Overnight Expeditions",
            desc: "An incredible adventure with overnight stay at a wilderness cabin. Starry sky, northern lights and silence. Price e.g. from approx. €400/night – check with operator.",
            duration: "1–3 nights",
            icon: "snowflake",
          },
        ],
      },
      dogs: {
        title: "Huskies and Animal Welfare",
        intro: "Husky farms in Levi take excellent care of their animals:",
        items: [
          "Dogs love to run and are trained for this work",
          "Each dog receives individual care and attention",
          "Regular veterinary check-ups",
          "Balanced work and rest periods",
          "Retired dogs are placed in loving homes",
        ],
        tip: "You're welcome to pet the dogs before and after the ride – they love attention!",
      },
      clothing: {
        title: "What to Wear on a Husky Safari",
        intro: "Safari operators usually provide warm overalls. Still bring with you:",
        items: [
          "Wool or thermal base layers (no cotton)",
          "Warm wool socks",
          "Thin beanie under helmet or hood",
          "Face protection or neck gaiter",
          "Your own gloves as backup (if warmer than provided)",
        ],
        tip: "You'll be sitting still in the sled, so dress warmly! The musher moves more and stays warmer.",
      },
      driving: {
        title: "Driving the Sled – Practical Tips",
        items: [
          {
            title: "No License Required",
            text: "No driver's license is needed for dog sledding. The guide will instruct you on sled handling and braking before departure.",
          },
          {
            title: "Braking and Steering",
            text: "The sled has a brake you step on with your foot. The dogs pull – your job is to brake and steer by shifting your weight.",
          },
          {
            title: "As a Passenger",
            text: "You can also sit inside the sled as a passenger. This is a great choice for children or those who want to simply enjoy the scenery.",
          },
          {
            title: "Treating the Dogs",
            text: "Treat the dogs gently. Pet them, but don't feed them without permission. The dogs are friendly and eager.",
          },
        ],
      },
      bestTime: {
        title: "Best Time for Husky Safari",
        intro: "Husky safaris run from November to April, but best times are:",
        times: [
          {
            period: "Christmas–January",
            desc: "Polar night creates magical atmosphere. Opportunity to combine with northern lights viewing.",
          },
          {
            period: "February–March",
            desc: "Best conditions: plenty of snow, longer daylight, sunny weather.",
          },
          {
            period: "March–April",
            desc: "Spring sun warms up, but still plenty of snow. Especially beautiful time.",
          },
        ],
      },
      booking: {
        title: "Booking Your Safari",
        providers: {
          title: "Where to Book",
          list: [
            "Husky farms and safari operators near Levi",
            "Hotel and accommodation reception desks",
            "Online bookings directly from operators",
            "Visit Levi service point",
          ],
        },
        prices: {
           title: "Indicative Prices",
           list: [
             "30 min ride: e.g. from approx. €80 / person",
             "1h ride: e.g. from approx. €100 / person",
             "Half-day safari: e.g. from approx. €150 / person",
             "Always check current prices directly with the operator",
           ],
        },
        tip: "Book early during peak seasons! Husky safaris are popular and fill up quickly.",
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Do I need a driver's license for husky safari?",
            a: "No, no driver's license is needed for dog sledding. The guide provides sled handling instructions before departure. Any adult can drive the sled.",
          },
          {
            q: "Can children participate in husky safaris?",
            a: "Yes! Children can ride inside the sled or with a parent. Usually the minimum age is around 4 years. Warm overalls and gear are provided for children.",
          },
          {
            q: "Is it cold on a husky safari?",
            a: "You'll be sitting still in the sled, so dress warmly. Operators provide overalls and blankets. You can warm up by the campfire during breaks.",
          },
          {
            q: "Are huskies friendly?",
            a: "Yes! Sled dogs are trained and used to people. They love attention and pets. You can often meet the dogs before and after the ride.",
          },
          {
            q: "How many dogs pull one sled?",
            a: "Typically 4–6 dogs pull one sled. Longer safaris may use more dogs. The dogs are eager and love their work!",
          },
        ],
      },
    },
    cta: {
      title: "Book Accommodation and Experience Husky Safari",
      text: "From our Levi center accommodations, you can easily reach husky farms. Many operators pick up guests from accommodation.",
      button: "View Accommodations",
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Snowmobile Safari", desc: "Another must-do winter experience", href: "/activities/snowmobile-safari-tips-levi" },
        { title: "Top Winter Activities", desc: "All Levi winter activities", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Levi With Children", desc: "Husky rides for the whole family", href: "/guide/levi-with-children" },
        { title: "Winter Clothing", desc: "What to wear for husky ride", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
      ]
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "How to Dress for Winter in Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Snowmobile Safari Tips", href: "/activities/snowmobile-safari-tips-levi" },
      { text: "Top Winter Activities in Levi", href: "/activities/top-winter-activities-in-levi-lapland" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Activities in Levi", href: "/guide/activities-in-levi" },
      { label: "Husky Safari", href: "/activities/husky-safari-levi" },
    ],
    activitiesHubLink: "/guide/activities-in-levi",
    activitiesHubText: "← Back to Activities Guide",
    accommodationsHref: "/en/accommodations",
  },
  nl: {
    meta: {
      title: "Huskysafari in Levi – Tips en wat je moet weten | Leville.net",
      description: "Alles over de huskysafari in Levi, Lapland. Praktische tips: wat trek je aan, hoelang duurt het, voor wie geschikt, en wat kost het?",
      canonical: "https://leville.net/nl/activiteiten/husky-safari-levi",
    },
    title: "Huskysafari in Levi",
    subtitle: "Een avontuur met sledehonden – gids voor beginners",
    intro: "Een huskysafari is een van de meest magische ervaringen in Lapland. Enthousiaste huskys trekken de slee door besneeuwde landschappen – een authentiek Arctisch avontuur. Je zit in de slee, de gids bestuurt de honden – er is geen ervaring nodig. Deze gids helpt je om je voor te bereiden op een onvergetelijke huskysafari.",
    sections: {
      expect: {
        title: "Wat kun je verwachten van een huskysafari",
        intro: "Een typische huskysafari omvat:",
        items: [
          "Kennismaken met de husky's en instructies voor het sleebesturen vóór vertrek",
          "Rit door besneeuwde bossen of het fjelllandschap",
          "Mogelijkheid om zelf de slee te besturen of als passagier mee te rijden",
          "Pauze bij een kampvuur met warme dranken en snacks",
          "Dicht contact met de vriendelijke sledehonden",
        ],
      },
      tours: {
        title: "Soorten huskytochten in Levi",
        items: [
          {
            type: "Korte ritten (1 uur)",
            desc: "Perfecte kennismaking met sledehonden. Geschikt voor gezinnen en beginners. Prijs ca. €100-150 per persoon.",
            duration: "ca. 1 uur",
            icon: "clock",
          },
          {
            type: "Halvedagsafari's (2-3 uur)",
            desc: "Langere tocht dieper de wildernis in. Inclusief lunchpauze bij kampvuur. Prijs €150-200 per persoon.",
            duration: "2–3 uur",
            icon: "mappin",
          },
          {
            type: "Overnachtingsexpedities",
            desc: "Een ongelooflijk avontuur met overnachting in een wildernishut. Sterrenhemel, noorderlicht en stilte. Prijs vanaf €400/nacht.",
            duration: "1–3 nachten",
            icon: "snowflake",
          },
        ],
      },
      dogs: {
        title: "Husky's en dierenwelzijn",
        intro: "Huskyboerderijen in Levi zorgen uitstekend voor hun dieren:",
        items: [
          "Honden houden van rennen en zijn getraind voor dit werk",
          "Elke hond krijgt individuele verzorging en aandacht",
          "Regelmatige dierenartsencontroles",
          "Gebalanceerde werk- en rustperiodes",
          "Gepensioneerde honden worden in liefdevolle huizen geplaatst",
        ],
        tip: "Je mag de honden aaien voor en na de rit – ze vinden het heerlijk!",
      },
      clothing: {
        title: "Wat trek je aan voor een huskysafari",
        intro: "De meeste operators leveren warme overalls. Neem zelf ook mee:",
        items: [
          "Wollen of thermische basislaag (geen katoen)",
          "Dikke wollen sokken",
          "Dun mutsje onder helm of capuchon",
          "Gezichtsbescherming of nekwarmer/buff",
          "Eigen warme wanten als back-up (warmer dan de verstrekte)",
        ],
        tip: "Je zit vrij stil in de slee, dus kleed je extra warm! De gids beweegt meer en blijft warmer. Tip: bewaar je telefoon binnenin je jas, anders bevriest de batterij.",
      },
      driving: {
        title: "De slee besturen – praktische tips",
        items: [
          {
            title: "Geen rijbewijs nodig",
            text: "Voor een huskysafari heb je geen rijbewijs nodig. De gids legt voor vertrek uit hoe je de slee bestuurt en remt.",
          },
          {
            title: "Remmen en sturen",
            text: "De slee heeft een rem die je met je voet bedient. De honden trekken – jouw taak is remmen en sturen door je gewicht te verplaatsen.",
          },
          {
            title: "Als passagier",
            text: "Je kunt ook in de slee zitten als passagier. Dit is ideaal voor kinderen of wie gewoon wil genieten van het landschap.",
          },
          {
            title: "Omgang met de honden",
            text: "Behandel de honden voorzichtig. Aai ze, maar voer ze niet zonder toestemming. De honden zijn vriendelijk en enthousiast.",
          },
        ],
      },
      bestTime: {
        title: "Beste tijd voor een huskysafari",
        intro: "Huskysafari's worden georganiseerd van november tot april. De beste periodes:",
        times: [
          {
            period: "Kerstvakantie (dec-jan)",
            desc: "Poolnacht creëert een magische sfeer. Mogelijkheid om noorderlicht te zien.",
          },
          {
            period: "Krokusvakantie (feb-mrt)",
            desc: "Beste omstandigheden: veel sneeuw, meer daglicht, zonnig weer.",
          },
          {
            period: "Maart–april",
            desc: "Lentezon verwarmt, maar nog genoeg sneeuw. Bijzonder mooie periode.",
          },
        ],
      },
      booking: {
        title: "Je safari boeken",
        providers: {
          title: "Waar boeken",
          list: [
            "Via je pakketreis-operator (Voigt Travel, Nordic, TUI)",
            "Rechtstreeks bij lokale huskyboerderijen",
            "Online via de websites van operators",
            "Levi Tourist Information servicepunt",
          ],
        },
        prices: {
           title: "Indicatieve prijzen",
           list: [
             "1 uur rit: bijv. vanaf ca. €100 / persoon",
             "2-3 uur safari: bijv. vanaf ca. €150 / persoon",
             "Halvedagsafari: bijv. vanaf ca. €150 / persoon",
             "Controleer altijd actuele prijzen bij de operator",
           ],
        },
        tip: "Boek op tijd, vooral tijdens de Nederlandse en Belgische schoolvakanties! Huskysafari's zijn erg populair.",
      },
      faq: {
        title: "Veelgestelde vragen",
        items: [
          {
            q: "Heb ik een rijbewijs nodig voor een huskysafari?",
            a: "Nee, voor een huskysafari heb je geen rijbewijs nodig. De gids geeft instructies over het besturen van de slee voor vertrek. Elke volwassene kan de slee besturen.",
          },
          {
            q: "Kunnen kinderen meedoen aan een huskysafari?",
            a: "Ja! Kinderen kunnen in de slee zitten of met een ouder meerijden. Meestal is de minimumleeftijd ongeveer 4 jaar. Warme overalls en uitrusting worden voor kinderen verstrekt.",
          },
          {
            q: "Is het koud op een huskysafari?",
            a: "Je zit vrij stil in de slee, dus kleed je warm. Operators bieden overalls en dekens. Tijdens pauzes kun je opwarmen bij het kampvuur.",
          },
          {
            q: "Zijn husky's vriendelijk?",
            a: "Ja! Sledehonden zijn getraind en gewend aan mensen. Ze houden van aandacht en aaitjes. Je mag de honden vaak ontmoeten voor en na de rit.",
          },
          {
            q: "Hoeveel honden trekken een slee?",
            a: "Meestal 4-6 honden trekken één slee. Bij langere safari's kunnen er meer honden zijn. De honden zijn enthousiast en houden van hun werk!",
          },
        ],
      },
    },
    cta: {
      title: "Boek accommodatie en beleef een huskysafari",
      text: "Vanuit onze accommodaties in het centrum van Levi bereik je gemakkelijk de huskyboerderijen. Veel operators halen gasten op bij de accommodatie.",
      button: "Bekijk accommodaties",
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Winteractiviteiten in Levi", desc: "Alle activiteiten op een rij", href: "/nl/activiteiten/winteractiviteiten-levi" },
        { title: "Levi met kinderen", desc: "Huskysafari geschikt voor het hele gezin", href: "/nl/levi" },
        { title: "Winterkleding", desc: "Wat trek je aan voor een huskysafari", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Accommodaties", desc: "Chalets en appartementen in Levi", href: "/nl/accommodaties" }
      ]
    },
    relatedTitle: "Lees ook",
    relatedLinks: [
      { text: "Winterkleding voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
      { text: "Winteractiviteiten in Levi", href: "/nl/activiteiten/winteractiviteiten-levi" },
      { text: "Hoe kom je in Levi", href: "/nl/gids/hoe-kom-je-in-levi" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/nl" },
      { label: "Activiteiten in Levi", href: "/nl/gids/activiteiten-in-levi" },
      { label: "Huskysafari", href: "/nl/activiteiten/husky-safari-levi" },
    ],
    activitiesHubLink: "/nl/gids/activiteiten-in-levi",
    activitiesHubText: "← Terug naar activiteitengids",
    accommodationsHref: "/nl/accommodaties",
  },
};

const HuskySafariTips = ({ lang = "fi" }: HuskySafariTipsProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/koiravaljakkoajelu-levi",
    en: "https://leville.net/activities/husky-safari-levi",
    nl: "https://leville.net/nl/activiteiten/husky-safari-levi",
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
        return <Dog className="w-5 h-5" />;
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={hreflangUrls} />

      <SubpageBackground />
      <Header />
      <Breadcrumbs lang={lang} />

      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          {/* Back to Hub */}
          <div className="mb-6">
            <Link
              to={t.activitiesHubLink}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t.activitiesHubText}
            </Link>
          </div>

          {/* Hero */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Dog className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">{t.intro}</p>
          </section>

          {/* What to Expect */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  {t.sections.expect.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.expect.intro}</p>
                <ul className="space-y-2">
                  {t.sections.expect.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Tour Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.sections.tours.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.sections.tours.items.map((tour, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      {getIcon(tour.icon)}
                      <span className="text-sm font-medium">{tour.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{tour.type}</h3>
                    <p className="text-muted-foreground text-sm">{tour.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Dogs and Welfare */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary" />
                  {t.sections.dogs.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.dogs.intro}</p>
                <ul className="space-y-2 mb-4">
                  {t.sections.dogs.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-primary bg-primary/5 p-3 rounded-lg">💡 {t.sections.dogs.tip}</p>
              </CardContent>
            </Card>
          </section>

          {/* Clothing */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-primary" />
                  {t.sections.clothing.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.clothing.intro}</p>
                <ul className="space-y-2 mb-4">
                  {t.sections.clothing.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  ⚠️ {t.sections.clothing.tip}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Driving Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              {t.sections.driving.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {t.sections.driving.items.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Time */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Snowflake className="w-6 h-6 text-primary" />
                  {t.sections.bestTime.title}
                </h2>
                <p className="text-muted-foreground mb-4">{t.sections.bestTime.intro}</p>
                <div className="space-y-4">
                  {t.sections.bestTime.times.map((time, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="font-semibold text-primary min-w-[140px]">{time.period}</span>
                      <span className="text-muted-foreground">{time.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Booking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.sections.booking.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.providers.title}</h3>
                  <ul className="space-y-2">
                    {t.sections.booking.providers.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{t.sections.booking.prices.title}</h3>
                  <ul className="space-y-2">
                    {t.sections.booking.prices.list.map((item, index) => (
                      <li key={index} className="text-muted-foreground text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary mt-4 bg-primary/5 p-3 rounded-lg">💡 {t.sections.booking.tip}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t.sections.faq.title}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card/80 backdrop-blur-sm border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          {/* CTA */}
          <section className="mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-2xl font-bold mb-3">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t.cta.text}</p>
                <Button asChild size="lg">
                  <Link to={t.accommodationsHref}>{t.cta.button}</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Related Links */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t.relatedTitle}</h3>
            <div className="flex flex-wrap gap-3">
              {t.relatedLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-sm text-primary hover:underline bg-primary/5 px-4 py-2 rounded-full"
                >
                  {link.text}
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

export default HuskySafariTips;
