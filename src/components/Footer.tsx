import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import levilleLogo from "@/assets/leville-logo.png";
import bookingLogo from "@/assets/booking-logo.png";
import airbnbLogo from "@/assets/airbnb-logo.png";
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
      trustTitle: "Arvioitu erinomaiseksi",
      links: [
        { label: "Tarinamme", href: routeConfig.company.fi, highlight: true },
        { label: "Majoitukset", href: routeConfig.accommodations.fi },
        { label: "Äkkilähdöt", href: routeConfig.lastMinute.fi },
        { label: "Levi-opas", href: routeConfig.levi.fi },
        { label: "Yhteystiedot", href: routeConfig.contact.fi },
        { label: "UKK", href: routeConfig.faq.fi },
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
        { label: "Our Story", href: routeConfig.company.en, highlight: true },
        { label: "Accommodations", href: routeConfig.accommodations.en },
        { label: "Apartments", href: "/en/apartments" },
        { label: "Last Minute", href: routeConfig.lastMinute.en },
        { label: "Levi Guide", href: routeConfig.levi.en },
        { label: "Contact", href: routeConfig.contact.en },
        { label: "FAQ", href: routeConfig.faq.en },
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
                <div className="mb-3">
                  <img src={bookingLogo} alt="Booking.com" width={400} height={64} className="h-8 w-auto" loading="lazy" decoding="async" />
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
                <div className="mb-3">
                  <img src={airbnbLogo} alt="Airbnb" width={600} height={190} className="h-8 w-auto" loading="lazy" decoding="async" />
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