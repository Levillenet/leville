import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Snowflake, Sun, Moon, TreeDeciduous, Mountain, ArrowRight, Star,
  Sparkles, CloudSnow, Calendar, Camera,
  Compass, Sunrise, Leaf, CloudSun
} from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BestTimeToVisitLeviProps {
  lang?: Language;
}

type SeasonRating = "best" | "good" | "ok" | "off";

interface MonthData {
  name: string;
  temp: string;
  snow: string;
  daylight: string;
  highlight: string;
  bestFor: string;
  rating: SeasonRating;
  icon: string;
  monthSlug: string;
}

interface SeasonSection {
  title: string;
  months: string;
  why: string;
  activities: string[];
  badge?: string;
  links: { title: string; href: string }[];
}

interface TranslationContent {
  meta: { title: string; description: string; canonical: string };
  title: string;
  subtitle: string;
  quickAnswer: string;
  monthsTitle: string;
  months: MonthData[];
  seasonsTitle: string;
  seasons: SeasonSection[];
  northernLights: { title: string; content: string; linkText: string; linkHref: string };
  practicalTips: { title: string; tips: string[]; links: { text: string; href: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; primary: string; primaryHref: string; secondary: string; secondaryHref: string };
  readNext: { title: string; links: { title: string; desc: string; href: string }[] };
  breadcrumbLabel: string;
  ratingLabels: Record<SeasonRating, string>;
  monthLinkPrefix: string;
}

const ratingColors: Record<SeasonRating, string> = {
  best: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  good: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  ok: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  off: "bg-muted/30 text-muted-foreground border-border/30",
};

const iconMap: Record<string, React.ReactNode> = {
  snowflake: <Snowflake className="w-5 h-5 text-primary" />,
  moon: <Moon className="w-5 h-5 text-primary" />,
  sun: <Sun className="w-5 h-5 text-primary" />,
  cloudsun: <CloudSun className="w-5 h-5 text-primary" />,
  leaf: <Leaf className="w-5 h-5 text-primary" />,
  tree: <TreeDeciduous className="w-5 h-5 text-primary" />,
  sunrise: <Sunrise className="w-5 h-5 text-primary" />,
  sparkles: <Sparkles className="w-5 h-5 text-primary" />,
  cloudsnow: <CloudSnow className="w-5 h-5 text-primary" />,
  mountain: <Mountain className="w-5 h-5 text-primary" />,
  camera: <Camera className="w-5 h-5 text-primary" />,
  star: <Star className="w-5 h-5 text-primary" />,
};

const translations: Record<string, TranslationContent> = {
  fi: {
    meta: {
      title: "Paras aika matkustaa Leville – Kuukausikohtainen opas 2025 | Leville.net",
      description: "Milloin Leville kannattaa matkustaa? Vertaile vuodenaikoja, säätietoja, aktiviteetteja ja revontulien todennäköisyyttä kuukausi kuukaudelta.",
      canonical: "https://leville.net/opas/paras-aika-matkustaa-leville"
    },
    title: "Paras aika matkustaa Leville",
    subtitle: "Täydellinen opas matkailun ajoittamiseen",
    quickAnswer: "Paras aika matkustaa Leville riippuu siitä, mitä haluat kokea. Laskettelu ja revontulet: joulukuu–maaliskuu. Yötön yö ja vaellus: kesä–heinäkuu. Ruskavärit: syyskuu. Paras vastine rahalle ja kevätaurinko: maalis–huhtikuu.",
    monthsTitle: "Levi kuukausi kuukaudelta",
    months: [
      { name: "Tammikuu", temp: "-10 – -25°C", snow: "60–80 cm", daylight: "2–6 h", highlight: "Kaamoksen taika, revontulet", bestFor: "Revontulien bongaajat", rating: "good", icon: "moon", monthSlug: "levi-tammikuussa" },
      { name: "Helmikuu", temp: "-10 – -25°C", snow: "70–90 cm", daylight: "6–10 h", highlight: "Revontulet + pidemmät päivät", bestFor: "Revontulet + laskettelu", rating: "good", icon: "sparkles", monthSlug: "levi-helmikuussa" },
      { name: "Maaliskuu", temp: "-5 – -15°C", snow: "80–100 cm", daylight: "10–14 h", highlight: "Kevätlaskettelu, aurinkoisia päiviä", bestFor: "Paras kokonaisaika ★", rating: "best", icon: "sun", monthSlug: "levi-maaliskuussa" },
      { name: "Huhtikuu", temp: "-5 – +5°C", snow: "60–90 cm", daylight: "14–20 h", highlight: "Viimeiset laskettelupäivät", bestFor: "Kevätlaskijat", rating: "good", icon: "cloudsun", monthSlug: "levi-huhtikuussa" },
      { name: "Toukokuu", temp: "0 – +10°C", snow: "0–30 cm", daylight: "20–24 h", highlight: "Lumi sulaa, luonto herää", bestFor: "Välikausi", rating: "off", icon: "sunrise", monthSlug: "levi-toukokuussa" },
      { name: "Kesäkuu", temp: "+8 – +20°C", snow: "0 cm", daylight: "24 h", highlight: "Yötön yö alkaa", bestFor: "Yötön yö", rating: "good", icon: "sun", monthSlug: "levi-kesakuussa" },
      { name: "Heinäkuu", temp: "+10 – +25°C", snow: "0 cm", daylight: "22–24 h", highlight: "Yötön yö, vaellus", bestFor: "Vaeltajat", rating: "good", icon: "mountain", monthSlug: "levi-heinakuussa" },
      { name: "Elokuu", temp: "+8 – +18°C", snow: "0 cm", daylight: "16–20 h", highlight: "Marjastus, pimenevät yöt", bestFor: "Luontoihmiset", rating: "ok", icon: "leaf", monthSlug: "levi-elokuussa" },
      { name: "Syyskuu", temp: "+2 – +10°C", snow: "0 cm", daylight: "12–14 h", highlight: "Ruskan huippu", bestFor: "Valokuvaajat", rating: "good", icon: "tree", monthSlug: "levi-syyskuussa" },
      { name: "Lokakuu", temp: "-5 – +5°C", snow: "0–20 cm", daylight: "8–10 h", highlight: "Ensilumi, rauhallista", bestFor: "Budjettimatkailijat", rating: "ok", icon: "cloudsnow", monthSlug: "levi-lokakuussa" },
      { name: "Marraskuu", temp: "-5 – -15°C", snow: "20–50 cm", daylight: "4–6 h", highlight: "Kausi alkaa, joulutunnelmaa", bestFor: "Ennakkomatkailijat", rating: "ok", icon: "snowflake", monthSlug: "levi-marraskuussa" },
      { name: "Joulukuu", temp: "-10 – -25°C", snow: "40–70 cm", daylight: "0–2 h", highlight: "Joulu, joulupukki, kaamos", bestFor: "Perheet, joulu", rating: "best", icon: "star", monthSlug: "levi-joulukuussa" },
    ],
    seasonsTitle: "Vuodenajat lyhyesti",
    seasons: [
      {
        title: "Talvi (marraskuu–maaliskuu)",
        months: "Marras–maaliskuu",
        why: "Levin pääkausi. Revontulet tanssivat taivaalla, rinteet täyttyvät lumesta ja kaamoksen sininen valo luo ainutlaatuisen tunnelman. Joulukuussa joulupukin tapaaminen ja joulusafarit ovat suosittuja.",
        activities: ["Laskettelu ja lumilautailu", "Huskysafarit", "Moottorikelkkailu", "Revontulisafarit", "Porosafari", "Lumikenkäily"],
        links: [
          { title: "Talvi Levillä", href: "/opas/talvi-levi" },
          { title: "Laskettelu Levillä", href: "/opas/laskettelu-levi" },
        ]
      },
      {
        title: "Kevät (maalis–huhtikuu)",
        months: "Maalis–huhtikuu",
        why: "Paras kokonaiskokemus: paljon aurinkoa, runsaasti lunta ja edullisemmat hinnat kuin joulusesonkina. Lasketteluolosuhteet ovat huipussaan ja terasseilla nautitaan keväisestä auringosta.",
        activities: ["Kevätlaskettelu", "Murtomaahiihto", "Lumikenkäily", "Terassielämä"],
        badge: "★ Paras kokonaisaika",
        links: [
          { title: "Kevät Levillä", href: "/opas/kevat-levi" },
        ]
      },
      {
        title: "Kesä (kesä–elokuu)",
        months: "Kesä–elokuu",
        why: "Yötön yö tekee kesästä maagisen. Aurinko ei lasku lainkaan kesäkuussa ja heinäkuussa. Tunturireitit, pyöräily, kalastus ja marjastus odottavat.",
        activities: ["Vaellus", "Maastopyöräily", "Kalastus", "Melonta", "Golf", "Marjastus"],
        links: [
          { title: "Kesä Levillä", href: "/opas/kesa-levi" },
        ]
      },
      {
        title: "Syksy / Ruska (syys–lokakuu)",
        months: "Syys–lokakuu",
        why: "Ruska on luonnon oma taideteos. Syyskuussa tunturit hehkuvat punaisina, oranssina ja keltaisina. Revontulikausi alkaa ja luonto on rauhallisimmillaan.",
        activities: ["Vaellus", "Valokuvaus", "Marjastus", "Sienestys", "Revontulien bongaus"],
        links: [
          { title: "Ruska Levillä", href: "/opas/syksy-ruska-levi" },
        ]
      }
    ],
    northernLights: {
      title: "Revontulet Levillä",
      content: "Revontulikausi kestää syyskuusta maaliskuuhun. Parhaat mahdollisuudet ovat tammi–helmikuussa, kun yöt ovat pisimmillään ja taivas on usein kirkas. Levin vähäinen valosaaste ja kirkas yötaivas tekevät siitä erinomaisen paikan revontulien tarkkailuun.",
      linkText: "Lue revontuliopas",
      linkHref: "/revontulet",
    },
    practicalTips: {
      title: "Käytännön vinkit",
      tips: [
        "Varaa joulun ja uudenvuoden majoitus hyvissä ajoin – hinnat nousevat ja paikat täyttyvät nopeasti.",
        "Maaliskuu on paras hinta-laatusuhteeltaan: täysi laskettelukausi + halvemmat hinnat kuin jouluna.",
        "Kevätlomaviikoilla on vilkasta – varaa etukäteen.",
        "Syyskuussa on hiljaista ja edullista, mutta sää voi olla arvaamaton.",
      ],
      links: [
        { text: "Pukeutumisvinkit talvelle", href: "/opas/talvivarusteet-leville" },
        { text: "Hinnat Levillä", href: "/opas/hinnat-levilla" },
      ]
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Mikä on Levin kylmin kuukausi?", a: "Tammikuu on tyypillisesti kylmin kuukausi, jolloin lämpötilat voivat laskea -35°C:seen. Helmikuu on lähes yhtä kylmä, mutta valoa on jo enemmän." },
        { q: "Voiko Levillä nähdä revontulia maaliskuussa?", a: "Kyllä! Maaliskuu on erinomainen aika revontulien näkemiseen. Kirkkaat yöt ja pidempi pimeys iltaisin tarjoavat hyviä mahdollisuuksia." },
        { q: "Kannattaako Levillä käydä kesällä?", a: "Ehdottomasti! Yötön yö on ainutlaatuinen kokemus. Vaellus, kalastus ja pyöräily tunturimaisemissa ovat unohtumattomia." },
        { q: "Milloin laskettelukausi alkaa ja päättyy?", a: "Laskettelukausi alkaa tyypillisesti lokakuun alussa tykkilumella ja ensilumen ladulla, ja jatkuu toukokuun alkuun. Paras aika laskettelulle on maalis–huhtikuu." },
        { q: "Mitä on ruska?", a: "Ruska tarkoittaa syksyn lehtivärien huippua. Levillä tämä tapahtuu syyskuun toisella ja kolmannella viikolla, kun tunturit hehkuvat punaisina, oranssina ja keltaisina." },
        { q: "Onko maalis- vai helmikuu parempi aika Leville?", a: "Maaliskuu on monille parempi: enemmän valoa, lämpimämpiä päiviä ja paremmat lasketteluolosuhteet. Helmikuu on parempi revontulien kannalta." },
        { q: "Milloin Levillä on halvinta?", a: "Edullisimmat ajat ovat loka–marraskuu ja huhtikuun loppu – toukokuun alku. Kesällä on myös edullista, mutta palvelut ovat rajoitetumpia." },
      ]
    },
    cta: {
      title: "Valmis varaamaan Levi-lomasi?",
      primary: "Katso majoitukset",
      primaryHref: "/majoitukset",
      secondary: "Suunnittele loma",
      secondaryHref: "/lomasuunnittelija",
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Sää ja lumitilanne", desc: "Lämpötilat ja lumensyvyys kuukausittain", href: "/levi/saatieto-levilta" },
        { title: "Talvi Levillä", desc: "Kaamos, lumi ja aktiviteetit", href: "/opas/talvi-levi" },
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja 28 hissiä", href: "/opas/laskettelu-levi" },
        { title: "Talvivarusteet", desc: "Pukeutumisvinkit Levin pakkasiin", href: "/opas/talvivarusteet-leville" },
      ]
    },
    breadcrumbLabel: "Paras aika matkustaa Leville",
    ratingLabels: { best: "Paras", good: "Hyvä", ok: "OK", off: "Välikausi" },
    monthLinkPrefix: "/opas/",
  },
  en: {
    meta: {
      title: "Best Time to Visit Levi, Finland – Month-by-Month Guide 2025 | Leville.net",
      description: "When is the best time to visit Levi? Compare seasons, weather, activities and Northern Lights chances month by month. Plan your perfect Lapland holiday.",
      canonical: "https://leville.net/guide/best-time-to-visit-levi"
    },
    title: "Best Time to Visit Levi, Finland",
    subtitle: "Your complete guide to choosing when to visit Finnish Lapland",
    quickAnswer: "The best time to visit Levi depends on what you want to experience. For skiing and Northern Lights: December–March. For midnight sun and hiking: June–July. For autumn colours: September. For the best value and spring sunshine: March–April.",
    monthsTitle: "Levi month by month",
    months: [
      { name: "January", temp: "-10 to -25°C", snow: "60–80 cm", daylight: "2–6 h", highlight: "Polar night magic, Northern Lights", bestFor: "Aurora hunters", rating: "good", icon: "moon", monthSlug: "levi-in-january" },
      { name: "February", temp: "-10 to -25°C", snow: "70–90 cm", daylight: "6–10 h", highlight: "Northern Lights + longer days", bestFor: "Aurora + skiing", rating: "good", icon: "sparkles", monthSlug: "levi-in-february" },
      { name: "March", temp: "-5 to -15°C", snow: "80–100 cm", daylight: "10–14 h", highlight: "Spring skiing, bright sunny days", bestFor: "Best overall ★", rating: "best", icon: "sun", monthSlug: "levi-in-march" },
      { name: "April", temp: "-5 to +5°C", snow: "60–90 cm", daylight: "14–20 h", highlight: "Last ski weeks, warm sun", bestFor: "Spring skiers", rating: "good", icon: "cloudsun", monthSlug: "levi-in-april" },
      { name: "May", temp: "0 to +10°C", snow: "0–30 cm", daylight: "20–24 h", highlight: "Snow melting, nature awakening", bestFor: "Off-season", rating: "off", icon: "sunrise", monthSlug: "levi-in-may" },
      { name: "June", temp: "+8 to +20°C", snow: "0 cm", daylight: "24 h", highlight: "Midnight Sun begins", bestFor: "Midnight Sun", rating: "good", icon: "sun", monthSlug: "levi-in-june" },
      { name: "July", temp: "+10 to +25°C", snow: "0 cm", daylight: "22–24 h", highlight: "Peak midnight sun, hiking", bestFor: "Hikers", rating: "good", icon: "mountain", monthSlug: "levi-in-july" },
      { name: "August", temp: "+8 to +18°C", snow: "0 cm", daylight: "16–20 h", highlight: "Berry picking, first dark nights", bestFor: "Nature lovers", rating: "ok", icon: "leaf", monthSlug: "levi-in-august" },
      { name: "September", temp: "+2 to +10°C", snow: "0 cm", daylight: "12–14 h", highlight: "Ruska autumn colours peak", bestFor: "Photographers", rating: "good", icon: "tree", monthSlug: "levi-in-september" },
      { name: "October", temp: "-5 to +5°C", snow: "0–20 cm", daylight: "8–10 h", highlight: "First snow, quiet season", bestFor: "Budget travelers", rating: "ok", icon: "cloudsnow", monthSlug: "levi-in-october" },
      { name: "November", temp: "-5 to -15°C", snow: "20–50 cm", daylight: "4–6 h", highlight: "Ski season opens, Christmas vibes", bestFor: "Early season", rating: "ok", icon: "snowflake", monthSlug: "levi-in-november" },
      { name: "December", temp: "-10 to -25°C", snow: "40–70 cm", daylight: "0–2 h", highlight: "Christmas, Santa, polar night", bestFor: "Families, Christmas", rating: "best", icon: "star", monthSlug: "levi-in-december" },
    ],
    seasonsTitle: "Seasons at a glance",
    seasons: [
      {
        title: "Winter (November–March)",
        months: "Nov–Mar",
        why: "Levi's main season. Northern Lights dance across the sky, slopes fill with snow, and the polar night creates a unique blue-light atmosphere. In December, Santa visits and Christmas safaris are hugely popular.",
        activities: ["Skiing & snowboarding", "Husky safaris", "Snowmobile safaris", "Northern Lights tours", "Reindeer safaris", "Snowshoeing"],
        links: [
          { title: "Winter in Levi", href: "/guide/winter-in-levi" },
          { title: "Skiing in Levi", href: "/guide/skiing-in-levi" },
        ]
      },
      {
        title: "Spring (March–April)",
        months: "Mar–Apr",
        why: "The best overall experience: abundant sunshine, plenty of snow, and lower prices than Christmas season. Skiing conditions are at their peak, and terraces buzz with spring sunshine.",
        activities: ["Spring skiing", "Cross-country skiing", "Snowshoeing", "Terrace life"],
        badge: "★ Best overall time",
        links: [
          { title: "Spring in Levi", href: "/guide/spring-in-levi" },
        ]
      },
      {
        title: "Summer (June–August)",
        months: "Jun–Aug",
        why: "The midnight sun makes summer magical. The sun doesn't set at all in June and July. Fell trails, cycling, fishing, and berry picking await.",
        activities: ["Hiking", "Mountain biking", "Fishing", "Canoeing", "Golf", "Berry picking"],
        links: [
          { title: "Summer in Levi", href: "/guide/summer-in-levi" },
        ]
      },
      {
        title: "Autumn / Ruska (September–October)",
        months: "Sep–Oct",
        why: "Ruska is nature's own masterpiece. In September, fells glow in red, orange, and yellow. The Northern Lights season begins, and nature is at its most peaceful.",
        activities: ["Hiking", "Photography", "Berry picking", "Mushroom foraging", "Northern Lights hunting"],
        links: [
          { title: "Autumn in Levi", href: "/guide/autumn-ruska-in-levi" },
        ]
      }
    ],
    northernLights: {
      title: "Northern Lights in Levi",
      content: "The Northern Lights season runs from September to March. Best chances are in January–February, when nights are longest and skies are often clear. Levi's low light pollution and clear arctic skies make it an excellent spot for aurora viewing.",
      linkText: "Read the Northern Lights guide",
      linkHref: "/en/northern-lights",
    },
    practicalTips: {
      title: "Practical Tips",
      tips: [
        "Book early for Christmas and New Year – prices rise and availability drops quickly.",
        "March is the best value for skiing: full season conditions + lower prices than Christmas.",
        "Finnish school holiday weeks (week 8 & 10) are busy – book ahead.",
        "September is quiet and affordable, but weather can be unpredictable.",
      ],
      links: [
        { text: "What to pack for Lapland", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { text: "Prices in Levi", href: "/guide/prices-in-levi" },
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What is the coldest month in Levi?", a: "January is typically the coldest month, with temperatures dropping to -35°C. February is nearly as cold but has noticeably more daylight." },
        { q: "Can you see Northern Lights in Levi in March?", a: "Yes! March is an excellent time for Northern Lights. Clear nights and extended darkness in the evenings provide great opportunities." },
        { q: "Is Levi worth visiting in summer?", a: "Absolutely! The midnight sun is a once-in-a-lifetime experience. Hiking, fishing, and cycling in the fell landscapes are unforgettable." },
        { q: "When does the ski season start and end?", a: "The ski season typically starts in early October with machine-made snow and the first snow track, and runs until early May. The best skiing conditions are in March–April." },
        { q: "What is Ruska season?", a: "Ruska refers to the peak of autumn leaf colours. In Levi, this happens in the second and third weeks of September, when the fells glow in red, orange, and yellow." },
        { q: "Is March or February better for Levi?", a: "March is better for most: more daylight, warmer days, and excellent skiing. February is better for Northern Lights and true winter atmosphere." },
        { q: "When is Levi cheapest?", a: "The most affordable times are October–November and late April – early May. Summer is also affordable, but some services are limited." },
      ]
    },
    cta: {
      title: "Ready to book your Levi holiday?",
      primary: "View accommodations",
      primaryHref: "/en/accommodations",
      secondary: "Plan your trip",
      secondaryHref: "/en/holiday-planner",
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Weather in Levi", desc: "Temperatures and snow depth by month", href: "/en/levi/weather-in-levi" },
        { title: "Winter in Levi", desc: "Polar night, snow and activities", href: "/guide/winter-in-levi" },
        { title: "Skiing in Levi", desc: "43 slopes and 28 lifts", href: "/guide/skiing-in-levi" },
        { title: "What to Pack", desc: "Clothing guide for Lapland winter", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      ]
    },
    breadcrumbLabel: "Best Time to Visit Levi",
    ratingLabels: { best: "Best", good: "Good", ok: "OK", off: "Off-season" },
    monthLinkPrefix: "/guide/",
  }
};

const BestTimeToVisitLevi = ({ lang = "fi" }: BestTimeToVisitLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls = { fi: "/opas/paras-aika-matkustaa-leville", en: "/guide/best-time-to-visit-levi" };

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : "/en" },
    { label: lang === "fi" ? "Levi-opas" : "Levi Guide", href: lang === "fi" ? "/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const faqSchemaItems = t.faq.items.map(item => ({ question: item.q, answer: item.a }));

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang === "fi" ? "fi" : "en"} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>
      <JsonLd data={getArticleSchema({
        title: t.title,
        description: t.meta.description,
        url: t.meta.canonical,
        lang: lang === "fi" ? "fi" : "en",
        datePublished: "2025-01-15",
        dateModified: "2025-03-08",
      })} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems.map((item) => ({
        name: item.label,
        url: item.href ? `https://leville.net${item.href}` : t.meta.canonical,
      })))} />
      <JsonLd data={getFAQSchema(faqSchemaItems)} />

      <div className="min-h-screen bg-background">
        <Header />
        <SubpageBackground />

        <main className="container max-w-4xl mx-auto px-4 pt-32 pb-16">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero */}
          <section className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 font-display">
              {t.title}
            </h1>
            <p className="text-lg text-primary font-medium">{t.subtitle}</p>
          </section>

          {/* Quick Answer */}
          <section className="mb-12">
            <Card className="glass-card border-primary/30 p-6 md:p-8">
              <div className="flex items-start gap-3">
                <Compass className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed text-base">{t.quickAnswer}</p>
              </div>
            </Card>
          </section>

          {/* Month-by-Month Grid */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">{t.monthsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.months.map((month) => (
                <Link
                  key={month.name}
                  to={`${t.monthLinkPrefix}${month.monthSlug}`}
                  className="block group"
                >
                  <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 p-4 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {iconMap[month.icon]}
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {month.name}
                        </h3>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${ratingColors[month.rating]}`}>
                        {t.ratingLabels[month.rating]}
                      </span>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{lang === "fi" ? "Lämpötila" : "Temperature"}</span>
                        <span className="text-foreground font-medium">{month.temp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{lang === "fi" ? "Lumi" : "Snow"}</span>
                        <span className="text-foreground font-medium">{month.snow}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{lang === "fi" ? "Päivänvalo" : "Daylight"}</span>
                        <span className="text-foreground font-medium">{month.daylight}</span>
                      </div>
                    </div>
                    <p className="text-primary text-sm font-medium mt-3">{month.highlight}</p>
                    <p className="text-xs text-muted-foreground mt-1">{month.bestFor}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Season Sections */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">{t.seasonsTitle}</h2>
            <div className="space-y-6">
              {t.seasons.map((season, idx) => (
                <Card key={idx} className="glass-card border-border/30 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">{season.title}</h3>
                    {season.badge && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {season.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{season.why}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {season.activities.map((act, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {act}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {season.links.map((link, i) => (
                      <Link
                        key={i}
                        to={link.href}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        {link.title}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Northern Lights */}
          <section className="mb-12">
            <Card className="glass-card border-border/30 p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">{t.northernLights.title}</h2>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{t.northernLights.content}</p>
                  <Link
                    to={t.northernLights.linkHref}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t.northernLights.linkText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          </section>

          {/* Practical Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.practicalTips.title}</h2>
            <ul className="space-y-3 mb-4">
              {t.practicalTips.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              {t.practicalTips.links.map((link, i) => (
                <Link
                  key={i}
                  to={link.href}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {link.text}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.faq.items.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <GuideDisclaimer lang={lang} />

          {/* Read Next */}
          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          {/* CTA */}
          <section className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.cta.title}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to={t.cta.primaryHref}>
                  {t.cta.primary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={t.cta.secondaryHref}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.cta.secondary}
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default BestTimeToVisitLevi;
