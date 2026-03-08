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
        content: `Moderni puhelin (iPhone 15+, Samsung S24+, Pixel 8+) kuvaa revontulia yllättävän hyvin yötilassa. Puhelimien yökameratekniikka on kehittynyt valtavasti ja tulokset ovat monesti riittäviä sosiaaliseen mediaan ja muistoksi.

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
        content: `**iPhone (15 ja uudemmat):** Yötila (Night Mode) aktivoituu automaattisesti pimeässä. Aseta puhelin jalustalle, avaa kamera ja kosketa näyttöä. Pidä valotus pitkänä — iPhone ehdottaa automaattisesti 10–30 sekunnin valotusta pimeässä. Pidä puhelin täysin vakaana koko valotuksen ajan.

**Android (Samsung, Pixel, jne.):** Käytä joko yötilaa (Night Mode) tai Pro-tilaa. Pro-tilassa aseta ISO 800–3200 ja valotusaika 10–30 sekuntia. Google Pixel -puhelinten astrophotography-tila on erityisen hyvä — se ottaa automaattisesti pitkän valotuksen ja yhdistää useita kuvia.

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
        { q: "Riittääkö puhelin revontulien kuvaamiseen?", a: "Kyllä perustasolle — uusimmat iPhone- ja Android-puhelimet kuvaavat yllättävän hyvin yötilassa. Mutta jalusta on silti välttämätön. Järjestelmäkamera antaa dramaattisesti parempia tuloksia." },
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
      { title: "Do You Need a Camera or Will a Phone Do?", content: `Modern smartphones (iPhone 15+, Samsung S24+, Pixel 8+) photograph aurora surprisingly well in night mode. Phone camera technology has advanced enormously and results are often sufficient for social media and memories.\n\nBut a mirrorless or DSLR camera gives dramatically better results — especially for capturing faint aurora and fine details. If you own one, definitely bring it along.\n\n**Both work** — the most important thing is a tripod. Without a stable base, neither will produce good results during long exposures.` },
      { title: "Essential Gear: Tripod", content: `When photographing northern lights, exposure times are long — 5–25 seconds depending on aurora brightness and camera settings. During this time, the camera must be completely still. Handheld shooting is impossible.\n\nEven a small travel tripod works perfectly. It fits in a suitcase and typically weighs under a kilo. Price is €30–50 — the single best investment for an aurora holiday.\n\nWithout a tripod, you can in an emergency place your phone or camera on snow, a railing, or a fixed surface. But results are unreliable and angles are hard to adjust.\n\n**Tip:** A compact travel tripod fits in your suitcase and costs €30–50. Best investment for an aurora holiday.` },
      { title: "Camera Settings (Mirrorless/DSLR)", content: `Set your camera to manual mode (M) and adjust:\n\n• **ISO: 1600–6400** — Start at 3200 and adjust based on results. Higher ISO = brighter image but more noise. Modern cameras handle ISO 3200 well.\n\n• **Aperture: As wide as possible** — f/2.8 or faster is ideal. This lets the most light reach the sensor. f/4 also works but requires longer exposure or higher ISO.\n\n• **Shutter speed: 8–25 seconds** — Shorter if aurora is moving fast (dancing curtains), longer if aurora is faint and static. Over 25 seconds shows stars as lines due to Earth's rotation.\n\n• **Focus: Manual, set to infinity (∞)** — Autofocus doesn't work in darkness. Switch to manual and set to infinity. Test with a sample shot and check sharpness.\n\n• **White balance: 3500–4000K** — Cool tone brings out aurora green best. Auto white balance also works, but manual gives more consistent results.\n\n• **File format: RAW** if possible — RAW files give significantly more flexibility in post-processing (brightness, colours, contrast).` },
      { title: "Lenses", content: `**Wide-angle (10–24 mm)** is ideal for aurora photography. It allows capturing a wide sky and foreground landscape in the same frame. f/2.8 or faster aperture is best — more light, shorter exposure time.\n\nPopular wide-angle lenses: Samyang/Rokinon 14mm f/2.8, Tokina 11–20mm f/2.8, Sigma 14–24mm f/2.8.\n\n**Kit lens (18–55 mm f/3.5–5.6)** also works — at the widest end (18 mm) results are acceptable. Slower aperture means longer exposure or higher ISO, but decent images are still possible.\n\nFast primes (e.g., 24 mm f/1.4 or 35 mm f/1.8) are excellent for light gathering but focal length limits the field of view.` },
      { title: "Phone Photography", content: `**iPhone (15 and newer):** Night Mode activates automatically in darkness. Place the phone on a tripod, open the camera and tap the screen. Keep exposure long — iPhone automatically suggests 10–30 second exposure in darkness. Keep the phone completely still during the entire exposure.\n\n**Android (Samsung, Pixel, etc.):** Use either Night Mode or Pro Mode. In Pro mode, set ISO 800–3200 and shutter speed 10–30 seconds. Google Pixel's astrophotography mode is particularly good — it automatically takes a long exposure and stacks multiple frames.\n\n**Additional apps:** ProCamera, NightCap Camera or similar apps give more control over ISO, aperture and exposure settings.\n\n**Most important: keep the phone completely still.** Even slight vibration — touching the screen, a gust of wind — ruins the image during long exposure. Use a timer (2–10 second delay) so touching the phone doesn't cause vibration.` },
      { title: "Practical Tips for Cold Weather", content: `**Battery drains rapidly in cold.** Lithium-ion batteries lose capacity in frost — at −20°C a battery may drain 3x faster than at room temperature. Keep a spare battery warm in an inside pocket and swap when needed.\n\n**Condensation danger:** Don't bring cameras or phones directly from freezing temperatures into warm interiors. Warm moist air condenses on cold lenses and electronics, potentially causing damage. Let the camera warm up slowly — for example in a vestibule or inside the camera bag for 15–30 minutes before opening.\n\n**Gloves:** Wear thin liner gloves (touchscreen-compatible) for operating the camera, with thick mittens over them at other times. Frostbitten fingers are a real risk at −20°C.\n\n**Headlamp:** Use red light. Red light doesn't ruin night vision — white or blue light destroys 15 minutes of dark adaptation instantly.` },
      { title: "Composition — The Importance of Foreground", content: `Sky alone is monotonous — include a foreground. A foreground element gives scale, atmosphere and makes the image unique. Around Levi, natural foregrounds are everywhere:\n\n• **Cabin or building** — warm light from windows + aurora = classic Lapland image\n• **Fell silhouette** — the fell outline against the sky\n• **Single tree or tree group** — snow-laden trees are particularly beautiful\n• **Lake ice** — reflections and vastness\n• **Person** — silhouette or flashlight beam gives scale\n\nUse the rule of thirds: horizon in the lower third, sky and aurora in the upper two-thirds. Experiment with different angles and perspectives — a tree or person shot from low down looks dramatic against the aurora sky.` }
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is a phone sufficient for aurora photography?", a: "Yes for basic level — the latest iPhone and Android phones photograph surprisingly well in night mode. But a tripod is still essential. A mirrorless/DSLR camera gives dramatically better results." },
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
  }
};

const NorthernLightsPhotographyLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
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

export default NorthernLightsPhotographyLevi;
