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

const getSessionId = (): string => {
  let sid = sessionStorage.getItem("_lv_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("_lv_sid", sid);
  }
  return sid;
};

const trackEvent = async (path: string, referrer?: string | null) => {
  try {
    await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? null,
      device_type: getDeviceType(),
      language: navigator.language?.split("-")[0] || null,
      session_id: getSessionId(),
    });
  } catch {
    // Silent fail
  }
};

const DEBOUNCE_MS = 3000;

const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string>("");
  const lastEventRef = useRef<{ path: string; time: number }>({ path: "", time: 0 });

  const trackConversion = (eventPath: string, referrer: string) => {
    const now = Date.now();
    if (eventPath === lastEventRef.current.path && now - lastEventRef.current.time < DEBOUNCE_MS) {
      return; // skip duplicate within cooldown
    }
    lastEventRef.current = { path: eventPath, time: now };
    trackEvent(eventPath, referrer);
  };

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

      if (target.closest(".moder-bar__search-button")) {
        trackConversion("/event/booking-search-widget", location.pathname);
        return;
      }

      if (anchor?.href?.includes("app.moder.fi")) {
        const isStickyBar = !!anchor.closest(".fixed.bottom-0");
        const isPageCTA = !!anchor.closest("section");
        
        if (isStickyBar) {
          trackConversion("/event/booking-sticky-bar", location.pathname);
        } else if (isPageCTA && anchor.closest(".rounded-2xl")) {
          trackConversion("/event/booking-page-cta", location.pathname);
        } else {
          trackConversion("/event/booking-link", location.pathname);
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
