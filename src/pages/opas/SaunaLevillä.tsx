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
  Heart,
  Brain,
  Snowflake,
  Moon,
  Flame,
  Waves,
  Thermometer,
  Droplets,
  Star,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  XCircle,
  Timer,
  ShowerHead,
} from "lucide-react";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SaunaLevilla = () => {
  const location = useLocation();

  const hreflangUrls = {
    fi: "https://leville.net/opas/sauna-levilla",
    en: "https://leville.net/guide/finnish-sauna-in-levi",
  };

  const faqItems = [
    {
      q: "Pitääkö saunassa olla alasti?",
      a: "Perinteisesti kyllä, mutta uimapuku tai pyyhe on täysin hyväksyttävää. Omassa mökkisaunassa ja perheenseurassa toimitaan kuten itsestä tuntuu luontevalta. Julkisissa saunoissa (kuten kylpylöissä) uimapuku on yleensä pakollinen.",
    },
    {
      q: "Miten kuuma sauna on?",
      a: "Tyypillisesti 65–80 °C. Aloittelijalle alempi laude on viileämpi ja ylempi kuumempi. Aloita alhaalta ja siirry ylemmäs kun totut.",
    },
    {
      q: "Voivatko lapset saunoa?",
      a: "Kyllä! Suomalaiset lapset käyvät saunassa vauvasta asti. Lasten kanssa pidetään lämpötila matalampana (50–60 °C) ja saunominen lyhyempänä. Alalaude on lapsille sopivin.",
    },
    {
      q: "Mitä avantouinti tarkoittaa?",
      a: "Avantouinti tarkoittaa pulahdusta jäiseen veteen (yleensä 1–4 °C) saunan jälkeen. Se kuulostaa hullulta, mutta tunne on uskomattoman virkistävä. Älä pysy vedessä pitkään – muutama sekunti riittää. Nouse ylös ja mene takaisin saunaan.",
    },
    {
      q: "Kuinka kauan saunassa pitää olla?",
      a: "Niin kauan kuin tuntuu hyvältä – yleensä 10–20 minuuttia kerrallaan. Sitten jäähdyttelet ja menet uudestaan. Tyypillinen saunomiskerta kestää kokonaisuudessaan 1–2 tuntia, mukaan lukien tauot.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Matkaopas Leville", href: "/opas/matkaopas-levi" },
    { label: "Sauna Levillä", href: "/opas/sauna-levilla" },
  ];

  const healthBenefits = [
    {
      icon: Heart,
      title: "Verenkierto ja palautuminen",
      desc: "Kuumuus laajentaa verisuonia ja parantaa verenkiertoa. Laskupäivän jälkeen sauna on parasta palautumista kipeille lihaksille.",
      color: "text-red-400",
      bg: "bg-red-500/15",
    },
    {
      icon: Brain,
      title: "Stressin lievitys",
      desc: 'Sauna laskee kortisolitasoja ja vapauttaa endorfiineja. Suomalaiset sanovat: "Sauna on köyhän apteekki."',
      color: "text-purple-400",
      bg: "bg-purple-500/15",
    },
    {
      icon: Snowflake,
      title: "Vastustuskyky",
      desc: "Säännöllinen saunominen ja vuorottelu kuuman ja kylmän välillä vahvistaa immuunijärjestelmää. Avantouinti saunan jälkeen on tämän ääriversio.",
      color: "text-sky-400",
      bg: "bg-sky-500/15",
    },
    {
      icon: Moon,
      title: "Uni",
      desc: "Iltasauna auttaa nukahtamaan. Kehon lämpötilan lasku saunomisen jälkeen laukaisee luonnollisen uneliaisuuden.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
    },
  ];

  const experiences = [
    {
      icon: Flame,
      title: "Savusauna",
      desc: "Savusauna on saunojen alkuperäisin muoto – kiuasta lämmitetään tunteja ilman savupiippua, ja lopputuloksena on pehmeä, mystinen löyly. Levillä savusaunaa pääsee kokemaan mm. Sammuntuvalla ja Immelkartanolla.",
      color: "text-orange-400",
      bg: "bg-orange-500/15",
    },
    {
      icon: Waves,
      title: "Kelluva arktinen sauna",
      desc: "Immelkartanon kelluva sauna Immeljärven jäällä on ainutlaatuinen kokemus: puulämmitteinen sauna jään päällä, avanto ja pohjasta valaistu järvi. Saatavilla talvikaudella.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/15",
    },
    {
      icon: Snowflake,
      title: "Igluu-sauna",
      desc: "Northern Lights Villagessa voit saunoa igluu-saunassa, jossa lasikatosta näkee tähtitaivaan ja mahdolliset revontulet saunomisen aikana.",
      color: "text-sky-400",
      bg: "bg-sky-500/15",
    },
    {
      icon: Thermometer,
      title: "Avantouinti",
      desc: "Useat saunaelämykset sisältävät avantouinnin – pulahduksen jäiseen veteen saunan jälkeen. Kokemus on yllättävän virkistävä ja jättää kehon kihelmöimään. Saatavilla mm. Immelkartanolla, Sammuntuvalla ja Elves Villagessa.",
      color: "text-blue-400",
      bg: "bg-blue-500/15",
    },
    {
      icon: Droplets,
      title: "Kylpylä – Water World Levi",
      desc: "Levi Hotel Span yhteydessä toimiva Water World Levi tarjoaa perinteisen saunan, hirsi-saunan ja höyrysaunan sekä uima-altaat, vesiliukumäen ja ulkoporealtaat. Sopii koko perheelle.",
      color: "text-teal-400",
      bg: "bg-teal-500/15",
    },
    {
      icon: Star,
      title: "Yksityinen sauna ja palju",
      desc: "Monet Levin majoitukset tarjoavat oman saunan lisäksi ulkopaljun tai porealtaan. Kuvittele: istut kuumassa paljussa pakkasilmassa ja katsot tähtitaivasta tai revontulia. Tämä on monien Lapin-loman kohokohta.",
      color: "text-amber-400",
      bg: "bg-amber-500/15",
    },
  ];

  const etiquette = [
    { icon: CheckCircle, text: "Peseytyminen ensin – Käy suihkussa ennen saunaan menoa. Tämä on ehdoton sääntö.", ok: true },
    { icon: CheckCircle, text: "Alastomuus on normaalia – Suomalaisessa saunassa ollaan perinteisesti alasti, mutta uimapuku tai pyyhe on täysin hyväksyttävää, erityisesti mökkisaunassa vieraiden kanssa.", ok: true },
    { icon: CheckCircle, text: "Istu pyyhkeen päällä – Lauta on kuuma. Ota pyyhe alleen.", ok: true },
    { icon: CheckCircle, text: "Löylyjä maltillisesti – Aloita pienellä vesimäärällä kiukaalle. Voit lisätä jos haluat lisää kuumuutta. Kysy muilta saunojilta ennen kuin heität lisää löylyä.", ok: true },
    { icon: CheckCircle, text: "Jäähdyttely – Käy välillä ulkona vilvoittelemassa. Talvella voit astua terassille tai pulahtaa avantoon.", ok: true },
    { icon: CheckCircle, text: "Juo vettä – Saunominen kuivattaa. Juo vettä ennen, aikana ja jälkeen.", ok: true },
    { icon: CheckCircle, text: "Hiljaisuus on kultaa – Saunassa voi puhua, mutta monet nauttivat hiljaisuudesta. Kunnioita tunnelmaa.", ok: true },
    { icon: XCircle, text: "Älä kilpaile – Sauna ei ole kestävyystesti. Jos on liian kuuma, mene alemmas tai ulos.", ok: false },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Sauna Levillä – Saunakulttuuri, ohjeet ja elämykset | Leville.net</title>
        <meta name="description" content="Kaikki saunomisesta Levillä: suomalainen saunakulttuuri, sähkökiukaan käyttöohje, saunan terveyshyödyt ja Levin parhaat saunaelämykset savusaunasta avantouintiin." />
        <link rel="canonical" href="https://leville.net/opas/sauna-levilla" />
        <meta property="og:title" content="Sauna Levillä – Saunakulttuuri, ohjeet ja elämykset | Leville.net" />
        <meta property="og:description" content="Kaikki saunomisesta Levillä: suomalainen saunakulttuuri, sähkökiukaan käyttöohje, saunan terveyshyödyt ja Levin parhaat saunaelämykset savusaunasta avantouintiin." />
        <meta property="og:url" content="https://leville.net/opas/sauna-levilla" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content="fi_FI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sauna Levillä – Saunakulttuuri, ohjeet ja elämykset | Leville.net" />
        <meta name="twitter:description" content="Kaikki saunomisesta Levillä: suomalainen saunakulttuuri, sähkökiukaan käyttöohje, saunan terveyshyödyt ja Levin parhaat saunaelämykset savusaunasta avantouintiin." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Sauna Levillä – opas suomalaiseen saunakulttuuriin
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kaikki mitä tarvitset tietää saunomisesta Lapin lomalla
            </p>
          </header>

          {/* Intro */}
          <section className="mb-12">
            <p className="text-muted-foreground leading-relaxed">
              Suomessa on yli 3 miljoonaa saunaa – enemmän kuin henkilöautoja. Sauna on suomalaisille paljon enemmän kuin peseytymispaikka: se on rentoutumisen, hiljaisuuden ja yhdessäolon pyhättö. UNESCO lisäsi suomalaisen saunakulttuurin aineettoman kulttuuriperinnön luetteloon vuonna 2020. Levillä tämä perinne on erityisen voimakas – lähes jokaisessa mökissä ja huoneistossa on oma sauna, ja alueelta löytyy yli 2 000 saunaa. Tämä opas kertoo kaiken, mitä tarvitset tietää saunomisesta Levin-lomallasi – olipa kyseessä ensimmäinen tai tuhannes kertasi.
            </p>
          </section>

          {/* Mitä saunominen on */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Mitä saunominen on?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Saunominen on yksinkertaista: istut kuumassa huoneessa (yleensä 65–80 °C), heitä löylyä eli vettä kiukaalle, hikoilet, jäähdyttelet ja toistat. Suomalaisessa saunassa nautitaan hiljaisuudesta, löylystä ja vastakylmyydestä – talvella se voi tarkoittaa pulahdusta avantoon tai kierähdystä lumihangessa. Saunominen ei ole suoritus vaan rentoutuminen. Mene omaan tahtiisi, kuuntele kehoasi ja nauti.
            </p>
          </section>

          {/* Terveyshyödyt */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Saunan terveyshyödyt</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {healthBenefits.map((b, i) => (
                <Card key={i} className="border-border/30">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center mx-auto mb-3`}>
                      <b.icon className={`w-6 h-6 ${b.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Etiketti */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Saunaetiketti – näin toimit oikein</h2>
            <Card className="border-border/30 bg-muted/30">
              <CardContent className="p-5 sm:p-6 space-y-3">
                {etiquette.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {item.ok ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Sähkösaunan lämmitys */}
          <section className="mb-12" id="sahkosauna">
            <h2 className="text-2xl font-bold text-foreground mb-6">Sähkösaunan lämmitys majoituksessa</h2>

            <div className="bg-muted/40 border border-border/40 rounded-xl shadow-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground">🔥 Näin lämmität sähkösaunan</h3>
              </div>

              {/* Ennen lämmitystä */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <ShowerHead className="w-4 h-4 text-primary" />
                  Ennen lämmitystä
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tarkista saunahuone. Varmista, ettei kiukaan päällä ole esimerkiksi pyykkiä ja että ovi ja ikkuna on suljettu.
                </p>
              </div>

              {/* Ajastin */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  Kiuasta ohjataan ajastimella
                </h4>
                <p className="text-sm text-muted-foreground">Ajastinkytkimessä on kaksi aluetta:</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-background/60 rounded-lg p-4 border border-border/30">
                    <div className="font-semibold text-foreground mb-1 text-sm">Alue A (1–4 tuntia) – Välitön lämmitys</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Vastukset kytkeytyvät päälle heti ja kiuas on lämmin valitun ajan (tunteina).
                    </p>
                  </div>
                  <div className="bg-background/60 rounded-lg p-4 border border-border/30">
                    <div className="font-semibold text-foreground mb-1 text-sm">Alue B (1–8 tuntia) – Viivästetty lämmitys</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Esivalinta-aika, jonka jälkeen kiuas kytkeytyy päälle. Esim. jos valitset 4, kiuas kytkeytyy päälle 4 tunnin kuluttua ja on lämmin 4 tuntia ellei sitä aikaisemmin katkaista käsin.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lämpötilan säätö */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Lämpötilan säätö</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sopiva lämpötila säädetään termostaattikytkimestä. Aloita kokeilemalla säätöalueen maksimiasentoa. Jos lämpötila nousee liian korkeaksi saunomisen aikana, kierrä säädintä hieman vastapäivään. Huomaa, että pienikin muutos voi aiheuttaa tuntuvan lämpötilamuutoksen. Miellyttävä saunomislämpötila on <strong>65–80 °C</strong>.
                </p>
              </div>

              {/* Tärkeä huomio */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-sm text-amber-200 leading-relaxed font-medium">
                  ⚠️ <strong>Tärkeä huomio:</strong> Kiuasta lämmitettäessä mökin/huoneiston sähköpattereista voi katketa virta. Sammuta kiuas heti käytön jälkeen, jotta sähköpatterit kytkeytyvät taas päälle.
                </p>
              </div>

              {/* Sammutus */}
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Kiukaan sammutus</h4>
                <p className="text-sm text-muted-foreground">Väännä ajastinkytkimestä vastapäivään 0-asentoon.</p>
              </div>
            </div>

            {/* Vinkkejä */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-5 sm:p-6 space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" /> Vinkkejä
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>💡 <strong>Lämmitysaika:</strong> Sauna lämpenee noin 30–45 minuuttia.</li>
                <li>💡 <strong>Ajastimen käyttö esimerkki:</strong> Jos menet ulos 3 tunniksi ja haluat saunan lämpimäksi palatessa – käytä ajastimen B-aluetta ja aseta noin 2 tunnin kohdalle. Sauna alkaa lämmetä 2 tunnin kuluttua ja on valmis kun saavut.</li>
                <li>💡 <strong>Löylyn heitto:</strong> Saunan ilma kuivuu lämmitettäessä. Heitä vettä kiukaalle kosteuden lisäämiseksi. Kokeile sopiva määrä. Kiukaalle saa heittää ainoastaan vettä.</li>
              </ul>
            </div>
          </section>

          {/* Saunaelämykset */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Saunaelämykset Levillä</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Levillä voit nauttia omasta majoituksen saunasta, mutta alueelta löytyy myös ainutlaatuisia saunaelämyksiä:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {experiences.map((exp, i) => (
                <Card key={i} className="border-border/30 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl ${exp.bg} flex items-center justify-center mb-3`}>
                      <exp.icon className={`w-6 h-6 ${exp.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sauna majoituksessasi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sauna majoituksessasi</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lähes jokaisessa Levin vuokramökissä ja huoneistossa on oma yksityinen sauna – tämä on Suomessa normaalia, mutta monille ulkomaisille matkailijoille yllätys. Käytännössä tämä tarkoittaa, että voit saunoa joka ilta oman aikataulusi mukaan. Useimmissa majoituksissa sauna on sähkökiukaalla varustettu (ks. <a href="#sahkosauna" className="text-primary hover:underline">käyttöohje yllä</a>), mutta joissakin premium-mökeissä on puulämmitteinen kiuas. Varaa majoitus, jossa on oma sauna – se on Lapin-loman ehdoton kohokohta.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Usein kysytyt kysymykset</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg px-4">
                  <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
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
                { title: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
                { title: "Majoitukset Levillä", href: "/majoitukset" },
                { title: "Joulu Lapissa", href: "/levi/joulu-lapissa" },
              ].map((link, i) => (
                <Link key={i} to={link.href}>
                  <Card className="border-border/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <Link to="/opas/matkaopas-levi" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Takaisin matkaoppaaseen
            </Link>
            <Button asChild size="lg">
              <Link to="/majoitukset">
                Varaa majoitus saunalla
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
      <StickyBookingBar />
    </div>
  );
};

export default SaunaLevilla;
