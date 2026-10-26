import { describe, expect, test } from "bun:test";
import { isStaffRedirectPath, staffRedirectUrl } from "../src/lib/staffRedirect";

const target = "https://script.google.com/macros/s/AKfycbw5sMdbyDITwTJ28NDyexuCKGA1w8cjcDPnAW6XMgABA4UZYMSklZmEvp-EoybL6_imSQ/exec";

describe("staff operational redirects", () => {
  test("unit redirects use the requested endpoint and preserve the encoded parameter", () => {
    expect(staffRedirectUrl("g-a2")).toBe(`${target}?unit=g-a2`);
    expect(staffRedirectUrl("G A&2/ä")).toBe(`${target}?unit=G%20A%262%2F%C3%A4`);
  });
  test("management redirects use admin=1", () => {
    expect(staffRedirectUrl()).toBe(`${target}?admin=1`);
  });
  test("only operational routes bypass the visitor app", () => {
    expect(isStaffRedirectPath("/s/g-a2")).toBe(true);
    expect(isStaffRedirectPath("/s-hallinta")).toBe(true);
    expect(isStaffRedirectPath("/majoitukset")).toBe(false);
    expect(isStaffRedirectPath("/s")).toBe(false);
    expect(isStaffRedirectPath("/s-hallinta-extra")).toBe(false);
  });
});