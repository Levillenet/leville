import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getFAQSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Ticket, MapPin, Music, Info } from "lucide-react";
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

// Kuvat: src/assets/worldcup/ — vite-imagetools muuntaa nämä WebP-muotoon buildissa.
// Korvaa tiedostot samoilla nimillä, jos haluat vaihtaa kuvat.
import wcSlalom from "@/assets/worldcup/worldcup-levi-slalom.jpg";
import wcYleiso from "@/assets/worldcup/worldcup-levi-yleiso.jpg";
import wcMaalialue from "@/assets/worldcup/worldcup-levi-maalialue.jpg";
import wcTunnelma from "@/assets/worldcup/worldcup-levi-tunnelma.jpg";

// PÄIVITÄ VUOSITTAIN: FIS vahvistaa päivät keväällä — vaihda vain tämä lohko, koko sivu päivittyy.
const WORLD_CUP = {
  year: 2026,
  dates: { fi: "13.–15.11.2026", en: "13–15 November 2026" },
  startDate: "2026-11-13",
  endDate: "2026-11-15",
  edition: 22, // järjestyskerta
  confirmed: true, // false = näytetään "FIS vahvistaa päivät"
};

const WC_URL = "https://www.worldcuplevi.com";
const LEVI_FI_WC_URL = {
  fi: "https://www.levi.fi/tapahtumat/fis-ski-alpine-world-cup-levi/",
  en: "https://www.levi.fi/en/events/fis-ski-alpine-world-cup-levi/",
};
const BOOKING_URL = "https://app.moder.fi/levillenet";

interface WorldCupLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: `World Cup Levi ${WORLD_CUP.year} – Aikataulu, liput ja katsojan opas`,
      description: `Levin maailmancup ${WORLD_CUP.dates.fi}: pujottelun kauden avaus. Aikataulut, liput, parhaat katselupaikat ja majoitus kisaviikonlopuksi.`,
      canonical: "https://leville.net/opas/world-cup-levi",
    },
    breadcrumbLabel: `World Cup Levi ${WORLD_CUP.year}`,
    home: "Etusivu",
    leviLink: "/levi",
    title: `World Cup Levi ${WORLD_CUP.year} – katsojan opas`,
    subtitle: "Alppihiihdon pujottelukauden avaus Levi Black -rinteessä",
    intro: `Alppihiihdon pujottelukauden avaus järjestetään ${WORLD_CUP.edition}. kerran Levillä ${WORLD_CUP.dates.fi}. Naisten pujottelu lauantaina, miesten sunnuntaina, Levi Black -rinteessä. Perjantaina avajaiset ja oheisohjelmaa.`,
    unconfirmed: "FIS vahvistaa tarkat kisapäivät keväällä — tarkista päivämäärät ennen matkan varaamista.",
    past: "Seuraavan vuoden päivämäärät vahvistetaan keväällä.",
    introBooking: {
      text: "Kisaviikonlopun majoitus varataan loppuun aikaisin — ",
      link: "katso vapaat huoneistomme",
    },
    program: {
      title: "Kisaviikonlopun ohjelma",
      items: [
        { day: "Perjantai", text: "Avajaiset ja oheisohjelmaa kylällä." },
        { day: "Lauantai", text: "Naisten pujottelu, kaksi laskua." },
        { day: "Sunnuntai", text: "Miesten pujottelu, kaksi laskua." },
      ],
      note: "Tarkat lähtöajat vahvistetaan lähempänä tapahtumaa – katso ajantasainen aikataulu",
      noteLink: "worldcuplevi.com",
    },
    tickets: {
      title: "Liput",
      body: "Liput myydään Tiketin kautta, ja tarjolla on myös VIP-paketteja katsomoalueille. Lippumyynti avautuu yleensä syksyllä ja suosituimmat paketit menevät nopeasti. Ajantasaiset lipputiedot löytyvät virallisilta sivuilta.",
      link: "Viralliset lipputiedot (worldcuplevi.com)",
    },
    spots: {
      title: "Parhaat katselupaikat",
      items: [
        { h: "Maalialue ja päakatsomo", p: "Levi Blackin juurella näet viimeiset portit ja maaliintulon läheltä. Tunnelmallisin paikka, mutta täyttyy ensimmäisenä." },
        { h: "Lapland Avenue -tapahtuma-alue", p: "Näytteilleasettajat, esiintymislava ja tapahtumatorin tunnelma kisojen välissä." },
      ],
      tip: "Paikallisen vinkki: pukeudu –15 °C:n kelille. Seisot paikallasi tunteja, joten villasukat, toppahousut ja lämpimät kengät ratkaisevat kokemuksen.",
    },
    zeroPoint: {
      title: "Zero Point – oheisohjelmaa kisaviikonloppuna",
      body: "Zero Point ei itsessään ole katselupaikka, vaan se toimii kisaviikonlopun tapahtumakeskuksena. Siellä järjestetään esimerkiksi lasku- ja kilpailunumeroiden arvonta, johon liittyy yleensä myös muuta oheisohjelmaa perjantai- ja lauantai-iltana.",
    },
    stay: {
      title: "Majoitus kisaviikonloppuna",
      body: "Huoneistomme sijaitsevat Zero Pointin tuntumassa Levin keskustassa, kävelymatkan päässä kisarinteeltä ja tapahtuma-alueelta. Kisaviikonloppu on vuoden kysytyimpiä — vapaat viikonloput kannattaa varata heti kun päivät on vahvistettu.",
      bookingText: "Katso vapaat huoneistot kisaviikonlopulle",
      internal: "Selaa kaikkia majoituksiamme",
    },
    side: {
      title: "Oheisohjelma ja after ski",
      body: "Kisaviikonloppuun kuuluu Kids Race, konsertteja ja after ski -meininki kylän ravintoloissa. Ohjelma jatkuu myöhään, joten varaa pöytä ajoissa – ravintolat ovat kisaviikonloppuna täynnä.",
      internal: "Ravintolat ja palvelut Levillä",
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: `Milloin World Cup Levi järjestetään?`, a: `Kisat järjestetään ${WORLD_CUP.dates.fi}. Naisten pujottelu lauantaina ja miesten pujottelu sunnuntaina.` },
        { q: "Mikä on Levi Black?", a: "Levi Black on Levin FIS-pujottelurinne, joka on ollut maailmancup-käytössä vuodesta 2004. Rinne on jyrkkä ja lyhyt, ja katsojille avautuu näkymä lähes koko radalle." },
        { q: "Kannattaako liput ostaa etukäteen?", a: "Kyllä. VIP-paketit ja parhaat katsomopaikat ovat myyneet aiempina vuosina loppuun ennen tapahtumaa, joten liput kannattaa hankkia heti myynnin avauduttua." },
        { q: "Sopiiko tapahtuma lapsille?", a: "Kyllä. Ohjelmassa on Kids Race ja perheille sopivia alueita, ja maalialueen tunnelma on turvallinen myös pienten kanssa. Muista lämmin vaatetus ja taukopaikka sisätiloissa." },
        { q: "Miten pääsen Leville?", a: "Kittilän lentoasema on noin 15 minuutin ajomatkan päässä, ja Levi on saavutettavissa myös junalla Kolariin tai autolla. Katso tarkemmat ohjeet matkustusoppaastamme." },
      ],
      travelLink: { text: "Miten Leville pääsee", href: "/matka/miten-paasee-leville-helsingista" },
    },
    images: {
      slalom: "Pujottelija Levi Black -rinteessä World Cup Levillä",
      yleiso: "Yleisöä Levi Blackin maalialueella maailmancupin kisaviikonloppuna",
      maalialue: "Maalialue ja suurtaulu World Cup Levin pujottelukisassa",
      tunnelma: "Kisatunnelmaa Levin rinteillä maailmancup-viikonloppuna auringonlaskussa",
    },
    readNext: {
      title: "Lue seuraavaksi",
      links: [
        { title: "Laskettelu Levillä", desc: "Rinteet, hissit ja rinnekartta", href: "/opas/laskettelu-levi" },
        { title: "Levi marraskuussa", desc: "Sää, kelit ja kauden avaus", href: "/opas/levi-marraskuussa" },
        { title: "Ravintolat ja palvelut", desc: "Missä syödä kisaviikonloppuna", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Majoitukset Levillä", desc: "Huoneistomme keskustassa", href: "/majoitukset" },
        { title: "Miten Leville pääsee", desc: "Lento, juna ja auto", href: "/matka/miten-paasee-leville-helsingista" },
      ] as ReadNextLink[],
    },
    cta: { hub: "Levi-opas", hubLink: "/levi", accommodation: "Katso majoitukset", accommodationLink: "/majoitukset" },
  },
  en: {
    meta: {
      title: `World Cup Levi ${WORLD_CUP.year} – Schedule, Tickets & Spectator Guide`,
      description: `Levi World Cup slalom ${WORLD_CUP.dates.en}: season opener schedule, tickets, best viewing spots and where to stay for the race weekend.`,
      canonical: "https://leville.net/guide/levi-world-cup",
    },
    breadcrumbLabel: `World Cup Levi ${WORLD_CUP.year}`,
    home: "Home",
    leviLink: "/en/levi",
    title: `World Cup Levi ${WORLD_CUP.year} – spectator's guide`,
    subtitle: "The alpine slalom season opener on the Levi Black slope",
    intro: `The alpine slalom season opens for the ${WORLD_CUP.edition}${WORLD_CUP.edition % 10 === 1 && WORLD_CUP.edition !== 11 ? "st" : WORLD_CUP.edition % 10 === 2 && WORLD_CUP.edition !== 12 ? "nd" : WORLD_CUP.edition % 10 === 3 && WORLD_CUP.edition !== 13 ? "rd" : "th"} time in Levi on ${WORLD_CUP.dates.en}. The women's slalom runs on Saturday and the men's on Sunday, on the Levi Black slope. Friday brings the opening ceremony and side events.`,
    unconfirmed: "FIS confirms the exact race dates in spring — check them before booking your trip.",
    past: "Next year's dates are confirmed in spring.",
    introBooking: {
      text: "Race weekend accommodation sells out early — ",
      link: "see our available apartments",
    },
    program: {
      title: "Race weekend program",
      items: [
        { day: "Friday", text: "Opening ceremony and side events in the village." },
        { day: "Saturday", text: "Women's slalom, two runs." },
        { day: "Sunday", text: "Men's slalom, two runs." },
      ],
      note: "Exact start times are confirmed closer to the event – check the current schedule at",
      noteLink: "worldcuplevi.com",
    },
    tickets: {
      title: "Tickets",
      body: "Tickets are sold through Tiketti, and VIP packages for the grandstand areas are also available. Sales usually open in autumn and the most popular packages go fast. Up-to-date ticket information is on the official site.",
      link: "Official ticket info (worldcuplevi.com)",
    },
    spots: {
      title: "Best viewing spots",
      items: [
        { h: "Finish area and main stand", p: "At the base of Levi Black you see the final gates and the finish up close. The best atmosphere, and the first area to fill up." },
        { h: "Lapland Avenue event area", p: "Exhibitors, a stage and a festival feel between the runs." },
      ],
      tip: "Local tip: dress for -15°C. You'll be standing still for hours, so wool socks, insulated trousers and warm boots make or break the day.",
    },
    zeroPoint: {
      title: "Zero Point – side events during the race weekend",
      body: "Zero Point is not a viewing spot in itself; it serves as the event hub for the race weekend. It hosts events such as the bib draw, which usually includes additional side programming on Friday and Saturday evening.",
    },
    stay: {
      title: "Where to stay for the race weekend",
      body: "Our apartments sit next to Zero Point in Levi centre, within walking distance of the race slope and the event area. The race weekend is one of the busiest of the year — book as soon as the dates are confirmed.",
      bookingText: "See available apartments for the race weekend",
      internal: "Browse all our accommodation",
    },
    side: {
      title: "Side events and after ski",
      body: "The weekend includes the Kids Race, concerts and a lively after ski scene in the village restaurants. Programmes run late, so reserve a table early – restaurants are full during the race weekend.",
      internal: "Restaurants and services in Levi",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "When is World Cup Levi held?", a: `The races are held on ${WORLD_CUP.dates.en}. Women's slalom on Saturday and men's slalom on Sunday.` },
        { q: "What is Levi Black?", a: "Levi Black is Levi's FIS slalom slope, used for World Cup races since 2004. It is short and steep, and spectators can see almost the entire course." },
        { q: "Should I buy tickets in advance?", a: "Yes. VIP packages and the best grandstand seats have sold out before the event in previous years, so buy as soon as sales open." },
        { q: "Is the event suitable for children?", a: "Yes. There is a Kids Race and family-friendly areas, and the finish area works well with small children too. Bring warm clothing and plan an indoor break." },
        { q: "How do I get to Levi?", a: "Kittilä Airport is about a 15-minute drive away, and Levi is also reachable by train to Kolari or by car. See our travel guide for details." },
      ],
      travelLink: { text: "How to get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
    },
    images: {
      slalom: "Slalom skier on the Levi Black slope at World Cup Levi",
      yleiso: "Crowds at the Levi Black finish area during the World Cup race weekend",
      maalialue: "Finish area and big screen at the World Cup Levi slalom race",
      tunnelma: "Race weekend atmosphere on the Levi slopes at sunset",
    },
    readNext: {
      title: "Read next",
      links: [
        { title: "Skiing in Levi", desc: "Slopes, lifts and piste map", href: "/guide/skiing-in-levi" },
        { title: "Levi in November", desc: "Weather, conditions and season opening", href: "/guide/levi-in-november" },
        { title: "Restaurants and services", desc: "Where to eat during the race weekend", href: "/guide/restaurants-and-services-levi" },
        { title: "Accommodation in Levi", desc: "Our apartments in the centre", href: "/en/accommodations" },
        { title: "How to get to Levi", desc: "Flights, trains and driving", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
      ] as ReadNextLink[],
    },
    cta: { hub: "Levi guide", hubLink: "/en/levi", accommodation: "See accommodation", accommodationLink: "/en/accommodations" },
  },
};

const WorldCupLevi = ({ lang = "fi" }: WorldCupLeviProps) => {
  const location = useLocation();
  const t = lang === "en" ? translations.en : translations.fi;

  // Yksi päivämäärävertailu: onko tapahtuma jo ohi?
  const eventPassed = new Date() > new Date(`${WORLD_CUP.endDate}T23:59:59`);

  const customUrls = {
    fi: "/opas/world-cup-levi",
    en: "/guide/levi-world-cup",
  };

  const breadcrumbItems = [
    { label: t.home, href: lang === "en" ? "/en" : "/" },
    { label: "Levi", href: t.leviLink },
    { label: t.breadcrumbLabel, href: "" },
  ];

  const sportsEventSchema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `World Cup Levi ${WORLD_CUP.year}`,
    description: t.meta.description,
    startDate: WORLD_CUP.startDate,
    endDate: WORLD_CUP.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Alpine skiing",
    url: t.meta.canonical,
    location: {
      "@type": "Place",
      name: "Levi Black",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Levi",
        addressRegion: "Lappi",
        addressCountry: "FI",
      },
    },
  };

  const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <figure className="my-8 rounded-xl overflow-hidden border border-border/30">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1920}
        height={1080}
        className="w-full h-auto object-cover"
      />
      <figcaption className="text-xs text-muted-foreground px-3 py-2">{alt}</figcaption>
    </figure>
  );

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={sportsEventSchema} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: t.home, url: lang === "en" ? "https://leville.net/en" : "https://leville.net/" },
          { name: "Levi", url: `https://leville.net${t.leviLink}` },
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
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>

              {(eventPassed || !WORLD_CUP.confirmed) && (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 border border-border/30 rounded-lg px-4 py-2">
                  <Info className="w-4 h-4 text-primary flex-shrink-0" />
                  {eventPassed ? t.past : t.unconfirmed}
                </p>
              )}

              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-left">
                {t.introBooking.text}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-booking-source="world-cup-levi-intro"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {t.introBooking.link}
                </a>
                .
              </p>
            </section>

            {/* Kuva 1: src/assets/worldcup/worldcup-levi-slalom.jpg */}
            <ImageBlock src={wcSlalom} alt={t.images.slalom} />

            {/* Program */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-primary" />
                {t.program.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {t.program.items.map((item) => (
                  <Card key={item.day} className="glass-card border-border/30">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.day}</h3>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t.program.note}{" "}
                <a href={WC_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                  {t.program.noteLink}
                </a>
                .
              </p>
            </section>

            {/* Kuva 2: src/assets/worldcup/worldcup-levi-maalialue.jpg */}
            <ImageBlock src={wcMaalialue} alt={t.images.maalialue} />

            {/* Tickets */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Ticket className="w-6 h-6 text-primary" />
                {t.tickets.title}
              </h2>
              <p className="text-muted-foreground mb-3">{t.tickets.body}</p>
              <a href={WC_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                {t.tickets.link}
              </a>
              <p className="text-sm text-muted-foreground mt-3">
                {lang === "en"
                  ? "Levi's own tourism site also lists the race weekend among its events: "
                  : "Myös Levin oma matkailusivusto listaa kisaviikonlopun tapahtumakalenteriinsa: "}
                <a
                  href={lang === "en" ? LEVI_FI_WC_URL.en : LEVI_FI_WC_URL.fi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  {lang === "en" ? "FIS Ski Alpine World Cup Levi (levi.fi)" : "FIS Ski Alpine World Cup Levi (levi.fi)"}
                </a>
                .
              </p>
            </section>

            {/* Viewing spots */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                {t.spots.title}
              </h2>
              <div className="space-y-4">
                {t.spots.items.map((item) => (
                  <Card key={item.h} className="glass-card border-border/30">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.h}</h3>
                      <p className="text-sm text-muted-foreground">{item.p}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 border-l-2 border-primary pl-4">{t.spots.tip}</p>
            </section>

            {/* Kuva 3: src/assets/worldcup/worldcup-levi-yleiso.jpg */}
            <ImageBlock src={wcYleiso} alt={t.images.yleiso} />

            {/* Stay */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.stay.title}</h2>
              <p className="text-muted-foreground mb-4">{t.stay.body}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-booking-source="world-cup-levi-majoitus"
                  >
                    {t.stay.bookingText}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to={t.cta.accommodationLink}>{t.stay.internal}</Link>
                </Button>
              </div>
            </section>

            {/* Side events */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-primary" />
                {t.side.title}
              </h2>
              <p className="text-muted-foreground mb-3">{t.side.body}</p>
              <Card className="glass-card border-border/30 mb-4">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{t.zeroPoint.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.zeroPoint.body}</p>
                </CardContent>
              </Card>
              <Link
                to={lang === "en" ? "/guide/restaurants-and-services-levi" : "/opas/ravintolat-ja-palvelut-levilla"}
                className="text-primary underline underline-offset-4"
              >
                {t.side.internal}
              </Link>
            </section>

            {/* Kuva 4: src/assets/worldcup/worldcup-levi-tunnelma.jpg */}
            <ImageBlock src={wcTunnelma} alt={t.images.tunnelma} />

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.a}</p>
                      {idx === t.faq.items.length - 1 && (
                        <Link to={t.faq.travelLink.href} className="text-primary underline underline-offset-4 text-sm mt-2 inline-block">
                          {t.faq.travelLink.text}
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

export default WorldCupLevi;
