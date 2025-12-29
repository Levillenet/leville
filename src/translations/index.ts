import { fi } from "./fi";
import { en } from "./en";

export type Language = "fi" | "en";

export const translations = {
  fi,
  en
} as const;

export type Translations = typeof fi;

export const getTranslations = (lang: Language): Translations => {
  return translations[lang];
};
