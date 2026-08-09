import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Card, CardContent } from "@/components/ui/card";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Footprints,
  Car,
  Bus,
  Home,
  Mountain,
  Star,
  ExternalLink,
  ArrowRight,
  Table as TableIcon,
  Compass,
  HelpCircle,
} from "lucide-react";

type Lang = "fi" | "en";

type Transport = "walk" | "bus" | "car";

interface Area {
  slug: string;
  name: string;
  distance: string;
  transport: Transport;
  transportLabel: string;
  stock: string;
  bestFor: string;
  description: string;
  mapQuery: string;
  highlight?: boolean;
  linkPhrase?: string;
  linkHref?: string;
}

const URLS = {
  fi: "https://leville.net/opas/levin-alueet",
  en: "https://leville.net/guide/levi-areas",
};

const BOOKING_URL = "https://app.moder.fi/levillenet";

const transportIcon = (t: Transport) =>
  t === "walk" ? Footprints : t === "bus" ? Bus : Car;

const shortStock = (stock: string) => stock.split(/[,–]/)[0].trim();

const withInlineLink = (
  text: string,
  phrase?: string,
  href?: string,
) => {
  if (!phrase || !href) return text;
  const index = text.indexOf(phrase);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <Link to={href} className="text-primary hover:underline">
        {phrase}
      </Link>
      {text.slice(index + phrase.length)}
    </>
  );
};

const mapUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const areasFi: Area[] = [
  {
    slug: "keskusta",
    name: "Levin keskusta",
    distance: "0 km – olet jo perillä",
    transport: "walk",
    transportLabel: "Kaikki kävellen",
    stock: "Huoneistot, rivitalot ja hotellit kävelymatkan päässä rinteistä",
    bestFor: "Ensikertalaiset, pariskunnat, kaveriporukat ja perheet, jotka haluavat autottoman loman",
    description:
      "Levin keskusta on tunturikylän sydän: ravintolat, kaupat, hiihtokoulu, vuokraamot ja gondolin lähtöasema ovat kaikki kävelymatkan päässä. Kun majoitut keskustassa, et tarvitse autoa etkä bussiaikatauluja – illallinen, after ski ja rinteet ovat muutaman minuutin kävelyn päässä. Keskusta on myös alue, jolla majoitusta on eniten tarjolla ympäri vuoden.",
    mapQuery: "Levin keskusta, Kittilä, Finland",
    highlight: true,
  },
  {
    slug: "eturinteet",
    name: "Eturinteet ja Alppikylä",
    distance: "0,3–0,8 km keskustaan",
    transport: "walk",
    transportLabel: "Kävellen keskustaan ja rinteeseen",
    stock: "Uudehkot huoneistot ja alppitalot",
    bestFor: "Laskettelijat, jotka haluavat rinteen ja keskustan palvelut samalla kävelymatkalla",
    description:
      "Eturinteiden ja Alppikylän alue on keskustan välitön naapuri. Päärinteille ja hiihtoladuille on lyhyt matka, mutta ravintolat ja kaupat ovat silti kävelyetäisyydellä. Alue on rauhallisempi kuin ydinkeskusta, mutta säilyttää saman autottomuuden.",
    mapQuery: "Eturinne, Levi, Kittilä, Finland",
  },
  {
    slug: "kelorakka",
    name: "Kelorakka",
    distance: "1,5–2,5 km keskustaan",
    transport: "bus",
    transportLabel: "Skibussi tai auto",
    stock: "Kelohirsimökit ja isommat huvilat",
    bestFor: "Isot porukat ja perheet, jotka arvostavat tunnelmaa ja tilaa",
    description:
      "Kelorakka on klassinen mökkialue, jossa kelohirsimökit sijaitsevat väljästi metsän keskellä. Alue on hiljainen ja tunnelmallinen, ja rinteille sekä keskustaan pääsee skibussilla tai autolla muutamassa minuutissa.",
    mapQuery: "Kelorakka, Levi, Kittilä, Finland",
    linkPhrase: "skibussilla",
    linkHref: "/opas/liikkuminen-levilla",
  },
  {
    slug: "rakkavaara",
    name: "Rakkavaara",
    distance: "2–3 km keskustaan",
    transport: "bus",
    transportLabel: "Skibussi tai auto",
    stock: "Mökit ja huvilat rinteen tuntumassa",
    bestFor: "Perheet ja porukat, jotka haluavat rauhaa mutta lyhyen matkan rinteille",
    description:
      "Rakkavaara nousee keskustan koillispuolelle. Alueella on hyvä yhdistelmä mökkitunnelmaa ja lyhyttä matkaa hiihtokeskukseen. Näkymät tunturimaisemaan ovat monelta tontilta avarat.",
    mapQuery: "Rakkavaara, Levi, Kittilä, Finland",
  },
  {
    slug: "isorakka",
    name: "Isorakka ja Keskirakka",
    distance: "2,5–4 km keskustaan",
    transport: "car",
    transportLabel: "Auto suositeltava",
    stock: "Mökit ja huvilat, paljon uudempaa kantaa",
    bestFor: "Isot ryhmät ja pidemmät lomat, joissa auto on mukana",
    description:
      "Isorakka ja Keskirakka ovat laajoja mökkialueita keskustan pohjoispuolella. Tontit ovat suuria ja ympäristö rauhallinen. Auto helpottaa arkea, sillä kauppamatkat ja rinteille siirtymiset hoituvat nopeimmin omalla kyydillä.",
    mapQuery: "Isorakka, Levi, Kittilä, Finland",
  },
  {
    slug: "etelarinne",
    name: "Etelärinne / South Point",
    distance: "1,5–3 km keskustaan",
    transport: "bus",
    transportLabel: "Skibussi tai auto",
    stock: "Huoneistot ja mökit rinteiden alaosassa",
    bestFor: "Laskettelijat, jotka haluavat oman hissin ilman keskustan vilinää",
    description:
      "Etelärinteen alueella on omat hissinsä ja rinteensä, ja se on selvästi rauhallisempi kuin keskusta. Ravintoloita ja kauppoja on vähemmän, joten iltaohjelmaa varten kannattaa varata skibussi- tai automatka keskustaan.",
    mapQuery: "Etelärinne South Point, Levi, Kittilä, Finland",
  },
  {
    slug: "lansirinne",
    name: "Länsirinne / West Point",
    distance: "2–3,5 km keskustaan",
    transport: "car",
    transportLabel: "Auto suositeltava",
    stock: "Mökit ja huvilat rinteen läheisyydessä",
    bestFor: "Rauhaa hakevat porukat, joilla on auto käytössä",
    description:
      "Länsirinne on tunturin länsipuolen hiljaisempi laita. Alueelta pääsee rinteisiin, mutta palvelut ovat keskustassa. Iltaisin alue on hyvin rauhallinen, mikä sopii lapsiperheille ja luonnonrauhaa hakeville.",
    mapQuery: "Länsirinne West Point, Levi, Kittilä, Finland",
  },
  {
    slug: "immeljarvi",
    name: "Immeljärvi",
    distance: "3–5 km keskustaan",
    transport: "car",
    transportLabel: "Auto suositeltava",
    stock: "Järvenrantamökit ja huvilat",
    bestFor: "Kesälomailijat, kalastajat ja rantasaunan ystävät",
    description:
      "Immeljärven ympärillä on Levin klassisimpia järvenrantamökkejä. Alue on erityisen suosittu kesällä, kun uinti, melonta ja kalastus onnistuvat suoraan omalta rannalta. Talvella järven yli kulkee latuja ja moottorikelkkareittejä.",
    mapQuery: "Immeljärvi, Levi, Kittilä, Finland",
  },
  {
    slug: "utsuvaara",
    name: "Utsuvaara",
    distance: "4–6 km keskustaan",
    transport: "car",
    transportLabel: "Auto tarpeen",
    stock: "Mökit ja huvilat vaaran rinteillä",
    bestFor: "Näköalojen ja hiljaisuuden ystävät",
    description:
      "Utsuvaara sijaitsee hieman kauempana keskustasta, mutta palkitsee avarilla maisemilla ja rauhalla. Revontulten katseluun alue on erinomainen, koska valosaastetta on vähän. Auto on käytännössä välttämätön.",
    mapQuery: "Utsuvaara, Levi, Kittilä, Finland",
  },
  {
    slug: "katka",
    name: "Kätkä ja Kätkäjärvi",
    distance: "5–8 km keskustaan",
    transport: "car",
    transportLabel: "Auto tarpeen",
    stock: "Järvenranta- ja erämökit",
    bestFor: "Luontolomailijat, jotka haluavat aitoa erämaatunnelmaa",
    description:
      "Kätkätunturin ja Kätkäjärven ympäristö on Levin luonnonläheisin majoitusalue. Vaellusreitit ja ladut alkavat käytännössä ovelta. Palvelut ovat kaukana, joten kaupassa kannattaa käydä keskustassa.",
    mapQuery: "Kätkäjärvi, Kittilä, Finland",
  },
  {
    slug: "golf",
    name: "Levi Golf",
    distance: "3–5 km keskustaan",
    transport: "car",
    transportLabel: "Auto suositeltava",
    stock: "Huoneistot ja huvilat golfkentän laidalla",
    bestFor: "Kesävieraat, golfaajat ja rauhallista aluetta hakevat",
    description:
      "Golfkentän ympäristö on kesäisin Levin vihreintä aluetta ja talvisin hiljainen latumaisema. Majoitus on usein uudehkoa ja väljää. Keskustaan on lyhyt automatka.",
    mapQuery: "Levi Golf, Kittilä, Finland",
  },
  {
    slug: "taalo",
    name: "Taalo",
    distance: "4–6 km keskustaan",
    transport: "car",
    transportLabel: "Auto tarpeen",
    stock: "Mökit ja huvilat metsän keskellä",
    bestFor: "Porukat, jotka haluavat yksityisyyttä",
    description:
      "Taalon alue on rauhallinen mökkialue keskustan ulkopuolella. Naapureita on harvassa ja ympäristö on metsäinen. Sopii lomalle, jossa mökki itsessään on pääosassa.",
    mapQuery: "Taalo, Kittilä, Finland",
  },
  {
    slug: "kongas",
    name: "Köngäs",
    distance: "8–12 km keskustaan",
    transport: "car",
    transportLabel: "Auto tarpeen",
    stock: "Jokivarren mökit ja kylämajoitus",
    bestFor: "Aitoa lappilaista kylätunnelmaa hakevat",
    description:
      "Köngäs on oikea lappilainen kylä Ounasjoen varrella, noin kymmenen kilometriä Leviltä pohjoiseen. Alueella on omat ravintolansa ja husky- sekä porotiloja. Levin rinteille ajaa reilussa kymmenessä minuutissa.",
    mapQuery: "Köngäs, Kittilä, Finland",
  },
  {
    slug: "huippu",
    name: "Levin huippu",
    distance: "Tunturin laella",
    transport: "car",
    transportLabel: "Auto tai gondoli",
    stock: "Muutamia huippumökkejä ja erikoiskohteita",
    bestFor: "Maisemien maksimointi ja erityiset juhlat",
    description:
      "Tunturin laella majoittuminen on Levin erikoisin vaihtoehto: näkymät ulottuvat kymmenien kilometrien päähän ja revontulet näkyvät suoraan ikkunasta. Kohteita on vähän ja ne varataan usein hyvissä ajoin.",
    mapQuery: "Levin huippu, Kittilä, Finland",
  },
];

const areasEn: Area[] = [
  {
    slug: "keskusta",
    name: "Levi Village Centre",
    distance: "0 km – you are already there",
    transport: "walk",
    transportLabel: "Everything on foot",
    stock: "Apartments, townhouses and hotels within walking distance of the slopes",
    bestFor: "First-timers, couples, groups of friends and families who want a car-free holiday",
    description:
      "The centre of Levi is the heart of the resort: restaurants, shops, the ski school, rental shops and the gondola base station are all within a short walk. Staying here means you need neither a car nor a bus timetable — dinner, après-ski and the slopes are minutes away on foot. It is also the area with the widest choice of accommodation all year round.",
    mapQuery: "Levi centre, Kittilä, Finland",
    highlight: true,
  },
  {
    slug: "eturinteet",
    name: "Front Slopes and Alppikylä",
    distance: "0.3–0.8 km to the centre",
    transport: "walk",
    transportLabel: "Walk to the centre and the slopes",
    stock: "Newer apartments and alpine-style houses",
    bestFor: "Skiers who want both the slope and the village services on foot",
    description:
      "The Front Slopes and Alppikylä sit right next to the village centre. The main slopes and cross-country tracks are a short walk away, yet restaurants and shops are still within walking distance. The area is quieter than the very core while keeping the same car-free convenience.",
    mapQuery: "Eturinne front slope, Levi, Kittilä, Finland",
  },
  {
    slug: "kelorakka",
    name: "Kelorakka",
    distance: "1.5–2.5 km to the centre",
    transport: "bus",
    transportLabel: "Ski bus or car",
    stock: "Traditional kelo log cabins and larger villas",
    bestFor: "Larger groups and families who value atmosphere and space",
    description:
      "Kelorakka is a classic cabin area where weathered log cabins stand well apart from each other among the pines. It is quiet and atmospheric, and both the slopes and the centre are a few minutes away by ski bus or car.",
    mapQuery: "Kelorakka, Levi, Kittilä, Finland",
    linkPhrase: "ski bus",
    linkHref: "/guide/getting-around-in-levi",
  },
  {
    slug: "rakkavaara",
    name: "Rakkavaara",
    distance: "2–3 km to the centre",
    transport: "bus",
    transportLabel: "Ski bus or car",
    stock: "Cabins and villas close to the slopes",
    bestFor: "Families and groups who want peace but a short hop to the lifts",
    description:
      "Rakkavaara rises northeast of the centre and combines cabin atmosphere with a short transfer to the ski resort. Many plots enjoy open views over the surrounding fell landscape.",
    mapQuery: "Rakkavaara, Levi, Kittilä, Finland",
  },
  {
    slug: "isorakka",
    name: "Isorakka and Keskirakka",
    distance: "2.5–4 km to the centre",
    transport: "car",
    transportLabel: "Car recommended",
    stock: "Cabins and villas, much of it newer stock",
    bestFor: "Large groups and longer stays with a car available",
    description:
      "Isorakka and Keskirakka are extensive cabin areas north of the village. Plots are large and the surroundings peaceful. A car makes daily life easier, as grocery runs and lift transfers are quickest on your own wheels.",
    mapQuery: "Isorakka, Levi, Kittilä, Finland",
  },
  {
    slug: "etelarinne",
    name: "South Slope / South Point",
    distance: "1.5–3 km to the centre",
    transport: "bus",
    transportLabel: "Ski bus or car",
    stock: "Apartments and cabins at the base of the slopes",
    bestFor: "Skiers who want their own lift without the bustle of the centre",
    description:
      "The South Slope area has its own lifts and pistes and is noticeably quieter than the centre. There are fewer restaurants and shops, so plan a ski bus or car ride into the village for evening programme.",
    mapQuery: "South Point, Levi, Kittilä, Finland",
  },
  {
    slug: "lansirinne",
    name: "West Slope / West Point",
    distance: "2–3.5 km to the centre",
    transport: "car",
    transportLabel: "Car recommended",
    stock: "Cabins and villas near the slopes",
    bestFor: "Groups seeking quiet with a car at hand",
    description:
      "The West Slope is the calmer western flank of the fell. You can reach the pistes from here, but the services are in the village. Evenings are very peaceful, which suits families with children and anyone after natural quiet.",
    mapQuery: "West Point, Levi, Kittilä, Finland",
  },
  {
    slug: "immeljarvi",
    name: "Lake Immeljärvi",
    distance: "3–5 km to the centre",
    transport: "car",
    transportLabel: "Car recommended",
    stock: "Lakeside cabins and villas",
    bestFor: "Summer visitors, anglers and lovers of a lakeside sauna",
    description:
      "Around Lake Immeljärvi you will find some of Levi's most classic lakeside cabins. The area is especially popular in summer, when swimming, paddling and fishing start from your own shore. In winter ski tracks and snowmobile routes cross the frozen lake.",
    mapQuery: "Immeljärvi, Levi, Kittilä, Finland",
  },
  {
    slug: "utsuvaara",
    name: "Utsuvaara",
    distance: "4–6 km to the centre",
    transport: "car",
    transportLabel: "Car needed",
    stock: "Cabins and villas on the hillside",
    bestFor: "Those who value views and silence",
    description:
      "Utsuvaara lies a little further out but rewards you with wide views and true quiet. With very little light pollution it is an excellent base for watching the northern lights. A car is essentially required.",
    mapQuery: "Utsuvaara, Levi, Kittilä, Finland",
  },
  {
    slug: "katka",
    name: "Kätkä and Lake Kätkäjärvi",
    distance: "5–8 km to the centre",
    transport: "car",
    transportLabel: "Car needed",
    stock: "Lakeside and wilderness cabins",
    bestFor: "Nature travellers looking for genuine wilderness feel",
    description:
      "The area around Kätkätunturi fell and Lake Kätkäjärvi is the most nature-focused part of Levi. Hiking trails and ski tracks start practically at the door. Services are far away, so do your shopping in the village.",
    mapQuery: "Kätkäjärvi, Kittilä, Finland",
  },
  {
    slug: "golf",
    name: "Levi Golf",
    distance: "3–5 km to the centre",
    transport: "car",
    transportLabel: "Car recommended",
    stock: "Apartments and villas by the golf course",
    bestFor: "Summer guests, golfers and anyone wanting a calm area",
    description:
      "The golf course surroundings are the greenest part of Levi in summer and a quiet track-side landscape in winter. Accommodation tends to be newer and spacious, with a short drive into the village.",
    mapQuery: "Levi Golf, Kittilä, Finland",
  },
  {
    slug: "taalo",
    name: "Taalo",
    distance: "4–6 km to the centre",
    transport: "car",
    transportLabel: "Car needed",
    stock: "Cabins and villas in the forest",
    bestFor: "Groups who want privacy",
    description:
      "Taalo is a peaceful cabin area outside the village. Neighbours are few and the setting is forested — ideal for a holiday where the cabin itself is the main attraction.",
    mapQuery: "Taalo, Kittilä, Finland",
  },
  {
    slug: "kongas",
    name: "Köngäs",
    distance: "8–12 km to the centre",
    transport: "car",
    transportLabel: "Car needed",
    stock: "Riverside cabins and village accommodation",
    bestFor: "Travellers after an authentic Lappish village atmosphere",
    description:
      "Köngäs is a genuine Lappish village on the banks of the Ounasjoki river, about ten kilometres north of Levi. It has its own restaurants plus husky and reindeer farms, and the Levi slopes are a drive of just over ten minutes away.",
    mapQuery: "Köngäs, Kittilä, Finland",
  },
  {
    slug: "huippu",
    name: "Levi Summit",
    distance: "On top of the fell",
    transport: "car",
    transportLabel: "Car or gondola",
    stock: "A handful of summit cabins and special properties",
    bestFor: "Maximum views and special occasions",
    description:
      "Staying on the summit is the most unusual option in Levi: views stretch for tens of kilometres and the northern lights appear straight through the window. There are only a few properties and they are usually booked well in advance.",
    mapQuery: "Levi summit, Kittilä, Finland",
  },
];

const copy = {
  fi: {
    title: "Levin alueet – missä kannattaa majoittua? | Leville.net",
    description:
      "Levin majoitusalueet vertailussa: keskusta, Eturinteet, Rakka, Etelärinne, Immeljärvi, Köngäs ja muut. Etäisyydet, liikkuminen ja kenelle kukin alue sopii.",
    h1: "Levin alueet – missä kannattaa majoittua?",
    intro:
      "Levi ei ole yksi paikka vaan joukko hyvin erilaisia alueita. Keskustassa kaikki on kävelymatkan päässä, mökkialueilla saat rauhaa ja tilaa, ja järvenrannoilla loma rakentuu luonnon ympärille. Alueen valinta ratkaisee, tarvitsetko auton, kuinka paljon aikaa kuluu siirtymiin ja millainen tunnelma lomallesi tulee. Tähän oppaaseen on koottu Levin 14 majoitusaluetta: etäisyys keskustaan, käytännöllisin liikkumistapa, millaista majoitusta alueelta löytyy ja kenelle alue parhaiten sopii. Näin voit valita alueen ensin ja majoituksen vasta sen jälkeen.",
    whyH2: "Miksi keskusta voittaa lähes aina",
    why: [
      "Suurin osa vieraistamme päätyy keskustaan, ja syy on käytännöllinen. Kun majoitut kävelymatkan päässä rinteistä ja ravintoloista, loman rytmi muuttuu: aamulla ei tarvitse lastata suksia autoon, lounaalle voi tulla takaisin mökille ja illallisen jälkeen ei tarvitse miettiä kuka ajaa. Perheiden kanssa tämä on iso ero – väsyneen lapsen kanssa kymmenen minuutin kävely on aivan eri asia kuin bussin odottaminen pakkasessa.",
      "Keskusta on myös ainoa alue, jossa palvelut toimivat ympäri vuoden. Kaupat, apteekki, hiihtokoulu, vuokraamot ja suurin osa ravintoloista ovat samalla alueella. Kauempana majoittuessa lomabudjettiin kannattaa laskea auton vuokra, polttoaine ja pysäköinti sekä se aika, joka menee edestakaisiin siirtymiin.",
      "Kauempana olevilla alueilla on tietysti omat vahvuutensa: mökkitunnelma, järvenrannat, yksityisyys ja pimeä taivas revontulia varten. Jos autoa ei kuitenkaan ole, keskusta tai Eturinteet ovat lähes aina oikea valinta.",
    ],
    bookingCta: "Katso vapaat majoitukset Levin keskustassa",
    areasH2: "Levin alueet yksitellen",
    distanceLabel: "Etäisyys",
    stockLabel: "Majoituskanta",
    bestForLabel: "Sopii parhaiten",
    mapLink: "Näytä kartalla",
    recommended: "Suositelluin",
    tableH2: "Etäisyystaulukko",
    tableCols: ["Alue", "Etäisyys keskustaan", "Liikkuminen", "Majoitustyyppi"],
    chooseH2: "Näin valitset alueen",
    chooseItems: [
      {
        h3: "Jos et vuokraa autoa",
        text: "Valitse keskusta tai Eturinteet. Muilla alueilla olet skibussin aikataulun varassa, ja bussivuorot loppuvat illalla ennen kuin ravintolaillallinen on ohi. Taksin odotusaika ruuhkaviikonloppuna voi olla puoli tuntia.",
      },
      {
        h3: "Jos laskettelu on lomasi ainoa sisältö",
        text: "Etelärinne ja West Point tarjoavat aidon ski-in/ski-out-sijainnin, ja West Pointissa hissille on parikymmentä metriä. Vastineeksi illat vietetään mökillä: keskustan ravintolat ja kaupat ovat ajomatkan päässä.",
      },
      {
        h3: "Jos haet rauhaa ja revontulia",
        text: "Immeljärvi, Kätkä ja Köngäs ovat kylän valojen ulkopuolella, mikä auttaa revontulien näkymisessä. Varaudu ajamaan jokaiselle kauppareissulle ja aktiviteetille.",
        linkPhrase: "revontulien",
        linkHref: "/revontulet",
      },
    ],
    chooseCtaLink: "Tarkista vapaat päivät keskustan kohteissamme",
    chooseCtaTail:
      " — kaikki huoneistomme ja mökkimme ovat kävelymatkan päässä Levin palveluista.",
    faqH2: "Usein kysytyt kysymykset",
    faq: [
      {
        q: "Mikä on Levin paras alue majoittua?",
        a: "Useimmille keskusta. Se on ainoa alue, jolta pääsee kävellen sekä rinteille, kauppoihin että ravintoloihin, eikä auto tai taksi ole tarpeen. Rinnemajoitusta etsivälle Etelärinne ja West Point ovat vaihtoehtoja, luonnonrauhaa hakevalle Immeljärvi tai Kätkä.",
      },
      {
        q: "Tarvitseeko Levillä autoa?",
        a: "Keskustassa ja Eturinteillä et tarvitse. Muilla alueilla auto on käytännössä välttämätön, ellei skibussin aikataulu satu sopimaan päivärytmiisi. Köngäs ja Kätkä eivät toimi lainkaan ilman autoa.",
      },
      {
        q: "Mitä ski-in/ski-out tarkoittaa Levillä?",
        a: "Että pääset majoituksesta suksilla rinteeseen ja takaisin ilman kuljetusta. Levillä aidoin ski-in/ski-out on West Pointissa ja osassa Etelärinteen kohteita. Keskustassa matka Zero Pointille on kävellen muutama minuutti, mikä käytännössä vastaa samaa.",
      },
      {
        q: "Kuinka kaukana Kittilän lentoasema on Levin keskustasta?",
        a: "Noin 15 kilometriä, ajoaika noin 20 minuuttia. Lentojen aikatauluihin on kuljetusyhteydet, ja taksit odottavat terminaalilla.",
        linkPhrase: "Kittilän lentoasema",
        linkHref: "/matka/miten-paasee-leville-helsingista",
      },
    ],
    readNextTitle: "Lue seuraavaksi",
    readNext: [
      { title: "Levin majoitus – kaikki kohteemme", desc: "Selaa kaikkia huoneistoja ja mökkejä.", href: "/majoitukset" },
      { title: "Laskettelu Levillä", desc: "Rinteet, hissiliput ja hiihtokoulu.", href: "/opas/laskettelu-levi" },
      { title: "Miten Leville pääsee", desc: "Lennot, junat ja autoilu Helsingistä ja ulkomailta.", href: "/matka/miten-paasee-leville-helsingista" },
      { title: "Liikkuminen Levillä ja skibussi", desc: "Skibussit, taksit ja autonvuokraus.", href: "/opas/liikkuminen-levilla" },
      { title: "Revontulet Levillä", desc: "Milloin ja mistä revontulet näkyvät parhaiten.", href: "/revontulet" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Opas", href: "/opas/matkaopas-levi" },
      { label: "Levin alueet", href: "/opas/levin-alueet" },
    ],
  },

  en: {
    title: "Levi Areas – Where to Stay in Levi, Lapland | Leville.net",
    description:
      "A guide to every area in Levi: village centre, front slopes, Rakka cabin areas, South Point, Lake Immeljärvi, Köngäs and more. Distances, getting around and who each area suits.",
    h1: "Levi areas – where should you stay?",
    intro:
      "Levi is not one place but a collection of very different areas. In the village centre everything is within walking distance; in the cabin areas you get space and quiet; by the lakes the holiday is built around nature. The area you choose decides whether you need a car, how much time you spend in transit and what the atmosphere of your trip feels like. This guide covers all 14 accommodation areas in Levi: the distance to the centre, the most practical way to get around, what kind of properties you will find and who each area suits best — so you can choose the area first and the property second.",
    whyH2: "Why the village centre wins almost every time",
    why: [
      "Most of our guests end up in the centre, and the reason is practical. When you stay within walking distance of the slopes and restaurants, the rhythm of the holiday changes: no loading skis into a car in the morning, you can pop back for lunch, and after dinner nobody has to be the designated driver. With families the difference is significant — a ten-minute walk with a tired child is not the same as waiting for a bus in freezing temperatures.",
      "The centre is also the only area where services run all year round. Shops, the pharmacy, the ski school, rental outlets and most restaurants sit in the same compact area. If you stay further out, budget for car hire, fuel and parking, plus the time spent driving back and forth.",
      "The outlying areas have real strengths of their own: cabin atmosphere, lakeshores, privacy and dark skies for the northern lights. But if you are not renting a car, the centre or the front slopes are almost always the right call.",
    ],
    bookingCta: "See available accommodation in Levi centre",
    areasH2: "Levi areas one by one",
    distanceLabel: "Distance",
    stockLabel: "Accommodation",
    bestForLabel: "Best for",
    mapLink: "Show on map",
    recommended: "Most recommended",
    tableH2: "Distance table",
    tableCols: ["Area", "Distance to centre", "Getting around", "Accommodation type"],
    chooseH2: "How to choose your area",
    chooseItems: [
      {
        h3: "If you are not renting a car",
        text: "Choose the centre or the front slopes. Everywhere else you depend on the ski bus timetable, and services stop in the evening before dinner is over. On a busy weekend a taxi can take half an hour to arrive.",
      },
      {
        h3: "If skiing is the only thing on your agenda",
        text: "South Point and West Point offer genuine ski-in/ski-out locations, and at West Point the lift is some twenty metres away. The trade-off is that evenings are spent at the cabin: restaurants and shops in the village are a drive away.",
      },
      {
        h3: "If you want quiet and northern lights",
        text: "Immeljärvi, Kätkä and Köngäs sit outside the village lights, which helps when watching the aurora. Be prepared to drive to every grocery run and activity.",
        linkPhrase: "aurora",
        linkHref: "/en/northern-lights",
      },
    ],
    chooseCtaLink: "Check availability in our centrally located properties",
    chooseCtaTail:
      " — all our apartments and cabins are within walking distance of Levi's services.",
    faqH2: "Frequently asked questions",
    faq: [
      {
        q: "What is the best area to stay in Levi?",
        a: "For most visitors, the centre. It is the only area where the slopes, shops and restaurants are all within walking distance and no car or taxi is needed. If you want slope-side accommodation, South Point and West Point are the alternatives; for natural quiet, Immeljärvi or Kätkä.",
      },
      {
        q: "Do you need a car in Levi?",
        a: "Not in the centre or on the front slopes. In other areas a car is practically essential, unless the ski bus timetable happens to match your daily rhythm. Köngäs and Kätkä do not work at all without a car.",
      },
      {
        q: "What does ski-in/ski-out mean in Levi?",
        a: "That you can ski from your accommodation to the slope and back without transport. The most genuine ski-in/ski-out in Levi is at West Point and in some South Slope properties. From the centre it is a few minutes' walk to Zero Point, which in practice amounts to the same thing.",
      },
      {
        q: "How far is Kittilä Airport from Levi centre?",
        a: "About 15 kilometres, roughly a 20-minute drive. Transfers are scheduled around flight arrivals and taxis wait at the terminal.",
        linkPhrase: "Kittilä Airport",
        linkHref: "/travel/how-to-get-to-levi-from-helsinki-and-abroad",
      },
    ],
    readNextTitle: "Read next",
    readNext: [
      { title: "Levi accommodation – all our properties", desc: "Browse every apartment and cabin we rent out.", href: "/en/accommodations" },
      { title: "Skiing in Levi", desc: "Slopes, lift passes and ski school.", href: "/guide/skiing-in-levi" },
      { title: "How to get to Levi", desc: "Flights, trains and driving from Helsinki and abroad.", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
      { title: "Getting around Levi and the ski bus", desc: "Ski buses, taxis and car rental.", href: "/guide/getting-around-in-levi" },
      { title: "Northern lights in Levi", desc: "When and where the aurora is best seen.", href: "/en/northern-lights" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Guide", href: "/guide/travel-to-levi" },
      { label: "Levi areas", href: "/guide/levi-areas" },
    ],

  },
} as const;

interface LeviAreasGuideProps {
  lang?: Lang;
}

const LeviAreasGuide = ({ lang = "fi" }: LeviAreasGuideProps) => {
  const t = copy[lang];
  const areas = lang === "en" ? areasEn : areasFi;
  const canonical = URLS[lang];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lang === "en" ? "Levi areas and cabin districts" : "Levin alueet ja mökkialueet",
    description: t.description,
    inLanguage: lang,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Organization", name: "Leville.net", url: "https://leville.net" },
    publisher: {
      "@type": "Organization",
      name: "Leville.net",
      url: "https://leville.net",
    },
    about: {
      "@type": "Place",
      name: "Levi, Kittilä, Finland",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://leville.net${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SeoMeta
        title={t.title}
        description={t.description}
        canonicalUrl={canonical}
        lang={lang}
        ogType="article"
      />
      <HreflangTags
        currentPath={lang === "en" ? "/guide/levi-areas" : "/opas/levin-alueet"}
        currentLang={lang}
        customUrls={{ fi: URLS.fi, en: URLS.en }}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <Header />
      <SubpageBackground />

      <div className="relative z-10">
        <Breadcrumbs lang={lang} items={[...t.breadcrumbs]} />

        <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">{t.h1}</h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{t.intro}</p>

          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" aria-hidden="true" />
              {t.whyH2}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {t.why.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <Button asChild size="lg" className="mt-6">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {t.bookingCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" aria-hidden="true" />
              {t.areasH2}
            </h2>

            <div className="space-y-6">
              {areas.map((area) => {
                const TransportIcon = transportIcon(area.transport);
                return (
                  <Card
                    key={area.slug}
                    id={area.slug}
                    className={
                      area.highlight
                        ? "border-2 border-primary bg-primary/5 scroll-mt-24"
                        : "border border-border scroll-mt-24"
                    }
                  >
                    <CardContent className="p-5 md:p-7">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {area.name}
                        </h3>
                        {area.highlight && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                            <Star className="h-3 w-3" aria-hidden="true" />
                            {t.recommended}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                          {area.distance}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <TransportIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                          {area.transportLabel}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {withInlineLink(area.description, area.linkPhrase, area.linkHref)}
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2 mb-5">
                        <div className="rounded-lg bg-muted/50 p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground mb-1">
                            <Home className="h-4 w-4 text-primary" aria-hidden="true" />
                            {t.stockLabel}
                          </div>
                          <p className="text-sm text-muted-foreground">{area.stock}</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground mb-1">
                            <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                            {t.bestForLabel}
                          </div>
                          <p className="text-sm text-muted-foreground">{area.bestFor}</p>
                        </div>
                      </div>

                      <a
                        href={mapUrl(area.mapQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {t.mapLink}
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <TableIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              {t.tableH2}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    {t.tableCols.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area) => (
                    <tr
                      key={area.slug}
                      className={
                        area.highlight
                          ? "border-t border-border bg-primary/5 font-medium"
                          : "border-t border-border"
                      }
                    >
                      <td className="px-4 py-3 text-foreground whitespace-nowrap">
                        <a href={`#${area.slug}`} className="hover:text-primary hover:underline">
                          {area.name}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{area.distance}</td>
                      <td className="px-4 py-3 text-muted-foreground">{area.transportLabel}</td>
                      <td className="px-4 py-3 text-muted-foreground">{shortStock(area.stock)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
              {t.chooseH2}
            </h2>
            <div className="space-y-6">
              {t.chooseItems.map((item) => (
                <div key={item.h3}>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    {item.h3}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {withInlineLink(
                      item.text,
                      "linkPhrase" in item ? item.linkPhrase : undefined,
                      "linkHref" in item ? item.linkHref : undefined,
                    )}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {t.chooseCtaLink}
              </a>
              {t.chooseCtaTail}
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
              {t.faqH2}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {t.faq.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {withInlineLink(
                      item.a,
                      "linkPhrase" in item ? item.linkPhrase : undefined,
                      "linkHref" in item ? item.linkHref : undefined,
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <div className="mt-14">
            <ReadNextSection title={t.readNextTitle} links={t.readNext.map((l) => ({ ...l }))} />
          </div>

          <GuideDisclaimer lang={lang} />

          <div className="mt-10">
            <Button asChild variant="outline">
              <Link to={lang === "en" ? "/en/accommodations" : "/majoitukset"}>
                {lang === "en" ? "Browse all accommodation" : "Selaa kaikkia majoituksia"}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </main>
      </div>

      <PageCTA lang={lang} />
      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default LeviAreasGuide;
