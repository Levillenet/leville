/** Guest policies confirmed by the owner; no automatic right to special terms. */
export const guestPolicies = {
  cancellationDays: 60,
  checkInReadyBy: "17:00",
  checkOutBy: "11:00",
  quietStart: "22:00",
  quietEnd: "08:00",
  linenPriceMin: 19,
  linenPriceMax: 23,
  securityDeposit: 0,
  smokingAllowed: false,
  vapingAllowed: false,
  /** Matkatavarasäilytys: SkiStar ja Hiihtäjänkuja 5 talon kellarissa, Glacier B-talon kellarissa, Karhupirtti kysyttäessä; Karhunvartija 3, Platinum A2 ja Moonlight 415 ei. Laukut voi jättää ja hakea milloin tahansa. */
  luggageStorageAllProperties: false,
  accommodationVatPercent: 14,
  fireplaceSlugs: ["zero-point-5a2", "zero-point-5b2", "zero-point-5b5-penthouse", "karhupirtti", "karhunvartija-3"],
} as const;

export const hasGuestFireplace = (slug: string): boolean =>
  guestPolicies.fireplaceSlugs.some((allowed) => allowed === slug);

export const guestLaundry = (slug: string): "self-service-laundry" | "washing-machine" =>
  slug.startsWith("skistar-") ? "self-service-laundry" : "washing-machine";