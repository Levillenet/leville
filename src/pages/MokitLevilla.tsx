import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import PageCTA from "@/components/PageCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Flame, Home, MapPin, TreePine, Users } from "lucide-react";
import { properties } from "@/data/properties";
import { getFAQSchema } from "@/utils/structuredData";

const YEAR = new Date().getFullYear();
const CANONICAL_FI = "https://leville.net/mokit-levilla";
const CANONICAL_EN = "https://leville.net/en/cabins";
const BOOKING_URL = "https://app.moder.fi/levillenet";

interface MokitLevillaProps {
  lang?: "fi" | "en";
}

const ui = {
  fi: {
    canonical: CANONICAL_FI,
    title: `Mökit Leviltä ${YEAR} — vuokramökit ja loma-asunnot keskustassa`,
    description:
      "Vuokraa mökki Leviltä suoraan omistajalta. Hirsimökkejä ja tilavia loma-asuntoja Levin keskustassa, omat saunat ja kävelymatka rinteille.",
    keywords:
      "mökki Levi, mökit Leviltä, vuokramökki Levi, hirsimökki Levi, loma-asunto Levi, mökki Levillä, mökkivuokraus Levi",
    h1: `Mökit Leviltä ${YEAR} — vuokramökit ja loma-asunnot keskustassa`,
    intro:
      "Suomalaiselle mökki tarkoittaa usein mitä tahansa loma-asuntoa, jossa on saunan tuoksua, takan rätinää ja oma rauha. Leville.net tarjoaa Levin keskustasta sekä perinteisiä hirsimökkejä että tilavia, mökkimäisiä loma-asuntoja — kaikissa omat saunat, useimmissa takat ja kävelymatka rinteille.",
    cabins: "Perinteiset hirsimökit",
    cabinsDesc:
      "Aitoa hirsirakenteista mökkitunnelmaa Levin keskustassa. Omat pihat, takat ja saunat — kuten suomalainen mökki kuuluu olla.",
    cabinLike: "Mökkimäiset huoneistot",
    cabinLikeDesc:
      "Tilavia loma-asuntoja, joissa on oma sauna ja takka — sama tunnelma kuin mökissä, mutta keskustan kävelyetäisyydellä rinteistä, ravintoloista ja kaupoista.",
    groupCabins: "Mökit isolle porukalle (8+ hlöä)",
    groupCabinsDesc:
      "Tilavat mökit ja loma-asunnot 8–14 hengen seurueille — sopivia perheille, ystäväporukoille ja yritystapahtumiin.",
    whatIsCabin: "Mikä lasketaan mökiksi Levillä?",
    faqTitle: "Usein kysyttyä mökeistä Levillä",
    readNext: "Lue myös",
    bookCta: "Varaa mökki suoraan meiltä",
    bookCtaDesc:
      "Tarkista saatavuus ja varaa Levin keskustan mökit ja loma-asunnot suoraan omistajalta. Samat kohteet kuin Booking.comissa.",
    bookCtaBtn: "Katso vapaat mökit",
    guests: "hlöä",
    availability: "Saatavuus",
    categoriesAria: "Mökkikategoriat",
  },
  en: {
    canonical: CANONICAL_EN,
    title: `Cabins in Levi ${YEAR} — log villas and holiday homes in the centre`,
    description:
      "Rent a cabin or holiday home in Levi directly from the owner. Log villas and spacious apartments in Levi Center, private saunas and walking distance to the slopes.",
    keywords:
      "cabin Levi, cabins in Levi, log villa Levi, holiday home Levi, Levi cabin rental, Levi accommodation",
    h1: `Cabins in Levi ${YEAR} — log villas and holiday homes in the centre`,
    intro:
      "In Finland, 'mökki' (cabin) can mean any holiday home with sauna steam, a crackling fireplace and your own peace. Leville.net offers both traditional log cabins and spacious cabin-like apartments in Levi Center — all with private saunas, most with fireplaces, and walking distance to the slopes.",
    cabins: "Traditional log cabins",
    cabinsDesc:
      "Authentic log-built cabin atmosphere in Levi Center. Private yards, fireplaces and saunas — just as a Finnish cabin should be.",
    cabinLike: "Cabin-like apartments",
    cabinLikeDesc:
      "Spacious holiday apartments with private sauna and fireplace — the same cabin feeling, but within walking distance of the slopes, restaurants and shops.",
    groupCabins: "Group cabins (8+ guests)",
    groupCabinsDesc:
      "Large cabins and holiday homes for groups of 8–14 guests — ideal for families, friends and corporate trips.",
    whatIsCabin: "What counts as a cabin in Levi?",
    faqTitle: "Frequently asked questions about cabins in Levi",
    readNext: "Read next",
    bookCta: "Book a cabin directly with us",
    bookCtaDesc:
      "Check availability and book cabins and holiday homes in Levi Center directly from the owner. Same properties as on Booking.com.",
    bookCtaBtn: "See available cabins",
    guests: "guests",
    availability: "Availability",
    categoriesAria: "Cabin categories",
  },
};

const MokitLevilla = ({ lang = "fi" }: MokitLevillaProps) => {
  const location = useLocation();
  const t = ui[lang];
  const isEn = lang === "en";

  // Real log cabins
  const hirsimokit = useMemo(
    () => properties.filter((p) => p.tags.includes("cabin")),
    []
  );

  // "Mökkimäiset" — large apartments with sauna and fireplace, popular among "mökki" searchers
  const mokkimaiset = useMemo(
    () =>
      properties
        .filter(
          (p) =>
            !p.tags.includes("cabin") &&
            p.sauna &&
            p.fireplace &&
            p.maxGuests >= 6
        )
        .slice(0, 6),
    []
  );

  // Group lodgings (8+ guests)
  const ryhmamokit = useMemo(
    () =>
      properties
        .filter((p) => p.tags.includes("large-group") && !p.tags.includes("cabin"))
        .slice(0, 6),
    []
  );

  const faqs = isEn
    ? [
        {
          question: "Are there cabins for rent in Levi?",
          answer:
            "Yes. Leville.net has both traditional log cabins and spacious cabin-like holiday homes in Levi Center, all with private saunas and most with fireplaces. Most are within walking distance of the slopes and services.",
        },
        {
          question: "What is the difference between a cabin and an apartment in Levi?",
          answer:
            "In Finland, 'mökki' (cabin) is a broad term. In Levi, 'real' cabins are log-built and often have their own yard, while cabin-like apartments are part of a larger building. Both typically have a private sauna, fireplace and full kitchen — the cabin feeling is the same.",
        },
        {
          question: "Do the cabins have a private sauna?",
          answer:
            "All our log cabins and nearly all cabin-like apartments have a private electric sauna. This is standard in Finland but often a pleasant surprise for international guests.",
        },
        {
          question: "Where can I find an affordable cabin in Levi?",
          answer:
            "The cheapest cabin bookings are usually found outside peak seasons — early winter in November-December, between winter holidays in late February, and summer. Book directly through Leville.net to avoid intermediary service fees.",
        },
        {
          question: "Can I book a cabin in Levi for a large group?",
          answer:
            "Yes. We have several properties for 8–14 guests, including the 220 m² Karhupirtti log cabin in Levi Center and large holiday apartments in the Glacier area. Suitable for companies, families and groups of friends.",
        },
      ]
    : [
        {
          question: "Onko Levillä vuokramökkejä?",
          answer:
            "Kyllä. Leville.netillä on Levin keskustassa sekä perinteisiä hirsimökkejä että tilavia mökkimäisiä loma-asuntoja, joissa on omat saunat ja takat. Useimmissa kohteissa on kävelymatka rinteille ja palveluille.",
        },
        {
          question: "Mikä on mökin ja huoneiston ero Levillä?",
          answer:
            "Mökki tarkoittaa Suomessa puhekielessä mitä tahansa loma-asuntoa. Levillä 'oikeat' mökit ovat hirsirakenteisia ja usein omalla pihalla, kun taas mökkimäiset huoneistot ovat osa kerros- tai rivitalokokonaisuutta. Molemmissa on tyypillisesti oma sauna, takka ja täysi keittiö — mökkifiilis säilyy.",
        },
        {
          question: "Onko mökeissä oma sauna?",
          answer:
            "Kaikissa hirsimökeissämme ja lähes kaikissa mökkimäisissä huoneistoissamme on oma sähkösauna. Tämä on Suomessa standardi mutta usein iloinen yllätys ulkomaalaisille vieraille.",
        },
        {
          question: "Mistä saa edullisen mökin Leviltä?",
          answer:
            "Edullisimmat mökkivaraukset löytyvät yleensä sesonkien ulkopuolelta — alkutalvesta marras-joulukuussa, hiihtolomien välissä helmikuun lopussa, sekä kesällä. Varaa suoraan Leville.netin kautta välttääksesi varauspalveluiden välityskulut.",
        },
        {
          question: "Voiko Levin mökit varata isolle porukalle?",
          answer:
            "Kyllä. Meillä on useita 8–14 hengen kohteita, mukaan lukien 220 m² Karhupirtti -hirsimökki Levin keskustassa sekä isoja loma-asuntoja Glacier-alueella. Sopivat firmoille, perheille ja ystäväporukoille.",
        },
      ];

  const breadcrumbs = isEn
    ? [
        { label: "Home", href: "/en" },
        { label: "Accommodation", href: "/en/accommodations" },
        { label: "Cabins in Levi", href: "/en/cabins" },
      ]
    : [
        { label: "Etusivu", href: "/" },
        { label: "Majoitus", href: "/majoitukset" },
        { label: "Mökit Leviltä", href: "/mokit-levilla" },
      ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.title,
    description: t.description,
    url: t.canonical,
    inLanguage: isEn ? "en-GB" : "fi-FI",
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={getFAQSchema(faqs)} />
      <HreflangTags
        currentPath={location.pathname}
        currentLang={lang}
        customUrls={{ fi: CANONICAL_FI, en: CANONICAL_EN }}
      />
      <Helmet>
        <html lang={lang} />
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content={t.keywords} />
        <link rel="canonical" href={t.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.canonical} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:locale" content={isEn ? "en_GB" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />

        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Breadcrumbs lang={lang} items={breadcrumbs} />

            {/* Hero */}
            <ScrollReveal>
              <header className="text-center mb-12 mt-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  {t.h1}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {t.intro}
                </p>
              </header>
            </ScrollReveal>

            {/* Quick categories nav */}
            <ScrollReveal>
              <nav
                aria-label={t.categoriesAria}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12"
              >
                <a
                  href="#hirsimokit"
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <TreePine className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t.cabins}</span>
                </a>
                <a
                  href="#mokkimaiset"
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <Home className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t.cabinLike}</span>
                </a>
                <a
                  href="#ryhmamokit"
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t.groupCabins}</span>
                </a>
              </nav>
            </ScrollReveal>

            {/* Section: Real log cabins */}
            <section id="hirsimokit" className="mb-16 scroll-mt-24">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <TreePine className="w-7 h-7 text-primary" />
                  <h2 className="text-3xl font-bold">{t.cabins}</h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  {t.cabinsDesc}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hirsimokit.map((p) => (
                  <Card key={p.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <span>{p.name}</span>
                        <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">
                          {p.guestRange} {t.guests}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {p.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {p.location}
                        </span>
                        {p.sauna && (
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Sauna
                          </span>
                        )}
                        {p.fireplace && (
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Takka
                          </span>
                        )}
                      </div>
                      <a
                        href={p.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                      >
                        {t.bookCtaBtn} <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Info box: what is a mökki */}
            <ScrollReveal>
              <aside className="mb-16 p-6 md:p-8 rounded-xl bg-muted/40 border border-border">
                <h2 className="text-2xl font-bold mb-3">{t.whatIsCabin}</h2>
                {isEn ? (
                  <>
                    <p className="text-muted-foreground mb-3">
                      In Finnish, <em>mökki</em> is a broad term. In Levi Center,
                      a "cabin" can mean a log building with its own yard, but also
                      a spacious holiday apartment with a private sauna, fireplace
                      and peace of its own. Most guests looking for a cabin will
                      find the perfect holiday home in our apartment selection too —
                      the same sauna feeling, the same comfort, just without a
                      separate yard.
                    </p>
                    <p className="text-muted-foreground">
                      If you want a true log cabin, we recommend{" "}
                      <strong>Karhupirtti</strong>. If cabin atmosphere within
                      walking distance of the center is enough, choose one of our
                      apartments with sauna and fireplace.
                    </p>
                    <Link
                      to="/en/guide/cabin-vs-apartment-levi"
                      className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:underline"
                    >
                      Read: Cabin or apartment? How to choose
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-3">
                      Suomen kielessä <em>mökki</em> on laaja käsite. Levin
                      keskustassa "mökki" voi tarkoittaa hirsirakennusta omalla
                      pihalla, mutta myös tilavaa loma-asuntoa, jossa on oma sauna,
                      takka ja oma rauha. Useimmat mökkiä etsivät vieraat löytävät
                      täydellisen lomakohteen myös huoneistovalikoimastamme — sama
                      saunafiilis, sama mukavuus, vain ilman erillistä pihaa.
                    </p>
                    <p className="text-muted-foreground">
                      Jos kaipaat puhdasta hirsimökkiä, suosittelemme{" "}
                      <strong>Karhupirttiä</strong>. Jos taas riittää
                      mökkitunnelma keskustan kävelyetäisyydellä, valitse jokin
                      saunan ja takan sisältävistä huoneistoistamme.
                    </p>
                    <Link
                      to="/opas/mokki-vai-huoneisto-levi"
                      className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:underline"
                    >
                      Lue: Mökki vai huoneisto? Näin valitset oikean
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </aside>
            </ScrollReveal>

            {/* Section: Cabin-like apartments */}
            <section id="mokkimaiset" className="mb-16 scroll-mt-24">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <Home className="w-7 h-7 text-primary" />
                  <h2 className="text-3xl font-bold">{t.cabinLike}</h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  {t.cabinLikeDesc}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mokkimaiset.map((p) => (
                  <Card key={p.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                        {p.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                        <span>{p.guestRange} {t.guests}</span>
                        <span>· {p.sqm} m²</span>
                        {p.sauna && <span>· Sauna</span>}
                        {p.fireplace && <span>· Takka</span>}
                      </div>
                      <a
                        href={p.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                      >
                        {t.availability} <ArrowRight className="w-3 h-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section: Group cabins */}
            <section id="ryhmamokit" className="mb-16 scroll-mt-24">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-7 h-7 text-primary" />
                  <h2 className="text-3xl font-bold">{t.groupCabins}</h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  {t.groupCabinsDesc}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ryhmamokit.map((p) => (
                  <Card key={p.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                        {p.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                        <span>{p.guestRange} {t.guests}</span>
                        <span>· {p.sqm} m²</span>
                        {p.sauna && <span>· Sauna</span>}
                      </div>
                      <a
                        href={p.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                      >
                        {t.availability} <ArrowRight className="w-3 h-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <ScrollReveal>
                <h2 className="text-3xl font-bold mb-6">{t.faqTitle}</h2>
              </ScrollReveal>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Read next */}
            <section aria-label={t.readNext} className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{t.readNext}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to={isEn ? "/en/guide/cabin-vs-apartment-levi" : "/opas/mokki-vai-huoneisto-levi"}
                  className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <div className="font-medium mb-1">
                    {isEn ? "Cabin or apartment? How to choose" : "Mökki vai huoneisto? Näin valitset"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isEn ? "Comparison of Levi accommodation types" : "Vertailu Levin majoitustyypeistä"}
                  </div>
                </Link>
                <Link
                  to={isEn ? "/en/accommodations" : "/majoitukset"}
                  className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <div className="font-medium mb-1">
                    {isEn ? "All accommodations" : "Kaikki majoitukset"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isEn ? "27 apartments and cabins in Levi Center" : "27 huoneistoa ja mökkiä Levin keskustassa"}
                  </div>
                </Link>
                <Link
                  to={isEn ? "/en/sauna" : "/sauna"}
                  className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <div className="font-medium mb-1">
                    {isEn ? "Sauna guide" : "Sauna-opas"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isEn ? "Sauna types and tradition in Levi" : "Saunatyypit ja saunaperinne Levillä"}
                  </div>
                </Link>
              </div>
            </section>

            {/* CTA */}
            <ScrollReveal>
              <div className="text-center p-8 rounded-xl bg-primary/5 border border-primary/20">
                <h2 className="text-2xl font-bold mb-2">{t.bookCta}</h2>
                <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                  {t.bookCtaDesc}
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  {t.bookCtaBtn} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
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

export default MokitLevilla;
