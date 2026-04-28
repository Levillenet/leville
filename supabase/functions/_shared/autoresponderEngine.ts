// Core engine: rule matching + reply generation (template or AI).
import { BASE_SYSTEM_PROMPT, buildKnowledgeContext } from "./autoresponderKnowledge.ts";

export interface AutoResponderRule {
  id: string;
  name: string;
  is_active: boolean;
  priority: number;
  match_domain: string;
  match_keywords: string[];
  active_days: number[];
  active_hours_start: string;
  active_hours_end: string;
  response_mode: "template" | "ai";
  template_subject: Record<string, string>;
  template_body: Record<string, string>;
  ai_extra_instructions: string | null;
  cooldown_hours: number;
}

export interface IncomingEmail {
  from_email: string;
  from_domain: string;
  from_name: string;
  subject: string;
  body: string;
}

// Helsinki time helpers
function helsinkiNow(): { hhmm: string; dayOfWeek: number } {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const hour = parts.find((p) => p.type === "hour")?.value || "00";
  const minute = parts.find((p) => p.type === "minute")?.value || "00";
  const wd = parts.find((p) => p.type === "weekday")?.value || "Sun";
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { hhmm: `${hour}:${minute}`, dayOfWeek: dayMap[wd] ?? 0 };
}

function isInHourWindow(hhmm: string, start: string, end: string): boolean {
  // Normalize to HH:MM (strip seconds if present)
  const norm = (s: string) => s.slice(0, 5);
  const cur = norm(hhmm);
  const s = norm(start);
  const e = norm(end);
  if (s <= e) return cur >= s && cur <= e;
  // overnight window e.g. 22:00 → 07:00
  return cur >= s || cur <= e;
}

export function findMatchingRule(rules: AutoResponderRule[], email: IncomingEmail): AutoResponderRule | null {
  const { hhmm, dayOfWeek } = helsinkiNow();
  const sorted = [...rules].filter((r) => r.is_active).sort((a, b) => a.priority - b.priority);

  for (const rule of sorted) {
    // Domain match
    const domainOk = rule.match_domain === "*" ||
      email.from_domain === rule.match_domain.toLowerCase() ||
      email.from_domain.endsWith("." + rule.match_domain.toLowerCase());
    if (!domainOk) continue;

    // Day match
    if (!rule.active_days.includes(dayOfWeek)) continue;

    // Hour match
    if (!isInHourWindow(hhmm, rule.active_hours_start, rule.active_hours_end)) continue;

    // Keyword match (optional - if rule has keywords, at least one must hit)
    if (rule.match_keywords.length > 0) {
      const hay = (email.subject + " " + email.body).toLowerCase();
      const hit = rule.match_keywords.some((k) => hay.includes(k.toLowerCase()));
      if (!hit) continue;
    }

    return rule;
  }
  return null;
}

/**
 * Detect the language of an incoming email body.
 * - Strips quoted/forwarded history (lines starting with ">", "On ... wrote:", "From: ...")
 *   and common signatures so the *new* user content dominates.
 * - Scores each language by counting marker hits, picks the highest.
 * - Falls back to "en" only when no markers match.
 */
export function detectLanguage(text: string): string {
  if (!text) return "en";

  // 1) Strip quoted reply history & forwarded blocks
  let cleaned = text
    .split("\n")
    .filter((line) => {
      const l = line.trim();
      if (!l) return true;
      if (l.startsWith(">")) return false;
      if (/^(on .+ wrote:|le .+ a écrit\s*:|am .+ schrieb|el .+ escribió|den .+ skrev)/i.test(l)) return false;
      if (/^(from|lähettäjä|von|de|från|van)\s*:/i.test(l)) return false;
      if (/^(sent|lähetetty|gesendet|enviado|skickat|verzonden)\s*:/i.test(l)) return false;
      if (/^(subject|aihe|betreff|asunto|ämne|onderwerp)\s*:/i.test(l)) return false;
      if (/^(to|vastaanottaja|an|para|till|aan)\s*:/i.test(l)) return false;
      if (/^-{3,}\s*(original message|forwarded message|alkuperäinen viesti)/i.test(l)) return false;
      return true;
    })
    .join("\n")
    .toLowerCase();

  // Cap length so signatures don't dominate
  cleaned = cleaned.slice(0, 2000);

  // 2) Per-language markers (word-boundary matches). Order matters only on ties.
  const markers: Record<string, RegExp[]> = {
    fi: [
      /\b(moi|hei|moikka|terve|heippa|kiitos|kiitti|terveisin|ystävällisin terveisin|tervetuloa)\b/g,
      /\b(sauna|saunan|löyly|huoneisto|asunto|mökki|varaus|varata|majoitus|hinta|vapaa|vapaana)\b/g,
      /\b(onko|mikä|miten|milloin|missä|voinko|voisiko|voisitteko|haluaisin|tarvitsen)\b/g,
      /\b(päivä|päivää|huomenta|iltaa|aamulla|illalla|viikonloppu)\b/g,
      /[äö]/g, // Finnish-specific characters as a soft signal
    ],
    sv: [
      /\b(hej|hejsan|tjena|tack|tackar|hälsningar|vänliga hälsningar|välkommen)\b/g,
      /\b(stuga|lägenhet|bastu|bokning|boka|pris|ledig)\b/g,
      /\b(vänligen|gärna|kanske|skulle|kunde)\b/g,
    ],
    de: [
      /\b(hallo|guten tag|guten morgen|guten abend|servus|moin|danke|vielen dank|grüße|mit freundlichen grüßen)\b/g,
      /\b(wohnung|ferienwohnung|sauna|buchung|buchen|preis|frei|verfügbar)\b/g,
      /\b(können|könnte|möchte|brauche|wann|wie|wo|warum)\b/g,
      /[äöüß]/g,
    ],
    fr: [
      /\b(bonjour|bonsoir|salut|merci|cordialement|salutations|bienvenue)\b/g,
      /\b(appartement|chalet|sauna|réservation|réserver|prix|libre|disponible)\b/g,
      /\b(pourriez|voudrais|puis-je|quand|comment|où)\b/g,
    ],
    es: [
      /\b(hola|buenos días|buenas tardes|gracias|saludos|cordialmente|bienvenido)\b/g,
      /\b(apartamento|cabaña|sauna|reserva|reservar|precio|libre|disponible)\b/g,
      /\b(podría|quisiera|puedo|cuándo|cómo|dónde)\b/g,
    ],
    nl: [
      /\b(hallo|hoi|dag|dank|bedankt|groeten|hartelijk|welkom)\b/g,
      /\b(appartement|chalet|sauna|reservering|boeken|prijs|vrij|beschikbaar)\b/g,
      /\b(zou|wil|kan|wanneer|hoe|waar)\b/g,
    ],
    en: [
      /\b(hi|hello|hey|good morning|good afternoon|good evening|thanks|thank you|regards|kind regards|best regards|welcome)\b/g,
      /\b(apartment|cabin|sauna|booking|book|price|free|available|reservation)\b/g,
      /\b(could|would|can i|when|how|where|why|please)\b/g,
    ],
  };

  // 3) Score each language
  const scores: Record<string, number> = { fi: 0, sv: 0, de: 0, fr: 0, es: 0, nl: 0, en: 0 };
  for (const [lang, regs] of Object.entries(markers)) {
    for (const re of regs) {
      const matches = cleaned.match(re);
      if (matches) scores[lang] += matches.length;
    }
  }

  // 4) Pick top score; tie-break: prefer non-English when tied
  let best = "en";
  let bestScore = 0;
  for (const lang of ["fi", "sv", "de", "fr", "es", "nl", "en"]) {
    if (scores[lang] > bestScore) {
      best = lang;
      bestScore = scores[lang];
    }
  }

  // 5) No markers at all → English fallback
  return bestScore > 0 ? best : "en";
}


function fillTemplate(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

export function generateTemplateReply(
  rule: AutoResponderRule,
  email: IncomingEmail,
  defaultLang: string,
): { subject: string; body: string } | null {
  const lang = detectLanguage(email.body || email.subject) || defaultLang || "en";
  const subject =
    rule.template_subject[lang] || rule.template_subject[defaultLang] || rule.template_subject["en"] || `Re: ${email.subject}`;
  const body =
    rule.template_body[lang] || rule.template_body[defaultLang] || rule.template_body["en"] || "";
  if (!body) return null;
  const vars = {
    sender_name: email.from_name || email.from_email.split("@")[0],
    sender_email: email.from_email,
    date: new Date().toLocaleDateString("fi-FI", { timeZone: "Europe/Helsinki" }),
    subject: email.subject,
  };
  return {
    subject: fillTemplate(subject, vars),
    body: fillTemplate(body, vars),
  };
}

export interface LearnedExample {
  topic: string | null;
  language: string;
  source_subject: string | null;
  source_body: string | null;
  approved_subject: string;
  approved_body: string;
}

function buildLearnedBlock(examples: LearnedExample[]): string {
  if (!examples?.length) return "";
  const lines = examples.slice(0, 8).map((ex, i) => {
    return `Example ${i + 1} (topic: ${ex.topic || "general"}, language: ${ex.language}):
INCOMING: ${(ex.source_body || ex.source_subject || "").slice(0, 400)}
APPROVED REPLY SUBJECT: ${ex.approved_subject}
APPROVED REPLY BODY:
${ex.approved_body}`;
  });
  return `\n\nLEARNED EXAMPLES — HIGHEST PRIORITY (these were approved or human-edited replies). If the incoming email matches any of these in topic or intent, REUSE the approved reply's facts, links and wording almost verbatim (translate to the sender's language if different). Do NOT ignore them in favor of generic knowledge-base text.\n\n${lines.join("\n\n---\n\n")}`;
}

export interface PropertyFacts {
  name: string;
  slug: string;
  wifi_name?: string | null;
  wifi_password?: string | null;
  check_in_time?: string | null;
  check_out_time?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  address?: string | null;
}

function buildPropertyFactsBlock(facts: PropertyFacts | null): string {
  if (!facts) return "";
  const lines: string[] = [];
  lines.push(`Property: ${facts.name} (https://leville.net/opas/${facts.slug})`);
  if (facts.wifi_name) lines.push(`Wi-Fi network: ${facts.wifi_name}`);
  if (facts.wifi_password) lines.push(`Wi-Fi password: ${facts.wifi_password}`);
  if (facts.check_in_time) lines.push(`Check-in: from ${facts.check_in_time}`);
  if (facts.check_out_time) lines.push(`Check-out: by ${facts.check_out_time}`);
  if (facts.address) lines.push(`Address: ${facts.address}`);
  if (facts.contact_phone) lines.push(`Phone: ${facts.contact_phone}`);
  return `\n\nPROPERTY-SPECIFIC FACTS — ABSOLUTE HIGHEST PRIORITY. The sender mentioned this specific property. Answer their question DIRECTLY using these exact values (e.g. give the actual Wi-Fi network name and password verbatim). Do NOT say "see the welcome letter" or "printed in the apartment" when the value is given here. Only fall back to the generic knowledge base if the requested fact is not in this list.\n${lines.join("\n")}`;
}

export async function generateAiReply(
  rule: AutoResponderRule,
  email: IncomingEmail,
  customSystemPrompt?: string,
  learnedExamples: LearnedExample[] = [],
  propertyFacts: PropertyFacts | null = null,
): Promise<{ subject: string; body: string } | null> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const systemBase = (customSystemPrompt && customSystemPrompt.trim()) || BASE_SYSTEM_PROMPT;
  const knowledge = buildKnowledgeContext();
  const learned = buildLearnedBlock(learnedExamples);
  const propertyBlock = buildPropertyFactsBlock(propertyFacts);
  const ruleExtras = rule.ai_extra_instructions
    ? `\n\nRULE-SPECIFIC INSTRUCTIONS:\n${rule.ai_extra_instructions}`
    : "";

  const systemMessage = `${systemBase}\n\n${knowledge}${propertyBlock}${learned}${ruleExtras}`;

  const userMessage = `Incoming email:
From: ${email.from_name ? `${email.from_name} <${email.from_email}>` : email.from_email}
Subject: ${email.subject}

${email.body}

---
Write the reply now. Output JSON ONLY in this exact shape: {"subject":"...","body":"..."}. No prose around it.`;

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "send_reply",
            description: "Produce the final email reply.",
            parameters: {
              type: "object",
              properties: {
                subject: { type: "string", description: "Reply subject line." },
                body: { type: "string", description: "Plain-text reply body. No markdown." },
                skip: { type: "boolean", description: "Set true if the message is spam/bounce/no-reply and should be ignored." },
              },
              required: ["subject", "body"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "send_reply" } },
    }),
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`AI Gateway error [${resp.status}]: ${t}`);
  }

  const data = await resp.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) {
    throw new Error("AI Gateway returned no tool call");
  }
  let parsed: { subject?: string; body?: string; skip?: boolean };
  try {
    parsed = JSON.parse(toolCall.function.arguments);
  } catch {
    throw new Error("AI Gateway returned malformed tool arguments");
  }
  if (parsed.skip || !parsed.subject || !parsed.body) return null;
  return { subject: parsed.subject, body: parsed.body };
}

export async function generateReply(
  rule: AutoResponderRule,
  email: IncomingEmail,
  defaultLang: string,
  globalAiSystemPrompt?: string,
  learnedExamples: LearnedExample[] = [],
  propertyFacts: PropertyFacts | null = null,
): Promise<{ subject: string; body: string } | null> {
  if (rule.response_mode === "template") {
    return generateTemplateReply(rule, email, defaultLang);
  }
  return await generateAiReply(rule, email, globalAiSystemPrompt, learnedExamples, propertyFacts);
}

// Load property-specific facts (Wi-Fi, times, contact) from guide_properties by slug.
export async function loadPropertyFacts(supabase: any, slug: string): Promise<PropertyFacts | null> {
  if (!slug) return null;
  const { data } = await supabase
    .from("guide_properties")
    .select("name,slug,wifi_name,wifi_password,check_in_time,check_out_time,contact_phone,contact_email,address,is_published")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!data) return null;
  return data as PropertyFacts;
}

// Build an away/out-of-office reply from settings (no AI involved)
export function buildAwayReply(
  awaySubject: Record<string, string>,
  awayBody: Record<string, string>,
  email: IncomingEmail,
  defaultLang: string,
): { subject: string; body: string } {
  const lang = detectLanguage(email.body || email.subject) || defaultLang || "en";
  const subject = awaySubject[lang] || awaySubject[defaultLang] || awaySubject["en"] || `Re: ${email.subject}`;
  const body = awayBody[lang] || awayBody[defaultLang] || awayBody["en"] || "Thank you for your message — we will follow up soon.";
  return {
    subject: /^re:/i.test(subject) ? subject : `Re: ${subject}`,
    body,
  };
}

// Returns true if current Helsinki time is inside the [start, end] auto-send window
export function isInAutoSendWindow(start: string, end: string): boolean {
  const { hhmm } = helsinkiNow();
  return isInHourWindow(hhmm, start, end);
}
