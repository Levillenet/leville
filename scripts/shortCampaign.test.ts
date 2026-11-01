import { describe, expect, test } from "bun:test";
import { expandShortCampaign } from "../src/lib/shortCampaign";

describe("short campaign tags", () => {
  test("fb becomes facebook/group utm", () => {
    expect(expandShortCampaign("?fb=testi-lyhyt")).toBe(
      "?utm_source=facebook&utm_medium=group&utm_campaign=testi-lyhyt",
    );
  });
  test("ig becomes instagram/social utm and keeps other params", () => {
    expect(expandShortCampaign("?a=1&ig=x1")).toBe(
      "?a=1&utm_source=instagram&utm_medium=social&utm_campaign=x1",
    );
  });
  test("existing utm_source wins; fb is removed", () => {
    expect(expandShortCampaign("?fb=testi-lyhyt&utm_source=x")).toBe("?utm_source=x");
  });
  test("invalid values are ignored", () => {
    expect(expandShortCampaign("?fb=<script>")).toBeNull();
    expect(expandShortCampaign("?fb=" + "a".repeat(41))).toBeNull();
    expect(expandShortCampaign("?fb=ABC")).toBeNull();
  });
});
