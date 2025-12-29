import { Mail, Phone, MapPin } from "lucide-react";
import levilleLogo from "@/assets/leville-logo.png";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

const Footer = () => {
  return (
    <footer id="yhteystiedot" className="bg-card border-t border-border/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <a href="/" className="inline-block mb-6">
              <img 
                src={levilleLogo} 
                alt="Leville.net - Apartments & Villas" 
                className="h-12 w-auto"
              />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Laadukasta majoitusta Levin keskustassa. Varaa suoraan meiltä parhaaseen hintaan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">Sivusto</h3>
            <ul className="space-y-4">
              <li>
                <a href="#majoitukset" className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide">
                  Majoituksemme
                </a>
              </li>
              <li>
                <a href="#yritys" className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide">
                  Yrityksemme
                </a>
              </li>
              <li>
                <a href="#levi" className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide">
                  Levi
                </a>
              </li>
              <li>
                <a href="#yhteystiedot" className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide">
                  Yhteystiedot
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">Yhteystiedot</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-aurora-green/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-aurora-green" />
                </div>
                <a href="mailto:info@leville.net" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  info@leville.net
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-aurora-green/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-aurora-green" />
                </div>
                <a href="tel:+35844131313" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  +358 44 131 313
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-4 h-4 text-green-500" />
                </div>
                <a 
                  href="https://wa.me/35844131313" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 transition-colors text-sm"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-aurora-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-aurora-green" />
                </div>
                <span className="text-muted-foreground text-sm">
                  Levin keskusta, Kittilä
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Leville.net. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              Tietosuojaseloste
            </a>
            <a href="/varausehdot" className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              Varausehdot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
