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
  holidayPlanner: { fi: "/lomasuunnittelija", en: "/en/holiday-planner", sv: "/lomasuunnittelija", de: "/lomasuunnittelija", es: "/lomasuunnittelija", fr: "/lomasuunnittelija", nl: "/lomasuunnittelija" },
  // Guide HUB pages
  seasonsHub: { fi: "/opas/vuodenajat-levi", en: "/guide/seasons-in-levi", sv: "/guide/seasons-in-levi", de: "/guide/seasons-in-levi", es: "/guide/seasons-in-levi", fr: "/guide/seasons-in-levi", nl: "/nl/gids/seizoenen-in-levi" },
  activitiesHub: { fi: "/opas/aktiviteetit-levi", en: "/guide/activities-in-levi", sv: "/guide/activities-in-levi", de: "/guide/activities-in-levi", es: "/guide/activities-in-levi", fr: "/guide/activities-in-levi", nl: "/nl/gids/activiteiten-in-levi" },
  travelHub: { fi: "/opas/matkaopas-levi", en: "/guide/travel-to-levi", sv: "/guide/travel-to-levi", de: "/guide/travel-to-levi", es: "/guide/travel-to-levi", fr: "/guide/travel-to-levi", nl: "/nl/gids/reisgids-levi" },
  // Guide pages
  skiing: { fi: "/opas/laskettelu-levi", en: "/guide/skiing-in-levi", sv: "/guide/skiing-in-levi", de: "/guide/skiing-in-levi", es: "/guide/skiing-in-levi", fr: "/guide/skiing-in-levi", nl: "/nl/gids/skieen-in-levi" },
  crossCountrySkiing: { fi: "/opas/hiihto-levi", en: "/guide/cross-country-skiing-in-levi", sv: "/guide/cross-country-skiing-in-levi", de: "/guide/cross-country-skiing-in-levi", es: "/guide/cross-country-skiing-in-levi", fr: "/guide/cross-country-skiing-in-levi", nl: "/nl/gids/langlaufen-in-levi" },
  winterClothing: { fi: "/opas/talvivarusteet-leville", en: "/guide/how-to-dress-for-winter-in-levi-lapland", sv: "/guide/how-to-dress-for-winter-in-levi-lapland", de: "/guide/how-to-dress-for-winter-in-levi-lapland", es: "/guide/how-to-dress-for-winter-in-levi-lapland", fr: "/guide/how-to-dress-for-winter-in-levi-lapland", nl: "/nl/gids/winterkleding-levi-lapland" },
  winterInLevi: { fi: "/opas/talvi-levi", en: "/guide/winter-in-levi", sv: "/guide/winter-in-levi", de: "/guide/winter-in-levi", es: "/guide/winter-in-levi", fr: "/guide/winter-in-levi", nl: "/guide/winter-in-levi" },
  springInLevi: { fi: "/opas/kevat-levi", en: "/guide/spring-in-levi", sv: "/guide/spring-in-levi", de: "/guide/spring-in-levi", es: "/guide/spring-in-levi", fr: "/guide/spring-in-levi", nl: "/guide/spring-in-levi" },
  summerInLevi: { fi: "/opas/kesa-levi", en: "/guide/summer-in-levi", sv: "/guide/summer-in-levi", de: "/guide/summer-in-levi", es: "/guide/summer-in-levi", fr: "/guide/summer-in-levi", nl: "/guide/summer-in-levi" },
  autumnInLevi: { fi: "/opas/syksy-ruska-levi", en: "/guide/autumn-ruska-in-levi", sv: "/guide/autumn-ruska-in-levi", de: "/guide/autumn-ruska-in-levi", es: "/guide/autumn-ruska-in-levi", fr: "/guide/autumn-ruska-in-levi", nl: "/guide/autumn-ruska-in-levi" },
  // Activity pages
  snowmobileSafari: { fi: "/aktiviteetit/moottorikelkkasafari-vinkit-levi", en: "/activities/snowmobile-safari-tips-levi", sv: "/activities/snowmobile-safari-tips-levi", de: "/activities/snowmobile-safari-tips-levi", es: "/activities/snowmobile-safari-tips-levi", fr: "/activities/snowmobile-safari-tips-levi", nl: "/activities/snowmobile-safari-tips-levi" },
  huskySafari: { fi: "/aktiviteetit/koiravaljakkoajelu-levi", en: "/activities/husky-safari-levi", sv: "/activities/husky-safari-levi", de: "/activities/husky-safari-levi", es: "/activities/husky-safari-levi", fr: "/activities/husky-safari-levi", nl: "/nl/activiteiten/husky-safari-levi" },
  hikingAndBiking: { fi: "/aktiviteetit/vaellus-ja-maastopyoraily-levi", en: "/activities/hiking-and-biking-levi", sv: "/activities/hiking-and-biking-levi", de: "/activities/hiking-and-biking-levi", es: "/activities/hiking-and-biking-levi", fr: "/activities/hiking-and-biking-levi", nl: "/activities/hiking-and-biking-levi" },
  topWinterActivities: { fi: "/aktiviteetit/parhaat-talviaktiviteetit-levi", en: "/activities/top-winter-activities-in-levi-lapland", sv: "/activities/top-winter-activities-in-levi-lapland", de: "/activities/top-winter-activities-in-levi-lapland", es: "/activities/top-winter-activities-in-levi-lapland", fr: "/activities/top-winter-activities-in-levi-lapland", nl: "/nl/activiteiten/winteractiviteiten-levi" },
  // Travel pages
  howToGetToLevi: { fi: "/matka/miten-paasee-leville-helsingista", en: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", sv: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", de: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", es: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", fr: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", nl: "/nl/gids/hoe-kom-je-in-levi" },
  gettingAround: { fi: "/opas/liikkuminen-levilla", en: "/guide/getting-around-in-levi", sv: "/guide/getting-around-in-levi", de: "/guide/getting-around-in-levi", es: "/guide/getting-around-in-levi", fr: "/guide/getting-around-in-levi", nl: "/guide/getting-around-in-levi" },
  restaurants: { fi: "/opas/ravintolat-ja-palvelut-levilla", en: "/guide/restaurants-and-services-in-levi", sv: "/guide/restaurants-and-services-in-levi", de: "/guide/restaurants-and-services-in-levi", es: "/guide/restaurants-and-services-in-levi", fr: "/guide/restaurants-and-services-in-levi", nl: "/guide/restaurants-and-services-in-levi" },
  leviWithChildren: { fi: "/opas/lapsiperheet-levilla", en: "/guide/levi-with-children", sv: "/guide/levi-with-children", de: "/guide/levi-with-children", es: "/guide/levi-with-children", fr: "/guide/levi-with-children", nl: "/nl/gids/levi-met-kinderen" },
  leviWithoutCar: { fi: "/opas/levi-ilman-autoa", en: "/guide/levi-without-a-car", sv: "/guide/levi-without-a-car", de: "/guide/levi-without-a-car", es: "/guide/levi-without-a-car", fr: "/guide/levi-without-a-car", nl: "/guide/levi-without-a-car" },
  heatingGuide: { fi: "/opas/lammitysjarjestelmat-levi", en: "/guide/heating-systems-in-levi", sv: "/guide/heating-systems-in-levi", de: "/guide/heating-systems-in-levi", es: "/guide/heating-systems-in-levi", fr: "/guide/heating-systems-in-levi", nl: "/guide/heating-systems-in-levi" },
  leviVsYllasVsRuka: { fi: "/opas/levi-vs-yllas-vs-ruka", en: "/guide/levi-vs-yllas-vs-ruka-comparison", sv: "/guide/levi-vs-yllas-vs-ruka-comparison", de: "/de/guide/levi-vs-yllas-vs-ruka", es: "/es/guia/levi-vs-yllas-vs-ruka", fr: "/fr/guide/levi-vs-yllas-vs-ruka", nl: "/nl/gids/levi-vs-yllas-vs-ruka" },
  leviVsRovaniemi: { fi: "/opas/levi-vs-rovaniemi", en: "/guide/levi-vs-rovaniemi-comparison", sv: "/guide/levi-vs-rovaniemi-comparison", de: "/de/guide/levi-vs-rovaniemi", es: "/es/guia/levi-vs-rovaniemi", fr: "/fr/guide/levi-vs-rovaniemi", nl: "/nl/gids/levi-vs-rovaniemi" },
  finnishSauna: { fi: "/opas/sauna-levilla", en: "/guide/finnish-sauna-in-levi", sv: "/guide/finnish-sauna-in-levi", de: "/guide/finnish-sauna-in-levi", es: "/guide/finnish-sauna-in-levi", fr: "/guide/finnish-sauna-in-levi", nl: "/guide/finnish-sauna-in-levi" },
  christmasDinner: { fi: "/en/guide/christmas-dinner-in-levi", en: "/en/guide/christmas-dinner-in-levi", sv: "/en/guide/christmas-dinner-in-levi", de: "/en/guide/christmas-dinner-in-levi", es: "/en/guide/christmas-dinner-in-levi", fr: "/en/guide/christmas-dinner-in-levi", nl: "/en/guide/christmas-dinner-in-levi" },
  latuinfo: { fi: "/latuinfo", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi" },
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
