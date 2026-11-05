export interface Day { date: string; isFree: boolean; minNights: number; checkinDenied: boolean; checkoutDenied: boolean }

const addDays = (s: string, n: number) => {
  const d = new Date(s + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const nights = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

/**
 * Longest sellable stay inside every free run between start and end (end = last
 * allowed departure). Respects arrival/departure bans and the arrival night's minimum stay.
 */
export function sellableStays(days: Day[], start: string, end: string, maxNights = 7): { checkIn: string; checkOut: string; nights: number }[] {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const out: { checkIn: string; checkOut: string; nights: number }[] = [];
  let run: string[] = [];
  const close = () => {
    if (run.length) {
      const departures = run.map((d) => addDays(d, 1)).filter((d) => !byDate.get(d)?.checkoutDenied);
      let best: { checkIn: string; checkOut: string; nights: number } | null = null;
      for (const a of run) {
        const day = byDate.get(a)!;
        if (day.checkinDenied) continue;
        for (let i = departures.length - 1; i >= 0; i--) {
          const dep = departures[i];
          const n = nights(a, dep);
          if (n > maxNights) continue;
          if (n < Math.max(1, day.minNights)) break;
          if (!best || n > best.nights) best = { checkIn: a, checkOut: dep, nights: n };
          break;
        }
      }
      if (best) out.push(best);
    }
    run = [];
  };
  for (let d = start; d < end; d = addDays(d, 1)) {
    const day = byDate.get(d);
    if (day?.isFree) run.push(d);
    else close();
  }
  close();
  return out;
}

/** A fixed sub-period (e.g. Easter Thu–Mon) if every night is free and it is sellable. */
export function fixedStay(days: Day[], checkIn: string, checkOut: string) {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const first = byDate.get(checkIn);
  const n = nights(checkIn, checkOut);
  if (!first || first.checkinDenied || byDate.get(checkOut)?.checkoutDenied || n < first.minNights) return null;
  for (let d = checkIn; d < checkOut; d = addDays(d, 1)) if (!byDate.get(d)?.isFree) return null;
  return { checkIn, checkOut, nights: n };
}
