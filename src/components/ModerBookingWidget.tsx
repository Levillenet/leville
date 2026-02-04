import { useEffect, useRef } from "react";
import { Language } from "@/translations";

interface ModerBookingWidgetProps {
  lang?: Language;
}

const loadingTexts: Record<string, string> = {
  fi: 'Haetaan majoituksia...',
  en: 'Searching accommodations...',
  sv: 'Söker boenden...',
  de: 'Unterkünfte werden gesucht...',
  es: 'Buscando alojamientos...',
  fr: "Recherche d'hébergements...",
};

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Set Moder settings - widget reads these at initialization
    const moderLang = lang === 'fi' ? undefined : (lang === 'sv' ? 'sv' : 'en');
    (window as any).ModerSettings = {
      property: 'levillenet',
      ...(moderLang && { lang: moderLang })
    };

    // Only load script once per page load
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }
  }, [lang]);

  useEffect(() => {
    const loadingText = loadingTexts[lang] || loadingTexts.en;
    let observer: MutationObserver | null = null;
    let setupTimeoutId: ReturnType<typeof setTimeout> | null = null;
    
    // Add spinner keyframes once
    if (!document.getElementById('moder-spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'moder-spinner-styles';
      style.textContent = `
        @keyframes moder-spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    const showLoadingOverlay = () => {
      // Remove any existing overlay
      const existing = document.getElementById('moder-loading-overlay');
      if (existing) existing.remove();

      document.body.style.cursor = 'progress';

      const overlay = document.createElement('div');
      overlay.id = 'moder-loading-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
      `;
      overlay.innerHTML = `
        <div style="
          background: white;
          padding: 2rem 3rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        ">
          <div style="
            width: 40px;
            height: 40px;
            border: 3px solid #e5e7eb;
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: moder-spin 1s linear infinite;
          "></div>
          <p style="
            margin: 0;
            font-size: 1rem;
            color: #374151;
            font-weight: 500;
          ">${loadingText}</p>
        </div>
      `;

      document.body.appendChild(overlay);

      // Remove on page unload (when navigation happens)
      window.addEventListener('beforeunload', () => {
        overlay.remove();
        document.body.style.cursor = '';
      }, { once: true });

      // Fallback: remove after 10 seconds
      setTimeout(() => {
        overlay.remove();
        document.body.style.cursor = '';
      }, 10000);
    };

    const setupClickHandler = () => {
      const moderEmbed = document.getElementById('moder-embed');
      if (!moderEmbed) {
        // Widget not loaded yet, retry
        setupTimeoutId = setTimeout(setupClickHandler, 500);
        return;
      }

      // IMPORTANT: The Moder search button is a DIV with class .moder-bar__search-button
      const searchButton = moderEmbed.querySelector('.moder-bar__search-button');
      
      if (!searchButton) {
        // Button not rendered yet, watch for it
        observer = new MutationObserver(() => {
          const btn = moderEmbed.querySelector('.moder-bar__search-button');
          if (btn) {
            btn.addEventListener('click', showLoadingOverlay);
            observer?.disconnect();
          }
        });
        observer.observe(moderEmbed, { childList: true, subtree: true });
        return;
      }

      searchButton.addEventListener('click', showLoadingOverlay);
    };

    setupClickHandler();

    return () => {
      // Cleanup
      if (setupTimeoutId) clearTimeout(setupTimeoutId);
      if (observer) observer.disconnect();
      const overlay = document.getElementById('moder-loading-overlay');
      if (overlay) overlay.remove();
      document.body.style.cursor = '';
    };
  }, [lang]);

  return null;
};

export default ModerBookingWidget;
