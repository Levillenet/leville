import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { countAvailable, parseQuery } from "./count.ts";

const pad = "<div>" + "x".repeat(300) + "</div>";
Deno.test("zero free when all booked", () => {
  assertEquals(countAvailable(pad + "Kohde on varattu Kohde on varattu"), 0);
});
Deno.test("zero free with other unavailable reasons", () => {
  assertEquals(countAvailable(pad + "Checkin ei sallittu valittuna päivänä Enintään 3 henkilöä Ei varattavissa valittuna ajankohtana"), 0);
});
Deno.test("counts Saatavilla", () => {
  assertEquals(countAvailable(pad + "room-card <span>Saatavilla</span> 1 002 € room-card Kohde on varattu room-card <span>Saatavilla</span> 900 €"), 2);
});
Deno.test("non-result is null", () => {
  assertEquals(countAvailable(pad + "<html>error</html>"), null);
  assertEquals(countAvailable(""), null);
});
Deno.test("parseQuery validates", () => {
  assertEquals(parseQuery({ start: "2027-01-10", end: "2027-01-16", adults: 4, children: 0 })?.flex, 0);
  assertEquals(parseQuery({ start: "2027-01-16", end: "2027-01-10", adults: 4, children: 0 }), null);
  assertEquals(parseQuery({ start: "2027-01-10", end: "2027-01-16", adults: 0, children: 0 }), null);
});
Deno.test("flexible-only is not free", () => {
  assertEquals(countAvailable(pad + "room-card <span>Saatavilla joustavina päivinä</span> 800 €"), 0);
});
Deno.test("cheapest free price", async () => {
  const { analyzeResult } = await import("../_shared/moderResult.ts");
  const rate = (n: string) => `<!-- Rates --><div><span class="whitespace-nowrap">${n} €</span></div><!-- Info -->`;
  assertEquals(analyzeResult(pad + `room-card <span>Saatavilla</span> ${rate("2 583")} room-card x ${rate("500")} room-card <span>Saatavilla</span> ${rate("3 100")}`), { available: 2, minPrice: 2583, minStays: [] });
});

Deno.test("stay total is 2419, never the 59 euro cleaning fee", () => {
  assertEquals(ar(pad + 'room-card <span>Saatavilla</span><p>Loppusiivous 59 € lisätään hintaan</p><!-- Rates --><div><span class="whitespace-nowrap">2419 €</span></div><!-- Info -->')?.minPrice, 2419);
});
Deno.test("unidentified or ambiguous totals are omitted", () => {
  assertEquals(ar(pad + 'room-card <span>Saatavilla</span><p>Loppusiivous 59 € lisätään hintaan</p>2419 €')?.minPrice, null);
  assertEquals(ar(pad + 'room-card <span>Saatavilla</span><!-- Rates --><span>Loppusiivous 59 € lisätään hintaan</span><!-- Info -->')?.minPrice, null);
  assertEquals(ar(pad + 'room-card <span>Saatavilla</span><!-- Rates --><span>59 € lisätään hintaan</span><!-- Info -->')?.minPrice, null);
  assertEquals(ar(pad + 'room-card <span>Saatavilla</span><!-- Rates --><span>3000 €</span><span>2419 €</span><!-- Info -->')?.minPrice, null);
});

import { analyzeResult as ar } from "../_shared/moderResult.ts";
Deno.test("empty grid = unpriced, not error", () => {
  const r = ar('<div class="max-w-screen-2xl mx-auto my-8 px-4 gap-6 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 2xl:px-0">\n    </div>\n');
  if (!r || r.available !== 0 || r.unpriced !== true) throw new Error("expected unpriced");
  if (ar("") !== null || ar("<html>error</html>") !== null) throw new Error("garbage must be null");
});
