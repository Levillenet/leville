// English translations for property landing pages (/en/accommodations/:slug).
// Mirrors the shape of propertyTranslationsFi.ts. Keyed by property slug.
// Copy rules: no dashes (– or —), no emojis, no price claims such as "fair price".

export interface PropertyEnTranslation {
  name?: string;
  shortDescription: string;
  /** Search engine description (meta description), max 155 characters. Falls back to a truncated shortDescription. */
  metaDescription?: string;
  /** Optional long-form description (Markdown-lite: paragraphs separated by blank lines, **bold**, bullets with "- "). */
  longDescription?: string;
}

/* ------------------------------------------------------------------ */

const LEVI_VILLAGE = `**Everything within walking distance in Levi village**
You stay in Levi village, right in the heart of Levi Center. The slopes, trails, restaurants, shops and après-ski venues are all within walking distance, so you will not need a car. Getting to activities is easy too, as most safari and excursion transfers depart from or pick up in Levi Center.`;
/* Shared copy blocks                                                  */
/* ------------------------------------------------------------------ */

const GLACIER_LOCATION = `**Location**
The Front Slope lifts are about 200 m away, and the cross-country trails run right past the building. Parking is free.`;

const GLACIER_BUILDING = `**The building**
The Eturinteen Alppikylä buildings were built in 2000 and have been updated over the years. Every apartment has its own ski locker by the front door, and the building has a shared heated ski maintenance room and a children's play and games room with air hockey.`;

const SKISTAR_LOCATION = `**Location**
The SkiStar building is at Postintie 3 in Levi Center, right next to the K-Market grocery store. The main slopes and the Front Slope lifts are about 700 m away, an easy walk. Cross-country trails start nearby, and restaurants, shops and après-ski venues are a short walk away. Parking is free, with an engine heater socket.`;

const SKISTAR_BUILDING = `The building has a shared laundry room with a tumble dryer and a ventilated ski storage room with a ski maintenance rack.`;

const SKISTAR_STUDIO_LAYOUT = `**Layout**
The studio has two beds and a sofa bed that suits children or a third adult. For a family of two adults and two children it works well: the children sleep on the sofa bed and the parents in the beds. The kitchen has everything you need for home cooking: dishwasher, oven, microwave, coffee maker and toaster. A tiled feature wall gives the interior a touch of Lapland.`;

const SKISTAR_1BR_LAYOUT = `**Layout**
The bedroom has two single beds, and the sofa bed in the living room sleeps one or two more. The open-plan kitchen and living room is bright and a good place to cook, relax and plan the next day.`;

const SKISTAR_1BR_AMENITIES = `**Amenities**
Fully equipped kitchen with dishwasher, oven, microwave, coffee maker and toaster. Private sauna, bathroom, drying cabinet, balcony, free WiFi and TV with HDMI. High chair available.`;

const SKISTAR_2BR_AMENITIES = `**Amenities**
Fully equipped kitchen with dishwasher, oven, microwave and coffee maker. Private sauna, bathroom, drying cabinet, balcony, free WiFi and TV. Cot and high chair available.`;

/* ------------------------------------------------------------------ */

export const propertyEn: Record<string, PropertyEnTranslation> = {
  "zero-point-5a2": {
    name: "Apartment 5A2, Hiihtäjänkuja",
    metaDescription:
      "Fully renovated two-bedroom apartment for 6 at Hiihtäjänkuja 5, Levi. Private sauna, fireplace and drying room, 200 m to the Front Slope. Pets allowed.",
    shortDescription:
      "Two-bedroom apartment in Levi Center, Zero Point area, about 200 m from the Front Slope, fully renovated in June 2024. Private sauna, heat-retaining fireplace, two new bathrooms, drying room, balcony and air source heat pump. Pets allowed.",
    longDescription: `**Fully renovated two-bedroom apartment in Levi Center**

The apartment is at Hiihtäjänkuja 5 in the Zero Point area, about 200 m from the Front Slope. The apartment sleeps six.

${LEVI_VILLAGE}

**Layout**
Both bedrooms have two single beds, and the downstairs lounge has a good quality sofa bed. The living room opens onto the balcony.

**Renovated in 2024**
The apartment was thoroughly renovated in June 2024. Both bathrooms were completely rebuilt, and almost every surface is new.

**Sauna, drying room and fireplace**
The downstairs entrance leads straight into the drying room: leave your skis and wet clothes to dry and go straight to the sauna. The heat-retaining fireplace in the living room keeps the apartment warm for hours. The air source heat pump keeps the temperature even in winter and cools in summer.

**Easy arrival**
There is only one low step up to the front door.`,
  },
  "zero-point-5b2": {
    name: "Apartment 5B2, Hiihtäjänkuja",
    metaDescription:
      "65 m² apartment for 6 at Hiihtäjänkuja 5, Levi. Fully renovated 2024, private sauna, fireplace and drying room, 200 m to the Front Slope. Pets allowed.",
    shortDescription:
      "65 m² two-bedroom apartment in Levi Center, Zero Point area, about 200 m from the Front Slope. Fully renovated 2024. Private sauna, heat-retaining fireplace and drying room. Downstairs lounge with PlayStation and 150 cm sofa bed. Pets allowed.",
    longDescription: `**65 m², two bedrooms and a downstairs lounge**

A spacious two-floor apartment at Hiihtäjänkuja 5 in the Zero Point area, about 200 m from the Front Slope. It was fully renovated in 2024, sleeps six and suits families and groups of friends.

${LEVI_VILLAGE}

**Two floors**
Upstairs there is an open-plan kitchen and living room and two bedrooms, each with two single beds. The downstairs lounge has a large TV, a PlayStation and a 150 cm sofa bed. It works as the children's own living room or as extra sleeping space.

**Sauna, fireplace and drying room**
The apartment has its own electric sauna and a fireplace. You enter the downstairs drying room straight from outside: leave your skis and wet gear to dry and go straight to the sauna.

**Location**
The Front Slope and Zero Point are about 200 m away, and restaurants, shops and après-ski venues are a short walk away. Cross-country trails start nearby. Parking is free, with an engine heater socket.

**Amenities**
Fully equipped kitchen with dishwasher, oven, microwave, coffee maker and ice maker. Private sauna, fireplace, drying room, drying cabinet, balcony, free WiFi and TV. High chair and safety gates for families.`,
  },
  "zero-point-5b5-penthouse": {
    name: "Penthouse 5B5, Hiihtäjänkuja",
    metaDescription:
      "100 m² penthouse for 9 at Hiihtäjänkuja 5, Levi. Four bedrooms, three balconies and a sauna with a slope view, 200 m to the Front Slope. Pets allowed.",
    shortDescription:
      "100 m² penthouse in Levi Center, Zero Point area, about 200 m from the Front Slope. Four bedrooms for 9, three balconies, sauna with a slope view and heat-retaining fireplace. Dining table for ten. Fully renovated 2024. Pets allowed.",
    longDescription: `**100 m² penthouse with a view of the Front Slope**

The top apartment of the building at Hiihtäjänkuja 5 is in the Zero Point area, about 200 m from the Front Slope. With four bedrooms and three balconies it is one of the most spacious holiday homes in Levi Center. It sleeps nine.

${LEVI_VILLAGE}

**Room for a big group**
The bedrooms have nine beds in total, and there is also a sofa bed in the living room. The dining table seats ten. The living room has a sofa, a large TV and a sound system.

**Three balconies**
The balconies off the living room and one bedroom look towards the Front Slope. In the evening you can watch the floodlit slope from indoors.

**Sauna and fireplace**
The sauna window faces the Front Slope. The heat-retaining fireplace in the living room warms the winter evenings, and firewood is included.

**Fully renovated in 2024**
The apartment was fully renovated in 2024 with new furniture and interior. The air source heat pump heats in winter and cools in summer. The building has private parking and a ski storage and maintenance room in the basement.

**Location**
The Front Slope and Zero Point are about 200 m away, cross-country trails start nearby, and restaurants, shops and other services are within walking distance.

**Amenities**
Fully equipped kitchen with dishwasher, oven, microwave and coffee maker. Sauna, fireplace with firewood, three balconies, air source heat pump, free WiFi, TV and sound system. Cot, high chair, safety gates, children's books and toys.`,
  },
  "karhupirtti": {
    name: "Karhupirtti, log villa in Levi Center",
    metaDescription:
      "Karhupirtti (Bear Lodge): 220 m² log villa for 14 at Skimbaajankuja 3, Levi Center. Seven bedrooms, outdoor hot tub and fireplace. Pets allowed.",
    shortDescription:
      "220 m² log villa in Levi Center for 14: seven bedrooms, outdoor hot tub, private yard and fireplace. Three downstairs bedrooms with their own shower and WC, five bathrooms with showers in total plus a separate upstairs WC. Fully renovated 2023. Firewood included. Pets allowed.",
    longDescription: `**220 m² log villa in Levi Center**

Karhupirtti, the Bear Lodge, is a round-log villa right in Levi Center at Skimbaajankuja 3. The Front Slope, restaurants and shops are about a three-minute walk away. The seven bedrooms sleep 14, which makes the villa a good fit for large families, family reunions and groups of friends. Pets are welcome.

${LEVI_VILLAGE}

**Seven bedrooms**
Downstairs there are three bedrooms, each with its own shower and WC. Upstairs there are two very large bedrooms, each with two beds, a TV and plenty of room for children to play. One of them also has a sofa bed. Next to each is a smaller bedroom with two full-size beds, which suits children well: the family stays close, but everyone has their own space.

There are five bathrooms with showers in total and a separate WC upstairs, so even a big group will not have to queue. The living and dining area seats the whole group for shared meals.

**Outdoor hot tub and barbecue**
The hot tub is in the villa's own large yard. On clear nights you can watch the Northern Lights from the tub. There is also a barbecue area in the yard.

**Fully renovated in 2023**
The villa was fully renovated in 2023 with high-quality materials: Pukkila tiles, Kährs floors, walnut ceilings, a black kitchen and Miele appliances. The result combines the feel of a log villa with modern comfort. A designer fireplace adds warmth and atmosphere.

**Location**
The Front Slope, the Lastenmaa children's area, a grocery store, restaurants and après-ski venues are a short walk away. The nearest snowmobile trail is about 250 m away. There is plenty of parking. The villa has a ski storage and maintenance room and a utility room for laundry.

**Amenities**
Fully equipped kitchen with dishwasher, oven, microwave, coffee maker and freezer. Electric sauna, designer fireplace, outdoor hot tub and barbecue. Air source heat pump, free WiFi, TV and sound system. Cot and safety gates available.`,
  },
  "skistar-211": {
    name: "Superior Suite 211, Postintie",
    metaDescription:
      "54 m² two-bedroom apartment for 6 at Postintie 3, Levi Center. Private sauna, balcony, end unit with a forest view. Step-free access.",
    shortDescription:
      "54 m² two-bedroom Superior apartment in the SkiStar building in Levi Center. Private sauna and balcony. End unit with a forest view. Step-free access. No pets.",
    longDescription: `**54 m², two bedrooms and a private sauna**

A modern apartment in the SkiStar building at Postintie 3, Levi Center. It sleeps six and suits families and groups of friends. Restaurants, shops and services are within walking distance, and the main slopes are about 700 m away.

${LEVI_VILLAGE}

**Layout**
Both bedrooms have two single beds, and the living room has a sofa bed. The open-plan kitchen and living room has plenty of space for cooking and spending time together after a day on the slopes. As an end unit, 211 has windows facing the forest and more privacy than usual.

**Sauna and drying cabinet**
Your own electric sauna for the end of a ski day. Wet gear and outdoor clothes dry overnight in the drying cabinet. ${SKISTAR_BUILDING}

${SKISTAR_LOCATION} The apartment has step-free access, although it is not certified as fully accessible.

${SKISTAR_2BR_AMENITIES}`,
  },
  "skistar-212": {
    name: "Superior Suite 212, Postintie",
    metaDescription:
      "54 m² two-bedroom apartment for 6 at Postintie 3, Levi Center. Private sauna, balcony, underfloor heating, end unit with a forest view.",
    shortDescription:
      "54 m² two-bedroom Superior apartment in the SkiStar building in Levi Center. Private sauna, balcony and underfloor heating. End unit with a forest view. No pets.",
    longDescription: `**54 m², two bedrooms and a private sauna**

A modern apartment in the SkiStar building at Postintie 3, Levi Center. It sleeps six and suits families and groups of friends. Restaurants, shops and services are within walking distance, and the main slopes are about 700 m away.

${LEVI_VILLAGE}

**Layout**
Both bedrooms have two single beds, and the living room has a sofa bed. The open-plan kitchen and living room has plenty of space for cooking and spending time together after a day on the slopes. Underfloor heating keeps the floors warm. As an end unit, 212 has windows facing the forest and more privacy than usual.

**Sauna and drying cabinet**
Your own electric sauna for the end of a ski day. Wet gear and outdoor clothes dry overnight in the drying cabinet. ${SKISTAR_BUILDING}

${SKISTAR_LOCATION} The apartment has step-free access, although it is not certified as fully accessible.

${SKISTAR_2BR_AMENITIES}`,
  },
  "skistar-209": {
    name: "Superior 209, Levi Center",
    metaDescription:
      "43 m² one-bedroom apartment for 4 at Postintie 3, Levi Center. Private sauna and balcony, step-free access. Book directly at Leville.net.",
    shortDescription:
      "43 m² one-bedroom Superior apartment completed in 2021, with private sauna in the SkiStar building. Step-free, no stairs. Carefully designed interior. No pets.",
    longDescription: `**43 m², one bedroom and a private sauna**

A one-bedroom apartment completed in 2021 in the SkiStar building at Postintie 3, Levi Center. It sleeps four, so it suits couples and small families. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_1BR_LAYOUT}

**Sauna and drying cabinet**
Your own electric sauna after a day on the slopes, and a drying cabinet that has your gear dry by morning. ${SKISTAR_BUILDING} The apartment has step-free access with no stairs, although it is not certified as fully accessible.

${SKISTAR_LOCATION}

${SKISTAR_1BR_AMENITIES}`,
  },
  "skistar-210": {
    name: "Superior 210, Levi Center",
    metaDescription:
      "43 m² one-bedroom apartment for 4 at Postintie 3, Levi Center. Private sauna and balcony, step-free access. Book directly at Leville.net.",
    shortDescription:
      "43 m² one-bedroom Superior apartment completed in 2021, with private sauna in the SkiStar building. Step-free, no stairs. Luggage storage available. No pets.",
    longDescription: `**43 m², one bedroom and a private sauna**

A one-bedroom apartment completed in 2021 in the SkiStar building at Postintie 3, Levi Center. It sleeps four, so it suits couples and small families. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_1BR_LAYOUT}

**Sauna and drying cabinet**
Your own electric sauna after a day on the slopes, and a drying cabinet that has your gear dry by morning. The building has a shared laundry room and a lockable, ventilated ski storage room with a maintenance rack. The apartment has step-free access with no stairs, although it is not certified as fully accessible.

${SKISTAR_LOCATION}

${SKISTAR_1BR_AMENITIES}`,
  },
  "skistar-310": {
    name: "Superior 310, Levi Center",
    metaDescription:
      "43 m² one-bedroom apartment for 4 at Postintie 3, Levi Center. Private sauna and balcony. About 700 m to the main slopes.",
    shortDescription:
      "43 m² one-bedroom Superior apartment completed in 2021, with private sauna on the third floor of the SkiStar building. Carefully designed interior. No lift in the building. No pets.",
    longDescription: `**43 m², one bedroom and a private sauna**

A one-bedroom apartment completed in 2021 on the third floor of the SkiStar building at Postintie 3, Levi Center. It sleeps four, so it suits couples and small families. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_1BR_LAYOUT}

**Sauna and drying cabinet**
Your own electric sauna after a day on the slopes, and a drying cabinet that has your gear dry by morning. ${SKISTAR_BUILDING} Please note that the apartment is on the third floor and the building has no lift.

${SKISTAR_LOCATION}

${SKISTAR_1BR_AMENITIES}`,
  },
  "skistar-studio-102": {
    name: "Studio 102, Postintie",
    metaDescription:
      "24 m² studio in Levi Center at Postintie 3. Built 2021, step-free access, next to the K-Market. No sauna, our most compact apartment.",
    shortDescription:
      "24 m² studio in the SkiStar building at Postintie 3, Levi Center. Built 2021. Our most compact apartment: no sauna, but step-free access with no stairs. A few steps from the K-Market. No pets.",
    longDescription: `**Modern studio in Levi Center**

A 24 m² studio completed in 2021 in the SkiStar building at Postintie 3. It sleeps three adults or a family of two adults and two children. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_STUDIO_LAYOUT}

**Drying cabinet and shared facilities**
Winter clothes and gear dry overnight in the drying cabinet. ${SKISTAR_BUILDING} The studio has step-free access, although it is not certified as fully accessible.

${SKISTAR_LOCATION}

**Amenities**
Fully equipped kitchen, drying cabinet, bathroom with shower, free WiFi and TV. Shampoo and shower gel provided. Cot on request.

**Please note**
This studio has no sauna. If a private sauna matters to you, choose one of our 28 m² studios with a sauna, for example Studio 104. The building has several similar studios with small differences in the interior, and some have a washing machine.`,
  },
  "skistar-studio-104": {
    name: "Superior Studio 104 with sauna, Postintie",
    metaDescription:
      "28 m² studio with private sauna at Postintie 3, Levi Center. Built 2021, underfloor heating, step-free access. Sleeps 3 adults or a family of 4.",
    shortDescription:
      "28 m² Superior studio with private sauna in the SkiStar building at Postintie 3. Built 2021. Tiled feature wall and underfloor heating. Fully equipped kitchen with dishwasher. Step-free access. No pets.",
    longDescription: `**28 m² studio with a private sauna**

A modern studio completed in 2021 in the SkiStar building at Postintie 3, Levi Center. It sleeps three adults or a family of two adults and two children. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_STUDIO_LAYOUT}

**Sauna and drying cabinet**
Your own electric sauna is the best way to end a day on the slopes or trails. Winter clothes and gear dry overnight in the drying cabinet, and underfloor heating keeps the floors warm. ${SKISTAR_BUILDING} The studio has step-free access, although it is not certified as fully accessible.

${SKISTAR_LOCATION}

**Amenities**
Fully equipped kitchen, private sauna, drying cabinet, underfloor heating, free WiFi and TV. Shampoo and shower gel provided. Cot on request.

**Please note**
The building has several similar studios with small differences in the interior. Some also have a washing machine.`,
  },
  "skistar-studio-319": {
    name: "Superior Studio 319, Levi Center",
    metaDescription:
      "28 m² studio with private sauna and washing machine at Postintie 3, Levi Center. Sleeps 3 adults or a family of 4, next to the K-Market.",
    shortDescription:
      "28 m² Superior studio with private sauna in the SkiStar building at Postintie 3. Own washing machine and drying cabinet. A few steps from the K-Market, about 700 m to the lifts. No pets.",
    longDescription: `**28 m² studio with a private sauna and washing machine**

A modern studio in the SkiStar building at Postintie 3, Levi Center. It sleeps three adults or a family of two adults and two children. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_STUDIO_LAYOUT}

**Sauna, washing machine and drying cabinet**
Your own electric sauna is the best way to end a day on the slopes or trails. The studio has its own washing machine, and winter clothes and gear dry overnight in the drying cabinet. Duvets and pillows are ready for every guest. ${SKISTAR_BUILDING}

${SKISTAR_LOCATION}

**Amenities**
Fully equipped kitchen, private sauna, washing machine, drying cabinet, free WiFi and TV. Cot on request.`,
  },
  "skistar-studio-320": {
    name: "Studio 320 with sauna, Levi Center",
    metaDescription:
      "28 m² studio with private sauna at Postintie 3, Levi Center. Underfloor heating, drying cabinet, next to the K-Market. Sleeps 3 adults or a family of 4.",
    shortDescription:
      "28 m² studio with private sauna in the SkiStar building at Postintie 3. Underfloor heating. A few steps from the K-Market. No pets.",
    longDescription: `**28 m² studio with a private sauna**

A modern studio completed in 2021 in the SkiStar building at Postintie 3, Levi Center. It sleeps three adults or a family of two adults and two children. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_STUDIO_LAYOUT}

**Sauna and drying cabinet**
Your own electric sauna is the best way to end a day on the slopes or trails. Winter clothes and gear dry overnight in the drying cabinet, and underfloor heating keeps the floors warm. ${SKISTAR_BUILDING}

${SKISTAR_LOCATION}

**Amenities**
Fully equipped kitchen, private sauna, drying cabinet, underfloor heating, free WiFi and TV. Shampoo and shower gel provided. Cot on request.

**Please note**
The building has several similar studios with small differences in the interior. Some also have a washing machine.`,
  },
  "skistar-studio-321": {
    name: "Studio 321 with sauna, Levi Center",
    metaDescription:
      "28 m² studio with private sauna at Postintie 3, Levi Center. Underfloor heating, drying cabinet, next to the K-Market. Sleeps 3 adults or a family of 4.",
    shortDescription:
      "28 m² studio with private sauna in the SkiStar building at Postintie 3. Underfloor heating. A few steps from the K-Market, about 700 m to the lifts. No pets.",
    longDescription: `**28 m² studio with a private sauna**

A modern studio completed in 2021 in the SkiStar building at Postintie 3, Levi Center. It sleeps three adults or a family of two adults and two children. The main slopes are about 700 m away, and services are within walking distance.

${LEVI_VILLAGE}

${SKISTAR_STUDIO_LAYOUT}

**Sauna and drying cabinet**
Your own electric sauna is the best way to end a day on the slopes or trails. Winter clothes and gear dry overnight in the drying cabinet, and underfloor heating keeps the floors warm. ${SKISTAR_BUILDING}

${SKISTAR_LOCATION}

**Amenities**
Fully equipped kitchen, private sauna, drying cabinet, underfloor heating, free WiFi and TV. Shampoo and shower gel provided. Cot on request.

**Please note**
The building has several similar studios with small differences in the interior. Some also have a washing machine.`,
  },
  "karhunvartija-3": {
    name: "Karhunvartija 3, Levi Center",
    metaDescription:
      "42 m² apartment for 4 in Levi Center at Skimbaajankuja 4. Two bedrooms, private sauna and natural stone fireplace. Pets allowed.",
    shortDescription:
      "42 m² single-level apartment in Levi Center: two bedrooms, private sauna and natural stone fireplace. Own entrance from Ratsastajankuja straight into the building's yard. Firewood included. Pets allowed.",
    longDescription: `**Single-level apartment with fireplace and sauna**

A cosy apartment in the Karhunvartija building right in Levi Center, at Skimbaajankuja 4. Restaurants, shops and activities are within walking distance, and the slopes and trails start a short walk from the door. Pets are welcome.

${LEVI_VILLAGE}

**Layout**
The 42 m² apartment is on one level and sleeps four. It has a hallway, an open-plan kitchen and living room, two bedrooms (one with a sofa bed for two), a bathroom, a separate WC and a private sauna. The natural stone fireplace makes for cosy evenings, and firewood is included.

**Easy with children**
The private entrance from Ratsastajankuja opens straight into the building's yard, where children can play in the snow. Playgrounds are close by.`,
  },
  "levi-platinum-a2": {
    name: "Levi Platinum Superior Studio A2",
    metaDescription:
      "37 m² Platinum studio for 4 at the foot of the Front Slope, Hiihtäjänkuja 2, Levi. Completed 2021, private sauna, washing machine and own parking space.",
    shortDescription:
      "37 m² Platinum studio at the foot of the Front Slope, completed in 2021. Private sauna, washing machine, drying cabinet and underfloor heating. Own parking space. No pets.",
    longDescription: `**Nearly new studio at the foot of the Front Slope**

The Levi Platinum studio is at Hiihtäjänkuja 2 in Levi Center, at the foot of the Front Slope, and everything in the village is a short walk away. The building was completed in 2021, so the apartment is nearly new. The studio sleeps four, and there is a private parking space in the yard.

${LEVI_VILLAGE}

**Home-like comfort**
The fully equipped kitchen lets you cook just as you would at home. Underfloor heating keeps the floors warm, and the bathroom has a washing machine and a drying cabinet for ski and outdoor gear. At the end of the day you can relax in your own sauna.

**Amenities**
Fully equipped kitchen, private sauna, washing machine, drying cabinet, underfloor heating, free WiFi and TV. Own parking space in the yard.`,
  },
  "moonlight-415": {
    name: "Moonlight 415, loft studio",
    metaDescription:
      "28 m² loft studio for 4 next to Hullu Poro, Leviraitti, Levi Center. Largely renovated 2026, private sauna, washing machine and drying cabinet.",
    shortDescription:
      "28 m² loft studio next to Hullu Poro in Levi Center, largely renovated 2026. Three beds in the loft (steep stairs) and a sofa bed downstairs. Private sauna, washing machine and drying cabinet. About 400 m to slopes and trails, 150 m to the shop. No pets.",
    longDescription: `**Loft studio with sauna next to Hullu Poro**

The studio is on Leviraitti in Levi Center, right next to Hullu Poro. The 28 m² apartment sleeps four: three beds in the loft and a sofa bed downstairs. It was largely renovated and renewed in 2026, and the exposed log wall gives it real Lapland warmth.

${LEVI_VILLAGE}

**Layout**
Downstairs there is a dining table, a sofa and a kitchenette with dishwasher, oven, microwave, coffee maker and toaster. The stairs to the loft are steep. There is a safety gate for children, but the stairs may be difficult for older guests.

**Sauna, washing machine and drying cabinet**
The apartment has its own sauna, washing machine and drying cabinet, so your gear dries overnight. The building also has a ski storage and maintenance room.

**Location**
The slopes and trails are about 400 m away, and the sledging hill runs past the building. The nearest shop is 150 m away. One parking space with an engine heater socket is included.

**Amenities**
Kitchenette, private sauna, washing machine, drying cabinet, free WiFi and TV. Bed linen and towels can be ordered as an extra, or bring your own.`,
  },
  "glacier-a1": {
    name: "Levi Glacier A1",
    metaDescription:
      "92 m² apartment for 8 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Four bedrooms, private sauna, 200 m to the lifts. Pets allowed.",
    shortDescription:
      "92 m² apartment at the foot of the Front Slope, Zero Point area. Four bedrooms for eight. Two floors: street level and a lower floor with its own exit. Private sauna, heated ski storage and a children's playroom in the building. Pets allowed.",
    longDescription: `**92 m² and four bedrooms at the foot of the Front Slope**

One of our largest apartments and one of the closest to the slopes. The apartment is in Eturinteen Alppikylä at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The four bedrooms sleep eight, so it suits families, groups of friends and sports teams. Pets are welcome.

${LEVI_VILLAGE}

**Two floors**
The four bedrooms have eight beds in total. The living areas are on street level, and the lower floor has its own exit and access to the ski maintenance room. There is only one step up to the front door. The spacious kitchen and living room fits the whole group for meals and evenings together.

**Sauna and drying cabinet**
The apartment has its own sauna, washing machine and drying cabinet. Its size also makes it a good choice for longer stays.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, washing machine, drying cabinet, ski locker, WiFi, TV and radio. Pets allowed. The same building has an identical apartment, A3.`,
  },
  "glacier-a2": {
    name: "Levi Glacier A2",
    metaDescription:
      "67 m² three-bedroom apartment for 5 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Private sauna, full-width balcony. Pets allowed.",
    shortDescription:
      "67 m² three-bedroom apartment at the foot of the Front Slope, Zero Point area. Five beds for five guests. Full-width balcony. Private sauna. Pets allowed.",
    longDescription: `**67 m² and three bedrooms at the foot of the Front Slope**

The apartment is in Eturinteen Alppikylä at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The three bedrooms sleep five, and the apartment suits families and small groups who want to stay as close to the slopes as possible. Pets are welcome.

${LEVI_VILLAGE}

**Three bedrooms on two levels**
The bedrooms have five beds in total. The living areas are on street level, and the lower floor has its own exit and access to the ski maintenance room. There is only one step up to the front door. The full-width balcony gives you a view of village life.

**Sauna and drying cabinet**
Your own sauna after a day on the slopes. Washing machine and drying cabinet included.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, washing machine, drying cabinet, ski locker, full-width balcony, WiFi and TV. Pets allowed.

**Need more space?**
The same building also has the 92 m² four-bedroom apartments A1 and A3 for eight guests.`,
  },
  "glacier-a3": {
    name: "Levi Glacier A3",
    metaDescription:
      "92 m² apartment for 8 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Four bedrooms, private sauna, 200 m to the lifts. Pets allowed.",
    shortDescription:
      "92 m² four-bedroom apartment at the foot of the Front Slope, in the same building as A1. Two floors: street level and a lower floor. A few steps from the slopes. Private sauna and a children's playroom in the building. Pets allowed.",
    longDescription: `**92 m² and four bedrooms at the foot of the Front Slope**

One of our largest apartments and one of the closest to the slopes. The apartment is in Eturinteen Alppikylä at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The four bedrooms sleep eight, so it suits families, groups of friends and sports teams. Pets are welcome.

${LEVI_VILLAGE}

**Two floors**
The four bedrooms have eight beds in total. The living areas are on street level, and the lower floor has its own exit and access to the ski maintenance room. There is only one step up to the front door. The spacious kitchen and living room fits the whole group for meals and evenings together.

**Sauna and drying cabinet**
The apartment has its own sauna, washing machine and drying cabinet. Its size also makes it a good choice for longer stays.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, washing machine, drying cabinet, ski locker, WiFi, TV and radio. Pets allowed. The same building has an identical apartment, A1.`,
  },
  "glacier-a4": {
    name: "Levi Glacier A4",
    metaDescription:
      "72 m² apartment for 6 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Two bedrooms plus alcoves, private sauna. Pets allowed.",
    shortDescription:
      "72 m² second-floor apartment at the foot of the Front Slope. Two bedrooms and two alcove beds upstairs, six guests in total. Balconies on both levels. Private sauna. Pets allowed.",
    longDescription: `**72 m², two bedrooms and alcoves upstairs**

The apartment is on the second floor of the Eturinteen Alppikylä building at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The two bedrooms have four beds, and the open alcoves upstairs have two more, so the apartment sleeps six. Children love the alcoves. Pets are welcome.

${LEVI_VILLAGE}

**Balconies on two levels**
The full-width balcony faces the street and Hullu Poro Arena, and there is a second balcony upstairs facing the same way. From the balcony you can follow Levi's evening life.

**Sauna**
Your own sauna after a day on the slopes.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, balconies on two levels, WiFi and TV. Pets allowed. The same building has an identical apartment, A6, and the 67 m² three-bedroom apartment A2.`,
  },
  "glacier-a5-penthouse": {
    name: "Levi Glacier Penthouse A5",
    metaDescription:
      "84 m² penthouse for 8 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Four bedrooms, private sauna, two balconies. Pets allowed.",
    shortDescription:
      "84 m² top-floor penthouse at the foot of the Front Slope. Four bedrooms for eight. Balconies on two levels. Private sauna and a children's playroom in the building. Pets allowed.",
    longDescription: `**84 m² penthouse with four bedrooms**

The penthouse is on the top floor of the Eturinteen Alppikylä building at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The balconies face Hullu Poro Arena. The four bedrooms sleep eight, so it suits large families, two families together or groups of friends. Pets are welcome.

${LEVI_VILLAGE}

**Four bedrooms**
Each bedroom has two beds that can be kept apart or pushed together. The top-floor position makes the apartment bright and airy. Two balconies face the street and Hullu Poro Arena.

**Sauna**
Your own sauna to end the day.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, balconies on two levels, WiFi and TV. Pets allowed.`,
  },
  "glacier-a6": {
    name: "Levi Glacier A6",
    metaDescription:
      "72 m² apartment for 6 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Two bedrooms plus alcoves, private sauna. Pets allowed.",
    shortDescription:
      "72 m² second-floor apartment at the foot of the Front Slope. Two bedrooms and two alcove beds upstairs, six guests in total. Balconies facing the street. Same layout as A4. Pets allowed.",
    longDescription: `**72 m², two bedrooms and alcoves upstairs**

The apartment is on the second floor of the Eturinteen Alppikylä building at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The two bedrooms have four beds, and the open alcoves upstairs have two more, so the apartment sleeps six. Children love the alcoves. Pets are welcome.

${LEVI_VILLAGE}

**Balconies on two levels**
The full-width balcony faces the street and Hullu Poro Arena, and there is a second balcony upstairs facing the same way. From the balcony you can follow Levi's evening life.

**Sauna**
Your own sauna after a day on the slopes.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, balconies on two levels, WiFi and TV. Pets allowed. The same building has an identical apartment, A4, and the 67 m² three-bedroom apartment A2.`,
  },
  "glacier-b1": {
    name: "Levi Glacier B1",
    metaDescription:
      "105 m² apartment for 10 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Five bedrooms, private sauna, slope view. Pets allowed.",
    shortDescription:
      "105 m² first-floor apartment with five bedrooms, two beds in each. Full-width balcony with a view of the Front Slope. Children's playroom in the building. Bed linen as an extra. Pets allowed.",
    longDescription: `**105 m² and five bedrooms for ten**

The largest apartment in the Glacier buildings and one of the best group stays next to the Levi slopes. It is in Eturinteen Alppikylä at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. It suits large families, sports teams and groups of friends who want space and a location right by the slopes. Pets are welcome.

${LEVI_VILLAGE}

**Five bedrooms**
Each of the five bedrooms has two beds, so everyone has their own space. The apartment is on the first floor, and the full-width balcony on the side street looks towards the Front Slope. The spacious living area is good for shared meals, game nights and relaxing after a day on the slopes.

**Sauna**
A private sauna for the whole group.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, full-width balcony with a slope view, WiFi and TV. Bed linen can be ordered as an extra, or bring your own. Pets allowed.

**For a bigger group**
The same building has an identical apartment, B2. If B1 is booked, check B2, or book both for a group of 20.`,
  },
  "glacier-b2": {
    name: "Levi Glacier B2",
    metaDescription:
      "105 m² apartment for 10 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Five bedrooms, private sauna, slope view. Pets allowed.",
    shortDescription:
      "105 m² first-floor apartment with five bedrooms. The twin of B1, together they sleep 20. Full-width balcony with a view of the Front Slope. Pets allowed.",
    longDescription: `**105 m² and five bedrooms for ten**

One of the two largest apartments in the Glacier buildings and one of the best group stays next to the Levi slopes. It is in Eturinteen Alppikylä at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. It suits large families, sports teams and groups of friends. Pets are welcome.

${LEVI_VILLAGE}

**Five bedrooms**
Each of the five bedrooms has two beds. The apartment is on the first floor, and the full-width balcony on the side street looks towards the Front Slope. The spacious living area fits the whole group for shared meals.

**Sauna**
A private sauna for the whole group.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, full-width balcony with a slope view, WiFi and TV. Bed linen can be ordered as an extra, or bring your own. Pets allowed.

**For a bigger group**
The same building has an identical apartment, B1. If B2 is booked, check B1, or book both for a group of 20.`,
  },
  "glacier-b3-penthouse": {
    name: "Levi Glacier Penthouse B3",
    metaDescription:
      "87 m² penthouse for 8 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Three bedrooms plus alcoves, sauna, slope-view balcony.",
    shortDescription:
      "87 m² penthouse at the foot of the Front Slope. Three bedrooms and two alcove beds upstairs, eight guests in total. Balconies on both levels, the upper one facing the Front Slope. Children's playroom in the building. Pets allowed.",
    longDescription: `**87 m² penthouse with a balcony facing the Front Slope**

A spacious penthouse on the top floor of the Eturinteen Alppikylä building at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The three bedrooms and the open alcoves upstairs sleep eight. The upper balcony faces the Front Slope, so you can watch the floodlit slope from your own balcony in the evening. Pets are welcome.

${LEVI_VILLAGE}

**Three bedrooms and alcoves**
The main floor has three bedrooms, and the open alcoves upstairs have two beds that children love. The full-width balcony on the main floor faces the street, and the upper balcony faces the Front Slope.

**Sauna**
Your own sauna to end the day.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, balconies on two levels, WiFi and TV. Pets allowed.

**For a bigger group**
The same building has an identical penthouse, B4. If B3 is booked, check B4, or book both for a group of 16.`,
  },
  "glacier-b4-penthouse": {
    name: "Levi Glacier Penthouse B4",
    metaDescription:
      "87 m² penthouse for 8 at the foot of the Front Slope, Ratsastajankuja 2, Levi. Three bedrooms plus alcoves, sauna, slope-view balcony.",
    shortDescription:
      "87 m² penthouse at the foot of the Front Slope, the mirror image of B3. Three bedrooms and two alcove beds upstairs, eight guests in total. Balconies on both levels, the upper one facing the Front Slope. Children's playroom in the building. Pets allowed.",
    longDescription: `**87 m² penthouse with a balcony facing the Front Slope**

One of two identical penthouses on the top floor of the Eturinteen Alppikylä building at Ratsastajankuja 2, Zero Point area, about 200 m from the Front Slope lifts. The three bedrooms and the open alcoves upstairs sleep eight. The upper balcony faces the Front Slope, so you can watch the floodlit slope from your own balcony in the evening. Pets are welcome.

${LEVI_VILLAGE}

**Three bedrooms and alcoves**
Downstairs there are three bedrooms, and the open alcoves upstairs have two beds that children love. The full-width balcony downstairs faces the street, and the upper balcony faces the Front Slope.

**Sauna**
Your own sauna to end the day.

${GLACIER_LOCATION}

${GLACIER_BUILDING}

**Amenities**
Fully equipped kitchen, private sauna, ski locker, balconies on two levels, WiFi and TV. Pets allowed.

**For a bigger group**
The same building has an identical penthouse, B3. If B4 is booked, check B3, or book both for a group of 16.`,
  },
};

export const locationEn: Record<string, string> = {
  "Levi Center": "Levi Center",
  "Front Slope": "Levi Front Slope, Zero Point area",
  "Glacier": "At the foot of Front Slope, Zero Point area",
};

// Per-slug location overrides (English), used when the generic location label is misleading.
export const locationEnBySlug: Record<string, string> = {
  "zero-point-5a2": "Levi Front Slope, Zero Point area",
  "zero-point-5b2": "Levi Front Slope, Zero Point area",
  "zero-point-5b5-penthouse": "Levi Front Slope, Zero Point area",
};

export const translateYearEn = (s: string): string => {
  if (!s) return "";
  // Source strings in properties.ts are already in English ("Built 2024",
  // "Renovated 2018", "Fully renovated 2024", etc.) so this is a passthrough
  // for the EN variant. Kept as a function for symmetry with translateYearFi
  // and so future locale-specific cleanups (month casing, etc.) have one place.
  return s;
};
