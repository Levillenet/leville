import { Home, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="yhteystiedot" className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
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
            <p className="text-muted-foreground text-sm leading-relaxed">
              Laadukasta majoitusta Levin keskustassa. Varaa suoraan meiltä parhaaseen hintaan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-6">Sivusto</h3>
            <ul className="space-y-3">
              <li>
                <a href="#majoitukset" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Majoituksemme
                </a>
              </li>
              <li>
                <a href="#yritys" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Yrityksemme
                </a>
              </li>
              <li>
                <a href="#levi" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Levi
                </a>
              </li>
              <li>
                <a href="#yhteystiedot" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Yhteystiedot
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-6">Yhteystiedot</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@leville.net" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@leville.net
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+358401234567" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +358 40 123 4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Levin keskusta, Kittilä
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Leville.net. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Tietosuojaseloste
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Varausehdot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
