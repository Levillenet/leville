import { fi } from "./fi";
import { en } from "./en";
import { sv } from "./sv";
import { de } from "./de";
import { es } from "./es";

export type Language = "fi" | "en" | "sv" | "de" | "es";

export const translations = {
  fi,
  en,
  sv,
  de,
  es
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
  es: { label: "Español", flag: "🇪🇸", prefix: "/es" }
};

// Route mapping between base routes and their translations
export const routeConfig = {
  home: { fi: "/", en: "/en", sv: "/sv", de: "/de", es: "/es" },
  accommodations: { fi: "/majoitukset", en: "/en/accommodations", sv: "/sv/boende", de: "/de/unterkuenfte", es: "/es/alojamientos" },
  news: { fi: "/ajankohtaista", en: "/en/news", sv: "/sv/nyheter", de: "/de/aktuelles", es: "/es/noticias" },
  levi: { fi: "/levi", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi" },
  northernLights: { fi: "/revontulet", en: "/en/northern-lights", sv: "/sv/norrsken", de: "/de/nordlichter", es: "/es/auroras-boreales" },
  contact: { fi: "/yhteystiedot", en: "/en/contact", sv: "/sv/kontakt", de: "/de/kontakt", es: "/es/contacto" },
  faq: { fi: "/ukk", en: "/en/faq", sv: "/sv/faq", de: "/de/faq", es: "/es/preguntas-frecuentes" },
  company: { fi: "/yritys", en: "/en/company", sv: "/sv/foretag", de: "/de/unternehmen", es: "/es/empresa" },
  christmasInLapland: { fi: "/levi/joulu-lapissa", en: "/en/levi/christmas-in-lapland", sv: "/sv/levi/jul-i-lappland", de: "/de/levi/weihnachten-in-lappland", es: "/es/levi/navidad-en-laponia" },
  quiz: { fi: "/tietovisa", en: "/en/quiz", sv: "/sv/quiz", de: "/de/quiz", es: "/es/quiz" }
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
  if (path.startsWith("/sv")) return "sv";
  if (path.startsWith("/de")) return "de";
  if (path.startsWith("/es")) return "es";
  if (path.startsWith("/en")) return "en";
  return "fi";
};
