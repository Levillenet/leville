import type { Language } from "@/translations";

/**
 * Per-slug record of which language versions exist for each accommodation.
 *
 * Currently: all 26 properties have FI + EN translations.
 * To add a new language later (e.g. NL):
 *   1. Create the translation file (e.g. propertyTranslationsNl.ts)
 *   2. Add the slug → language mapping below by appending "nl" to the array
 *   3. Add the route in App.tsx
 *   4. Add sitemap entries
 * PropertyDetail.tsx itself does NOT need to change.
 *
 * For unsupported languages, x-default (which points to EN) handles user fallback.
 * Do NOT add a language code here unless a real translation file exists.
 */
export const propertyTranslationAvailability: Record<string, Language[]> = {
  "zero-point-5a2": ["fi", "en"],
  "zero-point-5b2": ["fi", "en"],
  "zero-point-5b5-penthouse": ["fi", "en"],
  "karhupirtti": ["fi", "en"],
  "skistar-211": ["fi", "en"],
  "skistar-212": ["fi", "en"],
  "skistar-209": ["fi", "en"],
  "skistar-210": ["fi", "en"],
  "skistar-310": ["fi", "en"],
  "skistar-studio-102": ["fi", "en"],
  "skistar-studio-104": ["fi", "en"],
  "skistar-studio-319": ["fi", "en"],
  "skistar-studio-320": ["fi", "en"],
  "skistar-studio-321": ["fi", "en"],
  "karhunvartija-3": ["fi", "en"],
  "levi-platinum-a2": ["fi", "en"],
  "moonlight-415": ["fi", "en"],
  "glacier-a1": ["fi", "en"],
  "glacier-a2": ["fi", "en"],
  "glacier-a3": ["fi", "en"],
  "glacier-a4": ["fi", "en"],
  "glacier-a5-penthouse": ["fi", "en"],
  "glacier-a6": ["fi", "en"],
  "glacier-b1": ["fi", "en"],
  "glacier-b2": ["fi", "en"],
  "glacier-b3-penthouse": ["fi", "en"],
  "glacier-b4-penthouse": ["fi", "en"],
};

export const propertyPathByLanguage: Record<Language, (slug: string) => string> = {
  fi: (slug) => `/majoitukset/${slug}`,
  en: (slug) => `/en/accommodations/${slug}`,
  // Below are not yet supported. Add real routes and translations BEFORE
  // adding their language codes to propertyTranslationAvailability.
  nl: (slug) => `/nl/accommodaties/${slug}`,
  sv: (slug) => `/sv/boende/${slug}`,
  de: (slug) => `/de/unterkuenfte/${slug}`,
  es: (slug) => `/es/alojamientos/${slug}`,
  fr: (slug) => `/fr/hebergements/${slug}`,
};

/**
 * Builds the customUrls object for <HreflangTags>. Includes only languages
 * with real translations. x-default is handled inside HreflangTags itself
 * and will point to the EN version because EN is present in customUrls.
 */
export const buildPropertyHreflangUrls = (slug: string): Partial<Record<Language, string>> => {
  const available = propertyTranslationAvailability[slug];
  if (!available || available.length === 0) {
    return { fi: `/majoitukset/${slug}` };
  }
  const urls: Partial<Record<Language, string>> = {};
  for (const lang of available) {
    urls[lang] = propertyPathByLanguage[lang](slug);
  }
  return urls;
};
