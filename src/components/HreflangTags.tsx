import { Helmet } from "react-helmet-async";
import { Language, getRouteForLanguage } from "@/translations";

interface HreflangTagsProps {
  currentPath: string;
  currentLang?: Language;
  customUrls?: Partial<Record<Language, string>>; // For pages with non-standard URL patterns
}

const baseUrl = "https://leville.net";

/**
 * Normalise a URL value from customUrls.
 * Accepts both absolute URLs ("https://leville.net/path") and paths ("/path").
 * Always returns an absolute URL.
 */
const toAbsoluteUrl = (value: string): string => {
  if (value.startsWith("http")) return value;
  return `${baseUrl}${value}`;
};

const HreflangTags = ({ currentPath, currentLang = "fi", customUrls }: HreflangTagsProps) => {
  const allLanguages: Language[] = ["fi", "en", "sv", "de", "es", "fr", "nl"];

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
    // x-default should point to EN, fallback to FI, then first available
    const defaultLang = availableLanguages.includes("en")
      ? "en"
      : availableLanguages.includes("fi")
        ? "fi"
        : availableLanguages[0];

    return (
      <Helmet>
        {availableLanguages.map((lang) => {
          const value = customUrls[lang];
          if (!value) return null;
          const fullUrl = toAbsoluteUrl(value);
          
          return (
            <link
              key={lang}
              rel="alternate"
              hrefLang={hreflangCodes[lang]}
              href={fullUrl}
            />
          );
        })}
        {/* x-default for search engines — points to EN when available */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={toAbsoluteUrl(customUrls[defaultLang]!)}
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
      {/* x-default points to EN version */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${getRouteForLanguage(currentPath, "en")}`}
      />
    </Helmet>
  );
};

export default HreflangTags;
