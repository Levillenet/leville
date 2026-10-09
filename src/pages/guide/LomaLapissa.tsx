import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import HreflangTags from "@/components/HreflangTags";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import JsonLd from "@/components/JsonLd";
import { getArticleSchema, getFAQSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, CalendarDays, Plane, Scale, Smile } from "lucide-react";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Kaksikielinen kokoava hub-sivu: FI "loma lapissa" ↔ EN "lapland holiday".
type Lang = "fi" | "en";

const CANONICALS: Record<Lang, string> = {
  fi: "https://leville.net/opas/loma-lapissa",
  en: "https://leville.net/guide/lapland-holiday",
};

type Link2 = { t: string; h: string };

const content = {
  fi: {
    title: "Loma Lapissa – kohteet, sesongit ja vinkit | Leville.net",
    description:
      "Loma Lapissa: Levi, Ylläs, Rovaniemi vai Saariselkä? Vertailu, parhaat sesongit ja matkavinkit paikallisen toimijan näkökulmasta.",
    h1: "Loma Lapissa",
    subtitle: "Kohteen valinta, sesongit ja käytännön vinkit",
    introBefore:
      "Lapin loma voi tarkoittaa laskettelua, revontulia, joulutunnelmaa tai kesän yötöntä yötä. Kokosimme tälle sivulle tärkeimmät asiat kohteen ja ajankohdan valintaan. Kun päädyt Leville, katso ",
    introLink: "majoitus Levillä",
    introAfter: ".",
    bias1: "Rehellisyyden nimissä:",
    bias2: " olemme leviläinen toimija, joten saatamme olla tässä vertailussa ",
    bias3: "hieman puolueellisia",
    bias4:
      ". Vedämme kotiin päin, mutta yritämme silti olla reiluja. Jos haet erämaan hiljaisuutta tai Joulupukin Pajakylää, kerromme suoraan, mihin kannattaa suunnata.",
    destH: "Mihin Lapissa kannattaa lähteä?",
    allComparisons: "Kaikki vertailut löydät ",
    allComparisonsLink: "vertailusivulta",
    seasonsH: "Milloin lähteä Lapin lomalle?",
    seasonsMore: "Tarkemmin kuukausittain: ",
    seasonsMoreLink: "paras aika matkustaa Leville",
    travelH: "Matka Lappiin",
    travelP:
      "Leville pääsee lentäen Kittilään, yöjunalla Kolariin tai Rovaniemelle tai omalla autolla. Kittilän lentokentältä kylään on noin 15 km.",
    travelLink: "Miten pääsee Leville",
    faqH: "Usein kysyttyä",
    chooseH: "Valitsitko Levin?",
    chooseP:
      "Huoneistomme ovat Levin keskustassa ja rinteiden lähellä. Varaat suoraan omistajalta ilman varauskuluja.",
    ctaStay: "Katso majoitukset",
    ctaAvail: "Tarkista saatavuus",
    readNextTitle: "Lue seuraavaksi",
    homeLabel: "Etusivu",
    levi: "Levi",
    hrefs: {
      levi: "/levi",
      home: "/",
      stay: "/majoitukset",
      hub: "/opas/miksi-valita-levi",
      bestTime: "/opas/paras-aika-matkustaa-leville",
      travel: "/matka/miten-paasee-leville-helsingista",
      moder: "https://app.moder.fi/levillenet",
    },
    destinations: [
      {
        name: "Levi",
        p: "Suomen suurin hiihtokeskus, jossa rinteet, ravintolat, kaupat ja ohjelmapalvelut ovat kävelymatkan päässä kylän keskustasta. Sopii, kun haluat kaiken samasta paikasta ilman autoa.",
        link: { t: "Levi-opas", h: "/levi" },
      },
      {
        name: "Ylläs ja Ruka",
        p: "Ylläksellä on pitkät rinteet ja laajat ladut kahden kylän ympärillä, Ruka taas sijaitsee Kuusamossa Itä-Lapin rajalla. Molemmat ovat hyviä vaihtoehtoja, palvelut vain levittäytyvät laajemmalle.",
        link: { t: "Levi vs Ylläs vs Ruka", h: "/opas/levi-vs-yllas-vs-ruka" },
      },
      {
        name: "Rovaniemi",
        p: "Lapin pääkaupunki ja Joulupukin Pajakylä. Hyvä lyhyelle joulumatkalle, mutta rinteitä ja tunturitunnelmaa on vähemmän kuin tunturikeskuksissa.",
        link: { t: "Levi vs Rovaniemi", h: "/opas/levi-vs-rovaniemi" },
      },
      {
        name: "Saariselkä",
        p: "Rauhallinen tunturikylä vähän muita hiihtokeskuksia pohjoisempana Inarissa, Urho Kekkosen kansallispuiston kupeessa. Sopii hiljaisuutta ja erämaata etsivälle.",
        link: { t: "Levi vs Saariselkä", h: "/opas/levi-vs-saariselka" },
      },
    ] as { name: string; p: string; link: Link2 }[],
    seasons: [
      {
        h: "Alkutalvi ja kaamos (marras–joulukuu)",
        p: "Sininen hetki, joulutunnelma ja pitkät pimeät illat revontulille.",
        links: [
          { t: "Kaamos Levillä", h: "/opas/kaamos-levi" },
          { t: "Revontulet Levillä", h: "/revontulet" },
        ],
      },
      {
        h: "Sydäntalvi ja kevät (tammi–huhtikuu)",
        p: "Parhaat laskettelu- ja hiihtokelit, kevätaurinko ja vilkas afterski.",
        links: [
          { t: "Laskettelu Levillä", h: "/opas/laskettelu-levi" },
          { t: "Kevätlaskettelu", h: "/opas/kevatlaskettelu-levi" },
          { t: "Afterski ja yöelämä", h: "/opas/afterski-ja-yoelama-levilla" },
        ],
      },
      {
        h: "Kesä ja ruska (kesä–syyskuu)",
        p: "Yötön yö, vaellus ja syksyn ruska – Lappi ilman ruuhkia.",
        links: [
          { t: "Kesä Levillä", h: "/opas/kesa-levi" },
          { t: "Ruska Levillä", h: "/opas/syksy-ruska-levi" },
        ],
      },
    ] as { h: string; p: string; links: Link2[] }[],
    faq: [
      {
        q: "Mikä on paras paikka lomalle Lapissa?",
        a: "Riippuu siitä, mitä haet. Levillä palvelut ovat kävelymatkan päässä, Saariselällä on enemmän hiljaisuutta ja Rovaniemi sopii lyhyelle joulumatkalle. Me olemme Leviltä, joten suosittelemme tietysti Leviä, mutta vertailusivuilla kerromme myös muiden kohteiden vahvuudet.",
      },
      {
        q: "Milloin Lappiin kannattaa lähteä?",
        a: "Laskettelemaan ja hiihtämään helmi–huhtikuussa, revontulia katsomaan syys–maaliskuussa ja ruskaa ihailemaan syyskuussa. Joulu ja hiihtolomaviikot täyttyvät ensimmäisinä.",
      },
      {
        q: "Tarvitseeko Lapin lomalla autoa?",
        a: "Levillä ei välttämättä: lentokentältä pääsee bussilla tai taksilla, ja kylässä liikutaan kävellen. Laajemmilla alueilla auto helpottaa liikkumista.",
      },
      {
        q: "Miten Lappiin pääsee?",
        a: "Lentäen Kittilään, yöjunalla Kolariin tai Rovaniemelle tai autolla. Kittilän lentokentältä on Leville noin 15 km.",
      },
    ],
    readNext: [
      { title: "Vertailut", desc: "Levi muihin kohteisiin verrattuna", href: "/opas/miksi-valita-levi" },
      { title: "Paras aika matkustaa Leville", desc: "Kuukausi kuukaudelta", href: "/opas/paras-aika-matkustaa-leville" },
      { title: "Miten pääsee Leville", desc: "Lento, juna ja auto", href: "/matka/miten-paasee-leville-helsingista" },
      { title: "Majoitus Levillä", desc: "Huoneistot suoraan omistajalta", href: "/majoitukset" },
    ] as ReadNextLink[],
  },
  en: {
    title: "Lapland Holiday – Destinations, Seasons & Tips | Leville.net",
    description:
      "Planning a Lapland holiday? Levi, Ylläs, Rovaniemi or Saariselkä compared, plus the best seasons and travel tips from a local Levi operator.",
    h1: "Lapland Holiday",
    subtitle: "Choosing a destination, the best seasons and practical tips",
    introBefore:
      "A Lapland holiday can mean skiing, the northern lights, a Christmas atmosphere or the midnight sun of summer. We have gathered the key points for choosing your destination and travel dates on this page. Once you have picked Levi, see our ",
    introLink: "accommodation in Levi",
    introAfter: ".",
    bias1: "To be upfront:",
    bias2: " we are a Levi-based business, so we may be a little ",
    bias3: "biased",
    bias4:
      " in this comparison. We lean towards home, but we do try to stay fair. If you are after wilderness silence or the buzz of Santa Claus Village, we will tell you straight where to head.",
    destH: "Where to go in Lapland?",
    allComparisons: "You can find all our comparisons on the ",
    allComparisonsLink: "comparison page",
    seasonsH: "When to go on a Lapland holiday?",
    seasonsMore: "Month by month: ",
    seasonsMoreLink: "best time to visit Levi",
    travelH: "Getting to Lapland",
    travelP:
      "You can reach Levi by flying to Kittilä, by night train to Kolari or Rovaniemi, or by car. Kittilä Airport is about 15 km from the village.",
    travelLink: "How to get to Levi",
    faqH: "Frequently asked questions",
    chooseH: "Decided on Levi?",
    chooseP:
      "Our apartments are in Levi centre, close to the slopes. You book directly from the owner with no booking fees.",
    ctaStay: "See accommodation",
    ctaAvail: "Check availability",
    readNextTitle: "Read next",
    homeLabel: "Home",
    levi: "Levi",
    hrefs: {
      levi: "/en/levi",
      home: "/en",
      stay: "/en/accommodations",
      hub: "/guide/why-choose-levi",
      bestTime: "/guide/best-time-to-visit-levi",
      travel: "/travel/how-to-get-to-levi-from-helsinki-and-abroad",
      moder: "https://app.moder.fi/levillenet?lang=en",
    },
    destinations: [
      {
        name: "Levi",
        p: "Finland's largest ski resort, with slopes, restaurants, shops and activities within walking distance of the village centre. A good fit if you want everything in one place without a car.",
        link: { t: "Levi guide", h: "/en/levi" },
      },
      {
        name: "Ylläs and Ruka",
        p: "Ylläs has long slopes and extensive trails around two villages, while Ruka is in Kuusamo on the border of eastern Lapland. Both are great options, with services spread over a wider area.",
        link: { t: "Levi vs Ylläs vs Ruka", h: "/guide/levi-vs-yllas-vs-ruka-comparison" },
      },
      {
        name: "Rovaniemi",
        p: "The capital of Lapland and home of Santa Claus Village. Great for a short Christmas trip, but with fewer slopes and less fell atmosphere than the ski resorts.",
        link: { t: "Levi vs Rovaniemi", h: "/guide/levi-vs-rovaniemi-comparison" },
      },
      {
        name: "Saariselkä",
        p: "A peaceful fell village a little further north than the other ski resorts, in Inari next to Urho Kekkonen National Park. Suits those looking for quiet and wilderness.",
        link: { t: "Levi vs Saariselkä", h: "/guide/levi-vs-saariselka-comparison" },
      },
    ] as { name: string; p: string; link: Link2 }[],
    seasons: [
      {
        h: "Early winter and polar night (Nov–Dec)",
        p: "Blue hour, a Christmas atmosphere and long dark evenings made for the northern lights.",
        links: [
          { t: "Polar night in Levi", h: "/guide/polar-night-levi" },
          { t: "Northern lights in Levi", h: "/en/northern-lights" },
        ],
      },
      {
        h: "Midwinter and spring (Jan–Apr)",
        p: "The best skiing conditions, spring sunshine and lively après-ski.",
        links: [
          { t: "Skiing in Levi", h: "/guide/skiing-in-levi" },
          { t: "Spring skiing", h: "/guide/spring-skiing-in-levi" },
          { t: "Après-ski and nightlife", h: "/guide/apres-ski-and-nightlife-in-levi" },
        ],
      },
      {
        h: "Summer and autumn colours (Jun–Sep)",
        p: "Midnight sun, hiking and the autumn ruska – Lapland without the crowds.",
        links: [
          { t: "Summer in Levi", h: "/guide/summer-in-levi" },
          { t: "Autumn ruska in Levi", h: "/guide/autumn-ruska-in-levi" },
        ],
      },
    ] as { h: string; p: string; links: Link2[] }[],
    faq: [
      {
        q: "What is the best place for a holiday in Lapland?",
        a: "It depends on what you are looking for. In Levi the services are within walking distance, Saariselkä offers more quiet and Rovaniemi suits a short Christmas trip. We are based in Levi, so of course we recommend Levi, but on our comparison pages we also describe the strengths of the other destinations.",
      },
      {
        q: "When is the best time to go to Lapland?",
        a: "February to April for skiing, September to March for the northern lights, and September for the autumn colours. Christmas and the winter holiday weeks book up first.",
      },
      {
        q: "Do you need a car on a Lapland holiday?",
        a: "Not necessarily in Levi: you can get from the airport by bus or taxi, and you get around the village on foot. In wider areas a car makes getting around easier.",
      },
      {
        q: "How do you get to Lapland?",
        a: "Fly to Kittilä, take the night train to Kolari or Rovaniemi, or drive. Kittilä Airport is about 15 km from Levi.",
      },
    ],
    readNext: [
      { title: "Why choose Levi?", desc: "Levi compared with other destinations", href: "/guide/why-choose-levi" },
      { title: "Best time to visit Levi", desc: "Month by month", href: "/guide/best-time-to-visit-levi" },
      { title: "How to get to Levi", desc: "Flight, train and car", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
      { title: "Accommodation in Levi", desc: "Apartments direct from the owner", href: "/en/accommodations" },
    ] as ReadNextLink[],
  },
};

const LomaLapissa = ({ lang = "fi" }: { lang?: Lang }) => {
  const location = useLocation();
  const c = content[lang];
  const canonical = CANONICALS[lang];
  const breadcrumbItems = [
    { label: c.levi, href: c.hrefs.levi },
    { label: c.h1, href: "" },
  ];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={{ fi: CANONICALS.fi, en: CANONICALS.en }} />
      <JsonLd data={getArticleSchema({ title: c.h1, description: c.description, url: canonical, lang })} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: c.homeLabel, url: lang === "fi" ? "https://leville.net/" : "https://leville.net/en" },
          { name: c.levi, url: `https://leville.net${c.hrefs.levi}` },
          { name: c.h1, url: canonical },
        ])}
      />
      <JsonLd data={getFAQSchema(c.faq.map((i) => ({ question: i.q, answer: i.a })))} />
      <Helmet>
        <html lang={lang} />
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.title} />
        <meta name="twitter:description" content={c.description} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{c.h1}</h1>
              <p className="text-lg text-primary font-medium mb-4">{c.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {c.introBefore}
                <Link to={c.hrefs.stay} className="text-primary underline underline-offset-4 font-medium">{c.introLink}</Link>
                {c.introAfter}
              </p>
            </section>

            <Card className="glass-card border-primary/30 mb-12">
              <CardContent className="p-5 flex gap-3">
                <Smile className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">{c.bias1}</strong>
                  {c.bias2}<em>{c.bias3}</em> <span aria-hidden="true">😉</span>
                  {c.bias4}
                </p>
              </CardContent>
            </Card>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                {c.destH}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {c.destinations.map((d) => (
                  <Card key={d.name} className="glass-card border-border/30">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {d.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{d.p}</p>
                      <Link to={d.link.h} className="text-sm text-primary underline underline-offset-4">
                        {d.link.t}
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-muted-foreground mt-4">
                {c.allComparisons}
                <Link to={c.hrefs.hub} className="text-primary underline underline-offset-4">{c.allComparisonsLink}</Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-primary" />
                {c.seasonsH}
              </h2>
              <div className="space-y-4">
                {c.seasons.map((s) => (
                  <Card key={s.h} className="glass-card border-border/30">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{s.h}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{s.p}</p>
                      <div className="flex flex-wrap gap-4">
                        {s.links.map((l) => (
                          <Link key={l.h} to={l.h} className="text-sm text-primary underline underline-offset-4">
                            {l.t}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-muted-foreground mt-4">
                {c.seasonsMore}
                <Link to={c.hrefs.bestTime} className="text-primary underline underline-offset-4">
                  {c.seasonsMoreLink}
                </Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Plane className="w-6 h-6 text-primary" />
                {c.travelH}
              </h2>
              <p className="text-muted-foreground mb-3">{c.travelP}</p>
              <Link to={c.hrefs.travel} className="text-primary underline underline-offset-4">
                {c.travelLink}
              </Link>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{c.faqH}</h2>
              <Accordion type="single" collapsible className="w-full">
                {c.faq.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{c.chooseH}</h2>
              <p className="text-muted-foreground mb-4">{c.chooseP}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link to={c.hrefs.stay}>
                    {c.ctaStay}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={c.hrefs.moder} target="_blank" rel="noopener noreferrer" data-booking-source="loma-lapissa">
                    {c.ctaAvail}
                  </a>
                </Button>
              </div>
            </section>

            <ReadNextSection title={c.readNextTitle} links={c.readNext} />
          </div>
        </main>

        <PageCTA lang={lang} />
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default LomaLapissa;
