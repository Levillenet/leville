import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import IndexEN from "./pages/en/Index";
import Majoitukset from "./pages/Majoitukset";
import Levi from "./pages/Levi";
import Yhteystiedot from "./pages/Yhteystiedot";
import UKK from "./pages/UKK";
import Varausehdot from "./pages/Varausehdot";
import Yritys from "./pages/Yritys";
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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<IndexEN />} />
            <Route path="/majoitukset" element={<Majoitukset />} />
            <Route path="/en/accommodations" element={<Majoitukset lang="en" />} />
            <Route path="/levi" element={<Levi />} />
            <Route path="/en/levi" element={<Levi lang="en" />} />
            <Route path="/yhteystiedot" element={<Yhteystiedot />} />
            <Route path="/en/contact" element={<Yhteystiedot lang="en" />} />
            <Route path="/ukk" element={<UKK />} />
            <Route path="/en/faq" element={<UKK lang="en" />} />
            <Route path="/varausehdot" element={<Varausehdot />} />
            <Route path="/yritys" element={<Yritys />} />
            <Route path="/en/company" element={<Yritys lang="en" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
