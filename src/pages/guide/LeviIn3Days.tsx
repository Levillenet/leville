import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getArticleSchema, getFAQSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sunrise, Compass, Mountain, Info, Backpack } from "lucide-react";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import MajoitusCallout from "@/components/MajoitusCallout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Olemassa olevat kuvat — ei uusia kuvatiedostoja.
import slopesImg from "@/assets/levi-slopes.jpg";
import reindeerImg from "@/assets/levi-reindeer.jpg";
import panoramaImg from "@/assets/levi-panorama.jpg";

const BOOKING_URL = "https://app.moder.fi/levillenet";

interface LeviIn3DaysProps {
  lang?: Language;
}

interface DaySection {
  title: string;
  lead: string;
  blocks: { h: string; p: string; links: { t: string; h: string }[] }[];
  note?: string;
}

const translations = {
  fi: {
    meta: {
      title: "Levi 3 päivässä – Valmis päiväohjelma ensikertalaiselle",
      description:
        "Kolmen päivän ohjelma Leville: rinteet, husky- tai porosafari, revontulet, sauna ja parhaat ravintolat. Paikallisen suunnittelema aikataulu.",
      canonical: "https://leville.net/opas/levi-3-paivassa",
    },
    home: "Etusivu",
    homeHref: "/",
    leviHref: "/levi",
    breadcrumbLabel: "Levi 3 päivässä",
    title: "Levi 3 päivässä – valmis päiväohjelma",
    subtitle: "Talviohjelma ensikertalaiselle, joka ei halua käyttää iltoja suunnitteluun",
    seasonNote: {
      text: "Tämä on talven ohjelma, eli Levin pääsesongin. Kesällä Levi on aivan toinen kokemus — vaellusta, pyöräilyä ja yötöntä yötä: ",
      link: "lue kesän opas",
      href: "/opas/kesa-levi",
    },
    intro:
      "Kenelle tämä sopii: ensikertalaiselle, joka haluaa kokea Levin parhaat puolet ilman tuntien suunnittelua. Ohjelma on realistinen — yksi iso juttu päivässä, ei juoksemista paikasta toiseen. Talvella pimeä tulee aikaisin ja pakkanen hidastaa tahtia, joten väljyys kannattaa.",
    introBooking: {
      text: "Majoitu keskustassa, niin lähes kaikki tämä on kävelymatkan päässä — ",
      link: "katso huoneistomme",
    },
    days: [
      {
        title: "Päivä 1 – Saapuminen ja rinteet",
        lead: "Ensimmäinen päivä menee pitkälti asettumiseen. Älä varaa siihen safaria.",
        blocks: [
          {
            h: "Aamupäivä: saapuminen ja majoittuminen",
            p: "Kittilän lentokentältä on Leville noin 15 minuuttia, Rovaniemeltä pari tuntia. Kun avaimet on haettu, hae välinevuokraus kuntoon heti — aamulla jonot ovat pidemmät kuin iltapäivällä.",
            links: [{ t: "Miten Leville pääsee", h: "/matka/miten-paasee-leville-helsingista" }],
          },
          {
            h: "Iltapäivä: rinteet tai ladut",
            p: "Ensimmäinen iltapäivä kannattaa käyttää helppoihin rinteisiin tai lyhyeen latulenkkiin. Valaistut rinteet ja ladut pelastavat, kun aurinko laskee jo iltapäivällä.",
            links: [
              { t: "Laskettelu Levillä", h: "/opas/laskettelu-levi" },
              { t: "Levin hiihtoladut", h: "/opas/hiihtoladut-levi" },
            ],
          },
          {
            h: "Ilta: illallinen ja ensimmäinen revontuliyritys",
            p: "Syö keskustassa ja kurkkaa ulos ennen nukkumaanmenoa. Jos taivas on selkeä, kävele muutama sata metriä pois valoista — ensimmäinen yritys kannattaa aina tehdä.",
            links: [
              { t: "Ravintolat ja palvelut Levillä", h: "/opas/ravintolat-ja-palvelut-levilla" },
              { t: "Missä nähdä revontulet Levillä", h: "/opas/missa-nahda-revontulet-levi" },
            ],
          },
        ],
      },
      {
        title: "Päivä 2 – Safaripäivä",
        lead: "Päivän pääjuttu on safari. Loppupäivä pidetään kevyenä.",
        blocks: [
          {
            h: "Aamupäivä: husky- tai porosafari",
            p: "Valitse toinen, älä molempia samalle päivälle. Huskysafari on vauhdikas ja äänekäs, porosafari rauhallinen ja hiljainen — lasten kanssa poro toimii usein paremmin.",
            links: [
              { t: "Koiravaljakkoajelu Levillä", h: "/aktiviteetit/koiravaljakkoajelu-levi" },
              { t: "Porosafari Levillä", h: "/aktiviteetit/porosafari-levi" },
            ],
          },
          {
            h: "Iltapäivä: moottorikelkka tai lumikengät",
            p: "Jos aamun safari ei vienyt kaikkia voimia, iltapäivään sopii moottorikelkkareitti tai rauhallinen lumikenkälenkki metsään. Lumikengillä pääsee sinne, missä ei ole muita.",
            links: [
              { t: "Moottorikelkkasafarin vinkit", h: "/aktiviteetit/moottorikelkkasafari-vinkit-levi" },
              { t: "Lumikenkäily Levillä", h: "/aktiviteetit/lumikenkaily-levi" },
            ],
          },
          {
            h: "Ilta: sauna ja mahdollisesti avanto",
            p: "Safaripäivän jälkeen sauna on koko homman paras osa. Kaikissa huoneistoissamme on oma sauna, joten iltaa ei tarvitse aikatauluttaa kenenkään muun mukaan. Avanto on vapaaehtoinen mutta muistetaan pitkään.",
            links: [
              { t: "Sauna Levillä", h: "/opas/sauna-levilla" },
              { t: "Avantouinti Levillä", h: "/aktiviteetit/avantouinti-levi" },
            ],
          },
        ],
        note: "Rehellinen huomio: varaa safarit etukäteen. Joulu–maaliskuussa suosituimmat lähdöt myydään loppuun päiviä tai viikkoja aiemmin, eikä paikan päältä välttämättä löydy vapaata.",
      },
      {
        title: "Päivä 3 – Tunturi ja revontulet",
        lead: "Viimeinen päivä maisemille ja sille, mikä jäi tekemättä.",
        blocks: [
          {
            h: "Aamupäivä: gondoli huipulle",
            p: "Gondolilla pääsee tunturin päälle ilman hikoilua. Ylhäältä näkee, kuinka laakea Lapin maisema oikeasti on, ja tunturikahvilassa ehtii lämmitellä. Ota käsineet — huipulla tuulee aina enemmän kuin kylässä.",
            links: [],
          },
          {
            h: "Iltapäivä: vapaata",
            p: "Tämä on tarkoituksella tyhjä kohta: shoppailua kylällä, kylpylä, tai lisää rinteitä jos laskeminen alkoi maistua. Väsyneen porukan kanssa lyhyt päiväunet ennen iltaa on ihan validi valinta.",
            links: [{ t: "Laskettelu Levillä", h: "/opas/laskettelu-levi" }],
          },
          {
            h: "Ilta: revontulien metsästys tosissaan",
            p: "Viimeisenä iltana kannattaa mennä kunnolla pois valoista ja varata odotteluun tunti tai kaksi. Tarkista pilvitilanne ennen lähtöä — selkeä taivas ratkaisee enemmän kuin mikään muu.",
            links: [{ t: "Revontulet Levillä", h: "/revontulet" }],
          },
        ],
      },
    ] as DaySection[],
    tips: {
      title: "Käytännön vinkit",
      items: [
        {
          h: "Budjetti",
          p: "Safarit ovat selvästi suurin yksittäinen kuluerä, majoitus ja rinneliput seuraavina. Suuntaa-antavat hintatasot on koottu erilliseen oppaaseen.",
          link: { t: "Hinnat Levillä", h: "/opas/hinnat-levilla" },
        },
        {
          h: "Pukeutuminen",
          p: "Kerrospukeutuminen ratkaisee koko reissun. Villa iholle, välikerros lämmittämään ja tuulenpitävä päälle — puuvilla jää märäksi eikä lämmitä.",
          link: { t: "Talvivarusteet Leville", h: "/opas/talvivarusteet-leville" },
        },
        {
          h: "Liikkuminen",
          p: "Keskustamajoituksella et tarvitse autoa: rinteet, ravintolat, kauppa ja safarien lähtöpaikat ovat kävelymatkan päässä tai noutokyydin varassa.",
          link: null,
        },
      ],
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Riittääkö 3 päivää Levillä?",
          a: "Ensikertalaiselle riittää hyvin: ehdit rinteille, yhdelle safarille ja katsomaan revontulia. Viikko antaa väljyyttä sään varalle ja mahdollisuuden ottaa yksi päivä kokonaan rauhassa.",
        },
        {
          q: "Tarvitsenko auton?",
          a: "Et, jos majoitut keskustassa. Palvelut ja rinteet ovat kävelymatkan päässä ja safariyritykset hakevat asiakkaat yleensä majoituksesta. Auto on hyödyllinen lähinnä, jos haluat ajaa kauas revontulia katsomaan tai tehdä päiväretkiä.",
        },
        {
          q: "Pitääkö safarit varata etukäteen?",
          a: "Kyllä, erityisesti joulu–maaliskuussa. Suositut aamulähdöt myydään usein loppuun jo viikkoja ennen, ja sesonkiviikoilla paikan päältä varaaminen on epävarmaa.",
        },
        {
          q: "Sopiiko ohjelma lapsiperheelle?",
          a: "Sopii. Porosafari ja rinnepäivä toimivat lapsille hyvin, ja päivät on jätetty tarkoituksella väljiksi. Pienempien kanssa kannattaa lyhentää ulkoiluaikoja ja pitää yksi lämmittelytauko sisällä joka päivä.",
        },
      ],
    },
    stay: {
      title: "Majoitus",
      body: "Huoneistomme ovat Levin keskustassa ja rinteiden tuntumassa, omalla saunalla. Ohjelma toimii sellaisenaan, kun majoitus on kävelymatkan päässä palveluista. Sesonkiviikot varataan täyteen aikaisin.",
      bookingText: "Katso vapaat huoneistot",
      internal: "Selaa kaikkia majoituksia",
      internalHref: "/majoitukset",
    },
    images: {
      slopes: "Levin valaistut laskettelurinteet talvella",
      reindeer: "Poro lumisessa maisemassa Levillä",
      panorama: "Näkymä Levitunturin huipulta talvimaisemaan",
    },
    readNext: {
      title: "Lue seuraavaksi",
      links: [
        { title: "Talvi Levillä", desc: "Sää, olosuhteet ja kauden kulku", href: "/opas/talvi-levi" },
        { title: "Hinnat Levillä", desc: "Mihin raha oikeasti menee", href: "/opas/hinnat-levilla" },
        { title: "Revontulet Levillä", desc: "Milloin ja mistä katsoa", href: "/revontulet" },
        { title: "Ravintolat ja palvelut", desc: "Missä syödä keskustassa", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Majoitus Levillä", desc: "Huoneistomme keskustassa", href: "/majoitukset" },
      ] as ReadNextLink[],
    },
    cta: { hub: "Levi-opas", hubLink: "/levi", accommodation: "Katso majoitukset", accommodationLink: "/majoitukset" },
  },
  en: {
    meta: {
      title: "Levi in 3 Days – The Perfect First-Timer Itinerary",
      description:
        "A ready-made 3-day Levi itinerary: slopes, husky or reindeer safari, northern lights, sauna and the best restaurants. Planned by a local.",
      canonical: "https://leville.net/guide/levi-in-3-days",
    },
    home: "Home",
    homeHref: "/en",
    leviHref: "/en/levi",
    breadcrumbLabel: "Levi in 3 days",
    title: "Levi in 3 Days – a ready-made itinerary",
    subtitle: "A winter plan for first-timers who'd rather not spend their evenings planning",
    seasonNote: {
      text: "This is a winter itinerary — Levi's main season. Summer here is a completely different experience, with hiking, biking and the midnight sun: ",
      link: "read the summer guide",
      href: "/guide/summer-in-levi",
    },
    intro:
      "Who this is for: a first-timer who wants the best of Levi without hours of planning. The pace is realistic — one big thing per day, no running from place to place. In winter it gets dark early and the cold slows you down, so leaving room in the schedule pays off.",
    introBooking: {
      text: "Stay in the centre and almost all of this is within walking distance — ",
      link: "see our apartments",
    },
    days: [
      {
        title: "Day 1 – Arrival and the slopes",
        lead: "The first day mostly goes to settling in. Don't book a safari for it.",
        blocks: [
          {
            h: "Morning: arrival and check-in",
            p: "Kittilä airport is about 15 minutes from Levi, Rovaniemi around two hours. Once you have the keys, sort out equipment rental straight away — mornings are busier than afternoons.",
            links: [{ t: "How to get to Levi", h: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" }],
          },
          {
            h: "Afternoon: slopes or trails",
            p: "Use the first afternoon for easy slopes or a short trail loop. Floodlit pistes and trails save the day when the sun sets in the early afternoon.",
            links: [{ t: "Skiing in Levi", h: "/guide/skiing-in-levi" }],
          },
          {
            h: "Evening: dinner and a first aurora attempt",
            p: "Eat in the village and step outside before bed. If the sky is clear, walk a few hundred metres away from the lights — the first attempt is always worth making.",
            links: [
              { t: "Restaurants and services in Levi", h: "/guide/restaurants-and-services-in-levi" },
              { t: "Where to see the northern lights", h: "/guide/where-to-see-northern-lights-levi" },
            ],
          },
        ],
      },
      {
        title: "Day 2 – Safari day",
        lead: "The safari is the main event. Keep the rest of the day light.",
        blocks: [
          {
            h: "Morning: husky or reindeer safari",
            p: "Pick one, not both on the same day. A husky safari is fast and loud, a reindeer safari calm and quiet — with small children, reindeer usually works better.",
            links: [
              { t: "Husky safari in Levi", h: "/activities/husky-safari-levi" },
              { t: "Reindeer safari in Levi", h: "/activities/reindeer-safari-levi" },
            ],
          },
          {
            h: "Afternoon: snowshoeing",
            p: "If the morning didn't use up all your energy, a calm snowshoe walk into the forest is a good afternoon. Snowshoes get you to places where nobody else is.",
            links: [{ t: "Snowshoeing in Levi", h: "/activities/snowshoeing-in-levi" }],
          },
          {
            h: "Evening: sauna",
            p: "After a safari day the sauna is the best part of the whole trip. All of our apartments have a private sauna, so you don't have to fit your evening around anyone else's schedule. An ice dip afterwards is optional, but people remember it for years.",
            links: [{ t: "Finnish sauna in Levi", h: "/guide/finnish-sauna-in-levi" }],
          },
        ],
        note: "Honest note: book safaris in advance. From December to March the popular departures sell out days or weeks ahead, and walking in on the day rarely works.",
      },
      {
        title: "Day 3 – The fell and northern lights",
        lead: "The last day is for views and whatever you didn't get to.",
        blocks: [
          {
            h: "Morning: gondola to the top",
            p: "The gondola takes you to the top of the fell without breaking a sweat. From up there you see how wide and flat the Lapland landscape really is, and the fell café is there to warm up in. Bring gloves — it is always windier at the top than in the village.",
            links: [],
          },
          {
            h: "Afternoon: free time",
            p: "This slot is intentionally empty: shopping in the village, the spa, or more slopes if skiing turned out to be your thing. With a tired group, a short nap before the evening is a perfectly valid choice.",
            links: [{ t: "Skiing in Levi", h: "/guide/skiing-in-levi" }],
          },
          {
            h: "Evening: serious aurora hunting",
            p: "On the last evening, get properly away from the lights and allow an hour or two of waiting. Check the cloud forecast before heading out — a clear sky matters more than anything else.",
            links: [{ t: "Northern lights in Levi", h: "/en/northern-lights" }],
          },
        ],
      },
    ] as DaySection[],
    tips: {
      title: "Practical tips",
      items: [
        {
          h: "Budget",
          p: "Safaris are clearly the biggest single expense, followed by accommodation and lift passes. Indicative price levels are collected in a separate guide.",
          link: { t: "Prices in Levi", h: "/guide/prices-in-levi" },
        },
        {
          h: "Clothing",
          p: "Layering decides how the whole trip feels. Wool next to skin, an insulating mid layer and a windproof shell — cotton stays wet and won't keep you warm.",
          link: { t: "How to dress for winter in Levi", h: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        },
        {
          h: "Getting around",
          p: "Staying in the centre means you don't need a car: slopes, restaurants, the grocery store and safari pickup points are within walking distance.",
          link: null,
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Is 3 days enough in Levi?",
          a: "For a first-timer it is: you'll fit in the slopes, one safari and aurora hunting. A week gives you slack for bad weather and lets you take one day completely slowly.",
        },
        {
          q: "Do I need a car?",
          a: "Not if you stay in the centre. Services and slopes are within walking distance, and safari operators usually pick guests up from their accommodation. A car mainly helps if you want to drive far out for auroras or take day trips.",
        },
        {
          q: "Do safaris need to be booked in advance?",
          a: "Yes, especially from December to March. Popular morning departures often sell out weeks ahead, and during peak weeks booking on arrival is unreliable.",
        },
        {
          q: "Does this itinerary work for a family with children?",
          a: "It does. A reindeer safari and a day on the slopes work well for kids, and the days are deliberately left loose. With younger children, shorten the time outdoors and keep one indoor warm-up break every day.",
        },
      ],
    },
    stay: {
      title: "Where to stay",
      body: "Our apartments are in Levi centre and close to the slopes, each with a private sauna. This itinerary works as written when your accommodation is walking distance from the services. Peak weeks book up early.",
      bookingText: "See available apartments",
      internal: "Browse all our accommodation",
      internalHref: "/en/accommodations",
    },
    images: {
      slopes: "Floodlit ski slopes in Levi during winter",
      reindeer: "A reindeer in a snowy landscape in Levi",
      panorama: "View from the top of Levi fell over the winter landscape",
    },
    readNext: {
      title: "Read next",
      links: [
        { title: "Winter in Levi", desc: "Weather, conditions and the season", href: "/guide/winter-in-levi" },
        { title: "Prices in Levi", desc: "Where the money actually goes", href: "/guide/prices-in-levi" },
        { title: "Northern lights in Levi", desc: "When and where to look", href: "/en/northern-lights" },
        { title: "Restaurants and services", desc: "Where to eat in the village", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Accommodation in Levi", desc: "Our apartments in the centre", href: "/en/accommodations" },
      ] as ReadNextLink[],
    },
    cta: { hub: "Levi guide", hubLink: "/en/levi", accommodation: "See accommodation", accommodationLink: "/en/accommodations" },
  },
};

const LeviIn3Days = ({ lang = "fi" }: LeviIn3DaysProps) => {
  const location = useLocation();
  const t = lang === "en" ? translations.en : translations.fi;

  const customUrls = {
    fi: "/opas/levi-3-paivassa",
    en: "/guide/levi-in-3-days",
  };

  const breadcrumbItems = [
    { label: t.home, href: t.homeHref },
    { label: "Levi", href: t.leviHref },
    { label: t.breadcrumbLabel, href: "" },
  ];

  const dayIcons = [Sunrise, Compass, Mountain];
  const dayImages = [
    { src: slopesImg, alt: t.images.slopes },
    { src: reindeerImg, alt: t.images.reindeer },
    { src: panoramaImg, alt: t.images.panorama },
  ];

  const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <figure className="my-8 rounded-xl overflow-hidden border border-border/30">
      <img src={src} alt={alt} loading="lazy" width={1920} height={1080} className="w-full h-auto object-cover" />
      <figcaption className="text-xs text-muted-foreground px-3 py-2">{alt}</figcaption>
    </figure>
  );

  return (
    <>
      <JsonLd data={getArticleSchema({ title: t.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: t.home, url: `https://leville.net${t.homeHref}` },
          { name: "Levi", url: `https://leville.net${t.leviHref}` },
          { name: t.breadcrumbLabel, url: t.meta.canonical },
        ])}
      />
      <JsonLd data={getFAQSchema(t.faq.items.map((i) => ({ question: i.q, answer: i.a })))} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "en" ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
              <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>

              <p className="inline-flex items-start gap-2 text-sm text-muted-foreground bg-muted/40 border border-border/30 rounded-lg px-4 py-2 mb-6 text-left">
                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  {t.seasonNote.text}
                  <Link to={t.seasonNote.href} className="text-primary underline underline-offset-4">
                    {t.seasonNote.link}
                  </Link>
                  .
                </span>
              </p>

              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>

              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-left">
                {t.introBooking.text}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-booking-source="levi-3-days-intro"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {t.introBooking.link}
                </a>
                .
              </p>
            </section>

            {/* Days */}
            {t.days.map((day, i) => {
              const Icon = dayIcons[i];
              const img = dayImages[i];
              return (
                <div key={day.title}>
                  <ImageBlock src={img.src} alt={img.alt} />
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                      <Icon className="w-6 h-6 text-primary" />
                      {day.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{day.lead}</p>

                    <div className="space-y-4">
                      {day.blocks.map((b) => (
                        <Card key={b.h} className="glass-card border-border/30">
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-foreground mb-1">{b.h}</h3>
                            <p className="text-sm text-muted-foreground">{b.p}</p>
                            {b.links.length > 0 && (
                              <div className="flex flex-wrap gap-4 mt-3">
                                {b.links.map((l) => (
                                  <Link key={l.h} to={l.h} className="text-sm text-primary underline underline-offset-4">
                                    {l.t}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {day.note && (
                      <p className="mt-4 text-sm text-muted-foreground italic flex items-start gap-2">
                        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{day.note}</span>
                      </p>
                    )}

                    {i === 1 && (
                      <p className="mt-4 text-muted-foreground">
                        {lang === "en"
                          ? "Every one of our apartments has its own sauna, so the evening is yours to time — "
                          : "Jokaisessa huoneistossamme on oma sauna, joten illan aikataulu on omissa käsissä — "}
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-booking-source="levi-3-days-sauna"
                          className="text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                          {lang === "en" ? "see apartments with a private sauna" : "katso huoneistot omalla saunalla"}
                        </a>
                        .
                      </p>
                    )}
                  </section>
                </div>
              );
            })}

            {/* Practical tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Backpack className="w-6 h-6 text-primary" />
                {t.tips.title}
              </h2>
              <div className="space-y-4">
                {t.tips.items.map((item) => (
                  <Card key={item.h} className="glass-card border-border/30">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.h}</h3>
                      <p className="text-sm text-muted-foreground">{item.p}</p>
                      {item.link && (
                        <Link to={item.link.h} className="text-sm text-primary underline underline-offset-4 mt-3 inline-block">
                          {item.link.t}
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Stay */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.stay.title}</h2>
              <p className="text-muted-foreground mb-4">{t.stay.body}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="levi-3-days-majoitus">
                    {t.stay.bookingText}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to={t.stay.internalHref}>{t.stay.internal}</Link>
                </Button>
              </div>
            </section>

            <GuideDisclaimer lang={lang} />

            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={t.cta.hubLink}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t.cta.hub}
                </Link>
              </Button>
              <Button asChild>
                <Link to={t.cta.accommodationLink}>
                  {t.cta.accommodation}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </section>
          </div>
        </main>

        <PageCTA lang={lang} />
        <MajoitusCallout lang={lang} />
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default LeviIn3Days;
