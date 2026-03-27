import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Sun, CloudRain, Thermometer, ArrowRight, Star, TreeDeciduous, Cloud, Mountain, Calendar } from "lucide-react";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import SnowDepthChart from "@/components/SnowDepthChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WeatherInLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Levin sää nyt — lämpötila, lumensyvyys ja ennuste",
      description: "Levin säätiedot reaaliajassa: lämpötila, lumensyvyys ja tuuliolosuhteet. Kuukausittaiset keskiarvot matkan suunnitteluun.",
      canonical: "https://leville.net/levi/saatieto-levilta"
    },
    title: "Säätietoa Leviltä",
    subtitle: "Lumensyvyys, lämpötilat ja vuodenajat matkailijan silmin",
    intro: "Levin sää on arktinen mutta monipuolinen. Talvet ovat lumisia ja pimeällä kaamoksella on oma viehätyksensä, kun taas kesällä aurinko paistaa yötä päivää. Tämä opas auttaa sinua suunnittelemaan matkasi Levin sääolosuhteiden mukaan.",
    sections: {
      seasons: {
        title: "Millainen sää Levillä on eri vuodenaikoina",
        items: [
          {
            season: "Talvi",
            months: "Marraskuu–maaliskuu",
            temp: "-5 – -35°C",
            desc: "Kaamos tuo mystisen sinisen valon joulu–tammikuussa. Lunta on tyypillisesti 60–120 cm. Täydellinen aika laskettelulle, revontulille ja talviseikkailuille.",
            icon: "snowflake"
          },
          {
            season: "Kevät",
            months: "Maaliskuu–toukokuu",
            temp: "-10 – +10°C",
            desc: "Kevätaurinko palauttaa valoisat päivät. Hanget ovat parhaimmillaan hiihtoladuilla. Laskettelu jatkuu usein vapulle asti.",
            icon: "sun"
          },
          {
            season: "Kesä",
            months: "Kesäkuu–elokuu",
            temp: "+10 – +25°C",
            desc: "Yötön yö tarjoaa valoisat illan ja yön tunnit. Vaellus, pyöräily ja kalastus houkuttelevat luontoihmisiä.",
            icon: "sun"
          },
          {
            season: "Syksy",
            months: "Syyskuu–lokakuu",
            temp: "+5 – -5°C",
            desc: "Ruska värjää tunturit syyskuussa. Ensimmäinen lumi saapuu usein lokakuussa. Rauhallinen kausi ennen talvea.",
            icon: "tree"
          }
        ]
      },
      snowDepth: {
        title: "Lumensyvyys Levillä eri vuosina",
        intro: "Ilmatieteen laitoksen (FMI) mittaukset Kittilän kirkonkylällä kertovat tyypillisestä lumipeitetilanteesta.",
        arrivalTitle: "Milloin lumi saapuu?",
        arrivalDesc: "Ensimmäinen pysyvä lumi saapuu Leville tyypillisesti lokakuun lopussa tai marraskuun alussa. Lumitykki mahdollistaa rinnerinteiden avaamisen jo lokakuussa, mutta luonnon lumi vahvistuu marraskuussa.",
        decemberTitle: "Lumensyvyys joulukuussa",
        decemberDesc: "Joulukuun alussa lumensyvyys on keskimäärin 40–60 cm. Joulun aikaan lunta on tyypillisesti 50–80 cm, mikä takaa lumisen maiseman jouluun.",
        tableTitle: "Tyypillinen lumensyvyys kuukausittain",
        months: [
          { month: "Marraskuu", depth: "20–40 cm", note: "Ensimmäinen lumi" },
          { month: "Joulukuu", depth: "40–70 cm", note: "Luminen joulu taattu" },
          { month: "Tammikuu", depth: "50–80 cm", note: "Paksu lumipeite" },
          { month: "Helmikuu", depth: "60–90 cm", note: "Eniten lunta" },
          { month: "Maaliskuu", depth: "70–100 cm", note: "Kevätaurinko, hyvät latukelit" },
          { month: "Huhtikuu", depth: "50–80 cm", note: "Sulaminen alkaa hiljalleen" }
        ],
        exceptionNote: "Poikkeuksia esiintyy: vuonna 2020 joulukuun lumitilanne oli poikkeuksellisen heikko, mutta lumitykkien ansiosta rinteet olivat auki."
      },
      temperatures: {
        title: "Lämpötilat Levillä",
        intro: "Arktinen ilmasto tuo vaihtelua. Tässä tyypilliset lämpötilat eri kuukausina.",
        months: [
          { month: "Tammikuu", temp: "-15 – -35°C", tip: "Kylmimmät päivät, varaudu hyvin" },
          { month: "Helmikuu", temp: "-10 – -30°C", tip: "Valo palaa, pakkaset jatkuvat" },
          { month: "Maaliskuu", temp: "-5 – -20°C", tip: "Kevätaurinko lämmittää" },
          { month: "Huhtikuu", temp: "-5 – +5°C", tip: "Sulamiskausi lähestyy" },
          { month: "Toukokuu", temp: "0 – +15°C", tip: "Kevät täydessä vauhdissa" },
          { month: "Kesäkuu", temp: "+5 – +20°C", tip: "Yötön yö alkaa" },
          { month: "Heinäkuu", temp: "+10 – +25°C", tip: "Lämpimimmät päivät" },
          { month: "Elokuu", temp: "+8 – +20°C", tip: "Loppukesä viileää" },
          { month: "Syyskuu", temp: "+2 – +12°C", tip: "Ruska-aika" },
          { month: "Lokakuu", temp: "-5 – +5°C", tip: "Ensimmäiset pakkaset" },
          { month: "Marraskuu", temp: "-5 – -15°C", tip: "Talvi alkaa" },
          { month: "Joulukuu", temp: "-10 – -25°C", tip: "Kaamos ja luminen maisema" }
        ],
        tips: [
          "Pukeudu kerroksittain: aluskerros, välikerros, tuulenpitävä ulkokerros",
          "Kovalla pakkasella (-25°C tai kylmempi) suojaa kasvot ja sormet erityisesti",
          "Villasukat ja kunnolliset talvikengät ovat välttämättömät",
          "Älä aliarvioi tuulen vaikutusta – tuntuu kylmemmältä kuin lämpömittari näyttää"
        ]
      },
      travelImpact: {
        title: "Miten sää vaikuttaa matkailuun Levillä",
        categories: [
          {
            title: "Laskettelu",
            icon: "mountain",
            items: [
              "Lumitykki takaa rinteiden avaamisen jo lokakuussa",
              "Paras lasketteluaika: joulukuu–huhtikuu",
              "Kovalla pakkasella (-25°C) hissejä voidaan sulkea"
            ]
          },
          {
            title: "Revontulet",
            icon: "star",
            items: [
              "Paras aika: syyskuu–maaliskuu",
              "Parhaat olosuhteet: kirkas yötaivas, kylmä sää",
              "Kaamos tuo pitkät yöt – enemmän mahdollisuuksia"
            ]
          },
          {
            title: "Perhematkailu",
            icon: "calendar",
            items: [
              "Lämpimimmät talvikuukaudet: marraskuu ja maaliskuu",
              "Alle -20°C saattaa rajoittaa pienten lasten ulkoilua",
              "Laskettelukoulut toimivat säästä riippumatta"
            ]
          },
          {
            title: "Safarit ja ulkoaktiviteetit",
            icon: "cloud",
            items: [
              "Koira- ja porosafareilla pakkasraja tyypillisesti -20°C",
              "Moottorikelkkasafarit toimivat lähes kaikissa olosuhteissa",
              "Lumikenkäily ja hiihto parhaimmillaan maaliskuussa"
            ]
          }
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Onko Levillä aina lunta jouluna?",
          a: "Kyllä, Levillä on lähes aina lunta joulun aikaan. Tyypillisesti lumensyvyys joulukuussa on 50–70 cm. Poikkeuksellisina vuosina lumitykit takaavat lumenpeitteet rinteillä."
        },
        {
          q: "Miten kylmää Levillä on helmikuussa?",
          a: "Helmikuussa lämpötilat vaihtelevat tyypillisesti -10°C:sta -30°C:seen. Valo kuitenkin palaa, joten päivät tuntuvat valoisammilta kuin joulukuussa."
        },
        {
          q: "Milloin on paras aika matkustaa Leville perheen kanssa?",
          a: "Perheille maaliskuu on erinomainen aika: valoa on runsaasti, lämpötilat ovat maltillisempia (-5 – -15°C) ja lunta on vielä paljon."
        },
        {
          q: "Vaikuttaako sää revontulien näkemiseen?",
          a: "Kyllä. Revontulien näkeminen vaatii kirkkaan taivaan. Parhaat mahdollisuudet ovat pakkasöinä, kun taivas on pilvetön. Seuraa sääennustetta ja revontuliennustetta."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa majoitus Leviltä",
      accommodationLink: "/majoitukset"
    },
    breadcrumbLabel: "Säätietoa Leviltä",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talvi Levillä", desc: "Kaamos, lumi ja aktiviteetit", href: "/opas/talvi-levi" },
        { title: "Levin lumitilanne", desc: "Lumensyvyys ja latujen kunto", href: "/lumitilanne" },
        { title: "Laskettelu Levillä", desc: "Rinteiden olosuhteet", href: "/opas/laskettelu-levi" },
        { title: "Talvivarusteet", desc: "Pukeudu sään mukaan oikein", href: "/opas/talvivarusteet-leville" },
        { title: "Kesä Levillä", desc: "Yötön yö ja kesäaktiviteetit", href: "/opas/kesa-levi" },
        { title: "Revontulet", desc: "Milloin revontulia näkee", href: "/revontulet" },
      ],
    },
  },
  en: {
    meta: {
      title: "Levi Weather Now — Temperature, Snow Depth & Forecast",
      description: "Live weather data for Levi ski resort. Current temperature, snow depth and wind conditions. Monthly averages for trip planning.",
      canonical: "https://leville.net/en/levi/weather-in-levi"
    },
    title: "Weather in Levi",
    subtitle: "Snow depth, temperatures and seasons from a traveler's perspective",
    intro: "Levi's weather is arctic but diverse. Winters are snowy and the polar night has its own allure, while summer brings the midnight sun. This guide helps you plan your trip according to Levi's weather conditions.",
    sections: {
      seasons: {
        title: "Weather by Season in Levi",
        items: [
          {
            season: "Winter",
            months: "November–March",
            temp: "-5 to -35°C",
            desc: "The polar night brings mystical blue light in December–January. Snow depth is typically 60–120 cm. Perfect time for skiing, northern lights and winter adventures.",
            icon: "snowflake"
          },
          {
            season: "Spring",
            months: "March–May",
            temp: "-10 to +10°C",
            desc: "Spring sun brings bright days. Snow conditions are at their best for cross-country skiing. Downhill skiing often continues until May Day.",
            icon: "sun"
          },
          {
            season: "Summer",
            months: "June–August",
            temp: "+10 to +25°C",
            desc: "The midnight sun provides light throughout the night. Hiking, biking and fishing attract nature enthusiasts.",
            icon: "sun"
          },
          {
            season: "Autumn",
            months: "September–October",
            temp: "+5 to -5°C",
            desc: "Ruska colors the fells in September. First snow usually arrives in October. A peaceful season before winter.",
            icon: "tree"
          }
        ]
      },
      snowDepth: {
        title: "Snow Depth in Levi by Year",
        intro: "Data from the Finnish Meteorological Institute (FMI) at Kittilä village shows typical snow cover conditions.",
        arrivalTitle: "When Does Snow Usually Arrive?",
        arrivalDesc: "The first permanent snow typically arrives in Levi in late October or early November. Snow cannons allow slopes to open as early as October, but natural snowfall strengthens in November.",
        decemberTitle: "Snow Depth in December",
        decemberDesc: "In early December, snow depth averages 40–60 cm. At Christmas time, there's typically 50–80 cm of snow, guaranteeing a white Christmas.",
        tableTitle: "Typical Snow Depth by Month",
        months: [
          { month: "November", depth: "20–40 cm", note: "First snow arrives" },
          { month: "December", depth: "40–70 cm", note: "White Christmas guaranteed" },
          { month: "January", depth: "50–80 cm", note: "Deep snow cover" },
          { month: "February", depth: "60–90 cm", note: "Peak snow depth" },
          { month: "March", depth: "70–100 cm", note: "Spring sun, excellent skiing" },
          { month: "April", depth: "50–80 cm", note: "Gradual melting begins" }
        ],
        exceptionNote: "Exceptions occur: in 2020, December had unusually low natural snow, but snow cannons ensured slopes remained open."
      },
      temperatures: {
        title: "Typical Temperatures in Levi",
        intro: "Arctic climate brings variation. Here are typical temperatures throughout the year.",
        months: [
          { month: "January", temp: "-15 to -35°C", tip: "Coldest days, dress warmly" },
          { month: "February", temp: "-10 to -30°C", tip: "Light returns, frost continues" },
          { month: "March", temp: "-5 to -20°C", tip: "Spring sun warms" },
          { month: "April", temp: "-5 to +5°C", tip: "Melting season approaches" },
          { month: "May", temp: "0 to +15°C", tip: "Spring in full swing" },
          { month: "June", temp: "+5 to +20°C", tip: "Midnight sun begins" },
          { month: "July", temp: "+10 to +25°C", tip: "Warmest days" },
          { month: "August", temp: "+8 to +20°C", tip: "Late summer cooling" },
          { month: "September", temp: "+2 to +12°C", tip: "Ruska season" },
          { month: "October", temp: "-5 to +5°C", tip: "First frosts" },
          { month: "November", temp: "-5 to -15°C", tip: "Winter begins" },
          { month: "December", temp: "-10 to -25°C", tip: "Polar night and snowy landscape" }
        ],
        tips: [
          "Dress in layers: base layer, mid layer, windproof outer layer",
          "In severe cold (-25°C or colder) protect your face and fingers especially",
          "Wool socks and proper winter boots are essential",
          "Don't underestimate wind chill – it feels colder than the thermometer shows"
        ]
      },
      travelImpact: {
        title: "How Weather Affects Your Holiday in Levi",
        categories: [
          {
            title: "Skiing",
            icon: "mountain",
            items: [
              "Snow cannons ensure slopes open as early as October",
              "Best skiing time: December–April",
              "In severe cold (-25°C) some lifts may close"
            ]
          },
          {
            title: "Northern Lights",
            icon: "star",
            items: [
              "Best time: September–March",
              "Best conditions: clear night sky, cold weather",
              "Polar night brings long nights – more opportunities"
            ]
          },
          {
            title: "Family Travel",
            icon: "calendar",
            items: [
              "Warmest winter months: November and March",
              "Below -20°C may limit outdoor time for young children",
              "Ski schools operate regardless of weather"
            ]
          },
          {
            title: "Safaris and Outdoor Activities",
            icon: "cloud",
            items: [
              "Husky and reindeer safaris have cold limit around -20°C",
              "Snowmobile safaris operate in almost all conditions",
              "Snowshoeing and skiing are best in March"
            ]
          }
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Is there always snow in Levi at Christmas?",
          a: "Yes, Levi almost always has snow at Christmas time. Typical snow depth in December is 50–70 cm. In exceptional years, snow cannons guarantee snow on the slopes."
        },
        {
          q: "How cold is it in Levi in February?",
          a: "February temperatures typically range from -10°C to -30°C. However, daylight returns, making days feel brighter than in December."
        },
        {
          q: "When is the best time to visit Levi with family?",
          a: "For families, March is excellent: plenty of daylight, milder temperatures (-5 to -15°C) and still lots of snow."
        },
        {
          q: "Does weather affect seeing the Northern Lights?",
          a: "Yes. Seeing the Northern Lights requires clear skies. Best chances are on cold nights when the sky is cloudless. Check the weather forecast and aurora forecast."
        }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book Accommodation in Levi",
      accommodationLink: "/en/accommodations"
    },
    breadcrumbLabel: "Weather in Levi",
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter in Levi", desc: "Polar night, snow and activities", href: "/guide/winter-in-levi" },
        { title: "Levi Snow Report", desc: "Snow depth and trail conditions", href: "/en/snowreport" },
        { title: "Skiing in Levi", desc: "Slope conditions and tips", href: "/guide/skiing-in-levi" },
        { title: "Winter Clothing", desc: "Dress right for the weather", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Summer in Levi", desc: "Midnight sun and summer activities", href: "/guide/summer-in-levi" },
        { title: "Northern Lights", desc: "When to see the aurora", href: "/en/northern-lights" },
      ],
    },
  },
  nl: {
    meta: {
      title: "Weer in Levi – sneeuwdiepte & seizoenen | Leville.net",
      description: "Weer in Levi: sneeuwdiepte, temperaturen en seizoenen. Plan je reis met data van het Fins Meteorologisch Instituut.",
      canonical: "https://leville.net/nl/levi/weer-in-levi"
    },
    title: "Weer in Levi",
    subtitle: "Sneeuwdiepte, temperaturen en seizoenen vanuit reizigersperspectief",
    intro: "Het weer in Levi is arctisch maar afwisselend. Winters zijn besneeuwd en de poolnacht heeft zijn eigen charme, terwijl de zomer de middernachtzon brengt. Deze gids helpt je je reis te plannen op basis van de weersomstandigheden in Levi.",
    sections: {
      seasons: {
        title: "Weer per seizoen in Levi",
        items: [
          { season: "Winter", months: "November–maart", temp: "-5 tot -35°C", desc: "De poolnacht brengt mystiek blauw licht in december–januari. Sneeuwdiepte is doorgaans 60–120 cm. Perfecte tijd voor skiën, noorderlicht en winteravonturen.", icon: "snowflake" },
          { season: "Lente", months: "Maart–mei", temp: "-10 tot +10°C", desc: "De lentezon brengt heldere dagen. Sneeuwcondities zijn optimaal voor langlaufen. Skiën gaat vaak door tot 1 mei.", icon: "sun" },
          { season: "Zomer", months: "Juni–augustus", temp: "+10 tot +25°C", desc: "De middernachtzon verlicht de nacht. Wandelen, fietsen en vissen trekken natuurliefhebbers aan.", icon: "sun" },
          { season: "Herfst", months: "September–oktober", temp: "+5 tot -5°C", desc: "Ruska kleurt de fjells in september. De eerste sneeuw valt meestal in oktober. Een rustig seizoen vóór de winter.", icon: "tree" }
        ]
      },
      snowDepth: {
        title: "Sneeuwdiepte in Levi per jaar",
        intro: "Data van het Fins Meteorologisch Instituut (FMI) bij Kittilä toont typische sneeuwcondities.",
        arrivalTitle: "Wanneer komt de sneeuw?",
        arrivalDesc: "De eerste permanente sneeuw arriveert doorgaans eind oktober of begin november. Sneeuwkanonnen maken het mogelijk pistes al in oktober te openen, maar natuurlijke sneeuwval versterkt in november.",
        decemberTitle: "Sneeuwdiepte in december",
        decemberDesc: "Begin december is de sneeuwdiepte gemiddeld 40–60 cm. Met Kerstmis ligt er doorgaans 50–80 cm sneeuw, wat een witte kerst garandeert.",
        tableTitle: "Typische sneeuwdiepte per maand",
        months: [
          { month: "November", depth: "20–40 cm", note: "Eerste sneeuw" },
          { month: "December", depth: "40–70 cm", note: "Witte kerst gegarandeerd" },
          { month: "Januari", depth: "50–80 cm", note: "Dik sneeuwdek" },
          { month: "Februari", depth: "60–90 cm", note: "Piek sneeuwdiepte" },
          { month: "Maart", depth: "70–100 cm", note: "Lentezon, uitstekend skiën" },
          { month: "April", depth: "50–80 cm", note: "Geleidelijke dooi" }
        ],
        exceptionNote: "Uitzonderingen komen voor: in 2020 was de sneeuw in december uitzonderlijk laag, maar sneeuwkanonnen zorgden dat de pistes open bleven."
      },
      temperatures: {
        title: "Typische temperaturen in Levi",
        intro: "Het arctische klimaat brengt variatie. Hier zijn typische temperaturen door het jaar.",
        months: [
          { month: "Januari", temp: "-15 tot -35°C", tip: "Koudste dagen, kleed je warm" },
          { month: "Februari", temp: "-10 tot -30°C", tip: "Licht keert terug, vorst blijft" },
          { month: "Maart", temp: "-5 tot -20°C", tip: "Lentezon verwarmt" },
          { month: "April", temp: "-5 tot +5°C", tip: "Dooiseizoen nadert" },
          { month: "Mei", temp: "0 tot +15°C", tip: "Lente in volle gang" },
          { month: "Juni", temp: "+5 tot +20°C", tip: "Middernachtzon begint" },
          { month: "Juli", temp: "+10 tot +25°C", tip: "Warmste dagen" },
          { month: "Augustus", temp: "+8 tot +20°C", tip: "Nazomer koelt af" },
          { month: "September", temp: "+2 tot +12°C", tip: "Ruska-seizoen" },
          { month: "Oktober", temp: "-5 tot +5°C", tip: "Eerste vorst" },
          { month: "November", temp: "-5 tot -15°C", tip: "Winter begint" },
          { month: "December", temp: "-10 tot -25°C", tip: "Poolnacht en besneeuwd landschap" }
        ],
        tips: [
          "Kleed je in lagen: basislaag, middenlaag, winddichte buitenlaag",
          "Bij strenge kou (-25°C of kouder) bescherm vooral gezicht en vingers",
          "Wollen sokken en goede winterlaarzen zijn essentieel",
          "Onderschat de gevoelstemperatuur door wind niet – het voelt kouder dan de thermometer aangeeft"
        ]
      },
      travelImpact: {
        title: "Hoe het weer je vakantie in Levi beïnvloedt",
        categories: [
          { title: "Skiën", icon: "mountain", items: ["Sneeuwkanonnen zorgen dat pistes al in oktober opengaan", "Beste skiperiode: december–april", "Bij strenge kou (-25°C) kunnen sommige liften sluiten"] },
          { title: "Noorderlicht", icon: "star", items: ["Beste periode: september–maart", "Beste condities: heldere nachtelijke hemel, koud weer", "Poolnacht brengt lange nachten – meer kansen"] },
          { title: "Gezinsvakanties", icon: "calendar", items: ["Warmste wintermaanden: november en maart", "Onder -20°C kan buitentijd voor jonge kinderen beperkt zijn", "Skischolen draaien ongeacht het weer"] },
          { title: "Safari's en buitenactiviteiten", icon: "cloud", items: ["Husky- en rendierensafari's hebben een koudegrens van ca. -20°C", "Sneeuwscootersafari's draaien in bijna alle omstandigheden", "Sneeuwschoenwandelen en langlaufen zijn het best in maart"] }
        ]
      }
    },
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Ligt er altijd sneeuw in Levi met Kerstmis?", a: "Ja, Levi heeft bijna altijd sneeuw met Kerstmis. De typische sneeuwdiepte in december is 50–70 cm. In uitzonderlijke jaren garanderen sneeuwkanonnen sneeuw op de pistes." },
        { q: "Hoe koud is het in Levi in februari?", a: "Temperaturen in februari variëren doorgaans van -10°C tot -30°C. Het daglicht keert echter terug, waardoor de dagen helderder aanvoelen dan in december." },
        { q: "Wanneer is de beste tijd om Levi te bezoeken met het gezin?", a: "Voor gezinnen is maart uitstekend: volop daglicht, mildere temperaturen (-5 tot -15°C) en nog veel sneeuw." },
        { q: "Beïnvloedt het weer het zien van noorderlicht?", a: "Ja. Noorderlicht zien vereist een heldere hemel. De beste kansen zijn op koude nachten met wolkenloze lucht. Check de weersvoorspelling en de noorderlichtvoorspelling." }
      ]
    },
    cta: {
      hub: "Terug naar Levi-reisgids",
      hubLink: "/nl/levi",
      accommodation: "Boek accommodatie in Levi",
      accommodationLink: "/nl/accommodaties"
    },
    breadcrumbLabel: "Weer in Levi",
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Winter in Levi", desc: "Poolnacht, sneeuw en activiteiten", href: "/nl/gids/winter-in-levi" },
        { title: "Skiën in Levi", desc: "Piste-omstandigheden en tips", href: "/nl/gids/skieen-in-levi" },
        { title: "Winterkleding", desc: "Kleed je goed voor het weer", href: "/nl/gids/winterkleding-levi-lapland" },
        { title: "Zomer in Levi", desc: "Middernachtzon en zomeractiviteiten", href: "/nl/gids/zomer-in-levi" },
        { title: "Seizoenen in Levi", desc: "Welk seizoen past bij jou", href: "/nl/gids/seizoenen-in-levi" },
        { title: "Noorderlicht", desc: "Wanneer zie je het noorderlicht", href: "/nl/noorderlicht" },
      ],
    },
  }
};

const WeatherInLevi = ({ lang = "fi" }: WeatherInLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = { fi: "/levi/saatieto-levilta", en: "/en/levi/weather-in-levi", nl: "/nl/levi/weer-in-levi" };

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : lang === "nl" ? "/nl" : "/en" },
    { label: "Levi", href: lang === "fi" ? "/levi" : lang === "nl" ? "/nl/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    snowflake: <Snowflake className="w-5 h-5 text-primary" />,
    sun: <Sun className="w-5 h-5 text-primary" />,
    tree: <TreeDeciduous className="w-5 h-5 text-primary" />,
    mountain: <Mountain className="w-5 h-5 text-primary" />,
    star: <Star className="w-5 h-5 text-primary" />,
    calendar: <Calendar className="w-5 h-5 text-primary" />,
    cloud: <Cloud className="w-5 h-5 text-primary" />
  };

  return (
    <>
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
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "nl" ? "nl_NL" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": t.title,
            "description": t.meta.description,
            "author": { "@type": "Organization", "name": "Leville.net" },
            "publisher": { "@type": "Organization", "name": "Leville.net" }
          })}
        </script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Seasons */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t.sections.seasons.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.seasons.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.season}</h3>
                        <p className="text-sm text-primary mb-1">{item.months} • {item.temp}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Snow Depth */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.sections.snowDepth.title}
              </h2>
              <p className="text-muted-foreground mb-6">{t.sections.snowDepth.intro}</p>
              
              {/* Interactive Snow Depth Chart */}
              <div className="mb-8">
                <SnowDepthChart lang={lang} />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t.sections.snowDepth.arrivalTitle}
                  </h3>
                  <p className="text-muted-foreground">{t.sections.snowDepth.arrivalDesc}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t.sections.snowDepth.decemberTitle}
                  </h3>
                  <p className="text-muted-foreground">{t.sections.snowDepth.decemberDesc}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t.sections.snowDepth.tableTitle}
                  </h3>
                  <div className="space-y-2">
                    {t.sections.snowDepth.months.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="w-24 font-medium text-foreground">{item.month}</div>
                        <div className="w-24 text-primary font-medium">{item.depth}</div>
                        <div className="text-sm text-muted-foreground">{item.note}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    {t.sections.snowDepth.exceptionNote}
                  </p>
                </div>
              </div>
            </section>

            {/* Temperatures */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.sections.temperatures.title}
              </h2>
              <p className="text-muted-foreground mb-6">{t.sections.temperatures.intro}</p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {t.sections.temperatures.months.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="font-medium text-foreground">{item.month}</div>
                    <div className="text-primary font-medium">{item.temp}</div>
                    <div className="text-xs text-muted-foreground">{item.tip}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card border-border/30 p-5 rounded-xl">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  {lang === "fi" ? "Vinkit pukeutumiseen" : "Clothing Tips"}
                </h3>
                <ul className="space-y-2">
                  {t.sections.temperatures.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Travel Impact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t.sections.travelImpact.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.travelImpact.categories.map((cat, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        {iconMap[cat.icon]}
                      </div>
                      <h3 className="font-semibold text-foreground">{cat.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
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

            <GuideDisclaimer lang={lang} />

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={t.cta.hubLink}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t.cta.hub}
                </Link>
              </Button>
              <Button asChild>
                <Link to={t.cta.accommodationLink}>
                  {t.cta.accommodation}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </section>
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

export default WeatherInLevi;