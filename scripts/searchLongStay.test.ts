import { test, expect } from "bun:test";
import { buildDemand, countImplausible, type SearchRow } from "../src/lib/searchDemand";
const row = (p: Partial<SearchRow>): SearchRow => ({ t: "haku", at: "2026-11-03T09:00:00Z", id: null, s: null, l: null, n: null, h: 2, ti: null, ...p });
const now = Date.parse("2026-11-03T10:00:00Z");

test("a 98-night search is left out of weekly demand", () => {
  const rows = [row({ s: "2027-01-11", l: "2027-04-19", n: 98 })];
  expect(buildDemand(rows, now, "all", "all").every((w) => w.total === 0)).toBe(true);
  expect(countImplausible(rows, now, "all", "all")).toBe(1);
});

test("a 7-night search is counted", () => {
  const rows = [row({ s: "2027-01-11", l: "2027-01-18", n: 7 })];
  const d = buildDemand(rows, now, "all", "all").filter((w) => w.total > 0);
  expect(d.length).toBe(1);
  expect(d[0].commonNights).toBe(7);
  expect(countImplausible(rows, now, "all", "all")).toBe(0);
});
