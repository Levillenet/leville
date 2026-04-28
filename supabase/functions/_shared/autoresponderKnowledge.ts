// Knowledge base for the Gmail auto-responder.
// Direct, link-first answers. Never asks follow-up questions.

export const SITE_URL = "https://leville.net";

export const KNOWLEDGE_LINKS = [
  { topic: "sauna", keywords: ["sauna", "kiuas", "loyly", "löyly", "bastu", "saune"], url: `${SITE_URL}/sauna`,
    summary: "Sauna instructions: heating time 30-45 min, electric stove with timer (zone A immediate, zone B delayed start)." },
  { topic: "fireplace", keywords: ["fireplace", "takka", "takan", "takkaa", "puulla", "puut", "polttopuu", "halko", "halot", "kamin", "kamine", "cheminée", "chimenea", "haard", "openhaard", "wood stove", "puuhella", "tuli"], url: `${SITE_URL}/takkaohjeet`,
    summary: "Fireplace lighting instructions with safety video." },
  { topic: "heating", keywords: ["heating", "lammitys", "lämmitys", "warm", "kylma", "kylmä", "cold", "heat pump", "lampopumppu", "lämpöpumppu", "floor heating", "lattialammitys", "lattialämmitys", "heizung", "kalt", "chauffage", "froid", "calefacción", "frío", "verwarming", "koud"], url: `${SITE_URL}/asiakaspalvelu`,
    summary: "Heating is centrally managed; if your apartment feels cold contact us via the support page." },
  { topic: "wifi", keywords: ["wifi", "wi-fi", "internet", "salasana", "password", "passwort", "mot de passe", "contraseña", "wachtwoord", "lösenord"], url: `${SITE_URL}/asiakaspalvelu`,
    summary: "Wi-Fi network and password are printed in the welcome letter inside the apartment." },
  { topic: "checkin", keywords: ["check-in", "check in", "checkin", "sisaankirjautuminen", "sisäänkirjautuminen", "saapuminen", "arrival", "ovi", "door", "code", "koodi", "key", "avain", "ankunft", "schlüssel", "tür", "arrivée", "porte", "clé", "llegada", "puerta", "llave", "aankomst", "deur", "sleutel"], url: `${SITE_URL}/asiakaspalvelu`,
    summary: "Self-check-in with a door code sent by SMS/email on arrival day. Standard check-in from 16:00, check-out by 11:00. If you arrive after office hours and have no code, the code is delivered automatically — check spam folder. Door codes work for the entire stay." },
  { topic: "checkout", keywords: ["check-out", "checkout", "lahto", "lähtö", "departure"], url: `${SITE_URL}/asiakaspalvelu`,
    summary: "Check-out by 11:00. Leave dishes washed, take trash to the building's waste room, lock the door behind you." },
  { topic: "support", keywords: ["help", "apu", "support", "yhteys", "contact", "asiakaspalvelu"], url: `${SITE_URL}/asiakaspalvelu`,
    summary: "Customer support page with FAQ, instructions and contact options." },
  { topic: "directions", keywords: ["directions", "ajo-ohje", "miten paasta", "how to get", "transport", "taksi", "bus", "lentokentta", "kittila"], url: `${SITE_URL}/opas/liikkuminen-levilla`,
    summary: "How to get to Levi: Kittilä airport 15 km, taxi calculator and bus options." },
  { topic: "activities", keywords: ["activities", "aktiviteetit", "tekeminen", "things to do", "husky", "snowmobile", "moottorikelkka", "ski", "laskettelu"], url: `${SITE_URL}/opas/matkaopas-levi`,
    summary: "Levi activities and travel guide." },
  { topic: "restaurants", keywords: ["restaurant", "ravintola", "dinner", "ruoka", "food"], url: `${SITE_URL}/opas/levin-ravintolat-ja-annokset`,
    summary: "Restaurant guide with price ranges and signature dishes." },
  { topic: "weather", keywords: ["weather", "saa", "sää", "snow", "lumi", "temperature"], url: `${SITE_URL}/levi/saatieto-levilta`,
    summary: "Live weather and snow depth from Levi." },
  { topic: "ski-passes", keywords: ["ski pass", "hissilippu", "lift ticket"], url: `${SITE_URL}/asiakaspalvelu`,
    summary: "Discounted ski pass packages bookable via guest support." },
  { topic: "accommodations", keywords: ["apartment", "huoneisto", "cabin", "mokki", "mökki", "majoitus", "accommodation"], url: `${SITE_URL}/majoitukset`,
    summary: "All Leville apartments and cabins overview." },
  { topic: "booking-terms", keywords: ["terms", "ehdot", "varausehdot", "cancellation", "peruutus"], url: `${SITE_URL}/varausehdot`,
    summary: "Booking and cancellation terms." },
  { topic: "company", keywords: ["company", "yritys", "leville", "about us"], url: `${SITE_URL}/yritys`,
    summary: "About Leville Oy (Business ID 3178413-5)." },
  // Property-specific guides (each maps to its own guest guide page)
  { topic: "skistar", keywords: ["skistar", "skiestar", "ski star"], url: `${SITE_URL}/opas/skistar`,
    summary: "Skistar Lodge guest guide: door code arrives by SMS/email on arrival day, building entrance and apartment door use the same code, parking instructions, sauna and check-out steps." },
  { topic: "bearlodge", keywords: ["bearlodge", "bear lodge", "karhu"], url: `${SITE_URL}/opas/bearlodge`,
    summary: "Bearlodge guest guide: arrival, door code, parking, sauna, fireplace and check-out instructions." },
  { topic: "frontslope", keywords: ["frontslope", "front slope", "etu rinne", "etu-rinne"], url: `${SITE_URL}/opas/front-slope`,
    summary: "Front Slope guest guide: arrival, door code, parking, sauna and check-out instructions." },
];

export const EMERGENCY_GUIDANCE =
  "For non-critical issues we will respond during office hours (Mon-Fri 9-17 EET, Helsinki time). " +
  "For critical emergencies (water leak, fire, smell of gas, total power outage, no heat in winter) please contact our maintenance partner directly: +358 44 13 13 13.";

export const OFFICE_HOURS_NOTE =
  "Our office is staffed Monday to Friday between 09:00 and 17:00 Helsinki time (EET/EEST).";

// Detect which whitelisted topic (if any) the email is about.
// Returns the topic key (e.g. "sauna") or null.
export function detectTopic(text: string): string | null {
  const t = (text || "").toLowerCase();
  let bestTopic: string | null = null;
  let bestHits = 0;
  for (const k of KNOWLEDGE_LINKS) {
    let hits = 0;
    for (const kw of k.keywords) {
      if (kw && t.includes(kw.toLowerCase())) hits++;
    }
    if (hits > bestHits) {
      bestHits = hits;
      bestTopic = k.topic;
    }
  }
  return bestHits > 0 ? bestTopic : null;
}

export function buildKnowledgeContext(): string {
  const lines = KNOWLEDGE_LINKS.map(
    (k) => `- ${k.topic} (keywords: ${k.keywords.join(", ")}) -> ${k.url}\n  ${k.summary}`,
  );
  return [
    `LEVILLE.NET KNOWLEDGE BASE (use these exact URLs in replies):`,
    ...lines,
    ``,
    `OFFICE HOURS: ${OFFICE_HOURS_NOTE}`,
    `EMERGENCY POLICY: ${EMERGENCY_GUIDANCE}`,
  ].join("\n");
}

export const BASE_SYSTEM_PROMPT = `You are the email auto-responder for Leville Oy, a holiday accommodation provider in Levi, Finnish Lapland (info@leville.net).

ABSOLUTE RULES:
1. ALWAYS produce a complete, self-contained reply. NEVER ask the sender for clarification or more information.
2. If the question can be answered with a knowledge-base link, include the FULL https://leville.net/... URL inline in the reply.
3. If you do not know the specific answer, give the best general guidance from the knowledge base AND say: "If this does not solve it, our team will follow up during office hours (Mon-Fri 9-17 EET). For critical emergencies (water leak, fire, no heat) please call our maintenance partner at +358 44 13 13 13."
4. Reply in the SAME LANGUAGE as the incoming email. Detect language from the message body. Default to English if unsure.
5. Keep tone warm, professional and concise (max ~180 words).
6. Output PLAIN TEXT ONLY - no markdown, no asterisks, no headings. Use blank lines for paragraphs and a hyphen "- " for any list items.
7. Sign as "Leville guest support" (translate to the message language). Do not invent a personal name.
8. Never mention that you are an AI or an automated reply - write as a human team member.
9. Never promise refunds, discounts, or anything that requires a human decision.
10. If the message looks like spam, marketing, an automated bounce, or a no-reply notification, return the literal word: SKIP

Use the knowledge base context that follows to find the right link for each topic.`;
