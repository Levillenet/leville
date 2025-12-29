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

const routeLabels: Record<string, { fi: string; en: string }> = {
  majoitukset: { fi: "Majoitukset", en: "Accommodations" },
  accommodations: { fi: "Majoitukset", en: "Accommodations" },
  levi: { fi: "Levi", en: "Levi" },
  ajankohtaista: { fi: "Ajankohtaista", en: "News" },
  news: { fi: "Ajankohtaista", en: "News" },
  yhteystiedot: { fi: "Yhteystiedot", en: "Contact" },
  contact: { fi: "Yhteystiedot", en: "Contact" },
  revontulet: { fi: "Revontulet", en: "Northern Lights" },
  "northern-lights": { fi: "Revontulet", en: "Northern Lights" },
  ukk: { fi: "UKK", en: "FAQ" },
  faq: { fi: "UKK", en: "FAQ" },
  yritys: { fi: "Yritys", en: "Company" },
  company: { fi: "Yritys", en: "Company" },
  varausehdot: { fi: "Varausehdot", en: "Terms" },
  terms: { fi: "Varausehdot", en: "Terms" },
};

const Breadcrumbs = ({ lang = "fi", items }: BreadcrumbsProps) => {
  const location = useLocation();
  const isEnglish = lang === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const homeLabel = isEnglish ? "Home" : "Etusivu";

  // Auto-generate breadcrumbs from URL if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = "";

    pathSegments.forEach((segment) => {
      // Skip 'en' language prefix
      if (segment === "en") {
        currentPath += "/en";
        return;
      }

      currentPath += `/${segment}`;
      const labelData = routeLabels[segment];
      
      if (labelData) {
        breadcrumbs.push({
          label: isEnglish ? labelData.en : labelData.fi,
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
