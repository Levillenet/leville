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
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default NorthernLightsSeasonLevi;
