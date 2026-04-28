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

export function detectLanguage(text: string): string {
  const t = (text || "").toLowerCase();
  // Crude heuristics
  if (/\b(hei|moi|kiitos|terveisin|tervetuloa|sauna|huoneisto|asunto|saunan|löyly|päivä)\b/.test(t)) return "fi";
  if (/\b(hej|tack|hälsningar|stuga|lägenhet|vänligen)\b/.test(t)) return "sv";
  if (/\b(hallo|danke|grüße|wohnung|ferienwohnung|mit freundlichen)\b/.test(t)) return "de";
  if (/\b(bonjour|merci|salutations|appartement|cordialement)\b/.test(t)) return "fr";
  if (/\b(hola|gracias|saludos|apartamento|cabaña)\b/.test(t)) return "es";
  if (/\b(hallo|dank|groeten|appartement|hartelijk)\b/.test(t)) return "nl";
  return "en";
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
  const lines = examples.slice(0, 6).map((ex, i) => {
    return `Example ${i + 1} (topic: ${ex.topic || "general"}, language: ${ex.language}):
INCOMING: ${(ex.source_body || ex.source_subject || "").slice(0, 400)}
APPROVED REPLY SUBJECT: ${ex.approved_subject}
APPROVED REPLY BODY:
${ex.approved_body}`;
  });
  return `\n\nLEARNED EXAMPLES (these were approved or human-edited replies — match their style and accuracy):\n\n${lines.join("\n\n---\n\n")}`;
}

export async function generateAiReply(
  rule: AutoResponderRule,
  email: IncomingEmail,
  customSystemPrompt?: string,
  learnedExamples: LearnedExample[] = [],
): Promise<{ subject: string; body: string } | null> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const systemBase = (customSystemPrompt && customSystemPrompt.trim()) || BASE_SYSTEM_PROMPT;
  const knowledge = buildKnowledgeContext();
  const learned = buildLearnedBlock(learnedExamples);
  const ruleExtras = rule.ai_extra_instructions
    ? `\n\nRULE-SPECIFIC INSTRUCTIONS:\n${rule.ai_extra_instructions}`
    : "";

  const systemMessage = `${systemBase}\n\n${knowledge}${learned}${ruleExtras}`;

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
): Promise<{ subject: string; body: string } | null> {
  if (rule.response_mode === "template") {
    return generateTemplateReply(rule, email, defaultLang);
  }
  return await generateAiReply(rule, email, globalAiSystemPrompt, learnedExamples);
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
