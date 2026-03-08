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
import { ArrowRight, Heart, Info, Star, TreePine, Sun, Users, Clock } from "lucide-react";
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
      title: "Ratsastus Levillä — Talvi- ja kesäratsastus tunturimaisemissa | Leville.net",
      description: "Ratsastusopas Leville: islanninhevoset lumessa, kesäratsastus tunturireiteillä, kenelle sopii ja miten varata.",
      canonical: "https://leville.net/aktiviteetit/ratsastus-levi"
    },
    h1: "Ratsastus Levillä — hevosen selässä tunturimaisemiin",
    intro: "Islanninhevosten kanssa luonnon hiljaisuuteen — ratsastus on yksi Levin koskettavimmista elämyksistä.",
    sections: {
      lapland: {
        title: "Ratsastus Lapissa",
        content: "Ratsastus Levin ympäristössä on elämys jota harvemmin tulee ajatelleeksi Lappi-lomaa suunnitellessa — mutta se on yksi alueen koskettavimmista kokemuksista. Islanninhevoset ovat pienikokoisia, rauhallisia ja tottuneet arktisiin olosuhteisiin. Ne kulkevat varmasti lumessa ja jäällä, joten aloittelijatkin voivat nauttia turvallisesti."
      },
      winter: {
        title: "Talviratsastus",
        content: "Talvella ratsastetaan lumisissa metsämaisemissa — hevoset kävelevät rauhallisesti polkuja pitkin ja ympärillä on hiljainen, luminen erämaa. Retket kestävät tyypillisesti 1–2 tuntia. Erityiskokemus: iltaratsastus pimeässä otsalamppujen valossa tai revontulien alla. Varusteet (kypärä, tarvittaessa lisävaatteita) sisältyvät yleensä hintaan."
      },
      summer: {
        title: "Kesäratsastus",
        content: "Kesällä reitit kulkevat tunturiniityillä, jokivarsia pitkin ja metsäpoluilla. Pitkät valoisat illat ja keskiyön aurinko tekevät iltaratsastuksesta ainutlaatuisen. Kesällä tarjolla on myös pidempiä retkiä (3–5 h) kokeneemmille ratsastajille."
      },
      who: {
        title: "Kenelle sopii?",
        content: "Ei vaadi aiempaa ratsastuskokemusta — islanninhevoset ovat rauhallisia ja ohjaajat opastavat perusasiat ennen ratsastusta. Ikäsuositukset vaihtelevat tallilla, mutta tyypillisesti noin 7-vuotiaasta ylöspäin. Painoraja on yleensä noin 100 kg."
      },
      practical: {
        title: "Käytännön tiedot",
        items: [
          "Kesto: tyypillisesti 1–2 h talvella, 1–3 h kesällä",
          "Varaa etukäteen — ryhmäkoot ovat pieniä ja paikat täyttyvät sesonkina",
          "Pukeutuminen: lämmin pukeutuminen talvella, kesällä pitkät housut ja tukevat kengät",
          "Kuljetus: talli sijaitsee muutaman kilometrin päässä keskustasta, kuljetus usein järjestettävissä"
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Tarvitseeko osata ratsastaa?", a: "Ei, islanninhevoset ovat rauhallisia. Sopii aloittelijoille." },
        { q: "Voiko ratsastaa talvella?", a: "Kyllä — talviratsastus lumessa on erityisen tunnelmallista." },
        { q: "Sopiiko lapsille?", a: "Kyllä, tyypillisesti noin 7-vuotiaasta ylöspäin." }
      ]
    },
    cta: { text: "Yhdistä ratsastus mukavaan Levi-lomaan.", link: "/majoitukset", button: "Katso majoitukset" },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Kesä Levillä", desc: "Keskiyön aurinko ja luonto", href: "/opas/kesa-levi" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Ratsastus Levillä"
  },
  en: {
    meta: {
      title: "Horse Riding in Levi — Winter & Summer Rides in Fell Landscapes | Leville.net",
      description: "Horse riding guide for Levi: Icelandic horses in the snow, summer rides on fell trails, who it suits and how to book.",
      canonical: "https://leville.net/activities/horse-riding-in-levi"
    },
    h1: "Horse Riding in Levi — Into the Fell Landscapes on Horseback",
    intro: "Ride Icelandic horses into the silence of nature — one of Levi's most touching experiences.",
    sections: {
      lapland: {
        title: "Horse Riding in Lapland",
        content: "Horse riding around Levi is an experience you rarely think of when planning a Lapland holiday — but it's one of the most moving experiences in the region. Icelandic horses are small, calm and accustomed to arctic conditions. They walk confidently in snow and ice, so even beginners can enjoy safely."
      },
      winter: {
        title: "Winter Riding",
        content: "In winter you ride through snowy forest landscapes — horses walk calmly along trails surrounded by silent, snowy wilderness. Rides typically last 1–2 hours. Special experience: evening rides in the dark with headlamps or under the northern lights. Equipment (helmet, extra clothing if needed) is usually included."
      },
      summer: {
        title: "Summer Riding",
        content: "In summer, routes cross fell meadows, riverbanks and forest trails. Long bright evenings and the midnight sun make evening rides unique. Longer rides (3–5 h) are also available in summer for experienced riders."
      },
      who: {
        title: "Who Is It For?",
        content: "No previous riding experience required — Icelandic horses are calm and instructors teach the basics before the ride. Age recommendations vary by stable but typically from about 7 years up. Weight limit is generally around 100 kg."
      },
      practical: {
        title: "Practical Information",
        items: [
          "Duration: typically 1–2 h in winter, 1–3 h in summer",
          "Book in advance — group sizes are small and fill up in peak season",
          "Clothing: warm clothing in winter, long trousers and sturdy shoes in summer",
          "Transport: the stable is a few kilometres from the centre, transport often arrangeable"
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do I need riding experience?", a: "No, Icelandic horses are calm. Suitable for beginners." },
        { q: "Can you ride in winter?", a: "Yes — winter riding in the snow is especially atmospheric." },
        { q: "Is it suitable for children?", a: "Yes, typically from about 7 years of age." }
      ]
    },
    cta: { text: "Combine horse riding with a comfortable Levi holiday.", link: "/en/accommodations", button: "View accommodations" },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Summer in Levi", desc: "Midnight sun and nature", href: "/guide/summer-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Horse Riding in Levi"
  }
};

const HorseRidingLevi = ({ lang = "fi" }: Props) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();
  const customUrls: Record<string, string> = { fi: "/aktiviteetit/ratsastus-levi", en: "/activities/horse-riding-in-levi" };
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

            {/* Lapland */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.lapland.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.lapland.content}</p>
            </section>

            {/* Winter */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.winter.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.winter.content}</p>
            </section>

            {/* Summer */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.summer.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.summer.content}</p>
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

            {/* Practical */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.practical.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.practical.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
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
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            <GuideDisclaimer lang={lang} />

            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
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

export default HorseRidingLevi;
