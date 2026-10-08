import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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

// Suomenkielinen kokoava hub-sivu haulle "loma lapissa". Ei EN-versiota → ei hreflangia.
const CANONICAL = "https://leville.net/opas/loma-lapissa";
const TITLE = "Loma Lapissa – kohteet, sesongit ja vinkit | Leville.net";
const DESCRIPTION =
  "Loma Lapissa: Levi, Ylläs, Rovaniemi vai Saariselkä? Vertailu, parhaat sesongit ja matkavinkit paikallisen toimijan näkökulmasta.";

const destinations = [
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
    p: "Rauhallinen tunturikylä Inarissa, Urho Kekkosen kansallispuiston kupeessa. Sopii hiljaisuutta ja erämaata etsivälle.",
    link: { t: "Levi vs Saariselkä", h: "/opas/levi-vs-saariselka" },
  },
];

const seasons = [
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
];

const faq = [
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
];

const readNext: ReadNextLink[] = [
  { title: "Vertailut", desc: "Levi muihin kohteisiin verrattuna", href: "/opas/miksi-valita-levi" },
  { title: "Paras aika matkustaa Leville", desc: "Kuukausi kuukaudelta", href: "/opas/paras-aika-matkustaa-leville" },
  { title: "Miten pääsee Leville", desc: "Lento, juna ja auto", href: "/matka/miten-paasee-leville-helsingista" },
  { title: "Majoitus Levillä", desc: "Huoneistot suoraan omistajalta", href: "/majoitukset" },
];

const LomaLapissa = () => {
  const breadcrumbItems = [
    { label: "Levi", href: "/levi" },
    { label: "Loma Lapissa", href: "" },
  ];

  return (
    <>
      <JsonLd data={getArticleSchema({ title: "Loma Lapissa", description: DESCRIPTION, url: CANONICAL, lang: "fi" })} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Etusivu", url: "https://leville.net/" },
          { name: "Levi", url: "https://leville.net/levi" },
          { name: "Loma Lapissa", url: CANONICAL },
        ])}
      />
      <JsonLd data={getFAQSchema(faq.map((i) => ({ question: i.q, answer: i.a })))} />
      <Helmet>
        <html lang="fi" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Loma Lapissa</h1>
              <p className="text-lg text-primary font-medium mb-4">Kohteen valinta, sesongit ja käytännön vinkit</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lapin loma voi tarkoittaa laskettelua, revontulia, joulutunnelmaa tai kesän yötöntä yötä. Kokosimme
                tälle sivulle tärkeimmät asiat kohteen ja ajankohdan valintaan. Kun päädyt Leville, katso{" "}
                <Link to="/majoitukset" className="text-primary underline underline-offset-4 font-medium">majoitus Levillä</Link>.
              </p>
            </section>

            <Card className="glass-card border-primary/30 mb-12">
              <CardContent className="p-5 flex gap-3">
                <Smile className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Rehellisyyden nimissä:</strong> olemme leviläinen toimija, joten
                  saatamme olla tässä vertailussa <em>hieman puolueellisia</em> <span aria-hidden="true">😉</span>.
                  Vedämme kotiin päin, mutta yritämme silti olla reiluja. Jos haet erämaan hiljaisuutta tai Joulupukin
                  Pajakylää, kerromme suoraan, mihin kannattaa suunnata.
                </p>
              </CardContent>
            </Card>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Mihin Lapissa kannattaa lähteä?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {destinations.map((d) => (
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
                Kaikki vertailut löydät{" "}
                <Link to="/opas/miksi-valita-levi" className="text-primary underline underline-offset-4">vertailusivulta</Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-primary" />
                Milloin lähteä Lapin lomalle?
              </h2>
              <div className="space-y-4">
                {seasons.map((s) => (
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
                Tarkemmin kuukausittain:{" "}
                <Link to="/opas/paras-aika-matkustaa-leville" className="text-primary underline underline-offset-4">
                  paras aika matkustaa Leville
                </Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Plane className="w-6 h-6 text-primary" />
                Matka Lappiin
              </h2>
              <p className="text-muted-foreground mb-3">
                Leville pääsee lentäen Kittilään, yöjunalla Kolariin tai Rovaniemelle tai omalla autolla. Kittilän
                lentokentältä kylään on noin 15 km.
              </p>
              <Link to="/matka/miten-paasee-leville-helsingista" className="text-primary underline underline-offset-4">
                Miten pääsee Leville
              </Link>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Usein kysyttyä</h2>
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item, idx) => (
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Valitsitko Levin?</h2>
              <p className="text-muted-foreground mb-4">
                Huoneistomme ovat Levin keskustassa ja rinteiden lähellä. Varaat suoraan omistajalta ilman
                varauskuluja.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link to="/majoitukset">
                    Katso majoitukset
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://app.moder.fi/levillenet" target="_blank" rel="noopener noreferrer" data-booking-source="loma-lapissa">
                    Tarkista saatavuus
                  </a>
                </Button>
              </div>
            </section>

            <ReadNextSection title="Lue seuraavaksi" links={readNext} />
          </div>
        </main>

        <PageCTA lang="fi" />
        <Footer lang="fi" />
        <WhatsAppChat lang="fi" />
        <StickyBookingBar lang="fi" />
      </div>
    </>
  );
};

export default LomaLapissa;
