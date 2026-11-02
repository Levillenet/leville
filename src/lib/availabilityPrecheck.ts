// Pre-checks Moder availability for the hero search bar so an empty search can
// stay on leville.net. Any failure resolves to null, which means "navigate as now".

export type Selection = { start: string; end: string; adults: number; children: number; flex: number };
export type Fetcher = (s: Selection, signal: AbortSignal) => Promise<number | null>;

export const selectionKey = (s: Selection) => `${s.start}|${s.end}|${s.adults}|${s.children}|${s.flex}`;

export function createPrecheck(fetcher: Fetcher, debounceMs = 500) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let latestKey = "";
  let seq = 0;
  let controller: AbortController | undefined;
  let result: { key: string; value: number | null } | undefined;
  let waiters: Array<() => void> = [];
  const settle = () => { const w = waiters; waiters = []; w.forEach((f) => f()); };

  function update(s: Selection | null) {
    const key = s ? selectionKey(s) : "";
    if (key === latestKey) return;
    latestKey = key;
    clearTimeout(timer);
    controller?.abort();
    result = undefined;
    settle();
    if (!s) return;
    const my = ++seq;
    timer = setTimeout(async () => {
      controller = new AbortController();
      let value: number | null = null;
      try { value = await fetcher(s, controller.signal); } catch { value = null; }
      if (my !== seq) return; // stale response
      result = { key, value: typeof value === "number" && value >= 0 ? value : null };
      settle();
    }, debounceMs);
  }

  /** undefined = not ready yet (or different selection), else the latest result. */
  function get(key: string): number | null | undefined {
    return result && result.key === key ? result.value : undefined;
  }

  /** Waits up to maxMs for the result of `key`; resolves undefined on timeout or selection change. */
  function waitFor(key: string, maxMs = 1000): Promise<number | null | undefined> {
    const now = get(key);
    if (now !== undefined || key !== latestKey) return Promise.resolve(now);
    return new Promise((resolve) => {
      const t = setTimeout(() => resolve(undefined), maxMs);
      const check = () => {
        const v = get(key);
        if (v !== undefined || key !== latestKey) { clearTimeout(t); resolve(v); }
        else waiters.push(check);
      };
      waiters.push(check);
    });
  }

  return { update, get, waitFor };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const parts = (iso: string) => iso.split("-").map(Number);
export const fiDate = (iso: string) => { const [y, m, d] = parts(iso); return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`; };
export const enDate = (iso: string) => { const [y, m, d] = parts(iso); return `${d} ${MONTHS[m - 1]} ${y}`; };

export type Lang = "fi" | "en";
export type Offer = { start: string; end: string; adults: number; children: number };

export function offerMessage(o: Offer, lang: Lang): string {
  const total = o.adults + o.children;
  if (lang === "fi") {
    const kids = o.children > 0 ? ` (joista ${o.children} lasta)` : "";
    return `Hei! Etsimme majoitusta Leviltä ${fiDate(o.start)}–${fiDate(o.end)} ${total} hengelle${kids}. Voisitteko tehdä meille tarjouksen, jos sopiva kohde löytyy?`;
  }
  const kids = o.children > 0 ? ` (including ${o.children} children)` : "";
  return `Hi! We're looking for accommodation in Levi from ${enDate(o.start)} to ${enDate(o.end)} for ${total} guests${kids}. Could you send us an offer if you find a suitable place?`;
}

export function whatsappUrl(o: Offer, lang: Lang): string {
  return `https://wa.me/35844131313?text=${encodeURIComponent(offerMessage(o, lang))}`;
}

export function mailtoUrl(o: Offer, lang: Lang): string {
  const total = o.adults + o.children;
  const subject = lang === "fi"
    ? `Tarjouspyyntö ${fiDate(o.start)}–${fiDate(o.end)}, ${total} hlö`
    : `Offer request ${enDate(o.start)} – ${enDate(o.end)}, ${total} guests`;
  return `mailto:info@leville.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(offerMessage(o, lang))}`;
}

/** Moder search URL with the widget's own "± 3 days" value (flexible_date_search=3, verified from the widget). */
export function nearestDatesUrl(o: Offer, lang: Lang): string {
  return `https://app.moder.fi/levillenet?start=${o.start}&end=${o.end}&adults=${o.adults}&children=${o.children}&lang=${lang}&flexible_date_search=3`;
}

export async function fetchAvailability(s: Selection, signal: AbortSignal): Promise<number | null> {
  const project = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!project || !key) return null;
  const timeout = setTimeout(() => (signal as AbortSignal & { _c?: AbortController })._c?.abort(), 0);
  clearTimeout(timeout);
  const res = await fetch(`https://${project}.supabase.co/functions/v1/check-availability`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify(s),
    signal: AbortSignal.any ? AbortSignal.any([signal, AbortSignal.timeout(4000)]) : signal,
  });
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data?.available === "number" ? data.available : null;
}
