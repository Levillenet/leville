import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mountain, ArrowRight, Check, Snowflake, Plane, Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";

const LeviVsYllasVsRuka = () => {
  const location = useLocation();

  const customUrls = {
    fi: "/opas/levi-vs-yllas-vs-ruka",
    en: "/guide/levi-vs-yllas-vs-ruka-comparison",
  };

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Levi", href: "/levi" },
    { label: "Levi vs. Ylläs vs. Ruka", href: "" },
  ];

  const faqItems = [
    {
      q: "Kuinka kaukana Levi, Ylläs ja Ruka ovat toisistaan?",
      a: "Levi ja Ylläs ovat noin 55 km toisistaan eli 45–55 minuuttia autolla. Ruka on Kuusamossa, noin 350 km Leviltä. Levin ja Ylläksen välillä voi helposti tehdä päiväreissun, mutta Rukan yhdistäminen samalle lomalle vaatii pidemmän siirtymän.",
    },
    {
      q: "Onko Ruka Lapissa?",
      a: "Virallisesti ei – Ruka sijaitsee Kuusamossa, joka kuuluu Pohjois-Pohjanmaan maakuntaan. Kuitenkin Ruka on tunnelmaltaan, luonnoltaan ja olosuhteiltaan hyvin lappimainen: tuntureita, revontulia, kaamosta ja lunta riittää. Monelle matkaajalle Ruka tuntuu \"melkein Lapilta\" – käytännössä ero on lähinnä hallinnollinen.",
    },
    {
      q: "Mikä on paras hiihtokeskus lapsiperheille?",
      a: "Kaikki kolme sopivat perheille. Leviltä löytyy kuitenkin selvästi eniten oheispalveluja ja aktiviteetteja lasten kanssa, ja kaikki on kävelymatkan päässä – mikä tekee arjesta helpointa lasten kanssa. Levi tarjoaa myös 10 ilmaista lastenhissiä.",
    },
    {
      q: "Mikä hiihtokeskus on edullisin?",
      a: "Hintataso on hyvin samankaltainen. Levillä ja Rukalla laajempi majoitusvalikoima tarkoittaa, että edullisempia vaihtoehtoja löytyy helpommin. Autolla saapuville Ruka on matkakuluiltaan edullisin. Levillä pärjää ilman autoa, mikä säästää vuokra-autokulut.",
    },
    {
      q: "Voiko samalla lomalla käydä useammassa keskuksessa?",
      a: "Levin ja Ylläksen välillä päiväreissut ovat helppoja (45 min autolla). Suosittelemme Leviä kotipesäksi – sieltä pääset helposti käymään Ylläksellä ja palaamaan takaisin monipuolisten palvelujen ääreen illaksi.",
    },
  ];

  const leviHighlight = "bg-primary/5";

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang="fi" customUrls={customUrls} />
      <Helmet>
        <html lang="fi" />
        <title>Levi vs. Ylläs vs. Ruka – Vertailu 2026 | Rinteet, hissit ja palvelut | Leville.net</title>
        <meta name="description" content="Levi, Ylläs vai Ruka? Rehellinen paikallisen vertailu Suomen kolmen suurimman hiihtokeskuksen rinteistä, hisseistä, laduista, palveluista ja tunnelmasta." />
        <link rel="canonical" href="https://leville.net/opas/levi-vs-yllas-vs-ruka" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://leville.net/opas/levi-vs-yllas-vs-ruka" />
        <meta property="og:title" content="Levi vs. Ylläs vs. Ruka – Vertailu 2026 | Leville.net" />
        <meta property="og:description" content="Levi, Ylläs vai Ruka? Rehellinen paikallisen vertailu Suomen kolmen suurimman hiihtokeskuksen rinteistä, hisseistä, laduista, palveluista ja tunnelmasta." />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levi vs. Ylläs vs. Ruka – Vertailu 2026 | Leville.net" />
        <meta name="twitter:description" content="Levi, Ylläs vai Ruka? Rehellinen paikallisen vertailu Suomen kolmen suurimman hiihtokeskuksen rinteistä, hisseistä, laduista, palveluista ja tunnelmasta." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Levi vs. Ylläs vs. Ruka – mikä hiihtokeskus sopii sinulle?",
            description: "Levi, Ylläs vai Ruka? Rehellinen paikallisen vertailu Suomen kolmen suurimman hiihtokeskuksen rinteistä, hisseistä, laduista, palveluista ja tunnelmasta.",
            author: { "@type": "Organization", name: "Leville.net" },
            publisher: { "@type": "Organization", name: "Leville.net" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          })}
        </script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Levi vs. Ylläs vs. Ruka – mikä hiihtokeskus sopii sinulle?
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                Rehellinen paikallisen vertailu Suomen kolmesta suurimmasta hiihtokeskuksesta
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Levi, Ylläs ja Ruka ovat Suomen kolme suurinta ja suosituinta hiihtokeskusta. Levi ja Ylläs sijaitsevat Lapissa vain 55 km toisistaan, kun taas Ruka on Kuusamossa – teknisesti Koillis-Suomessa eikä Lapissa, mutta tunnelmaltaan ja luonnoltaan hyvin lappimainen. Kaikki kolme tarjoavat erinomaisia olosuhteita, mutta eroavat merkittävästi tunnelmaltaan, palveluiltaan ja rinteiden luonteeltaan. Tässä vertailussa käymme läpi, mikä sopii parhaiten juuri sinun lomaasi. Olemme paikallisia ja tunnemme kaikki kolme keskusta hyvin.
              </p>
            </section>

            {/* Rinteet ja laskettelu */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Rinteet ja laskettelu</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>
                        <div className="flex items-center gap-2">
                          Levi <Badge variant="default" className="text-[10px] px-1.5 py-0">Suosittelemme</Badge>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Rinteitä", "43", "63", "41"],
                      ["Hissejä", "28", "29", "22"],
                      ["Korkeusero", "325 m", "463 m", "201 m"],
                      ["Pisin rinne", "2 500 m", "3 000 m", "1 300 m"],
                      ["Gondolihissi", "2 kpl (Levi Black, Gondoli 2000)", "1 kpl (Ylläs Express)", "1 kpl (Village-2-Valley)"],
                      ["Moderni hissiteknologia", "Useita 6-paikkaisia Doppelmayer D-Line -tuolihissejä lämmitetyin istuimin ja suojakuvuin. Uusi tuolihissi kesällä 2026.", "Tuolihissejä ja vanhempia ankkurihissejä", "8-paikkainen Masto Express (Suomen nopein, 6 m/s)"],
                      ["Snow park", "South Park, Junior South Park, Fun Park", "Kyllä", "Ruka Park (FIS), Ruka Park Junior"],
                      ["World Cup -kisat", "FIS-alppihiihdon maailmancup joka marraskuu", "Ei", "FIS-freestylen maailmancup"],
                      ["Investoinnit", "Yli 64 M€ viime vuosina", "Merkittäviä", "14 M€ Masto Express (2023)"],
                      ["Rinteiden vaikeustaso", "Tasaisesti jakaantunut", "Enemmän vaativia ja pitkiä", "41 % sinisiä, 43 % punaisia, 16 % mustia"],
                      ["Laskukausi", "Lokakuu–toukokuu", "Marraskuu–toukokuu", "Lokakuu–toukokuu"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={`${leviHighlight}`}>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne"].includes(row[0]) ? "font-bold" : ""}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne"].includes(row[0]) ? "font-bold" : ""}>{row[2]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne"].includes(row[0]) ? "font-bold" : ""}>{row[3]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Ylläksellä on eniten rinteitä ja suurin korkeusero lukuina mitattuna. Tämä ei kuitenkaan kerro koko totuutta laskupäivän laadusta. Levillä on Suomen modernein hissi- ja lumetusinfrastruktuuri: yli 64 miljoonan euron investoinnit viime vuosina ovat tuoneet huipputeknologiset Doppelmayer D-Line -tuolihissit lämmitettyine istuimineen ja suojakupuineen, maailmanluokan automaattilumetuksen ja LED-rinnevalaistuksen. Käytännössä tämä tarkoittaa, että Levillä rinteet ovat paremmassa kunnossa, hissimatkat nopeampia ja mukavampia, ja rinteet pysyvät auki myös tuulisina päivinä paremmin kuin Ylläksellä, jossa tuuli sulkee tunturin yläosia herkemmin. Kesällä 2026 Etelärinteille nousee jälleen uusi moderni tuolihissi, joka laajentaa nopeiden hissien verkoston kattamaan kaikki tunturin puolet. Levi on myös ainoa hiihtokeskus Suomessa, joka isännöi FIS-alppihiihdon maailmancup-kisoja vuosittain – tämä takaa sen, että rinteenhoito on kilpailutasolla joka päivä.
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Ylläksen rinteet soveltuvat erityisesti edistyneille laskettelijoille, mutta moni hissi on edelleen vanhaa ankkurihissitekniikkaa, ja palvelut jakautuvat tunturin kahdelle puolelle, mikä lisää siirtymäaikaa. Rukan korkeusero on vain 201 metriä – noin puolet Levin korkeuseron verran – ja pisin rinne 1 300 metriä. Laskupäivän vaihtelevuus on rajallisempaa kuin Levillä tai Ylläksellä. Ruka kompensoi tätä erinomaisella rinteidenhoidolla ja pitkällä kaudella, mutta jos laskettelu on loman pääasia, Levi tai Ylläs tarjoavat selvästi enemmän.
              </p>
            </section>

            {/* Murtomaahiihto */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Murtomaahiihto ja ladut</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Latukilometrit", "230 km", "330 km", "500+ km (Kuusamon alue)"],
                      ["Valaistu latu", "Kyllä, useita", "Kyllä, useita", "16 km"],
                      ["Tunturiladut", "Kyllä", "Erityisen tunnettuja", "Vaihteleva maasto"],
                      ["Latuprofiili", "Monipuolinen, myös helppoja", "Pitkiä tunturilatuja, vaativampia", "Monipuolinen, tehokas lumetus"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}><span className={row[0] === "Latukilometrit" ? "font-bold" : ""}>{row[1]}</span></TableCell>
                        <TableCell><span className={row[0] === "Latukilometrit" ? "font-bold" : ""}>{row[2]}</span></TableCell>
                        <TableCell><span className={row[0] === "Latukilometrit" ? "font-bold" : ""}>{row[3]}</span></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Ylläs on perinteisesti Suomen murtomaahiihtäjien ykköskohde, erityisesti tunturilatujen maisemissa. Rukan Kuusamon alueen latuverkosto on kokonaispituudeltaan laajin (yli 500 km). Levin latuverkosto on monipuolinen ja helposti saavutettavissa keskustasta – mukana on vaativia tunturilatuja ja helppoja valaistuja lenkkejä aloittelijoille. Jos latu on loman päätarkoitus, Ylläs tai Ruka ovat erikoistuneempia valintoja, mutta Levillä saat latujen lisäksi kaiken muunkin kävelymatkan päähän.
              </p>
            </section>

            {/* Palvelut ja tunnelma */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Palvelut ja tunnelma</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>
                        <div className="flex items-center gap-2">
                          Levi <Badge variant="default" className="text-[10px] px-1.5 py-0">Suosittelemme</Badge>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Ravintolat", "Runsaasti, erittäin monipuolinen", "Vähemmän, mutta laadukkaita", "Monipuolinen (15+ kylässä)"],
                      ["After-ski", "Vilkas, useita paikkoja", "Rauhallinen", "Vilkas, mutta suppeampi kuin Levi"],
                      ["Kaupat", "S-Market, K-Market, erikoisliikkeitä", "Pienempi valikoima", "Ostoskeskus Kumpare"],
                      ["Yöelämä", "Aktiivinen – baareja ja klubeja", "Hyvin rauhallinen", "Aktiivinen sesonkiaikoina"],
                      ["Kylpylä/Spa", "Levi Hotel Spa (rinteiden juurella)", "Ei vastaavaa", "Kuusamon Tropiikki (8 km päässä)"],
                      ["Kylän rakenne", "Kompakti keskusta rinteiden juurella – kaikki kävelymatkan päässä", "Hajautunut kahteen kylään – auto tarpeen", "Autoton kävelykylä, kompakti mutta pieni"],
                      ["Pärjääkö ilman autoa?", "Kyllä, erinomaisesti", "Käytännössä tarvitset auton", "Kohtuullisesti (SkiBus)"],
                      ["Yleinen tunnelma", "Vilkas ja palveluvaltainen alppikylä", "Rauhallinen ja luonnonläheinen", "Kompakti alppikylä"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                        <TableCell>{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Palveluissa ja tunnelmassa Levi on selkeästi omaa luokkaansa. Levin keskustassa kaikki on kävelymatkan päässä: kymmeniä ravintoloita, kauppoja, vuokraamoja, after-ski-paikkoja ja kylpylä – aivan rinteiden juurella. Rukan kävelykylä on miellyttävä ja kompakti, mutta palveluvalikoima on olennaisesti suppeampi kuin Levillä. Ylläksen palvelut jakautuvat kahteen erilliseen kylään tunturin eri puolille, mikä tarkoittaa käytännössä auton tarvetta liikkumiseen niiden välillä. Jos etsit kohdetta, jossa voit jättää auton parkkiin ja hoitaa kaiken loman jalkaisin, Levi on ylivoimainen valinta.
              </p>
            </section>

            {/* Aktiviteetit */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Aktiviteetit rinteiden ulkopuolella</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Moottorikelkkasafarit", "Laaja tarjonta, satoja km reittejä", "Kyllä", "Kyllä, ~40 safarijärjestäjää"],
                      ["Husky-safarit", "Kyllä, useita farmeja", "Kyllä", "Kyllä"],
                      ["Poroajelut", "Kyllä", "Kyllä", "Kyllä"],
                      ["Kylpylä", "Levi Hotel Spa (rinteiden juurella)", "Ei", "Kuusamon Tropiikki (8 km)"],
                      ["Revontuliretket", "Kyllä, laaja tarjonta", "Kyllä", "Kyllä"],
                      ["Kesäaktiviteetit", "Bike park, kesäkelkkarata, golf, vaellus, kalastus", "Vaellus, pyöräily", "Bike park, kesäkelkkarata, Ruka Coaster, koskenlaskua"],
                      ["Kansallispuistot", "Pallas-Yllästunturi NP (autolla)", "Pallas-Yllästunturi NP (vieressä)", "Oulangan NP ja Karhunkierros (vieressä)"],
                      ["Aktiviteettivalikoiman laajuus", "Lapin laajin", "Hyvä, mutta suppeampi", "Hyvä, erityisesti luontomatkailu"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                        <TableCell>{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Aktiviteettitarjonnassa Levi on ylivoimainen – täällä on Lapin laajin valikoima erilaisia aktiviteetteja kelkkasafareista huskysafareihin, poroajeluista kylpylälomaan ja revontuliretkistä kesän bike parkiin. Kaikki on saavutettavissa helposti keskustasta käsin. Rukan erityinen vahvuus on luontomatkailu: Oulangan kansallispuisto ja legendaarinen 80 km Karhunkierros-vaellusreitti ovat aivan vieressä. Ylläksen valtti on rauha ja Pallas-Yllästunturin kansallispuisto kyljessä. Jos haluat monipuolisen loman, jossa laskettelu ja aktiviteetit yhdistyvät vaivattomasti, Levi on paras valinta.
              </p>
            </section>

            {/* Saavutettavuus */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Saavutettavuus</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[180px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ylläs</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[180px]">Ruka</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Lähin lentokenttä", "Kittilä (KTT), 15 min", "Kittilä (KTT), 40 min", "Kuusamo (KAO), 25 min"],
                      ["Suorat kv-lennot", "Kyllä (sesonki)", "Kittilän kautta", "Kyllä (Düsseldorf, Frankfurt, Zürich)"],
                      ["Junayhteys", "Kolari, ~1h siirtymä", "Kolari, ~45 min", "Ei suoraa (Oulu 3h + bussi)"],
                      ["Autolla Helsingistä", "~1 100 km, ~13h", "~1 050 km, ~12,5h", "~800 km, ~9,5h"],
                      ["Pärjääkö ilman autoa?", "Kyllä", "Käytännössä ei", "Kohtuullisesti"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                        <TableCell>{row[3]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Levi on lähimpänä lentokenttää – vain 15 minuutin ajomatka Kittilästä. Tämä on merkittävä käytännön etu erityisesti lyhyemmillä lomilla: majoituksessa olet puolessa tunnissa lennon laskeutumisesta. Ja koska Levin keskusta on kompakti, et tarvitse autoa perillä lainkaan. Rukalle pääsee autolla Etelä-Suomesta nopeammin (800 km vs. 1 100 km), mutta lentäen matka on käytännössä samanpituinen. Ylläkselle siirtymä Kittilän kentältä on pisin (40 min), ja perillä auto on lähes välttämätön hajautuneen kylärakenteen vuoksi.
              </p>
            </section>

            {/* Hintataso */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Hintataso</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hintataso on kaikissa kolmessa keskuksessa melko samankaltainen – hissilipuissa ei ole merkittävää eroa. Majoituksessa Leviltä löytyy selvästi laajin valikoima eri hintatasoilla: studiot ja huoneistot keskustassa ovat usein edullisempi vaihtoehto kuin hotellit, ja kilpailu pitää hinnat kohtuullisina. Rukalla majoitusvalikoima on myös monipuolinen, mutta Ylläksellä tarjonta on suppeampi. Ravintolahinnat ovat kaikissa kohteissa tyypillistä Pohjois-Suomen tasoa. Autolla saapuville Ruka on matkakuluiltaan edullisin lyhyemmän ajomatkan ansiosta.
              </p>
            </section>

            {/* Kumpi valita */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Kumpi siis valita?</h2>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-start">
                {/* Levi card - highlighted */}
                <Card className="md:col-span-1 border-2 border-primary shadow-lg relative glass-card md:scale-105 md:-my-2">
                  <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Suosittelemme
                  </Badge>
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Levi, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Haluat täyden palvelun loman, jossa kaikki on kävelymatkan päässä",
                        "Arvostat Suomen moderneinta hissijärjestelmää – kaksi gondolia ja huipputeknologiset tuolihissit lämmitetyin istuimin",
                        "Matkustat perheen kanssa ja kaikille pitää löytyä tekemistä rinteiden lisäksi",
                        "After-ski ja ravintolat ovat tärkeä osa lomaa",
                        "Haluat lyhyimmän siirtymän lentokentältä (15 min) ja pärjäät ilman autoa",
                        "Haluat Lapin laajimman aktiviteettivalikoiman",
                        "Haluat World Cup -tason rinteenhoitoa ja lumivarmuutta kauden alusta loppuun",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Ylläs card */}
                <Card className="glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Ylläs, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Laskettelu tai murtomaahiihto on loman ehdoton pääasia ja haluat Suomen pisimmät rinteet ja korkeimman korkeuseron",
                        "Arvostat rauhaa, hiljaisuutta ja luonnonläheisyyttä yli kaiken muun",
                        "Et kaipaa vilkasta yöelämää tai laajaa palveluvalintaa",
                        "Olet kokenut hiihtäjä ja sinulle riittävät yksinkertaisemmat hissit",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Ruka card */}
                <Card className="glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Ruka, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Tulet autolla Etelä- tai Keski-Suomesta ja haluat lyhyemmän ajomatkan",
                        "Haluat yhdistää laskettelun ja luontomatkailun – Oulangan kansallispuisto ja Karhunkierros ovat vieressä",
                        "Arvostat kompaktia kylätunnelmaa mutta pienemmässä mittakaavassa kuin Levillä",
                        "Et välttämättä tarvitse \"virallista\" Lappia, mutta haluat lappimaisen tunnelman",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-muted-foreground mt-6 text-sm leading-relaxed text-center max-w-3xl mx-auto">
                Kaikki kolme ovat hyviä kohteita – mutta jos haluat kokonaisuudeltaan parhaan loman, jossa yhdistyvät loistavat rinteet, modernit hissit, laajimmat palvelut ja helppo saavutettavuus, Leviä on vaikea voittaa. Levi ja Ylläs ovat tunnin ajomatkan päässä toisistaan, joten pidemmällä lomalla voit käydä testaamassa Ylläksen pitkiä rinteitä päiväreissulla. Me suosittelemme Leviä kotipesäksi – ja autamme mielellämme majoituksen löytämisessä.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Usein kysytyt kysymykset</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Lue myös */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Lue myös</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: "Levi vs. Rovaniemi", href: "/opas/levi-vs-rovaniemi", icon: Mountain },
                  { title: "Levi vs. Saariselkä", href: "/opas/levi-vs-saariselka", icon: Mountain },
                  { title: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista", icon: Plane },
                ].map((link, idx) => (
                  <Link key={idx} to={link.href}>
                    <Card className="glass-card border-border/30 hover:border-primary/50 transition-colors h-full">
                      <CardContent className="p-4 flex items-center gap-3">
                        <link.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">{link.title}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/levi">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Takaisin Levi-oppaaseen
                </Link>
              </Button>
              <Button asChild>
                <Link to="/majoitukset">
                  Varaa majoitus
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </section>
            <GuideDisclaimer lang="fi" />
          </div>
        </main>

        <Footer />
        <WhatsAppChat />
        <StickyBookingBar />
      </div>
    </>
  );
};

export default LeviVsYllasVsRuka;