import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Snowflake, 
  Mountain,
  Dog,
  TreePine,
  Fish,
  Footprints,
  Bike,
  Heart
} from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TopWinterActivitiesProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Parhaat talviaktiviteetit Levillä | Mitä tehdä | Leville.net",
      description: "Löydä parhaat talviaktiviteetit Levillä: laskettelu, huskysafarit, poroajelut, pilkkiminen ja paljon muuta. Suunnittele täydellinen Lapin seikkailu.",
      canonical: "https://leville.net/aktiviteetit/parhaat-talviaktiviteetit-levi"
    },
    title: "Parhaat talviaktiviteetit Levillä",
    subtitle: "Kaikki mitä voit tehdä Lapin lumisessa ihmeessä",
    intro: "Levi on Suomen suosituin talvikohde – eikä syyttä. Täällä voit kokea kaiken laskettelusta huskyajeluihin, porosafareista pilkkimiseen. Tämä opas esittelee parhaat talviaktiviteetit ja auttaa sinua suunnittelemaan unelmien Lapin loman.",
    sections: {
      skiing: {
        title: "Laskettelu ja lumilautailu",
        icon: "mountain",
        intro: "Levi on Suomen suurin laskettelukeskus, jossa on 43 rinnettä ja 28 hissiä.",
        subsections: [
          {
            title: "Rinteet ja hissit",
            items: [
              "43 rinnettä kaikille taitotasoille",
              "28 hissiä – Leevilandiassa lapsille sopivia hissejä",
              "Pisin rinne 2,5 km",
              "Korkeusero 325 metriä",
              "Lumetettu kausi marraskuusta toukokuulle"
            ]
          },
          {
            title: "Hiihtokoulu kaikenikäisille",
            items: [
              "Levi Ski School tarjoaa opetusta aloittelijoista edistyneisiin",
              "Lasten hiihtokoulu (Angry Birds Park)",
              "Yksityistunnit saatavilla",
              "Vuokrauspalvelut rinteen juurella"
            ]
          }
        ]
      },
      crossCountry: {
        title: "Murtomaahiihto",
        icon: "treepine",
        intro: "Levi on murtomaahiihtäjän paratiisi, jossa on yli 230 kilometriä huollettuja latuja.",
        items: [
          "230 km huollettuja latuja",
          "Valaistuja latuja iltahiihdoille",
          "Erätasoisia reittejä tunturimaisemissa",
          "Hiihtokeskuksen yhteydessä vuokraus ja huolto",
          "Oulu–Levi -hiihtomäki treenikäyttöön"
        ]
      },
      husky: {
        title: "Huskysafarit",
        icon: "dog",
        intro: "Huskyajelut ovat unohtumaton kokemus – koirat vetävät sinut halki lumisen erämaan.",
        options: [
          { name: "Lyhyet 2–3 tunnin safarit", desc: "Sopii ensikertalisille, hinnat alkaen 140€" },
          { name: "Puolen päivän seikkailut", desc: "Syvemmälle erämaahan, noin 200€" },
          { name: "Usean päivän expeditiot", desc: "Kokeille ajajille, yövy koirafarmilla" }
        ],
        tip: "Huskysafarit ovat suosittuja – varaa ajoissa, erityisesti joulu- ja hiihtolomasesonkina."
      },
      reindeer: {
        title: "Poroelämykset",
        icon: "heart",
        intro: "Porot ovat Lapin symboli. Levillä voit kokea ne monella tavalla.",
        options: [
          { name: "Porofarmivierailut", desc: "Tapaa porot läheltä, opi niiden elämästä ja ota kuvia." },
          { name: "Perinteiset poroajelut", desc: "Rauhallinen kelkka-ajelu poron vetämänä lumisessa maisemassa." },
          { name: "Poronhoitajan päivä", desc: "Osallistu poronhoitajan arkeen – syötä poroja ja kulje rekikoirien kanssa." }
        ]
      },
      iceFishing: {
        title: "Pilkkiminen jäällä",
        icon: "fish",
        intro: "Pilkkiminen on rauhallinen tapa nauttia Lapin talvesta. Jäällä istuminen tuikitähtisen taivaan alla on meditatiivinen kokemus.",
        items: [
          "Opastettuja pilkkiretkiä järvelle",
          "Varusteet (pilkki, viehe, lämpöistuin) kuuluvat hintaan",
          "Mahdollisuus saada siikaa, ahventa tai haukea",
          "Usein yhdistetty nuotio-lounaaseen tunturimaisemassa"
        ]
      },
      snowshoeing: {
        title: "Lumikenkäily erämaassa",
        icon: "footprints",
        intro: "Lumikenkäily on helppo tapa tutustua Lapin luontoon ilman hiihtotaitoja.",
        items: [
          "Opastettuja retkiä kansallispuistoissa",
          "Omatoimisia reittejä merkityillä poluilla",
          "Yhdistetään usein kahvitaukoon ja nuotioon",
          "Sopii kaikille kuntotasoille"
        ]
      },
      fatBiking: {
        title: "Fatbike-pyöräily lumella",
        icon: "bike",
        intro: "Fatbike eli leveärenkainen maastopyörä on hauska tapa tutustua Levin reitteihin talvella.",
        items: [
          "Vuokrattavissa Levin keskustasta",
          "Merkittyjä fatbike-reittejä",
          "Opastettuja kierroksia saatavilla",
          "Sopii kaikentasoisille pyöräilijöille"
        ]
      },
      connecting: {
        title: "Aktiviteeteista majoitukseen",
        intro: "Kun yhdistät aktiviteetit mukavaan majoitukseen, saat parhaan Lapin-kokemuksen.",
        tips: [
          "Majoituksemme sijaitsevat lähellä rinteitä ja safari-lähtöpaikkoja",
          "Oma sauna rentoutumiseen aktiviteettipäivän jälkeen",
          "Kuivaushuone märille varusteille",
          "Keskustan majoituksista pääset helposti kaikkiin aktiviteetteihin"
        ]
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Mitkä aktiviteetit sopivat lapsiperheille?",
            a: "Lähes kaikki! Porofarmivierailut, lyhyet huskysafarit, lasten hiihtokoulu ja lumikenkäily sopivat hyvin perheille. Monet operaattorit tarjoavat lastenistumia ja erikoiskokoja."
          },
          {
            q: "Pitääkö aktiviteetit varata etukäteen?",
            a: "Kyllä, erityisesti sesonkiaikoina (joulu, hiihtoloma, pääsiäinen). Suositut safarit ja hiihtokoulut täyttyvät nopeasti. Suosittelemme varaamaan vähintään viikkoa ennen."
          },
          {
            q: "Onko aktiviteetteja tarjolla joulukuun pimeydessä?",
            a: "Kyllä! Monet aktiviteetit ovat erityisen tunnelmallisia kaamoksen aikaan. Lyhdyt, tulet ja revontulet luovat ainutlaatuisen tunnelman. Hiihtokeskus on valaistu."
          },
          {
            q: "Mitä safarihintoihin sisältyy?",
            a: "Yleensä lämpövarusteet (haalari, kypärä, käsineet), opastus ja usein lämmin juoma/välipala. Tarkista aina operaattorilta ennen varausta."
          }
        ]
      }
    },
    cta: {
      title: "Varaa majoitus aktiviteettien läheisyydestä",
      text: "Majoituksemme sijaitsevat lähellä kaikkia aktiviteetteja. Nauti täydellisestä Lapin lomasta mukavassa huoneistossa.",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
        { title: "Moottorikelkkasafari", desc: "Vinkit ensikertalaiselle", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
        { title: "Koiravaljakkoajelu", desc: "Unohtumaton huskyelämys", href: "/aktiviteetit/koiravaljakkoajelu-levi" },
        { title: "Talvivarusteet", desc: "Pukeutuminen aktiviteetteihin", href: "/opas/talvivarusteet-leville" },
        { title: "Levi vs Ylläs vs Ruka", desc: "Kolmen hiihtokeskuksen vertailu", href: "/opas/levi-vs-yllas-vs-ruka" }
      ]
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Moottorikelkkasafari-vinkit", href: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
      { text: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista" }
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Aktiviteetit Levillä", href: "/opas/aktiviteetit-levi" },
      { label: "Parhaat talviaktiviteetit", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" }
    ],
    activitiesHubLink: "/opas/aktiviteetit-levi",
    activitiesHubText: "← Takaisin aktiviteettioppaaseen",
    accommodationsHref: "/majoitukset"
  },
  en: {
    meta: {
      title: "Top Winter Activities in Levi Lapland | What to Do | Leville.net",
      description: "Discover the best winter activities in Levi: skiing, husky safaris, reindeer rides, ice fishing, and more. Plan your perfect Lapland adventure.",
      canonical: "https://leville.net/activities/top-winter-activities-in-levi-lapland"
    },
    title: "Top Winter Activities in Levi, Lapland",
    subtitle: "Everything you can do in Lapland's winter wonderland",
    intro: "Levi is Finland's most popular winter destination – and for good reason. Here you can experience everything from skiing to husky safaris, reindeer rides to ice fishing. This guide presents the best winter activities and helps you plan your dream Lapland holiday.",
    sections: {
      skiing: {
        title: "Skiing and Snowboarding",
        icon: "mountain",
        intro: "Levi is Finland's largest ski resort with 43 slopes and 28 lifts.",
        subsections: [
          {
            title: "Slopes and Lifts",
            items: [
              "43 slopes for all skill levels",
              "28 lifts – Leevilandia has child-friendly lifts",
              "Longest slope 2.5 km",
              "Vertical drop 325 meters",
              "Snow-guaranteed season from October to May"
            ]
          },
          {
            title: "Ski School for All Ages",
            items: [
              "Levi Ski School offers lessons from beginners to advanced",
              "Children's ski school (Angry Birds Park)",
              "Private lessons available",
              "Rental services at the base"
            ]
          }
        ]
      },
      crossCountry: {
        title: "Cross-Country Skiing",
        icon: "treepine",
        intro: "Levi is a cross-country skier's paradise with over 230 kilometers of groomed trails.",
        items: [
          "230 km of groomed trails",
          "Illuminated trails for evening skiing",
          "Wilderness routes in fell landscapes",
          "Rental and service at ski center",
          "Oulu–Levi training hill for practice"
        ]
      },
      husky: {
        title: "Husky Safaris",
        icon: "dog",
        intro: "Husky rides are an unforgettable experience – dogs pull you through the snowy wilderness.",
        options: [
          { name: "Short 2–3 hour safaris", desc: "Perfect for first-timers, prices from €140" },
          { name: "Half-day adventures", desc: "Deeper into the wilderness, around €200" },
          { name: "Multi-day expeditions", desc: "For experienced riders, overnight at husky farm" }
        ],
        tip: "Husky safaris are popular – book early, especially during Christmas and ski holiday seasons."
      },
      reindeer: {
        title: "Reindeer Experiences",
        icon: "heart",
        intro: "Reindeer are the symbol of Lapland. In Levi, you can experience them in many ways.",
        options: [
          { name: "Reindeer Farm Visits", desc: "Meet reindeer up close, learn about their life and take photos." },
          { name: "Traditional Reindeer Sleigh Rides", desc: "Peaceful sleigh ride pulled by reindeer through snowy landscape." },
          { name: "Reindeer Herder's Day", desc: "Join a reindeer herder's daily life – feed reindeer and ride with sled dogs." }
        ]
      },
      iceFishing: {
        title: "Ice Fishing on Frozen Lakes",
        icon: "fish",
        intro: "Ice fishing is a peaceful way to enjoy Lapland's winter. Sitting on ice under starry skies is a meditative experience.",
        items: [
          "Guided ice fishing trips to lakes",
          "Equipment (rod, lure, thermal seat) included in price",
          "Opportunity to catch whitefish, perch or pike",
          "Often combined with campfire lunch in fell scenery"
        ]
      },
      snowshoeing: {
        title: "Snowshoeing in the Wilderness",
        icon: "footprints",
        intro: "Snowshoeing is an easy way to explore Lapland nature without skiing skills.",
        items: [
          "Guided tours in national parks",
          "Self-guided routes on marked trails",
          "Often combined with coffee break and campfire",
          "Suitable for all fitness levels"
        ]
      },
      fatBiking: {
        title: "Fat Biking on Snow",
        icon: "bike",
        intro: "Fat biking is a fun way to explore Levi's trails in winter.",
        items: [
          "Available for rent in Levi center",
          "Marked fat bike trails",
          "Guided tours available",
          "Suitable for all cycling levels"
        ]
      },
      connecting: {
        title: "Connecting Activities to Your Stay",
        intro: "When you combine activities with comfortable accommodation, you get the best Lapland experience.",
        tips: [
          "Our accommodations are located near slopes and safari departure points",
          "Private sauna for relaxation after activity day",
          "Drying room for wet gear",
          "Center accommodations give easy access to all activities"
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "What activities suit families with children?",
            a: "Almost all! Reindeer farm visits, short husky safaris, children's ski school and snowshoeing are great for families. Many operators offer child seats and special sizes."
          },
          {
            q: "Do I need to book activities in advance?",
            a: "Yes, especially during peak seasons (Christmas, ski holidays, Easter). Popular safaris and ski schools fill up quickly. We recommend booking at least a week ahead."
          },
          {
            q: "Are activities available in December darkness?",
            a: "Yes! Many activities are especially atmospheric during polar night. Lanterns, fires and northern lights create a unique mood. The ski resort is illuminated."
          },
          {
            q: "What's included in safari prices?",
            a: "Usually thermal gear (overalls, helmet, gloves), guiding and often hot drinks/snacks. Always check with the operator before booking."
          }
        ]
      }
    },
    cta: {
      title: "Book Accommodation Near Activities",
      text: "Our accommodations are located near all activities. Enjoy the perfect Lapland holiday in a comfortable apartment.",
      button: "View Accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
        { title: "Snowmobile Safari", desc: "Tips for first-timers", href: "/activities/snowmobile-safari-tips-levi" },
        { title: "Husky Safari", desc: "Unforgettable husky experience", href: "/activities/husky-safari-levi" },
        { title: "Winter Clothing", desc: "How to dress for activities", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Levi vs Ylläs vs Ruka", desc: "Three ski resorts compared", href: "/guide/levi-vs-yllas-vs-ruka-comparison" }
      ]
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "How to Dress for Winter in Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Snowmobile Safari Tips", href: "/activities/snowmobile-safari-tips-levi" },
      { text: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Activities in Levi", href: "/guide/activities-in-levi" },
      { label: "Top Winter Activities", href: "/activities/top-winter-activities-in-levi-lapland" }
    ],
    activitiesHubLink: "/guide/activities-in-levi",
    activitiesHubText: "← Back to Activities Guide",
    accommodationsHref: "/en/accommodations"
  },
  nl: {
    meta: {
      title: "Winteractiviteiten in Levi – Wat te doen in Lapland | Leville.net",
      description: "De beste winteractiviteiten in Levi: skiën, huskysafari, sneeuwscootertocht, rendierrit, noorderlicht en meer. Praktische tips en prijsindicaties.",
      canonical: "https://leville.net/nl/activiteiten/winteractiviteiten-levi"
    },
    title: "Winteractiviteiten in Levi, Lapland",
    subtitle: "Alles wat je kunt doen in het winterwonderland van Lapland",
    intro: "Levi is de populairste winterbestemming van Finland – en dat is niet zonder reden. Hier kun je alles beleven: van skiën tot huskysafari's, van rendierritten tot ijsvissen. De meeste pakketreizen (Voigt Travel, Nordic) bevatten al 3-4 activiteiten in de prijs. Zelfstandige reizigers kunnen activiteiten boeken via lokale operators of bij Levi Tourist Information. Deze gids presenteert de beste winteractiviteiten met praktische tips en prijsindicaties.",
    sections: {
      skiing: {
        title: "Skiën en snowboarden",
        icon: "mountain",
        intro: "Levi is het grootste skigebied van Finland met 43 pistes en 28 liften.",
        subsections: [
          {
            title: "Pistes en liften",
            items: [
              "43 pistes voor alle niveaus",
              "28 liften – Leevilandia heeft kindvriendelijke liften",
              "Langste piste 2,5 km",
              "Hoogteverschil 325 meter",
              "Gegarandeerd sneeuw van oktober tot mei"
            ]
          },
          {
            title: "Skischool voor alle leeftijden",
            items: [
              "Levi Ski School biedt lessen voor beginners tot gevorderden",
              "Kinderskischool (Angry Birds Park)",
              "Privélessen beschikbaar",
              "Verhuurservice bij de pistes"
            ]
          }
        ]
      },
      crossCountry: {
        title: "Langlaufen",
        icon: "treepine",
        intro: "Levi is een paradijs voor langlaufers met meer dan 230 kilometer verzorgde loipes.",
        items: [
          "230 km verzorgde loipes",
          "Verlichte loipes voor avondlanglaufen",
          "Wildernisroutes in het fjelllandschap",
          "Verhuur en service bij het skicentrum",
          "Oefenheuvel voor beginners"
        ]
      },
      husky: {
        title: "Huskysafari's",
        icon: "dog",
        intro: "Een huskysafari is een onvergetelijke ervaring – enthousiaste sledehonden trekken je door het besneeuwde landschap.",
        options: [
          { name: "Korte safari's (2–3 uur)", desc: "Perfect voor beginners, prijzen vanaf €140" },
          { name: "Halvedagtochten", desc: "Dieper de wildernis in, ca. €200" },
          { name: "Meerdaagse expedities", desc: "Voor ervaren deelnemers, overnachting op de huskyfarm" }
        ],
        tip: "Huskysafari's zijn populair – boek op tijd, vooral tijdens de Nederlandse/Belgische schoolvakanties (krokusvakantie, kerstvakantie)."
      },
      reindeer: {
        title: "Rendier-ervaringen",
        icon: "heart",
        intro: "Rendieren zijn het symbool van Lapland. In Levi kun je ze op verschillende manieren beleven.",
        options: [
          { name: "Bezoek aan rendierfarm", desc: "Ontmoet rendieren van dichtbij, leer over hun leven en maak foto's. Prijs ca. €60-80." },
          { name: "Traditionele rendiersledetocht", desc: "Rustige sledetocht getrokken door een rendier door het besneeuwde landschap." },
          { name: "Dag als rendierherder", desc: "Beleef het dagelijks leven van een rendierherder – voer rendieren en rijd mee op de slee." }
        ]
      },
      iceFishing: {
        title: "IJsvissen op bevroren meren",
        icon: "fish",
        intro: "IJsvissen is een rustige manier om van de Laplandse winter te genieten. Zitten op het ijs onder een sterrenhemel is een meditatieve ervaring.",
        items: [
          "Begeleide ijsvistochten naar meren",
          "Uitrusting (hengel, aas, warmtekussen) inbegrepen",
          "Kans op witvis, baars of snoek",
          "Vaak gecombineerd met kampvuurlunch in het fjelllandschap"
        ]
      },
      snowshoeing: {
        title: "Sneeuwschoenwandelen in de wildernis",
        icon: "footprints",
        intro: "Sneeuwschoenwandelen is een makkelijke manier om de Laplandse natuur te verkennen zonder ski-ervaring.",
        items: [
          "Begeleide tochten in nationale parken",
          "Zelfgeleide routes op gemarkeerde paden",
          "Vaak gecombineerd met koffiepauze en kampvuur",
          "Geschikt voor alle fitnessniveaus"
        ]
      },
      fatBiking: {
        title: "Fatbiken in de sneeuw",
        icon: "bike",
        intro: "Fatbiken is een leuke manier om de routes van Levi in de winter te verkennen.",
        items: [
          "Te huur in het centrum van Levi",
          "Gemarkeerde fatbike-routes",
          "Begeleide tochten beschikbaar",
          "Geschikt voor alle niveaus"
        ]
      },
      connecting: {
        title: "Activiteiten en accommodatie combineren",
        intro: "Combineer activiteiten met comfortabele accommodatie voor de beste Lapland-ervaring.",
        tips: [
          "Onze accommodaties liggen dichtbij de pistes en safari-vertrekpunten",
          "Eigen sauna om te ontspannen na een actieve dag",
          "Droogruimte voor natte kleding",
          "Vanuit het centrum bereik je alle activiteiten gemakkelijk"
        ]
      },
      faq: {
        title: "Veelgestelde vragen",
        items: [
          {
            q: "Welke activiteiten zijn geschikt voor gezinnen met kinderen?",
            a: "Bijna alles! Rendierfarmbezoeken, korte huskysafari's, kinderskischool en sneeuwschoenwandelen zijn uitstekend voor gezinnen. Veel operators bieden kinderzitjes en speciale maten."
          },
          {
            q: "Moet ik activiteiten van tevoren boeken?",
            a: "Ja, vooral tijdens piekperiodes (kerstvakantie, krokusvakantie, Pasen). Populaire safari's en skischolen raken snel vol. We raden aan minstens een week van tevoren te boeken."
          },
          {
            q: "Zijn er activiteiten in de donkere decembermaand?",
            a: "Ja! Veel activiteiten zijn juist extra sfeervol tijdens de poolnacht. Lantaarns, vuur en noorderlicht creëren een unieke sfeer. Het skigebied is verlicht."
          },
          {
            q: "Wat is inbegrepen bij safari-prijzen?",
            a: "Meestal thermische kleding (overall, helm, handschoenen), begeleiding en vaak warme dranken/snacks. Controleer altijd bij de operator vóór boeking."
          }
        ]
      }
    },
    cta: {
      title: "Boek accommodatie dichtbij de activiteiten",
      text: "Onze accommodaties liggen dichtbij alle activiteiten. Geniet van de perfecte Lapland-vakantie in een comfortabel appartement.",
      button: "Bekijk accommodaties"
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Huskysafari in Levi", desc: "Tips en wat je moet weten", href: "/nl/activiteiten/husky-safari-levi" },
        { title: "Skiën in Levi", desc: "43 pistes en 28 liften", href: "/nl/gids/skieen-in-levi" },
        { title: "Winterkleding", desc: "Wat trek je aan bij -30°C?", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Accommodaties", desc: "Chalets en appartementen in Levi", href: "/nl/accommodaties" }
      ]
    },
    relatedTitle: "Lees ook",
    relatedLinks: [
      { text: "Winterkleding voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
      { text: "Huskysafari in Levi", href: "/nl/activiteiten/husky-safari-levi" },
      { text: "Hoe kom je in Levi", href: "/nl/gids/hoe-kom-je-in-levi" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/nl" },
      { label: "Activiteiten in Levi", href: "/nl/gids/activiteiten-in-levi" },
      { label: "Winteractiviteiten", href: "/nl/activiteiten/winteractiviteiten-levi" }
    ],
    activitiesHubLink: "/nl/gids/activiteiten-in-levi",
    activitiesHubText: "← Terug naar activiteitengids",
    accommodationsHref: "/nl/accommodaties"
  }
};

const TopWinterActivities = ({ lang = "fi" }: TopWinterActivitiesProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;
  
  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/parhaat-talviaktiviteetit-levi",
    en: "https://leville.net/activities/top-winter-activities-in-levi-lapland",
    nl: "https://leville.net/nl/activiteiten/winteractiviteiten-levi",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "mountain": return <Mountain className="w-6 h-6" />;
      case "dog": return <Dog className="w-6 h-6" />;
      case "treepine": return <TreePine className="w-6 h-6" />;
      case "fish": return <Fish className="w-6 h-6" />;
      case "footprints": return <Footprints className="w-6 h-6" />;
      case "bike": return <Bike className="w-6 h-6" />;
      case "heart": return <Heart className="w-6 h-6" />;
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

      <HreflangTags 
        currentPath={location.pathname}
        customUrls={hreflangUrls}
      />

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

          {/* Skiing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.skiing.icon)}
              <span className="text-primary">{t.sections.skiing.title}</span>
            </h2>
            <p className="text-foreground/80 mb-6">{t.sections.skiing.intro}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {t.sections.skiing.subsections.map((sub, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">{sub.title}</h3>
                    <ul className="space-y-2 text-sm">
                      {sub.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Cross-Country Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.crossCountry.icon)}
              <span className="text-primary">{t.sections.crossCountry.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.crossCountry.intro}</p>
            <ul className="space-y-2">
              {t.sections.crossCountry.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Husky Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.husky.icon)}
              <span className="text-primary">{t.sections.husky.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.husky.intro}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {t.sections.husky.options.map((option, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{option.name}</h3>
                    <p className="text-sm text-foreground/80">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm bg-primary/10 p-4 rounded-lg">
              💡 {t.sections.husky.tip}
            </p>
          </section>

          {/* Reindeer Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.reindeer.icon)}
              <span className="text-primary">{t.sections.reindeer.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.reindeer.intro}</p>
            <div className="space-y-4">
              {t.sections.reindeer.options.map((option, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-primary mb-2">{option.name}</h3>
                    <p className="text-sm text-foreground/80">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Ice Fishing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.iceFishing.icon)}
              <span className="text-primary">{t.sections.iceFishing.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.iceFishing.intro}</p>
            <ul className="space-y-2">
              {t.sections.iceFishing.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Snowshoeing Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.snowshoeing.icon)}
              <span className="text-primary">{t.sections.snowshoeing.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.snowshoeing.intro}</p>
            <ul className="space-y-2">
              {t.sections.snowshoeing.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Fat Biking Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {getIcon(t.sections.fatBiking.icon)}
              <span className="text-primary">{t.sections.fatBiking.title}</span>
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.fatBiking.intro}</p>
            <ul className="space-y-2">
              {t.sections.fatBiking.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Connecting Activities */}
          <section className="mb-12 bg-primary/5 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t.sections.connecting.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.connecting.intro}</p>
            <ul className="space-y-2">
              {t.sections.connecting.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-foreground/80">{tip}</span>
                </li>
              ))}
            </ul>
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

          <GuideDisclaimer lang={lang} />

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

      <PageCTA lang={lang} />

      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default TopWinterActivities;
