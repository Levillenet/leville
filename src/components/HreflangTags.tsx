import { Helmet } from "react-helmet-async";
import { Language, getRouteForLanguage } from "@/translations";

interface HreflangTagsProps {
  currentPath: string;
  currentLang?: Language;
  customUrls?: Partial<Record<Language, string>>; // For pages with non-standard URL patterns (e.g., FI/EN only)
}

const HreflangTags = ({ currentPath, currentLang = "fi", customUrls }: HreflangTagsProps) => {
  const baseUrl = "https://leville.net";
  const allLanguages: Language[] = ["fi", "en", "sv", "de", "es", "fr", "nl"];

  // Map language codes to hreflang codes
  const hreflangCodes: Record<Language, string> = {
    fi: "fi",
    en: "en",
    sv: "sv",
    de: "de",
    es: "es",
    fr: "fr",
    nl: "nl",
  };

  // If customUrls provided, only output hreflang for those languages
  if (customUrls) {
    const availableLanguages = Object.keys(customUrls) as Language[];
    const defaultLang = availableLanguages.includes("fi") ? "fi" : availableLanguages[0];

    return (
      <Helmet>
        {availableLanguages.map((lang) => {
          const path = customUrls[lang];
          if (!path) return null;
          const fullUrl = `${baseUrl}${path}`;
          
          return (
            <link
              key={lang}
              rel="alternate"
              hrefLang={hreflangCodes[lang]}
              href={fullUrl}
            />
          );
        })}
        {/* x-default for search engines */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${baseUrl}${customUrls[defaultLang]}`}
        />
      </Helmet>
    );
  }

  // Standard behavior for pages with all language versions
  return (
    <Helmet>
      {allLanguages.map((lang) => {
        const path = getRouteForLanguage(currentPath, lang);
        const fullUrl = `${baseUrl}${path === "/" ? "" : path}`;
        
        return (
          <link
            key={lang}
            rel="alternate"
            hrefLang={hreflangCodes[lang]}
            href={fullUrl}
          />
        );
      })}
      {/* x-default for search engines */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${getRouteForLanguage(currentPath, "fi")}`}
      />
    </Helmet>
  );
};

export default HreflangTags;
