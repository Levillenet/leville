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
      title: "Revontulien valokuvaus Levillä — Kamera-asetukset ja vinkit | Leville.net",
      description: "Miten kuvata revontulia? Kamera-asetukset, jalusta, ISO, valotusaika ja objektiivit. Käytännön opas Levin olosuhteisiin.",
      canonical: "https://leville.net/opas/revontulien-valokuvaus-levi"
    },
    h1: "Revontulien valokuvaus Levillä — asetukset ja vinkit",
    breadcrumbLabel: "Revontulien valokuvaus",
    sections: [
      {
        title: "Tarvitsetko kameran vai riittääkö puhelin?",
        content: `Moderni puhelin kuvaa revontulia yllättävän hyvin yötilassa ja usein ihan automaatillakin. Puhelimien yökameratekniikka on kehittynyt valtavasti ja tulokset ovat monesti riittäviä sosiaaliseen mediaan ja muistoksi.

Mutta järjestelmäkamera antaa dramaattisesti parempia tuloksia — erityisesti heikkojen revontulien kuvaamisessa ja yksityiskohtien tallentamisessa. Jos sinulla on järjestelmäkamera, ota se ehdottomasti mukaan.

**Molemmat toimivat** — tärkeintä on jalusta. Ilman vakaata alustaa kumpikaan ei tuota hyviä tuloksia pitkillä valotusajoilla.`
      },
      {
        title: "Välttämätön varuste: jalusta (tripod)",
        content: `Revontulien kuvaamisessa valotusajat ovat pitkiä — 5–25 sekuntia riippuen revontulien kirkkaudesta ja kameran asetuksista. Tänä aikana kameran on oltava täysin liikkumaton. Käsivaralta kuvaaminen on mahdotonta.

Pienikin matkajalusta riittää hyvin. Se mahtuu matkalaukkuun ja painaa tyypillisesti alle kilon. Hinta on 30–50 € — paras yksittäinen investointi revontulilomalle.

Ilman jalustaa voit hätätapauksessa asettaa puhelimen tai kameran lumelle, kaiteelle tai kiinteälle alustalle. Mutta tulos on epävarma ja kulmaa on vaikea säätää.

**Vinkki:** Kompakti matkajalusta mahtuu matkalaukkuun ja maksaa 30–50 €. Paras investointi revontulilomalle.`
      },
      {
        title: "Kamera-asetukset (järjestelmäkamera)",
        content: `Aseta kamera manuaalitilaan (M) ja säädä seuraavat:

• **ISO: 1600–6400** — Aloita arvosta 3200 ja säädä tuloksen mukaan. Korkeampi ISO = valoisampi kuva mutta enemmän kohinaa. Modernit kamerat käsittelevät ISO 3200 hyvin.

• **Aukko: Mahdollisimman auki** — f/2.8 tai pienempi on ihanteellinen. Tämä päästää eniten valoa kennolle. f/4 toimii myös mutta vaatii pidemmän valotusajan tai korkeamman ISOn.

• **Valotusaika: 8–25 sekuntia** — Lyhyempi jos revontulet liikkuvat nopeasti (nopeat liikkuvat verhot), pidempi jos revontulet ovat heikkoja ja staattisia. Yli 25 sekunnin valotus alkaa näyttää tähdet viivoina maan pyörimisen vuoksi.

• **Tarkennus: Manuaalinen, äärettömyyteen (∞)** — Autofocus ei toimi pimeässä. Käännä tarkennus manuaalille ja aseta äärettömyyteen. Testaa ottamalla koekuva ja tarkista terävyys.

• **Valkotasapaino: 3500–4000K** — Kylmä sävy tuo esiin revontulien vihreän värin parhaiten. Automaattinen valkotasapaino toimii myös, mutta manuaalinen antaa yhtenäisemmän tuloksen.

• **Tiedostomuoto: RAW** jos mahdollista — RAW-tiedostot antavat huomattavasti enemmän liikkumavaraa jälkikäsittelyssä (kirkkaus, värit, kontrasti).`
      },
      {
        title: "Objektiivit",
        content: `**Laajakulma (10–24 mm)** on ihanteellinen revontulien kuvaamiseen. Se mahdollistaa laajan taivaan ja etualan maiseman saamisen samaan kuvaan. f/2.8 tai nopeampi aukko on paras — enemmän valoa, lyhyempi valotusaika.

Suosittuja laajakulmaobjektiiveja: Samyang/Rokinon 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.

**Kit-objektiivi (18–55 mm f/3.5–5.6)** toimii myös — laajimmalla päässä (18 mm) tulokset ovat kelvollisia. Hitaampi aukko tarkoittaa pidempää valotusaikaa tai korkeampaa ISOa, mutta kelvollisia kuvia saa silti.

Kiinteäpolttoväliset "prime"-objektiivit (esim. 24 mm f/1.4 tai 35 mm f/1.8) ovat erinomaisia valon keräämisessä mutta polttoväli rajoittaa kuva-alaa.`
      },
      {
        title: "Puhelimella kuvaaminen",
        content: `Useimmissa moderneissa puhelimissa on yötila (Night Mode), joka aktivoituu automaattisesti pimeässä. Aseta puhelin jalustalle, avaa kamera ja anna puhelimen valita pitkä valotusaika — tyypillisesti 10–30 sekuntia pimeässä. Pidä puhelin täysin vakaana koko valotuksen ajan.

Monissa puhelimissa on myös Pro-tila, jossa voit säätää ISO-arvoa (800–3200) ja valotusaikaa (10–30 sekuntia) manuaalisesti. Joissain puhelimissa on myös erityinen astrofotografiatila, joka yhdistää useita kuvia automaattisesti.

**Lisäsovellukset:** ProCamera, NightCap Camera tai vastaava sovellus antaa enemmän hallintaa ISO-, aukko- ja valotusasetuksiin.

**Tärkeintä: pidä puhelin täysin vakaana.** Pienikin tärinä — kosketus näyttöön, tuulenvire — pilaa kuvan pitkällä valotuksella. Käytä ajastinta (2–10 s viive) jotta puhelimen koskettaminen ei aiheuta tärinää.`
      },
      {
        title: "Käytännön vinkit pakkasessa",
        content: `**Akku tyhjenee nopeasti kylmässä.** Litiumioniakut menettävät kapasiteettia pakkasessa — −20°C:ssa akku voi tyhjentyä 3x nopeammin kuin huoneenlämmössä. Pidä varaakku kehon lämmössä sisätaskussa ja vaihda tarvittaessa.

**Kosteusvaara:** Kameroita ja puhelimia ei saa tuoda suoraan pakkasesta lämpimään sisätilaan. Lämmin kostea ilma tiivistyy kylmälle linssille ja elektroniikalle, mikä voi aiheuttaa vahinkoa. Anna kameran lämmetä hitaasti — esimerkiksi tuulikaapissa tai kameralaukussa 15–30 minuuttia ennen laukun avaamista.

**Hanskat:** Käytä ohutta alushanskaa (kosketusnäyttöyhteensopiva) jolla voit operoida kameraa, ja paksut hanskat päällä muulloin. Sormien paleltuminen on todellinen riski −20°C:ssa.

**Otsalamppu:** Käytä punaista valoa. Punainen valo ei pilaa pimeänäköä — valkoinen tai sininen valo tuhoaa 15 minuutin pimeään tottumisen hetkessä.`
      },
      {
        title: "Kompositio — etualan merkitys",
        content: `Pelkkä taivas on yksitoikkoinen — ota mukaan etuala. Etualan elementti antaa mittakaavan, tunnelman ja tekee kuvasta ainutlaatuisen. Levin ympäristössä luonnollisia etualoja on kaikkialla:

• **Mökki tai rakennus** — lämmin valo ikkunoista + revontulet = klassinen Lapin kuva
• **Tunturin siluetti** — tunturin ääriviiva taivasta vasten
• **Yksittäinen puu tai puuryhmä** — tykkylumen peittämät puut ovat erityisen kauniita
• **Järven jää** — heijastukset ja avaruus
• **Ihminen** — siluetti tai taskulampun valo antaa mittakaavan

Käytä kolmanneksen sääntöä: horisontti kuvan alakolmanneksessa, taivas ja revontulet yläkolmanneksessa. Kokeile eri kulmia ja perspektiivejä — matalalta kuvattu puu tai ihminen näyttää dramaattiselta revontulitaivasta vasten.`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Riittääkö puhelin revontulien kuvaamiseen?", a: "Kyllä perustasolle — modernit puhelimet kuvaavat yllättävän hyvin yötilassa. Mutta jalusta on silti välttämätön. Järjestelmäkamera antaa dramaattisesti parempia tuloksia." },
        { q: "Mikä on tärkein asetus?", a: "Jalusta + pitkä valotusaika. Ilman vakaata jalustaa mikään kamera-asetus ei auta. Toiseksi tärkein on riittävän korkea ISO (3200 on hyvä lähtökohta) ja mahdollisimman auki oleva aukko." },
        { q: "Miten estää kameran jäätymisen?", a: "Pidä varaakku kehon lämmössä sisätaskussa. Kuvaamisen jälkeen älä tuo kameraa suoraan lämpimään — anna tasaantua hitaasti kameralaukussa tai tuulikaapissa 15–30 minuuttia." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava revontuliopas", href: "/revontulet" },
        { title: "Missä nähdä revontulet", desc: "Parhaat paikat Levillä", href: "/opas/missa-nahda-revontulet-levi" },
        { title: "Talvivarusteet Leville", desc: "Pukeutumisopas Lapin pakkasiin", href: "/opas/talvivarusteet-leville" }
      ]
    }
  },
  en: {
    meta: {
      title: "Northern Lights Photography in Levi — Camera Settings & Tips | Leville.net",
      description: "How to photograph the northern lights? Camera settings, tripod, ISO, shutter speed and lenses. Practical guide for Levi conditions.",
      canonical: "https://leville.net/guide/northern-lights-photography-levi"
    },
    h1: "Northern Lights Photography in Levi — Settings and Tips",
    breadcrumbLabel: "Aurora Photography",
    sections: [
      { title: "Do You Need a Camera or Will a Phone Do?", content: `A modern phone photographs aurora surprisingly well in night mode — often even on automatic settings. Phone camera technology has advanced enormously and results are often sufficient for social media and memories.\n\nBut a mirrorless or DSLR camera gives dramatically better results — especially for capturing faint aurora and fine details. If you own one, definitely bring it along.\n\n**Both work** — the most important thing is a tripod. Without a stable base, neither will produce good results during long exposures.` },
      { title: "Essential Gear: Tripod", content: `When photographing northern lights, exposure times are long — 5–25 seconds depending on aurora brightness and camera settings. During this time, the camera must be completely still. Handheld shooting is impossible.\n\nEven a small travel tripod works perfectly. It fits in a suitcase and typically weighs under a kilo. Price is €30–50 — the single best investment for an aurora holiday.\n\nWithout a tripod, you can in an emergency place your phone or camera on snow, a railing, or a fixed surface. But results are unreliable and angles are hard to adjust.\n\n**Tip:** A compact travel tripod fits in your suitcase and costs €30–50. Best investment for an aurora holiday.` },
      { title: "Camera Settings (Mirrorless/DSLR)", content: `Set your camera to manual mode (M) and adjust:\n\n• **ISO: 1600–6400** — Start at 3200 and adjust based on results. Higher ISO = brighter image but more noise. Modern cameras handle ISO 3200 well.\n\n• **Aperture: As wide as possible** — f/2.8 or faster is ideal. This lets the most light reach the sensor. f/4 also works but requires longer exposure or higher ISO.\n\n• **Shutter speed: 8–25 seconds** — Shorter if aurora is moving fast (dancing curtains), longer if aurora is faint and static. Over 25 seconds shows stars as lines due to Earth's rotation.\n\n• **Focus: Manual, set to infinity (∞)** — Autofocus doesn't work in darkness. Switch to manual and set to infinity. Test with a sample shot and check sharpness.\n\n• **White balance: 3500–4000K** — Cool tone brings out aurora green best. Auto white balance also works, but manual gives more consistent results.\n\n• **File format: RAW** if possible — RAW files give significantly more flexibility in post-processing (brightness, colours, contrast).` },
      { title: "Lenses", content: `**Wide-angle (10–24 mm)** is ideal for aurora photography. It allows capturing a wide sky and foreground landscape in the same frame. f/2.8 or faster aperture is best — more light, shorter exposure time.\n\nPopular wide-angle lenses: Samyang/Rokinon 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Kit lens (18–55 mm f/3.5–5.6)** also works — at the widest end (18 mm) results are acceptable. Slower aperture means longer exposure or higher ISO, but decent images are still possible.\n\nFast primes (e.g., 24 mm f/1.4 or 35 mm f/1.8) are excellent for light gathering but focal length limits the field of view.` },
      { title: "Phone Photography", content: `Most modern phones have a Night Mode that activates automatically in darkness. Place the phone on a tripod, open the camera and let the phone choose a long exposure — typically 10–30 seconds in darkness. Keep the phone completely still during the entire exposure.\n\nMany phones also offer a Pro Mode where you can manually adjust ISO (800–3200) and shutter speed (10–30 seconds). Some phones also have a dedicated astrophotography mode that automatically stacks multiple frames.\n\n**Additional apps:** ProCamera, NightCap Camera or similar apps give more control over ISO, aperture and exposure settings.\n\n**Most important: keep the phone completely still.** Even slight vibration — touching the screen, a gust of wind — ruins the image during long exposure. Use a timer (2–10 second delay) so touching the phone doesn't cause vibration.` },
      { title: "Practical Tips for Cold Weather", content: `**Battery drains rapidly in cold.** Lithium-ion batteries lose capacity in frost — at −20°C a battery may drain 3x faster than at room temperature. Keep a spare battery warm in an inside pocket and swap when needed.\n\n**Condensation danger:** Don't bring cameras or phones directly from freezing temperatures into warm interiors. Warm moist air condenses on cold lenses and electronics, potentially causing damage. Let the camera warm up slowly — for example in a vestibule or inside the camera bag for 15–30 minutes before opening.\n\n**Gloves:** Wear thin liner gloves (touchscreen-compatible) for operating the camera, with thick mittens over them at other times. Frostbitten fingers are a real risk at −20°C.\n\n**Headlamp:** Use red light. Red light doesn't ruin night vision — white or blue light destroys 15 minutes of dark adaptation instantly.` },
      { title: "Composition — The Importance of Foreground", content: `Sky alone is monotonous — include a foreground. A foreground element gives scale, atmosphere and makes the image unique. Around Levi, natural foregrounds are everywhere:\n\n• **Cabin or building** — warm light from windows + aurora = classic Lapland image\n• **Fell silhouette** — the fell outline against the sky\n• **Single tree or tree group** — snow-laden trees are particularly beautiful\n• **Lake ice** — reflections and vastness\n• **Person** — silhouette or flashlight beam gives scale\n\nUse the rule of thirds: horizon in the lower third, sky and aurora in the upper two-thirds. Experiment with different angles and perspectives — a tree or person shot from low down looks dramatic against the aurora sky.` }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is a phone sufficient for aurora photography?", a: "Yes for basic level — modern phones photograph surprisingly well in night mode. But a tripod is still essential. A mirrorless/DSLR camera gives dramatically better results." },
        { q: "What's the most important setting?", a: "Tripod + long exposure. Without a stable tripod, no camera setting will help. Second most important is sufficiently high ISO (3200 is a good starting point) and the widest possible aperture." },
        { q: "How to prevent camera freezing?", a: "Keep a spare battery warm in an inside pocket. After shooting, don't bring the camera straight into warmth — let it acclimatise slowly in the camera bag or vestibule for 15–30 minutes." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "Where to See Aurora", desc: "Best spots in Levi", href: "/guide/where-to-see-northern-lights-levi" },
        { title: "Winter Clothing Guide", desc: "Dressing for Lapland frost", href: "/guide/how-to-dress-for-winter-in-levi-lapland" }
      ]
    }
  },
  nl: {
    meta: {
      title: "Noorderlichtfotografie in Levi — Camera-instellingen & tips | Leville.net",
      description: "Hoe fotografeer je het noorderlicht? Camera-instellingen, statief, ISO, sluitertijd en lenzen. Praktische gids voor Levi.",
      canonical: "https://leville.net/nl/gids/noorderlicht-fotografie-levi"
    },
    h1: "Noorderlichtfotografie in Levi — instellingen en tips",
    breadcrumbLabel: "Noorderlichtfotografie",
    sections: [
      { title: "Heb je een camera nodig of volstaat een telefoon?", content: `Een moderne telefoon fotografeert aurora verrassend goed in nachtmodus en vaak zelfs op automatische instellingen. Maar een systeemcamera geeft dramatisch betere resultaten — vooral voor het vastleggen van zwak noorderlicht.\n\n**Beide werken** — het belangrijkste is een statief. Zonder stabiele basis produceert geen van beide goede resultaten bij lange belichtingen.` },
      { title: "Essentieel: statief (tripod)", content: `Bij het fotograferen van noorderlicht zijn belichtingstijden lang — 5–25 seconden. De camera moet volledig stil staan. Uit de hand fotograferen is onmogelijk.\n\nZelfs een klein reisstatief werkt perfect. Het past in een koffer en weegt doorgaans minder dan een kilo. Prijs: €30–50 — de beste investering voor een aurora-vakantie.\n\n**Tip:** Een compact reisstatief past in je koffer en kost €30–50.` },
      { title: "Camera-instellingen (systeemcamera)", content: `Zet je camera op handmatige modus (M) en stel in:\n\n• **ISO: 1600–6400** — Begin op 3200 en pas aan. Hogere ISO = lichter beeld maar meer ruis.\n\n• **Diafragma: zo open mogelijk** — f/2.8 of sneller is ideaal.\n\n• **Sluitertijd: 8–25 seconden** — Korter als aurora snel beweegt, langer als aurora zwak is.\n\n• **Scherpstelling: handmatig, op oneindig (∞)** — Autofocus werkt niet in het donker.\n\n• **Witbalans: 3500–4000K** — Koele tint brengt het groen van aurora het beste naar voren.\n\n• **Bestandsformaat: RAW** indien mogelijk.` },
      { title: "Lenzen", content: `**Groothoek (10–24 mm)** is ideaal. Het maakt het mogelijk een brede hemel en voorgrondlandschap in hetzelfde beeld vast te leggen. f/2.8 of sneller is het beste.\n\nPopulaire groothoeklenzen: Samyang/Rokinon 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Kitlenz (18–55 mm f/3.5–5.6)** werkt ook — op de breedste stand (18 mm) zijn de resultaten acceptabel.` },
      { title: "Fotograferen met telefoon", content: `De meeste moderne telefoons hebben een nachtmodus die automatisch activeert in het donker. Zet de telefoon op een statief en laat de telefoon een lange belichting kiezen — doorgaans 10–30 seconden in het donker.\n\nVeel telefoons bieden ook een Pro-modus waarin je ISO (800–3200) en sluitertijd (10–30 seconden) handmatig kunt instellen. Sommige telefoons hebben ook een speciale astrofotografiemodus.\n\n**Belangrijkste: houd de telefoon volledig stil.** Gebruik een timer (2–10 seconden vertraging) zodat het aanraken van de telefoon geen trilling veroorzaakt.` },
      { title: "Praktische tips voor kou", content: `**Batterij loopt snel leeg in de kou.** Houd een reservebatterij warm in een binnenzak.\n\n**Condensatiegevaar:** Breng camera's niet direct van vriestemperaturen naar een warme ruimte. Laat de camera langzaam opwarmen in de cameratas gedurende 15–30 minuten.\n\n**Handschoenen:** Draag dunne binnenhandschoenen (touchscreen-compatibel) voor het bedienen van de camera.\n\n**Hoofdlamp:** Gebruik rood licht. Rood licht verpest je nachtzicht niet.` },
      { title: "Compositie — het belang van de voorgrond", content: `Alleen lucht is eentonig — neem een voorgrond mee. Een voorgrond geeft schaal en sfeer.\n\n• **Huisje of gebouw** — warm licht uit ramen + aurora = klassiek Lapland-beeld\n• **Fjäll-silhouet** — de omtrek tegen de hemel\n• **Enkele boom** — besneeuwde bomen zijn bijzonder mooi\n• **Meerijs** — weerspiegelingen en weidsheid\n• **Persoon** — silhouet geeft schaal\n\nGebruik de regel van derden: horizon in het onderste derde, lucht en aurora in de bovenste twee derde.` }
    ],
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Volstaat een telefoon voor noorderlichtfotografie?", a: "Ja voor basisniveau — moderne telefoons fotograferen verrassend goed in nachtmodus. Maar een statief is essentieel. Een systeemcamera geeft dramatisch betere resultaten." },
        { q: "Wat is de belangrijkste instelling?", a: "Statief + lange belichting. Zonder stabiel statief helpt geen enkele camera-instelling. Daarna is een voldoende hoge ISO (3200 is een goed startpunt) en het breedst mogelijke diafragma belangrijk." },
        { q: "Hoe voorkom ik dat mijn camera bevriest?", a: "Houd een reservebatterij warm in een binnenzak. Breng de camera na het fotograferen niet direct naar binnen — laat hem langzaam acclimatiseren in de cameratas gedurende 15–30 minuten." }
      ]
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
        { title: "Waar noorderlicht zien", desc: "Beste plekken in Levi", href: "/nl/gids/waar-noorderlicht-zien-levi" },
        { title: "Winterkleding", desc: "Kleden voor Laplandse kou", href: "/nl/gids/winterkleding-lapland" }
      ]
    }
  },
  sv: {
    meta: {
      title: "Norrskensfotografering i Levi — Kamerainställningar & tips | Leville.net",
      description: "Hur fotograferar man norrsken? Kamerainställningar, stativ, ISO, slutartid och objektiv. Praktisk guide för Levi.",
      canonical: "https://leville.net/sv/guide/norrsken-fotografering-levi"
    },
    h1: "Norrskensfotografering i Levi — inställningar och tips",
    breadcrumbLabel: "Norrskensfotografering",
    sections: [
      { title: "Behöver du en kamera eller räcker telefonen?", content: `En modern telefon fotograferar norrsken förvånansvärt bra i nattläge och ofta till och med på automatiska inställningar. Men en systemkamera ger dramatiskt bättre resultat.\n\n**Båda fungerar** — det viktigaste är ett stativ.` },
      { title: "Nödvändig utrustning: stativ", content: `Vid norrskensfotografering är exponeringstiderna långa — 5–25 sekunder. Kameran måste vara helt stilla. Att fotografera ur hand är omöjligt.\n\nÄven ett litet resestativ fungerar perfekt. Det kostar €30–50 — bästa investeringen för en norrskenssemester.` },
      { title: "Kamerainställningar (systemkamera)", content: `Ställ kameran i manuellt läge (M):\n\n• **ISO: 1600–6400** — Börja på 3200.\n\n• **Bländare: så öppen som möjligt** — f/2.8 eller snabbare.\n\n• **Slutartid: 8–25 sekunder**\n\n• **Fokus: manuell, på oändlighet (∞)**\n\n• **Vitbalans: 3500–4000K**\n\n• **Filformat: RAW** om möjligt.` },
      { title: "Objektiv", content: `**Vidvinkel (10–24 mm)** är idealiskt. f/2.8 eller snabbare bländare är bäst.\n\nPopulära vidvinkelobjektiv: Samyang 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Kit-objektiv (18–55 mm f/3.5–5.6)** fungerar också på den bredaste änden (18 mm).` },
      { title: "Fotografera med telefon", content: `De flesta moderna telefoner har ett nattläge som aktiveras automatiskt i mörker. Sätt telefonen på stativ och låt den välja en lång exponering — vanligtvis 10–30 sekunder.\n\nMånga telefoner har också ett Pro-läge där du kan justera ISO (800–3200) och slutartid manuellt. Vissa har även ett dedikerat astrofotograferingsläge.\n\n**Viktigast: håll telefonen helt stilla.** Använd timer (2–10 sekunders fördröjning).` },
      { title: "Praktiska tips i kylan", content: `**Batteriet tömms snabbt i kyla.** Ha ett reservbatteri varmt i en innerficka.\n\n**Kondensrisk:** Ta inte in kameran direkt i värmen. Låt den acklimatisera i kameraväskan i 15–30 minuter.\n\n**Handskar:** Använd tunna inre handskar (pekskärmskompatibla).\n\n**Pannlampa:** Använd rött ljus.` },
      { title: "Komposition — förgrunden är viktig", content: `Bara himmel blir enformigt — inkludera en förgrund.\n\n• **Stuga** — varmt ljus från fönster + norrsken = klassisk Lapplandsbild\n• **Fjällsiluett**\n• **Enskilt träd** — snöklädda träd är särskilt vackra\n• **Sjöis** — reflektioner\n• **Person** — siluett ger skala\n\nAnvänd tredjedelsregeln: horisont i nedre tredjedelen.` }
    ],
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Räcker en telefon för norrskensfotografering?", a: "Ja på grundnivå. Men stativ är fortfarande nödvändigt. En systemkamera ger dramatiskt bättre resultat." },
        { q: "Vilken är den viktigaste inställningen?", a: "Stativ + lång exponering. Utan stabilt stativ hjälper ingen kamerainställning." },
        { q: "Hur förhindrar jag att kameran fryser?", a: "Ha reservbatteri varmt i innerficka. Ta inte in kameran direkt i värmen — låt den acklimatisera i 15–30 minuter." }
      ]
    },
    readNext: {
      title: "Läs också",
      links: [
        { title: "Norrsken i Levi", desc: "Omfattande norrskensguide", href: "/sv/guide/norrsken-levi" },
        { title: "Var se norrsken", desc: "Bästa platserna i Levi", href: "/sv/guide/var-se-norrsken-levi" },
        { title: "Vinterkläder", desc: "Klä dig för Lapplands kyla", href: "/sv/guide/vinterklaeder-lappland" }
      ]
    }
  },
  de: {
    meta: {
      title: "Nordlichtfotografie in Levi — Kameraeinstellungen & Tipps | Leville.net",
      description: "Wie fotografiert man Nordlichter? Kameraeinstellungen, Stativ, ISO, Belichtungszeit und Objektive. Praktischer Guide für Levi.",
      canonical: "https://leville.net/de/ratgeber/nordlichter-fotografie-levi"
    },
    h1: "Nordlichtfotografie in Levi — Einstellungen und Tipps",
    breadcrumbLabel: "Nordlichtfotografie",
    sections: [
      { title: "Braucht man eine Kamera oder reicht das Handy?", content: `Ein modernes Handy fotografiert Nordlichter überraschend gut im Nachtmodus und oft sogar auf Automatik. Aber eine Systemkamera liefert dramatisch bessere Ergebnisse.\n\n**Beides funktioniert** — am wichtigsten ist ein Stativ.` },
      { title: "Unverzichtbar: Stativ", content: `Bei Nordlichtfotografie sind die Belichtungszeiten lang — 5–25 Sekunden. Die Kamera muss völlig still stehen. Aus der Hand fotografieren ist unmöglich.\n\nSelbst ein kleines Reisestativ funktioniert perfekt. Es kostet €30–50 — die beste Investition für einen Aurora-Urlaub.` },
      { title: "Kameraeinstellungen (Systemkamera)", content: `Stellen Sie die Kamera auf Manuell (M):\n\n• **ISO: 1600–6400** — Beginnen Sie mit 3200.\n\n• **Blende: so offen wie möglich** — f/2.8 oder schneller.\n\n• **Belichtungszeit: 8–25 Sekunden**\n\n• **Fokus: Manuell, auf Unendlich (∞)**\n\n• **Weißabgleich: 3500–4000K**\n\n• **Dateiformat: RAW** wenn möglich.` },
      { title: "Objektive", content: `**Weitwinkel (10–24 mm)** ist ideal. f/2.8 oder schneller.\n\nBeliebte Weitwinkelobjektive: Samyang 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Kit-Objektiv (18–55 mm f/3.5–5.6)** funktioniert auch am weitesten Ende (18 mm).` },
      { title: "Fotografieren mit dem Handy", content: `Die meisten modernen Handys haben einen Nachtmodus, der sich automatisch im Dunkeln aktiviert. Stellen Sie das Handy auf ein Stativ und lassen Sie es eine lange Belichtung wählen — typischerweise 10–30 Sekunden.\n\nViele Handys bieten auch einen Pro-Modus, in dem Sie ISO (800–3200) und Belichtungszeit manuell einstellen können. Einige haben auch einen speziellen Astrofotografie-Modus.\n\n**Am wichtigsten: Halten Sie das Handy völlig still.** Verwenden Sie einen Timer (2–10 Sekunden Verzögerung).` },
      { title: "Praktische Tipps bei Kälte", content: `**Akku entlädt sich schnell bei Kälte.** Halten Sie einen Ersatzakku warm in einer Innentasche.\n\n**Kondensationsgefahr:** Bringen Sie Kameras nicht direkt von Minusgraden in warme Innenräume. Lassen Sie die Kamera langsam in der Kameratasche akklimatisieren (15–30 Minuten).\n\n**Handschuhe:** Tragen Sie dünne Innenhandschuhe (touchscreen-kompatibel).\n\n**Stirnlampe:** Verwenden Sie rotes Licht.` },
      { title: "Komposition — die Bedeutung des Vordergrunds", content: `Nur Himmel ist monoton — fügen Sie einen Vordergrund hinzu.\n\n• **Hütte oder Gebäude** — warmes Licht + Nordlichter = klassisches Lappland-Bild\n• **Fjäll-Silhouette**\n• **Einzelner Baum** — schneebedeckte Bäume sind besonders schön\n• **Seeeis** — Spiegelungen\n• **Person** — Silhouette gibt Maßstab\n\nVerwenden Sie die Drittel-Regel: Horizont im unteren Drittel.` }
    ],
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Reicht ein Handy für Nordlichtfotografie?", a: "Ja auf Grundniveau. Aber ein Stativ ist unerlässlich. Eine Systemkamera liefert dramatisch bessere Ergebnisse." },
        { q: "Was ist die wichtigste Einstellung?", a: "Stativ + lange Belichtung. Ohne stabiles Stativ hilft keine Kameraeinstellung." },
        { q: "Wie verhindere ich das Einfrieren der Kamera?", a: "Ersatzakku warm in der Innentasche halten. Kamera nicht direkt ins Warme bringen — in der Kameratasche 15–30 Minuten akklimatisieren lassen." }
      ]
    },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Nordlichter in Levi", desc: "Umfassender Aurora-Guide", href: "/de/ratgeber/nordlichter-levi" },
        { title: "Wo Nordlichter sehen", desc: "Beste Plätze in Levi", href: "/de/ratgeber/wo-nordlichter-sehen-levi" },
        { title: "Winterkleidung", desc: "Richtig gekleidet für Lapplands Kälte", href: "/de/ratgeber/winterkleidung-lappland" }
      ]
    }
  },
  es: {
    meta: {
      title: "Fotografía de auroras boreales en Levi — Ajustes de cámara y consejos | Leville.net",
      description: "Cómo fotografiar auroras boreales: ajustes de cámara, trípode, ISO, velocidad de obturación y objetivos. Guía práctica para Levi.",
      canonical: "https://leville.net/es/guia/fotografia-auroras-boreales-levi"
    },
    h1: "Fotografía de auroras boreales en Levi — ajustes y consejos",
    breadcrumbLabel: "Fotografía de auroras",
    sections: [
      { title: "¿Necesitas una cámara o basta con el móvil?", content: `Un móvil moderno fotografía auroras sorprendentemente bien en modo nocturno y a menudo incluso en automático. Pero una cámara sin espejo da resultados dramáticamente mejores.\n\n**Ambos funcionan** — lo más importante es un trípode.` },
      { title: "Imprescindible: trípode", content: `Al fotografiar auroras, los tiempos de exposición son largos — 5–25 segundos. La cámara debe estar completamente inmóvil. Fotografiar a pulso es imposible.\n\nIncluso un pequeño trípode de viaje funciona perfectamente. Cuesta €30–50 — la mejor inversión para unas vacaciones de aurora.` },
      { title: "Ajustes de cámara (sin espejo/réflex)", content: `Pon la cámara en modo manual (M):\n\n• **ISO: 1600–6400** — Empieza en 3200.\n\n• **Apertura: lo más abierta posible** — f/2.8 o más rápido.\n\n• **Velocidad de obturación: 8–25 segundos**\n\n• **Enfoque: manual, al infinito (∞)**\n\n• **Balance de blancos: 3500–4000K**\n\n• **Formato: RAW** si es posible.` },
      { title: "Objetivos", content: `**Gran angular (10–24 mm)** es ideal. f/2.8 o más rápido.\n\nObjetivos populares: Samyang 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Objetivo kit (18–55 mm f/3.5–5.6)** también funciona en el extremo más ancho (18 mm).` },
      { title: "Fotografía con móvil", content: `La mayoría de los móviles modernos tienen un modo nocturno que se activa automáticamente en la oscuridad. Coloca el móvil en un trípode y deja que elija una exposición larga — normalmente 10–30 segundos.\n\nMuchos móviles también ofrecen un modo Pro donde puedes ajustar ISO (800–3200) y velocidad de obturación manualmente. Algunos tienen también un modo de astrofotografía dedicado.\n\n**Lo más importante: mantén el móvil completamente inmóvil.** Usa temporizador (2–10 segundos).` },
      { title: "Consejos prácticos para el frío", content: `**La batería se agota rápido con frío.** Lleva una batería de repuesto caliente en un bolsillo interior.\n\n**Peligro de condensación:** No lleves la cámara directamente del frío a un interior cálido. Déjala aclimatarse en la bolsa 15–30 minutos.\n\n**Guantes:** Usa guantes finos interiores (compatibles con pantalla táctil).\n\n**Linterna frontal:** Usa luz roja.` },
      { title: "Composición — la importancia del primer plano", content: `Solo cielo es monótono — incluye un primer plano.\n\n• **Cabaña** — luz cálida + aurora = imagen clásica de Laponia\n• **Silueta del fjäll**\n• **Árbol solitario** — los árboles nevados son especialmente bonitos\n• **Hielo del lago** — reflejos\n• **Persona** — silueta da escala\n\nUsa la regla de los tercios: horizonte en el tercio inferior.` }
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Basta un móvil para fotografiar auroras?", a: "Sí a nivel básico. Pero un trípode es esencial. Una cámara sin espejo da resultados dramáticamente mejores." },
        { q: "¿Cuál es el ajuste más importante?", a: "Trípode + exposición larga. Sin trípode estable, ningún ajuste de cámara ayuda." },
        { q: "¿Cómo evitar que la cámara se congele?", a: "Lleva batería de repuesto caliente en un bolsillo interior. No metas la cámara directamente en un sitio cálido — déjala aclimatarse 15–30 minutos." }
      ]
    },
    readNext: {
      title: "Lee también",
      links: [
        { title: "Auroras boreales en Levi", desc: "Guía completa de aurora", href: "/es/guia/auroras-boreales-levi" },
        { title: "Dónde ver auroras", desc: "Mejores lugares en Levi", href: "/es/guia/donde-ver-auroras-boreales-levi" },
        { title: "Ropa de invierno", desc: "Vestirse para el frío de Laponia", href: "/es/guia/ropa-invierno-laponia" }
      ]
    }
  },
  fr: {
    meta: {
      title: "Photographie d'aurores boréales à Levi — Réglages caméra & conseils | Leville.net",
      description: "Comment photographier les aurores boréales ? Réglages caméra, trépied, ISO, vitesse d'obturation et objectifs. Guide pratique pour Levi.",
      canonical: "https://leville.net/fr/guide/photographie-aurores-boreales-levi"
    },
    h1: "Photographie d'aurores boréales à Levi — réglages et conseils",
    breadcrumbLabel: "Photographie d'aurores",
    sections: [
      { title: "Faut-il un appareil photo ou un téléphone suffit-il ?", content: `Un téléphone moderne photographie les aurores étonnamment bien en mode nuit et souvent même en automatique. Mais un appareil photo hybride donne des résultats nettement meilleurs.\n\n**Les deux fonctionnent** — l'essentiel est un trépied.` },
      { title: "Indispensable : trépied", content: `Les temps d'exposition sont longs — 5–25 secondes. L'appareil doit être parfaitement immobile. Photographier à main levée est impossible.\n\nMême un petit trépied de voyage fonctionne parfaitement. Prix : 30–50 € — le meilleur investissement pour des vacances aurores.` },
      { title: "Réglages caméra (hybride/reflex)", content: `Mettez l'appareil en mode manuel (M) :\n\n• **ISO : 1600–6400** — Commencez à 3200.\n\n• **Ouverture : aussi grande que possible** — f/2.8 ou plus rapide.\n\n• **Vitesse d'obturation : 8–25 secondes**\n\n• **Mise au point : manuelle, sur l'infini (∞)**\n\n• **Balance des blancs : 3500–4000K**\n\n• **Format : RAW** si possible.` },
      { title: "Objectifs", content: `**Grand angle (10–24 mm)** est idéal. f/2.8 ou plus rapide.\n\nObjectifs populaires : Samyang 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Objectif kit (18–55 mm f/3.5–5.6)** fonctionne aussi au plus grand angle (18 mm).` },
      { title: "Photographier avec un téléphone", content: `La plupart des téléphones modernes ont un mode nuit qui s'active automatiquement dans l'obscurité. Placez le téléphone sur un trépied et laissez-le choisir une longue exposition — généralement 10–30 secondes.\n\nBeaucoup de téléphones offrent aussi un mode Pro pour régler manuellement l'ISO (800–3200) et la vitesse d'obturation. Certains disposent également d'un mode astrophotographie dédié.\n\n**Le plus important : gardez le téléphone parfaitement immobile.** Utilisez un minuteur (2–10 secondes).` },
      { title: "Conseils pratiques par temps froid", content: `**La batterie se vide rapidement par temps froid.** Gardez une batterie de rechange au chaud dans une poche intérieure.\n\n**Danger de condensation :** Ne rentrez pas l'appareil directement du froid dans un intérieur chaud. Laissez-le s'acclimater dans le sac photo 15–30 minutes.\n\n**Gants :** Portez des sous-gants fins (compatibles écran tactile).\n\n**Lampe frontale :** Utilisez la lumière rouge.` },
      { title: "Composition — l'importance du premier plan", content: `Le ciel seul est monotone — incluez un premier plan.\n\n• **Chalet** — lumière chaude + aurore = image classique de Laponie\n• **Silhouette du fjäll**\n• **Arbre isolé** — les arbres enneigés sont particulièrement beaux\n• **Glace du lac** — reflets\n• **Personne** — silhouette donne l'échelle\n\nUtilisez la règle des tiers : horizon dans le tiers inférieur.` }
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Un téléphone suffit-il pour photographier les aurores ?", a: "Oui au niveau de base. Mais un trépied reste indispensable. Un appareil hybride donne des résultats nettement meilleurs." },
        { q: "Quel est le réglage le plus important ?", a: "Trépied + longue exposition. Sans trépied stable, aucun réglage ne vous aidera." },
        { q: "Comment éviter le gel de l'appareil ?", a: "Gardez une batterie de rechange au chaud. Ne rentrez pas l'appareil directement — laissez-le s'acclimater dans le sac 15–30 minutes." }
      ]
    },
    readNext: {
      title: "À lire aussi",
      links: [
        { title: "Aurores boréales à Levi", desc: "Guide complet des aurores", href: "/fr/guide/aurores-boreales-levi" },
        { title: "Où voir les aurores", desc: "Meilleurs endroits à Levi", href: "/fr/guide/ou-voir-aurores-boreales-levi" },
        { title: "Vêtements d'hiver", desc: "S'habiller pour le froid lapon", href: "/fr/guide/vetements-hiver-laponie" }
      ]
    }
  }
};

const NorthernLightsPhotographyLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/revontulien-valokuvaus-levi", en: "/guide/northern-lights-photography-levi" };
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
        <meta property="og:image:alt" content={lang === "fi" ? "Revontulien valokuvaus Levillä" : "Northern Lights Photography in Levi"} />
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
                  {lang === "fi" ? "Majoitu Levillä ja kuvaa revontulia omalta terassilta." : "Stay in Levi and photograph aurora from your own terrace."}
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

export default NorthernLightsPhotographyLevi;
