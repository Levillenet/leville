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
      language: isEnglish ? "en" : "fi",
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

    // Initial check with delays for dynamic content
    setTimeout(forceTargetBlank, 1000);
    setTimeout(forceTargetBlank, 2000);
    setTimeout(forceTargetBlank, 3000);

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

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
  }, [isEnglish, location.pathname]);

  return (
    <div id="moder-embed" ref={containerRef} />
  );
};

export default BookingWidget;
