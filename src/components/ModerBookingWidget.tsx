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
  nl: "Accommodaties zoeken...",
};

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  // NOTE: Moder widget language switching is unreliable in SPA navigation.
  // As requested, we force the widget to always initialize in English.
  const scriptLoadedRef = useRef(false);
  const clickHandlerRef = useRef<((e: Event) => void) | null>(null);

  useEffect(() => {
    const scriptId = 'moder-embed-script';
    const scriptBaseSrc = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';

    // Force English always for the Moder widget itself
    (window as any).ModerSettings = {
      property: 'levillenet',
      language: 'en',
    };

    // Some embeds read document language during initialization.
    // We force it here *before* loading the script.
    try {
      document.documentElement.lang = 'en';
    } catch {
      // ignore
    }

    let setupTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const ensureScriptLoaded = () => {
      const embed = document.getElementById('moder-embed');

      // Wait until the embed container exists (Hero mounts it)
      if (!embed) {
        attempts += 1;
        if (attempts < 40) setupTimeoutId = setTimeout(ensureScriptLoaded, 250);
        return;
      }

      // Always (re)initialize the embed in EN when this component mounts.
      // This prevents old FI init from sticking around when navigating inside the SPA.
      const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (existingScript) existingScript.remove();

      // Clear previous markup injected by the embed
      embed.innerHTML = '';

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `${scriptBaseSrc}?v=${Date.now()}`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);

      scriptLoadedRef.current = true;
    };

    ensureScriptLoaded();

    return () => {
      if (setupTimeoutId) clearTimeout(setupTimeoutId);
    };
    // Intentionally not depending on `lang` since widget is forced to EN
  }, []);

  useEffect(() => {
    const loadingText = loadingTexts[lang] || loadingTexts.en;
    
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
      const existing = document.getElementById('moder-loading-overlay');
      if (existing) existing.remove();

      document.body.style.cursor = 'progress';

      const overlay = document.createElement('div');
      overlay.id = 'moder-loading-overlay';
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999;
      `;
      overlay.innerHTML = `
        <div style="background: white; padding: 2rem 3rem; border-radius: 12px;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
          <div style="width: 40px; height: 40px; border: 3px solid #e5e7eb;
            border-top-color: #3b82f6; border-radius: 50%;
            animation: moder-spin 1s linear infinite;"></div>
          <p style="margin: 0; font-size: 1rem; color: #374151; font-weight: 500;">
            ${loadingText}
          </p>
        </div>
      `;
      document.body.appendChild(overlay);

      window.addEventListener('beforeunload', () => {
        overlay.remove();
        document.body.style.cursor = '';
      }, { once: true });

      setTimeout(() => {
        overlay.remove();
        document.body.style.cursor = '';
      }, 10000);
    };

    // Show loading overlay when user navigates away from a page with the Moder widget
    const beforeUnloadHandler = () => {
      if (document.getElementById('moder-embed')) {
        showLoadingOverlay();
      }
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      const overlay = document.getElementById('moder-loading-overlay');
      if (overlay) overlay.remove();
      document.body.style.cursor = '';
    };
  }, [lang]);

  return null;
};

export default ModerBookingWidget;
