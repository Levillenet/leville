import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Clock,
  Euro,
  ShieldCheck,
  Users,
  Shirt,
  IdCard,
  Snowflake,
  MapPin,
  Route,
  Fuel,
  ExternalLink,
} from "lucide-react";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SnowmobileSafariLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Moottorikelkkailu Levillä – Safarit, reitit ja hinnat | Leville.net",
      description:
        "Moottorikelkkasafari Levillä – kaikki mitä tarvitset tietää. Opastetut safarit, vapaat reitit, hinnat, ajokorttisäännöt ja pukeutumisvinkit.",
      canonical: "https://leville.net/opas/moottorikelkkailu-levilla",
    },
    title: "Moottorikelkkailu Levillä",
    subtitle: "Arktista vauhtia ja vapautta tunturimaisemissa",
    intro: "Moottorikelkkailu on yksi Levin suosituimmista talviaktiviteeteista. Luminen erämaa, jäätyneet järvet ja tunturimaisemat aukeavat aivan uudella tavalla kelkan selästä. Tarjolla on sekä ohjattuja safareita aloittelijoille että vapaita reittejä kokeneille kelkkailijoille.",
    safaris: {
      title: "Opastetut safarit",
      items: [
        {
          name: "Lyhyt safari (1–2 h)",
          desc: "Sopii ensikertalaisille, tutustuminen kelkkailuun.",
          price: "noin 80–150 €/hlö",
        },
        {
          name: "Puolipäiväsafari (3–4 h)",
          desc: "Pidemmät reitit tunturiin tai jääjärvelle. Evästauko laavulla.",
          price: "noin 150–250 €/hlö",
        },
        {
          name: "Kokopäiväsafari (5–7 h)",
          desc: "Koko päivän seikkailu erämaahan. Lounas kodassa.",
          price: "noin 200–350 €/hlö",
        },
        {
          name: "Iltasafari",
          desc: "Kelkkailu pimeässä revontulten alla. Ainutlaatuinen kokemus.",
          price: "kysy hintaa",
        },
      ],
      note: "Hinnat vaihtelevat tarjoajan ja kauden mukaan. Tarkista ajantasaiset hinnat suoraan palveluntarjoajalta.",
    },
    trails: {
      title: "Vapaat moottorikelkkareitit",
      items: [
        "Levin alueella on satoja kilometrejä merkittyjä moottorikelkkareittejä",
        "Reitit yhdistävät Levin muihin Lapin kohteisiin (Muonio, Enontekiö, Kittilä)",
        "Reiteillä on taukopisteitä, laavuja ja huoltoasemia",
        "Kelkkojen vuokraus on mahdollista usealta paikkakunnalla sijaitsevalta yritykseltä",
      ],
    },
    practical: {
      title: "Käytännön tietoa",
      items: [
        {
          icon: "licence",
          label: "Ajokortti",
          text: "B-ajokortti vaaditaan. Ulkomaalaisilla kansainvälinen ajokortti.",
        },
        {
          icon: "age",
          label: "Ikäraja",
          text: "Kuljettajan oltava vähintään 18-vuotias. Lapset kyydissä matkustajana.",
        },
        {
          icon: "clothing",
          label: "Pukeutuminen",
          text: "Kelkkailuhaalari, kypärä ja hanskat yleensä sisältyvät safariin. Omalla kelkalla ajaessa huolehdi kerrospukeutumisesta ja tuulenpitävästä varustuksesta.",
        },
        {
          icon: "insurance",
          label: "Vakuutus",
          text: "Tarkista matkavakuutuksen kattavuus moottorikelkkailulle. Safaritarjoajilla on vastuuvakuutus.",
        },
        {
          icon: "safety",
          label: "Turvallisuus",
          text: "Nopeusrajoituksia noudatetaan, kelkkailureiteillä on liikennesäännöt.",
        },
      ],
    },
    tips: {
      title: "Vinkit kelkkailijalle",
      items: [
        "Varaa safari hyvissä ajoin, etenkin sesonkiaikaan (joulu, hiihtoloma)",
        "Ota mukaan aurinkolasit tai visiirisuoja – heijastuva lumi häikäisee",
        "Pakkasessa akku tyhjenee nopeammin – lataa puhelin täyteen",
        "Tauota ajelua riittävästi ja nauti maisemista",
        "Yhdistä kelkkailu muihin aktiviteetteihin: revontuliretki, pilkkiminen tai erälounasretki",
      ],
    },
    tokka: {
      title: "Suosittelemme: Tokka Safaris",
      text: "Tokka Safaris on paikallinen safariyritys Levillä, joka tarjoaa laadukkaita moottorikelkkasafareita pienryhmissä. Kokeneet oppaat vievät sinut unohtumattomille reiteille Lapin erämaahan.",
      cta: "Tutustu Tokka Safaris",
      url: "https://tokkasafaris.com",
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        {
          q: "Paljonko moottorikelkkasafari maksaa Levillä?",
          a: "Hinnat vaihtelevat noin 80 € lyhyestä tutustumissafarista yli 300 € kokopäiväsafariin. Hinnat ovat tyypillisesti henkilöä kohden ja sisältävät varusteet ja oppaan.",
        },
        {
          q: "Tarvitseeko moottorikelkkailuun ajokortin?",
          a: "Kyllä, kelkan kuljettajalla tulee olla voimassa oleva B-ajokortti. Matkustajaksi pääsee ilman ajokorttia.",
        },
        {
          q: "Sopiiko moottorikelkkailu lapsille?",
          a: "Lapset voivat osallistua matkustajana. Monet safaritarjoajat järjestävät perhesafareita, joissa vauhti on rauhallisempaa.",
        },
        {
          q: "Milloin on paras aika moottorikelkkailulle?",
          a: "Koko talvikausi marras–huhtikuu on hyvää aikaa. Kevättalvi (maalis–huhtikuu) on erityisen suosittu valoisuuden ja hyvien olosuhteiden ansiosta.",
        },
      ],
    },
    readAlso: {
      title: "Lue myös",
      links: [
        { label: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
        { label: "Laskettelu Levillä", href: "/opas/laskettelu-levi" },
        { label: "Revontulet Levillä", href: "/revontulet" },
      ],
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa majoitus Leviltä",
      accommodationLink: "/majoitukset",
    },
    breadcrumbLabel: "Moottorikelkkailu Levillä",
  },
  en: {
    meta: {
      title: "Snowmobile Safari in Levi – Tours, Routes & Prices | Leville.net",
      description:
        "Snowmobile safaris in Levi, Finnish Lapland. Guided tours, open trails, pricing, driving requirements and practical tips for your Arctic adventure.",
      canonical: "https://leville.net/en/guide/snowmobile-safari-levi",
    },
    title: "Snowmobile Safari in Levi",
    subtitle: "Arctic speed and freedom through Lapland's wilderness",
    intro: "Snowmobiling is one of the most popular winter activities in Levi. Snow-covered wilderness, frozen lakes and fell landscapes open up in an entirely new way from the seat of a snowmobile. There are guided safaris for beginners and open trail networks for experienced riders.",
    safaris: {
      title: "Guided Safaris",
      items: [
        {
          name: "Short safari (1–2 h)",
          desc: "Ideal for first-timers.",
          price: "approx. €80–150/person",
        },
        {
          name: "Half-day safari (3–4 h)",
          desc: "Longer routes to fells or frozen lakes. Snack break at a campfire.",
          price: "approx. €150–250/person",
        },
        {
          name: "Full-day safari (5–7 h)",
          desc: "Full day adventure into the wilderness. Lunch in a traditional hut.",
          price: "approx. €200–350/person",
        },
        {
          name: "Evening safari",
          desc: "Ride under the stars and northern lights. A unique experience.",
          price: "ask for price",
        },
      ],
      note: "Prices vary by provider and season. Check current prices directly with tour operators.",
    },
    trails: {
      title: "Open Snowmobile Trails",
      items: [
        "Hundreds of kilometres of marked snowmobile trails in the Levi region",
        "Trails connect Levi to other Lapland destinations (Muonio, Enontekiö, Kittilä)",
        "Rest stops, lean-to shelters and fuel stations along the routes",
        "Snowmobile rental available from several local companies",
      ],
    },
    practical: {
      title: "Practical Information",
      items: [
        {
          icon: "licence",
          label: "Driving licence",
          text: "A valid car driving licence (category B) is required. International driving permit for non-EU visitors.",
        },
        {
          icon: "age",
          label: "Age limit",
          text: "Driver must be at least 18 years old. Children may ride as passengers.",
        },
        {
          icon: "clothing",
          label: "Clothing",
          text: "Thermal overalls, helmet and gloves are typically included in guided safaris. For independent riding, dress in warm layers with wind protection.",
        },
        {
          icon: "insurance",
          label: "Insurance",
          text: "Check that your travel insurance covers snowmobiling. Safari operators carry liability insurance.",
        },
        {
          icon: "safety",
          label: "Safety",
          text: "Speed limits apply on snowmobile trails, and traffic rules are enforced.",
        },
      ],
    },
    tips: {
      title: "Tips for Snowmobilers",
      items: [
        "Book your safari well in advance, especially during peak season (Christmas, February ski holidays)",
        "Bring sunglasses or visor protection – reflected snow can be blinding",
        "Phone batteries drain faster in cold – charge fully before heading out",
        "Take breaks and enjoy the Arctic scenery",
        "Combine snowmobiling with other activities: northern lights trip, ice fishing or wilderness lunch",
      ],
    },
    tokka: {
      title: "We recommend: Tokka Safaris",
      text: "Tokka Safaris is a local safari company in Levi offering high-quality snowmobile safaris in small groups. Experienced guides take you on unforgettable routes through the Lapland wilderness.",
      cta: "Visit Tokka Safaris",
      url: "https://tokkasafaris.com",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How much does a snowmobile safari cost in Levi?",
          a: "Prices range from about €80 for a short introductory safari to over €300 for a full-day expedition. Prices are typically per person and include equipment and a guide.",
        },
        {
          q: "Do I need a driving licence for snowmobiling?",
          a: "Yes, the driver must hold a valid category B driving licence. Passengers do not need a licence.",
        },
        {
          q: "Is snowmobiling suitable for children?",
          a: "Children can participate as passengers. Many safari operators offer family-friendly safaris at a gentler pace.",
        },
        {
          q: "When is the best time for snowmobiling in Levi?",
          a: "The entire winter season from November to April offers great conditions. Late winter (March–April) is particularly popular thanks to longer daylight hours and pleasant weather.",
        },
      ],
    },
    readAlso: {
      title: "Read also",
      links: [
        { label: "Winter Clothing Guide", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
        { label: "Skiing in Levi", href: "/guide/skiing-in-levi" },
        { label: "Northern Lights in Levi", href: "/en/northern-lights" },
      ],
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book accommodation in Levi",
      accommodationLink: "/en/accommodations",
    },
    breadcrumbLabel: "Snowmobile Safari in Levi",
  },
};

const PracticalIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "licence":
      return <IdCard className="w-5 h-5 text-primary" />;
    case "age":
      return <Users className="w-5 h-5 text-primary" />;
    case "clothing":
      return <Shirt className="w-5 h-5 text-primary" />;
    case "insurance":
      return <ShieldCheck className="w-5 h-5 text-primary" />;
    case "safety":
      return <ShieldCheck className="w-5 h-5 text-primary" />;
    default:
      return <Star className="w-5 h-5 text-primary" />;
  }
};

const SnowmobileSafariLevi = ({ lang = "fi" }: SnowmobileSafariLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls =
    lang === "fi"
      ? { fi: "/opas/moottorikelkkailu-levilla" as const, en: "/en/guide/snowmobile-safari-levi" as const }
      : { en: "/en/guide/snowmobile-safari-levi" as const, fi: "/opas/moottorikelkkailu-levilla" as const };

  const breadcrumbItems = [
    { label: lang === "fi" ? "Etusivu" : "Home", href: lang === "fi" ? "/" : "/en" },
    { label: "Levi", href: lang === "fi" ? "/levi" : "/en/levi" },
    { label: t.breadcrumbLabel, href: "" },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: t.title,
            description: t.meta.description,
            author: { "@type": "Organization", name: "Leville.net" },
            publisher: { "@type": "Organization", name: "Leville.net" },
          })}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
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
                {t.title}
              </h1>
              <p className="text-lg text-primary font-medium mb-4">{t.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.intro}</p>
            </section>

            {/* Guided Safaris */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.safaris.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.safaris.items.map((safari, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <h3 className="font-semibold text-foreground">{safari.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{safari.desc}</p>
                    <p className="text-sm font-medium text-primary flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      {safari.price}
                    </p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic">{t.safaris.note}</p>
            </section>

            {/* Open Trails */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.trails.title}</h2>
              <ul className="space-y-3">
                {t.trails.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {idx === 0 && <Route className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />}
                    {idx === 1 && <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />}
                    {idx === 2 && <Fuel className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />}
                    {idx === 3 && <Snowflake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />}
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Practical Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.practical.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.practical.items.map((item, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <PracticalIcon icon={item.icon} />
                      </div>
                      <h3 className="font-semibold text-foreground">{item.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.tips.title}</h2>
              <ul className="space-y-3">
                {t.tips.items.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tokka Safaris recommendation */}
            <section className="mb-12">
              <Card className="glass-card border-primary/30 p-6 bg-primary/5">
                <h2 className="text-xl font-bold text-foreground mb-2">{t.tokka.title}</h2>
                <p className="text-muted-foreground mb-4">{t.tokka.text}</p>
                <Button asChild variant="outline" className="border-primary/40">
                  <a href={t.tokka.url} target="_blank" rel="noopener noreferrer">
                    {t.tokka.cta}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </Card>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.faq.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {t.faq.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="glass-card border border-border/30 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Read Also */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.readAlso.title}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {t.readAlso.links.map((link, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-4 hover:border-primary/40 transition-colors">
                    <Link to={link.href} className="flex items-center justify-between gap-2 text-foreground font-medium text-sm hover:text-primary transition-colors">
                      {link.label}
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

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

export default SnowmobileSafariLevi;
