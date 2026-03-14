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

const LeviVsRovaniemi = () => {
  const location = useLocation();

  const customUrls = {
    fi: "/opas/levi-vs-rovaniemi" as const,
    en: "/guide/levi-vs-rovaniemi-comparison" as const,
  };

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Levi", href: "/levi" },
    { label: "Levi vs. Rovaniemi", href: "" },
  ];

  const faqItems = [
    {
      q: "Kuinka kaukana Levi ja Rovaniemi ovat toisistaan?",
      a: "Noin 170 km, autolla noin 2 tuntia. Bussiyhteydet kulkevat päivittäin. Monet matkailijat yhdistävät kohteet: lentävät Rovaniemelle, käyvät Joulupukin kylässä ja jatkavat Leville loppu lomaksi.",
    },
    {
      q: "Tapaako Joulupukin Levillä?",
      a: "Kyllä! Levin alueella toimii useita Joulupukki-elämyksiä erityisesti joululomakaudella. Kokemus on usein intiimimpi ja rauhallisempi kuin Rovaniemen vilkkaassa Joulupukin kylässä.",
    },
    {
      q: "Kummassa on paremmat revontulet?",
      a: "Levillä on selkeä etu: kylä sijaitsee 170 km napapiirin pohjoispuolella, ja vähäinen valosaaste tarkoittaa, että revontulet näkyvät usein suoraan majoituksen pihalta. Rovaniemellä kaupungin valot heikentävät näkyvyyttä.",
    },
    {
      q: "Voiko laskettelu Rovaniemellä verrattavissa Leviin?",
      a: "Ei käytännössä. Ounasvaara on mukava pieni lähikeskus (10 rinnettä, 140 m korkeusero), mutta Levi on eri luokkaa: 43 rinnettä, 325 m korkeusero, kaksi gondolihissiä ja Suomen modernein hissijärjestelmä. Jos laskettelu on tärkeä osa lomaa, Levi on ainoa oikea valinta.",
    },
    {
      q: "Miten yhdistän Rovaniemen ja Levin samalle matkalle?",
      a: "Helpoin tapa: lennä Rovaniemelle, vietä päivä Joulupukin kylässä ja aja tai mene bussilla Leville (2h). Leville voi myös lentää suoraan Kittilän kautta. Toinen vaihtoehto: lennä Kittilään, lomaa Levillä ja käy päiväreissulla Rovaniemellä.",
    },
  ];

  const leviHighlight = "bg-primary/5";

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang="fi" customUrls={customUrls} />
      <Helmet>
        <html lang="fi" />
        <title>Levi vs. Rovaniemi – Kumpi Lapin kohde sopii sinulle? | Leville.net</title>
        <meta name="description" content="Levi vai Rovaniemi? Rehellinen vertailu Lapin tunturikylän ja Lapin pääkaupungin välillä. Laskettelu, aktiviteetit, joulupukki, revontulet, palvelut ja hintataso." />
        <link rel="canonical" href="https://leville.net/opas/levi-vs-rovaniemi" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://leville.net/opas/levi-vs-rovaniemi" />
        <meta property="og:title" content="Levi vs. Rovaniemi – Kumpi Lapin kohde sopii sinulle? | Leville.net" />
        <meta property="og:description" content="Levi vai Rovaniemi? Rehellinen vertailu Lapin tunturikylän ja Lapin pääkaupungin välillä. Laskettelu, aktiviteetit, joulupukki, revontulet, palvelut ja hintataso." />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levi vs. Rovaniemi – Kumpi Lapin kohde sopii sinulle? | Leville.net" />
        <meta name="twitter:description" content="Levi vai Rovaniemi? Rehellinen vertailu Lapin tunturikylän ja Lapin pääkaupungin välillä." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Levi vs. Rovaniemi – tunturikylä vai Lapin pääkaupunki?",
            description: "Levi vai Rovaniemi? Rehellinen vertailu Lapin tunturikylän ja Lapin pääkaupungin välillä.",
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
                Levi vs. Rovaniemi – tunturikylä vai Lapin pääkaupunki?
              </h1>
              <p className="text-lg text-primary font-medium mb-4">
                Kahden hyvin erilaisen Lappi-kokemuksen rehellinen vertailu
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Levi ja Rovaniemi ovat molemmat suosittuja Lapin matkakohteita, mutta ne tarjoavat hyvin erilaisen kokemuksen. Levi on tunturikylä Kittilässä, joka on rakentunut Levitunturin rinteiden juurelle – täällä eletään lunta, luontoa ja hiihtokeskusarkea. Rovaniemi on Lapin pääkaupunki napapiirin tuntumassa, tunnettu erityisesti Joulupukin kylästä ja kaupunkipalveluistaan. Kumpikin on erinomainen kohde, mutta aivan eri asioihin. Tässä vertailussa autamme sinua valitsemaan, kumpi sopii juuri sinun lomaasi.
              </p>
            </section>

            {/* At a Glance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Lyhyt yhteenveto – kaksi eri maailmaa</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card className="border-2 border-primary shadow-lg glass-card">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mountain className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Levi – Tunturikylä</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Aito hiihtokeskus Levitunturin juurella",
                        "43 rinnettä, 28 hissiä, 230 km latuja",
                        "Erinomainen lumivarmuus – laskettelukausi lokakuusta toukokuulle, luonnonlunta viimeistään joulukuussa",
                        "Kompakti keskusta, kaikki kävelymatkan päässä",
                        "Tunturiluonto, hiljaisuus, revontulet",
                        "Kelkkasafarit, huskyt, porot, spa – kaikki paikan päällä",
                        "Joulupukki-elämyksiä, tonttujen elämyskylä ja jouluaktiviteetteja koko perheelle",
                        "15 min Kittilän lentokentältä",
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
                      <h3 className="text-xl font-bold text-foreground">Rovaniemi – Lapin pääkaupunki</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Kaupunki (65 000 asukasta) napapiirin tuntumassa",
                        "Joulupukin kylä (Santa Claus Village) – maailmankuulu",
                        "Ounasvaaran lähikeskus: 10 rinnettä, 140 m korkeusero",
                        "Arktikum-museo, kaupunkipalvelut, ravintolat",
                        "Oma lentokenttä ja rautatieasema keskustassa",
                        "Hyvä tukikohta Lapin kiertomatkalle",
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
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi (Ounasvaara)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Rinteitä", "43", "10"],
                      ["Hissejä", "28", "5"],
                      ["Korkeusero", "325 m", "140 m"],
                      ["Pisin rinne", "2 500 m", "600 m"],
                      ["Gondolihissi", "2 kpl", "Ei"],
                      ["Modernit tuolihissit", "Useita Doppelmayer D-Line (lämmitetyt istuimet, suojakuvut)", "1 tuolihissi"],
                      ["Snow park", "South Park, Junior South Park, Fun Park", "Snow Park (pieni)"],
                      ["World Cup -kisat", "FIS-alppihiihdon maailmancup vuosittain", "Ei"],
                      ["Murtomaahiihtoladut", "230 km", "~80 km"],
                      ["Laskukausi", "Lokakuu–toukokuu (tykkilumi lokakuusta, luonnonlumi joulukuusta)", "Marraskuu–huhtikuu"],
                    ].map((row, idx) => (
                      <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/40 transition-colors`}>
                        <TableCell className="font-medium text-foreground">{row[0]}</TableCell>
                        <TableCell className={leviHighlight}>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne", "Murtomaahiihtoladut"].includes(row[0]) ? "font-bold" : ""}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={["Rinteitä", "Hissejä", "Korkeusero", "Pisin rinne", "Murtomaahiihtoladut"].includes(row[0]) ? "font-bold" : ""}>{row[2]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Laskettelussa tämä ei ole edes vertailu. Levi on Suomen suurin hiihtokeskus 43 rinteellä, kahdella gondolihissillä ja yli 64 miljoonan euron tuoreilla hissi-investoinneilla. Ounasvaara Rovaniemellä on mukava pieni lähikeskus, jossa on 10 rinnettä ja 140 metrin korkeusero – se sopii erinomaisesti aloittelijoille ja paikallisille harrastajille, mutta ei ole varsinainen hiihtolomakohde. Jos laskettelu tai murtomaahiihto on lomasi pääasia, valinta on selvä: Levi.
              </p>
            </section>

            {/* Lumensyvyys ja lumivarmuus */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Lumensyvyys ja lumivarmuus</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Levin sijainti 170 km napapiirin pohjoispuolella tarkoittaa pidempää ja lumivarmaempaa talvea kuin Rovaniemellä. Laskettelukausi ja hiihtoladut aukeavat Levillä jo lokakuussa tykkilumen avulla, ja luonnonlunta on tyypillisesti viimeistään joulukuun alussa. Lumi pysyy toukokuulle asti. Lumensyvyys nousee parhaimmillaan 80–100 senttimetriin, mikä takaa erinomaiset olosuhteet koko pitkän kauden ajan.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Rovaniemi sijaitsee napapiirin tuntumassa, noin 170 km etelämpänä. Tämä näkyy selvästi lyhyempänä lumikautena ja ohuempana lumipeitteenä – erityisesti alkutalvesta ja keväällä ero voi olla merkittävä. Joulusesonkiin ei aina ole taattua paksua lumipeitettä Rovaniemellä, kun taas Levillä lunta on käytännössä aina reilusti joulukuussa.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Levillä lunta on aina enemmän, se sataa aiemmin ja sulaa myöhemmin kuin Rovaniemellä. Kittilän alueella ensimmäiset pysyvät lumet tulevat tyypillisesti lokakuussa, kun Rovaniemellä pysyvä lumipeite muodostuu usein vasta marraskuussa. Keväällä lumi sulaa Rovaniemeltä huhtikuussa, kun Levillä lasketellaan ja hiihdellään vielä toukokuussa. Keskitalvella lumensyvyysero voi olla jopa 30–40 cm Levin hyväksi. <strong className="text-foreground">Jos lumi on tärkeä osa lomaasi – oli kyse hiihdosta, kelkkailusta, lumikenkäilystä tai lasten lumileikeistä – valinta on selvä: Levi.</strong>
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  📊 <strong className="text-foreground">Vertaile itse:</strong> Katso Levin alueen historialliset lumensyvyystiedot interaktiivisesta graafikastamme ja vertaile eri vuosien lumitilannetta haluamaltasi aikaväliltä.{" "}
                  <Link to="/levi/saatieto-levilta" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    Katso lumensyvyysgraafi <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </section>

            {/* Joulupukki */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Joulupukki ja joulukokemus</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Rovaniemi on Joulupukin virallinen kotikaupunki, ja Joulupukin kylä (Santa Claus Village) napapiirillä on ainutlaatuinen kokemus – erityisesti lapsille. Kylässä voi tavata Joulupukin joka päivä ympäri vuoden, ylittää napapiirin, lähettää postikortin Joulupukin postitoimistosta ja nauttia jouluisesta tunnelmasta. Tämä on yksi Suomen tunnetuimmista matkailunähtävyyksistä ja todellinen bucket list -kokemus monelle kansainväliselle matkailijalle.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Mutta hyvä uutinen: Joulupukin tapaa myös Levillä! Levin alueella toimii useita erilaisia Joulupukki-elämyksiä joululomakaudella. Tarjolla on muun muassa Joulupukin tapaamisia, tonttujen elämyskylä sekä monenlaisia jouluisia aktiviteetteja koko perheelle. Jouluinen tunnelma lumisessa tunturikylässä on monien mielestä jopa aidompi ja tunnelmallisempi kuin vilkkaassa turistikylässä napapiirillä.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Levillä joulukokemus yhdistyy luontevasti lasketteluun, tunturiluontoon ja muihin talviaktiviteetteihin – joululoma Levillä on kokonaisvaltainen elämys, ei pelkkä vierailukohde. Rovaniemelle moni matkustaa nimenomaan tapaamaan Joulupukkia, mutta saman voi tehdä myös Levillä ja nauttia samalla kaikesta muusta mitä tunturikylä tarjoaa. Rovaniemen Joulupukin kylä on ennen kaikkea päiväkäyntikohde – Levi on paikka, jossa vietetään koko joululoma.
              </p>
            </section>

            {/* Revontulet */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Revontulet</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Sijainti", "170 km napapiirin pohjoispuolella", "Napapiirillä"],
                      ["Valosaaste", "Hyvin vähäinen (pieni tunturikylä)", "Selvästi enemmän (kaupunki)"],
                      ["Näkyvyys", "Erinomainen – revontulet näkyvät usein suoraan majoituksen pihalta", "Heikompi kaupungissa, vaatii usein siirtymän pimeämmälle alueelle"],
                      ["Ohjatut retket", "Kyllä, laaja tarjonta", "Kyllä, mutta usein sisältävät kuljetuksen pois kaupungista"],
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
                Revontulien näkemisessä Levi on selkeässä etulyöntiasemassa. Levi sijaitsee 170 km napapiirin pohjoispuolella, jossa revontuliaktiivisuus on suurempi, ja pienessä tunturikylässä valosaaste on minimaalinen. Käytännössä tämä tarkoittaa, että revontulet näkyvät usein suoraan mökin tai hotellin pihalta – erillistä retkeä ei välttämättä tarvita. Rovaniemellä kaupungin valot häiritsevät havainnointia, ja useimmat revontuliretket sisältävätkin kuljetuksen kaupungin ulkopuolelle pimeämmälle alueelle.
              </p>
            </section>

            {/* Aktiviteetit */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Aktiviteetit ja elämykset</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Moottorikelkkasafarit", "Laaja tarjonta, satoja km omia reittejä", "Kyllä, safariyrityksiä useita"],
                      ["Husky-safarit", "Kyllä, useita farmeja lähellä", "Kyllä, useita farmeja"],
                      ["Poroajelut", "Kyllä, porotiloja lähellä", "Kyllä, erityisesti Joulupukin kylässä"],
                      ["Kylpylä", "Levi Hotel Spa (rinteiden juurella)", "Ounasvaara, Santa's Hotels"],
                      ["Museot ja kulttuuri", "Pieni, luontopainotteinen", "Arktikum, tiedekeskus Pilke, Korundi – erinomainen tarjonta"],
                      ["Shoppailu", "Tunturikylän liikkeet, erikoiskaupat", "Laaja kaupunkitarjonta, ostoskeskuksia"],
                      ["Yöelämä", "Vilkas after-ski ja baareja", "Kaupungin ravintolat ja baarit"],
                      ["Luontokokemus", "Aito tunturiluonto ympärillä – erämaata, hiljaisuutta, tähtitaivasta", "Kaupunkiympäristö, luontoon pääsee ajamalla"],
                      ["Lasten aktiviteetit", "Lastenrinteet (10 ilmaista hissiä), Leevilandia, kelkka/husky/poro", "Joulupukin kylä, SantaPark, Snowman World, Angry Birds Park"],
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
                Molemmista löytyy paljon tekemistä, mutta eri tavalla. Levillä aktiviteetit ovat luontopohjaisia ja helposti saavutettavissa: kelkkasafarille, huskyajelulle tai porotilalle pääsee suoraan keskustasta, ja tunturiluonto alkaa aivan kylän reunalta. Rovaniemellä vahvuus on kulttuuritarjonta (Arktikum, Pilke, Korundi) ja ennen kaikkea jouluteema (Joulupukin kylä, SantaPark, Snowman World). Lapsille molemmat ovat loistavia – Levillä korostuu laskettelu ja ulkoilu, Rovaniemellä jouluelämys. Jos haluat lomalta aitoa Lapin luontoa ja tunturikokemusta, Levi voittaa kirkkaasti. Jos haluat yhdistää kaupunkiloman ja jouluteeman, Rovaniemi on oikea valinta.
              </p>
            </section>

            {/* Palvelut */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Palvelut ja tunnelma</h2>
              <div className="overflow-x-auto rounded-xl shadow-md border border-border/30">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground min-w-[160px]" />
                      <TableHead className={`font-bold text-primary min-w-[200px] ${leviHighlight}`}>Levi</TableHead>
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Ravintolat", "Kymmeniä, monipuolinen valikoima (fine dining – after-ski)", "Erittäin laaja kaupunkitarjonta"],
                      ["Kaupat", "S-Market, K-Market, erikoisliikkeitä", "Laaja valikoima: Prisma, kauppakeskuksia, erikoisliikkeitä"],
                      ["Majoitustyypit", "Mökit, huoneistot, hotellit – ski-in/ski-out mahdollista", "Hotellit, Airbnb, lasigloot, jäähotelli"],
                      ["Tunnelma", "Tunnistettava tunturikylä – lumi, hiljaisuus, luonto", "Moderni pieni kaupunki jouluteemalla"],
                      ["Pärjääkö ilman autoa?", "Kyllä, erinomaisesti", "Kyllä (julkinen liikenne, taksit)"],
                      ["Kenen kanssa?", "Perheet, pariskunnat, ystäväporukat, hiihtäjät", "Bucket list -matkaajat, perheet (joulu), kaupunkilomailijat"],
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
                Palveluissa molemmat ovat hyvin varustettuja, mutta kokemukset ovat erilaiset. Levillä kaikki palvelut ovat kompaktissa tunturikylässä: kävelet aamulla rinteeseen, iltapäivällä kelkkasafarille ja illalla ravintolaan – lumessa ja tunturimaisemissa koko ajan. Rovaniemellä olet kaupungissa: palveluvalikoima on laajempi, mutta tunturikokemusta ei ole – luontoon ja aktiviteetteihin ajetaan autolla tai bussilla. Rovaniemen erityinen vahvuus on erikoismajoitukset kuten lasigloot ja jäähotellit.
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
                      <TableHead className="font-semibold text-foreground min-w-[200px]">Rovaniemi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Lentokenttä", "Kittilä (KTT), 15 min siirtymä", "Rovaniemi (RVN), keskustassa"],
                      ["Lennot", "Useita päivittäin (Helsinki), kv-lennot sesonkiaikaan", "Useita päivittäin (Helsinki), laaja kv-lentoverkosto"],
                      ["Juna", "Kolari (~1h siirtymä)", "Suoraan keskustaan (yöjuna Helsingistä)"],
                      ["Autolla Helsingistä", "~1 100 km, ~13h", "~830 km, ~10h"],
                      ["Siirtymä lentokentältä majoitukseen", "15 min (Kittilä)", "0–15 min (kaupunki), 8 km (Joulupukin kylä)"],
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
                Saavutettavuudessa Rovaniemellä on etu: lentokenttä ja rautatieasema ovat aivan keskustassa, yöjuna tuo suoraan perille Helsingistä, ja kansainvälinen lentoverkosto on laajempi. Levi kompensoi tämän Kittilän lentokentän läheisyydellä (15 min), ja perillä auton tarvetta ei ole lainkaan. Monille kansainvälisille matkailijoille Rovaniemi toimii luontevana porttina Lappiin – ja tämä on hyvä tietää: Rovaniemellä voi viettää yhden päivän ja jatkaa sitten Leville, jossa varsinainen Lapin loma alkaa.
              </p>
            </section>

            {/* Hintataso */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Hintataso</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Hintataso on molemmissa kohteissa tyypillistä Lappia – eli ei halpaa, mutta vastinetta saa. Huomionarvoista on, että Rovaniemellä majoituksen hintataso on joulu–helmikuussa melko selvästi Leviä kalliimpi – erityisesti Joulupukin kylän lähellä ja suosituimmissa hotelleissa hinnat nousevat nopeasti. Levillä laaja majoitusvalikoima (studiot, huoneistot, mökit) pitää hintakilpailun kohtuullisena, ja suoraan majoittajalta varaamalla saa usein parhaan hinnan. Ravintolahinnat ovat samankaltaisia. Käytännön ero syntyy myös aktiviteeteissa: Levillä laskettelu ja monet luontoaktiviteetit ovat helposti saavutettavissa ilman erillisiä kuljetuksia, kun taas Rovaniemellä safarit ja retket sisältävät usein kuljetuksen kaupungin ulkopuolelle, mikä nostaa hintaa.
              </p>
            </section>

            {/* Kumpi valita */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Kumpi valita?</h2>
              <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-start">
                {/* Levi card - highlighted, larger */}
                <Card className="md:col-span-3 border-2 border-primary shadow-lg relative glass-card">
                  <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">
                    <Heart className="w-3 h-3 mr-1" /> Suosittelemme Lapin lomakohteeksi
                  </Badge>
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Levi, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Haluat oikean Lapin tunturikokemuksen – lunta, luontoa ja hiljaisuutta",
                        "Laskettelu, hiihto tai muu talviurheilu on osa lomaa (Levillä on Suomen suurin hiihtokeskus)",
                        "Haluat nähdä revontulet parhaissa olosuhteissa ilman kaupungin valosaastetta",
                        "Arvostat sitä, että kaikki on kävelymatkan päässä: rinteet, ravintolat, aktiviteetit",
                        "Haluat laajimman aktiviteettivalikoiman (kelkat, huskyt, porot, spa) ilman erillisiä kuljetuksia",
                        "Matkustat perheen kanssa ja haluat, että lapsille riittää tekemistä koko loman ajan",
                        "Haluat viettää lomalla useamman päivän etkä pelkkää päivävierailua",
                        "Joulupukin tapaa myös Levillä – aidon jouluisessa tunturimaisemassa",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Rovaniemi card */}
                <Card className="md:col-span-2 glass-card border-border/30">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Valitse Rovaniemi, jos:</h3>
                    <ul className="space-y-2.5">
                      {[
                        "Joulupukin kylä on lomaasi ehdoton päätavoite – se on ainutlaatuinen kokemus",
                        "Haluat kaupunkiloman elementtejä: museot (Arktikum), laaja ravintolatarjonta, shoppailu",
                        "Tulet junalla tai haluat mahdollisimman helpon saavutettavuuden",
                        "Suunnittelet Lapin kiertomatkaa ja käytät Rovaniemeä tukikohtana",
                        "Erikoismajoitus kiinnostaa: lasigloot, jäähotellit",
                        "Vietät Lapissa vain 1–2 päivää ja tarvitset kompaktin kaupunkikohteen",
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
                Rovaniemi on erinomainen portti Lappiin – erityisesti Joulupukin kylä on kokemus, joka kannattaa nähdä kerran elämässä. Mutta jos haluat todellisen Lapin loman, jossa yhdistyvät laskettelu, tunturiluonto, revontulet ja laaja aktiviteettivalikoima, Levi tarjoaa kokonaisuudeltaan paremman kokemuksen. Monien matkailijoiden fiksuin ratkaisu on yhdistelmä: käy Rovaniemellä päivän Joulupukin kylässä ja jatka sitten Leville, jossa varsinainen loma alkaa. Me suosittelemme Leviä – ja autamme mielellämme majoituksen löytämisessä.
              </p>
            </section>

            {/* Tip box */}
            <section className="mb-12">
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Paikallisen vinkki</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Monet matkailijat eivät tiedä, että Levillä tapaa myös Joulupukin – eikä tarvitse jonottaa. Joulusesongin aikaan Levin alueella järjestetään lukuisia jouluisia elämyksiä aidossa lumisessa tunturimaisemassa. Yhdistelmä joulupukkivierailu + tunturiloma on Levin vahvuus.
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
                  { title: "Levi vs. Ylläs vs. Ruka", href: "/opas/levi-vs-yllas-vs-ruka", icon: Mountain },
                  { title: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista", icon: Plane },
                  { title: "Joulu Lapissa", href: "/levi/joulu-lapissa", icon: TreePine },
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

export default LeviVsRovaniemi;
