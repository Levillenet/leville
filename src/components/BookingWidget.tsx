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

    const buildModerUrlFromForm = (form: HTMLFormElement | null) => {
      const base = new URL("https://app.moder.fi/property/levillenet");
      const params = new URLSearchParams();

      if (form) {
        const data = new FormData(form);
        for (const [k, v] of data.entries()) {
          const key = String(k).trim();
          const value = String(v).trim();
          if (!key || !value) continue;
          params.set(key, value);
        }
      }

      // Ensure widget language is respected
      params.set("lang", moderLanguage);
      base.search = params.toString();
      return base.toString();
    };

    // Intercept ONLY external links and submit buttons - everything else works normally
    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1) Check for external links - open in new tab
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href");
        // Only intercept real external links, not internal widget navigation
        if (href && href.trim() !== "" && href !== "#" && !href.startsWith("javascript:")) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          console.debug("[BookingWidget] Opening link in new tab:", href);
          openExternal(href);
          return;
        }
      }

      // 2) Check for submit buttons - open search in new tab
      const submitButton = target.closest(
        "button[type='submit'], input[type='submit'], [type='submit']"
      ) as HTMLElement | null;

      // Also check for buttons that look like search buttons by text or class
      const button = target.closest("button") as HTMLButtonElement | null;
      const isSearchButton = button && (
        // Check button text content for search keywords (partial match)
        /\b(hae|search|sök|suchen|find|etsi|buscar|chercher)\b/i.test(button.textContent?.trim() || '') ||
        // Check class names for search-related patterns
        /\b(search|submit|cta|action|primary)\b/i.test(button.className || '') ||
        // Check aria-label
        /\b(search|hae|sök|suchen)\b/i.test(button.getAttribute('aria-label') || '')
      );

      if (submitButton || isSearchButton) {
        const targetButton = submitButton || button;
        const form = (targetButton || button)?.closest("form") as HTMLFormElement | null;
        const action = form?.getAttribute("action") || "";

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Prefer the form action if it already points to Moder, otherwise construct a direct Moder URL
        const urlToOpen = action.includes("moder")
          ? (() => {
              try {
                const u = new URL(action, window.location.href);
                // merge form data into query
                if (form) {
                  const data = new FormData(form);
                  for (const [k, v] of data.entries()) {
                    u.searchParams.set(String(k), String(v));
                  }
                }
                if (!u.searchParams.get("lang")) u.searchParams.set("lang", moderLanguage);
                return u.toString();
              } catch {
                return buildModerUrlFromForm(form);
              }
            })()
          : buildModerUrlFromForm(form);

        console.debug("[BookingWidget] Opening submit in new tab:", urlToOpen);
        openExternal(urlToOpen);
      }
    };

    const onSubmitCapture = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const action = form.getAttribute("action") || "";
      const urlToOpen = action.includes("moder") ? action : buildModerUrlFromForm(form);
      console.debug("[BookingWidget] Opening form submit in new tab:", urlToOpen);
      openExternal(urlToOpen);
    };

    root.addEventListener("click", onClickCapture, true);
    root.addEventListener("touchend", onClickCapture, true);
    root.addEventListener("submit", onSubmitCapture, true);

    return () => {
      observer.disconnect();
      root.removeEventListener("click", onClickCapture, true);
      root.removeEventListener("touchend", onClickCapture, true);
      root.removeEventListener("submit", onSubmitCapture, true);
    };
  }, [moderLanguage, location.pathname]);

  return (
    <div id="moder-embed" ref={containerRef} />
  );
};

export default BookingWidget;
