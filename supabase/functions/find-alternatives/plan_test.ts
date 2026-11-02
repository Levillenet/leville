import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { findAlternatives, phase1, pickTop, type Found } from "./plan.ts";

const I = { start: "2026-12-28", end: "2027-01-01", adults: 4, children: 0 };

Deno.test("phase1 includes the Sat–Sat week and skips past days", () => {
  const p = phase1(I, "2026-12-25");
  assertEquals(p.some((x) => x.start === "2026-12-26" && x.end === "2027-01-02" && x.nights === 7), true);
  assertEquals(p.some((x) => x.start < "2026-12-25"), false);
  assertEquals(p.some((x) => x.start === I.start && x.nights === 4), false);
});

Deno.test("never offers shorter stays", () => {
  const p = phase1({ ...I, end: "2027-01-08" }, "2026-01-01"); // 11 nights
  assertEquals(p.every((x) => x.nights === 11), true);
});

Deno.test("ordering: same length, nearest, more free", () => {
  const f = (start: string, nights: number, shift: number, available: number): Found =>
    ({ start, end: "", nights, shift, available, minPrice: 1 });
  const top = pickTop([f("a", 7, 0, 5), f("b", 4, 2, 1), f("c", 4, -1, 1), f("d", 4, 1, 3)], 4);
  assertEquals(top.map((x) => x.start), ["d", "c", "b"]);
});

Deno.test("phase 2 extends until something is free and reports the minimum", async () => {
  const r = await findAlternatives(I, "2026-11-01", async (p) =>
    p.nights >= 7 && p.start !== "2026-12-26" ? { available: 2, minPrice: 2583 } : { available: 0, minPrice: null });
  assertEquals(r.minimi_oita, 7);
  assertEquals(r.alternatives[0].start, "2026-12-28");
  assertEquals(r.alternatives.every((a) => a.nights === 7), true);
});

Deno.test("nothing found", async () => {
  const r = await findAlternatives(I, "2026-11-01", async () => ({ available: 0, minPrice: null }));
  assertEquals(r, { alternatives: [], minimi_oita: 0 });
});
