import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import PageCTA from "@/components/PageCTA";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, MapPin, Snowflake, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import { Language } from "@/translations";

interface Props {
  lang?: Language;
}

const content = {
  fi: {
    title: `Vuokramökit Levillä ${new Date().getFullYear()} – mökkivuokraus Levin keskustassa | Leville.net`,
    description: "Vuokramökit Levillä suoraan omistajalta – saunallisia mökkejä ja huoneistoja Levin keskustassa kävelymatkan päässä rinteistä. Mökkivuokraus ilman välityspalkkioita.",
    canonical: "https://leville.net/opas/vuokramokit-levi",
    h1: "Vuokramökit Levillä – mökkivuokraus ja mökit Levin keskustassa",
    intro: "Etsitkö vuokramökkiä Leviltä? Vuokramökit Levillä ovat suosituin tapa majoittua Lapissa – ja Levin keskustassa on tarjolla sekä perinteisiä hirsimökkejä että moderneja mökkihuoneistoja. Mökkivuokraus suoraan omistajalta on huoletonta: ei välityspalkkioita, joustavat peruutusehdot ja suora yhteys omistajaan. Tämä opas auttaa löytämään oikean mökin – studiokoosta 14 hengen hirsihuvilaan.",
    sectionsTitle: "Mökkityypit Levillä",
    sections: [
      {
        icon: Home,
        title: "Vuokrahuoneistot ja mökkihuoneistot",
        text: "Modernit huoneistot Levin keskustassa, joissa on omat saunat, täysin varustellut keittiöt ja parvekkeet. Sopivat 2–10 hengen seurueille. Kävelymatka rinteille ja palveluille tekee näistä Levin suosituimman vaihtoehdon perheille ja pareille.",
      },
      {
        icon: Snowflake,
        title: "Hirsimökit ja chaletit",
        text: "Perinteiset hirsirakenteiset mökit ulkoporealtailla ja takoilla. Tarjoavat tunnelmaa ja yksityisyyttä. Esimerkiksi Karhupirtti majoittaa jopa 14 henkeä – ihanteellinen suuremmille seurueille tai sukutapaamisille.",
      },
      {
        icon: Users,
        title: "Ryhmä- ja yritysmökit",
        text: "Levi Glacierin alppihuoneistoja voi varata jopa 10 yhtaikaa – koko talo yhdelle ryhmälle. Ihanteellinen urheiluseuroille, yritysretkille ja isommille perhetapahtumille.",
      },
    ],
    whyDirectTitle: "Miksi mökkivuokraus suoraan?",
    whyDirect: [
      "Ei välityspalkkioita – maksat vain mökistä, et kolmannelle osapuolelle",
      "Suora yhteys omistajaan – kysymyksiin saa nopean vastauksen",
      "Joustavammat peruutusehdot kuin monilla välitysportaaleilla (60 päivää)",
      "Maksu suomalaisen Paytrailin kautta – turvallista ja tuttua",
    ],
    locationTitle: "Sijainti: kaikki kohteet Levin keskustassa",
    locationText: "Kaikki 27 vuokrakohdettamme sijaitsevat Levin keskustassa kävelymatkan päässä rinteistä, ravintoloista ja palveluista. Et tarvitse autoa lomasi aikana – kaikki tarpeellinen on muutaman korttelin säteellä.",
    faqTitle: "Usein kysyttyä mökkivuokrauksesta Levillä",
    faqs: [
      {
        q: "Mihin aikaan kannattaa varata vuokramökki Leviltä?",
        a: "Joulu, hiihtolomaviikot (8–10) ja ruska varataan usein 6–12 kuukautta etukäteen. Marraskuulle ja huhtikuulle saa vapaita mökkejä lyhyemmälläkin varoitusajalla, ja hinnat ovat alhaisemmat.",
      },
      {
        q: "Mitä vuokramökin hinta sisältää?",
        a: "Hintaan kuuluu yleensä mökki, sähkö, vesi, lämmitys ja peruskalusteet. Liinavaatteet, pyyhkeet ja loppusiivous voivat olla lisämaksullisia – tarkista kohteen varausehdot. Pantti (100–300 €) palautetaan, kun mökki jätetään siistinä.",
      },
      {
        q: "Onko mökeissä saunat?",
        a: "Käytännössä kaikissa Levin vuokramökeissä ja -huoneistoissamme on oma sauna. Pienissä studio-huoneistoissa sauna voi olla yhteinen.",
      },
      {
        q: "Voiko mökin varata isolle ryhmälle?",
        a: "Kyllä. Karhupirtti majoittaa 14 henkeä yhdessä mökissä. Levi Glacierista voi varata 4–10 alppihuoneistoa yhtaikaa, jolloin koko talo on ryhmänne käytössä – yhteensä jopa 100 henkeä.",
      },
    ],
    ctaTitle: "Katso kaikki vuokramökit ja huoneistot",
    ctaText: "Vertaile 27 vuokrakohdetta hintojen ja vapaiden päivien mukaan",
    ctaLink: "/majoitukset",
  },
  en: {
    title: `Cabin Rental in Levi – Cabins in Levi Centre ${new Date().getFullYear()}`,
    description: "Rental cabins and apartment-cabins in Levi centre, walking distance from slopes. Direct cabin rental without booking fees – 27 properties.",
    canonical: "https://leville.net/en/guides/cabins-in-levi",
    h1: "Cabin Rental in Levi – Cabins and Apartments in Levi Centre",
    intro: "Looking for a rental cabin in Levi? Levi centre offers both modern apartment-cabins and traditional log cabins, perfect for couples and larger groups alike. This guide helps you pick the right cabin – and explains why renting directly from the owner is often the most carefree way to book.",
    sectionsTitle: "Cabin types in Levi",
    sections: [
      {
        icon: Home,
        title: "Rental apartments and apartment-cabins",
        text: "Modern apartments in Levi centre with private saunas, fully equipped kitchens and balconies. Suitable for 2–10 people. Walking distance to slopes and services makes these Levi's most popular choice for families and couples.",
      },
      {
        icon: Snowflake,
        title: "Log cabins and chalets",
        text: "Traditional log cabins with outdoor hot tubs and fireplaces. Atmospheric and private. For example, Bear Lodge sleeps up to 14 – ideal for larger groups or family reunions.",
      },
      {
        icon: Users,
        title: "Group and corporate cabins",
        text: "You can book up to 10 Levi Glacier alpine apartments at once – the whole building for a single group. Ideal for sports clubs, corporate retreats and large family events.",
      },
    ],
    whyDirectTitle: "Why book direct?",
    whyDirect: [
      "No booking fees – you pay only for the cabin, not a third party",
      "Direct contact with the owner – fast answers to your questions",
      "Flexible cancellation policy compared to many booking portals (60 days)",
      "Payment via Finnish Paytrail – safe and familiar",
    ],
    locationTitle: "Location: all properties in Levi centre",
    locationText: "All 27 of our rental properties are in Levi centre, within walking distance of slopes, restaurants and services. You don't need a car during your stay – everything is within a few blocks.",
    faqTitle: "Cabin rental in Levi – FAQ",
    faqs: [
      {
        q: "When should I book a rental cabin in Levi?",
        a: "Christmas, ski holiday weeks (8–10) and autumn ruska are often booked 6–12 months in advance. November and April have more availability and lower prices.",
      },
      {
        q: "What does the cabin price include?",
        a: "The price normally covers the cabin, electricity, water, heating and basic furnishings. Linens, towels and final cleaning may cost extra – check the property terms. A deposit (€100–300) is refunded when the cabin is left clean.",
      },
      {
        q: "Do the cabins have saunas?",
        a: "Practically all our rental cabins and apartments in Levi have a private sauna. Small studio apartments may have a shared sauna.",
      },
      {
        q: "Can I book a cabin for a large group?",
        a: "Yes. Bear Lodge sleeps 14 in a single cabin. At Levi Glacier you can book 4–10 alpine apartments at once – the whole building for your group, up to 100 people.",
      },
    ],
    ctaTitle: "See all rental cabins and apartments",
    ctaText: "Compare 27 properties by price and availability",
    ctaLink: "/en/accommodations",
  },
};

const VuokraMokitLevi = ({ lang = "fi" }: Props) => {
  const c = content[lang === "en" ? "en" : "fi"];
  const path = lang === "en" ? "/en/guides/cabins-in-levi" : "/opas/vuokramokit-levi";
  const isEn = lang === "en";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Etusivu", item: "https://leville.net" },
      { "@type": "ListItem", position: 2, name: isEn ? "Guides" : "Opas", item: isEn ? "https://leville.net/en/guides" : "https://leville.net/opas" },
      { "@type": "ListItem", position: 3, name: c.h1, item: `https://leville.net${path}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={c.title}
        description={c.description}
        canonicalUrl={c.canonical}
        lang={lang}
        ogType="article"
      />
      <HreflangTags currentPath={path} currentLang={lang} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <SubpageBackground />
      <Header />

      <Breadcrumbs
        lang={lang}
        items={[
          { label: isEn ? "Guides" : "Opas", href: isEn ? "/en/guides" : "/opas" },
          { label: c.h1, href: path },
        ]}
      />

      <main className="container mx-auto px-4 pb-16 max-w-3xl">
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c.h1}</h1>
          <p className="text-lg text-foreground/80 leading-relaxed">{c.intro}</p>
        </section>

        <Link to={c.ctaLink} className="block mb-12 group">
          <Card className="bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{c.ctaTitle}</p>
                <p className="text-sm text-foreground/70 mt-1">{c.ctaText} →</p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">{c.sectionsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.sections.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-5 border-border/40">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.text}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">{c.whyDirectTitle}</h2>
          <ul className="space-y-3">
            {c.whyDirect.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" /> {c.locationTitle}
          </h2>
          <p className="text-foreground/80 leading-relaxed">{c.locationText}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">{c.faqTitle}</h2>
          <Accordion type="single" collapsible className="w-full">
            {c.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <PageCTA lang={lang} />
      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default VuokraMokitLevi;
