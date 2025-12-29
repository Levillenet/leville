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
        // Only open actual external navigation in a new tab
        if (u.origin !== window.location.origin) {
          window.open(u.toString(), "_blank", "noopener,noreferrer");
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    };

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target === "_blank") return;

      const href = a.getAttribute("href");
      if (!href) return;

      // Many embeds navigate to app.moder.fi (or similar) for search/results
      const shouldOpen = /(^https?:)?\/\/.*moder\.fi\//i.test(href) || href.includes("app.moder.fi");
      if (!shouldOpen) return;

      if (openExternal(href)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onSubmitCapture = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;

      const action = form.getAttribute("action") || "";
      const shouldOpen = /(^https?:)?\/\/.*moder\.fi\//i.test(action) || action.includes("app.moder.fi");
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
      root.removeEventListener("click", onClickCapture, true);
      root.removeEventListener("submit", onSubmitCapture, true);
    };
  }, [location.pathname]);

  const title = isEnglish 
    ? "Check our available accommodations" 
    : "Katso vapaana olevat majoituksemme";

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 shadow-elegant border border-border/30 max-w-4xl mx-auto relative" style={{ overflow: 'visible', zIndex: 40 }}>
      <h2 className="text-xl font-serif font-semibold text-foreground mb-6 tracking-wide">
        {title}
      </h2>
      <div 
        id="moder-embed" 
        ref={containerRef} 
        className="min-h-[250px] relative"
      />
    </div>
  );
};

export default BookingWidget;
