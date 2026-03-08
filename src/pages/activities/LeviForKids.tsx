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
import { ArrowRight, Heart, Info, Star, Users, Snowflake, Baby, Mountain, TreePine, Gamepad2 } from "lucide-react";
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

interface LeviForKidsProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Levi lapsille — Parhaat aktiviteetit ja kohteet perheille | Leville.net",
      description: "Mitä tehdä lasten kanssa Levillä? Laskettelukoulu, Leevilandia, minikelkat, joulupukki, porofarmi ja muut lasten suosikit.",
      canonical: "https://leville.net/aktiviteetit/levi-lapsille"
    },
    h1: "Levi lapsille — parhaat aktiviteetit ja kohteet",
    intro: "Levillä riittää tekemistä kaikenikäisille lapsille — laskettelukoulusta joulupukkitapaamiseen ja eläinelämyksistä sisäaktiviteetteihin.",
    sections: {
      skiing: {
        title: "Laskettelu ja hiihto lapsille",
        content: "Wernerin laskettelukoulu on Levin oma koulu joka opettaa 5–11-vuotiaita. Tunnit kestävät 1,5 tuntia ja ryhmät ovat pieniä. Leevilandia on erillinen lapsille suunniteltu alue eturinteillä — loivat rinteet, oma hissi ja turvallinen ympäristö. Alle 6-vuotiaat laskettelevat ilmaiseksi kypärä päässä aikuisen seurassa. Murtomaahiihdossa Kid's Land -alue tarjoaa helpon aloituksen.",
        tip: "Vinkki: varaa laskettelukoulu etukäteen sesonkina — ryhmät täyttyvät nopeasti."
      },
      miniSnowmobiles: {
        title: "Minikelkat ja moottorikelkkajutut",
        content: "Lapsille (tyypillisesti 4–12 v) on tarjolla minimoottorikelkkoja turvallisella radalla. Ei tarvita ajokorttia — lapset ajavat itse valvotussa ympäristössä. Joillakin safarioperaattoreilla on myös perhekelkkasafareita joissa lapset istuvat reessä aikuisen vetämänä."
      },
      animals: {
        title: "Eläinelämykset",
        items: [
          "Porotilat: porojen syöttäminen, tarinat ja lyhyt poroajelu — lasten suosikkeja",
          "Huskykennelit: koirien tapaaminen ja lyhyt ajelu — myös pienet lapset pääsevät mukaan reessä",
          "Joulupukin eläintarha (Santa's Pet Farm): kotieläimiä ja lappalaisia eläimiä"
        ],
        note: "Eläinelämykset ovat lähes poikkeuksetta lasten loman kohokohta."
      },
      santa: {
        title: "Joulupukki ja joulukohteet",
        items: [
          "Joulupukin mökki Levin tunturilla (gondolilla ylös) — intiimi tapaaminen",
          "Arcandia — seikkailullinen elämyskeskus hylätyssä elokuvalavasteessa, tonttutoimintaa, jousiammuntaa"
        ]
      },
      other: {
        title: "Muita lasten suosikkeja",
        items: [
          "Ice Karting — lyhyt, hauska ja adrenaliinillinen (ikäraja vaihtelee)",
          "Sisäleikkipaikka / Lasten maailma — talvipäivinä kun ulkona on liian kylmä",
          "Keilaus ja minigolf (sisätiloissa)",
          "Uimahalli Levin Spa — liukumäet ja lastenallas",
          "Pulkkamäki — ilmaista ja lähellä kaikkialta"
        ]
      },
      ages: {
        title: "Ikäsuosituksia",
        content: "Yleiskatsaus mikä sopii minkä ikäiselle:",
        groups: [
          { age: "0–3 v", activities: "Porotilakäynti, pulkkamäki, uimahalli, mökissä oleskelu" },
          { age: "4–6 v", activities: "Minikelkat, huskyajelu (reessä), Leevilandia, joulupukki" },
          { age: "7–11 v", activities: "Laskettelukoulu, omat minisafarit, Ice Karting, lumikenkäily" },
          { age: "12+ v", activities: "Aikuisten aktiviteetit (moottorikelkka matkustajana, laskettelu, fatbike)" }
        ]
      }
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Minkä ikäisille Wernerin laskettelukoulu sopii?", a: "5–11-vuotiaille. Ryhmätunnit 1,5 h." },
        { q: "Voiko pienten lasten kanssa tehdä safareita?", a: "Kyllä — poroajelu ja huskyajelu onnistuvat reessä istuen jo pienille lapsille." },
        { q: "Onko sisäaktiviteetteja kylminä päivinä?", a: "Kyllä: uimahalli, keilaus, minigolf, sisäleikkipaikat." },
        { q: "Mitkä aktiviteetit ovat ilmaisia?", a: "Pulkkamäki, lumileikit, luonnossa kävely. Leevilandia-alue vaatii Leevilandia-lipun." }
      ]
    },
    cta: {
      text: "Perheystävälliset majoitukset Levin keskustassa — tilaa koko perheelle.",
      link: "/majoitukset",
      button: "Katso majoitukset"
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Lapsiperheet Levillä", desc: "Käytännön vinkit perheille", href: "/opas/lapsiperheet-levilla" },
        { title: "Talviaktiviteetit", desc: "Kaikki talven elämykset", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Joulupukki Levillä", desc: "Missä tavata pukki", href: "/opas/joulupukki-levilla" },
        { title: "Majoitukset", desc: "Mökit ja huoneistot", href: "/majoitukset" }
      ]
    },
    breadcrumbLabel: "Levi lapsille"
  },
  en: {
    meta: {
      title: "Levi for Kids — Best Activities & Attractions for Families | Leville.net",
      description: "What to do with kids in Levi? Ski school, Leevilandia, mini snowmobiles, Santa, reindeer farm and more family favorites.",
      canonical: "https://leville.net/activities/levi-for-kids"
    },
    h1: "Levi for Kids — Best Activities and Attractions",
    intro: "Levi has something for children of all ages — from ski school to meeting Santa, animal encounters to indoor activities.",
    sections: {
      skiing: {
        title: "Skiing and Cross-Country for Kids",
        content: "Werner's Ski School is Levi's own school teaching children aged 5–11. Lessons last 1.5 hours in small groups. Leevilandia is a dedicated children's area on the front slopes — gentle hills, own lift and a safe environment. Children under 6 ski free with a helmet and adult companion. In cross-country, the Kid's Land area offers an easy start.",
        tip: "Tip: book ski school in advance during peak season — groups fill up fast."
      },
      miniSnowmobiles: {
        title: "Mini Snowmobiles",
        content: "Mini snowmobiles are available for children (typically ages 4–12) on a safe track. No licence needed — kids drive themselves in a supervised environment. Some safari operators also offer family snowmobile safaris where children ride in a sled pulled by an adult."
      },
      animals: {
        title: "Animal Experiences",
        items: [
          "Reindeer farms: feeding reindeer, stories and short reindeer rides — a children's favourite",
          "Husky kennels: meeting the dogs and a short ride — even small children can join in the sled",
          "Santa's Pet Farm: domestic animals and Lappish animals"
        ],
        note: "Animal experiences are almost always the highlight of children's holidays."
      },
      santa: {
        title: "Santa Claus and Christmas Attractions",
        items: [
          "Santa's Cabin on Levi fell (gondola ride up) — an intimate meeting",
          "Arcandia — an adventure centre in an abandoned film set, elf activities, archery"
        ]
      },
      other: {
        title: "Other Kids' Favourites",
        items: [
          "Ice Karting — short, fun and thrilling (age limits vary)",
          "Indoor playground / Kids' World — for winter days when it's too cold outside",
          "Bowling and mini golf (indoors)",
          "Swimming pool at Levi Spa — slides and children's pool",
          "Sledging hill — free and close to everything"
        ]
      },
      ages: {
        title: "Age Recommendations",
        content: "Overview of what suits which age group:",
        groups: [
          { age: "0–3 yrs", activities: "Reindeer farm visit, sledging hill, swimming pool, cabin time" },
          { age: "4–6 yrs", activities: "Mini snowmobiles, husky ride (in sled), Leevilandia, Santa" },
          { age: "7–11 yrs", activities: "Ski school, mini safaris, Ice Karting, snowshoeing" },
          { age: "12+ yrs", activities: "Adult activities (snowmobile as passenger, skiing, fatbiking)" }
        ]
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What ages does Werner's Ski School cater to?", a: "Ages 5–11. Group lessons are 1.5 hours." },
        { q: "Can small children do safaris?", a: "Yes — reindeer and husky rides work for small children sitting in the sled." },
        { q: "Are there indoor activities for cold days?", a: "Yes: swimming pool, bowling, mini golf, indoor playgrounds." },
        { q: "Which activities are free?", a: "Sledging hill, snow play, nature walks. The Leevilandia area requires a Leevilandia ticket." }
      ]
    },
    cta: {
      text: "Family-friendly accommodation in Levi centre — space for the whole family.",
      link: "/en/accommodations",
      button: "View accommodations"
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Families in Levi", desc: "Practical tips for families", href: "/guide/levi-with-children" },
        { title: "Winter Activities", desc: "All winter experiences", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Santa Claus in Levi", desc: "Where to meet Santa", href: "/guide/santa-claus-in-levi" },
        { title: "Accommodations", desc: "Cabins and apartments", href: "/en/accommodations" }
      ]
    },
    breadcrumbLabel: "Levi for Kids"
  }
};

const LeviForKids = ({ lang = "fi" }: LeviForKidsProps) => {
  const t = translations[lang as keyof typeof translations] || translations.fi;
  const location = useLocation();

  const customUrls: Record<string, string> = {
    fi: "/aktiviteetit/levi-lapsille",
    en: "/activities/levi-for-kids"
  };

  const breadcrumbItems = [
    { label: lang === "en" ? "Home" : "Etusivu", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Activities" : "Aktiviteetit", href: lang === "en" ? "/en/levi" : "/levi" },
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

            {/* Skiing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.skiing.title}</h2>
              </div>
              <p className="text-muted-foreground mb-3">{t.sections.skiing.content}</p>
              <Card className="glass-card border-border/30 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">{t.sections.skiing.tip}</p>
                </div>
              </Card>
            </section>

            {/* Mini snowmobiles */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.miniSnowmobiles.title}</h2>
              </div>
              <p className="text-muted-foreground">{t.sections.miniSnowmobiles.content}</p>
            </section>

            {/* Animals */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.animals.title}</h2>
              </div>
              <ul className="space-y-3 mb-4">
                {t.sections.animals.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{t.sections.animals.note}</p>
            </section>

            {/* Santa */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.santa.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.santa.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Other favourites */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.other.title}</h2>
              </div>
              <ul className="space-y-3">
                {t.sections.other.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Age recommendations */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{t.sections.ages.title}</h2>
              </div>
              <p className="text-muted-foreground mb-4">{t.sections.ages.content}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.sections.ages.groups.map((g, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4">
                    <h3 className="font-semibold text-foreground mb-1">{g.age}</h3>
                    <p className="text-sm text-muted-foreground">{g.activities}</p>
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

            <GuideDisclaimer lang={lang} />

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

        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default LeviForKids;
