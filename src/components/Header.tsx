import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import levilleLogo from "@/assets/leville-logo.png";
import WeatherWidget from "@/components/WeatherWidget";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  // Route mapping between languages
  const routeMap: Record<string, string> = {
    "/": "/en",
    "/en": "/",
    "/majoitukset": "/en/accommodations",
    "/en/accommodations": "/majoitukset",
    "/ajankohtaista": "/en/news",
    "/en/news": "/ajankohtaista",
    "/levi": "/en/levi",
    "/en/levi": "/levi",
    "/revontulet": "/en/northern-lights",
    "/en/northern-lights": "/revontulet",
    "/yhteystiedot": "/en/contact",
    "/en/contact": "/yhteystiedot",
    "/ukk": "/en/faq",
    "/en/faq": "/ukk",
    "/yritys": "/en/company",
    "/en/company": "/yritys",
  };

  const navLinksFi = [
    { name: "Majoitukset", href: "/majoitukset" },
    { name: "Ajankohtaista", href: "/ajankohtaista" },
    { name: "Levi", href: "/levi" },
    { name: "Revontulet", href: "/revontulet" },
    { name: "Yhteystiedot", href: "/yhteystiedot" },
  ];

  const navLinksEn = [
    { name: "Accommodations", href: "/en/accommodations" },
    { name: "News", href: "/en/news" },
    { name: "Levi", href: "/en/levi" },
    { name: "Northern Lights", href: "/en/northern-lights" },
    { name: "Contact", href: "/en/contact" },
  ];

  const navLinks = isEnglish ? navLinksEn : navLinksFi;
  
  // Get the equivalent route in the other language, fallback to home
  const langSwitchHref = routeMap[location.pathname] || (isEnglish ? "/" : "/en");
  const langSwitchLabel = isEnglish ? "FI" : "EN";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Mobile Weather */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center">
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={langSwitchHref}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              {langSwitchLabel}
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
              <a href="https://app.moder.fi/levillenet" target="_blank" rel="noopener noreferrer">
                {isEnglish ? "Book now" : "Varaa nyt"}
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
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to={langSwitchHref}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <Globe className="w-4 h-4" />
                {langSwitchLabel}
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-2">
                <a href="https://app.moder.fi/levillenet" target="_blank" rel="noopener noreferrer">
                  {isEnglish ? "Book now" : "Varaa nyt"}
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
