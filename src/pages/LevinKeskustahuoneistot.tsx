import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import PropertyCard from "@/components/PropertyCard";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import PageCTA from "@/components/PageCTA";
import { ArrowRight, MapPin } from "lucide-react";
import { properties, getPropertiesByLocation } from "@/data/properties";

const BASE = "https://leville.net";
const CANONICAL = `${BASE}/majoitus/levin-keskustahuoneistot`;
const YEAR = new Date().getFullYear();

const linkProp = (label: string, id: string) => {
  const p = properties.find((pr) => pr.id === id);
  if (!p) return label;
  return (
    <a
      href={p.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline underline-offset-2"
    >
      {label}
    </a>
  );
};

const centerProperties = getPropertiesByLocation("Levi Center");
const studiot = centerProperties.filter((p) => p.type === "studio");
const yksioot = centerProperties.filter((p) => p.type === "1-bedroom");
const kaksiot = centerProperties.filter((p) =>
  ["211", "212", "karhunvartija3"].includes(p.id)
);
const lodge = centerProperties.filter((p) => p.id === "karhupirtti");

const etaisyydet = [
  { label: "Rinteet ja gondolihissi", value: "3–5 min kävely" },
  { label: "K-Market", value: "2–3 min kävely" },
  { label: "Alko", value: "2–3 min kävely" },
  { label: "Suksivuokraamot", value: "3 min kävely" },
  { label: "Ravintolat (Hullu Poro, Colorado ym.)", value: "2–5 min kävely" },
  { label: "Levin Spa -kylpylä", value: "1–3 min kävely" },
  { label: "Moottorikelkkareitti", value: "~150 m Bear Lodgesta" },
];

const faqs = [
  {
    q: "Mikä on paras alue majoittua Levillä?",
    a: "Levin keskusta on suosituin alue, koska kaikki palvelut — ruokakauppa, ravintolat, suksivuokraus, kylpylä ja gondoli — ovat kävelymatkan päässä. Et tarvitse autoa, mikäli majoitut keskustassa.",
  },
  {
    q: "Kuinka kaukana keskustan huoneistot ovat rinteistä?",
    a: "Kaikki keskustahuoneistomme ovat 3–10 minuutin kävelymatkan päässä gondolista ja Etelärinteen alaosasta. Lapsiperheille K-Marketin viereiset Skistar-talon studiot ovat erityisen kätevät.",
  },
  {
    q: "Onko huoneistoissa oma sauna?",
    a: "Käytännössä kaikissa keskustahuoneistoissamme on oma sähkösauna. Tämä on Suomessa standardi mutta usein iloinen yllätys ulkomaalaisille vieraille. Tarkista kohdekohtaiset tiedot kunkin huoneiston sivulta.",
  },
  {
    q: "Onko parkkipaikka sisältyy hintaan?",
    a: (
      <>
        Kyllä. Kaikkiin keskustahuoneistoihin kuuluu ilmainen pysäköintipaikka, useimmissa on lämmitystolppa. {linkProp("Bear Lodgella", "karhupirtti")} on omat pihapaikat ja {linkProp("Karhunvartija 3:lla", "karhunvartija3")} pysäköinti yksityisen sisäänkäynnin edessä.
      </>
    ),
  },
  {
    q: "Onko keskustassa esteettömiä huoneistoja?",
    a: (
      <>
        Useat keskustakohteet ovat askeleettomia tai yhden askeleen sisäänkäynnillä: {linkProp("Studio 102", "102")}, {linkProp("104", "104")}, {linkProp("Superior 209", "209")} / {linkProp("210", "210")} ja {linkProp("Karhunvartija 3", "karhunvartija3")}. Käytännöllinen valinta lastenrattaiden tai liikuntarajoitteisten vieraiden kanssa.
      </>
    ),
  },
  {
    q: "Milloin kannattaa varata keskustahuoneisto?",
    a: "Keskustakohteemme ovat suosituimpia ja täyttyvät ensimmäisinä huippusesonkina (joulu, viikot 8–9, pääsiäinen). Suosittelemme varaamaan näille viikoille 4–8 kuukautta etukäteen. Sesonkien ulkopuolelta löytyy lähes aina vapaita huoneistoja.",
  },
];

const relatedLinks = [
  { label: "Mökit Levillä", href: "/mokit-levilla" },
  { label: "Kaikki majoitukset", href: "/majoitukset" },
  { label: "Ravintolat Levillä", href: "/opas/ravintolat-ja-palvelut-levilla" },
  { label: "Interaktiivinen Levi-kartta", href: "/opas/levin-kartta" },
];

const LevinKeskustahuoneistot = () => {
  const breadcrumbItems = [
    { label: "Majoitukset", href: "/majoitukset" },
    { label: "Levin keskusta", href: "/majoitus/levin-keskustahuoneistot" },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Majoitus Levin keskustassa — huoneistot kävelymatkan päässä rinteistä",
    description:
      "Kaikki Levin keskustan huoneistomme: studiot, yksiöt, kaksiot ja 220 m² hirsihuvila. Kävelymatka rinteille, ravintoloihin ja kauppoihin. Varaa suoraan ilman välityskuluja.",
    url: CANONICAL,
    publisher: { "@type": "Organization", name: "Leville.net", url: BASE },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof f.a === "string" ? f.a : f.q,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: BASE },
      { "@type": "ListItem", position: 2, name: "Majoitukset", item: `${BASE}/majoitukset` },
      { "@type": "ListItem", position: 3, name: "Levin keskusta", item: CANONICAL },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{`Majoitus Levin keskustassa ${YEAR} — huoneistot kävelymatkan päässä rinteistä`}</title>
        <meta
          name="description"
          content={`Levin keskustan huoneistot ${YEAR}: studiot, yksiöt, kaksiot ja hirsihuvila. Kävelymatka gondolille, kauppaan ja ravintoloihin. Varaa suoraan omistajalta ilman välityskuluja.`}
        />
        <meta
          name="keywords"
          content="levin keskusta majoitus, levin keskustahuoneistot, huoneisto levin keskustassa, majoitus levin keskusta, levi huoneistot, levi keskusta, levi center majoitus"
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Majoitus Levin keskustassa — huoneistot kävelymatkan päässä rinteistä" />
        <meta property="og:description" content="Studiot, yksiöt, kaksiot ja hirsihuvila kaikki kävelymatkan päässä rinteistä, ravintoloista ja palveluista." />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fi_FI" />
      </Helmet>
      <HreflangTags
        currentPath="/majoitus/levin-keskustahuoneistot"
        currentLang="fi"
        customUrls={{ fi: CANONICAL }}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Header />
      <main id="main-content">
        <Breadcrumbs lang="fi" items={breadcrumbItems} />

        <section className="container mx-auto px-4 pb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Majoitus Levin keskustassa — huoneistot kävelymatkan päässä rinteistä
          </h1>
          <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4">
            <p>
              Levin keskustalla tarkoitetaan tiivistä aluetta, jossa kaikki tarpeellinen on kävelymatkan päässä: K-Market, Alko, suksivuokraamot, ravintolat ja Levin Spa -kylpylä. Huoneistomme sijaitsevat keskustan parhailla osoitteilla — Postintiellä (Skistar-studiot ja Superiorit), Hiihtäjänkujalla ({linkProp("Platinum A2", "platinum-a2")}) ja Ratsastajankujalla ({linkProp("Karhunvartija", "karhunvartija3")}).
            </p>
            <p>
              Valikoima kattaa kaikenkokoiset porukat. Pariskunnille ja yksinmatkaajille löytyy studioita (24–37 m²), pienille perheille tilavia yksiöitä (43–44 m²) ja jopa 6 hengen kaksioita (42–54 m²). Suuremmille porukoille {linkProp("Bear Lodge", "karhupirtti")} majoittaa 14 henkeä omassa 220 m² hirsihuvilassa keskellä keskustaa — takka ja ulkopaljun kanssa.
            </p>
            <p>
              Kaikissa keskustahuoneistoissamme on oma sauna, täysi keittiö ja ilmainen pysäköinti. Levin keskusta on pieni: kaukaisinkin keskustahuoneisto on alle 10 minuutin kävelymatkan päässä gondolista. Skistar-talo on aivan Levin Spa -kylpylän vieressä — kätevää lapsiperheille lepopäivinä.
            </p>
            <p>
              Useat keskustakohteet ovat askeleettomia: {linkProp("Studiot 102", "102")} ja {linkProp("104", "104")}, {linkProp("Superior 209", "209")} ja {linkProp("210", "210")} sekä {linkProp("Karhunvartija 3", "karhunvartija3")}. Tämä on käytännöllistä lastenrattaiden tai liikuntarajoitteisten vieraiden kanssa.
            </p>
            <p>
              Keskustahuoneistot ovat suosituin kategoriamme ja täyttyvät ensimmäisinä huippusesonkeina (joulu, viikot 8–9, pääsiäinen). Näille viikoille kannattaa varata hyvissä ajoin.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Keskustahuoneistomme</h2>

          {studiot.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-primary/90">Studiot (1–4 hlö)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
                {studiot.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}

          {yksioot.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-primary/90">Yksiöt (1–4 hlö)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
                {yksioot.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}

          {kaksiot.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-primary/90">Kaksiot (1–6 hlö)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-10">
                {kaksiot.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}

          {lodge.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-primary/90">Bear Lodge — hirsihuvila (1–14 hlö)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {lodge.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Kävelyetäisyydet Levin keskustasta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {etaisyydet.map((d) => (
              <div
                key={d.label}
                className="flex items-start gap-3 rounded-lg border border-border/60 p-4"
              >
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{d.label}</p>
                  <p className="text-sm text-muted-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Usein kysytyt kysymykset</h2>
          <div className="max-w-3xl space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="space-y-2">
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Tutustu myös</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center gap-2 rounded-lg border border-border/60 p-4 hover:border-primary/40 hover:bg-secondary/40 transition-all"
              >
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <PageCTA lang="fi" />
      <Footer lang="fi" />
      <WhatsAppChat lang="fi" />
      <StickyBookingBar lang="fi" />
    </div>
  );
};

export default LevinKeskustahuoneistot;
