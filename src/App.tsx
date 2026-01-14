import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Yritys from "./pages/Yritys";
import Sauna from "./pages/Sauna";
import Tietovisa from "./pages/Tietovisa";
import Akkilahdot from "./pages/Akkilahdot";
import Admin from "./pages/Admin";
import Asiakaspalvelu from "./pages/Asiakaspalvelu";
import Unsubscribe from "./pages/Unsubscribe";
import LeviPronounce from "./pages/LeviPronounce";
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
              <Route path="/revontulet" element={<Revontulet />} />
              <Route path="/yhteystiedot" element={<Yhteystiedot />} />
              <Route path="/ukk" element={<UKK />} />
              <Route path="/varausehdot" element={<Varausehdot />} />
              <Route path="/yritys" element={<Yritys />} />
              <Route path="/sauna" element={<Sauna />} />
              <Route path="/tietovisa" element={<Tietovisa />} />
              <Route path="/akkilahdot" element={<Akkilahdot />} />
              
              {/* English routes */}
              <Route path="/en" element={<IndexEN />} />
              <Route path="/en/accommodations" element={<Majoitukset lang="en" />} />
              <Route path="/en/news" element={<Ajankohtaista lang="en" />} />
              <Route path="/en/levi" element={<Levi lang="en" />} />
              <Route path="/en/levi/christmas-in-lapland" element={<JouluLapissa lang="en" />} />
              <Route path="/en/northern-lights" element={<Revontulet lang="en" />} />
              <Route path="/en/contact" element={<Yhteystiedot lang="en" />} />
              <Route path="/en/faq" element={<UKK lang="en" />} />
              <Route path="/en/company" element={<Yritys lang="en" />} />
              <Route path="/en/quiz" element={<Tietovisa lang="en" />} />
              <Route path="/en/last-minute" element={<Akkilahdot lang="en" />} />
              
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
              
              {/* Travel HUB Child Pages - English */}
              <Route path="/guide/getting-around-in-levi" element={<GettingAroundLevi lang="en" />} />
              <Route path="/guide/restaurants-and-services-in-levi" element={<RestaurantsAndServices lang="en" />} />
              <Route path="/guide/levi-with-children" element={<LeviWithChildren lang="en" />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/asiakaspalvelu" element={<Asiakaspalvelu />} />
              
              {/* Utility routes */}
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/levi-pronounce" element={<LeviPronounce />} />
              
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
