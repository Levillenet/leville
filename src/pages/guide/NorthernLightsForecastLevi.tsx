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
        { title: "Accommodation", desc: "Book accommodation in Levi", href: "/en/accommodation" }
      ]
    }
  }
};

const NorthernLightsForecastLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
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

export default NorthernLightsForecastLevi;
