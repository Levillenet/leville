import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ZoomIn } from "lucide-react";
import ImageLightbox from "@/components/guide/ImageLightbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema } from "@/utils/structuredData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import StickyBookingBar from "@/components/StickyBookingBar";
import OptimizedImage from "@/components/OptimizedImage";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import ReadNextSection from "@/components/guide/ReadNextSection";
import { Language } from "@/translations";
import InlineBookingLink from "@/components/InlineBookingLink";

// Restaurant Asia
import asiaWokki from "@/assets/restaurants/Aasialainen wokki bataattiranskalaisilla - Ravintola Asia.jpg";
import asiaPaistettuLiha from "@/assets/restaurants/Aasialainen paistettu liha - ravintola asia.jpg";
import asiaLohiWasabi from "@/assets/restaurants/Paistettu lohi wasabilla - Restaurant ASia.jpg";
import asiaGrillLohi from "@/assets/restaurants/Grillattu lohi chililla - restaurant asia.jpg";
import asiaTempura from "@/assets/restaurants/Tempurakatkaravut ja bataattiranskalaiset 2 - ravintola asia.jpg";
import asiaStickyPork from "@/assets/restaurants/Sticky pork aasialainen - Levi Ravintola ASia.jpg";
import asiaTataki from "@/assets/restaurants/Pihvi tataki - Asia ravintola.jpg";

// Ravintola Ämmilä
import ammilaHampurilainen from "@/assets/restaurants/Hampurilainen ja ranskalaiset - Ravintola Ammila (Levi).jpg";
import ammilaSiika from "@/assets/restaurants/Paistettu siika ja kasviksia - Ravintola Ammila (Levi).jpg";
import ammilaKaristys from "@/assets/restaurants/Poronkaristys perunamuusilla - Ravintola Ammila (Levi).jpg";
import ammilaMakkara from "@/assets/restaurants/Makkaralautanen perunoilla - Ravintola Ammila (Levi).jpg";

// Ravintola Niliporo
import niliporoMakkara from "@/assets/restaurants/Poronmakkara perunamuusilla - ravintola niliporo.jpg";
import niliporoLihapullat from "@/assets/restaurants/Lihapullat perunamuusilla - Niliporo.jpg";
import niliporoLihaLautanen from "@/assets/restaurants/Liha- ja makkaralautanen- ravintola niliporo.jpg";
import niliporoMaksa from "@/assets/restaurants/Poronmaksaa perunamuusilla - Levi Niliporo.jpg";
import niliporoHampurilainen from "@/assets/restaurants/poroHampurilainen ja ranskalaiset -Ravintola NIliporo.jpg";

// Colorado
import coloradoRibs from "@/assets/restaurants/BBQ-ribsit laudalla - ravintola colorado.jpg";
import coloradoFajitas from "@/assets/restaurants/Kana fajitas - Colorado Bar and Grill (Levi).jpg";
import coloradoFajitas2 from "@/assets/restaurants/Kanafajitas lisukkeineen -  ravintola colorado.jpg";
import coloradoNachotAsset from "@/assets/restaurants/colorado-nachot-upright.webp.asset.json";
import coloradoNyhtoliha from "@/assets/restaurants/Nyhtöliha jalapenolla - Colorado Bar and Grill (Levi).jpg";

// Pannukakkutalo
import pannukakkuMansikka from "@/assets/restaurants/Pannukakku mansikalla ja kermavaahdolla - Pannukakkutalo (Levi).jpg";
import pannukakkuMustikka from "@/assets/restaurants/Pannukakku mustikalla ja jaatelolla - Pannukakkutalo (Levi).jpg";
import pannukakkuMarja from "@/assets/restaurants/Pannukakku marjoilla ja kermavaahdolla - Pannukakkutalo (Levi).jpg";

// Myllyn Äijä
import myllynLeike from "@/assets/restaurants/Leike sienikastikkeella - Myllyn Aija (Levi).jpg";
import myllynPihvi from "@/assets/restaurants/Pippuripihvi perunagratiinilla - Myllyn Aija (Levi).jpg";

// Ravintola Renna
import rennaPizza from "@/assets/restaurants/Pizza prosciutto e rucola - restaurant Renna.jpg";
import rennaPizza2 from "@/assets/restaurants/Pizza prosciutto rucola - ravintola renna.jpg";
import rennaPizza3 from "@/assets/restaurants/Pizza prosciutto rucola take-away - ristorante renna.jpg";
import rennaAnanasAsset from "@/assets/restaurants/pizza-kinkku-sinihomejuusto-ananas-pizzeria-renna-levi.webp.asset.json";
import rennaMeloniAsset from "@/assets/restaurants/pizza-meloni-rucola-pinjansiemen-pizzeria-renna-levi.webp.asset.json";
import rennaAntipastoAsset from "@/assets/restaurants/antipasto-leikkelelautanen-pizzeria-renna-levi.webp.asset.json";

// Salteriet
import salterietLeike from "@/assets/restaurants/Leike ranskalaisilla ja remouladella - Levi Salteriet.jpg";
import salterietLeike2 from "@/assets/restaurants/Leike ranskalaisilla ja tzatzikilla - Salteriet Levi .jpg";

// Hook
import hookWings from "@/assets/restaurants/Buffalo wings - Ravintola Hook.jpeg";

// Pihvipirtti
import pihvipirttiKala from "@/assets/restaurants/kalapöytä alkupalat ravintola pihvipirtti.jpg";

// Grill it!
import grillItPihviPippuri from "@/assets/restaurants/grill-it-levi-pihvi-pippurikastike.webp.asset.json";
import grillItPihviSieni from "@/assets/restaurants/grill-it-levi-pihvi-metsasienikastike.webp.asset.json";
import grillItEtanat from "@/assets/restaurants/grill-it-levi-etanat-valkosipulivoissa.webp.asset.json";
import grillItKeitto from "@/assets/restaurants/grill-it-levi-keitto-siemennakkileipa.webp.asset.json";
// King Crab House
import kingCrabPlatter from "@/assets/restaurants/king-crab-house-merenelavavati.webp.asset.json";
import kingCrabMussels from "@/assets/restaurants/king-crab-house-simpukka-annos.webp.asset.json";
import kingCrabStarter from "@/assets/restaurants/king-crab-house-friteerattu-alkuruoka.webp.asset.json";
import kingCrabDessert from "@/assets/restaurants/king-crab-house-jalkiruoka.webp.asset.json";

// Stefan’s Steakhouse
import stefansSteak from "@/assets/restaurants/stefans-steakhouse-pihvi.webp.asset.json";
import stefansStarter from "@/assets/restaurants/stefans-steakhouse-alkuruoka.webp.asset.json";
import stefansDessert from "@/assets/restaurants/stefans-steakhouse-jalkiruoka.webp.asset.json";
import kammiBuffetAsset from "@/assets/restaurants/ravintola-kammi-buffet-levi.webp.asset.json";
import MajoitusCallout from "@/components/MajoitusCallout";

interface LeviRestaurantGuideProps {
  lang?: Language;
}

interface RestaurantSection {
  emoji: string;
  name: string;
  subtitle: string;
  description: string[];
  images: { src: string; alt: string }[];
}

const translations: Record<"fi" | "en", {
  meta: { title: string; description: string; canonical: string };
  title: string;
  subtitle: string;
  intro: string;
  breadcrumbs: { label: string; href: string }[];
  travelHubLink: string;
  travelHubText: string;
  accommodationsHref: string;
  ctaTitle: string;
  ctaButton: string;
  readNext: { title: string; links: { title: string; desc: string; href: string }[] };
  restaurants: RestaurantSection[];
  priceGuide: {
    title: string;
    note: string;
    headers: { category: string; price: string; details: string };
    rows: { category: string; price: string; details: string }[];
  };
}> = {
  fi: {
    meta: {
      title: "Levin ravintolat ja annokset – aidot ruokakuvat | Leville.net",
      description: "Tutustu Levin parhaimpiin ravintoloihin aitojen annoskuvien kautta. Restaurant Asia, Ämmilä, Niliporo, Colorado, Pannukakkutalo ja muut.",
      canonical: "https://leville.net/opas/levin-ravintolat-ja-annokset",
    },
    title: "Levin ravintolat ja annokset",
    subtitle: "Aitoja annoskuvia ja esittelyjä Levin ravintoloista",
    intro: "Tällä sivulla esittelemme neljätoista Levin ravintolaa aitojen annoskuvien kautta. Jokainen ravintola on erilainen – löydät aasialaista fuusiota, perinteistä poronkäristystä, grillattuja pihvejä, texmex-herkkuja ja paljon muuta.",
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Ravintolat ja palvelut", href: "/opas/ravintolat-ja-palvelut-levilla" },
      { label: "Ravintolat ja annokset", href: "/opas/levin-ravintolat-ja-annokset" },
    ],
    travelHubLink: "/opas/ravintolat-ja-palvelut-levilla",
    travelHubText: "← Takaisin ravintolat ja palvelut -sivulle",
    accommodationsHref: "/majoitukset",
    ctaTitle: "Varaa majoitus Levin keskustasta",
    ctaButton: "Katso majoitukset",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Ravintolat ja palvelut", desc: "Kaikki palvelut yhdellä sivulla", href: "/opas/ravintolat-ja-palvelut-levilla" },
        { title: "Lapsiperheet Levillä", desc: "Perheystävälliset ravintolat", href: "/opas/lapsiperheet-levilla" },
        { title: "Après ski Levillä", desc: "Tunnelmaa rinteen jälkeen", href: "/opas/afterski-ja-yoelama-levilla" },
        { title: "Levin hinnat", desc: "Mitä maksaa Levillä?", href: "/opas/hinnat-levilla" },
      ],
    },
    priceGuide: {
      title: "Tyypilliset hinnat Levin ravintoloissa",
      note: "Hinnat ovat suuntaa-antavia ja voivat vaihdella ravintolan mukaan.",
      headers: { category: "Ateriatyyppi", price: "Hintataso", details: "Lisätiedot" },
      rows: [
        { category: "🥐 Aamupala", price: "10–20 €", details: "Buffet tai á la carte, sisältää kahvin" },
        { category: "🍽️ Lounas", price: "~15 €", details: "Sis. alkusalaatti, leipä, juoma ja buffetpöytä" },
        { category: "🍕 Pizza & burger", price: "15–25 €", details: "Casual-illallinen, take away mahdollinen" },
        { category: "🥩 Fine dining", price: "25–60 €", details: "Menu, pihvi tai riista, á la carte" },
      ],
    },
    restaurants: [
      {
        emoji: "🍜",
        name: "Restaurant Asia",
        subtitle: "Aasialaista ruokaa Lapin twistillä",
        description: [
          "Restaurant Asia tuo Levin ravintolatarjontaan raikkaan ja hieman yllättävän vaihtoehdon. Tarjolla on aasialaistyylisiä annoksia, joissa on mukana hienovarainen Lapin vivahde.",
          "Vaikka aasialainen keittiö ei ehkä ole ensimmäinen mielikuva Levistä, tämä ravintola kannattaa ehdottomasti lisätä listalle. Annokset ovat viimeisteltyjä, maukkaita ja laadukkaita – täydellinen valinta, kun haluat vaihtelua perinteiseen Lappi-menuun.",
        ],
        images: [
          { src: asiaWokki, alt: "Aasialainen wokki bataattiranskalaisilla – Restaurant Asia, Levi" },
          { src: asiaPaistettuLiha, alt: "Aasialainen paistettu liha – Restaurant Asia, Levi" },
          { src: asiaLohiWasabi, alt: "Paistettu lohi wasabilla – Restaurant Asia, Levi" },
          { src: asiaGrillLohi, alt: "Grillattu lohi chilillä – Restaurant Asia, Levi" },
          { src: asiaTempura, alt: "Tempurakatkaravut ja bataattiranskalaiset – Restaurant Asia, Levi" },
          
          { src: asiaStickyPork, alt: "Sticky pork aasialainen – Restaurant Asia, Levi" },
          { src: asiaTataki, alt: "Pihvi tataki – Restaurant Asia, Levi" },
        ],
      },
      {
        emoji: "🏡",
        name: "Ravintola Ämmilä",
        subtitle: "Perinteistä Lapin kotiruokaa",
        description: [
          "Ämmilä tarkoittaa mummolaa – ja juuri siltä tämä ravintola tuntuu. Lämmin, kodikas tunnelma ja aidot maut tekevät tästä yhden Levin rakastetuimmista ruokapaikoista.",
          "Listalta löytyy klassikoita, kuten poronkäristys sekä laadukkaat kalaruoat. Jos haluat kokea perinteisen Lapin keittiön parhaimmillaan, Ämmilä on varma valinta.",
        ],
        images: [
          { src: ammilaHampurilainen, alt: "Hampurilainen ja ranskalaiset – Ravintola Ämmilä, Levi" },
          { src: ammilaSiika, alt: "Paistettu siika ja kasviksia – Ravintola Ämmilä, Levi" },
          { src: ammilaKaristys, alt: "Poronkäristys perunamuusilla – Ravintola Ämmilä, Levi" },
          
          { src: ammilaMakkara, alt: "Makkaralautanen perunoilla – Ravintola Ämmilä, Levi" },
        ],
      },
      {
        emoji: "🦌",
        name: "Ravintola Niliporo",
        subtitle: "Paikallista poroa suoraan tilalta",
        description: [
          "Niliporo on aidosti paikallinen pororavintola, jossa raaka-aineet tulevat pääosin ravintolan omalta tilalta. Tämä näkyy laadussa ja maussa.",
          "Annokset ovat kodinomaisia, rehellisiä ja erittäin herkullisia. Täydellinen paikka, kun haluat maistaa aitoa lappilaista pororuokaa ilman kompromisseja.",
        ],
        images: [
          { src: niliporoMakkara, alt: "Poronmakkara perunamuusilla – Ravintola Niliporo, Levi" },
          { src: niliporoLihapullat, alt: "Lihapullat perunamuusilla – Ravintola Niliporo, Levi" },
          { src: niliporoLihaLautanen, alt: "Liha- ja makkaralautanen – Ravintola Niliporo, Levi" },
          { src: niliporoMaksa, alt: "Poronmaksaa perunamuusilla – Ravintola Niliporo, Levi" },
          { src: niliporoHampurilainen, alt: "Porohampurilainen ja ranskalaiset – Ravintola Niliporo, Levi" },
        ],
      },
      {
        emoji: "🌮",
        name: "Colorado Bar & Grill",
        subtitle: "Rento BBQ ja texmex",
        description: [
          "Colorado tarjoaa rennon tunnelman ja reilut annokset. Listalta löytyy barbecue-ribsit, fajitakset, nachot ja muut texmex-klassikot.",
          "Erinomainen valinta, kun kaipaat tuhdimpaa ruokaa ja hieman amerikkalaishenkistä meininkiä Levin lomaan.",
        ],
        images: [
          { src: coloradoRibs, alt: "BBQ-ribsit laudalla – Colorado Bar & Grill, Levi" },
          { src: coloradoFajitas, alt: "Kana fajitas – Colorado Bar & Grill, Levi" },
          { src: coloradoFajitas2, alt: "Kanafajitas lisukkeineen – Colorado Bar & Grill, Levi" },
          { src: coloradoNachotAsset.url, alt: "Nachot guacamolella – Colorado Bar & Grill, Levi" },
          { src: coloradoNyhtoliha, alt: "Nyhtöliha jalapenolla – Colorado Bar & Grill, Levi" },
        ],
      },
      {
        emoji: "🥞",
        name: "Pannukakkutalo",
        subtitle: "Levin klassikko – makeaa ja suolaista",
        description: [
          "Pannukakkutalo on yksi Levin tunnetuimmista ravintoloista. Tarjolla on suuria, näyttäviä pannukakkuja sekä makeilla että suolaisilla täytteillä.",
          "Täydellinen paikka herkutteluun – annokset ovat runsaita ja vaihtoehtoja löytyy joka makuun.",
        ],
        images: [
          { src: pannukakkuMansikka, alt: "Pannukakku mansikalla ja kermavaahdolla – Pannukakkutalo, Levi" },
          { src: pannukakkuMustikka, alt: "Pannukakku mustikalla ja jäätelöllä – Pannukakkutalo, Levi" },
          { src: pannukakkuMarja, alt: "Pannukakku marjoilla ja kermavaahdolla – Pannukakkutalo, Levi" },
        ],
      },
      {
        emoji: "🍽️",
        name: "Myllyn Äijä",
        subtitle: "Perinteikäs ja kodikas",
        description: [
          "Yksi Levin vanhimmista ravintoloista, joka tunnetaan tasaisesta laadusta ja perinteisistä mauista.",
          "Listalta löytyy leikkeitä, poronkäristystä ja muuta tuttua, mutta erittäin hyvin tehtyä ruokaa. Kodikas tunnelma tekee kokemuksesta erityisen miellyttävän.",
        ],
        images: [
          { src: myllynLeike, alt: "Leike sienikastikkeella – Myllyn Äijä, Levi" },
          { src: myllynPihvi, alt: "Pippuripihvi perunagratiinilla – Myllyn Äijä, Levi" },
          
        ],
      },
      {
        emoji: "🍕",
        name: "Ravintola Renna",
        subtitle: "Ohutpohjaiset pizzat ja pastat",
        description: [
          "Renna on yksi Levin suosituimmista pizzerioista. Pizzat tarjoillaan näyttävästi puulevyiltä, ja pohja on mukavan ohut ja rapea.",
          "Lisäksi tarjolla on laadukkaita pasta-annoksia ja runsaita antipasto-lautasia alkuun. Helppo ja varma valinta, kun tekee mieli hyvää pizzaa Levin keskustassa.",
        ],
        images: [
          { src: rennaPizza, alt: "Pizza prosciutto e rucola – Ravintola Renna, Levi" },
          { src: rennaPizza2, alt: "Pizza prosciutto rucola – Ravintola Renna, Levi" },
          { src: rennaPizza3, alt: "Pizza prosciutto rucola take-away – Ravintola Renna, Levi" },
          { src: rennaAnanasAsset.url, alt: "Ohutpohjainen pizza kinkulla, sinihomejuustolla ja ananaksella – Pizzeria Renna, Levi" },
          { src: rennaMeloniAsset.url, alt: "Pizza melonilla, rucolalla ja pinjansiemenillä – Pizzeria Renna, Levi" },
          { src: rennaAntipastoAsset.url, alt: "Antipasto-leikkelelautanen salamilla, juustoilla ja oliiveilla – Pizzeria Renna, Levi" },
        ],
      },
      {
        emoji: "🥩",
        name: "Ravintola Salteriet",
        subtitle: "Reilut annokset rinnepäivän jälkeen",
        description: [
          "Salteriet on pieni ja persoonallinen ravintola, joka tunnetaan erityisesti runsaista annoksistaan ja leikkeitään.",
          "Täydellinen paikka pitkän rinnepäivän päätteeksi. Sama ravintola toimii kesäisin myös Turun saaristossa.",
        ],
        images: [
          { src: salterietLeike, alt: "Leike ranskalaisilla ja remouladella – Salteriet, Levi" },
          { src: salterietLeike2, alt: "Leike ranskalaisilla ja tzatzikilla – Salteriet, Levi" },
        ],
      },
      {
        emoji: "🍗",
        name: "Ravintola Hook",
        subtitle: "Siipiä ja rentoa fiilistä",
        description: [
          "Hook on oikea osoite siipien ystäville. Listan pääosassa ovat erilaiset kanansiivet ja kastikkeet.",
          "Kun tekee mieli rentoa, nopeaa ja maukasta syötävää, Hook toimii aina.",
        ],
        images: [
          { src: hookWings, alt: "Buffalo wings – Ravintola Hook, Levi" },
        ],
      },
      {
        emoji: "🔥",
        name: "Ravintola Pihvipirtti",
        subtitle: "Elämysillallinen Levillä",
        description: [
          "Pihvipirtti tarjoaa perinteisen ja elämyksellisen pihvi-illallisen.",
          "Illallinen alkaa runsaalla kalapöydällä buffetista, jonka jälkeen pääruoaksi valitaan pihvi – vaihtoehtoina esimerkiksi poro, nautaa tai possua, eri kastikkeilla ja lisukkeilla.",
          "Täydellinen valinta, kun haluat nauttia pitkän ja elämyksellisen illallisen hyvässä tunnelmassa.",
        ],
        images: [
          { src: pihvipirttiKala, alt: "Kalapöytä alkupalat – Ravintola Pihvipirtti, Levi" },
        ],
      },
      {
        emoji: "🥩",
        name: "Grill it!",
        subtitle: "Pihvit ja grilliruoka Levin keskustassa",
        description: [
          "Grill it! on Levin keskustan pihviravintola, jossa pääosassa ovat grillatut liha-annokset ja huolella viimeistellyt kastikkeet.",
          "Pihvit tarjoillaan esimerkiksi täyteläisen metsäsienikastikkeen tai klassisen viherpippurikastikkeen kanssa, lisukkeina grillattuja kasviksia ja perunagratiinia. Alkuun saa etanoita valkosipulivoissa tai samettisen keiton.",
          "Hyvä valinta, kun haluat kunnollisen pihvi-illallisen rennossa ja lämpimässä tunnelmassa aivan keskustan palveluiden vieressä.",
        ],
        images: [
          { src: grillItPihviPippuri.url, alt: "Grillattu pihvi viherpippurikastikkeella, parsakaalilla ja perunagratiinilla – Grill it!, Levi" },
          { src: grillItPihviSieni.url, alt: "Grillattu pihvi metsäsienikastikkeella ja ruusukaalilla – Grill it!, Levi" },
          { src: grillItEtanat.url, alt: "Etanat valkosipulivoissa ja grillattu leipä alkuruokana – Grill it!, Levi" },
          { src: grillItKeitto.url, alt: "Samettinen keitto ja siemennäkkileipä – Grill it!, Levi" },
        ],
      },
      {
        emoji: "🦀",
        name: "King Crab House",
        subtitle: "Mereneläviä Levin kävelykeskustassa",
        description: [
          "King Crab House on Levin kävelykeskustan mereneläviin erikoistunut ravintola. Sen tunnetuin erikoisuus on Pohjois-Norjan rannikolta tuleva kuningasrapu.",
          "Annoksissa näkyvät myös simpukat ja muut merenelävät. Kuvissa on merenelävävati, simpukka-annos, rapea alkuruoka ja jälkiruoka – vaihtoehto erityiselle illalliselle Levillä.",
        ],
        images: [
          { src: kingCrabPlatter.url, alt: "Merenelävävati ja simpukoita – King Crab House, Levi" },
          { src: kingCrabMussels.url, alt: "Simpukka-annos tomaattisessa liemessä – King Crab House, Levi" },
          { src: kingCrabStarter.url, alt: "Rapea alkuruoka kulhossa – King Crab House, Levi" },
          { src: kingCrabDessert.url, alt: "Jälkiruoka tummassa kulhossa – King Crab House, Levi" },
        ],
      },
      {
        emoji: "🥩",
        name: "Stefan’s Steakhouse",
        subtitle: "Pihvi-illallinen Levillä",
        description: [
          "Stefan’s Steakhouse on pihviravintola, jossa illallinen rakentuu liha-annosten ympärille. Kuvissa pihvi tarjoillaan kastikkeen kanssa.",
          "Kuvissa on myös huolella aseteltu alkuruoka ja jälkiruoka. Kolme kuvaa antavat tuntumaa ravintolan annosten tyyliin.",
        ],
        images: [
          { src: stefansSteak.url, alt: "Pihvi ja kastike lautasella – Stefan’s Steakhouse, Levi" },
          { src: stefansStarter.url, alt: "Viimeistelty alkuruoka tummalla lautasella – Stefan’s Steakhouse, Levi" },
          { src: stefansDessert.url, alt: "Jälkiruoka ja jäätelöpallo – Stefan’s Steakhouse, Levi" },
        ],
      },
      {
        emoji: "🦌",
        name: "Ravintola Kammi",
        subtitle: "Perinteinen poroillallinen buffetista",
        description: [
          "Kammi on perinteinen pororavintola Levillä. Illallinen on buffet-tyyppinen, joten ruokailu sopii kiireettömään iltaan lappilaisten makujen äärellä.",
          "Kuvassa näkyy ravintolan avotuli ja buffet-ympäristö – tunnelma on osa Kammin illalliskokemusta.",
        ],
        images: [
          { src: kammiBuffetAsset.url, alt: "Avotuli ja buffet-ympäristö – Ravintola Kammi, Levi" },
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Levi Restaurants and Dishes – Real Food Photos | Leville.net",
      description: "Explore Levi's best restaurants through real dish photos. Restaurant Asia, Ämmilä, Niliporo, Colorado, Pannukakkutalo and more.",
      canonical: "https://leville.net/guide/levi-restaurants-and-dishes",
    },
    title: "Levi Restaurants and Dishes",
    subtitle: "Real dish photos and reviews from Levi restaurants",
    intro: "On this page we present fourteen Levi restaurants through real photos. Each restaurant is unique – you will find Asian fusion, traditional reindeer dishes, grilled steaks, Tex-Mex treats and much more.",
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Restaurants and Services", href: "/guide/restaurants-and-services-in-levi" },
      { label: "Restaurants and Dishes", href: "/guide/levi-restaurants-and-dishes" },
    ],
    travelHubLink: "/guide/restaurants-and-services-in-levi",
    travelHubText: "← Back to restaurants and services",
    accommodationsHref: "/en/accommodations",
    ctaTitle: "Book accommodation in Levi center",
    ctaButton: "View accommodations",
    readNext: {
      title: "Read Next",
      links: [
        { title: "Restaurants and Services", desc: "All services on one page", href: "/guide/restaurants-and-services-in-levi" },
        { title: "Levi With Children", desc: "Family-friendly restaurants", href: "/guide/levi-with-children" },
        { title: "Après Ski in Levi", desc: "Atmosphere after the slopes", href: "/guide/apres-ski-and-nightlife-in-levi" },
        { title: "Prices in Levi", desc: "What does it cost in Levi?", href: "/guide/prices-in-levi" },
      ],
    },
    priceGuide: {
      title: "Typical restaurant prices in Levi",
      note: "Prices are approximate and may vary by restaurant.",
      headers: { category: "Meal type", price: "Price range", details: "Details" },
      rows: [
        { category: "🥐 Breakfast", price: "10–20 €", details: "Buffet or à la carte, includes coffee" },
        { category: "🍽️ Lunch", price: "~15 €", details: "Incl. salad, bread, drink and buffet" },
        { category: "🍕 Pizza & burger", price: "15–25 €", details: "Casual dinner, takeaway available" },
        { category: "🥩 Fine dining", price: "25–60 €", details: "Set menu, steak or game, à la carte" },
      ],
    },
    restaurants: [
      {
        emoji: "🍜",
        name: "Restaurant Asia",
        subtitle: "Asian cuisine with a Lapland twist",
        description: [
          "Restaurant Asia brings a fresh and somewhat surprising option to Levi's restaurant scene. The menu features Asian-style dishes with a subtle Lapland touch.",
          "Even though Asian cuisine might not be the first thing that comes to mind in Levi, this restaurant is definitely worth adding to your list. The dishes are refined, flavourful and high quality – a perfect choice when you want a break from the traditional Lapland menu.",
        ],
        images: [
          { src: asiaWokki, alt: "Asian wok with sweet potato fries – Restaurant Asia, Levi" },
          { src: asiaPaistettuLiha, alt: "Asian fried meat – Restaurant Asia, Levi" },
          { src: asiaLohiWasabi, alt: "Pan-fried salmon with wasabi – Restaurant Asia, Levi" },
          { src: asiaGrillLohi, alt: "Grilled salmon with chili – Restaurant Asia, Levi" },
          { src: asiaTempura, alt: "Tempura shrimp with sweet potato fries – Restaurant Asia, Levi" },
          
          { src: asiaStickyPork, alt: "Sticky pork Asian style – Restaurant Asia, Levi" },
          { src: asiaTataki, alt: "Beef tataki – Restaurant Asia, Levi" },
        ],
      },
      {
        emoji: "🏡",
        name: "Ravintola Ämmilä",
        subtitle: "Traditional Lapland home cooking",
        description: [
          "Ämmilä means grandmother's house – and that is exactly how this restaurant feels. The warm, cosy atmosphere and authentic flavours make it one of the most beloved dining spots in Levi.",
          "The menu features classics like sautéed reindeer and quality fish dishes. If you want to experience traditional Lapland cuisine at its best, Ämmilä is a sure choice.",
        ],
        images: [
          { src: ammilaHampurilainen, alt: "Burger and fries – Ravintola Ämmilä, Levi" },
          { src: ammilaSiika, alt: "Pan-fried whitefish with vegetables – Ravintola Ämmilä, Levi" },
          { src: ammilaKaristys, alt: "Sautéed reindeer with mashed potatoes – Ravintola Ämmilä, Levi" },
          
          { src: ammilaMakkara, alt: "Sausage platter with potatoes – Ravintola Ämmilä, Levi" },
        ],
      },
      {
        emoji: "🦌",
        name: "Ravintola Niliporo",
        subtitle: "Local reindeer straight from the farm",
        description: [
          "Niliporo is a genuinely local reindeer restaurant where the ingredients come mainly from the restaurant's own farm. This shows in the quality and taste.",
          "The dishes are homely, honest and extremely delicious. The perfect place when you want to taste authentic Lapland reindeer food without compromises.",
        ],
        images: [
          { src: niliporoMakkara, alt: "Reindeer sausage with mashed potatoes – Ravintola Niliporo, Levi" },
          { src: niliporoLihapullat, alt: "Meatballs with mashed potatoes – Ravintola Niliporo, Levi" },
          { src: niliporoLihaLautanen, alt: "Meat and sausage platter – Ravintola Niliporo, Levi" },
          { src: niliporoMaksa, alt: "Reindeer liver with mashed potatoes – Ravintola Niliporo, Levi" },
          { src: niliporoHampurilainen, alt: "Reindeer burger and fries – Ravintola Niliporo, Levi" },
        ],
      },
      {
        emoji: "🌮",
        name: "Colorado Bar & Grill",
        subtitle: "Casual BBQ and Tex-Mex",
        description: [
          "Colorado offers a relaxed atmosphere and generous portions. The menu features BBQ ribs, fajitas, nachos and other Tex-Mex classics.",
          "An excellent choice when you crave hearty food and a slightly American vibe during your Levi holiday.",
        ],
        images: [
          { src: coloradoRibs, alt: "BBQ ribs on a board – Colorado Bar & Grill, Levi" },
          { src: coloradoFajitas, alt: "Chicken fajitas – Colorado Bar & Grill, Levi" },
          { src: coloradoFajitas2, alt: "Chicken fajitas with sides – Colorado Bar & Grill, Levi" },
          { src: coloradoNachotAsset.url, alt: "Nachos with guacamole – Colorado Bar & Grill, Levi" },
          { src: coloradoNyhtoliha, alt: "Pulled pork with jalapeño – Colorado Bar & Grill, Levi" },
        ],
      },
      {
        emoji: "🥞",
        name: "Pannukakkutalo",
        subtitle: "Levi classic – sweet and savoury",
        description: [
          "Pannukakkutalo is one of Levi's most famous restaurants. They serve large, impressive pancakes with both sweet and savoury toppings.",
          "The perfect place for indulgence – portions are generous and there are options for every taste.",
        ],
        images: [
          { src: pannukakkuMansikka, alt: "Pancake with strawberries and whipped cream – Pannukakkutalo, Levi" },
          { src: pannukakkuMustikka, alt: "Pancake with blueberries and ice cream – Pannukakkutalo, Levi" },
          { src: pannukakkuMarja, alt: "Pancake with mixed berries and whipped cream – Pannukakkutalo, Levi" },
        ],
      },
      {
        emoji: "🍽️",
        name: "Myllyn Äijä",
        subtitle: "Traditional and cosy",
        description: [
          "One of Levi's oldest restaurants, known for consistent quality and traditional flavours.",
          "The menu features schnitzels, sautéed reindeer and other familiar but exceptionally well-made dishes. The cosy atmosphere makes the experience especially pleasant.",
        ],
        images: [
          { src: myllynLeike, alt: "Schnitzel with mushroom sauce – Myllyn Äijä, Levi" },
          { src: myllynPihvi, alt: "Pepper steak with potato gratin – Myllyn Äijä, Levi" },
          
        ],
      },
      {
        emoji: "🍕",
        name: "Ravintola Renna",
        subtitle: "Thin-crust pizzas and pastas",
        description: [
          "Renna is one of Levi's most popular pizzerias. The pizzas are served on wooden boards with a pleasantly thin and crispy crust.",
          "They also offer quality pasta dishes and generous antipasto platters to start. An easy and reliable choice when you are in the mood for good pizza in the centre of Levi.",
        ],
        images: [
          { src: rennaPizza, alt: "Pizza prosciutto e rucola – Ravintola Renna, Levi" },
          { src: rennaPizza2, alt: "Pizza prosciutto rucola – Ravintola Renna, Levi" },
          { src: rennaPizza3, alt: "Pizza prosciutto rucola take-away – Ravintola Renna, Levi" },
          { src: rennaAnanasAsset.url, alt: "Thin-crust pizza with ham, blue cheese and pineapple – Pizzeria Renna, Levi" },
          { src: rennaMeloniAsset.url, alt: "Pizza with melon, rocket and pine nuts – Pizzeria Renna, Levi" },
          { src: rennaAntipastoAsset.url, alt: "Antipasto platter with salami, cheeses and olives – Pizzeria Renna, Levi" },
        ],
      },
      {
        emoji: "🥩",
        name: "Ravintola Salteriet",
        subtitle: "Generous portions after a day on the slopes",
        description: [
          "Salteriet is a small and characterful restaurant known especially for its generous portions and schnitzels.",
          "The perfect place after a long day on the slopes. The same restaurant also operates in the Turku archipelago during summer.",
        ],
        images: [
          { src: salterietLeike, alt: "Schnitzel with fries and remoulade – Salteriet, Levi" },
          { src: salterietLeike2, alt: "Schnitzel with fries and tzatziki – Salteriet, Levi" },
        ],
      },
      {
        emoji: "🍗",
        name: "Ravintola Hook",
        subtitle: "Wings and casual vibes",
        description: [
          "Hook is the right address for wing lovers. The menu is centred around various chicken wings and sauces.",
          "When you are in the mood for casual, quick and tasty food, Hook always delivers.",
        ],
        images: [
          { src: hookWings, alt: "Buffalo wings – Ravintola Hook, Levi" },
        ],
      },
      {
        emoji: "🔥",
        name: "Ravintola Pihvipirtti",
        subtitle: "A dining experience in Levi",
        description: [
          "Pihvipirtti offers a traditional and memorable steak dinner experience.",
          "The evening begins with a generous fish buffet, followed by a main course steak – options include reindeer, beef or pork, with various sauces and sides.",
          "The perfect choice when you want to enjoy a long and memorable dinner in a great atmosphere.",
        ],
        images: [
          { src: pihvipirttiKala, alt: "Fish buffet starters – Ravintola Pihvipirtti, Levi" },
        ],
      },
      {
        emoji: "🥩",
        name: "Grill it!",
        subtitle: "Steaks and grilled food in Levi centre",
        description: [
          "Grill it! is a steak restaurant in the centre of Levi, focused on grilled meat dishes and carefully made sauces.",
          "Steaks are served with a rich wild mushroom sauce or a classic green peppercorn sauce, with grilled vegetables and potato gratin on the side. To start, try snails in garlic butter or a velvety soup.",
          "A solid choice when you want a proper steak dinner in a relaxed, warm atmosphere right next to the centre's services.",
        ],
        images: [
          { src: grillItPihviPippuri.url, alt: "Grilled steak with green peppercorn sauce, broccolini and potato gratin – Grill it!, Levi" },
          { src: grillItPihviSieni.url, alt: "Grilled steak with wild mushroom sauce and brussels sprouts – Grill it!, Levi" },
          { src: grillItEtanat.url, alt: "Snails in garlic butter with grilled bread – Grill it!, Levi" },
          { src: grillItKeitto.url, alt: "Velvety soup with seeded crispbread – Grill it!, Levi" },
        ],
      },
      {
        emoji: "🦀",
        name: "King Crab House",
        subtitle: "Seafood in Levi's pedestrian centre",
        description: [
          "King Crab House specialises in seafood in the pedestrian centre of Levi. Its best-known speciality is king crab sourced from the northern Norwegian coast.",
          "Mussels and other seafood are also part of the experience. These photos show a seafood platter, a mussel dish, a crispy starter and a dessert – an option for a special dinner in Levi.",
        ],
        images: [
          { src: kingCrabPlatter.url, alt: "Seafood platter with mussels – King Crab House, Levi" },
          { src: kingCrabMussels.url, alt: "Mussels in a tomato-based broth – King Crab House, Levi" },
          { src: kingCrabStarter.url, alt: "Crispy starter served in a bowl – King Crab House, Levi" },
          { src: kingCrabDessert.url, alt: "Dessert in a dark bowl – King Crab House, Levi" },
        ],
      },
      {
        emoji: "🥩",
        name: "Stefan’s Steakhouse",
        subtitle: "A steak dinner in Levi",
        description: [
          "Stefan’s Steakhouse is a steak restaurant where meat dishes take centre stage. In these photos a steak is served with a sauce.",
          "The photos also show a carefully plated starter and a dessert. They offer a glimpse of the restaurant's style of presentation.",
        ],
        images: [
          { src: stefansSteak.url, alt: "Steak and sauce on a plate – Stefan’s Steakhouse, Levi" },
          { src: stefansStarter.url, alt: "Plated starter on a dark dish – Stefan’s Steakhouse, Levi" },
          { src: stefansDessert.url, alt: "Dessert with a scoop of ice cream – Stefan’s Steakhouse, Levi" },
        ],
      },
      {
        emoji: "🦌",
        name: "Ravintola Kammi",
        subtitle: "Traditional reindeer dinner served buffet-style",
        description: [
          "Kammi is a traditional reindeer restaurant in Levi. Dinner is served buffet-style, making it a place to enjoy Lapland flavours at an unhurried pace.",
          "The photo shows the restaurant's open fire and buffet setting – the atmosphere is part of the dinner experience at Kammi.",
        ],
        images: [
          { src: kammiBuffetAsset.url, alt: "Open fire and buffet setting – Ravintola Kammi, Levi" },
        ],
      },
    ],
  },
};

const LeviRestaurantGuide = ({ lang = "fi" }: LeviRestaurantGuideProps) => {
  const location = useLocation();
  const t = lang === "en" ? translations.en : translations.fi;
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);

  const hreflangUrls = {
    fi: "https://leville.net/opas/levin-ravintolat-ja-annokset",
    en: "https://leville.net/guide/levi-restaurants-and-dishes",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoMeta
        title={t.meta.title}
        description={t.meta.description}
        canonicalUrl={t.meta.canonical}
        lang={lang}
        ogType="article"
      />
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <HreflangTags currentPath={location.pathname} customUrls={hreflangUrls} />

      <Header />
      <SubpageBackground />

      <main className="container mx-auto px-4 py-10">
        <Breadcrumbs items={t.breadcrumbs} />

        <div className="mb-6">
          <Link to={t.travelHubLink} className="text-sm text-muted-foreground hover:text-primary">
            {t.travelHubText}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </header>

          <p className="mb-6 text-lg">{t.intro}</p>
          <InlineBookingLink variant="tip" intent="stayCentre" lang={lang} />
          <InlineBookingLink variant="tip" intent="directNoFees" lang={lang} />

          {/* Price Guide Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">💰 {t.priceGuide.title}</h2>
            <div className="rounded-xl border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">{t.priceGuide.headers.category}</TableHead>
                    <TableHead className="font-semibold text-right">{t.priceGuide.headers.price}</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">{t.priceGuide.headers.details}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.priceGuide.rows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.category}</TableCell>
                      <TableCell className="text-right text-primary font-semibold whitespace-nowrap">{row.price}</TableCell>
                      <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">{row.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">{t.priceGuide.note}</p>
          </section>

          {t.restaurants.map((restaurant, idx) => (
            <section key={idx} className="mb-16">
              <h2 className="text-2xl font-bold mb-1">
                <span className="mr-2">{restaurant.emoji}</span>
                {restaurant.name}
              </h2>
              <p className="text-primary font-medium mb-4">{restaurant.subtitle}</p>

              {restaurant.description.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-muted-foreground mb-3">{paragraph}</p>
              ))}

              <div className={`grid gap-3 mt-6 ${
                restaurant.images.length === 1
                  ? "grid-cols-1 max-w-md"
                  : restaurant.images.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
              }`}>
                {restaurant.images.map((img, imgIdx) => {
                  const isFirstImage = idx === 0 && imgIdx === 0;
                  return (
                    <div key={imgIdx} className="rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setLightbox({ images: restaurant.images, index: imgIdx })}
                        aria-label={img.alt}
                        className="group relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <OptimizedImage
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-48 sm:h-56 md:h-64"
                          priority={isFirstImage}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute top-2 right-2 rounded-full bg-black/50 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <GuideDisclaimer lang={lang} />

          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

        </div>
      </main>

      <PageCTA lang={lang} />
      <div className="container mx-auto px-4">
        <MajoitusCallout lang={lang} />
      </div>
      <Footer lang={lang} />
      <StickyBookingBar lang={lang} />

      {lightbox && (
        <ImageLightbox
          key={`${lightbox.images[0]?.src}-${lightbox.index}`}
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          lang={lang}
        />
      )}
    </div>
  );
};

export default LeviRestaurantGuide;
