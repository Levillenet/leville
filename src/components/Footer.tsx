import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import levilleLogo from "@/assets/leville-logo.png";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { Language, routeConfig } from "@/translations";

interface FooterProps {
  lang?: Language;
}

const BookingComLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 75.76 15.41" fill="currentColor" className={className} aria-label="Booking.com">
    <path d="M68.89 5.18a2.14 2.14 0 1 1-2.14 2.14 2.13 2.13 0 0 1 2.14-2.14m-7 7.74a2.46 2.46 0 1 0-2.46-2.46 2.46 2.46 0 0 0 2.46 2.46m0-7.25a4.79 4.79 0 1 1-4.78 4.79 4.78 4.78 0 0 1 4.78-4.79m-10.49 7.25a2.46 2.46 0 1 0-2.46-2.46 2.46 2.46 0 0 0 2.46 2.46m0-7.25a4.79 4.79 0 1 1-4.79 4.79 4.78 4.78 0 0 1 4.79-4.79M28.38 5.85h-2.6v2.44h2.6a1.22 1.22 0 0 0 0-2.44m.2 4.68h-2.8v2.63h2.8a1.32 1.32 0 0 0 0-2.63m1.47-2.07a2.94 2.94 0 0 1 1.69 2.72 3 3 0 0 1-3.1 2.98h-5.36V3.58h5a2.73 2.73 0 0 1 2.84 2.68 2.59 2.59 0 0 1-1.07 2.2m8.26 4.46a2.46 2.46 0 1 0-2.46-2.46 2.46 2.46 0 0 0 2.46 2.46m0-7.25a4.79 4.79 0 1 1-4.78 4.79 4.78 4.78 0 0 1 4.78-4.79m8.22 7.25a2.46 2.46 0 1 0-2.46-2.46 2.46 2.46 0 0 0 2.46 2.46m0-7.25a4.79 4.79 0 1 1-4.78 4.79 4.78 4.78 0 0 1 4.78-4.79m5.34-.09h2.34v1.15a3.4 3.4 0 0 1 3-1.34v2.39a3.08 3.08 0 0 0-3 3.1v4.78h-2.34zM14 5.67a4.75 4.75 0 0 1 3.41 1.46V1.25H19.8v14h-2.34V14a4.79 4.79 0 1 1-3.46-8.33m.2 7.25a2.46 2.46 0 1 0-2.46-2.46 2.46 2.46 0 0 0 2.46 2.46m-7.23-5.6h2V4.91H7a5.81 5.81 0 0 0-3.65 1.22v-.46H1v9.58h2.35v-5a3.84 3.84 0 0 1 3.62-2.93m62.29-.42a4.79 4.79 0 1 1-4.79 4.79 4.78 4.78 0 0 1 4.79-4.79m0 7.21a2.46 2.46 0 1 0-2.46-2.46 2.46 2.46 0 0 0 2.46 2.46m6.5-7h2.34v1.1a3.73 3.73 0 0 1 3-1.34 3.2 3.2 0 0 1 3.23 3.33v5.24H75.8V10.2a1.6 1.6 0 0 0-1.74-1.74 2.28 2.28 0 0 0-2.3 2.39v4.4h-2.34z"/>
  </svg>
);

const AirbnbLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Airbnb">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.3 1.1-.9 2-1.7 2.7-.9.7-1.9 1-3 1-.6 0-1.1-.1-1.5-.4-.2-.1-.3-.2-.5-.3-.1.1-.2.2-.3.3-.5.3-1 .6-1.6.7-.3.1-.6.1-.9.1-1 0-2-.3-2.9-1-.9-.7-1.5-1.6-1.7-2.7-.1-.8 0-1.7.4-2.6.4-.8.9-1.7 1.6-2.5.7-.9 1.4-1.7 2.2-2.4.6-.6 1-.9 1-.9l.4-.4.2.3c.2.2.4.6.7 1 .3.5.7 1.1 1.1 1.9l.1.1c.7 1 1.4 2 1.9 2.5.7.9 1.2 1.7 1.6 2.5.4.9.5 1.8.4 2.6zm-5.5-3c-1.1-1.4-1.7-2.6-1.9-3.6-.2-.9-.1-1.7.4-2.2.4-.4.9-.7 1.5-.7h.1c.6 0 1.2.2 1.5.7.5.6.6 1.3.4 2.2-.2 1-.8 2.2-1.9 3.6z"/>
  </svg>
);

const Footer = ({ lang = "fi" }: FooterProps) => {
  const content = {
    fi: {
      description: "Laadukasta majoitusta Levin keskustassa. Varaa suoraan meiltä parhaaseen hintaan.",
      siteTitle: "Sivusto",
      trustTitle: "Arvioitu erinomaiseksi",
      links: [
        { label: "Majoitukset", href: routeConfig.accommodations.fi },
        { label: "Äkkilähdöt", href: routeConfig.lastMinute.fi },
        { label: "Levi-opas", href: routeConfig.levi.fi },
        { label: "Yhteystiedot", href: routeConfig.contact.fi },
        { label: "UKK", href: routeConfig.faq.fi },
        { label: "Yritys", href: routeConfig.company.fi },
        { label: "Myy loma-asuntosi", href: routeConfig.sellProperty.fi },
      ],
      contactTitle: "Yhteystiedot",
      location: "Levin keskusta, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Kaikki oikeudet pidätetään.`,
      privacy: "Tietosuojaseloste",
      terms: "Varausehdot",
      termsLink: routeConfig.bookingTerms.fi,
      privacyLink: routeConfig.privacyPolicy.fi,
      paymentInfo: "Turvallisen maksamisen takaa Paytrail"
    },
    en: {
      description: "Quality accommodation in Levi center. Book directly from us for the best price.",
      siteTitle: "Site",
      trustTitle: "Rated Excellent",
      links: [
        { label: "Accommodations", href: routeConfig.accommodations.en },
        { label: "Apartments", href: "/en/apartments" },
        { label: "Last Minute", href: routeConfig.lastMinute.en },
        { label: "Levi Guide", href: routeConfig.levi.en },
        { label: "Contact", href: routeConfig.contact.en },
        { label: "FAQ", href: routeConfig.faq.en },
        { label: "Company", href: routeConfig.company.en },
      ],
      apartmentLinks: [
        { label: "Studio apartments", href: "/en/apartments/studio" },
        { label: "Apartments for 6", href: "/en/apartments/for-6" },
        { label: "Apartments for 8+", href: "/en/apartments/for-8" },
        { label: "Penthouses", href: "/en/apartments/penthouse" },
      ],
      contactTitle: "Contact",
      location: "Levi Center, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. All rights reserved.`,
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      termsLink: routeConfig.bookingTerms.en,
      privacyLink: routeConfig.privacyPolicy.en,
      paymentInfo: "Secure payments powered by Paytrail"
    },
    sv: {
      description: "Kvalitetsboende i Levi centrum. Boka direkt från oss för bästa pris.",
      siteTitle: "Webbplats",
      trustTitle: "Utmärkt betyg",
      links: [
        { label: "Boende", href: routeConfig.accommodations.sv },
        { label: "Sista minuten", href: routeConfig.lastMinute.sv },
        { label: "Levi", href: routeConfig.levi.sv },
        { label: "Kontakt", href: routeConfig.contact.sv },
        { label: "FAQ", href: routeConfig.faq.sv },
        { label: "Företag", href: routeConfig.company.sv },
      ],
      contactTitle: "Kontakt",
      location: "Levi Centrum, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Alla rättigheter förbehållna.`,
      privacy: "Integritetspolicy",
      terms: "Villkor",
      termsLink: routeConfig.bookingTerms.sv,
      privacyLink: routeConfig.privacyPolicy.sv,
      paymentInfo: "Säkra betalningar via Paytrail"
    },
    de: {
      description: "Qualitätsunterkünfte im Zentrum von Levi. Buchen Sie direkt bei uns zum besten Preis.",
      siteTitle: "Seite",
      trustTitle: "Hervorragend bewertet",
      links: [
        { label: "Unterkünfte", href: routeConfig.accommodations.de },
        { label: "Last Minute", href: routeConfig.lastMinute.de },
        { label: "Levi", href: routeConfig.levi.de },
        { label: "Kontakt", href: routeConfig.contact.de },
        { label: "FAQ", href: routeConfig.faq.de },
        { label: "Unternehmen", href: routeConfig.company.de },
      ],
      contactTitle: "Kontakt",
      location: "Levi Zentrum, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Alle Rechte vorbehalten.`,
      privacy: "Datenschutz",
      terms: "AGB",
      termsLink: routeConfig.bookingTerms.de,
      privacyLink: routeConfig.privacyPolicy.de,
      paymentInfo: "Sichere Zahlungen über Paytrail"
    },
    es: {
      description: "Alojamiento de calidad en el centro de Levi. Reserva directamente con nosotros al mejor precio.",
      siteTitle: "Sitio",
      trustTitle: "Calificación excelente",
      links: [
        { label: "Alojamientos", href: routeConfig.accommodations.es },
        { label: "Última hora", href: routeConfig.lastMinute.es },
        { label: "Levi", href: routeConfig.levi.es },
        { label: "Contacto", href: routeConfig.contact.es },
        { label: "FAQ", href: routeConfig.faq.es },
        { label: "Empresa", href: routeConfig.company.es },
      ],
      contactTitle: "Contacto",
      location: "Centro de Levi, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Todos los derechos reservados.`,
      privacy: "Política de privacidad",
      terms: "Términos",
      termsLink: routeConfig.bookingTerms.es,
      privacyLink: routeConfig.privacyPolicy.es,
      paymentInfo: "Pagos seguros a través de Paytrail"
    },
    fr: {
      description: "Hébergement de qualité au centre de Levi. Réservez directement chez nous au meilleur prix.",
      siteTitle: "Site",
      trustTitle: "Noté excellent",
      links: [
        { label: "Hébergements", href: routeConfig.accommodations.fr },
        { label: "Dernière minute", href: routeConfig.lastMinute.fr },
        { label: "Levi", href: routeConfig.levi.fr },
        { label: "Contact", href: routeConfig.contact.fr },
        { label: "FAQ", href: routeConfig.faq.fr },
        { label: "Entreprise", href: routeConfig.company.fr },
      ],
      contactTitle: "Contact",
      location: "Centre de Levi, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Tous droits réservés.`,
      privacy: "Politique de confidentialité",
      terms: "Conditions",
      termsLink: routeConfig.bookingTerms.fr,
      privacyLink: routeConfig.privacyPolicy.fr,
      paymentInfo: "Paiements sécurisés via Paytrail"
    },
    nl: {
      description: "Kwaliteitsaccommodatie in het centrum van Levi. Boek direct bij ons voor de beste prijs.",
      siteTitle: "Website",
      trustTitle: "Uitstekend beoordeeld",
      links: [
        { label: "Accommodaties", href: routeConfig.accommodations.nl },
        { label: "Last minute", href: routeConfig.lastMinute.nl },
        { label: "Levi", href: routeConfig.levi.nl },
        { label: "Contact", href: routeConfig.contact.nl },
        { label: "FAQ", href: routeConfig.faq.nl },
        { label: "Bedrijf", href: routeConfig.company.nl },
      ],
      contactTitle: "Contact",
      location: "Centrum van Levi, Kittilä",
      copyright: `© ${new Date().getFullYear()} Leville.net. Alle rechten voorbehouden.`,
      privacy: "Privacybeleid",
      terms: "Voorwaarden",
      termsLink: routeConfig.bookingTerms.nl,
      privacyLink: routeConfig.privacyPolicy.nl,
      paymentInfo: "Veilige betalingen via Paytrail"
    }
  };

  const c = content[lang];
  const homeHref = routeConfig.home[lang];

  return (
    <footer id="yhteystiedot" className="bg-card border-t border-border/30 py-12 md:py-20 pb-20 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div>
            <Link to={homeHref} className="inline-block mb-6">
              <img 
                src={levilleLogo} 
                alt="Leville.net - Apartments & Villas" 
                width={1417}
                height={591}
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
            {'apartmentLinks' in c && (
              <div className="mt-6">
                <h4 className="text-foreground font-serif font-semibold mb-3 text-sm tracking-tight">Popular apartment searches</h4>
                <ul className="space-y-3">
                  {((c as any).apartmentLinks as { label: string; href: string }[]).map((link: { label: string; href: string }) => (
                    <li key={link.href}>
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-xs tracking-wide">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div>
            <h3 className="text-foreground font-serif font-semibold mb-6 text-lg tracking-tight">{c.trustTitle}</h3>
            <div className="space-y-5">
              {/* Booking.com */}
              <div className="rounded-xl border border-border/50 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <BookingComLogo className="h-4 w-auto text-foreground opacity-80" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center bg-[hsl(221,100%,30%)] text-white text-xs font-bold rounded-md px-2 py-1">
                    9.0
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">Fabulous</span>
                </div>
              </div>

              {/* Airbnb */}
              <div className="rounded-xl border border-border/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AirbnbLogo className="h-5 w-5 text-[hsl(356,100%,45%)]" />
                  <span className="font-medium text-sm text-foreground opacity-80">Airbnb</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-[hsl(356,100%,45%)]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Exceptional</span>
                </div>
              </div>
            </div>
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
            <Link to={c.privacyLink} className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {c.privacy}
            </Link>
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