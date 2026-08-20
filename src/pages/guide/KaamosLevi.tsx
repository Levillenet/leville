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
import { ArrowRight, Moon, Camera, Sparkles, Snowflake, Shirt } from "lucide-react";
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

// Olemassa olevat kuvat src/assets/seasons — ei uusia kuvatiedostoja.
import kaamosImg from "@/assets/seasons/tykky-kaamos.jpg";
import blueMomentImg from "@/assets/seasons/winter-sunset.jpg";
import nightTrailImg from "@/assets/seasons/night-trail-tykky.jpg";

const BOOKING_URL = "https://app.moder.fi/levillenet";

interface KaamosLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Kaamos Levillä – Milloin, millaista ja mitä silloin tehdään",
      description:
        "Kaamos Levillä: milloin aurinko ei nouse, miltä sininen hetki näyttää ja miksi kaamos on revontulien parasta aikaa. Paikallisen opas kaamosaikaan.",
      canonical: "https://leville.net/opas/kaamos-levi",
    },
    home: "Etusivu",
    homeHref: "/",
    leviHref: "/levi",
    breadcrumbLabel: "Kaamos Levillä",
    title: "Kaamos Levillä",
    subtitle: "Sininen hetki, pitkät hämärät ja revontulien paras aika",
    intro:
      "Kaamos tarkoittaa aikaa, jolloin aurinko ei nouse horisontin yläpuolelle lainkaan. Levi sijaitsee noin 140 km napapiirin pohjoispuolella, ja kaamos kestää täällä noin kolmisen viikkoa joulukuun puolivälin molemmin puolin.",
    intro2:
      "Yleisin väärinkäsitys: kaamos ei ole mustaa pimeää. Keskipäivän tienoilla on useita tunteja hämärää, ja lumi heijastaa kaiken valon takaisin. Kuuluisa sininen hetki värjää tunturit ja metsät syvän sinisiksi tavalla, jota valokuvat eivät oikein tavoita.",
    introBooking: {
      text: "Kaamosaika on Levin tunnelmallisinta aikaa — ",
      link: "katso vapaat huoneistomme joulukuulle",
    },
    when: {
      title: "Milloin kaamos on Levillä?",
      body: "Levin leveysasteella aurinko pysyy horisontin alapuolella suunnilleen joulukuun puolivälistä vuodenvaihteen tienoille. Tarkat päivät vaihtelevat vuosittain muutamalla päivällä, joten kalenteriin ei kannata lyödä lukkoon yhtä päivämäärää.",
      list: [
        "Levi: kaamos kestää noin kolme viikkoa joulukuussa.",
        "Utsjoki ja Suomen pohjoisin kärki: kaamos kestää selvästi pidempään, lähes kaksi kuukautta.",
        "Rovaniemi: käytännössä ei varsinaista kaamosta — aurinko käy juuri ja juuri horisontin yllä.",
      ],
      light:
        "Valoisan ajan määrä joulukuussa: keskipäivällä on tyypillisesti 3–5 tuntia hämärää ja sinistä valoa, jossa näkee hyvin ulkoilla ilman otsalamppua.",
    },
    blue: {
      title: "Sininen hetki",
      body: "Sininen hetki on kaamoksen tavaramerkki. Aurinko on horisontin alapuolella, mutta valo taittuu ilmakehän läpi ja koko maisema — lumi, tykkypuut, tunturin rinteet — saa sinisen sävyn. Valo on tasaista ja varjotonta, minkä takia valokuvaajat rakastavat sitä.",
      tip: "Paras hetki: noin klo 10–14 joulukuussa. Voimakkaimmillaan sininen sävy on hieman ennen ja jälkeen keskipäivän, ja se muuttuu jatkuvasti — puolessa tunnissa maisema näyttää jo toiselta.",
    },
    aurora: {
      title: "Kaamos ja revontulet",
      body: "Kaamos on revontulten kannalta paras mahdollinen aika: pimeitä tunteja on enemmän kuin muulloin, joten mahdollisuuksia nähdä revontulia on yksinkertaisesti enemmän. Kaamos ei kuitenkaan itsessään lisää revontulia — ne riippuvat auringon aktiivisuudesta ja pilvitilanteesta.",
      links: [
        { t: "Paras aika nähdä revontulet Levillä", h: "/opas/paras-aika-revontulet-levi" },
        { t: "Revontulisesonki Levillä", h: "/opas/revontulisesonki-levi" },
        { t: "Revontulien valokuvaus", h: "/opas/revontulien-valokuvaus-levi" },
      ],
    },
    doing: {
      title: "Mitä kaamosaikana tehdään?",
      items: [
        { h: "Laskettelu valaistuissa rinteissä", p: "Rinteet ovat auki normaalisti — Levin valaistut rinteet toimivat kaamoksessa aivan kuten muulloinkin, ja laskeminen valojen loisteessa on oma elämyksensä." },
        { h: "Ladut ja lumikenkäily", p: "Valaistuja latuja riittää, ja hämärässä hiihtäminen tykkypuiden keskellä on rauhallisimpia asioita mitä Levillä voi tehdä." },
        { h: "Safarit", p: "Husky- ja porosafarit sekä moottorikelkkaretket kulkevat kaamoksessakin — hämärä tekee niistä vain tunnelmallisempia." },
        { h: "Sauna ja palju", p: "Kaamosilta, lämmin palju ja tähtitaivas on syy, jonka takia moni palaa Leville joulukuussa uudelleen." },
        { h: "Joulutunnelma", p: "Joulukuu on Levin joulukauden ydintä: joulumarkkinat, valot ja tapahtumat osuvat juuri kaamokseen." },
      ],
      honest:
        "Rehellinen paikallisen huomio: kaamos ei ole lomailijalle masentavaa. Muutaman päivän vierailulla se on ennen kaikkea eksoottista, ja paikalliset elävät aivan normaalia elämää — töissä käydään, lapset harrastavat ja kauppa on auki kuten aina.",
      skiLink: { t: "Laskettelu Levillä", h: "/opas/laskettelu-levi" },
      decLink: { t: "Levi joulukuussa", h: "/opas/levi-joulukuussa" },
    },
    dress: {
      title: "Miten pukeutua ja jaksaa",
      items: [
        "Kerrospukeutuminen: villakerros ihoa vasten, välikerros ja tuulenpitävä kuori. Puuvilla jää märäksi eikä lämmitä.",
        "Ulkoile keskipäivän hämärässä — luonnonvalo tekee hyvää, vaikka aurinko ei nousekaan.",
        "D-vitamiinilisä on Suomessa yleinen suositus pimeään aikaan; pidemmällä oleskelulla se on hyvä muistaa.",
        "Heijastin tai otsalamppu kannattaa pitää mukana: kylätiet ovat valaistuja, mutta reunoilla on hämärää.",
      ],
      link: { t: "Talvivarusteet ja pukeutuminen Levillä", h: "/opas/talvivarusteet-leville" },
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Kuinka kauan kaamos kestää Levillä?", a: "Levin leveysasteella kaamos kestää noin kolme viikkoa, suunnilleen joulukuun puolivälin molemmin puolin. Tarkat päivät vaihtelevat hieman vuodesta toiseen." },
        { q: "Onko kaamosaikana täysin pimeää?", a: "Ei ole. Keskipäivällä on tyypillisesti 3–5 tuntia hämärää, ja sininen hetki valaisee maiseman. Lumi heijastaa valoa tehokkaasti, joten ulkona liikkuminen onnistuu hyvin." },
        { q: "Näkyvätkö revontulet paremmin kaamosaikana?", a: "Pimeitä tunteja on enemmän, joten mahdollisuuksia nähdä revontulia on enemmän. Itse revontulien voimakkuus riippuu kuitenkin auringon aktiivisuudesta ja pilvitilanteesta." },
        { q: "Ovatko rinteet auki kaamosaikana?", a: "Kyllä. Levin rinteet ovat auki normaalisti ja valaistuja rinteitä on käytössä, joten laskettelu onnistuu myös hämärässä ja pimeässä." },
        { q: "Milloin aurinko palaa?", a: "Aurinko nousee horisontin yläpuolelle jälleen vuodenvaihteen tienoilla, ja sen jälkeen päivä pitenee nopeasti — helmikuussa valoa on jo tuntuvasti enemmän." },
      ],
    },
    stay: {
      title: "Majoitus kaamosaikaan",
      body: "Huoneistomme sijaitsevat Levin keskustassa ja rinteiden tuntumassa, joten kaamosaikana ei tarvitse ajaa pimeitä teitä illalla. Joulukuun viikonloput ja joulunpyhät varataan aikaisin.",
      bookingText: "Katso vapaat huoneistot joulukuulle",
      internal: "Selaa kaikkia majoituksiamme",
    },
    images: {
      kaamos: "Kaamosvalo Levin tunturimaisemassa tykkypuiden keskellä",
      blue: "Sininen hetki Levillä joulukuussa — luminen maisema sinisessä hämärässä",
      night: "Valaistu latu ja lumiset puut Levillä kaamosaikaan",
    },
    readNext: {
      title: "Lue seuraavaksi",
      links: [
        { title: "Levi joulukuussa", desc: "Sää, kelit ja jouluohjelma", href: "/opas/levi-joulukuussa" },
        { title: "Levi tammikuussa", desc: "Kylmin kuukausi ja valon paluu", href: "/opas/levi-tammikuussa" },
        { title: "Revontulet Levillä", desc: "Milloin ja mistä katsoa", href: "/revontulet" },
        { title: "Laskettelu Levillä", desc: "Rinteet, hissit ja valaistus", href: "/opas/laskettelu-levi" },
        { title: "Majoitukset Levillä", desc: "Huoneistomme keskustassa", href: "/majoitukset" },
      ] as ReadNextLink[],
    },
    cta: { hub: "Levi-opas", hubLink: "/levi", accommodation: "Katso majoitukset", accommodationLink: "/majoitukset" },
  },
  en: {
    meta: {
      title: "Polar Night in Levi – When It Is & What It's Really Like",
      description:
        "Polar night (kaamos) in Levi, Lapland: when the sun stays below the horizon, the blue moment, and why it's prime northern lights season. A local's guide.",
      canonical: "https://leville.net/guide/polar-night-levi",
    },
    home: "Home",
    homeHref: "/en",
    leviHref: "/en/levi",
    breadcrumbLabel: "Polar night in Levi",
    title: "Polar Night in Levi",
    subtitle: "The blue moment, long twilights and the best time for northern lights",
    intro:
      "Polar night — kaamos in Finnish — is the period when the sun does not rise above the horizon at all. Levi lies roughly 140 km north of the Arctic Circle, and here the polar night lasts about three weeks around the middle of December.",
    intro2:
      "The most common misconception: polar night is not pitch black. Around midday there are several hours of twilight, and the snow reflects every bit of light back. The famous blue moment turns the fells and forests deep blue in a way photographs never quite capture.",
    introBooking: {
      text: "Polar night is Levi at its most atmospheric — ",
      link: "see our available apartments for December",
    },
    when: {
      title: "When is the polar night in Levi?",
      body: "At Levi's latitude the sun stays below the horizon from roughly mid-December until around New Year. The exact dates shift by a few days from year to year, so don't pin your trip to one specific date.",
      list: [
        "Levi: polar night lasts about three weeks in December.",
        "Utsjoki and Finland's northernmost tip: clearly longer, close to two months.",
        "Rovaniemi: practically no true polar night — the sun just barely clears the horizon.",
      ],
      light:
        "Daylight in December: typically 3–5 hours of twilight and blue light around midday — enough to be outdoors comfortably without a headlamp.",
    },
    blue: {
      title: "The blue moment",
      body: "The blue moment is the signature of the polar night. The sun is below the horizon, but light refracts through the atmosphere and the whole landscape — snow, snow-laden trees, the fell slopes — takes on a blue tone. The light is even and shadowless, which is exactly why photographers love it.",
      tip: "Best time: roughly 10am–2pm in December. The blue is strongest just before and after midday, and it keeps changing — half an hour later the landscape already looks different.",
    },
    aurora: {
      title: "Polar night and the northern lights",
      body: "Polar night is the best possible time for auroras: there are simply more dark hours, so more chances to see them. The polar night itself doesn't create auroras — those depend on solar activity and cloud cover.",
      links: [
        { t: "Best time to see the northern lights in Levi", h: "/guide/best-time-to-see-northern-lights-levi" },
        { t: "Northern lights season in Levi", h: "/guide/northern-lights-season-levi" },
        { t: "Northern lights photography", h: "/guide/northern-lights-photography-levi" },
      ],
    },
    doing: {
      title: "What to do during the polar night",
      items: [
        { h: "Skiing on floodlit slopes", p: "The slopes run as normal — Levi's floodlit pistes work in polar night just like any other time, and skiing under the lights is an experience of its own." },
        { h: "Trails and snowshoeing", p: "There are plenty of lit cross-country tracks, and skiing through snow-covered trees in the twilight is about the calmest thing you can do in Levi." },
        { h: "Safaris", p: "Husky and reindeer safaris and snowmobile tours run through the polar night too — the twilight only makes them more atmospheric." },
        { h: "Sauna and hot tub", p: "A dark evening, a warm hot tub and a starry sky is the reason many guests come back to Levi in December." },
        { h: "Christmas atmosphere", p: "December is the heart of Levi's Christmas season: markets, lights and events all fall right into the polar night." },
      ],
      honest:
        "An honest local note: polar night is not depressing for a visitor. On a short trip it's mostly exotic, and locals live completely normal lives — work, hobbies, shops open as always.",
      skiLink: { t: "Skiing in Levi", h: "/guide/skiing-in-levi" },
      decLink: { t: "Levi in December", h: "/guide/levi-in-december" },
    },
    dress: {
      title: "How to dress and cope",
      items: [
        "Layer up: wool next to skin, an insulating mid layer and a windproof shell. Cotton stays wet and won't keep you warm.",
        "Get outside during the midday twilight — natural light does you good even when the sun doesn't rise.",
        "A vitamin D supplement is a standard recommendation in Finland during the dark season; worth remembering on a longer stay.",
        "Carry a reflector or a headlamp: village roads are lit, but the edges are dim.",
      ],
      link: { t: "How to dress for winter in Levi", h: "/guide/how-to-dress-for-winter-in-levi-lapland" },
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "How long does the polar night last in Levi?", a: "At Levi's latitude it lasts about three weeks, roughly around the middle of December. The exact dates vary slightly from year to year." },
        { q: "Is it completely dark during the polar night?", a: "No. There are typically 3–5 hours of twilight around midday, and the blue moment lights up the landscape. Snow reflects light efficiently, so getting around outdoors is easy." },
        { q: "Are the northern lights better during the polar night?", a: "There are more dark hours, so there are more chances to see them. The strength of the auroras themselves depends on solar activity and cloud cover." },
        { q: "Are the slopes open during the polar night?", a: "Yes. Levi's slopes operate normally and floodlit pistes are in use, so skiing works fine in twilight and darkness." },
        { q: "When does the sun come back?", a: "The sun climbs above the horizon again around the turn of the year, and after that days lengthen fast — by February there is noticeably more light." },
      ],
    },
    stay: {
      title: "Where to stay during the polar night",
      body: "Our apartments are in Levi centre and close to the slopes, so you won't be driving dark roads in the evening. December weekends and the Christmas holidays book up early.",
      bookingText: "See available apartments for December",
      internal: "Browse all our accommodation",
    },
    images: {
      kaamos: "Polar night light over the Levi fell landscape with snow-covered trees",
      blue: "The blue moment in Levi in December — a snowy landscape in blue twilight",
      night: "A lit cross-country trail and snowy trees in Levi during the polar night",
    },
    readNext: {
      title: "Read next",
      links: [
        { title: "Levi in December", desc: "Weather, conditions and Christmas programme", href: "/guide/levi-in-december" },
        { title: "Levi in January", desc: "The coldest month and the return of light", href: "/guide/levi-in-january" },
        { title: "Northern lights in Levi", desc: "When and where to look", href: "/en/northern-lights" },
        { title: "Skiing in Levi", desc: "Slopes, lifts and floodlighting", href: "/guide/skiing-in-levi" },
        { title: "Accommodation in Levi", desc: "Our apartments in the centre", href: "/en/accommodations" },
      ] as ReadNextLink[],
    },
    cta: { hub: "Levi guide", hubLink: "/en/levi", accommodation: "See accommodation", accommodationLink: "/en/accommodations" },
  },
};

const KaamosLevi = ({ lang = "fi" }: KaamosLeviProps) => {
  const location = useLocation();
  const t = lang === "en" ? translations.en : translations.fi;

  const customUrls = {
    fi: "/opas/kaamos-levi",
    en: "/guide/polar-night-levi",
  };

  const breadcrumbItems = [
    { label: t.home, href: t.homeHref },
    { label: "Levi", href: t.leviHref },
    { label: t.breadcrumbLabel, href: "" },
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
              <p className="text-muted-foreground max-w-2xl mx-auto mb-3">{t.intro}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro2}</p>
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-left">
                {t.introBooking.text}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-booking-source="kaamos-levi-intro"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  {t.introBooking.link}
                </a>
                .
              </p>
            </section>

            <ImageBlock src={kaamosImg} alt={t.images.kaamos} />

            {/* When */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Moon className="w-6 h-6 text-primary" />
                {t.when.title}
              </h2>
              <p className="text-muted-foreground mb-4">{t.when.body}</p>
              <ul className="space-y-2 mb-4">
                {t.when.list.map((item) => (
                  <li key={item} className="text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">{t.when.light}</p>
            </section>

            {/* Blue moment */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                {t.blue.title}
              </h2>
              <p className="text-muted-foreground mb-3">{t.blue.body}</p>
              <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">{t.blue.tip}</p>
            </section>

            <ImageBlock src={blueMomentImg} alt={t.images.blue} />

            {/* Aurora */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                {t.aurora.title}
              </h2>
              <p className="text-muted-foreground mb-4">{t.aurora.body}</p>
              <ul className="space-y-2">
                {t.aurora.links.map((l) => (
                  <li key={l.h}>
                    <Link to={l.h} className="text-primary underline underline-offset-4">
                      {l.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* What to do */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Snowflake className="w-6 h-6 text-primary" />
                {t.doing.title}
              </h2>
              <div className="space-y-4 mb-4">
                {t.doing.items.map((item) => (
                  <Card key={item.h} className="glass-card border-border/30">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.h}</h3>
                      <p className="text-sm text-muted-foreground">{item.p}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">{t.doing.honest}</p>
              <div className="flex flex-wrap gap-4">
                <Link to={t.doing.skiLink.h} className="text-primary underline underline-offset-4">
                  {t.doing.skiLink.t}
                </Link>
                <Link to={t.doing.decLink.h} className="text-primary underline underline-offset-4">
                  {t.doing.decLink.t}
                </Link>
              </div>
            </section>

            <ImageBlock src={nightTrailImg} alt={t.images.night} />

            {/* Dressing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shirt className="w-6 h-6 text-primary" />
                {t.dress.title}
              </h2>
              <ul className="space-y-2 mb-4">
                {t.dress.items.map((item) => (
                  <li key={item} className="text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={t.dress.link.h} className="text-primary underline underline-offset-4">
                {t.dress.link.t}
              </Link>
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
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="kaamos-levi-majoitus">
                    {t.stay.bookingText}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to={t.cta.accommodationLink}>{t.stay.internal}</Link>
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

export default KaamosLevi;
