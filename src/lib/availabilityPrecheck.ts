// Pre-checks Moder availability for the hero search bar so an empty search can
// stay on leville.net. Any failure resolves to null, which means "navigate as now".

export type Selection = { start: string; end: string; adults: number; children: number; flex: number };
/** Pre-check value for dates Moder has no prices for yet (empty list, not fully booked). */
export const UNPRICED = -1;
export type Fetcher = (s: Selection, signal: AbortSignal) => Promise<number | null>;

// Flex is not part of the key: the pre-check always asks Moder for the exact dates.
export const selectionKey = (s: Selection) => `${s.start}|${s.end}|${s.adults}|${s.children}`;

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
      result = { key, value: typeof value === "number" && value >= UNPRICED ? value : null };
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

export type Situation = "A" | "B" | "C" | "ei_hinnoiteltu";
const nightsBetween = (a: string, b: string) => Math.round((Date.UTC(...ymd(b)) - Date.UTC(...ymd(a))) / 86400000);
const ymd = (iso: string): [number, number, number] => { const [y, m, d] = parts(iso); return [y, m - 1, d]; };

/** Ready-made offer message. "B" = the customer wants a shorter stay than is bookable. */
export function offerMessage(o: Offer, lang: Lang, situation: Situation = "A"): string {
  const total = o.adults + o.children;
  const n = nightsBetween(o.start, o.end);
  if (lang === "fi") {
    const kids = o.children > 0 ? ` (joista ${o.children} lasta)` : "";
    if (situation === "ei_hinnoiteltu") return `Hei! Olemme kiinnostuneita majoituksesta Leviltä ${fiDate(o.start)}–${fiDate(o.end)} ${total} hengelle${kids}. Voisitteko tehdä meille tarjouksen?`;
    if (situation === "B") return `Hei! Toivoisimme majoitusta Leviltä ${fiDate(o.start)}–${fiDate(o.end)} (${n} yötä) ${total} hengelle${kids}. Voisitteko tarkistaa, onnistuuko lyhyempi jakso, ja tehdä meille tarjouksen?`;
    return `Hei! Etsimme majoitusta Leviltä ${fiDate(o.start)}–${fiDate(o.end)} ${total} hengelle${kids}. Voisitteko tehdä meille tarjouksen, jos sopiva kohde löytyy?`;
  }
  const kids = o.children > 0 ? ` (including ${o.children} children)` : "";
  if (situation === "ei_hinnoiteltu") return `Hi! We're interested in staying in Levi from ${enDate(o.start)} to ${enDate(o.end)}, ${total} guests${kids}. Could you send us an offer?`;
  if (situation === "B") return `Hi! We'd like to stay in Levi from ${enDate(o.start)} to ${enDate(o.end)} (${n} nights), ${total} guests${kids}. Could you check whether a shorter stay is possible and send us an offer?`;
  return `Hi! We're looking for accommodation in Levi from ${enDate(o.start)} to ${enDate(o.end)} for ${total} guests${kids}. Could you send us an offer if you find a suitable place?`;
}

export function whatsappUrl(o: Offer, lang: Lang, situation: Situation = "A"): string {
  return `https://wa.me/35844131313?text=${encodeURIComponent(offerMessage(o, lang, situation))}`;
}

export function mailtoUrl(o: Offer, lang: Lang, situation: Situation = "A"): string {
  const total = o.adults + o.children;
  const subject = lang === "fi"
    ? `Tarjouspyyntö ${fiDate(o.start)}–${fiDate(o.end)}, ${total} hlö`
    : `Offer request ${enDate(o.start)} – ${enDate(o.end)}, ${total} guests`;
  return `mailto:info@leville.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(offerMessage(o, lang, situation))}`;
}

/** Moder search page for the given dates and guests. */
export function moderSearchUrl(o: Offer, lang: Lang, flex = 0): string {
  return `https://app.moder.fi/levillenet?start=${o.start}&end=${o.end}&adults=${o.adults}&children=${o.children}&lang=${lang}&flexible_date_search=${flex}`;
}

export type Alternative = { start: string; end: string; nights: number; shift: number; available: number; minPrice: number | null };
export type Alternatives = { alternatives: Alternative[]; minimi_oita: number };

const FI_DAYS = ["su", "ma", "ti", "ke", "to", "pe", "la"];
const EN_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EN_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dow = (iso: string) => new Date(Date.UTC(...ymd(iso))).getUTCDay();
const groupDigits = (n: number, sep: string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);

/** "la 26.12. – la 2.1. (7 yötä): 3 kohdetta, alkaen 2 583 €" / "Sat 26 Dec – Sat 2 Jan (7 nights): 3 properties, from €2,583" */
export function periodLabel(a: Alternative, lang: Lang): string {
  if (lang === "fi") {
    const d = (iso: string) => { const [, m, day] = parts(iso); return `${FI_DAYS[dow(iso)]} ${day}.${m}.`; };
    const price = a.minPrice ? `, alkaen ${groupDigits(a.minPrice, " ")} €` : "";
    return `${d(a.start)} – ${d(a.end)} (${a.nights} ${a.nights === 1 ? "yö" : "yötä"}): ${a.available} ${a.available === 1 ? "kohde" : "kohdetta"}${price}`;
  }
  const d = (iso: string) => { const [, m, day] = parts(iso); return `${EN_DAYS[dow(iso)]} ${day} ${EN_MON[m - 1]}`; };
  const price = a.minPrice ? `, from €${groupDigits(a.minPrice, ",")}` : "";
  return `${d(a.start)} – ${d(a.end)} (${a.nights} ${a.nights === 1 ? "night" : "nights"}): ${a.available} ${a.available === 1 ? "property" : "properties"}${price}`;
}

export const situationOf = (r: Alternatives | null): Situation =>
  !r || r.alternatives.length === 0 ? "C" : r.minimi_oita > 0 ? "B" : "A";

async function callFunction<T>(name: string, body: unknown, signal: AbortSignal, ms: number): Promise<T | null> {
  const project = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!project || !key) return null;
  const res = await fetch(`https://${project}.supabase.co/functions/v1/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    signal: AbortSignal.any ? AbortSignal.any([signal, AbortSignal.timeout(ms)]) : signal,
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export async function fetchAlternatives(o: Offer): Promise<Alternatives | null> {
  try {
    const d = await callFunction<Alternatives>("find-alternatives", o, new AbortController().signal, 15000);
    return d && Array.isArray(d.alternatives) ? { alternatives: d.alternatives.slice(0, 3), minimi_oita: Number(d.minimi_oita) || 0 } : null;
  } catch { return null; }
}

export async function fetchAvailability(s: Selection, signal: AbortSignal): Promise<number | null> {
  const data = await callFunction<{ available?: unknown; ei_hinnoiteltu?: unknown }>("check-availability",
    { start: s.start, end: s.end, adults: s.adults, children: s.children, flex: 0 }, signal, 4000);
  if (data?.ei_hinnoiteltu === true && data.available === 0) return UNPRICED;
  return typeof data?.available === "number" ? data.available : null;
}
