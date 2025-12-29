import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import levilleLogo from "@/assets/leville-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  const navLinksFi = [
    { name: "Majoitukset", href: "/majoitukset" },
    { name: "Yritys", href: "/yritys" },
    { name: "Levi", href: "/levi" },
    { name: "Yhteystiedot", href: "/yhteystiedot" },
    { name: "UKK", href: "/ukk" },
  ];

  const navLinksEn = [
    { name: "Accommodations", href: "/majoitukset" },
    { name: "Company", href: "/yritys" },
    { name: "Levi", href: "/levi" },
    { name: "Contact", href: "/yhteystiedot" },
    { name: "FAQ", href: "/ukk" },
  ];

  const navLinks = isEnglish ? navLinksEn : navLinksFi;
  const langSwitchHref = isEnglish ? "/" : "/en";
  const langSwitchLabel = isEnglish ? "FI" : "EN";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={levilleLogo} 
              alt="Leville.net - Apartments & Villas" 
              className="h-20 md:h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
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
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
              {isEnglish ? "Book now" : "Varaa nyt"}
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
          <nav className="md:hidden py-6 border-t border-border/30 animate-fade-in">
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-2">
                {isEnglish ? "Book now" : "Varaa nyt"}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
