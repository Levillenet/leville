import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const getExternalReferrer = (): string | null => {
  const ref = document.referrer;
  if (!ref) return null;
  try {
    const refHost = new URL(ref).hostname;
    if (refHost === window.location.hostname) return null;
    return ref;
  } catch {
    return null;
  }
};

const trackEvent = async (path: string, referrer?: string | null) => {
  try {
    await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? null,
      device_type: getDeviceType(),
      language: navigator.language?.split("-")[0] || null,
    });
  } catch {
    // Silent fail
  }
};

const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string>("");

  // Track page views
  useEffect(() => {
    const path = location.pathname;
    if (path === lastPath.current) return;
    lastPath.current = path;
    if (path.startsWith("/admin")) return;

    trackEvent(path, getExternalReferrer());
  }, [location.pathname]);

  // Track outbound clicks to app.moder.fi with specific event types
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;

      // Check for Moder widget search button clicks (hero widget)
      if (target.closest(".moder-bar__search-button")) {
        trackEvent("/event/booking-search-widget", location.pathname);
        return;
      }

      // Check for direct link clicks to moder.fi
      if (anchor?.href?.includes("app.moder.fi")) {
        // Distinguish sticky bar vs PageCTA vs other booking links
        const isStickyBar = !!anchor.closest(".fixed.bottom-0");
        const isPageCTA = !!anchor.closest("section");
        
        if (isStickyBar) {
          trackEvent("/event/booking-sticky-bar", location.pathname);
        } else if (isPageCTA && anchor.closest(".rounded-2xl")) {
          trackEvent("/event/booking-page-cta", location.pathname);
        } else {
          trackEvent("/event/booking-link", location.pathname);
        }
        return;
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
