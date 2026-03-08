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
import { ArrowRight, Heart, Info, Star, Snowflake, Thermometer, MapPin, Calendar } from "lucide-react";
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
      title: "Avantouinti Levillä — Suomalainen arktinen elämys | Leville.net",
      description: "Avantouintiopas Leville: mitä odottaa, miten valmistautua ja miksi kannattaa kokeilla. Suomalaista saunakulttuuria parhaimmillaan.",
      canonical: "https://leville.net/aktiviteetit/avantouinti-levi"
    },
    h1: "Avantouinti Levillä — suomalainen arktinen elämys",
    intro: "Pulahdus jäiseen veteen saunan jälkeen — yksi Lapin rohkeimmista ja palkitsevimmista kokemuksista.",
    sections: {
      what: {
        title: "Mitä avantouinti on?",
        content: "Avantouinti on perinteinen suomalainen tapa — jäähän hakataan tai sahataan aukko (avanto) ja pulahdutaan kylmään veteen, tyypillisesti saunan jälkeen. Nopea pulahdus (5–15 sekuntia riittää) ja takaisin lämpöön. Se on osa suomalaista saunakulttuuria ja yksi Lapin arktisimmista kokemuksista."
      },
      feel: {
        title: "Miltä se tuntuu?",
        content: "Ensimmäinen sekunti on shokki — kylmä vesi vie hengityksen hetkeksi. Sitten keho tottuu ja adrenaliini virtaa. Vedestä noustessa tunne on huumaava: iho kihelmöi, olo on energinen ja sen jälkeen tulee syvä rentoutuminen. Monista tulee koukussa jo ensimmäisen kerran jälkeen."
      },
      combo: {
        title: "Avanto ja sauna — yhdistelmä",
        steps: [
          "Lämpiää saunaa 15–20 minuuttia",
          "Kävele avannon luokse (usein vain muutama metri)",
          "Laskeudu veteen rauhallisesti — portaat tai tikkaita",
          "5–15 sekuntia riittää ensimmäisellä kerralla",
          "Takaisin saunaan tai lämpöön",
          "Toista halutessasi"
        ],
        tip: "Vinkki: älä sukella päätä veden alle ensimmäisellä kerralla. Laskeudu rintakehään asti."
      },
      who: {
        title: "Kenelle sopii?",
        content: "Terveille aikuisille joilla ei ole sydän- tai verisuonisairauksia. Vaatii rohkeutta mutta ei kuntoa — pulahdus on lyhyt. Ei suositella raskaana oleville eikä pienille lapsille. Jos sinulla on terveyshuolia, konsultoi lääkäriä ennen kokeilua."
      },
      where: {
        title: "Missä Levillä?",
        content: "Avantouintimahdollisuuksia on järvien rannoilla ja joidenkin hotellien/mökkien yhteydessä. Kysy majoittajalta lähimmästä avantopaikasta. Opastettuja avantouintielämyksiä on myös saatavilla — ne sisältävät saunan, ohjeet ja turvallisen ympäristön."
      },
      when: {
        title: "Milloin?",
        content: "Talvielämys — mahdollista kun jäät ovat tarpeeksi paksut (tyypillisesti joulukuusta huhtikuuhun). Pimeässä ja revontulien alla avantouinti on erityisen tunnelmallista."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Onko avantouinti vaarallista?", a: "Ei terveelle ihmiselle. Aloita lyhyellä pulahduksella. Sydänongelmista kärsivien kannattaa kysyä lääkäriltä." },
        { q: "Tarvitseeko uimataitoa?", a: "Ei — avanto on matala ja portailla laskeudutaan. Et ui, vaan pulahdut." },
        { q: "Miten pitkään vedessä ollaan?", a: "5–15 sekuntia riittää. Kokeneemmat voivat olla minuutin, mutta ensikertalaisille lyhyt pulahdus on paras." }
      ]
    },
    cta: { text: "Yhdistä avantouinti omaan saunaan majoituksessa.", link: "/majoitukset", button: "Katso majoitukset" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Sauna Levillä", desc: "Suomalainen saunakulttuuri", href: "/opas/sauna-levilla" },
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Talvi Levillä", desc: "Lumi, kaamos ja revontulet", href: "/opas/talvi-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Avantouinti Levillä"
  },
  en: {
    meta: {
      title: "Ice Swimming in Levi — A Finnish Arctic Experience | Leville.net",
      description: "Ice swimming guide for Levi: what to expect, how to prepare and why you should try it. Finnish sauna culture at its best.",
      canonical: "https://leville.net/activities/ice-swimming-in-levi"
    },
    h1: "Ice Swimming in Levi — A Finnish Arctic Experience",
    intro: "A dip into icy water after sauna — one of Lapland's bravest and most rewarding experiences.",
    sections: {
      what: {
        title: "What Is Ice Swimming?",
        content: "Ice swimming is a traditional Finnish practice — a hole (avanto) is cut or sawed into the ice and you plunge into the cold water, typically after sauna. A quick dip (5–15 seconds is enough) and back to warmth. It's part of Finnish sauna culture and one of Lapland's most arctic experiences."
      },
      feel: {
        title: "What Does It Feel Like?",
        content: "The first second is a shock — the cold water takes your breath for a moment. Then the body adjusts and adrenaline flows. Getting out of the water feels euphoric: skin tingles, you feel energised and then comes deep relaxation. Many get hooked after the very first time."
      },
      combo: {
        title: "Ice Hole and Sauna — The Combination",
        steps: [
          "Warm up in sauna for 15–20 minutes",
          "Walk to the ice hole (often just a few metres away)",
          "Lower yourself into the water calmly — stairs or ladder",
          "5–15 seconds is enough for the first time",
          "Back to sauna or warmth",
          "Repeat if you wish"
        ],
        tip: "Tip: don't submerge your head under water the first time. Lower yourself to chest level."
      },
      who: {
        title: "Who Is It For?",
        content: "Healthy adults without heart or cardiovascular conditions. It requires courage but not fitness — the dip is short. Not recommended for pregnant women or small children. If you have health concerns, consult a doctor before trying."
      },
      where: {
        title: "Where in Levi?",
        content: "Ice swimming spots are available on lake shores and at some hotels/cabins. Ask your host about the nearest spot. Guided ice swimming experiences are also available — they include sauna, instructions and a safe environment."
      },
      when: {
        title: "When?",
        content: "A winter experience — possible when the ice is thick enough (typically December to April). Ice swimming in the dark and under the northern lights is especially atmospheric."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is ice swimming dangerous?", a: "Not for healthy people. Start with a short dip. Those with heart problems should consult a doctor." },
        { q: "Do I need to know how to swim?", a: "No — the hole is shallow and you descend via stairs. You dip, not swim." },
        { q: "How long do you stay in the water?", a: "5–15 seconds is enough. Experienced swimmers may stay a minute, but a short dip is best for first-timers." }
      ]
    },
    cta: { text: "Combine ice swimming with your own private sauna.", link: "/en/accommodations", button: "View accommodations" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Sauna in Levi", desc: "Finnish sauna culture", href: "/guide/finnish-sauna-in-levi" },
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Winter in Levi", desc: "Snow, polar night and auroras", href: "/guide/winter-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Ice Swimming in Levi"
  }
};

const IceSwimmingLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/aktiviteetit/avantouinti-levi", en: "/activities/ice-swimming-in-levi" };
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Activities" : "Aktiviteetit", href: lang === "en" ? "/en/levi" : "/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.h1, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getFAQSchema(t.faq.items.map(i => ({ question: i.q, answer: i.a })))} />
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
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* What */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.what.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.what.content}</p>
            </section>

            {/* Feel */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.feel.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.feel.content}</p>
            </section>

            {/* Combo steps */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.combo.title}</h2>
              </div>
              <ol className="space-y-3 mb-4 list-decimal list-inside">
                {t.sections.combo.steps.map((step, idx) => (
                  <li key={idx} className="text-muted-foreground">{step}</li>
                ))}
              </ol>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.combo.tip}</p>
                </div>
              </Card>
            </section>

            {/* Who */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.who.title}</h2>
              <p className="text-muted-foreground">{t.sections.who.content}</p>
            </section>

            {/* Where */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.where.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.where.content}</p>
            </section>

            {/* When */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.when.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.when.content}</p>
            </section>

            {/* FAQ */}
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

            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                <Button asChild>
                  <Link to={t.cta.link}>{t.cta.button}<ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </Card>
            </section>
          </div>
        </main>

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default IceSwimmingLevi;
