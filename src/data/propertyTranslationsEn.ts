// English translations for property landing pages (/en/accommodations/:slug).
// Mirrors the shape of propertyTranslationsFi.ts. Keyed by property slug.
//
// Currently "karhupirtti" + the 9 Skistar slugs (Postintie 3 B) have finished
// translations. The remaining 16 slugs are placeholder stubs marked
// "[EN: TODO]" — they will render visibly as TODO until real copy lands.
// This is intentional: shipping the hreflang structure now and translating
// after is safer than the reverse.

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
  "front-slope-5a2": {
    name: "Front Slope 5A2 — Alpine Apartment in Levi Center",
    shortDescription:
      "Fully renovated (June 2024) 2-bedroom alpine apartment in Levi Center, in the Zero Point area, ~200 m from the Front Slope (Eturinne). Sleeps 6, with private sauna, drying room, heat-storing fireplace, balcony and air-source heat pump. Pets welcome.",
    longDescription: `**Front Slope 5A2 — a 65 m² alpine apartment for 6, fully renovated June 2024**

This is a 2-bedroom apartment on Hiihtäjänkuja, in the Zero Point area of Levi Center — about 200 m from the Front Slope (Eturinne) lifts and a short walk from restaurants, shops and the trails. A practical base for a family or a group of friends who want to ski straight from the door without driving.

**Sleeps up to 6 across 2 bedrooms + sofa bed** Two bedrooms, each with two single beds, plus a quality sofa bed in the living area. The living room opens onto a balcony for fresh air between runs.

**Renovated June 2024 — both bathrooms redone** The June 2024 renovation was a full refresh: both bathrooms rebuilt from scratch, and nearly every surface in the apartment renewed. Modern finishes throughout, but the alpine character of the building is kept.

**Private sauna, drying room and heat-storing fireplace** After a day on the slopes there's your own electric sauna, plus a separate drying room downstairs — come in through the lower entrance, leave skis and wet kit to dry, and head straight to the sauna. The heat-storing fireplace in the living room holds warmth for hours, which matters on the cold evenings.

An air-source heat pump handles steady warmth in winter and cooling in summer.

**Step-free arrival** Access is via a single low step, which makes arriving with skis, bags and small children straightforward. Free on-site parking with an electric outlet.

**What's included** Fully equipped kitchen with dishwasher, oven, microwave and coffee machine. Private sauna. Heat-storing fireplace. Drying room and drying cupboard. Balcony. Free WiFi and TV. Highchair and child safety gates available on request. Pets welcome.`,
  },

  "front-slope-5b2": {
    name: "Front Slope 5B2 — Two-Floor Alpine Apartment, Levi Center",
    shortDescription:
      "65 m² two-floor alpine apartment on Hiihtäjänkuja, ~200 m from the Front Slope (Eturinne). Two bedrooms upstairs plus a downstairs lounge with PlayStation and 150 cm sofa bed. Private sauna, drying room and heat-storing fireplace. Renovated 2024. Pets welcome.",
    longDescription: `**Front Slope 5B2 — 65 m² two-floor alpine apartment for 6**

A two-floor layout in the centre of Levi is rare, and that's the practical USP here: 2 bedrooms upstairs with two single beds each, plus a separate downstairs lounge that works as either a kids' den or a private space for the extra two guests. Sleeps up to 6 in total. About 200 m from the Front Slope (Eturinne) lifts and Zero Point.

**Two floors, two living spaces** Upstairs you have an open kitchen-living area and the two bedrooms. Downstairs there's a separate lounge with a large TV, a PlayStation and a 150 cm sofa bed — useful when the kids want their own space, or when you have two guests who'd rather not sleep in the main living area.

**Private sauna, fireplace and drying room** Own electric sauna and a heat-storing fireplace that keeps the apartment warm well after the fire dies down. The downstairs drying room is the practical bit: come in from the cold, leave skis and wet gear to dry, walk straight into the sauna.

**200 m from the lifts** The Front Slope and Zero Point lifts are essentially on your doorstep. Restaurants, the K-Market, après-ski venues and cross-country trails are all within an easy walk. Free on-site parking with an electric outlet.

**What's included** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and ice maker. Private sauna. Heat-storing fireplace. Drying room and drying cupboard. Balcony. Free WiFi and TV. PlayStation downstairs. Highchair and child safety gates available on request. Pets welcome.`,
  },

  "front-slope-5b5-penthouse": {
    name: "Front Slope 5B5 Penthouse — 4-Bedroom, Levi Center",
    shortDescription:
      "100 m² penthouse on Hiihtäjänkuja, ~200 m from the Front Slope (Eturinne). 4 bedrooms, 9 beds, 3 balconies, slope-view sauna and a 10-person dining table. Heat-storing fireplace with firewood included. Renovated 2024. Pets welcome.",
    longDescription: `**Front Slope 5B5 — 100 m² top-floor penthouse for groups of up to 9**

This is the biggest of the three Front Slope apartments: a 100 m² top-floor penthouse with 4 bedrooms, 3 balconies and a sauna with a window facing the slope. About 200 m from the Front Slope (Eturinne) lifts and Zero Point, in the centre of Levi. Built for groups who want one shared space rather than two apartments.

**Sleeps up to 9 across 4 bedrooms** Four bedrooms with 9 beds in total, plus a sofa bed in the living room — flexible for families or larger groups. The dining table seats 10, which is the point: this is a place where the whole group eats together. The open-plan living area has a comfortable sofa, a large TV and a sound system.

**Three balconies — two facing the slope** The living room and one bedroom open onto balconies with views of the Front Slope. You can watch the floodlit evening skiing from inside.

**Private slope-view sauna and fireplace** The sauna has a window facing the Front Slope — a quiet place to wind down after a day skiing. The heat-storing fireplace in the living room holds warmth into the evening; firewood is included.

**Renovated 2024 — fully kitted out** The penthouse was renovated in 2024 with new furniture and modern finishes throughout. Air conditioning and a heat pump keep the apartment comfortable year-round. The building has private parking, a ski storage room and a ski waxing room in the basement.

**200 m from the lifts** Front Slope and Zero Point are about 200 m away. Restaurants, shops and services are all walkable. Cross-country trails start nearby.

**What's included** Fully equipped kitchen with dishwasher, oven, microwave and coffee machine. Slope-view sauna. Heat-storing fireplace with firewood included. 3 balconies. Air conditioning and heat pump. Free WiFi, TV and sound system. Cot, highchair, children's books and toys, and child safety gates available on request. Pets welcome.`,
  },

  "karhupirtti": {
    name: "Karhupirtti — The Bear Lodge in Levi Center",
    shortDescription:
      "220 m² traditional log villa right in Levi Center: 7 bedrooms for up to 14 guests, outdoor hot tub, private yard and fireplace. 3 ensuite bedrooms downstairs (private shower + WC), a separate bathroom by the sauna, plus 2 additional WCs. Fully renovated 2022. Firewood included. Pets welcome.",
    longDescription: `**Karhupirtti — a 220 m² log villa for groups of up to 14, in the heart of Levi**

Karhupirtti — The Bear Lodge — is one of a kind in Levi: the only traditional round-log villa right in the village centre. It sits a three-minute walk from the Front Slope (Eturinne), restaurants and shops, with 220 m² of living space, seven bedrooms and an outdoor hot tub on its own fenced yard. With room for up to **14 guests**, it's built for groups — extended families, friends travelling together, work or hobby trips. Pets are welcome.

**Built around 14-guest group stays** Downstairs there are three ensuite bedrooms — each with its own shower and WC — for guests who want privacy. Upstairs are four connected bedrooms separated by inner doors, well suited for families with children. Next to the sauna there's an additional separate bathroom, and the villa has **two more separate WCs** for shared use, so even a full house of 14 doesn't queue for the bathroom. That's 4 bathrooms + 2 separate WCs in total. The large open-plan living and dining area seats the whole group around one table, which is what makes evenings here actually feel like a group holiday rather than people scattered between rooms.

**Outdoor hot tub and private yard** The hot tub sits on your own large private yard. On a clear winter night you can watch for the northern lights from the water. There's also a fire pit on the yard for evenings outside.

**Fully renovated in 2022 with quality materials** Karhupirtti went through a full renovation in 2022: Pukkila tiles, Kährs wood floors, walnut ceilings, a striking black kitchen and Miele appliances throughout. The result is the character of a real log villa with the comfort of a modern home — not a generic ski apartment dressed up. The design fireplace adds warmth and atmosphere.

**Walk-everywhere location in Levi Center** From the door it's a short walk to the Front Slope, Lastenmaa children's slope, the K-Market (small grocery store), souvenir shops, restaurants and after-ski venues. The nearest snowmobile route starts about 250 m away. There's plenty of parking on site. The villa has a ski storage and waxing room and a utility room with laundry — so wet gear has somewhere to go.

**Everything you need for a group holiday** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and freezer. Electric sauna. Design fireplace (firewood included). Outdoor hot tub and barbecue. Air conditioning and heat pump. Free WiFi, TV and sound system. Cot and child safety gates available on request.`,
  },

  "skistar-211": {
    name: "Skistar 211 — Two-Bedroom Suite, Levi Center",
    shortDescription:
      "54 m² Superior two-bedroom apartment with private sauna and balcony. End apartment with forest views in the Skistar building, Levi Center. Step-free access. No pets.",
    longDescription: `**Spacious modern two-bedroom apartment in Levi Center — Skistar building**

Welcome to a comfortable holiday home in the heart of Levi. This modern 54 m² apartment in the popular Skistar building sleeps up to 6 guests and suits families or groups of friends well. Restaurants, shops and services are a short walk away, and the main slopes are about 700 m from the door.

**Comfortable space for up to 6 guests** The apartment has two bedrooms, each with two single beds, plus a sofa bed in the living area for extra sleeping. The open-plan kitchen and living room makes a relaxed space for cooking together and unwinding after a day on the slopes. The end apartments offer forest views and a bit of extra privacy.

**Private sauna and practical comforts** Unwind in your own electric sauna after a day of skiing. The apartment has its own drying cupboard, so wet ski gear and outdoor clothes are dry and warm by morning. The building also has a shared laundry and a separate ski storage with a waxing rack and ventilation — everything you need for an easy winter holiday.

**Skistar building — central location in Levi** The Skistar building sits in the centre of Levi. The main slopes and the Front Slope (Eturinne) lifts are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails start nearby, and all the restaurants, shops and après-ski venues are a short walk away. There is free on-site parking with an electric outlet. The apartment has step-free access, though it is not certified as fully accessible.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave and coffee machine. Private sauna and bathroom. Own drying cupboard. Balcony. Free WiFi and TV. Cot and high chair available for families.`,
  },
  "skistar-212": {
    name: "Skistar 212 — Two-Bedroom Suite, Levi Center",
    shortDescription:
      "54 m² Superior two-bedroom apartment with private sauna, balcony and underfloor heating. Walking distance to everything in Levi Center. No pets.",
    longDescription: `**Spacious modern two-bedroom apartment in Levi Center — Skistar building**

Welcome to a comfortable holiday flat in the heart of Levi. This modern 54 m² apartment in the popular Skistar building sleeps up to 6 guests and is ideal for families or groups of friends. Restaurants, shops and services are within walking distance, and the main slopes are about 700 m away.

**Comfortable space for up to 6 guests** The apartment has two bedrooms, each with two single beds, plus a sofa bed in the living area for extra sleeping. The open kitchen-living room is a pleasant space for cooking together and relaxing after a day on the slopes. The end apartments offer a forest view and extra privacy.

**Private sauna and practical comforts** Unwind in your own electric sauna after a ski day. The apartment has its own drying cupboard, so wet ski gear and outdoor clothes are dry and warm by morning. The building also has a shared laundry and a separate ski storage with a waxing rack and ventilation — everything you need for a smooth winter holiday.

**Skistar building — central location in Levi** The Skistar building is centrally located in Levi. The main slopes and the Front Slope lifts are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails start nearby, and all the restaurants, shops and après-ski venues are a short walk away. There is free on-site parking with an electric outlet. The apartment has step-free access, though it is not certified as fully accessible.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave and coffee machine. Private sauna and bathroom. Own drying cupboard. Balcony. Free WiFi and TV. Cot and high chair available for families.`,
  },
  "skistar-209": {
    name: "Skistar 209 — One-Bedroom Suite, Levi Center",
    shortDescription:
      "43 m² renovated one-bedroom Superior apartment with private sauna in the Skistar building. Step-free access. Carefully designed interior. No pets.",
    longDescription: `**Comfortable one-bedroom apartment in Levi Center — Skistar building**

A comfortable, compact base for your Levi holiday. This 43 m² apartment in the popular Skistar building suits couples or small families well, sleeping up to 4 guests. It sits in the centre of Levi, with the main ski slopes about 700 m away and all services within walking distance.

**Modern layout for up to 4 guests** The spacious bedroom has two single beds, and the living room has a comfortable sofa bed for 1–2 extra guests. The open-plan kitchen-living room is bright and welcoming — a great space for cooking, relaxing and planning the next day's adventures.

**Private sauna and practical comforts** Unwind in your own electric sauna after a day on the slopes. The building has a shared laundry and a separate ski storage with a waxing rack and ventilation. The apartment has its own drying cupboard. There is step-free access to the apartment, though it is not certified as fully accessible.

**Skistar building — central location in Levi** The Skistar building is in the centre of Levi. The main slopes are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails, restaurants, shops and après-ski venues are all close by. Free on-site parking with an electric outlet is available.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and toaster. Private sauna and bathroom. Balcony. Free WiFi and TV with HDMI. High chair available for families.`,
  },
  "skistar-210": {
    name: "Skistar 210 — One-Bedroom Suite, Levi Center",
    shortDescription:
      "44 m² renovated one-bedroom Superior apartment with private sauna in the Skistar building. Step-free access. Luggage drop-off available. No pets.",
    longDescription: `**Comfortable one-bedroom apartment in Levi Center — Skistar building**

A comfortable, compact base for a Levi holiday. This 43 m² apartment in the popular Skistar building suits couples or small families well, sleeping up to 4 guests. It sits in the centre of Levi, about 700 m from the main slopes, with all services within walking distance.

**Modern layout for up to 4 guests** The spacious bedroom has two single beds, and the living room has a comfortable sofa bed for 1–2 extra guests. The open-plan kitchen-living room is bright and welcoming — a great space for cooking, relaxing and planning the next day's adventures.

**Private sauna and practical comforts** Unwind in your own electric sauna after a day on the slopes. The building has a shared laundry and a separate lockable ski storage with a waxing rack and ventilation. The apartment has its own drying cupboard. There is step-free access to the apartment, though it is not certified as fully accessible.

**Skistar building — central location in Levi** The Skistar building is in the centre of Levi. The main slopes are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails, restaurants, shops and après-ski venues are all close by. Free on-site parking with an electric outlet is available.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and toaster. Private sauna and bathroom. Balcony. Free WiFi and TV with HDMI. High chair available for families.`,
  },
  "skistar-studio-102": {
    name: "Skistar Studio 102 — Levi Center",
    shortDescription:
      "24 m² studio in the Skistar building, Postintie, Levi Center. Built 2020. The most compact option — no sauna, but affordable and step-free. No pets.",
    longDescription: `**Modern studio in Levi Center — Skistar building**

Smart, stylish and perfectly located. This modern 24 m² studio in the Skistar building was completed in 2020 and offers everything you need for a comfortable Levi holiday. The studio comfortably sleeps up to 3 adults or a family of 2 adults and 2 children — making it an excellent choice for couples and small families alike. The main slopes are about 700 m away and all services are within walking distance.

**Compact and cleverly designed** The studio has two beds and a sofa bed. The sofa bed works well as a sleeping spot for children or a third adult. For a family of 2 adults and 2 children, the layout is ideal — children on the sofa bed, parents in the main beds. The fully equipped kitchen has everything for home-style cooking: dishwasher, oven, microwave, coffee machine and toaster. The carefully chosen interior, with a striking tiled feature wall, brings a touch of Lapland atmosphere into your stay.

**Drying cupboard and practical spaces** The apartment has its own drying cupboard for winter clothes and ski gear — everything is dry and warm by morning. The building also has a shared laundry with a tumble dryer and a separate ski storage with a waxing rack and ventilation. There is step-free access to the apartment, though it is not certified as fully accessible.

**Skistar building — central location in Levi** The Skistar building is in the centre of Levi. The main slopes are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails, restaurants, shops and après-ski venues are all close by. Free on-site parking with an electric outlet is available.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and toaster. Own drying cupboard. Shower and bathroom. Free WiFi and TV. Shampoo and body wash provided. Cot available on request.

**Please note:** This apartment does not have a private sauna. If your own sauna is important to your holiday, take a look at our 28 m² studios with sauna — for example Studio 104 with sauna.

Several of the building's studios are similar with small interior differences. Some of the apartments have a washing machine.`,
  },
  "skistar-studio-104": {
    name: "Skistar Studio 104 with Sauna — Levi Center",
    shortDescription:
      "28 m² Superior studio with private sauna in the Skistar building, Postintie. Built 2020. Tiled feature wall, underfloor heating. Fully equipped kitchen. No pets.",
    longDescription: `**Modern studio with sauna in Levi Center — Skistar building**

Smart, stylish and perfectly located. This modern 28 m² studio in the Skistar building, completed in 2020, offers everything you need for a comfortable Levi holiday. The studio comfortably sleeps up to 3 adults or a family of 2 adults and 2 children — an excellent choice for couples and small families alike. The main slopes are about 700 m away, and all services are within walking distance.

**Compact and cleverly designed** The studio has two beds and a sofa bed. The sofa bed works well as a sleeping spot for children or a third adult. For a family of two adults and two children, the layout is ideal — children on the sofa bed, parents in the main beds. The fully equipped kitchen has everything for home-style cooking: dishwasher, oven, microwave, coffee machine and toaster. The carefully chosen interior, with a striking tiled feature wall, brings a touch of Lapland atmosphere into your stay.

**Private sauna, drying cupboard and practical spaces** The warmth of your own electric sauna is the perfect way to wind down after a day on the slopes or trails. The apartment has its own drying cupboard for winter clothes and ski gear — everything is dry and warm by morning. The building also has a shared laundry with a tumble dryer and a separate ski storage with a waxing rack and ventilation.

**Skistar building — central location in Levi** The Skistar building is centrally located in Levi. The main slopes are about 700 m away — an easy short walk or a quick ski along the trail. Cross-country trails, restaurants, shops and après-ski venues are all close by. Free on-site parking with an electric outlet is available.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and toaster. Private sauna. Own drying cupboard. Free WiFi and TV. Shampoo and body wash provided. Cot available on request.

**Please note:** The building has several similar studios with small differences in interior. Some of the apartments have a washing machine.`,
  },
  "skistar-studio-319": {
    name: "Skistar Studio 319 with Sauna — Levi Center",
    shortDescription:
      "28 m² Superior studio with private sauna in the Skistar building, Postintie. Washing machine in apartment, drying cupboard. About 600 m to the slopes. No pets.",
    longDescription: `**Accommodation and layout**
Each studio has a combined living and sleeping area:

**Equipment and comforts**
The apartments are fully equipped for an easy holiday: a kitchen with appliances and tableware, duvets and pillows for all guests, and of course a private sauna — the highlight of a Lapland stay.

**Interior and atmosphere**
The interior is designed with comfort and practicality in mind. The lighting and materials create a warm, homely feel — perfect for a relaxing evening after an active day.

**Prime location in Levi Center**
All of Levi's restaurants, cafés, shops, ski slopes and cross-country trails are within walking distance. Despite the central location, the apartments offer a calm and comfortable setting.

**Welcome to the Skistar Studio** — an excellent choice for couples or small groups who want every essential service plus a private sauna in the best spot in Levi.`,
  },
  "skistar-studio-320": {
    name: "Skistar Studio 320 with Sauna — Levi Center",
    shortDescription:
      "28 m² studio with private sauna in the Skistar building, Postintie. Underfloor heating. Steps from the village shops. No pets.",
    longDescription: `**Modern studio with sauna in Levi Center — Skistar building**

Smart, stylish and perfectly located. This modern 28 m² studio in the Skistar building was completed in 2020 and offers everything you need for a comfortable Levi holiday. The studio comfortably sleeps up to 3 adults or a family of 2 adults and 2 children — making it an excellent choice for couples and small families alike. The main slopes are about 700 m away and all services are within walking distance.

**Compact and cleverly designed** The studio has two beds and a sofa bed. The sofa bed works well as a sleeping spot for children or a third adult. For a family of 2 adults and 2 children, the layout is ideal — children on the sofa bed, parents in the main beds. The fully equipped kitchen has everything for home-style cooking: dishwasher, oven, microwave, coffee machine and toaster. The carefully chosen interior, with a striking tiled wall, brings a touch of Lapland atmosphere into your stay.

**Private sauna, drying cupboard and practical comforts** Your own electric sauna is the perfect way to end a day on the slopes or trails. The apartment has its own drying cupboard for winter clothes and ski gear — everything is dry and warm by morning. The building also has a shared laundry with a tumble dryer and a separate ski storage with a waxing rack and ventilation.

**Skistar building — central location in Levi** The Skistar building is centrally located in Levi. The main slopes are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails, restaurants, shops and après-ski venues are all close by. Free on-site parking with an electric outlet is available.

**Everything included for a comfortable holiday** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and toaster. Private sauna. Own drying cupboard. Free WiFi and TV. Shampoo and body wash provided. Cot available on request.

**Please note:** The building has several similar studios with small differences in interior. Some of the apartments also have a washing machine.`,
  },
  "skistar-studio-321": {
    name: "Skistar Studio 321 with Sauna — Levi Center",
    shortDescription:
      "28 m² studio with private sauna in the Skistar building, Postintie. Underfloor heating. About 600 m to the slopes. No pets.",
    longDescription: `**Modern studio with sauna in Levi Center — Skistar building**

Smart, stylish and perfectly located. This modern 28 m² studio in the Skistar building was completed in 2020 and offers everything you need for a comfortable Levi holiday. The studio comfortably sleeps up to 3 adults or a family of 2 adults and 2 children — making it an excellent choice for couples and small families alike. The main slopes are about 700 m away and all services are within walking distance.

**Compact and cleverly designed** The studio has two beds and a sofa bed. The sofa bed works well as a sleeping spot for children or a third adult. For a family of 2 adults and 2 children, the layout is ideal — children on the sofa bed, parents in the main beds. The fully equipped kitchen has everything for home cooking: dishwasher, oven, microwave, coffee machine and toaster. The carefully chosen interior, with a striking tiled feature wall, brings a touch of Lapland atmosphere into your stay.

**Private sauna, drying cupboard and practical spaces** The löyly of your own electric sauna is the perfect way to end a day on the slopes or trails. The apartment has its own drying cupboard for winter clothes and ski gear — everything is dry and warm by morning. The building also has a shared laundry with a tumble dryer and a separate ski storage with a waxing rack and ventilation.

**Skistar building — central location in Levi** The Skistar building is centrally located in Levi. The main slopes are about 700 m away — an easy walk or a quick ski along the trail. Cross-country trails, restaurants, shops and après-ski venues are all close by. Free on-site parking with an electric outlet is available.

**Everything included for a comfortable stay** Fully equipped kitchen with dishwasher, oven, microwave, coffee machine and toaster. Private sauna. Own drying cupboard. Free WiFi and TV. Shampoo and shower gel provided. Cot available on request.

**Please note:** The building has several similar studios with small differences in interior. Some of the apartments have a washing machine.`,
  },

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
