import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mountain, ArrowRight, Check, Plane, Heart, Lightbulb, MapPin, TreePine,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";

const LeviVsSaariselka = () => {
  const location = useLocation();

  const customUrls = {
    fi: "/opas/levi-vs-saariselka" as const,
    en: "/guide/levi-vs-saariselka-comparison" as const,
  };

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Levi", href: "/levi" },
    { label: "Levi vs. Saariselkä", href: "" },
  ];

  const faqItems = [
    {
      q: "Kuinka kaukana Levi ja Saariselkä ovat toisistaan?",
      a: "Noin 260 km, autolla noin 3 tuntia. Kohteiden yhdistäminen samalla matkalla on mahdollista mutta vaatii jonkin verran ajamista. Kittilän ja Ivalon lentoasemat ovat eri suunnissa, joten useimmat valitsevat vain toisen kohteen.",
    },
    {
      q: "Kumpi sopii paremmin perheille?",
      a: "Molemmat sopivat perheille, mutta Levillä on selvästi enemmän oheispalveluja: 10 ilmaista lastenhissiä, Leevilandia, vesipuisto LeviWaterWorld, Arcandia-elämyskeskus ja laaja valikoima erilaisia aktiviteetteja. Saariselkä on rauhallisempi ja sopii perheille, jotka arvostavat hiljaisuutta ja luontoa.",
    },
    {
      q: "Kummassa on paremmat revontulet?",
      a: "Molemmat ovat erinomaisia revontulten katselupaikkoja. Saariselkä on hieman pohjoisempana, mutta ero käytännössä on pieni – molemmissa on vähäinen valosaaste ja erinomaiset olosuhteet syyskuusta maaliskuuhun.",
    },
    {
      q: "Onko Saariselkä oikeasti Euroopan pohjoisin hiihtokeskus?",
      a: "Kyllä – Saariselkä Ski & Sport Resort markkinoi itseään Euroopan pohjoisimpana hiihtokeskuksena. Sijainti on ainutlaatuinen, mutta rinteiden määrä ja koko on vaatimattomampi verrattuna esimerkiksi Leviin tai Rukaan.",
    },
    {
      q: "Pääseekö Saariselkään junalla?",
      a: "Ei suoraan. Lähin rautatieasema on Rovaniemellä, josta Saariselkään on vielä noin 260 km bussimatka. Levillä lähin juna-asema on Kolari (~1h siirtymä). Molempiin on helpointa lentää – Ivalon lentokenttä palvelee Saariselkää, Kittilä Leviä.",
    },
  ];

  const leviHighlight = "bg-primary/5";

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang="fi" customUrls={customUrls} />
      <Helmet>
        <html lang="fi" />
        <title>Levi vs. Saariselkä – Kumpi Lapin kohde sopii sinulle? | Leville.net</title>
        <meta name="description" content="Levi vai Saariselkä? Rehellinen vertailu kahdesta suositusta Lapin matkakohteesta. Rinteet, ladut, aktiviteetit, tunnelma ja saavutettavuus." />
        <link rel="canonical" href="https://leville.net/opas/levi-vs-saariselka" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://leville.net/opas/levi-vs-saariselka" />
        <meta property="og:title" content="Levi vs. Saariselkä – Kumpi Lapin kohde sopii sinulle? | Leville.net" />
        <meta property="og:description" content="Levi vai Saariselkä? Rehellinen vertailu kahdesta suositusta Lapin matkakohteesta." />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levi vs. Saariselkä – Kumpi Lapin kohde sopii sinulle? | Leville.net" />
        <meta name="twitter:description" content="Levi vai Saariselkä? Rehellinen vertailu kahdesta suositusta Lapin matkakohteesta." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Levi vs. Saariselkä – vilkas tunturikylä vai rauhallinen erämaa?",
            description: "Levi vai Saariselkä? Rehellinen vertailu kahdesta suositusta Lapin matkakohteesta.",
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

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Levi vs. Saariselkä – vilkas tunturikylä vai rauhallinen erämaa?
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                Kahden erilaisen Lappi-kokemuksen rehellinen vertailu
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Levi ja Saariselkä ovat molemmat suosittuja Lapin matkakohteita, mutta ne tarjoavat hyvin erilaisen kokemuksen. Levi on Suomen suurin ja monipuolisin hiihtokeskus kompaktissa tunturikylässä. Saariselkä on Euroopan pohjoisin hiihtokeskus Urho Kekkosen kansallispuiston portilla – rauhallisempi, perinteisempi ja erämaahenkisempi. Molemmat ovat erinomaisia kohteita, mutta aivan eri tunnelmaan. Tässä vertailussa autamme sinua valitsemaan.
              </p>
            </section>

            {/* At a Glance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Lyhyt yhteenveto – kaksi eri tunnelmaa</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card className="border-2 border-primary shadow-lg glass-card">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mountain className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Levi – Monipuolinen lomakeskus</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Suomen suurin hiihtokeskus: 43 rinnettä, 28 hissiä",
                        "Kompakti kylä – kaikki kävelymatkan päässä",
                        "Laaja ravintola-, kauppa- ja palvelutarjonta",
                        "Vilkas after-ski ja yöelämä",
                        "Vesipuisto, Arcandia, Ice Karting ja muita erikoisattraktioita",
                        "230 km murtomaahiihtolatuja",
                        "Useita Joulupukki-elämyksiä ja jouluaktiviteetteja",
                        "15 min Kittilän lentokentältä, 1h Kolarin juna-asemalta",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-6 h-6 text-muted-foreground" />
                      <h3 className="text-xl font-bold text-foreground">Saariselkä – Perinteinen erämaakohde</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Euroopan pohjoisin hiihtokeskus: 15 rinnettä, 6 hissiä",
                        "Urho Kekkosen kansallispuisto aivan vieressä",
                        "Rauhallinen, perinteinen tunnelma",
                        "Erinomaiset hiihtoladut (~200 km)",
                        "Vähemmän palveluja, mutta aito erämaakokemus",
                        "Kullanhuuhdontahistoria ja saamelaiskulttuuri",
                        "25 min Ivalon lentokentältä, ei junayhteyttä",
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
            </section>

            {/* Laskettelu */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Laskettelu ja talviurheilu</h2>
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
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Saariselkä</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Rinteitä", "43", "15"],
                      ["Hissejä", "28", "6"],
                      ["Korkeusero", "325 m", "180 m"],
                      ["Pisin rinne", "2 500 m", "1 300 m"],
                      ["Gondolihissi", "2 kpl", "Ei"],
                      ["Valaistut rinteet", "20", "7"],
                      ["Snow park", "South Park, Junior South Park, Fun Park", "Snow park + Boardercross"],
                      ["FIS-kilpailut", "Maailmancup vuosittain", "Ei"],
                      ["Murtomaahiihtoladut", "230 km", "~200 km"],
                      ["Laskukausi", "Lokakuu–toukokuu", "Marraskuu–toukokuu"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne"].includes(row[0]) ? "font-bold" : ""}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne"].includes(row[0]) ? "font-bold" : ""}>{row[2]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Laskettelussa Levi on selvästi suurempi: lähes kolme kertaa enemmän rinteitä, kaksi gondolihissiä ja Suomen modernein hissijärjestelmä. Saariselkän hiihtokeskus on pienempi ja sopii hyvin aloittelijoille ja rauhallisempaa laskettelua arvostaville – kokeneemmat laskijat saattavat kaivata lisää haastetta muutaman päivän jälkeen. Murtomaahiihdossa molemmat ovat erinomaisia: Levillä on hieman enemmän latuja, mutta Saariselkän latuverkosto kulkee kansallispuiston upeissa maisemissa ja on murtomaahiihtäjien keskuudessa erittäin arvostettu.
              </p>
            </section>

            {/* Luonto ja tunnelma */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Luonto ja tunnelma</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Tämä on ehkä suurin ero näiden kahden kohteen välillä. Saariselkä on selvästi rauhallisempi ja "lappilaisempi" – sieltä astuu suoraan Urho Kekkosen kansallispuistoon, jonka upeat tunturimaisemat ovat kansainvälisestikin tunnettuja. Jos etsit hiljaisuutta, erämaan rauhaa ja perinteistä Lapin tunnelmaa, Saariselkä tarjoaa sitä enemmän.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Levi puolestaan on kehittyneempi lomakeskus, jossa tunnelma on vilkkaampi ja palvelutarjonta laajempi. Levilläkin pääsee luontoon helposti – tunturiluonto alkaa aivan kylän reunalta – mutta kylän ydinkeskusta on eloisampi, etenkin iltaisin. Levin vahvuus on, että kaikki on kävelymatkan päässä: rinteet, ravintolat, kaupat ja aktiviteetit. Saariselkällä keskusta on pienempi ja hajautetumpi.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">Tiivistettynä:</strong> Saariselkä on enemmän perinteinen, rauhallinen Lapin luontokohde. Levi on modernimpi, monipuolisempi lomakeskus, jossa on enemmän tekemistä – mutta jonka ympärillä on silti aito tunturiluonto.
              </p>
            </section>

            {/* Aktiviteetit */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Aktiviteetit ja palvelut</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Saariselkä</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Moottorikelkkasafarit", "Laaja tarjonta, satoja km reittejä", "Kyllä, reittejä erämaahan"],
                      ["Husky-safarit", "Useita farmeja lähellä", "Kyllä, useita farmeja"],
                      ["Poroajelut", "Kyllä, porotiloja lähellä", "Kyllä, perinteisiä porotiloja"],
                      ["Kansallispuisto", "Pallas-Yllästunturin kp (päivämatka)", "Urho Kekkosen kp suoraan vieressä"],
                      ["Ravintolat", "Kymmeniä – fine dining, after-ski, fast food", "Muutamia – tunnelmallisia, pienempiä"],
                      ["Kaupat", "S-Market, K-Market, erikoisliikkeitä", "Pieni valikoima peruspalveluja"],
                      ["Yöelämä / after-ski", "Vilkas (Hullu Poro Arena, Ihku, baareja)", "Vähäinen"],
                      ["Vesipuisto", "LeviWaterWorld", "Ei"],
                      ["Erikoisattraktiot", "Arcandia, Ice Karting, Holiday Club Spa", "Aurora tobogganing, kullanhuuhdonta"],
                      ["Lasten aktiviteetit", "10 ilmaista hissiä, Leevilandia, vesipuisto", "Perhealueet, rauhallista tekemistä"],
                      ["Joulupukki-elämykset", "Useita jouluaktiviteetteja kaudella", "Vähäisempi tarjonta"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Levillä aktiviteettien määrä on selvästi suurempi ja kylän palvelutarjonta monipuolisempi. Perinteiset Lappi-aktiviteetit – husky-safarit, poroajelut, moottorikelkkailut – löytyvät molemmista, mutta Levillä niihin yhdistyvät myös erikoisattraktiot kuten vesipuisto, elämyskeskus ja vilkas after-ski-kulttuuri. Saariselkän vahvuus on luontoelämyksissä: Urho Kekkosen kansallispuisto on aivan vieressä, ja vaellusmahdollisuudet ovat Suomen parhaimmistoa.
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
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Saariselkä</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Lentokenttä", "Kittilä (KTT), 15 min siirtymä", "Ivalo (IVL), 25 min siirtymä"],
                      ["Lennot", "Useita päivittäin (Helsinki), sesonki kv-lennot", "Useita päivittäin (Helsinki), sesonki kv-lennot"],
                      ["Juna", "Kolari, ~1h siirtymä bussi/taksi", "Ei junayhteyttä (lähin Rovaniemi, ~260 km)"],
                      ["Autolla Helsingistä", "~1 100 km, ~13h", "~1 150 km, ~14h"],
                      ["Pärjääkö ilman autoa?", "Kyllä, erinomaisesti", "Peruskeskustassa kyllä, kansallispuistoon omat kyydit"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Molemmilla on lentokenttä lähellä, joten perille pääsee helposti. Merkittävin ero on junayhteys: Levin lähin juna-asema on Kolarissa (~1h), kun Saariselkään ei ole käytännössä junayhteyttä lainkaan – lähin asema on Rovaniemellä, noin 260 km päässä. Saariselkä sijaitsee Koillis-Lapissa kaukana junaradoista, mikä tekee siitä saavutettavuudeltaan hieman hankalamman niille, jotka eivät halua lentää.
              </p>
            </section>

            {/* Revontulet */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Revontulet</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Molemmat ovat erinomaisia paikkoja revontulten katseluun. Saariselkä on hieman pohjoisempana (noin 340 km napapiirin pohjoispuolella vs. Levin 170 km), mutta käytännössä ero on pieni – molemmissa valosaaste on vähäistä ja revontulet näkyvät usein suoraan majoituksen pihalta. Revontulisesonki on syyskuusta maaliskuuhun molemmissa kohteissa.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  🌌 <strong className="text-foreground">Lue lisää:</strong> Katso kattava oppaamme revontulten katseluun ja kuvaamiseen Levillä.{" "}
                  <Link to="/revontulet" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    Revontulet Levillä <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </section>

            {/* Kumpi valita */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Kumpi valita?</h2>
              <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-start">
                <Card className="md:col-span-3 border-2 border-primary shadow-lg relative glass-card">
                  <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Suosittelemme lomakohteeksi
                  </Badge>
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Levi, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Laskettelu tai hiihto on tärkeä osa lomaa – Levillä on Suomen suurin hiihtokeskus",
                        "Haluat monipuolisen lomakeskuksen: ravintolat, after-ski, aktiviteetit, spa",
                        "Matkustat perheen kanssa ja haluat runsaasti tekemistä lapsille",
                        "Haluat, että kaikki palvelut ovat kävelymatkan päässä ilman autoa",
                        "After-ski ja yöelämä kiinnostavat",
                        "Haluat enemmän valinnanvaraa majoituksessa, ruokailussa ja aktiviteeteissa",
                        "Jouluinen tunnelma ja Joulupukki-elämykset kiinnostavat",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Saariselkä, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Etsit rauhaa, hiljaisuutta ja aitoa erämaatunnelmaa",
                        "Haluat vaeltaa tai hiihtää Urho Kekkosen kansallispuistossa",
                        "Riittää pienempi, rauhallisempi hiihtokeskus (hyvä aloittelijoille)",
                        "Arvostat perinteistä Lapin tunnelmaa kaupallisen lomakeskuksen sijaan",
                        "Murtomaahiihto upeiden kansallispuistomaisemien keskellä on pääasia",
                        "Haluat kokea Koillis-Lapin ja Inarin seudun kulttuurin",
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
                Molemmat ovat erinomaisia Lapin kohteita, ja valinta riippuu siitä mitä lomaltasi haet. Saariselkä on rauhallisempi ja erämaahenkisempi – loistava valinta niille, jotka haluavat irtautua kaikesta. Levi tarjoaa enemmän tekemistä, paremman laskettelun ja monipuolisemmat palvelut – se on kokonaisvaltainen lomakeskus, jossa yhdistyvät talviurheilu, aktiviteetit ja tunnelma. Me suosittelemme Leviä – ja autamme mielellämme majoituksen löytämisessä.
              </p>
            </section>

            {/* Paikallisen vinkki */}
            <section className="mb-12">
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Paikallisen näkemys</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Olen käynyt molemmissa useaan otteeseen ja pidän molemmista eri syistä. Valinta riippuu todella siitä, mitä lomaltasi haet.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Saariselkä on paljon rauhallisempi ja tuntuu kaukaisemmalta – se sijaitsee Koillis-Lapissa kaukana esimerkiksi junaradoista. Urho Kekkosen kansallispuiston maisemat ovat todella upeita. Murtomaahiihtoladut ovat erinomaiset (mikä on tärkeää itselleni), mutta laskettelukeskus on aika pieni. Hyvä aloittelijoille, mutta edistyneemmät laskijat saattavat tylsistyä muutaman päivän jälkeen.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Levi on isompi ja vilkkaampi lomakeskus – ensisijainen valinta heille, jotka haluavat after-skitä ja yöelämää, vaikka siellä voi myös viettää lomaa huomaamatta sitä juuri ollenkaan. Levillä on enemmän erilaisia attraktioita (vesipuisto, Arcandia, jääkarting...), kauppoja ja ravintoloita, ja hiihtokeskus on selvästi suurempi. Levillä on myös enemmän mahdollisuuksia tavata Joulupukki.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Husky-safarit, poroajelut ja moottorikelkkailu onnistuvat molemmissa kohteissa – niissä eroa ei juuri ole. Toivottavasti tästä oli apua! 😊
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  { title: "Levi vs. Ylläs vs. Ruka", href: "/opas/levi-vs-yllas-vs-ruka", icon: Mountain },
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
          </div>
        </main>

        <Footer />
        <WhatsAppChat />
        <StickyBookingBar />
      </div>
    </>
  );
};

export default LeviVsSaariselka;
