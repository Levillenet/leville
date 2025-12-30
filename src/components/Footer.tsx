import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import levilleLogo from "@/assets/leville-logo.png";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { Language, routeConfig } from "@/translations";

interface FooterProps {
  lang?: Language;
}

const Footer = ({ lang = "fi" }: FooterProps) => {
  const content = {
    fi: {
      description: "Laadukasta majoitusta Levin keskustassa. Varaa suoraan meiltä parhaaseen hintaan.",
      siteTitle: "Sivusto",
      links: [
        { label: "Majoitukset", href: routeConfig.accommodations.fi },
        { label: "Ajankohtaista", href: routeConfig.news.fi },
        { label: "Levi", href: routeConfig.levi.fi },
        { label: "UKK", href: routeConfig.faq.fi },
        { label: "Yritys", href: routeConfig.company.fi },
        { label: "Yhteystiedot", href: routeConfig.contact.fi },
      ],
      contactTitle: "Yhteystiedot",
      location: "Levin keskusta, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Kaikki oikeudet pidätetään.`,
      privacy: "Tietosuojaseloste",
      terms: "Varausehdot",
      termsLink: "/varausehdot",
      paymentInfo: "Turvallisen maksamisen takaa Paytrail"
    },
    en: {
      description: "Quality accommodation in Levi center. Book directly from us for the best price.",
      siteTitle: "Site",
      links: [
        { label: "Accommodations", href: routeConfig.accommodations.en },
        { label: "News", href: routeConfig.news.en },
        { label: "Levi", href: routeConfig.levi.en },
        { label: "FAQ", href: routeConfig.faq.en },
        { label: "Company", href: routeConfig.company.en },
        { label: "Contact", href: routeConfig.contact.en },
      ],
      contactTitle: "Contact",
      location: "Levi Center, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. All rights reserved.`,
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      termsLink: "/varausehdot",
      paymentInfo: "Secure payments powered by Paytrail"
    },
    sv: {
      description: "Kvalitetsboende i Levi centrum. Boka direkt från oss för bästa pris.",
      siteTitle: "Webbplats",
      links: [
        { label: "Boende", href: routeConfig.accommodations.sv },
        { label: "Nyheter", href: routeConfig.news.sv },
        { label: "Levi", href: routeConfig.levi.sv },
        { label: "FAQ", href: routeConfig.faq.sv },
        { label: "Företag", href: routeConfig.company.sv },
        { label: "Kontakt", href: routeConfig.contact.sv },
      ],
      contactTitle: "Kontakt",
      location: "Levi Centrum, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Alla rättigheter förbehållna.`,
      privacy: "Integritetspolicy",
      terms: "Villkor",
      termsLink: "/varausehdot",
      paymentInfo: "Säkra betalningar via Paytrail"
    },
    de: {
      description: "Qualitätsunterkünfte im Zentrum von Levi. Buchen Sie direkt bei uns zum besten Preis.",
      siteTitle: "Seite",
      links: [
        { label: "Unterkünfte", href: routeConfig.accommodations.de },
        { label: "Aktuelles", href: routeConfig.news.de },
        { label: "Levi", href: routeConfig.levi.de },
        { label: "FAQ", href: routeConfig.faq.de },
        { label: "Unternehmen", href: routeConfig.company.de },
        { label: "Kontakt", href: routeConfig.contact.de },
      ],
      contactTitle: "Kontakt",
      location: "Levi Zentrum, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Alle Rechte vorbehalten.`,
      privacy: "Datenschutz",
      terms: "AGB",
      termsLink: "/varausehdot",
      paymentInfo: "Sichere Zahlungen über Paytrail"
    },
    es: {
      description: "Alojamiento de calidad en el centro de Levi. Reserva directamente con nosotros al mejor precio.",
      siteTitle: "Sitio",
      links: [
        { label: "Alojamientos", href: routeConfig.accommodations.es },
        { label: "Noticias", href: routeConfig.news.es },
        { label: "Levi", href: routeConfig.levi.es },
        { label: "FAQ", href: routeConfig.faq.es },
        { label: "Empresa", href: routeConfig.company.es },
        { label: "Contacto", href: routeConfig.contact.es },
      ],
      contactTitle: "Contacto",
      location: "Centro de Levi, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Todos los derechos reservados.`,
      privacy: "Política de privacidad",
      terms: "Términos",
      termsLink: "/varausehdot",
      paymentInfo: "Pagos seguros a través de Paytrail"
    }
  };

  const c = content[lang];
  const homeHref = routeConfig.home[lang];

  return (
    <footer id="yhteystiedot" className="bg-card border-t border-border/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 mb-12 md:mb-16">
          {/* Brand */}
          <div>
            <Link to={homeHref} className="inline-block mb-6">
              <img 
                src={levilleLogo} 
                alt="Leville.net - Apartments & Villas" 
                loading="lazy"
                decoding="async"
                className="h-40 md:h-48 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {c.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">{c.siteTitle}</h3>
            <ul className="space-y-4">
              {c.links.map((link) => (
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
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">{c.contactTitle}</h3>
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
                  {c.location}
                </span>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom */}
        <div className="pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {c.copyright}
          </p>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {c.privacy}
            </a>
            <Link to={c.termsLink} className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {c.terms}
            </Link>
          </div>
        </div>

        {/* Payment info */}
        <div className="pt-4 text-center">
          <p className="text-muted-foreground/70 text-xs">
            {c.paymentInfo}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;