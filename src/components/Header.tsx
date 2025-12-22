import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Majoituksemme", href: "#majoitukset" },
    { name: "Yrityksemme", href: "#yritys" },
    { name: "Levi", href: "#levi" },
    { name: "Yhteystiedot", href: "#yhteystiedot" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-foreground tracking-wide">
                LEVILLE.NET
              </span>
              <span className="text-xs text-primary font-medium tracking-widest uppercase">
                Apartments & Villas
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
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
          <nav className="md:hidden py-6 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
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
