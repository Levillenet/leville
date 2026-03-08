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
        { title: "Accommodation", desc: "Book accommodation in Levi", href: "/en/accommodation" }
      ]
    }
  }
};

const NorthernLightsColorsExplained = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
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

export default NorthernLightsColorsExplained;
