import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props { lang?: Language; }

const translations = {
  fi: {
    meta: {
      title: "Miten revontulet syntyvät? Tieteellinen selitys | Leville.net",
      description: "Miten revontulet syntyvät? Aurinkotuuli, maan magneettikenttä ja törmäykset hapen ja typen kanssa ilmakehässä. Selkeä tieteellinen selitys.",
      canonical: "https://leville.net/opas/miten-revontulet-syntyvat"
    },
    h1: "Miten revontulet syntyvät?",
    breadcrumbLabel: "Miten revontulet syntyvät",
    sections: [
      {
        title: "Kaikki alkaa auringosta",
        content: `Aurinko lähettää jatkuvasti hiukkasvirtaa avaruuteen — tätä kutsutaan aurinkotuuleksi. Hiukkaset, pääasiassa elektroneja ja protoneja, kulkevat avaruuden halki nopeudella 300–800 km/s. Normaalisti aurinkotuuli on tasaista eikä aiheuta merkittäviä revontulia maanpinnalla.

Mutta auringon pinnalta purkautuu ajoittain valtavia hiukkaspilviä, joita kutsutaan koronamassan purkautumiksi (CME = Coronal Mass Ejection). Nämä purkaukset sisältävät miljardeja tonneja varattuja hiukkasia ja ne voivat olla moninkertaisesti voimakkaampia kuin normaali aurinkotuuli. CME-purkaukset ovat revontulimyrskyjen tärkein lähde.

Auringon pinnalla esiintyy myös auringonpilkkuja — tummia, magneettisesti aktiivisia alueita. Mitä enemmän auringonpilkkuja, sitä todennäköisempiä CME-purkaukset ovat. Auringon 11-vuotinen aktiivisuussykli määrittää pilkkujen määrän — ja siten revontulien voimakkuuden ja yleisyyden.`
      },
      {
        title: "Maan magneettikenttä — näkymätön kilpi",
        content: `Maa on kuin jättiläismäinen magneetti. Sen magneettikenttä, jota kutsutaan magnetosfääriksi, ulottuu kymmeniätuhansia kilometrejä avaruuteen ja ohjaa suurimman osan aurinkotuulesta maan ohi. Ilman tätä suojaa aurinkotuuli kuluttaisi ilmakehämme — kuten on tapahtunut Marsille.

Mutta napojen läheisyydessä — juuri siellä missä Levi sijaitsee — magneettikenttä on rakenteeltaan erilainen. Napojen lähellä magneettikenttäviivat kaareutuvat kohti maanpintaa ja luovat "suppilon", josta aurinkotuulen hiukkaset pääsevät tunkeutumaan ilmakehään.

Tätä aluetta kutsutaan **aurora-ovaaliksi** — se on renkaanmuotoinen vyöhyke kummankin napa-alueen ympärillä, leveysasteilla noin 65°–75° N. Levi (67,8° N) sijaitsee tämän vyöhykkeen sydämessä, mikä tekee siitä yhden Euroopan parhaista paikoista revontulien näkemiseen.`
      },
      {
        title: "Törmäykset ilmakehässä — väriloisto syntyy",
        content: `Kun aurinkotuulen hiukkaset (elektronit) pääsevät magneettikenttäsuppilon kautta ilmakehään, ne alkavat törmätä ilmakehän kaasuatomeihin — pääasiassa happeen ja typpeen. Nämä törmäykset tapahtuvat 100–300 kilometrin korkeudessa maan pinnasta.

Törmäyksessä kaasuatomi **virittyy** — eli saa ylimääräistä energiaa elektronilta. Viritystila on epävakaa ja atomi haluaa palata normaalitilaan. Kun viritystila purkautuu, atomi vapauttaa ylimääräisen energian **valona**. Tämä valo on revontulia.

Eri kaasut ja eri korkeudet tuottavat eri värejä:
• **Vihreä** — happi 100–200 km korkeudessa (yleisin)
• **Punainen** — happi yli 200 km korkeudessa (harvinaisempi)
• **Violetti/sininen** — typpi (usein aurora-verhon alareunassa)

Yksittäinen revontuliesitys voi sisältää miljoonia näitä pieniä valoreaktioita samanaikaisesti — tulos on taivaan poikki liikkuva, aaltoileva valoshow.`
      },
      {
        title: "Miksi juuri napojen lähellä?",
        content: `Aurora-ovaali on renkaanmuotoinen vyöhyke napa-alueiden ympärillä, tyypillisesti leveysasteilla 65°–75° pohjoista ja etelää. Tämä on alue jossa revontulia esiintyy useimmin — ja Levi (67,8° N) on lähellä sen pohjoisen ovaalin eteläreunaa. Erinomainen sijainti.

Ovaalin olemassaolo johtuu maan magneettikentän rakenteesta: napojen lähellä kenttäviivat "avautuvat" ja päästävät aurinkotuulen hiukkasia ilmakehään. Päiväntasaajalla ja lauhkeilla leveysasteilla magneettikenttä ohjaa hiukkaset tehokkaasti ohi.

Erittäin voimakkailla geomagneettisilla myrskyillä (Kp 7+) aurora-ovaali **laajenee** merkittävästi etelään. Tällöin revontulia voidaan nähdä jopa Keski-Euroopassa — Saksassa, Puolassa, jopa Pohjois-Italiassa. Toukokuussa 2024 tällainen myrsky tuotti revontulia nähtäväksi asti Espanjaan asti. Levillä tällaiset myrskyt ovat spektakulaarisia: koko taivas palaa vihreänä, punaisena ja violettina.`
      },
      {
        title: "Eri muotoja",
        content: `Revontulet esiintyvät monissa muodoissa, ja niiden tunnistaminen tekee katselukokemuksesta rikkaamman:

**Kaari (arc)** — Yleisin muoto. Vihreä tai vaaleanvihreä kaari pohjoisella taivaalla, usein melko staattinen. Tämä on usein ensimmäinen merkki revontulista illalla.

**Verho (curtain)** — Liikkuva, aaltoileva rakenne joka muistuttaa tuulessa heiluvaa verhoa. Erittäin kaunis ja dynaaminen. Syntyy kun magneettikenttä on aktiivinen ja hiukkasvirtaukset muuttuvat nopeasti.

**Korona (corona)** — Säteittäinen rakenne suoraan yläpuolella. Näkyy kun olet suoraan aurora-verhon alla ja katsot ylöspäin. Vaikuttava ja harvinainen kokemus.

**Pilkut ja hohka** — Heikkoja, haaleita valoalueita taivaalla. Usein revontulien "alkuvaihe" ennen voimakkaampaa näytöstä.

Muoto riippuu magneettikentän paikallisesta rakenteesta ja hiukkasten energiasta. Sama ilta voi näyttää useita eri muotoja revontulien voimakkuuden muuttuessa.`
      },
      {
        title: "Kuinka korkealla ne ovat?",
        content: `Revontulet tapahtuvat tyypillisesti 100–300 kilometrin korkeudessa ilmakehässä. Tämä on niin sanottu termosfääri — erittäin ohut ilmakehän kerros jossa kaasua on niin vähän, että normaalisti siellä ei tapahdu näkyviä ilmiöitä.

**Vihreä aurora** esiintyy noin 100–200 km korkeudessa — tällä korkeudella happiatomit reagoivat nopeasti ja vapauttavat energian vihreänä valona.

**Punainen aurora** esiintyy korkeammalla, 200–300 km. Tällä korkeudella happiatomi virittyy eri tavalla ja reaktio on hitaampi, mikä tuottaa punaisen värin.

Vertailun vuoksi: lentokoneet lentävät noin 10 km korkeudessa. Kansainvälinen avaruusasema (ISS) kiertää 400 km korkeudessa — revontulet ovat siis ISS:n alapuolella! Astronautit kuvaavat revontulia usein ylhäältä päin, mikä tarjoaa ainutlaatuisen perspektiivin.

Revontulien korkeus selittää miksi ne näkyvät niin laajalla alueella: Levillä havaitsemasi aurora voi fyysisesti sijaita 500–1000 km pohjoisessa, mutta koska se on niin korkealla, se näkyy matalalla horisontissa jopa kaukaa.`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Ovatko revontulet vaarallisia?", a: "Eivät. Ne tapahtuvat 100–300 km korkeudessa ilmakehässä eivätkä vaikuta maanpinnalle millään tavalla. Voimakkaat geomagneettiseet myrskyt voivat häiritä satelliitteja, GPS-järjestelmiä ja sähköverkkoja, mutta ihmisille ne ovat täysin vaarattomia." },
        { q: "Esiintyykö revontulia muilla planeetoilla?", a: "Kyllä — millä tahansa planeetalla jolla on magneettikenttä ja ilmakehä. Jupiter ja Saturnus näyttävät valtavia auroroja, ja jopa Marsilla on havaittu heikkoja revontulia." },
        { q: "Voiko revontulia kuulla?", a: "Kiistelty aihe. Jotkut ihmiset raportoivat kuulevansa rahinaa, sihinää tai napsahtelua vahvojen revontulien aikana. Suomalainen tutkimus (Aalto-yliopisto) on dokumentoinut ääniä noin 70 metrin korkeudessa, mahdollisesti liittyen sähkökenttien purkautumiseen. Mutta tieteellinen näyttö on edelleen rajallista ja aihe on kiistanalainen." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava revontuliopas", href: "/revontulet" },
        { title: "Revontulien värit", desc: "Miksi vihreä, punainen ja violetti?", href: "/opas/revontulien-varit" },
        { title: "Majoitukset", desc: "Varaa majoitus Levillä", href: "/majoitukset" }
      ]
    }
  },
  en: {
    meta: {
      title: "How Do Northern Lights Form? Scientific Explanation | Leville.net",
      description: "How do northern lights form? Solar wind, Earth's magnetic field and collisions with oxygen and nitrogen. A clear scientific explanation.",
      canonical: "https://leville.net/guide/how-northern-lights-form"
    },
    h1: "How Do Northern Lights Form?",
    breadcrumbLabel: "How Aurora Forms",
    sections: [
      { title: "It All Starts with the Sun", content: `The sun constantly sends a stream of particles into space — this is called the solar wind. The particles, mainly electrons and protons, travel through space at 300–800 km/s. Normally the solar wind is steady and doesn't cause significant aurora on Earth.\n\nBut massive particle clouds occasionally erupt from the sun's surface, called Coronal Mass Ejections (CMEs). These eruptions contain billions of tonnes of charged particles and can be many times stronger than normal solar wind. CMEs are the main source of aurora storms.\n\nThe sun's surface also features sunspots — dark, magnetically active areas. More sunspots mean more likely CMEs. The sun's 11-year activity cycle determines sunspot numbers — and therefore aurora strength and frequency.` },
      { title: "Earth's Magnetic Field — The Invisible Shield", content: `Earth is like a giant magnet. Its magnetic field, called the magnetosphere, extends tens of thousands of kilometres into space and deflects most of the solar wind past Earth. Without this protection, the solar wind would strip away our atmosphere — as has happened to Mars.\n\nBut near the poles — exactly where Levi is located — the magnetic field has a different structure. Near the poles, field lines curve towards Earth's surface, creating a "funnel" through which solar wind particles can penetrate the atmosphere.\n\nThis area is called the **aurora oval** — a ring-shaped zone around each polar region, typically at latitudes 65°–75° N. Levi (67.8° N) sits in the heart of this zone, making it one of Europe's best places to see northern lights.` },
      { title: "Collisions in the Atmosphere — The Light Show Begins", content: `When solar wind particles (electrons) enter the atmosphere through the magnetic field funnel, they begin colliding with atmospheric gas atoms — mainly oxygen and nitrogen. These collisions occur at 100–300 kilometres altitude above Earth's surface.\n\nIn a collision, the gas atom becomes **excited** — it receives extra energy from the electron. The excited state is unstable and the atom wants to return to normal. When the excited state releases, the atom emits the excess energy as **light**. This light is the aurora.\n\nDifferent gases and altitudes produce different colours:\n• **Green** — oxygen at 100–200 km altitude (most common)\n• **Red** — oxygen above 200 km altitude (rarer)\n• **Purple/blue** — nitrogen (often at the lower edge of aurora curtains)\n\nA single aurora display can involve millions of these tiny light reactions simultaneously — the result is a moving, undulating light show across the sky.` },
      { title: "Why Near the Poles?", content: `The aurora oval is a ring-shaped zone around polar regions, typically at latitudes 65°–75° north and south. This is the area where aurora occurs most frequently — and Levi (67.8° N) is near the southern edge of the northern oval. An excellent location.\n\nThe oval exists because of Earth's magnetic field structure: near the poles, field lines "open up" and allow solar wind particles into the atmosphere. At the equator and temperate latitudes, the magnetic field effectively deflects particles away.\n\nDuring very strong geomagnetic storms (KP 7+), the aurora oval **expands** significantly southward. Aurora can then be seen even in Central Europe — Germany, Poland, even northern Italy. In May 2024, such a storm produced aurora visible as far south as Spain. In Levi, these storms are spectacular: the entire sky burns green, red and purple.` },
      { title: "Different Forms", content: `Northern lights appear in many forms, and recognising them enriches the viewing experience:\n\n**Arc** — The most common form. A green or pale green arc on the northern sky, often fairly static. This is typically the first sign of aurora in the evening.\n\n**Curtain** — A moving, undulating structure resembling a curtain blowing in the wind. Very beautiful and dynamic. Forms when the magnetic field is active and particle flows change rapidly.\n\n**Corona** — A radial structure directly overhead. Visible when you're directly beneath an aurora curtain looking up. Impressive and rare experience.\n\n**Patches and glow** — Faint, diffuse light areas in the sky. Often the "early stage" of aurora before a stronger display.\n\nThe form depends on the local structure of the magnetic field and particle energy. The same evening can show several different forms as aurora intensity changes.` },
      { title: "How High Are They?", content: `Northern lights typically occur at 100–300 kilometres altitude in the atmosphere. This is the so-called thermosphere — an extremely thin atmospheric layer where gas is so sparse that normally no visible phenomena occur.\n\n**Green aurora** occurs at approximately 100–200 km altitude — at this height, oxygen atoms react quickly and release energy as green light.\n\n**Red aurora** occurs higher, at 200–300 km. At this altitude, oxygen atoms excite differently and the reaction is slower, producing red light.\n\nFor comparison: aircraft fly at about 10 km altitude. The International Space Station (ISS) orbits at 400 km — so aurora is below the ISS! Astronauts often photograph aurora from above, offering a unique perspective.\n\nAurora's altitude explains why it's visible over such a wide area: the aurora you see in Levi may physically be located 500–1000 km to the north, but because it's so high, it's visible low on the horizon even from far away.` }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Are northern lights dangerous?", a: "No. They occur at 100–300 km altitude and have no effect on the ground whatsoever. Strong geomagnetic storms can disrupt satellites, GPS systems, and power grids, but they're completely harmless to people." },
        { q: "Do northern lights occur on other planets?", a: "Yes — on any planet with a magnetic field and atmosphere. Jupiter and Saturn display enormous aurora, and even Mars has shown faint aurora." },
        { q: "Can you hear the northern lights?", a: "Controversial topic. Some people report hearing crackling, hissing, or popping during strong aurora. Finnish research (Aalto University) has documented sounds at about 70 metres altitude, possibly related to electrical field discharge. But scientific evidence remains limited and the topic is debated." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "Aurora Colors Explained", desc: "Why green, red and purple?", href: "/guide/northern-lights-colors-explained" },
        { title: "Accommodation", desc: "Book accommodation in Levi", href: "/en/accommodation" }
      ]
    }
  }
};

const HowNorthernLightsForm = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/miten-revontulet-syntyvat", en: "/guide/how-northern-lights-form" };
  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : "/en" },
    { label: lang === "fi" ? "Opas" : "Guide", href: lang === "fi" ? "/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.h1, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getFAQSchema(t.faq.items.map(item => ({ question: item.q, answer: item.a })))} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={customUrls} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Revontulet Levin taivaalla" : "Northern Lights over Levi"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.h1}</h1>
            </section>
            {t.sections.map((section, idx) => (
              <section key={idx} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                {section.content.split('\n\n').map((p, pIdx) => (
                  <p key={pIdx} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{
                    __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/• /g, '<br/>• ')
                  }} />
                ))}
              </section>
            ))}
            <section className="mb-12">
              <Card className="glass-card border-border/30 p-6">
                <p className="text-muted-foreground mb-4">
                  {lang === "fi" ? "Tule kokemaan revontulet itse Levillä." : "Come experience the northern lights yourself in Levi."}
                </p>
                <Button asChild>
                  <Link to={lang === "fi" ? "/majoitukset" : "/en/accommodation"}>
                    {lang === "fi" ? "Selaa majoituksia" : "Browse accommodation"} →
                  </Link>
                </Button>
              </Card>
            </section>
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default HowNorthernLightsForm;
