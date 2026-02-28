import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import SeoMeta from "@/components/SeoMeta";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReadNextSection from "@/components/guide/ReadNextSection";
import {
  Euro,
  Mountain,
  UtensilsCrossed,
  ShoppingCart,
  Snowflake,
  Dog,
  Bus,
  Info,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  Home,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-accent bg-accent/10 rounded-r-lg p-4 my-4 flex gap-3">
    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
    <div className="text-sm text-foreground/90">{children}</div>
  </div>
);

const PriceTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-4 rounded-lg border border-border">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-muted/50">
          {headers.map((h, i) => (
            <th key={i} className="text-left p-3 font-semibold text-foreground whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`p-3 whitespace-nowrap ${j > 0 ? "font-medium" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <Card className="mb-8 bg-card/80 backdrop-blur border-border">
    <CardContent className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-accent" />
        {title}
      </h2>
      {children}
    </CardContent>
  </Card>
);

const LevinHinnatPage = () => {
  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Levi-opas", href: "/levi" },
    { label: "Hinnat Levillä", href: "/opas/hinnat-levilla" },
  ];

  const faqItems = [
    {
      q: "Käykö Levillä korttimaksu kaikkialla?",
      a: "Kyllä. Suomi on lähes kokonaan siirtynyt korttimaksuun. Visa ja Mastercard käyvät kaikkialla — ravintoloissa, kaupoissa, hissilippukassalla ja takseissa. Käteistä et tarvitse juuri koskaan, mutta pieni summa taskussa ei ole haitaksi esim. kirppareilla.",
    },
    {
      q: "Tarvitaanko Levillä käteistä?",
      a: "Käytännössä ei. Jopa Ski Bus hyväksyy vain korttimaksun. Ainoastaan joissain pienissä myyjäisissä tai kirpputoreilla saatat tarvita käteistä. Otto-automaatti löytyy S-Marketin yhteydestä.",
    },
    {
      q: "Onko Levi kalliimpi kuin Alpit?",
      a: "Hissilippu ja välinevuokra ovat Levillä edullisempia kuin useimmissa Alppien kohteissa. Ruoka on samaa tasoa. Suurin ero on alkoholihinnoissa — Suomessa juomat ovat ravintolassa selvästi kalliimpia kuin esim. Itävallassa tai Ranskassa.",
    },
    {
      q: "Milloin Levi on edullisin?",
      a: "Tammikuu (kaamos-aika) ja huhtikuu (kevätlaskettelu) ovat edullisimmat kaudet. Kallein aika on joulu–uusivuosi ja hiihtolomaviikot (helmikuun loppu – maaliskuun alku).",
    },
    {
      q: "Saako Levillä tinkiä?",
      a: "Ei. Suomessa hinnat ovat kiinteät. Poikkeuksena ryhmäalennukset aktiviteeteissa (20+ henkilöä) ja early bird -tarjoukset hissilipuissa nettikaupassa.",
    },
    {
      q: "Maksetaanko Levillä euroilla?",
      a: "Kyllä. Suomi on euroalue. Valuutanvaihtoa ei tarvita.",
    },
  ];

  const faqSchemaItems = faqItems.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <SeoMeta
        title="Levin hinnat 2025–2026 – Hissilipuista ravintoloihin | Leville.net"
        description="Kattava hintaopas Levin lomalle. Hissilippujen, ravintoloiden, aktiviteettien ja ruokakauppojen hinnat yhdellä sivulla. Suunnittele budjettisi etukäteen."
        canonicalUrl="https://leville.net/opas/hinnat-levilla"
        lang="fi"
      />
      <HreflangTags
        currentPath="/opas/hinnat-levilla"
        currentLang="fi"
        customUrls={{
          fi: "/opas/hinnat-levilla",
          en: "/guide/prices-in-levi",
        }}
      />
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({
        title: "Hinnat Levillä – mitä Lapin loma maksaa?",
        description: "Kattava hintaopas Levin lomalle. Hissilippujen, ravintoloiden, aktiviteettien ja ruokakauppojen hinnat.",
        url: "https://leville.net/opas/hinnat-levilla",
        lang: "fi",
        datePublished: "2025-11-01",
        dateModified: "2026-02-28",
      })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: "Etusivu", url: "https://leville.net" },
        { name: "Levi-opas", url: "https://leville.net/levi" },
        { name: "Hinnat Levillä", url: "https://leville.net/opas/hinnat-levilla" },
      ])} />
      <JsonLd data={getFAQSchema(faqSchemaItems)} />

      <SubpageBackground />

      <main id="main-content" className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Euro className="w-3 h-3 inline mr-1" /> Hintaopas
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Hinnat Levillä – mitä Lapin loma maksaa?
          </h1>
          <p className="text-muted-foreground text-lg">
            Kattava hintaopas hissilipuista ravintoloihin, aktiviteeteista ruokakauppoihin. Suunnittele Levin loman budjetti etukäteen.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 flex gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-foreground/80">
            Hinnat ovat suuntaa-antavia ja perustuvat kauteen 2025–2026. Tarkista aina ajantasaiset hinnat palveluntarjoajan sivuilta ennen varausta. Päivitetty viimeksi: helmikuu 2026.
          </p>
        </div>

        {/* Osio 1: Hissilippujen hinnat */}
        <SectionCard icon={Mountain} title="Hissilippujen hinnat">
          <p className="text-muted-foreground mb-4">
            Levin hissilippu kattaa kaikki 43 rinnettä ja 27 hissiä. Hissilipun saa netistä, automaatilta tai lippukassalta. Edullisin tapa on ostaa nettikaupasta etukäteen. Alle 6-vuotiaat kypärää käyttävät lapset laskettelevat ilmaiseksi aikuisen hissilipulla.
          </p>
          <PriceTable
            headers={["Lipputyyppi", "Lapsi (6–11 v.)", "Aikuinen (12–64 v.)", "Seniori (65+ v.)"]}
            rows={[
              ["3 tuntia", "29 €", "48,50 €", "29 €"],
              ["1 päivä", "35,50 €", "58 €", "35,50 €"],
              ["3 päivää", "95 €", "154,50 €", "95 €"],
              ["6 päivää", "153 €", "258 €", "153 €"],
              ["Kausikortti", "384 €", "577 €", "384 €"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Hissilippu ladataan SkiData KeyCard -kortille (8 €, ei panttia). Kortin voi ladata uudelleen ja se käy myös muissa SkiData-hiihtokeskuksissa — säilytä kortti! Hissilippu toimii myös Ski Bus -bussilippuna: 3 €/pv hissilipun kanssa, 4 €/pv erikseen.
          </p>
          <TipBox>
            <strong>Säästövinkki:</strong> Levi Black -kanta-asiakasohjelma kerryttää pisteitä hissilippuostoista. Lataa Levi Resort -sovellus ja rekisteröidy ennen ensimmäistä ostosta.
          </TipBox>
          <a
            href="https://levi.skiperformance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm"
          >
            Osta hissilippu Levin verkkokaupasta <ExternalLink className="w-4 h-4" />
          </a>
        </SectionCard>

        {/* Osio 2: Välinevuokraus */}
        <SectionCard icon={Snowflake} title="Välinevuokraus">
          <p className="text-muted-foreground mb-4">
            Välineitä vuokraa Levillä kolme päätoimijaa: Zero Point (rinteiden juurella), South Point (Etelärinteet) ja HILL Ski Rent (Eturinteiden juurella). Myös Elan Ski Shop keskustassa vuokraa.
          </p>
          <PriceTable
            headers={["Väline", "1 päivä", "3 päivää", "6 päivää"]}
            rows={[
              ["Laskettelu Standard (sukset + monot + sauvat)", "~35–45 €", "~85–110 €", "~145–180 €"],
              ["Laskettelu Superior", "~50–60 €", "~120–150 €", "~200–250 €"],
              ["Lumilautasetti", "~40–55 €", "~100–135 €", "~170–220 €"],
              ["Murtomaahiihto Standard", "~25–35 €", "~60–80 €", "~100–140 €"],
              ["Kypärä", "~8–12 €", "~18–25 €", "~30–40 €"],
              ["Lumikengät", "~20–30 €", "~45–60 €", "~75–100 €"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Hinnat vaihtelevat vuokraamon ja kaluston tason mukaan. Varaa netistä etukäteen — saat usein 10 % alennuksen. Muista henkilöllisyystodistus (passi tai ID-kortti) vuokratessa.
          </p>
          <TipBox>
            <strong>Säästövinkki:</strong> Jos lasket useamman päivän, 6 päivän vuokra on selvästi edullisempi kuin kuusi erillistä päivävuokraa. Elan Ski Shopilla voi myös kokeilla ennen ostamista.
          </TipBox>
        </SectionCard>

        {/* Osio 3: Ravintolat */}
        <SectionCard icon={UtensilsCrossed} title="Ravintolat ja syöminen">
          <p className="text-muted-foreground mb-4">
            Levillä on yli 60 ravintolaa. Hintataso on tyypillinen suomalaiselle hiihtokeskukselle — selvästi edullisempi kuin Alpit, mutta kalliimpi kuin Keski-Euroopan kaupungit. Alkoholi on Suomessa verotettua, joten juomat ovat kalliimpia.
          </p>
          <PriceTable
            headers={["Tuote", "Hintahaarukka"]}
            rows={[
              ["Pääruoka (ravintola)", "20–35 €"],
              ["Pizza", "14–20 €"],
              ["Hampurilainen", "15–22 €"],
              ["Poronkäristys (fine dining)", "28–42 €"],
              ["Lounasbuffet", "15–22 €"],
              ["Olut 0,5 l (ravintola)", "7–10 €"],
              ["Viinilasi (12–16 cl)", "8–12 €"],
              ["Viinipullo (ravintola)", "35–60 €"],
              ["Kahvi ja pulla", "5–8 €"],
              ["Lettukahvila (Pannukakkutalo)", "8–15 €"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Illallinen kahdelle juomineen maksaa tyypillisesti 80–130 €. Edullisin vaihtoehto on Burger King Levin keskustassa tai pizzeriat. Laadukkaimmissa ravintoloissa kuten Kekäle, Pihvipietti tai Ämmilä kannattaa varata pöytä etukäteen — etenkin sesonkiaikoina.
          </p>
          <TipBox>
            <strong>Säästövinkki:</strong> Itsepalvelukeittiö mökissä tai huoneistossa säästää merkittävästi. Ruokakaupasta saa kaikki ainekset — poronkäristyskin onnistuu kotikeittiössä!
          </TipBox>
          <Link to="/opas/ravintolat-ja-palvelut-levilla" className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-sm">
            Lue lisää Levin ravintoloista ja palveluista →
          </Link>
        </SectionCard>

        {/* Osio 4: Ruokakaupat */}
        <SectionCard icon={ShoppingCart} title="Ruokakaupat ja päivittäistavarat">
          <p className="text-muted-foreground mb-4">
            Levillä on kaksi hyvin varusteltua ruokakauppaa: Levimarket (K-ryhmä) ja S-Market. Molemmat ovat auki joka päivä ja valikoimat yllättävät laajuudellaan pienelle kylälle. Hintataso on hieman korkeampi kuin Etelä-Suomessa, mutta ei dramaattisesti.
          </p>
          <PriceTable
            headers={["Tuote", "Tyypillinen hinta"]}
            rows={[
              ["Maito 1 l", "1,20–1,60 €"],
              ["Leipä", "2–4 €"],
              ["Jauheliha 400 g", "4–6 €"],
              ["Poronkäristysliha 300 g", "8–12 €"],
              ["Pasta 500 g", "1–2 €"],
              ["Juusto 300 g", "3–5 €"],
              ["Banaanit 1 kg", "1,50–2,50 €"],
              ["Olutpakkaus (6-pack, kauppa)", "8–14 €"],
              ["Viinipullo (Alko)", "8–15 €"],
              ["Valmisateria", "4–7 €"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Alkoholia yli 5,5 % myy vain Alko — Levin Alko on S-Marketin vieressä. Aukioloajat ovat rajoitetut (yleensä ma–pe 10–18, la 10–16). Kauppojen hinnat ovat noin 10–15 % korkeammat kuin Helsingissä.
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            K-Market ja S-Market ovat Suomen suurimmat kauppaketjut — K-ryhmä (Kesko) ja S-ryhmä (SOK). Levin S-Marketissa S-etukortti toimii normaalisti.
          </p>
          <TipBox>
            <strong>Säästövinkki:</strong> Pantti (Pantti/Pant) — Suomessa tölkeissä ja pulloissa on pantti (0,15–0,40 €). Vie tyhjät palautusautomaattiin kaupassa ja saat rahat takaisin. Levillä jokainen euro laskee!
          </TipBox>
        </SectionCard>

        {/* Osio 5: Aktiviteettihinnat */}
        <SectionCard icon={Dog} title="Aktiviteettihinnat">
          <p className="text-muted-foreground mb-4">
            Levin aktiviteetit ovat loman kohokohta — mutta myös suurin menoerä. Hinnat vaihtelevat operaattoreiden välillä, mutta tässä suuntaa-antavat hinnat yleisimmille aktiviteeteille.
          </p>
          <PriceTable
            headers={["Aktiviteetti", "Kesto", "Aikuinen", "Lapsi (4–14 v.)"]}
            rows={[
              ["Huskyajelu (itse ajamalla, 5 km)", "~1,5 h", "110–150 €", "70–100 €"],
              ["Huskyajelu (pitkä, 10 km)", "~2,5 h", "160–220 €", "100–150 €"],
              ["Poroajelu (lyhyt)", "~1 h", "60–90 €", "40–60 €"],
              ["Moottorikelkkasafari (2 h)", "~2–3 h", "100–160 €", "50–80 € (reen kyydissä)"],
              ["Moottorikelkkasafari (puolipäivä)", "~4–5 h", "180–280 €", "90–140 €"],
              ["Revontulisafari (kelkalla)", "~3 h", "120–180 €", "70–100 €"],
              ["Lumikenkäkävely", "~2–3 h", "60–90 €", "40–60 €"],
              ["Pilkkiminen (jääkalastus)", "~3 h", "70–100 €", "50–70 €"],
              ["Jääkarting", "~15 min", "30–50 €", "20–35 €"],
              ["Gondolihissi (meno-paluu)", "~1 h", "15 €", "15 €"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Hinnat sisältävät yleensä varusteet, kuljetuksen ja oppaan. Moottorikelkkasafareilla kuljettajalla pitää olla ajokortti (B, A1 tai A). Kelkkaa ajetaan vuorotellen pareittain — yksin ajaminen maksaa lisää. Vakuutuksen omavastuu on tyypillisesti 150–980 € — omavastuun voi yleensä pienentää 20 €:n lisämaksulla.
          </p>
          <TipBox>
            <strong>Säästövinkki:</strong> Varaa aktiviteetit suoraan paikalliselta operaattorilta, ei matkanjärjestäjän kautta — säästät helposti 20–30 %. Pienet perheyritykset tarjoavat usein henkilökohtaisempaa palvelua ja pienemmät ryhmäkoot.
          </TipBox>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/aktiviteetit/koiravaljakkoajelu-levi" className="text-accent hover:underline font-medium text-sm">
              Lue lisää huskyajelusta Levillä →
            </Link>
            <Link to="/aktiviteetit/moottorikelkkasafari-vinkit-levi" className="text-accent hover:underline font-medium text-sm">
              Lue lisää moottorikelkkasafarista →
            </Link>
          </div>
        </SectionCard>

        {/* Osio 6: Liikkuminen */}
        <SectionCard icon={Bus} title="Liikkuminen ja kuljetukset">
          <p className="text-muted-foreground mb-4">
            Levin keskusta on kompakti ja käveltävä. Rinteiden juurella olevasta majoituksesta pääsee suoraan laskettelemaan. Kauempana majoittuvat tarvitsevat Ski Bus -bussia, taksia tai vuokra-autoa.
          </p>
          <PriceTable
            headers={["Kuljetus", "Hinta"]}
            rows={[
              ["Ski Bus (päivälippu, hissilipun kanssa)", "3 €"],
              ["Ski Bus (päivälippu, ilman hissilippua)", "4 €"],
              ["Ski Bus (yhdensuuntainen, bussissa)", "4 €"],
              ["Ski Bus (kausikortti)", "43,50 €"],
              ["Lentokenttäbussi (Kittilä–Levi)", "~16 € (meno-paluu)"],
              ["Taksi (Kittilä–Levi)", "~30–45 €"],
              ["Vuokra-auto (pv)", "~50–100 €/pv"],
              ["Polttoaine", "~1,70–1,90 €/l"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Alle 6-vuotiaat matkustavat Ski Busissa ilmaiseksi aikuisen kanssa. Bussi kulkee kahta reittiä: R1 (koillisrinteet, Hossa, Sirkka) ja R2 (etelärinteet, South Point). Bussissa vain korttimaksu — ei käteistä.
          </p>
          <Link to="/matka/miten-paasee-leville-helsingista" className="text-accent hover:underline font-medium text-sm">
            Lue lisää Leville pääsemisestä →
          </Link>
        </SectionCard>

        {/* Osio 7: Majoituksen hintataso */}
        <SectionCard icon={Home} title="Majoituksen hintataso">
          <p className="text-muted-foreground mb-4">
            Levin majoitustarjonta on laaja: hotelleista ja spa-hotelleista mökeihin ja huoneistoihin. Hinnat vaihtelevat merkittävästi sesongin, sijainnin ja varustelutason mukaan.
          </p>
          <PriceTable
            headers={["Majoitustyyppi", "Sesonki (joulu–maaliskuu)", "Muut ajat"]}
            rows={[
              ["Hotelli (perushuone)", "120–250 €/yö", "70–150 €/yö"],
              ["Spa-hotelli", "150–350 €/yö", "100–200 €/yö"],
              ["Huoneisto (2–4 hlö)", "100–200 €/yö", "60–120 €/yö"],
              ["Mökki (4–6 hlö)", "150–350 €/yö", "80–200 €/yö"],
              ["Lasi-iglu", "300–500 €/yö", "ei yleensä saatavilla"],
            ]}
          />
          <p className="text-muted-foreground text-sm mb-4">
            Joulu–uusivuosi on kallein viikko — hinnat voivat olla 2–3-kertaiset normaaliin verrattuna. Hiihtolomaviikot (vko 8–10) ovat myös suosittuja. Edullisin aika on tammikuu (kaamos) ja huhtikuu (kevätlaskettelu).
          </p>
          <TipBox>
            <strong>Säästövinkki:</strong> Huoneisto tai mökki itsepalvelukeittiöllä säästää ravintolakuluissa satoja euroja viikossa. Leville.netin kautta varaat suoraan ilman välikäsiä.
          </TipBox>
          <Link to="/majoitukset">
            <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              Katso Leville.netin majoitukset →
            </Button>
          </Link>
        </SectionCard>

        {/* Osio 8: Esimerkkibudjetit */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <Euro className="w-6 h-6 text-accent" />
            Esimerkkibudjetit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Budjettiloma */}
            <Card className="bg-emerald-950/40 border-emerald-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Budjettiloma</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 henkilöä, 5 yötä</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Huoneisto: 500 €</li>
                  <li>Hissilippu 5 pv × 2: 457 €</li>
                  <li>Välinevuokra 5 pv × 2: ~400 €</li>
                  <li>Ruokakauppa: 200 €</li>
                  <li>2× ravintolaillallista: 160 €</li>
                  <li>1× huskyajelu: 240 €</li>
                  <li>Ski Bus: 30 €</li>
                </ul>
                <div className="border-t border-emerald-700/30 pt-3">
                  <p className="text-lg font-bold text-emerald-400">~1 990 €</p>
                  <p className="text-xs text-muted-foreground">995 €/hlö</p>
                </div>
              </CardContent>
            </Card>

            {/* Perheloma */}
            <Card className="bg-blue-950/40 border-blue-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Mukava perheloma</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 aikuista + 2 lasta, 6 yötä</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Mökki: 1 200 €</li>
                  <li>Hissilippu 6 pv (perhe): ~640 €</li>
                  <li>Välinevuokra (perhe): ~700 €</li>
                  <li>Ruokakauppa: 350 €</li>
                  <li>3× ravintolaillallista: 400 €</li>
                  <li>Huskyajelu (perhe): 400 €</li>
                  <li>Moottorikelkkasafari: 250 €</li>
                  <li>Kuljetukset: 100 €</li>
                </ul>
                <div className="border-t border-blue-700/30 pt-3">
                  <p className="text-lg font-bold text-blue-400">~4 040 €</p>
                  <p className="text-xs text-muted-foreground">1 010 €/hlö</p>
                </div>
              </CardContent>
            </Card>

            {/* Luksus */}
            <Card className="bg-amber-950/40 border-amber-700/30">
              <CardContent className="p-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Luksuskokemus</span>
                <p className="text-sm text-muted-foreground mt-1 mb-4">2 henkilöä, 5 yötä</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                  <li>Spa-hotelli / lasi-iglu: 1 500 €</li>
                  <li>Hissilippu 5 pv × 2: 457 €</li>
                  <li>Superior-vuokra: 500 €</li>
                  <li>Ravintolat joka ilta: 600 €</li>
                  <li>Huskyajelu 10 km: 400 €</li>
                  <li>Kelkkasafari puolipäivä: 400 €</li>
                  <li>Revontulisafari: 300 €</li>
                </ul>
                <div className="border-t border-amber-700/30 pt-3">
                  <p className="text-lg font-bold text-amber-400">~4 160 €</p>
                  <p className="text-xs text-muted-foreground">2 080 €/hlö</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Osio 9: FAQ */}
        <SectionCard icon={Info} title="Usein kysytyt kysymykset">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-accent">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionCard>

        {/* Lue lisää */}
        <ReadNextSection
          title="Lue lisää"
          links={[
            { title: "Majoitukset Levillä", desc: "Varaa huoneisto tai mökki Levin keskustasta.", href: "/majoitukset" },
            { title: "Ravintolat ja palvelut", desc: "Paikalliset suositukset ruokailuun.", href: "/opas/ravintolat-ja-palvelut-levilla" },
            { title: "Miten Leville pääsee?", desc: "Lennot, junat ja bussi Helsingistä.", href: "/matka/miten-paasee-leville-helsingista" },
          ]}
        />
      </main>

      <Footer />
      <WhatsAppChat />
      <StickyBookingBar />
    </div>
  );
};

export default LevinHinnatPage;
