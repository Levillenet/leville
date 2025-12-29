import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import levilleLogo from "@/assets/leville-logo.png";
import leviLogo from "@/assets/partners/levi-logo.jpg";
import airbnbLogo from "@/assets/partners/airbnb-logo.png";
import bookingLogo from "@/assets/partners/booking-logo.png";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

const Footer = () => {
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  const contentFi = {
    description: "Laadukasta majoitusta Levin keskustassa. Varaa suoraan meiltä parhaaseen hintaan.",
    siteTitle: "Sivusto",
    links: [
      { label: "Majoituksemme", href: "/majoitukset" },
      { label: "Yrityksemme", href: "/yritys" },
      { label: "Levi", href: "/levi" },
      { label: "Yhteystiedot", href: "/yhteystiedot" },
    ],
    contactTitle: "Yhteystiedot",
    location: "Levin keskusta, Kittilä",
    copyright: `© ${new Date().getFullYear()} Leville.net. Kaikki oikeudet pidätetään.`,
    privacy: "Tietosuojaseloste",
    terms: "Varausehdot",
    termsLink: "/varausehdot",
  };

  const contentEn = {
    description: "Quality accommodation in Levi center. Book directly from us for the best price.",
    siteTitle: "Site",
    links: [
      { label: "Accommodations", href: "/majoitukset" },
      { label: "Company", href: "/yritys" },
      { label: "Levi", href: "/levi" },
      { label: "Contact", href: "/yhteystiedot" },
    ],
    contactTitle: "Contact",
    location: "Levi Center, Kittilä",
    copyright: `© ${new Date().getFullYear()} Leville.net. All rights reserved.`,
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    termsLink: "/varausehdot",
  };

  const content = isEnglish ? contentEn : contentFi;

  return (
    <footer id="yhteystiedot" className="bg-card border-t border-border/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <Link to={isEnglish ? "/en" : "/"} className="inline-block mb-6">
              <img 
                src={levilleLogo} 
                alt="Leville.net - Apartments & Villas" 
                className="h-20 md:h-24 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {content.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">{content.siteTitle}</h3>
            <ul className="space-y-4">
              {content.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">{content.contactTitle}</h3>
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
                  {content.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="pt-10 border-t border-border/30 mb-10">
          <p className="text-xs text-muted-foreground text-center mb-6">
            {isEnglish ? "Our Partners" : "Yhteistyökumppanit"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* Booking.com */}
            <a 
              href="https://www.booking.com/hotel/fi/levillenet-apartments.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Booking.com Partner"
            >
              <img 
                src={bookingLogo} 
                alt="Booking.com" 
                className="h-6 md:h-8 w-auto"
              />
            </a>

            {/* Airbnb */}
            <a 
              href="https://www.airbnb.com/users/show/123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Airbnb Partner"
            >
              <img 
                src={airbnbLogo} 
                alt="Airbnb" 
                className="h-6 md:h-8 w-auto"
              />
            </a>

            {/* Visit Levi */}
            <a 
              href="https://www.levi.fi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Visit Levi Partner"
            >
              <img 
                src={leviLogo} 
                alt="Visit Levi" 
                className="h-8 md:h-10 w-auto rounded-full"
              />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {content.copyright}
          </p>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {content.privacy}
            </a>
            <Link to={content.termsLink} className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {content.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
