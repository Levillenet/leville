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
  assertEquals(analyzeResult(pad + "room-card <span>Saatavilla</span> 2 583 € room-card x 500 € room-card <span>Saatavilla</span> 3 100 €"), { available: 2, minPrice: 2583 });
});
