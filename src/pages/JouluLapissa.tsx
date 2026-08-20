import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Snowflake,
  Gift,
  Star,
  TreePine,
  Sparkles,
  Heart,
  Camera,
  Moon,
  Bell,
  UtensilsCrossed,
  Utensils,
  Mountain,
  Music,
  Calendar,
  Thermometer,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import ReadNextSection from "@/components/guide/ReadNextSection";
import OptimizedImage from "@/components/OptimizedImage";
import santaSitting from "@/assets/santa-sitting.jpg";
import santaWaving from "@/assets/santa-waving.png";
import santaCabin from "@/assets/santa-cabin.webp";
import christmasCozy from "@/assets/christmas-cozy.png";
import christmasMarket from "@/assets/seasons/christmas-market.jpg";
import christmasGrilling from "@/assets/seasons/christmas-grilling.jpg";

interface JouluLapissakProps {
  lang?: Language;
}

const translations: Record<Language, {
  meta: { title: string; description: string; keywords: string; canonical: string };
  title: string;
  subtitle: string;
  intro: string;
  experiencesTitle: string;
  experiences: { title: string; description: string; icon: string }[];
  whyTitle: string;
  whyPoints: string[];
  tipsTitle: string;
  tips: { title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  backToLevi: string;
  linksTitle: string;
  santaHome: string;
  didYouKnow: string;
  didYouKnowText: string;
  longContent?: {
    sections: { id: string; icon: string; heading: string; paragraphs: string[]; bullets?: string[] }[];
    faq: { q: string; a: string }[];
  };
}> = {
  fi: {
    meta: {
      title: "Joulu Levillä 2026 – Tapahtumat, illalliset ja joulumajoitus",
      description: "Täydellinen opas jouluun Levillä: joulumarkkinat, jouluillalliset, Joulupukin mökki, rinteet, revontulet ja joulumajoitus. Varaa ajoissa!",
      keywords: "joulu Levillä, joulumarkkinat Levi, jouluillallinen Levi, Joulupukki Levi, joulumajoitus Levi",
      canonical: "https://leville.net/levi/joulu-lapissa"
    },
    title: "Joulu Levillä – Täydellinen opas Lapin jouluun",
    subtitle: "Koe taianmainen joulu lumisessa Lapissa – joulupukin kotimaassa",
    intro: "Lappi on joulun synnyinpaikka, ja Levi tarjoaa täydellisen miljöön unohtumattomaan joulukokemukseen. Luminen maisema, revontulet, porot ja joulupukin läheisyys tekevät Levin joulusta ainutlaatuisen.",
    experiencesTitle: "Jouluiset elämykset Levillä",
    experiences: [
      { title: "Joulupukin tapaaminen", description: "Tapaa aito joulupukki Levin alueella. Lapset ja aikuiset pääsevät keskustelemaan joulupukin kanssa ja ottamaan kuvia tonttujen seurassa.", icon: "gift" },
      { title: "Poroajelut", description: "Perinteinen poroajelu lumisessa maisemassa on unohtumaton kokemus. Porot kuljettavat sinut hiljaisuuden keskelle Lapin luontoon.", icon: "star" },
      { title: "Revontulet", description: "Joulukuun pimeät yöt ovat erinomaista aikaa revontulten ihailuun. Aurora Borealis tuo taianomaisen lisän jouluun.", icon: "moon" },
      { title: "Huskyajelut", description: "Huskyvaljakkoajelut tarjoavat vauhdin ja seikkailun Lapin metsiin. Koirat vetävät sinut lumisen maiseman halki.", icon: "sparkles" },
      { title: "Joulusaunat", description: "Suomalainen sauna kuuluu jouluun. Majoituksissamme on omat saunat, joissa voit rentoutua joulupyhien aikana.", icon: "heart" },
      { title: "Talviaktiviteetit", description: "Laskettelu, hiihto, lumikenkailu ja moottorikelkkailu – Levillä on tekemistä koko perheelle joulunakin.", icon: "snowflake" }
    ],
    whyTitle: "Miksi viettää joulu Levillä?",
    whyPoints: [
      "Taattu lumi – Levillä on aina valkoinen joulu",
      "Joulupukin kotimaa – aitojen joulutraditioiden äärellä",
      "Revontulet – maaginen valoshow taivaalla",
      "Rauhallinen tunnelma – irti arjen kiireistä",
      "Aktiviteetteja kaikenikäisille – laskettelu, hiihto, porosafarit",
      "Laadukkaat majoitukset – kodikas jouluasunto Levin sydämessä"
    ],
    tipsTitle: "Vinkkejä joulun viettoon",
    tips: [
      { title: "Varaa ajoissa", text: "Joulusesonki on erittäin kysytty. Varaa majoitus vähintään 6–12 kuukautta etukäteen." },
      { title: "Pakkaa lämpimästi", text: "Joulukuussa lämpötila voi laskea jopa -35°C. Kerrokselliset vaatteet, villa-alusasu ja hyvät talvikengät ovat välttämättömät." },
      { title: "Varaudu pimeyteen", text: "Joulun aikaan päivä on lyhyt, mutta pimeys tuo esiin revontulet ja jouluvalot." }
    ],
    ctaTitle: "Varaa joulumajoituksesi",
    ctaText: "Joulukuu 2026 on nyt avattu myyntiin. Varaa ajoissa ja varmista unelmiesi joulukohde Levillä!",
    ctaButton: "Tutustu majoituksiin",
    backToLevi: "Takaisin Levi-sivulle",
    linksTitle: "Hyödyllisiä linkkejä",
    santaHome: "Joulupukin kotimaa",
    didYouKnow: "Tiesitkö?",
    didYouKnowText: "Joulupukin mökki löytyy Levin rinteiltä! Pääset sinne Levi Black gondolihissillä ja se on jännittävä retki koko perheelle.",
    longContent: {
      sections: [
        {
          id: "markkinat",
          icon: "calendar",
          heading: "Levin joulumarkkinat",
          paragraphs: [
            "Levin joulumarkkinat kokoavat paikalliset käsityöläiset, poronlihatuottajat ja jouluista tunnelmaa keskustaan pitkin joulukuuta. Löydät lahjaideoita, käsintehtyjä koruja, villavaatteita ja lämmintä glögiä. Markkinatunnelmaa kruunaavat nuotiopaikat ja paikallisten esiintyjien iltatapahtumat.",
            "Tarkat päivämäärät ja aukioloajat kannattaa varmistaa Levin virallisesta tapahtumakalenterista.",
          ],
          bullets: [
            "Sijainti: Levin keskusta, Zero Point -alue",
            "Ajankohta: joulukuun päävikonloput ennen joulua",
            "Vapaa pääsy",
          ],
        },
        {
          id: "illalliset",
          icon: "utensils",
          heading: "Jouluillalliset ja perinteinen joulupöytä",
          paragraphs: [
            "Levin ravintolat tarjoavat jouluaattona ja joulupäivinä perinteisiä joulupöytiä sekä à la carte -menuja. Suosituimmat paikat, kuten Hullu Poro, Ravintola Sokka ja Tunturialpit, täyttyvät nopeasti — varaa pöytä hyvissä ajoin. Perinteiseen joulupöytään kuuluvat kinkku, laatikot, rosolli ja glögi.",
            "Jos haluat viettää jouluaaton omassa mökissä, monet paikalliset catering-yritykset toimittavat valmiin joulupöydän suoraan majoitukseesi. Katso ravintolatarjonta myös oppaastamme.",
          ],
          bullets: [
            "Varaa jouluillallinen 2–3 kuukautta etukäteen",
            "Catering-toimitukset yleensä 22.–24.12.",
            "Ilmoita erityisruokavaliot varauksen yhteydessä",
          ],
        },
        {
          id: "joulupukki",
          icon: "gift",
          heading: "Joulupukki Levillä – Tonttula ja Joulumaailma",
          paragraphs: [
            "Joulupukin voi tavata Levillä useassa paikassa. Elves' Village Tonttula on keskustan lähellä toimiva elämyskylä, jossa lapset kohtaavat pukin ja tontut sekä ruokkivat poroja. Joulumaailma Levi Summit -alueella tarjoaa opastettuja ohjelmia ja joulupukin haastatteluja.",
            "Yksityisiä pukkitilauksia mökille voi varata paikallisilta ohjelmapalveluyrityksiltä — suosittu vaihtoehto ryhmille ja lapsiperheille.",
          ],
          bullets: [
            "Elves' Village Tonttula — päivittäin joulukuussa",
            "Joulupukin postitoimisto — postita kirje pukille",
            "Varaa pukkivierailu mökille etukäteen",
          ],
        },
        {
          id: "rinteet",
          icon: "mountain",
          heading: "Joulurinteet ja talviurheilu",
          paragraphs: [
            "Levin rinteet ovat auki koko joulusesongin: 43 rinnettä, 28 hissiä ja pisin lasku 2,5 km. Jouluaattona hissit pyörivät lyhennetyillä ajoilla ja avautuvat taas normaalisti joulupäivänä. Latuverkosto on 230 km, josta lähes 30 km on valaistuja latuja.",
            "Hiihtokoulut ja välinevuokraamot ovat auki, mutta jouluaaton aukioloajat ovat rajoitetut. Osta hissiliput ennakkoon verkosta säästääksesi aikaa.",
          ],
        },
        {
          id: "revontulet",
          icon: "sparkles",
          heading: "Revontulet jouluaikaan",
          paragraphs: [
            "Joulukuu on Lapin pimeintä aikaa — auringonlaskun jälkeen taivas voi loistaa revontulista aina aamuyöhön. Levin ympäristössä on lukuisia tummia paikkoja, joissa valosaaste on minimissään, esimerkiksi Immeljärven ranta ja Kätkä-tunturin ympäristö.",
            "Seuraa revontuliennustetta ja lähde ulos, kun KP-indeksi on 3 tai suurempi ja taivas on kirkas.",
          ],
        },
        {
          id: "sauna",
          icon: "home",
          heading: "Joulusauna ja wellness",
          paragraphs: [
            "Suomalainen jouluperinne huipentuu jouluaaton saunahetkeen. Kaikissa Leville.net-majoituksissa on oma sauna, ja monissa myös takka. Nauti hiljaisuudesta, kynttilänvalosta ja perinteisistä jouluherkuista löylyjen jälkeen.",
            "Jos etsit julkista saunaelämystä, Levillä on savusaunoja, tynnyrisaunoja järven rannalla ja hotellisaunoja avantouintimahdollisuudella.",
          ],
          bullets: [
            "Oma sauna kaikissa majoituksissamme",
            "Avantouinti läheisellä Immeljärvellä",
            "Savusauna- ja poroteemasaunaelämyksiä ohjelmapalveluilta",
          ],
        },
        {
          id: "joulurauha",
          icon: "music",
          heading: "Joulurauhan julistus",
          paragraphs: [
            "Joulurauha julistetaan Suomessa jouluaattona kello 12. Voit seurata TV-lähetystä perheen kanssa mökillä tai osallistua Levin kappelin jouluhartauteen ja jouluaaton messuun. Tapahtuma tuo hiljaisen hetken keskelle joulupäivän valmisteluja.",
          ],
        },
        {
          id: "vinkit",
          icon: "thermometer",
          heading: "Käytännön vinkit joululomalle Levillä",
          paragraphs: [
            "Pukeutuminen: joulukuussa lämpötila voi laskea alle –30 °C. Käytä kerroksia, villaa iholla ja tuulta pitävää päällyskerrosta. Kittilän lentokentältä Leville pääsee bussilla, taksilla tai vuokra-autolla — matkaa on n. 15 km ja aikaa kuluu noin 20 minuuttia.",
            "Hinnat nousevat sesonkiaikaan: majoitus, ohjelmapalvelut ja ravintolat kannattaa varata heti kun päivämäärät ovat selvät. Ruokakaupat sulkevat jouluaattona jo iltapäivällä — täydennä kaappi ajoissa.",
          ],
          bullets: [
            "Matka Kittilän lentokentältä Leville: n. 20 min",
            "Ruokakaupat auki jouluaattona n. klo 15 asti",
            "Osta hissiliput ja ohjelmat ennakkoon",
          ],
        },
      ],
      faq: [
        { q: "Milloin Levin joulumarkkinat pidetään?", a: "Joulumarkkinat järjestetään Levin keskustassa pitkin joulukuuta, pääviikonloppuina ennen joulua. Tarkista tarkat päivämäärät Levin virallisesta tapahtumakalenterista." },
        { q: "Ovatko rinteet auki jouluaattona?", a: "Kyllä, Levin rinteet ovat auki jouluaattona lyhennetyllä aukioloajalla, tyypillisesti aamupäivällä. Joulupäivänä ja tapaninpäivänä hissit ovat auki normaalisti." },
        { q: "Missä tapaan joulupukin Levillä?", a: "Elves' Village Tonttulassa lähellä keskustaa sekä Joulumaailmassa Levi Summit -alueella. Yksityisiä pukkitilauksia mökille voi varata paikallisilta ohjelmapalveluyrityksiltä." },
        { q: "Näenkö revontulia jouluna?", a: "Joulukuu on hyvää revontuliaikaa. Selkeinä ja pilvettöminä öinä revontulien näkeminen on todennäköistä, kun KP-indeksi on 3 tai korkeampi." },
        { q: "Kuinka aikaisin joulumajoitus kannattaa varata?", a: "Suositut joulupäivämäärät (23.–27.12.) myydään usein loppuun 6–12 kuukautta etukäteen. Varaa heti kun tiedät päivämäärät." },
        { q: "Miten pääsen Kittilän lentokentältä Leville?", a: "Kittilän lentokentältä Leville on noin 15 km. Voit tulla lentokenttäbussilla, taksilla tai vuokra-autolla, matka kestää noin 20 minuuttia." },
      ],
    },
  },
  en: {
    meta: {
      title: "Christmas in Levi 2026 – Events, Dinners & Holiday Guide",
      description: "Complete guide to Christmas in Levi, Finnish Lapland: Christmas market, dinners, Santa Claus, slopes, northern lights and holiday accommodation.",
      keywords: "Christmas in Levi, Christmas market Levi, Christmas dinner Levi, Santa Claus Levi, Christmas accommodation Levi",
      canonical: "https://leville.net/en/levi/christmas-in-lapland"
    },
    title: "Christmas in Levi – The Complete Guide to Lapland Christmas",
    subtitle: "Experience a magical Christmas in snowy Lapland – the home of Santa Claus",
    intro: "Lapland is the birthplace of Christmas, and Levi offers the perfect setting for an unforgettable Christmas experience. Snowy landscapes, northern lights, reindeer and the proximity of Santa Claus make Christmas in Levi truly unique.",
    experiencesTitle: "Christmas Experiences in Levi",
    experiences: [
      { title: "Meeting Santa Claus", description: "Meet the real Santa Claus in the Levi area. Children and adults can chat with Santa and take photos with his elves.", icon: "gift" },
      { title: "Reindeer Safaris", description: "A traditional reindeer ride through snowy landscapes is an unforgettable experience. Reindeer will take you into the peaceful Lapland nature.", icon: "star" },
      { title: "Northern Lights", description: "The dark nights of December are excellent for viewing the northern lights. Aurora Borealis adds a magical touch to Christmas.", icon: "moon" },
      { title: "Husky Safaris", description: "Husky sled rides offer speed and adventure into Lapland forests. Dogs pull you through the snowy landscape.", icon: "sparkles" },
      { title: "Christmas Saunas", description: "Finnish sauna is part of Christmas tradition. Our accommodations have private saunas where you can relax during the holidays.", icon: "heart" },
      { title: "Winter Activities", description: "Skiing, cross-country skiing, snowshoeing and snowmobiling – Levi has activities for the whole family even at Christmas.", icon: "snowflake" }
    ],
    whyTitle: "Why Spend Christmas in Levi?",
    whyPoints: [
      "Guaranteed snow – Levi always has a white Christmas",
      "Santa's homeland – authentic Christmas traditions",
      "Northern lights – magical light show in the sky",
      "Peaceful atmosphere – escape from everyday stress",
      "Activities for all ages – skiing, reindeer safaris, snowmobiling",
      "Quality accommodations – cozy Christmas apartment in Levi center"
    ],
    tipsTitle: "Tips for Your Christmas Visit",
    tips: [
      { title: "Book Early", text: "Christmas season is extremely popular. Book accommodation at least 6–12 months in advance." },
      { title: "Pack Warmly", text: "In December temperatures can drop to -35°C. Layered clothing, wool base layers and good winter boots are essential." },
      { title: "Embrace the Darkness", text: "During Christmas, daylight is short, but darkness reveals the northern lights and beautiful Christmas decorations." }
    ],
    ctaTitle: "Book Your Christmas Accommodation",
    ctaText: "December 2026 is now open for bookings. Book early and secure your dream Christmas destination in Levi!",
    ctaButton: "Browse accommodations",
    backToLevi: "Back to Levi page",
    linksTitle: "Useful Links",
    santaHome: "The home of Santa Claus",
    didYouKnow: "Did you know?",
    didYouKnowText: "Santa's cabin is located on the slopes of Levi! You can reach it by the Levi Black gondola lift – it's an exciting adventure for the whole family.",
    longContent: {
      sections: [
        {
          id: "markkinat",
          icon: "calendar",
          heading: "Levi Christmas Market",
          paragraphs: [
            "The Levi Christmas market brings local artisans, reindeer-meat producers and festive atmosphere to the village centre throughout December. You'll find handmade jewellery, woollens, gift ideas and warm glögi (mulled wine). Campfires and local performers set the evening mood.",
            "Check exact dates and opening hours from Levi's official events calendar.",
          ],
          bullets: [
            "Location: Levi centre, Zero Point area",
            "Timing: December weekends before Christmas",
            "Free entry",
          ],
        },
        {
          id: "illalliset",
          icon: "utensils",
          heading: "Christmas Dinners & the Finnish Christmas Table",
          paragraphs: [
            "Levi restaurants serve traditional Finnish Christmas menus (joulupöytä) and à la carte options on Christmas Eve and Christmas Day. Popular venues such as Hullu Poro, Restaurant Sokka and Tunturialpit fill quickly — reserve well in advance. The traditional table features ham, root-vegetable casseroles, rosolli salad and glögi.",
            "Prefer to celebrate at your apartment? Local caterers deliver a ready Christmas table straight to your accommodation.",
          ],
          bullets: [
            "Book Christmas dinner 2–3 months in advance",
            "Catering deliveries typically 22–24 December",
            "Mention dietary requirements when booking",
          ],
        },
        {
          id: "joulupukki",
          icon: "gift",
          heading: "Santa Claus in Levi – Elves' Village & Christmas World",
          paragraphs: [
            "You can meet Santa Claus in several places in Levi. Elves' Village (Tonttula) near the centre is an experience village where children meet Santa and his elves and feed reindeer. Christmas World at Levi Summit offers guided programmes and Santa audiences.",
            "Private Santa visits to your cabin can be booked from local activity operators — a favourite for groups and families.",
          ],
          bullets: [
            "Elves' Village Tonttula — daily in December",
            "Santa's Post Office — send a letter to Santa",
            "Book a private Santa visit in advance",
          ],
        },
        {
          id: "rinteet",
          icon: "mountain",
          heading: "Christmas Slopes & Winter Sports",
          paragraphs: [
            "Levi's slopes are open throughout the Christmas season: 43 slopes, 28 lifts and a longest run of 2.5 km. Lifts run on shortened hours on Christmas Eve and return to normal on Christmas Day. The cross-country network is 230 km, of which nearly 30 km is lit.",
            "Ski schools and equipment rentals are open, though Christmas Eve hours are limited. Buy lift passes online in advance to save time.",
          ],
        },
        {
          id: "revontulet",
          icon: "sparkles",
          heading: "Northern Lights at Christmas",
          paragraphs: [
            "December is Lapland's darkest month — after sunset the sky can glow with aurora late into the night. Several dark spots around Levi minimise light pollution, such as the shores of Lake Immel and the surroundings of Kätkä fell.",
            "Follow the aurora forecast and head out when the KP index is 3 or higher and the sky is clear.",
          ],
        },
        {
          id: "sauna",
          icon: "home",
          heading: "Christmas Sauna & Wellness",
          paragraphs: [
            "The Finnish Christmas tradition culminates in the Christmas Eve sauna. Every Leville.net apartment has its own sauna, and many also have a fireplace. Enjoy silence, candlelight and traditional Christmas treats after your löyly.",
            "For a public sauna experience, Levi offers smoke saunas, lakeside barrel saunas and hotel saunas with ice-swimming access.",
          ],
          bullets: [
            "Private sauna in every apartment",
            "Ice swimming at nearby Lake Immel",
            "Smoke-sauna and reindeer-themed sauna experiences",
          ],
        },
        {
          id: "joulurauha",
          icon: "music",
          heading: "The Declaration of Christmas Peace",
          paragraphs: [
            "The Declaration of Christmas Peace is broadcast in Finland at noon on Christmas Eve. Watch the TV broadcast with your family in the cabin, or attend the Christmas Eve service at Levi Chapel — a quiet, meaningful moment amid the holiday preparations.",
          ],
        },
        {
          id: "vinkit",
          icon: "thermometer",
          heading: "Practical Tips for a Christmas Holiday in Levi",
          paragraphs: [
            "Clothing: December temperatures can drop below –30 °C. Wear layers, wool base layers and a windproof outer shell. From Kittilä Airport to Levi is about 15 km — reachable by airport bus, taxi or rental car, roughly a 20-minute drive.",
            "Prices rise in peak season: accommodation, activities and restaurants should be booked as soon as your dates are fixed. Grocery shops close early on Christmas Eve — stock up in advance.",
          ],
          bullets: [
            "Kittilä Airport to Levi: about 20 minutes",
            "Grocery shops open until about 15:00 on Christmas Eve",
            "Buy lift passes and activities in advance",
          ],
        },
      ],
      faq: [
        { q: "When is the Levi Christmas market held?", a: "The Christmas market runs throughout December in Levi centre, with main weekends before Christmas. Check exact dates from Levi's official events calendar." },
        { q: "Are the slopes open on Christmas Eve?", a: "Yes, Levi's slopes are open on Christmas Eve with shortened hours, typically in the morning. Christmas Day and Boxing Day operate on normal hours." },
        { q: "Where can I meet Santa Claus in Levi?", a: "At Elves' Village Tonttula near the centre, and at Christmas World at Levi Summit. Private Santa visits to your cabin can be booked from local activity operators." },
        { q: "Can I see the northern lights at Christmas?", a: "December is a great aurora period. On clear, cloudless nights the northern lights are likely when the KP index is 3 or higher." },
        { q: "How early should I book Christmas accommodation?", a: "Popular Christmas dates (23–27 December) often sell out 6–12 months in advance. Book as soon as your dates are fixed." },
        { q: "How do I get from Kittilä Airport to Levi?", a: "Kittilä Airport is about 15 km from Levi. You can travel by airport bus, taxi or rental car — the trip takes about 20 minutes." },
      ],
    },
  },
  sv: {
    meta: {
      title: "Jul i Lappland – Magisk julupplevelse i Levi | Leville.net",
      description: "Upplev en unik jul i Lappland! Jultomten, norrsken, renar och snöiga vinterlandskap. Boka ditt julboende i Levi i god tid.",
      keywords: "jul i Lappland, jul Levi, Levi jultomten, Lappland julsemester, jul Finland",
      canonical: "https://leville.net/sv/levi/jul-i-lappland"
    },
    title: "Jul i Lappland",
    subtitle: "Upplev en magisk jul i snöiga Lappland – jultomtens hemland",
    intro: "Lappland är julens födelseplats, och Levi erbjuder den perfekta miljön för en oförglömlig julupplevelse. Snöiga landskap, norrsken, renar och närheten till jultomten gör julen i Levi verkligt unik.",
    experiencesTitle: "Julupplevelser i Levi",
    experiences: [
      { title: "Möt jultomten", description: "Möt den riktiga jultomten i Levi-området. Barn och vuxna kan prata med tomten och ta bilder med hans tomtenissar.", icon: "gift" },
      { title: "Rensafari", description: "En traditionell renfärd genom snöiga landskap är en oförglömlig upplevelse. Renarna tar dig in i den fridfulla lappländska naturen.", icon: "star" },
      { title: "Norrsken", description: "Decembers mörka nätter är utmärkta för att se norrsken. Aurora Borealis ger julen en magisk touch.", icon: "moon" },
      { title: "Huskysafari", description: "Hundspannsåkning erbjuder fart och äventyr in i Lapplands skogar. Hundarna drar dig genom det snöiga landskapet.", icon: "sparkles" },
      { title: "Julbastun", description: "Finsk bastu är en del av jultraditionen. Våra boenden har privata bastur där du kan koppla av under helgerna.", icon: "heart" },
      { title: "Vinteraktiviteter", description: "Skidåkning, längdskidåkning, snöskovandring och snöskoter – Levi har aktiviteter för hela familjen även under julen.", icon: "snowflake" }
    ],
    whyTitle: "Varför fira jul i Levi?",
    whyPoints: [
      "Garanterad snö – Levi har alltid en vit jul",
      "Jultomtens hemland – äkta jultraditioner",
      "Norrsken – magiskt ljusspel på himlen",
      "Fridfull atmosfär – bort från vardagens stress",
      "Aktiviteter för alla åldrar – skidåkning, rensafari, snöskoter",
      "Kvalitetsboenden – mysig jullägenhet i Levi centrum"
    ],
    tipsTitle: "Tips för ditt julbesök",
    tips: [
      { title: "Boka tidigt", text: "Julsäsongen är extremt populär. Boka boende minst 6–12 månader i förväg." },
      { title: "Packa varmt", text: "I december kan temperaturen sjunka till -35°C. Lagerkläder, ullunderkläder och bra vinterstövlar är nödvändiga." },
      { title: "Omfamna mörkret", text: "Under julen är dagljuset kort, men mörkret avslöjar norrskenet och vackra juldekorationer." }
    ],
    ctaTitle: "Boka ditt julboende",
    ctaText: "December 2026 är nu öppet för bokningar. Boka tidigt och säkra din drömjuldestination i Levi!",
    ctaButton: "Se boenden",
    backToLevi: "Tillbaka till Levi-sidan",
    linksTitle: "Användbara länkar",
    santaHome: "Jultomtens hemland",
    didYouKnow: "Visste du?",
    didYouKnowText: "Jultomtens stuga ligger på Levis backar! Du kan nå den med Levi Black gondolliften – det är ett spännande äventyr för hela familjen."
  },
  de: {
    meta: {
      title: "Weihnachten in Lappland – Magisches Weihnachtserlebnis in Levi | Leville.net",
      description: "Erleben Sie ein einzigartiges Weihnachten in Lappland! Weihnachtsmann, Nordlichter, Rentiere und verschneite Winterlandschaften. Buchen Sie Ihre Levi-Weihnachtsunterkunft frühzeitig.",
      keywords: "Weihnachten in Lappland, Weihnachten Levi, Levi Weihnachtsmann, Lappland Weihnachtsurlaub, Weihnachten Finnland",
      canonical: "https://leville.net/de/levi/weihnachten-in-lappland"
    },
    title: "Weihnachten in Lappland",
    subtitle: "Erleben Sie ein magisches Weihnachten im verschneiten Lappland – der Heimat des Weihnachtsmanns",
    intro: "Lappland ist der Geburtsort von Weihnachten, und Levi bietet die perfekte Kulisse für ein unvergessliches Weihnachtserlebnis. Verschneite Landschaften, Nordlichter, Rentiere und die Nähe zum Weihnachtsmann machen Weihnachten in Levi wirklich einzigartig.",
    experiencesTitle: "Weihnachtserlebnisse in Levi",
    experiences: [
      { title: "Den Weihnachtsmann treffen", description: "Treffen Sie den echten Weihnachtsmann in der Levi-Region. Kinder und Erwachsene können mit dem Weihnachtsmann plaudern und Fotos mit seinen Elfen machen.", icon: "gift" },
      { title: "Rentier-Safaris", description: "Eine traditionelle Rentierfahrt durch verschneite Landschaften ist ein unvergessliches Erlebnis. Rentiere bringen Sie in die friedliche lappländische Natur.", icon: "star" },
      { title: "Nordlichter", description: "Die dunklen Dezembernächte eignen sich hervorragend zur Beobachtung von Nordlichtern. Aurora Borealis verleiht Weihnachten eine magische Note.", icon: "moon" },
      { title: "Husky-Safaris", description: "Hundeschlittenfahrten bieten Tempo und Abenteuer in den lappländischen Wäldern. Die Hunde ziehen Sie durch die verschneite Landschaft.", icon: "sparkles" },
      { title: "Weihnachtssauna", description: "Die finnische Sauna gehört zur Weihnachtstradition. Unsere Unterkünfte haben private Saunen, in denen Sie während der Feiertage entspannen können.", icon: "heart" },
      { title: "Winteraktivitäten", description: "Skifahren, Langlauf, Schneeschuhwandern und Schneemobilfahren – Levi hat auch zu Weihnachten Aktivitäten für die ganze Familie.", icon: "snowflake" }
    ],
    whyTitle: "Warum Weihnachten in Levi verbringen?",
    whyPoints: [
      "Garantierter Schnee – Levi hat immer weiße Weihnachten",
      "Heimat des Weihnachtsmanns – authentische Weihnachtstraditionen",
      "Nordlichter – magische Lichtshow am Himmel",
      "Friedliche Atmosphäre – Flucht aus dem Alltagsstress",
      "Aktivitäten für alle Altersgruppen – Skifahren, Rentier-Safaris, Schneemobil",
      "Qualitätsunterkünfte – gemütliche Weihnachtswohnung im Zentrum von Levi"
    ],
    tipsTitle: "Tipps für Ihren Weihnachtsbesuch",
    tips: [
      { title: "Früh buchen", text: "Die Weihnachtssaison ist extrem beliebt. Buchen Sie Ihre Unterkunft mindestens 6–12 Monate im Voraus." },
      { title: "Warm einpacken", text: "Im Dezember können die Temperaturen auf -35°C sinken. Schichtkleidung, Wollunterwäsche und gute Winterstiefel sind unerlässlich." },
      { title: "Die Dunkelheit genießen", text: "Zu Weihnachten ist das Tageslicht kurz, aber die Dunkelheit enthüllt die Nordlichter und schöne Weihnachtsdekorationen." }
    ],
    ctaTitle: "Buchen Sie Ihre Weihnachtsunterkunft",
    ctaText: "Dezember 2026 ist jetzt buchbar. Buchen Sie frühzeitig und sichern Sie sich Ihr Traumweihnachtsziel in Levi!",
    ctaButton: "Unterkünfte ansehen",
    backToLevi: "Zurück zur Levi-Seite",
    linksTitle: "Nützliche Links",
    santaHome: "Die Heimat des Weihnachtsmanns",
    didYouKnow: "Wussten Sie?",
    didYouKnowText: "Die Hütte des Weihnachtsmanns befindet sich an den Hängen von Levi! Sie erreichen sie mit der Levi Black Gondelbahn – ein aufregendes Abenteuer für die ganze Familie."
  },
  es: {
    meta: {
      title: "Navidad en Laponia – Experiencia navideña mágica en Levi | Leville.net",
      description: "¡Vive una Navidad única en Laponia! Papá Noel, auroras boreales, renos y paisajes invernales nevados. Reserva tu alojamiento navideño en Levi con antelación.",
      keywords: "Navidad en Laponia, Navidad Levi, Levi Papá Noel, vacaciones Navidad Laponia, Navidad Finlandia",
      canonical: "https://leville.net/es/levi/navidad-en-laponia"
    },
    title: "Navidad en Laponia",
    subtitle: "Vive una Navidad mágica en la nevada Laponia – el hogar de Papá Noel",
    intro: "Laponia es la cuna de la Navidad, y Levi ofrece el escenario perfecto para una experiencia navideña inolvidable. Paisajes nevados, auroras boreales, renos y la cercanía de Papá Noel hacen que la Navidad en Levi sea verdaderamente única.",
    experiencesTitle: "Experiencias navideñas en Levi",
    experiences: [
      { title: "Conocer a Papá Noel", description: "Conoce al auténtico Papá Noel en la zona de Levi. Niños y adultos pueden charlar con Papá Noel y hacerse fotos con sus elfos.", icon: "gift" },
      { title: "Safari de renos", description: "Un paseo tradicional en reno por paisajes nevados es una experiencia inolvidable. Los renos te llevarán a la pacífica naturaleza lapona.", icon: "star" },
      { title: "Auroras boreales", description: "Las noches oscuras de diciembre son excelentes para ver auroras boreales. Aurora Borealis añade un toque mágico a la Navidad.", icon: "moon" },
      { title: "Safari de huskies", description: "Los paseos en trineo de huskies ofrecen velocidad y aventura en los bosques de Laponia. Los perros te arrastran por el paisaje nevado.", icon: "sparkles" },
      { title: "Saunas navideñas", description: "La sauna finlandesa forma parte de la tradición navideña. Nuestros alojamientos tienen saunas privadas donde puedes relajarte durante las fiestas.", icon: "heart" },
      { title: "Actividades de invierno", description: "Esquí, esquí de fondo, raquetas de nieve y moto de nieve – Levi tiene actividades para toda la familia incluso en Navidad.", icon: "snowflake" }
    ],
    whyTitle: "¿Por qué pasar la Navidad en Levi?",
    whyPoints: [
      "Nieve garantizada – Levi siempre tiene Navidad blanca",
      "El hogar de Papá Noel – tradiciones navideñas auténticas",
      "Auroras boreales – espectáculo de luces mágico en el cielo",
      "Atmósfera tranquila – escapar del estrés cotidiano",
      "Actividades para todas las edades – esquí, safari de renos, moto de nieve",
      "Alojamientos de calidad – acogedor apartamento navideño en el centro de Levi"
    ],
    tipsTitle: "Consejos para tu visita navideña",
    tips: [
      { title: "Reserva con antelación", text: "La temporada navideña es extremadamente popular. Reserva alojamiento con al menos 6–12 meses de antelación." },
      { title: "Abrígate bien", text: "En diciembre las temperaturas pueden bajar hasta -35°C. Ropa en capas, ropa interior de lana y buenas botas de invierno son esenciales." },
      { title: "Abraza la oscuridad", text: "Durante la Navidad, la luz del día es corta, pero la oscuridad revela las auroras boreales y las hermosas decoraciones navideñas." }
    ],
    ctaTitle: "Reserva tu alojamiento navideño",
    ctaText: "¡Diciembre 2026 ya está abierto para reservas! Reserva pronto y asegura tu destino navideño soñado en Levi.",
    ctaButton: "Ver alojamientos",
    backToLevi: "Volver a la página de Levi",
    linksTitle: "Enlaces útiles",
    santaHome: "El hogar de Papá Noel",
    didYouKnow: "¿Sabías que?",
    didYouKnowText: "¡La cabaña de Papá Noel está en las laderas de Levi! Puedes llegar con el teleférico Levi Black – es una aventura emocionante para toda la familia."
  },
  fr: {
    meta: {
      title: "Noël en Laponie – Expérience magique de Noël à Levi | Leville.net",
      description: "Vivez un Noël unique en Laponie ! Père Noël, aurores boréales, rennes et paysages enneigés. Réservez votre hébergement de Noël à Levi tôt.",
      keywords: "Noël en Laponie, Noël Levi, Levi Père Noël, vacances Noël Laponie, Noël Finlande",
      canonical: "https://leville.net/fr/levi/noel-en-laponie"
    },
    title: "Noël en Laponie",
    subtitle: "Vivez un Noël magique dans la Laponie enneigée – le pays du Père Noël",
    intro: "La Laponie est le berceau de Noël, et Levi offre le cadre parfait pour une expérience de Noël inoubliable. Paysages enneigés, aurores boréales, rennes et proximité du Père Noël font de Noël à Levi une expérience vraiment unique.",
    experiencesTitle: "Expériences de Noël à Levi",
    experiences: [
      { title: "Rencontrer le Père Noël", description: "Rencontrez le vrai Père Noël dans la région de Levi. Enfants et adultes peuvent discuter avec le Père Noël et prendre des photos avec ses lutins.", icon: "gift" },
      { title: "Safari en rennes", description: "Une promenade traditionnelle en renne à travers des paysages enneigés est une expérience inoubliable. Les rennes vous emmèneront dans la paisible nature lapone.", icon: "star" },
      { title: "Aurores boréales", description: "Les nuits sombres de décembre sont excellentes pour observer les aurores boréales. Aurora Borealis ajoute une touche magique à Noël.", icon: "moon" },
      { title: "Safari en huskies", description: "Les promenades en traîneau à huskies offrent vitesse et aventure dans les forêts de Laponie. Les chiens vous tirent à travers le paysage enneigé.", icon: "sparkles" },
      { title: "Saunas de Noël", description: "Le sauna finlandais fait partie de la tradition de Noël. Nos hébergements ont des saunas privés où vous pouvez vous détendre pendant les fêtes.", icon: "heart" },
      { title: "Activités d'hiver", description: "Ski, ski de fond, raquettes et motoneige – Levi a des activités pour toute la famille même à Noël.", icon: "snowflake" }
    ],
    whyTitle: "Pourquoi passer Noël à Levi ?",
    whyPoints: [
      "Neige garantie – Levi a toujours un Noël blanc",
      "Le pays du Père Noël – traditions de Noël authentiques",
      "Aurores boréales – spectacle de lumières magique dans le ciel",
      "Atmosphère paisible – échapper au stress quotidien",
      "Activités pour tous les âges – ski, safari en rennes, motoneige",
      "Hébergements de qualité – appartement de Noël confortable au centre de Levi"
    ],
    tipsTitle: "Conseils pour votre visite de Noël",
    tips: [
      { title: "Réservez tôt", text: "La saison de Noël est extrêmement populaire. Réservez votre hébergement au moins 6–12 mois à l'avance." },
      { title: "Habillez-vous chaudement", text: "En décembre, les températures peuvent descendre jusqu'à -35°C. Vêtements en couches, sous-vêtements en laine et bonnes bottes d'hiver sont essentiels." },
      { title: "Profitez de l'obscurité", text: "Pendant Noël, la lumière du jour est courte, mais l'obscurité révèle les aurores boréales et les belles décorations de Noël." }
    ],
    ctaTitle: "Réservez votre hébergement de Noël",
    ctaText: "Décembre 2026 est maintenant ouvert aux réservations. Réservez tôt et sécurisez votre destination de Noël de rêve à Levi !",
    ctaButton: "Voir les hébergements",
    backToLevi: "Retour à la page Levi",
    linksTitle: "Liens utiles",
    santaHome: "Le pays du Père Noël",
    didYouKnow: "Le saviez-vous ?",
    didYouKnowText: "La cabane du Père Noël se trouve sur les pentes de Levi ! Vous pouvez y accéder par le téléphérique Levi Black – c'est une aventure passionnante pour toute la famille."
  },
  nl: {
    meta: {
      title: "Kerst in Lapland – Magische kerstervaring in Levi | Leville.net",
      description: "Beleef een unieke kerst in Lapland! Kerstman, noorderlicht, rendieren en besneeuwde winterlandschappen. Boek je kerstaccommodatie in Levi op tijd.",
      keywords: "Kerst in Lapland, Kerst Levi, Levi Kerstman, Lapland kerstvakantie, Kerst Finland",
      canonical: "https://leville.net/nl/levi/kerst-in-lapland"
    },
    title: "Kerst in Lapland",
    subtitle: "Beleef een magische kerst in het besneeuwde Lapland – het thuisland van de Kerstman",
    intro: "Lapland is de geboorteplaats van Kerstmis, en Levi biedt het perfecte decor voor een onvergetelijke kerstervaring. Besneeuwde landschappen, noorderlicht, rendieren en de nabijheid van de Kerstman maken kerst in Levi werkelijk uniek.",
    experiencesTitle: "Kerstervaringen in Levi",
    experiences: [
      { title: "De Kerstman ontmoeten", description: "Ontmoet de echte Kerstman in het Levi-gebied. Kinderen en volwassenen kunnen met de Kerstman praten en foto's maken met zijn elfjes.", icon: "gift" },
      { title: "Rendiersafari", description: "Een traditionele rendierrit door besneeuwde landschappen is een onvergetelijke ervaring. Rendieren brengen je naar de vredige Laplandse natuur.", icon: "star" },
      { title: "Noorderlicht", description: "De donkere decembernachten zijn uitstekend voor het bekijken van noorderlicht. Aurora Borealis voegt een magisch tintje toe aan Kerstmis.", icon: "moon" },
      { title: "Huskysafari", description: "Hondesleeritjes bieden snelheid en avontuur in de bossen van Lapland. De honden trekken je door het besneeuwde landschap.", icon: "sparkles" },
      { title: "Kerstsauna", description: "De Finse sauna hoort bij de kersttraditie. Onze accommodaties hebben privésauna's waar je kunt ontspannen tijdens de feestdagen.", icon: "heart" },
      { title: "Winteractiviteiten", description: "Skiën, langlaufen, sneeuwschoenwandelen en sneeuwscooteren – Levi heeft activiteiten voor het hele gezin, ook met Kerst.", icon: "snowflake" }
    ],
    whyTitle: "Waarom Kerst vieren in Levi?",
    whyPoints: [
      "Gegarandeerde sneeuw – Levi heeft altijd een witte kerst",
      "Thuisland van de Kerstman – authentieke kerttradities",
      "Noorderlicht – magisch lichtspel aan de hemel",
      "Vredige sfeer – ontsnappen aan de dagelijkse stress",
      "Activiteiten voor alle leeftijden – skiën, rendiersafari, sneeuwscooter",
      "Kwaliteitsaccommodaties – gezellig kerstappartement in het centrum van Levi"
    ],
    tipsTitle: "Tips voor je kerstbezoek",
    tips: [
      { title: "Boek op tijd", text: "Het kerstseizoen is enorm populair. Boek accommodatie minstens 6–12 maanden van tevoren." },
      { title: "Kleed je warm", text: "In december kunnen temperaturen dalen tot -35°C. Laagjeskleding, wollen ondergoed en goede winterlaarzen zijn essentieel." },
      { title: "Omarm de duisternis", text: "Tijdens Kerst is het daglicht kort, maar de duisternis onthult het noorderlicht en prachtige kerstversieringen." }
    ],
    ctaTitle: "Boek je kerstaccommodatie",
    ctaText: "December 2026 is nu geopend voor boekingen. Boek vroeg en verzeker je droomkerstbestemming in Levi!",
    ctaButton: "Bekijk accommodaties",
    backToLevi: "Terug naar Levi-pagina",
    linksTitle: "Nuttige links",
    santaHome: "Het thuisland van de Kerstman",
    didYouKnow: "Wist je dat?",
    didYouKnowText: "De hut van de Kerstman bevindt zich op de hellingen van Levi! Je kunt er komen met de Levi Black gondellift – het is een spannend avontuur voor het hele gezin."
  }
};


// Internal link targets for experience cards (by icon key)
const experienceLinks: Record<Language, Record<string, string>> = {
  fi: {
    moon: "/revontulet",
    sparkles: "/aktiviteetit/koiravaljakkoajelu-levi",
    heart: "/opas/sauna-levilla",
    snowflake: "/aktiviteetit/parhaat-talviaktiviteetit-levi",
  },
  en: {
    moon: "/en/northern-lights",
    sparkles: "/activities/husky-safari-levi",
    heart: "/guide/finnish-sauna-in-levi",
    snowflake: "/activities/top-winter-activities-in-levi-lapland",
  },
  sv: { moon: "/sv/norrsken", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  de: { moon: "/de/nordlichter", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  es: { moon: "/es/auroras-boreales", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  fr: { moon: "/fr/aurores-boreales", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  nl: { moon: "/nl/noorderlicht", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
};

const xmasBookingCopy: Record<string, { top: { before: string; link: string; after: string }; mid: string }> = {
  fi: {
    top: { before: "Joulun ajan majoitus kannattaa varata ajoissa — ", link: "katso vapaat mökit ja huoneistot", after: "." },
    mid: "Kaikissa kohteissamme on oma sauna ja täysin varusteltu keittiö joulunviettoon →",
  },
  en: {
    top: { before: "Christmas accommodation books up early — ", link: "see available cabins and apartments", after: "." },
    mid: "All our properties have a private sauna and a fully equipped kitchen for Christmas →",
  },
  sv: {
    top: { before: "Julboendet bokas tidigt — ", link: "se lediga stugor och lägenheter", after: "." },
    mid: "Alla våra boenden har egen bastu och fullt utrustat kök för julfirandet →",
  },
  de: {
    top: { before: "Weihnachtsunterkünfte sind früh ausgebucht — ", link: "freie Hütten und Apartments ansehen", after: "." },
    mid: "Alle unsere Unterkünfte haben eine eigene Sauna und eine voll ausgestattete Küche für Weihnachten →",
  },
  es: {
    top: { before: "El alojamiento de Navidad se reserva pronto — ", link: "ver cabañas y apartamentos disponibles", after: "." },
    mid: "Todos nuestros alojamientos tienen sauna privada y cocina totalmente equipada para la Navidad →",
  },
  fr: {
    top: { before: "Les hébergements de Noël partent vite — ", link: "voir les chalets et appartements disponibles", after: "." },
    mid: "Tous nos logements disposent d'un sauna privé et d'une cuisine entièrement équipée pour Noël →",
  },
  nl: {
    top: { before: "Kerstaccommodatie is snel volgeboekt — ", link: "bekijk beschikbare chalets en appartementen", after: "." },
    mid: "Al onze accommodaties hebben een eigen sauna en volledig uitgeruste keuken voor de kerst →",
  },
};

const readMoreLabels: Record<Language, string> = {
  fi: "Lue lisää",
  en: "Read more",
  sv: "Läs mer",
  de: "Mehr erfahren",
  es: "Leer más",
  fr: "En savoir plus",
  nl: "Lees meer",
};

const accommodationLinks: Record<Language, string> = {
  fi: "/majoitukset",
  en: "/en/accommodations",
  sv: "/sv/boenden",
  de: "/de/unterkuenfte",
  es: "/es/alojamientos",
  fr: "/fr/hebergements",
  nl: "/nl/accommodaties"
};

const leviLinks: Record<Language, string> = {
  fi: "/levi",
  en: "/en/levi",
  sv: "/sv/levi",
  de: "/de/levi",
  es: "/es/levi",
  fr: "/fr/levi",
  nl: "/nl/levi"
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  star: Star,
  moon: Moon,
  sparkles: Sparkles,
  heart: Heart,
  snowflake: Snowflake,
  calendar: Calendar,
  utensils: Utensils,
  mountain: Mountain,
  music: Music,
  home: Home,
  thermometer: Thermometer,
  tree: TreePine,
};

const JouluLapissa = ({ lang = "fi" }: JouluLapissakProps) => {
  const t = translations[lang];
  
  const location = useLocation();

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={localeMap[lang]} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              "name": t.title + " - Levi",
              "description": t.meta.description,
              "url": t.meta.canonical,
              "touristType": ["Family", "Couples", "Adventure seekers"],
              "includesAttraction": [
                { "@type": "TouristAttraction", "name": t.experiences[0].title },
                { "@type": "TouristAttraction", "name": t.experiences[2].title },
                { "@type": "TouristAttraction", "name": t.experiences[1].title },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": lang === "fi" ? "Joulu Levillä 2026" : "Christmas in Levi 2026",
              "startDate": "2026-12-20",
              "endDate": "2026-12-27",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Levi, Sirkka",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Sirkka",
                  "postalCode": "99130",
                  "addressRegion": "Lapland",
                  "addressCountry": "FI",
                },
              },
              "url": t.meta.canonical,
              "description": t.meta.description,
            },
            ...(t.longContent
              ? [{
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": t.longContent.faq.map((f) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a },
                  })),
                }]
              : []),
          ])}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <SubpageBackground />
        
        {/* Floating Christmas Decorations */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <Snowflake className="absolute top-32 left-4 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 text-primary/40 animate-pulse" style={{ animationDelay: '0s' }} />
          <Bell className="absolute top-52 left-6 sm:left-16 w-5 h-5 sm:w-7 sm:h-7 text-amber-500/35 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-80 left-3 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 text-amber-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <Snowflake className="absolute top-[28rem] left-8 sm:left-20 w-5 h-5 sm:w-6 sm:h-6 text-primary/35 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <TreePine className="absolute top-[36rem] left-4 sm:left-12 w-6 h-6 sm:w-8 sm:h-8 text-green-500/25 animate-pulse" style={{ animationDelay: '2s' }} />
          <Bell className="absolute top-[48rem] left-6 sm:left-8 w-5 h-5 sm:w-6 sm:h-6 text-amber-500/30 animate-pulse" style={{ animationDelay: '2.5s' }} />
          
          <Star className="absolute top-40 right-4 sm:right-12 w-6 h-6 sm:w-8 sm:h-8 text-amber-400/35 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Snowflake className="absolute top-64 right-6 sm:right-8 w-5 h-5 sm:w-7 sm:h-7 text-primary/40 animate-pulse" style={{ animationDelay: '0.8s' }} />
          <Bell className="absolute top-96 right-4 sm:right-16 w-6 h-6 sm:w-7 sm:h-7 text-amber-500/30 animate-pulse" style={{ animationDelay: '1.3s' }} />
          <TreePine className="absolute top-[30rem] right-6 sm:right-10 w-6 h-6 sm:w-8 sm:h-8 text-green-500/25 animate-pulse" style={{ animationDelay: '1.8s' }} />
          <Snowflake className="absolute top-[42rem] right-8 sm:right-20 w-5 h-5 sm:w-6 sm:h-6 text-primary/35 animate-pulse" style={{ animationDelay: '2.3s' }} />
          <Star className="absolute top-[54rem] right-4 sm:right-8 w-6 h-6 sm:w-7 sm:h-7 text-amber-400/25 animate-pulse" style={{ animationDelay: '2.8s' }} />
        </div>
        
        <Header />
        <Breadcrumbs lang={lang} />
        
        <main className="pt-8 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-12 sm:mb-16 px-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Snowflake className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse" />
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60 absolute -top-2 -right-2" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                {t.subtitle}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.intro}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">
                {xmasBookingCopy[lang]?.top.before ?? xmasBookingCopy.en.top.before}
                <a
                  href="https://app.moder.fi/levillenet"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-booking-source="joulu-lapissa-intro"
                  className="text-primary font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {xmasBookingCopy[lang]?.top.link ?? xmasBookingCopy.en.top.link}
                </a>
                {xmasBookingCopy[lang]?.top.after ?? xmasBookingCopy.en.top.after}
              </p>
            </section>

            {/* Santa Image Section */}
            <section className="mb-12 sm:mb-16">
              <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
                <OptimizedImage 
                  src={santaSitting}
                  alt={t.santaHome}
                  className="w-full h-64 sm:h-80 md:h-96"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground font-medium text-center">
                    {t.santaHome}
                  </p>
                </div>
              </div>
            </section>

            {/* Christmas Dinner Guide Link */}
            <section className="mb-12 sm:mb-20">
              <Link to="/en/guide/christmas-dinner-in-levi" className="block">
                <Card className="glass-card border-primary/30 hover:border-primary/60 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-5 sm:p-7 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <UtensilsCrossed className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {lang === "fi" ? "Jouluillallinen Levillä – Ravintolat, menut ja mökkiin tilattavat ateriat" : lang === "sv" ? "Julmiddag i Levi – Restauranger, menyer och catering till stugan" : lang === "de" ? "Weihnachtsessen in Levi – Restaurants, Menüs & Lieferung zur Hütte" : lang === "es" ? "Cena de Navidad en Levi – Restaurantes, menús y catering" : lang === "fr" ? "Dîner de Noël à Levi – Restaurants, menus et livraison au chalet" : lang === "nl" ? "Kerstdiner in Levi – Restaurants, menu's en bezorging" : "Christmas Dinner in Levi – Restaurants, Menus & Cabin Delivery"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === "fi" ? "Kattava opas jouluaaton illallisvaihtoehtoihin Levillä. Ravintoloiden joulumenut, mökkiin tilattavat catering-ateriat ja käytännön vinkit varaamiseen." : lang === "sv" ? "Komplett guide till julaftonens middagsalternativ i Levi. Restaurangmenyer, catering och bokningstips." : lang === "de" ? "Kompletter Guide für das Weihnachtsessen in Levi. Restaurantmenüs, Catering und Buchungstipps." : lang === "es" ? "Guía completa de opciones de cena de Nochebuena en Levi. Menús, catering y consejos." : lang === "fr" ? "Guide complet des options de dîner du réveillon à Levi. Menus, traiteur et conseils." : lang === "nl" ? "Complete gids voor kerstdineropties in Levi. Restaurantmenu's, catering en boekingstips." : "Complete guide to Christmas Eve dining in Levi. Restaurant menus, cabin catering options, traditional Finnish Christmas food, and practical booking tips."}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-2">
                        {readMoreLabels[lang]} →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>

            {/* Christmas market image */}
            <section className="mb-12 sm:mb-16 rounded-xl overflow-hidden max-w-4xl mx-auto">
              <OptimizedImage src={christmasMarket} alt={lang === "fi" ? "Joulumarkkinat Levin keskustassa" : "Christmas market in Levi centre"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Joulumarkkinat Levin keskustassa — paikallista käsityötä ja jouluista tunnelmaa" : "Christmas market in Levi centre — local handicrafts and festive atmosphere"}
              </p>
            </section>

            {/* Christmas grilling image */}
            <section className="mb-12 sm:mb-16 rounded-xl overflow-hidden max-w-4xl mx-auto">
              <OptimizedImage src={christmasGrilling} alt={lang === "fi" ? "Grillailua joulumarkkinoilla Levillä" : "Grilling at the Christmas market in Levi"} className="w-full h-64 sm:h-80 md:h-96" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {lang === "fi" ? "Joulumarkkinoiden tunnelmaa — nuotion äärellä voi paistaa tikkupullaa ja poromakkaraa rinteiden juurella" : "Christmas market atmosphere — you can grill stick buns and reindeer sausage by the fire at the foot of the slopes"}
              </p>
            </section>

            {/* Christmas Experiences */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {t.experiencesTitle}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {t.experiences.map((exp, index) => {
                  const IconComponent = iconMap[exp.icon];
                  const linkTarget = experienceLinks[lang]?.[exp.icon];
                  const cardContent = (
                    <Card className={`glass-card border-border/30 hover:border-primary/50 transition-all duration-300 h-full ${linkTarget ? 'cursor-pointer group' : ''}`}>
                      <CardHeader className="p-4 sm:p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl text-foreground">{exp.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <p className="text-sm sm:text-base text-muted-foreground">{exp.description}</p>
                        {linkTarget && (
                          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3">
                            {readMoreLabels[lang]} →
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  );
                  return linkTarget ? (
                    <Link key={index} to={linkTarget} className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl">
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={index}>{cardContent}</div>
                  );
                })}
              </div>
            </section>

            {/* Why Levi Section */}
            <section className="mb-12 sm:mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    {t.whyTitle}
                  </h2>
                  <ul className="space-y-3">
                    {t.whyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <TreePine className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <OptimizedImage 
                    src={santaWaving}
                    alt={t.santaHome}
                    className="w-full h-64 sm:h-80"
                  />
                </div>
              </div>
            </section>

            {/* Santa's Cabin Section */}
            <section className="mb-12 sm:mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden">
                  <OptimizedImage 
                    src={santaCabin}
                    alt={t.didYouKnow}
                    className="w-full h-64 sm:h-80"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {t.didYouKnow}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t.didYouKnowText}
                  </p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {t.tipsTitle}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {t.tips.map((tip, index) => (
                  <Card key={index} className="glass-card border-border/30">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                        <Camera className="w-5 h-5 text-primary" />
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-sm text-muted-foreground">{tip.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Contextual booking link (mid-page) */}
            <section className="mb-12 sm:mb-16">
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                <a
                  href="https://app.moder.fi/levillenet"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-booking-source="joulu-lapissa-mid"
                  className="text-primary font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {xmasBookingCopy[lang]?.mid ?? xmasBookingCopy.en.mid}
                </a>
              </p>
            </section>

            {/* Long-form Christmas Guide (FI + EN) */}
            {t.longContent && (
              <div className="max-w-3xl mx-auto">
                {t.longContent.sections.map((sec) => {
                  const SectionIcon = iconMap[sec.icon] ?? Star;
                  const bookingCopy: Record<string, { fi: string; en: string }> = {
                    illalliset: {
                      fi: "Varaa joulumajoitus keittiöllä — täydellinen paikka omalle joulupöydälle",
                      en: "Book Christmas accommodation with a kitchen — perfect for your own Christmas table",
                    },
                    sauna: {
                      fi: "Katso saunalliset joulumajoitukset Levillä",
                      en: "See Christmas accommodations with private sauna",
                    },
                    vinkit: {
                      fi: "Varaa joulumajoituksesi Levillä nyt",
                      en: "Book your Christmas stay in Levi now",
                    },
                  };
                  const cta = bookingCopy[sec.id];
                  return (
                    <section key={sec.id} id={sec.id} className="mb-10 sm:mb-14">
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <SectionIcon className="w-6 h-6 text-primary flex-shrink-0" />
                        {sec.heading}
                      </h2>
                      {sec.paragraphs.map((p, i) => (
                        <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                          {p}
                        </p>
                      ))}
                      {sec.bullets && (
                        <ul className="list-disc pl-6 mt-3 space-y-1 text-sm sm:text-base text-muted-foreground">
                          {sec.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}
                      {cta && (
                        <p className="mt-4 text-sm sm:text-base">
                          <a
                            href="https://app.moder.fi/levillenet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                          >
                            {lang === "fi" ? cta.fi : cta.en} →
                          </a>
                        </p>
                      )}
                    </section>
                  );
                })}

                <section className="mb-12 sm:mb-16">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-primary flex-shrink-0" />
                    {lang === "fi" ? "Usein kysytyt kysymykset" : "Frequently Asked Questions"}
                  </h2>
                  <div className="space-y-4">
                    {t.longContent.faq.map((f, i) => (
                      <div key={i} className="glass-card border border-border/30 rounded-xl p-4 sm:p-5">
                        <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* CTA Section */}
            <section className="mb-12 sm:mb-20">
              <Card className="glass-card border-primary/30 bg-primary/5 relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
                <div 
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    backgroundImage: `url(${christmasCozy})`,
                    backgroundSize: '55%',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    maskImage: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)',
                  }}
                />
                <CardContent className="p-6 sm:p-8 md:p-12 text-center relative z-10">
                  <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t.ctaTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                    {t.ctaText}
                  </p>
                  <Button asChild size="lg" className="text-sm sm:text-base">
                    <Link to={accommodationLinks[lang]}>
                      {t.ctaButton}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>


            {/* Back to Levi */}
            <section className="text-center">
              <Button asChild variant="outline">
                <Link to={leviLinks[lang]}>
                  ← {t.backToLevi}
                </Link>
              </Button>
            </section>
            {/* Read Next */}
            {(() => {
              const readNextData: Record<string, { title: string; links: { title: string; desc: string; href: string }[] }> = {
                fi: {
                  title: "Lue myös",
                  links: [
                    { title: "Joulupukki Levillä", desc: "Missä ja milloin pukin tapaa", href: "/opas/joulupukki-levilla" },
                    { title: "Jouluillallinen Levillä", desc: "Ravintolat, menut ja catering", href: "/opas/jouluillallinen-levilla" },
                    { title: "Levi joulukuussa", desc: "Sää, lumitilanne ja tapahtumat", href: "/opas/levi-joulukuussa" },
                    { title: "Levi tammikuussa", desc: "Kaamoksen jälkeinen hiljainen kausi", href: "/opas/levi-tammikuussa" },
                    { title: "Uusivuosi Levillä", desc: "Ilotulitukset ja ohjelma", href: "/opas/uusivuosi-levilla" },
                    { title: "Revontulet Levillä", desc: "Paras aika ja paikka revontulille", href: "/revontulet" },
                    { title: "Majoitus Levillä", desc: "Mökit ja huoneistot keskustassa", href: "/majoitukset" },
                    { title: "Miten pääsee Leville", desc: "Lennot, junat ja autoilu", href: "/opas/miten-paasee-leville" },
                    { title: "Hinnat Levillä", desc: "Mitä loma maksaa käytännössä", href: "/opas/hinnat-levilla" },
                    { title: "Tapahtumat Levillä", desc: "Kauden tapahtumakalenteri", href: "/opas/tapahtumat-levilla" },
                    { title: "Levi vs Rovaniemi", desc: "Kumpi on parempi joulukohde?", href: "/opas/levi-vs-rovaniemi" },
                    { title: "Talvi Levillä", desc: "Kaamos, lumi ja talviaktiviteetit", href: "/opas/talvi-levi" },
                  ],
                },
                en: {
                  title: "Read Next",
                  links: [
                    { title: "Levi vs Rovaniemi", desc: "Which is the better Christmas destination?", href: "/guide/levi-vs-rovaniemi-comparison" },
                    { title: "Winter in Levi", desc: "Polar night, snow and winter activities", href: "/guide/winter-in-levi" },
                    { title: "Northern Lights in Levi", desc: "Best time and spots for aurora", href: "/en/northern-lights" },
                    { title: "Santa Claus in Levi", desc: "Where and when to meet Santa", href: "/guide/santa-claus-in-levi" },
                    { title: "Christmas Dinner in Levi", desc: "Restaurants, menus and catering", href: "/guide/christmas-dinner-in-levi" },
                    { title: "Levi in December", desc: "Weather, snow and events", href: "/guide/levi-in-december" },
                    { title: "Levi in January", desc: "Quiet season after the polar night", href: "/guide/levi-in-january" },
                    { title: "New Year in Levi", desc: "Fireworks and festive programme", href: "/guide/new-years-eve-in-levi" },
                    { title: "Accommodation in Levi", desc: "Cabins and apartments in the centre", href: "/en/accommodations" },
                    { title: "How to Get to Levi", desc: "Flights, trains and driving", href: "/travel/how-to-get-to-levi" },
                    { title: "Prices in Levi", desc: "What a Lapland holiday really costs", href: "/guide/prices-in-levi" },
                    { title: "Events in Levi", desc: "Seasonal events calendar", href: "/guide/events-in-levi" },
                    { title: "Winter Clothing Guide", desc: "How to dress for Lapland frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
                    { title: "Levi With Children", desc: "Tips for a family Christmas trip", href: "/guide/levi-with-children" },
                  ],
                },
                sv: {
                  title: "Läs också",
                  links: [
                    { title: "Vinter i Levi", desc: "Polarnatt, snö och vinteraktiviteter", href: "/guide/winter-in-levi" },
                    { title: "Norrsken i Levi", desc: "Bästa tid och platser", href: "/sv/norrsken" },
                    { title: "Vinterkläder", desc: "Klädtips för Lapplands kyla", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
                    { title: "Levi i december", desc: "Väder, snö och evenemang", href: "/sv/guide/levi-i-december" },
                    { title: "Levi i januari", desc: "Lugn säsong efter polarnatten", href: "/sv/guide/levi-i-januari" },
                    { title: "Boende i Levi", desc: "Stugor och lägenheter i centrum", href: "/sv/boenden" },
                    { title: "Hur tar man sig till Levi", desc: "Flyg, tåg och bil", href: "/sv/resa/hur-tar-man-sig-till-levi" },
                  ],
                },
                de: {
                  title: "Lesen Sie auch",
                  links: [
                    { title: "Winter in Levi", desc: "Polarnacht, Schnee und Aktivitäten", href: "/guide/winter-in-levi" },
                    { title: "Nordlichter in Levi", desc: "Beste Zeit und Orte", href: "/de/nordlichter" },
                    { title: "Winterkleidung", desc: "Kleidungstipps für Lapplands Kälte", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
                    { title: "Levi im Dezember", desc: "Wetter, Schnee und Events", href: "/de/ratgeber/levi-im-dezember" },
                    { title: "Levi im Januar", desc: "Ruhige Zeit nach der Polarnacht", href: "/de/ratgeber/levi-im-januar" },
                    { title: "Unterkünfte in Levi", desc: "Hütten und Apartments im Zentrum", href: "/de/unterkuenfte" },
                    { title: "Anreise nach Levi", desc: "Flüge, Züge und Auto", href: "/de/reise/anreise-nach-levi" },
                  ],
                },
                es: {
                  title: "Lee también",
                  links: [
                    { title: "Invierno en Levi", desc: "Noche polar, nieve y actividades", href: "/guide/winter-in-levi" },
                    { title: "Auroras boreales en Levi", desc: "Mejor época y lugares", href: "/es/auroras-boreales" },
                    { title: "Levi en diciembre", desc: "Clima, nieve y eventos", href: "/es/guia/levi-en-diciembre" },
                    { title: "Levi en enero", desc: "Temporada tranquila tras la noche polar", href: "/es/guia/levi-en-enero" },
                    { title: "Alojamiento en Levi", desc: "Cabañas y apartamentos en el centro", href: "/es/alojamientos" },
                  ],
                },
                fr: {
                  title: "À lire aussi",
                  links: [
                    { title: "L'hiver à Levi", desc: "Nuit polaire, neige et activités", href: "/guide/winter-in-levi" },
                    { title: "Aurores boréales à Levi", desc: "Meilleure période et spots", href: "/fr/aurores-boreales" },
                    { title: "Levi en décembre", desc: "Météo, neige et événements", href: "/fr/guide/levi-en-decembre" },
                    { title: "Levi en janvier", desc: "Saison calme après la nuit polaire", href: "/fr/guide/levi-en-janvier" },
                    { title: "Hébergements à Levi", desc: "Chalets et appartements au centre", href: "/fr/hebergements" },
                    { title: "Comment aller à Levi", desc: "Vols, trains et voiture", href: "/fr/voyage/comment-aller-a-levi" },
                  ],
                },
                nl: {
                  title: "Lees ook",
                  links: [
                    { title: "Winter in Levi", desc: "Poolnacht, sneeuw en activiteiten", href: "/guide/winter-in-levi" },
                    { title: "Noorderlicht in Levi", desc: "Beste tijd en locaties", href: "/nl/noorderlicht" },
                    { title: "Winterkleding", desc: "Kledingstips voor Lapland", href: "/nl/gids/winterkleding-levi-lapland" },
                    { title: "Levi met kinderen", desc: "Tips voor een familiekersttrip", href: "/nl/gids/levi-met-kinderen" },
                    { title: "Levi in december", desc: "Weer, sneeuw en evenementen", href: "/nl/gids/levi-in-december" },
                    { title: "Levi in januari", desc: "Rustig seizoen na de poolnacht", href: "/nl/gids/levi-in-januari" },
                    { title: "Accommodaties in Levi", desc: "Chalets en appartementen in het centrum", href: "/nl/accommodaties" },
                    { title: "Prijzen in Levi", desc: "Wat kost een Lapland-vakantie", href: "/nl/gids/prijzen-in-levi" },
                  ],
                },
              };
              const rn = readNextData[lang] || readNextData.en;
              return <ReadNextSection title={rn.title} links={rn.links} />;
            })()}
            <GuideDisclaimer lang={lang} />
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

export default JouluLapissa;
