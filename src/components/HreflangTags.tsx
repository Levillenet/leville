import { Helmet } from "react-helmet-async";
import { Language, languageConfig, getRouteForLanguage } from "@/translations";

interface HreflangTagsProps {
  currentPath: string;
  currentLang: Language;
}

const HreflangTags = ({ currentPath, currentLang }: HreflangTagsProps) => {
  const baseUrl = "https://leville.net";
  const languages: Language[] = ["fi", "en", "sv", "de", "es", "fr"];

  // Map language codes to hreflang codes
  const hreflangCodes: Record<Language, string> = {
    fi: "fi",
    en: "en",
    sv: "sv",
    de: "de",
    es: "es",
    fr: "fr",
  };

  return (
    <Helmet>
      {languages.map((lang) => {
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
