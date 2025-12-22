import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import levilleLogo from "@/assets/leville-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Majoituksemme", href: "#majoitukset" },
    { name: "Yrityksemme", href: "#yritys" },
    { name: "Levi", href: "#levi" },
    { name: "Yhteystiedot", href: "#yhteystiedot" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src={levilleLogo} 
              alt="Leville.net - Apartments & Villas" 
              className="h-12 md:h-14 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
              Varaa nyt
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
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-2">
                Varaa nyt
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
