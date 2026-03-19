import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import OptimizedImage from "@/components/OptimizedImage";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import ReadNextSection from "@/components/guide/ReadNextSection";
import { Language } from "@/translations";

// Restaurant Asia
import asiaWokki from "@/assets/restaurants/Aasialainen wokki bataattiranskalaisilla - Ravintola Asia.jpg?w=800&format=webp&quality=75";
import asiaPaistettuLiha from "@/assets/restaurants/Aasialainen paistettu liha - ravintola asia.jpg?w=800&format=webp&quality=75";
import asiaLohiWasabi from "@/assets/restaurants/Paistettu lohi wasabilla - Restaurant ASia.jpg?w=800&format=webp&quality=75";
import asiaGrillLohi from "@/assets/restaurants/Grillattu lohi chililla - restaurant asia.jpg?w=800&format=webp&quality=75";
import asiaTempura from "@/assets/restaurants/Tempurakatkaravut ja bataattiranskalaiset 2 - ravintola asia.jpg?w=800&format=webp&quality=75";

import asiaStickyPork from "@/assets/restaurants/Sticky pork aasialainen - Levi Ravintola ASia.jpg?w=800&format=webp&quality=75";
import asiaTataki from "@/assets/restaurants/Pihvi tataki - Asia ravintola.jpg?w=800&format=webp&quality=75";

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
import coloradoNachot from "@/assets/restaurants/Nachot guacamolella - Colorado Bar and Grill (Levi).jpg";
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

// Salteriet
import salterietLeike from "@/assets/restaurants/Leike ranskalaisilla ja remouladella - Levi Salteriet.jpg";
import salterietLeike2 from "@/assets/restaurants/Leike ranskalaisilla ja tzatzikilla - Salteriet Levi .jpg";

// Hook
import hookWings from "@/assets/restaurants/Buffalo wings - Ravintola Hook.jpeg";

// Pihvipirtti
import pihvipirttiKala from "@/assets/restaurants/kalapöytä alkupalat ravintola pihvipirtti.jpg";

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
}> = {
  fi: {
    meta: {
      title: "Levin ravintolat ja annokset – aidot ruokakuvat | Leville.net",
      description: "Tutustu Levin parhaimpiin ravintoloihin aitojen annoskuvien kautta. Restaurant Asia, Ämmilä, Niliporo, Colorado, Pannukakkutalo ja muut.",
      canonical: "https://leville.net/opas/levin-ravintolat-ja-annokset",
    },
    title: "Levin ravintolat ja annokset",
    subtitle: "Aitoja annoskuvia ja esittelyjä Levin ravintoloista",
    intro: "Tällä sivulla esittelemme kymmenen Levin ravintolaa aitojen annoskuvien kautta. Jokainen ravintola on erilainen – löydät aasialaista fuusiota, perinteistä poronkäristystä, texmex-herkkuja ja paljon muuta.",
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
        { title: "Après ski Levillä", desc: "Tunnelmaa rinteen jälkeen", href: "/opas/apres-ski-levilla" },
        { title: "Levin hinnat", desc: "Mitä maksaa Levillä?", href: "/opas/levin-hinnat" },
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
          { src: coloradoNachot, alt: "Nachot guacamolella – Colorado Bar & Grill, Levi" },
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
          "Lisäksi tarjolla on laadukkaita pasta-annoksia. Helppo ja varma valinta, kun tekee mieli hyvää pizzaa.",
        ],
        images: [
          { src: rennaPizza, alt: "Pizza prosciutto e rucola – Ravintola Renna, Levi" },
          { src: rennaPizza2, alt: "Pizza prosciutto rucola – Ravintola Renna, Levi" },
          { src: rennaPizza3, alt: "Pizza prosciutto rucola take-away – Ravintola Renna, Levi" },
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
    intro: "On this page we present ten Levi restaurants through real dish photos. Each restaurant is unique – you will find Asian fusion, traditional reindeer dishes, Tex-Mex treats and much more.",
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
        { title: "Après Ski in Levi", desc: "Atmosphere after the slopes", href: "/guide/apres-ski-in-levi" },
        { title: "Prices in Levi", desc: "What does it cost in Levi?", href: "/guide/prices-in-levi" },
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
          { src: coloradoNachot, alt: "Nachos with guacamole – Colorado Bar & Grill, Levi" },
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
          "They also offer quality pasta dishes. An easy and reliable choice when you are in the mood for good pizza.",
        ],
        images: [
          { src: rennaPizza, alt: "Pizza prosciutto e rucola – Ravintola Renna, Levi" },
          { src: rennaPizza2, alt: "Pizza prosciutto rucola – Ravintola Renna, Levi" },
          { src: rennaPizza3, alt: "Pizza prosciutto rucola take-away – Ravintola Renna, Levi" },
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
    ],
  },
};

const LeviRestaurantGuide = ({ lang = "fi" }: LeviRestaurantGuideProps) => {
  const location = useLocation();
  const t = lang === "en" ? translations.en : translations.fi;

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

          <p className="mb-12 text-lg">{t.intro}</p>

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
                {restaurant.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-48 sm:h-56 md:h-64"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          <GuideDisclaimer lang={lang} />

          <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

          <section className="text-center bg-card rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-3">{t.ctaTitle}</h3>
            <Link
              to={t.accommodationsHref}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              {t.ctaButton}
            </Link>
          </section>
        </div>
      </main>

      <PageCTA lang={lang} />
      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default LeviRestaurantGuide;
