import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Language } from "@/translations";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  lang?: Language;
  items?: BreadcrumbItem[];
}

const routeLabels: Record<string, Record<Language, string>> = {
  majoitukset: { fi: "Majoitukset", en: "Accommodations", sv: "Boende", de: "Unterkünfte", es: "Alojamientos", fr: "Hébergements" },
  accommodations: { fi: "Majoitukset", en: "Accommodations", sv: "Boende", de: "Unterkünfte", es: "Alojamientos", fr: "Hébergements" },
  boende: { fi: "Majoitukset", en: "Accommodations", sv: "Boende", de: "Unterkünfte", es: "Alojamientos", fr: "Hébergements" },
  unterkuenfte: { fi: "Majoitukset", en: "Accommodations", sv: "Boende", de: "Unterkünfte", es: "Alojamientos", fr: "Hébergements" },
  alojamientos: { fi: "Majoitukset", en: "Accommodations", sv: "Boende", de: "Unterkünfte", es: "Alojamientos", fr: "Hébergements" },
  hebergements: { fi: "Majoitukset", en: "Accommodations", sv: "Boende", de: "Unterkünfte", es: "Alojamientos", fr: "Hébergements" },
  levi: { fi: "Levi", en: "Levi", sv: "Levi", de: "Levi", es: "Levi", fr: "Levi" },
  ajankohtaista: { fi: "Ajankohtaista", en: "News", sv: "Nyheter", de: "Aktuelles", es: "Noticias", fr: "Actualités" },
  news: { fi: "Ajankohtaista", en: "News", sv: "Nyheter", de: "Aktuelles", es: "Noticias", fr: "Actualités" },
  nyheter: { fi: "Ajankohtaista", en: "News", sv: "Nyheter", de: "Aktuelles", es: "Noticias", fr: "Actualités" },
  aktuelles: { fi: "Ajankohtaista", en: "News", sv: "Nyheter", de: "Aktuelles", es: "Noticias", fr: "Actualités" },
  noticias: { fi: "Ajankohtaista", en: "News", sv: "Nyheter", de: "Aktuelles", es: "Noticias", fr: "Actualités" },
  actualites: { fi: "Ajankohtaista", en: "News", sv: "Nyheter", de: "Aktuelles", es: "Noticias", fr: "Actualités" },
  yhteystiedot: { fi: "Yhteystiedot", en: "Contact", sv: "Kontakt", de: "Kontakt", es: "Contacto", fr: "Contact" },
  contact: { fi: "Yhteystiedot", en: "Contact", sv: "Kontakt", de: "Kontakt", es: "Contacto", fr: "Contact" },
  kontakt: { fi: "Yhteystiedot", en: "Contact", sv: "Kontakt", de: "Kontakt", es: "Contacto", fr: "Contact" },
  contacto: { fi: "Yhteystiedot", en: "Contact", sv: "Kontakt", de: "Kontakt", es: "Contacto", fr: "Contact" },
  revontulet: { fi: "Revontulet", en: "Northern Lights", sv: "Norrsken", de: "Nordlichter", es: "Auroras Boreales", fr: "Aurores Boréales" },
  "northern-lights": { fi: "Revontulet", en: "Northern Lights", sv: "Norrsken", de: "Nordlichter", es: "Auroras Boreales", fr: "Aurores Boréales" },
  norrsken: { fi: "Revontulet", en: "Northern Lights", sv: "Norrsken", de: "Nordlichter", es: "Auroras Boreales", fr: "Aurores Boréales" },
  nordlichter: { fi: "Revontulet", en: "Northern Lights", sv: "Norrsken", de: "Nordlichter", es: "Auroras Boreales", fr: "Aurores Boréales" },
  "auroras-boreales": { fi: "Revontulet", en: "Northern Lights", sv: "Norrsken", de: "Nordlichter", es: "Auroras Boreales", fr: "Aurores Boréales" },
  "aurores-boreales": { fi: "Revontulet", en: "Northern Lights", sv: "Norrsken", de: "Nordlichter", es: "Auroras Boreales", fr: "Aurores Boréales" },
  ukk: { fi: "UKK", en: "FAQ", sv: "FAQ", de: "FAQ", es: "FAQ", fr: "FAQ" },
  faq: { fi: "UKK", en: "FAQ", sv: "FAQ", de: "FAQ", es: "FAQ", fr: "FAQ" },
  "preguntas-frecuentes": { fi: "UKK", en: "FAQ", sv: "FAQ", de: "FAQ", es: "FAQ", fr: "FAQ" },
  yritys: { fi: "Yritys", en: "Company", sv: "Företag", de: "Unternehmen", es: "Empresa", fr: "Entreprise" },
  company: { fi: "Yritys", en: "Company", sv: "Företag", de: "Unternehmen", es: "Empresa", fr: "Entreprise" },
  foretag: { fi: "Yritys", en: "Company", sv: "Företag", de: "Unternehmen", es: "Empresa", fr: "Entreprise" },
  unternehmen: { fi: "Yritys", en: "Company", sv: "Företag", de: "Unternehmen", es: "Empresa", fr: "Entreprise" },
  empresa: { fi: "Yritys", en: "Company", sv: "Företag", de: "Unternehmen", es: "Empresa", fr: "Entreprise" },
  entreprise: { fi: "Yritys", en: "Company", sv: "Företag", de: "Unternehmen", es: "Empresa", fr: "Entreprise" },
  varausehdot: { fi: "Varausehdot", en: "Terms", sv: "Villkor", de: "AGB", es: "Términos", fr: "Conditions" },
  terms: { fi: "Varausehdot", en: "Terms", sv: "Villkor", de: "AGB", es: "Términos", fr: "Conditions" },
  tietovisa: { fi: "Tietovisa", en: "Quiz", sv: "Quiz", de: "Quiz", es: "Quiz", fr: "Quiz" },
  quiz: { fi: "Tietovisa", en: "Quiz", sv: "Quiz", de: "Quiz", es: "Quiz", fr: "Quiz" },
  akkilahdot: { fi: "Äkkilähdöt", en: "Last Minute", sv: "Sista Minuten", de: "Last Minute", es: "Última hora", fr: "Dernière minute" },
  "last-minute": { fi: "Äkkilähdöt", en: "Last Minute", sv: "Sista Minuten", de: "Last Minute", es: "Última hora", fr: "Dernière minute" },
  "sista-minuten": { fi: "Äkkilähdöt", en: "Last Minute", sv: "Sista Minuten", de: "Last Minute", es: "Última hora", fr: "Dernière minute" },
  "ultima-hora": { fi: "Äkkilähdöt", en: "Last Minute", sv: "Sista Minuten", de: "Last Minute", es: "Última hora", fr: "Dernière minute" },
  "derniere-minute": { fi: "Äkkilähdöt", en: "Last Minute", sv: "Sista Minuten", de: "Last Minute", es: "Última hora", fr: "Dernière minute" },
};

const langPrefixes: Language[] = ["en", "sv", "de", "es", "fr"];

const homeLabelMap: Record<Language, string> = {
  fi: "Etusivu",
  en: "Home",
  sv: "Hem",
  de: "Startseite",
  es: "Inicio",
  fr: "Accueil"
};

const Breadcrumbs = ({ lang = "fi", items }: BreadcrumbsProps) => {
  const location = useLocation();
  const homeHref = lang === "fi" ? "/" : `/${lang}`;
  const homeLabel = homeLabelMap[lang];

  // Auto-generate breadcrumbs from URL if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = "";

    pathSegments.forEach((segment) => {
      // Skip language prefixes
      if (langPrefixes.includes(segment as Language)) {
        currentPath += `/${segment}`;
        return;
      }

      currentPath += `/${segment}`;
      const labelData = routeLabels[segment];
      
      if (labelData) {
        breadcrumbs.push({
          label: labelData[lang],
          href: currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (breadcrumbItems.length === 0) return null;

  // Schema.org BreadcrumbList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": `https://leville.net${homeHref === "/" ? "" : homeHref}`,
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://leville.net${item.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto px-4 pt-28 pb-4"
      >
        <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
          <li className="flex items-center">
            <Link
              to={homeHref}
              className="flex items-center gap-1 hover:text-primary transition-colors"
              aria-label={homeLabel}
            >
              <Home className="w-4 h-4" />
              <span className="sr-only md:not-sr-only">{homeLabel}</span>
            </Link>
          </li>
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-border" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
