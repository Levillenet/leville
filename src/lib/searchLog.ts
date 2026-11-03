// Site's own search analytics (/event/haku* rows in page_views). Runs regardless of cookie
// consent: nothing is written to the device (haku_id and UTMs live in memory only) and the
// backend stores no IP or user agent. GA events are separate and stay consent-gated.

export type SearchRowType =
  | "haku" | "haku_ikkuna" | "haku_vaihtoehto_click" | "haku_whatsapp_click" | "haku_email_click" | "haku_kalenteri_click";
export type SearchTilanne = "vapaita" | "A" | "B" | "C" | "D" | "ei_tietoa" | "kesken";

export type SearchFields = {
  haku_id: string;
  saapuminen?: string; lahto?: string; oita?: number; aikuiset?: number; lapset?: number; henkiloita?: number;
  jousto?: number; kohde?: string; tulos_vapaita?: number | null; tilanne?: SearchTilanne;
  minimi_oita?: number; vaihtoehtoja?: number; valittu_saapuminen?: string; valittu_lahto?: string; siirto_pv?: number;
  kieli?: "fi" | "en";
  yhdistelma_naytetty?: boolean; yhdistelma_talo?: string; yhdistelma_kohteet?: string; yhdistelma_hinta?: number;
};

const UTM = ["utm_source", "utm_medium", "utm_campaign"] as const;
const landingUtm: Record<string, string> = {};
let memorySid = "";
if (typeof window !== "undefined") {
  const sp = new URLSearchParams(window.location.search);
  for (const k of UTM) { const v = sp.get(k); if (v) landingUtm[k] = v; }
}

/** Current URL first, then the landing URL (memory), then existing consented session data. */
export function searchUtm(search = typeof window !== "undefined" ? window.location.search : ""): Record<string, string | null> {
  const cur = new URLSearchParams(search);
  const out: Record<string, string | null> = {};
  for (const k of UTM) {
    let v = cur.get(k) || landingUtm[k] || null;
    if (!v) { try { v = sessionStorage.getItem(`_lv_${k}`); } catch { /* unavailable */ } }
    out[k] = v ? v.slice(0, 100) : null;
  }
  return out;
}

function sessionId(): string {
  try { const s = sessionStorage.getItem("_lv_sid"); if (s) return s; } catch { /* unavailable */ }
  if (!memorySid) memorySid = crypto.randomUUID();
  return memorySid;
}

export const newSearchId = (): string => crypto.randomUUID();

/** ei_hinnoiteltu (no prices yet) is reported as D. */
export const toTilanne = (s: string | null | undefined): SearchTilanne =>
  s === "A" || s === "B" || s === "C" ? s : s === "ei_hinnoiteltu" ? "D" : s === "vapaita" ? "vapaita" : "ei_tietoa";

export function buildSearchPayload(type: SearchRowType, fields: SearchFields, path: string, search: string) {
  const lang = path === "/en" || path.startsWith("/en/") ? "en" : "fi";
  return {
    path: `/event/${type}`,
    referrer: path, // events store their source page here, like booking events
    language: lang,
    device_type: typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop") : null,
    session_id: sessionId(),
    ...searchUtm(search),
    search: { kieli: lang, ...fields },
  };
}

const isSkippedHost = () => {
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h.includes("lovableproject.com") || h.startsWith("id-preview--");
};

/** Fire-and-forget keepalive POST; never delays or breaks navigation. */
export function logSearch(type: SearchRowType, fields: SearchFields): void {
  try {
    if (typeof window === "undefined" || isSkippedHost()) return;
    if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return;
    const body = JSON.stringify(buildSearchPayload(type, fields, window.location.pathname, window.location.search));
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-page-view`, {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
      body,
    }).catch(() => {});
  } catch { /* never break search */ }
}

/** Unload-safe variant: sendBeacon (text/plain, no preflight) with keepalive fetch fallback. */
export function beaconSearch(type: SearchRowType, fields: SearchFields): void {
  try {
    if (typeof window === "undefined" || isSkippedHost()) return;
    if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return;
    const body = JSON.stringify(buildSearchPayload(type, fields, window.location.pathname, window.location.search));
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-page-view`;
    if (navigator.sendBeacon?.(url, new Blob([body], { type: "text/plain;charset=UTF-8" }))) return;
    fetch(url, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain" }, body }).catch(() => {});
  } catch { /* never break search */ }
}
