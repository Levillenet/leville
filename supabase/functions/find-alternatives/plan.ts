// Candidate periods and ordering for the empty-search rescue. Never offers shorter stays.

export type Period = { start: string; end: string; nights: number; shift: number };
export type Found = Period & { available: number; minPrice: number | null };
export type Input = { start: string; end: string; adults: number; children: number };

const DAY = 86400000;
const toMs = (iso: string) => Date.parse(iso + "T00:00:00Z");
export const addDays = (iso: string, n: number) => new Date(toMs(iso) + n * DAY).toISOString().slice(0, 10);
export const nightsOf = (s: string, e: string) => Math.round((toMs(e) - toMs(s)) / DAY);

const period = (orig: string, start: string, nights: number): Period =>
  ({ start, end: addDays(start, nights), nights, shift: nightsOf(orig, start) });

/** Phase 1: same length shifted −7…+7, plus the Sat–Sat week containing the arrival day. */
export function phase1(i: Input, today: string): Period[] {
  const n = nightsOf(i.start, i.end);
  const out: Period[] = [];
  for (let d = -7; d <= 7; d++) {
    if (d === 0) continue;
    const s = addDays(i.start, d);
    if (s >= today) out.push(period(i.start, s, n));
  }
  const dow = new Date(toMs(i.start)).getUTCDay(); // 6 = Saturday
  const sat = addDays(i.start, -((dow + 1) % 7));
  const week = period(i.start, sat, 7);
  const dup = out.some((p) => p.start === week.start && p.end === week.end) || (week.start === i.start && week.end === i.end);
  if (week.nights >= n && week.start >= today && !dup) out.push(week);
  return out;
}

/** Phase 2 for one longer length: arrivals −3…+3 around the original. */
export function phase2(i: Input, nights: number, today: string): Period[] {
  const out: Period[] = [];
  for (let d = -3; d <= 3; d++) {
    const s = addDays(i.start, d);
    if (s >= today) out.push(period(i.start, s, nights));
  }
  return out;
}

/** Same length first, then shortest longer length; nearest arrival; more free first. Max 3. */
export function pickTop(found: Found[], origNights: number): Found[] {
  return found
    .filter((f) => f.available > 0 && f.nights >= origNights)
    .sort((a, b) =>
      Number(a.nights !== origNights) - Number(b.nights !== origNights) ||
      a.nights - b.nights ||
      Math.abs(a.shift) - Math.abs(b.shift) ||
      b.available - a.available ||
      a.shift - b.shift)
    .slice(0, 3);
}

export async function pool<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const k = next++; out[k] = await fn(items[k]); }
  }));
  return out;
}

export type Query = (p: Period) => Promise<{ available: number; minPrice: number | null; minStays?: number[] } | null>;

const minAbove = (xs: number[] | undefined, n: number) => {
  const m = (xs ?? []).filter((x) => x > n);
  return m.length ? Math.min(...m) : 0;
};

export async function findAlternatives(i: Input, today: string, query: Query): Promise<{ alternatives: Found[]; minimi_oita: number }> {
  const n = nightsOf(i.start, i.end);
  const run = async (ps: Period[]) => (await pool(ps, 5, async (p) => {
    const r = await query(p);
    return r && r.available > 0 ? { ...p, ...r } : null;
  })).filter((x): x is Found => x !== null);

  // Minimum stay longer than the search: tell it first; rows = same arrival at the minimum,
  // then the searched length shifted −7…+7, nearest arrival first. Max 3.
  const orig = await query({ start: i.start, end: i.end, nights: n, shift: 0 });
  const min = minAbove(orig?.minStays, n);
  if (min > 0) {
    const shifted = phase1(i, today).filter((p) => p.nights === n);
    const [same, ...rest] = await run([period(i.start, i.start, min), ...shifted]);
    const a = same && same.start === i.start && same.nights === min ? [same] : [];
    const b = (a.length ? rest : [same, ...rest]).filter((f) => f && f.nights === n)
      .sort((x, y) => Math.abs(x.shift) - Math.abs(y.shift) || x.shift - y.shift);
    return { alternatives: [...a, ...b].slice(0, 3), minimi_oita: min };
  }

  const first = await run(phase1(i, today));
  if (first.length) return { alternatives: pickTop(first, n), minimi_oita: 0 };
  for (let len = n + 1; len <= 7; len++) {
    const hits = await run(phase2(i, len, today));
    if (hits.length) return { alternatives: pickTop(hits, n), minimi_oita: 0 };
  }
  return { alternatives: [], minimi_oita: 0 };
}
