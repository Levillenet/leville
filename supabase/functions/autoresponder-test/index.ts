import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { sendReply } from "../_shared/gmail.ts";
import {
  generateReply,
  buildAwayReply,
  isInAutoSendWindow,
  detectLanguage,
  loadPropertyFacts,
  type AutoResponderRule,
  type IncomingEmail,
  type LearnedExample,
  type PropertyFacts,
} from "../_shared/autoresponderEngine.ts";
import { detectTopic, detectProperty } from "../_shared/autoresponderKnowledge.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { password, rule_id, send_real_email = true } = body;
    const subject: string = body.subject || "(test)";
    const message: string = body.message || "";
    const fromEmail: string = (body.from_email || "").toLowerCase().trim();

    const adminPw = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPw || password !== adminPw) return json({ error: "Unauthorized" }, 401);
    if (!fromEmail || !fromEmail.includes("@")) return json({ error: "from_email required" }, 400);
    if (!message.trim()) return json({ error: "message required" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: settings } = await supabase
      .from("autoresponder_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    // Whitelist enforcement: from_email must be in test_recipients (safety net)
    const whitelist = (settings?.test_recipients || []).map((s: string) => s.toLowerCase());
    if (whitelist.length > 0 && !whitelist.includes(fromEmail)) {
      return json({ error: `from_email must be in test_recipients whitelist. Current: ${whitelist.join(", ") || "(empty)"}` }, 400);
    }

    let rule: AutoResponderRule | null = null;
    if (rule_id) {
      const { data } = await supabase
        .from("autoresponder_rules")
        .select("*")
        .eq("id", rule_id)
        .maybeSingle();
      rule = data as AutoResponderRule | null;
    }
    // Synthetic fallback rule if none specified - pure AI with no extra instructions
    if (!rule) {
      rule = {
        id: "00000000-0000-0000-0000-000000000000",
        name: "(ad-hoc test rule)",
        is_active: true,
        priority: 999,
        match_domain: "*",
        match_keywords: [],
        active_days: [0,1,2,3,4,5,6],
        active_hours_start: "00:00",
        active_hours_end: "23:59",
        response_mode: "ai",
        template_subject: {},
        template_body: {},
        ai_extra_instructions: body.ai_extra_instructions || null,
        cooldown_hours: 0,
      };
    }

    const fromDomain = fromEmail.split("@")[1] || "";
    const incoming: IncomingEmail = {
      from_email: fromEmail,
      from_domain: fromDomain,
      from_name: body.from_name || "",
      subject,
      body: message,
    };

    const detectedLang = detectLanguage(message || subject) || settings?.default_language || "en";
    const detectedTopic = detectTopic(`${subject}\n${message}`);
    const autoSendTopics: string[] = (settings?.auto_send_topics || []).map((t: string) => t.toLowerCase());
    const isWhitelistTopic = !!detectedTopic && autoSendTopics.includes(detectedTopic);
    const inAutoWindow = settings ? isInAutoSendWindow(settings.auto_send_hours_start || "22:00", settings.auto_send_hours_end || "07:00") : false;
    const wouldAutoSend = !settings?.always_require_approval && isWhitelistTopic && inAutoWindow;
    const wouldSendAway = !isWhitelistTopic && !!settings?.away_send_outside_topics && !settings?.always_require_approval;

    // Load learned examples — score by topic+language match (same logic as poll)
    const { data: learnedRows } = await supabase
      .from("autoresponder_learned")
      .select("topic,language,source_subject,source_body,approved_subject,approved_body,use_count")
      .eq("is_active", true)
      .order("use_count", { ascending: false })
      .limit(30);
    const allLearned = (learnedRows || []) as LearnedExample[];
    const scoreEx = (ex: LearnedExample) => {
      let s = 0;
      if (detectedTopic && ex.topic === detectedTopic) s += 10;
      if (ex.language === detectedLang) s += 3;
      return s;
    };
    const learned = allLearned
      .map((ex) => ({ ex, s: scoreEx(ex) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 6)
      .map((x) => x.ex);

    let reply: { subject: string; body: string } | null = null;
    let mode: "ai" | "away" = "ai";
    if (wouldSendAway) {
      reply = buildAwayReply(settings.away_subject || {}, settings.away_body || {}, incoming, settings.default_language);
      mode = "away";
    } else {
      reply = await generateReply(rule, incoming, settings?.default_language || "en", settings?.ai_system_prompt, learned);
    }
    if (!reply) {
      return json({ ok: true, skipped: "ai_returned_skip", reply: null, routing: { detectedTopic, detectedLang, isWhitelistTopic, inAutoWindow, wouldAutoSend, wouldSendAway } });
    }

    const finalSubject = /^re:/i.test(reply.subject) ? reply.subject : `Re: ${reply.subject}`;
    const finalBody = reply.body + (settings?.signature_html ? `\n\n${settings.signature_html.replace(/<[^>]+>/g, "")}` : "");

    let sent = false;
    let sendError: string | null = null;
    if (send_real_email) {
      try {
        await sendReply({ to: fromEmail, subject: finalSubject, bodyText: finalBody });
        sent = true;
      } catch (e) {
        sendError = e instanceof Error ? e.message : String(e);
      }
    }

    const fakeId = `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await supabase.from("autoresponder_log").insert({
      gmail_message_id: fakeId,
      from_email: fromEmail,
      from_domain: fromDomain,
      subject,
      matched_rule_id: rule.id === "00000000-0000-0000-0000-000000000000" ? null : rule.id,
      matched_rule_name: rule.name,
      action: sent ? "test_replied" : (send_real_email ? "test_send_failed" : "test_preview"),
      reply_subject: finalSubject,
      reply_body: finalBody,
      reply_sent_at: sent ? new Date().toISOString() : null,
      is_test: true,
      error_message: sendError,
    });

    return json({
      ok: true,
      sent,
      send_error: sendError,
      mode,
      routing: { detectedTopic, detectedLang, isWhitelistTopic, inAutoWindow, wouldAutoSend, wouldSendAway },
      reply: { subject: finalSubject, body: finalBody },
    });
  } catch (err) {
    console.error("autoresponder-test error", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
