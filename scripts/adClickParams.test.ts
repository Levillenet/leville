import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import { captureAdParams, appendAdParams } from "../src/lib/adClickParams";
import { CONSENT_VERSION } from "../src/lib/cookieConsent";
const M = "https://app.moder.fi/levillenet/303?step=1&lang=en#x";
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
  if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
  else Reflect.deleteProperty(globalThis, "localStorage");
});
function browser(search: string, values: Record<string, string> = {}, blocked = false) {
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => JSON.stringify({ version: CONSENT_VERSION, visitorId: "test", analytics: true, marketing: true, expiresAt: "2099-01-01T00:00:00Z" }) } });
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    location: { search, pathname: "/en/accommodations", href: `https://leville.net/en/accommodations${search}` },
    sessionStorage: { getItem: (key: string) => {
      if (blocked) throw new Error("Storage blocked");
      return values[key] ?? null;
    } },
  } });
}
describe("adClickParams", () => {
  // Other test files may leave a global window; pure-API cases run without one.
  beforeEach(() => { Reflect.deleteProperty(globalThis, "window"); });
  it("appends to moder links", () => {
    captureAdParams("?gclid=TEST123&utm_source=google&utm_campaign=uk&foo=1");
    expect(appendAdParams(M)).toBe("https://app.moder.fi/levillenet/303?step=1&lang=en&gclid=TEST123&utm_source=google&utm_campaign=uk#x");
  });
  it("does not overwrite existing keys", () => {
    captureAdParams("?gclid=NEW");
    expect(appendAdParams("https://app.moder.fi/a?gclid=OLD")).toBe("https://app.moder.fi/a?gclid=OLD");
  });
  it("leaves other domains unchanged", () => {
    captureAdParams("?gclid=X");
    expect(appendAdParams("https://example.com/?a=1")).toBe("https://example.com/?a=1");
  });
  it("without params, unchanged byte-for-byte", () => {
    captureAdParams("");
    expect(appendAdParams(M)).toBe(M);
  });
  it("prefers current URL UTMs and preserves all booking parameters", () => {
    captureAdParams("");
    browser("?utm_source=google&utm_medium=cpc&utm_campaign=uk%20winter", {
      _lv_utm_source: "old", _lv_utm_medium: "old", _lv_utm_campaign: "old",
    });
    const url = new URL(appendAdParams("https://app.moder.fi/levillenet/303?step=1&start=2026-12-04&end=2026-12-11&adults=2&children=1&lang=en&utm_source=old#x"));
    expect(Object.fromEntries(url.searchParams)).toEqual({
      step: "1", start: "2026-12-04", end: "2026-12-11", adults: "2", children: "1", lang: "en",
      utm_source: "google", utm_medium: "cpc", utm_campaign: "uk winter",
    });
    expect(url.hash).toBe("#x");
  });
  it("falls back to existing _lv_ session values for each missing UTM", () => {
    captureAdParams("?utm_source=stale");
    browser("?utm_medium=cpc", { _lv_utm_source: "newsletter", _lv_utm_campaign: "winter" });
    const url = new URL(appendAdParams(M));
    expect(url.searchParams.get("utm_source")).toBe("newsletter");
    expect(url.searchParams.get("utm_medium")).toBe("cpc");
    expect(url.searchParams.get("utm_campaign")).toBe("winter");
  });
  it("does not add absent values or reuse stale in-memory UTMs", () => {
    captureAdParams("?utm_source=stale");
    browser("");
    expect(appendAdParams(M)).toBe(M);
  });
  it("works when storage is blocked and omits missing values", () => {
    captureAdParams("");
    browser("?utm_source=google", {}, true);
    expect(appendAdParams(M)).toBe("https://app.moder.fi/levillenet/303?step=1&lang=en&utm_source=google#x");
  });
  it("does not duplicate parameters when dynamic links are processed again", () => {
    captureAdParams("");
    browser("?utm_source=google&utm_medium=cpc&utm_campaign=uk");
    const first = appendAdParams(M);
    expect(appendAdParams(first)).toBe(first);
  });
  it("blocks campaign propagation when marketing consent is refused", () => {
    browser("?gclid=TEST&utm_source=google");
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => null } });
    expect(appendAdParams("https://app.moder.fi/levillenet/303?step=1&utm_source=google&gclid=TEST&lang=en")).toBe("https://app.moder.fi/levillenet/303?step=1&lang=en");
  });
});
