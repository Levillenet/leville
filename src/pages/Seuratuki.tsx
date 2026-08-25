import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import HreflangTags from "@/components/HreflangTags";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Users,
  Ticket,
  Share2,
  BedDouble,
  Wallet,
  CheckCircle2,
  Mail,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const CANONICAL = "https://leville.net/seuratuki";
const BOOKING_URL = "https://app.moder.fi/levillenet";
const MAILTO = "mailto:info@leville.net?subject=Seuratuki%20-%20seuramme%20haluaa%20mukaan";

const steps = [
  {
    number: 1,
    icon: Mail,
    title: "Seura ilmoittautuu mukaan",
    description:
      "Seura tai järjestö lähettää meille sähköpostia. Käymme yhteistyön pääkohdat läpi ja sovimme aloituksesta.",
  },
  {
    number: 2,
    icon: Ticket,
    title: "Seura saa oman koodin ja linkin",
    description:
      "Toimitamme seuralle seurakohtaisen varauskoodin ja varauslinkin sekä logon ja selkeät varausohjeet.",
  },
  {
    number: 3,
    icon: Share2,
    title: "Seura jakaa linkkiä omissa kanavissaan",
    description:
      "Seura kertoo mahdollisuudesta jäsenille, vanhemmille ja kannattajille verkkosivuillaan ja somessa.",
  },
  {
    number: 4,
    icon: BedDouble,
    title: "Jäsen varaa majoituksen normaalihintaan",
    description:
      "Varaus tehdään seuran koodilla tai linkillä. Majoittuja maksaa saman hinnan kuin kuka tahansa muukin.",
  },
  {
    number: 5,
    icon: Wallet,
    title: "Seura saa 10 % verottomasta hinnasta",
    description:
      "Toteutuneesta varauksesta maksamme seuralle 10 % majoituksen verottomasta hinnasta.",
  },
];

const clubGets = [
  "Oma seurakohtainen varauskoodi",
  "Oma varauslinkki jaettavaksi",
  "Leville.netin toimittama logo",
  "Selkeät varausohjeet jäsenille",
  "Tarvittaessa muuta markkinointimateriaalia",
];

const clubGives = [
  "Kertoo yhteistyöstä omissa kanavissaan, esimerkiksi Facebookissa ja Instagramissa",
  "Lisää Leville.netin toimittaman logon omille verkkosivuilleen",
  "Julkaisee varausohjeet ja oman varauslinkkinsä verkkosivuillaan",
  "Muistuttaa jäseniä käyttämään seuran koodia Levin matkoilla",
];

const faqs = [
  {
    q: "Saako majoittuja alennusta seuran koodilla?",
    a: "Ei saa. Majoittuja maksaa täysin normaalin hinnan, eikä koodista tule myöskään lisäkustannusta. Koodi kertoo meille, mille seuralle tuki kohdistetaan.",
  },
  {
    q: "Paljonko seura saa yhdestä varauksesta?",
    a: "Seura saa 10 % majoituksen verottomasta hinnasta. Esimerkiksi 1 000 euron veroton majoitushinta tarkoittaa 100 euron tukea seuralle.",
  },
  {
    q: "Mistä seuran koodin ja varauslinkin saa?",
    a: "Toimitamme koodin ja linkin seuralle, kun yhteistyöstä on sovittu. Riittää, että seura on yhteydessä sähköpostitse osoitteeseen info@leville.net.",
  },
  {
    q: "Mitkä varaukset lasketaan mukaan?",
    a: "Mukaan lasketaan toteutuneet majoitusvaraukset, jotka on tehty seuran omalla varauskoodilla tai varauslinkillä.",
  },
  {
    q: "Pitääkö seuran hoitaa varauksia tai myydä jotain?",
    a: "Ei. Tuotemyynnin, tilauslistojen, talkoiden tai sponsorien etsimisen sijaan seuran tarvitsee vain viestiä omille jäsenilleen. Me hoidamme varaukset ja majoituksen.",
  },
  {
    q: "Kuka voi liittyä mukaan?",
    a: "Malli on tarkoitettu urheiluseuroille, järjestöille ja muille yhteisöille, jotka keräävät varoja toimintaansa. Jos et ole varma sopiiko oma yhteisösi mukaan, kysy rohkeasti sähköpostitse.",
  },
];

const Seuratuki = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: "Seuratuki", href: "/seuratuki" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: "https://leville.net/" },
      { "@type": "ListItem", position: 2, name: "Seuratuki", item: CANONICAL },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Leville.netin seuratuki urheiluseuroille ja järjestöille",
    serviceType: "Urheiluseuran varainhankinta majoitusvarauksilla",
    description:
      "Urheiluseura tai järjestö saa oman varauskoodin ja varauslinkin Levin majoituksiin. Majoittuja maksaa normaalin hinnan ja seura saa 10 % majoituksen verottomasta hinnasta.",
    url: CANONICAL,
    areaServed: "Levi, Kittilä, Suomi",
    provider: {
      "@type": "Organization",
      name: "Leville.net",
      url: "https://leville.net",
      email: "info@leville.net",
      telephone: "+358 44 13 13 13",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Urheiluseurat ja järjestöt",
    },
  };

  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>Seuratuki – urheiluseuran varainhankinta ilman myyntiä | Leville.net</title>
        <meta
          name="description"
          content="Uusi tapa seuran varainhankintaan: jäsen varaa Levin majoituksen seuran koodilla normaalihintaan ja seura saa 10 % verottomasta hinnasta. Ei tuotemyyntiä, ei tilauksia."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content="Seuratuki – urheiluseuran varainhankinta ilman myyntiä | Leville.net" />
        <meta
          property="og:description"
          content="Tue omaa seuraasi varaamalla majoitus Leviltä. Sinä maksat normaalin hinnan, seurasi saa 10 % majoituksen verottomasta hinnasta."
        />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-club-support.jpg" />
        <meta property="og:image:secure_url" content="https://leville.net/og-club-support.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Urheiluseura saapumassa majoitukseen Levillä" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seuratuki – urheiluseuran varainhankinta ilman myyntiä" />
        <meta
          name="twitter:description"
          content="Jäsen varaa Levin majoituksen seuran koodilla normaalihintaan – seura saa 10 % verottomasta hinnasta."
        />
        <meta name="twitter:image" content="https://leville.net/og-club-support.jpg" />
        <meta name="twitter:image:alt" content="Urheiluseura saapumassa majoitukseen Levillä" />
        <script type="application/ld+json">{JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema])}</script>
      </Helmet>
      <HreflangTags
        currentPath="/seuratuki"
        currentLang="fi"
        customUrls={{ fi: "/seuratuki", en: "/en/club-support" }}
      />

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <SubpageBackground />
        <Header />

        <main className="pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Hero */}
            <ScrollReveal>
              <section className="text-center mb-16 max-w-4xl mx-auto">
                <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6 tracking-wider uppercase">
                  Seuratuki
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                  Tue omaa seuraasi – varaa majoitus Leviltä
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  Uusi yhteistyömalli urheiluseuroille, järjestöille ja muille yhteisöille, jotka keräävät varoja
                  perinteisesti esimerkiksi myymällä tuotteita, pitämällä talkoita tai keräämällä sponsorointitukea.
                  Sinä maksat majoituksesta normaalin hinnan, eikä sinulle tule mitään lisäkustannusta. Seurasi saa
                  varauksestasi 10 % majoituksen verottomasta hinnasta.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="seuratuki-hero">
                      Varaa majoitus Leviltä
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-medium px-8">
                    <a href={MAILTO}>
                      <Mail className="w-4 h-4 mr-2" />
                      Ota seurasi mukaan
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-10">
                  {["Ei lisäkustannusta majoittujalle", "Ei tuotemyyntiä seuralle", "Tuki toteutuneista varauksista"].map(
                    (badge) => (
                      <div key={badge} className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium text-sm">{badge}</span>
                      </div>
                    )
                  )}
                </div>
              </section>
            </ScrollReveal>

            {/* Laskuesimerkki */}
            <ScrollReveal delay={0.1}>
              <section className="mb-20 max-w-3xl mx-auto">
                <div className="glass-card rounded-2xl p-8 md:p-10 text-center border-2 border-primary/30">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">
                    Näin paljon yksi varaus tuo seuralle
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-foreground">1 000 €</div>
                      <div className="text-sm text-muted-foreground mt-1">majoituksen veroton hinta</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary rotate-90 sm:rotate-0" />
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-primary">100 €</div>
                      <div className="text-sm text-muted-foreground mt-1">tukea seuralle</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-6 leading-relaxed">
                    Tuki on aina 10 % majoituksen verottomasta hinnasta. Majoittujan maksama hinta pysyy samana.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* Kaksi kohderyhmää */}
            <ScrollReveal delay={0.2}>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Kenelle seuratuki on tarkoitettu?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  <div className="glass-card p-8 rounded-2xl flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <BedDouble className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Olet lähdössä Leville</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Varaa majoitus tavalliseen tapaan ja käytä oman seurasi varauskoodia tai varauslinkkiä. Maksat
                      saman hinnan kuin muutkin, mutta varauksesi tuo seurallesi rahaa. Jos et tiedä seurasi koodia,
                      kysy sitä suoraan omasta seurastasi.
                    </p>
                    <div className="mt-auto">
                      <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="seuratuki-majoittuja">
                          Varaa majoitus
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="glass-card p-8 rounded-2xl flex flex-col border-2 border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Edustat seuraa, järjestöä tai yhteisöä</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Yhteisönne saa uuden varainhankinnan muodon ilman tuotemyyntiä, tilauslistoja, talkoita tai
                      sponsorien etsimistä. Te kerrotte mahdollisuudesta omille jäsenillenne ja jaatte oman
                      varauslinkkinne – me hoidamme majoituksen ja varaukset.
                    </p>
                    <div className="mt-auto">
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                        <a href={MAILTO}>
                          <Mail className="w-4 h-4 mr-2" />
                          Kysy lisää sähköpostitse
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Näin se toimii */}
            <ScrollReveal delay={0.3}>
              <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Näin seuran varainhankinta toimii
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.number} className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-semibold tracking-wider text-muted-foreground mb-2">
                          VAIHE {step.number}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* Mitä seura saa & mitä seuralta odotetaan */}
            <ScrollReveal delay={0.4}>
              <section className="mb-20 grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">
                    Mitä seura saa Leville.netiltä
                  </h2>
                  <ul className="space-y-4">
                    {clubGets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground">
                    Mitä seuralta odotetaan
                  </h2>
                  <ul className="space-y-4">
                    {clubGives.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Megaphone className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-6">
                    Mitä paremmin seura viestii mahdollisuudesta omille jäsenilleen, sitä enemmän varauksia ja sitä
                    enemmän tukea seuralle kertyy.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* UKK */}
            <ScrollReveal delay={0.5}>
              <section className="mb-20 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-foreground">
                  Usein kysytyt kysymykset seuratuesta
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={faq.q} value={`faq-${i + 1}`} className="glass-card border-white/10 px-6 rounded-xl">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </ScrollReveal>

            {/* Loppu-CTA */}
            <ScrollReveal delay={0.6}>
              <section className="max-w-3xl mx-auto">
                <div className="glass-card rounded-2xl p-8 md:p-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-foreground">
                    Liitä seurasi mukaan
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Lähetä meille sähköpostia, niin kerromme lisää ja toimitamme seurallenne oman varauskoodin,
                    varauslinkin sekä valmiit materiaalit. Yhteydenotto ei sido mihinkään.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                      <a href={MAILTO}>
                        <Mail className="w-4 h-4 mr-2" />
                        info@leville.net
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="px-8">
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-source="seuratuki-footer">
                        Varaa majoitus
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm">
                    <Link to="/majoitukset" className="text-muted-foreground hover:text-foreground transition-colors">
                      Majoitukset Levillä
                    </Link>
                    <Link to="/mokit-levilla" className="text-muted-foreground hover:text-foreground transition-colors">
                      Mökit Levillä
                    </Link>
                    <Link to="/yhteystiedot" className="text-muted-foreground hover:text-foreground transition-colors">
                      Yhteystiedot
                    </Link>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>

        <Footer lang="fi" />
      </div>
    </>
  );
};

export default Seuratuki;
