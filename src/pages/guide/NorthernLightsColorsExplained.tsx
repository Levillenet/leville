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
      title: "Revontulien värit — Miksi vihreä, punainen, violetti ja sininen? | Leville.net",
      description: "Miksi revontulet ovat eri värisiä? Selitys vihreän, punaisen, violetin ja sinisen värin syistä: ilmakehän kaasut ja korkeus.",
      canonical: "https://leville.net/opas/revontulien-varit"
    },
    h1: "Revontulien värit — mistä ne johtuvat?",
    breadcrumbLabel: "Revontulien värit",
    sections: [
      {
        title: "Värien lyhyt selitys",
        content: `Revontulien väri riippuu kahdesta tekijästä: **mikä kaasu** (happi vai typpi) ja **millä korkeudella** törmäys tapahtuu. Eri kaasut ja korkeudet tuottavat eri aallonpituuksia valoa — ja eri aallonpituudet näkyvät meille eri väreinä.

Tämä on sama fysiikan periaate kuin neonvaloissa: eri kaasut (neon, argon, helium) hehkuvat eri väreinä kun niiden läpi johdetaan sähköä. Revontulissa "sähkö" on aurinkotuulen elektroneja ja "kaasu" on ilmakehän happi ja typpi.`
      },
      {
        title: "Vihreä — yleisin väri",
        content: `Vihreä aurora syntyy kun aurinkotuulen elektronit törmäävät **happiatomeihin** noin 100–200 kilometrin korkeudessa. Happiatomi virittyy törmäyksessä ja vapauttaa energian vihreänä valona aallonpituudella 557,7 nanometriä.

Tämä on revontulien yleisin väri kahdesta syystä: happi on yleinen tällä korkeudella ilmakehässä, ja viritystila purkautuu nopeasti (noin 0,7 sekunnissa). Nopeampi purkautuminen tarkoittaa tehokkaampaa valontuotantoa.

Vihreä on myös väri johon ihmissilmä on herkimmillään — joten se erottuu hyvin pimeää taivasta vasten. Vihreää auroraa näkee käytännössä aina kun revontulia on näkyvissä.`
      },
      {
        title: "Punainen — harvinaisempi ja korkeammalla",
        content: `Punainen aurora syntyy myös hapesta, mutta **korkeammalla** — tyypillisesti 200–300 km korkeudessa. Tällä korkeudella ilmakehä on niin ohutta, että happiatomi virittyy eri tavalla. Viritystilan purkautuminen kestää huomattavasti kauemmin (noin 110 sekuntia) ja vapauttaa energian punaisena valona aallonpituudella 630 nanometriä.

Punaista auroraa näkee harvemmin koska:
• Se vaatii voimakkaampaa aurinkotuulta (enemmän energiaa)
• Pitkä purkautumisaika tarkoittaa, että törmäykset muiden atomien kanssa voivat "varastaa" energian ennen kuin valo vapautuu
• Punainen valo on ihmissilmälle vaikeampi erottaa pimeässä

Erittäin vahvoilla myrskyillä (Kp 5+) punainen aurora voi kuitenkin olla näyttävää — koko taivaan yläosa hehkuu syvän punaisena vihreän verhon yläpuolella. Tämä on yksi revontulien hienoimmista näyistä.`
      },
      {
        title: "Violetti ja sininen — typpi",
        content: `Violetti ja sininen aurora syntyvät kun elektronit törmäävät **typpimolekyyleihin** (N₂) ja typpiatomeihin (N). Typpi tuottaa violettia ja sinistä valoa aallonpituuksilla 391–470 nanometriä.

Nämä värit näkyvät usein aurora-verhon alareunassa — siellä missä revontulien energia on voimakkainta ja elektronit tunkeutuvat syvemmälle ilmakehään. Violetti ja sininen ovat yleisempiä voimakkaiden myrskyjen aikana.

Violetti on usein yhdistelmä punaisesta ja sinisestä valosta — silmä tulkitsee tämän yhdistelmän violettina. Puhdas sininen aurora on harvinaisempi ja vaatii erittäin energisiä elektroneja.`
      },
      {
        title: "Valkoinen ja vaaleanpunainen",
        content: `Joskus revontulet näyttävät valkoisilta tai vaaleanpunaisilta silmälle. Tämä johtuu yleensä kahdesta syystä:

**Valkoinen aurora** on usein yhdistelmä useista väreistä (vihreä + punainen + violetti) jotka silmä ei erota erikseen hämärässä. Ihmissilmän värinäkö heikkenee merkittävästi hämärässä — siksi heikko monivärinen aurora näyttää harmaalta tai valkoiselta. Kamera pitkällä valotuksella paljastaa todelliset värit.

**Vaaleanpunainen** syntyy typen ja hapen yhdistelmästä — erityisesti aurora-verhon alareunassa missä typen sininen/violetti sekoittuu hapen vihreään/punaiseen. Vaaleanpunainen on usein merkki voimakkaasta aurorasta jossa elektronit tunkeutuvat syvälle ilmakehään.`
      },
      {
        title: "Miksi silmä näkee eri tavalla kuin kamera?",
        content: `Tämä on yksi yleisimmistä kysymyksistä. Vastaus liittyy ihmissilmän rakenteeseen:

Silmässä on kahdenlaisia valoreseptoreita: **tappisolueja** (värinäkö, toimivat kirkkaassa valossa) ja **sauvasolueja** (hämäränäkö, ei erottele värejä). Hämärässä silmä käyttää pääasiassa sauvasoluja — siksi heikot revontulet näyttävät harmaalta tai vaaleanvihreältä vaikka ne olisivat kirkkaan vihreitä tai monivärisiä.

Kamera sen sijaan kerää valoa pitkällä valotuksella (10–25 sekuntia) ja käyttää koko kennonsa värisuodatinta. Se "näkee" kaiken valon joka osuu kennolle valotuksen aikana — ja paljastaa kirkkaat vihreät, punaiset ja violetit.

**Tämä ei tarkoita että kamera valehtelee.** Se kerää vain enemmän valoa ja erottelee värit tehokkaammin. Voimakkailla myrskyillä (Kp 5+) värit näkyvät selvästi myös paljain silmin — vihreä, punainen ja violetti erottuvat kirkkaina ilman kameraa.`
      },
      {
        title: "Värien ennustaminen",
        content: `Voit ennustaa revontulien värejä osittain Kp-indeksin perusteella:

• **Kp 2–3:** Todennäköisesti vihreää — heikko tai keskivahva vihreä kaari pohjoisella taivaalla
• **Kp 4–5:** Vihreää + mahdollisesti violettia — vahvempi näytös, useita värejä alkaa erottua
• **Kp 5–6:** Vihreää, violettia + punaista — monivärinen näytös, värit erottuvat paljaalle silmälle
• **Kp 7+:** Koko spektri — vihreä, punainen, violetti, sininen, vaaleanpunainen. Geomagneettinen myrsky, spektakulaarinen kokemus

Muista: värit riippuvat myös aurinkotuulen hiukkasten energiasta ja magneettikentän paikallisesta rakenteesta. Kp-indeksi antaa suuntaa, mutta yllätyksiä tapahtuu — joskus Kp 3:lla näkee upeita värejä, joskus Kp 5:llä pelkkää vihreää.`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Miksi revontulet ovat useimmiten vihreitä?", a: "Vihreä väri syntyy hapesta 100–200 km korkeudessa. Se on yleisin koska happi on yleinen tällä korkeudella, reaktio on nopea, ja ihmissilmä on herkkä vihreälle valolle." },
        { q: "Miksi kamera näkee paremmin kuin silmä?", a: "Kamera kerää valoa pitkällä valotuksella (10–25 s) kun silmä prosessoi kuvan jatkuvasti. Lisäksi silmän värinäkö heikkenee hämärässä. Siksi kameran kuvat ovat värikkäämpiä kuin silmän näkemä — molemmat ovat 'oikeita'." },
        { q: "Voiko väriä ennustaa etukäteen?", a: "Osittain — vihreää näkee aina kun aurora on näkyvissä. Punaista ja violettia vain vahvoilla myrskyillä (Kp 5+). Tarkista Kp-ennuste ja valmistaudu yllätyksiin." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava revontuliopas", href: "/revontulet" },
        { title: "Miten revontulet syntyvät", desc: "Tieteellinen selitys", href: "/opas/miten-revontulet-syntyvat" },
        { title: "Majoitukset", desc: "Varaa majoitus Levillä", href: "/majoitukset" }
      ]
    }
  },
  en: {
    meta: {
      title: "Northern Lights Colors Explained — Why Green, Red, Purple & Blue? | Leville.net",
      description: "Why do northern lights appear in different colors? Explanation of green, red, purple and blue: atmospheric gases and altitude.",
      canonical: "https://leville.net/guide/northern-lights-colors-explained"
    },
    h1: "Northern Lights Colors — What Causes Them?",
    breadcrumbLabel: "Aurora Colors",
    sections: [
      { title: "Colors in Brief", content: `The colour of the northern lights depends on two factors: **which gas** (oxygen or nitrogen) and **at what altitude** the collision occurs. Different gases and altitudes produce different wavelengths of light — and different wavelengths appear to us as different colours.\n\nThis is the same physics principle as neon lights: different gases (neon, argon, helium) glow different colours when electricity passes through them. In aurora, the "electricity" is solar wind electrons and the "gas" is atmospheric oxygen and nitrogen.` },
      { title: "Green — The Most Common Color", content: `Green aurora forms when solar wind electrons collide with **oxygen atoms** at approximately 100–200 kilometres altitude. The oxygen atom becomes excited and releases energy as green light at a wavelength of 557.7 nanometres.\n\nThis is the most common aurora colour for two reasons: oxygen is abundant at this altitude, and the excited state releases quickly (about 0.7 seconds). Faster release means more efficient light production.\n\nGreen is also the colour the human eye is most sensitive to — so it stands out well against a dark sky. Green aurora is visible practically whenever northern lights are present.` },
      { title: "Red — Rarer and Higher Up", content: `Red aurora also comes from oxygen, but at **higher altitude** — typically 200–300 km. At this height, the atmosphere is so thin that the oxygen atom excites differently. The excited state takes much longer to release (about 110 seconds) and emits energy as red light at 630 nanometres.\n\nRed aurora is seen less frequently because:\n• It requires stronger solar wind (more energy)\n• The long release time means collisions with other atoms can "steal" the energy before light is emitted\n• Red light is harder for the human eye to detect in darkness\n\nDuring very strong storms (KP 5+), however, red aurora can be spectacular — the entire upper sky glows deep red above the green curtain. This is one of aurora's finest sights.` },
      { title: "Purple and Blue — Nitrogen", content: `Purple and blue aurora form when electrons collide with **nitrogen molecules** (N₂) and nitrogen atoms (N). Nitrogen produces purple and blue light at wavelengths 391–470 nanometres.\n\nThese colours are often visible at the lower edge of aurora curtains — where aurora energy is strongest and electrons penetrate deeper into the atmosphere. Purple and blue are more common during strong storms.\n\nPurple is often a combination of red and blue light — the eye interprets this mix as purple. Pure blue aurora is rarer and requires very energetic electrons.` },
      { title: "White and Pink", content: `Sometimes aurora appears white or pink to the naked eye. This is usually due to two reasons:\n\n**White aurora** is often a combination of multiple colours (green + red + purple) that the eye can't distinguish separately in dim conditions. The human eye's colour vision weakens significantly in low light — so faint multi-coloured aurora appears grey or white. A camera with long exposure reveals the true colours.\n\n**Pink** results from a nitrogen and oxygen combination — especially at the lower edge of aurora curtains where nitrogen's blue/purple mixes with oxygen's green/red. Pink is often a sign of strong aurora where electrons penetrate deep into the atmosphere.` },
      { title: "Why Does the Camera See Differently Than the Eye?", content: `This is one of the most common questions. The answer relates to human eye structure:\n\nThe eye has two types of photoreceptors: **cone cells** (colour vision, work in bright light) and **rod cells** (dim light vision, don't distinguish colours). In darkness, the eye primarily uses rod cells — so faint aurora appears grey or pale green even though it may be bright green or multi-coloured.\n\nA camera, however, collects light during a long exposure (10–25 seconds) and uses its sensor's entire colour filter array. It "sees" all light hitting the sensor during exposure — revealing bright greens, reds, and purples.\n\n**This doesn't mean the camera lies.** It simply collects more light and separates colours more efficiently. During strong storms (KP 5+), colours are clearly visible to the naked eye too — green, red, and purple stand out brightly without a camera.` },
      { title: "Predicting Colors", content: `You can partially predict aurora colours based on the KP index:\n\n• **KP 2–3:** Likely green — faint or moderate green arc on the northern sky\n• **KP 4–5:** Green + possibly purple — stronger display, multiple colours begin to appear\n• **KP 5–6:** Green, purple + red — multi-coloured display, colours visible to the naked eye\n• **KP 7+:** Full spectrum — green, red, purple, blue, pink. Geomagnetic storm, spectacular experience\n\nRemember: colours also depend on solar wind particle energy and the local structure of the magnetic field. The KP index gives guidance, but surprises happen — sometimes KP 3 shows stunning colours, sometimes KP 5 produces only green.` }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Why are northern lights usually green?", a: "Green colour comes from oxygen at 100–200 km altitude. It's the most common because oxygen is abundant at that height, the reaction is fast, and the human eye is most sensitive to green light." },
        { q: "Why does the camera see better than the eye?", a: "The camera collects light over a long exposure (10–25s) while the eye processes continuously. Also, the eye's colour vision weakens in darkness. So camera images are more colourful than what the eye sees — both are 'correct'." },
        { q: "Can you predict the colour in advance?", a: "Partially — green is always present when aurora is visible. Red and purple appear only during strong storms (KP 5+). Check the KP forecast and prepare for surprises." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "How Aurora Forms", desc: "Scientific explanation", href: "/guide/how-northern-lights-form" },
        { title: "Accommodation", desc: "Book accommodation in Levi", href: "/en/accommodations" }
      ]
    }
  },
  nl: {
    meta: {
      title: "Kleuren van het noorderlicht — Waarom groen, rood, paars en blauw? | Leville.net",
      description: "Waarom heeft het noorderlicht verschillende kleuren? Uitleg over groen, rood, paars en blauw: atmosferische gassen en hoogte.",
      canonical: "https://leville.net/nl/gids/kleuren-van-noorderlicht"
    },
    h1: "Kleuren van het noorderlicht — waardoor ontstaan ze?",
    breadcrumbLabel: "Kleuren noorderlicht",
    sections: [
      { title: "Kleuren in het kort", content: `De kleur van het noorderlicht hangt af van twee factoren: **welk gas** (zuurstof of stikstof) en **op welke hoogte** de botsing plaatsvindt. Verschillende gassen en hoogtes produceren verschillende golflengtes van licht — en verschillende golflengtes verschijnen als verschillende kleuren.\n\nDit is hetzelfde natuurkundige principe als bij neonlichten: verschillende gassen (neon, argon, helium) gloeien in verschillende kleuren wanneer er elektriciteit doorheen gaat. Bij het noorderlicht is de "elektriciteit" zonnewindelektronen en het "gas" is atmosferische zuurstof en stikstof.` },
      { title: "Groen — de meest voorkomende kleur", content: `Groen noorderlicht ontstaat wanneer zonnewindelektronen botsen met **zuurstofatomen** op ongeveer 100–200 kilometer hoogte. Het zuurstofatoom raakt aangeslagen en geeft energie af als groen licht met een golflengte van 557,7 nanometer.\n\nDit is de meest voorkomende kleur om twee redenen: zuurstof is overvloedig op deze hoogte, en de aangeslagen toestand herstelt snel (ongeveer 0,7 seconde). Sneller herstel betekent efficiëntere lichtproductie.\n\nGroen is ook de kleur waarvoor het menselijk oog het gevoeligst is — dus het valt goed op tegen een donkere hemel. Groen noorderlicht is zichtbaar wanneer er aurora aanwezig is.` },
      { title: "Rood — zeldzamer en hoger", content: `Rood noorderlicht komt ook van zuurstof, maar op **grotere hoogte** — typisch 200–300 km. Op deze hoogte is de atmosfeer zo dun dat het zuurstofatoom anders wordt aangeslagen. Het herstel duurt veel langer (ongeveer 110 seconden) en geeft energie af als rood licht op 630 nanometer.\n\nRood noorderlicht wordt minder vaak gezien omdat:\n• Het sterkere zonnewind vereist (meer energie)\n• De lange hersteltijd betekent dat botsingen met andere atomen de energie kunnen "stelen"\n• Rood licht is moeilijker te detecteren voor het menselijk oog in het donker\n\nTijdens zeer sterke stormen (KP 5+) kan rood noorderlicht echter spectaculair zijn — de hele bovenhemel gloeit dieprood boven het groene gordijn.` },
      { title: "Paars en blauw — stikstof", content: `Paars en blauw noorderlicht ontstaat wanneer elektronen botsen met **stikstofmoleculen** (N₂) en stikstofatomen (N). Stikstof produceert paars en blauw licht op golflengtes van 391–470 nanometer.\n\nDeze kleuren zijn vaak zichtbaar aan de onderrand van het noorderlichtgordijn — daar waar de energie het sterkst is en elektronen dieper doordringen in de atmosfeer. Paars en blauw komen vaker voor tijdens sterke stormen.\n\nPaars is vaak een combinatie van rood en blauw licht — het oog interpreteert deze mix als paars. Zuiver blauw noorderlicht is zeldzamer en vereist zeer energetische elektronen.` },
      { title: "Wit en roze", content: `Soms lijkt het noorderlicht wit of roze voor het blote oog. Dit komt meestal door twee redenen:\n\n**Wit noorderlicht** is vaak een combinatie van meerdere kleuren (groen + rood + paars) die het oog niet afzonderlijk kan onderscheiden in schemerlicht. Het kleurenzicht van het menselijk oog verzwakt aanzienlijk bij weinig licht — dus zwak meerkleurig noorderlicht lijkt grijs of wit. Een camera met lange belichting onthult de ware kleuren.\n\n**Roze** ontstaat uit een combinatie van stikstof en zuurstof — vooral aan de onderrand van het gordijn waar het blauw/paars van stikstof mengt met het groen/rood van zuurstof.` },
      { title: "Waarom ziet de camera anders dan het oog?", content: `Dit is een van de meest gestelde vragen. Het antwoord heeft te maken met de structuur van het menselijk oog:\n\nHet oog heeft twee soorten fotoreceptoren: **kegeltjes** (kleurenzicht, werken bij helder licht) en **staafjes** (schemeringszicht, onderscheiden geen kleuren). In het donker gebruikt het oog voornamelijk staafjes — dus zwak noorderlicht lijkt grijs of bleekgroen.\n\nEen camera verzamelt daarentegen licht tijdens een lange belichting (10–25 seconden) en gebruikt het volledige kleurfilter van de sensor. De camera "ziet" al het licht dat op de sensor valt — en onthult heldere groenen, roden en paarsen.\n\n**Dit betekent niet dat de camera liegt.** Hij verzamelt simpelweg meer licht. Tijdens sterke stormen (KP 5+) zijn kleuren ook met het blote oog duidelijk zichtbaar.` },
      { title: "Kleuren voorspellen", content: `Je kunt de kleuren van het noorderlicht gedeeltelijk voorspellen op basis van de KP-index:\n\n• **KP 2–3:** Waarschijnlijk groen — zwakke of matige groene boog\n• **KP 4–5:** Groen + mogelijk paars — sterkere vertoning, meerdere kleuren\n• **KP 5–6:** Groen, paars + rood — meerkleurige vertoning, zichtbaar met het blote oog\n• **KP 7+:** Volledig spectrum — groen, rood, paars, blauw, roze. Geomagnetische storm\n\nOnthoud: kleuren hangen ook af van de energie van zonnewinddeeltjes en de lokale structuur van het magnetisch veld.` }
    ],
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Waarom is het noorderlicht meestal groen?", a: "Groene kleur komt van zuurstof op 100–200 km hoogte. Het is het meest voorkomend omdat zuurstof overvloedig is, de reactie snel verloopt en het menselijk oog het gevoeligst is voor groen licht." },
        { q: "Waarom ziet de camera beter dan het oog?", a: "De camera verzamelt licht over een lange belichting (10–25s) terwijl het oog continu verwerkt. Bovendien verzwakt het kleurenzicht in het donker. Camerafoto's zijn kleurrijker — beide zijn 'correct'." },
        { q: "Kun je de kleur van tevoren voorspellen?", a: "Gedeeltelijk — groen is altijd aanwezig als er aurora is. Rood en paars verschijnen alleen tijdens sterke stormen (KP 5+). Controleer de KP-voorspelling." }
      ]
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
        { title: "Hoe ontstaat noorderlicht", desc: "Wetenschappelijke uitleg", href: "/nl/gids/hoe-ontstaat-noorderlicht" },
        { title: "Accommodatie", desc: "Boek accommodatie in Levi", href: "/nl/accommodatie" }
      ]
    }
  },
  sv: {
    meta: {
      title: "Norrskensf\u00e4rger — Varf\u00f6r gr\u00f6nt, r\u00f6tt, lila och bl\u00e5tt? | Leville.net",
      description: "Varf\u00f6r har norrskenet olika f\u00e4rger? F\u00f6rklaring av gr\u00f6nt, r\u00f6tt, lila och bl\u00e5tt: atmosf\u00e4riska gaser och h\u00f6jd.",
      canonical: "https://leville.net/sv/guide/norrskens-farger"
    },
    h1: "Norrskensf\u00e4rger — vad orsakar dem?",
    breadcrumbLabel: "Norrskensf\u00e4rger",
    sections: [
      { title: "F\u00e4rger i korthet", content: `Norrskenetss f\u00e4rg beror p\u00e5 tv\u00e5 faktorer: **vilken gas** (syre eller kv\u00e4ve) och **p\u00e5 vilken h\u00f6jd** kollisionen sker. Olika gaser och h\u00f6jder producerar olika v\u00e5gl\u00e4ngder av ljus — och olika v\u00e5gl\u00e4ngder framtr\u00e4der som olika f\u00e4rger.\n\nDetta \u00e4r samma fysikaliska princip som neonljus: olika gaser (neon, argon, helium) lyser i olika f\u00e4rger n\u00e4r elektricitet passerar genom dem.` },
      { title: "Gr\u00f6nt — den vanligaste f\u00e4rgen", content: `Gr\u00f6nt norrsken uppst\u00e5r n\u00e4r solvindselektroner kolliderar med **syreatomer** p\u00e5 cirka 100–200 kilometers h\u00f6jd. Syreatomen exciteras och avger energi som gr\u00f6nt ljus vid en v\u00e5gl\u00e4ngd av 557,7 nanometer.\n\nDetta \u00e4r den vanligaste f\u00e4rgen av tv\u00e5 sk\u00e4l: syre \u00e4r rikligt p\u00e5 denna h\u00f6jd och det exciterade tillst\u00e5ndet \u00e5terst\u00e4lls snabbt (cirka 0,7 sekunder).\n\nGr\u00f6nt \u00e4r ocks\u00e5 den f\u00e4rg som det m\u00e4nskliga \u00f6gat \u00e4r mest k\u00e4nsligt f\u00f6r — s\u00e5 det syns bra mot en m\u00f6rk himmel.` },
      { title: "R\u00f6tt — s\u00e4llsyntare och h\u00f6gre upp", content: `R\u00f6tt norrsken kommer ocks\u00e5 fr\u00e5n syre, men p\u00e5 **st\u00f6rre h\u00f6jd** — typiskt 200–300 km. P\u00e5 denna h\u00f6jd \u00e4r atmosf\u00e4ren s\u00e5 tunn att syreatomen exciteras annorlunda. \u00c5terst\u00e4llningen tar mycket l\u00e4ngre (cirka 110 sekunder) och avger energi som r\u00f6tt ljus vid 630 nanometer.\n\nR\u00f6tt norrsken ses mindre ofta eftersom det kr\u00e4ver starkare solvind. Under mycket starka stormar (KP 5+) kan r\u00f6tt norrsken dock vara spektakul\u00e4rt.` },
      { title: "Lila och bl\u00e5tt — kv\u00e4ve", content: `Lila och bl\u00e5tt norrsken uppst\u00e5r n\u00e4r elektroner kolliderar med **kv\u00e4vemolekyler** (N\u2082) och kv\u00e4veatomer (N). Kv\u00e4ve producerar lila och bl\u00e5tt ljus vid v\u00e5gl\u00e4ngder 391–470 nanometer.\n\nDessa f\u00e4rger syns ofta vid norrskensgardinens nedre kant. Lila \u00e4r ofta en kombination av r\u00f6tt och bl\u00e5tt ljus. Rent bl\u00e5tt norrsken \u00e4r s\u00e4llsynt.` },
      { title: "Vitt och rosa", content: `Ibland verkar norrskenet vitt eller rosa. **Vitt norrsken** \u00e4r ofta en kombination av flera f\u00e4rger som \u00f6gat inte kan s\u00e4rskilja i m\u00f6rker. En kamera med l\u00e5ng exponering avsl\u00f6jar de sanna f\u00e4rgerna.\n\n**Rosa** uppst\u00e5r fr\u00e5n en kombination av kv\u00e4ve och syre — s\u00e4rskilt vid norrskensgardinens nedre kant.` },
      { title: "Varf\u00f6r ser kameran annorlunda \u00e4n \u00f6gat?", content: `\u00d6gat har tv\u00e5 typer av fotoreceptorer: **tappar** (f\u00e4rgseende, fungerar i starkt ljus) och **stavar** (m\u00f6rkerseende, skiljer inte f\u00e4rger). I m\u00f6rker anv\u00e4nder \u00f6gat fr\u00e4mst stavar — d\u00e4rf\u00f6r verkar svagt norrsken gr\u00e5tt.\n\nEn kamera samlar ljus under en l\u00e5ng exponering (10–25 sekunder). Under starka stormar (KP 5+) \u00e4r f\u00e4rgerna tydligt synliga \u00e4ven f\u00f6r blotta \u00f6gat.` },
      { title: "F\u00f6ruts\u00e4ga f\u00e4rger", content: `Du kan delvis f\u00f6ruts\u00e4ga norrskensf\u00e4rger baserat p\u00e5 KP-index:\n\n• **KP 2–3:** Troligen gr\u00f6nt\n• **KP 4–5:** Gr\u00f6nt + m\u00f6jligen lila\n• **KP 5–6:** Gr\u00f6nt, lila + r\u00f6tt — flerf\u00e4rgad uppvisning\n• **KP 7+:** Hela spektrumet — gr\u00f6nt, r\u00f6tt, lila, bl\u00e5tt, rosa` }
    ],
    faq: {
      title: "Vanliga fr\u00e5gor",
      items: [
        { q: "Varf\u00f6r \u00e4r norrskenet oftast gr\u00f6nt?", a: "Gr\u00f6n f\u00e4rg kommer fr\u00e5n syre p\u00e5 100–200 km h\u00f6jd. Det \u00e4r vanligast eftersom syre \u00e4r rikligt, reaktionen \u00e4r snabb och \u00f6gat \u00e4r k\u00e4nsligast f\u00f6r gr\u00f6nt ljus." },
        { q: "Varf\u00f6r ser kameran b\u00e4ttre \u00e4n \u00f6gat?", a: "Kameran samlar ljus \u00f6ver en l\u00e5ng exponering medan \u00f6gat bearbetar kontinuerligt. Dessutom f\u00f6rsvagar \u00f6gats f\u00e4rgseende i m\u00f6rker." },
        { q: "Kan man f\u00f6ruts\u00e4ga f\u00e4rgen?", a: "Delvis — gr\u00f6nt finns alltid n\u00e4r aurora \u00e4r synlig. R\u00f6tt och lila visas bara under starka stormar (KP 5+)." }
      ]
    },
    readNext: {
      title: "L\u00e4s ocks\u00e5",
      links: [
        { title: "Norrsken i Levi", desc: "Utf\u00f6rlig aurora-guide", href: "/en/northern-lights" },
        { title: "Hur uppst\u00e5r norrsken", desc: "Vetenskaplig f\u00f6rklaring", href: "/sv/guide/hur-uppstar-norrsken" },
        { title: "Boende", desc: "Boka boende i Levi", href: "/en/accommodations" }
      ]
    }
  },
  de: {
    meta: {
      title: "Farben der Nordlichter — Warum gr\u00fcn, rot, lila und blau? | Leville.net",
      description: "Warum haben Nordlichter verschiedene Farben? Erkl\u00e4rung von Gr\u00fcn, Rot, Lila und Blau: atmosph\u00e4rische Gase und H\u00f6he.",
      canonical: "https://leville.net/de/ratgeber/farben-der-nordlichter"
    },
    h1: "Farben der Nordlichter — was verursacht sie?",
    breadcrumbLabel: "Nordlichtfarben",
    sections: [
      { title: "Farben kurz erkl\u00e4rt", content: `Die Farbe der Nordlichter h\u00e4ngt von zwei Faktoren ab: **welches Gas** (Sauerstoff oder Stickstoff) und **in welcher H\u00f6he** die Kollision stattfindet. Verschiedene Gase und H\u00f6hen erzeugen verschiedene Wellenl\u00e4ngen des Lichts — und verschiedene Wellenl\u00e4ngen erscheinen als verschiedene Farben.\n\nDies ist dasselbe physikalische Prinzip wie bei Neonlichtern: verschiedene Gase leuchten in verschiedenen Farben, wenn Elektrizit\u00e4t durch sie flie\u00dft.` },
      { title: "Gr\u00fcn — die h\u00e4ufigste Farbe", content: `Gr\u00fcne Aurora entsteht, wenn Sonnenwindelektronen mit **Sauerstoffatomen** in etwa 100–200 Kilometer H\u00f6he kollidieren. Das Sauerstoffatom wird angeregt und gibt Energie als gr\u00fcnes Licht bei einer Wellenl\u00e4nge von 557,7 Nanometern ab.\n\nGr\u00fcn ist auch die Farbe, f\u00fcr die das menschliche Auge am empfindlichsten ist — es f\u00e4llt gut gegen einen dunklen Himmel auf.` },
      { title: "Rot — seltener und h\u00f6her", content: `Rote Aurora kommt ebenfalls von Sauerstoff, aber in **gr\u00f6\u00dferer H\u00f6he** — typisch 200–300 km. Die R\u00fcckkehr zum Normalzustand dauert viel l\u00e4nger (etwa 110 Sekunden) und gibt Energie als rotes Licht bei 630 Nanometern ab.\n\nBei sehr starken St\u00fcrmen (KP 5+) kann rote Aurora jedoch spektakul\u00e4r sein — der gesamte obere Himmel gl\u00fcht tiefrot \u00fcber dem gr\u00fcnen Vorhang.` },
      { title: "Lila und Blau — Stickstoff", content: `Lila und blaue Aurora entstehen, wenn Elektronen mit **Stickstoffmolek\u00fclen** (N\u2082) und Stickstoffatomen (N) kollidieren. Diese Farben sind oft am unteren Rand der Aurora-Vorh\u00e4nge sichtbar.\n\nLila ist oft eine Kombination aus rotem und blauem Licht. Reines blaues Nordlicht ist selten.` },
      { title: "Wei\u00df und Rosa", content: `Manchmal erscheint Aurora wei\u00df oder rosa. **Wei\u00dfe Aurora** ist oft eine Kombination mehrerer Farben, die das Auge im Dunkeln nicht einzeln unterscheiden kann. Eine Kamera mit Langzeitbelichtung enth\u00fcllt die wahren Farben.\n\n**Rosa** entsteht aus einer Kombination von Stickstoff und Sauerstoff — besonders am unteren Rand des Aurora-Vorhangs.` },
      { title: "Warum sieht die Kamera anders als das Auge?", content: `Das Auge hat zwei Arten von Fotorezeptoren: **Zapfen** (Farbsehen, funktionieren bei hellem Licht) und **St\u00e4bchen** (D\u00e4mmerungssehen, unterscheiden keine Farben). Im Dunkeln nutzt das Auge haupts\u00e4chlich St\u00e4bchen.\n\nEine Kamera sammelt Licht \u00fcber eine lange Belichtung (10–25 Sekunden). Bei starken St\u00fcrmen (KP 5+) sind Farben auch mit blo\u00dfem Auge deutlich sichtbar.` },
      { title: "Farben vorhersagen", content: `Sie k\u00f6nnen Nordlichtfarben teilweise anhand des KP-Index vorhersagen:\n\n• **KP 2–3:** Wahrscheinlich gr\u00fcn\n• **KP 4–5:** Gr\u00fcn + m\u00f6glicherweise lila\n• **KP 5–6:** Gr\u00fcn, lila + rot — mehrfarbige Auff\u00fchrung\n• **KP 7+:** Volles Spektrum — geomagnetischer Sturm` }
    ],
    faq: {
      title: "H\u00e4ufig gestellte Fragen",
      items: [
        { q: "Warum sind Nordlichter meistens gr\u00fcn?", a: "Gr\u00fcne Farbe kommt von Sauerstoff in 100–200 km H\u00f6he. Sie ist am h\u00e4ufigsten, weil Sauerstoff reichlich vorhanden ist, die Reaktion schnell ist und das Auge am empfindlichsten f\u00fcr gr\u00fcnes Licht ist." },
        { q: "Warum sieht die Kamera besser als das Auge?", a: "Die Kamera sammelt Licht \u00fcber eine lange Belichtung, w\u00e4hrend das Auge kontinuierlich verarbeitet. Au\u00dferdem schw\u00e4cht sich das Farbsehen im Dunkeln ab." },
        { q: "Kann man die Farbe vorhersagen?", a: "Teilweise — Gr\u00fcn ist immer vorhanden, wenn Aurora sichtbar ist. Rot und Lila erscheinen nur bei starken St\u00fcrmen (KP 5+)." }
      ]
    },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Nordlichter in Levi", desc: "Umfassender Aurora-Ratgeber", href: "/en/northern-lights" },
        { title: "Wie Nordlichter entstehen", desc: "Wissenschaftliche Erkl\u00e4rung", href: "/de/ratgeber/wie-entstehen-nordlichter" },
        { title: "Unterkunft", desc: "Unterkunft in Levi buchen", href: "/en/accommodations" }
      ]
    }
  },
  es: {
    meta: {
      title: "Colores de las auroras boreales — \u00bfPor qu\u00e9 verde, rojo, p\u00farpura y azul? | Leville.net",
      description: "\u00bfPor qu\u00e9 las auroras boreales tienen diferentes colores? Explicaci\u00f3n del verde, rojo, p\u00farpura y azul: gases atmosf\u00e9ricos y altitud.",
      canonical: "https://leville.net/es/guia/colores-auroras-boreales"
    },
    h1: "Colores de las auroras boreales — \u00bfqu\u00e9 los causa?",
    breadcrumbLabel: "Colores de aurora",
    sections: [
      { title: "Colores en resumen", content: `El color de las auroras boreales depende de dos factores: **qu\u00e9 gas** (ox\u00edgeno o nitr\u00f3geno) y **a qu\u00e9 altitud** ocurre la colisi\u00f3n. Diferentes gases y altitudes producen diferentes longitudes de onda de luz — y diferentes longitudes de onda se ven como diferentes colores.\n\nEs el mismo principio f\u00edsico que las luces de ne\u00f3n: diferentes gases brillan en diferentes colores cuando la electricidad pasa a trav\u00e9s de ellos.` },
      { title: "Verde — el color m\u00e1s com\u00fan", content: `La aurora verde se forma cuando los electrones del viento solar chocan con **\u00e1tomos de ox\u00edgeno** a aproximadamente 100–200 kil\u00f3metros de altitud. El \u00e1tomo de ox\u00edgeno se excita y libera energ\u00eda como luz verde a una longitud de onda de 557,7 nan\u00f3metros.\n\nEl verde es tambi\u00e9n el color al que el ojo humano es m\u00e1s sensible — por lo que destaca bien contra un cielo oscuro.` },
      { title: "Rojo — m\u00e1s raro y m\u00e1s alto", content: `La aurora roja tambi\u00e9n proviene del ox\u00edgeno, pero a **mayor altitud** — t\u00edpicamente 200–300 km. La recuperaci\u00f3n tarda mucho m\u00e1s (unos 110 segundos) y emite luz roja a 630 nan\u00f3metros.\n\nDurante tormentas muy fuertes (KP 5+), la aurora roja puede ser espectacular — todo el cielo superior brilla en rojo profundo.` },
      { title: "P\u00farpura y azul — nitr\u00f3geno", content: `La aurora p\u00farpura y azul se forma cuando los electrones chocan con **mol\u00e9culas de nitr\u00f3geno** (N\u2082) y \u00e1tomos de nitr\u00f3geno (N). Estos colores son visibles en el borde inferior de las cortinas de aurora.\n\nEl p\u00farpura es a menudo una combinaci\u00f3n de luz roja y azul. La aurora azul pura es rara.` },
      { title: "Blanco y rosa", content: `A veces la aurora parece blanca o rosa. **La aurora blanca** es a menudo una combinaci\u00f3n de m\u00faltiples colores que el ojo no puede distinguir en la oscuridad. Una c\u00e1mara con exposici\u00f3n larga revela los verdaderos colores.\n\n**El rosa** resulta de una combinaci\u00f3n de nitr\u00f3geno y ox\u00edgeno — especialmente en el borde inferior de las cortinas de aurora.` },
      { title: "\u00bfPor qu\u00e9 la c\u00e1mara ve diferente al ojo?", content: `El ojo tiene dos tipos de fotorreceptores: **conos** (visi\u00f3n en color, funcionan con luz brillante) y **bastones** (visi\u00f3n nocturna, no distinguen colores). En la oscuridad, el ojo usa principalmente bastones.\n\nUna c\u00e1mara recopila luz durante una exposici\u00f3n larga (10–25 segundos). Durante tormentas fuertes (KP 5+), los colores son visibles a simple vista.` },
      { title: "Predecir colores", content: `Se pueden predecir parcialmente los colores basándose en el \u00edndice KP:\n\n• **KP 2–3:** Probablemente verde\n• **KP 4–5:** Verde + posiblemente p\u00farpura\n• **KP 5–6:** Verde, p\u00farpura + rojo — exhibici\u00f3n multicolor\n• **KP 7+:** Espectro completo — tormenta geomagn\u00e9tica` }
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "\u00bfPor qu\u00e9 las auroras son generalmente verdes?", a: "El color verde proviene del ox\u00edgeno a 100–200 km de altitud. Es el m\u00e1s com\u00fan porque el ox\u00edgeno es abundante, la reacci\u00f3n es r\u00e1pida y el ojo humano es m\u00e1s sensible al verde." },
        { q: "\u00bfPor qu\u00e9 la c\u00e1mara ve mejor que el ojo?", a: "La c\u00e1mara recopila luz durante una exposici\u00f3n larga mientras el ojo procesa continuamente. Adem\u00e1s, la visi\u00f3n en color se debilita en la oscuridad." },
        { q: "\u00bfSe puede predecir el color?", a: "Parcialmente — el verde siempre est\u00e1 presente cuando hay aurora. El rojo y el p\u00farpura aparecen solo durante tormentas fuertes (KP 5+)." }
      ]
    },
    readNext: {
      title: "Lea tambi\u00e9n",
      links: [
        { title: "Auroras boreales en Levi", desc: "Gu\u00eda completa de auroras", href: "/en/northern-lights" },
        { title: "C\u00f3mo se forman las auroras", desc: "Explicaci\u00f3n cient\u00edfica", href: "/es/guia/como-se-forman-auroras-boreales" },
        { title: "Alojamiento", desc: "Reserve alojamiento en Levi", href: "/en/accommodations" }
      ]
    }
  },
  fr: {
    meta: {
      title: "Couleurs des aurores bor\u00e9ales — Pourquoi vert, rouge, violet et bleu ? | Leville.net",
      description: "Pourquoi les aurores bor\u00e9ales ont-elles diff\u00e9rentes couleurs ? Explication du vert, rouge, violet et bleu : gaz atmosph\u00e9riques et altitude.",
      canonical: "https://leville.net/fr/guide/couleurs-aurores-boreales"
    },
    h1: "Couleurs des aurores bor\u00e9ales — qu'est-ce qui les cause ?",
    breadcrumbLabel: "Couleurs des aurores",
    sections: [
      { title: "Les couleurs en bref", content: `La couleur des aurores bor\u00e9ales d\u00e9pend de deux facteurs : **quel gaz** (oxyg\u00e8ne ou azote) et **\u00e0 quelle altitude** la collision se produit. Diff\u00e9rents gaz et altitudes produisent diff\u00e9rentes longueurs d'onde de lumi\u00e8re — et diff\u00e9rentes longueurs d'onde apparaissent comme diff\u00e9rentes couleurs.` },
      { title: "Vert — la couleur la plus courante", content: `L'aurore verte se forme lorsque les \u00e9lectrons du vent solaire entrent en collision avec des **atomes d'oxyg\u00e8ne** \u00e0 environ 100–200 kilom\u00e8tres d'altitude. L'atome d'oxyg\u00e8ne s'excite et lib\u00e8re de l'\u00e9nergie sous forme de lumi\u00e8re verte \u00e0 une longueur d'onde de 557,7 nanom\u00e8tres.\n\nLe vert est aussi la couleur \u00e0 laquelle l'\u0153il humain est le plus sensible.` },
      { title: "Rouge — plus rare et plus haut", content: `L'aurore rouge provient \u00e9galement de l'oxyg\u00e8ne, mais \u00e0 **plus haute altitude** — typiquement 200–300 km. La relaxation prend beaucoup plus longtemps (environ 110 secondes) et \u00e9met de la lumi\u00e8re rouge \u00e0 630 nanom\u00e8tres.\n\nLors de temp\u00eates tr\u00e8s fortes (KP 5+), l'aurore rouge peut \u00eatre spectaculaire.` },
      { title: "Violet et bleu — azote", content: `L'aurore violette et bleue se forme lorsque les \u00e9lectrons entrent en collision avec des **mol\u00e9cules d'azote** (N\u2082) et des atomes d'azote (N). Ces couleurs sont souvent visibles au bord inf\u00e9rieur des rideaux d'aurore.\n\nLe violet est souvent une combinaison de lumi\u00e8re rouge et bleue. L'aurore bleue pure est rare.` },
      { title: "Blanc et rose", content: `Parfois, l'aurore appara\u00eet blanche ou rose. **L'aurore blanche** est souvent une combinaison de plusieurs couleurs que l'\u0153il ne peut pas distinguer dans l'obscurit\u00e9. Un appareil photo avec une longue exposition r\u00e9v\u00e8le les vraies couleurs.\n\n**Le rose** r\u00e9sulte d'une combinaison d'azote et d'oxyg\u00e8ne.` },
      { title: "Pourquoi l'appareil photo voit-il diff\u00e9remment de l'\u0153il ?", content: `L'\u0153il a deux types de photor\u00e9cepteurs : **les c\u00f4nes** (vision des couleurs, fonctionnent en lumi\u00e8re vive) et **les b\u00e2tonnets** (vision nocturne, ne distinguent pas les couleurs). Dans l'obscurit\u00e9, l'\u0153il utilise principalement les b\u00e2tonnets.\n\nUn appareil photo collecte la lumi\u00e8re pendant une longue exposition (10–25 secondes). Lors de fortes temp\u00eates (KP 5+), les couleurs sont visibles \u00e0 l'\u0153il nu.` },
      { title: "Pr\u00e9dire les couleurs", content: `Vous pouvez partiellement pr\u00e9dire les couleurs bas\u00e9 sur l'indice KP :\n\n• **KP 2–3 :** Probablement vert\n• **KP 4–5 :** Vert + possiblement violet\n• **KP 5–6 :** Vert, violet + rouge — spectacle multicolore\n• **KP 7+ :** Spectre complet — temp\u00eate g\u00e9omagn\u00e9tique` }
    ],
    faq: {
      title: "Questions fr\u00e9quentes",
      items: [
        { q: "Pourquoi les aurores sont-elles g\u00e9n\u00e9ralement vertes ?", a: "La couleur verte provient de l'oxyg\u00e8ne \u00e0 100–200 km d'altitude. C'est la plus courante car l'oxyg\u00e8ne est abondant, la r\u00e9action est rapide et l'\u0153il est plus sensible au vert." },
        { q: "Pourquoi l'appareil photo voit-il mieux que l'\u0153il ?", a: "L'appareil photo collecte la lumi\u00e8re sur une longue exposition tandis que l'\u0153il traite en continu. De plus, la vision des couleurs s'affaiblit dans l'obscurit\u00e9." },
        { q: "Peut-on pr\u00e9dire la couleur ?", a: "Partiellement — le vert est toujours pr\u00e9sent quand l'aurore est visible. Le rouge et le violet n'apparaissent que lors de fortes temp\u00eates (KP 5+)." }
      ]
    },
    readNext: {
      title: "Lire aussi",
      links: [
        { title: "Aurores boréales à Levi", desc: "Guide complet des aurores", href: "/en/northern-lights" },
        { title: "Comment se forment les aurores", desc: "Explication scientifique", href: "/fr/guide/comment-se-forment-aurores-boreales" },
        { title: "Hébergement", desc: "Réservez un hébergement à Levi", href: "/en/accommodations" }
      ]
    }
  }
};

const NorthernLightsColorsExplained = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/revontulien-varit", en: "/guide/northern-lights-colors-explained" };
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
        <meta property="og:image:alt" content={lang === "fi" ? "Revontulien värit" : "Northern Lights Colors"} />
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
                  {lang === "fi" ? "Tule näkemään revontulien väriloisto itse Levillä." : "Come see the aurora colour spectacle yourself in Levi."}
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

export default NorthernLightsColorsExplained;
