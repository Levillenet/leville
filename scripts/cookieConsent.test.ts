import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { CONSENT_VERSION, consentExpiry, validConsent, googleConsent } from "../src/lib/cookieConsent";

describe("cookie consent rules", () => {
  it("expires exactly 12 calendar months after the choice", () => {
    expect(consentExpiry(new Date("2026-11-01T04:48:00Z")).toISOString()).toBe("2027-11-01T04:48:00.000Z");
    expect(consentExpiry(new Date("2028-02-29T04:48:00Z")).toISOString()).toBe("2029-02-28T04:48:00.000Z");
  });
  it("requires a valid unexpired record for either permission", () => {
    const record = { version: CONSENT_VERSION, visitorId: "visitor", analytics: true, marketing: false, expiresAt: "2027-11-01T04:48:00Z" };
    expect(validConsent(record, new Date("2026-11-01T04:48:00Z"))).toBe(true);
    expect(validConsent(record, new Date("2027-11-01T04:48:00Z"))).toBe(false);
    expect(validConsent({ ...record, version: "old" })).toBe(false);
    expect(validConsent(null)).toBe(false);
  });
  it("necessary-only denies optional storage and grants security", () => {
    expect(googleConsent(false, false)).toEqual({ ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", functionality_storage: "denied", personalization_storage: "denied", security_storage: "granted" });
  });
  it("statistics and marketing are independent", () => {
    expect(googleConsent(true, false).analytics_storage).toBe("granted");
    expect(googleConsent(true, false).ad_storage).toBe("denied");
    expect(googleConsent(false, true).analytics_storage).toBe("denied");
    expect(googleConsent(false, true).ad_storage).toBe("granted");
    expect(googleConsent(false, true).ad_user_data).toBe("granted");
    expect(googleConsent(false, true).ad_personalization).toBe("granted");
  });
  it("HTML defaults execute before every other script with requested wait and passthrough", () => {
    const html = readFileSync("index.html", "utf8");
    const firstScript = html.slice(html.indexOf("<script>"), html.indexOf("</script>"));
    expect(firstScript.includes("gtag('consent', 'default'")).toBe(true);
    expect(firstScript.includes("wait_for_update: 500")).toBe(true);
    expect(firstScript.includes("gtag('set', 'url_passthrough', true)")).toBe(true);
  });
});