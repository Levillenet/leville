import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";


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

// Derive page language from URL prefix (matches site i18n routing)
const SUPPORTED_LANGS = new Set(["en", "sv", "de", "fr", "es", "nl"]);
const getPageLanguage = (path: string): string => {
  const seg = path.split("/").filter(Boolean)[0]?.toLowerCase();
  if (seg && SUPPORTED_LANGS.has(seg)) return seg;
  return "fi";
};

// Bot detection on the client — drops headless browsers and known crawlers
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|prerender|headless|lighthouse|pagespeed|facebookexternalhit|whatsapp|telegrambot|discordbot|embedly|pinterest|skypeuripreview|node-fetch|axios|python-requests|curl|wget/i;
const isLikelyBot = (): boolean => {
  if (typeof navigator === "undefined") return true;
  const ua = navigator.userAgent || "";
  if (!ua) return true;
  if (BOT_RE.test(ua)) return true;
  // @ts-ignore — webdriver flag is widely set in automation
  if (navigator.webdriver) return true;
  return false;
};

const LOG_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-page-view`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const buildPayload = (path: string, referrer?: string | null, id?: string) => {
  const utm = getUtmParams();
  return {
    ...(id ? { id } : {}),
    path,
    referrer: referrer ?? null,
    device_type: getDeviceType(),
    language: getPageLanguage(path),
    session_id: getSessionId(),
    viewport_w: typeof window !== "undefined" ? window.innerWidth : null,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  };
};

const trackEvent = async (path: string, referrer?: string | null): Promise<string | null> => {
  if (isLikelyBot()) return null;
  try {
    const id = crypto.randomUUID();
    const res = await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": ANON_KEY,
        "Authorization": `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify(buildPayload(path, referrer, id)),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data?.id ?? id;
  } catch {
    return null;
  }
};

// Fire-and-forget event (conversions) — keepalive fetch so it survives tab/window changes
const trackEventNoId = (path: string, referrer?: string | null) => {
  if (isLikelyBot()) return;
  try {
    fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": ANON_KEY,
        "Authorization": `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify(buildPayload(path, referrer)),
      keepalive: true,
    }).catch(() => {});
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

  // Track outbound clicks to app.moder.fi — per-source booking conversion events
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;

      if (target.closest(".moder-bar__search-button")) {
        trackConversion("/event/booking-search-widget", location.pathname);
        return;
      }

      if (anchor?.href?.includes("app.moder.fi")) {
        const src = anchor.getAttribute("data-booking-source");
        const eventPath =
          src === "page-cta"   ? "/event/booking-page-cta"   :
          src === "sticky-bar" ? "/event/booking-sticky-bar" :
          src === "header"     ? "/event/booking-header"     :
          src === "features"   ? "/event/booking-features"   :
                                 "/event/booking-link";
        trackConversion(eventPath, location.pathname);
        return;
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
