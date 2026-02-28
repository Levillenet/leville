import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema } from "@/utils/structuredData";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Train, Bus, MapPin, AlertTriangle, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Language } from "@/translations";
import ReadNextSection from "@/components/guide/ReadNextSection";

interface LeviWithoutCarProps {
  lang?: Language;
}

const translations = {
  fi: {
    meta: {
      title: "Levi ilman autoa – liikkuminen, majoitus ja vinkit | Leville.net",
      description: "Onko Levi helppo ilman autoa? Katso miten saavut, liikut ja missä majoitut Levin keskustassa ilman omaa autoa.",
      canonical: "https://leville.net/opas/levi-ilman-autoa",
    },
    title: "Levi ilman autoa",
    subtitle: "Näin liikut ja lomailet helposti",
    intro: "Kyllä, Leville pääsee hyvin ilman omaa autoa! Lentokentältä kulkee bussi suoraan keskustaan, ja perillä liikut kätevästi hiihtobussilla tai jalkaisin.",
    forWhom: "Tämä opas sopii erityisesti:",
    forWhomList: [
      "Lentäen tuleville, jotka haluavat välttää autonvuokrauksen",
      "Junalla saapuville",
      "Perheille, jotka haluavat helpon loman",
      "Pariskunnille, jotka arvostavat kävelyetäisyyksiä",
    ],
    sections: {
      arrival: {
        title: "Saapuminen Leville ilman autoa",
        flight: {
          title: "Lento Kittilään",
          items: [
            "Kittilän lentokenttä sijaitsee 15 km Levin keskustasta",
            "Airport Bus Levi odottaa lentojen saapumista – varaa etukäteen sesonkina",
            "Matka keskustaan noin 20 minuuttia",
          ],
        },
        train: {
          title: "Juna Kolariin tai Rovaniemelle",
          items: [
            "Yöjuna Helsingistä (noin 12 tuntia)",
            "Jatkoyhteys bussilla Leville (noin 45 min Kolarista ja 2 tuntia Rovaniemeltä)",
          ],
        },
      },
      transport: {
        title: "Liikkuminen Levillä",
        skibus: {
          title: "Ski Bus",
          items: [
            "Kiertää Levin keskustan, rinteet ja majoitusalueet",
            "Kulkee 15–30 min välein sesonkina",
          ],
          link: "https://www.levi.fi/en/ski/levi-ski-resort-services/ski-bus/",
          linkText: "Katso Ski Bus -aikataulut",
        },
        walking: {
          title: "Kävelyetäisyydet",
          items: [
            "Levin keskusta on kompakti",
            "Rinteiden juurelle 5–15 min kävely keskustasta",
            "Ravintolat, kaupat ja palvelut kävelymatkan päässä",
          ],
        },
        taxi: {
          title: "Taksit",
          items: [
            "Levin Taksi: 0600 300 72",
            "Varaa etukäteen ilta-aikaan ja viikonloppuisin",
            "Uber ja Bolt toimii Levillä sesonkiaikoina",
          ],
        },
      },
      accommodation: {
        title: "Missä kannattaa majoittua ilman autoa",
        intro: "Kun autoa ei ole, majoituksen sijainti on kaikkein tärkein valinta.",
        recommend: "Suosittelemme:",
        recommendList: [
          "Levin keskusta – kaikki palvelut kävelyetäisyydellä",
          "Ski-in / ski-out -kohteet – suoraan rinteen juurelta",
          "South Point -alue – hissit ja skibussi lähellä",
        ],
        avoid: "Vältä:",
        avoidList: [
          "Syrjäisiä mökkejä ilman hyviä bussiyhteyksiä",
          "Kaukana keskustasta ja Skibussi-reitin ulkopuolella olevia majoituksia, jos et halua tilata taksia joka päivä",
        ],
      },
      notFor: {
        title: "Kenelle Levi ilman autoa ei ehkä sovi",
        intro: "Rehellisesti: kaikille tämä ei ole paras vaihtoehto.",
        consider: "Harkitse autonvuokrausta, jos:",
        items: [
          "Haluat vierailla etäisemmillä kohteilla tai aktiviteeteissa",
          "Majoitut syrjäisessä mökissä ilman bussiyhteyttä",
          "Matkustat pienten lasten kanssa ja tarvitset joustavuutta",
          "Suunnittelet paljon aktiviteetteja eri puolilla Leviä",
        ],
      },
    },
    summary: {
      title: "Yhteenveto",
      text: "Levi toimii erinomaisesti ilman autoa, kun valitset keskustamajoituksen. Skibussit, kävelymatkat ja lentokenttäkuljetukset hoitavat loput.",
    },
    cta: "Katso majoitukset Levin keskustassa",
    backToHub: "← Takaisin matkaoppaaseen",
    relatedTitle: "Lue myös",
    relatedLinks: [
      { text: "Liikkuminen Levillä", href: "/opas/liikkuminen-levilla" },
      { text: "Miten pääsee Leville", href: "/matka/miten-paasee-leville-helsingista" },
    ],
    breadcrumbs: [
      { label: "Etusivu", href: "/" },
      { label: "Matkaopas", href: "/opas/matkaopas-levi" },
      { label: "Levi ilman autoa", href: "/opas/levi-ilman-autoa" },
    ],
    travelHubLink: "/opas/matkaopas-levi",
    accommodationsHref: "/majoitukset",
    readNext: {
      title: "Lue myös",
      links: [
        { title: "Miten pääsee Leville", desc: "Lennot ja junat Leville", href: "/matka/miten-paasee-leville-helsingista" },
        { title: "Liikkuminen Levillä", desc: "Skibussit ja taksit", href: "/opas/liikkuminen-levilla" },
        { title: "Laskettelu Levillä", desc: "Rinteet kävelymatkan päässä", href: "/opas/laskettelu-levi" },
        { title: "Ravintolat ja palvelut", desc: "Kaikki keskustassa", href: "/opas/ravintolat-ja-palvelut-levilla" },
      ],
    },
  },
  en: {
    meta: {
      title: "Levi Without a Car – Getting Around, Accommodation | Leville.net",
      description: "Is Levi easy without a car? See how to arrive, get around and where to stay in Levi center without your own car.",
      canonical: "https://leville.net/guide/levi-without-a-car",
    },
    title: "Levi Without a Car",
    subtitle: "How to Get Around Easily",
    intro: "Yes, you can easily get to Levi without your own car! Airport buses run directly to the center, and once there you can get around conveniently by ski bus or on foot.",
    forWhom: "This guide is especially for:",
    forWhomList: [
      "Those flying in who want to avoid car rental",
      "Travelers arriving by train",
      "Families looking for an easy vacation",
      "Couples who appreciate walkable distances",
    ],
    sections: {
      arrival: {
        title: "Arriving in Levi Without a Car",
        flight: {
          title: "Flying to Kittilä",
          items: [
            "Kittilä airport is 15 km from Levi center",
            "Airport Bus Levi waits for flight arrivals – book in advance during peak season",
            "Journey to center takes about 20 minutes",
          ],
        },
        train: {
          title: "Train to Kolari or Rovaniemi",
          items: [
            "Night train from Helsinki (about 12 hours)",
            "Connection by bus to Levi (about 45 min from Kolari and 2 hours from Rovaniemi)",
          ],
        },
      },
      transport: {
        title: "Getting Around in Levi",
        skibus: {
          title: "Ski Bus",
          items: [
            "Circles Levi center, slopes and accommodation areas",
            "Runs every 15–30 min during peak season",
          ],
          link: "https://www.levi.fi/en/ski/levi-ski-resort-services/ski-bus/",
          linkText: "See Ski Bus schedules",
        },
        walking: {
          title: "Walking Distances",
          items: [
            "Levi center is compact",
            "5–15 min walk from center to slopes",
            "Restaurants, shops and services within walking distance",
          ],
        },
        taxi: {
          title: "Taxis",
          items: [
            "Levi Taxi: 0600 300 72",
            "Book in advance for evenings and weekends",
            "Uber and Bolt work in Levi during peak season",
          ],
        },
      },
      accommodation: {
        title: "Where to Stay Without a Car",
        intro: "Without a car, accommodation location is the most important choice.",
        recommend: "We recommend:",
        recommendList: [
          "Levi center – all services within walking distance",
          "Ski-in / ski-out properties – directly at the slopes",
          "South Point area – lifts and ski bus nearby",
        ],
        avoid: "Avoid:",
        avoidList: [
          "Remote cabins without good bus connections",
          "Accommodations far from center and outside ski bus route, unless you want to order a taxi daily",
        ],
      },
      notFor: {
        title: "Who Levi Without a Car Might Not Suit",
        intro: "Honestly: this isn't the best option for everyone.",
        consider: "Consider renting a car if:",
        items: [
          "You want to visit remote destinations or activities",
          "You're staying in a remote cabin without bus connection",
          "You're traveling with small children and need flexibility",
          "You're planning many activities in different parts of Levi",
        ],
      },
    },
    summary: {
      title: "Summary",
      text: "Levi works excellently without a car when you choose central accommodation. Ski buses, walking distances and airport transfers take care of the rest.",
    },
    cta: "View Accommodations in Levi Center",
    backToHub: "← Back to Travel Guide",
    relatedTitle: "Read Also",
    relatedLinks: [
      { text: "Getting Around in Levi", href: "/guide/getting-around-in-levi" },
      { text: "How to Get to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Travel Guide", href: "/guide/travel-to-levi" },
      { label: "Levi Without a Car", href: "/guide/levi-without-a-car" },
    ],
    travelHubLink: "/guide/travel-to-levi",
    accommodationsHref: "/en/accommodations",
    readNext: {
      title: "Read Next",
      links: [
        { title: "How to Get to Levi", desc: "Flights and trains to Levi", href: "/travel/how-to-get-to-levi-from-helsinki-and-abroad" },
        { title: "Getting Around Levi", desc: "Ski buses and taxis", href: "/guide/getting-around-in-levi" },
        { title: "Skiing in Levi", desc: "Slopes within walking distance", href: "/guide/skiing-in-levi" },
        { title: "Restaurants & Services", desc: "Everything in the center", href: "/guide/restaurants-and-services-in-levi" },
      ],
    },
  },
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const LeviWithoutCar = ({ lang = "fi" }: LeviWithoutCarProps) => {
  const location = useLocation();
  const t = lang === "en" ? translations.en : translations.fi;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": t.breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://leville.net${crumb.href}`
    }))
  };

  const customUrls = {
    fi: "https://leville.net/opas/levi-ilman-autoa",
    en: "https://leville.net/guide/levi-without-a-car"
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
        <meta property="og:locale" content={localeMap[lang]} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        
        <main className="pt-8 pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back to Hub */}
            <div className="mb-6">
              <Link 
                to={t.travelHubLink} 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToHub}
              </Link>
            </div>

            {/* Hero */}
            <ScrollReveal>
              <section className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {t.title}
                  <span className="block text-lg sm:text-xl md:text-2xl text-primary font-medium mt-2">
                    {t.subtitle}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  {t.intro}
                </p>
                <div className="text-left max-w-xl mx-auto">
                  <p className="font-medium text-foreground mb-2">{t.forWhom}</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {t.forWhomList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </ScrollReveal>

            {/* Arrival Section */}
            <ScrollReveal>
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Plane className="w-6 h-6 text-primary" />
                  {t.sections.arrival.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Plane className="w-5 h-5 text-primary" />
                        {t.sections.arrival.flight.title}
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {t.sections.arrival.flight.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Train className="w-5 h-5 text-primary" />
                        {t.sections.arrival.train.title}
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {t.sections.arrival.train.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </ScrollReveal>

            {/* Transport Section */}
            <ScrollReveal>
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Bus className="w-6 h-6 text-primary" />
                  {t.sections.transport.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">{t.sections.transport.skibus.title}</h3>
                      <ul className="space-y-2 text-muted-foreground mb-4">
                        {t.sections.transport.skibus.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <a 
                        href={t.sections.transport.skibus.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline inline-flex items-center gap-1"
                      >
                        {t.sections.transport.skibus.linkText}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">{t.sections.transport.walking.title}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {t.sections.transport.walking.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">{t.sections.transport.taxi.title}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {t.sections.transport.taxi.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </ScrollReveal>

            {/* Accommodation Section */}
            <ScrollReveal>
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  {t.sections.accommodation.title}
                </h2>
                <p className="text-muted-foreground mb-6">{t.sections.accommodation.intro}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-card border-white/10 border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">{t.sections.accommodation.recommend}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {t.sections.accommodation.recommendList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="glass-card border-white/10 border-l-4 border-l-destructive">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3">{t.sections.accommodation.avoid}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {t.sections.accommodation.avoidList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </ScrollReveal>

            {/* Not For Section */}
            <ScrollReveal>
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                  {t.sections.notFor.title}
                </h2>
                <Card className="glass-card border-white/10 border-l-4 border-l-warning">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{t.sections.notFor.intro}</p>
                    <p className="font-medium text-foreground mb-3">{t.sections.notFor.consider}</p>
                    <ul className="space-y-2 text-muted-foreground">
                      {t.sections.notFor.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-warning">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </ScrollReveal>

            {/* Read Next */}
            <ReadNextSection title={t.readNext.title} links={t.readNext.links} />

            {/* Summary + CTA */}
            <ScrollReveal>
              <section className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">{t.summary.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t.summary.text}</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to={t.accommodationsHref}>
                    {t.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </section>
            </ScrollReveal>

            {/* Related Links */}
            <ScrollReveal>
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t.relatedTitle}</h3>
                <div className="flex flex-wrap gap-3">
                  {t.relatedLinks.map((link, i) => (
                    <Link 
                      key={i} 
                      to={link.href} 
                      className="text-primary hover:underline text-sm"
                    >
                      {link.text} →
                    </Link>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>
        
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default LeviWithoutCar;
