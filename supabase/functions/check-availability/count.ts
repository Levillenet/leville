import { analyzeResult } from "../_shared/moderResult.ts";

/** Free properties on exact dates; null when the response is not a result page. */
export function countAvailable(html: string): number | null {
  return analyzeResult(html)?.available ?? null;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
export type Query = { start: string; end: string; adults: number; children: number; flex: number };

export function parseQuery(input: Record<string, unknown>): Query | null {
  const start = String(input.start ?? ""), end = String(input.end ?? "");
  if (!DATE.test(start) || !DATE.test(end)) return null;
  const s = Date.parse(start + "T00:00:00Z"), e = Date.parse(end + "T00:00:00Z");
  if (!Number.isFinite(s) || !Number.isFinite(e) || e <= s || e - s > 60 * 86400000) return null;
  const int = (v: unknown, min: number, max: number) => {
    const n = Number(v ?? 0);
    return Number.isInteger(n) && n >= min && n <= max ? n : null;
  };
  const adults = int(input.adults, 1, 30), children = int(input.children, 0, 30);
  const flex = int(input.flex ?? 0, 0, 7);
  if (adults === null || children === null || flex === null) return null;
  return { start, end, adults, children, flex };
}
