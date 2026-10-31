import { describe, it, expect } from "bun:test";
import { captureAdParams, appendAdParams } from "../src/lib/adClickParams";
const M = "https://app.moder.fi/levillenet/303?step=1&lang=en#x";
describe("adClickParams", () => {
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
});
