import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import levilleLogo from "@/assets/leville-logo.png";
import WeatherWidget from "@/components/WeatherWidget";
import LanguageSelector from "@/components/LanguageSelector";
import { detectLanguageFromPath, routeConfig } from "@/translations";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentLang = detectLanguageFromPath(location.pathname);

  // Navigation links based on current language
  const getNavLinks = () => {
    switch (currentLang) {
      case "en":
        return [
          { name: "Accommodations", href: routeConfig.accommodations.en },
          { name: "Last Minute", href: routeConfig.lastMinute.en, highlight: true },
          { name: "Levi", href: routeConfig.levi.en },
          { name: "Northern Lights", href: routeConfig.northernLights.en },
          { name: "Contact", href: routeConfig.contact.en },
        ];
      case "sv":
        return [
          { name: "Boende", href: routeConfig.accommodations.sv },
          { name: "Sista Minuten", href: routeConfig.lastMinute.sv, highlight: true },
          { name: "Levi", href: routeConfig.levi.sv },
          { name: "Norrsken", href: routeConfig.northernLights.sv },
          { name: "Kontakt", href: routeConfig.contact.sv },
        ];
      case "de":
        return [
          { name: "Unterkünfte", href: routeConfig.accommodations.de },
          { name: "Last Minute", href: routeConfig.lastMinute.de, highlight: true },
          { name: "Levi", href: routeConfig.levi.de },
          { name: "Nordlichter", href: routeConfig.northernLights.de },
          { name: "Kontakt", href: routeConfig.contact.de },
        ];
      case "es":
        return [
          { name: "Alojamientos", href: routeConfig.accommodations.es },
          { name: "Última Hora", href: routeConfig.lastMinute.es, highlight: true },
          { name: "Levi", href: routeConfig.levi.es },
          { name: "Auroras", href: routeConfig.northernLights.es },
          { name: "Contacto", href: routeConfig.contact.es },
        ];
      case "fr":
        return [
          { name: "Hébergements", href: routeConfig.accommodations.fr },
          { name: "Dernière Minute", href: routeConfig.lastMinute.fr, highlight: true },
          { name: "Levi", href: routeConfig.levi.fr },
          { name: "Aurores Boréales", href: routeConfig.northernLights.fr },
          { name: "Contact", href: routeConfig.contact.fr },
        ];
      default: // Finnish
        return [
          { name: "Majoitukset", href: routeConfig.accommodations.fi },
          { name: "Äkkilähdöt", href: routeConfig.lastMinute.fi, highlight: true },
          { name: "Levi", href: routeConfig.levi.fi },
          { name: "Revontulet", href: routeConfig.northernLights.fi },
          { name: "Yhteystiedot", href: routeConfig.contact.fi },
        ];
    }
  };

  const navLinks = getNavLinks();
  const bookNowText: Record<string, string> = {
    fi: "Varaa nyt",
    en: "Book now",
    sv: "Boka nu",
    de: "Jetzt buchen",
    es: "Reservar",
    fr: "Réserver"
  };
  const bookNowLabel = bookNowText[currentLang] || bookNowText.fi;

  // All languages open external Moder booking in new tab
  const bookNowHref = currentLang === "fi" 
    ? "https://app.moder.fi/levillenet" 
    : "https://app.moder.fi/levillenet?lang=en";

  const homeHref = routeConfig.home[currentLang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Mobile Weather */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to={homeHref} className="flex items-center">
              <img 
                src={levilleLogo} 
                alt="Leville.net - Apartments & Villas" 
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-16 sm:h-20 md:h-24 w-auto"
              />
            </Link>
            {/* Mobile Weather Widget */}
            <div className="md:hidden">
              <WeatherWidget />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <WeatherWidget />
            <div className="w-px h-5 bg-border/50" />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-300 tracking-wide ${
                  link.highlight 
                    ? "text-red-500 hover:text-red-400 font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSelector />
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
              <a 
                href={bookNowHref} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {bookNowLabel}
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 sm:py-6 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors py-2 tracking-wide ${
                    link.highlight 
                      ? "text-red-500 hover:text-red-400 font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="py-2">
                <LanguageSelector />
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-2">
                <a 
                  href={bookNowHref} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {bookNowLabel}
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
