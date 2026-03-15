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
import { ArrowRight, Heart, Info, Star, UtensilsCrossed, ShoppingCart, Wine, Baby, Clock } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import reindeerStewPots from "@/assets/seasons/reindeer-stew-pots.jpg";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  { q: "Ovatko ravintolat auki jouluaattona?", a: "Osa on, mutta rajatuilla aukioloajoilla. Varaa ehdottomasti etukäteen." },
  { q: "Saako jouluruoka-aineita Levin kaupoista?", a: "Kyllä — kinkkua, laatikoita, torttutaikinaa ym. Tilaa kinkku etukäteen." },
  { q: "Mikä on tunnelmallisin tapa viettää joulua Levillä?", a: "Oma mökki, sauna, kynttilät ja oma jouluruoka. Ravintolajoulu on vaivaton vaihtoehto." }
];

const traditionalFoods = [
  "Joulukinkku (jouluaterian pääruoka)",
  "Laatikot (lanttulaatikko, porkkanalaatikko, perunalaatikko)",
  "Rosolli (punajuuri-perunasalaatti)",
  "Karjalanpiirakat ja munavoi",
  "Joulutortut (luumuhillolla)",
  "Glögi (kuuma maustejuoma)",
  "Piparkakut"
];

const ChristmasDinnerLeviFI = () => {
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/jouluillallinen-levilla",
    en: "/en/guide/christmas-dinner-in-levi"
  };

  const breadcrumbItems = [
    { label: "Etusivu", href: "/" },
    { label: "Opas", href: "/levi" },
    { label: "Jouluillallinen", href: "" }
  ];

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: "Jouluillallinen Levillä", description: "Jouluillallinen Levillä: ravintolat jotka tarjoavat joulupöytää, oman jouluruoan valmistus mökissä ja käytännön vinkit jouluruokailuun.", url: "https://leville.net/opas/jouluillallinen-levilla", lang: "fi" })} />
      <JsonLd data={getFAQSchema(faqItems.map(item => ({ question: item.q, answer: item.a })))} />
      <HreflangTags currentPath={location.pathname} currentLang="fi" customUrls={customUrls} />
      <Helmet>
        <html lang="fi" />
        <title>Jouluillallinen Levillä — Ravintolat, joulupöytä ja vinkit | Leville.net</title>
        <meta name="description" content="Jouluillallinen Levillä: ravintolat jotka tarjoavat joulupöytää, oman jouluruoan valmistus mökissä ja käytännön vinkit jouluruokailuun." />
        <link rel="canonical" href="https://leville.net/opas/jouluillallinen-levilla" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://leville.net/opas/jouluillallinen-levilla" />
        <meta property="og:title" content="Jouluillallinen Levillä — Ravintolat, joulupöytä ja vinkit | Leville.net" />
        <meta property="og:description" content="Jouluillallinen Levillä: ravintolat jotka tarjoavat joulupöytää, oman jouluruoan valmistus mökissä ja käytännön vinkit jouluruokailuun." />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jouluillallinen Levillä — Ravintolat, joulupöytä ja vinkit | Leville.net" />
        <meta name="twitter:description" content="Jouluillallinen Levillä: ravintolat jotka tarjoavat joulupöytää, oman jouluruoan valmistus mökissä ja käytännön vinkit jouluruokailuun." />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Jouluillallinen Levillä — miten viettää joulua tunturissa?
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ravintolan joulupöytä vai oma jouluillallinen mökissä? Molemmat vaihtoehdot toimivat Levillä.
              </p>
            </section>

            {/* Restaurants */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Joulu Levin ravintoloissa</h2>
              </div>
              <p className="text-muted-foreground mb-3">
                Monet Levin ravintolat tarjoavat jouluaikana erityisiä joulumenuja ja joulupöytiä (jouluinen buffet perinteisillä jouluruoilla). Jouluaatto on ravintoloiden suosituin ilta — varaa pöytä viikkoja, mielellään kuukausia etukäteen. Jouluaattona aukioloajat ovat tyypillisesti rajatummat — tarkista aina ravintolasta suoraan.
              </p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">Disclaimer: Ravintoloiden jouluohjelma ja aukioloajat vaihtelevat vuosittain. Tarkista aina etukäteen.</p>
                </div>
              </Card>
            </section>

            {/* Cabin dinner */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Oma jouluillallinen mökissä tai huoneistossa</h2>
              </div>
              <p className="text-muted-foreground mb-3">
                Moni perhe viettää joulun oman majoituksen rauhassa — ja se on usein tunnelmallisin vaihtoehto. Lähikaupasta (K-Market, S-Market) saa jouluruoka-ainekset: kinkkua, laatikoita, rosollia ja joulutorttuaineksia. Joulukinkkua kannattaa tilata etukäteen kaupasta jos haluaa varmistaa saatavuuden.
              </p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">Vinkki: tuo joulukynttilät ja jouluservetit kotoa mukaan — ne tuovat joulumielen mökkiin.</p>
                </div>
              </Card>
            </section>

            {/* Reindeer stew image */}
            <section className="mb-12 rounded-xl overflow-hidden">
              <OptimizedImage src={reindeerStewPots} alt="Poronkäristystä valurautapadoissa perunamuusin kera — klassinen Lapin ateria jonka voi tilata valmiina majoitukseen usealta paikalliselta yritykseltä" className="w-full h-64 sm:h-80 md:h-96 object-cover" />
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                Poronkäristystä valurautapadoissa perunamuusin kera — klassinen Lapin ateria jonka voi tilata valmiina majoitukseen usealta paikalliselta yritykseltä
              </p>
            </section>

            {/* Traditional foods */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Perinteisiä jouluruokia</h2>
              </div>
              <ul className="space-y-3 mb-4">
                {traditionalFoods.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">
                Ulkomaalaisille matkailijoille: suomalainen joulupöytä on maukas ja runsas. Kinkku on keskiössä — ei kalkkunaa kuten monissa muissa maissa.
              </p>
            </section>

            {/* Kids */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Jouluruokailu lasten kanssa</h2>
              </div>
              <p className="text-muted-foreground">
                Lasten kanssa oma mökki on usein paras vaihtoehto — ei kiireitä, omat aikataulut ja tuttu ruoka. Mutta myös ravintoloissa lapset ovat tervetulleita — monissa on oma lastenmenu.
              </p>
            </section>

            {/* Alko */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Wine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Alkon aukioloajat jouluna</h2>
              </div>
              <p className="text-muted-foreground">
                Jouluaattona Alko sulkeutuu aikaisin (tyypillisesti klo 12–13). Joulupäivänä ja tapaninpäivänä Alko on kiinni. Osta joulujuomat hyvissä ajoin!
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Usein kysytyt kysymykset</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="glass-card border border-border/30 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <GuideDisclaimer lang="fi" />

            <ReadNextSection
              title="Lue myös"
              links={[
                { title: "Joulu Lapissa", desc: "Joulu-opas Leville", href: "/levi/joulu-lapissa" },
                { title: "Ravintolat ja palvelut", desc: "Syömään Levillä", href: "/opas/ravintolat-ja-palvelut-levilla" },
                { title: "Joulupukki Levillä", desc: "Missä tavata pukki", href: "/opas/joulupukki-levilla" },
                { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
              ]}
            />

            {/* CTA */}
            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Joulusesonki on Levin suosituinta aikaa — varaa majoitus ajoissa.
                </p>
                <Button asChild>
                  <Link to="/majoitukset">
                    Katso majoitukset
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            </section>
          </div>
        </main>

        <PageCTA lang="fi" />

        <Footer />
        <WhatsAppChat />
        <StickyBookingBar />
      </div>
    </>
  );
};

export default ChristmasDinnerLeviFI;
