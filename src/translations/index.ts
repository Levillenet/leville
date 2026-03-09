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
  travelHub: { fi: "/opas/matkaopas-levi", en: "/guide/travel-to-levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/gids/reisgids-levi" },
  // Guide pages
  skiing: { fi: "/opas/laskettelu-levi", en: "/guide/skiing-in-levi", sv: "/guide/skiing-in-levi", de: "/guide/skiing-in-levi", es: "/guide/skiing-in-levi", fr: "/guide/skiing-in-levi", nl: "/nl/gids/skieen-in-levi" },
  crossCountrySkiing: { fi: "/opas/hiihtoladut-levi", en: "/guide/cross-country-skiing-in-levi", sv: "/guide/cross-country-skiing-in-levi", de: "/guide/cross-country-skiing-in-levi", es: "/guide/cross-country-skiing-in-levi", fr: "/guide/cross-country-skiing-in-levi", nl: "/nl/gids/langlaufen-in-levi" },
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
  laplandGlossary: { fi: "/opas/lapin-sanasto", en: "/guide/lapland-glossary", sv: "/guide/lapland-glossary", de: "/guide/lapland-glossary", es: "/guide/lapland-glossary", fr: "/guide/lapland-glossary", nl: "/guide/lapland-glossary" },
  pricesInLevi: { fi: "/opas/hinnat-levilla", en: "/guide/prices-in-levi", sv: "/opas/hinnat-levilla", de: "/opas/hinnat-levilla", es: "/opas/hinnat-levilla", fr: "/opas/hinnat-levilla", nl: "/nl/gids/prijzen-in-levi" },
  bestTimeToVisit: { fi: "/opas/paras-aika-matkustaa-leville", en: "/guide/best-time-to-visit-levi", sv: "/guide/best-time-to-visit-levi", de: "/guide/best-time-to-visit-levi", es: "/guide/best-time-to-visit-levi", fr: "/guide/best-time-to-visit-levi", nl: "/guide/best-time-to-visit-levi" },
  // Additional guide pages
  cabinVsApartment: { fi: "/opas/mokki-vai-huoneisto-levi", en: "/guide/cabin-vs-apartment-levi", sv: "/guide/cabin-vs-apartment-levi", de: "/guide/cabin-vs-apartment-levi", es: "/guide/cabin-vs-apartment-levi", fr: "/guide/cabin-vs-apartment-levi", nl: "/guide/cabin-vs-apartment-levi" },
  packingList: { fi: "/opas/pakkauslista-lapin-lomalle", en: "/guide/packing-list-for-lapland", sv: "/guide/packing-list-for-lapland", de: "/guide/packing-list-for-lapland", es: "/guide/packing-list-for-lapland", fr: "/guide/packing-list-for-lapland", nl: "/guide/packing-list-for-lapland" },
  apresSkiLevi: { fi: "/opas/apres-ski-levi", en: "/guide/apres-ski-in-levi", sv: "/guide/apres-ski-in-levi", de: "/guide/apres-ski-in-levi", es: "/guide/apres-ski-in-levi", fr: "/guide/apres-ski-in-levi", nl: "/guide/apres-ski-in-levi" },
  santaClaus: { fi: "/opas/joulupukki-levilla", en: "/guide/santa-claus-in-levi", sv: "/guide/santa-claus-in-levi", de: "/guide/santa-claus-in-levi", es: "/guide/santa-claus-in-levi", fr: "/guide/santa-claus-in-levi", nl: "/guide/santa-claus-in-levi" },
  springSkiing: { fi: "/opas/kevatlaskettelu-levi", en: "/guide/spring-skiing-in-levi", sv: "/guide/spring-skiing-in-levi", de: "/guide/spring-skiing-in-levi", es: "/guide/spring-skiing-in-levi", fr: "/guide/spring-skiing-in-levi", nl: "/guide/spring-skiing-in-levi" },
  equipmentRental: { fi: "/opas/laskettelu-valineiden-vuokraus-levi", en: "/guide/equipment-rental-in-levi", sv: "/guide/equipment-rental-in-levi", de: "/guide/equipment-rental-in-levi", es: "/guide/equipment-rental-in-levi", fr: "/guide/equipment-rental-in-levi", nl: "/guide/equipment-rental-in-levi" },
  newYearsEve: { fi: "/opas/uudenvuodenaatto-levilla", en: "/guide/new-years-eve-in-levi", sv: "/guide/new-years-eve-in-levi", de: "/guide/new-years-eve-in-levi", es: "/guide/new-years-eve-in-levi", fr: "/guide/new-years-eve-in-levi", nl: "/guide/new-years-eve-in-levi" },
  skiHoliday: { fi: "/opas/hiihtoloma-levilla", en: "/guide/ski-holiday-in-levi", sv: "/guide/ski-holiday-in-levi", de: "/guide/ski-holiday-in-levi", es: "/guide/ski-holiday-in-levi", fr: "/guide/ski-holiday-in-levi", nl: "/guide/ski-holiday-in-levi" },
  romanticGetaway: { fi: "/opas/romanttinen-loma-levilla", en: "/guide/romantic-levi-getaway", sv: "/guide/romantic-levi-getaway", de: "/guide/romantic-levi-getaway", es: "/guide/romantic-levi-getaway", fr: "/guide/romantic-levi-getaway", nl: "/guide/romantic-levi-getaway" },
  dayTrips: { fi: "/opas/paivaretkia-levilla", en: "/guide/day-trips-from-levi", sv: "/guide/day-trips-from-levi", de: "/guide/day-trips-from-levi", es: "/guide/day-trips-from-levi", fr: "/guide/day-trips-from-levi", nl: "/guide/day-trips-from-levi" },
  events: { fi: "/opas/tapahtumat-levilla", en: "/guide/events-in-levi", sv: "/guide/events-in-levi", de: "/guide/events-in-levi", es: "/guide/events-in-levi", fr: "/guide/events-in-levi", nl: "/guide/events-in-levi" },
  accessible: { fi: "/opas/esteetonloma-levi", en: "/guide/accessible-levi", sv: "/guide/accessible-levi", de: "/guide/accessible-levi", es: "/guide/accessible-levi", fr: "/guide/accessible-levi", nl: "/guide/accessible-levi" },
  samiCulture: { fi: "/opas/saamelaiset-levilla", en: "/guide/sami-culture-in-levi", sv: "/guide/sami-culture-in-levi", de: "/guide/sami-culture-in-levi", es: "/guide/sami-culture-in-levi", fr: "/guide/sami-culture-in-levi", nl: "/guide/sami-culture-in-levi" },
  // Northern Lights sub-pages
  bestTimeNorthernLights: { fi: "/opas/paras-aika-revontulet-levi", en: "/guide/best-time-to-see-northern-lights-levi", sv: "/sv/guide/basta-tiden-norrsken-levi", de: "/de/ratgeber/beste-zeit-nordlichter-levi", es: "/es/guia/mejor-momento-auroras-boreales-levi", fr: "/fr/guide/meilleur-moment-aurores-boreales-levi", nl: "/nl/gids/beste-tijd-noorderlicht-levi" },
  northernLightsSeason: { fi: "/opas/revontulisesonki-levi", en: "/guide/northern-lights-season-levi", sv: "/sv/guide/norrsken-sasong-levi", de: "/de/ratgeber/nordlichter-saison-levi", es: "/es/guia/temporada-auroras-boreales-levi", fr: "/fr/guide/saison-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-seizoen-levi" },
  northernLightsForecast: { fi: "/opas/revontuliennuste-levi", en: "/guide/northern-lights-forecast-levi", sv: "/sv/guide/norrsken-prognos-levi", de: "/de/ratgeber/nordlichter-vorhersage-levi", es: "/es/guia/prevision-auroras-boreales-levi", fr: "/fr/guide/prevision-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-verwachting-levi" },
  whereToSeeNorthernLights: { fi: "/opas/missa-nahda-revontulet-levi", en: "/guide/where-to-see-northern-lights-levi", sv: "/sv/guide/var-se-norrsken-levi", de: "/de/ratgeber/wo-nordlichter-sehen-levi", es: "/es/guia/donde-ver-auroras-boreales-levi", fr: "/fr/guide/ou-voir-aurores-boreales-levi", nl: "/nl/gids/waar-noorderlicht-zien-levi" },
  northernLightsPhotography: { fi: "/opas/revontulien-valokuvaus-levi", en: "/guide/northern-lights-photography-levi", sv: "/sv/guide/fotografera-norrsken-levi", de: "/de/ratgeber/nordlichter-fotografieren-levi", es: "/es/guia/fotografiar-auroras-boreales-levi", fr: "/fr/guide/photographier-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-fotograferen-levi" },
  howNorthernLightsForm: { fi: "/opas/miten-revontulet-syntyvat", en: "/guide/how-northern-lights-form", sv: "/sv/guide/hur-uppstar-norrsken", de: "/de/ratgeber/wie-entstehen-nordlichter", es: "/es/guia/como-se-forman-auroras-boreales", fr: "/fr/guide/comment-se-forment-aurores-boreales", nl: "/nl/gids/hoe-ontstaat-noorderlicht" },
  northernLightsColors: { fi: "/opas/revontulien-varit", en: "/guide/northern-lights-colors-explained", sv: "/sv/guide/norrskens-farger", de: "/de/ratgeber/farben-der-nordlichter", es: "/es/guia/colores-auroras-boreales", fr: "/fr/guide/couleurs-aurores-boreales", nl: "/nl/gids/kleuren-van-noorderlicht" },
  // Additional activity pages
  reindeerSafari: { fi: "/aktiviteetit/porosafari-levi", en: "/activities/reindeer-safari-levi", sv: "/activities/reindeer-safari-levi", de: "/activities/reindeer-safari-levi", es: "/activities/reindeer-safari-levi", fr: "/activities/reindeer-safari-levi", nl: "/activities/reindeer-safari-levi" },
  snowshoeing: { fi: "/aktiviteetit/lumikenkaily-levi", en: "/activities/snowshoeing-in-levi", sv: "/activities/snowshoeing-in-levi", de: "/activities/snowshoeing-in-levi", es: "/activities/snowshoeing-in-levi", fr: "/activities/snowshoeing-in-levi", nl: "/activities/snowshoeing-in-levi" },
  fatbike: { fi: "/aktiviteetit/fatbike-levi", en: "/activities/fatbiking-in-levi", sv: "/activities/fatbiking-in-levi", de: "/activities/fatbiking-in-levi", es: "/activities/fatbiking-in-levi", fr: "/activities/fatbiking-in-levi", nl: "/activities/fatbiking-in-levi" },
  leviForKids: { fi: "/aktiviteetit/levi-lapsille", en: "/activities/levi-for-kids", sv: "/activities/levi-for-kids", de: "/activities/levi-for-kids", es: "/activities/levi-for-kids", fr: "/activities/levi-for-kids", nl: "/activities/levi-for-kids" },
  iceFishing: { fi: "/aktiviteetit/pilkkiminen-ja-kalastus-levi", en: "/activities/ice-fishing-and-fishing-levi", sv: "/activities/ice-fishing-and-fishing-levi", de: "/activities/ice-fishing-and-fishing-levi", es: "/activities/ice-fishing-and-fishing-levi", fr: "/activities/ice-fishing-and-fishing-levi", nl: "/activities/ice-fishing-and-fishing-levi" },
  horseRiding: { fi: "/aktiviteetit/ratsastus-levi", en: "/activities/horse-riding-in-levi", sv: "/activities/horse-riding-in-levi", de: "/activities/horse-riding-in-levi", es: "/activities/horse-riding-in-levi", fr: "/activities/horse-riding-in-levi", nl: "/activities/horse-riding-in-levi" },
  golf: { fi: "/aktiviteetit/golf-levi", en: "/activities/golf-in-levi", sv: "/activities/golf-in-levi", de: "/activities/golf-in-levi", es: "/activities/golf-in-levi", fr: "/activities/golf-in-levi", nl: "/activities/golf-in-levi" },
  iceSwimming: { fi: "/aktiviteetit/avantouinti-levi", en: "/activities/ice-swimming-in-levi", sv: "/activities/ice-swimming-in-levi", de: "/activities/ice-swimming-in-levi", es: "/activities/ice-swimming-in-levi", fr: "/activities/ice-swimming-in-levi", nl: "/activities/ice-swimming-in-levi" },
  canoeingAndSUP: { fi: "/aktiviteetit/melonta-ja-sup-levi", en: "/activities/canoeing-and-sup-levi", sv: "/activities/canoeing-and-sup-levi", de: "/activities/canoeing-and-sup-levi", es: "/activities/canoeing-and-sup-levi", fr: "/activities/canoeing-and-sup-levi", nl: "/activities/canoeing-and-sup-levi" },
  // Accommodation guides
  guideBearlodge: { fi: "/majoitukset/oppaat/bearlodge", en: "/accommodations/guides/bearlodge", sv: "/accommodations/guides/bearlodge", de: "/accommodations/guides/bearlodge", es: "/accommodations/guides/bearlodge", fr: "/accommodations/guides/bearlodge", nl: "/accommodations/guides/bearlodge" },
  guideSkistar: { fi: "/majoitukset/oppaat/skistar-huoneistot", en: "/accommodations/guides/skistar-apartments", sv: "/accommodations/guides/skistar-apartments", de: "/accommodations/guides/skistar-apartments", es: "/accommodations/guides/skistar-apartments", fr: "/accommodations/guides/skistar-apartments", nl: "/accommodations/guides/skistar-apartments" },
  guestSupport: { fi: "/asiakaspalvelu", en: "/en/support", sv: "/asiakaspalvelu", de: "/asiakaspalvelu", es: "/asiakaspalvelu", fr: "/asiakaspalvelu", nl: "/asiakaspalvelu" },
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
  // English guide/travel/activity pages without /en prefix
  if (path.startsWith("/guide/") || path.startsWith("/travel/") || path.startsWith("/activities/") || path.startsWith("/accommodations/")) return "en";
  return "fi";
};
