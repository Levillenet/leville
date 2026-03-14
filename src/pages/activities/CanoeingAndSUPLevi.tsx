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
import { ArrowRight, Heart, Info, Star, Waves, Sun, Users, Calendar } from "lucide-react";
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
      title: "Melonta ja SUP Levillä — Kesäaktiviteetit vesillä | Leville.net",
      description: "Melonta- ja SUP-opas Leville: Ounasjoki, Immeljärvi, vuokraus ja reitit. Kesäaktiviteetit keskiyön auringon alla.",
      canonical: "https://leville.net/aktiviteetit/melonta-ja-sup-levi"
    },
    h1: "Melonta ja SUP Levillä — vesillä keskiyön auringon alla",
    intro: "Ounasjoki, Immeljärvi ja Sirkkajärvi tarjoavat upeat puitteet melonnalle ja SUP-lautailulle.",
    sections: {
      waters: {
        title: "Vesistöt Levin ympäristössä",
        items: [
          { name: "Ounasjoki", desc: "Lapin suurimpia vapaana virtaavia jokia. Rauhallinen virta, kauniit jokivarsimaisemat. Pidemmät melontareitit mahdollisia." },
          { name: "Immeljärvi", desc: "Aivan keskustan kupeessa. Rauhallinen, helppo päästä, sopii aloittelijoille ja SUP:ille. Rannalla Saunabar-ravintola kesällä." },
          { name: "Sirkkajärvi", desc: "Rauhallisempi vaihtoehto lähellä keskustaa." }
        ]
      },
      sup: {
        title: "SUP-lautailu",
        content: "SUP on suosittu ja helppo kesäaktiviteetti. Seisot laudalla ja melot — tasapaino tulee nopeasti. Immeljärvi on täydellinen SUP-paikka: tyyntä vettä ja kaunis maisema. Lautoja vuokraa rannalta tai välinevuokraamoista.",
        tip: "Vinkki: kokeile SUP:ia iltamyöhällä keskiyön auringon aikaan — tyyntä vettä ja kultaista valoa."
      },
      canoeing: {
        title: "Melonta",
        content: "Kanoottimelonta Ounasjoella on rauhallinen tapa tutustua Lapin luontoon. Virtaus on lempeä ja sopii aloittelijoille. Opastettuja retkiä tarjolla — varusteet sisältyvät. Myös pidemmät 2–3 päivän melontavaellukset mahdollisia kokeneemmille."
      },
      who: {
        title: "Kenelle sopii?",
        content: "SUP: kaikille jotka osaavat uida, helppoa oppia. Lapsille noin 10 v+. Melonta: peruskunto riittää, perhemelonta mahdollista (lapset kanootin keskellä). Kelluntaliivi pakollinen."
      },
      season: {
        title: "Kausi ja olosuhteet",
        content: "Kesäkuusta syyskuuhun. Paras heinä–elokuu (lämpimin vesi, keskiyön aurinko). Syyskuussa ruskavärit heijastuvat veteen."
      },
      rental: {
        title: "Vuokraus ja opastetut retket",
        content: "SUP-lautoja, kanootteja ja kajakkeja vuokraamoista ja rannan palvelupisteistä. Opastettuja retkiä eri pituisina. Varusteet (mela, liivi) sisältyvät."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Tarvitseeko omia varusteita?", a: "Ei, vuokraat paikan päältä. Liivit sisältyvät." },
        { q: "Onko vesi kylmää?", a: "Kyllä, Lapin vedet viileitä myös kesällä. Kelluntaliivi aina pakollinen." },
        { q: "Sopiiko lapsille?", a: "Melonta perheille kyllä. SUP noin 10 v+. Uimataito vaaditaan." }
      ]
    },
    cta: { text: "Kesäloma Levillä — vesillä, tunturissa ja keskiyön auringossa.", link: "/majoitukset", button: "Katso majoitukset" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Kesä Levillä", desc: "Keskiyön aurinko ja luonto", href: "/opas/kesa-levi" },
        { title: "Vaellus ja pyöräily", desc: "Tunturireitit ja polut", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Melonta ja SUP"
  },
  en: {
    meta: {
      title: "Canoeing & SUP in Levi — Summer Water Activities | Leville.net",
      description: "Canoeing and SUP guide for Levi: Ounasjoki river, Lake Immeljärvi, rental and routes. Summer activities under the midnight sun.",
      canonical: "https://leville.net/activities/canoeing-and-sup-levi"
    },
    h1: "Canoeing and SUP in Levi — On the Water Under the Midnight Sun",
    intro: "Ounasjoki river, Lake Immeljärvi and Sirkkajärvi offer perfect settings for paddling and SUP.",
    sections: {
      waters: {
        title: "Waters Around Levi",
        items: [
          { name: "Ounasjoki River", desc: "One of Lapland's largest free-flowing rivers. Calm current, beautiful riverside scenery. Longer canoe routes possible." },
          { name: "Lake Immeljärvi", desc: "Right next to the centre. Calm, easy to access, ideal for beginners and SUP. Saunabar restaurant on the shore in summer." },
          { name: "Lake Sirkkajärvi", desc: "A quieter alternative close to the centre." }
        ]
      },
      sup: {
        title: "Stand-Up Paddleboarding (SUP)",
        content: "SUP is a popular and easy summer activity. You stand on a board and paddle — balance comes quickly. Lake Immeljärvi is the perfect SUP spot: calm water and beautiful scenery. Boards can be rented from the shore or equipment rental shops.",
        tip: "Tip: try SUP late in the evening during midnight sun — calm water and golden light."
      },
      canoeing: {
        title: "Canoeing",
        content: "Canoeing on Ounasjoki is a peaceful way to explore Lapland's nature. The current is gentle and suitable for beginners. Guided trips available — equipment included. Longer 2–3 day canoe expeditions also possible for experienced paddlers."
      },
      who: {
        title: "Who Is It For?",
        content: "SUP: anyone who can swim, easy to learn. Children about 10+. Canoeing: basic fitness is enough, family canoeing possible (children in the middle of the canoe). Life jacket mandatory."
      },
      season: {
        title: "Season and Conditions",
        content: "June to September. Best in July–August (warmest water, midnight sun). In September, autumn colours reflect in the water."
      },
      rental: {
        title: "Rental and Guided Trips",
        content: "SUP boards, canoes and kayaks from rental shops and lakeside service points. Guided trips of various lengths. Equipment (paddle, life jacket) included."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need my own equipment?", a: "No, you rent on site. Life jackets are included." },
        { q: "Is the water cold?", a: "Yes, Lapland's waters are cool even in summer. Life jacket always mandatory." },
        { q: "Is it suitable for children?", a: "Canoeing for families yes. SUP from about age 10. Swimming ability required." }
      ]
    },
    cta: { text: "Summer holiday in Levi — on the water, on the fell and under the midnight sun.", link: "/en/accommodations", button: "View accommodations" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Summer in Levi", desc: "Midnight sun and nature", href: "/guide/summer-in-levi" },
        { title: "Hiking & Biking", desc: "Fell trails and routes", href: "/activities/hiking-and-biking-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Canoeing & SUP"
  }
};

const CanoeingAndSUPLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/aktiviteetit/melonta-ja-sup-levi", en: "/activities/canoeing-and-sup-levi" };
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

            {/* Waters */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.waters.title}</h2>
              </div>
              <div className="space-y-4">
                {t.sections.waters.items.map((w, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{w.name}</h3>
                    <p className="text-sm text-muted-foreground">{w.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* SUP */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.sup.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.sup.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.sup.tip}</p>
                </div>
              </Card>
            </section>

            {/* Canoeing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.canoeing.title}</h2>
              <p className="text-muted-foreground">{t.sections.canoeing.content}</p>
            </section>

            {/* Who */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.who.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.who.content}</p>
            </section>

            {/* Season */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.season.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.season.content}</p>
            </section>

            {/* Rental */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.rental.title}</h2>
              <p className="text-muted-foreground">{t.sections.rental.content}</p>
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

            <GuideDisclaimer lang={lang} />

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

        <PageCTA lang={lang} />

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default CanoeingAndSUPLevi;
