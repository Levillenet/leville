import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import MajoitusCallout from "@/components/MajoitusCallout";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Gift, Mountain, Users, MapPin, Info, Camera, Heart, Download, TreePine, ExternalLink, Snowflake, Sparkles, CheckCircle2 } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import santaCabinImage from "@/assets/santa-cabin-fell.jpg";
import santaCabinWinter from "@/assets/seasons/santa-cabin-winter.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SantaClausLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Joulupukki Levillä — joulupukin tapaaminen ja jouluelämykset | Leville.net",
      description: "Miten tapaat joulupukin Levillä? Vertailemme joulupukkielämykset — perinteinen mökkivierailu, tonttuhovi, safari ja yksityinen VIP — sekä Levin ja Rovaniemen Santa Claus Villagen erot.",
      canonical: "https://leville.net/opas/joulupukki-levilla"
    },
    h1: "Joulupukki Levillä — missä tavata pukki?",
    intro: "Levillä joulupukin voi tavata monella tavalla, ja kokemukset eroavat toisistaan enemmän kuin moni arvaa: toinen perhe haluaa kiireettömän hetken vanhassa poromiehen mökissä, toinen tonttujen temmellystä ja tekemistä, kolmas moottorikelkkasafarin tai täysin oman yksityisvuoron. Tässä oppaassa käymme läpi, millainen joulupukkikokemus sopii juuri teille, ketkä niitä Levillä järjestävät ja miten Levi eroaa Rovaniemen Santa Claus Villagesta.",

    sections: {
      cabin: {
        title: "Joulupukin mökki Levin tunturilla",
        content: "Levin tunturin huipulla sijaitsee ikoninen Joulupukin mökki — Levin kuvatuin kohde, joka tunnetaan Joulutarina-elokuvasta. Mökki on upea nähtävyys ja valokuvauspaikka henkeäsalpaavine näköaloineen, mutta joulupukki ei yleensä ole siellä paikalla.",
        access: "Mökille pääsee gondolihissillä ja kävellen alas rinnettä, kesällä patikoiden Tuikku-ravintolalta tai talvella suksilla laskettelun yhteydessä. Retki mökille kannattaa ehdottomasti tehdä Levin-vierailun aikana!",
        note: "Mökki on nähtävyys — ei varsinainen joulupukkielämys. Pukkitapaamiset järjestävät Levin elämysyritykset."
      },
      experiences: {
        title: "Joulupukkielämykset Levillä",
        content: "Levillä toimii useita elämysyrityksiä jotka järjestävät joulupukkitapaamisia. Suurin ja suosituin näistä on Elves Village, joka tarjoaa monipuolisen jouluisen elämyksen tonttutoimintoineen.",
        note: "Levillä on monia muitakin pukkielämysten järjestäjiä — tarkista ajantasaiset vaihtoehdot Visit Levi -matkailuneuvonnasta.",
        letterTitle: "Joulupukin tervetulokirje",
        letterDesc: "Lataa joulupukin tervetulokirje tulostettavaksi — mukava yllätys lapsille majoitukseen saapuessa!",
        letterButton: "Lataa tervetulokirje (PDF)"
      },
      other: {
        title: "Muut jouluelämykset Levillä",
        items: [
          "Porosafari joulutunnelmassa — porotiloilla on usein jouluinen ohjelma",
          "Joulumarkkinat (ajankohdasta riippuen)",
          "Jouluilta omassa mökissä — sauna, joulupöytä ja hiljaisuus",
          "Joulupukin voi tilata myös omaan majoitukseen! Kysy lisää Visit Levi -matkailuneuvonnasta."
        ],
        disclaimer: "Joulusesongin ohjelma vaihtelee vuosittain. Tarkista ajantasaiset tiedot etukäteen."
      },
      comparison: {
        title: "Levi vs Rovaniemen Joulupukin Pajakylä",
        rovaniemi: [
          "Suurempi, kaupallisempi ja tunnetumpi",
          "Joulupukki ympäri vuoden",
          "Napapiirin ylitys ja postikonttori"
        ],
        levi: [
          "Intiimimpi ja autenttisempi — ei massaturismia",
          "Elämysyritysten pukkitapaamiset + ikoninen mökki nähtävyytenä",
          "Joulupukki + laskettelu + safarit + oma mökki — monipuolisempi loma"
        ],
        daytrip: "Päiväretki Rovaniemelle Leviltä on mahdollinen (noin 2,5 h suuntaan) jos haluat molemmat.",
        tip: "Vinkki: jos pääasia on tavata joulupukki, molemmat toimivat. Jos haluat monipuolisen joululoman, Levi on parempi tukikohta."
      },
      familyTips: {
        title: "Vinkkejä perheille",
        items: [
          "Varaa joulupukkitapaamiset etukäteen — erityisesti joulu- ja hiihtolomasesonkina",
          "Retki Joulupukin mökille tunturiin on elämys itsessään — upeat maisemat ja valokuvauspaikka",
          "Ota kamera mukaan — mökillä on mahtavat näköalat ja jouluinen tunnelma",
          "Yhdistä pukkielämys poroajeluun samana päivänä"
        ]
      }
    },
    profiles: {
      title: "Millainen joulupukkikokemus sopii teille?",
      intro: "Levin joulupukkiohjelmat eroavat toisistaan tunnelmaltaan, kestoltaan ja tekemisen määrältä. Valitse ensin tyyli — palveluiden esittelyt löytyvät heti alta.",
      items: [
        { title: "Rauhallinen ja perinteinen", desc: "Kiireetön hetki vanhassa lappilaisessa mökissä, joulumuori ja piparkakut. Sopii pienille lapsille ja perheille, jotka haluavat aitoa tunnelmaa ilman vauhtia.", match: "Santa's Secret Hideaway" },
        { title: "Tonttujen maailma ja tekemistä", desc: "Tarinallinen elämyspuisto, jossa tontut, pelit ja koristelu vievät mukanaan. Sopii isommille lapsille ja perheille, jotka viihtyvät pidempään.", match: "Arcandia — The Elf Court" },
        { title: "Safari ja porot", desc: "Joulupukki yhdistettynä moottorikelkka- tai bussisafariin ja poroajeluun. Sopii perheille, jotka haluavat yhden päivän aikana useamman elämyksen.", match: "Tokka Safaris" },
        { title: "Yksityinen VIP-vuoro", desc: "Oma rauhallinen vuoro majassa, jossa lasten nimet muistetaan. Sopii perheille, jotka arvostavat yksityisyyttä ja haluavat välttää ryhmät.", match: "Arctic Shaman Adventures" }
      ]
    },
    providers: {
      title: "Joulupukkielämysten järjestäjiä Levillä",
      intro: "Alla neljä erilaista tapaa tavata joulupukki Levin alueella. Tiedot on tarkistettu palveluntarjoajien omilta sivuilta — tarkista aina ajantasainen saatavuus, hinnat ja kaudet suoraan järjestäjältä.",
      forWhoLabel: "Kenelle sopii:",
      ctaLabel: "Palveluntarjoajan sivut",
      note: "Nämä ovat esimerkkejä, eivät koko Levin tarjonta. Valikoima muuttuu kausittain, ja joulupukin voi useilta järjestäjiltä tilata myös suoraan omaan majoitukseen. Kysy ajantasaiset vaihtoehdot Visit Levi -matkailuneuvonnasta.",
      items: [
        {
          name: "Santa's Secret Hideaway — joulupukki ja joulumuori",
          tagline: "Perinteinen ja kiireetön vierailu noin 100 vuotta vanhassa poromiehen mökissä metsän keskellä.",
          points: [
            "Sama joulupukki vuodesta 1998",
            "Noin 1,5 h ohjelmaa mökillä, kokonaisuus noin 2,5 h",
            "Piparkakkujen leipomista joulumuorin kanssa",
            "Tonttuopas, henkilökohtainen lahja jokaiselle lapselle",
            "Omia valokuvia saa ottaa rajattomasti",
            "Kuljetus Levin keskustasta sisältyy",
            "Enintään 23 hengen ryhmä; yksityinen versio saatavilla"
          ],
          forWho: "Pienten lasten perheille ja kaikille, jotka haluavat aidon, rauhallisen kohtaamisen.",
          url: "https://www.levi-tours.com/santa-hideaway-levi"
        },
        {
          name: "Tokka Safaris — joulupukkivierailut",
          tagline: "Joulupukki ja poroajelu yhdistettynä safariin — moottorikelkalla tai lämpimällä minibussilla.",
          points: [
            "Kelkkavaihtoehto noin 30 km, kesto noin 4 h",
            "Autokuljetusvaihtoehto, kesto noin 2 h",
            "Molempiin sisältyy lyhyt poroajelu",
            "Lämmin juoma ja pulla mökillä",
            "Tonttu vastassa, aikaa lahjatoiveiden kertomiseen",
            "Lapset matkustavat lämmitetyssä kelkkakärryssä",
            "Ohjeet kirjeen toimittamiseen tulevat noin 2 viikkoa ennen vierailua"
          ],
          forWho: "Perheille, jotka haluavat yhdistää joulupukin ja Lapin safarielämyksen.",
          url: "https://www.tokkasafaris.fi/en/safaris/santa-visits/"
        },
        {
          name: "Arcandia — The Elf Court (tonttuhovi)",
          tagline: "Tarinallinen elämyspuisto, jossa tontut ratkaisevat kuka on kiltti ja kuka tuhma.",
          points: [
            "Tontut kutsuvat vieraat kirjeellä; portilla jokainen saa oman Ring of Truth -sormuksen",
            "Matkalla kylään tavataan hovin porot — niitä saa kuvata ja ruokkia",
            "Ulkona hovin huvituksia: kyläpelit, Knockerball-pallot Arctic Colosseumilla, mäenlasku ja keinut",
            "Majassa koristellaan joulukuusta ja piparkakkuja tonttujen kanssa",
            "Joulupukki lukee kirjeitä ja kirjoittaa hovin kirjaan perheen kanssa yksi kerrallaan",
            "Lopuksi jokainen saa oman hovin päätöksen: kiltti vai tuhma",
            "Vierailu jatkuu puistoalueelle pimeän tultua"
          ],
          forWho: "Isommille lapsille ja perheille, jotka haluavat tarinaa ja tekemistä pelkän tapaamisen sijaan.",
          url: "https://www.arcandia-en.com/elfcourt"
        },
        {
          name: "Arctic Shaman Adventures — Santa Claus Daytime VIP",
          tagline: "Yksityinen joulupukin tapaaminen lappilaisessa majassa, täysin oma vuoro.",
          points: [
            "Yksityinen tapaaminen — ei jaettua ryhmää",
            "Kesto noin 2,5 h",
            "Lasten nimet muistetaan",
            "Lahjat, valokuvat ja todistukset",
            "Joulukauden ohjelma; paikat varataan yleensä hyvissä ajoin täyteen"
          ],
          forWho: "Perheille, jotka arvostavat yksityisyyttä ja rauhallista tunnelmaa.",
          url: "https://arcticshamanadventures.com/experiences/"
        }
      ]
    },
    santaVillage: {
      title: "Onko Levillä Santa Claus Village? Levi vai Rovaniemi",
      content: "Tämä sekoittuu usein: varsinainen Santa Claus Village eli Joulupukin Pajakylä sijaitsee Rovaniemellä napapiirillä, ei Levillä. Levillä ei ole samannimistä kylää — sen sijaan Levillä on tonttu- ja jouluteemaisia elämyspuistoja sekä useita järjestäjiä, jotka vievät perheet joulupukin luo metsämökkiin tai järjestävät yksityisvierailun.",
      distance: "Etäisyys Leviltä Rovaniemen Santa Claus Villageen on noin 170 km eli noin 2,5 tuntia suuntaansa, joten päiväretki on mahdollinen.",
      note: "Käytännössä: jos haluat napapiirin ja postikonttorin, se on Rovaniemellä. Jos haluat pienemmän ryhmän, metsämökin ja mahdollisuuden yhdistää pukin lasketteluun ja safareihin, Levi toimii paremmin."
    },
    bookingNudge: {
      text: "Joulupukkiohjelmat varataan Levillä loppuun aikaisin — ja sama koskee majoitusta. Meiltä vuokraat saunalliset huoneistot ja mökit Levin keskustassa suoraan omistajalta ilman välityskuluja:",
      link: "tarkista vapaat päivät ja varaa majoitus"
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Missä joulupukin voi tavata Levillä?", a: "Joulupukin tapaa Levillä elämysyritysten ohjelmissa: metsämökkivierailuilla (esim. Santa's Secret Hideaway), tonttuhovissa (Arcandia — The Elf Court), safarien yhteydessä (Tokka Safaris) tai yksityisvierailulla (Arctic Shaman Adventures). Tunturin huipun Joulupukin mökki on nähtävyys ja valokuvauspaikka, jossa pukki ei yleensä ole paikalla." },
        { q: "Onko Levillä Santa Claus Village?", a: "Ei. Santa Claus Village eli Joulupukin Pajakylä on Rovaniemellä, noin 170 km eli noin 2,5 tunnin ajomatkan päässä Leviltä. Levillä on omat jouluelämyspuistonsa ja pukkitapaamisensa." },
        { q: "Onko yksityisiä joulupukkitapaamisia saatavilla?", a: "Kyllä. Esimerkiksi Arctic Shaman Adventuresin Santa Claus Daytime VIP on yksityinen tapaaminen, ja useista metsämökkiohjelmista on saatavilla myös yksityinen versio. Monilta järjestäjiltä joulupukin voi tilata myös suoraan omaan majoitukseen." },
        { q: "Onko joulupukki Levillä ympäri vuoden?", a: "Ei — joulupukkiohjelmat pyörivät pääosin marras–tammikuussa, järjestäjästä riippuen. Ympärivuotiseen tapaamiseen Rovaniemen Pajakylä on vaihtoehto." },
        { q: "Voiko joulupukkielämyksen yhdistää muihin aktiviteetteihin?", a: "Kyllä, ja se kannattaa. Osaan ohjelmista sisältyy jo poroajelu tai moottorikelkkasafari, ja Levillä pukkipäivään on helppo yhdistää laskettelu, husky- tai porosafari sekä revontuliretki." },
        { q: "Milloin joulupukkiohjelmat kannattaa varata?", a: "Mahdollisimman aikaisin. Suosituimmat vuorot joulukuussa ja hiihtolomaviikoilla myydään usein loppuun jo kesän tai alkusyksyn aikana — sama koskee majoitusta." },
        { q: "Sopiiko pienille lapsille?", a: "Ehdottomasti — pukkielämykset on suunniteltu perheille. Pienimmille sopivat parhaiten rauhalliset mökkivierailut ja lyhyet ohjelmat." },
        { q: "Voiko tehdä päiväretken Rovaniemelle?", a: "Kyllä, matka on noin 2,5 tuntia suuntaan. Opastettuja päiväretkiä on myös saatavilla." }
      ]
    },

    cta: {
      text: "Joulusesonki on erittäin kysytty — varaa majoitus ajoissa.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Joulu Lapissa", desc: "Tunnelmallinen jouluopas", href: "/levi/joulu-lapissa" },
        { title: "Lapsiperheet Levillä", desc: "Vinkit perheen lomaan", href: "/opas/lapsiperheet-levilla" },
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Joulupukki Levillä"
  },
  en: {
    meta: {
      title: "Santa Claus in Levi — Santa Experiences & Christmas Activities | Leville.net",
      description: "How to meet Santa Claus in Levi: compare traditional cabin visits, the Elf Court, safari Santa visits and private VIP meetings — plus how Levi differs from Rovaniemi's Santa Claus Village.",
      canonical: "https://leville.net/guide/santa-claus-in-levi"
    },
    h1: "Santa Claus in Levi — Where to Meet Santa?",
    intro: "In Levi you can meet Santa Claus in very different ways: a quiet, unhurried visit in a century-old reindeer herder's cabin, a story-driven elf world full of things to do, a snowmobile safari with a reindeer ride, or a fully private VIP meeting. This guide helps you choose the Santa experience that fits your family, introduces the providers who run them, and explains how Levi differs from Rovaniemi's Santa Claus Village.",

    sections: {
      cabin: {
        title: "Santa's Cabin on Levi Fell",
        content: "On top of Levi fell sits the iconic Santa's Cabin — Levi's most photographed spot, known from the Finnish film 'Christmas Story' (Joulutarina). The cabin is a stunning landmark and photo spot with breathtaking views, but Santa is not usually present there.",
        access: "You can reach the cabin via the gondola lift and walking down the slope, by hiking from Tuikku restaurant in summer, or by skiing in winter. A trip to the cabin is an absolute must during your visit to Levi!",
        note: "The cabin is a landmark — not a Santa experience as such. Santa meetings are organised by Levi's experience companies."
      },
      experiences: {
        title: "Santa Claus Experiences in Levi",
        content: "Several experience companies in Levi organise Santa Claus meetings. The largest and most popular is Elves Village, which offers a comprehensive Christmas experience with elf activities and more.",
        note: "There are many other Santa experience providers in Levi — check current options from Visit Levi tourist information.",
        letterTitle: "Santa's Welcome Letter",
        letterDesc: "Download Santa's welcome letter to print — a lovely surprise for children upon arrival at your accommodation!",
        letterButton: "Download welcome letter (PDF)"
      },
      other: {
        title: "Other Christmas Experiences in Levi",
        items: [
          "Reindeer safari in a Christmas atmosphere — reindeer farms often have festive programmes",
          "Christmas markets (depending on dates)",
          "Christmas Eve in your own cabin — sauna, festive dinner and peace",
          "You can even book Santa to visit your accommodation! Ask Visit Levi tourist information for details."
        ],
        disclaimer: "Christmas season programmes vary yearly. Check up-to-date info in advance."
      },
      comparison: {
        title: "Levi vs Rovaniemi's Santa Claus Village",
        rovaniemi: [
          "Larger, more commercial and better known",
          "Santa available year-round",
          "Arctic Circle crossing and post office"
        ],
        levi: [
          "More intimate and authentic — no mass tourism",
          "Santa experiences by local companies + iconic cabin as a landmark",
          "Santa + skiing + safaris + own cabin — a more versatile holiday"
        ],
        daytrip: "A day trip from Levi to Rovaniemi is possible (about 2.5 hours each way) if you want both.",
        tip: "Tip: if meeting Santa is the main thing, both work. If you want a versatile Christmas holiday, Levi is the better base."
      },
      familyTips: {
        title: "Tips for Families",
        items: [
          "Book Santa meetings in advance — especially during Christmas and ski holiday season",
          "A trip to Santa's Cabin on the fell is an experience in itself — stunning views and a great photo spot",
          "Bring a camera — the cabin has amazing views and a festive atmosphere",
          "Combine a Santa experience with a reindeer sleigh ride on the same day"
        ]
      }
    },
    profiles: {
      title: "Which Santa experience is right for your family?",
      intro: "Santa programmes in Levi differ in atmosphere, length and how much there is to do. Pick the style first — the providers are introduced right below.",
      items: [
        { title: "Calm and traditional", desc: "An unhurried moment in an old Lappish cabin with Mrs. Claus and gingerbread. Best for small children and families who want authentic atmosphere without rush.", match: "Santa's Secret Hideaway" },
        { title: "Elf world and activities", desc: "A story-driven adventure park with elves, games and decorating. Best for older children and families who like to stay longer.", match: "Arcandia — The Elf Court" },
        { title: "Safari and reindeer", desc: "Santa combined with a snowmobile or minibus safari and a reindeer ride. Best for families who want several experiences in one outing.", match: "Tokka Safaris" },
        { title: "Private VIP meeting", desc: "Your own quiet slot in a Lappish hut where the children's names are remembered. Best for families who value privacy and want to avoid groups.", match: "Arctic Shaman Adventures" }
      ]
    },
    providers: {
      title: "Santa experience providers in Levi",
      intro: "Four different ways to meet Santa Claus in the Levi area. The details below are taken from each provider's own website — always confirm current availability, prices and season directly with the operator.",
      forWhoLabel: "Best for:",
      ctaLabel: "Provider's website",
      note: "These are examples, not the full offering in Levi. The selection changes from season to season, and many operators can also bring Santa to your own accommodation. Ask Visit Levi tourist information for current options.",
      items: [
        {
          name: "Santa's Secret Hideaway — Santa & Mrs. Claus",
          tagline: "A traditional, unhurried visit in a roughly 100-year-old reindeer herder's cabin deep in the forest.",
          points: [
            "The same Santa since 1998",
            "About 1.5 h of programme at the cabin, around 2.5 h in total",
            "Gingerbread baking with Mrs. Claus",
            "Elf guide and a personal gift for every child",
            "Unlimited photos of your own",
            "Transfer from Levi centre included",
            "Groups of up to 23 guests; a private version is available"
          ],
          forWho: "Families with small children and anyone who wants a genuine, peaceful meeting.",
          url: "https://www.levi-tours.com/santa-hideaway-levi"
        },
        {
          name: "Tokka Safaris — Santa visits",
          tagline: "Santa and a reindeer ride combined with a safari — by snowmobile or in a warm minibus.",
          points: [
            "Snowmobile option about 30 km, roughly 4 h",
            "Car transfer option, roughly 2 h",
            "A short reindeer ride included in both",
            "Warm drink and a bun at the cabin",
            "An elf welcomes you; time to share your gift wishes",
            "Children travel in a heated sledge pod",
            "Instructions for delivering a letter arrive about two weeks before the visit"
          ],
          forWho: "Families who want to combine Santa with a Lapland safari.",
          url: "https://www.tokkasafaris.fi/en/safaris/santa-visits/"
        },
        {
          name: "Arcandia — The Elf Court",
          tagline: "A story-driven adventure park where the elves decide who is nice and who is naughty.",
          points: [
            "The elves summon guests with a letter; at the gate everyone receives their own Ring of Truth",
            "On the way to the village you meet the Court's reindeer — you can photograph and feed them",
            "Outdoor amusements: village games, Knockerballs at the Arctic Colosseum, sledging and spider swings",
            "Inside the hut you decorate the Christmas tree and gingerbreads with the elves",
            "Santa reads letters and writes in the Court books with each family individually",
            "Everyone receives a personal Court decision: nice or naughty",
            "The visit continues into the park area after dark"
          ],
          forWho: "Older children and families who want a story and plenty to do, not just a meeting.",
          url: "https://www.arcandia-en.com/elfcourt"
        },
        {
          name: "Arctic Shaman Adventures — Santa Claus Daytime VIP",
          tagline: "A private Santa meeting in a cosy Lappish hut, entirely your own slot.",
          points: [
            "Private meeting — no shared group",
            "About 2.5 h",
            "The children's names are remembered",
            "Gifts, photos and certificates",
            "Runs during the Christmas season; slots are usually booked well in advance"
          ],
          forWho: "Families who value privacy and a calm atmosphere.",
          url: "https://arcticshamanadventures.com/experiences/"
        }
      ]
    },
    santaVillage: {
      title: "Is there a Santa Claus Village in Levi? Levi vs Rovaniemi",
      content: "This is a common mix-up: the actual Santa Claus Village sits in Rovaniemi on the Arctic Circle, not in Levi. Levi has no village of that name — instead it has elf- and Christmas-themed adventure parks and several operators who take families to Santa in a forest cabin or arrange a private visit.",
      distance: "The distance from Levi to Rovaniemi's Santa Claus Village is roughly 170 km, about 2.5 hours each way, so a day trip is possible.",
      note: "In practice: if you want the Arctic Circle and the post office, that's Rovaniemi. If you want smaller groups, a forest cabin and the option to combine Santa with skiing and safaris, Levi works better."
    },
    bookingNudge: {
      text: "Santa programmes in Levi sell out early — and so does accommodation. We rent saunaed apartments and cabins in Levi centre directly from the owner, with no middleman fees:",
      link: "check available dates and book your stay"
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Where can I meet Santa Claus in Levi?", a: "You meet Santa through local operators: forest cabin visits (e.g. Santa's Secret Hideaway), the Elf Court at Arcandia, safari Santa visits with Tokka Safaris, or a private meeting with Arctic Shaman Adventures. Santa's Cabin on top of the fell is a landmark and photo spot where Santa is not usually present." },
        { q: "Is there a Santa Claus Village in Levi?", a: "No. Santa Claus Village is in Rovaniemi, roughly 170 km or about 2.5 hours' drive from Levi. Levi has its own Christmas adventure parks and Santa meetings instead." },
        { q: "Are private Santa experiences available?", a: "Yes. Arctic Shaman Adventures' Santa Claus Daytime VIP is a private meeting, and several forest cabin programmes also offer a private version. Many operators can also bring Santa to your own accommodation." },
        { q: "Is Santa in Levi year-round?", a: "No — Santa programmes mainly run from November to January depending on the operator. For a year-round meeting, Rovaniemi's Santa Claus Village is the option." },
        { q: "Can I combine a Santa experience with other activities?", a: "Yes, and it's worth it. Some programmes already include a reindeer ride or snowmobile safari, and in Levi it's easy to add skiing, a husky or reindeer safari and an aurora tour to the same trip." },
        { q: "When should I book Santa programmes?", a: "As early as possible. The most popular December and ski-holiday slots often sell out during the summer or early autumn — the same applies to accommodation." },
        { q: "Is it suitable for small children?", a: "Absolutely — Santa experiences are designed for families. Calm cabin visits and shorter programmes suit the youngest best." },
        { q: "Can I take a day trip to Rovaniemi?", a: "Yes, the journey is about 2.5 hours each way. Guided day trips are also available." }
      ]
    },

    cta: {
      text: "Christmas season is extremely popular — book your accommodation early.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Christmas in Lapland", desc: "Atmospheric Christmas guide", href: "/levi/joulu-lapissa" },
        { title: "Levi With Children", desc: "Tips for family holidays", href: "/guide/levi-with-children" },
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Santa Claus in Levi"
  }
};

const SantaClausLevi = ({ lang = "fi" }: SantaClausLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const moderUrl = lang === "fi" ? "https://app.moder.fi/levillenet" : "https://app.moder.fi/levillenet?lang=en";
  const profileIcons = [Heart, Sparkles, Mountain, Star];


  const customUrls: Record<string, string> = {
    fi: "/opas/joulupukki-levilla",
    en: "/guide/santa-claus-in-levi"
  };

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Guide" : "Opas", href: lang === "en" ? "/en/levi" : "/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const letterPdf = lang === "en" ? "/docs/tervetulokirje.pdf" : "/docs/tervetulokirje.pdf";

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
        <meta property="og:image:alt" content={lang === "fi" ? "Joulupukki Levillä" : "Santa Claus in Levi"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Joulupukki Levillä" : "Santa Claus in Levi"} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.h1}</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Santa's Cabin — landmark */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.cabin.title}</h2>
              </div>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={santaCabinImage}
                  alt={lang === "fi" ? "Joulupukin mökki Levin tunturilla" : "Santa's Cabin on Levi fell"}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.cabin.content}</p>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={santaCabinWinter}
                  alt={lang === "fi" ? "Joulupukin mökki talviasussa Levin tunturin huipulla" : "Santa's Cabin in its winter coat on top of Levi fell"}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center italic">
                  {lang === "fi" ? "Joulupukin mökki talviasussa — paksu lumi ja huurre tekevät mökistä erityisen taianomaisen tammikuussa" : "Santa's Cabin in its winter coat — thick snow and frost make the cabin especially magical in January"}
                </p>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.cabin.access}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.cabin.note}</p>
                </div>
              </Card>
            </section>

            {/* Santa experiences */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.experiences.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.experiences.content}</p>
              <Card className="glass-card border-border/30 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.experiences.note}</p>
                </div>
              </Card>

              {/* Welcome letter PDF */}
              <Card className="glass-card border-border/30 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TreePine className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">{t.sections.experiences.letterTitle}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t.sections.experiences.letterDesc}</p>
                <Button variant="outline" asChild>
                  <a href={letterPdf} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    {t.sections.experiences.letterButton}
                  </a>
                </Button>
              </Card>
            </section>

            {/* Which experience suits you */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.profiles.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{t.profiles.intro}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.profiles.items.map((item, idx) => {
                  const Icon = profileIcons[idx] ?? Star;
                  return (
                    <Card key={idx} className="glass-card border-border/30 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <h3 className="font-bold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                      <p className="text-sm font-medium text-primary">{item.match}</p>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Providers */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.providers.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{t.providers.intro}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {t.providers.items.map((p, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.tagline}</p>
                    <ul className="space-y-2 mb-4">
                      {p.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-foreground mb-4 mt-auto">
                      <span className="font-semibold">{t.providers.forWhoLabel}</span> {p.forWho}
                    </p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {t.providers.ctaLabel}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Card>
                ))}
              </div>
              <Card className="glass-card border-border/30 p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.providers.note}</p>
                </div>
              </Card>

              <p className="my-6 pl-4 border-l-2 border-primary/60 text-foreground/90 text-[15px] leading-relaxed">
                {t.bookingNudge.text}{" "}
                <a
                  href={moderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:decoration-primary"
                >
                  {t.bookingNudge.link}
                </a>
                .
              </p>
            </section>

            <MajoitusCallout lang={lang} variant="compact" />

            {/* Other experiences */}

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.other.title}</h2>
              <ul className="space-y-3 mb-4">
                {t.sections.other.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{t.sections.other.disclaimer}</p>
            </section>

            {/* Comparison */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.comparison.title}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card className="glass-card border-border/30 p-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Rovaniemi
                  </h3>
                  <ul className="space-y-2">
                    {t.sections.comparison.rovaniemi.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="glass-card border-border/30 p-6 ring-1 ring-primary/30">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-primary" />
                    Levi
                  </h3>
                  <ul className="space-y-2">
                    {t.sections.comparison.levi.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{t.sections.comparison.daytrip}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground">{t.sections.comparison.tip}</p>
                </div>
              </Card>
            </section>

            {/* Family tips */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.familyTips.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.familyTips.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Camera className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
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

            {/* CTA */}
            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                <Button asChild>
                  <Link to={t.cta.link}>
                    {t.cta.button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            </section>
            <MajoitusCallout lang={lang} />
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

export default SantaClausLevi;
