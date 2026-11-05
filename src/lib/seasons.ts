/** Peak-season quick searches shown under the homepage search bar. */
export type SeasonId = "christmas" | "newyear" | "ski8" | "ski9" | "ski10" | "easter";
export interface Season { id: SeasonId; year: number; start: string; end: string; label: { fi: string; en: string } }

const iso = (d: Date) => d.toISOString().slice(0, 10);
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));
const add = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

/** Monday of ISO week `w` in `year`. */
export function isoWeekMonday(year: number, w: number): Date {
  const jan4 = utc(year, 1, 4);
  const dow = (jan4.getUTCDay() + 6) % 7; // 0 = Monday
  return add(jan4, -dow + (w - 1) * 7);
}

/** Easter Sunday (Gregorian, anonymous algorithm). */
export function easterSunday(y: number): Date {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(y, month, day);
}

/** Ski holiday week N: Saturday before week N → Sunday of week N (8 nights max). */
export function skiWeek(year: number, w: number) {
  const mon = isoWeekMonday(year, w);
  return { start: iso(add(mon, -2)), end: iso(add(mon, 6)) };
}

/** Easter: Saturday a week before Easter Sunday → Easter Monday. */
export function easterRange(year: number) {
  const s = easterSunday(year);
  return { start: iso(add(s, -8)), end: iso(add(s, 1)) };
}

function seasonsOfWinter(y: number): Season[] {
  // Winter season y/y+1: Christmas & New Year in y, the rest in y+1.
  const n = y + 1;
  const ski = (w: 8 | 9 | 10): Season => ({
    id: `ski${w}` as SeasonId, year: n, ...skiWeek(n, w),
    label: { fi: `Hiihtoloma vko ${w}`, en: `Ski holiday week ${w}` },
  });
  return [
    { id: "christmas", year: y, start: `${y}-12-19`, end: `${y}-12-27`, label: { fi: "Joulu", en: "Christmas" } },
    { id: "newyear", year: y, start: `${y}-12-26`, end: `${n}-01-04`, label: { fi: "Uusivuosi", en: "New Year" } },
    ski(8), ski(9), ski(10),
    { id: "easter", year: n, ...easterRange(n), label: { fi: "Pääsiäinen", en: "Easter" } },
  ];
}

/** Upcoming seasons (not yet ended), soonest first. */
export function upcomingSeasons(today: string = iso(new Date())): Season[] {
  const y = Number(today.slice(0, 4));
  return [...seasonsOfWinter(y - 1), ...seasonsOfWinter(y)]
    .filter((s) => s.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 6);
}

export function formatRange(start: string, end: string): string {
  const f = (s: string) => `${Number(s.slice(8, 10))}.${Number(s.slice(5, 7))}.`;
  return `${f(start)}–${f(end)}`;
}

export function nightsBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}
