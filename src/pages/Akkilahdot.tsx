import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Flame, ArrowRight, Loader2, ExternalLink, MessageCircle } from "lucide-react";
import { Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { propertyDetails, getPropertyDetails } from "@/data/propertyDetails";

interface AkkilahdotProps {
  lang?: Language;
}

interface ManualDeal {
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

interface Beds24Deal {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number | null;
  currency: string;
  maxPersons: number;
  available: boolean;
}

// Manual special deals - easy to update
const manualDeals: ManualDeal[] = [];

// Fetch Beds24 availability
const fetchBeds24Availability = async (): Promise<Beds24Deal[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('beds24-availability');

    if (error) {
      console.error('Error fetching Beds24 availability:', error);
      return [];
    }

    return data?.deals || [];
  } catch (err) {
    console.error('Error fetching Beds24 availability:', err);
    return [];
  }
};

const content = {
  fi: {
    meta: {
      title: "Levin äkkilähdöt – Edullisia majoituksia viime hetkellä | Leville.net",
      description: "Löydä parhaat Levi äkkilähdöt! Edullisia huoneistoja ja mökkejä viime hetkellä. Varaa nyt ja säästä – rajoitettu saatavuus.",
      keywords: "Levi äkkilähdöt, Levi last minute, Levi edullinen majoitus, Levi tarjous, Levi viime hetken tarjous",
      canonical: "https://leville.net/akkilahdot"
    },
    title: "Levin äkkilähdöt",
    subtitle: "Tartu tilaisuuteen ja lähde Leville!",
    badge: "🔥 Äkkilähdöt",
    perNight: "/ yö",
    perPerson: "/ hlö",
    total: "yhteensä",
    bookWhatsApp: "Varaa WhatsAppilla",
    exploreApartment: "Tutustu huoneistoon",
    priceNote: "Hinta sisältää siivouksen ja 2 henkilön majoittumisen. Lisähenkilöt +10€/hlö. Liinavaatteet lisäpalveluna 19€/hlö tarvittaessa.",
    sameDayNote: "Kysy hintaa tänään alkavaan varaukseen",
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
    bookWhatsApp: "Book via WhatsApp",
    exploreApartment: "Explore apartment",
    priceNote: "Price includes cleaning and 2 persons. Additional guests +10€/person. Linens available for 19€/person if needed.",
    sameDayNote: "Ask for price for booking starting today",
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
    bookWhatsApp: "Boka via WhatsApp",
    exploreApartment: "Utforska lägenheten",
    priceNote: "Priset inkluderar städning och 2 personer. Extra gäster +10€/person. Sängkläder tillgängliga för 19€/person vid behov.",
    sameDayNote: "Fråga om pris för bokning som börjar idag",
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
    bookWhatsApp: "Über WhatsApp buchen",
    exploreApartment: "Wohnung erkunden",
    priceNote: "Preis beinhaltet Reinigung und 2 Personen. Zusätzliche Gäste +10€/Person. Bettwäsche für 19€/Person bei Bedarf.",
    sameDayNote: "Preis für heute beginnende Buchung anfragen",
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
    bookWhatsApp: "Reservar por WhatsApp",
    exploreApartment: "Explorar apartamento",
    priceNote: "Precio incluye limpieza y 2 personas. Huéspedes adicionales +10€/persona. Ropa de cama disponible por 19€/persona si es necesario.",
    sameDayNote: "Consultar precio para reserva que comienza hoy",
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
    bookWhatsApp: "Réserver via WhatsApp",
    exploreApartment: "Explorer l'appartement",
    priceNote: "Prix comprend le ménage et 2 personnes. Personnes supplémentaires +10€/personne. Linge de lit disponible pour 19€/personne si nécessaire.",
    sameDayNote: "Demander le prix pour une réservation commençant aujourd'hui",
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

  // Fetch Beds24 deals
  const { data: beds24Deals = [], isLoading } = useQuery({
    queryKey: ['beds24-availability'],
    queryFn: fetchBeds24Availability,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  // Format date for display
  const formatDateDisplay = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'fi' ? 'fi-FI' : lang === 'sv' ? 'sv-SE' : lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  // Nights text by language
  const nightsText = (nights: number): string => {
    const texts: Record<Language, string> = {
      fi: nights === 1 ? 'yö' : 'yötä',
      en: nights === 1 ? 'night' : 'nights',
      sv: nights === 1 ? 'natt' : 'nätter',
      de: nights === 1 ? 'Nacht' : 'Nächte',
      es: nights === 1 ? 'noche' : 'noches',
      fr: nights === 1 ? 'nuit' : 'nuits'
    };
    return `${nights} ${texts[lang]}`;
  };

  // Check if date is today
  const isToday = (dateStr: string): boolean => {
    const today = new Date();
    const checkDate = new Date(dateStr);
    return today.toDateString() === checkDate.toDateString();
  };

  // Check if check-in is within 2 days (for 15% discount)
  const isWithinTwoDays = (dateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateStr);
    checkDate.setHours(0, 0, 0, 0);
    const diffTime = checkDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays < 2;
  };

  // Calculate total price with cleaning fee and possible discount
  const getTotalPrice = (deal: Beds24Deal): number | null => {
    if (!deal.price) return null;
    const property = getPropertyDetails(deal.roomId);
    const cleaningFee = property?.cleaningFee || 0;
    let basePrice = deal.price;
    
    // Apply 15% discount if check-in is within 2 days
    if (isWithinTwoDays(deal.checkIn)) {
      basePrice = basePrice * 0.85;
    }
    
    return Math.round(basePrice + cleaningFee);
  };

  // Get booking URL for property
  const getBookingUrl = (roomId: string): string => {
    const property = getPropertyDetails(roomId);
    return property?.bookingUrl || "";
  };

  // Generate WhatsApp booking URL for Beds24 deal
  const generateWhatsAppUrl = (deal: Beds24Deal): string => {
    const totalPrice = getTotalPrice(deal);
    const priceText = totalPrice ? ` Hinta: ${totalPrice}€.` : "";
    const message = `Hei, olen kiinnostunut äkkilähdöstä: ${deal.roomName}, ajalle ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${priceText} Onko kohde vielä vapaana?`;
    return `https://wa.me/35844131313?text=${encodeURIComponent(message)}`;
  };

  // Combine manual and Beds24 deals for schema
  const allDealsForSchema = beds24Deals.map((deal, index) => ({
    "@type": "Offer",
    "position": index + 1,
    "name": deal.roomName,
    "description": `${deal.roomName} - ${deal.nights} nights`,
    "price": getTotalPrice(deal) || 0,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/LimitedAvailability",
    "validFrom": deal.checkIn,
    "validThrough": deal.checkOut
  }));

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
    "itemListElement": allDealsForSchema
  };

  const hasDeals = beds24Deals.length > 0 || manualDeals.length > 0;

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

            {/* Loading state */}
            {isLoading && (
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="glass-card border-border/30">
                    <CardHeader className="pb-3">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-6" />
                      <Skeleton className="h-20 w-full mb-4" />
                      <Skeleton className="h-12 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </section>
            )}

            {/* Beds24 Deals Grid */}
            {!isLoading && beds24Deals.length > 0 && (
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {beds24Deals.map((deal, index) => {
                  const isSameDay = isToday(deal.checkIn);
                  const totalPrice = getTotalPrice(deal);
                  const bookingUrl = getBookingUrl(deal.roomId);
                  
                  return (
                    <ScrollReveal key={deal.id} delay={index * 0.1}>
                      <Card className="glass-card border-border/30 hover:border-red-500/50 transition-all duration-300 overflow-hidden group relative">
                        {/* Last minute badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-red-500 text-white border-0 animate-pulse">
                            <Flame className="w-3 h-3 mr-1" />
                            {t.badge}
                          </Badge>
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDateDisplay(deal.checkIn)} – {formatDateDisplay(deal.checkOut)}</span>
                          </div>
                          <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                            {deal.roomName}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent>
                          {/* Nights info */}
                          <ul className="space-y-1.5 mb-4">
                            <li className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {nightsText(deal.nights)}
                            </li>
                          </ul>

                          {/* Price section */}
                          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 mb-4">
                            {isSameDay ? (
                              <div className="text-base font-semibold text-amber-500 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {t.sameDayNote}
                              </div>
                            ) : totalPrice ? (
                              <>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold text-foreground">{totalPrice}€</span>
                                  <span className="text-muted-foreground text-sm">{t.total}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">
                                  {t.priceNote}
                                </div>
                              </>
                            ) : (
                              <div className="text-base font-semibold text-amber-500 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {t.sameDayNote}
                              </div>
                            )}
                          </div>

                          {/* CTA Buttons */}
                          <div className="space-y-3">
                            {/* Primary: WhatsApp booking */}
                            <a
                              href={generateWhatsAppUrl(deal)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              {t.bookWhatsApp}
                            </a>

                            {/* Secondary: Explore apartment */}
                            {bookingUrl && (
                              <a
                                href={bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground rounded-lg font-medium transition-colors text-sm"
                              >
                                {t.exploreApartment}
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  );
                })}
              </section>
            )}

            {/* Manual Deals Grid (if any) */}
            {!isLoading && manualDeals.length > 0 && (
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {manualDeals.map((deal, index) => {
                  const pricePerPerson = Math.round(deal.price / deal.persons);
                  
                  return (
                    <ScrollReveal key={deal.id} delay={(beds24Deals.length + index) * 0.1}>
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

                          {/* Price */}
                          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-foreground">{deal.price}€</span>
                              <span className="text-muted-foreground text-sm">{t.total}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              {t.priceNote}
                            </div>
                          </div>

                          {/* CTA */}
                          <a
                            href={deal.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {t.bookWhatsApp}
                          </a>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  );
                })}
              </section>
            )}

            {/* No deals available */}
            {!isLoading && !hasDeals && (
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
