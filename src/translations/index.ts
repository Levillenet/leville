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
  weatherInLevi: { fi: "/levi/saatieto-levilta", en: "/en/levi/weather-in-levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi/weer-in-levi" },
  bookingTerms: { fi: "/varausehdot", en: "/en/booking-terms", sv: "/sv/bokningsvillkor", de: "/de/buchungsbedingungen", es: "/es/terminos-de-reserva", fr: "/fr/conditions-de-reservation", nl: "/nl/boekingsvoorwaarden" },
  privacyPolicy: { fi: "/tietosuoja", en: "/en/privacy", sv: "/sv/integritetspolicy", de: "/de/datenschutz", es: "/es/privacidad", fr: "/fr/confidentialite", nl: "/nl/privacy" },
  sellProperty: { fi: "/myy-loma-asuntosi", en: "/myy-loma-asuntosi", sv: "/myy-loma-asuntosi", de: "/myy-loma-asuntosi", es: "/myy-loma-asuntosi", fr: "/myy-loma-asuntosi", nl: "/myy-loma-asuntosi" },
  holidayPlanner: { fi: "/lomasuunnittelija", en: "/en/holiday-planner", sv: "/lomasuunnittelija", de: "/lomasuunnittelija", es: "/lomasuunnittelija", fr: "/lomasuunnittelija", nl: "/lomasuunnittelija" },
  // Guide HUB pages
  seasonsHub: { fi: "/opas/vuodenajat-levi", en: "/guide/seasons-in-levi", sv: "/guide/seasons-in-levi", de: "/guide/seasons-in-levi", es: "/guide/seasons-in-levi", fr: "/guide/seasons-in-levi", nl: "/nl/gids/seizoenen-in-levi" },
  activitiesHub: { fi: "/opas/aktiviteetit-levi", en: "/guide/activities-in-levi", sv: "/guide/activities-in-levi", de: "/guide/activities-in-levi", es: "/guide/activities-in-levi", fr: "/guide/activities-in-levi", nl: "/nl/gids/activiteiten-in-levi" },
  travelHub: { fi: "/opas/matkaopas-levi", en: "/guide/travel-to-levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/gids/reisgids-levi" },
  comparisonHub: { fi: "/opas/miksi-valita-levi", en: "/guide/why-choose-levi", sv: "/sv/guide/why-choose-levi", de: "/de/guide/why-choose-levi", es: "/es/guia/why-choose-levi", fr: "/fr/guide/why-choose-levi", nl: "/nl/gids/waarom-levi-kiezen" },
  // Guide pages
  skiing: { fi: "/opas/laskettelu-levi", en: "/guide/skiing-in-levi", sv: "/sv/guide/skidakning-i-levi", de: "/de/ratgeber/skifahren-in-levi", es: "/es/guia/esqui-en-levi", fr: "/fr/guide/ski-a-levi", nl: "/nl/gids/skieen-in-levi" },
  crossCountrySkiing: { fi: "/opas/hiihtoladut-levi", en: "/guide/cross-country-skiing-in-levi", sv: "/guide/cross-country-skiing-in-levi", de: "/guide/cross-country-skiing-in-levi", es: "/guide/cross-country-skiing-in-levi", fr: "/guide/cross-country-skiing-in-levi", nl: "/nl/gids/langlaufen-in-levi" },
  winterClothing: { fi: "/opas/talvivarusteet-leville", en: "/guide/how-to-dress-for-winter-in-levi-lapland", sv: "/guide/how-to-dress-for-winter-in-levi-lapland", de: "/guide/how-to-dress-for-winter-in-levi-lapland", es: "/guide/how-to-dress-for-winter-in-levi-lapland", fr: "/guide/how-to-dress-for-winter-in-levi-lapland", nl: "/nl/gids/winterkleding-levi-lapland" },
  winterInLevi: { fi: "/opas/talvi-levi", en: "/guide/winter-in-levi", sv: "/guide/winter-in-levi", de: "/guide/winter-in-levi", es: "/guide/winter-in-levi", fr: "/guide/winter-in-levi", nl: "/nl/gids/winter-in-levi" },
  springInLevi: { fi: "/opas/kevat-levi", en: "/guide/spring-in-levi", sv: "/guide/spring-in-levi", de: "/guide/spring-in-levi", es: "/guide/spring-in-levi", fr: "/guide/spring-in-levi", nl: "/nl/gids/lente-in-levi" },
  summerInLevi: { fi: "/opas/kesa-levi", en: "/guide/summer-in-levi", sv: "/guide/summer-in-levi", de: "/guide/summer-in-levi", es: "/guide/summer-in-levi", fr: "/guide/summer-in-levi", nl: "/nl/gids/zomer-in-levi" },
  autumnInLevi: { fi: "/opas/syksy-ruska-levi", en: "/guide/autumn-ruska-in-levi", sv: "/guide/autumn-ruska-in-levi", de: "/guide/autumn-ruska-in-levi", es: "/guide/autumn-ruska-in-levi", fr: "/guide/autumn-ruska-in-levi", nl: "/nl/gids/herfst-ruska-in-levi" },
  bestTimeToVisit: { fi: "/opas/paras-aika-matkustaa-leville", en: "/guide/best-time-to-visit-levi", sv: "/guide/best-time-to-visit-levi", de: "/guide/best-time-to-visit-levi", es: "/guide/best-time-to-visit-levi", fr: "/guide/best-time-to-visit-levi", nl: "/guide/best-time-to-visit-levi" },
  // Activity pages
  snowmobileSafari: { fi: "/aktiviteetit/moottorikelkkasafari-vinkit-levi", en: "/activities/snowmobile-safari-tips-levi", sv: "/activities/snowmobile-safari-tips-levi", de: "/de/aktivitaeten/schneemobil-safari-levi", es: "/activities/snowmobile-safari-tips-levi", fr: "/activities/snowmobile-safari-tips-levi", nl: "/nl/activiteiten/sneeuwscooter-safari-levi" },
  huskySafari: { fi: "/aktiviteetit/koiravaljakkoajelu-levi", en: "/activities/husky-safari-levi", sv: "/activities/husky-safari-levi", de: "/de/aktivitaeten/husky-safari-levi", es: "/activities/husky-safari-levi", fr: "/activities/husky-safari-levi", nl: "/nl/activiteiten/husky-safari-levi" },
  hikingAndBiking: { fi: "/aktiviteetit/vaellus-ja-maastopyoraily-levi", en: "/activities/hiking-and-biking-levi", sv: "/activities/hiking-and-biking-levi", de: "/activities/hiking-and-biking-levi", es: "/activities/hiking-and-biking-levi", fr: "/activities/hiking-and-biking-levi", nl: "/activities/hiking-and-biking-levi" },
  topWinterActivities: { fi: "/aktiviteetit/parhaat-talviaktiviteetit-levi", en: "/activities/top-winter-activities-in-levi-lapland", sv: "/activities/top-winter-activities-in-levi-lapland", de: "/activities/top-winter-activities-in-levi-lapland", es: "/activities/top-winter-activities-in-levi-lapland", fr: "/activities/top-winter-activities-in-levi-lapland", nl: "/nl/activiteiten/winteractiviteiten-levi" },
  reindeerSafari: { fi: "/aktiviteetit/porosafari-levi", en: "/activities/reindeer-safari-levi", sv: "/sv/aktiviteter/rensafari-levi", de: "/de/aktivitaeten/rentiersafari-levi", es: "/es/actividades/safari-renos-levi", fr: "/fr/activites/safari-rennes-levi", nl: "/nl/activiteiten/rendiersafari-levi" },
  snowshoeing: { fi: "/aktiviteetit/lumikenkaily-levi", en: "/activities/snowshoeing-in-levi", sv: "/sv/aktiviteter/snoskovandrng-levi", de: "/de/aktivitaeten/schneeschuhwandern-levi", es: "/es/actividades/raquetas-nieve-levi", fr: "/fr/activites/raquettes-neige-levi", nl: "/nl/activiteiten/sneeuwschoenwandelen-levi" },
  fatbike: { fi: "/aktiviteetit/fatbike-levi", en: "/activities/fatbiking-in-levi", sv: "/sv/aktiviteter/fatbike-levi", de: "/de/aktivitaeten/fatbike-levi", es: "/es/actividades/fatbike-levi", fr: "/fr/activites/fatbike-levi", nl: "/nl/activiteiten/fatbike-levi" },
  leviForKids: { fi: "/aktiviteetit/levi-lapsille", en: "/activities/levi-for-kids", sv: "/sv/aktiviteter/levi-for-barn", de: "/de/aktivitaeten/levi-fuer-kinder", es: "/es/actividades/levi-para-ninos", fr: "/fr/activites/levi-pour-enfants", nl: "/nl/activiteiten/levi-voor-kinderen" },
  iceFishing: { fi: "/aktiviteetit/pilkkiminen-ja-kalastus-levi", en: "/activities/ice-fishing-and-fishing-levi", sv: "/sv/aktiviteter/isfiske-levi", de: "/de/aktivitaeten/eisfischen-levi", es: "/es/actividades/pesca-en-hielo-levi", fr: "/fr/activites/peche-sur-glace-levi", nl: "/nl/activiteiten/ijsvissen-levi" },
  horseRiding: { fi: "/aktiviteetit/ratsastus-levi", en: "/activities/horse-riding-in-levi", sv: "/sv/aktiviteter/ridning-levi", de: "/de/aktivitaeten/reiten-levi", es: "/es/actividades/equitacion-levi", fr: "/fr/activites/equitation-levi", nl: "/nl/activiteiten/paardrijden-levi" },
  golf: { fi: "/aktiviteetit/golf-levi", en: "/activities/golf-in-levi", sv: "/sv/aktiviteter/golf-levi", de: "/de/aktivitaeten/golf-levi", es: "/es/actividades/golf-levi", fr: "/fr/activites/golf-levi", nl: "/nl/activiteiten/golf-levi" },
  iceSwimming: { fi: "/aktiviteetit/avantouinti-levi", en: "/activities/ice-swimming-in-levi", sv: "/sv/aktiviteter/vinterbad-levi", de: "/de/aktivitaeten/eisschwimmen-levi", es: "/es/actividades/bano-en-hielo-levi", fr: "/fr/activites/bain-glace-levi", nl: "/nl/activiteiten/ijszwemmen-levi" },
  canoeingAndSUP: { fi: "/aktiviteetit/melonta-ja-sup-levi", en: "/activities/canoeing-and-sup-levi", sv: "/sv/aktiviteter/kanot-och-sup-levi", de: "/de/aktivitaeten/kanufahren-und-sup-levi", es: "/es/actividades/canoa-y-sup-levi", fr: "/fr/activites/canoe-et-sup-levi", nl: "/nl/activiteiten/kanoen-en-sup-levi" },
  // Travel pages
  howToGetToLevi: { fi: "/matka/miten-paasee-leville-helsingista", en: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", sv: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", de: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", es: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", fr: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", nl: "/nl/gids/hoe-kom-je-in-levi" },
  gettingAround: { fi: "/opas/liikkuminen-levilla", en: "/guide/getting-around-in-levi", sv: "/guide/getting-around-in-levi", de: "/guide/getting-around-in-levi", es: "/guide/getting-around-in-levi", fr: "/guide/getting-around-in-levi", nl: "/nl/gids/vervoer-in-levi" },
  restaurants: { fi: "/opas/ravintolat-ja-palvelut-levilla", en: "/guide/restaurants-and-services-in-levi", sv: "/guide/restaurants-and-services-in-levi", de: "/guide/restaurants-and-services-in-levi", es: "/guide/restaurants-and-services-in-levi", fr: "/guide/restaurants-and-services-in-levi", nl: "/guide/restaurants-and-services-in-levi" },
  leviRestaurantGuide: { fi: "/opas/levin-ravintolat-ja-annokset", en: "/guide/levi-restaurants-and-dishes", sv: "/opas/levin-ravintolat-ja-annokset", de: "/opas/levin-ravintolat-ja-annokset", es: "/opas/levin-ravintolat-ja-annokset", fr: "/opas/levin-ravintolat-ja-annokset", nl: "/opas/levin-ravintolat-ja-annokset" },
  leviWithChildren: { fi: "/opas/lapsiperheet-levilla", en: "/guide/levi-with-children", sv: "/guide/levi-with-children", de: "/guide/levi-with-children", es: "/guide/levi-with-children", fr: "/guide/levi-with-children", nl: "/nl/gids/levi-met-kinderen" },
  leviWithoutCar: { fi: "/opas/levi-ilman-autoa", en: "/guide/levi-without-a-car", sv: "/guide/levi-without-a-car", de: "/guide/levi-without-a-car", es: "/guide/levi-without-a-car", fr: "/guide/levi-without-a-car", nl: "/guide/levi-without-a-car" },
  heatingGuide: { fi: "/opas/lammitysjarjestelmat-levi", en: "/guide/heating-systems-in-levi", sv: "/guide/heating-systems-in-levi", de: "/guide/heating-systems-in-levi", es: "/guide/heating-systems-in-levi", fr: "/guide/heating-systems-in-levi", nl: "/guide/heating-systems-in-levi" },
  leviVsYllasVsRuka: { fi: "/opas/levi-vs-yllas-vs-ruka", en: "/guide/levi-vs-yllas-vs-ruka-comparison", sv: "/guide/levi-vs-yllas-vs-ruka-comparison", de: "/de/guide/levi-vs-yllas-vs-ruka", es: "/es/guia/levi-vs-yllas-vs-ruka", fr: "/fr/guide/levi-vs-yllas-vs-ruka", nl: "/nl/gids/levi-vs-yllas-vs-ruka" },
  leviVsRovaniemi: { fi: "/opas/levi-vs-rovaniemi", en: "/guide/levi-vs-rovaniemi-comparison", sv: "/guide/levi-vs-rovaniemi-comparison", de: "/de/guide/levi-vs-rovaniemi", es: "/es/guia/levi-vs-rovaniemi", fr: "/fr/guide/levi-vs-rovaniemi", nl: "/nl/gids/levi-vs-rovaniemi" },
  leviVsSaariselka: { fi: "/opas/levi-vs-saariselka", en: "/guide/levi-vs-saariselka-comparison", sv: "/guide/levi-vs-saariselka-comparison", de: "/guide/levi-vs-saariselka-comparison", es: "/guide/levi-vs-saariselka-comparison", fr: "/guide/levi-vs-saariselka-comparison", nl: "/guide/levi-vs-saariselka-comparison" },
  finnishSauna: { fi: "/opas/sauna-levilla", en: "/guide/finnish-sauna-in-levi", sv: "/guide/finnish-sauna-in-levi", de: "/guide/finnish-sauna-in-levi", es: "/guide/finnish-sauna-in-levi", fr: "/guide/finnish-sauna-in-levi", nl: "/guide/finnish-sauna-in-levi" },
  outdoorHotTub: { fi: "/opas/ulkoporeallas-levilla", en: "/guide/outdoor-hot-tub-levi-cabin", sv: "/opas/ulkoporeallas-levilla", de: "/opas/ulkoporeallas-levilla", es: "/opas/ulkoporeallas-levilla", fr: "/opas/ulkoporeallas-levilla", nl: "/opas/ulkoporeallas-levilla" },
  christmasDinner: { fi: "/en/guide/christmas-dinner-in-levi", en: "/en/guide/christmas-dinner-in-levi", sv: "/en/guide/christmas-dinner-in-levi", de: "/en/guide/christmas-dinner-in-levi", es: "/en/guide/christmas-dinner-in-levi", fr: "/en/guide/christmas-dinner-in-levi", nl: "/en/guide/christmas-dinner-in-levi" },
  christmasDinnerFI: { fi: "/opas/jouluillallinen-levilla", en: "/opas/jouluillallinen-levilla", sv: "/opas/jouluillallinen-levilla", de: "/opas/jouluillallinen-levilla", es: "/opas/jouluillallinen-levilla", fr: "/opas/jouluillallinen-levilla", nl: "/opas/jouluillallinen-levilla" },
  latuinfo: { fi: "/latuinfo", en: "/en/levi", sv: "/sv/levi", de: "/de/levi", es: "/es/levi", fr: "/fr/levi", nl: "/nl/levi" },
  laplandGlossary: { fi: "/opas/lapin-sanasto", en: "/guide/lapland-glossary", sv: "/guide/lapland-glossary", de: "/guide/lapland-glossary", es: "/guide/lapland-glossary", fr: "/guide/lapland-glossary", nl: "/guide/lapland-glossary" },
  pricesInLevi: { fi: "/opas/hinnat-levilla", en: "/guide/prices-in-levi", sv: "/opas/hinnat-levilla", de: "/opas/hinnat-levilla", es: "/opas/hinnat-levilla", fr: "/opas/hinnat-levilla", nl: "/nl/gids/prijzen-in-levi" },
  // Additional guide pages
  cabinVsApartment: { fi: "/opas/mokki-vai-huoneisto-levi", en: "/guide/cabin-vs-apartment-in-levi", sv: "/guide/cabin-vs-apartment-in-levi", de: "/guide/cabin-vs-apartment-in-levi", es: "/guide/cabin-vs-apartment-in-levi", fr: "/guide/cabin-vs-apartment-in-levi", nl: "/guide/cabin-vs-apartment-in-levi" },
  packingList: { fi: "/opas/pakkauslista-lapin-lomalle", en: "/guide/packing-list-for-lapland", sv: "/sv/guide/packlista-lappland", de: "/de/ratgeber/packliste-lappland", es: "/es/guia/lista-equipaje-laponia", fr: "/fr/guide/liste-bagages-laponie", nl: "/nl/gids/paklijst-lapland" },
  apresSkiLevi: { fi: "/opas/afterski-ja-yoelama-levilla", en: "/guide/apres-ski-and-nightlife-in-levi", sv: "/opas/afterski-ja-yoelama-levilla", de: "/de/ratgeber/apres-ski-levi", es: "/es/guia/apres-ski-levi", fr: "/opas/afterski-ja-yoelama-levilla", nl: "/opas/afterski-ja-yoelama-levilla" },
  santaClaus: { fi: "/opas/joulupukki-levilla", en: "/guide/santa-claus-in-levi", sv: "/sv/guide/jultomten-levi", de: "/de/ratgeber/weihnachtsmann-levi", es: "/es/guia/papa-noel-levi", fr: "/fr/guide/pere-noel-levi", nl: "/nl/gids/kerstman-levi" },
  springSkiing: { fi: "/opas/kevatlaskettelu-levi", en: "/guide/spring-skiing-in-levi", sv: "/sv/guide/varskidakning-levi", de: "/de/ratgeber/fruehlings-skifahren-levi", es: "/es/guia/esqui-primavera-levi", fr: "/fr/guide/ski-printemps-levi", nl: "/nl/gids/lente-skieen-levi" },
  equipmentRental: { fi: "/opas/valinevuokraus-levilla", en: "/guide/equipment-rental-in-levi", sv: "/sv/guide/utrustningsuthyrning-levi", de: "/de/ratgeber/ausruestungsverleih-levi", es: "/es/guia/alquiler-equipos-levi", fr: "/fr/guide/location-equipement-levi", nl: "/nl/gids/materiaalverhuur-levi" },
  newYearsEve: { fi: "/opas/uusivuosi-levilla", en: "/guide/new-years-eve-in-levi", sv: "/sv/guide/nyarsafton-levi", de: "/de/ratgeber/silvester-levi", es: "/es/guia/nochevieja-levi", fr: "/fr/guide/reveillon-levi", nl: "/nl/gids/oudejaarsavond-levi" },
  skiHoliday: { fi: "/opas/hiihtoloma-levilla", en: "/guide/ski-holiday-in-levi", sv: "/sv/guide/skidsemester-levi", de: "/de/ratgeber/skiurlaub-levi", es: "/es/guia/vacaciones-esqui-levi", fr: "/fr/guide/vacances-ski-levi", nl: "/nl/gids/skivakantie-levi" },
  romanticGetaway: { fi: "/opas/romanttinen-loma-levilla", en: "/guide/romantic-getaway-in-levi", sv: "/sv/guide/romantisk-semester-levi", de: "/de/ratgeber/romantischer-urlaub-levi", es: "/es/guia/escapada-romantica-levi", fr: "/fr/guide/escapade-romantique-levi", nl: "/nl/gids/romantisch-uitje-levi" },
  dayTrips: { fi: "/opas/paivaretket-levilla", en: "/guide/day-trips-from-levi", sv: "/sv/guide/dagsutflykter-fran-levi", de: "/de/ratgeber/tagesausfluege-von-levi", es: "/es/guia/excursiones-desde-levi", fr: "/fr/guide/excursions-depuis-levi", nl: "/nl/gids/dagtrips-vanuit-levi" },
  events: { fi: "/opas/tapahtumat-levilla", en: "/guide/events-in-levi", sv: "/sv/guide/evenemang-levi", de: "/de/ratgeber/veranstaltungen-levi", es: "/es/guia/eventos-levi", fr: "/fr/guide/evenements-levi", nl: "/nl/gids/evenementen-levi" },
  accessible: { fi: "/opas/esteetton-levi", en: "/guide/accessible-levi", sv: "/sv/guide/tillgangligt-levi", de: "/de/ratgeber/barrierefreies-levi", es: "/es/guia/levi-accesible", fr: "/fr/guide/levi-accessible", nl: "/nl/gids/toegankelijk-levi" },
  samiCulture: { fi: "/opas/saamelaiset-levilla", en: "/guide/sami-culture-in-levi", sv: "/sv/guide/samisk-kultur-levi", de: "/de/ratgeber/samische-kultur-levi", es: "/es/guia/cultura-sami-levi", fr: "/fr/guide/culture-sami-levi", nl: "/nl/gids/samische-cultuur-levi" },
  // Northern Lights sub-pages
  bestTimeNorthernLights: { fi: "/opas/paras-aika-revontulet-levi", en: "/guide/best-time-to-see-northern-lights-levi", sv: "/sv/guide/basta-tiden-norrsken-levi", de: "/de/ratgeber/beste-zeit-nordlichter-levi", es: "/es/guia/mejor-momento-auroras-boreales-levi", fr: "/fr/guide/meilleur-moment-aurores-boreales-levi", nl: "/nl/gids/beste-tijd-noorderlicht-levi" },
  northernLightsSeason: { fi: "/opas/revontulisesonki-levi", en: "/guide/northern-lights-season-levi", sv: "/sv/guide/norrsken-sasong-levi", de: "/de/ratgeber/nordlichter-saison-levi", es: "/es/guia/temporada-auroras-boreales-levi", fr: "/fr/guide/saison-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-seizoen-levi" },
  northernLightsForecast: { fi: "/opas/revontuliennuste-levi", en: "/guide/northern-lights-forecast-levi", sv: "/sv/guide/norrsken-prognos-levi", de: "/de/ratgeber/nordlichter-vorhersage-levi", es: "/es/guia/prevision-auroras-boreales-levi", fr: "/fr/guide/prevision-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-verwachting-levi" },
  whereToSeeNorthernLights: { fi: "/opas/missa-nahda-revontulet-levi", en: "/guide/where-to-see-northern-lights-levi", sv: "/sv/guide/var-se-norrsken-levi", de: "/de/ratgeber/wo-nordlichter-sehen-levi", es: "/es/guia/donde-ver-auroras-boreales-levi", fr: "/fr/guide/ou-voir-aurores-boreales-levi", nl: "/nl/gids/waar-noorderlicht-zien-levi" },
  northernLightsPhotography: { fi: "/opas/revontulien-valokuvaus-levi", en: "/guide/northern-lights-photography-levi", sv: "/sv/guide/fotografera-norrsken-levi", de: "/de/ratgeber/nordlichter-fotografieren-levi", es: "/es/guia/fotografiar-auroras-boreales-levi", fr: "/fr/guide/photographier-aurores-boreales-levi", nl: "/nl/gids/noorderlicht-fotograferen-levi" },
  howNorthernLightsForm: { fi: "/opas/miten-revontulet-syntyvat", en: "/guide/how-northern-lights-form", sv: "/sv/guide/hur-uppstar-norrsken", de: "/de/ratgeber/wie-entstehen-nordlichter", es: "/es/guia/como-se-forman-auroras-boreales", fr: "/fr/guide/comment-se-forment-aurores-boreales", nl: "/nl/gids/hoe-ontstaat-noorderlicht" },
  northernLightsColors: { fi: "/opas/revontulien-varit", en: "/guide/northern-lights-colors-explained", sv: "/sv/guide/norrskens-farger", de: "/de/ratgeber/farben-der-nordlichter", es: "/es/guia/colores-auroras-boreales", fr: "/fr/guide/couleurs-aurores-boreales", nl: "/nl/gids/kleuren-van-noorderlicht" },
  // Accommodation guides
  guideBearlodge: { fi: "/majoitukset/oppaat/bearlodge", en: "/accommodations/guides/bearlodge", sv: "/accommodations/guides/bearlodge", de: "/accommodations/guides/bearlodge", es: "/accommodations/guides/bearlodge", fr: "/accommodations/guides/bearlodge", nl: "/accommodations/guides/bearlodge" },
  guideSkistar: { fi: "/majoitukset/oppaat/skistar-huoneistot", en: "/accommodations/guides/skistar-apartments", sv: "/accommodations/guides/skistar-apartments", de: "/accommodations/guides/skistar-apartments", es: "/accommodations/guides/skistar-apartments", fr: "/accommodations/guides/skistar-apartments", nl: "/accommodations/guides/skistar-apartments" },
  guideFrontslope: { fi: "/accommodations/guides/frontslope-apartments", en: "/accommodations/guides/frontslope-apartments", sv: "/accommodations/guides/frontslope-apartments", de: "/accommodations/guides/frontslope-apartments", es: "/accommodations/guides/frontslope-apartments", fr: "/accommodations/guides/frontslope-apartments", nl: "/accommodations/guides/frontslope-apartments" },
  guestSupport: { fi: "/asiakaspalvelu", en: "/en/support", sv: "/asiakaspalvelu", de: "/asiakaspalvelu", es: "/asiakaspalvelu", fr: "/asiakaspalvelu", nl: "/asiakaspalvelu" },
  // Fireplace
  fireplace: { fi: "/takka-ohje", en: "/en/fireplace", sv: "/takka-ohje", de: "/takka-ohje", es: "/takka-ohje", fr: "/takka-ohje", nl: "/takka-ohje" },
  // Interactive Map
  leviMap: { fi: "/levi-map", en: "/levi-map", sv: "/levi-map", de: "/levi-map", es: "/levi-map", fr: "/levi-map", nl: "/levi-map" },
  // Snow report
  snowReport: { fi: "/lumitilanne", en: "/en/snowreport" },
  // Monthly guides
  leviInJanuary: { fi: "/opas/levi-tammikuussa", en: "/guide/levi-in-january", sv: "/sv/guide/levi-i-januari", de: "/de/ratgeber/levi-im-januar", es: "/es/guia/levi-en-enero", fr: "/fr/guide/levi-en-janvier", nl: "/nl/gids/levi-in-januari" },
  leviInFebruary: { fi: "/opas/levi-helmikuussa", en: "/guide/levi-in-february", sv: "/sv/guide/levi-i-februari", de: "/de/ratgeber/levi-im-februar", es: "/es/guia/levi-en-febrero", fr: "/fr/guide/levi-en-fevrier", nl: "/nl/gids/levi-in-februari" },
  leviInMarch: { fi: "/opas/levi-maaliskuussa", en: "/guide/levi-in-march", sv: "/sv/guide/levi-i-mars", de: "/de/ratgeber/levi-im-maerz", es: "/es/guia/levi-en-marzo", fr: "/fr/guide/levi-en-mars", nl: "/nl/gids/levi-in-maart" },
  leviInApril: { fi: "/opas/levi-huhtikuussa", en: "/guide/levi-in-april", sv: "/sv/guide/levi-i-april", de: "/de/ratgeber/levi-im-april", es: "/es/guia/levi-en-abril", fr: "/fr/guide/levi-en-avril", nl: "/nl/gids/levi-in-april" },
  leviInMay: { fi: "/opas/levi-toukokuussa", en: "/guide/levi-in-may", sv: "/sv/guide/levi-i-maj", de: "/de/ratgeber/levi-im-mai", es: "/es/guia/levi-en-mayo", fr: "/fr/guide/levi-en-mai", nl: "/nl/gids/levi-in-mei" },
  leviInJune: { fi: "/opas/levi-kesakuussa", en: "/guide/levi-in-june", sv: "/sv/guide/levi-i-juni", de: "/de/ratgeber/levi-im-juni", es: "/es/guia/levi-en-junio", fr: "/fr/guide/levi-en-juin", nl: "/nl/gids/levi-in-juni" },
  leviInJuly: { fi: "/opas/levi-heinakuussa", en: "/guide/levi-in-july", sv: "/sv/guide/levi-i-juli", de: "/de/ratgeber/levi-im-juli", es: "/es/guia/levi-en-julio", fr: "/fr/guide/levi-en-juillet", nl: "/nl/gids/levi-in-juli" },
  leviInAugust: { fi: "/opas/levi-elokuussa", en: "/guide/levi-in-august", sv: "/sv/guide/levi-i-augusti", de: "/de/ratgeber/levi-im-august", es: "/es/guia/levi-en-agosto", fr: "/fr/guide/levi-en-aout", nl: "/nl/gids/levi-in-augustus" },
  leviInSeptember: { fi: "/opas/levi-syyskuussa", en: "/guide/levi-in-september", sv: "/sv/guide/levi-i-september", de: "/de/ratgeber/levi-im-september", es: "/es/guia/levi-en-septiembre", fr: "/fr/guide/levi-en-septembre", nl: "/nl/gids/levi-in-september" },
  leviInOctober: { fi: "/opas/levi-lokakuussa", en: "/guide/levi-in-october", sv: "/sv/guide/levi-i-oktober", de: "/de/ratgeber/levi-im-oktober", es: "/es/guia/levi-en-octubre", fr: "/fr/guide/levi-en-octobre", nl: "/nl/gids/levi-in-oktober" },
  leviInNovember: { fi: "/opas/levi-marraskuussa", en: "/guide/levi-in-november", sv: "/sv/guide/levi-i-november", de: "/de/ratgeber/levi-im-november", es: "/es/guia/levi-en-noviembre", fr: "/fr/guide/levi-en-novembre", nl: "/nl/gids/levi-in-november" },
  leviInDecember: { fi: "/opas/levi-joulukuussa", en: "/guide/levi-in-december", sv: "/sv/guide/levi-i-december", de: "/de/ratgeber/levi-im-dezember", es: "/es/guia/levi-en-diciembre", fr: "/fr/guide/levi-en-decembre", nl: "/nl/gids/levi-in-december" },
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
