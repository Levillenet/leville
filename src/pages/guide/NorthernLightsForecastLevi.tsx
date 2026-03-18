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
      title: "Revontuliennuste Levillä — Kp-indeksi, aurinkotuuli ja pilvet | Leville.net",
      description: "Miten lukea revontuliennustetta? Kp-indeksi, aurinkotuuli, pilvisyys ja parhaat sovellukset ennusteen seuraamiseen Levillä.",
      canonical: "https://leville.net/opas/revontuliennuste-levi"
    },
    h1: "Revontuliennuste — miten tietää milloin mennä ulos?",
    breadcrumbLabel: "Revontuliennuste",
    sections: [
      {
        title: "Kp-indeksi — tärkein luku",
        content: `Kp-indeksi on asteikko 0–9 joka mittaa geomagneettista aktiivisuutta — eli kuinka voimakkaasti aurinkotuuli häiritsee maan magneettikenttää. Mitä korkeampi Kp, sitä vahvempia revontulia.

Levillä (67,8° N) sijainti aurora-ovaalin alla tarkoittaa, että revontulia voi nähdä jo alhaisilla Kp-arvoilla:

• **Kp 2** = mahdollista nähdä heikkoja revontulia pohjoisella taivaalla
• **Kp 3** = hyvä todennäköisyys — selkeät vihreat kaaret
• **Kp 5+** = voimakkaita revontulia joka puolella taivasta, värejä (vihreä, violetti, punainen)
• **Kp 7+** = geomagneettinen myrsky — harvinainen mutta spektakulaarinen, taivas palaa

Vertailun vuoksi: Helsingissä (60° N) tarvitaan Kp 5+ jotta revontulet ylipäätään näkyvät. Levin pohjoisempi sijainti on valtava etu.`
      },
      {
        title: "Aurinkotuuli (Solar Wind)",
        content: `Aurinko lähettää jatkuvasti hiukkasvirtaa avaruuteen — tätä kutsutaan aurinkotuuleksi. Normaalitilassa aurinkotuuli on tasaista eikä aiheuta merkittäviä revontulia. Mutta kun auringon pinnalta purkautuu valtava hiukkaspilvi (CME = Coronal Mass Ejection, koronamassan purke), tilanne muuttuu dramaattisesti.

CME-purkauksen hiukkaset kulkevat avaruuden halki 1–3 päivässä ja osuvat maan magneettikenttään. Tämä aiheuttaa geomagneettisen myrskyn — ja revontulia. Ennustepalvelut kuten NOAA ja Ilmatieteen laitos seuraavat auringon purkauksia reaaliajassa ja ennustavat milloin ne osuvat maahan.

Käytännössä tämä tarkoittaa: kun auringossa nähdään CME-purkaus, revontuliennuste 1–3 päivän päähän muuttuu positiiviseksi. Tämä antaa aikaa suunnitella ilta-aktiviteetteja.`
      },
      {
        title: "Pilvisyys — toinen puoli yhtälöstä",
        content: `Kp voi olla 7 ja aurinkomyrsky raivoisa — mutta jos taivas on pilvinen, et näe mitään. Pilvisyys on yhtä tärkeä tekijä kuin aurora-aktiivisuus, ja se on usein ratkaisevampi.

Revontulet tapahtuvat 100–300 km korkeudessa. Pilvet ovat 1–10 km korkeudessa. Jos niiden välissä on pilvikerros, näkymä on estetty täysin.

Suositeltavat pilviennustepalvelut:
• **Ilmatieteen laitos** (ilmatieteenlaitos.fi) — Suomen paras, tuntikohtainen ennuste
• **yr.no** — Norjalainen, erittäin tarkka Lapin alueella
• **Clear Outside** — Erityisesti tähtiharrastajille suunniteltu, näyttää pilvikorkeudet

Käytännön vinkki: tarkista molemmat — aurora-ennuste JA pilviennuste. Vasta kun molemmat ovat suotuisat, kannattaa lähteä ulos.`
      },
      {
        title: "Parhaat sovellukset ja sivustot",
        content: `**My Aurora Forecast** (mobiilisovellus, iOS & Android) — Push-ilmoitukset kun Kp nousee haluamallesi tasolle. Yksinkertainen ja toimiva. Aseta hälytys esim. Kp 3+ niin saat ilmoituksen puhelimeesi.

**NOAA Space Weather** (spaceweather.gov) — Yhdysvaltain avaruussääkeskuksen virallinen Kp-ennuste 3 päiväksi eteenpäin. Luotettavin pitkän aikavälin ennuste.

**Ilmatieteen laitos** (ilmatieteenlaitos.fi) — Suomen oma avaruussää- ja pilvipalvelu. Suomenkielinen ja tarkka.

**Avaruussää.fi** — Suomenkielinen avaruussääsivusto reaaliaikaisella datalla.

**leville.net/revontulet** — Oma sivumme live-ennusteella ja revontulihälytyksen tilauksella.

**Vinkki:** Aseta My Aurora Forecast -sovellukseen hälytys Kp 3+ niin saat ilmoituksen puhelimeesi keskellä yötä. Monet vieraamme ovat nähneet parhaat revontulensa juuri tällä tavalla — herätetty sovelluksen hälytyksellä ja mennyt parvekkeelle pyjamassa.`
      },
      {
        title: "Käytännön ohje iltaa varten",
        content: `Yksinkertainen 3 askeleen strategia:

**1. Tarkista Kp-ennuste iltapäivällä** — Onko Kp 3+? Jos kyllä, mahdollisuudet ovat hyvät.

**2. Tarkista pilviennuste** — Onko taivas selkeä tai puolipilvinen? Jos pilviprosentti on yli 80%, revontulien näkeminen on epätodennäköistä.

**3. Jos molemmat ok → mene ulos klo 21–01 välillä**, pimeään paikkaan, ja odota 15–30 minuuttia silmien tottumista pimeyteen. Älä katso puhelinta kirkkaalla näytöllä — se pilaa pimeänäön.

Muista: revontulet voivat ilmestyä ja kadota nopeasti. Joskus näytös kestää 5 minuuttia, joskus 2 tuntia. Kärsivällisyys palkitsee.`
      },
      {
        title: "Älä luota pelkkään ennusteeseen",
        content: `Revontulet voivat yllättää molempiin suuntiin. Joskus Kp on 1 mutta paikallisesti näkyy heikkoa auroraa pohjoistaivaalla — erityisesti Levin pohjoisella sijainnilla. Joskus Kp on 5 mutta pilvet peittävät kaiken.

Paras strategia on mennä ulos joka ilta vähintään hetkeksi ja katsoa taivasta — se on ilmaista ja voi yllättää. Monet unohtumattomimmat revontulielämykset ovat syntyneet sattumalta: pihalle iltakävelylle lähtiessä tai saunasta tullessa.

Kolmen yön loma antaa tilastollisesti jo hyvän todennäköisyyden. Viikon lomalla näkee revontulia lähes varmasti vähintään kerran, jos kausi on oikea (syys–helmikuu).`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Mikä Kp-arvo riittää revontulien näkemiseen Levillä?", a: "Kp 3 on hyvä lähtökohta. Jo Kp 2:lla voi nähdä heikkoja revontulia pohjoisella taivaalla. Kp 5+ tarkoittaa vahvoja revontulia kaikkialla taivaalla." },
        { q: "Mikä on paras sovellus revontulien seuraamiseen?", a: "My Aurora Forecast push-ilmoituksilla on käytännöllisin. Lisäksi tarkista pilviennuste Ilmatieteen laitoksen sivuilta tai yr.no:sta." },
        { q: "Voiko revontulia ennustaa tarkasti?", a: "Ei — 1–3 päivän ennuste on suuntaa-antava. CME-purkauksia voidaan ennustaa kun ne nähdään auringossa, mutta voimakkuus ja tarkka ajoitus selviävät vasta kun hiukkaset saapuvat. Yllätykset ovat osa kokemusta." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava revontuliopas", href: "/revontulet" },
        { title: "Paras aika revontulille", desc: "Kuukaudet ja kellonajat", href: "/opas/paras-aika-revontulet-levi" },
        { title: "Majoitukset", desc: "Varaa majoitus Levillä", href: "/majoitukset" }
      ]
    }
  },
  en: {
    meta: {
      title: "Northern Lights Forecast in Levi — KP Index, Solar Wind & Clouds | Leville.net",
      description: "How to read a northern lights forecast? KP index, solar wind, cloud cover and best apps for tracking aurora in Levi.",
      canonical: "https://leville.net/guide/northern-lights-forecast-levi"
    },
    h1: "Northern Lights Forecast — How to Know When to Go Outside?",
    breadcrumbLabel: "Aurora Forecast",
    sections: [
      {
        title: "KP Index — The Most Important Number",
        content: `The KP index is a scale from 0–9 that measures geomagnetic activity — how strongly the solar wind disturbs Earth's magnetic field. The higher the KP, the stronger the aurora.

In Levi (67.8° N), the location beneath the aurora oval means northern lights can be seen even at low KP values:

• **KP 2** = possible to see faint aurora on the northern horizon
• **KP 3** = good probability — clear green arcs
• **KP 5+** = strong aurora across the entire sky, colours (green, purple, red)
• **KP 7+** = geomagnetic storm — rare but spectacular, the sky is on fire

For comparison: in Helsinki (60° N), KP 5+ is needed for aurora to be visible at all. Levi's northern location is a huge advantage.`
      },
      {
        title: "Solar Wind",
        content: `The sun constantly sends a stream of particles into space — this is called the solar wind. Normally it's steady and doesn't cause significant aurora. But when a massive particle cloud erupts from the sun's surface (CME = Coronal Mass Ejection), the situation changes dramatically.

CME particles travel through space in 1–3 days and hit Earth's magnetic field. This causes a geomagnetic storm — and aurora. Forecast services like NOAA and the Finnish Meteorological Institute monitor solar eruptions in real-time and predict when they'll hit Earth.

In practice: when a CME is observed on the sun, the aurora forecast 1–3 days ahead turns positive. This gives time to plan evening activities.`
      },
      {
        title: "Cloud Cover — The Other Half of the Equation",
        content: `KP could be 7 and a solar storm raging — but if the sky is cloudy, you won't see anything. Cloud cover is equally important as aurora activity, and often more decisive.

Northern lights occur at 100–300 km altitude. Clouds sit at 1–10 km. If there's a cloud layer between, the view is completely blocked.

Recommended cloud forecast services:
• **Finnish Meteorological Institute** (ilmatieteenlaitos.fi) — Finland's best, hourly forecast
• **yr.no** — Norwegian, very accurate for Lapland area
• **Clear Outside** — Designed for astronomers, shows cloud heights

Practical tip: check both — aurora forecast AND cloud forecast. Only when both are favourable is it worth going outside.`
      },
      {
        title: "Best Apps and Websites",
        content: `**My Aurora Forecast** (mobile app, iOS & Android) — Push notifications when KP rises to your chosen level. Simple and effective. Set the alert to e.g. KP 3+ to receive notifications.

**NOAA Space Weather** (spaceweather.gov) — Official US Space Weather Center KP forecast 3 days ahead. Most reliable long-term forecast.

**Finnish Meteorological Institute** (ilmatieteenlaitos.fi) — Finland's own space weather and cloud service. Accurate for Levi area.

**leville.net/revontulet** — Our own page with live forecast and aurora alert subscription.

**Tip:** Set My Aurora Forecast to alert at KP 3+ so you get a notification on your phone in the middle of the night. Many of our guests have seen their best aurora this way — woken by the app alert and stepping onto the balcony in pyjamas.`
      },
      {
        title: "Practical Evening Guide",
        content: `Simple 3-step strategy:

**1. Check KP forecast in the afternoon** — Is KP 3+? If yes, chances are good.

**2. Check cloud forecast** — Is the sky clear or partly cloudy? If cloud percentage is over 80%, seeing aurora is unlikely.

**3. If both look good → go outside between 9 PM and 1 AM**, to a dark place, and wait 15–30 minutes for your eyes to adjust to darkness. Don't look at your phone with a bright screen — it ruins your night vision.

Remember: aurora can appear and disappear quickly. Sometimes the display lasts 5 minutes, sometimes 2 hours. Patience pays off.`
      },
      {
        title: "Don't Rely Solely on the Forecast",
        content: `Northern lights can surprise in both directions. Sometimes KP is 1 but faint aurora appears on the northern sky — especially at Levi's northern latitude. Sometimes KP is 5 but clouds cover everything.

The best strategy is to go outside every evening for at least a moment and look at the sky — it's free and can surprise you. Many of the most unforgettable aurora experiences have happened by chance: stepping outside for an evening walk or coming out of the sauna.

A three-night holiday gives statistically good odds. On a week-long holiday, you'll almost certainly see aurora at least once, provided you visit during the right season (September–February).`
      }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What KP value is enough to see aurora in Levi?", a: "KP 3 is a good starting point. Even KP 2 can show faint aurora on the northern horizon. KP 5+ means strong aurora across the entire sky." },
        { q: "What's the best app for aurora tracking?", a: "My Aurora Forecast with push notifications is the most practical. Also check cloud forecasts from the Finnish Meteorological Institute or yr.no." },
        { q: "Can northern lights be predicted accurately?", a: "No — a 1–3 day forecast is indicative. CME eruptions can be predicted when observed on the sun, but intensity and exact timing only become clear when particles arrive. Surprises are part of the experience." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "Best Time for Aurora", desc: "Months and hours", href: "/guide/best-time-to-see-northern-lights-levi" },
        { title: "Accommodation", desc: "Book accommodation in Levi", href: "/en/accommodations" }
      ]
    }
  },
  nl: {
    meta: {
      title: "Noorderlichtvoorspelling in Levi — KP-index, zonnewind & wolken | Leville.net",
      description: "Hoe lees je een noorderlichtvoorspelling? KP-index, zonnewind, bewolking en beste apps voor het volgen van aurora in Levi.",
      canonical: "https://leville.net/nl/gids/noorderlicht-voorspelling-levi"
    },
    h1: "Noorderlichtvoorspelling — hoe weet je wanneer je naar buiten moet?",
    breadcrumbLabel: "Aurora-voorspelling",
    sections: [
      { title: "KP-index — het belangrijkste getal", content: `De KP-index is een schaal van 0–9 die geomagnetische activiteit meet — hoe sterk de zonnewind het magnetisch veld van de aarde verstoort. Hoe hoger de KP, hoe sterker de aurora.\n\nIn Levi (67,8° NB), onder de aurora-ovaal, is noorderlicht al bij lage KP-waarden zichtbaar:\n\n• **KP 2** = mogelijk zwak noorderlicht aan de noordelijke horizon\n• **KP 3** = goede kans — duidelijke groene bogen\n• **KP 5+** = sterk noorderlicht over de hele hemel, kleuren (groen, paars, rood)\n• **KP 7+** = geomagnetische storm — zeldzaam maar spectaculair\n\nTer vergelijking: in Helsinki (60° NB) is KP 5+ nodig. Levi's noordelijke ligging is een enorm voordeel.` },
      { title: "Zonnewind", content: `De zon zendt continu een stroom deeltjes de ruimte in — dit is de zonnewind. Normaal is die stabiel. Maar wanneer een enorme deeltjeswolk (CME = Coronal Mass Ejection) van het zonoppervlak losbarst, verandert de situatie dramatisch.\n\nCME-deeltjes reizen 1–3 dagen door de ruimte en raken het magnetisch veld van de aarde. Dit veroorzaakt een geomagnetische storm — en aurora. Voorspellingsdiensten zoals NOAA volgen zonne-uitbarstingen in realtime.\n\nIn de praktijk: wanneer een CME op de zon wordt waargenomen, wordt de aurora-voorspelling voor 1–3 dagen positief.` },
      { title: "Bewolking — de andere helft van de vergelijking", content: `KP kan 7 zijn en een zonnestorm woeden — maar als de hemel bewolkt is, zie je niets. Bewolking is even belangrijk als aurora-activiteit.\n\nNoorderlicht ontstaat op 100–300 km hoogte. Wolken zitten op 1–10 km. Als er een wolkenlaag tussen zit, is het zicht volledig geblokkeerd.\n\nAanbevolen wolkenvoorspellingsdiensten:\n• **Fins Meteorologisch Instituut** (ilmatieteenlaitos.fi)\n• **yr.no** — Noors, zeer nauwkeurig voor Lapland\n• **Clear Outside** — Speciaal voor sterrenliefhebbers\n\nPraktische tip: controleer beide — aurora-voorspelling ÉN wolkenvoorspelling.` },
      { title: "Beste apps en websites", content: `**My Aurora Forecast** (mobiele app, iOS & Android) — Push-meldingen wanneer KP stijgt tot je gewenste niveau. Stel de melding in op bijv. KP 3+.\n\n**NOAA Space Weather** (spaceweather.gov) — Officiële KP-voorspelling 3 dagen vooruit.\n\n**leville.net/revontulet** — Onze eigen pagina met live voorspelling en aurora-abonnement.\n\n**Tip:** Stel My Aurora Forecast in op KP 3+ zodat je midden in de nacht een melding krijgt. Veel van onze gasten hebben hun mooiste aurora zo gezien — gewekt door de app en in pyjama het balkon op.` },
      { title: "Praktische avondgids", content: `Eenvoudige 3-stappenstrategie:\n\n**1. Controleer de KP-voorspelling 's middags** — Is KP 3+? Dan zijn de kansen goed.\n\n**2. Controleer de wolkenvoorspelling** — Is de hemel helder of gedeeltelijk bewolkt? Als het wolkenpercentage boven 80% is, is aurora onwaarschijnlijk.\n\n**3. Als beide goed zijn → ga naar buiten tussen 21:00 en 01:00**, naar een donkere plek, en wacht 15–30 minuten tot je ogen aan het donker gewend zijn. Kijk niet op je telefoon met een helder scherm.\n\nOnthoud: aurora kan snel verschijnen en verdwijnen. Geduld loont.` },
      { title: "Vertrouw niet alleen op de voorspelling", content: `Noorderlicht kan beide kanten op verrassen. Soms is KP 1 maar verschijnt er toch zwak aurora — vooral op Levi's noordelijke breedtegraad. Soms is KP 5 maar bedekken wolken alles.\n\nDe beste strategie is elke avond even naar buiten gaan en naar de hemel kijken — het is gratis en kan verrassen. Veel van de meest onvergetelijke aurora-ervaringen zijn per toeval ontstaan.\n\nEen vakantie van drie nachten geeft statistisch al goede kansen. Bij een week zie je bijna zeker minstens één keer aurora (september–februari).` }
    ],
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Welke KP-waarde is genoeg om aurora te zien in Levi?", a: "KP 3 is een goed uitgangspunt. Zelfs KP 2 kan zwak noorderlicht tonen. KP 5+ betekent sterk noorderlicht over de hele hemel." },
        { q: "Wat is de beste app voor het volgen van aurora?", a: "My Aurora Forecast met push-meldingen is het meest praktisch. Controleer ook de wolkenvoorspellingen." },
        { q: "Kan noorderlicht nauwkeurig voorspeld worden?", a: "Nee — een voorspelling van 1–3 dagen is indicatief. Verrassingen horen bij de ervaring." }
      ]
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
        { title: "Beste tijd voor aurora", desc: "Maanden en tijdstippen", href: "/nl/gids/beste-tijd-noorderlicht-levi" },
        { title: "Accommodatie", desc: "Boek accommodatie in Levi", href: "/nl/accommodatie" }
      ]
    }
  },
  sv: {
    meta: {
      title: "Norrskensprognos i Levi — KP-index, solvind & moln | Leville.net",
      description: "Hur läser man en norrskensprognos? KP-index, solvind, molntäcke och bästa appar för att följa norrsken i Levi.",
      canonical: "https://leville.net/sv/guide/norrsken-prognos-levi"
    },
    h1: "Norrskensprognos — hur vet man när man ska gå ut?",
    breadcrumbLabel: "Norrskensprognos",
    sections: [
      { title: "KP-index — det viktigaste talet", content: `KP-index är en skala 0–9 som mäter geomagnetisk aktivitet. Ju högre KP, desto starkare norrsken.\n\nI Levi (67,8° N), under aurora-ovalen, syns norrsken redan vid låga KP-värden:\n\n• **KP 2** = möjligt att se svagt norrsken på nordhorisonten\n• **KP 3** = god sannolikhet — tydliga gröna bågar\n• **KP 5+** = starkt norrsken över hela himlen\n• **KP 7+** = geomagnetisk storm — sällsynt men spektakulärt` },
      { title: "Solvind", content: `Solen skickar ständigt en partikelström ut i rymden — solvinden. Normalt är den stabil. Men när ett massivt partikelmoln (CME) bryter ut från solens yta förändras situationen dramatiskt.\n\nCME-partiklar reser 1–3 dagar genom rymden. När de träffar jordens magnetfält uppstår en geomagnetisk storm — och norrsken.` },
      { title: "Molntäcke — den andra halvan", content: `KP kan vara 7 — men om himlen är molnig ser du ingenting. Molntäcke är lika viktigt som aurora-aktivitet.\n\nRekommenderade molnprognostjänster:\n• **Finska Meteorologiska Institutet** (ilmatieteenlaitos.fi)\n• **yr.no** — Norsk, mycket exakt för Lappland\n• **Clear Outside** — Designad för astronomer\n\nPraktiskt tips: kolla båda — aurora-prognos OCH molnprognos.` },
      { title: "Bästa appar och webbplatser", content: `**My Aurora Forecast** (mobilapp) — Push-notiser när KP stiger. Ställ in larm på KP 3+.\n\n**NOAA Space Weather** — Officiell KP-prognos 3 dagar framåt.\n\n**leville.net/revontulet** — Vår egen sida med live-prognos.\n\n**Tips:** Ställ in My Aurora Forecast på KP 3+ för att få notis mitt i natten.` },
      { title: "Praktisk kvällsguide", content: `Enkel 3-stegs strategi:\n\n**1. Kolla KP-prognosen på eftermiddagen** — KP 3+? Bra chanser.\n\n**2. Kolla molnprognosen** — Klar eller delvis molnig himmel?\n\n**3. Om båda ser bra ut → gå ut mellan 21–01**, till en mörk plats, och vänta 15–30 minuter. Titta inte på telefonen med ljus skärm.` },
      { title: "Lita inte bara på prognosen", content: `Norrsken kan överraska åt båda hållen. Ibland är KP 1 men svagt norrsken syns ändå. Ibland är KP 5 men moln täcker allt.\n\nBästa strategin: gå ut varje kväll och titta — det är gratis. Många av de mest oförglömliga upplevelserna har skett av en slump.\n\nTre nätters semester ger statistiskt goda chanser. En veckas semester ger nästan säker observation (september–februari).` }
    ],
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Vilket KP-värde räcker för norrsken i Levi?", a: "KP 3 är ett bra utgångsläge. Redan KP 2 kan visa svagt norrsken. KP 5+ innebär starkt norrsken." },
        { q: "Vilken är den bästa appen?", a: "My Aurora Forecast med push-notiser. Kolla även molnprognoser." },
        { q: "Kan norrsken förutsägas exakt?", a: "Nej — 1–3 dagars prognos är vägledande. Överraskningar hör till upplevelsen." }
      ]
    },
    readNext: {
      title: "Läs också",
      links: [
        { title: "Norrsken i Levi", desc: "Omfattande norrskensguide", href: "/sv/guide/norrsken-levi" },
        { title: "Bästa tid för norrsken", desc: "Månader och tidpunkter", href: "/sv/guide/basta-tid-norrsken-levi" },
        { title: "Boende", desc: "Boka boende i Levi", href: "/sv/boende" }
      ]
    }
  },
  de: {
    meta: {
      title: "Nordlichtvorhersage in Levi — KP-Index, Sonnenwind & Wolken | Leville.net",
      description: "Wie liest man eine Nordlichtvorhersage? KP-Index, Sonnenwind, Bewölkung und beste Apps für die Aurora-Verfolgung in Levi.",
      canonical: "https://leville.net/de/ratgeber/nordlicht-vorhersage-levi"
    },
    h1: "Nordlichtvorhersage — wie weiß man, wann man rausgehen soll?",
    breadcrumbLabel: "Aurora-Vorhersage",
    sections: [
      { title: "KP-Index — die wichtigste Zahl", content: `Der KP-Index ist eine Skala von 0–9 für geomagnetische Aktivität. Je höher der KP, desto stärker die Nordlichter.\n\nIn Levi (67,8° N), unter dem Aurora-Oval, sind Nordlichter schon bei niedrigen KP-Werten sichtbar:\n\n• **KP 2** = möglicherweise schwache Aurora am Nordhorizont\n• **KP 3** = gute Wahrscheinlichkeit — klare grüne Bögen\n• **KP 5+** = starke Nordlichter am gesamten Himmel\n• **KP 7+** = geomagnetischer Sturm — selten aber spektakulär` },
      { title: "Sonnenwind", content: `Die Sonne sendet ständig einen Teilchenstrom ins All — den Sonnenwind. Normalerweise ist er stabil. Wenn aber eine massive Teilchenwolke (CME) von der Sonnenoberfläche ausbricht, ändert sich die Situation dramatisch.\n\nCME-Teilchen reisen 1–3 Tage durch den Weltraum und treffen auf das Erdmagnetfeld — dies verursacht einen geomagnetischen Sturm und Nordlichter.` },
      { title: "Bewölkung — die andere Hälfte", content: `KP kann 7 sein — aber bei bewölktem Himmel sehen Sie nichts. Bewölkung ist ebenso wichtig wie Aurora-Aktivität.\n\nEmpfohlene Wolkenvorhersagedienste:\n• **Finnisches Meteorologisches Institut** (ilmatieteenlaitos.fi)\n• **yr.no** — Norwegisch, sehr genau für Lappland\n• **Clear Outside** — Für Astronomen konzipiert\n\nPraxistipp: Prüfen Sie beides — Aurora-Vorhersage UND Wolkenvorhersage.` },
      { title: "Beste Apps und Websites", content: `**My Aurora Forecast** (Mobile App) — Push-Benachrichtigungen bei steigendem KP. Stellen Sie den Alarm auf KP 3+ ein.\n\n**NOAA Space Weather** — Offizielle KP-Vorhersage 3 Tage voraus.\n\n**leville.net/revontulet** — Unsere Seite mit Live-Vorhersage.\n\n**Tipp:** Stellen Sie My Aurora Forecast auf KP 3+ ein, um mitten in der Nacht benachrichtigt zu werden.` },
      { title: "Praktischer Abendführer", content: `Einfache 3-Schritte-Strategie:\n\n**1. KP-Vorhersage nachmittags prüfen** — KP 3+? Gute Chancen.\n\n**2. Wolkenvorhersage prüfen** — Klarer oder teilweise bewölkter Himmel?\n\n**3. Wenn beides passt → zwischen 21–01 Uhr rausgehen**, an einen dunklen Ort, 15–30 Minuten warten. Nicht aufs Handy mit hellem Bildschirm schauen.` },
      { title: "Verlassen Sie sich nicht nur auf die Vorhersage", content: `Nordlichter können in beide Richtungen überraschen. Manchmal ist KP 1 aber schwache Aurora erscheint trotzdem. Manchmal ist KP 5 aber Wolken verdecken alles.\n\nBeste Strategie: Jeden Abend kurz rausgehen und schauen — es ist kostenlos. Viele der unvergesslichsten Erlebnisse entstehen zufällig.\n\nEin Drei-Nächte-Urlaub gibt statistisch gute Chancen. Bei einer Woche sehen Sie fast sicher mindestens einmal Nordlichter (September–Februar).` }
    ],
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Welcher KP-Wert reicht für Nordlichter in Levi?", a: "KP 3 ist ein guter Ausgangspunkt. Schon KP 2 kann schwache Aurora zeigen. KP 5+ bedeutet starke Nordlichter." },
        { q: "Was ist die beste App?", a: "My Aurora Forecast mit Push-Benachrichtigungen. Prüfen Sie auch Wolkenvorhersagen." },
        { q: "Können Nordlichter genau vorhergesagt werden?", a: "Nein — eine 1–3-Tage-Vorhersage ist nur richtungsweisend. Überraschungen gehören dazu." }
      ]
    },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Nordlichter in Levi", desc: "Umfassender Aurora-Guide", href: "/de/ratgeber/nordlichter-levi" },
        { title: "Beste Zeit für Nordlichter", desc: "Monate und Uhrzeiten", href: "/de/ratgeber/beste-zeit-nordlichter-levi" },
        { title: "Unterkunft", desc: "Buchen Sie Unterkunft in Levi", href: "/de/unterkunft" }
      ]
    }
  },
  es: {
    meta: {
      title: "Pronóstico de auroras boreales en Levi — Índice KP, viento solar y nubes | Leville.net",
      description: "Cómo leer un pronóstico de auroras boreales: índice KP, viento solar, nubosidad y mejores apps para seguir la aurora en Levi.",
      canonical: "https://leville.net/es/guia/pronostico-auroras-boreales-levi"
    },
    h1: "Pronóstico de auroras boreales — ¿cómo saber cuándo salir?",
    breadcrumbLabel: "Pronóstico de aurora",
    sections: [
      { title: "Índice KP — el número más importante", content: `El índice KP es una escala de 0–9 que mide la actividad geomagnética. Cuanto mayor el KP, más fuertes las auroras.\n\nEn Levi (67,8° N), bajo el óvalo auroral, las auroras se ven incluso con valores KP bajos:\n\n• **KP 2** = posible aurora débil en el horizonte norte\n• **KP 3** = buena probabilidad — arcos verdes claros\n• **KP 5+** = aurora fuerte en todo el cielo\n• **KP 7+** = tormenta geomagnética — rara pero espectacular` },
      { title: "Viento solar", content: `El sol envía constantemente partículas al espacio — el viento solar. Normalmente es estable. Pero cuando una enorme nube de partículas (CME) erupciona del sol, la situación cambia dramáticamente.\n\nLas partículas CME viajan 1–3 días y golpean el campo magnético terrestre, causando una tormenta geomagnética y auroras.` },
      { title: "Nubosidad — la otra mitad de la ecuación", content: `El KP puede ser 7 — pero si el cielo está nublado, no verás nada. La nubosidad es tan importante como la actividad aurora.\n\nServicios recomendados:\n• **Instituto Meteorológico Finlandés** (ilmatieteenlaitos.fi)\n• **yr.no** — Noruego, muy preciso para Laponia\n• **Clear Outside** — Diseñado para astrónomos\n\nConsejo: revisa ambos — pronóstico de aurora Y pronóstico de nubes.` },
      { title: "Mejores apps y sitios web", content: `**My Aurora Forecast** (app móvil) — Notificaciones push cuando sube el KP. Configura la alerta en KP 3+.\n\n**NOAA Space Weather** — Pronóstico oficial KP 3 días adelante.\n\n**leville.net/revontulet** — Nuestra página con pronóstico en vivo.\n\n**Consejo:** Configura My Aurora Forecast en KP 3+ para recibir notificaciones en medio de la noche.` },
      { title: "Guía práctica para la noche", content: `Estrategia simple de 3 pasos:\n\n**1. Revisa el pronóstico KP por la tarde** — ¿KP 3+? Buenas posibilidades.\n\n**2. Revisa el pronóstico de nubes** — ¿Cielo despejado o parcialmente nublado?\n\n**3. Si ambos están bien → sal entre las 21:00 y las 01:00**, a un lugar oscuro, y espera 15–30 minutos. No mires el móvil con pantalla brillante.` },
      { title: "No confíes solo en el pronóstico", content: `Las auroras pueden sorprender en ambas direcciones. A veces KP es 1 pero aparece aurora débil. A veces KP es 5 pero las nubes cubren todo.\n\nLa mejor estrategia: sal cada noche un momento y mira al cielo — es gratis. Muchas experiencias inolvidables han sido casuales.\n\nUnas vacaciones de tres noches dan buenas probabilidades estadísticas. Con una semana, casi seguro verás aurora al menos una vez (septiembre–febrero).` }
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Qué valor KP es suficiente para ver aurora en Levi?", a: "KP 3 es un buen punto de partida. Incluso KP 2 puede mostrar aurora débil. KP 5+ significa aurora fuerte." },
        { q: "¿Cuál es la mejor app?", a: "My Aurora Forecast con notificaciones push. Revisa también los pronósticos de nubes." },
        { q: "¿Se pueden predecir las auroras con precisión?", a: "No — un pronóstico de 1–3 días es indicativo. Las sorpresas son parte de la experiencia." }
      ]
    },
    readNext: {
      title: "Lee también",
      links: [
        { title: "Auroras boreales en Levi", desc: "Guía completa de aurora", href: "/es/guia/auroras-boreales-levi" },
        { title: "Mejor momento para auroras", desc: "Meses y horarios", href: "/es/guia/mejor-momento-auroras-boreales-levi" },
        { title: "Alojamiento", desc: "Reserva alojamiento en Levi", href: "/es/alojamiento" }
      ]
    }
  },
  fr: {
    meta: {
      title: "Prévisions d'aurores boréales à Levi — Indice KP, vent solaire & nuages | Leville.net",
      description: "Comment lire une prévision d'aurores boréales ? Indice KP, vent solaire, couverture nuageuse et meilleures apps pour suivre l'aurora à Levi.",
      canonical: "https://leville.net/fr/guide/previsions-aurores-boreales-levi"
    },
    h1: "Prévisions d'aurores boréales — comment savoir quand sortir ?",
    breadcrumbLabel: "Prévisions d'aurores",
    sections: [
      { title: "Indice KP — le chiffre le plus important", content: `L'indice KP est une échelle de 0–9 mesurant l'activité géomagnétique. Plus le KP est élevé, plus les aurores sont fortes.\n\nÀ Levi (67,8° N), sous l'ovale auroral, les aurores sont visibles même avec des valeurs KP basses :\n\n• **KP 2** = possible aurora faible sur l'horizon nord\n• **KP 3** = bonne probabilité — arcs verts nets\n• **KP 5+** = aurora forte sur tout le ciel\n• **KP 7+** = tempête géomagnétique — rare mais spectaculaire` },
      { title: "Vent solaire", content: `Le soleil envoie constamment des particules dans l'espace — le vent solaire. Normalement stable. Mais quand un énorme nuage de particules (CME) érupte du soleil, la situation change dramatiquement.\n\nLes particules CME voyagent 1–3 jours et frappent le champ magnétique terrestre, provoquant une tempête géomagnétique et des aurores.` },
      { title: "Couverture nuageuse — l'autre moitié", content: `Le KP peut être à 7 — mais si le ciel est nuageux, vous ne verrez rien. La nébulosité est aussi importante que l'activité aurora.\n\nServices recommandés :\n• **Institut Météorologique Finlandais** (ilmatieteenlaitos.fi)\n• **yr.no** — Norvégien, très précis pour la Laponie\n• **Clear Outside** — Conçu pour les astronomes\n\nConseil : vérifiez les deux — prévision aurora ET prévision nuageuse.` },
      { title: "Meilleures apps et sites web", content: `**My Aurora Forecast** (app mobile) — Notifications push quand le KP monte. Réglez l'alerte sur KP 3+.\n\n**NOAA Space Weather** — Prévision officielle KP 3 jours à l'avance.\n\n**leville.net/revontulet** — Notre page avec prévision en direct.\n\n**Conseil :** Réglez My Aurora Forecast sur KP 3+ pour être notifié en pleine nuit.` },
      { title: "Guide pratique pour la soirée", content: `Stratégie simple en 3 étapes :\n\n**1. Vérifiez la prévision KP l'après-midi** — KP 3+ ? Bonnes chances.\n\n**2. Vérifiez la prévision nuageuse** — Ciel dégagé ou partiellement nuageux ?\n\n**3. Si les deux sont bons → sortez entre 21h et 1h**, dans un endroit sombre, et attendez 15–30 minutes. Ne regardez pas votre téléphone avec un écran lumineux.` },
      { title: "Ne vous fiez pas uniquement aux prévisions", content: `Les aurores peuvent surprendre dans les deux sens. Parfois KP est 1 mais une faible aurora apparaît. Parfois KP est 5 mais les nuages couvrent tout.\n\nMeilleure stratégie : sortez chaque soir un moment et regardez le ciel — c'est gratuit. De nombreuses expériences inoubliables sont arrivées par hasard.\n\nDes vacances de trois nuits donnent de bonnes chances statistiques. Avec une semaine, vous verrez presque certainement l'aurora au moins une fois (septembre–février).` }
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Quelle valeur KP suffit pour voir l'aurora à Levi ?", a: "KP 3 est un bon point de départ. Même KP 2 peut montrer une faible aurora. KP 5+ signifie une aurora forte." },
        { q: "Quelle est la meilleure app ?", a: "My Aurora Forecast avec notifications push. Vérifiez aussi les prévisions nuageuses." },
        { q: "Les aurores peuvent-elles être prédites avec précision ?", a: "Non — une prévision de 1–3 jours est indicative. Les surprises font partie de l'expérience." }
      ]
    },
    readNext: {
      title: "À lire aussi",
      links: [
        { title: "Aurores boréales à Levi", desc: "Guide complet des aurores", href: "/fr/guide/aurores-boreales-levi" },
        { title: "Meilleur moment pour les aurores", desc: "Mois et horaires", href: "/fr/guide/meilleur-moment-aurores-boreales-levi" },
        { title: "Hébergement", desc: "Réservez un hébergement à Levi", href: "/fr/hebergement" }
      ]
    }
  }
};

const NorthernLightsForecastLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/revontuliennuste-levi", en: "/guide/northern-lights-forecast-levi" };
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
                  {lang === "fi" ? "Majoitu Levillä ja katsele revontulia omalta terassilta." : "Stay in Levi and watch the northern lights from your own terrace."}
                </p>
                <Button asChild>
                  <Link to={lang === "fi" ? "/majoitukset" : "/en/accommodations"}>
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

export default NorthernLightsForecastLevi;
