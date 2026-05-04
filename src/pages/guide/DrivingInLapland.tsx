import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import {
  getWebsiteSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Car,
  Snowflake,
  AlertTriangle,
  Phone,
  MapPin,
  Fuel,
  Thermometer,
  ShieldCheck,
} from "lucide-react";

const year = new Date().getFullYear();

const meta = {
  title: `Autolla ajaminen Lapissa ${year} — talvivinkit & turvallisuus`,
  description:
    "Talvirenkaat, porot tiellä, lohkolämmitin ja etäisyydet — käytännön opas autoiluun Lapissa ja Leville. Paikallisten vinkit pakkasajoon.",
  canonical: "https://leville.net/opas/autolla-ajaminen-lapissa",
};

const sections = [
  {
    id: "tien-kunto",
    icon: Snowflake,
    title: "Tien kunto talvella",
    items: [
      "Tiet ovat usein lumi- tai polannepintaisia marraskuusta huhtikuuhun — täysin paljaita asfaltteja näkee harvoin.",
      "Mustaa jäätä esiintyy erityisesti syksyllä ja kevätauringossa sulamisen jälkeen yöllä — varo siltoja ja varjopaikkoja.",
      "Suurin osa Lapin teistä on valaisemattomia — kaukovalot ovat välttämättömät, mutta muista vaihtaa lähivaloihin vastaantulijalle.",
      "Kelirikko keväällä (huhti–toukokuu) voi tehdä pikkuteistä haastavia — pysy päätiellä jos epäilyttää.",
      "Tarkista ajantasainen tiesää: liikenne.fi tai Fintraffic-sovellus.",
    ],
  },
  {
    id: "renkaat",
    icon: ShieldCheck,
    title: "Renkaat ja varusteet",
    items: [
      "Talvirengaspakko Suomessa marraskuun alusta maaliskuun loppuun — käytännössä lokakuusta vapuksi.",
      "Nastarenkaat ovat sallittuja ja erittäin suositeltuja Lapissa — kitkarenkaat riittävät kaupungissa, mutta nastat ovat turvallisemmat tunturiteillä.",
      "Lumiketjuja ei normaalisti tarvita Suomessa — auton talvirenkaat hoitavat homman.",
      "Pidä mukana: lapio, kaavin, jäänsulatusneste, kasettilamppu, lämpimät vaatteet, juotavaa.",
      "Heijastinliivi ja varoituskolmio ovat pakollisia — sakko jos puuttuvat.",
    ],
  },
  {
    id: "porot",
    icon: AlertTriangle,
    title: "Porot ja muut eläimet tiellä",
    items: [
      "Lapissa on yli 200 000 vapaana laiduntavaa poroa — ne ovat selvästi yleisin onnettomuussyy.",
      "Riskialttiimpia ovat hämärä ja yö (15–22) sekä syksyn ja kevään siirtymäkaudet.",
      "Jos näet yhden poron, hidasta — niitä on yleensä useita lähistöllä.",
      "Älä tööttäile tai vilkuta kauempaa — hidas lähestyminen ja pysähtyminen on turvallisin.",
      "Hirven, peuran tai poron törmäys: pakollinen ilmoitus 112:een ja paliskunnalle. Jätä jäljet rauhaan ja merkitse paikka.",
      "Kasko-vakuutus kattaa eläinkolaria — tarkista vuokrasopimuksesta.",
    ],
  },
  {
    id: "pakkanen",
    icon: Thermometer,
    title: "Pakkasvinkit autolle",
    items: [
      "Lohkolämmitin: kytke 1–3 tuntia ennen lähtöä (alle −10 °C). Yli −20 °C: 2–3 h riittää, ei tarvitse olla yötä päällä.",
      "Sisätilanlämmitin tekee aamut mukavammiksi — ei välttämätön, mutta arvokas −25 °C pakkasilla.",
      "Talvidiesel jaossa lokakuusta — kesädiesel jähmettyy −10…−15 °C jo. Tankkaa Suomesta ennen pohjoiseen ajoa jos tulet ulkomailta.",
      "Akku heikkenee pakkasella — jos auto seisoo viikon kovalla pakkasella ilman lämmitintä, varaa apukäynnistin.",
      "Älä jätä pulloa tai elektroniikkaa autoon yöksi — jäätyy.",
    ],
  },
  {
    id: "etaisyydet",
    icon: MapPin,
    title: "Etäisyydet ja ajoajat Levillä",
    items: [
      "Kittilän lentoasema → Levi: 15 km / noin 15 min.",
      "Rovaniemi → Levi: 170 km / noin 2 h 15 min.",
      "Oulu → Levi: 380 km / noin 4 h 30 min.",
      "Helsinki → Levi: 920 km / 11–13 h talvella (suositus: yöjuna autonkuljetuksella Kolariin, sieltä 80 km / 1 h Leville).",
      "Tankkaa täyteen aina ennen pitkää siirtymää — Lapissa huoltoasemavälit voivat olla 80–150 km.",
      "Kittilän, Levin ja Sirkan ABC/Neste-asemat ovat auki ympäri vuorokauden.",
    ],
  },
  {
    id: "hatatilanteet",
    icon: Phone,
    title: "Hätätilanteet ja yhteystiedot",
    items: [
      "Yleinen hätänumero: 112 (poliisi, ambulanssi, palokunta, tiepalvelu).",
      "Tieliikennekeskus / tieinfo: 0200 2100 (Fintraffic, 24/7).",
      "Tienhoitopäivystys ja tarkistettu tiesää: liikenne.fi.",
      "Lataa 112 Suomi -sovellus — paikantaa sinut automaattisesti hätäpuhelussa.",
      "Eläinkolari: 112 ja paliskunnan päivystäjä. Älä jätä loukkaantunutta eläintä jäljelle.",
      "Jos jäät jumiin: pysy autossa, pidä lämmitin päällä lyhyissä jaksoissa, varmista että pakoputki ei ole tukossa lumesta.",
    ],
  },
  {
    id: "vuokra-auto",
    icon: Car,
    title: "Vuokra-auton vinkit",
    items: [
      "Suurimmat toimijat Kittilän lentoasemalla: Avis, Hertz, Europcar, Sixt — kaikilla 4WD/SUV-vaihtoehtoja.",
      "Talvirenkaat sisältyvät automaattisesti suomalaiseen vuokraukseen — älä huolehdi siitä erikseen.",
      "Nelivetoa ei välttämättä tarvita — etuvetoinen auto talvirenkailla riittää valtaosaan tilanteita.",
      "Ota lisävakuutus / superkasko — kattaa yleensä eläinkolarin omavastuun.",
      "Lohkolämmitin yleensä mukana — kysy palautuspaikan kytkemisohjeet.",
      "Varaa hyvissä ajoin sesonkina (joulu–maaliskuu) — saatavuus vähenee nopeasti.",
    ],
  },
];

const faqs = [
  {
    question: "Tarvitsenko nelivedon Lapin teille?",
    answer:
      "Et välttämättä. Etuvetoinen auto kunnollisilla talvirenkailla pärjää lähes kaikkialla Lapin pääteillä. Neliveto on hyödyllinen mökkiteillä ja syvässä lumessa, mutta valtaosaan matkailutilanteita riittää tavallinen henkilöauto.",
  },
  {
    question: "Kannattaako vuokrata auto Leville?",
    answer:
      "Riippuu suunnitelmista. Levin keskustassa pärjää hyvin kävellen ja Ski Bussilla. Auto kannattaa, jos teet päiväretkiä Ylläkselle, Pallakselle, Muonioon tai etsit revontulia keskustan ulkopuolelta. Lentokenttäkuljetus ilman vuokra-autoa on usein edullisempi vaihtoehto.",
  },
  {
    question: "Mitä teen jos osun poroon tai hirveen?",
    answer:
      "Pysähdy turvalliseen paikkaan, laita varoitusvilkut, soita 112. Eläinkolarista on aina lakisääteinen ilmoitusvelvollisuus, vaikka eläin pakenisi. Merkitse törmäyspaikka esimerkiksi muovipussilla puuhun ja jää odottamaan poliisia tai paliskunnan päivystäjää.",
  },
  {
    question: "Voinko ajaa pakkasella ilman lohkolämmitintä?",
    answer:
      "Modernit autot käynnistyvät yleensä −20…−25 °C pakkasella ilman lämmitintä, mutta moottori kuluu enemmän ja akku rasittuu. Lohkolämmitin 1–3 tuntia ennen lähtöä on suositeltu kaikille alle −10 °C lämpötiloille — vuokra-autoissa se on yleensä mukana.",
  },
  {
    question: "Onko Suomessa lumiketjupakko?",
    answer:
      "Ei. Suomessa nastarenkaat tai laadukkaat kitkarenkaat riittävät — lumiketjuja ei normaalisti tarvita eikä niiden käyttö ole tavallista. Tämä eroaa esimerkiksi Alpeista.",
  },
  {
    question: "Onko Leville turvallista ajaa pimeällä?",
    answer:
      "Kyllä, kun noudattaa nopeusrajoituksia ja pitää kaukovalot päällä avoimilla teillä. Suurin riski on porot ja muut eläimet — hidasta hämärässä, etenkin metsäisillä osuuksilla. Suomalaiset päätiet ovat hyvin merkittyjä ja talvikunnossapito on kansainvälisesti korkealla tasolla.",
  },
];

const breadcrumbItems = [
  { name: "Etusivu", url: "https://leville.net/" },
  { name: "Opas", url: "https://leville.net/opas/matkaopas-levi" },
  { name: "Autolla ajaminen Lapissa", url: meta.canonical },
];

const readNextLinks = [
  {
    title: "Miten pääset Leville",
    desc: "Lentoyhteydet, junat ja autoilu Helsingistä Leville",
    href: "/matka/miten-paasee-leville-helsingista",
  },
  {
    title: "Liikkuminen Levillä",
    desc: "Skibussit, taksit ja autonvuokraus paikan päällä",
    href: "/opas/liikkuminen-levilla",
  },
  {
    title: "Levi ilman autoa",
    desc: "Näin pärjäät Levillä ilman omaa autoa",
    href: "/opas/levi-ilman-autoa",
  },
  {
    title: "Talvivarusteet Leville",
    desc: "Pukeutuminen ja varusteet pakkaseen",
    href: "/opas/talvivarusteet-leville",
  },
  {
    title: "Sää ja lämpötilat Levillä",
    desc: "Kuukausittaiset keskiarvot ja lumitilanne",
    href: "/levi/saatieto-levilta",
  },
  {
    title: "Päiväretket Leviltä",
    desc: "Ylläs, Pallas ja muut kohteet — auto kannattaa",
    href: "/opas/paivaretket-levilla",
  },
];

const DrivingInLapland = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fi_FI" />
      </Helmet>

      <HreflangTags
        currentPath={location.pathname}
        currentLang="fi"
        customUrls={{ fi: meta.canonical }}
      />

      <JsonLd data={getWebsiteSchema()} />
      <JsonLd
        data={getArticleSchema({
          title: meta.title,
          description: meta.description,
          url: meta.canonical,
          lang: "fi",
        })}
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={getFAQSchema(faqs)} />

      <SubpageBackground />
      <Header lang="fi" />

      <main className="relative pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Etusivu", href: "/" },
              { label: "Opas", href: "/opas/matkaopas-levi" },
              { label: "Autolla ajaminen Lapissa" },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Autolla ajaminen Lapissa — talvivinkit ja turvallisuus {year}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Lapin autoilu eroaa eteläisestä Suomesta: pitkät etäisyydet, valaisemattomat tiet,
              porot ja kova pakkanen. Tässä paikallisten kokoama opas, jolla suunnittelet
              turvallisen ajomatkan Leville ja sen ympäristöön.
            </p>
          </header>

          {/* Sticky jump nav */}
          <nav className="mb-10 sticky top-20 z-30 bg-background/80 backdrop-blur-md border border-border/30 rounded-xl p-3">
            <ul className="flex flex-wrap gap-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#ukk"
                  className="inline-block px-3 py-1.5 rounded-full border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  UKK
                </a>
              </li>
            </ul>
          </nav>

          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                id={section.id}
                className="mb-10 scroll-mt-32"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Icon className="w-7 h-7 text-primary flex-shrink-0" />
                  {section.title}
                </h2>
                <Card>
                  <CardContent className="pt-5">
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            );
          })}

          {/* FAQ */}
          <section id="ukk" className="mb-12 scroll-mt-32">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Fuel className="w-7 h-7 text-primary flex-shrink-0" />
              Usein kysyttyä
            </h2>
            <Card>
              <CardContent className="pt-4">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/85 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>

          <GuideDisclaimer lang="fi" />

          <ReadNextSection title="Lue myös" links={readNextLinks} />

          <section className="text-center bg-card rounded-xl p-8 border border-border/30">
            <h3 className="text-xl font-semibold mb-3">Varaa majoitus Levin keskustasta</h3>
            <p className="text-muted-foreground mb-4">
              Kun saavut, parkkipaikka ja lohkolämmitin odottavat — useimmissa kohteissamme
              ilmainen pysäköinti.
            </p>
            <Button asChild>
              <Link to="/majoitukset">Selaa huoneistoja ja mökkejä</Link>
            </Button>
          </section>
        </div>
      </main>

      <PageCTA lang="fi" />
      <Footer lang="fi" />
      <WhatsAppChat lang="fi" />
      <StickyBookingBar lang="fi" />
    </div>
  );
};

export default DrivingInLapland;
