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
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

interface Props { lang?: Language; }

const translations = {
  fi: {
    meta: {
      title: "Revontulisesonki Levillä — Milloin kausi alkaa ja päättyy? | Leville.net",
      description: "Revontulisesonki Levillä kestää elokuun lopusta huhtikuun alkuun. Miksi juuri nämä kuukaudet? Selitys vuodenaikojen, valon ja auringon vaikutuksesta.",
      canonical: "https://leville.net/opas/revontulisesonki-levi"
    },
    h1: "Revontulisesonki Levillä — milloin kausi alkaa ja päättyy?",
    breadcrumbLabel: "Revontulisesonki",
    sections: [
      {
        title: "Kauden pituus",
        content: `Revontulisesonki Levillä kestää elokuun lopusta huhtikuun alkuun — noin 7–8 kuukautta vuodessa. Tämä tekee Levistä yhden Euroopan parhaista paikoista revontulien katseluun: pitkä kausi, sijainti napapiirin pohjoispuolella (67,8° N) ja suhteellisen vähän valosaastetta.

Vertailun vuoksi: Etelä-Suomessa (Helsinki, 60° N) revontulia näkee vain vahvojen myrskyjen aikana muutaman kerran vuodessa. Levillä tilastollinen aurora-aktiivisuus on kymmenkertainen — revontulia esiintyy noin 150 yönä vuodessa, joskin näkyvyys riippuu aina pilvisyydestä.`
      },
      {
        title: "Miksi ei kesällä?",
        content: `Yötön yö on vastaus. Levillä aurinko ei laske lainkaan kesäkuussa ja heinäkuun alussa. Vaikka aurinkotuuli pommittaisi maata voimakkaasti, revontulia ei näe vaaleaa taivasta vasten — ne häviävät valon sekaan kuten tähdet päiväsaikaan.

Sama ilmiö toimii käänteisesti talvella: kaamos (joulukuun alku – tammikuun puoliväli) tarjoaa pisimmät pimeät jaksot ja eniten potentiaalista katseluaikaa. Aurinko ei nouse lainkaan muutamaan viikkoon, joten teoriassa revontulia voisi nähdä jopa keskipäivällä — jos ne ovat aktiivisia ja taivas on kirkas.`
      },
      {
        title: "Kauden alku (elokuu–syyskuu)",
        content: `Ensimmäiset revontulihavainnot ovat mahdollisia elokuun viimeisellä viikolla, kun yöt alkavat jälleen pimetä. Syyskuussa yöt pimenevät nopeasti — noin 6 minuuttia päivässä — ja kausi on täydessä vauhdissa syyskuun puolivälistä lähtien.

Alkukauden erityinen etu on sää: syksy on usein kirkas ja kuiva Lapissa. Syyskuussa keskilämpötila on vielä 5–10 astetta, joten pakkasta ei tarvitse pelätä. Ruska-aika (syyskuun puoliväli – lokakuun alku) lisää elämyksen syvyyttä: revontulet ruskan värien yllä on yksi Lapin unohtumattomimmista näyistä.`
      },
      {
        title: "Huippukausi (loka–helmikuu)",
        content: `Lokakuusta helmikuuhun yöt ovat pitkiä ja pimeitä — optimaalista revontulien katselulle. Lokakuu tarjoaa vielä kohtuullisen usein kirkasta säätä ennen pilvisemmän marraskuun alkua.

Joulukuun kaamos on teoriassa paras aika pimeyden puolesta, mutta käytännössä pilvisyys on korkeimmillaan. Tammikuu ja helmikuu ovat monien kokemusten perusteella optimaalinen yhdistelmä: yöt ovat vielä pitkiä ja kirkkaat pakkasjaksot ovat yleisiä. Kylmä ilma (−20°C ja kylmempi) korreloi usein selkeän taivaan kanssa.`
      },
      {
        title: "Kauden loppu (maalis–huhtikuu)",
        content: `Maaliskuun alussa revontulia voi vielä nähdä hyvin, erityisesti kuun ensimmäisellä puoliskolla. Mutta yöt vaalenevat nopeasti: maaliskuun lopussa Levillä on jo 14 tuntia päivänvaloa. Heikot revontulet häviävät vaaleaan taivaaseen.

Huhtikuussa revontulien näkeminen on Levillä jo hyvin vaikeaa — yöt ovat liian valoisia. Yksittäisiä vahvoja myrskyjä voi teoriassa nähdä huhtikuun ensimmäisellä viikolla, mutta käytännössä kausi on ohi.`
      },
      {
        title: "Miksi Levi on hyvä paikka?",
        content: `**67,8° pohjoista leveyttä** — Levi sijaitsee napapiirin yläpuolella, suoraan aurora-ovaalin alla. Tämä on vyöhyke jossa revontulia esiintyy tilastollisesti useimmin.

**Mannermainen ilmasto** — Levi on sisämaassa, kaukana meren tuomasta kosteudesta. Tämä tarkoittaa enemmän selkeitä öitä kuin rannikkosijainnit kuten Tromsø tai Islanti.

**Vähän valosaastetta** — Levin kylä on pieni (vakituisia asukkaita noin 800) ja ympäröivät erämaa-alueet ovat laajoja. Muutaman kilometrin päässä keskustasta on jo lähes täydellinen pimeys.

**Pitkä kausi** — 7–8 kuukautta vuodessa tarjoaa runsaasti mahdollisuuksia. Vaikka yhdelle yölle ei osu, pidemmällä lomalla todennäköisyys kasvaa merkittävästi.`
      },
      {
        title: "Vertailu muihin paikkoihin",
        content: `**Levi vs. Tromsø (Norja):** Tromsø (69,6° N) on hieman pohjoisempi mutta sijaitsee meren rannalla. Meri-ilmasto tuo enemmän pilvisyyttä — Levin mannermainen ilmasto tuottaa tilastollisesti enemmän kirkkaita öitä. Tromsøn etu on vuonojen ja meren tuoma dramaattinen maisema.

**Levi vs. Islanti:** Islanti on suosittu aurora-kohde, mutta saaren merelliset olosuhteet tekevät säästä arvaamatonta. Levillä sää on vakaampaa ja ennustettavampaa. Islannin etu on monipuolinen luonto (geyserit, jäätiköt, tulivuoret).

**Levi vs. Rovaniemi:** Rovaniemi (66,5° N) on napapiirillä, Levi sen yläpuolella. Levi on rauhallisempi ja pimeämpi — vähemmän valosaastetta, pidempi kaamos, tilastollisesti paremmat mahdollisuudet. Rovaniemellä on enemmän palveluita ja Joulupukin pajakylä.`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Kuinka pitkä revontulisesonki on Levillä?", a: "Noin 7–8 kuukautta — elokuun lopusta huhtikuun alkuun. Parhaita kuukausia ovat tammikuu, helmikuu ja syyskuu." },
        { q: "Miksi kesällä ei näe revontulia?", a: "Yötön yö — taivas on liian vaalea. Aurinko ei laske lainkaan kesäkuussa. Revontulia esiintyy ilmakehässä kesälläkin, mutta niitä ei voi nähdä silmällä." },
        { q: "Onko Levi parempi kuin Tromsø revontulille?", a: "Erilainen. Levi on kuivempi ja tarjoaa enemmän kirkkaita öitä (mannermainen ilmasto). Tromsø on meren rannalla ja tarjoaa erilaisen maiseman. Molemmat ovat erinomaisia aurora-kohteita." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava revontuliopas", href: "/revontulet" },
        { title: "Paras aika revontulille", desc: "Kuukaudet ja kellonajat", href: "/opas/paras-aika-revontulet-levi" },
        { title: "Majoitukset", desc: "Varaa revontulimajoitus", href: "/majoitukset" }
      ]
    }
  },
  en: {
    meta: {
      title: "Northern Lights Season in Levi — When Does It Start & End? | Leville.net",
      description: "The northern lights season in Levi runs from late August to early April. Why these months? Explanation of seasons, light and solar activity.",
      canonical: "https://leville.net/guide/northern-lights-season-levi"
    },
    h1: "Northern Lights Season in Levi — When Does It Start and End?",
    breadcrumbLabel: "Aurora Season",
    sections: [
      {
        title: "Season Length",
        content: `The northern lights season in Levi lasts from late August to early April — approximately 7–8 months per year. This makes Levi one of Europe's best locations for aurora viewing: a long season, a position north of the Arctic Circle (67.8° N), and relatively little light pollution.

For comparison: in southern Finland (Helsinki, 60° N), northern lights are only seen during strong storms a few times per year. In Levi, statistical aurora activity is ten times higher — aurora occurs on approximately 150 nights per year, though visibility always depends on cloud cover.`
      },
      {
        title: "Why Not in Summer?",
        content: `The midnight sun is the answer. In Levi, the sun doesn't set at all in June and early July. Even if the solar wind were bombarding Earth intensely, northern lights cannot be seen against a light sky — they disappear into the brightness just like stars during daytime.

The same phenomenon works in reverse during winter: the polar night (early December to mid-January) offers the longest dark periods and the most potential viewing time. The sun doesn't rise at all for several weeks, so theoretically aurora could be seen even at midday — if active and the sky is clear.`
      },
      {
        title: "Season Start (August–September)",
        content: `The first aurora sightings are possible during the last week of August, when nights begin to darken again. In September, nights darken rapidly — about 6 minutes per day — and the season is in full swing from mid-September onwards.

The early season's special advantage is weather: autumn is often clear and dry in Lapland. In September, average temperatures are still 5–10°C, so there's no need to worry about extreme cold. The ruska season (mid-September to early October) adds depth to the experience: northern lights above autumn foliage is one of Lapland's most unforgettable sights.`
      },
      {
        title: "Peak Season (October–February)",
        content: `From October to February, nights are long and dark — optimal for aurora viewing. October still offers reasonably clear weather before cloudier November begins.

December's polar night is theoretically the best time for darkness, but in practice cloudiness is at its highest. January and February are the optimal combination based on experience: nights are still long and clear cold spells are common. Cold air (−20°C and below) often correlates with clear skies.`
      },
      {
        title: "Season End (March–April)",
        content: `In early March, northern lights can still be seen well, especially during the first half of the month. But nights brighten rapidly: by late March, Levi has 14 hours of daylight. Faint aurora disappears into the bright sky.

In April, seeing northern lights in Levi is already very difficult — nights are too light. Individual strong storms could theoretically be seen in the first week of April, but practically the season is over.`
      },
      {
        title: "Why Levi Is a Great Location",
        content: `**67.8° North latitude** — Levi sits above the Arctic Circle, directly beneath the aurora oval. This is the zone where northern lights occur most frequently.

**Continental climate** — Levi is inland, far from the moisture brought by the sea. This means more clear nights than coastal locations like Tromsø or Iceland.

**Low light pollution** — Levi village is small (about 800 permanent residents) and the surrounding wilderness areas are vast. A few kilometres from the centre offers near-perfect darkness.

**Long season** — 7–8 months per year provides ample opportunities. Even if one night doesn't produce aurora, a longer holiday significantly increases probability.`
      },
      {
        title: "Comparison with Other Destinations",
        content: `**Levi vs. Tromsø (Norway):** Tromsø (69.6° N) is slightly further north but located on the coast. Maritime climate brings more cloudiness — Levi's continental climate statistically produces more clear nights. Tromsø's advantage is the dramatic fjord and ocean scenery.

**Levi vs. Iceland:** Iceland is a popular aurora destination, but the island's maritime conditions make weather unpredictable. In Levi, weather is more stable and predictable. Iceland's advantage is diverse nature (geysers, glaciers, volcanoes).

**Levi vs. Rovaniemi:** Rovaniemi (66.5° N) sits on the Arctic Circle, Levi above it. Levi is quieter and darker — less light pollution, longer polar night, statistically better aurora chances. Rovaniemi has more services and Santa Claus Village.`
      }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "How long is the northern lights season in Levi?", a: "Approximately 7–8 months — from late August to early April. Best months are January, February, and September." },
        { q: "Why can't you see aurora in summer?", a: "Midnight sun — the sky is too light. The sun doesn't set at all in June. Aurora occurs in the atmosphere even in summer, but it's invisible to the naked eye." },
        { q: "Is Levi better than Tromsø for northern lights?", a: "Different. Levi is drier and offers more clear nights (continental climate). Tromsø is coastal with different scenery. Both are excellent aurora destinations." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "Best Time for Aurora", desc: "Months and hours", href: "/guide/best-time-to-see-northern-lights-levi" },
        { title: "Accommodation", desc: "Book aurora-friendly accommodation", href: "/en/accommodation" }
      ]
    }
  },
  nl: {
    meta: {
      title: "Noorderlichtseizoen in Levi — Wanneer begint en eindigt het? | Leville.net",
      description: "Het noorderlichtseizoen in Levi loopt van eind augustus tot begin april. Waarom deze maanden? Uitleg over seizoenen, licht en zonneactiviteit.",
      canonical: "https://leville.net/nl/gids/noorderlicht-seizoen-levi"
    },
    h1: "Noorderlichtseizoen in Levi — wanneer begint en eindigt het?",
    breadcrumbLabel: "Noorderlichtseizoen",
    sections: [
      { title: "Seizoenslengte", content: `Het noorderlichtseizoen in Levi duurt van eind augustus tot begin april — ongeveer 7–8 maanden per jaar. Dit maakt Levi tot een van de beste locaties in Europa voor het bekijken van noorderlicht: een lang seizoen, een positie boven de poolcirkel (67,8° NB) en relatief weinig lichtvervuiling.\n\nTer vergelijking: in Zuid-Finland (Helsinki, 60° NB) is noorderlicht alleen zichtbaar tijdens sterke stormen, een paar keer per jaar. In Levi is de statistische aurora-activiteit tien keer hoger — aurora komt voor op ongeveer 150 nachten per jaar, hoewel de zichtbaarheid altijd afhangt van de bewolking.` },
      { title: "Waarom niet in de zomer?", content: `De middernachtzon is het antwoord. In Levi gaat de zon helemaal niet onder in juni en begin juli. Zelfs als de zonnewind de aarde intens zou bombarderen, is noorderlicht niet zichtbaar tegen een lichte hemel — het verdwijnt in de helderheid net als sterren overdag.\n\nHetzelfde fenomeen werkt omgekeerd in de winter: de poolnacht (begin december tot half januari) biedt de langste donkere periodes en de meeste potentiële kijktijd.` },
      { title: "Seizoensstart (augustus–september)", content: `De eerste aurora-waarnemingen zijn mogelijk in de laatste week van augustus, wanneer de nachten weer donker worden. In september worden de nachten snel donkerder — ongeveer 6 minuten per dag — en het seizoen is in volle gang vanaf half september.\n\nHet speciale voordeel van het vroege seizoen is het weer: de herfst is vaak helder en droog in Lapland. In september liggen de gemiddelde temperaturen nog op 5–10°C. Het ruska-seizoen (half september tot begin oktober) voegt diepte toe: noorderlicht boven herfstkleuren is een van de onvergetelijkste gezichten van Lapland.` },
      { title: "Hoogseizoen (oktober–februari)", content: `Van oktober tot februari zijn de nachten lang en donker — optimaal voor het bekijken van noorderlicht. Oktober biedt nog redelijk vaak helder weer voordat het bewolktere november begint.\n\nDe poolnacht in december is theoretisch de beste tijd qua donkerte, maar in de praktijk is de bewolking het hoogst. Januari en februari zijn de optimale combinatie: nachten zijn nog lang en heldere koude periodes zijn gebruikelijk. Koude lucht (−20°C en lager) correleert vaak met heldere luchten.` },
      { title: "Seizoenseinde (maart–april)", content: `Begin maart is noorderlicht nog goed te zien, vooral in de eerste helft van de maand. Maar de nachten worden snel lichter: eind maart heeft Levi al 14 uur daglicht. Zwak noorderlicht verdwijnt in de lichte hemel.\n\nIn april is het zien van noorderlicht in Levi al zeer moeilijk — de nachten zijn te licht.` },
      { title: "Waarom Levi een geweldige locatie is", content: `**67,8° noorderbreedte** — Levi ligt boven de poolcirkel, direct onder de aurora-ovaal. Dit is de zone waar noorderlicht het vaakst voorkomt.\n\n**Continentaal klimaat** — Levi ligt in het binnenland, ver van de vochtigheid van de zee. Dit betekent meer heldere nachten dan kustlocaties zoals Tromsø of IJsland.\n\n**Weinig lichtvervuiling** — Het dorp Levi is klein (ongeveer 800 vaste bewoners) en de omringende wildernisgebieden zijn uitgestrekt.\n\n**Lang seizoen** — 7–8 maanden per jaar biedt ruime mogelijkheden.` },
      { title: "Vergelijking met andere bestemmingen", content: `**Levi vs. Tromsø (Noorwegen):** Tromsø (69,6° NB) ligt iets noordelijker maar aan de kust. Het zeeklimaat brengt meer bewolking — Levi's continentale klimaat levert statistisch meer heldere nachten op. Tromsø's voordeel is het dramatische fjord- en zeelandschap.\n\n**Levi vs. IJsland:** IJsland is een populaire aurora-bestemming, maar de maritieme omstandigheden maken het weer onvoorspelbaar. In Levi is het weer stabieler.\n\n**Levi vs. Rovaniemi:** Rovaniemi (66,5° NB) ligt op de poolcirkel, Levi erboven. Levi is rustiger en donkerder — minder lichtvervuiling, langere poolnacht, statistisch betere aurora-kansen.` }
    ],
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Hoe lang is het noorderlichtseizoen in Levi?", a: "Ongeveer 7–8 maanden — van eind augustus tot begin april. Beste maanden zijn januari, februari en september." },
        { q: "Waarom kun je in de zomer geen aurora zien?", a: "Middernachtzon — de hemel is te licht. De zon gaat helemaal niet onder in juni." },
        { q: "Is Levi beter dan Tromsø voor noorderlicht?", a: "Anders. Levi is droger en biedt meer heldere nachten (continentaal klimaat). Tromsø ligt aan de kust met een ander landschap. Beide zijn uitstekende aurora-bestemmingen." }
      ]
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
        { title: "Beste tijd voor aurora", desc: "Maanden en tijdstippen", href: "/nl/gids/beste-tijd-noorderlicht-levi" },
        { title: "Accommodatie", desc: "Boek aurora-vriendelijke accommodatie", href: "/nl/accommodatie" }
      ]
    }
  },
  sv: {
    meta: {
      title: "Norrskenssäsongen i Levi — När börjar och slutar den? | Leville.net",
      description: "Norrskenssäsongen i Levi varar från slutet av augusti till början av april. Varför just dessa månader? Förklaring av säsonger, ljus och solaktivitet.",
      canonical: "https://leville.net/sv/guide/norrsken-sasong-levi"
    },
    h1: "Norrskenssäsongen i Levi — när börjar och slutar den?",
    breadcrumbLabel: "Norrskenssäsong",
    sections: [
      { title: "Säsongens längd", content: `Norrskenssäsongen i Levi varar från slutet av augusti till början av april — ungefär 7–8 månader per år. Detta gör Levi till en av Europas bästa platser för norrskensvisning: en lång säsong, läge norr om polcirkeln (67,8° N) och relativt lite ljusföroreningar.\n\nFör jämförelse: i södra Finland (Helsingfors, 60° N) syns norrsken bara under starka stormar några gånger per år. I Levi är den statistiska aurora-aktiviteten tio gånger högre.` },
      { title: "Varför inte på sommaren?", content: `Midnattssolen är svaret. I Levi går solen inte ner alls i juni och början av juli. Norrsken kan inte ses mot en ljus himmel.\n\nSamma fenomen fungerar omvänt på vintern: polarnatt (början av december till mitten av januari) erbjuder de längsta mörka perioderna.` },
      { title: "Säsongsstart (augusti–september)", content: `De första norrskensobservationerna är möjliga under sista veckan i augusti. I september mörknar nätterna snabbt — cirka 6 minuter per dag.\n\nTidig säsongens speciella fördel är vädret: hösten är ofta klar och torr i Lappland. Ruska-säsongen (mitten av september till början av oktober) adderar djup: norrsken ovanför höstfärger är en av Lapplands mest oförglömliga vyer.` },
      { title: "Högsäsong (oktober–februari)", content: `Från oktober till februari är nätterna långa och mörka — optimalt. Oktober erbjuder fortfarande rimligt klart väder.\n\nDecembers polarnatt är teoretiskt bäst, men i praktiken är molntäcket som störst. Januari och februari är den optimala kombinationen: nätterna är fortfarande långa och klara köldknäppar är vanliga.` },
      { title: "Säsongsslut (mars–april)", content: `I början av mars kan norrsken fortfarande ses bra. Men nätterna ljusnar snabbt: i slutet av mars har Levi redan 14 timmar dagsljus.\n\nI april är det redan mycket svårt att se norrsken i Levi.` },
      { title: "Varför Levi är en bra plats", content: `**67,8° nordlig breddgrad** — Levi ligger ovanför polcirkeln, direkt under aurora-ovalen.\n\n**Kontinentalt klimat** — Levi ligger i inlandet, långt från havets fuktighet. Fler klara nätter än kustlägen.\n\n**Lite ljusföroreningar** — Levi by är liten (ca 800 invånare).\n\n**Lång säsong** — 7–8 månader per år.` },
      { title: "Jämförelse med andra destinationer", content: `**Levi vs. Tromsø:** Tromsø (69,6° N) ligger vid kusten med mer molnighet. Levi har statistiskt fler klara nätter.\n\n**Levi vs. Island:** Islands maritima förhållanden gör vädret oförutsägbart. Levi har stabilare väder.\n\n**Levi vs. Rovaniemi:** Rovaniemi (66,5° N) ligger på polcirkeln, Levi ovanför. Levi är lugnare och mörkare.` }
    ],
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Hur lång är norrskenssäsongen i Levi?", a: "Ungefär 7–8 månader — från slutet av augusti till början av april. Bästa månaderna är januari, februari och september." },
        { q: "Varför kan man inte se norrsken på sommaren?", a: "Midnattssol — himlen är för ljus. Solen går inte ner alls i juni." },
        { q: "Är Levi bättre än Tromsø?", a: "Annorlunda. Levi är torrare och erbjuder fler klara nätter. Tromsø har kustlandskap. Båda är utmärkta." }
      ]
    },
    readNext: {
      title: "Läs också",
      links: [
        { title: "Norrsken i Levi", desc: "Omfattande norrskensguide", href: "/sv/guide/norrsken-levi" },
        { title: "Bästa tid för norrsken", desc: "Månader och tidpunkter", href: "/sv/guide/basta-tid-norrsken-levi" },
        { title: "Boende", desc: "Boka norrskensvänligt boende", href: "/sv/boende" }
      ]
    }
  },
  de: {
    meta: {
      title: "Nordlichtsaison in Levi — Wann beginnt und endet sie? | Leville.net",
      description: "Die Nordlichtsaison in Levi dauert von Ende August bis Anfang April. Warum diese Monate? Erklärung von Jahreszeiten, Licht und Sonnenaktivität.",
      canonical: "https://leville.net/de/ratgeber/nordlicht-saison-levi"
    },
    h1: "Nordlichtsaison in Levi — wann beginnt und endet sie?",
    breadcrumbLabel: "Nordlichtsaison",
    sections: [
      { title: "Saisonlänge", content: `Die Nordlichtsaison in Levi dauert von Ende August bis Anfang April — etwa 7–8 Monate pro Jahr. Dies macht Levi zu einem der besten Orte Europas für Nordlichtbeobachtung: eine lange Saison, Lage nördlich des Polarkreises (67,8° N) und relativ wenig Lichtverschmutzung.\n\nZum Vergleich: In Südfinnland (Helsinki, 60° N) sind Nordlichter nur bei starken Stürmen einige Male pro Jahr sichtbar. In Levi ist die statistische Aurora-Aktivität zehnmal höher.` },
      { title: "Warum nicht im Sommer?", content: `Die Mitternachtssonne ist die Antwort. In Levi geht die Sonne im Juni und Anfang Juli gar nicht unter. Nordlichter sind gegen einen hellen Himmel nicht sichtbar.\n\nDas gleiche Phänomen funktioniert umgekehrt im Winter: Die Polarnacht (Anfang Dezember bis Mitte Januar) bietet die längsten dunklen Perioden.` },
      { title: "Saisonbeginn (August–September)", content: `Die ersten Aurora-Sichtungen sind in der letzten Augustwoche möglich. Im September werden die Nächte schnell dunkler — etwa 6 Minuten pro Tag.\n\nDer besondere Vorteil der Frühsaison ist das Wetter: Der Herbst ist oft klar und trocken in Lappland. Die Ruska-Saison (Mitte September bis Anfang Oktober) bereichert das Erlebnis: Nordlichter über Herbstlaub gehören zu Lapplands unvergesslichsten Anblicken.` },
      { title: "Hochsaison (Oktober–Februar)", content: `Von Oktober bis Februar sind die Nächte lang und dunkel — optimal. Oktober bietet noch recht häufig klares Wetter.\n\nDie Polarnacht im Dezember ist theoretisch die beste Zeit, aber praktisch ist die Bewölkung am höchsten. Januar und Februar sind die optimale Kombination: lange Nächte und häufige klare Kälteperioden.` },
      { title: "Saisonende (März–April)", content: `Anfang März sind Nordlichter noch gut sichtbar. Aber die Nächte werden schnell heller: Ende März hat Levi bereits 14 Stunden Tageslicht.\n\nIm April ist es bereits sehr schwierig, Nordlichter in Levi zu sehen.` },
      { title: "Warum Levi ein großartiger Standort ist", content: `**67,8° nördlicher Breite** — Levi liegt oberhalb des Polarkreises, direkt unter dem Aurora-Oval.\n\n**Kontinentales Klima** — Levi liegt im Landesinneren. Mehr klare Nächte als Küstenstandorte.\n\n**Wenig Lichtverschmutzung** — Das Dorf Levi ist klein (ca. 800 Einwohner).\n\n**Lange Saison** — 7–8 Monate pro Jahr.` },
      { title: "Vergleich mit anderen Reisezielen", content: `**Levi vs. Tromsø:** Tromsø (69,6° N) liegt an der Küste mit mehr Bewölkung. Levi hat statistisch mehr klare Nächte.\n\n**Levi vs. Island:** Islands maritime Bedingungen machen das Wetter unberechenbar. Levi hat stabileres Wetter.\n\n**Levi vs. Rovaniemi:** Rovaniemi (66,5° N) liegt am Polarkreis, Levi darüber. Levi ist ruhiger und dunkler.` }
    ],
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Wie lang ist die Nordlichtsaison in Levi?", a: "Etwa 7–8 Monate — von Ende August bis Anfang April. Beste Monate sind Januar, Februar und September." },
        { q: "Warum sieht man im Sommer keine Nordlichter?", a: "Mitternachtssonne — der Himmel ist zu hell. Die Sonne geht im Juni gar nicht unter." },
        { q: "Ist Levi besser als Tromsø?", a: "Anders. Levi ist trockener und bietet mehr klare Nächte. Tromsø hat Küstenlandschaft. Beide sind ausgezeichnet." }
      ]
    },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Nordlichter in Levi", desc: "Umfassender Aurora-Guide", href: "/de/ratgeber/nordlichter-levi" },
        { title: "Beste Zeit für Nordlichter", desc: "Monate und Uhrzeiten", href: "/de/ratgeber/beste-zeit-nordlichter-levi" },
        { title: "Unterkunft", desc: "Aurora-freundliche Unterkunft buchen", href: "/de/unterkunft" }
      ]
    }
  },
  es: {
    meta: {
      title: "Temporada de auroras boreales en Levi — ¿Cuándo empieza y termina? | Leville.net",
      description: "La temporada de auroras boreales en Levi va de finales de agosto a principios de abril. ¿Por qué estos meses? Explicación de estaciones, luz y actividad solar.",
      canonical: "https://leville.net/es/guia/temporada-auroras-boreales-levi"
    },
    h1: "Temporada de auroras boreales en Levi — ¿cuándo empieza y termina?",
    breadcrumbLabel: "Temporada de auroras",
    sections: [
      { title: "Duración de la temporada", content: `La temporada de auroras boreales en Levi dura de finales de agosto a principios de abril — aproximadamente 7–8 meses al año. Esto convierte a Levi en una de las mejores ubicaciones de Europa para observar auroras: una temporada larga, posición al norte del Círculo Polar Ártico (67,8° N) y relativamente poca contaminación lumínica.\n\nPara comparar: en el sur de Finlandia (Helsinki, 60° N), las auroras solo se ven durante tormentas fuertes unas pocas veces al año. En Levi, la actividad de aurora estadística es diez veces mayor.` },
      { title: "¿Por qué no en verano?", content: `El sol de medianoche es la respuesta. En Levi, el sol no se pone en junio ni a principios de julio. Las auroras no se ven contra un cielo claro.\n\nEl mismo fenómeno funciona a la inversa en invierno: la noche polar (principios de diciembre a mediados de enero) ofrece los períodos oscuros más largos.` },
      { title: "Inicio de temporada (agosto–septiembre)", content: `Los primeros avistamientos de aurora son posibles en la última semana de agosto. En septiembre, las noches oscurecen rápidamente — unos 6 minutos por día.\n\nLa ventaja especial del inicio de temporada es el clima: el otoño suele ser despejado y seco en Laponia. La temporada de ruska (mediados de septiembre a principios de octubre) añade profundidad: auroras sobre el follaje otoñal es una de las vistas más inolvidables de Laponia.` },
      { title: "Temporada alta (octubre–febrero)", content: `De octubre a febrero, las noches son largas y oscuras — óptimo. Octubre aún ofrece tiempo despejado con frecuencia.\n\nLa noche polar de diciembre es teóricamente la mejor época, pero en la práctica la nubosidad es máxima. Enero y febrero son la combinación óptima: noches largas y periodos fríos despejados frecuentes.` },
      { title: "Fin de temporada (marzo–abril)", content: `A principios de marzo, las auroras aún se ven bien. Pero las noches se aclaran rápido: a finales de marzo Levi tiene 14 horas de luz.\n\nEn abril ya es muy difícil ver auroras en Levi.` },
      { title: "Por qué Levi es una gran ubicación", content: `**67,8° de latitud norte** — Levi está por encima del Círculo Polar Ártico, directamente bajo el óvalo auroral.\n\n**Clima continental** — Levi está en el interior. Más noches despejadas que ubicaciones costeras.\n\n**Poca contaminación lumínica** — El pueblo es pequeño (unos 800 habitantes).\n\n**Temporada larga** — 7–8 meses al año.` },
      { title: "Comparación con otros destinos", content: `**Levi vs. Tromsø:** Tromsø (69,6° N) está en la costa con más nubosidad. Levi tiene estadísticamente más noches despejadas.\n\n**Levi vs. Islandia:** Las condiciones marítimas de Islandia hacen el tiempo impredecible. Levi tiene clima más estable.\n\n**Levi vs. Rovaniemi:** Rovaniemi (66,5° N) está en el Círculo Polar, Levi por encima. Levi es más tranquilo y oscuro.` }
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Cuánto dura la temporada de auroras en Levi?", a: "Aproximadamente 7–8 meses — de finales de agosto a principios de abril. Los mejores meses son enero, febrero y septiembre." },
        { q: "¿Por qué no se ven auroras en verano?", a: "Sol de medianoche — el cielo es demasiado claro. El sol no se pone en junio." },
        { q: "¿Es Levi mejor que Tromsø?", a: "Diferente. Levi es más seco y ofrece más noches despejadas. Tromsø tiene paisaje costero. Ambos son excelentes." }
      ]
    },
    readNext: {
      title: "Lee también",
      links: [
        { title: "Auroras boreales en Levi", desc: "Guía completa de aurora", href: "/es/guia/auroras-boreales-levi" },
        { title: "Mejor momento para auroras", desc: "Meses y horarios", href: "/es/guia/mejor-momento-auroras-boreales-levi" },
        { title: "Alojamiento", desc: "Reserva alojamiento aurora-friendly", href: "/es/alojamiento" }
      ]
    }
  },
  fr: {
    meta: {
      title: "Saison des aurores boréales à Levi — Quand commence-t-elle et quand finit-elle ? | Leville.net",
      description: "La saison des aurores boréales à Levi s'étend de fin août à début avril. Pourquoi ces mois ? Explication des saisons, de la lumière et de l'activité solaire.",
      canonical: "https://leville.net/fr/guide/saison-aurores-boreales-levi"
    },
    h1: "Saison des aurores boréales à Levi — quand commence-t-elle ?",
    breadcrumbLabel: "Saison des aurores",
    sections: [
      { title: "Durée de la saison", content: `La saison des aurores boréales à Levi dure de fin août à début avril — environ 7–8 mois par an. Cela fait de Levi l'un des meilleurs endroits d'Europe pour l'observation des aurores : une longue saison, une position au nord du cercle polaire (67,8° N) et relativement peu de pollution lumineuse.\n\nPour comparaison : dans le sud de la Finlande (Helsinki, 60° N), les aurores ne sont visibles que lors de fortes tempêtes quelques fois par an. À Levi, l'activité aurora statistique est dix fois plus élevée.` },
      { title: "Pourquoi pas en été ?", content: `Le soleil de minuit est la réponse. À Levi, le soleil ne se couche pas du tout en juin et début juillet. Les aurores ne sont pas visibles contre un ciel clair.\n\nLe même phénomène fonctionne en sens inverse en hiver : la nuit polaire (début décembre à mi-janvier) offre les périodes sombres les plus longues.` },
      { title: "Début de saison (août–septembre)", content: `Les premières observations d'aurores sont possibles la dernière semaine d'août. En septembre, les nuits s'assombrissent rapidement — environ 6 minutes par jour.\n\nL'avantage spécial du début de saison est la météo : l'automne est souvent clair et sec en Laponie. La saison ruska (mi-septembre à début octobre) ajoute de la profondeur : aurores au-dessus des couleurs d'automne est l'un des spectacles les plus inoubliables de Laponie.` },
      { title: "Haute saison (octobre–février)", content: `D'octobre à février, les nuits sont longues et sombres — optimal. Octobre offre encore un temps assez souvent dégagé.\n\nLa nuit polaire de décembre est théoriquement la meilleure période, mais en pratique la nébulosité est maximale. Janvier et février sont la combinaison optimale.` },
      { title: "Fin de saison (mars–avril)", content: `Début mars, les aurores sont encore bien visibles. Mais les nuits s'éclaircissent vite : fin mars, Levi a déjà 14 heures de lumière du jour.\n\nEn avril, il est déjà très difficile de voir des aurores à Levi.` },
      { title: "Pourquoi Levi est un excellent endroit", content: `**67,8° de latitude nord** — Levi se trouve au-dessus du cercle polaire, directement sous l'ovale auroral.\n\n**Climat continental** — Levi est à l'intérieur des terres. Plus de nuits claires que les sites côtiers.\n\n**Peu de pollution lumineuse** — Le village est petit (environ 800 habitants).\n\n**Longue saison** — 7–8 mois par an.` },
      { title: "Comparaison avec d'autres destinations", content: `**Levi vs. Tromsø :** Tromsø (69,6° N) est sur la côte avec plus de nuages. Levi a statistiquement plus de nuits claires.\n\n**Levi vs. Islande :** Les conditions maritimes islandaises rendent la météo imprévisible. Levi a un temps plus stable.\n\n**Levi vs. Rovaniemi :** Rovaniemi (66,5° N) est sur le cercle polaire, Levi au-dessus. Levi est plus calme et plus sombre.` }
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Combien de temps dure la saison des aurores à Levi ?", a: "Environ 7–8 mois — de fin août à début avril. Les meilleurs mois sont janvier, février et septembre." },
        { q: "Pourquoi ne voit-on pas d'aurores en été ?", a: "Soleil de minuit — le ciel est trop clair. Le soleil ne se couche pas du tout en juin." },
        { q: "Levi est-il mieux que Tromsø ?", a: "Différent. Levi est plus sec et offre plus de nuits claires. Tromsø a un paysage côtier. Les deux sont excellents." }
      ]
    },
    readNext: {
      title: "À lire aussi",
      links: [
        { title: "Aurores boréales à Levi", desc: "Guide complet des aurores", href: "/fr/guide/aurores-boreales-levi" },
        { title: "Meilleur moment pour les aurores", desc: "Mois et horaires", href: "/fr/guide/meilleur-moment-aurores-boreales-levi" },
        { title: "Hébergement", desc: "Réservez un hébergement aurora-friendly", href: "/fr/hebergement" }
      ]
    }
  }
};

const NorthernLightsSeasonLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/revontulisesonki-levi", en: "/guide/northern-lights-season-levi" };
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
                    __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                  }} />
                ))}
              </section>
            ))}
            <section className="mb-12">
              <Card className="glass-card border-border/30 p-6">
                <p className="text-muted-foreground mb-4">
                  {lang === "fi" ? "Majoitu Levillä ja katsele revontulia omalta terassilta." : "Stay in Levi and watch the northern lights from your own terrace."}
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

export default NorthernLightsSeasonLevi;
