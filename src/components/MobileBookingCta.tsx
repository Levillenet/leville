import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language, getTranslations } from "@/translations";

interface MobileBookingCtaProps {
  lang?: Language;
}

const MobileBookingCta = ({ lang = "fi" }: MobileBookingCtaProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const t = getTranslations(lang).hero;

  // Generate Moder booking URL with language parameter
  const getModerUrl = () => {
    if (lang === "fi") return "https://app.moder.fi/levillenet";
    if (lang === "sv") return "https://app.moder.fi/levillenet?lang=sv";
    return "https://app.moder.fi/levillenet?lang=en";
  };

  useEffect(() => {
    const widget = document.getElementById("booking-widget");
    if (!widget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide CTA when widget is visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    observer.observe(widget);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9980] md:hidden">
      <Button
        asChild
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg py-6 text-base font-semibold"
        size="lg"
      >
        <a
          href={getModerUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.bookingCta}
          <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </div>
  );
};

export default MobileBookingCta;
