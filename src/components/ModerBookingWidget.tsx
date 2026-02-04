import { useEffect, useRef } from "react";
import { Language } from "@/translations";

interface ModerBookingWidgetProps {
  lang?: Language;
}

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const observerRef = useRef<MutationObserver | null>(null);
  const originalWindowOpenRef = useRef<typeof window.open | null>(null);
  const originalLocationAssignRef = useRef<typeof window.location.assign | null>(null);
  const originalLocationReplaceRef = useRef<typeof window.location.replace | null>(null);

  const MODER_SCRIPT_BASE_URL =
    "https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js";

  // Determine widget language: fi = fi, sv = sv, all others = en
  const getWidgetLang = (language: Language): string | undefined => {
    if (language === "fi") return "fi";
    if (language === "sv") return "sv";
    return "en";
  };

  useEffect(() => {
    const widgetLang = getWidgetLang(lang);

    const isModerUrl = (url: unknown): boolean => {
      if (!url) return false;
      const href = typeof url === "string" ? url : String(url);
      return href.includes("moder.fi");
    };

    // Persist originals once
    if (!originalWindowOpenRef.current) {
      originalWindowOpenRef.current = window.open.bind(window);
    }
    if (!originalLocationAssignRef.current) {
      originalLocationAssignRef.current = window.location.assign.bind(window.location);
    }
    if (!originalLocationReplaceRef.current) {
      originalLocationReplaceRef.current = window.location.replace.bind(window.location);
    }

    const originalOpen = originalWindowOpenRef.current;

    // Force Moder navigations to open in a new tab even if embed ignores settings
    window.open = ((url?: string | URL, target?: string, features?: string) => {
      const href = url ? (typeof url === "string" ? url : url.toString()) : "";
      if (href && isModerUrl(href)) {
        return originalOpen?.(href, "_blank", features);
      }
      return originalOpen?.(url as any, target as any, features as any);
    }) as any;

    try {
      (window.location as any).assign = (url: string | URL) => {
        const href = typeof url === "string" ? url : url.toString();
        if (isModerUrl(href)) {
          originalOpen?.(href, "_blank");
          return;
        }
        return originalLocationAssignRef.current?.(href);
      };
      (window.location as any).replace = (url: string | URL) => {
        const href = typeof url === "string" ? url : url.toString();
        if (isModerUrl(href)) {
          originalOpen?.(href, "_blank");
          return;
        }
        return originalLocationReplaceRef.current?.(href);
      };
    } catch {
      // Some browsers may not allow overriding location methods; best-effort only.
    }
    
    // Set global settings before loading the script
    (window as any).ModerSettings = {
      property: 'levillenet',
      lang: widgetLang,
      // Try a few common keys since the embed's config API isn't documented here
      language: widgetLang,
      locale: widgetLang,
      target: '_blank', // Open search results in new window/tab
      linkTarget: '_blank',
      openInNewTab: true,
      newTab: true
    };

    // Clear existing embed container
    const embedContainer = document.getElementById("moder-embed");
    if (embedContainer) {
      embedContainer.innerHTML = "";
    }

    // Remove any existing Moder scripts to ensure fresh init on language change
    document
      .querySelectorAll<HTMLScriptElement>('script[src*="moder-embeds-dev"]')
      .forEach((el) => el.remove());

    // Best-effort clear of global API so the new script reads updated settings
    try {
      delete (window as any).Moder;
      delete (window as any).initModerWidget;
    } catch {
      // ignore
    }

    const script = document.createElement("script");
    script.src = `${MODER_SCRIPT_BASE_URL}?t=${Date.now()}`;
    script.defer = true;
    script.async = true;
    script.onload = () => {
      // Some builds expose an explicit init hook
      if ((window as any).Moder?.init) {
        (window as any).Moder.init();
      } else if ((window as any).initModerWidget) {
        (window as any).initModerWidget();
      }
    };
    document.body.appendChild(script);

    // MutationObserver to detect and elevate Moder portal elements
    const isModerPortal = (node: Node): boolean => {
      if (!(node instanceof HTMLElement)) return false;
      
      // Check className for moder-related identifiers
      const className = node.className || '';
      if (typeof className === 'string' && className.toLowerCase().includes('moder')) {
        return true;
      }
      
      // Check for calendar/datepicker-like elements that appear at body level
      const style = node.getAttribute('style') || '';
      const isPositioned = style.includes('position: absolute') || style.includes('position: fixed');
      
      if (isPositioned) {
        // Check if it contains calendar-like content
        const textContent = node.textContent || '';
        const hasCalendarContent = 
          textContent.includes('Tulopäivä') ||
          textContent.includes('Lähtöpäivä') ||
          textContent.includes('Check-in') ||
          textContent.includes('Check-out') ||
          textContent.includes('Specific days') ||
          textContent.includes('Tarkat päivämäärät') ||
          textContent.includes('± 1 day');
        
        if (hasCalendarContent) return true;
        
        // Check for month/year indicators typical in calendars
        const hasMonthContent = /\b(January|February|March|April|May|June|July|August|September|October|November|December|tammikuu|helmikuu|maaliskuu|huhtikuu|toukokuu|kesäkuu|heinäkuu|elokuu|syyskuu|lokakuu|marraskuu|joulukuu)\b/i.test(textContent);
        if (hasMonthContent) return true;
      }
      
      return false;
    };

    const elevateModerPortals = () => {
      observerRef.current = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (isModerPortal(node) && node instanceof HTMLElement) {
              // Add our elevation class
              node.classList.add('moder-portal-layer');
            }
          });
        });
      });

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: false // Only watch direct children of body
      });
    };

    // Start observing after a short delay to ensure script has loaded
    const timeoutId = setTimeout(elevateModerPortals, 500);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Restore navigation methods
      if (originalWindowOpenRef.current) {
        window.open = originalWindowOpenRef.current;
      }
      try {
        if (originalLocationAssignRef.current) {
          (window.location as any).assign = originalLocationAssignRef.current;
        }
        if (originalLocationReplaceRef.current) {
          (window.location as any).replace = originalLocationReplaceRef.current;
        }
      } catch {
        // ignore
      }

      // Remove the script we added
      script.remove();
    };
  }, [lang]);

  // This component only loads the script - the actual widget renders into #moder-embed in Hero
  return null;
};

export default ModerBookingWidget;
