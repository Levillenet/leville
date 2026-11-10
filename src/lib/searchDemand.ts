// Pure aggregation for the admin search summary and "Kysyntä tuleville ajankohdille" view.
export type SearchRow = {
  t: string; at: string; id: string | null; s: string | null; l: string | null;
  n: number | null; h: number | null; ti: string | null;
};
export type GuestFilter = "all" | "1-2" | "3-4" | "5-7" | "8+";
export type RangeFilter = 7 | 30 | 90 | "all";

const DAY = 86400000;
const utc = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y, m - 1, d); };
const mondayOf = (ms: number) => { const wd = new Date(ms).getUTCDay() || 7; return ms - (wd - 1) * DAY; };

export function isoWeekNumber(ms: number): number {
  const d = new Date(ms);
  const wd = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - wd);
  const y = d.getUTCFullYear();
  return Math.ceil(((d.getTime() - Date.UTC(y, 0, 1)) / DAY + 1) / 7);
}

/** Monday (UTC ms) of each ISO week the nights saapuminen … lahto−1 touch, each week once. */
export function stayWeeks(s: string, l: string): number[] {
  const a = utc(s), b = utc(l);
  if (!(b > a)) return [];
  const out: number[] = [];
  for (let d = a; d < b; d += DAY) { const m = mondayOf(d); if (out[out.length - 1] !== m) out.push(m); }
  return out;
}

export function weekLabel(monday: number): string {
  const f = (ms: number) => { const d = new Date(ms); return `${d.getUTCDate()}.${d.getUTCMonth() + 1}.`; };
  return `vko ${isoWeekNumber(monday)} (${f(monday)}–${f(monday + 6 * DAY)})`;
}

export const guestMatch = (h: number | null, g: GuestFilter) =>
  g === "all" || (h != null && (g === "1-2" ? h <= 2 : g === "3-4" ? h >= 3 && h <= 4 : g === "5-7" ? h >= 5 && h <= 7 : h >= 8));

const mode = (xs: number[]) => {
  const c = new Map<number, number>(); let best: number | null = null, bc = 0;
  for (const x of xs) { const v = (c.get(x) || 0) + 1; c.set(x, v); if (v > bc) { bc = v; best = x; } }
  return best;
};

export type WeekDemand = {
  monday: number; label: string; total: number; free: number; lost: number;
  avgGuests: number | null; commonNights: number | null; contacts: number;
};

/** Searches longer than this many nights are treated as calendar mis-clicks in weekly demand. */
export const MAX_PLAUSIBLE_NIGHTS = 30;
export const isImplausibleStay = (s: string, l: string) => (utc(l) - utc(s)) / DAY > MAX_PLAUSIBLE_NIGHTS;

export function countImplausible(rows: SearchRow[], nowMs: number, range: RangeFilter, guests: GuestFilter): number {
  const since = range === "all" ? -Infinity : nowMs - range * DAY;
  return rows.filter((r) => r.t === "haku" && r.s && r.l && Date.parse(r.at) >= since && guestMatch(r.h, guests) && isImplausibleStay(r.s, r.l)).length;
}


export function buildDemand(rows: SearchRow[], nowMs: number, range: RangeFilter, guests: GuestFilter): WeekDemand[] {
  const since = range === "all" ? -Infinity : nowMs - range * DAY;
  const start = mondayOf(Date.UTC(new Date(nowMs).getUTCFullYear(), new Date(nowMs).getUTCMonth(), new Date(nowMs).getUTCDate()));
  const weeks = new Map<number, { total: number; free: number; lost: number; g: number[]; n: number[]; contacts: number }>();
  for (let i = 0; i < 52; i++) weeks.set(start + i * 7 * DAY, { total: 0, free: 0, lost: 0, g: [], n: [], contacts: 0 });
  const searchWeeks = new Map<string, number[]>();
  for (const r of rows) {
    if (r.t !== "haku" || !r.s || !r.l || Date.parse(r.at) < since || !guestMatch(r.h, guests)) continue;
    if (isImplausibleStay(r.s, r.l)) continue;
    const ws = stayWeeks(r.s, r.l);
    if (r.id) searchWeeks.set(r.id, ws);
    for (const m of ws) {
      const w = weeks.get(m); if (!w) continue;
      w.total++;
      if (r.ti === "vapaita") w.free++; else if (r.ti && r.ti !== "ei_tietoa" && r.ti !== "kesken") w.lost++;
      if (r.h != null) w.g.push(r.h);
      if (r.n != null) w.n.push(r.n);
    }
  }
  for (const r of rows) {
    if ((r.t !== "haku_whatsapp_click" && r.t !== "haku_email_click") || !r.id) continue;
    for (const m of searchWeeks.get(r.id) || []) { const w = weeks.get(m); if (w) w.contacts++; }
  }
  return [...weeks.entries()].map(([monday, w]) => ({
    monday, label: weekLabel(monday), total: w.total, free: w.free, lost: w.lost,
    avgGuests: w.g.length ? Math.round((w.g.reduce((a, b) => a + b, 0) / w.g.length) * 10) / 10 : null,
    commonNights: mode(w.n), contacts: w.contacts,
  }));
}

export function topWeeks(d: WeekDemand[], n = 10): WeekDemand[] {
  return d.filter((w) => w.total > 0).sort((a, b) => b.total - a.total || a.monday - b.monday).slice(0, n);
}

export type SearchSummary = {
  total: number; byDay: { date: string; count: number }[]; tilanne: Record<string, number>;
  avgGuests: number | null; avgNights: number | null; windows: number;
  clickShare: { vaihtoehto: number; whatsapp: number; email: number; kalenteri: number };
};

export function summarize(rows: SearchRow[], sinceMs: number): SearchSummary {
  const inRange = rows.filter((r) => Date.parse(r.at) >= sinceMs);
  const searches = inRange.filter((r) => r.t === "haku");
  const byDay: Record<string, number> = {};
  const tilanne: Record<string, number> = { vapaita: 0, A: 0, B: 0, C: 0, D: 0, ei_tietoa: 0, kesken: 0 };
  for (const r of searches) {
    const d = r.at.slice(0, 10); byDay[d] = (byDay[d] || 0) + 1;
    tilanne[r.ti || "ei_tietoa"] = (tilanne[r.ti || "ei_tietoa"] || 0) + 1;
  }
  const avg = (xs: number[]) => (xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10 : null);
  const windowIds = new Set(inRange.filter((r) => r.t === "haku_ikkuna").map((r) => r.id));
  const share = (t: string) => {
    if (!windowIds.size) return 0;
    const ids = new Set(inRange.filter((r) => r.t === t && windowIds.has(r.id)).map((r) => r.id));
    return Math.round((ids.size / windowIds.size) * 1000) / 10;
  };
  return {
    total: searches.length,
    byDay: Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count })),
    tilanne,
    avgGuests: avg(searches.flatMap((r) => (r.h != null ? [r.h] : []))),
    avgNights: avg(searches.flatMap((r) => (r.n != null ? [r.n] : []))),
    windows: windowIds.size,
    clickShare: { vaihtoehto: share("haku_vaihtoehto_click"), whatsapp: share("haku_whatsapp_click"), email: share("haku_email_click"), kalenteri: share("haku_kalenteri_click") },
  };
}

export type ContactClick = { at: string; channel: "whatsapp" | "email"; s: string | null; l: string | null; h: number | null };

/** Contact-button presses (newest first), each once, with the dates of the search they came from. */
export function recentContacts(rows: SearchRow[], n = 20): ContactClick[] {
  const searches = new Map<string, SearchRow>();
  for (const r of rows) if (r.t === "haku" && r.id) searches.set(r.id, r);
  return rows
    .filter((r) => r.t === "haku_whatsapp_click" || r.t === "haku_email_click")
    .map((r) => {
      const s = (r.id && searches.get(r.id)) || r;
      return { at: r.at, channel: r.t === "haku_whatsapp_click" ? "whatsapp" as const : "email" as const, s: s.s, l: s.l, h: s.h };
    })
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, n);
}

// ---------- Day-level trends (Helsinki calendar days) ----------
const hkiFmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Helsinki", year: "numeric", month: "2-digit", day: "2-digit" });
/** Helsinki calendar day of a timestamp as "YYYY-MM-DD". */
export const helsinkiDay = (ms: number) => hkiFmt.format(new Date(ms));
/** Day keys oldest → newest, ending with today's Helsinki day. */
export function lastDays(nowMs: number, days: number): string[] {
  const today = utc(helsinkiDay(nowMs));
  return Array.from({ length: days }, (_, i) => new Date(today - (days - 1 - i) * DAY).toISOString().slice(0, 10));
}

const countable = (r: SearchRow, guests: GuestFilter) =>
  r.t === "haku" && !!r.s && !!r.l && guestMatch(r.h, guests) && !isImplausibleStay(r.s, r.l);

export type WeekTrend = {
  daily: number[]; today: number; yesterday: number;
  recentAvg: number; prevAvg: number; changePct: number | null; enough: boolean;
};
/** Minimum searches in the 10-day comparison window before an up/down arrow is shown. */
export const MIN_TREND_SEARCHES = 3;

/** Per stay-week: daily searches for the last 14 days; last 3 days' average vs the 7 days before. */
export function weekTrend(rows: SearchRow[], nowMs: number, guests: GuestFilter): Map<number, WeekTrend> {
  const keys = lastDays(nowMs, 14);
  const idx = new Map(keys.map((k, i) => [k, i]));
  const counts = new Map<number, number[]>();
  for (const r of rows) {
    if (!countable(r, guests)) continue;
    const i = idx.get(helsinkiDay(Date.parse(r.at)));
    if (i == null) continue;
    for (const m of stayWeeks(r.s!, r.l!)) {
      let a = counts.get(m); if (!a) { a = new Array(14).fill(0); counts.set(m, a); }
      a[i]++;
    }
  }
  const out = new Map<number, WeekTrend>();
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  for (const [m, d] of counts) {
    const r3 = sum(d.slice(11, 14)), p7 = sum(d.slice(4, 11));
    const recentAvg = Math.round((r3 / 3) * 10) / 10, prevAvg = Math.round((p7 / 7) * 10) / 10;
    const enough = r3 + p7 >= MIN_TREND_SEARCHES;
    const changePct = enough && p7 > 0 ? Math.round(((r3 / 3 - p7 / 7) / (p7 / 7)) * 100) : null;
    out.set(m, { daily: d, today: d[13], yesterday: d[12], recentAvg, prevAvg, changePct, enough });
  }
  return out;
}

/** Trend score for "heating up now" sorting: new demand ranks by recent average. */
export const trendScore = (t: WeekTrend | undefined) =>
  !t || !t.enough ? -Infinity : t.changePct ?? 1000 + t.recentAvg;

export type DailyPoint = { date: string; count: number; avg7: number };
/** Daily searches (optionally only those touching one stay-week) with a trailing 7-day average. */
export function dailySeries(rows: SearchRow[], weekMonday: number | null, days: number, nowMs: number, guests: GuestFilter): DailyPoint[] {
  const keys = lastDays(nowMs, days + 6);
  const idx = new Map(keys.map((k, i) => [k, i]));
  const c = new Array(keys.length).fill(0);
  for (const r of rows) {
    if (!countable(r, guests)) continue;
    if (weekMonday != null && !stayWeeks(r.s!, r.l!).includes(weekMonday)) continue;
    const i = idx.get(helsinkiDay(Date.parse(r.at)));
    if (i != null) c[i]++;
  }
  return keys.slice(6).map((date, j) => {
    const w = c.slice(j, j + 7);
    return { date, count: c[j + 6], avg7: Math.round((w.reduce((a, b) => a + b, 0) / 7) * 10) / 10 };
  });
}
