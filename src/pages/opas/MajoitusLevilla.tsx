import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import ReadNextSection from "@/components/guide/ReadNextSection";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import PageCTA from "@/components/PageCTA";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  TreePine,
  Hotel,
  MapPin,
  Snowflake,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const accommodationTypes = [
  {
    icon: Building2,
    title: "Huoneistot ja lomahuoneistot",
    text: "Suosituin vaihtoehto Levillä. Täysin varustettu keittiö, oma sauna ja usein kuivaushuone hiihtovaatteille. Huoneistot sijaitsevat tyypillisesti Levin keskustassa kävelymatkan päässä rinteiltä ja palveluista. Sopii pariskunnille, perheille ja pienille ryhmille (2–8 hlö). Hintataso: noin 120–250 €/yö sesongista riippuen.",
  },
  {
    icon: TreePine,
    title: "Mökit ja chaletit",
    text: "Perinteinen tapa majoittua Lapissa. Hirsimökit tarjoavat enemmän tilaa ja yksityisyyttä – monessa on takka, ulkoporeallas ja isommat saunatilat. Sijaitsevat usein hieman keskustan ulkopuolella, joten auto on käytännössä välttämätön. Sopii isommille ryhmille ja perheille (4–14 hlö). Hintataso: noin 150–1 000 €/yö.",
  },
  {
    icon: Hotel,
    title: "Hotellit",
    text: "Leviltä löytyy muutama hotelli, kuten Levi Hotel Spa, Break Sokos Hotel Levi sekä Hullu Poro. Hotellit ovat helppo valinta: aamiainen, siivous ja vastaanotto hoituvat puolestasi. Sopii pariskunnille ja yksinmatkaaville mutta myös perhehuoneita on tarjolla. Hintataso: noin 180–500 €/yö.",
  },
  {
    icon: Snowflake,
    title: "Iglut ja erikoismajoitukset",
    text: "Lasi-iglut ovat Levin erikoisuus – nuku tähtitaivaan ja revontulien alla. Tunnetuimpia ovat Levin Iglut (Golden Crown), Northern Lights Village ja Levi Northern Lights Huts. Varaa ajoissa – suosituimmat iglut myydään loppuun kuukausia etukäteen, etenkin joulu–helmikuu. Hintataso: noin 250–600 €/yö.",
  },
];

const priceTable = [
  { type: "Studio-huoneisto (2 hlö)", low: "70–100 €/yö", mid: "100–160 €/yö", high: "150–250 €/yö" },
  { type: "2 mh huoneisto (4–6 hlö)", low: "100–150 €/yö", mid: "150–250 €/yö", high: "250–400 €/yö" },
  { type: "Mökki/chalet (6–10 hlö)", low: "120–200 €/yö", mid: "200–350 €/yö", high: "350–500+ €/yö" },
  { type: "Hotelli (2 hlö)", low: "80–120 €/yö", mid: "120–180 €/yö", high: "180–280 €/yö" },
  { type: "Lasi-iglu (2 hlö)", low: "–", mid: "250–400 €/yö", high: "400–600+ €/yö" },
];

const faqs = [
  {
    q: "Tarvitsenko auton Levillä?",
    a: "Se riippuu majoituksen sijainnista. Levin keskustassa pärjäät hyvin ilman autoa – rinteet, ravintolat ja kaupat ovat kävelymatkan päässä. Rinteiden lähialueilta kulkee skibussi talvisin. Sirkasta ja kauempaa auto on käytännössä välttämätön. Autonvuokraus onnistuu Kittilän lentokentältä.",
  },
  {
    q: "Milloin kannattaa varata majoitus Leville?",
    a: "Joulusesonki ja hiihtolomaviikot (viikot 8–10) varataan 6–12 kuukautta etukäteen. Normaalille talvisesongille 2–4 kuukautta riittää. Kesällä ja syksyllä voi varata lyhyemmälläkin varoitusajalla ja saada selvästi edullisempia hintoja.",
  },
  {
    q: "Mitä 'pantti' tarkoittaa majoitusvarauksessa?",
    a: "Pantti on takuumaksu (yleensä 100–300 €), joka maksetaan majoituksen alussa ja palautetaan kokonaisuudessaan, jos kohde palautetaan siistissä kunnossa. Panttijärjestelmä on hyvin yleinen Levin vuokrahuoneistoissa ja mökeissä.",
  },
  {
    q: "Kuuluvatko liinavaatteet ja pyyhkeet hintaan?",
    a: "Ei aina. Monissa huoneistoissa ja mökeissä liinavaatteet ja pyyhkeet ovat lisämaksullisia tai ne pitää tuoda itse. Tarkista aina varausehdoista.",
  },
  {
    q: "Mikä on paras alue majoittua Levillä?",
    a: "Levin keskusta on paras valinta, jos haluat kaiken kävelymatkan päässä. Rinteiden lähialueet sopivat aktiivisille lasketteluperheille.",
  },
];

const checklistItems = [
  "Etäisyys rinteisiin ja keskustaan (Google Maps, ei 'linnuntietä')",
  "Onko pysäköinti mukana vai maksullinen?",
  "Liinavaatteet ja pyyhkeet – eivät aina kuulu hintaan (kysy!)",
  "Loppusiivous – sisältyykö vai erikseen (yleensä 60–120 €)? Leville.net-kohteissa sisältyy aina",
  "Kuivaushuone hiihtovaatteille – lähes välttämätön talvella",
  "Sauna – yleensä on, pienissä asunnoissa ei välttämättä",
  "Panttijärjestelmä: monissa kohteissa maksetaan 100–300 € takuumaksu (pantti), joka palautuu",
];

const MajoitusLevilla = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: "https://leville.net" },
      { "@type": "ListItem", position: 2, name: "Opas", item: "https://leville.net/opas" },
      { "@type": "ListItem", position: 3, name: "Majoitus Levillä", item: "https://leville.net/opas/majoitus-levilla" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Majoitus Levillä – Huoneistot, mökit ja hotellit | Leville.net"
        description="Kattava opas Levin majoitusvaihtoehtoihin: huoneistot keskustassa, vuokramökit, hotellit ja budjettimajoitus. Käytännön vinkit varaamiseen ja parhaat sijainnit."
        canonicalUrl="https://leville.net/opas/majoitus-levilla"
        lang="fi"
        ogType="article"
      />
      <HreflangTags currentPath="/opas/majoitus-levilla" currentLang="fi" />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <SubpageBackground />
      <Header />

      <Breadcrumbs
        lang="fi"
        items={[
          { label: "Opas", href: "/opas" },
          { label: "Majoitus Levillä", href: "/opas/majoitus-levilla" },
        ]}
      />

      <main className="container mx-auto px-4 pb-16 max-w-3xl">
        {/* HERO / INTRO */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Majoitus Levillä – Opas huoneistoihin, mökkeihin ja hotelleihin
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Levillä majoitusvaihtoehtojen kirjo on laaja – huoneistoista ja vuokramökeistä hotelleihin ja igluihin.
            Tämä opas auttaa sinua löytämään juuri sinulle sopivan majoituksen, olipa kyseessä pariskuntien
            romanttinen viikonloppu, perheen hiihtoloma tai kaveriporukan laskettelureissu. Kerromme
            rehellisesti eri vaihtoehtojen plussat ja miinukset sekä käytännön vinkit varaamiseen.
          </p>
        </section>

        {/* CTA Banner */}
        <Link to="/majoitukset" className="block mb-12 group">
          <Card className="bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">Etsitkö majoitusta Leviltä?</p>
                <p className="text-sm text-foreground/70 mt-1">
                  Tutustu meidän huoneistoihimme Levin keskustassa →
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* ACCOMMODATION TYPES */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Majoitustyypit Levillä – mikä sopii sinulle?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {accommodationTypes.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-5 border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* AREAS */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Levin alueet – missä kannattaa majoittua?
          </h2>
          <p className="text-foreground/80 mb-6">
            Majoituksen sijainti vaikuttaa merkittävästi loman sujuvuuteen. Levillä on eri alueita,
            joista jokaisella on omat etunsa.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Levin keskusta (Zero Point)
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Levin keskusta tarkoittaa aluetta Eturinteiden ja Levin torin ympärillä. Tämä on paras
                valinta, jos haluat kaiken kävelymatkan päässä: ravintolat, Alko, K-Market, hissit ja
                välinevuokraamot. Erityisesti ilman autoa matkaaville keskusta on lähes ainoa järkevä
                vaihtoehto. Iltaelämä ja après-ski löytyvät myös täältä.
              </p>
              <ul className="text-sm text-foreground/70 space-y-1 ml-1">
                <li>• Etäisyys eturinteille: 0–500 m</li>
                <li>• Palvelut: kaikki kävelymatkan päässä</li>
                <li>• Sopii: pariskunnille, kaveriporukoille, ilman autoa matkaaville</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Levin rinteiden lähialueet (Etelärinteet, Koillisrinne)
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Jos haluat ski-in/ski-out -kokemuksen, Etelärinteiden ja Koillisrinteen tuntumasta
                löytyy mökkejä ja huoneistoja aivan rinteiden vierestä. Hiihtoladuille pääset suoraan
                ovelta. Alue on rauhallisempi kuin keskusta, mutta kauppaan ja ravintoloihin on matkaa
                3–5 km.
              </p>
              <ul className="text-sm text-foreground/70 space-y-1 ml-1">
                <li>• Etäisyys rinteille: 0–200 m</li>
                <li>• Palvelut: auto tai skibussi tarpeen</li>
                <li>• Sopii: aktiivisille lasketteluperheille ja hiihtäjille</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BOOKING TIPS */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Käytännön vinkit majoituksen varaamiseen
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Varaa ajoissa – etenkin sesonkeina</h3>
              <p className="text-foreground/80 leading-relaxed">
                Levin sesonkeja ovat joulu–uusivuosi (varaa 6–12 kk etukäteen), hiihtolomaviikot
                (viikot 8–10) ja pääsiäinen. Kesällä ja syksyllä saatavuus on parempi ja hinnat selvästi
                edullisemmat. Heinäkuussa majoituksen saa usein puoleen hintaan talveen verrattuna.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Varaa suoraan – vältä välikäsiä</h3>
              <p className="text-foreground/80 leading-relaxed">
                Varaamalla suoraan majoituksen tarjoajalta (kuten leville.net) saat yleensä edullisimman
                hinnan ilman välittäjäalustojen välityspalkkioita. Suora varaus mahdollistaa myös
                joustavammat peruutusehdot ja henkilökohtaisen asiakaspalvelun.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Tarkista nämä ennen varausta</h3>
              <ul className="space-y-2">
                {checklistItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Liikkuminen majoituspaikasta</h3>
              <p className="text-foreground/80 leading-relaxed">
                Levin keskustassa pärjää hyvin ilman autoa. Rinteiden lähialueilta ja kauempaa kulkee
                skibussi (talvella), mutta aikataulu on rajallinen. Jos majoittuu kauempana, auto
                helpottaa ja antaa joustoa.
              </p>
              <Link
                to="/opas/liikkuminen-levilla"
                className="inline-flex items-center gap-1 text-primary hover:underline text-sm mt-2"
              >
                Lue lisää: Liikkuminen Levillä <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* PRICE TABLE */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Majoituksen hintatasot Levillä
          </h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Majoitustyyppi</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Hiljaiset ajat</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Normaali sesonki</th>
                  <th className="text-left py-3 pl-3 font-semibold text-foreground">Huippusesonki</th>
                </tr>
              </thead>
              <tbody>
                {priceTable.map((row) => (
                  <tr key={row.type} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-foreground font-medium">{row.type}</td>
                    <td className="py-3 px-3 text-foreground/70">{row.low}</td>
                    <td className="py-3 px-3 text-foreground/70">{row.mid}</td>
                    <td className="py-3 pl-3 text-foreground/70">{row.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Hinnat ovat suuntaa-antavia ja vaihtelevat kohteen, sijainnin ja varausajankohdan mukaan.
            Varaamalla suoraan saat usein parhaan hinnan.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Usein kysytyt kysymykset majoituksesta Levillä
          </h2>
          <Accordion type="multiple" className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* READ NEXT */}
        <ReadNextSection
          title="Lue myös"
          links={[
            { title: "Katso majoitukset Levin keskustassa", desc: "Huoneistot ja mökit parhailla sijainneilla", href: "/majoitukset" },
            { title: "Miten pääset Leville?", desc: "Lennot, junat ja autoilureitit", href: "/matka/miten-paasee-leville-helsingista" },
            { title: "Ravintolat ja palvelut Levillä", desc: "Ruokapaikat ja arjen palvelut", href: "/opas/ravintolat-ja-palvelut-levilla" },
            { title: "Lapsiperheet Levillä", desc: "Vinkit perheen Levi-lomaan", href: "/opas/lapsiperheet-levilla" },
            { title: "Liikkuminen Levillä", desc: "Kulkuyhteydet ja skibussit", href: "/opas/liikkuminen-levilla" },
            { title: "Talvivarusteet Leville", desc: "Pakkausvinkit ja vuokraus", href: "/opas/talvivarusteet-leville" },
          ]}
        />

        {/* FINAL CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Löydä sinulle sopiva majoitus Levin keskustasta
          </h2>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Laadukkaat huoneistot ja mökit parhailla sijainneilla – varaa suoraan ilman välikäsiä.
          </p>
          <Link
            to="/majoitukset"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Katso vapaat kohteet <ExternalLink className="w-4 h-4" />
          </Link>
        </section>

        {/* Bottom navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 mb-8">
          <Link to="/opas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Takaisin matkaoppaaseen
          </Link>
          <Link to="/majoitukset">
            <Button className="gap-2">
              Varaa majoitus
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>

      <PageCTA />
      <Footer />
      <WhatsAppChat />
      <StickyBookingBar />
    </div>
  );
};

export default MajoitusLevilla;
