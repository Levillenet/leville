import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import IndexEN from "./pages/en/Index";
import Majoitukset from "./pages/Majoitukset";
import Ajankohtaista from "./pages/Ajankohtaista";
import Levi from "./pages/Levi";
import JouluLapissa from "./pages/JouluLapissa";
import Revontulet from "./pages/Revontulet";
import Yhteystiedot from "./pages/Yhteystiedot";
import UKK from "./pages/UKK";
import Varausehdot from "./pages/Varausehdot";
import Tietosuoja from "./pages/Tietosuoja";
import Yritys from "./pages/Yritys";
import Sauna from "./pages/Sauna";
import Tietovisa from "./pages/Tietovisa";
import Akkilahdot from "./pages/Akkilahdot";
import Admin from "./pages/Admin";
import Asiakaspalvelu from "./pages/Asiakaspalvelu";
import Unsubscribe from "./pages/Unsubscribe";
import LeviPronounce from "./pages/LeviPronounce";
import Latuinfo from "./pages/Latuinfo";
import MyyLomaAsuntosi from "./pages/MyyLomaAsuntosi";
import NotFound from "./pages/NotFound";

// SEO Landing Pages
import WinterClothingGuide from "./pages/guide/WinterClothingGuide";
import SnowmobileSafariTips from "./pages/activities/SnowmobileSafariTips";
import HuskySafariTips from "./pages/activities/HuskySafariTips";
import HikingAndBikingLevi from "./pages/activities/HikingAndBikingLevi";
import HowToGetToLevi from "./pages/travel/HowToGetToLevi";
import TopWinterActivities from "./pages/activities/TopWinterActivities";
import SkiingInLevi from "./pages/guide/SkiingInLevi";
import CrossCountrySkiingInLevi from "./pages/guide/CrossCountrySkiingInLevi";
import WinterInLevi from "./pages/guide/WinterInLevi";
import WeatherInLevi from "./pages/guide/WeatherInLevi";
import SpringInLevi from "./pages/guide/SpringInLevi";
import SummerInLevi from "./pages/guide/SummerInLevi";
import AutumnRuskaInLevi from "./pages/guide/AutumnRuskaInLevi";

// Guide HUB Pages
import SeasonsHub from "./pages/guide/SeasonsHub";
import ActivitiesHub from "./pages/guide/ActivitiesHub";
import TravelHub from "./pages/guide/TravelHub";

// Travel HUB Child Pages
import GettingAroundLevi from "./pages/guide/GettingAroundLevi";
import RestaurantsAndServices from "./pages/guide/RestaurantsAndServices";
import LeviWithChildren from "./pages/guide/LeviWithChildren";
import LeviWithoutCar from "./pages/guide/LeviWithoutCar";
import HeatingSystemsInLevi from "./pages/guide/HeatingSystemsInLevi";
import HolidayPlanner from "./pages/HolidayPlanner";
import FireplaceInstructions from "./pages/FireplaceInstructions";
import LeviVsYllasVsRuka from "./pages/guide/LeviVsYllasVsRuka";
import LeviVsYllasVsRukaEN from "./pages/guide/LeviVsYllasVsRukaEN";
import LeviVsRovaniemi from "./pages/opas/LeviVsRovaniemi";
import LeviVsRovaniemiComparison from "./pages/guide/LeviVsRovaniemiComparison";
import SaunaLevilla from "./pages/opas/SaunaLevillä";
import FinnishSaunaLevi from "./pages/guide/FinnishSaunaLevi";
import ChristmasDinnerLevi from "./pages/guide/ChristmasDinnerLevi";
import PropertyGuide from "./pages/PropertyGuide";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTransition>
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
              <Route path="/opas/hiihto-levi" element={<CrossCountrySkiingInLevi />} />
              <Route path="/opas/talvi-levi" element={<WinterInLevi />} />
              <Route path="/opas/kevat-levi" element={<SpringInLevi />} />
              <Route path="/opas/kesa-levi" element={<SummerInLevi />} />
              <Route path="/opas/syksy-ruska-levi" element={<AutumnRuskaInLevi />} />
              <Route path="/aktiviteetit/moottorikelkkasafari-vinkit-levi" element={<SnowmobileSafariTips />} />
              <Route path="/aktiviteetit/koiravaljakkoajelu-levi" element={<HuskySafariTips />} />
              <Route path="/aktiviteetit/vaellus-ja-maastopyoraily-levi" element={<HikingAndBikingLevi />} />
              <Route path="/matka/miten-paasee-leville-helsingista" element={<HowToGetToLevi />} />
              <Route path="/aktiviteetit/parhaat-talviaktiviteetit-levi" element={<TopWinterActivities />} />
              
              {/* SEO Landing Pages - English */}
              <Route path="/guide/how-to-dress-for-winter-in-levi-lapland" element={<WinterClothingGuide lang="en" />} />
              <Route path="/guide/skiing-in-levi" element={<SkiingInLevi lang="en" />} />
              <Route path="/guide/cross-country-skiing-in-levi" element={<CrossCountrySkiingInLevi lang="en" />} />
              <Route path="/guide/winter-in-levi" element={<WinterInLevi lang="en" />} />
              <Route path="/guide/spring-in-levi" element={<SpringInLevi lang="en" />} />
              <Route path="/guide/summer-in-levi" element={<SummerInLevi lang="en" />} />
              <Route path="/guide/autumn-ruska-in-levi" element={<AutumnRuskaInLevi lang="en" />} />
              <Route path="/activities/snowmobile-safari-tips-levi" element={<SnowmobileSafariTips lang="en" />} />
              <Route path="/activities/husky-safari-levi" element={<HuskySafariTips lang="en" />} />
              <Route path="/activities/hiking-and-biking-levi" element={<HikingAndBikingLevi lang="en" />} />
              <Route path="/travel/how-to-get-to-levi-from-helsinki-and-abroad" element={<HowToGetToLevi lang="en" />} />
              <Route path="/activities/top-winter-activities-in-levi-lapland" element={<TopWinterActivities lang="en" />} />
              
              {/* Travel HUB Child Pages - Finnish */}
              <Route path="/opas/liikkuminen-levilla" element={<GettingAroundLevi />} />
              <Route path="/opas/ravintolat-ja-palvelut-levilla" element={<RestaurantsAndServices />} />
              <Route path="/opas/lapsiperheet-levilla" element={<LeviWithChildren />} />
              <Route path="/opas/levi-ilman-autoa" element={<LeviWithoutCar />} />
              <Route path="/opas/lammitysjarjestelmat-levi" element={<HeatingSystemsInLevi />} />
              <Route path="/opas/levi-vs-yllas-vs-ruka" element={<LeviVsYllasVsRuka />} />
              <Route path="/opas/levi-vs-rovaniemi" element={<LeviVsRovaniemi />} />
              <Route path="/opas/sauna-levilla" element={<SaunaLevilla />} />
              {/* Travel HUB Child Pages - English */}
              <Route path="/guide/getting-around-in-levi" element={<GettingAroundLevi lang="en" />} />
              <Route path="/guide/restaurants-and-services-in-levi" element={<RestaurantsAndServices lang="en" />} />
              <Route path="/guide/levi-with-children" element={<LeviWithChildren lang="en" />} />
              <Route path="/guide/levi-without-a-car" element={<LeviWithoutCar lang="en" />} />
              <Route path="/guide/heating-systems-in-levi" element={<HeatingSystemsInLevi lang="en" />} />
              <Route path="/guide/levi-vs-yllas-vs-ruka-comparison" element={<LeviVsYllasVsRukaEN />} />
              <Route path="/guide/levi-vs-rovaniemi-comparison" element={<LeviVsRovaniemiComparison />} />
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
              
              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/asiakaspalvelu" element={<Asiakaspalvelu />} />
              
              {/* Utility routes */}
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/levi-pronounce" element={<LeviPronounce />} />
              <Route path="/latuinfo" element={<Latuinfo />} />
              <Route path="/myy-loma-asuntosi" element={<MyyLomaAsuntosi />} />
              
              {/* Property Guides (unlisted) */}
              <Route path="/guide/:slug" element={<PropertyGuide />} />
              
              {/* Fireplace instructions (hidden subpage) */}
              <Route path="/takka-ohje" element={<FireplaceInstructions />} />
              <Route path="/en/fireplace" element={<FireplaceInstructions lang="en" />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
