import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { countAvailable, parseQuery } from "./count.ts";

const pad = "<div>" + "x".repeat(300) + "</div>";
Deno.test("zero free when all booked", () => {
  assertEquals(countAvailable(pad + "Kohde on varattu Kohde on varattu"), 0);
});
Deno.test("counts Saatavilla", () => {
  assertEquals(countAvailable(pad + "Saatavilla Kohde on varattu Saatavilla"), 2);
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
