import { test, expect } from "bun:test";
import { pickSpreadExamples } from "../src/lib/dealExamples";
const today = "2026-11-19";
const c = (roomId: string, checkIn: string, nights = 1) => ({ roomId, checkIn, nights });

test("12 today-gaps do not crowd out later days", () => {
  const list = [...Array.from({ length: 12 }, (_, i) => c("r" + i, today)), c("x", "2026-11-25", 3), c("y", "2026-12-01", 4)];
  const r = pickSpreadExamples(list, today);
  expect(r.some((e) => e.checkIn === "2026-11-25")).toBe(true);
  expect(r.some((e) => e.checkIn === "2026-12-01")).toBe(true);
  expect(r.length).toBe(12);
});

test("nothing beyond 14 days", () => {
  const r = pickSpreadExamples([c("a", "2026-12-03"), c("b", "2026-12-04")], today);
  expect(r.map((e) => e.checkIn)).toEqual(["2026-12-03"]);
});

test("same room at most twice", () => {
  const r = pickSpreadExamples(["2026-11-20","2026-11-21","2026-11-22"].map((d) => c("a", d)), today);
  expect(r.length).toBe(2);
});
