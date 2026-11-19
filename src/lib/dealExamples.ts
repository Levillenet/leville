export interface ExampleCandidate { roomId: string; checkIn: string; nights: number }

/**
 * Spread marketing examples across arrival days within `horizonDays`:
 * round-robin one pick per day per round, longer stays first within a day,
 * max `perRoom` picks per room, sorted by date.
 */
export function pickSpreadExamples<T extends ExampleCandidate>(
  candidates: T[], todayIso: string, horizonDays = 14, limit = 12, perRoom = 2,
): T[] {
  const end = new Date(todayIso + "T00:00:00Z");
  end.setUTCDate(end.getUTCDate() + horizonDays);
  const endIso = end.toISOString().slice(0, 10);
  const byDay = new Map<string, T[]>();
  for (const c of candidates) {
    if (c.nights < 1 || c.checkIn < todayIso || c.checkIn > endIso) continue;
    (byDay.get(c.checkIn) ?? byDay.set(c.checkIn, []).get(c.checkIn)!).push(c);
  }
  const days = [...byDay.keys()].sort();
  for (const d of days) byDay.get(d)!.sort((a, b) => b.nights - a.nights);
  const used = new Map<string, number>();
  const picked: T[] = [];
  for (let round = 0; picked.length < limit; round++) {
    let any = false;
    for (const d of days) {
      if (picked.length >= limit) break;
      const list = byDay.get(d)!;
      // prefer rooms not yet used at all, then rooms under perRoom
      let idx = list.findIndex((c) => !used.has(c.roomId));
      if (idx < 0) idx = list.findIndex((c) => (used.get(c.roomId) ?? 0) < perRoom);
      if (idx < 0) continue;
      const [c] = list.splice(idx, 1);
      used.set(c.roomId, (used.get(c.roomId) ?? 0) + 1);
      picked.push(c);
      any = true;
    }
    if (!any) break;
  }
  return picked.sort((a, b) => a.checkIn.localeCompare(b.checkIn));
}
