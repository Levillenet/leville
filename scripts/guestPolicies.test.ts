import { test, expect } from "bun:test";
import { guestPolicies, hasGuestFireplace, guestLaundry } from "../src/data/guestPolicies";

test("standard cancellation period is 60 days", () => expect(guestPolicies.cancellationDays).toBe(60));
test("apartment ready by 17:00", () => expect(guestPolicies.checkInReadyBy).toBe("17:00"));
test("checkout by 11:00", () => expect(guestPolicies.checkOutBy).toBe("11:00"));
test("quiet hours are 22:00–08:00", () => {
  expect(guestPolicies.quietStart).toBe("22:00");
  expect(guestPolicies.quietEnd).toBe("08:00");
});
test("linen price range is 19–23 euros", () => {
  expect(guestPolicies.linenPriceMin).toBe(19);
  expect(guestPolicies.linenPriceMax).toBe(23);
});
test("no security deposit", () => expect(guestPolicies.securityDeposit).toBe(0));
test("smoking and vaping prohibited", () => {
  expect(guestPolicies.smokingAllowed).toBe(false);
  expect(guestPolicies.vapingAllowed).toBe(false);
});
test("every property has luggage storage", () => expect(guestPolicies.luggageStorageAllProperties).toBe(true));
test("Skistar self-service laundry, other properties washing machine", () => {
  expect(guestLaundry("skistar-210")).toBe("self-service-laundry");
  expect(guestLaundry("glacier-a1")).toBe("washing-machine");
});
test("only the five specified properties have fireplaces", () => {
  expect(guestPolicies.fireplaceSlugs).toEqual(["zero-point-5a2", "zero-point-5b2", "zero-point-5b5-penthouse", "karhupirtti", "karhunvartija-3"]);
  expect(hasGuestFireplace("zero-point-5a2")).toBe(true);
  expect(hasGuestFireplace("glacier-a1")).toBe(false);
  expect(hasGuestFireplace("skistar-210")).toBe(false);
});
test("owner-specified accommodation VAT is 14 percent", () => expect(guestPolicies.accommodationVatPercent).toBe(14));