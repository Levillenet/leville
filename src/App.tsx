import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import CookieConsent from "./components/CookieConsent";
import PageViewTracker from "./components/PageViewTracker";

// Lazy-loaded page components
const Index = lazy(() => import("./pages/Index"));
const IndexEN = lazy(() => import("./pages/en/Index"));
const Majoitukset = lazy(() => import("./pages/Majoitukset"));
const Ajankohtaista = lazy(() => import("./pages/Ajankohtaista"));
const Levi = lazy(() => import("./pages/Levi"));
const JouluLapissa = lazy(() => import("./pages/JouluLapissa"));
const Revontulet = lazy(() => import("./pages/Revontulet"));
const Yhteystiedot = lazy(() => import("./pages/Yhteystiedot"));
const UKK = lazy(() => import("./pages/UKK"));
const Varausehdot = lazy(() => import("./pages/Varausehdot"));
const Tietosuoja = lazy(() => import("./pages/Tietosuoja"));
const Yritys = lazy(() => import("./pages/Yritys"));
const Sauna = lazy(() => import("./pages/Sauna"));
const Tietovisa = lazy(() => import("./pages/Tietovisa"));
const Akkilahdot = lazy(() => import("./pages/Akkilahdot"));
const Admin = lazy(() => import("./pages/Admin"));
const Asiakaspalvelu = lazy(() => import("./pages/Asiakaspalvelu"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const LeviPronounce = lazy(() => import("./pages/LeviPronounce"));
const Latuinfo = lazy(() => import("./pages/Latuinfo"));
const MyyLomaAsuntosi = lazy(() => import("./pages/MyyLomaAsuntosi"));
const NotFound = lazy(() => import("./pages/NotFound"));

// SEO Landing Pages
const WinterClothingGuide = lazy(() => import("./pages/guide/WinterClothingGuide"));
const SnowmobileSafariTips = lazy(() => import("./pages/activities/SnowmobileSafariTips"));
const HuskySafariTips = lazy(() => import("./pages/activities/HuskySafariTips"));
const ReindeerSafariLevi = lazy(() => import("./pages/activities/ReindeerSafariLevi"));
const HikingAndBikingLevi = lazy(() => import("./pages/activities/HikingAndBikingLevi"));
const HowToGetToLevi = lazy(() => import("./pages/travel/HowToGetToLevi"));
const TopWinterActivities = lazy(() => import("./pages/activities/TopWinterActivities"));
const SkiingInLevi = lazy(() => import("./pages/guide/SkiingInLevi"));
const CrossCountrySkiingInLevi = lazy(() => import("./pages/guide/CrossCountrySkiingInLevi"));
const WinterInLevi = lazy(() => import("./pages/guide/WinterInLevi"));
const WeatherInLevi = lazy(() => import("./pages/guide/WeatherInLevi"));
const SpringInLevi = lazy(() => import("./pages/guide/SpringInLevi"));
const SummerInLevi = lazy(() => import("./pages/guide/SummerInLevi"));
const AutumnRuskaInLevi = lazy(() => import("./pages/guide/AutumnRuskaInLevi"));

// Guide HUB Pages
const SeasonsHub = lazy(() => import("./pages/guide/SeasonsHub"));
const ActivitiesHub = lazy(() => import("./pages/guide/ActivitiesHub"));
const TravelHub = lazy(() => import("./pages/guide/TravelHub"));

// Travel HUB Child Pages
const GettingAroundLevi = lazy(() => import("./pages/guide/GettingAroundLevi"));
const RestaurantsAndServices = lazy(() => import("./pages/guide/RestaurantsAndServices"));
const LeviWithChildren = lazy(() => import("./pages/guide/LeviWithChildren"));
const LeviWithoutCar = lazy(() => import("./pages/guide/LeviWithoutCar"));
const HeatingSystemsInLevi = lazy(() => import("./pages/guide/HeatingSystemsInLevi"));
const HolidayPlanner = lazy(() => import("./pages/HolidayPlanner"));
const FireplaceInstructions = lazy(() => import("./pages/FireplaceInstructions"));
const LeviVsYllasVsRuka = lazy(() => import("./pages/guide/LeviVsYllasVsRuka"));
const LeviVsYllasVsRukaEN = lazy(() => import("./pages/guide/LeviVsYllasVsRukaEN"));
const LeviVsRovaniemi = lazy(() => import("./pages/opas/LeviVsRovaniemi"));
const LeviVsRovaniemiComparison = lazy(() => import("./pages/guide/LeviVsRovaniemiComparison"));
const SaunaLevilla = lazy(() => import("./pages/opas/SaunaLevilla"));
const FinnishSaunaLevi = lazy(() => import("./pages/guide/FinnishSaunaLevi"));
const ChristmasDinnerLevi = lazy(() => import("./pages/guide/ChristmasDinnerLevi"));
const LaplandGlossary = lazy(() => import("./pages/guide/LaplandGlossary"));
const LevinHinnatPage = lazy(() => import("./pages/guide/LevinHinnatPage"));
const PricesInLeviPage = lazy(() => import("./pages/guide/PricesInLeviPage"));
const PrijzenInLeviPage = lazy(() => import("./pages/guide/PrijzenInLeviPage"));
const PropertyGuide = lazy(() => import("./pages/PropertyGuide"));
const BearlodgeGuide = lazy(() => import("./pages/accommodations/BearlodgeGuide"));
const SkistarGuide = lazy(() => import("./pages/accommodations/SkistarGuide"));
const FrontslopeGuide = lazy(() => import("./pages/accommodations/FrontslopeGuide"));
const ApartmentsHub = lazy(() => import("./pages/en/apartments/ApartmentsHub"));
const StudioApartments = lazy(() => import("./pages/en/apartments/StudioApartments"));
const ApartmentsFor4 = lazy(() => import("./pages/en/apartments/ApartmentsFor4"));
const ApartmentsFor6 = lazy(() => import("./pages/en/apartments/ApartmentsFor6"));
const ApartmentsFor8 = lazy(() => import("./pages/en/apartments/ApartmentsFor8"));
const LargeGroupAccommodation = lazy(() => import("./pages/en/apartments/LargeGroupAccommodation"));
const PenthouseApartments = lazy(() => import("./pages/en/apartments/PenthouseApartments"));
const TwoBedroomApartments = lazy(() => import("./pages/en/apartments/TwoBedroomApartments"));
const ThreeBedroomApartments = lazy(() => import("./pages/en/apartments/ThreeBedroomApartments"));
const LeviCenterApartments = lazy(() => import("./pages/en/apartments/LeviCenterApartments"));

const CabinVsApartmentLevi = lazy(() => import("./pages/guide/CabinVsApartmentLevi"));
const PackingListLapland = lazy(() => import("./pages/guide/PackingListLapland"));
const ApresSkiLevi = lazy(() => import("./pages/guide/ApresSkiLevi"));
const SnowshoeingLevi = lazy(() => import("./pages/activities/SnowshoeingLevi"));
const SantaClausLevi = lazy(() => import("./pages/guide/SantaClausLevi"));
const SpringSkiingLevi = lazy(() => import("./pages/guide/SpringSkiingLevi"));
const EquipmentRentalLevi = lazy(() => import("./pages/guide/EquipmentRentalLevi"));
const NewYearsEveLevi = lazy(() => import("./pages/guide/NewYearsEveLevi"));
const FatbikeLevi = lazy(() => import("./pages/activities/FatbikeLevi"));
const SkiHolidayLevi = lazy(() => import("./pages/guide/SkiHolidayLevi"));
const LeviForKids = lazy(() => import("./pages/activities/LeviForKids"));
const IceFishingLevi = lazy(() => import("./pages/activities/IceFishingLevi"));
const RomanticLeviGetaway = lazy(() => import("./pages/guide/RomanticLeviGetaway"));
const DayTripsFromLevi = lazy(() => import("./pages/guide/DayTripsFromLevi"));
const ChristmasDinnerLeviFI = lazy(() => import("./pages/guide/ChristmasDinnerLeviFI"));
const EventsInLevi = lazy(() => import("./pages/guide/EventsInLevi"));
const HorseRidingLevi = lazy(() => import("./pages/activities/HorseRidingLevi"));
const GolfLevi = lazy(() => import("./pages/activities/GolfLevi"));
const IceSwimmingLevi = lazy(() => import("./pages/activities/IceSwimmingLevi"));
const CanoeingAndSUPLevi = lazy(() => import("./pages/activities/CanoeingAndSUPLevi"));
const AccessibleLevi = lazy(() => import("./pages/guide/AccessibleLevi"));
const SamiCultureLevi = lazy(() => import("./pages/guide/SamiCultureLevi"));
const MonthlyGuideLevi = lazy(() => import("./pages/guide/MonthlyGuideLevi"));
const BestTimeNorthernLightsLevi = lazy(() => import("./pages/guide/BestTimeNorthernLightsLevi"));
const NorthernLightsSeasonLevi = lazy(() => import("./pages/guide/NorthernLightsSeasonLevi"));
const NorthernLightsForecastLevi = lazy(() => import("./pages/guide/NorthernLightsForecastLevi"));
const WhereToSeeNorthernLightsLevi = lazy(() => import("./pages/guide/WhereToSeeNorthernLightsLevi"));
const NorthernLightsPhotographyLevi = lazy(() => import("./pages/guide/NorthernLightsPhotographyLevi"));
const HowNorthernLightsForm = lazy(() => import("./pages/guide/HowNorthernLightsForm"));
const NorthernLightsColorsExplained = lazy(() => import("./pages/guide/NorthernLightsColorsExplained"));
const BestTimeToVisitLevi = lazy(() => import("./pages/guide/BestTimeToVisitLevi"));

// Component map for dynamically registered SEO pages
const seoComponentMap: Record<string, React.ComponentType<{ lang?: string }>> = {
  'ReindeerSafariLevi': ReindeerSafariLevi,
  'CabinVsApartmentLevi': CabinVsApartmentLevi,
  'PackingListLapland': PackingListLapland,
  'ApresSkiLevi': ApresSkiLevi,
  'SnowshoeingLevi': SnowshoeingLevi,
  'SantaClausLevi': SantaClausLevi,
  'SpringSkiingLevi': SpringSkiingLevi,
  'EquipmentRentalLevi': EquipmentRentalLevi,
  'NewYearsEveLevi': NewYearsEveLevi,
  'FatbikeLevi': FatbikeLevi,
  'SkiHolidayLevi': SkiHolidayLevi,
  'LeviForKids': LeviForKids,
  'IceFishingLevi': IceFishingLevi,
  'RomanticLeviGetaway': RomanticLeviGetaway,
  'DayTripsFromLevi': DayTripsFromLevi,
  'ChristmasDinnerLeviFI': ChristmasDinnerLeviFI,
  'EventsInLevi': EventsInLevi,
  'HorseRidingLevi': HorseRidingLevi,
  'GolfLevi': GolfLevi,
  'IceSwimmingLevi': IceSwimmingLevi,
  'CanoeingAndSUPLevi': CanoeingAndSUPLevi,
  'AccessibleLevi': AccessibleLevi,
  'SamiCultureLevi': SamiCultureLevi,
  'MonthlyGuideLevi': MonthlyGuideLevi,
  'BestTimeNorthernLightsLevi': BestTimeNorthernLightsLevi,
  'NorthernLightsSeasonLevi': NorthernLightsSeasonLevi,
  'NorthernLightsForecastLevi': NorthernLightsForecastLevi,
  'WhereToSeeNorthernLightsLevi': WhereToSeeNorthernLightsLevi,
  'NorthernLightsPhotographyLevi': NorthernLightsPhotographyLevi,
  'HowNorthernLightsForm': HowNorthernLightsForm,
  'NorthernLightsColorsExplained': NorthernLightsColorsExplained,
};

const queryClient = new QueryClient();

interface SeoPageRoute {
  path: string;
  component_name: string;
  lang: string;
}

const App = () => {
  const [dynamicRoutes, setDynamicRoutes] = useState<SeoPageRoute[]>([]);

  useEffect(() => {
    const fetchPublishedPages = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('manage-seo-pages', {
          body: { action: 'get_published' }
        });
        if (!error && data) {
          setDynamicRoutes(data);
        }
      } catch (e) {
        console.error('Failed to fetch SEO pages:', e);
      }
    };
    fetchPublishedPages();
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTransition>
            <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              {/* Finnish routes (default) */}
              <Route path="/" element={<Index />} />
              <Route path="/majoitukset" element={<Majoitukset />} />
              <Route path="/ajankohtaista" element={<Ajankohtaista />} />
              <Route path="/levi" element={<Levi />} />
              <Route path="/levi/joulu-lapissa" element={<JouluLapissa />} />
              <Route path="/levi/saatieto-levilta" element={<WeatherInLevi />} />
              <Route path="/revontulet" element={<Revontulet />} />
              <Route path="/yhteystiedot" element={<Yhteystiedot />} />
              <Route path="/ukk" element={<UKK />} />
              <Route path="/varausehdot" element={<Varausehdot lang="fi" />} />
              <Route path="/tietosuoja" element={<Tietosuoja lang="fi" />} />
              <Route path="/yritys" element={<Yritys />} />
              <Route path="/sauna" element={<Navigate to="/guide/finnish-sauna-in-levi" replace />} />
              <Route path="/tietovisa" element={<Tietovisa />} />
              <Route path="/akkilahdot" element={<Akkilahdot />} />
              
              {/* English routes */}
              <Route path="/en" element={<IndexEN />} />
              <Route path="/en/accommodations" element={<Majoitukset lang="en" />} />
              <Route path="/en/news" element={<Ajankohtaista lang="en" />} />
              <Route path="/en/levi" element={<Levi lang="en" />} />
              <Route path="/en/levi/christmas-in-lapland" element={<JouluLapissa lang="en" />} />
              <Route path="/en/levi/weather-in-levi" element={<WeatherInLevi lang="en" />} />
              <Route path="/en/northern-lights" element={<Revontulet lang="en" />} />
              <Route path="/en/contact" element={<Yhteystiedot lang="en" />} />
              <Route path="/en/faq" element={<UKK lang="en" />} />
              <Route path="/en/company" element={<Yritys lang="en" />} />
              <Route path="/en/quiz" element={<Tietovisa lang="en" />} />
              <Route path="/en/last-minute" element={<Akkilahdot lang="en" />} />
              <Route path="/en/booking-terms" element={<Varausehdot lang="en" />} />
              <Route path="/en/privacy" element={<Tietosuoja lang="en" />} />
              
              {/* Swedish routes */}
              <Route path="/sv" element={<Index lang="sv" />} />
              <Route path="/sv/boende" element={<Majoitukset lang="sv" />} />
              <Route path="/sv/nyheter" element={<Ajankohtaista lang="sv" />} />
              <Route path="/sv/levi" element={<Levi lang="sv" />} />
              <Route path="/sv/levi/jul-i-lappland" element={<JouluLapissa lang="sv" />} />
              <Route path="/sv/norrsken" element={<Revontulet lang="sv" />} />
              <Route path="/sv/kontakt" element={<Yhteystiedot lang="sv" />} />
              <Route path="/sv/faq" element={<UKK lang="sv" />} />
              <Route path="/sv/foretag" element={<Yritys lang="sv" />} />
              <Route path="/sv/quiz" element={<Tietovisa lang="sv" />} />
              <Route path="/sv/sista-minuten" element={<Akkilahdot lang="sv" />} />
              <Route path="/sv/bokningsvillkor" element={<Varausehdot lang="sv" />} />
              <Route path="/sv/integritetspolicy" element={<Tietosuoja lang="sv" />} />
              
              {/* German routes */}
              <Route path="/de" element={<Index lang="de" />} />
              <Route path="/de/unterkuenfte" element={<Majoitukset lang="de" />} />
              <Route path="/de/aktuelles" element={<Ajankohtaista lang="de" />} />
              <Route path="/de/levi" element={<Levi lang="de" />} />
              <Route path="/de/levi/weihnachten-in-lappland" element={<JouluLapissa lang="de" />} />
              <Route path="/de/nordlichter" element={<Revontulet lang="de" />} />
              <Route path="/de/kontakt" element={<Yhteystiedot lang="de" />} />
              <Route path="/de/faq" element={<UKK lang="de" />} />
              <Route path="/de/unternehmen" element={<Yritys lang="de" />} />
              <Route path="/de/quiz" element={<Tietovisa lang="de" />} />
              <Route path="/de/last-minute" element={<Akkilahdot lang="de" />} />
              <Route path="/de/buchungsbedingungen" element={<Varausehdot lang="de" />} />
              <Route path="/de/datenschutz" element={<Tietosuoja lang="de" />} />
              
              {/* Spanish routes */}
              <Route path="/es" element={<Index lang="es" />} />
              <Route path="/es/alojamientos" element={<Majoitukset lang="es" />} />
              <Route path="/es/noticias" element={<Ajankohtaista lang="es" />} />
              <Route path="/es/levi" element={<Levi lang="es" />} />
              <Route path="/es/levi/navidad-en-laponia" element={<JouluLapissa lang="es" />} />
              <Route path="/es/auroras-boreales" element={<Revontulet lang="es" />} />
              <Route path="/es/contacto" element={<Yhteystiedot lang="es" />} />
              <Route path="/es/preguntas-frecuentes" element={<UKK lang="es" />} />
              <Route path="/es/empresa" element={<Yritys lang="es" />} />
              <Route path="/es/quiz" element={<Tietovisa lang="es" />} />
              <Route path="/es/ultima-hora" element={<Akkilahdot lang="es" />} />
              <Route path="/es/terminos-de-reserva" element={<Varausehdot lang="es" />} />
              <Route path="/es/privacidad" element={<Tietosuoja lang="es" />} />
              
              {/* French routes */}
              <Route path="/fr" element={<Index lang="fr" />} />
              <Route path="/fr/hebergements" element={<Majoitukset lang="fr" />} />
              <Route path="/fr/actualites" element={<Ajankohtaista lang="fr" />} />
              <Route path="/fr/levi" element={<Levi lang="fr" />} />
              <Route path="/fr/levi/noel-en-laponie" element={<JouluLapissa lang="fr" />} />
              <Route path="/fr/aurores-boreales" element={<Revontulet lang="fr" />} />
              <Route path="/fr/contact" element={<Yhteystiedot lang="fr" />} />
              <Route path="/fr/faq" element={<UKK lang="fr" />} />
              <Route path="/fr/entreprise" element={<Yritys lang="fr" />} />
              <Route path="/fr/quiz" element={<Tietovisa lang="fr" />} />
              <Route path="/fr/derniere-minute" element={<Akkilahdot lang="fr" />} />
              <Route path="/fr/conditions-de-reservation" element={<Varausehdot lang="fr" />} />
              <Route path="/fr/confidentialite" element={<Tietosuoja lang="fr" />} />
              
              {/* Dutch routes */}
              <Route path="/nl" element={<Index lang="nl" />} />
              <Route path="/nl/accommodaties" element={<Majoitukset lang="nl" />} />
              <Route path="/nl/nieuws" element={<Ajankohtaista lang="nl" />} />
              <Route path="/nl/levi" element={<Levi lang="nl" />} />
              <Route path="/nl/levi/kerst-in-lapland" element={<JouluLapissa lang="nl" />} />
              <Route path="/nl/noorderlicht" element={<Revontulet lang="nl" />} />
              <Route path="/nl/contact" element={<Yhteystiedot lang="nl" />} />
              <Route path="/nl/faq" element={<UKK lang="nl" />} />
              <Route path="/nl/bedrijf" element={<Yritys lang="nl" />} />
              <Route path="/nl/quiz" element={<Tietovisa lang="nl" />} />
              <Route path="/nl/last-minute" element={<Akkilahdot lang="nl" />} />
              <Route path="/nl/boekingsvoorwaarden" element={<Varausehdot lang="nl" />} />
              <Route path="/nl/privacy" element={<Tietosuoja lang="nl" />} />
              <Route path="/nl/gids/skieen-in-levi" element={<SkiingInLevi lang="nl" />} />
              <Route path="/nl/gids/seizoenen-in-levi" element={<SeasonsHub lang="nl" />} />
              <Route path="/nl/gids/activiteiten-in-levi" element={<ActivitiesHub lang="nl" />} />
              <Route path="/nl/gids/reisgids-levi" element={<TravelHub lang="nl" />} />
              <Route path="/nl/gids/winterkleding-levi-lapland" element={<WinterClothingGuide lang="nl" />} />
              <Route path="/nl/gids/hoe-kom-je-in-levi" element={<HowToGetToLevi lang="nl" />} />
              <Route path="/nl/activiteiten/winteractiviteiten-levi" element={<TopWinterActivities lang="nl" />} />
              <Route path="/nl/activiteiten/husky-safari-levi" element={<HuskySafariTips lang="nl" />} />
              <Route path="/nl/gids/langlaufen-in-levi" element={<CrossCountrySkiingInLevi lang="nl" />} />
              <Route path="/nl/gids/levi-met-kinderen" element={<LeviWithChildren lang="nl" />} />
              <Route path="/nl/gids/prijzen-in-levi" element={<PrijzenInLeviPage />} />
              
              {/* Guide HUB Pages - Finnish */}
              <Route path="/opas/vuodenajat-levi" element={<SeasonsHub />} />
              <Route path="/opas/aktiviteetit-levi" element={<ActivitiesHub />} />
              <Route path="/opas/matkaopas-levi" element={<TravelHub />} />
              
              {/* Guide HUB Pages - English */}
              <Route path="/guide/seasons-in-levi" element={<SeasonsHub lang="en" />} />
              <Route path="/guide/activities-in-levi" element={<ActivitiesHub lang="en" />} />
              <Route path="/guide/travel-to-levi" element={<TravelHub lang="en" />} />
              
              {/* SEO Landing Pages - Finnish */}
              <Route path="/opas/talvivarusteet-leville" element={<WinterClothingGuide />} />
              <Route path="/opas/laskettelu-levi" element={<SkiingInLevi />} />
              <Route path="/opas/hiihtoladut-levi" element={<CrossCountrySkiingInLevi />} />
              <Route path="/opas/talvi-levi" element={<WinterInLevi />} />
              <Route path="/opas/kevat-levi" element={<SpringInLevi />} />
              <Route path="/opas/kesa-levi" element={<SummerInLevi />} />
              <Route path="/opas/syksy-ruska-levi" element={<AutumnRuskaInLevi />} />
              <Route path="/opas/paras-aika-matkustaa-leville" element={<BestTimeToVisitLevi />} />
              <Route path="/aktiviteetit/moottorikelkkasafari-vinkit-levi" element={<SnowmobileSafariTips />} />
              <Route path="/aktiviteetit/koiravaljakkoajelu-levi" element={<HuskySafariTips />} />
              <Route path="/aktiviteetit/vaellus-ja-maastopyoraily-levi" element={<HikingAndBikingLevi />} />
              <Route path="/matka/miten-paasee-leville-helsingista" element={<HowToGetToLevi />} />
              <Route path="/aktiviteetit/parhaat-talviaktiviteetit-levi" element={<TopWinterActivities />} />
              <Route path="/aktiviteetit/porosafari-levi" element={<ReindeerSafariLevi />} />
              
              {/* SEO Landing Pages - English */}
              <Route path="/guide/how-to-dress-for-winter-in-levi-lapland" element={<WinterClothingGuide lang="en" />} />
              <Route path="/guide/skiing-in-levi" element={<SkiingInLevi lang="en" />} />
              <Route path="/guide/cross-country-skiing-in-levi" element={<CrossCountrySkiingInLevi lang="en" />} />
              <Route path="/guide/winter-in-levi" element={<WinterInLevi lang="en" />} />
              <Route path="/guide/spring-in-levi" element={<SpringInLevi lang="en" />} />
              <Route path="/guide/summer-in-levi" element={<SummerInLevi lang="en" />} />
              <Route path="/guide/autumn-ruska-in-levi" element={<AutumnRuskaInLevi lang="en" />} />
              <Route path="/guide/best-time-to-visit-levi" element={<BestTimeToVisitLevi lang="en" />} />
              <Route path="/activities/snowmobile-safari-tips-levi" element={<SnowmobileSafariTips lang="en" />} />
              <Route path="/activities/husky-safari-levi" element={<HuskySafariTips lang="en" />} />
              <Route path="/activities/hiking-and-biking-levi" element={<HikingAndBikingLevi lang="en" />} />
              <Route path="/travel/how-to-get-to-levi-from-helsinki-and-abroad" element={<HowToGetToLevi lang="en" />} />
              <Route path="/activities/top-winter-activities-in-levi-lapland" element={<TopWinterActivities lang="en" />} />
              <Route path="/activities/reindeer-safari-levi" element={<ReindeerSafariLevi lang="en" />} />
              
              {/* Travel HUB Child Pages - Finnish */}
              <Route path="/opas/liikkuminen-levilla" element={<GettingAroundLevi />} />
              <Route path="/opas/ravintolat-ja-palvelut-levilla" element={<RestaurantsAndServices />} />
              <Route path="/opas/lapsiperheet-levilla" element={<LeviWithChildren />} />
              <Route path="/opas/levi-ilman-autoa" element={<LeviWithoutCar />} />
              <Route path="/opas/lammitysjarjestelmat-levi" element={<HeatingSystemsInLevi />} />
              <Route path="/opas/levi-vs-yllas-vs-ruka" element={<LeviVsYllasVsRuka />} />
              <Route path="/opas/levi-vs-rovaniemi" element={<LeviVsRovaniemi />} />
              <Route path="/opas/sauna-levilla" element={<SaunaLevilla />} />
              <Route path="/opas/lapin-sanasto" element={<LaplandGlossary />} />
              <Route path="/opas/hinnat-levilla" element={<LevinHinnatPage />} />
              {/* Travel HUB Child Pages - English */}
              <Route path="/guide/getting-around-in-levi" element={<GettingAroundLevi lang="en" />} />
              <Route path="/guide/restaurants-and-services-in-levi" element={<RestaurantsAndServices lang="en" />} />
              <Route path="/guide/levi-with-children" element={<LeviWithChildren lang="en" />} />
              <Route path="/guide/levi-without-a-car" element={<LeviWithoutCar lang="en" />} />
              <Route path="/guide/heating-systems-in-levi" element={<HeatingSystemsInLevi lang="en" />} />
              <Route path="/guide/levi-vs-yllas-vs-ruka-comparison" element={<LeviVsYllasVsRukaEN />} />
              <Route path="/guide/levi-vs-rovaniemi-comparison" element={<LeviVsRovaniemiComparison />} />
              <Route path="/guide/lapland-glossary" element={<LaplandGlossary lang="en" />} />
              <Route path="/guide/prices-in-levi" element={<PricesInLeviPage />} />
              {/* Comparison pages - NL/DE/FR/ES */}
              <Route path="/nl/gids/levi-vs-yllas-vs-ruka" element={<LeviVsYllasVsRukaEN lang="nl" />} />
              <Route path="/nl/gids/levi-vs-rovaniemi" element={<LeviVsRovaniemiComparison lang="nl" />} />
              <Route path="/de/guide/levi-vs-yllas-vs-ruka" element={<LeviVsYllasVsRukaEN lang="de" />} />
              <Route path="/de/guide/levi-vs-rovaniemi" element={<LeviVsRovaniemiComparison lang="de" />} />
              <Route path="/fr/guide/levi-vs-yllas-vs-ruka" element={<LeviVsYllasVsRukaEN lang="fr" />} />
              <Route path="/fr/guide/levi-vs-rovaniemi" element={<LeviVsRovaniemiComparison lang="fr" />} />
              <Route path="/es/guia/levi-vs-yllas-vs-ruka" element={<LeviVsYllasVsRukaEN lang="es" />} />
              <Route path="/es/guia/levi-vs-rovaniemi" element={<LeviVsRovaniemiComparison lang="es" />} />
              <Route path="/guide/finnish-sauna-in-levi" element={<FinnishSaunaLevi />} />
              <Route path="/en/guide/christmas-dinner-in-levi" element={<ChristmasDinnerLevi />} />
              {/* Holiday Planner */}
              <Route path="/lomasuunnittelija" element={<HolidayPlanner />} />
              <Route path="/en/holiday-planner" element={<HolidayPlanner lang="en" />} />
              
              {/* Apartments programmatic SEO pages */}
              <Route path="/en/apartments" element={<ApartmentsHub />} />
              <Route path="/en/apartments/studio" element={<StudioApartments />} />
              <Route path="/en/apartments/for-4" element={<ApartmentsFor4 />} />
              <Route path="/en/apartments/for-6" element={<ApartmentsFor6 />} />
              <Route path="/en/apartments/for-8" element={<ApartmentsFor8 />} />
              <Route path="/en/apartments/large-group" element={<LargeGroupAccommodation />} />
              <Route path="/en/apartments/penthouse" element={<PenthouseApartments />} />
              <Route path="/en/apartments/2-bedroom" element={<TwoBedroomApartments />} />
              <Route path="/en/apartments/3-bedroom" element={<ThreeBedroomApartments />} />
              <Route path="/en/apartments/levi-center" element={<LeviCenterApartments />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/asiakaspalvelu" element={<Asiakaspalvelu />} />
              <Route path="/en/support" element={<Asiakaspalvelu lang="en" />} />
              
              {/* Utility routes */}
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/levi-pronounce" element={<LeviPronounce />} />
              <Route path="/latuinfo" element={<Latuinfo />} />
              <Route path="/myy-loma-asuntosi" element={<MyyLomaAsuntosi />} />
              
              {/* Property Guides (unlisted) */}
              <Route path="/guide/:slug" element={<PropertyGuide />} />
              
              {/* Bearlodge Guide */}
              <Route path="/accommodations/guides/bearlodge" element={<BearlodgeGuide lang="en" />} />
              <Route path="/majoitukset/oppaat/bearlodge" element={<BearlodgeGuide lang="fi" />} />
               <Route path="/accommodations/bearlodge/guide" element={<Navigate to="/accommodations/guides/bearlodge" replace />} />
               
               {/* Skistar Guide */}
               <Route path="/accommodations/guides/skistar-apartments" element={<SkistarGuide lang="en" />} />
               <Route path="/majoitukset/oppaat/skistar-huoneistot" element={<SkistarGuide lang="fi" />} />
               
               {/* Front Slope Guide */}
               <Route path="/accommodations/guides/frontslope-apartments" element={<FrontslopeGuide />} />
               
              {/* Fireplace instructions (hidden subpage) */}
              <Route path="/takka-ohje" element={<FireplaceInstructions />} />
              <Route path="/en/fireplace" element={<FireplaceInstructions lang="en" />} />
              
              {/* Dynamic SEO pages from database */}
              {dynamicRoutes.map((route) => {
                const Component = seoComponentMap[route.component_name];
                if (!Component) return null;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Component lang={route.lang !== 'fi' ? route.lang : undefined} />}
                  />
                );
              })}

              {/* Old WordPress redirects - Finnish */}
              <Route path="/majoituksemme" element={<Navigate to="/majoitukset" replace />} />
              <Route path="/majoituksemme/*" element={<Navigate to="/majoitukset" replace />} />
              <Route path="/levin-keskustahuoneistot" element={<Navigate to="/majoitukset" replace />} />
              <Route path="/levin-keskustahuoneistot/*" element={<Navigate to="/majoitukset" replace />} />
              <Route path="/kysymykset" element={<Navigate to="/ukk" replace />} />
              <Route path="/kysymykset/*" element={<Navigate to="/ukk" replace />} />
              <Route path="/yritysasiakkaille" element={<Navigate to="/yhteystiedot" replace />} />
              <Route path="/yritysasiakkaille/*" element={<Navigate to="/yhteystiedot" replace />} />
              <Route path="/yrityksemme" element={<Navigate to="/yritys" replace />} />
              <Route path="/yrityksemme/*" element={<Navigate to="/yritys" replace />} />
              <Route path="/levi-2" element={<Navigate to="/levi" replace />} />
              <Route path="/levi-2/*" element={<Navigate to="/levi" replace />} />

              {/* Old WordPress redirects - English */}
              <Route path="/our-accommodations" element={<Navigate to="/accommodations" replace />} />
              <Route path="/our-accommodations/*" element={<Navigate to="/accommodations" replace />} />
              <Route path="/business-clients" element={<Navigate to="/contact" replace />} />
              <Route path="/business-clients/*" element={<Navigate to="/contact" replace />} />
              <Route path="/about-us" element={<Navigate to="/about" replace />} />
              <Route path="/about-us/*" element={<Navigate to="/about" replace />} />
              <Route path="/booking-terms" element={<Navigate to="/terms" replace />} />
              <Route path="/booking-terms/*" element={<Navigate to="/terms" replace />} />
              <Route path="/latest-news" element={<Navigate to="/levi" replace />} />
              <Route path="/latest-news/*" element={<Navigate to="/levi" replace />} />

              {/* Old blog archive */}
              <Route path="/2020" element={<Navigate to="/levi" replace />} />
              <Route path="/2020/*" element={<Navigate to="/levi" replace />} />

              {/* Old property page */}
              <Route path="/skistar-levi-104" element={<Navigate to="/majoitukset" replace />} />
              <Route path="/skistar-levi-104/*" element={<Navigate to="/majoitukset" replace />} />

              {/* Wrong language paths */}
              <Route path="/sv/boenden" element={<Navigate to="/sv/boende" replace />} />
              <Route path="/sv/aktuellt" element={<Navigate to="/sv" replace />} />
              <Route path="/en/majoitukset" element={<Navigate to="/accommodations" replace />} />
              <Route path="/en/yhteystiedot" element={<Navigate to="/contact" replace />} />
              <Route path="/en/terms" element={<Navigate to="/terms" replace />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </PageTransition>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
