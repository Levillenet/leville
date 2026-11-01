import { hasConsent } from "./cookieConsent";

export const GA_MEASUREMENT_ID = "G-4RSJCSBRRC";
export const GA_CONFIG = {
  linker: { domains: ["leville.net", "app.moder.fi"] },
  send_page_view: true,
};
type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean;
};
let initialized = false;
let lastPage = "";

export function syncGoogleAnalytics(): boolean {
  const win = window as AnalyticsWindow;
  const allowed = hasConsent("analytics");
  win[`ga-disable-${GA_MEASUREMENT_ID}`] = !allowed;
  if (!allowed || !win.gtag) return false;
  if (initialized) return true;
  initialized = true;
  lastPage = window.location.pathname + window.location.search;
  win.gtag("set", "developer_id.dZjgwMW", true);
  win.gtag("js", new Date());
  win.gtag("config", GA_MEASUREMENT_ID, GA_CONFIG);
  const script = document.createElement("script");
  script.id = "leville-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  return true;
}
export function trackGooglePage(path: string) {
  if (!syncGoogleAnalytics() || path === lastPage) return;
  lastPage = path;
  (window as AnalyticsWindow).gtag?.("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}
export function trackGoogleEvent(name: "varaa_click" | "tarjouspyynto_click", params: Record<string, string> = {}) {
  if (!syncGoogleAnalytics()) return;
  (window as AnalyticsWindow).gtag?.("event", name, { ...params, send_to: GA_MEASUREMENT_ID });
}
export function bookingClickParams(destination: string, properties: { bookingUrl: string; slug: string }[], currentPath: string) {
  const url = new URL(destination);
  const property = properties.find((item) => new URL(item.bookingUrl).pathname === url.pathname);
  const detailSlug = currentPath.match(/^\/(?:majoitukset|en\/accommodations)\/([^/]+)$/)?.[1];
  return { kohde: property?.slug || detailSlug || "", destination_url: destination };
}