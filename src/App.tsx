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

import PageViewTracker from "./components/PageViewTracker";
import StructuredData from "./components/StructuredData";

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
const ComparisonHub = lazy(() => import("./pages/guide/ComparisonHub"));

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
const LeviVsSaariselka = lazy(() => import("./pages/opas/LeviVsSaariselka"));
const LeviVsSaariselkaComparison = lazy(() => import("./pages/guide/LeviVsSaariselkaComparison"));
const SaunaLevilla = lazy(() => import("./pages/opas/SaunaLevilla"));
const FinnishSaunaLevi = lazy(() => import("./pages/guide/FinnishSaunaLevi"));
const OutdoorHotTubLevi = lazy(() => import("./pages/guide/OutdoorHotTubLevi"));
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
const LeviInteractiveMap = lazy(() => import("./pages/guide/LeviInteractiveMap"));

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
          <PageViewTracker />
          <StructuredData />
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
              <Route path="/nl/gids/waarom-levi-kiezen" element={<ComparisonHub lang="nl" />} />
              <Route path="/nl/gids/winterkleding-levi-lapland" element={<WinterClothingGuide lang="nl" />} />
              <Route path="/nl/gids/hoe-kom-je-in-levi" element={<HowToGetToLevi lang="nl" />} />
              <Route path="/nl/activiteiten/winteractiviteiten-levi" element={<TopWinterActivities lang="nl" />} />
              <Route path="/nl/activiteiten/husky-safari-levi" element={<HuskySafariTips lang="nl" />} />
              <Route path="/nl/gids/langlaufen-in-levi" element={<CrossCountrySkiingInLevi lang="nl" />} />
              <Route path="/nl/gids/levi-met-kinderen" element={<LeviWithChildren lang="nl" />} />
              <Route path="/nl/gids/prijzen-in-levi" element={<PrijzenInLeviPage />} />
              <Route path="/nl/levi/weer-in-levi" element={<WeatherInLevi lang="nl" />} />
              <Route path="/nl/gids/winter-in-levi" element={<WinterInLevi lang="nl" />} />
              <Route path="/nl/gids/lente-in-levi" element={<SpringInLevi lang="nl" />} />
              <Route path="/nl/gids/zomer-in-levi" element={<SummerInLevi lang="nl" />} />
              <Route path="/nl/gids/herfst-ruska-in-levi" element={<AutumnRuskaInLevi lang="nl" />} />
              <Route path="/nl/activiteiten/sneeuwscooter-safari-levi" element={<SnowmobileSafariTips lang="nl" />} />
              <Route path="/nl/activiteiten/rendier-safari-levi" element={<ReindeerSafariLevi lang="nl" />} />
              <Route path="/nl/gids/vervoer-in-levi" element={<GettingAroundLevi lang="nl" />} />
              
              {/* Guide HUB Pages - Finnish */}
              <Route path="/opas/vuodenajat-levi" element={<SeasonsHub />} />
              <Route path="/opas/aktiviteetit-levi" element={<ActivitiesHub />} />
              <Route path="/opas/matkaopas-levi" element={<TravelHub />} />
              <Route path="/opas/miksi-valita-levi" element={<ComparisonHub />} />
              
              {/* Guide HUB Pages - English */}
              <Route path="/guide/seasons-in-levi" element={<SeasonsHub lang="en" />} />
              <Route path="/guide/activities-in-levi" element={<ActivitiesHub lang="en" />} />
              <Route path="/guide/travel-to-levi" element={<TravelHub lang="en" />} />
              <Route path="/guide/why-choose-levi" element={<ComparisonHub lang="en" />} />
              
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
              <Route path="/opas/levi-vs-saariselka" element={<LeviVsSaariselka />} />
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
              <Route path="/guide/levi-vs-saariselka-comparison" element={<LeviVsSaariselkaComparison />} />
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
              {/* Comparison HUB - other languages */}
              <Route path="/sv/guide/why-choose-levi" element={<ComparisonHub lang="sv" />} />
              <Route path="/de/guide/why-choose-levi" element={<ComparisonHub lang="de" />} />
              <Route path="/fr/guide/why-choose-levi" element={<ComparisonHub lang="fr" />} />
              <Route path="/es/guia/why-choose-levi" element={<ComparisonHub lang="es" />} />
              <Route path="/guide/finnish-sauna-in-levi" element={<FinnishSaunaLevi />} />
              <Route path="/opas/ulkoporeallas-levilla" element={<OutdoorHotTubLevi />} />
              <Route path="/guide/outdoor-hot-tub-levi-cabin" element={<OutdoorHotTubLevi lang="en" />} />
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
              
              {/* Northern Lights cluster - Finnish */}
              <Route path="/opas/paras-aika-revontulet-levi" element={<BestTimeNorthernLightsLevi />} />
              <Route path="/opas/revontulisesonki-levi" element={<NorthernLightsSeasonLevi />} />
              <Route path="/opas/revontuliennuste-levi" element={<NorthernLightsForecastLevi />} />
              <Route path="/opas/missa-nahda-revontulet-levi" element={<WhereToSeeNorthernLightsLevi />} />
              <Route path="/opas/revontulien-valokuvaus-levi" element={<NorthernLightsPhotographyLevi />} />
              <Route path="/opas/miten-revontulet-syntyvat" element={<HowNorthernLightsForm />} />
              <Route path="/opas/revontulien-varit" element={<NorthernLightsColorsExplained />} />

              {/* Northern Lights cluster - English */}
              <Route path="/guide/best-time-to-see-northern-lights-levi" element={<BestTimeNorthernLightsLevi lang="en" />} />
              <Route path="/guide/northern-lights-season-levi" element={<NorthernLightsSeasonLevi lang="en" />} />
              <Route path="/guide/northern-lights-forecast-levi" element={<NorthernLightsForecastLevi lang="en" />} />
              <Route path="/guide/where-to-see-northern-lights-levi" element={<WhereToSeeNorthernLightsLevi lang="en" />} />
              <Route path="/guide/northern-lights-photography-levi" element={<NorthernLightsPhotographyLevi lang="en" />} />
              <Route path="/guide/how-northern-lights-form" element={<HowNorthernLightsForm lang="en" />} />
              <Route path="/guide/northern-lights-colors-explained" element={<NorthernLightsColorsExplained lang="en" />} />

              {/* Other unpublished pages - Finnish */}
              <Route path="/opas/joulupukki-levilla" element={<SantaClausLevi />} />
              <Route path="/opas/pakkauslista-lapin-lomalle" element={<PackingListLapland />} />
              <Route path="/opas/afterski-ja-yoelama-levilla" element={<ApresSkiLevi />} />
              <Route path="/aktiviteetit/melonta-ja-sup-levi" element={<CanoeingAndSUPLevi />} />

              {/* Other unpublished pages - English */}
              <Route path="/activities/levi-for-kids" element={<LeviForKids lang="en" />} />
              <Route path="/activities/canoeing-and-sup-levi" element={<CanoeingAndSUPLevi lang="en" />} />

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
              <Route path="/our-accommodations" element={<Navigate to="/en/accommodations" replace />} />
              <Route path="/our-accommodations/*" element={<Navigate to="/en/accommodations" replace />} />
              <Route path="/business-clients" element={<Navigate to="/en/contact" replace />} />
              <Route path="/business-clients/*" element={<Navigate to="/en/contact" replace />} />
              <Route path="/about-us" element={<Navigate to="/yritys" replace />} />
              <Route path="/about-us/*" element={<Navigate to="/yritys" replace />} />
              <Route path="/booking-terms" element={<Navigate to="/varausehdot" replace />} />
              <Route path="/booking-terms/*" element={<Navigate to="/varausehdot" replace />} />
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
              <Route path="/en/majoitukset" element={<Navigate to="/en/accommodations" replace />} />
              <Route path="/en/yhteystiedot" element={<Navigate to="/en/contact" replace />} />
              <Route path="/en/terms" element={<Navigate to="/varausehdot" replace />} />

              {/* Legacy slug redirects */}
              <Route path="/opas/paras-aika-vierailla-levilla" element={<BestTimeToVisitLevi />} />

              {/* Interactive Map */}
              <Route path="/levi-map" element={<LeviInteractiveMap />} />

              {/* ===== 200-ALIAS STATIC ROUTES (Northern Lights cluster) ===== */}
              {/* BestTimeNorthernLightsLevi - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/beste-zeit-nordlichter-levi" element={<BestTimeNorthernLightsLevi lang="de" />} />
              <Route path="/sv/guide/basta-tiden-norrsken-levi" element={<BestTimeNorthernLightsLevi lang="sv" />} />
              <Route path="/es/guia/mejor-momento-auroras-boreales-levi" element={<BestTimeNorthernLightsLevi lang="es" />} />
              <Route path="/fr/guide/meilleur-moment-aurores-boreales-levi" element={<BestTimeNorthernLightsLevi lang="fr" />} />
              <Route path="/nl/gids/beste-tijd-noorderlicht-levi" element={<BestTimeNorthernLightsLevi lang="nl" />} />

              {/* NorthernLightsSeasonLevi - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/nordlichter-saison-levi" element={<NorthernLightsSeasonLevi lang="de" />} />
              <Route path="/sv/guide/norrsken-sasong-levi" element={<NorthernLightsSeasonLevi lang="sv" />} />
              <Route path="/es/guia/temporada-auroras-boreales-levi" element={<NorthernLightsSeasonLevi lang="es" />} />
              <Route path="/fr/guide/saison-aurores-boreales-levi" element={<NorthernLightsSeasonLevi lang="fr" />} />
              <Route path="/nl/gids/noorderlicht-seizoen-levi" element={<NorthernLightsSeasonLevi lang="nl" />} />

              {/* NorthernLightsForecastLevi - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/nordlichter-vorhersage-levi" element={<NorthernLightsForecastLevi lang="de" />} />
              <Route path="/sv/guide/norrsken-prognos-levi" element={<NorthernLightsForecastLevi lang="sv" />} />
              <Route path="/es/guia/prevision-auroras-boreales-levi" element={<NorthernLightsForecastLevi lang="es" />} />
              <Route path="/fr/guide/prevision-aurores-boreales-levi" element={<NorthernLightsForecastLevi lang="fr" />} />
              <Route path="/nl/gids/noorderlicht-verwachting-levi" element={<NorthernLightsForecastLevi lang="nl" />} />

              {/* WhereToSeeNorthernLightsLevi - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/wo-nordlichter-sehen-levi" element={<WhereToSeeNorthernLightsLevi lang="de" />} />
              <Route path="/sv/guide/var-se-norrsken-levi" element={<WhereToSeeNorthernLightsLevi lang="sv" />} />
              <Route path="/es/guia/donde-ver-auroras-boreales-levi" element={<WhereToSeeNorthernLightsLevi lang="es" />} />
              <Route path="/fr/guide/ou-voir-aurores-boreales-levi" element={<WhereToSeeNorthernLightsLevi lang="fr" />} />
              <Route path="/nl/gids/waar-noorderlicht-zien-levi" element={<WhereToSeeNorthernLightsLevi lang="nl" />} />

              {/* NorthernLightsPhotographyLevi - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/nordlichter-fotografieren-levi" element={<NorthernLightsPhotographyLevi lang="de" />} />
              <Route path="/sv/guide/fotografera-norrsken-levi" element={<NorthernLightsPhotographyLevi lang="sv" />} />
              <Route path="/es/guia/fotografiar-auroras-boreales-levi" element={<NorthernLightsPhotographyLevi lang="es" />} />
              <Route path="/fr/guide/photographier-aurores-boreales-levi" element={<NorthernLightsPhotographyLevi lang="fr" />} />
              <Route path="/nl/gids/noorderlicht-fotograferen-levi" element={<NorthernLightsPhotographyLevi lang="nl" />} />

              {/* HowNorthernLightsForm - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/wie-entstehen-nordlichter" element={<HowNorthernLightsForm lang="de" />} />
              <Route path="/sv/guide/hur-uppstar-norrsken" element={<HowNorthernLightsForm lang="sv" />} />
              <Route path="/es/guia/como-se-forman-auroras-boreales" element={<HowNorthernLightsForm lang="es" />} />
              <Route path="/fr/guide/comment-se-forment-aurores-boreales" element={<HowNorthernLightsForm lang="fr" />} />
              <Route path="/nl/gids/hoe-ontstaat-noorderlicht" element={<HowNorthernLightsForm lang="nl" />} />

              {/* NorthernLightsColorsExplained - DE/SV/ES/FR/NL */}
              <Route path="/de/ratgeber/farben-der-nordlichter" element={<NorthernLightsColorsExplained lang="de" />} />
              <Route path="/sv/guide/norrskens-farger" element={<NorthernLightsColorsExplained lang="sv" />} />
              <Route path="/es/guia/colores-auroras-boreales" element={<NorthernLightsColorsExplained lang="es" />} />
              <Route path="/fr/guide/couleurs-aurores-boreales" element={<NorthernLightsColorsExplained lang="fr" />} />
              <Route path="/nl/gids/kleuren-van-noorderlicht" element={<NorthernLightsColorsExplained lang="nl" />} />

              {/* ===== 200-ALIAS STATIC ROUTES (Activities) ===== */}
              {/* CanoeingAndSUPLevi */}
              <Route path="/de/aktivitaeten/kanufahren-und-sup-levi" element={<CanoeingAndSUPLevi lang="de" />} />
              <Route path="/sv/aktiviteter/kanot-och-sup-levi" element={<CanoeingAndSUPLevi lang="sv" />} />
              <Route path="/es/actividades/canoa-y-sup-levi" element={<CanoeingAndSUPLevi lang="es" />} />
              <Route path="/fr/activites/canoe-et-sup-levi" element={<CanoeingAndSUPLevi lang="fr" />} />
              <Route path="/nl/activiteiten/kanoen-en-sup-levi" element={<CanoeingAndSUPLevi lang="nl" />} />

              {/* FatbikeLevi */}
              <Route path="/aktiviteetit/fatbike-levi" element={<FatbikeLevi />} />
              <Route path="/activities/fatbiking-in-levi" element={<FatbikeLevi lang="en" />} />
              <Route path="/de/aktivitaeten/fatbike-levi" element={<FatbikeLevi lang="de" />} />
              <Route path="/sv/aktiviteter/fatbike-levi" element={<FatbikeLevi lang="sv" />} />
              <Route path="/es/actividades/fatbike-levi" element={<FatbikeLevi lang="es" />} />
              <Route path="/fr/activites/fatbike-levi" element={<FatbikeLevi lang="fr" />} />
              <Route path="/nl/activiteiten/fatbike-levi" element={<FatbikeLevi lang="nl" />} />

              {/* GolfLevi */}
              <Route path="/aktiviteetit/golf-levi" element={<GolfLevi />} />
              <Route path="/activities/golf-in-levi" element={<GolfLevi lang="en" />} />
              <Route path="/de/aktivitaeten/golf-levi" element={<GolfLevi lang="de" />} />
              <Route path="/sv/aktiviteter/golf-levi" element={<GolfLevi lang="sv" />} />
              <Route path="/es/actividades/golf-levi" element={<GolfLevi lang="es" />} />
              <Route path="/fr/activites/golf-levi" element={<GolfLevi lang="fr" />} />
              <Route path="/nl/activiteiten/golf-levi" element={<GolfLevi lang="nl" />} />

              {/* HorseRidingLevi */}
              <Route path="/aktiviteetit/ratsastus-levi" element={<HorseRidingLevi />} />
              <Route path="/activities/horse-riding-in-levi" element={<HorseRidingLevi lang="en" />} />
              <Route path="/de/aktivitaeten/reiten-levi" element={<HorseRidingLevi lang="de" />} />
              <Route path="/sv/aktiviteter/ridning-levi" element={<HorseRidingLevi lang="sv" />} />
              <Route path="/es/actividades/equitacion-levi" element={<HorseRidingLevi lang="es" />} />
              <Route path="/fr/activites/equitation-levi" element={<HorseRidingLevi lang="fr" />} />
              <Route path="/nl/activiteiten/paardrijden-levi" element={<HorseRidingLevi lang="nl" />} />

              {/* IceFishingLevi */}
              <Route path="/aktiviteetit/pilkkiminen-ja-kalastus-levi" element={<IceFishingLevi />} />
              <Route path="/activities/ice-fishing-and-fishing-levi" element={<IceFishingLevi lang="en" />} />
              <Route path="/de/aktivitaeten/eisfischen-levi" element={<IceFishingLevi lang="de" />} />
              <Route path="/sv/aktiviteter/isfiske-levi" element={<IceFishingLevi lang="sv" />} />
              <Route path="/es/actividades/pesca-en-hielo-levi" element={<IceFishingLevi lang="es" />} />
              <Route path="/fr/activites/peche-sur-glace-levi" element={<IceFishingLevi lang="fr" />} />
              <Route path="/nl/activiteiten/ijsvissen-levi" element={<IceFishingLevi lang="nl" />} />

              {/* IceSwimmingLevi */}
              <Route path="/aktiviteetit/avantouinti-levi" element={<IceSwimmingLevi />} />
              <Route path="/activities/ice-swimming-in-levi" element={<IceSwimmingLevi lang="en" />} />
              <Route path="/de/aktivitaeten/eisschwimmen-levi" element={<IceSwimmingLevi lang="de" />} />
              <Route path="/sv/aktiviteter/vinterbad-levi" element={<IceSwimmingLevi lang="sv" />} />
              <Route path="/es/actividades/bano-en-hielo-levi" element={<IceSwimmingLevi lang="es" />} />
              <Route path="/fr/activites/bain-glace-levi" element={<IceSwimmingLevi lang="fr" />} />
              <Route path="/nl/activiteiten/ijszwemmen-levi" element={<IceSwimmingLevi lang="nl" />} />

              {/* LeviForKids */}
              <Route path="/aktiviteetit/levi-lapsille" element={<LeviForKids />} />
              <Route path="/de/aktivitaeten/levi-fuer-kinder" element={<LeviForKids lang="de" />} />
              <Route path="/sv/aktiviteter/levi-for-barn" element={<LeviForKids lang="sv" />} />
              <Route path="/es/actividades/levi-para-ninos" element={<LeviForKids lang="es" />} />
              <Route path="/fr/activites/levi-pour-enfants" element={<LeviForKids lang="fr" />} />
              <Route path="/nl/activiteiten/levi-voor-kinderen" element={<LeviForKids lang="nl" />} />

              {/* SnowshoeingLevi */}
              <Route path="/aktiviteetit/lumikenkaily-levi" element={<SnowshoeingLevi />} />
              <Route path="/activities/snowshoeing-in-levi" element={<SnowshoeingLevi lang="en" />} />
              <Route path="/de/aktivitaeten/schneeschuhwandern-levi" element={<SnowshoeingLevi lang="de" />} />
              <Route path="/sv/aktiviteter/snoskovandrng-levi" element={<SnowshoeingLevi lang="sv" />} />
              <Route path="/es/actividades/raquetas-nieve-levi" element={<SnowshoeingLevi lang="es" />} />
              <Route path="/fr/activites/raquettes-neige-levi" element={<SnowshoeingLevi lang="fr" />} />
              <Route path="/nl/activiteiten/sneeuwschoenwandelen-levi" element={<SnowshoeingLevi lang="nl" />} />

              {/* ReindeerSafariLevi - missing DE/SV/ES/FR/NL */}
              <Route path="/de/aktivitaeten/rentiersafari-levi" element={<ReindeerSafariLevi lang="de" />} />
              <Route path="/sv/aktiviteter/rensafari-levi" element={<ReindeerSafariLevi lang="sv" />} />
              <Route path="/es/actividades/safari-renos-levi" element={<ReindeerSafariLevi lang="es" />} />
              <Route path="/fr/activites/safari-rennes-levi" element={<ReindeerSafariLevi lang="fr" />} />
              <Route path="/nl/activiteiten/rendiersafari-levi" element={<ReindeerSafariLevi lang="nl" />} />

              {/* ===== 200-ALIAS STATIC ROUTES (Guides) ===== */}
              {/* AccessibleLevi */}
              <Route path="/opas/esteetton-levi" element={<AccessibleLevi />} />
              <Route path="/guide/accessible-levi" element={<AccessibleLevi lang="en" />} />
              <Route path="/de/ratgeber/barrierefreies-levi" element={<AccessibleLevi lang="de" />} />
              <Route path="/sv/guide/tillgangligt-levi" element={<AccessibleLevi lang="sv" />} />
              <Route path="/es/guia/levi-accesible" element={<AccessibleLevi lang="es" />} />
              <Route path="/fr/guide/levi-accessible" element={<AccessibleLevi lang="fr" />} />
              <Route path="/nl/gids/toegankelijk-levi" element={<AccessibleLevi lang="nl" />} />

              {/* ApresSkiLevi - missing DE/ES */}
              <Route path="/de/ratgeber/apres-ski-levi" element={<ApresSkiLevi lang="de" />} />
              <Route path="/es/guia/apres-ski-levi" element={<ApresSkiLevi lang="es" />} />
              <Route path="/guide/apres-ski-and-nightlife-in-levi" element={<ApresSkiLevi lang="en" />} />

              {/* ChristmasDinnerLeviFI */}
              <Route path="/opas/jouluillallinen-levilla" element={<ChristmasDinnerLeviFI />} />

              {/* DayTripsFromLevi */}
              <Route path="/opas/paivaretket-levilla" element={<DayTripsFromLevi />} />
              <Route path="/guide/day-trips-from-levi" element={<DayTripsFromLevi lang="en" />} />
              <Route path="/de/ratgeber/tagesausfluege-von-levi" element={<DayTripsFromLevi lang="de" />} />
              <Route path="/sv/guide/dagsutflykter-fran-levi" element={<DayTripsFromLevi lang="sv" />} />
              <Route path="/es/guia/excursiones-desde-levi" element={<DayTripsFromLevi lang="es" />} />
              <Route path="/fr/guide/excursions-depuis-levi" element={<DayTripsFromLevi lang="fr" />} />
              <Route path="/nl/gids/dagtrips-vanuit-levi" element={<DayTripsFromLevi lang="nl" />} />

              {/* EquipmentRentalLevi */}
              <Route path="/opas/valinevuokraus-levilla" element={<EquipmentRentalLevi />} />
              <Route path="/guide/equipment-rental-in-levi" element={<EquipmentRentalLevi lang="en" />} />
              <Route path="/de/ratgeber/ausruestungsverleih-levi" element={<EquipmentRentalLevi lang="de" />} />
              <Route path="/sv/guide/utrustningsuthyrning-levi" element={<EquipmentRentalLevi lang="sv" />} />
              <Route path="/es/guia/alquiler-equipos-levi" element={<EquipmentRentalLevi lang="es" />} />
              <Route path="/fr/guide/location-equipement-levi" element={<EquipmentRentalLevi lang="fr" />} />
              <Route path="/nl/gids/materiaalverhuur-levi" element={<EquipmentRentalLevi lang="nl" />} />

              {/* EventsInLevi */}
              <Route path="/opas/tapahtumat-levilla" element={<EventsInLevi />} />
              <Route path="/guide/events-in-levi" element={<EventsInLevi lang="en" />} />
              <Route path="/de/ratgeber/veranstaltungen-levi" element={<EventsInLevi lang="de" />} />
              <Route path="/sv/guide/evenemang-levi" element={<EventsInLevi lang="sv" />} />
              <Route path="/es/guia/eventos-levi" element={<EventsInLevi lang="es" />} />
              <Route path="/fr/guide/evenements-levi" element={<EventsInLevi lang="fr" />} />
              <Route path="/nl/gids/evenementen-levi" element={<EventsInLevi lang="nl" />} />

              {/* NewYearsEveLevi */}
              <Route path="/opas/uusivuosi-levilla" element={<NewYearsEveLevi />} />
              <Route path="/guide/new-years-eve-in-levi" element={<NewYearsEveLevi lang="en" />} />
              <Route path="/de/ratgeber/silvester-levi" element={<NewYearsEveLevi lang="de" />} />
              <Route path="/sv/guide/nyarsafton-levi" element={<NewYearsEveLevi lang="sv" />} />
              <Route path="/es/guia/nochevieja-levi" element={<NewYearsEveLevi lang="es" />} />
              <Route path="/fr/guide/reveillon-levi" element={<NewYearsEveLevi lang="fr" />} />
              <Route path="/nl/gids/oudejaarsavond-levi" element={<NewYearsEveLevi lang="nl" />} />

              {/* PackingListLapland */}
              <Route path="/guide/packing-list-for-lapland" element={<PackingListLapland lang="en" />} />
              <Route path="/de/ratgeber/packliste-lappland" element={<PackingListLapland lang="de" />} />
              <Route path="/sv/guide/packlista-lappland" element={<PackingListLapland lang="sv" />} />
              <Route path="/es/guia/lista-equipaje-laponia" element={<PackingListLapland lang="es" />} />
              <Route path="/fr/guide/liste-bagages-laponie" element={<PackingListLapland lang="fr" />} />
              <Route path="/nl/gids/paklijst-lapland" element={<PackingListLapland lang="nl" />} />

              {/* RomanticLeviGetaway */}
              <Route path="/opas/romanttinen-loma-levilla" element={<RomanticLeviGetaway />} />
              <Route path="/guide/romantic-getaway-in-levi" element={<RomanticLeviGetaway lang="en" />} />
              <Route path="/de/ratgeber/romantischer-urlaub-levi" element={<RomanticLeviGetaway lang="de" />} />
              <Route path="/sv/guide/romantisk-semester-levi" element={<RomanticLeviGetaway lang="sv" />} />
              <Route path="/es/guia/escapada-romantica-levi" element={<RomanticLeviGetaway lang="es" />} />
              <Route path="/fr/guide/escapade-romantique-levi" element={<RomanticLeviGetaway lang="fr" />} />
              <Route path="/nl/gids/romantisch-uitje-levi" element={<RomanticLeviGetaway lang="nl" />} />

              {/* SamiCultureLevi */}
              <Route path="/opas/saamelaiset-levilla" element={<SamiCultureLevi />} />
              <Route path="/guide/sami-culture-in-levi" element={<SamiCultureLevi lang="en" />} />
              <Route path="/de/ratgeber/samische-kultur-levi" element={<SamiCultureLevi lang="de" />} />
              <Route path="/sv/guide/samisk-kultur-levi" element={<SamiCultureLevi lang="sv" />} />
              <Route path="/es/guia/cultura-sami-levi" element={<SamiCultureLevi lang="es" />} />
              <Route path="/fr/guide/culture-sami-levi" element={<SamiCultureLevi lang="fr" />} />
              <Route path="/nl/gids/samische-cultuur-levi" element={<SamiCultureLevi lang="nl" />} />

              {/* SantaClausLevi */}
              <Route path="/guide/santa-claus-in-levi" element={<SantaClausLevi lang="en" />} />
              <Route path="/de/ratgeber/weihnachtsmann-levi" element={<SantaClausLevi lang="de" />} />
              <Route path="/sv/guide/jultomten-levi" element={<SantaClausLevi lang="sv" />} />
              <Route path="/es/guia/papa-noel-levi" element={<SantaClausLevi lang="es" />} />
              <Route path="/fr/guide/pere-noel-levi" element={<SantaClausLevi lang="fr" />} />
              <Route path="/nl/gids/kerstman-levi" element={<SantaClausLevi lang="nl" />} />

              {/* SkiHolidayLevi */}
              <Route path="/opas/hiihtoloma-levilla" element={<SkiHolidayLevi />} />
              <Route path="/guide/ski-holiday-in-levi" element={<SkiHolidayLevi lang="en" />} />
              <Route path="/de/ratgeber/skiurlaub-levi" element={<SkiHolidayLevi lang="de" />} />
              <Route path="/sv/guide/skidsemester-levi" element={<SkiHolidayLevi lang="sv" />} />
              <Route path="/es/guia/vacaciones-esqui-levi" element={<SkiHolidayLevi lang="es" />} />
              <Route path="/fr/guide/vacances-ski-levi" element={<SkiHolidayLevi lang="fr" />} />
              <Route path="/nl/gids/skivakantie-levi" element={<SkiHolidayLevi lang="nl" />} />

              {/* SpringSkiingLevi */}
              <Route path="/opas/kevatlaskettelu-levi" element={<SpringSkiingLevi />} />
              <Route path="/guide/spring-skiing-in-levi" element={<SpringSkiingLevi lang="en" />} />
              <Route path="/de/ratgeber/fruehlings-skifahren-levi" element={<SpringSkiingLevi lang="de" />} />
              <Route path="/sv/guide/varskidakning-levi" element={<SpringSkiingLevi lang="sv" />} />
              <Route path="/es/guia/esqui-primavera-levi" element={<SpringSkiingLevi lang="es" />} />
              <Route path="/fr/guide/ski-printemps-levi" element={<SpringSkiingLevi lang="fr" />} />
              <Route path="/nl/gids/lente-skieen-levi" element={<SpringSkiingLevi lang="nl" />} />

              {/* ===== MonthlyGuideLevi - all 12 months x 7 languages ===== */}
              {/* January */}
              <Route path="/opas/levi-tammikuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-january" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-januar" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-januari" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-enero" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-janvier" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-januari" element={<MonthlyGuideLevi lang="nl" />} />
              {/* February */}
              <Route path="/opas/levi-helmikuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-february" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-februar" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-februari" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-febrero" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-fevrier" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-februari" element={<MonthlyGuideLevi lang="nl" />} />
              {/* March */}
              <Route path="/opas/levi-maaliskuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-march" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-maerz" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-mars" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-marzo" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-mars" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-maart" element={<MonthlyGuideLevi lang="nl" />} />
              {/* April */}
              <Route path="/opas/levi-huhtikuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-april" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-april" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-april" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-abril" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-avril" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-april" element={<MonthlyGuideLevi lang="nl" />} />
              {/* May */}
              <Route path="/opas/levi-toukokuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-may" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-mai" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-maj" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-mayo" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-mai" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-mei" element={<MonthlyGuideLevi lang="nl" />} />
              {/* June */}
              <Route path="/opas/levi-kesakuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-june" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-juni" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-juni" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-junio" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-juin" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-juni" element={<MonthlyGuideLevi lang="nl" />} />
              {/* July */}
              <Route path="/opas/levi-heinakuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-july" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-juli" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-juli" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-julio" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-juillet" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-juli" element={<MonthlyGuideLevi lang="nl" />} />
              {/* August */}
              <Route path="/opas/levi-elokuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-august" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-august" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-augusti" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-agosto" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-aout" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-augustus" element={<MonthlyGuideLevi lang="nl" />} />
              {/* September */}
              <Route path="/opas/levi-syyskuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-september" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-september" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-september" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-septiembre" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-septembre" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-september" element={<MonthlyGuideLevi lang="nl" />} />
              {/* October */}
              <Route path="/opas/levi-lokakuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-october" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-oktober" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-oktober" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-octubre" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-octobre" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-oktober" element={<MonthlyGuideLevi lang="nl" />} />
              {/* November */}
              <Route path="/opas/levi-marraskuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-november" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-november" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-november" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-noviembre" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-novembre" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-november" element={<MonthlyGuideLevi lang="nl" />} />
              {/* December */}
              <Route path="/opas/levi-joulukuussa" element={<MonthlyGuideLevi />} />
              <Route path="/guide/levi-in-december" element={<MonthlyGuideLevi lang="en" />} />
              <Route path="/de/ratgeber/levi-im-dezember" element={<MonthlyGuideLevi lang="de" />} />
              <Route path="/sv/guide/levi-i-december" element={<MonthlyGuideLevi lang="sv" />} />
              <Route path="/es/guia/levi-en-diciembre" element={<MonthlyGuideLevi lang="es" />} />
              <Route path="/fr/guide/levi-en-decembre" element={<MonthlyGuideLevi lang="fr" />} />
              <Route path="/nl/gids/levi-in-december" element={<MonthlyGuideLevi lang="nl" />} />

              {/* CabinVsApartmentLevi */}
              <Route path="/opas/mokki-vai-huoneisto-levi" element={<CabinVsApartmentLevi />} />
              <Route path="/guide/cabin-vs-apartment-in-levi" element={<CabinVsApartmentLevi lang="en" />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </PageTransition>
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
