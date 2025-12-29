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
      target: "_blank",
      language: isEnglish ? "en" : "fi",
    };

    // Remove any existing widget content and re-init
    const container = document.getElementById("moder-embed");
    if (container) {
      container.innerHTML = "";
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="moder-embeds"]');
    if (existingScript) {
      // If script exists, try to reinitialize the widget
      if ((window as any).ModerEmbed && typeof (window as any).ModerEmbed.init === 'function') {
        (window as any).ModerEmbed.init();
      } else {
        // Force reload by removing and re-adding script
        existingScript.remove();
        const script = document.createElement("script");
        script.src = "https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js";
        script.defer = true;
        document.body.appendChild(script);
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://moder-embeds-dev.s3.eu-north-1.amazonaws.com/bundle.js";
      script.defer = true;
      document.body.appendChild(script);
    }

    // Force external navigation (search/results) to open in a new tab.
    // This is needed in some embeds where `target` is not respected.
    const root = containerRef.current;
    if (!root) return;

    const openExternal = (url: string) => {
      try {
        const u = new URL(url, window.location.href);
        // Open external navigation in a new tab
        if (u.origin !== window.location.origin || u.hostname.includes('moder')) {
          window.open(u.toString(), "_blank", "noopener,noreferrer");
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    };

    // Force all links inside widget to open in new tab
    const forceTargetBlank = () => {
      const links = root.querySelectorAll('a[href]');
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        const href = anchor.getAttribute('href') || '';
        if (href.includes('moder') || href.includes('app.moder.fi')) {
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

    // Initial check
    setTimeout(forceTargetBlank, 1000);
    setTimeout(forceTargetBlank, 2000);
    setTimeout(forceTargetBlank, 3000);

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      
      // Also check for buttons that might trigger navigation
      const btn = target?.closest?.("button") as HTMLButtonElement | null;
      if (btn) {
        // Let the form submit handler deal with buttons
        return;
      }
      
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // Many embeds navigate to app.moder.fi (or similar) for search/results
      const shouldOpen = /(^https?:)?\/\/.*moder\.fi\//i.test(href) || 
                         href.includes("app.moder.fi") || 
                         href.includes("moder");
      if (!shouldOpen) return;

      e.preventDefault();
      e.stopPropagation();
      openExternal(href);
    };

    const onSubmitCapture = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;

      const action = form.getAttribute("action") || "";
      const shouldOpen = /(^https?:)?\/\/.*moder\.fi\//i.test(action) || 
                         action.includes("app.moder.fi") ||
                         action.includes("moder");
      if (!shouldOpen) return;

      e.preventDefault();
      e.stopPropagation();

      try {
        const url = new URL(action, window.location.href);
        const data = new FormData(form);
        for (const [k, v] of data.entries()) {
          url.searchParams.set(k, String(v));
        }
        window.open(url.toString(), "_blank", "noopener,noreferrer");
      } catch {
        // If building URL fails, let the embed handle it.
      }
    };

    root.addEventListener("click", onClickCapture, true);
    root.addEventListener("submit", onSubmitCapture, true);

    return () => {
      observer.disconnect();
      root.removeEventListener("click", onClickCapture, true);
      root.removeEventListener("submit", onSubmitCapture, true);
    };
  }, [location.pathname]);

  return (
    <div 
      className="rounded-xl p-4 md:p-6 shadow-elegant border border-primary/20 max-w-4xl mx-auto relative" 
      style={{ 
        overflow: 'visible', 
        zIndex: 40,
        background: 'linear-gradient(135deg, hsl(218 22% 14% / 0.95), hsl(218 25% 10% / 0.9))',
        backdropFilter: 'blur(20px)',
      }}
    >
      <style>{`
        #moder-embed,
        #moder-embed > div,
        #moder-embed form,
        #moder-embed .moder-search,
        #moder-embed .moder-widget,
        #moder-embed [class*="search"],
        #moder-embed [class*="widget"],
        #moder-embed [class*="container"],
        #moder-embed [class*="wrapper"] {
          background: transparent !important;
          background-color: transparent !important;
        }
        #moder-embed input,
        #moder-embed select {
          background: hsl(218 18% 22% / 0.8) !important;
          border: 1px solid hsl(218 18% 30%) !important;
          color: hsl(210 40% 98%) !important;
        }
        #moder-embed input::placeholder {
          color: hsl(215 20% 60%) !important;
        }
        #moder-embed label,
        #moder-embed span,
        #moder-embed p {
          color: hsl(210 40% 90%) !important;
        }
        #moder-embed button[type="submit"],
        #moder-embed .moder-submit,
        #moder-embed [class*="submit"] {
          background: hsl(195 70% 45%) !important;
          color: hsl(218 25% 10%) !important;
        }
      `}</style>
      <div 
        id="moder-embed" 
        ref={containerRef} 
        className="min-h-[250px] relative"
      />
    </div>
  );
};

export default BookingWidget;
