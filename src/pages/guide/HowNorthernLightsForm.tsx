import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
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
        { title: "Accommodation", desc: "Book accommodation in Levi", href: "/en/accommodations" }
      ]
    }
  },
  nl: {
    meta: { title: "Hoe ontstaat het noorderlicht? Wetenschappelijke uitleg | Leville.net", description: "Hoe ontstaat het noorderlicht? Zonnewind, het magnetisch veld van de aarde en botsingen met zuurstof en stikstof. Een heldere wetenschappelijke uitleg.", canonical: "https://leville.net/nl/gids/hoe-ontstaat-noorderlicht" },
    h1: "Hoe ontstaat het noorderlicht?",
    breadcrumbLabel: "Hoe aurora ontstaat",
    sections: [
      { title: "Het begint allemaal bij de zon", content: `De zon stuurt voortdurend een stroom deeltjes de ruimte in — dit heet de zonnewind. Normaal gesproken is de zonnewind stabiel en veroorzaakt geen significant noorderlicht. Maar af en toe barsten er enorme deeltjeswolken uit van het zonoppervlak, genaamd Coronal Mass Ejections (CME's). Deze uitbarstingen bevatten miljarden tonnen geladen deeltjes.\n\nHet zonneoppervlak vertoont ook zonnevlekken — donkere, magnetisch actieve gebieden. Meer zonnevlekken betekent meer kans op CME's. De 11-jarige activiteitscyclus van de zon bepaalt het aantal zonnevlekken — en daarmee de sterkte en frequentie van het noorderlicht.` },
      { title: "Het magnetisch veld van de aarde — het onzichtbare schild", content: `De aarde is als een gigantische magneet. Het magnetisch veld, de magnetosfeer, strekt zich tienduizenden kilometers de ruimte in en leidt het grootste deel van de zonnewind om de aarde heen.\n\nMaar bij de polen — precies waar Levi ligt — heeft het magnetisch veld een andere structuur. Bij de polen buigen de veldlijnen naar het aardoppervlak en creëren een "trechter" waardoor zonnewinddeeltjes de atmosfeer kunnen binnendringen.\n\nDit gebied heet de **aurora-ovaal** — een ringvormige zone rond elk poolgebied, typisch op breedtegraden 65°–75° N. Levi (67,8° N) ligt in het hart van deze zone.` },
      { title: "Botsingen in de atmosfeer — het lichtspektakel begint", content: `Wanneer zonnewinddeeltjes (elektronen) de atmosfeer binnendringen, beginnen ze te botsen met gasatomen — voornamelijk zuurstof en stikstof. Deze botsingen vinden plaats op 100–300 kilometer hoogte.\n\nBij een botsing wordt het gasatoom **aangeslagen** — het ontvangt extra energie. Wanneer de aangeslagen toestand zich herstelt, zendt het atoom de overtollige energie uit als **licht**. Dit licht is het noorderlicht.\n\nVerschillende gassen en hoogtes produceren verschillende kleuren:\n• **Groen** — zuurstof op 100–200 km hoogte (meest voorkomend)\n• **Rood** — zuurstof boven 200 km hoogte (zeldzamer)\n• **Paars/blauw** — stikstof (vaak aan de onderrand van het gordijn)` },
      { title: "Waarom juist bij de polen?", content: `De aurora-ovaal is een ringvormige zone rond de poolgebieden op breedtegraden 65°–75°. Levi (67,8° N) ligt nabij de zuidrand van de noordelijke ovaal — een uitstekende locatie.\n\nTijdens zeer sterke geomagnetische stormen (KP 7+) **breidt de aurora-ovaal zich significant zuidwaarts uit**. Dan kan noorderlicht zelfs in Midden-Europa worden gezien.` },
      { title: "Verschillende vormen", content: `Noorderlicht verschijnt in vele vormen:\n\n**Boog (arc)** — De meest voorkomende vorm. Een groene boog aan de noordelijke hemel.\n\n**Gordijn (curtain)** — Een bewegende, golvende structuur. Zeer mooi en dynamisch.\n\n**Corona** — Een stralende structuur recht boven je hoofd. Indrukwekkend en zeldzaam.\n\n**Vlekken en gloed** — Zwakke, diffuse lichtgebieden. Vaak het 'beginstadium' van een sterkere vertoning.` },
      { title: "Hoe hoog zijn ze?", content: `Noorderlicht vindt typisch plaats op 100–300 kilometer hoogte in de atmosfeer.\n\n**Groen noorderlicht** verschijnt op ongeveer 100–200 km hoogte.\n\n**Rood noorderlicht** verschijnt hoger, op 200–300 km.\n\nTer vergelijking: vliegtuigen vliegen op ongeveer 10 km hoogte. Het ISS draait op 400 km — noorderlicht bevindt zich dus onder het ISS!\n\nDe hoogte van het noorderlicht verklaart waarom het over zo'n groot gebied zichtbaar is: het noorderlicht dat je in Levi ziet kan fysiek 500–1000 km naar het noorden liggen, maar omdat het zo hoog is, is het zelfs van ver zichtbaar.` }
    ],
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Is het noorderlicht gevaarlijk?", a: "Nee. Het vindt plaats op 100–300 km hoogte en heeft geen enkel effect op de grond. Sterke geomagnetische stormen kunnen satellieten en stroomnetwerken verstoren, maar ze zijn volledig onschadelijk voor mensen." },
        { q: "Komt noorderlicht voor op andere planeten?", a: "Ja — op elke planeet met een magnetisch veld en atmosfeer. Jupiter en Saturnus vertonen enorme aurora's, en zelfs op Mars is zwak noorderlicht waargenomen." },
        { q: "Kun je het noorderlicht horen?", a: "Controversieel onderwerp. Sommige mensen melden knisperend of sissend geluid tijdens sterk noorderlicht. Fins onderzoek (Aalto Universiteit) heeft geluiden op ongeveer 70 meter hoogte gedocumenteerd. Maar wetenschappelijk bewijs is beperkt." }
      ]
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
        { title: "Kleuren van het noorderlicht", desc: "Waarom groen, rood en paars?", href: "/nl/gids/kleuren-van-noorderlicht" },
        { title: "Accommodatie", desc: "Boek accommodatie in Levi", href: "/nl/accommodatie" }
      ]
    }
  },
  sv: {
    meta: { title: "Hur uppstår norrsken? Vetenskaplig förklaring | Leville.net", description: "Hur uppstår norrsken? Solvind, jordens magnetfält och kollisioner med syre och kväve. En tydlig vetenskaplig förklaring.", canonical: "https://leville.net/sv/guide/hur-uppstar-norrsken" },
    h1: "Hur uppstår norrsken?",
    breadcrumbLabel: "Hur norrsken uppstår",
    sections: [
      { title: "Allt börjar med solen", content: `Solen skickar ständigt en ström av partiklar ut i rymden — detta kallas solvinden. Normalt är solvinden stabil. Men ibland bryter enorma partikelmoln ut från solens yta, kallade Coronal Mass Ejections (CME). Dessa utbrott innehåller miljarder ton laddade partiklar.\n\nSolens yta uppvisar också solfläckar — mörka, magnetiskt aktiva områden. Fler solfläckar innebär fler CME-utbrott. Solens 11-åriga aktivitetscykel bestämmer antalet solfläckar.` },
      { title: "Jordens magnetfält — den osynliga skölden", content: `Jorden är som en gigantisk magnet. Magnetfältet, magnetosfären, sträcker sig tiotusentals kilometer ut i rymden och avleder det mesta av solvinden.\n\nMen nära polerna — precis där Levi ligger — har magnetfältet en annan struktur. Fältlinjerna böjer sig mot jordytan och skapar en "tratt" genom vilken solvindspartiklar kan tränga in i atmosfären.\n\nDetta område kallas **aurora-ovalen** — en ringformad zon runt varje polområde, typiskt vid breddgrader 65°–75° N. Levi (67,8° N) ligger i hjärtat av denna zon.` },
      { title: "Kollisioner i atmosfären — ljusshowen börjar", content: `När solvindspartiklar (elektroner) tränger in i atmosfären börjar de kollidera med gasatomer — främst syre och kväve. Dessa kollisioner sker på 100–300 kilometers höjd.\n\nVid en kollision blir gasatomen **exciterad**. När det exciterade tillståndet återställs avger atomen överskottsenergin som **ljus**. Detta ljus är norrskenet.\n\nOlika gaser och höjder producerar olika färger:\n• **Grönt** — syre på 100–200 km höjd (vanligast)\n• **Rött** — syre över 200 km höjd (sällsyntare)\n• **Lila/blått** — kväve (ofta vid gardinens nedre kant)` },
      { title: "Varför just nära polerna?", content: `Aurora-ovalen är en ringformad zon runt polområdena. Levi (67,8° N) ligger nära södra kanten av den norra ovalen.\n\nVid mycket starka geomagnetiska stormar (KP 7+) **utvidgas aurora-ovalen betydligt söderut**. Då kan norrsken ses även i Centraleuropa.` },
      { title: "Olika former", content: `Norrsken uppträder i många former:\n\n**Båge (arc)** — Den vanligaste formen. En grön båge på norra himlen.\n\n**Gardin (curtain)** — En rörlig, böljande struktur. Mycket vacker och dynamisk.\n\n**Corona** — En strålande struktur rakt ovanför. Imponerande och sällsynt.\n\n**Fläckar och sken** — Svaga, diffusa ljusområden på himlen.` },
      { title: "Hur högt är de?", content: `Norrsken uppträder typiskt på 100–300 kilometers höjd.\n\n**Grönt norrsken** förekommer på cirka 100–200 km höjd.\n\n**Rött norrsken** förekommer högre, på 200–300 km.\n\nISS kretsar på 400 km — norrskenet finns alltså under ISS! Norrskenets höjd förklarar varför det syns över ett så stort område.` }
    ],
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Är norrsken farligt?", a: "Nej. Det sker på 100–300 km höjd och påverkar inte marken. Starka geomagnetiska stormar kan störa satelliter och elnät, men de är helt ofarliga för människor." },
        { q: "Förekommer norrsken på andra planeter?", a: "Ja — på alla planeter med magnetfält och atmosfär. Jupiter och Saturnus visar enorma norrsken, och även Mars har uppvisat svagt norrsken." },
        { q: "Kan man höra norrskenet?", a: "Omtvistat ämne. Finsk forskning (Aalto-universitetet) har dokumenterat ljud på cirka 70 meters höjd. Men vetenskapliga bevis är begränsade." }
      ]
    },
    readNext: {
      title: "Läs också",
      links: [
        { title: "Norrsken i Levi", desc: "Utförlig aurora-guide", href: "/en/northern-lights" },
        { title: "Norrskens färger", desc: "Varför grönt, rött och lila?", href: "/sv/guide/norrskens-farger" },
        { title: "Boende", desc: "Boka boende i Levi", href: "/en/accommodation" }
      ]
    }
  },
  de: {
    meta: { title: "Wie entstehen Nordlichter? Wissenschaftliche Erklärung | Leville.net", description: "Wie entstehen Nordlichter? Sonnenwind, Erdmagnetfeld und Kollisionen mit Sauerstoff und Stickstoff. Eine klare wissenschaftliche Erklärung.", canonical: "https://leville.net/de/ratgeber/wie-entstehen-nordlichter" },
    h1: "Wie entstehen Nordlichter?",
    breadcrumbLabel: "Wie Aurora entsteht",
    sections: [
      { title: "Alles beginnt mit der Sonne", content: `Die Sonne sendet ständig einen Teilchenstrom in den Weltraum — den Sonnenwind. Normalerweise ist der Sonnenwind stabil. Aber gelegentlich brechen riesige Teilchenwolken von der Sonnenoberfläche aus, sogenannte Koronale Massenauswürfe (CME). Diese Ausbrüche enthalten Milliarden Tonnen geladener Teilchen.\n\nDie Sonnenoberfläche zeigt auch Sonnenflecken — dunkle, magnetisch aktive Bereiche. Mehr Sonnenflecken bedeuten mehr CME-Wahrscheinlichkeit. Der 11-jährige Aktivitätszyklus der Sonne bestimmt die Anzahl der Sonnenflecken.` },
      { title: "Das Erdmagnetfeld — der unsichtbare Schild", content: `Die Erde ist wie ein riesiger Magnet. Das Magnetfeld, die Magnetosphäre, erstreckt sich Zehntausende Kilometer in den Weltraum und lenkt den größten Teil des Sonnenwindes ab.\n\nAber in der Nähe der Pole — genau dort, wo Levi liegt — hat das Magnetfeld eine andere Struktur. Die Feldlinien biegen sich zur Erdoberfläche und schaffen einen "Trichter", durch den Sonnenwindteilchen in die Atmosphäre eindringen können.\n\nDieses Gebiet heißt **Aurora-Oval** — eine ringförmige Zone um jeden Polbereich, typisch bei Breitengraden 65°–75° N. Levi (67,8° N) liegt im Herzen dieser Zone.` },
      { title: "Kollisionen in der Atmosphäre — die Lichtshow beginnt", content: `Wenn Sonnenwindteilchen (Elektronen) in die Atmosphäre eindringen, kollidieren sie mit Gasatomen — hauptsächlich Sauerstoff und Stickstoff. Diese Kollisionen finden in 100–300 Kilometern Höhe statt.\n\nBei einer Kollision wird das Gasatom **angeregt**. Wenn der angeregte Zustand sich entspannt, gibt das Atom die überschüssige Energie als **Licht** ab. Dieses Licht ist das Nordlicht.\n\nVerschiedene Gase und Höhen erzeugen verschiedene Farben:\n• **Grün** — Sauerstoff in 100–200 km Höhe (häufigste)\n• **Rot** — Sauerstoff über 200 km Höhe (seltener)\n• **Lila/Blau** — Stickstoff (oft am unteren Rand des Vorhangs)` },
      { title: "Warum gerade an den Polen?", content: `Das Aurora-Oval ist eine ringförmige Zone um die Polregionen. Levi (67,8° N) liegt nahe dem Südrand des nördlichen Ovals.\n\nBei sehr starken geomagnetischen Stürmen (KP 7+) **dehnt sich das Aurora-Oval deutlich nach Süden aus**. Dann können Nordlichter sogar in Mitteleuropa gesehen werden.` },
      { title: "Verschiedene Formen", content: `Nordlichter erscheinen in vielen Formen:\n\n**Bogen (Arc)** — Die häufigste Form. Ein grüner Bogen am Nordhimmel.\n\n**Vorhang (Curtain)** — Eine sich bewegende, wellenförmige Struktur. Sehr schön und dynamisch.\n\n**Corona** — Eine strahlenförmige Struktur direkt über dem Kopf. Beeindruckend und selten.\n\n**Flecken und Schein** — Schwache, diffuse Lichtbereiche am Himmel.` },
      { title: "Wie hoch sind sie?", content: `Nordlichter treten typischerweise in 100–300 Kilometern Höhe auf.\n\n**Grüne Aurora** tritt in etwa 100–200 km Höhe auf.\n\n**Rote Aurora** tritt höher auf, in 200–300 km.\n\nDie ISS umkreist in 400 km Höhe — Nordlichter befinden sich also unter der ISS! Die Höhe der Nordlichter erklärt, warum sie über ein so großes Gebiet sichtbar sind.` }
    ],
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Sind Nordlichter gefährlich?", a: "Nein. Sie treten in 100–300 km Höhe auf und haben keinerlei Auswirkungen auf den Boden. Starke geomagnetische Stürme können Satelliten und Stromnetze stören, sind aber für Menschen völlig ungefährlich." },
        { q: "Gibt es Nordlichter auf anderen Planeten?", a: "Ja — auf jedem Planeten mit Magnetfeld und Atmosphäre. Jupiter und Saturn zeigen riesige Aurora, und sogar auf dem Mars wurde schwaches Nordlicht beobachtet." },
        { q: "Kann man Nordlichter hören?", a: "Umstrittenes Thema. Finnische Forschung (Aalto-Universität) hat Geräusche in etwa 70 Metern Höhe dokumentiert. Aber wissenschaftliche Belege sind begrenzt." }
      ]
    },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Nordlichter in Levi", desc: "Umfassender Aurora-Ratgeber", href: "/en/northern-lights" },
        { title: "Farben der Nordlichter", desc: "Warum grün, rot und lila?", href: "/de/ratgeber/farben-der-nordlichter" },
        { title: "Unterkunft", desc: "Unterkunft in Levi buchen", href: "/en/accommodation" }
      ]
    }
  },
  es: {
    meta: { title: "¿Cómo se forman las auroras boreales? Explicación científica | Leville.net", description: "¿Cómo se forman las auroras boreales? Viento solar, campo magnético terrestre y colisiones con oxígeno y nitrógeno.", canonical: "https://leville.net/es/guia/como-se-forman-auroras-boreales" },
    h1: "¿Cómo se forman las auroras boreales?",
    breadcrumbLabel: "Cómo se forman las auroras",
    sections: [
      { title: "Todo comienza con el sol", content: `El sol envía constantemente un flujo de partículas al espacio — esto se llama viento solar. Normalmente es estable. Pero ocasionalmente enormes nubes de partículas estallan desde la superficie solar, llamadas Eyecciones de Masa Coronal (CME). Estas erupciones contienen miles de millones de toneladas de partículas cargadas.\n\nLa superficie solar también presenta manchas solares — áreas oscuras y magnéticamente activas. Más manchas solares significan más probabilidad de CME. El ciclo de actividad de 11 años del sol determina el número de manchas.` },
      { title: "El campo magnético de la Tierra — el escudo invisible", content: `La Tierra es como un imán gigante. Su campo magnético se extiende decenas de miles de kilómetros en el espacio y desvía la mayor parte del viento solar.\n\nPero cerca de los polos — exactamente donde está Levi — el campo magnético tiene una estructura diferente. Las líneas de campo se curvan hacia la superficie creando un "embudo" por donde las partículas del viento solar penetran en la atmósfera.\n\nEsta área se llama el **óvalo auroral** — una zona anular alrededor de cada región polar, típicamente en latitudes 65°–75° N. Levi (67,8° N) se encuentra en el corazón de esta zona.` },
      { title: "Colisiones en la atmósfera — el espectáculo de luz comienza", content: `Cuando las partículas del viento solar (electrones) entran en la atmósfera, comienzan a colisionar con átomos de gas — principalmente oxígeno y nitrógeno. Estas colisiones ocurren a 100–300 kilómetros de altitud.\n\nEn una colisión, el átomo de gas se **excita**. Cuando el estado excitado se relaja, el átomo emite la energía excedente como **luz**. Esta luz es la aurora.\n\nDiferentes gases y altitudes producen diferentes colores:\n• **Verde** — oxígeno a 100–200 km (más común)\n• **Rojo** — oxígeno por encima de 200 km (más raro)\n• **Púrpura/azul** — nitrógeno (a menudo en el borde inferior)` },
      { title: "¿Por qué cerca de los polos?", content: `El óvalo auroral es una zona anular alrededor de las regiones polares. Levi (67,8° N) está cerca del borde sur del óvalo norte.\n\nDurante tormentas geomagnéticas muy fuertes (KP 7+), el óvalo auroral **se expande significativamente hacia el sur**. Entonces las auroras pueden verse incluso en Europa Central.` },
      { title: "Diferentes formas", content: `Las auroras boreales aparecen en muchas formas:\n\n**Arco** — La forma más común. Un arco verde en el cielo norte.\n\n**Cortina** — Una estructura ondulante en movimiento. Muy hermosa y dinámica.\n\n**Corona** — Una estructura radiante directamente sobre la cabeza. Impresionante y rara.\n\n**Manchas y resplandor** — Áreas de luz débil y difusa en el cielo.` },
      { title: "¿A qué altura están?", content: `Las auroras ocurren típicamente a 100–300 kilómetros de altitud.\n\n**Aurora verde** ocurre a aproximadamente 100–200 km.\n\n**Aurora roja** ocurre más alto, a 200–300 km.\n\nLa ISS orbita a 400 km — ¡las auroras están por debajo de la ISS! La altitud de las auroras explica por qué son visibles en un área tan grande.` }
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Son peligrosas las auroras boreales?", a: "No. Ocurren a 100–300 km de altitud y no tienen ningún efecto en el suelo. Las tormentas geomagnéticas fuertes pueden perturbar satélites y redes eléctricas, pero son completamente inofensivas para las personas." },
        { q: "¿Hay auroras en otros planetas?", a: "Sí — en cualquier planeta con campo magnético y atmósfera. Júpiter y Saturno muestran enormes auroras, e incluso en Marte se ha observado aurora débil." },
        { q: "¿Se pueden escuchar las auroras?", a: "Tema controvertido. Investigación finlandesa (Universidad Aalto) ha documentado sonidos a unos 70 metros de altura. Pero la evidencia científica es limitada." }
      ]
    },
    readNext: {
      title: "Lea también",
      links: [
        { title: "Auroras boreales en Levi", desc: "Guía completa de auroras", href: "/en/northern-lights" },
        { title: "Colores de las auroras", desc: "¿Por qué verde, rojo y púrpura?", href: "/es/guia/colores-auroras-boreales" },
        { title: "Alojamiento", desc: "Reserve alojamiento en Levi", href: "/en/accommodation" }
      ]
    }
  },
  fr: {
    meta: { title: "Comment se forment les aurores boréales ? Explication scientifique | Leville.net", description: "Comment se forment les aurores boréales ? Vent solaire, champ magnétique terrestre et collisions avec l'oxygène et l'azote.", canonical: "https://leville.net/fr/guide/comment-se-forment-aurores-boreales" },
    h1: "Comment se forment les aurores boréales ?",
    breadcrumbLabel: "Comment se forment les aurores",
    sections: [
      { title: "Tout commence avec le soleil", content: `Le soleil envoie en permanence un flux de particules dans l'espace — c'est le vent solaire. Normalement stable, il n'entraîne pas d'aurores significatives. Mais parfois d'énormes nuages de particules éclatent de la surface solaire, appelées Éjections de Masse Coronale (CME). Ces éruptions contiennent des milliards de tonnes de particules chargées.\n\nLa surface solaire présente aussi des taches solaires — des zones sombres et magnétiquement actives. Plus de taches signifie plus de CME probables. Le cycle d'activité de 11 ans du soleil détermine le nombre de taches.` },
      { title: "Le champ magnétique terrestre — le bouclier invisible", content: `La Terre est comme un aimant géant. Son champ magnétique s'étend sur des dizaines de milliers de kilomètres dans l'espace et dévie la majeure partie du vent solaire.\n\nMais près des pôles — exactement où se trouve Levi — le champ magnétique a une structure différente. Les lignes de champ se courbent vers la surface, créant un "entonnoir" par lequel les particules du vent solaire pénètrent dans l'atmosphère.\n\nCette zone s'appelle l'**ovale auroral** — une zone annulaire autour de chaque région polaire, typiquement aux latitudes 65°–75° N. Levi (67,8° N) se situe au cœur de cette zone.` },
      { title: "Collisions dans l'atmosphère — le spectacle lumineux commence", content: `Lorsque les particules du vent solaire (électrons) pénètrent dans l'atmosphère, elles commencent à entrer en collision avec des atomes de gaz — principalement l'oxygène et l'azote. Ces collisions se produisent à 100–300 kilomètres d'altitude.\n\nLors d'une collision, l'atome de gaz est **excité**. Quand l'état excité se relaxe, l'atome émet l'énergie excédentaire sous forme de **lumière**. Cette lumière est l'aurore.\n\nDifférents gaz et altitudes produisent différentes couleurs :\n• **Vert** — oxygène à 100–200 km d'altitude (plus courant)\n• **Rouge** — oxygène au-dessus de 200 km (plus rare)\n• **Violet/bleu** — azote (souvent au bord inférieur du rideau)` },
      { title: "Pourquoi près des pôles ?", content: `L'ovale auroral est une zone annulaire autour des régions polaires. Levi (67,8° N) se situe près du bord sud de l'ovale nord.\n\nLors de tempêtes géomagnétiques très fortes (KP 7+), l'ovale auroral **s'étend significativement vers le sud**. Les aurores peuvent alors être vues même en Europe centrale.` },
      { title: "Différentes formes", content: `Les aurores boréales apparaissent sous de nombreuses formes :\n\n**Arc** — La forme la plus courante. Un arc vert dans le ciel nord.\n\n**Rideau** — Une structure ondulante en mouvement. Très belle et dynamique.\n\n**Corona** — Une structure rayonnante directement au-dessus. Impressionnante et rare.\n\n**Taches et lueur** — Des zones de lumière faible et diffuse dans le ciel.` },
      { title: "À quelle hauteur sont-elles ?", content: `Les aurores se produisent typiquement à 100–300 kilomètres d'altitude.\n\n**L'aurore verte** apparaît à environ 100–200 km d'altitude.\n\n**L'aurore rouge** apparaît plus haut, à 200–300 km.\n\nL'ISS orbite à 400 km — les aurores sont donc sous l'ISS ! L'altitude des aurores explique pourquoi elles sont visibles sur une si grande zone.` }
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Les aurores boréales sont-elles dangereuses ?", a: "Non. Elles se produisent à 100–300 km d'altitude et n'ont aucun effet au sol. Les tempêtes géomagnétiques fortes peuvent perturber les satellites et les réseaux électriques, mais elles sont totalement inoffensives pour les personnes." },
        { q: "Y a-t-il des aurores sur d'autres planètes ?", a: "Oui — sur toute planète possédant un champ magnétique et une atmosphère. Jupiter et Saturne affichent d'énormes aurores, et même sur Mars, de faibles aurores ont été observées." },
        { q: "Peut-on entendre les aurores ?", a: "Sujet controversé. Des recherches finlandaises (Université Aalto) ont documenté des sons à environ 70 mètres d'altitude. Mais les preuves scientifiques restent limitées." }
      ]
    },
    readNext: {
      title: "Lire aussi",
      links: [
        { title: "Aurores boréales à Levi", desc: "Guide complet des aurores", href: "/en/northern-lights" },
        { title: "Couleurs des aurores", desc: "Pourquoi vert, rouge et violet ?", href: "/fr/guide/couleurs-aurores-boreales" },
        { title: "Hébergement", desc: "Réservez un hébergement à Levi", href: "/en/accommodation" }
      ]
    }
  }
};

const HowNorthernLightsForm = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
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
            <GuideDisclaimer lang={lang} />
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
          </div>
        </main>

        <PageCTA lang={lang} />
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default HowNorthernLightsForm;
