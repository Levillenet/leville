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
      de: "en", // German uses English widget
      es: "en", // Spanish uses English widget
      fr: "en", // French uses English widget
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

    // Force external navigation to open in a new tab
    const root = containerRef.current;
    if (!root) return;

    const openExternal = (url: string) => {
      try {
        const u = new URL(url, window.location.href);
        window.open(u.toString(), "_blank", "noopener,noreferrer");
        return true;
      } catch {
        return false;
      }
    };

    // Force all links inside widget to open in new tab
    const forceTargetBlank = () => {
      const links = root.querySelectorAll('a[href]');
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
      });
    };

    // Watch for DOM changes and update links
    const observer = new MutationObserver(() => {
      forceTargetBlank();
    });
    observer.observe(root, { childList: true, subtree: true });

    // Initial check with delays for dynamic content
    setTimeout(forceTargetBlank, 500);
    setTimeout(forceTargetBlank, 1000);
    setTimeout(forceTargetBlank, 2000);
    setTimeout(forceTargetBlank, 3000);

    // Intercept ALL clicks in the widget - handles buttons, links, and any clickable element
    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for anchor links first
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.trim() !== "" && href !== "#") {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openExternal(href);
          return;
        }
      }

      // Check for buttons or other clickable elements that might trigger navigation
      const button = target.closest("button, [role='button'], [type='submit']") as HTMLElement | null;
      if (button) {
        // Look for data attributes or nearby forms that indicate external navigation
        const form = button.closest("form");
        if (form) {
          const action = form.getAttribute("action") || "";
          if (action && action.includes("moder")) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            try {
              const url = new URL(action, window.location.href);
              const data = new FormData(form);
              for (const [k, v] of data.entries()) {
                url.searchParams.set(k, String(v));
              }
              openExternal(url.toString());
            } catch {
              // fallback
            }
            return;
          }
        }
      }
    };

    const onSubmitCapture = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;

      const action = form.getAttribute("action") || "";
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      try {
        const url = new URL(action || window.location.href, window.location.href);
        const data = new FormData(form);
        for (const [k, v] of data.entries()) {
          url.searchParams.set(k, String(v));
        }
        // Always open Moder in new tab
        if (action.includes("moder") || url.hostname.includes("moder")) {
          openExternal(url.toString());
        } else {
          // For widget's own internal forms, build URL to moder
          const moderUrl = `https://app.moder.fi/property/levillenet?${url.searchParams.toString()}&lang=${moderLanguage}`;
          openExternal(moderUrl);
        }
      } catch {
        // Fallback: open Moder main page
        openExternal(`https://app.moder.fi/property/levillenet?lang=${moderLanguage}`);
      }
    };

    root.addEventListener("click", onClickCapture, true);
    root.addEventListener("submit", onSubmitCapture, true);

    return () => {
      observer.disconnect();
      root.removeEventListener("click", onClickCapture, true);
      root.removeEventListener("submit", onSubmitCapture, true);
    };
  }, [moderLanguage, location.pathname]);

  return (
    <div id="moder-embed" ref={containerRef} />
  );
};

export default BookingWidget;
