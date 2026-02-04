import { useEffect, useRef } from "react";
import { Language } from "@/translations";

interface ModerBookingWidgetProps {
  lang?: Language;
}

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const scriptLoadedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // Set global settings before loading the script
    (window as any).ModerSettings = {
      property: 'levillenet',
      lang: lang === 'fi' ? undefined : (lang === 'sv' ? 'sv' : 'en'),
      target: '_blank' // Open search results in new window/tab
    };

    // Load script only once
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }

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
    };
  }, [lang]);

  // This component only loads the script - the actual widget renders into #moder-embed in Hero
  return null;
};

export default ModerBookingWidget;
