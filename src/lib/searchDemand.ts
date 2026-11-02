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

export function buildDemand(rows: SearchRow[], nowMs: number, range: RangeFilter, guests: GuestFilter): WeekDemand[] {
  const since = range === "all" ? -Infinity : nowMs - range * DAY;
  const start = mondayOf(Date.UTC(new Date(nowMs).getUTCFullYear(), new Date(nowMs).getUTCMonth(), new Date(nowMs).getUTCDate()));
  const weeks = new Map<number, { total: number; free: number; lost: number; g: number[]; n: number[]; contacts: number }>();
  for (let i = 0; i < 52; i++) weeks.set(start + i * 7 * DAY, { total: 0, free: 0, lost: 0, g: [], n: [], contacts: 0 });
  const searchWeeks = new Map<string, number[]>();
  for (const r of rows) {
    if (r.t !== "haku" || !r.s || !r.l || Date.parse(r.at) < since || !guestMatch(r.h, guests)) continue;
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
