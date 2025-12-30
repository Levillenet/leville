import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Home, Clock, Flame, ArrowRight } from "lucide-react";
import { Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";

interface AkkilahdotProps {
  lang?: Language;
}

interface Deal {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  dates: string;
  originalPrice?: number;
  price: number;
  persons: number;
  features: Record<Language, string[]>;
  bookingUrl: string;
  urgency?: Record<Language, string>;
}

// Last-minute deals data - easy to update
const deals: Deal[] = [
  {
    id: "new-year-2025",
    title: {
      fi: "Uudenvuoden alppitalohuoneisto",
      en: "New Year's Alpine Apartment",
      sv: "Nyårs alplägenhet",
      de: "Silvester Alpenwohnung",
      es: "Apartamento alpino de Año Nuevo",
      fr: "Appartement alpin du Nouvel An"
    },
    description: {
      fi: "Vietä uudenvuodenaatto Levin huipulla! Tilava 10 hengen alppitalohuoneisto täydellisellä sijainnilla.",
      en: "Celebrate New Year's Eve at Levi peak! Spacious 10-person alpine apartment in perfect location.",
      sv: "Fira nyårsafton på Levis topp! Rymlig alplägenhet för 10 personer på perfekt läge.",
      de: "Feiern Sie Silvester auf dem Levi-Gipfel! Geräumige Alpenwohnung für 10 Personen in perfekter Lage.",
      es: "¡Celebra Nochevieja en la cima de Levi! Amplio apartamento alpino para 10 personas en ubicación perfecta.",
      fr: "Fêtez le Nouvel An au sommet de Levi ! Spacieux appartement alpin pour 10 personnes parfaitement situé."
    },
    dates: "31.12.2024 – 4.1.2025",
    price: 2000,
    persons: 10,
    features: {
      fi: ["4 yötä", "Täysin varusteltu keittiö", "Oma sauna", "Parveke tunturinäkymällä", "Suksivarasto"],
      en: ["4 nights", "Fully equipped kitchen", "Private sauna", "Balcony with fell view", "Ski storage"],
      sv: ["4 nätter", "Fullt utrustat kök", "Egen bastu", "Balkong med fjällutsikt", "Skidförvaring"],
      de: ["4 Nächte", "Voll ausgestattete Küche", "Eigene Sauna", "Balkon mit Fjällblick", "Skiaufbewahrung"],
      es: ["4 noches", "Cocina totalmente equipada", "Sauna privada", "Balcón con vista a la montaña", "Guardaesquís"],
      fr: ["4 nuits", "Cuisine entièrement équipée", "Sauna privé", "Balcon avec vue sur les montagnes", "Local à skis"]
    },
    bookingUrl: "https://wa.me/35844131313?text=Hei!%20Olen%20kiinnostunut%20äkkilähdöstä%2031.12-4.1%20(10%20hlö%20alppitalohuoneisto%202000€)",
    urgency: {
      fi: "Vain 1 vapaa!",
      en: "Only 1 left!",
      sv: "Endast 1 kvar!",
      de: "Nur noch 1 frei!",
      es: "¡Solo queda 1!",
      fr: "Plus qu'1 disponible !"
    }
  }
];

const content = {
  fi: {
    meta: {
      title: "Levin äkkilähdöt – Edullisia majoituksia viime hetkellä | Leville.net",
      description: "Löydä parhaat Levi äkkilähdöt! Edullisia huoneistoja ja mökkejä viime hetkellä. Varaa nyt ja säästä – rajoitettu saatavuus.",
      keywords: "Levi äkkilähdöt, Levi last minute, Levi edullinen majoitus, Levi tarjous, Levi viime hetken tarjous",
      canonical: "https://leville.net/akkilahdot"
    },
    title: "Levin äkkilähdöt",
    subtitle: "Tarttu tilaisuuteen! Edullisia majoituksia rajoitettu erä.",
    badge: "🔥 Äkkilähdöt",
    perNight: "/ yö",
    perPerson: "/ hlö",
    total: "yhteensä",
    bookNow: "Varaa nyt",
    persons: "henkilöä",
    noDeals: "Ei tällä hetkellä äkkilähtöjä saatavilla. Tarkista pian uudelleen!",
    whyTitle: "Miksi äkkilähtö?",
    whyItems: [
      "Jopa 50% edullisempia hintoja",
      "Samat laadukkaat majoitukset",
      "Nopea varaus WhatsAppilla",
      "Rajoitettu saatavuus – toimi nopeasti!"
    ]
  },
  en: {
    meta: {
      title: "Levi Last-Minute Deals – Affordable Accommodation | Leville.net",
      description: "Find the best Levi last-minute deals! Affordable apartments and cabins at the last minute. Book now and save – limited availability.",
      keywords: "Levi last minute, Levi deals, Levi affordable accommodation, Levi offer, Levi late deals",
      canonical: "https://leville.net/en/last-minute"
    },
    title: "Levi Last-Minute Deals",
    subtitle: "Seize the opportunity! Limited affordable accommodations available.",
    badge: "🔥 Last Minute",
    perNight: "/ night",
    perPerson: "/ person",
    total: "total",
    bookNow: "Book now",
    persons: "persons",
    noDeals: "No last-minute deals available at the moment. Check back soon!",
    whyTitle: "Why last-minute?",
    whyItems: [
      "Up to 50% lower prices",
      "Same quality accommodations",
      "Quick booking via WhatsApp",
      "Limited availability – act fast!"
    ]
  },
  sv: {
    meta: {
      title: "Levi Sista Minuten – Prisvärda boenden | Leville.net",
      description: "Hitta de bästa Levi sista minuten-erbjudandena! Prisvärda lägenheter och stugor i sista stund. Boka nu och spara – begränsad tillgänglighet.",
      keywords: "Levi sista minuten, Levi erbjudanden, Levi prisvärt boende",
      canonical: "https://leville.net/sv/sista-minuten"
    },
    title: "Levi Sista Minuten",
    subtitle: "Ta chansen! Begränsade prisvärda boenden tillgängliga.",
    badge: "🔥 Sista Minuten",
    perNight: "/ natt",
    perPerson: "/ person",
    total: "totalt",
    bookNow: "Boka nu",
    persons: "personer",
    noDeals: "Inga sista minuten-erbjudanden tillgängliga just nu. Kolla tillbaka snart!",
    whyTitle: "Varför sista minuten?",
    whyItems: [
      "Upp till 50% lägre priser",
      "Samma kvalitetsboenden",
      "Snabb bokning via WhatsApp",
      "Begränsad tillgänglighet – agera snabbt!"
    ]
  },
  de: {
    meta: {
      title: "Levi Last-Minute-Angebote – Günstige Unterkünfte | Leville.net",
      description: "Finden Sie die besten Levi Last-Minute-Angebote! Günstige Apartments und Hütten kurzfristig. Jetzt buchen und sparen – begrenzte Verfügbarkeit.",
      keywords: "Levi Last Minute, Levi Angebote, Levi günstige Unterkunft",
      canonical: "https://leville.net/de/last-minute"
    },
    title: "Levi Last-Minute",
    subtitle: "Nutzen Sie die Gelegenheit! Begrenzte günstige Unterkünfte verfügbar.",
    badge: "🔥 Last Minute",
    perNight: "/ Nacht",
    perPerson: "/ Person",
    total: "gesamt",
    bookNow: "Jetzt buchen",
    persons: "Personen",
    noDeals: "Derzeit keine Last-Minute-Angebote verfügbar. Schauen Sie bald wieder vorbei!",
    whyTitle: "Warum Last-Minute?",
    whyItems: [
      "Bis zu 50% günstigere Preise",
      "Dieselben Qualitätsunterkünfte",
      "Schnelle Buchung via WhatsApp",
      "Begrenzte Verfügbarkeit – handeln Sie schnell!"
    ]
  },
  es: {
    meta: {
      title: "Ofertas de última hora en Levi – Alojamiento asequible | Leville.net",
      description: "¡Encuentra las mejores ofertas de última hora en Levi! Apartamentos y cabañas asequibles de último minuto. Reserva ahora y ahorra – disponibilidad limitada.",
      keywords: "Levi última hora, ofertas Levi, alojamiento asequible Levi",
      canonical: "https://leville.net/es/ultima-hora"
    },
    title: "Ofertas de última hora en Levi",
    subtitle: "¡Aprovecha la oportunidad! Alojamientos asequibles con disponibilidad limitada.",
    badge: "🔥 Última hora",
    perNight: "/ noche",
    perPerson: "/ persona",
    total: "total",
    bookNow: "Reservar ahora",
    persons: "personas",
    noDeals: "No hay ofertas de última hora disponibles en este momento. ¡Vuelve pronto!",
    whyTitle: "¿Por qué última hora?",
    whyItems: [
      "Hasta 50% de descuento",
      "Los mismos alojamientos de calidad",
      "Reserva rápida vía WhatsApp",
      "¡Disponibilidad limitada – actúa rápido!"
    ]
  },
  fr: {
    meta: {
      title: "Offres de dernière minute à Levi – Hébergement abordable | Leville.net",
      description: "Trouvez les meilleures offres de dernière minute à Levi ! Appartements et chalets abordables à la dernière minute. Réservez maintenant et économisez – disponibilité limitée.",
      keywords: "Levi dernière minute, offres Levi, hébergement abordable Levi",
      canonical: "https://leville.net/fr/derniere-minute"
    },
    title: "Offres de dernière minute à Levi",
    subtitle: "Saisissez l'opportunité ! Hébergements abordables en disponibilité limitée.",
    badge: "🔥 Dernière minute",
    perNight: "/ nuit",
    perPerson: "/ personne",
    total: "total",
    bookNow: "Réserver maintenant",
    persons: "personnes",
    noDeals: "Pas d'offres de dernière minute disponibles pour le moment. Revenez bientôt !",
    whyTitle: "Pourquoi dernière minute ?",
    whyItems: [
      "Jusqu'à 50% de réduction",
      "Les mêmes hébergements de qualité",
      "Réservation rapide via WhatsApp",
      "Disponibilité limitée – agissez vite !"
    ]
  }
};

const Akkilahdot = ({ lang = "fi" }: AkkilahdotProps) => {
  const location = useLocation();
  const t = content[lang];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": t.title,
    "description": t.meta.description,
    "url": t.meta.canonical,
    "provider": {
      "@type": "Organization",
      "name": "Leville.net",
      "url": "https://leville.net"
    },
    "itemListElement": deals.map((deal, index) => ({
      "@type": "Offer",
      "position": index + 1,
      "name": deal.title[lang],
      "description": deal.description[lang],
      "price": deal.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/LimitedAvailability",
      "validFrom": "2024-12-29",
      "validThrough": "2024-12-31"
    }))
  };

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "en" ? "en_US" : lang} />
        <meta property="og:site_name" content="Leville.net" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <ScrollReveal>
              <section className="text-center mb-10 md:mb-14">
                <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30 text-sm px-4 py-1">
                  {t.badge}
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  {t.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>
              </section>
            </ScrollReveal>

            {/* Deals Grid */}
            {deals.length > 0 ? (
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {deals.map((deal, index) => {
                  const pricePerPerson = Math.round(deal.price / deal.persons);
                  
                  return (
                    <ScrollReveal key={deal.id} delay={index * 0.1}>
                      <Card className="glass-card border-border/30 hover:border-red-500/50 transition-all duration-300 overflow-hidden group relative">
                        {/* Urgency badge */}
                        {deal.urgency && (
                          <div className="absolute top-4 right-4 z-10">
                            <Badge className="bg-red-500 text-white border-0 animate-pulse">
                              <Flame className="w-3 h-3 mr-1" />
                              {deal.urgency[lang]}
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{deal.dates}</span>
                          </div>
                          <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                            {deal.title[lang]}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                            {deal.description[lang]}
                          </p>

                          {/* Features */}
                          <ul className="space-y-1.5 mb-6">
                            {deal.features[lang].map((feature) => (
                              <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          {/* Persons */}
                          <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{deal.persons} {t.persons}</span>
                          </div>

                          {/* Price */}
                          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-foreground">{deal.price}€</span>
                              <span className="text-muted-foreground text-sm">{t.total}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              = {pricePerPerson}€ {t.perPerson}
                            </div>
                          </div>

                          {/* CTA */}
                          <a
                            href={deal.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors group"
                          >
                            {t.bookNow}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  );
                })}
              </section>
            ) : (
              <ScrollReveal>
                <div className="text-center py-12 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{t.noDeals}</p>
                </div>
              </ScrollReveal>
            )}

            {/* Why section */}
            <ScrollReveal delay={0.2}>
              <section className="max-w-2xl mx-auto">
                <div className="glass-card border-primary/30 rounded-xl p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500" />
                    {t.whyTitle}
                  </h2>
                  <ul className="space-y-3">
                    {t.whyItems.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
      </div>
    </>
  );
};

export default Akkilahdot;
