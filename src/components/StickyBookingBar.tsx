import { ArrowRight } from "lucide-react";
import { Language } from "@/translations";

interface StickyBookingBarProps {
  lang?: Language;
}

const StickyBookingBar = ({ lang = "fi" }: StickyBookingBarProps) => {
  // Generate Moder booking URL with language parameter
  const getModerUrl = () => {
    if (lang === "fi") return "https://app.moder.fi/levillenet";
    if (lang === "sv") return "https://app.moder.fi/levillenet?lang=sv";
    return "https://app.moder.fi/levillenet?lang=en";
  };

  const text: Record<Language, string> = {
    fi: "Varaa heti tästä",
    en: "Book now",
    sv: "Boka nu",
    de: "Jetzt buchen",
    es: "Reservar ahora",
    fr: "Réserver maintenant",
    nl: "Nu boeken",
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9980] bg-primary shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <a
        href={getModerUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 md:py-2.5 text-primary-foreground font-semibold text-base md:text-sm hover:bg-primary/90 transition-colors"
      >
        {text[lang]}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

export default StickyBookingBar;
