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

// UTM: capture from URL and persist in sessionStorage
const captureUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) sessionStorage.setItem(`_lv_${key}`, val);
  }
};

const getUtmParams = () => ({
  utm_source: sessionStorage.getItem("_lv_utm_source") || null,
  utm_medium: sessionStorage.getItem("_lv_utm_medium") || null,
  utm_campaign: sessionStorage.getItem("_lv_utm_campaign") || null,
});

const trackEvent = async (path: string, referrer?: string | null): Promise<string | null> => {
  try {
    const id = crypto.randomUUID();
    const utm = getUtmParams();
    const { error } = await supabase.from("page_views").insert({
      id,
      path,
      referrer: referrer ?? null,
      device_type: getDeviceType(),
      language: navigator.language?.split("-")[0] || null,
      session_id: getSessionId(),
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
    return error ? null : id;
  } catch {
    return null;
  }
};

// Fire-and-forget event (conversions) — no id needed
const trackEventNoId = async (path: string, referrer?: string | null) => {
  try {
    const utm = getUtmParams();
    await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? null,
      device_type: getDeviceType(),
      language: navigator.language?.split("-")[0] || null,
      session_id: getSessionId(),
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
  } catch {
    // Silent fail
  }
};

const DEBOUNCE_MS = 3000;

const isDevEnvironment = (): boolean => {
  const host = window.location.hostname;
  return host.includes("lovable.app") || host.includes("lovableproject.com") || host === "localhost" || host === "127.0.0.1";
};

const getScrollPercent = (): number => {
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  const winHeight = window.innerHeight;
  if (docHeight <= winHeight) return 100;
  const scrolled = window.scrollY + winHeight;
  const pct = (scrolled / docHeight) * 100;
  // Round to nearest 25
  return Math.min(100, Math.round(pct / 25) * 25);
};

const sendEngagement = (pageViewId: string, scrollDepth: number, timeOnPage: number) => {
  const payload = JSON.stringify({
    page_view_id: pageViewId,
    session_id: getSessionId(),
    scroll_depth: scrollDepth,
    time_on_page: Math.min(timeOnPage, 1800),
  });

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-page-engagement`;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  // Always use fetch with keepalive — sendBeacon can't set custom headers
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": anonKey,
    },
    body: payload,
    keepalive: true,
  }).catch(() => {});
};

const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string>("");
  const lastEventRef = useRef<{ path: string; time: number }>({ path: "", time: 0 });

  // Engagement tracking refs
  const currentPageViewId = useRef<string | null>(null);
  const pageEntryTime = useRef<number>(0);
  const maxScrollDepth = useRef<number>(0);
  const lastEngagementSentSeconds = useRef<number>(0);

  const trackConversion = (eventPath: string, referrer: string) => {
    const now = Date.now();
    if (eventPath === lastEventRef.current.path && now - lastEventRef.current.time < DEBOUNCE_MS) {
      return;
    }
    lastEventRef.current = { path: eventPath, time: now };
    trackEventNoId(eventPath, referrer);
  };

  // Flush engagement data for current page
  const flushEngagement = () => {
    if (!currentPageViewId.current) return;

    const timeOnPage = Math.round((Date.now() - pageEntryTime.current) / 1000);
    if (timeOnPage < 1) return;
    if (timeOnPage <= lastEngagementSentSeconds.current) return;

    lastEngagementSentSeconds.current = timeOnPage;
    sendEngagement(currentPageViewId.current, maxScrollDepth.current, timeOnPage);
  };

  // Capture UTM on first load
  useEffect(() => {
    captureUtmParams();
  }, []);

  // Track page views
  useEffect(() => {
    const path = location.pathname;
    if (path === lastPath.current) return;

    // Flush previous page engagement before tracking new page
    flushEngagement();

    lastPath.current = path;
    if (path.startsWith("/admin")) return;
    if (isDevEnvironment()) return;

    // Reset engagement for new page
    maxScrollDepth.current = 0;
    pageEntryTime.current = Date.now();
    lastEngagementSentSeconds.current = 0;
    currentPageViewId.current = null;

    trackEvent(path, getExternalReferrer()).then((id) => {
      currentPageViewId.current = id;
    });
  }, [location.pathname]);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const depth = getScrollPercent();
      if (depth > maxScrollDepth.current) {
        maxScrollDepth.current = depth;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Heartbeat while user stays on the same page
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      flushEngagement();
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  // Flush on visibility change (tab close, navigate away)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushEngagement();
      }
    };

    const handlePageHide = () => {
      flushEngagement();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

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
