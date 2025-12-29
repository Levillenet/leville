import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface BookingWidgetProps {
  lang?: "fi" | "en";
}

const BookingWidget = ({ lang }: BookingWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isEnglish = lang === "en" || location.pathname.startsWith("/en");

  useEffect(() => {
    // Set up Moder settings with language based on route
    (window as any).ModerSettings = {
      property: "levillenet",
      language: isEnglish ? "en" : "fi",
    };

    // Remove any existing widget content
    const container = document.getElementById("moder-embed");
    if (container) {
      container.innerHTML = "";
    }

    // Remove existing script if any
    const existingScript = document.querySelector('script[src*="moder-embeds"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add fresh script
    const script = document.createElement("script");
    script.src = "https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
    };
  }, [isEnglish, location.pathname]);

  return (
    <div id="moder-embed" ref={containerRef} />
  );
};

export default BookingWidget;
