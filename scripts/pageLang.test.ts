import { describe, it, expect } from "bun:test";
import { withModerLang, eventLanguage, moderLang } from "../src/lib/pageLang";

const SEARCH = "https://app.moder.fi/levillenet?start=2027-01-11&end=2027-01-14&adults=2&children=0&lang=en&flexible_date_search=0&utm_source=fb&_gl=abc";

describe("Moder link language follows the page", () => {
  it("search on a Finnish page → lang=fi, other parameters kept", () => {
    const u = new URL(withModerLang(SEARCH, "/"));
    expect(u.searchParams.get("lang")).toBe("fi");
    expect(u.searchParams.get("utm_source")).toBe("fb");
    expect(u.searchParams.get("_gl")).toBe("abc");
    expect(u.searchParams.get("start")).toBe("2027-01-11");
  });
  it("search on an /en page → lang=en", () => {
    expect(new URL(withModerLang(SEARCH.replace("lang=en", "lang=fi"), "/en/accommodations")).searchParams.get("lang")).toBe("en");
  });
  it("non-Moder links are untouched", () => {
    expect(withModerLang("https://leville.net/?lang=en", "/")).toBe("https://leville.net/?lang=en");
  });
  it("Finnish subpages are fi", () => {
    expect(moderLang("/majoitukset")).toBe("fi");
  });
});

describe("booking event language = page language", () => {
  it("booking-link from /en/accommodations is en", () => {
    expect(eventLanguage("/event/booking-link", "/en/accommodations")).toBe("en");
  });
  it("booking-link from a Finnish page is fi", () => {
    expect(eventLanguage("/event/booking-link", "/majoitukset")).toBe("fi");
  });
  it("page views use their own path", () => {
    expect(eventLanguage("/en/guide", null)).toBe("en");
  });
});
