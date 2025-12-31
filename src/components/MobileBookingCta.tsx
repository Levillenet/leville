import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language, getTranslations } from "@/translations";

interface MobileBookingCtaProps {
  lang?: Language;
}

const MobileBookingCta = ({ lang = "fi" }: MobileBookingCtaProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const t = getTranslations(lang).hero;

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

  const scrollToWidget = () => {
    const widget = document.getElementById("booking-widget");
    if (widget) {
      widget.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9980] md:hidden">
      <Button
        onClick={scrollToWidget}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg py-6 text-base font-semibold"
        size="lg"
      >
        {t.bookingCta}
        <ArrowDown className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default MobileBookingCta;
