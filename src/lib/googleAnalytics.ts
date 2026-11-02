import { hasConsent } from "./cookieConsent";

export const GA_MEASUREMENT_ID = "G-4RSJCSBRRC";
export const GA_CONFIG = {
  linker: { domains: ["leville.net", "app.moder.fi"] },
  send_page_view: true,
};
type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  "ga-disable-G-4RSJCSBRRC"?: boolean;
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
export function trackGoogleEvent(name: "varaa_click" | "tarjouspyynto_click" | "haku_ei_tuloksia" | "tarjous_whatsapp_click" | "tarjous_email_click" | "lahimmat_paivat_click", params: Record<string, string> = {}) {
  if (!syncGoogleAnalytics()) return;
  (window as AnalyticsWindow).gtag?.("event", name, { ...params, send_to: GA_MEASUREMENT_ID });
}
export function bookingClickParams(destination: string, properties: { bookingUrl: string; slug: string }[], currentPath: string) {
  const url = new URL(destination);
  const property = properties.find((item) => new URL(item.bookingUrl).pathname === url.pathname);
  const detailSlug = currentPath.match(/^\/(?:majoitukset|en\/accommodations)\/([^/]+)$/)?.[1];
  return { kohde: property?.slug || detailSlug || "", destination_url: destination };
}
export type SearchEventParams = {
  saapuminen: string; lahto: string; oita: number; aikuiset: number; lapset: number;
  henkiloita: number; viikko: string; kohde: string; lahde_sivu: string;
};
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const utc = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y, m - 1, d); };

export function isoWeek(iso: string): string {
  const date = new Date(utc(iso));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const year = date.getUTCFullYear();
  const week = Math.ceil(((date.getTime() - Date.UTC(year, 0, 1)) / 86400000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

/** Leville slug of a property detail page, else the slug mapped from the Moder link, else Moder's number, else "kaikki". */
export function searchEventParams(destination: string, currentPath: string, properties: { bookingUrl: string; slug: string }[] = []): SearchEventParams | null {
  let url: URL;
  try { url = new URL(destination); } catch { return null; }
  if (url.hostname !== "app.moder.fi") return null;
  const start = url.searchParams.get("start") || "", end = url.searchParams.get("end") || "";
  if (!DATE.test(start) || !DATE.test(end) || Number.isNaN(utc(start)) || Number.isNaN(utc(end))) return null;
  const oita = Math.round((utc(end) - utc(start)) / 86400000);
  if (oita <= 0) return null;
  const int = (v: string | null) => { const n = parseInt(v || "0", 10); return Number.isFinite(n) && n > 0 ? n : 0; };
  const aikuiset = int(url.searchParams.get("adults")), lapset = int(url.searchParams.get("children"));
  const detailSlug = currentPath.match(/^\/(?:majoitukset|en\/accommodations)\/([^/]+)$/)?.[1];
  const mapped = properties.find((p) => { try { return new URL(p.bookingUrl).pathname === url.pathname; } catch { return false; } })?.slug;
  const moderNumber = url.pathname.split("/").filter(Boolean)[1];
  return {
    saapuminen: start, lahto: end, oita, aikuiset, lapset, henkiloita: aikuiset + lapset,
    viikko: isoWeek(start), kohde: detailSlug || mapped || moderNumber || "kaikki", lahde_sivu: currentPath,
  };
}

let lastSearchKey = "";
let lastSearchAt = 0;
/** Sends majoitushaku once per search and calls go() on event_callback or after 150 ms. Returns false (nothing sent, go not called) without consent or for a duplicate. */
export function trackSearchThenNavigate(params: SearchEventParams, go?: () => void, now = Date.now()): boolean {
  const key = JSON.stringify(params);
  if (key === lastSearchKey && now - lastSearchAt < 2000) return false;
  const win = window as AnalyticsWindow;
  if (!hasConsent("analytics") || !syncGoogleAnalytics() || !win.gtag) return false;
  lastSearchKey = key; lastSearchAt = now;
  let done = false;
  const finish = () => { if (done) return; done = true; go?.(); };
  win.gtag("event", "majoitushaku", { ...params, send_to: GA_MEASUREMENT_ID, event_callback: finish });
  setTimeout(finish, 150);
  return true;
}
