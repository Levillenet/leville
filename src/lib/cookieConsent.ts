export const CONSENT_KEY = "lv_cookie_consent";
export const CONSENT_VERSION = "2026-11-01";
export const CONSENT_NOTICE = {
  fi: "Käytämme evästeitä kävijämittaukseen ja mainonnan tuloksellisuuden seurantaan.",
  en: "We use cookies to measure website visits and the effectiveness of advertising.",
};
export interface ConsentRecord {
  version: string;
  visitorId: string;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  expiresAt: string;
  language: "fi" | "en";
  region: "explicit-worldwide";
  notice: string;
  recipients: string[];
  purposes: string[];
}
type ConsentWindow = Window & { gtag?: (...args: unknown[]) => void };
export function consentExpiry(now: Date): Date {
  const next = new Date(now);
  next.setUTCFullYear(next.getUTCFullYear() + 1);
  if (next.getUTCMonth() !== now.getUTCMonth()) next.setUTCDate(0);
  return next;
}
export function validConsent(value: unknown, now = new Date()): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as ConsentRecord;
  return record.version === CONSENT_VERSION && typeof record.analytics === "boolean" &&
    typeof record.marketing === "boolean" && typeof record.visitorId === "string" &&
    Date.parse(record.expiresAt) > now.getTime();
}
export function readConsent(): ConsentRecord | null {
  try {
    const record: unknown = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    return validConsent(record) ? record : null;
  } catch { return null; }
}
export function hasConsent(category: "analytics" | "marketing"): boolean {
  return readConsent()?.[category] === true;
}
export function googleConsent(analytics: boolean, marketing: boolean) {
  return {
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
    functionality_storage: "denied", personalization_storage: "denied", security_storage: "granted",
  };
}
function applyConsent() {
  const record = readConsent();
  (window as ConsentWindow).gtag?.("consent", "update", googleConsent(record?.analytics === true, record?.marketing === true));
  if (!record?.analytics) {
    try { sessionStorage.removeItem("_lv_sid"); sessionStorage.removeItem("session_id"); } catch { /* unavailable */ }
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!name.startsWith("_ga")) continue;
      for (const domain of ["", window.location.hostname, ".leville.net"]) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
      }
    }
  }
  if (!record?.marketing) {
    try {
      for (const key of ["utm_source", "utm_medium", "utm_campaign"]) sessionStorage.removeItem(`_lv_${key}`);
    } catch { /* unavailable */ }
  }
  window.dispatchEvent(new Event("lv-consent-change"));
}
export function saveConsent(analytics: boolean, marketing: boolean, language: "fi" | "en") {
  const now = new Date();
  const record: ConsentRecord = {
    version: CONSENT_VERSION, visitorId: readConsent()?.visitorId || crypto.randomUUID(),
    analytics, marketing, language, timestamp: now.toISOString(), expiresAt: consentExpiry(now).toISOString(),
    region: "explicit-worldwide", notice: CONSENT_NOTICE[language],
    recipients: ["Leville.net", "Google (when configured)", "Moder (campaign parameters)"],
    purposes: ["visitor measurement", "advertising effectiveness and personalization"],
  };
  try {
    const history = JSON.parse(localStorage.getItem("lv_consent_history") || "[]");
    localStorage.setItem("lv_consent_history", JSON.stringify([...(Array.isArray(history) ? history : []), record]));
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch { /* Unavailable storage remains denied on the next visit. */ }
  applyConsent();
}
export function openCookieSettings() { window.dispatchEvent(new Event("lv-cookie-settings")); }
export function initializeConsent() {
  applyConsent();
  window.addEventListener("storage", (event) => { if (event.key === CONSENT_KEY || event.key === null) applyConsent(); });
  window.setInterval(() => {
    if (!readConsent()) applyConsent();
  }, 60000);
}