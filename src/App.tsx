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
              <Route path="/" element={<Index />} />
              <Route path="/en" element={<IndexEN />} />
              <Route path="/majoitukset" element={<Majoitukset />} />
              <Route path="/en/accommodations" element={<Majoitukset lang="en" />} />
              <Route path="/ajankohtaista" element={<Ajankohtaista />} />
              <Route path="/en/news" element={<Ajankohtaista lang="en" />} />
              <Route path="/levi" element={<Levi />} />
              <Route path="/en/levi" element={<Levi lang="en" />} />
              <Route path="/levi/joulu-lapissa" element={<JouluLapissa />} />
              <Route path="/en/levi/christmas-in-lapland" element={<JouluLapissa lang="en" />} />
              <Route path="/revontulet" element={<Revontulet />} />
              <Route path="/en/northern-lights" element={<Revontulet lang="en" />} />
              <Route path="/yhteystiedot" element={<Yhteystiedot />} />
              <Route path="/en/contact" element={<Yhteystiedot lang="en" />} />
              <Route path="/ukk" element={<UKK />} />
              <Route path="/en/faq" element={<UKK lang="en" />} />
              <Route path="/varausehdot" element={<Varausehdot />} />
              <Route path="/yritys" element={<Yritys />} />
              <Route path="/en/company" element={<Yritys lang="en" />} />
              <Route path="/sauna" element={<Sauna />} />
              <Route path="/tietovisa" element={<Tietovisa />} />
              <Route path="/en/quiz" element={<Tietovisa lang="en" />} />
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
