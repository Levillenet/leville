import { test, expect } from "bun:test";
import { skiWeek, easterRange, easterCore, upcomingSeasons } from "../src/lib/seasons";

test("ski week 8/2027 runs Saturday before week 8 to its Sunday", () => {
  expect(skiWeek(2027, 8)).toEqual({ start: "2027-02-20", end: "2027-02-28" });
});

test("Easter 2027 runs from Saturday a week before to Easter Monday", () => {
  expect(easterRange(2027)).toEqual({ start: "2027-03-20", end: "2027-03-29" });
});

test("past seasons disappear and next winter appears", () => {
  const ids = upcomingSeasons("2027-03-01").map((s) => `${s.id}-${s.year}`);
  expect(ids).not.toContain("ski8-2027");
  expect(ids).toContain("easter-2027");
  expect(ids).toContain("christmas-2027");
});

test("Christmas and New Year use fixed dates", () => {
  const s = upcomingSeasons("2026-11-05");
  expect(s.find((x) => x.id === "christmas")).toMatchObject({ start: "2026-12-19", end: "2026-12-27" });
  expect(s.find((x) => x.id === "newyear")).toMatchObject({ start: "2026-12-26", end: "2027-01-06" });
});

test("Easter 2027 core is Thursday to Easter Monday", () => {
  expect(easterCore(2027)).toEqual({ start: "2027-03-25", end: "2027-03-29" });
});
