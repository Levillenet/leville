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

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props { lang?: Language; }

const translations = {
  fi: {
    meta: {
      title: "Missä nähdä revontulet Levillä — Parhaat paikat ja vinkit | Leville.net",
      description: "Parhaat paikat revontulien katseluun Levillä: vähän valosaastetta, avoimet näkymät ja korkeat paikat. Paikallisen vinkit.",
      canonical: "https://leville.net/opas/missa-nahda-revontulet-levi"
    },
    h1: "Missä nähdä revontulet Levillä — parhaat paikat",
    breadcrumbLabel: "Missä nähdä revontulet",
    sections: [
      {
        title: "Perusperiaate — mitä tarvitset?",
        content: `Revontulien näkeminen vaatii kolme asiaa: 1) **pimeä paikka** jossa keinovaloa on vähän, 2) **avoin näkymä pohjoiseen** (revontulet näkyvät useimmin pohjoisella taivaalla, mutta vahvoilla myrskyillä ne peittävät koko taivaan), ja 3) **kirkas taivas** ilman pilviä.

Näistä kolmesta pilvisyys on se johon et voi vaikuttaa — mutta paikan ja suunnan voit valita. Hyvä uutinen: Levillä ei tarvitse matkustaa kauas. Kylän ympäristössä on runsaasti sopivia paikkoja muutaman minuutin päässä.`
      },
      {
        title: "Suoraan majoituksen pihalta",
        content: `Monet vieraamme näkevät revontulet suoraan majoituksen terassilta tai pihalta — erityisesti jos majoituksella on avoin näkymä pohjoiseen. Tämä on ehdottomasti mukavin tapa: voit tarkistaa tilanteen pyjamassa, palata sisälle lämmittelemään ja mennä takaisin ulos kun näytös voimistuu.

Keskustan majoituksissa katuvalot heikentävät näkyvyyttä, mutta vahvoilla myrskyillä (Kp 5+) revontulet näkyvät silti selvästi. Pieni vinkki joka tekee suuren eron: **sammuta sisävalot**, mene parvekkeelle tai pihalle ja odota silmien tottumista pimeyteen (10–15 minuuttia). Tänä aikana silmäsi sopeutuvat ja heikotkin revontulet alkavat erottua.`
      },
      {
        title: "Lähellä keskustaa",
        content: `Ei tarvitse ajaa kauas — muutaman sadan metrin kävely kylän reunalle vie jo merkittävästi pimeämpään paikkaan. Keskustan valot häviävät nopeasti kun suuntaa kohti tunturin rinnettä tai järven rantaa.

**Suuntaa kohti:**
• Immeljärven ranta — avoin näkymä, helposti saavutettavissa jalkaisin
• Sirkkajärven suunta — laaja avoin alue, vähän rakennuksia
• Tunturin suunta — kävele Zero Point -ravintolan ohi kohti rinteita
• Latualueet — valmiit polut pimeille alueille

Kävelymatka 5–15 minuuttia keskustasta riittää useimmiten. Ota mukaan otsalamppu (punaisella valolla) niin näet minne astut, mutta sammuta se kun katselet taivasta.`
      },
      {
        title: "Avoimet maastot ja järvet",
        content: `Järvien jäät talvella tarjoavat avoimia näkymiä joka suuntaan ilman puita tai rakennuksia. Tämä on erityisen vaikuttavaa: revontulet heijastuvat jään pinnasta ja näkymä ulottuu horisontista horisonttiin.

**Immeljärvi** on suosituin ja helpoiten saavutettavissa — alle 10 minuutin kävely keskustasta. Talvella järven jäällä on turvallista kävellä (jää on tyypillisesti 50–80 cm paksu tammi–maaliskuussa).

Peltoaukeat ja latualueet ovat myös erinomaisia — laaja avoin taivas ilman puiden muodostamia esteitä. Levi Golf -alue talvella on yllättävän hyvä paikka: avoin ja lähellä keskustaa.`
      },
      {
        title: "Korkeat paikat",
        content: `Tunturin rinteet ja lakialueet tarjoavat laajimman näkymän — revontulet voivat ulottua horisontista horisonttiin koko 360° panoraamana. Korkealla pilvikerros voi olla myös alla — joskus pilvien yläpuolelta näkee revontulia vaikka laaksossa olisi pilvistä.

Levi-tunturin gondolihissi ei kulje iltaisin, joten huipulle pääsy vaatii omaa kulkuvälinettä tai vaellusta. Autolla pääsee korkeammille tieosuuksille (esim. Levitunturintie) josta avautuu laaja näkymä.

**Huomio turvallisuudesta:** Älä lähde yksin tunturiin pimeällä ilman asianmukaista varustusta. Talvella tunturissa on kylmää, tuulista ja näkyvyys voi olla huono. Matalammalla oleva avoin paikka (järven ranta, peltoaukea) on turvallisempi ja käytännöllisempi vaihtoehto.`
      },
      {
        title: "Opastetut revontulisafarit",
        content: `Safari-oppaat tuntevat parhaat paikat ja seuraavat ennustetta ammattimaisesti. Opastettu revontulisafari vie yleensä 15–30 km kylästä pois erittäin pimeille paikoille joihin et muuten pääsisi.

Safarien etuja:
• Opas tietää missä pilviä on vähiten ja ajaa sinne
• Kuljetus on järjestetty — ei tarvitse omaa autoa
• Kodassa saa kuumaa mehua ja makkaraa odotellessa
• Oppaat tarjoavat usein ammattimaisen valokuvauksen (revontulikuvia muistoksi)
• Tietoa revontulista ja Lapin luonnosta

Revontulisafareja järjestävät useat paikalliset operaattorit Levillä. Hinnat ovat tyypillisesti 70–120 € per henkilö. Varaa etukäteen erityisesti sesonkiaikaan (joulu–helmikuu).

**Tärkeä:** Safari ei takaa revontulia — luonto päättää. Mutta opas maksimoi mahdollisuudet ja tekee illasta mukavan joka tapauksessa.`
      },
      {
        title: "Vinkki — älä mene liian kauas",
        content: `Yleinen virhe on ajaa tunnin autolla etsimään "täydellistä" paikkaa. Todellisuudessa 2–5 km keskustasta riittää — Levin kylä on jo niin pieni, ettei vakavaa valosaastetta ole.

Tärkeämpää kuin absoluuttinen etäisyys valoista on:
• **Kirkas taivas** (tarkista pilviennuste)
• **Avoin näkymä** (ei korkeita puita tai rakennuksia edessä)
• **Katseen suunta pohjoiseen** (heikot revontulet näkyvät ensin pohjoisella taivaalla)
• **Kärsivällisyys** (odota vähintään 15–30 minuuttia, silmät totutellen)

Usein paras paikka on aivan majoituksen lähellä — tuttu, turvallinen ja helposti saavutettavissa keskellä yötä.`
      }
    ],
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Näkeekö revontulia Levin keskustasta?", a: "Kyllä, vahvoilla myrskyillä (Kp 5+). Parempi kokemus on muutaman sadan metrin päässä katuvalöista, jossa silmät tottuvat pimeyteen paremmin." },
        { q: "Tarvitseeko lähteä safarille?", a: "Ei pakollista. Moni näkee revontulet omalta pihalta tai lyhyen kävelyn päästä. Safari on mukavuusvalinta ja takaa hyvät paikat ja asiantuntevan oppaan." },
        { q: "Mihin suuntaan katsoa?", a: "Pohjoiseen. Heikot revontulet näkyvät ensin pohjoisella taivaalla matalalla. Vahvoilla myrskyillä ne leviävät koko taivaalle — silloin katso kaikkialle." }
      ]
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Revontulet Levillä", desc: "Kattava revontuliopas", href: "/revontulet" },
        { title: "Revontulien valokuvaus", desc: "Kamera-asetukset ja vinkit", href: "/opas/revontulien-valokuvaus-levi" },
        { title: "Majoitukset", desc: "Katsele revontulia omalta terassilta", href: "/majoitukset" }
      ]
    }
  },
  en: {
    meta: {
      title: "Where to See Northern Lights in Levi — Best Spots & Tips | Leville.net",
      description: "Best places to see northern lights in Levi: away from light pollution, open views and elevated viewpoints. Local tips.",
      canonical: "https://leville.net/guide/where-to-see-northern-lights-levi"
    },
    h1: "Where to See Northern Lights in Levi — Best Spots",
    breadcrumbLabel: "Where to See Aurora",
    sections: [
      { title: "Basic Principle — What Do You Need?", content: `Seeing the northern lights requires three things: 1) **a dark place** with little artificial light, 2) **an open view to the north** (aurora appears most often on the northern sky, but during strong storms it covers the entire sky), and 3) **a clear sky** without clouds.\n\nOf these three, cloud cover is the one you can't control — but you can choose your location and direction. Good news: in Levi you don't need to travel far. The area around the village has plenty of suitable spots just minutes away.` },
      { title: "Right from Your Accommodation", content: `Many of our guests see northern lights directly from their accommodation terrace or yard — especially if the accommodation has an open view to the north. This is by far the most comfortable way: you can check the situation in pyjamas, go back inside to warm up, and return outside when the display intensifies.\n\nIn central accommodations, street lights reduce visibility, but during strong storms (KP 5+) aurora is clearly visible regardless. A small tip that makes a big difference: **turn off indoor lights**, step onto the balcony or yard, and wait for your eyes to adjust to darkness (10–15 minutes). During this time your eyes adapt and even faint aurora becomes visible.` },
      { title: "Near the Centre", content: `You don't need to drive far — a few hundred metres' walk to the edge of the village takes you to a significantly darker place. The centre's lights fade quickly when heading towards the fell slope or lakeshore.\n\n**Head towards:**\n• Immeljärvi lakeside — open view, easily accessible on foot\n• Sirkkajärvi direction — large open area, few buildings\n• Fell direction — walk past Zero Point restaurant towards the slopes\n• Cross-country ski trails — ready-made paths to dark areas\n\nA 5–15 minute walk from the centre usually suffices. Bring a headlamp (with red light) so you can see where you're stepping, but switch it off when watching the sky.` },
      { title: "Open Terrain and Lakes", content: `Frozen lakes in winter offer open views in every direction without trees or buildings. This is particularly impressive: aurora reflects off the ice surface and the view extends from horizon to horizon.\n\n**Immeljärvi** is the most popular and easiest to reach — less than a 10-minute walk from the centre. In winter, walking on the lake ice is safe (ice is typically 50–80 cm thick in January–March).\n\nOpen fields and ski trail areas are also excellent — wide open sky without tree obstructions. The Levi Golf area in winter is a surprisingly good spot: open and close to the centre.` },
      { title: "Elevated Spots", content: `Fell slopes and summit areas offer the widest view — aurora can stretch from horizon to horizon in a full 360° panorama. At altitude, the cloud layer may be below — sometimes you can see aurora above the clouds even when it's overcast in the valley.\n\nThe Levi gondola doesn't operate in the evening, so reaching the summit requires your own transport or hiking. By car you can reach higher road sections (e.g., Levitunturintie) with wide panoramic views.\n\n**Safety note:** Don't go into the fells alone at night without proper gear. In winter the fells are cold, windy, and visibility can be poor. A lower open spot (lakeside, field) is a safer and more practical alternative.` },
      { title: "Guided Aurora Safaris", content: `Safari guides know the best spots and monitor forecasts professionally. A guided aurora safari typically takes you 15–30 km from the village to extremely dark locations you wouldn't reach otherwise.\n\nSafari advantages:\n• The guide knows where clouds are fewest and drives there\n• Transport is arranged — no need for your own car\n• Hot drinks and snacks in a wilderness hut while waiting\n• Guides often provide professional photography (aurora photos as souvenirs)\n• Knowledge about aurora and Lapland nature\n\nAurora safaris are run by several local operators in Levi. Prices are typically €70–120 per person. Book in advance especially during peak season (December–February).\n\n**Important:** A safari doesn't guarantee aurora — nature decides. But the guide maximises your chances and makes the evening enjoyable regardless.` },
      { title: "Tip — Don't Go Too Far", content: `A common mistake is driving an hour looking for the "perfect" spot. In reality, 2–5 km from the centre is enough — Levi village is already so small that there's no serious light pollution.\n\nMore important than absolute distance from lights:\n• **Clear sky** (check cloud forecast)\n• **Open view** (no tall trees or buildings blocking)\n• **Look north** (faint aurora appears first on the northern horizon)\n• **Patience** (wait at least 15–30 minutes for eyes to adjust)\n\nOften the best spot is right near your accommodation — familiar, safe, and easily accessible in the middle of the night.` }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Can I see northern lights from Levi town centre?", a: "Yes, during strong storms (KP 5+). A better experience is a few hundred metres from street lights where your eyes can adjust to darkness properly." },
        { q: "Do I need to go on a safari?", a: "Not essential. Many guests see aurora from their own yard or a short walk away. A safari is a comfort choice ensuring good spots and an expert guide." },
        { q: "Which direction should I look?", a: "North. Faint aurora appears first low on the northern sky. During strong storms it spreads across the entire sky — then look everywhere." }
      ]
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Northern Lights in Levi", desc: "Comprehensive aurora guide", href: "/en/northern-lights" },
        { title: "Aurora Photography", desc: "Camera settings and tips", href: "/guide/northern-lights-photography-levi" },
        { title: "Accommodation", desc: "Watch aurora from your terrace", href: "/en/accommodation" }
      ]
    }
  },
  nl: {
    meta: {
      title: "Waar noorderlicht zien in Levi — Beste plekken & tips | Leville.net",
      description: "Beste plekken om noorderlicht te zien in Levi: weg van lichtvervuiling, open uitzicht en hoge uitkijkpunten. Lokale tips.",
      canonical: "https://leville.net/nl/gids/waar-noorderlicht-zien-levi"
    },
    h1: "Waar noorderlicht zien in Levi — beste plekken",
    breadcrumbLabel: "Waar noorderlicht zien",
    sections: [
      { title: "Basisprincipe — wat heb je nodig?", content: `Om het noorderlicht te zien heb je drie dingen nodig: 1) **een donkere plek** met weinig kunstlicht, 2) **een open uitzicht naar het noorden** (aurora verschijnt het vaakst aan de noordelijke hemel, maar bij sterke stormen bedekt het de hele hemel), en 3) **een heldere hemel** zonder wolken.\n\nVan deze drie is bewolking degene die je niet kunt beïnvloeden — maar je kunt wel je locatie en richting kiezen. Goed nieuws: in Levi hoef je niet ver te reizen. De omgeving van het dorp heeft volop geschikte plekken op slechts enkele minuten afstand.` },
      { title: "Direct vanaf je accommodatie", content: `Veel van onze gasten zien het noorderlicht direct vanaf het terras of de tuin van hun accommodatie — vooral als de accommodatie een open uitzicht naar het noorden heeft. Dit is verreweg de comfortabelste manier: je kunt de situatie in je pyjama controleren, naar binnen gaan om op te warmen en weer naar buiten gaan als de show versterkt.\n\nIn accommodaties in het centrum vermindert straatverlichting de zichtbaarheid, maar bij sterke stormen (KP 5+) is aurora toch duidelijk zichtbaar. Een kleine tip die een groot verschil maakt: **doe de binnenverlichting uit**, ga naar het balkon of de tuin en wacht tot je ogen aan het donker gewend zijn (10–15 minuten). In die tijd passen je ogen zich aan en wordt zelfs zwak noorderlicht zichtbaar.` },
      { title: "In de buurt van het centrum", content: `Je hoeft niet ver te rijden — een wandeling van een paar honderd meter naar de rand van het dorp brengt je al naar een aanzienlijk donkerdere plek. De lichten van het centrum verdwijnen snel als je richting de fjällhelling of de oever van het meer gaat.\n\n**Ga richting:**\n• Immeljärvi-meer — open uitzicht, gemakkelijk bereikbaar te voet\n• Sirkkajärvi-richting — groot open gebied, weinig gebouwen\n• Fjäll-richting — loop voorbij restaurant Zero Point richting de hellingen\n• Langlaufroutes — kant-en-klare paden naar donkere gebieden\n\nEen wandeling van 5–15 minuten vanuit het centrum volstaat meestal. Neem een hoofdlamp mee (met rood licht) zodat je kunt zien waar je loopt, maar zet hem uit als je naar de hemel kijkt.` },
      { title: "Open terrein en meren", content: `Bevroren meren in de winter bieden open uitzichten in alle richtingen zonder bomen of gebouwen. Dit is bijzonder indrukwekkend: aurora weerspiegelt in het ijsoppervlak en het uitzicht strekt zich uit van horizon tot horizon.\n\n**Immeljärvi** is het populairst en het gemakkelijkst te bereiken — minder dan 10 minuten lopen vanuit het centrum. In de winter is het veilig om op het meerijs te lopen (het ijs is doorgaans 50–80 cm dik in januari–maart).\n\nOpen velden en langlaufgebieden zijn ook uitstekend — wijde open hemel zonder bomen die het uitzicht blokkeren. Het Levi Golf-gebied in de winter is een verrassend goede plek: open en dicht bij het centrum.` },
      { title: "Hoge plekken", content: `Fjällhellingen en topgebieden bieden het breedste uitzicht — aurora kan zich uitstrekken van horizon tot horizon in een volledig 360°-panorama. Op hoogte kan de wolkenlaag zich ook onder je bevinden — soms kun je aurora boven de wolken zien, zelfs als het in het dal bewolkt is.\n\nDe Levi-gondel werkt niet 's avonds, dus om de top te bereiken heb je eigen vervoer of een wandeling nodig. Met de auto kun je hogere wegsecties bereiken (bijv. Levitunturintie) met wijd panoramisch uitzicht.\n\n**Veiligheidswaarschuwing:** Ga niet alleen de fjäll in 's nachts zonder goede uitrusting. In de winter is het koud, winderig en kan het zicht slecht zijn. Een lager gelegen open plek (meeroever, veld) is een veiliger en praktischer alternatief.` },
      { title: "Begeleide aurora-safari's", content: `Safarigeïden kennen de beste plekken en volgen de voorspellingen professioneel. Een begeleide aurora-safari brengt je doorgaans 15–30 km van het dorp naar extreem donkere locaties die je anders niet zou bereiken.\n\nVoordelen van safari's:\n• De gids weet waar de minste wolken zijn en rijdt erheen\n• Vervoer is geregeld — geen eigen auto nodig\n• Warme dranken en snacks in een wildernishut tijdens het wachten\n• Gidsen bieden vaak professionele fotografie (aurora-foto's als souvenir)\n• Kennis over aurora en de Laplandse natuur\n\nAurora-safari's worden georganiseerd door verschillende lokale operators in Levi. Prijzen zijn doorgaans €70–120 per persoon. Boek van tevoren, vooral tijdens het hoogseizoen (december–februari).\n\n**Belangrijk:** Een safari garandeert geen noorderlicht — de natuur beslist. Maar de gids maximaliseert je kansen en maakt de avond hoe dan ook aangenaam.` },
      { title: "Tip — ga niet te ver", content: `Een veelgemaakte fout is een uur rijden op zoek naar de \"perfecte\" plek. In werkelijkheid is 2–5 km van het centrum genoeg — het dorp Levi is al zo klein dat er geen serieuze lichtvervuiling is.\n\nBelangrijker dan de absolute afstand van lichten:\n• **Heldere hemel** (controleer de wolkenvoorspelling)\n• **Open uitzicht** (geen hoge bomen of gebouwen die blokkeren)\n• **Kijk naar het noorden** (zwak noorderlicht verschijnt eerst laag aan de noordelijke horizon)\n• **Geduld** (wacht minstens 15–30 minuten tot je ogen gewend zijn)\n\nVaak is de beste plek vlak bij je accommodatie — vertrouwd, veilig en gemakkelijk bereikbaar midden in de nacht.` }
    ],
    faq: {
      title: "Veelgestelde vragen",
      items: [
        { q: "Kan ik noorderlicht zien vanuit het centrum van Levi?", a: "Ja, bij sterke stormen (KP 5+). Een betere ervaring is een paar honderd meter van de straatverlichting waar je ogen zich goed aan het donker kunnen aanpassen." },
        { q: "Moet ik op safari gaan?", a: "Niet noodzakelijk. Veel gasten zien aurora vanuit hun eigen tuin of op korte loopafstand. Een safari is een comfortabele keuze die goede plekken en een deskundige gids garandeert." },
        { q: "Welke richting moet ik kijken?", a: "Noord. Zwak noorderlicht verschijnt eerst laag aan de noordelijke hemel. Bij sterke stormen verspreidt het zich over de hele hemel — kijk dan overal." }
      ]
    },
    readNext: {
      title: "Lees ook",
      links: [
        { title: "Noorderlicht in Levi", desc: "Uitgebreide aurora-gids", href: "/nl/noorderlicht" },
        { title: "Aurora-fotografie", desc: "Camera-instellingen en tips", href: "/nl/gids/noorderlicht-fotografie-levi" },
        { title: "Accommodatie", desc: "Bekijk aurora vanaf je terras", href: "/nl/accommodatie" }
      ]
    }
  },
  sv: {
    meta: {
      title: "Var se norrsken i Levi — Bästa platserna & tips | Leville.net",
      description: "Bästa platserna att se norrsken i Levi: bort från ljusföroreningar, öppna vyer och höga utsiktspunkter. Lokala tips.",
      canonical: "https://leville.net/sv/guide/var-se-norrsken-levi"
    },
    h1: "Var se norrsken i Levi — bästa platserna",
    breadcrumbLabel: "Var se norrsken",
    sections: [
      { title: "Grundprincipen — vad behöver du?", content: `Att se norrsken kräver tre saker: 1) **en mörk plats** med lite artificiellt ljus, 2) **fri sikt mot norr** (norrsken syns oftast på den norra himlen, men vid starka stormar täcker det hela himlen), och 3) **en klar himmel** utan moln.\n\nAv dessa tre är molntäcket det du inte kan kontrollera — men du kan välja plats och riktning. Goda nyheter: i Levi behöver du inte resa långt. Området runt byn har gott om lämpliga platser bara minuter bort.` },
      { title: "Direkt från ditt boende", content: `Många av våra gäster ser norrsken direkt från sin terrass eller gård — särskilt om boendet har fri sikt mot norr. Detta är det absolut bekvämaste sättet: du kan kolla läget i pyjamas, gå in och värma dig och komma ut igen när skådespelet intensifieras.\n\nI centrala boenden minskar gatubelysningen sikten, men under starka stormar (KP 5+) syns norrsken tydligt ändå. Ett litet tips som gör stor skillnad: **släck inomhusbelysningen**, gå ut på balkongen eller gården och vänta tills ögonen vant sig vid mörkret (10–15 minuter).` },
      { title: "Nära centrum", content: `Du behöver inte köra långt — några hundra meters promenad till byns utkant tar dig till en betydligt mörkare plats. Centrumljusen försvinner snabbt när du går mot fjällsluttningen eller sjöstranden.\n\n**Gå mot:**\n• Immeljärvi sjöstrand — öppen vy, lätt att nå till fots\n• Sirkkajärvi-riktningen — stort öppet område, få byggnader\n• Fjällriktningen — gå förbi restaurang Zero Point mot sluttningarna\n• Längdskidspår — färdiga stigar till mörka områden\n\nEn promenad på 5–15 minuter från centrum räcker vanligtvis.` },
      { title: "Öppna terrängområden och sjöar", content: `Frusna sjöar på vintern erbjuder öppna vyer i alla riktningar utan träd eller byggnader. Aurora reflekteras i isytan och utsikten sträcker sig från horisont till horisont.\n\n**Immeljärvi** är populärast och lättast att nå — mindre än 10 minuters promenad från centrum. På vintern är det säkert att gå på sjöisen (isen är typiskt 50–80 cm tjock i januari–mars).\n\nÖppna fält och skidspårsområden är också utmärkta.` },
      { title: "Höga platser", content: `Fjällsluttningar och toppområden erbjuder den bredaste utsikten — norrsken kan sträcka sig från horisont till horisont i ett fullt 360°-panorama.\n\nLevi-gondolen går inte på kvällstid, så att nå toppen kräver eget fordon eller vandring. Med bil kan du nå högre vägsektioner (t.ex. Levitunturintie) med vida panoramautsikter.\n\n**Säkerhetsvarning:** Gå inte ensam ut på fjällen i mörker utan rätt utrustning.` },
      { title: "Guidade norrskenssafarier", content: `Safariguider känner till de bästa platserna och övervakar prognoserna professionellt. En guidad norrskenssafari tar dig vanligtvis 15–30 km från byn till extremt mörka platser.\n\nFördelar:\n• Guiden vet var det är minst moln och kör dit\n• Transport ordnad — inget behov av egen bil\n• Varma drycker och snacks i en vildmarkskoja\n• Guider erbjuder ofta professionell fotografering\n\nPriser är typiskt €70–120 per person. Boka i förväg, särskilt under högsäsong (december–februari).` },
      { title: "Tips — gå inte för långt", content: `Ett vanligt misstag är att köra en timme för att hitta den \"perfekta\" platsen. I verkligheten räcker 2–5 km från centrum — Levi by är redan så liten att det inte finns allvarlig ljusförening.\n\nViktigare än absolut avstånd från ljus:\n• **Klar himmel** (kolla molnprognosen)\n• **Öppen vy** (inga höga träd eller byggnader)\n• **Titta norrut** (svagt norrsken syns först lågt på den norra horisonten)\n• **Tålamod** (vänta minst 15–30 minuter)` }
    ],
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Kan jag se norrsken från Levi centrum?", a: "Ja, vid starka stormar (KP 5+). En bättre upplevelse fås några hundra meter från gatubelysningen." },
        { q: "Måste jag åka på safari?", a: "Inte nödvändigt. Många gäster ser norrsken från sin egen gård eller på kort promenadavstånd." },
        { q: "Åt vilket håll ska jag titta?", a: "Norr. Svagt norrsken syns först lågt på den norra himlen. Vid starka stormar sprider det sig över hela himlen." }
      ]
    },
    readNext: {
      title: "Läs också",
      links: [
        { title: "Norrsken i Levi", desc: "Omfattande norrskensguide", href: "/sv/guide/norrsken-levi" },
        { title: "Norrskensfotografering", desc: "Kamerainställningar och tips", href: "/sv/guide/norrsken-fotografering-levi" },
        { title: "Boende", desc: "Se norrsken från din terrass", href: "/sv/boende" }
      ]
    }
  },
  de: {
    meta: {
      title: "Wo Nordlichter in Levi sehen — Beste Plätze & Tipps | Leville.net",
      description: "Beste Plätze für Nordlichtbeobachtung in Levi: wenig Lichtverschmutzung, offene Aussichten und erhöhte Aussichtspunkte. Lokale Tipps.",
      canonical: "https://leville.net/de/ratgeber/wo-nordlichter-sehen-levi"
    },
    h1: "Wo Nordlichter in Levi sehen — beste Plätze",
    breadcrumbLabel: "Wo Nordlichter sehen",
    sections: [
      { title: "Grundprinzip — was braucht man?", content: `Um Nordlichter zu sehen, braucht man drei Dinge: 1) **einen dunklen Ort** mit wenig Kunstlicht, 2) **freie Sicht nach Norden** (Polarlichter erscheinen am häufigsten am Nordhimmel, bei starken Stürmen bedecken sie aber den gesamten Himmel), und 3) **einen klaren Himmel** ohne Wolken.\n\nVon diesen drei ist die Bewölkung nicht beeinflussbar — aber den Standort und die Richtung kann man wählen. Gute Nachricht: In Levi muss man nicht weit reisen. Die Umgebung des Dorfes bietet zahlreiche geeignete Plätze in wenigen Minuten Entfernung.` },
      { title: "Direkt von Ihrer Unterkunft", content: `Viele unserer Gäste sehen Nordlichter direkt von der Terrasse oder dem Garten ihrer Unterkunft — besonders wenn die Unterkunft freie Sicht nach Norden hat. Dies ist der bequemste Weg: Sie können die Situation im Pyjama prüfen, zum Aufwärmen reingehen und wieder herauskommen, wenn die Show stärker wird.\n\nBei Unterkünften im Zentrum reduziert Straßenbeleuchtung die Sichtbarkeit, aber bei starken Stürmen (KP 5+) sind Nordlichter trotzdem deutlich sichtbar. Ein kleiner Tipp mit großer Wirkung: **Schalten Sie das Innenlicht aus**, gehen Sie auf den Balkon und warten Sie, bis sich Ihre Augen an die Dunkelheit gewöhnt haben (10–15 Minuten).` },
      { title: "In der Nähe des Zentrums", content: `Man muss nicht weit fahren — ein paar hundert Meter Fußweg zum Dorfrand bringt Sie an einen deutlich dunkleren Ort.\n\n**Gehen Sie Richtung:**\n• Immeljärvi-Seeufer — offene Sicht, leicht zu Fuß erreichbar\n• Sirkkajärvi-Richtung — großes offenes Gebiet, wenige Gebäude\n• Fjäll-Richtung — am Restaurant Zero Point vorbei Richtung Hänge\n• Langlaufloipen — fertige Wege in dunkle Gebiete\n\nEin 5–15-minütiger Spaziergang vom Zentrum reicht meist aus.` },
      { title: "Offenes Gelände und Seen", content: `Gefrorene Seen im Winter bieten offene Aussichten in alle Richtungen. Aurora spiegelt sich in der Eisoberfläche und die Sicht reicht von Horizont zu Horizont.\n\n**Immeljärvi** ist am beliebtesten und am leichtesten erreichbar — weniger als 10 Minuten zu Fuß vom Zentrum. Im Winter ist es sicher, auf dem Seeeis zu gehen (das Eis ist typischerweise 50–80 cm dick im Januar–März).` },
      { title: "Erhöhte Plätze", content: `Fjällhänge und Gipfelbereiche bieten die weiteste Aussicht — Nordlichter können sich in einem vollen 360°-Panorama von Horizont zu Horizont erstrecken.\n\nDie Levi-Gondel fährt abends nicht, der Gipfel erfordert eigenes Fahrzeug oder Wanderung. Mit dem Auto erreicht man höhere Straßenabschnitte (z.B. Levitunturintie) mit weitem Panoramablick.\n\n**Sicherheitshinweis:** Gehen Sie nicht allein nachts in die Fjälls ohne angemessene Ausrüstung.` },
      { title: "Geführte Aurora-Safaris", content: `Safari-Guides kennen die besten Plätze und überwachen Vorhersagen professionell. Eine geführte Aurora-Safari bringt Sie typischerweise 15–30 km vom Dorf zu extrem dunklen Orten.\n\nVorteile:\n• Der Guide weiß, wo die wenigsten Wolken sind\n• Transport ist organisiert — kein eigenes Auto nötig\n• Warme Getränke und Snacks in einer Wildnishütte\n• Guides bieten oft professionelle Fotografie\n\nPreise liegen typischerweise bei €70–120 pro Person. Buchen Sie im Voraus, besonders in der Hochsaison (Dezember–Februar).` },
      { title: "Tipp — fahren Sie nicht zu weit", content: `Ein häufiger Fehler ist, eine Stunde zu fahren auf der Suche nach dem \"perfekten\" Platz. In Wirklichkeit reichen 2–5 km vom Zentrum — das Dorf Levi ist bereits so klein, dass es keine ernsthafte Lichtverschmutzung gibt.\n\nWichtiger als die absolute Entfernung von Lichtquellen:\n• **Klarer Himmel** (Wolkenvorhersage prüfen)\n• **Offene Sicht** (keine hohen Bäume oder Gebäude)\n• **Nach Norden schauen** (schwache Aurora erscheint zuerst tief am Nordhorizont)\n• **Geduld** (mindestens 15–30 Minuten warten)` }
    ],
    faq: {
      title: "Häufig gestellte Fragen",
      items: [
        { q: "Kann ich Nordlichter vom Zentrum Levis aus sehen?", a: "Ja, bei starken Stürmen (KP 5+). Ein besseres Erlebnis bietet sich einige hundert Meter von der Straßenbeleuchtung entfernt." },
        { q: "Muss ich auf Safari gehen?", a: "Nicht unbedingt. Viele Gäste sehen Aurora vom eigenen Garten oder bei einem kurzen Spaziergang." },
        { q: "In welche Richtung soll ich schauen?", a: "Nach Norden. Schwache Aurora erscheint zuerst tief am Nordhimmel. Bei starken Stürmen breitet sie sich über den gesamten Himmel aus." }
      ]
    },
    readNext: {
      title: "Lesen Sie auch",
      links: [
        { title: "Nordlichter in Levi", desc: "Umfassender Aurora-Guide", href: "/de/ratgeber/nordlichter-levi" },
        { title: "Aurora-Fotografie", desc: "Kameraeinstellungen und Tipps", href: "/de/ratgeber/nordlichter-fotografie-levi" },
        { title: "Unterkunft", desc: "Nordlichter von Ihrer Terrasse", href: "/de/unterkunft" }
      ]
    }
  },
  es: {
    meta: {
      title: "Dónde ver auroras boreales en Levi — Mejores lugares y consejos | Leville.net",
      description: "Mejores lugares para ver auroras boreales en Levi: lejos de la contaminación lumínica, vistas abiertas y miradores elevados. Consejos locales.",
      canonical: "https://leville.net/es/guia/donde-ver-auroras-boreales-levi"
    },
    h1: "Dónde ver auroras boreales en Levi — mejores lugares",
    breadcrumbLabel: "Dónde ver auroras",
    sections: [
      { title: "Principio básico — ¿qué necesitas?", content: `Para ver auroras boreales necesitas tres cosas: 1) **un lugar oscuro** con poca luz artificial, 2) **una vista abierta hacia el norte** (la aurora aparece con más frecuencia en el cielo norte, pero en tormentas fuertes cubre todo el cielo), y 3) **un cielo despejado** sin nubes.\n\nDe estos tres, la nubosidad es lo que no puedes controlar — pero puedes elegir tu ubicación y dirección. Buenas noticias: en Levi no necesitas viajar lejos. Los alrededores del pueblo tienen muchos lugares adecuados a solo minutos.` },
      { title: "Desde tu alojamiento", content: `Muchos de nuestros huéspedes ven auroras directamente desde la terraza o el jardín de su alojamiento — especialmente si tiene vista abierta hacia el norte. Esta es la forma más cómoda: puedes verificar la situación en pijama, volver adentro a calentarte y salir de nuevo cuando el espectáculo se intensifica.\n\nUn pequeño consejo que marca gran diferencia: **apaga las luces interiores**, sal al balcón y espera a que tus ojos se adapten a la oscuridad (10–15 minutos).` },
      { title: "Cerca del centro", content: `No necesitas conducir lejos — una caminata de unos cientos de metros hasta el borde del pueblo te lleva a un lugar significativamente más oscuro.\n\n**Dirígete hacia:**\n• Orilla del lago Immeljärvi — vista abierta, fácilmente accesible a pie\n• Dirección Sirkkajärvi — gran área abierta, pocos edificios\n• Dirección del fjäll — pasa el restaurante Zero Point hacia las laderas\n• Rutas de esquí de fondo — caminos preparados hacia áreas oscuras\n\nUna caminata de 5–15 minutos desde el centro suele ser suficiente.` },
      { title: "Terreno abierto y lagos", content: `Los lagos congelados en invierno ofrecen vistas abiertas en todas las direcciones. La aurora se refleja en la superficie del hielo y la vista se extiende de horizonte a horizonte.\n\n**Immeljärvi** es el más popular y fácil de alcanzar — menos de 10 minutos caminando desde el centro. En invierno, es seguro caminar sobre el hielo del lago (el hielo tiene típicamente 50–80 cm de grosor en enero–marzo).` },
      { title: "Lugares elevados", content: `Las laderas y zonas de cumbres ofrecen la vista más amplia — la aurora puede extenderse en un panorama completo de 360°.\n\nLa góndola de Levi no opera por la noche, llegar a la cumbre requiere vehículo propio o caminata.\n\n**Nota de seguridad:** No vayas solo a los fjälls de noche sin equipo adecuado.` },
      { title: "Safaris de aurora guiados", content: `Los guías de safari conocen los mejores lugares y monitorizan las previsiones profesionalmente. Un safari de aurora guiado te lleva típicamente 15–30 km del pueblo a ubicaciones extremadamente oscuras.\n\nVentajas:\n• El guía sabe dónde hay menos nubes\n• Transporte organizado\n• Bebidas calientes y snacks en una cabaña\n• Los guías ofrecen fotografía profesional\n\nPrecios típicos: €70–120 por persona. Reserva con antelación, especialmente en temporada alta (diciembre–febrero).` },
      { title: "Consejo — no vayas demasiado lejos", content: `Un error común es conducir una hora buscando el lugar \"perfecto\". En realidad, 2–5 km del centro es suficiente.\n\nMás importante que la distancia absoluta:\n• **Cielo despejado** (revisa el pronóstico de nubes)\n• **Vista abierta** (sin árboles altos ni edificios bloqueando)\n• **Mira hacia el norte** (aurora débil aparece primero baja en el horizonte norte)\n• **Paciencia** (espera al menos 15–30 minutos)` }
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Puedo ver auroras desde el centro de Levi?", a: "Sí, durante tormentas fuertes (KP 5+). Una mejor experiencia se tiene a unos cientos de metros de las farolas." },
        { q: "¿Necesito ir de safari?", a: "No es esencial. Muchos huéspedes ven aurora desde su propio jardín o a corta distancia caminando." },
        { q: "¿Hacia qué dirección debo mirar?", a: "Norte. La aurora débil aparece primero baja en el cielo norte. En tormentas fuertes se extiende por todo el cielo." }
      ]
    },
    readNext: {
      title: "Lee también",
      links: [
        { title: "Auroras boreales en Levi", desc: "Guía completa de aurora", href: "/es/guia/auroras-boreales-levi" },
        { title: "Fotografía de aurora", desc: "Ajustes de cámara y consejos", href: "/es/guia/fotografia-auroras-boreales-levi" },
        { title: "Alojamiento", desc: "Ve auroras desde tu terraza", href: "/es/alojamiento" }
      ]
    }
  },
  fr: {
    meta: {
      title: "Où voir les aurores boréales à Levi — Meilleurs endroits & conseils | Leville.net",
      description: "Meilleurs endroits pour observer les aurores boréales à Levi : loin de la pollution lumineuse, vues ouvertes et points de vue élevés. Conseils locaux.",
      canonical: "https://leville.net/fr/guide/ou-voir-aurores-boreales-levi"
    },
    h1: "Où voir les aurores boréales à Levi — meilleurs endroits",
    breadcrumbLabel: "Où voir les aurores",
    sections: [
      { title: "Principe de base — de quoi avez-vous besoin ?", content: `Pour voir les aurores boréales, il faut trois choses : 1) **un endroit sombre** avec peu de lumière artificielle, 2) **une vue dégagée vers le nord** (l'aurore apparaît le plus souvent dans le ciel nord, mais lors des fortes tempêtes, elle couvre tout le ciel), et 3) **un ciel clair** sans nuages.\n\nDe ces trois facteurs, la couverture nuageuse est celui que vous ne pouvez pas contrôler — mais vous pouvez choisir votre emplacement et votre direction. Bonne nouvelle : à Levi, vous n'avez pas besoin d'aller loin.` },
      { title: "Directement depuis votre hébergement", content: `Beaucoup de nos clients voient les aurores directement depuis la terrasse ou le jardin de leur hébergement. C'est de loin la manière la plus confortable.\n\nUn petit conseil qui fait une grande différence : **éteignez les lumières intérieures**, sortez sur le balcon et attendez que vos yeux s'habituent à l'obscurité (10–15 minutes).` },
      { title: "Près du centre", content: `Pas besoin de conduire loin — une marche de quelques centaines de mètres jusqu'au bord du village vous amène à un endroit nettement plus sombre.\n\n**Dirigez-vous vers :**\n• Rive du lac Immeljärvi — vue ouverte, facilement accessible à pied\n• Direction Sirkkajärvi — grande zone ouverte, peu de bâtiments\n• Direction du fjäll — passez le restaurant Zero Point vers les pentes\n• Pistes de ski de fond — sentiers tout faits vers des zones sombres\n\nUne marche de 5–15 minutes depuis le centre suffit généralement.` },
      { title: "Terrains ouverts et lacs", content: `Les lacs gelés en hiver offrent des vues ouvertes dans toutes les directions. L'aurore se reflète dans la surface de glace et la vue s'étend d'horizon en horizon.\n\n**Immeljärvi** est le plus populaire et le plus facile d'accès — moins de 10 minutes à pied du centre.` },
      { title: "Points élevés", content: `Les pentes et zones sommitales du fjäll offrent la vue la plus large — l'aurore peut s'étendre en un panorama complet de 360°.\n\nLa télécabine de Levi ne fonctionne pas le soir. Avec la voiture, on peut atteindre des sections de route plus élevées avec de vastes panoramas.\n\n**Note de sécurité :** Ne partez pas seul dans les fjälls la nuit sans équipement approprié.` },
      { title: "Safaris d'aurores guidés", content: `Les guides de safari connaissent les meilleurs endroits et surveillent les prévisions professionnellement. Un safari guidé vous emmène typiquement à 15–30 km du village vers des endroits extrêmement sombres.\n\nAvantages :\n• Le guide sait où il y a le moins de nuages\n• Transport organisé\n• Boissons chaudes et collations dans un abri\n• Les guides proposent souvent la photographie professionnelle\n\nPrix typiques : 70–120 € par personne.` },
      { title: "Conseil — n'allez pas trop loin", content: `Une erreur courante est de conduire une heure à la recherche de l'endroit \"parfait\". En réalité, 2–5 km du centre suffit.\n\nPlus important que la distance absolue :\n• **Ciel clair** (vérifiez les prévisions nuageuses)\n• **Vue ouverte** (pas de grands arbres ni bâtiments)\n• **Regardez vers le nord** (l'aurore faible apparaît d'abord basse sur l'horizon nord)\n• **Patience** (attendez au moins 15–30 minutes)` }
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Peut-on voir les aurores depuis le centre de Levi ?", a: "Oui, lors de fortes tempêtes (KP 5+). Une meilleure expérience est à quelques centaines de mètres de l'éclairage public." },
        { q: "Dois-je aller en safari ?", a: "Pas indispensable. Beaucoup de clients voient l'aurore depuis leur jardin ou à courte distance à pied." },
        { q: "Dans quelle direction regarder ?", a: "Nord. L'aurore faible apparaît d'abord basse dans le ciel nord. Lors de fortes tempêtes, elle s'étend sur tout le ciel." }
      ]
    },
    readNext: {
      title: "À lire aussi",
      links: [
        { title: "Aurores boréales à Levi", desc: "Guide complet des aurores", href: "/fr/guide/aurores-boreales-levi" },
        { title: "Photographie d'aurores", desc: "Réglages caméra et conseils", href: "/fr/guide/photographie-aurores-boreales-levi" },
        { title: "Hébergement", desc: "Observez les aurores depuis votre terrasse", href: "/fr/hebergement" }
      ]
    }
  }
};

const WhereToSeeNorthernLightsLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/missa-nahda-revontulet-levi", en: "/guide/where-to-see-northern-lights-levi" };
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
                  {lang === "fi" ? "Monissa majoituksissamme on avoin näkymä pohjoiseen — täydellinen revontulien katseluun." : "Many of our accommodations have an open view to the north — perfect for aurora viewing."}
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

export default WhereToSeeNorthernLightsLevi;
