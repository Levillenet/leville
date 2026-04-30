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
const CANONICAL = "https://leville.net/mokit-levilla";
const BOOKING_URL = "https://app.moder.fi/levillenet";

const MokitLevilla = () => {
  const location = useLocation();

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

  const faqs = [
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

  const breadcrumbs = [
    { label: "Etusivu", href: "/" },
    { label: "Majoitus", href: "/majoitukset" },
    { label: "Mökit Leviltä", href: "/mokit-levilla" },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Mökit Leviltä ${YEAR}`,
    description:
      "Vuokramökit ja mökkimäiset loma-asunnot Levin keskustassa — hirsimökit, omat saunat ja kävelymatka rinteille.",
    url: CANONICAL,
    inLanguage: "fi-FI",
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={getFAQSchema(faqs)} />
      <HreflangTags
        currentPath={location.pathname}
        currentLang="fi"
        customUrls={{ fi: CANONICAL }}
      />
      <Helmet>
        <html lang="fi" />
        <title>{`Mökit Leviltä ${YEAR} — vuokramökit ja loma-asunnot keskustassa`}</title>
        <meta
          name="description"
          content="Vuokraa mökki Leviltä suoraan omistajalta. Hirsimökkejä ja tilavia loma-asuntoja Levin keskustassa, omat saunat ja kävelymatka rinteille."
        />
        <meta
          name="keywords"
          content="mökki Levi, mökit Leviltä, vuokramökki Levi, hirsimökki Levi, loma-asunto Levi, mökki Levillä, mökkivuokraus Levi"
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta
          property="og:title"
          content={`Mökit Leviltä ${YEAR} — vuokramökit ja loma-asunnot`}
        />
        <meta
          property="og:description"
          content="Hirsimökit ja tilavat loma-asunnot Levin keskustassa, omat saunat ja kävelymatka rinteille."
        />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />

        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Breadcrumbs lang="fi" items={breadcrumbs} />

            {/* Hero */}
            <ScrollReveal>
              <header className="text-center mb-12 mt-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Mökit Leviltä {YEAR} — vuokramökit ja loma-asunnot keskustassa
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Suomalaiselle <strong>mökki</strong> tarkoittaa usein mitä
                  tahansa loma-asuntoa, jossa on saunan tuoksua, takan rätinää
                  ja oma rauha. Leville.net tarjoaa Levin keskustasta sekä
                  perinteisiä hirsimökkejä että tilavia, mökkimäisiä
                  loma-asuntoja — kaikissa omat saunat, useimmissa takat ja
                  kävelymatka rinteille.
                </p>
              </header>
            </ScrollReveal>

            {/* Quick categories nav */}
            <ScrollReveal>
              <nav
                aria-label="Mökkikategoriat"
                className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12"
              >
                <a
                  href="#hirsimokit"
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <TreePine className="w-5 h-5 text-primary" />
                  <span className="font-medium">Perinteiset hirsimökit</span>
                </a>
                <a
                  href="#mokkimaiset"
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <Home className="w-5 h-5 text-primary" />
                  <span className="font-medium">Mökkimäiset huoneistot</span>
                </a>
                <a
                  href="#ryhmamokit"
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">Ryhmämökit (8+ hlöä)</span>
                </a>
              </nav>
            </ScrollReveal>

            {/* Section: Real log cabins */}
            <section id="hirsimokit" className="mb-16 scroll-mt-24">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <TreePine className="w-7 h-7 text-primary" />
                  <h2 className="text-3xl font-bold">Perinteiset hirsimökit</h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  Aitoa hirsirakenteista mökkitunnelmaa Levin keskustassa.
                  Omat pihat, takat ja saunat — kuten suomalainen mökki kuuluu
                  olla.
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hirsimokit.map((p) => (
                  <Card key={p.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-4">
                        <span>{p.name}</span>
                        <span className="text-sm font-normal text-muted-foreground whitespace-nowrap">
                          {p.guestRange} hlöä
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
                        Tarkista saatavuus <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Info box: what is a mökki */}
            <ScrollReveal>
              <aside className="mb-16 p-6 md:p-8 rounded-xl bg-muted/40 border border-border">
                <h2 className="text-2xl font-bold mb-3">
                  Mikä lasketaan mökiksi Levillä?
                </h2>
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
              </aside>
            </ScrollReveal>

            {/* Section: Cabin-like apartments */}
            <section id="mokkimaiset" className="mb-16 scroll-mt-24">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <Home className="w-7 h-7 text-primary" />
                  <h2 className="text-3xl font-bold">Mökkimäiset huoneistot</h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  Tilavia loma-asuntoja, joissa on oma sauna ja takka — sama
                  tunnelma kuin mökissä, mutta keskustan kävelyetäisyydellä
                  rinteistä, ravintoloista ja kaupoista.
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
                        <span>{p.guestRange} hlöä</span>
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
                        Saatavuus <ArrowRight className="w-3 h-3" />
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
                  <h2 className="text-3xl font-bold">
                    Mökit isolle porukalle (8+ hlöä)
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  Tilavat mökit ja loma-asunnot 8–14 hengen seurueille — sopivia
                  perheille, ystäväporukoille ja yritystapahtumiin.
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
                        <span>{p.guestRange} hlöä</span>
                        <span>· {p.sqm} m²</span>
                        {p.sauna && <span>· Sauna</span>}
                      </div>
                      <a
                        href={p.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                      >
                        Saatavuus <ArrowRight className="w-3 h-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <ScrollReveal>
                <h2 className="text-3xl font-bold mb-6">
                  Usein kysyttyä mökeistä Levillä
                </h2>
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
            <section aria-label="Lue myös" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Lue myös</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/opas/mokki-vai-huoneisto-levi"
                  className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <div className="font-medium mb-1">
                    Mökki vai huoneisto? Näin valitset
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Vertailu Levin majoitustyypeistä
                  </div>
                </Link>
                <Link
                  to="/majoitukset"
                  className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <div className="font-medium mb-1">Kaikki majoitukset</div>
                  <div className="text-sm text-muted-foreground">
                    27 huoneistoa ja mökkiä Levin keskustassa
                  </div>
                </Link>
                <Link
                  to="/sauna"
                  className="p-4 rounded-lg border bg-card hover:border-primary transition-colors"
                >
                  <div className="font-medium mb-1">Sauna-opas</div>
                  <div className="text-sm text-muted-foreground">
                    Saunatyypit ja saunaperinne Levillä
                  </div>
                </Link>
              </div>
            </section>

            {/* CTA */}
            <ScrollReveal>
              <div className="text-center p-8 rounded-xl bg-primary/5 border border-primary/20">
                <h2 className="text-2xl font-bold mb-2">
                  Varaa mökki suoraan meiltä
                </h2>
                <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                  Tarkista saatavuus ja varaa Levin keskustan mökit ja
                  loma-asunnot suoraan omistajalta. Samat kohteet kuin
                  Booking.comissa.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Katso vapaat mökit <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </main>

        <Footer lang="fi" />
        <WhatsAppChat lang="fi" />
        <StickyBookingBar lang="fi" />
      </div>
    </>
  );
};

export default MokitLevilla;
