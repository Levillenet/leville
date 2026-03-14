import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getArticleSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Thermometer, ShieldCheck, ShowerHead, Clock, Droplets, Info } from "lucide-react";

import hotTubHero from "@/assets/guide/hot-tub-hero.jpg";
import hotTubChampagne from "@/assets/guide/hot-tub-champagne.jpg";
import hotTubBeanie from "@/assets/guide/hot-tub-beanie.jpg";
import hotTubCover from "@/assets/guide/hot-tub-cover.jpg";

interface Props {
  lang?: string;
}

const OutdoorHotTubLevi = ({ lang: langProp }: Props) => {
  const location = useLocation();
  const lang = ((langProp === "fi" || langProp === "en") ? langProp : location.pathname.startsWith("/opas/") ? "fi" : "en") as Language;

  const hreflangUrls = {
    fi: "https://leville.net/opas/ulkoporeallas-levilla",
    en: "https://leville.net/guide/outdoor-hot-tub-levi-cabin",
  };

  const t = translations[lang as "fi" | "en"];

  const breadcrumbItems = lang === "fi"
    ? [
        { label: "Etusivu", href: "/" },
        { label: "Matkaopas", href: "/opas/matkaopas-levi" },
        { label: t.breadcrumb, href: hreflangUrls.fi },
      ]
    : [
        { label: "Home", href: "/en" },
        { label: "Travel Guide", href: "/guide/travel-to-levi" },
        { label: t.breadcrumb, href: hreflangUrls.en },
      ];

  const articleSchema = getArticleSchema({
    title: t.title,
    description: t.metaDescription,
    url: hreflangUrls[lang as "fi" | "en"],
    lang,
    datePublished: "2026-03-14",
    dateModified: "2026-03-14",
  });

  const breadcrumbSchema = getBreadcrumbSchema(
    breadcrumbItems.map((item) => ({
      name: item.label,
      url: item.href.startsWith("http")
        ? item.href
        : `https://leville.net${item.href}`,
    }))
  );

  return (
    <>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content={t.metaKeywords} />
        <link rel="canonical" href={hreflangUrls[lang]} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={hreflangUrls[lang]} />
      </Helmet>
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={hreflangUrls} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Header />
      <SubpageBackground />

      <main className="min-h-screen">
        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t.intro}
          </p>

          <img
            src={hotTubHero}
            alt={t.heroAlt}
            className="w-full rounded-2xl mb-12 shadow-lg"
            loading="eager"
          />

          {/* What is an outdoor hot tub */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Droplets className="w-7 h-7 text-primary flex-shrink-0" />
              {t.whatTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.whatParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Water temperature */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Thermometer className="w-7 h-7 text-primary flex-shrink-0" />
              {t.tempTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.tempParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <img
              src={hotTubChampagne}
              alt={t.steamAlt}
              className="w-full rounded-2xl mt-6 shadow-lg"
              loading="lazy"
            />
          </section>

          {/* Cover and energy */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-primary flex-shrink-0" />
              {t.coverTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.coverParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="bg-accent/50 border border-border rounded-xl p-5 mt-4">
              <p className="text-foreground font-medium flex items-start gap-2">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                {t.coverImportant}
              </p>
            </div>
            <img
              src={hotTubCover}
              alt={t.coverAlt}
              className="w-full rounded-2xl mt-6 shadow-lg"
              loading="lazy"
            />
          </section>

          {/* Shower before use */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <ShowerHead className="w-7 h-7 text-primary flex-shrink-0" />
              {t.showerTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.showerParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Duration */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Clock className="w-7 h-7 text-primary flex-shrink-0" />
              {t.durationTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.durationParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <img
              src={hotTubBeanie}
              alt={t.beanieAlt}
              className="w-full rounded-2xl mt-6 shadow-lg"
              loading="lazy"
            />
          </section>

          {/* After use */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t.afterTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.afterParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Water level */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t.waterLevelTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {t.waterLevelParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-12 bg-accent/30 border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t.summaryTitle}
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              {t.summaryPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">●</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Internal links */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">{t.relatedTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {t.relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.href}
                  className="block p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <span className="text-primary font-medium">{link.label}</span>
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
    </>
  );
};

const translations = {
  fi: {
    metaTitle: "Ulkoporealtaat Levillä – Opas mökkivieraalle | Leville.net",
    metaDescription: "Ulkoporeallas mökkimajoituksessa Levillä: veden lämpötila, kannen käyttö, suihkussa käynti ja vinkit talviseen kylpyyn. Käytännön opas vieraille.",
    metaKeywords: "poreallas mökissä Levi, ulkoporeallas mökkimajoitus, jacuzzi mökki Levi, poreallas Lappi",
    title: "Ulkoporealtaat Levillä – mitä mökkivieraan on hyvä tietää",
    breadcrumb: "Ulkoporealtaat",
    intro: "Monissa Levin mökeissä ja huoneistoissa, erityisesti isommissa hirsimökeissä ja joissain uudemmissa mökeissä, on ulkoporeallas tai jacuzzi. Poreallas on suosittu tapa rentoutua ulkona arktisessa talvessa. Porealtaan käyttö on yleensä helppoa, mutta muutama tärkeä asia on hyvä tietää ennen käyttöä.",
    heroAlt: "Ulkoporeallas lumisella terassilla Levillä",
    whatTitle: "Mikä on ulkoporeallas mökkimajoituksessa",
    whatParagraphs: [
      "Ulkoporealtaat ovat yleisiä isommissa mökkimajoituksissa Levillä. Niitä löytyy myös joistakin uudenaikaisista mökeistä. Poreallas sijaitsee yleensä terassilla tai ulkokannella.",
      "Vesi on lämmitetty ja valmis käyttöön vieraiden saapuessa. Altaan käyttöönotto ei vaadi erityistoimenpiteitä – riittää, että avaat kannen ja astut sisään.",
    ],
    tempTitle: "Veden lämpötila",
    tempParagraphs: [
      "Veden lämpötila on tavallisesti noin 37 celsiusastetta. Se on mitoitettu mukavaksi myös kylmällä säällä. Lämpötila on yleensä kiinteä tai automaattisesti säädelty.",
      "Kontrasti kylmän ulkoilman ja lämpimän veden välillä on osa elämystä. Tämä tekee ulkoporealtaasta erityisen nautinnollisen juuri talvella, kun pakkasta voi olla kymmeniä asteita.",
    ],
    steamAlt: "Höyryä nousee porealtaasta talvipakkasessa",
    coverTitle: "Porealtaan kansi ja energian säästäminen",
    coverParagraphs: [
      "Porealtaissa on aina paksu eristetty kansi. Kansi voidaan joko nostaa sivuun käsin tai se voi olla kiinnitetty nostomekanismiin, joka pitää sen auki käytön aikana.",
      "Avaa kansi vain silloin, kun käytät allasta. Sulje kansi heti käytön jälkeen.",
    ],
    coverImportant: "Jos kansi jätetään auki, vesi jäähtyy nopeasti. Kovilla pakkasilla lämmitin ei välttämättä pysty pitämään vettä lämpimänä, jos kansi on pitkään auki.",
    coverAlt: "Porealtaan eristetty suojakansi talvimaisemassa",
    showerTitle: "Suihkussa käynti ennen poreallasta",
    showerParagraphs: [
      "Ennen porealtaaseen menoa käy perusteellisesti suihkussa. Älä käytä saippuaa, shampoota tai muita pesuaineita juuri ennen altaaseen menoa.",
      "Vedessä on klooria, joka pitää sen puhtaana. Saippuajäämät aiheuttavat vaahtoa ja heikentävät veden laatua. Huuhtele itsesi pelkällä puhtaalla vedellä.",
    ],
    durationTitle: "Kuinka kauan porealtaassa voi olla",
    durationParagraphs: [
      "Porealtaassa voi olla niin kauan kuin olo tuntuu mukavalta. Monet ihmiset viettävät altaassa noin 20–30 minuuttia kerrallaan.",
      "Hyvä vinkki: käytä pipoa tai lämmintä päähinettä. Kehosta poistuu paljon lämpöä pään kautta, ja lämmin pipo tekee talvisesta kylvystä huomattavasti miellyttävämmän.",
    ],
    beanieAlt: "Henkilö porealtaassa talvipipo päässä Lapin maisemassa",
    afterTitle: "Porealtaan käytön jälkeen",
    afterParagraphs: [
      "Sulje eristetty kansi altaan päälle. Tämä pitää veden lämpimänä ja suojaa järjestelmää.",
      "Tämän jälkeen voit käydä normaalisti suihkussa ja käyttää saippuaa ja shampoota. Halutessasi voit mennä myös saunaan.",
      "Osa vieraista jättää saunan väliin porealtaan jälkeen, koska lämpökokemus on samankaltainen.",
    ],
    waterLevelTitle: "Veden pinnan tarkkailu",
    waterLevelParagraphs: [
      "Veden pinnan tulisi pysyä suodattimen aukon yläpuolella. Jos vedenpinta laskee liian alas, suodatus ja lämmitys voivat lakata toimimasta.",
      "Mökeissä on yleensä ohjeet veden lisäämiseen tarvittaessa. Joissakin kohteissa huoltoyhtiö hoitaa veden lisäyksen – ota tarvittaessa yhteyttä isäntään.",
    ],
    summaryTitle: "Yhteenveto",
    summaryPoints: [
      "Ulkoporeallas on suosittu elämys Levin mökkimajoituksessa",
      "Yksinkertaiset säännöt pitävät veden puhtaana ja lämpimänä",
      "Käy suihkussa ennen altaaseen menoa – älä käytä saippuaa",
      "Pidä kansi suljettuna aina kun et käytä allasta",
      "Nauti kontrastista lämpimän veden ja kylmän talvi-ilman välillä",
    ],
    relatedTitle: "Lue myös",
    relatedLinks: [
      { label: "Sauna mökkimajoituksessa Levillä", href: "/opas/sauna-levilla" },
      { label: "Majoitukset Levillä", href: "/majoitukset" },
      { label: "Matkaopas Leville", href: "/opas/matkaopas-levi" },
      { label: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
    ],
  },
  en: {
    metaTitle: "Outdoor Hot Tubs in Levi – Guest Guide | Leville.net",
    metaDescription: "Outdoor hot tubs in Levi cabin accommodation: water temperature, cover use, showering rules and tips for winter bathing. Practical guide for guests.",
    metaKeywords: "outdoor hot tub Levi cabin, jacuzzi cabin Finland, hot tub Lapland accommodation, poreallas Levi",
    title: "Outdoor hot tubs in Levi – what guests should know",
    breadcrumb: "Outdoor hot tubs",
    intro: "Many cabins and apartments in Levi, especially larger log cabins and some newer eco-style cabins, include an outdoor hot tub or jacuzzi. These are a popular way to relax outdoors in the Arctic winter. Outdoor hot tubs are usually easy to use, but there are a few important things to know before you get in.",
    heroAlt: "Outdoor hot tub on a snowy terrace in Levi",
    whatTitle: "What is an outdoor hot tub in cabin accommodation",
    whatParagraphs: [
      "Outdoor hot tubs are common in larger cabin accommodation in Levi. They are also appearing in some modern eco-style cabins. The hot tub is usually located on a terrace or outdoor deck.",
      "The water is heated and ready for use when guests arrive. You do not need to do anything special to start using it – simply remove the cover and step in.",
    ],
    tempTitle: "Water temperature",
    tempParagraphs: [
      "The water temperature is usually around 37 degrees Celsius. It is designed to feel comfortable even in cold weather. The temperature is normally fixed or controlled automatically.",
      "The contrast between cold air and warm water is part of the experience. This makes outdoor hot tubs particularly enjoyable in winter, when temperatures outside can drop well below freezing.",
    ],
    steamAlt: "Steam rising from a hot tub in winter cold",
    coverTitle: "The hot tub cover and saving energy",
    coverParagraphs: [
      "Hot tubs always have a thick insulated cover. The cover may simply be removed and placed aside, or it may have a lifting mechanism that holds it open during use.",
      "Open the cover only when you are using the tub. Close it immediately after use.",
    ],
    coverImportant: "If the cover is left open, the water cools down quickly. In extreme cold, the heater may not be able to keep up if the cover stays open for a long time.",
    coverAlt: "Insulated hot tub cover in a winter setting",
    showerTitle: "Showering before using the hot tub",
    showerParagraphs: [
      "Before entering the hot tub, take a thorough shower. Do not use soap, shampoo or other products just before getting in.",
      "The water contains chlorine to keep it clean. Soap residue creates foam and contaminates the water. Rinse yourself with clean water only.",
    ],
    durationTitle: "How long can you stay in the hot tub",
    durationParagraphs: [
      "You can stay in the hot tub as long as it feels comfortable. Many people stay around 20 to 30 minutes at a time.",
      "A good tip: wear a hat or beanie. Your body loses a lot of heat through the head, and a warm hat makes winter hot tub bathing much more comfortable.",
    ],
    beanieAlt: "Person in a hot tub wearing a winter beanie in Lapland",
    afterTitle: "After using the hot tub",
    afterParagraphs: [
      "Close the insulated cover over the tub. This keeps the water warm and protects the system.",
      "After that, you can shower normally and use shampoo or soap. You can also go to the sauna if you wish.",
      "Some guests skip the sauna after the hot tub, as the heat experience is similar.",
    ],
    waterLevelTitle: "Monitoring the water level",
    waterLevelParagraphs: [
      "The water level should remain above the filter opening. If the water level drops too low, filtration and heating may stop working.",
      "Cabins usually include instructions for adding water if needed. In some properties, the maintenance company may need to assist – contact your host if you are unsure.",
    ],
    summaryTitle: "Summary",
    summaryPoints: [
      "Outdoor hot tubs are a popular Levi cabin experience",
      "Simple rules keep the water clean and warm",
      "Shower before use – do not use soap",
      "Keep the cover closed when not in use",
      "Enjoy the contrast between warm water and cold winter air",
    ],
    relatedTitle: "Read also",
    relatedLinks: [
      { label: "Finnish sauna in Levi cabins", href: "/guide/finnish-sauna-in-levi" },
      { label: "Accommodation in Levi", href: "/en/accommodations" },
      { label: "Travel guide to Levi", href: "/guide/travel-to-levi" },
      { label: "How to dress for winter in Levi", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
    ],
  },
};

export default OutdoorHotTubLevi;
