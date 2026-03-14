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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Paras aika nähdä revontulet Levillä — Kuukaudet, kellonajat ja olosuhteet | Leville.net",
      description: "Milloin revontulet näkyvät Levillä parhaiten? Parhaat kuukaudet, kellonajat, pimeyden merkitys ja todennäköisyydet kuukausi kerrallaan.",
      canonical: "https://leville.net/opas/paras-aika-revontulet-levi"
    },
    h1: "Paras aika nähdä revontulet Levillä",
    breadcrumbLabel: "Paras aika revontulille",
    sections: [
      {
        title: "Revontulisesonki Levillä lyhyesti",
        content: `Revontulikausi kestää Levillä noin elokuun lopusta huhtikuun alkuun — aina kun yöt ovat riittävän pimeitä. Kesällä yötön yö estää revontulien näkemisen kokonaan: touko–heinäkuussa aurinko ei laske lainkaan tai laskee vain hetkeksi horisontin alle. Aurinko on yhtä aktiivinen ympäri vuoden, mutta valoisina öinä revontulia ei voi nähdä paljaalla silmällä.

Tämä tekee Levistä erityisen paikan: pitkä revontulisesonki (7–8 kuukautta) yhdistettynä sijaintiin napapiirin pohjoispuolella (67,8° N) tarkoittaa, että mahdollisuuksia on kymmeniä öitä vuodessa. Levi sijaitsee aurora-ovaalin alla — vyöhykkeellä jossa revontulia esiintyy tilastollisesti eniten.`
      },
      {
        title: "Parhaat kuukaudet",
        content: `**Syyskuu:** Kausi alkaa toden teolla syyskuun puolivälissä. Yöt pimenevät nopeasti syyskulun edetessä ja ensimmäiset selkeät aurora-havainnot tehdään tyypillisesti syyskuun kolmannella viikolla. Syyskuun erityinen etu on ruska-aika — revontulien näkeminen ruskan värjäämän maiseman yllä on unohtumaton kokemus. Sää on usein vielä kirkas ja miellyttävän viileä.

**Lokakuu:** Erinomainen kuukausi. Yöt ovat jo pitkiä (16+ tuntia pimeyttä) ja sää on usein kirkas ennen talven pilvikauden alkua. Lokakuu on myös rauhallinen ja edullinen matkustusaika — turisteja on vähän mutta revontulimahdollisuudet ovat erinomaiset.

**Marraskuu:** Yöt pidentyvät entisestään ja kaamos lähestyy. Pilvisyys kuitenkin lisääntyy marraskuussa, mikä on suurin haaste. Kirkkaana yönä mahdollisuudet ovat erinomaiset — pimeyden puolesta ei ole ongelmaa.

**Joulukuu:** Kaamos — Levillä aurinko ei nouse lainkaan joulukuun puolivälissä. Pisimmät yöt tarkoittavat teoriassa eniten mahdollisuuksia, mutta joulukuun pilvisyys on Lapin korkeimmillaan. Kirkkaana pakkasyönä näytös voi olla uskomaton.

**Tammikuu:** Monien kokemusten perusteella paras yksittäinen kuukausi. Yöt ovat edelleen hyvin pitkiä, mutta tammikuussa alkaa usein kirkas pakkasjakso joka kestää viikkoja. Kylmä ilma tarkoittaa tyypillisesti vähemmän pilviä. Tammikuu on myös rauhallinen ja edullinen.

**Helmikuu:** Erinomainen. Yöt ovat vielä riittävän pitkiä (pimeys klo 17–08) ja sää on usein kirkas ja kylmä. Hiihtoloma tuo enemmän matkailijoita, mutta se ei vaikuta revontulien näkyvyyteen — taivas on kaikille sama.

**Maaliskuu:** Vielä mahdollista alkukuussa. Yöt lyhenevät nopeasti maaliskuun edetessä ja kuun lopussa yöt ovat jo niin vaaleita, ettei heikkoja revontulia enää erota. Viimeiset hyvät mahdollisuudet ovat yleensä maaliskuun ensimmäisellä ja toisella viikolla.`
      },
      {
        title: "Paras kellonaika",
        content: `Revontulet näkyvät parhaiten klo 21–01 välillä, mutta voivat esiintyä heti pimeän tultua ja ennen aamunkoittoa. Tilastollisesti aktiivisin aika on noin klo 22–24 paikallista aikaa, mutta tämä vaihtelee merkittävästi yöstä toiseen.

Paras strategia on yksinkertainen: tarkista ennuste illalla ja mene ulos kun Kp-indeksi on korkea (3+). Ei tarvitse valvoa koko yötä — parhaimmillaan revontulinäytös kestää vain 15–30 minuuttia kerrallaan, mutta voimakkailla myrskyillä taivas voi olla aktiivinen tunteja.

**Vinkki:** Asenna puhelimeen revontuli-ilmoitussovellus (esim. My Aurora Forecast) niin saat hälytyksen kun aktiivisuus nousee. Näin voit nukkua rauhassa ja herätä vain kun mahdollisuudet ovat hyvät.`
      },
      {
        title: "Pimeyden merkitys",
        content: `Revontulia esiintyy ilmakehässä ympäri vuoden — ne eivät katoa kesäksi. Mutta ne näkyvät silmälle vain pimeää taivasta vasten. Levillä tämä tarkoittaa käytännössä:

• **Ei näy:** touko–heinäkuussa (yötön yö — aurinko ei laske)
• **Heikosti:** elokuun alussa ja maaliskuun lopussa (yöt liian valoisia heikoille aururoille)
• **Parhaiten:** syys–helmikuussa (pitkät pimeät yöt, 14–24 tuntia pimeyttä)

Kaamos-aika (joulukuun alusta tammikuun puoliväliin) tarjoaa pisimmät pimeät jaksot ja teoriassa eniten katseluaikaa. Kääntöpuoli on, että juuri silloin pilvisyys on usein korkeimmillaan.`
      },
      {
        title: "Pilvisyys — suurin vihollinen",
        content: `Revontulet tapahtuvat 100–300 kilometrin korkeudessa ilmakehässä. Jos taivas on pilvinen, et näe niitä — vaikka ne olisivat siellä vahvoina. Pilvisyys on ylivoimaisesti yleisin syy miksi revontulia ei näe Levillä tietyllä yöllä.

Levillä mannermainen ilmasto tuottaa enemmän selkeitä öitä kuin Norjan tai Islannin rannikkoseudut — tämä on yksi Levin merkittävistä eduista. Mutta pilvisyys on silti arkipäivää, erityisesti marras–joulukuussa.

**Käytännön vinkki:** Tarkista aina pilviennuste ennen kuin lähdet ulos. Ilmatieteen laitos (ilmatieteenlaitos.fi) ja yr.no tarjoavat tarkan pilviennusteen tunti tunnilta. Joskus pilvikerros on paikallinen — 20 km ajomatka voi riittää selkeämmälle alueelle.`
      },
      {
        title: "Auringon aktiivisuussykli",
        content: `Aurinko käy läpi noin 11 vuoden pituisia aktiivisuussyklejä. Aktiivisuuden huipulla aurinko lähettää enemmän ja voimakkaampia hiukkaspurkauksia (CME), jotka aiheuttavat vahvempia revontulia. Vuodet 2024–2026 ovat lähellä nykyisen syklin huippua (Solar Cycle 25), ja poikkeuksellisen vahvoja revontulia on nähty ennätysmäisesti — jopa Keski-Euroopassa.

Tämä ei kuitenkaan tarkoita, etteikö muina vuosina näkisi revontulia Levillä. Levi on napapiirin pohjoispuolella, aurora-ovaalin alla, jossa revontulia esiintyy vuosittain kymmeniä kertoja riippumatta auringon syklivaiheesta. Aktiivisuushuippu lisää vain vahvojen myrskyjen todennäköisyyttä — heikkoja ja keskivahvoja revontulia näkee joka talvi.`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Mikä on paras kuukausi revontulille Levillä?", a: "Tammikuu ja helmikuu yhdistävät pitkät yöt ja usein kirkkaan pakkassään. Syyskuu on myös erinomainen — yöt ovat jo riittävän pimeitä, sää kirkas ja ruska-aika tekee maisemasta unohtumattoman." },
        { q: "Mihin kellonaikaan kannattaa mennä ulos?", a: "Klo 21–01 on tilastollisesti todennäköisin aika, mutta revontulia voi esiintyä heti pimeän tultua. Tarkista ennuste illalla ja mene ulos kun Kp-indeksi on 3 tai enemmän." },
        { q: "Näkeekö revontulia joka yö?", a: "Ei — se riippuu auringon aktiivisuudesta ja pilvisyydestä. Pidemmällä lomalla (3+ yötä) todennäköisyys nähdä revontulia kasvaa merkittävästi. Tilastollisesti Levillä on noin 150 aurora-yötä vuodessa." },
        { q: "Näkyykö revontulia Levin keskustassa?", a: "Kyllä, jos aktiivisuus on vahva (Kp 5+). Mutta paras kokemus on muutaman sadan metrin päässä katuvalöista, jossa silmät tottuvat pimeyteen paremmin." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava opas revontulista", href: "/revontulet" },
        { title: "Talvi Levillä", desc: "Mitä talviloma Levillä tarjoaa?", href: "/opas/talvi-levi" },
        { title: "Majoitukset", desc: "Katsele revontulia omalta terassilta", href: "/majoitukset" }
      ]
    }
  },
  en: {
    meta: {
      title: "Best Time to See Northern Lights in Levi — Months, Hours & Conditions | Leville.net",
      description: "When are northern lights best visible in Levi? Best months, best hours of the night, darkness requirements and monthly probability.",
      canonical: "https://leville.net/guide/best-time-to-see-northern-lights-levi"
    },
    h1: "Best Time to See Northern Lights in Levi",
    breadcrumbLabel: "Best Time for Aurora",
    sections: [
      {
        title: "Aurora Season in Levi at a Glance",
        content: `The northern lights season in Levi lasts from approximately late August to early April — whenever nights are dark enough. During summer, the midnight sun prevents aurora viewing entirely: from May to July, the sun doesn't set at all or barely dips below the horizon. The sun is equally active year-round, but during light nights the aurora is invisible to the naked eye.

This makes Levi a special place: a long aurora season (7–8 months) combined with a location north of the Arctic Circle (67.8° N) means there are dozens of potential viewing nights per year. Levi sits beneath the aurora oval — the zone where northern lights occur most frequently.`
      },
      {
        title: "Best Months",
        content: `**September:** The season begins in earnest around mid-September. Nights darken rapidly and the first clear aurora sightings are typically made during the third week. September's special advantage is the ruska (autumn foliage) season — seeing northern lights above a landscape painted in gold and red is unforgettable. Weather is often still clear and pleasantly cool.

**October:** An excellent month. Nights are already long (16+ hours of darkness) and weather is often clear before the winter cloud season begins. October is also a quiet and affordable travel period — few tourists but excellent aurora possibilities.

**November:** Nights grow even longer and the polar night approaches. However, cloudiness increases in November, which is the main challenge. On clear nights, conditions are excellent — darkness is not an issue.

**December:** Polar night — in Levi the sun doesn't rise at all around mid-December. The longest nights theoretically mean the most opportunities, but December cloud cover in Lapland is at its highest. On a clear frosty night, the display can be breathtaking.

**January:** Based on experience, the single best month. Nights are still very long, but January often brings a clear cold spell lasting weeks. Cold air typically means fewer clouds. January is also quiet and affordable.

**February:** Excellent. Nights are still long enough (darkness from 5 PM to 8 AM) and weather is often clear and cold. The ski holiday season brings more visitors, but this doesn't affect aurora visibility — the sky is the same for everyone.

**March:** Still possible in early March. Nights shorten rapidly as the month progresses and by month's end nights are too light for faint aurora. The last good opportunities are usually in the first two weeks of March.`
      },
      {
        title: "Best Time of Night",
        content: `Northern lights are most commonly seen between 9 PM and 1 AM, but can occur as soon as it gets dark and before dawn. Statistically, the most active time is around 10 PM to midnight local time, but this varies significantly from night to night.

The best strategy is simple: check the forecast in the evening and go outside when the KP index is elevated (3+). You don't need to stay up all night — at their best, aurora displays last only 15–30 minutes at a time, though during strong storms the sky can remain active for hours.

**Tip:** Install a northern lights alert app (e.g., My Aurora Forecast) on your phone to receive notifications when activity rises. This way you can sleep peacefully and wake only when conditions are promising.`
      },
      {
        title: "The Importance of Darkness",
        content: `Northern lights occur in the atmosphere year-round — they don't disappear in summer. But they're only visible to the eye against a dark sky. In Levi, this practically means:

• **Not visible:** May–July (midnight sun — sun doesn't set)
• **Weakly visible:** Early August and late March (nights too light for faint aurora)
• **Best visibility:** September–February (long dark nights, 14–24 hours of darkness)

The polar night period (early December to mid-January) offers the longest dark periods and theoretically the most viewing time. The downside is that cloud cover is often at its highest during this exact period.`
      },
      {
        title: "Cloud Cover — The Biggest Enemy",
        content: `Northern lights occur at 100–300 kilometres altitude in the atmosphere. If the sky is cloudy, you won't see them — even if they're shining strongly up there. Cloud cover is by far the most common reason people don't see aurora on a given night in Levi.

Levi's continental climate produces more clear nights than the coastal regions of Norway or Iceland — this is one of Levi's significant advantages. But cloudiness is still a daily reality, especially in November–December.

**Practical tip:** Always check the cloud forecast before heading outside. The Finnish Meteorological Institute (ilmatieteenlaitos.fi) and yr.no offer precise hour-by-hour cloud forecasts. Sometimes the cloud layer is localised — a 20 km drive may be enough to reach a clearer area.`
      },
      {
        title: "Solar Activity Cycle",
        content: `The sun goes through approximately 11-year activity cycles. At the cycle's peak, the sun releases more and stronger particle bursts (CMEs), which cause stronger aurora displays. The years 2024–2026 are near the peak of the current cycle (Solar Cycle 25), and exceptionally strong northern lights have been seen at record frequencies — even in Central Europe.

However, this doesn't mean you won't see aurora in other years. Levi is north of the Arctic Circle, beneath the aurora oval, where northern lights occur dozens of times annually regardless of the solar cycle phase. The activity peak only increases the probability of strong storms — weak and moderate aurora can be seen every winter.`
      }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What is the best month for northern lights in Levi?", a: "January and February combine long nights with often clear, frosty weather. September is also excellent — nights are dark enough, weather is clear, and the autumn foliage makes the landscape unforgettable." },
        { q: "What time should I go outside?", a: "9 PM to 1 AM is statistically the most likely time, but aurora can occur as soon as it gets dark. Check the forecast and go outside when KP index is 3 or higher." },
        { q: "Can I see northern lights every night?", a: "No — it depends on solar activity and cloud cover. On a longer holiday (3+ nights), the probability increases significantly. Statistically, Levi has about 150 aurora nights per year." },
        { q: "Can I see northern lights from Levi town centre?", a: "Yes, if activity is strong (KP 5+). But the best experience is a few hundred metres from street lights, where your eyes can adapt to darkness properly." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "Winter in Levi", desc: "What does a winter holiday offer?", href: "/guide/winter-in-levi" },
        { title: "Accommodation", desc: "Watch aurora from your own terrace", href: "/en/accommodation" }
      ]
    }
  },
  nl: {
    meta: { title: "Beste tijd om noorderlicht te zien in Levi — Maanden, uren en omstandigheden | Leville.net", description: "Wanneer is het noorderlicht het best zichtbaar in Levi? Beste maanden, uren en maandelijkse waarschijnlijkheid.", canonical: "https://leville.net/nl/gids/beste-tijd-noorderlicht-levi" },
    h1: "Beste tijd om noorderlicht te zien in Levi",
    breadcrumbLabel: "Beste tijd voor aurora",
    sections: [
      { title: "Het noorderlichtseizoen in een oogopslag", content: `Het noorderlichtseizoen in Levi duurt van eind augustus tot begin april. Levi ligt onder de aurora-ovaal (67,8° N) — de zone waar noorderlicht het vaakst voorkomt.` },
      { title: "Beste maanden", content: `**September:** Seizoen begint half september. Ruska-seizoen (herfstkleuren) maakt het uniek.\n\n**Oktober:** Lange nachten, vaak helder weer.\n\n**Januari:** Beste maand — heldere vriesperiodes.\n\n**Februari:** Uitstekend. Lange nachten, helder en koud.\n\n**Maart:** Begin maart nog mogelijk.` },
      { title: "Beste tijd van de nacht", content: `Tussen 21:00 en 01:00. Controleer de KP-index en ga naar buiten bij KP 3+.\n\n**Tip:** Installeer My Aurora Forecast voor meldingen.` },
      { title: "Het belang van duisternis", content: `Noorderlicht is alleen zichtbaar tegen een donkere hemel.\n\n• **Niet zichtbaar:** mei–juli (middernachtzon)\n• **Beste zichtbaarheid:** september–februari` },
      { title: "Bewolking — de grootste vijand", content: `Bewolking blokkeert het zicht volledig. Levi's continentale klimaat biedt meer heldere nachten dan de kust van Noorwegen of IJsland.` },
      { title: "Zonne-activiteitscyclus", content: `De jaren 2024–2026 liggen nabij de piek van Solar Cycle 25. Maar Levi heeft tientallen aurora-nachten per jaar ongeacht de cyclus.` }
    ],
    faq: { title: "Veelgestelde vragen", items: [
      { q: "Wat is de beste maand?", a: "Januari en februari. September is ook uitstekend." },
      { q: "Hoe laat naar buiten?", a: "21:00–01:00, bij KP 3+." },
      { q: "Elke nacht noorderlicht?", a: "Nee. Bij 3+ nachten stijgt de kans aanzienlijk." },
      { q: "Zichtbaar vanuit het centrum?", a: "Ja bij KP 5+. Beter een paar honderd meter van straatverlichting." }
    ]},
    readNext: { title: "Lees ook", links: [
      { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
      { title: "Winter in Levi", desc: "Wat biedt een wintervakantie?", href: "/guide/winter-in-levi" },
      { title: "Accommodatie", desc: "Bekijk aurora vanaf uw terras", href: "/nl/accommodatie" }
    ]}
  },
  sv: {
    meta: { title: "Bästa tiden att se norrsken i Levi | Leville.net", description: "När syns norrskenet bäst i Levi? Bästa månader, tider och förhållanden.", canonical: "https://leville.net/sv/guide/basta-tiden-norrsken-levi" },
    h1: "Bästa tiden att se norrsken i Levi", breadcrumbLabel: "Bästa tiden för norrsken",
    sections: [
      { title: "Norrskensäsongen i korthet", content: `Säsongen varar från slutet av augusti till början av april. Levi ligger under aurora-ovalen (67,8° N).` },
      { title: "Bästa månader", content: `**September:** Ruska-säsongen. **Oktober:** Långa nätter, klart väder. **Januari:** Bästa månaden — klara köldperioder. **Februari:** Utmärkt. **Mars:** Möjligt i början.` },
      { title: "Bästa tid på natten", content: `Kl. 21–01. Kontrollera KP-index och gå ut vid KP 3+.` },
      { title: "Mörkrets betydelse", content: `Norrsken syns bara mot mörk himmel. Bäst september–februari.` },
      { title: "Molntäcke", content: `Levis kontinentala klimat ger fler klara nätter än Norges kuster.` },
      { title: "Solens aktivitetscykel", content: `2024–2026 nära toppen av Solar Cycle 25. Levi har norrsken dussintals gånger årligen.` }
    ],
    faq: { title: "Vanliga frågor", items: [
      { q: "Bästa månaden?", a: "Januari och februari. September också utmärkt." },
      { q: "Vilken tid?", a: "Kl. 21–01, vid KP 3+." },
      { q: "Varje natt?", a: "Nej. Längre semester ökar chansen." },
      { q: "Från centrum?", a: "Ja vid KP 5+." }
    ]},
    readNext: { title: "Läs också", links: [
      { title: "Norrsken i Levi", desc: "Utförlig guide", href: "/en/northern-lights" },
      { title: "Vinter i Levi", desc: "Vintersemester", href: "/guide/winter-in-levi" },
      { title: "Boende", desc: "Se norrsken från terrassen", href: "/en/accommodation" }
    ]}
  },
  de: {
    meta: { title: "Beste Zeit für Nordlichter in Levi | Leville.net", description: "Wann sind Nordlichter in Levi am besten sichtbar? Beste Monate, Uhrzeiten und Bedingungen.", canonical: "https://leville.net/de/ratgeber/beste-zeit-nordlichter-levi" },
    h1: "Beste Zeit für Nordlichter in Levi", breadcrumbLabel: "Beste Zeit für Aurora",
    sections: [
      { title: "Die Nordlichtsaison im Überblick", content: `Die Saison dauert von Ende August bis Anfang April. Levi liegt unter dem Aurora-Oval (67,8° N).` },
      { title: "Beste Monate", content: `**September:** Ruska-Saison. **Oktober:** Lange Nächte, klares Wetter. **Januar:** Bester Monat — klare Kälteperioden. **Februar:** Ausgezeichnet. **März:** Anfang noch möglich.` },
      { title: "Beste Uhrzeit", content: `21:00–01:00 Uhr. Bei KP 3+ rausgehen.` },
      { title: "Dunkelheit", content: `Nordlichter nur gegen dunklen Himmel sichtbar. Beste Zeit: September–Februar.` },
      { title: "Bewölkung", content: `Levis kontinentales Klima bietet mehr klare Nächte als Norwegens Küsten.` },
      { title: "Sonnenaktivitätszyklus", content: `2024–2026 nahe dem Höhepunkt von Solar Cycle 25.` }
    ],
    faq: { title: "Häufig gestellte Fragen", items: [
      { q: "Bester Monat?", a: "Januar und Februar. September auch ausgezeichnet." },
      { q: "Welche Uhrzeit?", a: "21:00–01:00, bei KP 3+." },
      { q: "Jede Nacht?", a: "Nein. Längerer Urlaub erhöht die Chance." },
      { q: "Vom Zentrum aus?", a: "Ja bei KP 5+." }
    ]},
    readNext: { title: "Lesen Sie auch", links: [
      { title: "Nordlichter in Levi", desc: "Umfassender Ratgeber", href: "/en/northern-lights" },
      { title: "Winter in Levi", desc: "Winterurlaub", href: "/guide/winter-in-levi" },
      { title: "Unterkunft", desc: "Aurora von der Terrasse", href: "/en/accommodation" }
    ]}
  },
  es: {
    meta: { title: "Mejor momento para ver auroras boreales en Levi | Leville.net", description: "¿Cuándo son más visibles las auroras en Levi? Mejores meses, horas y condiciones.", canonical: "https://leville.net/es/guia/mejor-momento-auroras-boreales-levi" },
    h1: "Mejor momento para ver auroras boreales en Levi", breadcrumbLabel: "Mejor momento para auroras",
    sections: [
      { title: "La temporada en resumen", content: `Dura desde finales de agosto hasta principios de abril. Levi se sitúa bajo el óvalo auroral (67,8° N).` },
      { title: "Mejores meses", content: `**Septiembre:** Temporada de ruska. **Octubre:** Noches largas, clima despejado. **Enero:** Mejor mes — períodos fríos y claros. **Febrero:** Excelente. **Marzo:** Posible a principios.` },
      { title: "Mejor hora", content: `21:00–01:00. Salga cuando el KP sea 3+.` },
      { title: "Oscuridad", content: `Las auroras solo son visibles contra un cielo oscuro. Mejor: septiembre–febrero.` },
      { title: "Nubosidad", content: `El clima continental de Levi ofrece más noches despejadas que las costas de Noruega o Islandia.` },
      { title: "Ciclo solar", content: `2024–2026 cerca del pico del Solar Cycle 25.` }
    ],
    faq: { title: "Preguntas frecuentes", items: [
      { q: "¿Mejor mes?", a: "Enero y febrero. Septiembre también excelente." },
      { q: "¿A qué hora?", a: "21:00–01:00, con KP 3+." },
      { q: "¿Cada noche?", a: "No. Estancias más largas aumentan la probabilidad." },
      { q: "¿Desde el centro?", a: "Sí con KP 5+." }
    ]},
    readNext: { title: "Lea también", links: [
      { title: "Auroras en Levi", desc: "Guía completa", href: "/en/northern-lights" },
      { title: "Invierno en Levi", desc: "Vacaciones de invierno", href: "/guide/winter-in-levi" },
      { title: "Alojamiento", desc: "Vea auroras desde su terraza", href: "/en/accommodation" }
    ]}
  },
  fr: {
    meta: { title: "Meilleur moment pour voir les aurores boréales à Levi | Leville.net", description: "Quand les aurores sont-elles les plus visibles à Levi ? Meilleurs mois, heures et conditions.", canonical: "https://leville.net/fr/guide/meilleur-moment-aurores-boreales-levi" },
    h1: "Meilleur moment pour voir les aurores boréales à Levi", breadcrumbLabel: "Meilleur moment pour aurores",
    sections: [
      { title: "La saison en un coup d'œil", content: `De fin août à début avril. Levi se situe sous l'ovale auroral (67,8° N).` },
      { title: "Meilleurs mois", content: `**Septembre :** Saison du ruska. **Octobre :** Longues nuits, temps clair. **Janvier :** Meilleur mois — périodes froides et claires. **Février :** Excellent. **Mars :** Possible début mars.` },
      { title: "Meilleure heure", content: `21h–1h. Sortez quand le KP est 3+.` },
      { title: "Obscurité", content: `Les aurores ne sont visibles que contre un ciel sombre. Meilleure période : septembre–février.` },
      { title: "Nébulosité", content: `Le climat continental de Levi offre plus de nuits claires que les côtes de Norvège ou d'Islande.` },
      { title: "Cycle solaire", content: `2024–2026 proche du pic du Solar Cycle 25.` }
    ],
    faq: { title: "Questions fréquentes", items: [
      { q: "Meilleur mois ?", a: "Janvier et février. Septembre aussi excellent." },
      { q: "Quelle heure ?", a: "21h–1h, avec KP 3+." },
      { q: "Chaque nuit ?", a: "Non. Un séjour plus long augmente la probabilité." },
      { q: "Depuis le centre ?", a: "Oui avec KP 5+." }
    ]},
    readNext: { title: "Lire aussi", links: [
      { title: "Aurores à Levi", desc: "Guide complet", href: "/en/northern-lights" },
      { title: "Hiver à Levi", desc: "Vacances d'hiver", href: "/guide/winter-in-levi" },
      { title: "Hébergement", desc: "Aurores depuis votre terrasse", href: "/en/accommodation" }
    ]}
  }
};

const BestTimeNorthernLightsLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/paras-aika-revontulet-levi",
    en: "/guide/best-time-to-see-northern-lights-levi"
  };

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
        <meta name="twitter:image:alt" content={lang === "fi" ? "Revontulet Levin taivaalla" : "Northern Lights over Levi"} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.h1}
              </h1>
            </section>

            {t.sections.map((section, idx) => (
              <section key={idx} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      .replace(/• /g, '<br/>• ')
                  }} />
                ))}
              </section>
            ))}

            {/* Internal links */}
            <section className="mb-12">
              <Card className="glass-card border-border/30 p-6">
                <p className="text-muted-foreground mb-4">
                  {lang === "fi"
                    ? "Majoitu Levillä ja katsele revontulia omalta terassilta."
                    : "Stay in Levi and watch the northern lights from your own terrace."}
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

            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
          </div>
        </main>

        <PageCTA lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        
      </div>
    </>
  );
};

export default BestTimeNorthernLightsLevi;
