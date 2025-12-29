import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import levilleLogo from "@/assets/leville-logo.png";
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
              href="https://www.booking.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Booking.com Partner"
            >
              <svg viewBox="0 0 300 50" className="h-6 md:h-8 w-auto" fill="currentColor">
                <text x="0" y="35" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#003580">
                  Booking.com
                </text>
              </svg>
            </a>

            {/* Airbnb */}
            <a 
              href="https://www.airbnb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Airbnb Partner"
            >
              <svg viewBox="0 0 102 32" className="h-6 md:h-8 w-auto" fill="#FF5A5F">
                <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15-.05-.13-.09-.27-.15-.4a111.16 111.16 0 0 0-3.94-8.51c-.64-1.28-1.33-2.58-2.01-3.83-.38-.68-.79-1.34-1.16-2.05-.28-.52-.55-1.03-.9-1.49-.73-.98-1.63-1.57-2.85-1.57-1.25 0-2.15.59-2.88 1.57-.35.46-.62.97-.9 1.49-.37.71-.78 1.37-1.16 2.05-.68 1.25-1.37 2.55-2.01 3.83a111.16 111.16 0 0 0-3.94 8.51c-.06.13-.1.27-.15.4-.16.35-.31.76-.47 1.15a8.59 8.59 0 0 0-.48 3.84c.2 2.25 1.34 4.23 3.23 5.52 1.35.92 2.87 1.3 4.46 1.3.59 0 1.21-.06 1.78-.15a10.14 10.14 0 0 0 2.96-.89c1.04-.48 2.01-1.1 2.99-1.79a29.94 29.94 0 0 0 3.2-2.75c.33-.32.66-.65.97-1 .31.35.64.68.97 1a29.94 29.94 0 0 0 3.2 2.75c.98.69 1.95 1.31 2.99 1.79.94.44 1.94.74 2.96.89.57.09 1.19.15 1.78.15 1.59 0 3.11-.38 4.46-1.3 1.89-1.29 3.03-3.27 3.23-5.52a8.59 8.59 0 0 0-.48-3.84zm-8.4 6.72c-2.27 2.05-4.22 3.14-6.02 3.14-1.8 0-3.75-1.09-6.02-3.14-3.07-2.77-4.86-5.73-4.86-8.42 0-1.18.3-2.22.88-3.09.68-1 1.67-1.54 2.98-1.54 2.76 0 5.36 2.77 7.02 5.24 1.66-2.47 4.26-5.24 7.02-5.24 1.31 0 2.3.54 2.98 1.54.58.87.88 1.91.88 3.09 0 2.69-1.79 5.65-4.86 8.42z"/>
                <path d="M61.85 20.48c0 2.14-.57 3.77-1.5 4.93-1.01 1.24-2.42 1.9-4.16 1.9-1.74 0-3.16-.66-4.17-1.9-.93-1.16-1.5-2.79-1.5-4.93 0-2.14.57-3.77 1.5-4.93 1.01-1.24 2.43-1.9 4.17-1.9 1.74 0 3.15.66 4.16 1.9.93 1.16 1.5 2.79 1.5 4.93zm4.32 0c0-3.28-.93-5.98-2.72-7.98-1.87-2.08-4.38-3.13-7.26-3.13-2.88 0-5.39 1.05-7.26 3.13-1.79 2-2.72 4.7-2.72 7.98s.93 5.98 2.72 7.98c1.87 2.08 4.38 3.13 7.26 3.13 2.88 0 5.39-1.05 7.26-3.13 1.79-2 2.72-4.7 2.72-7.98zm12.1 10.63V19.17c0-2.17.57-3.44 1.42-4.16.69-.6 1.56-.84 2.58-.84 1.04 0 1.79.31 2.34.87.6.62.87 1.59.87 2.92v13.15h4.32V17.34c0-2.51-.58-4.39-1.81-5.66-1.18-1.21-2.81-1.81-4.94-1.81-2.47 0-4.28.95-5.58 2.58v-2.21h-4.32v20.87h4.32v-20.87h-4.32v20.87h5.12zm23.63 0V19.17c0-2.17.57-3.44 1.42-4.16.69-.6 1.56-.84 2.58-.84 1.04 0 1.79.31 2.34.87.6.62.87 1.59.87 2.92v13.15h4.32V17.34c0-2.51-.58-4.39-1.81-5.66-1.18-1.21-2.81-1.81-4.94-1.81-2.47 0-4.28.95-5.58 2.58v-2.21h-4.32v20.87h4.32v-20.87h-4.32v20.87h5.12zm-23.63 0"/>
              </svg>
            </a>

            {/* Visit Levi */}
            <a 
              href="https://www.levi.fi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
              aria-label="Visit Levi Partner"
            >
              <div className="w-8 h-8 rounded-full bg-[#00B4D8] flex items-center justify-center">
                <span className="text-white text-xs font-bold">Levi</span>
              </div>
              <span className="text-muted-foreground text-sm font-medium">Visit Levi</span>
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
