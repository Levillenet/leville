// English translations for property landing pages (/en/accommodations/:slug).
// Mirrors the shape of propertyTranslationsFi.ts. Keyed by property slug.
//
// Currently only "karhupirtti" has a finished translation. The other 25 slugs
// are placeholder stubs marked "[EN: TODO]" — they will render visibly as
// TODO until real copy lands. This is intentional: shipping the hreflang
// structure now and translating after is safer than the reverse.

export interface PropertyEnTranslation {
  name?: string;
  shortDescription: string;
  /** Optional long-form description (Markdown-lite: paragraphs separated by blank lines, **bold**, bullets with "- "). */
  longDescription?: string;
}

const TODO: PropertyEnTranslation = {
  name: "[EN: TODO]",
  shortDescription: "[EN: TODO]",
  longDescription: "[EN: TODO]",
};

export const propertyEn: Record<string, PropertyEnTranslation> = {
  "front-slope-5a2": { ...TODO },
  "front-slope-5b2": { ...TODO },
  "front-slope-5b5-penthouse": { ...TODO },

  "karhupirtti": {
    name: "Karhupirtti — The Bear Lodge in Levi Center",
    shortDescription:
      "220 m² traditional log villa right in Levi Center: 7 bedrooms for up to 14 guests, outdoor hot tub, private yard and fireplace. 3 ensuite bedrooms downstairs (private shower + WC), a separate bathroom by the sauna, plus 2 additional WCs. Fully renovated 2022. Firewood included. Pets welcome.",
    longDescription: `**Karhupirtti — a 220 m² log villa for groups of up to 14, in the heart of Levi**

Karhupirtti — The Bear Lodge — is one of a kind in Levi: the only traditional round-log villa right in the village centre. It sits a three-minute walk from the Front Slope (Eturinne), restaurants and shops, with 220 m² of living space, seven bedrooms and an outdoor hot tub on its own fenced yard. With room for up to **14 guests**, it's built for groups — extended families, friends travelling together, work or hobby trips. Pets are welcome.

**Built around 14-guest group stays** Downstairs there are three ensuite bedrooms — each with its own shower and WC — for guests who want privacy. Upstairs are four connected bedrooms separated by inner doors, well suited for families with children. Next to the sauna there's an additional separate bathroom, and the villa has **two more separate WCs** for shared use, so even a full house of 14 doesn't queue for the bathroom. That's 4 bathrooms + 2 separate WCs in total. The large open-plan living and dining area seats the whole group around one table, which is what makes evenings here actually feel like a group holiday rather than people scattered between rooms.

**Outdoor hot tub and private yard** The hot tub sits on your own large private yard. On a clear winter night you can watch for the northern lights from the water. There's also a fire pit on the yard for evenings outside.

**Fully renovated in 2023 with quality materials** Karhupirtti went through a full renovation in 2023: Pukkila tiles, Kährs wood floors, walnut ceilings, a striking black kitchen and Miele appliances throughout. The result is the character of a real log villa with the comfort of a modern home — not a generic ski apartment dressed up. The design fireplace adds warmth and atmosphere.

**Walk-everywhere location in Levi Center** From the door it's a short walk to the Front Slope, Lastenmaa children's slope, the K-Market (small grocery store), souvenir shops, restaurants and after-ski venues. The nearest snowmobile route starts about 250 m away. There's plenty of parking on site. The villa has a ski storage and waxing room and a utility room with laundry — so wet gear has somewhere to go.

**Everything you need for a group holiday** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and freezer. Electric sauna. Design fireplace (firewood included). Outdoor hot tub and barbecue. Air conditioning and heat pump. Free WiFi, TV and sound system. Cot and child safety gates available on request.`,
  },

  "skistar-211": { ...TODO },
  "skistar-212": { ...TODO },
  "skistar-209": { ...TODO },
  "skistar-210": { ...TODO },
  "skistar-studio-102": { ...TODO },
  "skistar-studio-104": { ...TODO },
  "skistar-studio-319": { ...TODO },
  "skistar-studio-320": { ...TODO },
  "skistar-studio-321": { ...TODO },
  "karhunvartija-3": { ...TODO },
  "levi-platinum-a2": { ...TODO },
  "moonlight-415": { ...TODO },
  "glacier-a1": { ...TODO },
  "glacier-a2": { ...TODO },
  "glacier-a3": { ...TODO },
  "glacier-a4": { ...TODO },
  "glacier-a5-penthouse": { ...TODO },
  "glacier-a6": { ...TODO },
  "glacier-b1": { ...TODO },
  "glacier-b2": { ...TODO },
  "glacier-b3-penthouse": { ...TODO },
  "glacier-b4-penthouse": { ...TODO },
};

export const locationEn: Record<string, string> = {
  "Levi Center": "Levi Center",
  "Front Slope": "Levi Front Slope, Zero Point area",
  "Glacier": "At the foot of Front Slope, Zero Point area",
};

// Per-slug location overrides (English), used when the generic location label is misleading.
export const locationEnBySlug: Record<string, string> = {
  "front-slope-5a2": "Levi Front Slope, Zero Point area",
  "front-slope-5b2": "Levi Front Slope, Zero Point area",
  "front-slope-5b5-penthouse": "Levi Front Slope, Zero Point area",
};

export const translateYearEn = (s: string): string => {
  if (!s) return "";
  // Source strings in properties.ts are already in English ("Built 2024",
  // "Renovated 2018", "Fully renovated 2024", etc.) so this is a passthrough
  // for the EN variant. Kept as a function for symmetry with translateYearFi
  // and so future locale-specific cleanups (month casing, etc.) have one place.
  return s;
};
