import { fi } from "./fi";
import { en } from "./en";
import { sv } from "./sv";
import { de } from "./de";
import { es } from "./es";
import { fr } from "./fr";
import { nl } from "./nl";

export type Language = "fi" | "en" | "sv" | "de" | "es" | "fr" | "nl";

export const translations = {
  fi,
  en,
  sv,
  de,
  es,
  fr,
  nl
} as const;

export type Translations = typeof fi;

export const getTranslations = (lang: Language): Translations => {
  return translations[lang];
};

// Language configuration for UI
export const languageConfig: Record<Language, { label: string; flag: string; prefix: string }> = {
  fi: { label: "Suomi", flag: "🇫🇮", prefix: "" },
  en: { label: "English", flag: "🇬🇧", prefix: "/en" },
  sv: { label: "Svenska", flag: "🇸🇪", prefix: "/sv" },
  de: { label: "Deutsch", flag: "🇩🇪", prefix: "/de" },
  es: { label: "Español", flag: "🇪🇸", prefix: "/es" },
  fr: { label: "Français", flag: "🇫🇷", prefix: "/fr" },
  nl: { label: "Nederlands", flag: "🇳🇱", prefix: "/nl" }
};

// Route mapping between base routes and their translations
export const routeConfig = {
  home: { fi: "/", en: "/en", sv: "/sv", de: "/de", es: "/es", fr: "/fr", nl: "/nl" },
  accommodations: { fi: "/majoitukset", en: "/en/accommodations", sv: "/sv/boende", de: "/de/unterkuenfte", es: "/es/alojamientos", fr: "/fr/hebergements", nl: "/nl/accommodaties" },
  news: { fi: "/ajankohtaista", en: "/en/news", sv: "/sv/nyheter", de: "/de/aktuelles", es: "/es/noticias", fr: "/fr/actualites", nl: "/nl/nieuws" },
  levi: { fi: "/levi", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi" },
  northernLights: { fi: "/revontulet", en: "/en/northern-lights", sv: "/sv/norrsken", de: "/de/nordlichter", es: "/es/auroras-boreales", fr: "/fr/aurores-boreales", nl: "/nl/noorderlicht" },
  contact: { fi: "/yhteystiedot", en: "/en/contact", sv: "/sv/kontakt", de: "/de/kontakt", es: "/es/contacto", fr: "/fr/contact", nl: "/nl/contact" },
  faq: { fi: "/ukk", en: "/en/faq", sv: "/sv/faq", de: "/de/faq", es: "/es/preguntas-frecuentes", fr: "/fr/faq", nl: "/nl/faq" },
  company: { fi: "/yritys", en: "/en/company", sv: "/sv/foretag", de: "/de/unternehmen", es: "/es/empresa", fr: "/fr/entreprise", nl: "/nl/bedrijf" },
  christmasInLapland: { fi: "/levi/joulu-lapissa", en: "/en/levi/christmas-in-lapland", sv: "/sv/levi/jul-i-lappland", de: "/de/levi/weihnachten-in-lappland", es: "/es/levi/navidad-en-laponia", fr: "/fr/levi/noel-en-laponie", nl: "/nl/levi/kerst-in-lapland" },
  quiz: { fi: "/tietovisa", en: "/en/quiz", sv: "/sv/quiz", de: "/de/quiz", es: "/es/quiz", fr: "/fr/quiz", nl: "/nl/quiz" },
  lastMinute: { fi: "/akkilahdot", en: "/en/last-minute", sv: "/sv/sista-minuten", de: "/de/last-minute", es: "/es/ultima-hora", fr: "/fr/derniere-minute", nl: "/nl/last-minute" },
  weatherInLevi: { fi: "/levi/saatieto-levilta", en: "/en/levi/weather-in-levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi" },
  bookingTerms: { fi: "/varausehdot", en: "/en/booking-terms", sv: "/sv/bokningsvillkor", de: "/de/buchungsbedingungen", es: "/es/terminos-de-reserva", fr: "/fr/conditions-de-reservation", nl: "/nl/boekingsvoorwaarden" },
  privacyPolicy: { fi: "/tietosuoja", en: "/en/privacy", sv: "/sv/integritetspolicy", de: "/de/datenschutz", es: "/es/privacidad", fr: "/fr/confidentialite", nl: "/nl/privacy" },
  sellProperty: { fi: "/myy-loma-asuntosi", en: "/myy-loma-asuntosi", sv: "/myy-loma-asuntosi", de: "/myy-loma-asuntosi", es: "/myy-loma-asuntosi", fr: "/myy-loma-asuntosi", nl: "/myy-loma-asuntosi" },
  holidayPlanner: { fi: "/lomasuunnittelija", en: "/en/holiday-planner", sv: "/lomasuunnittelija", de: "/lomasuunnittelija", es: "/lomasuunnittelija", fr: "/lomasuunnittelija", nl: "/lomasuunnittelija" }
};

// Helper to get route for a specific language
export const getRouteForLanguage = (currentPath: string, targetLang: Language): string => {
  // Find which route config matches the current path
  for (const [, routes] of Object.entries(routeConfig)) {
    for (const [lang, path] of Object.entries(routes)) {
      if (path === currentPath) {
        return routes[targetLang as keyof typeof routes] || routes.fi;
      }
    }
  }
  // Fallback to home page of target language
  return languageConfig[targetLang].prefix || "/";
};

// Helper to detect current language from path
export const detectLanguageFromPath = (path: string): Language => {
  if (path.startsWith("/nl")) return "nl";
  if (path.startsWith("/sv")) return "sv";
  if (path.startsWith("/de")) return "de";
  if (path.startsWith("/es")) return "es";
  if (path.startsWith("/fr")) return "fr";
  if (path.startsWith("/en")) return "en";
  return "fi";
};
