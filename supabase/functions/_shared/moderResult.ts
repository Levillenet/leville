// Reads Moder's api_query search HTML. Shared by check-availability and find-alternatives
// so both count free properties exactly the same way.

export type ModerResult = { available: number; minPrice: number | null; unpriced?: boolean; minStays?: number[] };

// "Saatavilla joustavina päivinä" means only other dates are free, so it never counts.
const FREE = /<span>\s*Saatavilla\s*<\/span>/;

/** Returns null when the response does not look like a search result page. */
export function analyzeResult(html: string): ModerResult | null {
  if (typeof html !== "string") return null;
  // Dates with no prices set yet: Moder returns only the empty grid div, no cards at all.
  // (A fully booked period still lists every property with a reason.)
  const bare = html.trim();
  if (bare.length < 400 && /^<div class="[^"]*\bgrid\b[^"]*">\s*<\/div>$/.test(bare)) {
    return { available: 0, minPrice: null, unpriced: true };
  }
  if (html.length < 200) return null;
  const cards = html.split(/room-card\b/).slice(1);
  let available = 0;
  let minPrice: number | null = null;
  const minStays: number[] = [];
  for (const card of cards) {
    if (!FREE.test(card)) {
      // "Kohde on varattava vähintään N vuorokaudeksi" = minimum stay; the card is not free.
      const ms = card.match(/vähintään\s+(\d+)\s+vuorokaudeksi/);
      if (ms) minStays.push(Number(ms[1]));
      continue;
    }
    available++;
    const m = card.match(/(\d[\d\s\u00a0.]*)\s*€/);
    const price = m ? Number(m[1].replace(/[^\d]/g, "")) : NaN;
    if (Number.isFinite(price) && price > 0 && (minPrice === null || price < minPrice)) minPrice = price;
  }
  // Unavailable cards use several reasons ("Kohde on varattu", "Ei varattavissa…",
  // "Checkin ei sallittu…", "Enintään N henkilöä", flexible-only); any of them marks a real result page.
  const resultLike = cards.length > 0 ||
    /Kohde on varattu|vuorokaudeksi|Ei varattavissa|Checkin ei sallittu|Enintään \d+ henkilöä|Saatavilla joustavina/.test(html);
  if (available === 0 && !resultLike) return null;
  return { available, minPrice, minStays };
}

/** Smallest minimum stay longer than the searched nights; 0 when none. */
export function minimumAbove(r: ModerResult | null, nights: number): number {
  const xs = (r?.minStays ?? []).filter((n) => n > nights);
  return xs.length ? Math.min(...xs) : 0;
}

export function moderQueryUrl(start: string, end: string, adults: number, children: number): string {
  return `https://app.moder.fi/levillenet?start=${start}&end=${end}&adults=${adults}&children=${children}&lang=fi&flexible_date_search=0&api_query=1`;
}

const CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { at: number; value: ModerResult | null }>();

/** One exact-date Moder query, 3 s timeout, 5 min cache (failures are not cached). */
export async function queryModer(start: string, end: string, adults: number, children: number): Promise<ModerResult | null> {
  const key = `${start}|${end}|${adults}|${children}`;
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && now - hit.at < CACHE_MS) return hit.value;
  let value: ModerResult | null = null;
  try {
    const res = await fetch(moderQueryUrl(start, end, adults, children), {
      headers: { "X-Requested-With": "XMLHttpRequest" }, signal: AbortSignal.timeout(3000),
    });
    if (res.ok) value = analyzeResult(await res.text());
  } catch { value = null; }
  if (value !== null) cache.set(key, { at: now, value });
  if (cache.size > 2000) for (const [k, v] of cache) if (now - v.at > CACHE_MS) cache.delete(k);
  return value;
}
