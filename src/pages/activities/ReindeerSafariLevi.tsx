import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Clock, Euro, Users, Camera, ThermometerSnowflake, Heart, MapPin, ArrowRight, Info } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ReindeerSafariLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Porosafari Levillä — Mitä odottaa, vinkit ja käytännön tietoa | Leville.net",
      description: "Kattava opas porosafareista Levillä. Erilaiset poroelämykset, mitä pukea, vinkit perheille ja käytännön tietoa paikalliselta majoittajalta.",
      canonical: "https://leville.net/aktiviteetit/porosafari-levi",
    },
    title: "Porosafari Levillä",
    subtitle: "Mitä odottaa ja miten valmistautua",
    intro: "Porot ovat Lapin symboli ja yksi Levin suosituimmista elämyksistä. Porosafareita on monenlaisia: lyhyistä retkistä erämaasafareihin, ja ne sopivat kaikenikäisille. Tämä opas kertoo mitä odottaa, miten valmistautua ja mitä kannattaa tietää ennen varaamista.",
    heroIcon: "reindeer",
    sections: {
      experiences: {
        title: "Erilaiset poroelämykset",
        items: [
          {
            type: "Lyhyt poroajelu (15–30 min)",
            desc: "Rauhallinen rekiajelu lumisessa maisemassa. Sopii kaikenikäisille ja on helppo tapa tutustua poroihin. Poronhoitaja ohjaa poroa — sinä istut reessä ja nautit.",
            icon: "clock",
          },
          {
            type: "Porotilakäynti",
            desc: "Tutustuminen porotalouteen ja poromiehen arkeen. Pääset syöttämään poroja ja kuulet tarinoita poronhoidon vuosituhantisesta perinteestä. Erinomainen kokemus lapsille.",
            icon: "heart",
          },
          {
            type: "Porosafari erämaassa (1–3 h)",
            desc: "Pidempi retki hiljaiseen luontoon porojen vetämänä. Usein sisältää tulentekohetken ja kuuman juoman kodassa. Tunnelmallinen ja autenttinen Lapin kokemus.",
            icon: "snowflake",
          },
          {
            type: "Yhdistelmäelämys",
            desc: "Yhdistä kaksi huippuelämystä samana päivänä — esimerkiksi poroajelu ja huskyvaljakkoajelu. Monet operaattorit tarjoavat valmiita yhdistelmäpaketteja.",
            icon: "users",
          },
        ],
      },
      whatHappens: {
        title: "Mitä porosafareilla tapahtuu?",
        paragraphs: [
          "Tyypillinen porosafari alkaa kuljetuksella porotilalle, joka sijaitsee yleensä 15–30 minuutin ajomatkan päässä Levin keskustasta. Perillä sinut toivotetaan tervetulleeksi lämpimään kotaan tai poroaitaukseen.",
          "Ennen ajelua saat ohjeet ja pääset usein syöttämään poroja jäkälällä. Porot ovat rauhallisia ja lempeitä eläimiä — lasten kanssa turvallista ja hauskaa.",
          "Itse ajelussa istut perinteisessä poropulkassa (reki) ja poronhoitaja ohjaa poroa edestä. Maisema lipuu ohi hiljaisuudessa — kuulet vain poron kavioiden äänet lumessa.",
          "Ajelun jälkeen monilla tiloilla tarjotaan kuumaa juomaa kodassa, ja kuulet tarinoita poronhoidosta. Kokemus on kiireetön ja tunnelmallinen."
        ],
      },
      preparation: {
        title: "Miten valmistautua",
        items: [
          {
            title: "Pukeutuminen",
            text: "Kerrospukeutuminen on avain. Poroajelulla istutaan paikallaan reessä, joten jäähtyy nopeammin kuin kävellessä. Lämpimät kengät ovat erityisen tärkeät — villasukat ja vuoratut talvikengät.",
            icon: "thermometer",
          },
          {
            title: "Varusteet",
            text: "Ota mukaan kamera — hetket porojen kanssa ovat upeita kuvattavia. Käytä kosketusnäyttökäsineitä tai pidä toinen käsi vapaana kuvaamista varten. Akut tyhjenevät pakkasessa nopeasti — pidä varapatteria taskussa.",
            icon: "camera",
          },
          {
            title: "Varaaminen",
            text: "Suosittelemme varaamaan etukäteen erityisesti joulu- ja hiihtolomasesonkina. Suosituimmat ajelut täyttyvät nopeasti. Kesällä paikkoja on helpommin saatavilla.",
            icon: "info",
          },
          {
            title: "Kesto",
            text: "Huomioi kokonaisaika kuljetuksineen. Vaikka itse poroajelu kestää 15–30 minuuttia, koko elämys tilakäynteineen ja kuljetuksineen vie tyypillisesti 2–3 tuntia.",
            icon: "clock",
          },
        ],
      },
      families: {
        title: "Vinkit perheille",
        items: [
          "Lasten kanssa lyhyt poroajelu + tilakäynti on paras yhdistelmä — sopiva pituus ja paljon tekemistä",
          "Pienet lapset voivat istua sylissä reessä — erillistä paikkaa ei tarvita",
          "Moni operaattori tarjoaa lämpöisiä haalareita lainaan myös lapsille",
          "Porojen syöttäminen on usein lasten lempiosuus — ota evästä myös lapsille kotatauolle",
        ],
      },
      bestTime: {
        title: "Milloin paras aika?",
        times: [
          {
            period: "Joulu–maaliskuu",
            desc: "Luminen maisema tekee poroajelusta taianmaisen. Pimeys luo tunnelmaa ja revontulet ovat mahdollisia. Suosituin sesonki.",
          },
          {
            period: "Syyskuu–lokakuu",
            desc: "Ruskavärit ovat upeita ja porot ovat juuri palanneet kesälaitumilta. Rauhallisempi ajanjakso ilman massaturismia.",
          },
          {
            period: "Ympäri vuoden",
            desc: "Poroja voi nähdä ja niihin tutustua ympäri vuoden, mutta rekiajelu vaatii lunta. Kesällä tarjolla tilakäyntejä ja porosafareja kärryillä.",
          },
        ],
      },
      faq: {
        title: "Usein kysytyt kysymykset",
        items: [
          {
            q: "Mitä porosafari maksaa?",
            a: "Hinta riippuu elämyksen pituudesta ja operaattorista. Lyhyt ajelu alkaa noin muutamasta kympistä henkilöltä, pidemmät erämaasafarit voivat maksaa enemmän. Katso tarkemmin hintaoppaastamme.",
          },
          {
            q: "Onko porosafari turvallinen lapsille?",
            a: "Kyllä. Porot ovat rauhallisia ja tottuneita ihmisiin. Pienet lapset istuvat aikuisen sylissä reessä. Porojen syöttäminen on turvallista ja hauskaa kaikenikäisille.",
          },
          {
            q: "Tarvitseeko omia varusteita?",
            a: "Lämmin pukeutuminen on tärkeintä. Useimmat operaattorit lainaavat tarvittaessa lisävarusteita kuten haalareita ja kenkiä. Ota mukaan kamera!",
          },
          {
            q: "Kuinka kauan porosafari kestää?",
            a: "Kokonaisaika kuljetuksineen on tyypillisesti 2–3 tuntia, vaikka itse ajelu on lyhyempi (15–30 min). Tilakäynti ja kotatuokio ovat osa elämystä.",
          },
          {
            q: "Pitääkö varata etukäteen?",
            a: "Kyllä, erityisesti joulu- ja hiihtolomasesonkina. Suosituimmat ajelut täyttyvät nopeasti. Kesällä paikkoja on yleensä helpommin saatavilla.",
          },
        ],
      },
    },
    cta: {
      title: "Varaa majoitus ja koe porosafari",
      text: "Levin keskustan majoituksistamme pääset helposti porotilalle. Monet operaattorit noutavat asiakkaat majoituksesta.",
      button: "Katso majoitukset",
    },
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Koiravaljakkoajelu", desc: "Toinen suosittu Lapin elämys", href: "/aktiviteetit/koiravaljakkoajelu-levi" },
        { title: "Parhaat talviaktiviteetit", desc: "Kaikki Levin aktiviteetit", href: "/aktiviteetit/parhaat-talviaktiviteetit-levi" },
        { title: "Talvivarusteet", desc: "Mitä pukea poroajelulle", href: "/opas/talvivarusteet-leville" },
        { title: "Majoitukset", desc: "Huoneistot Levillä", href: "/majoitukset" },
      ],
    },
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Aktiviteetit Levillä", href: "/opas/aktiviteetit-levi" },
      { label: "Porosafari", href: "/aktiviteetit/porosafari-levi" },
    ],
    activitiesHubLink: "/opas/aktiviteetit-levi",
    activitiesHubText: "← Takaisin aktiviteettioppaaseen",
    accommodationsHref: "/majoitukset",
  },
  en: {
    meta: {
      title: "Reindeer Safari in Levi — What to Expect, Tips & Practical Info | Leville.net",
      description: "Complete guide to reindeer safaris in Levi, Finland. Different reindeer experiences, what to wear, family tips and practical info from a local host.",
      canonical: "https://leville.net/activities/reindeer-safari-levi",
    },
    title: "Reindeer Safari in Levi",
    subtitle: "What to expect and how to prepare",
    intro: "Reindeer are the symbol of Lapland and one of Levi's most popular experiences. There are many types of reindeer safaris — from short sleigh rides to wilderness expeditions — suitable for all ages. This guide tells you what to expect, how to prepare, and what you should know before booking.",
    heroIcon: "reindeer",
    sections: {
      experiences: {
        title: "Different Reindeer Experiences",
        items: [
          {
            type: "Short Reindeer Sleigh Ride (15–30 min)",
            desc: "A peaceful sleigh ride through snowy landscapes. Suitable for all ages and the easiest way to meet reindeer. The herder guides the reindeer while you sit back and enjoy.",
            icon: "clock",
          },
          {
            type: "Reindeer Farm Visit",
            desc: "Learn about reindeer herding traditions and the daily life of a reindeer herder. Feed the reindeer and hear stories about this thousand-year-old tradition. Excellent for children.",
            icon: "heart",
          },
          {
            type: "Wilderness Reindeer Safari (1–3 h)",
            desc: "A longer trip pulled by reindeer into the quiet wilderness. Often includes a campfire moment with hot drinks in a traditional kota. Atmospheric and authentic Lapland experience.",
            icon: "snowflake",
          },
          {
            type: "Combination Experience",
            desc: "Combine two top experiences on the same day — for example a reindeer ride and a husky safari. Many operators offer ready-made combination packages.",
            icon: "users",
          },
        ],
      },
      whatHappens: {
        title: "What Happens on a Reindeer Safari?",
        paragraphs: [
          "A typical reindeer safari begins with transport to a reindeer farm, usually located 15–30 minutes' drive from Levi centre. Upon arrival, you're welcomed into a warm kota (traditional Sámi tent) or the reindeer enclosure.",
          "Before the ride, you'll receive instructions and usually get to feed the reindeer with lichen. Reindeer are calm and gentle animals — safe and fun for children.",
          "During the ride, you sit in a traditional pulkka (sled) while the herder guides the reindeer from the front. The landscape glides by in silence — you hear only the sound of hooves on the snow.",
          "After the ride, many farms offer hot drinks in a kota and share stories about reindeer herding. The experience is unhurried and atmospheric."
        ],
      },
      preparation: {
        title: "How to Prepare",
        items: [
          {
            title: "What to Wear",
            text: "Layering is key. On a reindeer sleigh ride you sit still, so you cool down faster than when walking. Warm footwear is especially important — wool socks and insulated winter boots.",
            icon: "thermometer",
          },
          {
            title: "Equipment",
            text: "Bring a camera — moments with reindeer make wonderful photos. Use touchscreen gloves or keep one hand free for photos. Batteries drain quickly in the cold — keep a spare in your pocket.",
            icon: "camera",
          },
          {
            title: "Booking",
            text: "We recommend booking in advance, especially during Christmas and ski holiday seasons. The most popular rides fill up quickly. In summer, availability is usually easier.",
            icon: "info",
          },
          {
            title: "Duration",
            text: "Consider the total time including transport. Even though the reindeer ride itself takes 15–30 minutes, the whole experience with farm visit and transport typically takes 2–3 hours.",
            icon: "clock",
          },
        ],
      },
      families: {
        title: "Tips for Families",
        items: [
          "With children, a short reindeer ride + farm visit is the best combination — good length and plenty to do",
          "Small children can sit on a parent's lap in the sled — no separate seat needed",
          "Many operators lend warm overalls for children too",
          "Feeding the reindeer is often children's favourite part — bring snacks for kids during the kota break too",
        ],
      },
      bestTime: {
        title: "When Is the Best Time?",
        times: [
          {
            period: "Christmas–March",
            desc: "Snowy landscapes make the reindeer ride magical. Darkness creates atmosphere and northern lights are possible. The most popular season.",
          },
          {
            period: "September–October",
            desc: "Autumn colours (ruska) are stunning and reindeer have just returned from summer pastures. A quieter period without mass tourism.",
          },
          {
            period: "Year-round",
            desc: "Reindeer can be seen and visited year-round, but sleigh rides require snow. In summer, farm visits and cart safaris are available.",
          },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "How much does a reindeer safari cost?",
            a: "The price depends on the length and operator. A short ride starts from around a few dozen euros per person, while longer wilderness safaris cost more. Check our price guide for details.",
          },
          {
            q: "Is a reindeer safari safe for children?",
            a: "Yes. Reindeer are calm and used to people. Small children sit on a parent's lap in the sled. Feeding reindeer is safe and fun for all ages.",
          },
          {
            q: "Do I need my own equipment?",
            a: "Warm clothing is most important. Most operators lend additional gear like overalls and boots if needed. Don't forget your camera!",
          },
          {
            q: "How long does a reindeer safari take?",
            a: "Total time including transport is typically 2–3 hours, even though the ride itself is shorter (15–30 min). The farm visit and kota break are part of the experience.",
          },
          {
            q: "Should I book in advance?",
            a: "Yes, especially during Christmas and ski holiday seasons. The most popular rides fill up quickly. In summer, availability is usually easier.",
          },
        ],
      },
    },
    cta: {
      title: "Book Accommodation and Experience a Reindeer Safari",
      text: "From our Levi centre accommodations, you can easily reach reindeer farms. Many operators pick up guests from accommodation.",
      button: "View Accommodations",
    },
    readNext: {
      title: "Read Next",
      links: [
        { title: "Husky Safari", desc: "Another beloved Lapland experience", href: "/activities/husky-safari-levi" },
        { title: "Top Winter Activities", desc: "All Levi winter activities", href: "/activities/top-winter-activities-in-levi-lapland" },
        { title: "Winter Clothing Guide", desc: "What to wear for a reindeer ride", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { title: "Accommodations", desc: "Apartments in Levi", href: "/en/accommodations" },
      ],
    },
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Activities in Levi", href: "/guide/activities-in-levi" },
      { label: "Reindeer Safari", href: "/activities/reindeer-safari-levi" },
    ],
    activitiesHubLink: "/guide/activities-in-levi",
    activitiesHubText: "← Back to Activities Guide",
    accommodationsHref: "/en/accommodations",
  },
};

const ReindeerSafariLevi = ({ lang = "fi" }: ReindeerSafariLeviProps) => {
  const location = useLocation();
  const t = translations[lang] || translations.fi;

  const hreflangUrls = {
    fi: "https://leville.net/aktiviteetit/porosafari-levi",
    en: "https://leville.net/activities/reindeer-safari-levi",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "clock": return <Clock className="w-5 h-5" />;
      case "heart": return <Heart className="w-5 h-5" />;
      case "snowflake": return <Snowflake className="w-5 h-5" />;
      case "users": return <Users className="w-5 h-5" />;
      case "thermometer": return <ThermometerSnowflake className="w-5 h-5" />;
      case "camera": return <Camera className="w-5 h-5" />;
      case "info": return <Info className="w-5 h-5" />;
      default: return <Snowflake className="w-5 h-5" />;
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.sections.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.meta.description,
    author: { "@type": "Organization", name: "Leville.net" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: t.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://leville.net${item.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : "en_US"} />
        <meta property="og:site_name" content="Leville.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <JsonLd data={getWebsiteSchema()} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} customUrls={hreflangUrls} />

      <SubpageBackground />
      <Header />
      <Breadcrumbs lang={lang} />

      <main id="main-content" className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          {/* Back to Hub */}
          <div className="mb-6">
            <Link to={t.activitiesHubLink} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t.activitiesHubText}
            </Link>
          </div>

          {/* Hero */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Snowflake className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">{t.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">{t.intro}</p>
          </section>

          {/* Experiences */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              {t.sections.experiences.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.sections.experiences.items.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{item.type}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What Happens */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  {t.sections.whatHappens.title}
                </h2>
                <div className="space-y-4">
                  {t.sections.whatHappens.paragraphs.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How to Prepare */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ThermometerSnowflake className="w-6 h-6 text-primary" />
              {t.sections.preparation.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.sections.preparation.items.map((item, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tips for Families */}
          <section className="mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {t.sections.families.title}
                </h2>
                <ul className="space-y-3">
                  {t.sections.families.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Best Time */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Snowflake className="w-6 h-6 text-primary" />
              {t.sections.bestTime.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.sections.bestTime.times.map((time, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">{time.period}</h3>
                    <p className="text-muted-foreground text-sm">{time.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" />
              {t.sections.faq.title}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.sections.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-medium text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-3">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t.cta.text}</p>
                <Link to={t.accommodationsHref}>
                  <Button size="lg" className="gap-2">
                    {t.cta.button}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* Read Next */}
          <ReadNextSection
            title={t.readNext.title}
            links={t.readNext.links}
          />
        </div>
      </main>

      <Footer />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </div>
  );
};

export default ReindeerSafariLevi;
