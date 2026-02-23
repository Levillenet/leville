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
import { Baby, Mountain, Shirt, Home, UtensilsCrossed, Shield, Snowflake, Heart } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LeviWithChildrenProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Lapsiperheet Levillä – Lasten rinteet, aktiviteetit | Leville.net",
      description:
        "Levi lapsiperheille: lasten rinteet, hiihtokoulu, talvivaatetus, sisäaktiviteetit ja perheystävälliset palvelut. Käytännön vinkit perhematkalle.",
      canonical: "https://leville.net/opas/lapsiperheet-levilla",
    },
    title: "Lapsiperheet Levillä",
    subtitle: "Lasten rinteet, aktiviteetit ja käytännön vinkit perhematkalle",
    intro:
      "Levi on erinomainen talvilomakohde lapsiperheille. Turvallisista lastenrinteistä lämpimiin sisätiloihin, hiihtokoulusta huskyajeluihin – tässä oppaassa kaikki mitä tarvitset perhematkasi suunnitteluun.",
    sections: {
      slopes: {
        title: "Lasten rinteet ja hiihtokoulu",
        icon: "mountain",
        intro: "Levillä on erinomaiset fasiliteetit lapsille oppia laskettelua:",
        items: [
          {
            title: "Leevilandia Snow Park",
            desc: "Lasten oma alue helpoilla eteläpuolen rinteillä , liukumäillä ja Leevilandia -teemalla. Turvallinen ympäristö ensimmäisille laskuille.",
          },
          {
            title: "Lasten hiihtokoulu",
            desc: "Levi Ski School tarjoaa opetusta 3-vuotiaasta alkaen. Ryhmä- ja yksityistunnit saatavilla. Ammattitaitoiset opettajat ja pienet ryhmäkoot.",
          },
          {
            title: "Taikamatto-hissit",
            desc: "Helppokäyttöiset taikamatto-hissit lasten rinteillä – ei isoja hissejä pienille laskijoille.",
          },
          {
            title: "Kids' Club -palvelut",
            desc: "Päivähoito- ja aktiviteettipalvelut lapsille, kun vanhemmat haluavat laskea omia rinteitä.",
          },
        ],
        tip: "Varaa hiihtokoulupaikka etukäteen sesonkiaikana – suosituimmat ajat täyttyvät nopeasti.",
      },
      clothing: {
        title: "Talvivaatetus lapsille",
        icon: "shirt",
        intro: "Lasten pukeminen Lapin talveen vaatii erityishuomiota:",
        layers: [
          {
            name: "Aluskerros",
            items: ["Merinovilla- tai synteettinen alusasu", "Villasukat – ei puuvillaa!", "Ohut pipo kypärän alle"],
          },
          {
            name: "Välikerros",
            items: ["Fleece- tai villatakki", "Fleece-housut tai villa-alusasu"],
          },
          {
            name: "Päällyskerros",
            items: [
              "Vedenpitävä toppahaalari tai takki + housut",
              "Lämpöhanskat (sormihansikat vaikeampia pienille)",
              "Tuubihuivi kasvosuojaksi",
            ],
          },
        ],
        tips: [
          "Vältä puuvillaa – se imee kosteutta ja viilentää",
          "Pakkaa varasukat ja käsineet mukaan aina",
          "Lapset jäätyvät helpommin kuin aikuiset – pidä taukoja lämpimässä",
          "Käytä UV-suojavoitetta aurinkoisena päivänä – lumi heijastaa voimakkaasti",
        ],
      },
      indoor: {
        title: "Sisäaktiviteetit kylminä päivinä",
        icon: "home",
        intro: "Kun pakkanen paukkuu tai kaipaat taukoa ulkoilusta, Levillä on paljon sisäaktiviteetteja:",
        activities: [
          {
            name: "Levin kylpylä & Spa",
            desc: "Uima-altaat, vesiliukumäet ja lastenallas. Rentouttava myös vanhemmille.",
          },
          { name: "Sisäleikkipaikat", desc: "Hullu Poro Arenalla ja hotelleissa leikkipaikkoja lapsille." },
          { name: "Elokuvateatterit", desc: "Levin keskustassa elokuvanäytöksiä – tarkista ohjelma." },
          { name: "Käsityöpajat", desc: "Saamelaisia käsitöitä ja askartelupajoja turistikeskuksessa." },
          { name: "Leivontakurssit", desc: "Piparkakkujen leipomista ja lappalaisia herkkuja lapsille." },
        ],
      },
      activities: {
        title: "Talviaktiviteetit perheille",
        icon: "snowflake",
        intro: "Aktiviteetteja, joissa koko perhe voi nauttia yhdessä:",
        items: [
          {
            name: "Porofarmivierailut",
            desc: "Tapaa poroja läheltä, syötä niitä ja aja lyhyt rekiretki. Sopii kaikenikäisille.",
          },
          {
            name: "Huskysafarit lapsille",
            desc: "Lyhyet 30–60 min safarit sopivat perheille. Lapset voivat matkustaa aikuisen kyydissä.",
          },
          {
            name: "Pulkkamäet",
            desc: "Ilmaisia pulkkamäkiä ympäri Leviä. Vuokraa pulkka tai tuo oma.",
          },
          {
            name: "Lumiveistokset",
            desc: "Lumilinnan ja jääveistosten rakentaminen – hauskaa koko perheelle.",
          },
          {
            name: "Revontulisafarit",
            desc: "Iltatunneilla lapsetkin voivat osallistua. Valitse lyhyempi retki perheille.",
          },
        ],
      },
      stroller: {
        title: "Rattaat ja vauvalogistiikka",
        icon: "baby",
        intro: "Vauvojen ja taaperoiden kanssa matkustaminen vaatii valmistelua:",
        items: [
          "Talvikelkka/pulkka: Toimii paremmin kuin rattaat lumessa. Vuokrattavissa tai ostettavissa Leviltä.",
          "Matkasänky: Kysy majoitukselta – usein saatavilla ilmaiseksi.",
          "Syöttötuolit: Kaikissa perheravintoloissa saatavilla.",
          "Vaipat ja lastenruoat: K-Market ja Sale tarjoavat perustarpeet.",
          "Lämmitys: Majoituksissamme on lattialämmitys ja hyvä lämmöneristys.",
        ],
        tip: "Varaa riittävästi aikaa pukemiseen ja lämpimiin taukoihin – pienet lapset väsyvät nopeammin kylmässä.",
      },
      restaurants: {
        title: "Perheystävälliset ravintolat",
        icon: "utensils",
        intro: "Levillä on useita ravintoloita, jotka palvelevat lapsiperheitä hyvin:",
        items: [
          { name: "Hullu Poro", note: "Laaja lastenruokalista, syöttötuolit, leikkitila. Tunnelmallinen mutta rento." },
          { name: "Colorado Bar & Grill", note: "Hampurilaiset ja pizzat. Lapsiystävällinen palvelu." },
          { name: "Levin Panimo", note: "Perinteistä suomalaista ruokaa, lasten annokset saatavilla." },
          { name: "Pizza-Kebab Levi", note: "Edullinen vaihtoehto, noutomyynti majoitukseen." },
        ],
        tip: "Varaa pöytä etukäteen illallisille, erityisesti viikonloppuisin ja sesonkiaikoina.",
      },
      safety: {
        title: "Turvallisuus ja käytännön vinkit",
        icon: "shield",
        intro: "Turvallisuusvinkkejä lapsiperheille:",
        items: [
          "Kypärät pakollisia lapsille rinteessä – ja aikuisille suositeltavat",
          "Tunne lapsesi rajat – pidä taukoja ennen väsymystä",
          "Pidä lapsen henkilötiedot ja majoituksen yhteystiedot mukana",
          "Opeta lapselle, mitä tehdä jos eksyy – mene hissille tai ski patrol -pisteelle",
          "Aurinkolasit tai laskettelulasit suojaavat silmiä lumisokeutumiselta",
          "Hypotermiavaara: Jos lapsi tärisee tai lakkaa tärisemästä, vie sisälle välittömästi",
        ],
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Minkä ikäisenä lapsi voi aloittaa laskettelun?",
            a: "Levin hiihtokoulussa opetetaan 3-vuotiaasta alkaen. Nuoremmille sopivat pulkkamäet ja leikkiminen lumessa. Angry Birds Snow Park on turvallinen ympäristö pienimmillekin.",
          },
          {
            q: "Voiko vauvan kanssa osallistua safareille?",
            a: "Riippuu safarista. Porofarmivierailut sopivat usein vauvoille kantoliinan tai pulkan kanssa. Moottorikelkkasafarit eivät yleensä sovi alle 4-vuotiaille.",
          },
          {
            q: "Miten puen lapsen -20°C pakkaseen?",
            a: "Kerrospukeutuminen: merinovillaiset alusvaatteet, fleece-välikerros, vedenpitävä toppahaalari. Pidä varavaatteita mukana ja tarkkaile lapsen vointia.",
          },
          {
            q: "Onko Levillä lastenhoitopalveluita?",
            a: "Kyllä. Levin hiihtokoulun Kids' Club tarjoaa hoitopalveluita. Myös jotkut hotellit ja safari-operaattorit tarjoavat lastenhoitoa. Varaa etukäteen.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa perheystävällinen majoitus",
      text: "Tilava majoitus keskustan tuntumassa, lattialämmityksellä ja kuivaushuoneella. Täydellinen perheille.",
      button: "Katso majoitukset",
    },
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      { text: "Ravintolat ja palvelut", href: "/opas/ravintolat-ja-palvelut-levilla" },
      { text: "Parhaat talviaktiviteetit", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Lapsiperheet Levillä", href: "/opas/lapsiperheet-levilla" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    travelHubText: "← Takaisin matkaoppaaseen",
    accommodationsHref: "/majoitukset",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Laskettelu Levillä", desc: "Lasten rinteet ja hissit", href: "/opas/laskettelu-levi" },
        { title: "Koiravaljakkoajelu", desc: "Elämys koko perheelle", href: "/aktiviteetit/koiravaljakkoajelu-levi" },
        { title: "Talvivarusteet", desc: "Lasten pukeutuminen pakkaseen", href: "/opas/talvivarusteet-leville" },
        { title: "Ravintolat ja palvelut", desc: "Perheystävälliset ravintolat", href: "/opas/ravintolat-ja-palvelut-levilla" },
      ],
    },
  },
  en: {
    meta: {
      title: "Levi with Children – Kids' Slopes, Activities | Leville.net",
      description:
        "Levi for families: kids' slopes, ski school, winter clothing, indoor activities and family-friendly services. Practical tips for family trips.",
      canonical: "https://leville.net/guide/levi-with-children",
    },
    title: "Levi with Children",
    subtitle: "Kids' slopes, activities and practical tips for family trips",
    intro:
      "Levi is an excellent winter holiday destination for families. From safe children's slopes to warm indoor spaces, ski school to husky rides – this guide covers everything you need for planning your family trip.",
    sections: {
      slopes: {
        title: "Kids' Slopes and Ski School",
        icon: "mountain",
        intro: "Levi has excellent facilities for children to learn skiing:",
        items: [
          {
            title: "Leevilandia Snow Park",
            desc: "Children's own area with easy slopes at South point, slides and Leevilandia theme. Safe environment for first runs.",
          },
          {
            title: "Children's Ski School",
            desc: "Levi Ski School offers lessons from age 3. Group and private lessons available. Professional instructors and small group sizes.",
          },
          {
            title: "Magic Carpet Lifts",
            desc: "Easy-to-use magic carpet lifts at children's slopes – no big lifts for small skiers.",
          },
          {
            title: "Kids' Club Services",
            desc: "Daycare and activity services for children when parents want to ski their own slopes.",
          },
        ],
        tip: "Book ski school in advance during peak season – popular times fill up quickly.",
      },
      clothing: {
        title: "Winter Clothing for Children",
        icon: "shirt",
        intro: "Dressing children for Lapland winter requires special attention:",
        layers: [
          {
            name: "Base Layer",
            items: ["Merino wool or synthetic base layer", "Wool socks – no cotton!", "Thin beanie under helmet"],
          },
          {
            name: "Mid Layer",
            items: ["Fleece or wool jacket", "Fleece pants or wool base layer"],
          },
          {
            name: "Outer Layer",
            items: [
              "Waterproof insulated snowsuit or jacket + pants",
              "Warm mittens (finger gloves harder for small ones)",
              "Neck gaiter for face protection",
            ],
          },
        ],
        tips: [
          "Avoid cotton – it absorbs moisture and cools down",
          "Pack extra socks and gloves always",
          "Children freeze easier than adults – take warm-up breaks",
          "Use UV protection on sunny days – snow reflects strongly",
        ],
      },
      indoor: {
        title: "Indoor Activities for Cold Days",
        icon: "home",
        intro: "When it's freezing or you need a break from outdoors, Levi has plenty of indoor activities:",
        activities: [
          {
            name: "Levi Spa & Pool",
            desc: "Swimming pools, water slides and children's pool. Relaxing for parents too.",
          },
          { name: "Indoor Play Areas", desc: "Play areas for children at Hullu Poro Arena and hotels." },
          { name: "Movie Theaters", desc: "Movie showings in Levi center – check schedule." },
          { name: "Craft Workshops", desc: "Sámi crafts and art workshops at tourist center." },
          { name: "Baking Classes", desc: "Gingerbread baking and Lappish treats for children." },
        ],
      },
      activities: {
        title: "Winter Activities for Families",
        icon: "snowflake",
        intro: "Activities where the whole family can enjoy together:",
        items: [
          {
            name: "Reindeer Farm Visits",
            desc: "Meet reindeer up close, feed them and take a short sleigh ride. Suitable for all ages.",
          },
          {
            name: "Husky Safaris for Children",
            desc: "Short 30–60 min safaris suit families. Children can ride with adult.",
          },
          {
            name: "Sledding Hills",
            desc: "Free sledding hills around Levi. Rent a sled or bring your own.",
          },
          {
            name: "Snow Sculptures",
            desc: "Building snow castles and ice sculptures – fun for the whole family.",
          },
          {
            name: "Northern Lights Safaris",
            desc: "Evening hours children can participate too. Choose shorter trip for families.",
          },
        ],
      },
      stroller: {
        title: "Strollers and Baby Logistics",
        icon: "baby",
        intro: "Traveling with babies and toddlers requires preparation:",
        items: [
          "Winter sled/pulka: Works better than strollers in snow. Rentable or purchasable in Levi.",
          "Travel cot: Ask your accommodation – often available free of charge.",
          "High chairs: Available at all family restaurants.",
          "Diapers and baby food: K-Market and Sale offer basic supplies.",
          "Heating: Our accommodations have floor heating and good insulation.",
        ],
        tip: "Allow extra time for dressing and warm-up breaks – small children tire faster in cold.",
      },
      restaurants: {
        title: "Family-Friendly Restaurants",
        icon: "utensils",
        intro: "Levi has several restaurants that serve families well:",
        items: [
          { name: "Hullu Poro", note: "Extensive children's menu, high chairs, play area. Atmospheric but relaxed." },
          { name: "Colorado Bar & Grill", note: "Burgers and pizzas. Family-friendly service." },
          { name: "Levin Panimo", note: "Traditional Finnish food, children's portions available." },
          { name: "Pizza-Kebab Levi", note: "Affordable option, take-away to accommodation." },
        ],
        tip: "Book a table in advance for dinners, especially on weekends and during peak season.",
      },
      safety: {
        title: "Safety and Practical Tips",
        icon: "shield",
        intro: "Safety tips for families with children:",
        items: [
          "Helmets mandatory for children on slopes – recommended for adults too",
          "Know your child's limits – take breaks before fatigue",
          "Keep child's personal info and accommodation contacts with you",
          "Teach child what to do if lost – go to lift or ski patrol station",
          "Sunglasses or ski goggles protect eyes from snow blindness",
          "Hypothermia risk: If child shivers or stops shivering, get indoors immediately",
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "At what age can a child start skiing?",
            a: "Levi ski school teaches from age 3. Younger children can enjoy sledding hills and playing in snow. Angry Birds Snow Park is a safe environment for the smallest ones.",
          },
          {
            q: "Can you participate in safaris with a baby?",
            a: "Depends on the safari. Reindeer farm visits often suit babies with carrier or sled. Snowmobile safaris usually don't suit under 4-year-olds.",
          },
          {
            q: "How do I dress a child for -20°C?",
            a: "Layer dressing: merino wool base layers, fleece mid-layer, waterproof insulated snowsuit. Keep spare clothes and monitor child's condition.",
          },
          {
            q: "Is there childcare in Levi?",
            a: "Yes. Levi Ski School's Kids' Club offers care services. Some hotels and safari operators also offer childcare. Book in advance.",
          },
        ],
      },
    },
    cta: {
      title: "Book Family-Friendly Accommodation",
      text: "Spacious accommodation near center with floor heating and drying room. Perfect for families.",
      button: "View Accommodations",
    },
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "Winter Clothing for Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      { text: "Restaurants and Services", href: "/guide/restaurants-and-services-in-levi" },
      { text: "Top Winter Activities", href: "/activities/top-winter-activities-in-levi-lapland" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Levi with Children", href: "/guide/levi-with-children" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    travelHubText: "← Back to Travel Guide",
    accommodationsHref: "/en/accommodations",
    readNext: {
      title: "Read Next",
      links: [
        { title: "Skiing in Levi", desc: "Kids' slopes and lifts", href: "/guide/skiing-in-levi" },
        { title: "Husky Safari", desc: "An experience for the whole family", href: "/activities/husky-safari-levi" },
        { title: "Winter Clothing", desc: "Dressing kids for the cold", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Restaurants & Services", desc: "Family-friendly dining", href: "/guide/restaurants-and-services-in-levi" },
      ],
    },
  },
  nl: {
    meta: {
      title: "Levi met kinderen – Gezinstips voor Lapland vakantie | Leville.net",
      description: "Praktische tips voor een gezinsvakantie in Levi. Kinderpistes, Leevilandia, gezinsactiviteiten, restaurants en accommodatietips voor families.",
      canonical: "https://leville.net/nl/gids/levi-met-kinderen",
    },
    title: "Levi met kinderen",
    subtitle: "Kinderpistes, activiteiten en praktische tips voor je gezinsvakantie",
    intro: "Levi is een uitstekende wintervakantiebestemming voor gezinnen. Van veilige kinderpistes tot warme binnenruimtes, skischool tot huskysafari's – deze gids behandelt alles wat je nodig hebt voor het plannen van je gezinsvakantie. Let op: tijdens de krokusvakantie is het piekseizoen, dus boek op tijd. Maar februari heeft meer daglicht dan december!",
    sections: {
      slopes: {
        title: "Kinderpistes en skischool",
        icon: "mountain",
        intro: "Levi heeft uitstekende faciliteiten voor kinderen om te leren skiën:",
        items: [
          {
            title: "Kids' Land bij frontpistes",
            desc: "Veilige sleeheuvel, overdekte magic carpet-lift en kota met open haard. Ideaal voor de kleinsten.",
          },
          {
            title: "Leevilandia bij Zuid-pistes",
            desc: "Sneeuwspeelgebied met overdekte carpet-liften en kampvuurplek voor marshmallows roosteren.",
          },
          {
            title: "Kinderskischool",
            desc: "Levi Ski School biedt lessen vanaf 3 jaar. Groeps- en privélessen beschikbaar. Professionele instructeurs en kleine groepen.",
          },
          {
            title: "Leevi's Playground",
            desc: "Overdekt speelgebied voor als het te koud is buiten. Leuk alternatief op extreem koude dagen.",
          },
        ],
        tip: "Boek skischoollessen op tijd tijdens piekseizoen – populaire tijden raken snel vol.",
      },
      clothing: {
        title: "Winterkleding voor kinderen",
        icon: "shirt",
        intro: "Kinderen aankleden voor de Laplandse winter vereist extra aandacht. Een extra laag meer dan volwassenen!",
        layers: [
          {
            name: "Basislaag",
            items: ["Merinowollen of thermische onderkleding", "Wollen sokken – geen katoen!", "Dun mutsje onder helm"],
          },
          {
            name: "Tussenlaag",
            items: ["Fleece- of wollen vest", "Fleece broek of wollen onderlaag"],
          },
          {
            name: "Buitenlaag",
            items: [
              "Waterdicht skipak of jas + broek",
              "Warme wanten (vingerhandschoenen zijn lastig voor kleintjes)",
              "Nekwarmer/buff voor gezichtsbescherming bij wind",
            ],
          },
        ],
        tips: [
          "Vermijd katoen – het absorbeert vocht en koelt af",
          "Neem altijd extra sokken en handschoenen mee",
          "Kinderen worden sneller koud dan volwassenen – neem opwarmpauzes",
          "Gebruik UV-bescherming op zonnige dagen – sneeuw reflecteert sterk",
        ],
      },
      indoor: {
        title: "Binnenactiviteiten voor koude dagen",
        icon: "home",
        intro: "Als het te koud is of je een pauze wilt van buiten, heeft Levi genoeg binnenactiviteiten:",
        activities: [
          { name: "Levi Spa & Zwembad", desc: "Zwembaden, waterglijbanen en kinderbad. Ontspannend voor ouders ook." },
          { name: "Binnenspeelplaatsen", desc: "Speelruimtes voor kinderen bij Hullu Poro Arena (bowling + restaurant) en hotels." },
          { name: "Bioscoop", desc: "Filmvertoningen in het centrum van Levi – check het programma." },
          { name: "Workshoppen", desc: "Samische ambachten en knutselworkshops bij het toeristencentrum." },
          { name: "Bakcursussen", desc: "Koekjes bakken en Laplandse lekkernijen voor kinderen." },
        ],
      },
      activities: {
        title: "Winteractiviteiten voor gezinnen",
        icon: "snowflake",
        intro: "Activiteiten waar het hele gezin samen van kan genieten:",
        items: [
          { name: "Rendierfarmbezoek", desc: "Ontmoet rendieren van dichtbij, voer ze en maak een korte sledetocht. Geschikt voor alle leeftijden." },
          { name: "Huskysafari's voor kinderen", desc: "Korte 30-60 min safari's geschikt voor gezinnen. Kinderen rijden mee met een volwassene." },
          { name: "Sleeheuvels", desc: "Gratis sleeheuvels door heel Levi. Huur een slee of neem je eigen mee." },
          { name: "Sneeuwsculpturen", desc: "Sneeuwkastelen en ijssculpturen bouwen – leuk voor het hele gezin." },
          { name: "Noorderlicht-safari's", desc: "In de avonduren kunnen kinderen ook meedoen. Kies een kortere tocht voor gezinnen." },
        ],
      },
      stroller: {
        title: "Kinderwagens en babylogistiek",
        icon: "baby",
        intro: "Reizen met baby's en peuters vereist voorbereiding:",
        items: [
          "Kinderwagens werken niet in de sneeuw! Gebruik een pulka (slee) – sommige accommodaties lenen ze uit.",
          "Reiswieg: Vraag je accommodatie – vaak gratis beschikbaar.",
          "Kinderstoelen: Beschikbaar bij alle gezinsrestaurants.",
          "Luiers en babyvoeding: K-Market en Sale bieden basisbenodigdheden.",
          "Verwarming: Onze accommodaties hebben vloerverwarming en goede isolatie – ideaal om kinderen op te warmen na buitenactiviteiten.",
        ],
        tip: "Neem extra tijd voor het aankleden en opwarmpauzes – kleine kinderen worden sneller moe in de kou.",
      },
      restaurants: {
        title: "Gezinsvriendelijke restaurants",
        icon: "utensils",
        intro: "Levi heeft meerdere restaurants die gezinnen goed bedienen:",
        items: [
          { name: "Café Kiisa", note: "Gezellig café met kindermenu. Lekkere taarten en warme dranken." },
          { name: "Hullu Poro Arena", note: "Bowling + restaurant. Uitgebreid kindermenu, kinderstoelen, speelruimte." },
          { name: "Colorado Bar & Grill", note: "Hamburgers en pizza's. Kindvriendelijke bediening." },
          { name: "Pizza-Kebab Levi", note: "Betaalbare optie, afhalen naar de accommodatie mogelijk." },
        ],
        tip: "Reserveer een tafel voor het avondeten, vooral in het weekend en tijdens piekseizoen.",
      },
      safety: {
        title: "Veiligheid en praktische tips",
        icon: "shield",
        intro: "Veiligheidstips voor gezinnen met kinderen:",
        items: [
          "Helmen verplicht voor kinderen op de piste – ook aanbevolen voor volwassenen",
          "Ken de grenzen van je kind – neem pauzes voordat ze moe worden",
          "Houd contactgegevens van de accommodatie bij je kind",
          "Leer je kind wat te doen als het verdwaalt – ga naar de lift of ski patrol-punt",
          "Zonnebril of skibril beschermt ogen tegen sneeuwblindheid",
          "Onderkoelingsrisico: Als je kind rilt of stopt met rillen, ga onmiddellijk naar binnen",
        ],
      },
      faq: {
        title: "Veelgestelde vragen",
        items: [
          {
            q: "Vanaf welke leeftijd kan een kind beginnen met skiën?",
            a: "De skischool van Levi geeft les vanaf 3 jaar. Jongere kinderen kunnen genieten van sleeheuvels en spelen in de sneeuw. Leevilandia is een veilige omgeving voor de allerkleinsten.",
          },
          {
            q: "Kun je met een baby op safari?",
            a: "Dat hangt af van de safari. Rendierfarmbezoeken zijn vaak geschikt voor baby's met draagzak of slee. Sneeuwscootersafari's zijn meestal niet geschikt voor kinderen onder de 4 jaar.",
          },
          {
            q: "Hoe kleed ik mijn kind aan voor -20°C?",
            a: "Lagenprincipe: merinowollen onderkleding, fleece tussenlaag, waterdicht skipak. Neem reservekleding mee en houd de conditie van je kind in de gaten.",
          },
          {
            q: "Is er kinderopvang in Levi?",
            a: "Ja. De Kids' Club van Levi Ski School biedt opvangdiensten. Sommige hotels en safari-operators bieden ook kinderopvang. Boek van tevoren.",
          },
        ],
      },
    },
    cta: {
      title: "Boek gezinsvriendelijke accommodatie",
      text: "Ruime accommodatie dichtbij het centrum met vloerverwarming en droogruimte. Perfect voor gezinnen.",
      button: "Bekijk accommodaties",
    },
    relatedTitle: "Lees ook",
    relatedLinks: [
      { text: "Winterkleding voor Levi", href: "/nl/gids/winterkleding-levi-lapland" },
      { text: "Winteractiviteiten in Levi", href: "/nl/activiteiten/winteractiviteiten-levi" },
      { text: "Huskysafari in Levi", href: "/nl/activiteiten/husky-safari-levi" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/nl" },
      { label: "Reisgids", href: "/nl/gids/reisgids-levi" },
      { label: "Levi met kinderen", href: "/nl/gids/levi-met-kinderen" },
    ],
    travelHubLink: "/nl/gids/reisgids-levi",
    travelHubText: "← Terug naar reisgids",
    accommodationsHref: "/nl/accommodaties",
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Huskysafari", desc: "Een avontuur voor het hele gezin", href: "/nl/activiteiten/husky-safari-levi" },
        { title: "Winteractiviteiten", desc: "Alle activiteiten in Levi", href: "/nl/activiteiten/winteractiviteiten-levi" },
        { title: "Winterkleding", desc: "Kinderen aankleden voor de kou", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Accommodaties", desc: "Chalets en appartementen in Levi", href: "/nl/accommodaties" },
      ],
    },
  },
};

const LeviWithChildren = ({ lang = "fi" }: LeviWithChildrenProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/opas/lapsiperheet-levilla",
    en: "https://leville.net/guide/levi-with-children",
    nl: "https://leville.net/nl/gids/levi-met-kinderen",
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

          {/* Kids' Slopes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Mountain className="w-6 h-6 text-primary" />
              {t.sections.slopes.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.slopes.intro}</p>
            <div className="space-y-4 mb-4">
              {t.sections.slopes.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>💡 Vinkki:</strong> {t.sections.slopes.tip}
              </p>
            </div>
          </section>

          {/* Clothing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shirt className="w-6 h-6 text-primary" />
              {t.sections.clothing.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.clothing.intro}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {t.sections.clothing.layers.map((layer, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 text-primary">{layer.name}</h3>
                    <ul className="space-y-1">
                      {layer.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="bg-amber-500/10 p-4 rounded-lg">
              <ul className="space-y-1">
                {t.sections.clothing.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-foreground/80">
                    ⚠️ {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Indoor Activities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-primary" />
              {t.sections.indoor.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.indoor.intro}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {t.sections.indoor.activities.map((activity, index) => (
                <div key={index} className="bg-card/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-1">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Family Activities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.activities.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.activities.intro}</p>
            <div className="space-y-3">
              {t.sections.activities.items.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Baby Logistics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Baby className="w-6 h-6 text-primary" />
              {t.sections.stroller.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.stroller.intro}</p>
            <ul className="space-y-2 mb-4">
              {t.sections.stroller.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>💡 Vinkki:</strong> {t.sections.stroller.tip}
              </p>
            </div>
          </section>

          {/* Family Restaurants */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              {t.sections.restaurants.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.restaurants.intro}</p>
            <div className="space-y-3 mb-4">
              {t.sections.restaurants.items.map((item, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>💡 Vinkki:</strong> {t.sections.restaurants.tip}
              </p>
            </div>
          </section>

          {/* Safety */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              {t.sections.safety.title}
            </h2>
            <p className="text-foreground/80 mb-4">{t.sections.safety.intro}</p>
            <div className="bg-amber-500/10 p-4 rounded-lg">
              <ul className="space-y-2">
                {t.sections.safety.items.map((item, index) => (
                  <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="text-amber-500">⚠️</span>
                    {item}
                  </li>
                ))}
              </ul>
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

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

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
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default LeviWithChildren;
