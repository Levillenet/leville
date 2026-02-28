import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/utils/structuredData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, Mountain, ArrowRight, Star, Camera, TreePine, Thermometer } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AutumnRuskaProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Ruska Levillä – Syksyn väriloisto | Leville.net",
      description: "Kattava opas Levin ruskaan. Parhaat ruska-ajat, valokuvausvinkit ja syysaktiviteetit syyskuussa. Koe Lapin upea syysväriloisto.",
      canonical: "https://leville.net/opas/syksy-ruska-levi"
    },
    title: "Ruska Levillä",
    subtitle: "Lapin väriloistoa syyskuussa – luonnon oma taideteos",
    intro: "Ruska on yksi Lapin kauneimmista ilmiöistä. Syyskuussa tunturimaisemat värjäytyvät kirkkaan punaisiksi, oransseiksi ja keltaisiksi. Raikas syysilma, hiljainen luonto ja ensimmäiset revontuliyöt tekevät ruskasta ainutlaatuisen ajan vierailla Levillä.",
    sections: {
      conditions: {
        title: "Ruska-ajan olosuhteet",
        stats: [
          { label: "Lämpötilat", value: "+5 – +15°C", icon: "temp" },
          { label: "Ruska-aika", value: "Syyskuu", icon: "leaf" },
          { label: "Revontulet", value: "Kausi alkaa", icon: "sparkles" },
          { label: "Luonto", value: "Värikkäin", icon: "tree" }
        ]
      },
      timing: {
        title: "Parhaat ruska-ajat",
        content: "Ruska alkaa Levillä tyypillisesti syyskuun alussa tuntureiden lakialueilla ja etenee viikon kuluessa alemmas. Intensiivisin ruska on yleensä syyskuun puolivälissä, mutta tarkka ajoitus vaihtelee vuosittain sään mukaan. Ruska kestää noin 2–3 viikkoa."
      },
      colors: {
        title: "Ruskan värit",
        items: [
          { plant: "Tunturikoivu", color: "Kirkkaan keltainen", timing: "Syyskuun alku" },
          { plant: "Mustikka ja puolukka", color: "Syvän punainen", timing: "Syyskuun alku–keskiväli" },
          { plant: "Vaivaiskoivu", color: "Oranssi-punainen", timing: "Syyskuun puoliväli" },
          { plant: "Kataja ja mänty", color: "Tumman vihreä kontrasti", timing: "Koko ruska-ajan" }
        ]
      },
      activities: {
        title: "Ruska-ajan aktiviteetit",
        items: [
          { name: "Vaellus ja patikointi", desc: "Väriloistoa tunturireiteillä" },
          { name: "Valokuvaus", desc: "Mahtavat kuvausmahdollisuudet" },
          { name: "Marjastus", desc: "Mustikkaa ja puolukkaa" },
          { name: "Sienestys", desc: "Suppilovahvero ja tatit" },
          { name: "Revontulien bongaus", desc: "Kausi alkaa syyskuussa" },
          { name: "Kalastus", desc: "Syksyn saaliskaudet" }
        ]
      },
      photography: {
        title: "Valokuvausvinkit",
        tips: [
          "Paras valo on aamulla ja illalla (kultainen tunti)",
          "Käytä polarisaatiosuodinta värien tehostamiseen",
          "Etsi vesielementtejä heijastuksille",
          "Tunturin laelta saat laajat panoraamat",
          "Lähikuvat lehdistä tuovat yksityiskohdat esiin"
        ]
      },
      tips: {
        title: "Vinkit ruska-aikaan",
        items: [
          "Varaa majoitus ajoissa – ruska-aika on suosittu",
          "Pukeudu kerroksittain – sää voi vaihdella",
          "Ota mukaan sadevarusteet – syyskuussa voi sataa",
          "Kumisaappaat ovat hyödylliset kosteilla poluilla",
          "Nauti hiljaisuudesta – turistimassat ovat vähäisiä"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Milloin ruska on parhaimmillaan Levillä?",
          a: "Ruska on tyypillisesti parhaimmillaan syyskuun toisella ja kolmannella viikolla. Tarkka ajoitus vaihtelee vuosittain."
        },
        {
          q: "Voiko revontulia nähdä ruska-aikaan?",
          a: "Kyllä! Revontulikausi alkaa syyskuussa, kun yöt pimenevät. Parhaat mahdollisuudet ovat kirkkaana yönä."
        },
        {
          q: "Miten lämmin syyskuussa on?",
          a: "Syyskuussa lämpötilat ovat tyypillisesti +5 – +15°C päivällä. Öisin voi olla lähellä nollaa."
        },
        {
          q: "Onko ruska-aika sopiva perheille?",
          a: "Ehdottomasti! Helpot vaellusreitit, marjastus ja luonto sopivat koko perheelle."
        }
      ]
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa ruska-majoitus",
      accommodationLink: "/majoitukset"
    },
    breadcrumbLabel: "Ruska Levillä"
  },
  en: {
    meta: {
      title: "Autumn Ruska in Levi – Fall Colors | Leville.net",
      description: "Complete guide to autumn ruska in Levi. Best timing, photography tips and autumn activities in September. Experience Lapland's stunning fall colors.",
      canonical: "https://leville.net/guide/autumn-ruska-in-levi"
    },
    title: "Autumn Ruska in Levi",
    subtitle: "Lapland's fall colors in September – nature's own masterpiece",
    intro: "Ruska is one of Lapland's most beautiful phenomena. In September, the fell landscapes turn bright red, orange, and yellow. Crisp autumn air, peaceful nature, and the first Northern Lights nights make ruska a unique time to visit Levi.",
    sections: {
      conditions: {
        title: "Ruska Season Conditions",
        stats: [
          { label: "Temperatures", value: "+5 – +15°C", icon: "temp" },
          { label: "Ruska time", value: "September", icon: "leaf" },
          { label: "Northern Lights", value: "Season starts", icon: "sparkles" },
          { label: "Nature", value: "Most colorful", icon: "tree" }
        ]
      },
      timing: {
        title: "Best Ruska Times",
        content: "Ruska typically begins in Levi in early September at the fell summits and progresses lower within a week. The most intense ruska is usually in mid-September, but exact timing varies yearly depending on weather. Ruska lasts about 2–3 weeks."
      },
      colors: {
        title: "Ruska Colors",
        items: [
          { plant: "Mountain birch", color: "Bright yellow", timing: "Early September" },
          { plant: "Blueberry and lingonberry", color: "Deep red", timing: "Early to mid-September" },
          { plant: "Dwarf birch", color: "Orange-red", timing: "Mid-September" },
          { plant: "Juniper and pine", color: "Dark green contrast", timing: "Throughout ruska" }
        ]
      },
      activities: {
        title: "Ruska Season Activities",
        items: [
          { name: "Hiking and trekking", desc: "Fall colors on fell trails" },
          { name: "Photography", desc: "Amazing photo opportunities" },
          { name: "Berry picking", desc: "Blueberries and lingonberries" },
          { name: "Mushroom foraging", desc: "Chanterelles and boletes" },
          { name: "Northern Lights hunting", desc: "Season starts in September" },
          { name: "Fishing", desc: "Autumn catch seasons" }
        ]
      },
      photography: {
        title: "Photography Tips",
        tips: [
          "Best light is in morning and evening (golden hour)",
          "Use a polarizing filter to enhance colors",
          "Look for water elements for reflections",
          "Fell summits offer wide panoramas",
          "Close-ups of leaves bring out details"
        ]
      },
      tips: {
        title: "Tips for Ruska Season",
        items: [
          "Book accommodation early – ruska time is popular",
          "Dress in layers – weather can vary",
          "Bring rain gear – September can be rainy",
          "Rubber boots are useful on wet trails",
          "Enjoy the silence – tourist crowds are minimal"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "When is ruska at its best in Levi?",
          a: "Ruska is typically at its best in the second and third weeks of September. Exact timing varies yearly."
        },
        {
          q: "Can you see Northern Lights during ruska?",
          a: "Yes! The aurora season starts in September as nights get darker. Best chances are on clear nights."
        },
        {
          q: "How warm is it in September?",
          a: "September temperatures are typically +5 – +15°C during the day. Nights can be close to zero."
        },
        {
          q: "Is ruska season suitable for families?",
          a: "Absolutely! Easy hiking trails, berry picking, and nature suit the whole family."
        }
      ]
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book autumn accommodation",
      accommodationLink: "/en/accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Hiking & Biking", desc: "Best trails during ruska season", href: "/activities/hiking-and-biking-levi" },
        { title: "Summer in Levi", desc: "What to do before autumn", href: "/guide/summer-in-levi" },
        { title: "Winter in Levi", desc: "What to expect after ruska", href: "/guide/winter-in-levi" },
        { title: "Restaurants & Services", desc: "Autumn dining in Levi", href: "/guide/restaurants-and-services-in-levi" }
      ]
    },
    breadcrumbLabel: "Autumn Ruska in Levi"
  }
};

const AutumnRuskaInLevi = ({ lang = "fi" }: AutumnRuskaProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls = lang === "fi" 
    ? { fi: "/opas/syksy-ruska-levi", en: "/guide/autumn-ruska-in-levi" }
    : { en: "/guide/autumn-ruska-in-levi", fi: "/opas/syksy-ruska-levi" };

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : "/en" },
    { label: lang === "fi" ? "Levi" : "Levi", href: lang === "fi" ? "/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    temp: <Thermometer className="w-5 h-5 text-primary" />,
    leaf: <Leaf className="w-5 h-5 text-primary" />,
    sparkles: <Sparkles className="w-5 h-5 text-primary" />,
    tree: <TreePine className="w-5 h-5 text-primary" />
  };

  return (
    <>
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
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: t.meta.title, description: t.meta.description, url: t.meta.canonical, lang })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: lang === "fi" ? "Etusivu" : "Home", url: `https://leville.net${lang === "fi" ? "/" : "/en"}` },
        { name: lang === "fi" ? "Vuodenajat" : "Seasons", url: `https://leville.net${lang === "fi" ? "/opas/vuodenajat-levi" : "/guide/seasons-in-levi"}` },
        { name: t.title, url: t.meta.canonical }
      ])} />
      <JsonLd data={getFAQSchema(t.faq.items.map(i => ({ question: i.q, answer: i.a })))} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />
        
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Stats */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t.sections.conditions.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.sections.conditions.stats.map((stat, idx) => (
                  <Card key={idx} className="glass-card border-border/30 text-center p-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/20 flex items-center justify-center">
                      {iconMap[stat.icon]}
                    </div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Timing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.timing.title}</h2>
              <p className="text-muted-foreground">{t.sections.timing.content}</p>
            </section>

            {/* Colors */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.colors.title}</h2>
              <div className="space-y-3">
                {t.sections.colors.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/30">
                    <div className="w-36 font-medium text-foreground">{item.plant}</div>
                    <div className="w-36 text-primary font-medium text-sm">{item.color}</div>
                    <div className="text-sm text-muted-foreground">{item.timing}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.sections.activities.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.activities.items.map((activity, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{activity.name}</h3>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Photography Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.photography.title}</h2>
              <ul className="space-y-3">
                {t.sections.photography.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Camera className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.tips.title}</h2>
              <ul className="space-y-3">
                {t.sections.tips.items.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
            <section className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to={t.cta.hubLink}>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  {t.cta.hub}
                </Link>
              </Button>
              <Button asChild>
                <Link to={t.cta.accommodationLink}>
                  {t.cta.accommodation}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
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

export default AutumnRuskaInLevi;
