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
import { Home, Building2, ArrowRight, Info, Users, MapPin, Euro, Snowflake, Heart, TreePine } from "lucide-react";
import ReadNextSection from "@/components/guide/ReadNextSection";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CabinVsApartmentLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Mökki vai huoneisto Levillä? Vertailu ja vinkit | Leville.net",
      description: "Kumpi sopii sinulle — mökki vai lomahuoneisto Levillä? Vertailemme eroja, hintatasoa ja sijaintia. Rehellinen opas paikalliselta majoittajalta.",
      canonical: "https://leville.net/opas/mokki-vai-huoneisto-levi"
    },
    h1: "Mökki vai huoneisto Levillä — kumpi sopii sinulle?",
    intro: "Levillä majoitusvaihtoehtoja on paljon: perinteisistä kelomökeistä moderneihin lomahuoneistoihin. Tämä opas vertailee majoitustyyppejä rehellisesti ja auttaa sinua valitsemaan juuri sinulle sopivan vaihtoehdon.",
    sections: {
      important: {
        title: "Tärkeä asia heti alkuun",
        content: "Sekä mökkejä että huoneistoja löytyy ympäri Leviä. Huoneisto ei aina tarkoita keskustaa, eikä mökki aina tarkoita syrjäistä sijaintia. Kelorakassa voi kävellä mökistä Hullu Porolle viidessä minuutissa, ja huoneistoja löytyy myös Rakkavaarasta kauempana keskustasta. Vertaillaan ensin majoitustyyppejä sijainnista riippumatta — ja sitten puhutaan sijainnista erikseen."
      },
      comparison: {
        title: "Mökki ja huoneisto vertailussa",
        cabin: {
          label: "Mökki",
          items: [
            { label: "Tyypillinen koko", value: "60–200 m²" },
            { label: "Makuuhuoneet", value: "2–5" },
            { label: "Sauna", value: "Lähes aina oma" },
            { label: "Takka", value: "Lähes aina" },
            { label: "Oma piha", value: "Kyllä" },
            { label: "Yksityisyys", value: "Erillinen rakennus" },
            { label: "Pysäköinti", value: "Yleensä oma" },
            { label: "Henkilömäärä", value: "4–12" },
            { label: "Hintataso", value: "€€€" },
          ]
        },
        apartment: {
          label: "Huoneisto",
          items: [
            { label: "Tyypillinen koko", value: "30–80 m²" },
            { label: "Makuuhuoneet", value: "1–2 + parvi" },
            { label: "Sauna", value: "Useimmissa oma sähkösauna" },
            { label: "Takka", value: "Joskus" },
            { label: "Oma piha", value: "Ei yleensä" },
            { label: "Yksityisyys", value: "Naapurit seinän takana" },
            { label: "Pysäköinti", value: "Yhteisparkki" },
            { label: "Henkilömäärä", value: "2–6" },
            { label: "Hintataso", value: "€–€€" },
          ]
        }
      },
      cabinBest: {
        title: "Milloin mökki on oikea valinta?",
        points: [
          "Iso porukka — perhe + isovanhemmat, kaveriporukka",
          "Oma piha — talvella lumileikit, kesällä grillaus",
          "Takka — iso osa tunnelmaa + lisälämmitys",
          "Hiihtoladut ja kelkkareitit usein ovelta",
          "Kelomökki on kokemus itsessään"
        ],
        notes: "Huomioitavaa: hinta korkeampi mutta henkeä kohti usein kohtuullinen, joissain mökeissä lisälämmitys puilla, kauempana keskustasta auto voi olla tarpeen."
      },
      apartmentBest: {
        title: "Milloin huoneisto on parempi valinta?",
        points: [
          "Pariskunnat, pienet ryhmät, budjettitietoiset",
          "Edullisempi — tyypillisesti 30–50 % vähemmän",
          "Helppo ja huoleton — ei lämmityshuolta",
          "Monissa aivan palveluiden vieressä",
          "Useimmissa oma sauna",
          "Hyvä lähtökohta aktiiviselle lomalle"
        ],
        notes: "Huomioitavaa: seinänaapurit, ei omaa pihaa, parkkipaikka yhteinen, tilaa vähemmän."
      },
      location: {
        title: "Entä sijainti?",
        content: "Levin tunturikylä on kompakti. Keskustana liikenneympyrä — kaupat, ravintolat, eturinteet (Zero Point). Yleissääntö: lähempänä keskustaa = helpompaa ilman autoa mutta kalliimpaa, kauempana = enemmän rauhaa ja edullisempaa mutta auto tai suksibussi tarpeen. Suksibussi kulkee talvikaudella kahdella reitillä.",
        tip: "Vinkki: katso aina kartalta etäisyys liikenneympyrään."
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Onko mökki vai huoneisto halvempi?", a: "Huoneisto on tyypillisesti edullisempi, mutta isolla porukalla mökin hinta henkeä kohti voi olla lähellä huoneistoa." },
        { q: "Onko kaikissa mökeissä sauna?", a: "Lähes kaikissa — sauna on standardi Levillä. Useimmissa huoneistoissakin on oma sähkösauna." },
        { q: "Mitä tarkoittaa kelomökki?", a: "Kelomökki on rakennettu pystyyn kuolleesta, luonnollisesti kuivuneesta männystä. Harmaata, kaunista ja kestävää puuta." },
        { q: "Tarvitseenko auton?", a: "Keskustan läheisyydessä ei. Kauempana auto tai suksibussi on käytännössä välttämätön." },
        { q: "Mikä alue sopii lapsiperheelle?", a: "Alueet joissa ladut ja reitit ovat lähellä, rauhallinen ympäristö ja kohtuullinen etäisyys palveluihin. Ota yhteyttä — autamme valinnassa." }
      ]
    },
    cta: {
      text: "Tarvitsetko apua valinnassa? Ota yhteyttä — autamme mielellämme löytämään juuri sinulle sopivan majoituksen.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Majoitukset Levillä", desc: "Kaikki mökkimme ja huoneistomme", href: "/majoitukset" },
        { title: "Hinnat Levillä", desc: "Mitä Lapin loma maksaa?", href: "/opas/hinnat-levilla" },
        { title: "Liikkuminen Levillä", desc: "Skibussit, taksit ja autot", href: "/opas/liikkuminen-levilla" },
        { title: "Levi ilman autoa", desc: "Onko se mahdollista?", href: "/opas/levi-ilman-autoa" },
        { title: "Lapsiperheet Levillä", desc: "Vinkit perheen lomaan", href: "/opas/lapsiperheet-levilla" },
        { title: "Laskettelu Levillä", desc: "43 rinnettä ja vinkit", href: "/opas/laskettelu-levi" }
      ]
    },
    breadcrumbLabel: "Mökki vai huoneisto"
  },
  en: {
    meta: {
      title: "Cabin vs Apartment in Levi? Honest Comparison & Tips | Leville.net",
      description: "Which is better for your Levi holiday — a log cabin or a holiday apartment? We compare the differences, price levels and locations.",
      canonical: "https://leville.net/guide/cabin-vs-apartment-in-levi"
    },
    h1: "Cabin vs Apartment in Levi — Which One Suits You?",
    intro: "Levi offers a wide range of accommodation: from traditional log cabins to modern holiday apartments. This guide compares the options honestly and helps you find the right fit for your holiday.",
    sections: {
      important: {
        title: "An Important Note First",
        content: "Both cabins and apartments can be found all around Levi. An apartment doesn't always mean the centre, and a cabin doesn't always mean a remote location. In Kelorakka, you can walk from a cabin to Hullu Poro in five minutes, and apartments can also be found in Rakkavaara, further from the centre. Let's first compare accommodation types regardless of location — and then talk about location separately."
      },
      comparison: {
        title: "Cabin vs Apartment Comparison",
        cabin: {
          label: "Cabin",
          items: [
            { label: "Typical size", value: "60–200 m²" },
            { label: "Bedrooms", value: "2–5" },
            { label: "Sauna", value: "Almost always private" },
            { label: "Fireplace", value: "Almost always" },
            { label: "Private yard", value: "Yes" },
            { label: "Privacy", value: "Detached building" },
            { label: "Parking", value: "Usually private" },
            { label: "Guests", value: "4–12" },
            { label: "Price level", value: "€€€" },
          ]
        },
        apartment: {
          label: "Apartment",
          items: [
            { label: "Typical size", value: "30–80 m²" },
            { label: "Bedrooms", value: "1–2 + loft" },
            { label: "Sauna", value: "Most have electric sauna" },
            { label: "Fireplace", value: "Sometimes" },
            { label: "Private yard", value: "Usually not" },
            { label: "Privacy", value: "Neighbours next door" },
            { label: "Parking", value: "Shared parking" },
            { label: "Guests", value: "2–6" },
            { label: "Price level", value: "€–€€" },
          ]
        }
      },
      cabinBest: {
        title: "When Is a Cabin the Right Choice?",
        points: [
          "Large groups — family + grandparents, friend groups",
          "Private yard — snow play in winter, BBQ in summer",
          "Fireplace — a huge part of the atmosphere + extra warmth",
          "Ski trails and snowmobile routes often from the door",
          "A log cabin is an experience in itself"
        ],
        notes: "Good to know: higher price but often reasonable per person, some cabins use wood for additional heating, you may need a car if further from the centre."
      },
      apartmentBest: {
        title: "When Is an Apartment Better?",
        points: [
          "Couples, small groups, budget-conscious travellers",
          "More affordable — typically 30–50% less",
          "Easy and hassle-free — no heating worries",
          "Many are right next to services",
          "Most have a private sauna",
          "Great base for an active holiday"
        ],
        notes: "Good to know: neighbours through the wall, no private yard, shared parking, less space."
      },
      location: {
        title: "What About Location?",
        content: "Levi village is compact. The centre is the roundabout — shops, restaurants, front slopes (Zero Point). General rule: closer to centre = easier without a car but more expensive, further away = more peace and more affordable but car or ski bus needed. The ski bus runs two routes during winter season.",
        tip: "Tip: always check the distance to the roundabout on the map."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Is a cabin or apartment cheaper?", a: "An apartment is typically more affordable, but with a large group the cabin price per person can be similar." },
        { q: "Do all cabins have a sauna?", a: "Almost all — sauna is standard in Levi. Most apartments also have a private electric sauna." },
        { q: "What is a kelo cabin?", a: "A kelo cabin is built from naturally dried standing dead pine. The wood is grey, beautiful and extremely durable." },
        { q: "Do I need a car?", a: "Not if you're near the centre. Further away, a car or ski bus is practically essential." },
        { q: "Which area suits families?", a: "Areas with trails and routes nearby, a calm environment and reasonable distance to services. Contact us and we'll help you choose." }
      ]
    },
    cta: {
      text: "Need help choosing? Get in touch — we're happy to help you find the perfect accommodation.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Accommodations in Levi", desc: "All our cabins and apartments", href: "/en/accommodations" },
        { title: "Prices in Levi", desc: "What does a Lapland holiday cost?", href: "/guide/prices-in-levi" },
        { title: "Getting Around Levi", desc: "Ski buses, taxis and cars", href: "/guide/getting-around-in-levi" },
        { title: "Levi Without a Car", desc: "Is it possible?", href: "/guide/levi-without-a-car" },
        { title: "Levi With Children", desc: "Tips for family holidays", href: "/guide/levi-with-children" },
        { title: "Skiing in Levi", desc: "43 slopes and tips", href: "/guide/skiing-in-levi" }
      ]
    },
    breadcrumbLabel: "Cabin vs Apartment"
  }
};

const CabinVsApartmentLevi = ({ lang = "fi" }: CabinVsApartmentLeviProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/opas/mokki-vai-huoneisto-levi",
    en: "/guide/cabin-vs-apartment-in-levi"
  };

  const homeLabels: Record<string, string> = { fi: "Etusivu", en: "Home" };
  const homeLinks: Record<string, string> = { fi: "/", en: "/en" };
  const guideLabels: Record<string, string> = { fi: "Opas", en: "Guide" };
  const guideLinks: Record<string, string> = { fi: "/levi", en: "/en/levi" };

  const breadcrumbItems = [
    { label: homeLabels[lang] || "Etusivu", href: homeLinks[lang] || "/" },
    { label: guideLabels[lang] || "Opas", href: guideLinks[lang] || "/levi" },
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
        <meta property="og:image:alt" content={lang === "fi" ? "Levin majoitusvaihtoehdot" : "Levi accommodation options"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin majoitusvaihtoehdot" : "Levi accommodation options"} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs items={breadcrumbItems} />

        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero */}
            <section className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.h1}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Important note */}
            <section className="mb-12">
              <Card className="glass-card border-border/30 p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-2">{t.sections.important.title}</h2>
                    <p className="text-muted-foreground">{t.sections.important.content}</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Comparison */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t.sections.comparison.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Cabin card */}
                <Card className="glass-card border-border/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Home className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{t.sections.comparison.cabin.label}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.sections.comparison.cabin.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                {/* Apartment card */}
                <Card className="glass-card border-border/30 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{t.sections.comparison.apartment.label}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.sections.comparison.apartment.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </section>

            {/* When cabin */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.cabinBest.title}</h2>
              <ul className="space-y-3 mb-4">
                {t.sections.cabinBest.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <TreePine className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{t.sections.cabinBest.notes}</p>
            </section>

            {/* When apartment */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.apartmentBest.title}</h2>
              <ul className="space-y-3 mb-4">
                {t.sections.apartmentBest.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{t.sections.apartmentBest.notes}</p>
            </section>

            {/* Location */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.sections.location.title}</h2>
              <p className="text-muted-foreground mb-3">{t.sections.location.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground">{t.sections.location.tip}</p>
                </div>
              </Card>
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

            <GuideDisclaimer lang={lang} />

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* CTA */}
            <section className="text-center mb-8">
              <Card className="glass-card border-border/30 p-8">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
                <Button asChild>
                  <Link to={t.cta.link}>
                    {t.cta.button}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
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

export default CabinVsApartmentLevi;
