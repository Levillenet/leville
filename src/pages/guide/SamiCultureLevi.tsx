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
import { ArrowRight, Heart, Info, Star, Globe, Mountain, HandHeart, MapPin } from "lucide-react";
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
      title: "Saamelaiset ja saamelaiskultuuri Levillä | Leville.net",
      description: "Opas saamelaiskulttuuriin Levillä: Samiland, perinteet, käsityö ja miten kohdata alkuperäiskansaa kunnioittavasti.",
      canonical: "https://leville.net/opas/saamelaiset-levilla"
    },
    h1: "Saamelaiset ja saamelaiskulttuuri Levillä",
    intro: "Euroopan ainoa tunnustettu alkuperäiskansa — saamelainen kulttuuri on läsnä koko Lapissa.",
    sections: {
      who: {
        title: "Kuka saamelaiset ovat?",
        content: "Euroopan ainoa virallisesti tunnustettu alkuperäiskansa. Perinteinen asuinalue (Sápmi) ulottuu Pohjois-Norjan, Ruotsin, Suomen ja Venäjän alueelle. Suomessa saamelaisia noin 10 000. Saamelaisten kotiseutualue on Enontekiön, Inarin, Utsjoen ja Sodankylän pohjoisosan kunnissa. Levi (Kittilän kunta) sijaitsee kotiseutualueen eteläpuolella, mutta saamelainen kulttuuri on läsnä koko Lapissa."
      },
      samiland: {
        title: "Samiland — saamelainen näyttely Levillä",
        content: "Saamelaista kulttuuria esittelevä näyttely Levin tunturin huipulla, pääsy gondolihissillä. Kertoo historiasta, elinkeinoista (poronhoito, kalastus, käsityö), uskomuksista ja nykypäivästä. Pieni mutta informatiivinen, sopii kaikenikäisille.",
        note: "Tarkista aukioloajat etukäteen — ei avoinna ympäri vuoden."
      },
      traditions: {
        title: "Saamelaiset perinteet",
        items: [
          { name: "Poronhoito", desc: "Vuosisatainen elinkeino. Levin porotilat kertovat tästä — vaikka kaikki poronhoitajat eivät ole saamelaisia, perinne on syvältä saamelaista kulttuuria." },
          { name: "Käsityö (duodji)", desc: "Puukot, nahkatyöt, luu- ja sarviesineet, tekstiilit. Varmista aitous — Sámi Duodji -merkki on tae." },
          { name: "Joiku", desc: "Saamelainen laulumuoto. Voi kuulla kulttuuritapahtumissa ja opastettujen retkien yhteydessä." }
        ]
      },
      respect: {
        title: "Kunnioittava kohtaaminen",
        items: [
          "Saamelaiset ovat elävä kansa, eivät museo-eksponaatti",
          "Saamelaispukua (gákti) ei tule pukea päälle ellei sitä nimenomaan tarjota osana kokemusta",
          "Kysy ennen valokuvaamista",
          "Osta aitoa saamelaiskäsityötä — Sámi Duodji -merkki",
          "Ole kiinnostunut ja avoin"
        ]
      },
      otherPlaces: {
        title: "Muita saamelaiskulttuurin kohteita Lapissa",
        items: [
          { name: "Inari", desc: "Saamelaiskeskus Sajos, Saamelaismuseo Siida (noin 3,5 h Leviltä)" },
          { name: "Enontekiö", desc: "Saamelaisten kotiseutualuetta" },
          { name: "Hetta/Kautokeino (Norja)", desc: "Saamelaiskulttuurin sydäntä" }
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Missä voi tutustua saamelaiskulttuuriin Levillä?", a: "Samiland-näyttely tunturilla on helpoin tapa. Myös porotilat kertovat perinteistä." },
        { q: "Onko Levi saamelaista aluetta?", a: "Kotiseutualueen eteläpuolella, mutta kulttuuri on läsnä koko Lapissa." },
        { q: "Miten tunnistaa aidon saamelaiskäsityön?", a: "Sámi Duodji -merkki takaa aitouden." }
      ],
    },
    cta: { text: "Koe Lapin kulttuuri ja luonto — majoitu Levin sydämessä.", link: "/majoitukset", button: "Katso majoitukset" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Vuodenajat Levillä", desc: "Neljä eri Leviä", href: "/opas/vuodenajat-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ],
    },
    breadcrumbLabel: "Saamelaiset Levillä"
  },
  en: {
    meta: {
      title: "Sámi Culture in Levi — History, Traditions & Experiences | Leville.net",
      description: "Guide to Sámi culture in Levi: Samiland exhibition, traditions, handicrafts and respectful engagement.",
      canonical: "https://leville.net/guide/sami-culture-in-levi"
    },
    h1: "Sámi Culture in Levi — History, Traditions and Experiences",
    intro: "Europe's only recognised indigenous people — Sámi culture is present throughout Lapland.",
    sections: {
      who: {
        title: "Who Are the Sámi?",
        content: "Europe's only officially recognised indigenous people. Their traditional homeland (Sápmi) extends across northern Norway, Sweden, Finland and Russia. There are about 10,000 Sámi in Finland. The Sámi homeland area covers the municipalities of Enontekiö, Inari, Utsjoki and northern Sodankylä. Levi (municipality of Kittilä) is south of the homeland area, but Sámi culture is present throughout Lapland."
      },
      samiland: {
        title: "Samiland — Sámi Exhibition in Levi",
        content: "An exhibition showcasing Sámi culture at the top of Levi fell, accessed by gondola lift. It covers history, livelihoods (reindeer herding, fishing, handicrafts), beliefs and the present day. Small but informative, suitable for all ages.",
        note: "Check opening times in advance — not open year-round."
      },
      traditions: {
        title: "Sámi Traditions",
        items: [
          { name: "Reindeer Herding", desc: "A centuries-old livelihood. Levi's reindeer farms tell this story — although not all reindeer herders are Sámi, the tradition is deeply rooted in Sámi culture." },
          { name: "Handicrafts (Duodji)", desc: "Knives, leatherwork, bone and antler objects, textiles. Verify authenticity — the Sámi Duodji mark is a guarantee." },
          { name: "Joiku (Yoik)", desc: "The Sámi singing tradition. Can be heard at cultural events and on guided trips." }
        ]
      },
      respect: {
        title: "Respectful Engagement",
        items: [
          "The Sámi are a living people, not museum exhibits",
          "Do not wear the Sámi traditional costume (gákti) unless specifically offered as part of an experience",
          "Ask before taking photographs",
          "Buy authentic Sámi handicrafts — look for the Sámi Duodji mark",
          "Be curious and open-minded"
        ]
      },
      otherPlaces: {
        title: "Other Sámi Cultural Sites in Lapland",
        items: [
          { name: "Inari", desc: "Sámi Cultural Centre Sajos, Sámi Museum Siida (about 3.5 h from Levi)" },
          { name: "Enontekiö", desc: "Part of the Sámi homeland area" },
          { name: "Hetta/Kautokeino (Norway)", desc: "The heart of Sámi culture" }
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Where can I learn about Sámi culture in Levi?", a: "The Samiland exhibition on the fell is the easiest way. Reindeer farms also share traditions." },
        { q: "Is Levi in Sámi territory?", a: "South of the homeland area, but Sámi culture is present throughout Lapland." },
        { q: "How do I recognise authentic Sámi handicrafts?", a: "The Sámi Duodji mark guarantees authenticity." }
      ],
    },
    cta: { text: "Experience Lapland's culture and nature — stay in the heart of Levi.", link: "/en/accommodations", button: "View accommodations" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Seasons in Levi", desc: "Four different Levis", href: "/guide/seasons-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ],
    },
    breadcrumbLabel: "Sámi Culture in Levi"
  }
};

const SamiCultureLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/opas/saamelaiset-levilla", en: "/guide/sami-culture-in-levi" };
  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Guide" : "Opas", href: lang === "en" ? "/en/levi" : "/levi" },
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

            {/* Who */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.who.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.who.content}</p>
            </section>

            {/* Samiland */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.samiland.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.samiland.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.samiland.note}</p>
                </div>
              </Card>
            </section>

            {/* Traditions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.traditions.title}</h2>
              <div className="space-y-4">
                {t.sections.traditions.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Respect */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.respect.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.respect.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Other places */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.otherPlaces.title}</h2>
              </div>
              <div className="space-y-4">
                {t.sections.otherPlaces.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
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

export default SamiCultureLevi;
