import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { sellableStays, type Day } from "./stays.ts";

const mk = (dates: string[], over: Record<string, Partial<Day>> = {}): Day[] =>
  dates.map((date) => ({ date, isFree: true, minNights: 1, checkinDenied: false, checkoutDenied: false, ...over[date] }));
const feb = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => `2027-02-${String(from + i).padStart(2, "0")}`);

Deno.test("whole free week gives Saturday–Saturday", () => {
  assertEquals(sellableStays(mk(feb(20, 28)), "2027-02-20", "2027-02-28"), [{ checkIn: "2027-02-20", checkOut: "2027-02-27", nights: 7 }]);
});

Deno.test("booked middle splits into two stays", () => {
  const days = mk(feb(20, 28), { "2027-02-23": { isFree: false } });
  assertEquals(sellableStays(days, "2027-02-20", "2027-02-28").map((s) => s.nights), [3, 4]);
});

Deno.test("arrival ban moves the start", () => {
  const days = mk(feb(20, 28), { "2027-02-20": { checkinDenied: true } });
  assertEquals(sellableStays(days, "2027-02-20", "2027-02-28")[0].checkIn, "2027-02-21");
});

Deno.test("run shorter than minimum stay is not sellable", () => {
  const days = mk(feb(20, 28), { "2027-02-22": { isFree: false }, "2027-02-20": { minNights: 3 }, "2027-02-21": { minNights: 3 } });
  assertEquals(sellableStays(days, "2027-02-20", "2027-02-23").length, 0);
});

Deno.test("stays are capped at 7 nights", () => {
  assertEquals(sellableStays(mk(feb(20, 28)), "2027-02-20", "2027-02-28")[0].nights, 7);
});
