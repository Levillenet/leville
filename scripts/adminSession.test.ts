import { test, expect } from "bun:test";
import { isAdminTokenExpired } from "../src/lib/adminSession";
const now = 1_800_000_000_000;
test("token past its expiry is expired", () => {
  expect(isAdminTokenExpired(`admin.${now / 1000 - 1}.sig`, now)).toBe(true);
});
test("token within 8 h is valid", () => {
  expect(isAdminTokenExpired(`admin.${now / 1000 + 3600}.sig`, now)).toBe(false);
});
