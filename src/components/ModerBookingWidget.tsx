import { useEffect, useRef } from "react";
import { Language } from "@/translations";

interface ModerBookingWidgetProps {
  lang?: Language;
}

const ModerBookingWidget = ({ lang = "fi" }: ModerBookingWidgetProps) => {
  const scriptLoadedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

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

  // Intercept all navigation from the Moder widget
  useEffect(() => {
    // Store original location methods
    const originalAssign = window.location.assign.bind(window.location);
    const originalReplace = window.location.replace.bind(window.location);

    // Wait for widget to load
    const setupInterceptor = (): (() => void) | undefined => {
      const embedContainer = document.getElementById('moder-embed');
      if (!embedContainer) {
        const timeoutId = setTimeout(setupInterceptor, 500);
        return () => clearTimeout(timeoutId);
      }

      // Method 1: Intercept all link clicks
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href]') as HTMLAnchorElement;
        const button = target.closest('button[type="submit"], button:not([type]), [role="button"]');
        
        if (link && link.href && !link.href.startsWith('javascript:')) {
          e.preventDefault();
          e.stopPropagation();
          window.open(link.href, '_blank', 'noopener,noreferrer');
          return;
        }
        
        // If it's a search/submit button, find the form or build URL
        if (button) {
          const form = button.closest('form');
          if (form) {
            e.preventDefault();
            e.stopPropagation();
            
            const formData = new FormData(form);
            const params = new URLSearchParams();
            formData.forEach((value, key) => params.append(key, value.toString()));
            
            const actionUrl = form.action || window.location.href;
            const fullUrl = actionUrl + (actionUrl.includes('?') ? '&' : '?') + params.toString();
            window.open(fullUrl, '_blank', 'noopener,noreferrer');
          }
        }
      };

      // Method 2: Intercept form submissions
      const handleSubmit = (e: SubmitEvent) => {
        const form = e.target as HTMLFormElement;
        e.preventDefault();
        e.stopPropagation();
        
        const formData = new FormData(form);
        const params = new URLSearchParams();
        formData.forEach((value, key) => params.append(key, value.toString()));
        
        const actionUrl = form.action || window.location.href;
        const fullUrl = actionUrl + (actionUrl.includes('?') ? '&' : '?') + params.toString();
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
      };

      // Method 3: Watch for dynamically added links/forms
      const observer = new MutationObserver(() => {
        embedContainer.querySelectorAll('a[href]').forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });
        embedContainer.querySelectorAll('form').forEach(form => {
          form.setAttribute('target', '_blank');
        });
      });

      observer.observe(embedContainer, { childList: true, subtree: true });

      // Add listeners with capture to intercept before widget handles them
      embedContainer.addEventListener('click', handleClick, true);
      embedContainer.addEventListener('submit', handleSubmit as EventListener, true);

      // Method 4: Intercept window.location changes (last resort)
      (window.location as any).assign = (url: string) => {
        if (url.includes('moder') || url.includes('booking') || url.includes('reservation')) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          originalAssign(url);
        }
      };

      (window.location as any).replace = (url: string) => {
        if (url.includes('moder') || url.includes('booking') || url.includes('reservation')) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          originalReplace(url);
        }
      };

      // Cleanup function
      return () => {
        observer.disconnect();
        embedContainer.removeEventListener('click', handleClick, true);
        embedContainer.removeEventListener('submit', handleSubmit as EventListener, true);
        
        // Restore original location methods
        try {
          (window.location as any).assign = originalAssign;
          (window.location as any).replace = originalReplace;
        } catch {
          // Some browsers may not allow this
        }
      };
    };

    cleanupRef.current = setupInterceptor() || null;
    
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return null;
};

export default ModerBookingWidget;
