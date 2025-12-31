import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Language, detectLanguageFromPath } from "@/translations";

interface BookingWidgetProps {
  lang?: Language;
}

const BookingWidget = ({ lang }: BookingWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const detectedLang = lang || detectLanguageFromPath(location.pathname);
  
  // Map language to Moder widget language code
  const getModerLanguage = (language: Language): string => {
    const langMap: Record<Language, string> = {
      fi: "fi",
      en: "en",
      sv: "sv",
      de: "en",
      es: "en",
      fr: "en",
    };
    return langMap[language];
  };
  
  const moderLanguage = getModerLanguage(detectedLang);

  useEffect(() => {
    // Set up Moder settings with language based on route
    (window as any).ModerSettings = {
      property: "levillenet",
      language: moderLanguage,
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

    const root = containerRef.current;
    if (!root) return;

    // Force all links inside widget to open in new tab
    const forceTargetBlank = () => {
      const links = root.querySelectorAll('a[href]');
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        const href = anchor.getAttribute("href");
        if (href && href.trim() !== "" && href !== "#" && !href.startsWith("javascript:")) {
          anchor.setAttribute('target', '_blank');
          anchor.setAttribute('rel', 'noopener noreferrer');
        }
      });
    };

    // Watch for DOM changes and update links
    const observer = new MutationObserver(() => {
      forceTargetBlank();
    });
    observer.observe(root, { childList: true, subtree: true });

    // Initial check with delay for dynamic content
    setTimeout(forceTargetBlank, 1000);

    // Build URL from form data
    const buildModerUrlFromForm = (form: HTMLFormElement | null): string => {
      const base = new URL("https://app.moder.fi/property/levillenet");
      const params = new URLSearchParams();

      if (form) {
        const data = new FormData(form);
        for (const [k, v] of data.entries()) {
          const key = String(k).trim();
          const value = String(v).trim();
          if (key && value) {
            params.set(key, value);
          }
        }
      }

      params.set("lang", moderLanguage);
      base.search = params.toString();
      return base.toString();
    };

    // Open URL in new tab with fallback
    const openExternal = (url: string) => {
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) {
        // Fallback if popup blocked
        window.location.href = url;
      }
    };

    // Intercept ONLY form submissions - let widget handle all other interactions
    const onSubmitCapture = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;

      e.preventDefault();
      e.stopPropagation();

      const action = form.getAttribute("action") || "";
      const url = action.includes("moder") ? action : buildModerUrlFromForm(form);
      openExternal(url);
    };

    root.addEventListener("submit", onSubmitCapture, { capture: true });

    return () => {
      observer.disconnect();
      root.removeEventListener("submit", onSubmitCapture, { capture: true } as EventListenerOptions);
    };
  }, [moderLanguage, location.pathname]);

  return (
    <div id="moder-embed" ref={containerRef} />
  );
};

export default BookingWidget;
