import { describe, it, expect } from "bun:test";
import { GA_MEASUREMENT_ID, GA_CONFIG, bookingClickParams } from "../src/lib/googleAnalytics";

describe("requested GA4 configuration", () => {
  it("uses the supplied measurement ID", () => { expect(GA_MEASUREMENT_ID).toBe("G-4RSJCSBRRC"); });
  it("links Leville and Moder with initial page views enabled", () => {
    expect(GA_CONFIG).toEqual({ linker: { domains: ["leville.net", "app.moder.fi"] }, send_page_view: true });
  });
  it("resolves booking target to the property slug, retaining the destination", () => {
    const destination = "https://app.moder.fi/levillenet/304?step=1&lang=en";
    expect(bookingClickParams(destination, [{ bookingUrl: "https://app.moder.fi/levillenet/304?step=1", slug: "zero-point-5a2" }], "/majoitukset")).toEqual({ kohde: "zero-point-5a2", destination_url: destination });
  });
  it("does not invent a property for a general booking link", () => {
    expect(bookingClickParams("https://app.moder.fi/levillenet", [], "/en/accommodations").kohde).toBe("");
  });
});
import { isoWeek, searchEventParams, trackSearchThenNavigate } from "../src/lib/googleAnalytics";
const base = "https://app.moder.fi/levillenet/304?start=2027-03-08&end=2027-03-15&adults=2&children=1";
describe("majoitushaku", () => {
  it("computes nights, people, ISO week", () => {
    expect(searchEventParams(base, "/majoitukset")).toMatchObject({ saapuminen: "2027-03-08", lahto: "2027-03-15", oita: 7, aikuiset: 2, lapset: 1, henkiloita: 3, viikko: "2027-W10", lahde_sivu: "/majoitukset" });
  });
  it("ISO week across new year", () => { expect(isoWeek("2027-01-01")).toBe("2026-W53"); });
  it("prefers Leville slug, then mapped slug, then Moder number, else kaikki", () => {
    expect(searchEventParams(base, "/majoitukset/glacier-a2")!.kohde).toBe("glacier-a2");
    expect(searchEventParams(base, "/", [{ bookingUrl: "https://app.moder.fi/levillenet/304", slug: "zero-point-5a2" }])!.kohde).toBe("zero-point-5a2");
    expect(searchEventParams(base, "/")!.kohde).toBe("304");
    expect(searchEventParams("https://app.moder.fi/levillenet?start=2027-03-08&end=2027-03-10", "/")!.kohde).toBe("kaikki");
  });
  it("no event without dates", () => { expect(searchEventParams("https://app.moder.fi/levillenet/304", "/")).toBeNull(); });
  it("sends exactly one event when two handlers hit the same search", () => {
    const calls: unknown[][] = [];
    const g = globalThis as any;
    g.window = { gtag: (...a: unknown[]) => calls.push(a), location: { pathname: "/", search: "" } };
    g.document = { head: { appendChild() {} }, createElement: () => ({}) };
    g.localStorage = { getItem: () => JSON.stringify({ version: 2, analytics: true, marketing: false, timestamp: Date.now(), expires: Date.now() + 1e9 }), setItem() {} };
    const p = searchEventParams(base, "/")!;
    const first = trackSearchThenNavigate(p, () => {}, 1000);
    const second = trackSearchThenNavigate(p, () => {}, 1100);
    expect([first, second]).toEqual([true, false]);
    expect(calls.filter((c) => c[1] === "majoitushaku").length).toBe(1);
  });
});
