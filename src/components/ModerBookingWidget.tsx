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
  fr: 'Recherche d\'hébergements...',
};

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    (window as any).ModerSettings = {
      property: 'levillenet',
      lang: lang === 'fi' ? undefined : (lang === 'sv' ? 'sv' : 'en')
    };

    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js';
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }
  }, [lang]);

  // Intercept navigation and add loading indicator
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver | null = null;
    let embedContainer: HTMLElement | null = null;

    const showLoadingOverlay = () => {
      const loadingText = loadingTexts[lang] || loadingTexts.en;
      
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

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      // Detect any clickable element that could trigger search
      const isClickableElement = 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[class*="search"]') ||
        target.closest('[class*="submit"]') ||
        target.closest('[class*="btn"]') ||
        target.closest('[class*="button"]') ||
        target.closest('div[tabindex]') ||
        target.tagName === 'BUTTON' ||
        (target.closest('div') && window.getComputedStyle(target).cursor === 'pointer');

      if (link && link.href && !link.href.startsWith('javascript:')) {
        e.preventDefault();
        e.stopPropagation();
        showLoadingOverlay();
        window.open(link.href, '_blank', 'noopener,noreferrer');
        return;
      }
      
      // Show loading for any button-like click inside the widget
      if (isClickableElement) {
        const form = target.closest('form');
        if (form) {
          e.preventDefault();
          e.stopPropagation();
          showLoadingOverlay();
          
          const formData = new FormData(form);
          const params = new URLSearchParams();
          formData.forEach((value, key) => params.append(key, value.toString()));
          
          const actionUrl = form.action || window.location.href;
          const fullUrl = actionUrl + (actionUrl.includes('?') ? '&' : '?') + params.toString();
          window.open(fullUrl, '_blank', 'noopener,noreferrer');
        } else {
          // Just show loading for search button clicks
          showLoadingOverlay();
        }
      }
    };

    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      e.preventDefault();
      e.stopPropagation();
      showLoadingOverlay();
      
      const formData = new FormData(form);
      const params = new URLSearchParams();
      formData.forEach((value, key) => params.append(key, value.toString()));
      
      const actionUrl = form.action || window.location.href;
      const fullUrl = actionUrl + (actionUrl.includes('?') ? '&' : '?') + params.toString();
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    const setupInterceptor = () => {
      embedContainer = document.getElementById('moder-embed');
      if (!embedContainer) {
        timeoutId = setTimeout(setupInterceptor, 500);
        return;
      }

      observer = new MutationObserver(() => {
        if (!embedContainer) return;
        embedContainer.querySelectorAll('a[href]').forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });
        embedContainer.querySelectorAll('form').forEach(form => {
          form.setAttribute('target', '_blank');
        });
      });

      observer.observe(embedContainer, { childList: true, subtree: true });

      embedContainer.querySelectorAll('a[href]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
      embedContainer.querySelectorAll('form').forEach(form => {
        form.setAttribute('target', '_blank');
      });

      embedContainer.addEventListener('click', handleClick, true);
      embedContainer.addEventListener('submit', handleSubmit as EventListener, true);
    };

    setupInterceptor();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      if (embedContainer) {
        embedContainer.removeEventListener('click', handleClick, true);
        embedContainer.removeEventListener('submit', handleSubmit as EventListener, true);
      }
      const overlay = document.getElementById('moder-loading-overlay');
      if (overlay) overlay.remove();
      document.body.style.cursor = '';
    };
  }, [lang]);

  return null;
};

export default ModerBookingWidget;
