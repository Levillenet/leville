import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  }
};

const WhereToSeeNorthernLightsLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
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
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default WhereToSeeNorthernLightsLevi;
