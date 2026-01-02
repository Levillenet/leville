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
import { Calendar, Clock, ArrowRight, Loader2, ExternalLink, MessageCircle, Sparkles, Ticket, Flame, Users } from "lucide-react";
import { Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { getDefaultPropertyDetails, getAllDefaultPropertyDetails } from "@/data/propertyDetails";
import { useAdminSettings, DbPropertySettings, DbPeriodSettings } from "@/hooks/useAdminSettings";

// Property background images
import glacierImage from "@/assets/deals/glacier.jpg";
import skistarImage from "@/assets/deals/skistar.jpg";
import karhunvartijaImage from "@/assets/deals/karhunvartija.jpg";
import karhupirttiImage from "@/assets/deals/karhupirtti.jpg";
import chaletsImage from "@/assets/deals/chalets.jpg";

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
    subtitle: "Tartu tilaisuuteen ja lähde Leville! Varaukset tehdään WhatsApp-viestillä, jotta voimme varmistaa saatavuuden.",
    badge: "🔥 Äkkilähdöt",
    perNight: "/ yö",
    perPerson: "/ hlö",
    total: "yhteensä",
    bookWhatsApp: "Varaa WhatsAppilla",
    exploreApartment: "Tutustu huoneistoon",
    priceNote: "Hinta sisältää siivouksen. Liinavaatteet 19€/hlö.",
    sameDayNote: "Kysy hintaa nopeasti alkavaan majoitukseen",
    priceNotAvailable: "Hinta ei saatavilla – varmista WhatsAppissa",
    discountBadge: "Nopean lomailijan etu!",
    specialOfferBadge: "Erikoistarjous",
    skiPassBadge: "Hissilippu",
    noDeals: "Ei äkkilähtöjä saatavilla tällä hetkellä. Tarkista tilanne myöhemmin!",
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
    subtitle: "Seize the opportunity! Bookings are made via WhatsApp so we can confirm availability.",
    badge: "🔥 Last Minute",
    perNight: "/ night",
    perPerson: "/ person",
    total: "total",
    bookWhatsApp: "Book via WhatsApp",
    exploreApartment: "Explore apartment",
    priceNote: "Price includes cleaning. Linens 19€/person.",
    sameDayNote: "Ask for price for quick-start accommodation",
    priceNotAvailable: "Price not available – confirm via WhatsApp",
    discountBadge: "Quick traveler bonus!",
    specialOfferBadge: "Special offer",
    skiPassBadge: "Ski pass",
    noDeals: "No last-minute deals available at the moment. Check back later!",
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
    subtitle: "Ta chansen! Bokningar görs via WhatsApp så att vi kan bekräfta tillgängligheten.",
    badge: "🔥 Sista Minuten",
    perNight: "/ natt",
    perPerson: "/ person",
    total: "totalt",
    bookWhatsApp: "Boka via WhatsApp",
    exploreApartment: "Utforska lägenheten",
    priceNote: "Priset inkluderar städning. Sängkläder 19€/person.",
    sameDayNote: "Fråga om pris för snabbstartande boende",
    priceNotAvailable: "Pris ej tillgängligt – bekräfta via WhatsApp",
    discountBadge: "Snabbresenär-bonus!",
    specialOfferBadge: "Specialerbjudande",
    skiPassBadge: "Skidpass",
    noDeals: "Inga sista minuten-erbjudanden tillgängliga just nu. Kolla tillbaka senare!",
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
    subtitle: "Nutzen Sie die Gelegenheit! Buchungen erfolgen per WhatsApp, damit wir die Verfügbarkeit bestätigen können.",
    badge: "🔥 Last Minute",
    perNight: "/ Nacht",
    perPerson: "/ Person",
    total: "gesamt",
    bookWhatsApp: "Über WhatsApp buchen",
    exploreApartment: "Wohnung erkunden",
    priceNote: "Preis inkl. Reinigung. Bettwäsche 19€/Person.",
    sameDayNote: "Preis für schnell beginnende Unterkunft anfragen",
    priceNotAvailable: "Preis nicht verfügbar – per WhatsApp bestätigen",
    discountBadge: "Schnellreisenden-Bonus!",
    specialOfferBadge: "Sonderangebot",
    skiPassBadge: "Skipass",
    noDeals: "Keine Last-Minute-Angebote verfügbar. Schauen Sie später wieder vorbei!",
    whyTitle: "Warum Last Minute?",
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
    subtitle: "¡Aprovecha la oportunidad! Las reservas se hacen por WhatsApp para confirmar disponibilidad.",
    badge: "🔥 Última hora",
    perNight: "/ noche",
    perPerson: "/ persona",
    total: "total",
    bookWhatsApp: "Reservar por WhatsApp",
    exploreApartment: "Explorar apartamento",
    priceNote: "Precio incluye limpieza. Ropa de cama 19€/persona.",
    sameDayNote: "Consultar precio para alojamiento de inicio rápido",
    priceNotAvailable: "Precio no disponible – confirma por WhatsApp",
    discountBadge: "¡Bonus viajero rápido!",
    specialOfferBadge: "Oferta especial",
    skiPassBadge: "Forfait de esquí",
    noDeals: "No hay ofertas de última hora disponibles en este momento. ¡Vuelve más tarde!",
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
    subtitle: "Saisissez l'opportunité ! Les réservations se font via WhatsApp pour confirmer la disponibilité.",
    badge: "🔥 Dernière minute",
    perNight: "/ nuit",
    perPerson: "/ personne",
    total: "total",
    bookWhatsApp: "Réserver via WhatsApp",
    exploreApartment: "Explorer l'appartement",
    priceNote: "Prix comprend le ménage. Linge 19€/personne.",
    sameDayNote: "Demander le prix pour un hébergement à départ rapide",
    priceNotAvailable: "Prix indisponible – confirmer via WhatsApp",
    discountBadge: "Bonus voyageur rapide!",
    specialOfferBadge: "Offre spéciale",
    skiPassBadge: "Forfait de ski",
    noDeals: "Aucune offre de dernière minute disponible pour le moment. Revenez plus tard !",
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
  const { data: beds24Deals = [], isLoading: isLoadingDeals } = useQuery({
    queryKey: ['beds24-availability'],
    queryFn: fetchBeds24Availability,
    staleTime: 60 * 60 * 1000, // 1 hour cache (Beds24 allows 100 requests/day)
  });

  // Fetch admin settings from database
  const { data: adminSettings, isLoading: isLoadingSettings } = useAdminSettings();
  
  const propertySettings = adminSettings?.propertySettings || [];
  const periodSettings = adminSettings?.periodSettings || [];
  
  const isLoading = isLoadingDeals || isLoadingSettings;

  // Helper to get property with DB override
  const getPropertyWithOverride = (roomId: string) => {
    const defaultProperty = getDefaultPropertyDetails(roomId);
    if (!defaultProperty) return undefined;
    
    const dbOverride = propertySettings.find(s => s.property_id === roomId);
    if (!dbOverride) return defaultProperty;
    
    return {
      ...defaultProperty,
      name: dbOverride.marketing_name || defaultProperty.name,
      cleaningFee: dbOverride.cleaning_fee ?? defaultProperty.cleaningFee,
      oneNightDiscount: dbOverride.discount_1_night || null,
      twoNightDiscount: dbOverride.discount_2_nights || null,
      longStayDiscount: dbOverride.discount_3_plus_nights || null,
      showDiscount: dbOverride.show_discount ?? defaultProperty.showDiscount
    };
  };

  // Helper to get period settings from DB
  const getPeriodSettingsFromDb = (roomId: string, checkIn: string, checkOut: string) => {
    const period = periodSettings.find(
      p => p.property_id === roomId && p.check_in === checkIn && p.check_out === checkOut
    );
    return {
      specialOffer: period?.has_special_offer || false,
      customDiscount: period?.custom_discount || null,
      showDiscountBadge: period?.show_discount || false,
      hasSkiPass: period?.has_ski_pass || false
    };
  };

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

  // Get original API price + cleaning fee (no discounts applied)
  const getOriginalApiPrice = (deal: Beds24Deal): number | null => {
    if (deal.price == null) return null;
    const property = getPropertyWithOverride(deal.roomId);
    const cleaningFee = property?.cleaningFee || 0;
    return Math.round(deal.price + cleaningFee);
  };

  // Get PropertyAdmin discounted price (before any special offer)
  const getPropertyAdminPrice = (deal: Beds24Deal): number | null => {
    if (deal.price == null) return null;
    const property = getPropertyWithOverride(deal.roomId);
    const cleaningFee = property?.cleaningFee || 0;
    let basePrice = deal.price;

    // Apply property-level discounts based on number of nights
    let discount = 0;
    if (deal.nights === 1 && property?.oneNightDiscount) {
      discount = property.oneNightDiscount;
    } else if (deal.nights === 2 && property?.twoNightDiscount) {
      discount = property.twoNightDiscount;
    } else if (deal.nights >= 3 && property?.longStayDiscount) {
      discount = property.longStayDiscount;
    }

    if (discount > 0) {
      basePrice = basePrice * (1 - discount / 100);
    }

    return Math.round(basePrice + cleaningFee);
  };

  // Calculate total price with cleaning fee and discounts
  const getTotalPrice = (deal: Beds24Deal): number | null => {
    if (deal.price == null) return null;

    // Get PropertyAdmin discounted price first
    const propertyAdminPrice = getPropertyAdminPrice(deal);
    if (propertyAdminPrice == null) return null;

    // Check for period-specific custom discount (from admin) - applied as ADDITIONAL discount
    const periodS = getPeriodSettingsFromDb(deal.roomId, deal.checkIn, deal.checkOut);
    if (periodS.specialOffer && periodS.customDiscount && periodS.customDiscount > 0) {
      // Apply custom discount on top of PropertyAdmin price (additional discount)
      return Math.round(propertyAdminPrice * (1 - periodS.customDiscount / 100));
    }

    return propertyAdminPrice;
  };

  // Get discount info for display - show if showDiscount toggle is enabled
  const getDiscountInfo = (deal: Beds24Deal): { totalDiscount: number; showBadge: boolean } => {
    const property = getPropertyWithOverride(deal.roomId);
    let discount = 0;
    
    if (deal.nights === 1 && property?.oneNightDiscount) {
      discount = property.oneNightDiscount;
    } else if (deal.nights === 2 && property?.twoNightDiscount) {
      discount = property.twoNightDiscount;
    } else if (deal.nights >= 3 && property?.longStayDiscount) {
      discount = property.longStayDiscount;
    }
    
    return {
      totalDiscount: discount,
      showBadge: property?.showDiscount === true && discount > 0
    };
  };

  // Check if ski pass offer applies to this deal (using database)
  const hasSkiPassOffer = (deal: Beds24Deal): boolean => {
    const periodS = getPeriodSettingsFromDb(deal.roomId, deal.checkIn, deal.checkOut);
    return periodS.hasSkiPass;
  };

  // Check if special offer is active (from database)
  const hasSpecialOffer = (deal: Beds24Deal): boolean => {
    const periodS = getPeriodSettingsFromDb(deal.roomId, deal.checkIn, deal.checkOut);
    return periodS.specialOffer || false;
  };

  // Get marketing name from propertyDetails
  const getMarketingName = (deal: Beds24Deal): string => {
    const property = getPropertyWithOverride(deal.roomId);
    return property?.name || deal.roomName;
  };

  // Get property category for background image selection
  const getPropertyCategory = (roomId: string): string => {
    const property = getPropertyWithOverride(roomId);
    return property?.category || 'other';
  };

  // Get booking URL for property
  const getBookingUrl = (roomId: string): string => {
    const property = getPropertyWithOverride(roomId);
    return property?.bookingUrl || "";
  };

  // Get max guests for property
  const getMaxGuests = (roomId: string): number => {
    const property = getPropertyWithOverride(roomId);
    return property?.maxGuests || 2;
  };

  // Generate WhatsApp booking URL for Beds24 deal - localized messages
  const generateWhatsAppUrl = (deal: Beds24Deal): string => {
    const totalPrice = getTotalPrice(deal);
    const marketingName = getMarketingName(deal);
    const property = getPropertyWithOverride(deal.roomId);
    const whatsappNumber = property?.whatsappNumber?.replace('+', '') || '35844131313';
    
    const messages: Record<string, string> = {
      fi: `Hei, olen kiinnostunut äkkilähdöstä: ${marketingName}, ajalle ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${totalPrice ? ` Hinta: ${totalPrice}€.` : ""} Onko kohde vielä vapaana?`,
      en: `Hello, I'm interested in a last-minute deal: ${marketingName}, for ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${totalPrice ? ` Price: ${totalPrice}€.` : ""} Is the property still available?`,
      sv: `Hej, jag är intresserad av ett sista minuten-erbjudande: ${marketingName}, för ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${totalPrice ? ` Pris: ${totalPrice}€.` : ""} Är boendet fortfarande ledigt?`,
      de: `Hallo, ich interessiere mich für ein Last-Minute-Angebot: ${marketingName}, für ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${totalPrice ? ` Preis: ${totalPrice}€.` : ""} Ist die Unterkunft noch verfügbar?`,
      es: `Hola, estoy interesado en una oferta de última hora: ${marketingName}, para ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${totalPrice ? ` Precio: ${totalPrice}€.` : ""} ¿Está disponible el alojamiento?`,
      fr: `Bonjour, je suis intéressé par une offre de dernière minute : ${marketingName}, pour ${formatDateDisplay(deal.checkIn)} - ${formatDateDisplay(deal.checkOut)}.${totalPrice ? ` Prix : ${totalPrice}€.` : ""} Le logement est-il encore disponible ?`
    };
    
    const message = messages[lang] || messages.fi;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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
                  const originalPrice = getOriginalApiPrice(deal);
                  const bookingUrl = getBookingUrl(deal.roomId);
                  const marketingName = getMarketingName(deal);
                  const category = getPropertyCategory(deal.roomId);
                  const discountInfo = getDiscountInfo(deal);
                  const dealPeriodSettings = getPeriodSettingsFromDb(deal.roomId, deal.checkIn, deal.checkOut);
                  // Show strikethrough when showDiscountBadge is on AND there's any discount (property-level OR special offer)
                  const hasAnyDiscount = discountInfo.totalDiscount > 0 || (dealPeriodSettings.customDiscount && dealPeriodSettings.customDiscount > 0);
                  const showStrikethrough = dealPeriodSettings.showDiscountBadge === true && hasAnyDiscount;
                  
                  return (
                    <ScrollReveal key={deal.id} delay={index * 0.1}>
                      <Card className="glass-card border-border/30 hover:border-red-500/50 transition-all duration-300 overflow-hidden group relative">
                        {/* Background image based on property category */}
                        {category === 'glacier' && (
                          <div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                              backgroundImage: `url(${glacierImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center 30%',
                              opacity: 0.25,
                              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                            }}
                          />
                        )}
                        {category === 'skistar' && (
                          <div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                              backgroundImage: `url(${skistarImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center 40%',
                              opacity: 0.25,
                              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                            }}
                          />
                        )}
                        {deal.roomId === '620949' && (
                          <div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                              backgroundImage: `url(${karhunvartijaImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center 40%',
                              opacity: 0.25,
                              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                            }}
                          />
                        )}
                        {deal.roomId === '353045' && (
                          <div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                              backgroundImage: `url(${karhupirttiImage})`,
                              backgroundSize: '180%',
                              backgroundPosition: 'center 75%',
                              opacity: 0.25,
                              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                            }}
                          />
                        )}
                        {['350162', '350160', '350161'].includes(deal.roomId) && (
                          <div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                              backgroundImage: `url(${chaletsImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center 40%',
                              opacity: 0.25,
                              maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)',
                            }}
                          />
                        )}
                        
                        {/* Special Offer Badge - moved lower */}
                        {hasSpecialOffer(deal) && (
                          <div className="absolute top-3 left-3 z-20">
                            <Badge className="bg-gradient-to-r from-amber-500 to-red-500 text-white border-0 px-3 py-1.5 text-sm font-bold shadow-lg">
                              <Sparkles className="w-3.5 h-3.5 mr-1" />
                              {t.specialOfferBadge}
                            </Badge>
                          </div>
                        )}
                        
                        {/* Ski Pass Offer Badge - moved lower */}
                        {hasSkiPassOffer(deal) && (
                          <div className="absolute top-3 right-3 z-20">
                            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-3 py-1.5 text-sm font-bold shadow-lg">
                              <Ticket className="w-3.5 h-3.5 mr-1" />
                              {t.skiPassBadge}
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="pb-3 pt-12 relative z-10">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDateDisplay(deal.checkIn)} – {formatDateDisplay(deal.checkOut)}</span>
                          </div>
                          <CardTitle className="text-xl">
                            {bookingUrl ? (
                              <a
                                href={bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                              >
                                {marketingName}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              <span className="text-foreground">{marketingName}</span>
                            )}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                          {/* Property info */}
                          <ul className="space-y-1.5 mb-4">
                            <li className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {nightsText(deal.nights)}
                            </li>
                            <li className="text-sm text-muted-foreground flex items-center gap-2">
                              <Users className="w-3.5 h-3.5" />
                              Max {getMaxGuests(deal.roomId)} hlö
                            </li>
                          </ul>

                          {/* Price section */}
                          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 mb-4">
                            {isSameDay ? (
                              <div className="text-base font-semibold text-amber-500 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {t.sameDayNote}
                              </div>
                            ) : totalPrice != null ? (
                              <>
                                {/* Discount badge - only show if 30% or more AND strikethrough is NOT active */}
                                {discountInfo.showBadge && !showStrikethrough && (
                                  <div className="mb-2">
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                      -{discountInfo.totalDiscount}% alennus
                                    </Badge>
                                  </div>
                                )}
                                <div className="flex items-baseline gap-2">
                                  {showStrikethrough && originalPrice ? (
                                    <>
                                      <span className="text-lg text-muted-foreground line-through">
                                        {originalPrice}€
                                      </span>
                                      <span className="text-3xl md:text-4xl font-bold italic text-amber-500 tracking-wide">
                                        {totalPrice}€
                                      </span>
                                    </>
                                  ) : (
                                    <span className={`font-bold ${hasSpecialOffer(deal) ? 'text-3xl md:text-4xl italic text-amber-500 tracking-wide' : 'text-3xl text-foreground'}`}>
                                      {totalPrice}€
                                    </span>
                                  )}
                                  <span className="text-muted-foreground text-sm">{t.total}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">
                                  {getMaxGuests(deal.roomId) >= 6 
                                    ? (lang === 'fi' 
                                        ? "Hinta sisältää siivouksen ja 5 henkilöä. Lisähenkilöt +10€/yö (liinavaatteet tarvittaessa 19€/hlö)."
                                        : lang === 'en' 
                                          ? "Price includes cleaning and 5 persons. Extra guests +10€/night (linens if needed 19€/person)."
                                          : lang === 'sv'
                                            ? "Priset inkluderar städning och 5 personer. Extra gäster +10€/natt (sängkläder vid behov 19€/person)."
                                            : lang === 'de'
                                              ? "Preis inkl. Reinigung und 5 Personen. Zusätzliche Gäste +10€/Nacht (Bettwäsche bei Bedarf 19€/Person)."
                                              : lang === 'es'
                                                ? "Precio incluye limpieza y 5 personas. Huéspedes extra +10€/noche (ropa de cama si es necesario 19€/persona)."
                                                : "Prix comprend le ménage et 5 personnes. Personnes supp. +10€/nuit (linge si nécessaire 19€/personne)."
                                      )
                                    : (lang === 'fi' 
                                        ? "Hinta sisältää siivouksen (liinavaatteet tarvittaessa 19€/hlö)."
                                        : lang === 'en' 
                                          ? "Price includes cleaning (linens if needed 19€/person)."
                                          : lang === 'sv'
                                            ? "Priset inkluderar städning (sängkläder vid behov 19€/person)."
                                            : lang === 'de'
                                              ? "Preis inkl. Reinigung (Bettwäsche bei Bedarf 19€/Person)."
                                              : lang === 'es'
                                                ? "Precio incluye limpieza (ropa de cama si es necesario 19€/persona)."
                                                : "Prix comprend le ménage (linge si nécessaire 19€/personne)."
                                      )
                                  }
                                </div>
                              </>
                            ) : (
                              <div className="text-base font-semibold text-amber-500 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {t.priceNotAvailable ?? t.sameDayNote}
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
