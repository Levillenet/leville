import { test, expect } from "bun:test";
import { weekTrend, dailySeries, trendScore, type SearchRow } from "../src/lib/searchDemand";
const now = Date.parse("2026-11-10T10:00:00Z");
const wk8 = Date.UTC(2027, 1, 22); // Monday of ISO week 8, 2027
const at = (daysAgo: number) => new Date(now - daysAgo * 86400000).toISOString();
const row = (daysAgo: number): SearchRow => ({ t: "haku", at: at(daysAgo), id: null, s: "2027-02-22", l: "2027-03-01", n: 7, h: 4, ti: null });

test("rising: 9 searches in last 3 days vs 7 in the 7 days before = +200 %", () => {
  const rows = [...[0, 0, 0, 1, 1, 1, 2, 2, 2].map(row), ...[3, 4, 5, 6, 7, 8, 9].map(row)];
  const t = weekTrend(rows, now, "all").get(wk8)!;
  expect(t.recentAvg).toBe(3);
  expect(t.prevAvg).toBe(1);
  expect(t.changePct).toBe(200);
  expect(t.today).toBe(3);
});

test("falling: 0 recent vs 7 before = -100 %", () => {
  const t = weekTrend([3, 4, 5, 6, 7, 8, 9].map(row), now, "all").get(wk8)!;
  expect(t.changePct).toBe(-100);
});

test("fewer than 3 searches shows no trend", () => {
  const t = weekTrend([row(0), row(5)], now, "all").get(wk8)!;
  expect(t.enough).toBe(false);
  expect(t.changePct).toBeNull();
  expect(trendScore(t)).toBe(-Infinity);
});

test("7-day moving average", () => {
  const s = dailySeries([0, 0, 0, 0, 0, 0, 0].map(row), wk8, 3, now, "all");
  expect(s[2].count).toBe(7);
  expect(s[2].avg7).toBe(1);
  expect(s[0].avg7).toBe(0);
});
