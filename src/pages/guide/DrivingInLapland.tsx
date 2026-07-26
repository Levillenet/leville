import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import {
  getWebsiteSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Car,
  Snowflake,
  AlertTriangle,
  Phone,
  MapPin,
  Fuel,
  Thermometer,
  ShieldCheck,
} from "lucide-react";

const year = new Date().getFullYear();

const FI_URL = "https://leville.net/opas/autolla-ajaminen-lapissa";
const EN_URL = "https://leville.net/guide/driving-in-lapland";

const iconMap = {
  snow: Snowflake,
  shield: ShieldCheck,
  alert: AlertTriangle,
  thermo: Thermometer,
  map: MapPin,
  phone: Phone,
  car: Car,
} as const;

type IconKey = keyof typeof iconMap;

interface Section {
  id: string;
  icon: IconKey;
  title: string;
  items: string[];
}

interface Content {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  intro: string;
  faqLabel: string;
  faqNav: string;
  sections: Section[];
  faqs: { question: string; answer: string }[];
  breadcrumbs: { label: string; href: string }[];
  readNextTitle: string;
  readNext: { title: string; desc: string; href: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaHref: string;
}

const content: Record<"fi" | "en", Content> = {
  fi: {
    title: `Autolla ajaminen Lapissa ${year} — talvivinkit & turvallisuus`,
    description:
      "Talvirenkaat, porot tiellä, lohkolämmitin ja etäisyydet — käytännön opas autoiluun Lapissa ja Leville. Paikallisten vinkit pakkasajoon.",
    canonical: FI_URL,
    h1: `Autolla ajaminen Lapissa — talvivinkit ja turvallisuus ${year}`,
    intro:
      "Lapin autoilu eroaa eteläisestä Suomesta: pitkät etäisyydet, valaisemattomat tiet, porot ja kova pakkanen. Tässä paikallisten kokoama opas, jolla suunnittelet turvallisen ajomatkan Leville ja sen ympäristöön.",
    faqLabel: "Usein kysyttyä",
    faqNav: "UKK",
    sections: [
      {
        id: "tien-kunto",
        icon: "snow",
        title: "Tien kunto talvella",
        items: [
          "Tiet ovat usein lumi- tai polannepintaisia marraskuusta huhtikuuhun — täysin paljaita asfaltteja näkee harvoin.",
          "Mustaa jäätä esiintyy erityisesti syksyllä ja kevätauringossa sulamisen jälkeen yöllä — varo siltoja ja varjopaikkoja.",
          "Suurin osa Lapin teistä on valaisemattomia — kaukovalot ovat välttämättömät, mutta muista vaihtaa lähivaloihin vastaantulijalle.",
          "Kelirikko keväällä (huhti–toukokuu) voi tehdä pikkuteistä haastavia — pysy päätiellä jos epäilyttää.",
          "Tarkista ajantasainen tiesää: liikenne.fi tai Fintraffic-sovellus.",
        ],
      },
      {
        id: "renkaat",
        icon: "shield",
        title: "Renkaat ja varusteet",
        items: [
          "Talvirengaspakko Suomessa marraskuun alusta maaliskuun loppuun — käytännössä lokakuusta vapuksi.",
          "Nastarenkaat ovat sallittuja ja erittäin suositeltuja Lapissa — kitkarenkaat riittävät kaupungissa, mutta nastat ovat turvallisemmat tunturiteillä.",
          "Lumiketjuja ei normaalisti tarvita Suomessa — auton talvirenkaat hoitavat homman.",
          "Pidä mukana: lapio, kaavin, jäänsulatusneste, kasettilamppu, lämpimät vaatteet, juotavaa.",
          "Heijastinliivi ja varoituskolmio ovat pakollisia — sakko jos puuttuvat.",
        ],
      },
      {
        id: "porot",
        icon: "alert",
        title: "Porot ja muut eläimet tiellä",
        items: [
          "Lapissa on yli 200 000 vapaana laiduntavaa poroa — ne ovat selvästi yleisin onnettomuussyy.",
          "Riskialttiimpia ovat hämärä ja yö (15–22) sekä syksyn ja kevään siirtymäkaudet.",
          "Jos näet yhden poron, hidasta — niitä on yleensä useita lähistöllä.",
          "Älä tööttäile tai vilkuta kauempaa — hidas lähestyminen ja pysähtyminen on turvallisin.",
          "Hirven, peuran tai poron törmäys: pakollinen ilmoitus 112:een ja paliskunnalle. Jätä jäljet rauhaan ja merkitse paikka.",
          "Kasko-vakuutus kattaa eläinkolaria — tarkista vuokrasopimuksesta.",
        ],
      },
      {
        id: "pakkanen",
        icon: "thermo",
        title: "Pakkasvinkit autolle",
        items: [
          "Lohkolämmitin: kytke 1–3 tuntia ennen lähtöä (alle −10 °C). Yli −20 °C: 2–3 h riittää, ei tarvitse olla yötä päällä.",
          "Sisätilanlämmitin tekee aamut mukavammiksi — ei välttämätön, mutta arvokas −25 °C pakkasilla.",
          "Talvidiesel jaossa lokakuusta — kesädiesel jähmettyy −10…−15 °C jo. Tankkaa Suomesta ennen pohjoiseen ajoa jos tulet ulkomailta.",
          "Akku heikkenee pakkasella — jos auto seisoo viikon kovalla pakkasella ilman lämmitintä, varaa apukäynnistin.",
          "Älä jätä pulloa tai elektroniikkaa autoon yöksi — jäätyy.",
        ],
      },
      {
        id: "etaisyydet",
        icon: "map",
        title: "Etäisyydet ja ajoajat Levillä",
        items: [
          "Kittilän lentoasema → Levi: 15 km / noin 15 min.",
          "Rovaniemi → Levi: 170 km / noin 2 h 15 min.",
          "Oulu → Levi: 380 km / noin 4 h 30 min.",
          "Helsinki → Levi: 920 km / 11–13 h talvella (suositus: yöjuna autonkuljetuksella Kolariin, sieltä 80 km / 1 h Leville).",
          "Tankkaa täyteen aina ennen pitkää siirtymää — Lapissa huoltoasemavälit voivat olla 80–150 km.",
          "Kittilän, Levin ja Sirkan ABC/Neste-asemat ovat auki ympäri vuorokauden.",
        ],
      },
      {
        id: "hatatilanteet",
        icon: "phone",
        title: "Hätätilanteet ja yhteystiedot",
        items: [
          "Yleinen hätänumero: 112 (poliisi, ambulanssi, palokunta, tiepalvelu).",
          "Tieliikennekeskus / tieinfo: 0200 2100 (Fintraffic, 24/7).",
          "Tienhoitopäivystys ja tarkistettu tiesää: liikenne.fi.",
          "Lataa 112 Suomi -sovellus — paikantaa sinut automaattisesti hätäpuhelussa.",
          "Eläinkolari: 112 ja paliskunnan päivystäjä. Älä jätä loukkaantunutta eläintä jäljelle.",
          "Jos jäät jumiin: pysy autossa, pidä lämmitin päällä lyhyissä jaksoissa, varmista että pakoputki ei ole tukossa lumesta.",
        ],
      },
      {
        id: "vuokra-auto",
        icon: "car",
        title: "Vuokra-auton vinkit",
        items: [
          "Suurimmat toimijat Kittilän lentoasemalla: Avis, Hertz, Europcar, Sixt — kaikilla 4WD/SUV-vaihtoehtoja.",
          "Talvirenkaat sisältyvät automaattisesti suomalaiseen vuokraukseen — älä huolehdi siitä erikseen.",
          "Nelivetoa ei välttämättä tarvita — etuvetoinen auto talvirenkailla riittää valtaosaan tilanteita.",
          "Ota lisävakuutus / superkasko — kattaa yleensä eläinkolarin omavastuun.",
          "Lohkolämmitin yleensä mukana — kysy palautuspaikan kytkemisohjeet.",
          "Varaa hyvissä ajoin sesonkina (joulu–maaliskuu) — saatavuus vähenee nopeasti.",
        ],
      },
    ],
    faqs: [
      {
        question: "Tarvitsenko nelivedon Lapin teille?",
        answer:
          "Et välttämättä. Etuvetoinen auto kunnollisilla talvirenkailla pärjää lähes kaikkialla Lapin pääteillä. Neliveto on hyödyllinen mökkiteillä ja syvässä lumessa, mutta valtaosaan matkailutilanteita riittää tavallinen henkilöauto.",
      },
      {
        question: "Kannattaako vuokrata auto Leville?",
        answer:
          "Riippuu suunnitelmista. Levin keskustassa pärjää hyvin kävellen ja Ski Bussilla. Auto kannattaa, jos teet päiväretkiä Ylläkselle, Pallakselle, Muonioon tai etsit revontulia keskustan ulkopuolelta. Lentokenttäkuljetus ilman vuokra-autoa on usein edullisempi vaihtoehto.",
      },
      {
        question: "Mitä teen jos osun poroon tai hirveen?",
        answer:
          "Pysähdy turvalliseen paikkaan, laita varoitusvilkut, soita 112. Eläinkolarista on aina lakisääteinen ilmoitusvelvollisuus, vaikka eläin pakenisi. Merkitse törmäyspaikka esimerkiksi muovipussilla puuhun ja jää odottamaan poliisia tai paliskunnan päivystäjää.",
      },
      {
        question: "Voinko ajaa pakkasella ilman lohkolämmitintä?",
        answer:
          "Modernit autot käynnistyvät yleensä −20…−25 °C pakkasella ilman lämmitintä, mutta moottori kuluu enemmän ja akku rasittuu. Lohkolämmitin 1–3 tuntia ennen lähtöä on suositeltu kaikille alle −10 °C lämpötiloille — vuokra-autoissa se on yleensä mukana.",
      },
      {
        question: "Onko Suomessa lumiketjupakko?",
        answer:
          "Ei. Suomessa nastarenkaat tai laadukkaat kitkarenkaat riittävät — lumiketjuja ei normaalisti tarvita eikä niiden käyttö ole tavallista. Tämä eroaa esimerkiksi Alpeista.",
      },
      {
        question: "Onko Leville turvallista ajaa pimeällä?",
        answer:
          "Kyllä, kun noudattaa nopeusrajoituksia ja pitää kaukovalot päällä avoimilla teillä. Suurin riski on porot ja muut eläimet — hidasta hämärässä, etenkin metsäisillä osuuksilla. Suomalaiset päätiet ovat hyvin merkittyjä ja talvikunnossapito on kansainvälisesti korkealla tasolla.",
      },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Opas", href: "/opas/matkaopas-levi" },
      { label: "Autolla ajaminen Lapissa", href: "/opas/autolla-ajaminen-lapissa" },
    ],
    readNextTitle: "Lue myös",
    readNext: [
      {
        title: "Miten pääset Leville",
        desc: "Lentoyhteydet, junat ja autoilu Helsingistä Leville",
        href: "/matka/miten-paasee-leville-helsingista",
      },
      {
        title: "Liikkuminen Levillä",
        desc: "Skibussit, taksit ja autonvuokraus paikan päällä",
        href: "/opas/liikkuminen-levilla",
      },
      {
        title: "Levi ilman autoa",
        desc: "Näin pärjäät Levillä ilman omaa autoa",
        href: "/opas/levi-ilman-autoa",
      },
      {
        title: "Talvivarusteet Leville",
        desc: "Pukeutuminen ja varusteet pakkaseen",
        href: "/opas/talvivarusteet-leville",
      },
      {
        title: "Sää ja lämpötilat Levillä",
        desc: "Kuukausittaiset keskiarvot ja lumitilanne",
        href: "/levi/saatieto-levilta",
      },
      {
        title: "Päiväretket Leviltä",
        desc: "Ylläs, Pallas ja muut kohteet — auto kannattaa",
        href: "/opas/paivaretket-levilla",
      },
    ],
    ctaTitle: "Varaa majoitus Levin keskustasta",
    ctaText:
      "Kun saavut, parkkipaikka ja lohkolämmitin odottavat — useimmissa kohteissamme ilmainen pysäköinti.",
    ctaButton: "Selaa huoneistoja ja mökkejä",
    ctaHref: "/majoitukset",
  },
  en: {
    title: `Driving in Lapland ${year} — Winter Driving Tips & Safety`,
    description:
      "Winter tyres, reindeer on the road, engine block heaters and distances — a practical guide to driving in Lapland and to Levi. Local tips for sub-zero driving.",
    canonical: EN_URL,
    h1: `Driving in Lapland — winter tips and safety ${year}`,
    intro:
      "Driving in Lapland is different from southern Finland: long distances, unlit roads, free-roaming reindeer and deep cold. This locals' guide helps you plan a safe road trip to Levi and around the region.",
    faqLabel: "Frequently asked questions",
    faqNav: "FAQ",
    sections: [
      {
        id: "road-conditions",
        icon: "snow",
        title: "Road conditions in winter",
        items: [
          "Roads are usually snow- or ice-packed from November to April — bare asphalt is rare up here.",
          "Black ice is most common in autumn and in spring when daytime melt refreezes at night — watch bridges and shaded stretches.",
          "Most Lapland roads have no street lighting — high beams are essential, but always dip them for oncoming traffic.",
          "Spring thaw (April–May) can make minor gravel roads difficult — stick to main roads if in doubt.",
          "Check live road weather at liikenne.fi or via the Fintraffic app.",
        ],
      },
      {
        id: "tyres",
        icon: "shield",
        title: "Tyres and equipment",
        items: [
          "Winter tyres are mandatory in Finland from November to the end of March — in practice from October to May in Lapland.",
          "Studded tyres are legal and highly recommended in Lapland. Friction (non-studded) tyres are fine in town, but studs are safer on fell roads.",
          "Snow chains are not normally needed in Finland — proper winter tyres do the job.",
          "Carry: a shovel, ice scraper, de-icer, torch, warm clothes and drinking water.",
          "A reflective vest and warning triangle are legally required — you can be fined without them.",
        ],
      },
      {
        id: "reindeer",
        icon: "alert",
        title: "Reindeer and other animals on the road",
        items: [
          "There are over 200,000 free-roaming reindeer in Lapland — they are by far the most common cause of accidents.",
          "The highest risk is at dusk and at night (3 pm–10 pm) and during the autumn and spring herding seasons.",
          "If you see one reindeer, slow down — there are almost always more nearby.",
          "Don't honk or flash from a distance — approaching slowly and stopping is the safest option.",
          "Hitting a reindeer, elk or deer must always be reported to 112 and to the local reindeer herding co-operative. Mark the spot and leave the scene undisturbed.",
          "Comprehensive (kasko) insurance covers animal collisions — check your rental agreement.",
        ],
      },
      {
        id: "cold-weather",
        icon: "thermo",
        title: "Cold-weather tips for your car",
        items: [
          "Engine block heater: plug in 1–3 hours before departure below −10 °C. Even below −20 °C, 2–3 hours is enough — no need to leave it on overnight.",
          "An interior heater makes mornings far more pleasant — not essential, but worth it at −25 °C.",
          "Winter diesel is sold from October onwards. Summer diesel gels at around −10…−15 °C, so refuel in Finland before heading north if you drive in from abroad.",
          "Batteries weaken in the cold — if the car sits for a week in hard frost without a heater, carry a jump starter.",
          "Don't leave bottles or electronics in the car overnight — they will freeze.",
        ],
      },
      {
        id: "distances",
        icon: "map",
        title: "Distances and driving times to Levi",
        items: [
          "Kittilä Airport → Levi: 15 km / about 15 min.",
          "Rovaniemi → Levi: 170 km / about 2 h 15 min.",
          "Oulu → Levi: 380 km / about 4 h 30 min.",
          "Helsinki → Levi: 920 km / 11–13 h in winter (recommended: the night train with car transport to Kolari, then 80 km / 1 h to Levi).",
          "Always fill up before a long leg — in Lapland the gap between petrol stations can be 80–150 km.",
          "The ABC/Neste stations in Kittilä, Levi and Sirkka are open 24/7.",
        ],
      },
      {
        id: "emergencies",
        icon: "phone",
        title: "Emergencies and useful contacts",
        items: [
          "General emergency number: 112 (police, ambulance, fire and rescue, road assistance).",
          "Road traffic centre / road info: 0200 2100 (Fintraffic, 24/7).",
          "Road maintenance status and verified road weather: liikenne.fi.",
          "Download the 112 Suomi app — it locates you automatically during an emergency call.",
          "Animal collision: call 112 and the reindeer co-operative on duty. Never leave an injured animal behind.",
          "If you get stuck: stay in the car, run the heater in short bursts, and make sure the exhaust pipe is not blocked by snow.",
        ],
      },
      {
        id: "car-rental",
        icon: "car",
        title: "Rental car tips",
        items: [
          "Main operators at Kittilä Airport: Avis, Hertz, Europcar and Sixt — all with 4WD/SUV options.",
          "Winter tyres are always included in a Finnish rental — you don't need to request them separately.",
          "You don't necessarily need 4WD — a front-wheel-drive car on winter tyres handles most situations.",
          "Take the extra/super insurance — it usually covers the excess on an animal collision.",
          "A block heater is normally fitted — ask the rental desk how to use it.",
          "Book well ahead in high season (December–March) — availability disappears fast.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a 4WD car for Lapland roads?",
        answer:
          "Not necessarily. A front-wheel-drive car with proper winter tyres copes on virtually all main roads in Lapland. Four-wheel drive helps on cabin tracks and in deep snow, but a normal car is enough for most holiday travel.",
      },
      {
        question: "Is it worth renting a car in Levi?",
        answer:
          "It depends on your plans. Levi centre is easy to get around on foot and with the Ski Bus. A car pays off if you plan day trips to Ylläs, Pallas or Muonio, or if you want to chase the northern lights outside the village. Airport transfers are often cheaper than a rental car.",
      },
      {
        question: "What should I do if I hit a reindeer or an elk?",
        answer:
          "Stop safely, switch on hazard lights and call 112. Reporting an animal collision is a legal obligation even if the animal runs away. Mark the collision point (for example with a plastic bag tied to a tree) and wait for the police or the reindeer co-operative representative.",
      },
      {
        question: "Can I drive in deep frost without a block heater?",
        answer:
          "Modern cars usually start at −20…−25 °C without a heater, but the engine wears more and the battery is strained. Plugging in 1–3 hours before departure is recommended for anything below −10 °C — rental cars normally include a block heater.",
      },
      {
        question: "Are snow chains required in Finland?",
        answer:
          "No. Studded or high-quality friction winter tyres are enough in Finland — snow chains are not normally needed and are rarely used. This differs from, for example, the Alps.",
      },
      {
        question: "Is it safe to drive to Levi in the dark?",
        answer:
          "Yes, as long as you respect the speed limits and use high beams on open roads. The biggest risk is reindeer and other animals — slow down at dusk, especially on forested stretches. Finnish main roads are well marked and winter maintenance is at a very high international standard.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-guide-levi" },
      { label: "Driving in Lapland", href: "/guide/driving-in-lapland" },
    ],
    readNextTitle: "Read next",
    readNext: [
      {
        title: "How to get to Levi",
        desc: "Flights, trains and driving from Helsinki to Levi",
        href: "/travel/how-to-get-to-levi-from-helsinki",
      },
      {
        title: "Getting around Levi",
        desc: "Ski buses, taxis and car rental on site",
        href: "/guide/getting-around-in-levi",
      },
      {
        title: "Levi without a car",
        desc: "How to manage in Levi with no car of your own",
        href: "/guide/levi-without-a-car",
      },
      {
        title: "Winter clothing guide",
        desc: "How to dress and what gear you need for the cold",
        href: "/guide/how-to-dress-for-winter-in-levi-lapland",
      },
      {
        title: "Weather in Levi",
        desc: "Monthly averages and snow conditions",
        href: "/en/levi/weather-in-levi",
      },
      {
        title: "Day trips from Levi",
        desc: "Ylläs, Pallas and beyond — where a car pays off",
        href: "/guide/day-trips-from-levi",
      },
    ],
    ctaTitle: "Book your stay in Levi centre",
    ctaText:
      "When you arrive, a parking space and a block heater socket are waiting — free parking at most of our properties.",
    ctaButton: "Browse apartments and cabins",
    ctaHref: "/en/accommodations",
  },
};

interface Props {
  lang?: "fi" | "en";
}

const DrivingInLapland = ({ lang = "fi" }: Props) => {
  const location = useLocation();
  const t = content[lang];

  const breadcrumbSchemaItems = t.breadcrumbs.map((b) => ({
    name: b.label,
    url: `https://leville.net${b.href === "/" ? "/" : b.href}`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={lang} />
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link rel="canonical" href={t.canonical} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:url" content={t.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
      </Helmet>

      <HreflangTags
        currentPath={location.pathname}
        currentLang={lang}
        customUrls={{ fi: FI_URL, en: EN_URL }}
      />

      <JsonLd data={getWebsiteSchema()} />
      <JsonLd
        data={getArticleSchema({
          title: t.title,
          description: t.description,
          url: t.canonical,
          lang,
        })}
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbSchemaItems)} />
      <JsonLd data={getFAQSchema(t.faqs)} />

      <SubpageBackground />
      <Header />

      <main className="relative pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Breadcrumbs lang={lang} items={t.breadcrumbs} />

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.h1}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{t.intro}</p>
          </header>

          {/* Sticky jump nav */}
          <nav className="mb-10 sticky top-20 z-30 bg-background/80 backdrop-blur-md border border-border/30 rounded-xl p-3">
            <ul className="flex flex-wrap gap-2 text-sm">
              {t.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="inline-block px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  {t.faqNav}
                </a>
              </li>
            </ul>
          </nav>

          {t.sections.map((section) => {
            const Icon = iconMap[section.icon];
            return (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-32">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Icon className="w-7 h-7 text-primary flex-shrink-0" />
                  {section.title}
                </h2>
                <Card>
                  <CardContent className="pt-5">
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            );
          })}

          {/* FAQ */}
          <section id="faq" className="mb-12 scroll-mt-32">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Fuel className="w-7 h-7 text-primary flex-shrink-0" />
              {t.faqLabel}
            </h2>
            <Card>
              <CardContent className="pt-4">
                <Accordion type="single" collapsible>
                  {t.faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-foreground/85 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>

          <GuideDisclaimer lang={lang} />

          <ReadNextSection title={t.readNextTitle} links={t.readNext} />

          <section className="text-center bg-card rounded-xl p-8 border border-border/30">
            <h3 className="text-xl font-semibold mb-3">{t.ctaTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.ctaText}</p>
            <Button asChild>
              <Link to={t.ctaHref}>{t.ctaButton}</Link>
            </Button>
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

export default DrivingInLapland;
