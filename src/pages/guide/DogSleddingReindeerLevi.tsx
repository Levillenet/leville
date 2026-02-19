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
  Dog,
  TreePine,
  Camera,
  Thermometer,
  Heart,
  Users,
  ExternalLink,
  CheckCircle,
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

interface DogSleddingReindeerLeviProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Husky-safari ja poroajelu Levillä – Kokemukset & hinnat | Leville.net",
      description: "Huskyvaljakkoajelu ja porosafari Levillä. Vertaile kokemuksia, hintoja ja käytännön vinkkejä arktisiin eläinelämyksiin Lapissa.",
      canonical: "https://leville.net/opas/husky-safari-poroajelu-levi",
    },
    title: "Husky-safari ja poroajelu Levillä",
    subtitle: "Lapin ikonisimmat eläinelämykset",
    intro: "Huskyvaljakkoajelu ja perinteinen poroajelu ovat Lapin unohtumattomimpia kokemuksia. Levillä molemmat ovat helposti saavutettavissa – valjakkokoiratiloja ja porotiloja löytyy aivan keskustan tuntumasta. Kokemukset sopivat kaikenikäisille ja ovat saatavilla läpi koko talvikauden.",
    husky: {
      title: "Huskyvaljakkoajelu",
      intro: "Huskyvaljakkoajelu on vauhdikas ja jännittävä kokemus. Innokkaat valjakkokoirat vetävät sinut lumiseen metsään, ja tunnelma on ainutlaatuinen.",
      options: [
        { name: "Lyhyt ajelu (15–30 min)", desc: "Tutustuminen huskyihin ja lyhyt ajelukierros. Sopii pienille lapsille.", price: "noin 50–90 €/hlö" },
        { name: "Safari (1–2 h)", desc: "Pidempi reitti metsässä, mahdollisuus ajaa itse valjakkoa.", price: "noin 100–180 €/hlö" },
        { name: "Puolipäiväsafari (3–4 h)", desc: "Erämaaretki taukoineen. Eväs- tai lounashetki luonnossa.", price: "noin 180–280 €/hlö" },
        { name: "Kenttävierailu", desc: "Monilla tiloilla voi vierailla tapaamassa koiria ilman ajelua. Erityisesti kesällä suosittu.", price: "kysy hintaa" },
      ],
      flowTitle: "Husky-safarin kulku",
      flow: [
        "Saapuminen tilalle ja turvallisuusohjeistus",
        "Tutustuminen omaan valjakkokoiratiimiin",
        "Ajelu lumisessa maisemassa – voit ajaa itse tai istua kyydissä",
        "Paluun jälkeen mahdollisuus silitellä koiria ja ottaa valokuvia",
        "Moniin safareihin sisältyy lämmin juoma tai välipala",
      ],
    },
    reindeer: {
      title: "Poroajelu ja porotilat",
      intro: "Poroajelu on rauhallinen ja perinteinen tapa kokea Lapin luonto. Poronhoito on saamelaisten vuosisatainen elinkeino, ja porotilavierailu tarjoaa ikkunan tähän kulttuuriin.",
      options: [
        { name: "Lyhyt poroajelu (15–30 min)", desc: "Rauhallinen kierros poron vetämässä reessä.", price: "noin 40–70 €/hlö" },
        { name: "Porosafari (1–2 h)", desc: "Pidempi ajelu metsässä, usein tarinoita poronhoidosta.", price: "noin 70–140 €/hlö" },
        { name: "Porotilavierailu", desc: "Tutustuminen poroihin, ruokinta, tarinat ja lämmin juoma kodassa.", price: "noin 30–60 €/hlö" },
        { name: "Yhdistelmäretket", desc: "Poroajelu + revontulten katselu tai pilkkiminen.", price: "kysy hintaa" },
      ],
    },
    comparison: {
      title: "Husky vai poro – kumpi valita?",
      headers: ["", "Huskyvaljakkoajelu", "Poroajelu"],
      rows: [
        ["Tunnelma", "Vauhdikas ja jännittävä", "Rauhallinen ja perinteinen"],
        ["Vauhti", "Nopea, 15–20 km/h", "Hidas, kävelyvauhtia"],
        ["Osallistuminen", "Voit ajaa itse valjakkoa", "Istut reessä, poro vetää"],
        ["Sopii erityisesti", "Seikkailunhaluisille", "Lapsiperheille, rauhaa etsiville"],
        ["Kulttuurikokemus", "Moderni koiravaljakkoharrastus", "Perinteinen saamelainen elinkeino"],
        ["Kesto tyypillisesti", "1–2 h", "30 min – 1 h"],
      ],
      note: "Molemmat ovat kokemisen arvoisia – jos aikaa riittää, kokeile kumpaakin!",
    },
    tips: {
      title: "Käytännön vinkit",
      items: [
        "Varaa etukäteen, etenkin joulun ja hiihtoloman aikaan – suosituimmat safarit myydään loppuun",
        "Pukeudu lämpimästi kerroksittain – istut paikallasi, joten kylmä tuntuu nopeammin kuin lasketellessa",
        "Lämmin aluskerrasto, tuulenpitävä päällyskerros, paksu pipo ja lapaset",
        "Ota kamera tai puhelin mukaan, mutta suojaa pakkasilta (pidä lähellä kehoa)",
        "Kysy etukäteen, sisältyykö safariin kuljetus majoituksesta",
        "Koira-allergikot: husky-safarilla ollaan lähikontaktissa koiriin",
      ],
    },
    faq: {
      title: "Usein kysytyt kysymykset",
      items: [
        { q: "Paljonko husky-safari maksaa Levillä?", a: "Lyhyt tutustumisajelu maksaa noin 50–90 € ja pidempi safari 100–280 € henkilöltä. Hinnat sisältävät tyypillisesti varusteet ja ohjeistuksen." },
        { q: "Minkä ikäiset lapset voivat osallistua?", a: "Lyhyille ajeluille ja porotilavierailuille pääsevät pienetkin lapset (vanhemman kanssa reessä). Huskyvaljakon ajamiseen itse vaaditaan yleensä vähintään 13–16 vuoden ikä." },
        { q: "Onko eläimistä pidetty hyvää huolta?", a: "Levin alueen tilat ovat ammattimaisia ja noudattavat eläinsuojelusäännöksiä. Koirat ja porot ovat tottuneet ihmisiin ja nauttivat selvästi työstään." },
        { q: "Milloin on paras aika husky-safarille tai poroajelulle?", a: "Koko talvikausi marras–huhtikuu on hyvää aikaa. Jouluaika tarjoaa erityisen tunnelman kaamosvalossa. Kevättalvi on suosittu aurinkoisuutensa ansiosta." },
      ],
    },
    readAlso: {
      title: "Lue myös",
      links: [
        { label: "Joulu Lapissa", href: "/levi/joulu-lapissa" },
        { label: "Revontulet Levillä", href: "/revontulet" },
        { label: "Talvivarusteet Leville", href: "/opas/talvivarusteet-leville" },
      ],
    },
    cta: {
      hub: "Takaisin Levi-oppaaseen",
      hubLink: "/levi",
      accommodation: "Varaa majoitus Leviltä",
      accommodationLink: "/majoitukset",
    },
    breadcrumbLabel: "Husky-safari ja poroajelu",
  },
  en: {
    meta: {
      title: "Dog Sledding & Reindeer Rides in Levi – Experiences & Prices | Leville.net",
      description: "Husky safaris and reindeer sleigh rides in Levi, Finnish Lapland. Compare experiences, prices and get practical tips for iconic Arctic animal encounters.",
      canonical: "https://leville.net/en/guide/dog-sledding-reindeer-levi",
    },
    title: "Dog Sledding & Reindeer Rides in Levi",
    subtitle: "Lapland's most iconic animal experiences",
    intro: "Husky dog sledding and traditional reindeer sleigh rides are among the most unforgettable experiences in Lapland. In Levi, both are easily accessible – husky farms and reindeer ranches are located just minutes from the village centre. These experiences are suitable for all ages and available throughout the winter season.",
    husky: {
      title: "Husky Dog Sledding",
      intro: "Husky sledding is an exciting and exhilarating experience. Eager sled dogs pull you through snowy forests, creating an atmosphere unlike anything else.",
      options: [
        { name: "Short ride (15–30 min)", desc: "Introduction to huskies and a short ride. Suitable for small children.", price: "approx. €50–90/person" },
        { name: "Safari (1–2 h)", desc: "Longer route through the forest, opportunity to drive the sled yourself.", price: "approx. €100–180/person" },
        { name: "Half-day safari (3–4 h)", desc: "Wilderness expedition with breaks. Snack or lunch in nature.", price: "approx. €180–280/person" },
        { name: "Farm visit", desc: "Many farms welcome visitors to meet the dogs without a ride. Especially popular in summer.", price: "ask for price" },
      ],
      flowTitle: "What to expect",
      flow: [
        "Arrival at the farm and safety briefing",
        "Meet your personal team of sled dogs",
        "Ride through snowy landscapes – drive yourself or ride as a passenger",
        "After returning, opportunity to pet the dogs and take photos",
        "Many safaris include a warm drink or snack",
      ],
    },
    reindeer: {
      title: "Reindeer Rides & Ranch Visits",
      intro: "A reindeer sleigh ride is a peaceful and traditional way to experience Lapland's nature. Reindeer herding has been a Sámi livelihood for centuries, and a ranch visit offers a window into this ancient culture.",
      options: [
        { name: "Short reindeer ride (15–30 min)", desc: "A gentle ride in a reindeer-pulled sleigh.", price: "approx. €40–70/person" },
        { name: "Reindeer safari (1–2 h)", desc: "Longer ride with storytelling about herding traditions.", price: "approx. €70–140/person" },
        { name: "Ranch visit", desc: "Meet reindeer, feed them, hear stories and enjoy a warm drink in a traditional hut.", price: "approx. €30–60/person" },
        { name: "Combination trips", desc: "Reindeer ride + northern lights watching or ice fishing.", price: "ask for price" },
      ],
    },
    comparison: {
      title: "Huskies or Reindeer – Which to Choose?",
      headers: ["", "Husky Dog Sledding", "Reindeer Ride"],
      rows: [
        ["Atmosphere", "Fast-paced and thrilling", "Calm and traditional"],
        ["Speed", "Fast, 15–20 km/h", "Slow, walking pace"],
        ["Participation", "You can drive the sled yourself", "You sit in the sleigh"],
        ["Best for", "Adventure seekers", "Families, those seeking peace"],
        ["Cultural experience", "Modern dog sledding sport", "Traditional Sámi livelihood"],
        ["Typical duration", "1–2 hours", "30 min – 1 hour"],
      ],
      note: "Both are worth experiencing – if time allows, try both!",
    },
    tips: {
      title: "Practical Tips",
      items: [
        "Book in advance, especially around Christmas and ski holidays – popular safaris sell out quickly",
        "Dress warmly in layers – you'll be sitting still, so the cold is felt more quickly than during active sports",
        "Warm base layer, windproof outer layer, thick hat and mittens",
        "Bring a camera but protect it from the cold (keep close to your body)",
        "Ask in advance whether transport from your accommodation is included",
        "Dog allergies: husky safaris involve close contact with dogs",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "How much does a husky safari cost in Levi?", a: "A short ride costs approx. €50–90, longer safaris €100–280 per person. Prices typically include equipment and instruction." },
        { q: "What is the minimum age for children?", a: "Small children can join short rides with a parent. Driving a sled independently requires age 13–16 depending on provider." },
        { q: "Are the animals well cared for?", a: "Farms in the Levi area are professional operations complying with animal welfare regulations. Feel free to ask any farm about their care practices." },
        { q: "When is the best time?", a: "November to April offers great conditions. Christmas has magical polar twilight atmosphere. Late winter is popular for sunny conditions. In summer, you can visit farms to meet the animals." },
      ],
    },
    readAlso: {
      title: "Read also",
      links: [
        { label: "Christmas in Lapland", href: "/en/levi/christmas-in-lapland" },
        { label: "Northern Lights in Levi", href: "/en/northern-lights" },
        { label: "Winter Clothing Guide", href: "/guide/how-to-dress-for-winter-in-levi-lapland" },
      ],
    },
    cta: {
      hub: "Back to Levi Travel Guide",
      hubLink: "/en/levi",
      accommodation: "Book accommodation in Levi",
      accommodationLink: "/en/accommodations",
    },
    breadcrumbLabel: "Dog Sledding & Reindeer Rides",
  },
};

const DogSleddingReindeerLevi = ({ lang = "fi" }: DogSleddingReindeerLeviProps) => {
  const t = translations[lang] || translations.fi;
  const location = useLocation();

  const customUrls =
    lang === "fi"
      ? { fi: "/opas/husky-safari-poroajelu-levi" as const, en: "/en/guide/dog-sledding-reindeer-levi" as const }
      : { en: "/en/guide/dog-sledding-reindeer-levi" as const, fi: "/opas/husky-safari-poroajelu-levi" as const };

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

            {/* Husky section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">{t.husky.title}</h2>
              <p className="text-muted-foreground mb-6">{t.husky.intro}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {t.husky.options.map((opt, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <h3 className="font-semibold text-foreground">{opt.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{opt.desc}</p>
                    <p className="text-sm font-medium text-primary flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      {opt.price}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Flow */}
              <h3 className="text-lg font-semibold text-foreground mb-3">{t.husky.flowTitle}</h3>
              <ul className="space-y-2">
                {t.husky.flow.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Reindeer section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">{t.reindeer.title}</h2>
              <p className="text-muted-foreground mb-6">{t.reindeer.intro}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.reindeer.options.map((opt, idx) => (
                  <Card key={idx} className="glass-card border-border/30 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <h3 className="font-semibold text-foreground">{opt.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{opt.desc}</p>
                    <p className="text-sm font-medium text-primary flex items-center gap-1">
                      <Euro className="w-4 h-4" />
                      {opt.price}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Comparison table */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.comparison.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {t.comparison.headers.map((h, idx) => (
                        <th
                          key={idx}
                          className={`text-left p-3 text-sm font-semibold text-foreground border-b border-border/30 ${idx === 0 ? "w-1/4" : "w-[37.5%]"}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.comparison.rows.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-3 text-sm font-medium text-foreground">{row[0]}</td>
                        <td className="p-3 text-sm text-muted-foreground">{row[1]}</td>
                        <td className="p-3 text-sm text-muted-foreground">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-primary font-medium mt-4 text-center italic">{t.comparison.note}</p>
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

export default DogSleddingReindeerLevi;
