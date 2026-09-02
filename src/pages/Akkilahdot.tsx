import { useState, useMemo, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Calendar, Clock, ExternalLink, MessageCircle, Sparkles, Ticket, Flame, Users } from "lucide-react";

import { Language } from "@/translations";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { getDefaultPropertyDetails } from "@/data/propertyDetails";
import { useAdminSettings } from "@/hooks/useAdminSettings";

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
  // Moder-specific: full free window length and prices per stay length
  windowNights?: number;
  minNights?: number;
  pricesByNights?: Record<string, number | null>;
  cleaningFee?: number;
  // Moder window payload
  isGap?: boolean;
  rates?: Record<string, number>; // date -> EUR per night
  noCheckIn?: string[];
  noCheckOut?: string[];
}

// Manual special deals - easy to update
const manualDeals: ManualDeal[] = [];

// Fetch Moder availability (replaces Beds24)
const fetchBeds24Availability = async (): Promise<Beds24Deal[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('moder-availability');

    if (error) {
      console.error('Error fetching Moder availability:', error);
      return [];
    }

    return data?.deals || [];
  } catch (err) {
    console.error('Error fetching Moder availability:', err);
    return [];
  }
};

const content = {
  fi: {
    meta: {
      title: "Äkkilähdöt Levi – Last-Minute Tarjoukset | Leville.net",
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
    skiPassBadge: "Tähän majoitukseen mukaan 2 hissilippua!",
    noDeals: "Ei äkkilähtöjä saatavilla tällä hetkellä. Tarkista tilanne myöhemmin!",
    whyTitle: "Miksi äkkilähtö?",
    whyItems: [
      "Jopa 50% edullisempia hintoja",
      "Samat laadukkaat majoitukset",
      "Nopea varaus WhatsAppilla",
      "Rajoitettu saatavuus – toimi nopeasti!"
    ],
    filter2: "2 yötä",
    filter3: "3 yötä",
    filter4plus: "4+ yötä",
    moreOptions: "Jaksolla vapaana yhteensä {n} yötä – voit valita haluamasi päivät. Kysy WhatsAppilla!",
    modeSearch: "Hae päivämäärillä",
    modeList: "Selaa tarjouksia",
    checkInLabel: "Saapuminen",
    checkOutLabel: "Lähtö",
    guestsLabel: "Henkilömäärä",
    guestsAny: "Ei väliä",
    searchButton: "Hae äkkilähtöjä",
    searchResults: "Vapaat majoitukset valitulle ajanjaksolle",
    noSearchResults: "Ei vapaita majoituksia valitulle ajanjaksolle. Kokeile toisia päiviä tai kysy WhatsAppilla!"
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
    skiPassBadge: "2 ski passes included with this accommodation!",
    noDeals: "No last-minute deals available at the moment. Check back later!",
    whyTitle: "Why last-minute?",
    whyItems: [
      "Up to 50% lower prices",
      "Same quality accommodations",
      "Quick booking via WhatsApp",
      "Limited availability – act fast!"
    ],
    filter2: "2 nights",
    filter3: "3 nights",
    filter4plus: "4+ nights",
    moreOptions: "{n} nights available in this window – choose your own dates. Ask via WhatsApp!",
    modeSearch: "Search by dates",
    modeList: "Browse deals",
    checkInLabel: "Check-in",
    checkOutLabel: "Check-out",
    guestsLabel: "Guests",
    guestsAny: "Any",
    searchButton: "Search last-minute deals",
    searchResults: "Available accommodation for your dates",
    noSearchResults: "No available accommodation for the selected dates. Try different dates or ask via WhatsApp!"
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
    skiPassBadge: "2 skidpass ingår i detta boende!",
    noDeals: "Inga sista minuten-erbjudanden tillgängliga just nu. Kolla tillbaka senare!",
    whyTitle: "Varför sista minuten?",
    whyItems: [
      "Upp till 50% lägre priser",
      "Samma kvalitetsboenden",
      "Snabb bokning via WhatsApp",
      "Begränsad tillgänglighet – agera snabbt!"
    ],
    filter2: "2 nätter",
    filter3: "3 nätter",
    filter4plus: "4+ nätter",
    moreOptions: "{n} nätter lediga i perioden – välj dina egna datum. Fråga via WhatsApp!",
    modeSearch: "Sök efter datum",
    modeList: "Bläddra bland erbjudanden",
    checkInLabel: "Incheckning",
    checkOutLabel: "Utcheckning",
    guestsLabel: "Antal personer",
    guestsAny: "Spelar ingen roll",
    searchButton: "Sök sista minuten-erbjudanden",
    searchResults: "Lediga boenden för valda datum",
    noSearchResults: "Inga lediga boenden för valda datum. Prova andra datum eller fråga via WhatsApp!"
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
    skiPassBadge: "2 Skipässe inklusive bei dieser Unterkunft!",
    noDeals: "Keine Last-Minute-Angebote verfügbar. Schauen Sie später wieder vorbei!",
    whyTitle: "Warum Last Minute?",
    whyItems: [
      "Bis zu 50% günstigere Preise",
      "Dieselben Qualitätsunterkünfte",
      "Schnelle Buchung via WhatsApp",
      "Begrenzte Verfügbarkeit – handeln Sie schnell!"
    ],
    filter2: "2 Nächte",
    filter3: "3 Nächte",
    filter4plus: "4+ Nächte",
    moreOptions: "{n} Nächte in diesem Zeitraum frei – wählen Sie Ihre Daten. Per WhatsApp anfragen!",
    modeSearch: "Nach Daten suchen",
    modeList: "Angebote durchsuchen",
    checkInLabel: "Anreise",
    checkOutLabel: "Abreise",
    guestsLabel: "Personen",
    guestsAny: "Egal",
    searchButton: "Last-Minute suchen",
    searchResults: "Verfügbare Unterkünfte für Ihren Zeitraum",
    noSearchResults: "Keine freien Unterkünfte für den gewählten Zeitraum. Versuchen Sie andere Daten oder fragen Sie per WhatsApp!"
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
    skiPassBadge: "¡2 forfaits de esquí incluidos con este alojamiento!",
    noDeals: "No hay ofertas de última hora disponibles en este momento. ¡Vuelve más tarde!",
    whyTitle: "¿Por qué última hora?",
    whyItems: [
      "Hasta 50% de descuento",
      "Los mismos alojamientos de calidad",
      "Reserva rápida vía WhatsApp",
      "¡Disponibilidad limitada – actúa rápido!"
    ],
    filter2: "2 noches",
    filter3: "3 noches",
    filter4plus: "4+ noches",
    moreOptions: "{n} noches disponibles en este período – elige tus fechas. ¡Pregunta por WhatsApp!",
    modeSearch: "Buscar por fechas",
    modeList: "Ver ofertas",
    checkInLabel: "Llegada",
    checkOutLabel: "Salida",
    guestsLabel: "Huéspedes",
    guestsAny: "Cualquiera",
    searchButton: "Buscar ofertas de última hora",
    searchResults: "Alojamientos disponibles para tus fechas",
    noSearchResults: "No hay alojamientos disponibles para las fechas seleccionadas. ¡Prueba otras fechas o pregunta por WhatsApp!"
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
    skiPassBadge: "2 forfaits de ski inclus avec cet hébergement!",
    noDeals: "Aucune offre de dernière minute disponible pour le moment. Revenez plus tard !",
    whyTitle: "Pourquoi dernière minute ?",
    whyItems: [
      "Jusqu'à 50% de réduction",
      "Les mêmes hébergements de qualité",
      "Réservation rapide via WhatsApp",
      "Disponibilité limitée – agissez vite !"
    ],
    filter2: "2 nuits",
    filter3: "3 nuits",
    filter4plus: "4+ nuits",
    moreOptions: "{n} nuits disponibles sur cette période – choisissez vos dates. Demandez via WhatsApp !",
    modeSearch: "Rechercher par dates",
    modeList: "Parcourir les offres",
    checkInLabel: "Arrivée",
    checkOutLabel: "Départ",
    guestsLabel: "Personnes",
    guestsAny: "Peu importe",
    searchButton: "Rechercher des offres",
    searchResults: "Hébergements disponibles pour vos dates",
    noSearchResults: "Aucun hébergement disponible pour les dates choisies. Essayez d'autres dates ou demandez via WhatsApp !"
  },
  nl: {
    meta: {
      title: "Levi Last-Minute Aanbiedingen – Betaalbare Accommodatie | Leville.net",
      description: "Vind de beste Levi last-minute aanbiedingen! Betaalbare appartementen en chalets op het laatste moment. Boek nu en bespaar – beperkte beschikbaarheid.",
      keywords: "Levi last minute, Levi aanbiedingen, Levi betaalbare accommodatie",
      canonical: "https://leville.net/nl/last-minute"
    },
    title: "Levi Last-Minute Aanbiedingen",
    subtitle: "Grijp uw kans! Boekingen worden via WhatsApp gedaan zodat wij de beschikbaarheid kunnen bevestigen.",
    badge: "🔥 Last Minute",
    perNight: "/ nacht",
    perPerson: "/ persoon",
    total: "totaal",
    bookWhatsApp: "Boek via WhatsApp",
    exploreApartment: "Bekijk appartement",
    priceNote: "Prijs inclusief schoonmaak. Linnengoed 19€/persoon.",
    sameDayNote: "Vraag de prijs voor snel beschikbare accommodatie",
    priceNotAvailable: "Prijs niet beschikbaar – bevestig via WhatsApp",
    discountBadge: "Snelle reiziger bonus!",
    specialOfferBadge: "Speciale aanbieding",
    skiPassBadge: "2 skipassen inbegrepen bij deze accommodatie!",
    noDeals: "Geen last-minute aanbiedingen beschikbaar op dit moment. Kom later terug!",
    whyTitle: "Waarom last-minute?",
    whyItems: [
      "Tot 50% lagere prijzen",
      "Dezelfde kwaliteitsaccommodaties",
      "Snel boeken via WhatsApp",
      "Beperkte beschikbaarheid – wees er snel bij!"
    ],
    filter2: "2 nachten",
    filter3: "3 nachten",
    filter4plus: "4+ nachten",
    moreOptions: "{n} nachten beschikbaar in deze periode – kies je eigen data. Vraag via WhatsApp!",
    modeSearch: "Zoeken op datum",
    modeList: "Aanbiedingen bekijken",
    checkInLabel: "Aankomst",
    checkOutLabel: "Vertrek",
    guestsLabel: "Personen",
    guestsAny: "Maakt niet uit",
    searchButton: "Zoek last-minute deals",
    searchResults: "Beschikbare accommodatie voor jouw data",
    noSearchResults: "Geen beschikbare accommodatie voor de gekozen data. Probeer andere data of vraag via WhatsApp!"
  }
};

const disabledContent: Record<Language, { heading: string; body: string; cta: string }> = {
  fi: {
    heading: "Äkkilähtöjä julkaistaan pääsesongin aikana",
    body: "Tällä hetkellä erillisiä äkkilähtötarjouksia ei ole julkaistu. Voit kuitenkin varata majoituksesi suoraan – tarkista vapaat huoneistot ja parhaat hinnat varausjärjestelmästämme.",
    cta: "Varaa majoitus"
  },
  en: {
    heading: "Last-minute deals are published during peak season",
    body: "No separate last-minute deals are currently published. You can still book your accommodation directly — check availability and the best rates in our booking system.",
    cta: "Book accommodation"
  },
  sv: {
    heading: "Sista minuten-erbjudanden publiceras under högsäsong",
    body: "Just nu finns inga separata sista minuten-erbjudanden. Du kan ändå boka ditt boende direkt – kolla tillgänglighet och bästa priser i vårt bokningssystem.",
    cta: "Boka boende"
  },
  de: {
    heading: "Last-Minute-Angebote werden in der Hauptsaison veröffentlicht",
    body: "Derzeit sind keine separaten Last-Minute-Angebote verfügbar. Sie können Ihre Unterkunft jedoch direkt buchen – prüfen Sie Verfügbarkeit und beste Preise in unserem Buchungssystem.",
    cta: "Unterkunft buchen"
  },
  es: {
    heading: "Las ofertas de última hora se publican en temporada alta",
    body: "Actualmente no hay ofertas de última hora publicadas. Aun así, puedes reservar tu alojamiento directamente — consulta disponibilidad y mejores precios en nuestro sistema de reservas.",
    cta: "Reservar alojamiento"
  },
  fr: {
    heading: "Les offres de dernière minute sont publiées en haute saison",
    body: "Aucune offre de dernière minute n'est actuellement publiée. Vous pouvez néanmoins réserver votre hébergement directement — vérifiez la disponibilité et les meilleurs tarifs dans notre système de réservation.",
    cta: "Réserver un hébergement"
  },
  nl: {
    heading: "Last-minute aanbiedingen verschijnen in het hoogseizoen",
    body: "Op dit moment zijn er geen aparte last-minute aanbiedingen gepubliceerd. U kunt uw accommodatie wel direct boeken — bekijk beschikbaarheid en de beste prijzen in ons boekingssysteem.",
    cta: "Boek accommodatie"
  }
};

type NightFilter = "2" | "3" | "4plus";

// Add n days to an ISO date string (yyyy-mm-dd)
const addDaysIso = (dateStr: string, days: number): string => {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

// Labels shown on every deal card / in the search widget
const extraLabels: Record<Language, { offer: string; today: string; pickDate: string; searchHeading: string }> = {
  fi: { offer: "ÄKKILÄHTÖ TARJOUS", today: "Alkaa tänään", pickDate: "Valitse päivä", searchHeading: "Hae vapaat äkkilähdöt" },
  en: { offer: "LAST MINUTE OFFER", today: "Starts today", pickDate: "Select date", searchHeading: "Search available last-minute stays" },
  sv: { offer: "SISTA MINUTEN-ERBJUDANDE", today: "Börjar idag", pickDate: "Välj datum", searchHeading: "Sök lediga sista minuten-boenden" },
  de: { offer: "LAST-MINUTE-ANGEBOT", today: "Beginnt heute", pickDate: "Datum wählen", searchHeading: "Freie Last-Minute-Unterkünfte suchen" },
  es: { offer: "OFERTA ÚLTIMA HORA", today: "Comienza hoy", pickDate: "Elegir fecha", searchHeading: "Buscar alojamientos de última hora" },
  fr: { offer: "OFFRE DERNIÈRE MINUTE", today: "Commence aujourd'hui", pickDate: "Choisir la date", searchHeading: "Rechercher des séjours de dernière minute" },
  nl: { offer: "LAST-MINUTE AANBIEDING", today: "Begint vandaag", pickDate: "Kies datum", searchHeading: "Zoek beschikbare last-minute verblijven" },
};



const Akkilahdot = ({ lang = "fi" }: AkkilahdotProps) => {
  const location = useLocation();
  const t = content[lang];
  const x = extraLabels[lang];
  const [nightFilter, setNightFilter] = useState<NightFilter>("3");
  const [mode, setMode] = useState<"list" | "search">("search");
  const [searchCheckIn, setSearchCheckIn] = useState("");
  const [searchCheckOut, setSearchCheckOut] = useState("");


  // Fetch Moder deals
  const { data: beds24Deals = [], isLoading: isLoadingDeals } = useQuery({
    queryKey: ['moder-availability'],
    queryFn: fetchBeds24Availability,
    staleTime: 60 * 60 * 1000, // 1 hour cache (matches server cache)
  });

  // Fetch admin settings from database
  const { data: adminSettings, isLoading: isLoadingSettings } = useAdminSettings();

  const propertySettings = adminSettings?.propertySettings || [];
  const periodSettings = adminSettings?.periodSettings || [];
  const dealsEnabled = (adminSettings?.siteSettings?.find(s => s.id === 'deals_enabled')?.value) !== false;
  const baseDiscountRaw = adminSettings?.siteSettings?.find(s => s.id === 'deals_base_discount')?.value;
  const dealsBaseDiscount = (() => {
    const n = typeof baseDiscountRaw === 'number' ? baseDiscountRaw : parseInt(String(baseDiscountRaw ?? '0'), 10);
    return isNaN(n) || n < 0 ? 0 : Math.min(n, 90);
  })();

  const isLoading = isLoadingDeals || isLoadingSettings;

  // How many nights the selected filter wants to display
  const requiredNights = nightFilter === "2" ? 2 : nightFilter === "3" ? 3 : 4;

  // Filter deals: window must fit the selected length and respect min stay.
  // Gap windows (short openings between two bookings) are always shown,
  // even when shorter than Moder's minimum stay.
  const filteredDeals = useMemo(() =>
    beds24Deals.filter((deal) => {
      const windowNights = Math.min(deal.windowNights ?? deal.nights, 7);
      const minNights = deal.minNights ?? 1;
      if (deal.isGap) return windowNights >= 1;
      if (windowNights < 2) return false;
      if (windowNights < requiredNights) return false;
      if (minNights > requiredNights) return false;
      return true;
    }), [beds24Deals, requiredNights]);

  // Helper to get property with DB override - memoized
  const getPropertyWithOverride = useCallback((roomId: string) => {
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
  }, [propertySettings]);

  // Helper to get period settings from DB - matches the displayed stay dates - memoized
  const getPeriodSettingsFromDb = useCallback((roomId: string, checkIn: string, checkOut: string) => {
    const period = periodSettings.find(
      p => p.property_id === roomId && p.check_in <= checkIn && p.check_out >= checkOut
    ) ?? periodSettings.find(
      p => p.property_id === roomId && p.check_in <= checkOut && p.check_out >= checkIn
    );
    return {
      specialOffer: period?.has_special_offer || false,
      customDiscount: period?.custom_discount || null,
      showDiscountBadge: period?.show_discount || false,
      hasSkiPass: period?.has_ski_pass || false
    };
  }, [periodSettings]);

  // Format date for display - memoized locale
  const dateLocale = useMemo(() => {
    const locales: Record<Language, string> = {
      fi: 'fi-FI', sv: 'sv-SE', de: 'de-DE', es: 'es-ES', fr: 'fr-FR', en: 'en-GB', nl: 'nl-NL'
    };
    return locales[lang];
  }, [lang]);

  const formatDateDisplay = useCallback((dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(dateLocale, { day: 'numeric', month: 'numeric', year: 'numeric' });
  }, [dateLocale]);

  // Nights text by language - memoized
  const nightsTextMap = useMemo(() => ({
    fi: ['yö', 'yötä'], en: ['night', 'nights'], sv: ['natt', 'nätter'],
    de: ['Nacht', 'Nächte'], es: ['noche', 'noches'], fr: ['nuit', 'nuits'], nl: ['nacht', 'nachten']
  }), []);

  const nightsText = useCallback((nights: number): string => {
    const [singular, plural] = nightsTextMap[lang];
    return `${nights} ${nights === 1 ? singular : plural}`;
  }, [lang, nightsTextMap]);

  // Check if date is today
  const isToday = useCallback((dateStr: string): boolean => {
    const today = new Date();
    const checkDate = new Date(dateStr);
    return today.toDateString() === checkDate.toDateString();
  }, []);

  // Nights displayed for a deal under the current filter (window capped at 7)
  const getDisplayNights = useCallback((deal: Beds24Deal): number => {
    const windowNights = Math.min(deal.windowNights ?? deal.nights, 7);
    return Math.min(requiredNights, windowNights);
  }, [requiredNights]);

  // Moder stay price from per-night rates (EUR, excluding cleaning fee).
  // Falls back to the legacy pricesByNights payload when rates are absent.
  const getModerPrice = useCallback((deal: Beds24Deal, checkIn: string, nights: number): number | null => {
    if (deal.rates && Object.keys(deal.rates).length > 0) {
      let sum = 0;
      for (let i = 0; i < nights; i++) {
        const r = deal.rates[addDaysIso(checkIn, i)];
        if (typeof r !== "number" || r <= 0) return null;
        sum += r;
      }
      return sum;
    }
    const p = deal.pricesByNights?.[String(nights)];
    if (typeof p === 'number' && p > 0) return p;
    if (nights === deal.nights && deal.price != null && deal.price > 0) return deal.price;
    return null;
  }, []);

  // A stay must fit inside the free window, start on an allowed check-in day,
  // end on an allowed check-out day, and respect Moder's minimum stay —
  // unless it is a short gap between two bookings (shown regardless of min stay).
  const isStayAllowed = useCallback((deal: Beds24Deal, checkIn: string, nights: number): boolean => {
    if (nights < 1) return false;
    const checkOut = addDaysIso(checkIn, nights);
    if (checkIn < deal.checkIn || checkOut > deal.checkOut) return false;
    if (deal.noCheckIn?.includes(checkIn)) return false;
    if (deal.noCheckOut?.includes(checkOut)) return false;
    if (!deal.isGap && nights < (deal.minNights ?? 1)) return false;
    return true;
  }, []);

  // Cleaning fee: prefer Moder mapping value, fallback to property settings
  const getCleaningFee = useCallback((deal: Beds24Deal): number => {
    if (typeof deal.cleaningFee === 'number' && deal.cleaningFee > 0) return deal.cleaningFee;
    const property = getPropertyWithOverride(deal.roomId);
    return property?.cleaningFee || 0;
  }, [getPropertyWithOverride]);

  // Normal price shown as reference: Moder price + cleaning fee (no discounts)
  const getOriginalApiPrice = useCallback((deal: Beds24Deal, checkIn: string, nights: number): number | null => {
    const base = getModerPrice(deal, checkIn, nights);
    if (base == null) return null;
    return Math.round(base + getCleaningFee(deal));
  }, [getModerPrice, getCleaningFee]);

  // Final price: Moder price - base discount - period custom discount, + cleaning fee
  const getTotalPrice = useCallback((deal: Beds24Deal, checkIn: string, nights: number): number | null => {
    const base = getModerPrice(deal, checkIn, nights);
    if (base == null) return null;

    let price = base * (1 - dealsBaseDiscount / 100);

    // Period-specific custom discount (from admin) - applied as ADDITIONAL discount
    const periodS = getPeriodSettingsFromDb(deal.roomId, checkIn, addDaysIso(checkIn, nights));
    if (periodS.customDiscount && periodS.customDiscount > 0) {
      price = price * (1 - periodS.customDiscount / 100);
    }

    return Math.round(price + getCleaningFee(deal));
  }, [getModerPrice, getCleaningFee, dealsBaseDiscount, getPeriodSettingsFromDb]);

  // Check if ski pass offer applies to this stay (using displayed dates)
  const hasSkiPassOffer = useCallback((deal: Beds24Deal, checkIn: string, nights: number): boolean => {
    const periodS = getPeriodSettingsFromDb(deal.roomId, checkIn, addDaysIso(checkIn, nights));
    return periodS.hasSkiPass;
  }, [getPeriodSettingsFromDb]);

  // Check if special offer is active (using displayed dates)
  const hasSpecialOffer = useCallback((deal: Beds24Deal, checkIn: string, nights: number): boolean => {
    const periodS = getPeriodSettingsFromDb(deal.roomId, checkIn, addDaysIso(checkIn, nights));
    return periodS.specialOffer || false;
  }, [getPeriodSettingsFromDb]);

  // Get marketing name from propertyDetails
  const getMarketingName = useCallback((deal: Beds24Deal): string => {
    const property = getPropertyWithOverride(deal.roomId);
    return property?.name || deal.roomName;
  }, [getPropertyWithOverride]);

  // Get property category for background image selection
  const getPropertyCategory = useCallback((roomId: string): string => {
    const property = getPropertyWithOverride(roomId);
    return property?.category || 'other';
  }, [getPropertyWithOverride]);

  // Get booking URL for property
  const getBookingUrl = useCallback((roomId: string): string => {
    const property = getPropertyWithOverride(roomId);
    return property?.bookingUrl || "";
  }, [getPropertyWithOverride]);

  // Get max guests for property
  const getMaxGuests = useCallback((roomId: string): number => {
    const property = getPropertyWithOverride(roomId);
    return property?.maxGuests || 2;
  }, [getPropertyWithOverride]);

  // Generate WhatsApp booking URL for a stay - localized messages
  const generateWhatsAppUrl = useCallback((deal: Beds24Deal, checkIn: string, nights: number): string => {
    const totalPrice = getTotalPrice(deal, checkIn, nights);
    const displayCheckOut = addDaysIso(checkIn, nights);
    const marketingName = getMarketingName(deal);
    const property = getPropertyWithOverride(deal.roomId);
    const whatsappNumber = property?.whatsappNumber?.replace('+', '') || '35844131313';
    const windowNights = Math.min(deal.windowNights ?? deal.nights, 7);
    const flexible = windowNights > nights;

    const flexNotes: Record<string, string> = {
      fi: ` Kohteessa on vapaana yhteensä ${windowNights} yötä, joten päivät ovat joustavat.`,
      en: ` The property has ${windowNights} nights available in total, so the dates are flexible.`,
      sv: ` Boendet har ${windowNights} nätter lediga totalt, så datumen är flexibla.`,
      de: ` Die Unterkunft hat insgesamt ${windowNights} Nächte frei, die Daten sind also flexibel.`,
      es: ` El alojamiento tiene ${windowNights} noches disponibles en total, las fechas son flexibles.`,
      fr: ` Le logement a ${windowNights} nuits disponibles au total, les dates sont donc flexibles.`,
      nl: ` De accommodatie heeft in totaal ${windowNights} nachten beschikbaar, dus de data zijn flexibel.`
    };
    const flex = flexible ? (flexNotes[lang] || flexNotes.fi) : "";

    const messages: Record<string, string> = {
      fi: `Hei, olen kiinnostunut äkkilähdöstä: ${marketingName}, ajalle ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Hinta: ${totalPrice}€.` : ""}${flex} Onko kohde vielä vapaana?`,
      en: `Hello, I'm interested in a last-minute deal: ${marketingName}, for ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Price: ${totalPrice}€.` : ""}${flex} Is the property still available?`,
      sv: `Hej, jag är intresserad av ett sista minuten-erbjudande: ${marketingName}, för ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Pris: ${totalPrice}€.` : ""}${flex} Är boendet fortfarande ledigt?`,
      de: `Hallo, ich interessiere mich für ein Last-Minute-Angebot: ${marketingName}, für ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Preis: ${totalPrice}€.` : ""}${flex} Ist die Unterkunft noch verfügbar?`,
      es: `Hola, estoy interesado en una oferta de última hora: ${marketingName}, para ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Precio: ${totalPrice}€.` : ""}${flex} ¿Está disponible el alojamiento?`,
      fr: `Bonjour, je suis intéressé par une offre de dernière minute : ${marketingName}, pour ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Prix : ${totalPrice}€.` : ""}${flex} Le logement est-il encore disponible ?`,
      nl: `Hallo, ik ben geïnteresseerd in een last-minute aanbieding: ${marketingName}, voor ${formatDateDisplay(checkIn)} - ${formatDateDisplay(displayCheckOut)} (${nightsText(nights)}).${totalPrice ? ` Prijs: ${totalPrice}€.` : ""}${flex} Is de accommodatie nog beschikbaar?`
    };

    const message = messages[lang] || messages.fi;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [getTotalPrice, getMarketingName, getPropertyWithOverride, formatDateDisplay, nightsText, lang]);

  // Combine deals for schema - memoized (3-night example price)
  const allDealsForSchema = useMemo(() => beds24Deals.map((deal, index) => {
    const schemaNights = Math.min(3, Math.min(deal.windowNights ?? deal.nights, 7));
    return {
      "@type": "Offer",
      "position": index + 1,
      "name": deal.roomName,
      "description": `${deal.roomName} - ${schemaNights} nights`,
      "price": getTotalPrice(deal, deal.checkIn, schemaNights) || 0,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/LimitedAvailability",
      "validFrom": deal.checkIn,
      "validThrough": addDaysIso(deal.checkIn, schemaNights)
    };
  }), [beds24Deals, getTotalPrice]);

  const schemaData = useMemo(() => ({
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
  }), [t.title, t.meta.description, t.meta.canonical, allDealsForSchema]);

  // Cards to render in list mode: window start + the nights shown for the filter
  const listItems = useMemo(() =>
    filteredDeals.map(deal => ({ deal, checkIn: deal.checkIn, nights: getDisplayNights(deal) })),
    [filteredDeals, getDisplayNights]);

  // Date search: one card per room whose window covers the requested stay
  const searchNights = useMemo(() => {
    if (!searchCheckIn || !searchCheckOut) return 0;
    return Math.round((new Date(searchCheckOut).getTime() - new Date(searchCheckIn).getTime()) / 86400000);
  }, [searchCheckIn, searchCheckOut]);

  const searchItems = useMemo(() => {
    if (mode !== "search" || searchNights < 1) return [];
    const results: { deal: Beds24Deal; checkIn: string; nights: number }[] = [];
    for (const deal of beds24Deals) {
      if (!isStayAllowed(deal, searchCheckIn, searchNights)) continue;
      if (getTotalPrice(deal, searchCheckIn, searchNights) == null) continue;
      results.push({ deal, checkIn: searchCheckIn, nights: searchNights });
    }
    results.sort((a, b) =>
      (getTotalPrice(a.deal, a.checkIn, a.nights) ?? Infinity) -
      (getTotalPrice(b.deal, b.checkIn, b.nights) ?? Infinity)
    );
    return results;
  }, [mode, beds24Deals, searchCheckIn, searchNights, isStayAllowed, getTotalPrice]);


  const displayItems = mode === "search" ? searchItems : listItems;
  const searchActive = mode === "search" && searchNights >= 1;

  const hasDeals = filteredDeals.length > 0 || manualDeals.length > 0;

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
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
        <meta property="og:image" content="https://leville.net/og-akkilahdot.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={lang === "fi" ? "Leville.net mökkimajoitus revontulien alla Levillä" : lang === "en" ? "Leville.net cabin accommodation under the northern lights in Levi" : lang === "sv" ? "Leville.net stugboende under norrskenet i Levi" : lang === "de" ? "Leville.net Hüttenunterkunft unter dem Nordlicht in Levi" : lang === "es" ? "Alojamiento en cabaña Leville.net bajo la aurora boreal en Levi" : lang === "nl" ? "Leville.net accommodatie onder het noorderlicht in Levi" : "Hébergement en chalet Leville.net sous les aurores boréales à Levi"} />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "en" ? "en_US" : lang === "sv" ? "sv_SE" : lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "nl" ? "nl_NL" : "fr_FR"} />
        <meta property="og:site_name" content="Leville.net" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-akkilahdot.png" />

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
                
                {/* Mode toggle: browse list / search by dates */}
                {dealsEnabled && (
                  <div className="mt-6 flex justify-center">
                    <ToggleGroup
                      type="single"
                      value={mode}
                      onValueChange={(value) => value && setMode(value as "list" | "search")}
                      className="bg-background/50 border border-border/30 rounded-lg p-1"
                    >
                      <ToggleGroupItem
                        value="list"
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                      >
                        {t.modeList}
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="search"
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                      >
                        {t.modeSearch}
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                )}

                {/* Big search widget with calendars */}
                {dealsEnabled && mode === "search" && (
                  <div className="mt-8 max-w-4xl mx-auto">
                    <div className="glass-card border-primary/30 rounded-2xl p-5 md:p-8 text-left shadow-xl">
                      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 text-center">
                        {x.searchHeading}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1.5">{t.checkInLabel}</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start h-12 text-base font-normal bg-background/60"
                              >
                                <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                {searchCheckIn ? formatDateDisplay(searchCheckIn) : x.pickDate}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                              <CalendarPicker
                                mode="single"
                                selected={searchCheckIn ? new Date(searchCheckIn + "T00:00:00") : undefined}
                                onSelect={(date) => {
                                  if (!date) return;
                                  const iso = toIsoDate(date);
                                  setSearchCheckIn(iso);
                                  if (!searchCheckOut || searchCheckOut <= iso) {
                                    setSearchCheckOut(addDaysIso(iso, 2));
                                  }
                                }}
                                disabled={(date) => toIsoDate(date) < todayIso}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1.5">{t.checkOutLabel}</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start h-12 text-base font-normal bg-background/60"
                              >
                                <Calendar className="w-4 h-4 mr-2 opacity-70" />
                                {searchCheckOut ? formatDateDisplay(searchCheckOut) : x.pickDate}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                              <CalendarPicker
                                mode="single"
                                selected={searchCheckOut ? new Date(searchCheckOut + "T00:00:00") : undefined}
                                onSelect={(date) => date && setSearchCheckOut(toIsoDate(date))}
                                disabled={(date) => toIsoDate(date) <= (searchCheckIn || todayIso)}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="text-sm text-muted-foreground md:pb-3">
                          {searchActive ? `${t.searchResults} (${searchItems.length})` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {/* Night filter (list mode) */}
                {dealsEnabled && mode === "list" && (
                <div className="mt-6 flex justify-center">
                  <ToggleGroup
                    type="single"
                    value={nightFilter}
                    onValueChange={(value) => value && setNightFilter(value as NightFilter)}
                    className="bg-background/50 border border-border/30 rounded-lg p-1"
                  >
                    <ToggleGroupItem
                      value="2"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                    >
                      {t.filter2}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="3"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                    >
                      {t.filter3}
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="4plus"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground px-4 py-2 rounded-md"
                    >
                      {t.filter4plus}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                )}
              </section>
            </ScrollReveal>

            {/* Disabled state: high-season info + direct booking link */}
            {!isLoading && !dealsEnabled && (
              <ScrollReveal>
                <section className="max-w-2xl mx-auto mb-16">
                  <div className="glass-card border-primary/30 rounded-xl p-8 md:p-10 text-center">
                    <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                      {disabledContent[lang].heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {disabledContent[lang].body}
                    </p>
                    <a
                      href="https://app.moder.fi/levillenet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg px-6 py-3 font-medium"
                    >
                      {disabledContent[lang].cta}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* Loading state */}
            {dealsEnabled && isLoading && (
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

            {/* No results for an active date search */}
            {dealsEnabled && !isLoading && searchActive && searchItems.length === 0 && (
              <section className="max-w-2xl mx-auto mb-16 text-center">
                <p className="text-muted-foreground">{t.noSearchResults}</p>
              </section>
            )}

            {/* Deals Grid */}
            {dealsEnabled && !isLoading && displayItems.length > 0 && (
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {displayItems.map(({ deal, checkIn: stayCheckIn, nights: displayNights }, index) => {
                  const isSameDay = isToday(stayCheckIn);
                  const displayCheckOut = addDaysIso(stayCheckIn, displayNights);
                  const windowNights = Math.min(deal.windowNights ?? deal.nights, 7);
                  const totalPrice = getTotalPrice(deal, stayCheckIn, displayNights);
                  const originalPrice = getOriginalApiPrice(deal, stayCheckIn, displayNights);
                  const bookingUrl = getBookingUrl(deal.roomId);
                  const marketingName = getMarketingName(deal);
                  const category = getPropertyCategory(deal.roomId);
                  // Strikethrough whenever the final price is below the normal (Moder) price
                  const showStrikethrough = originalPrice != null && totalPrice != null && totalPrice < originalPrice;
                  const discountPct = showStrikethrough ? Math.round((1 - totalPrice / originalPrice) * 100) : 0;
                  
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
                        {/* Special Offer Badge - top left */}
                        {hasSpecialOffer(deal, stayCheckIn, displayNights) && (
                          <div className="absolute top-3 left-3 z-20">
                            <Badge className="bg-gradient-to-r from-amber-500 to-red-500 text-white border-0 px-3 py-1.5 text-sm font-bold shadow-lg">
                              <Sparkles className="w-3.5 h-3.5 mr-1" />
                              {t.specialOfferBadge}
                            </Badge>
                          </div>
                        )}
                        
                        {/* Ski Pass Badge - top right, 2 lines */}
                        {hasSkiPassOffer(deal, stayCheckIn, displayNights) && (
                          <div className="absolute top-3 right-3 z-20 max-w-[140px]">
                            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-3 py-1.5 text-xs font-bold shadow-lg whitespace-normal text-center leading-tight">
                              <Ticket className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                              <span>{t.skiPassBadge}</span>
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="pb-3 pt-12 relative z-10">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDateDisplay(stayCheckIn)} – {formatDateDisplay(displayCheckOut)}</span>
                          </div>
                          <CardTitle className="text-xl">
                            {bookingUrl ? (
                              <a
                                href={bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 underline underline-offset-2 decoration-primary/50 hover:decoration-primary font-semibold"
                              >
                                {marketingName}
                                <ExternalLink className="w-4 h-4 opacity-70" />
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
                              {nightsText(displayNights)}
                            </li>
                            {windowNights > displayNights && (
                              <li className="text-sm text-primary flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {t.moreOptions.replace('{n}', String(windowNights))}
                              </li>
                            )}
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
                                {discountPct > 0 && !showStrikethrough && (
                                  <div className="mb-2">
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                      -{discountPct}%
                                    </Badge>
                                  </div>
                                )}
                                <div className="flex items-baseline gap-2 flex-wrap">
                                  {showStrikethrough && originalPrice ? (
                                    <>
                                      <span className="text-lg text-muted-foreground line-through">
                                        {originalPrice}€
                                      </span>
                                      <span className="text-3xl md:text-4xl font-bold italic text-amber-500 tracking-wide">
                                        {totalPrice}€
                                      </span>
                                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs self-center">
                                        -{discountPct}%
                                      </Badge>
                                    </>
                                  ) : (
                                    <span className={`font-bold ${hasSpecialOffer(deal, stayCheckIn, displayNights) ? 'text-3xl md:text-4xl italic text-amber-500 tracking-wide' : 'text-3xl text-foreground'}`}>
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
                              href={generateWhatsAppUrl(deal, stayCheckIn, displayNights)}
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
            {dealsEnabled && !isLoading && manualDeals.length > 0 && (
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
            {dealsEnabled && !isLoading && !hasDeals && (
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

        <PageCTA lang={lang} />
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Akkilahdot;
