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
import Admin from "./pages/Admin";
import Asiakaspalvelu from "./pages/Asiakaspalvelu";
import NotFound from "./pages/NotFound";

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
              
              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/asiakaspalvelu" element={<Asiakaspalvelu />} />
              
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
