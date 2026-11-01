import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { properties } from "@/data/properties";
import { syncGoogleAnalytics, trackGooglePage, trackGoogleEvent, bookingClickParams, searchEventParams, trackSearchThenNavigate } from "@/lib/googleAnalytics";

export default function GoogleAnalyticsTracker() {
  const location = useLocation();
  const path = location.pathname + location.search;
  useEffect(() => {
    trackGooglePage(path);
    const changed = () => { syncGoogleAnalytics(); };
    window.addEventListener("lv-consent-change", changed);
    return () => window.removeEventListener("lv-consent-change", changed);
  }, [path]);
  useEffect(() => {
    const clicked = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      let url: URL;
      try { url = new URL(anchor.href); } catch { return; }
      if (url.hostname === "app.moder.fi") {
        trackGoogleEvent("varaa_click", bookingClickParams(anchor.href, properties, location.pathname));
        const search = searchEventParams(anchor.href, location.pathname, properties);
        if (search) {
          const href = anchor.href;
          const newTab = anchor.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0;
          if (newTab || event.defaultPrevented) trackSearchThenNavigate(search);
          else if (trackSearchThenNavigate(search, () => window.location.assign(href))) event.preventDefault();
        }
      } else if (url.protocol === "mailto:" && url.pathname.toLowerCase() === "info@leville.net") {
        trackGoogleEvent("tarjouspyynto_click");
      }
    };
    // Delegation includes lazy-loaded and dynamically inserted anchors. The
    // existing Moder handler runs first and applies permitted URL parameters.
    document.addEventListener("click", clicked, true);
    return () => document.removeEventListener("click", clicked, true);
  }, [location.pathname]);
  return null;
}