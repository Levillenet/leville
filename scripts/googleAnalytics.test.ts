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