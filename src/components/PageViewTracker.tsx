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

const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef<string>("");

  useEffect(() => {
    const path = location.pathname;

    // Skip duplicate tracking for same path
    if (path === lastPath.current) return;
    lastPath.current = path;

    // Skip admin pages
    if (path.startsWith("/admin")) return;

    const trackPageView = async () => {
      try {
        await supabase.from("page_views").insert({
          path,
          referrer: getExternalReferrer(),
          device_type: getDeviceType(),
          language: navigator.language?.split("-")[0] || null,
        });
      } catch (e) {
        // Silent fail - analytics should never break the app
      }
    };

    trackPageView();
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
