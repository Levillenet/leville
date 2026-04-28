import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import {
  listUnreadMessages,
  getMessage,
  markAsRead,
  sendReply,
  getHeader,
  parseFromAddress,
  extractPlainTextBody,
  isSkippableSender,
} from "../_shared/gmail.ts";
import {
  findMatchingRule,
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

async function alreadyHandled(supabase: any, gmailMessageId: string) {
  const [logRow, draftRow] = await Promise.all([
    supabase.from("autoresponder_log").select("id").eq("gmail_message_id", gmailMessageId).maybeSingle(),
    supabase.from("autoresponder_drafts").select("id").eq("gmail_message_id", gmailMessageId).maybeSingle(),
  ]);
  return !!logRow.data || !!draftRow.data;
}

async function inCooldown(supabase: any, fromEmail: string, cooldownHours: number) {
  if (!cooldownHours || cooldownHours <= 0) return false;
  const since = new Date(Date.now() - cooldownHours * 3600 * 1000).toISOString();
  const { data } = await supabase
    .from("autoresponder_log")
    .select("id")
    .eq("from_email", fromEmail)
    .not("reply_sent_at", "is", null)
    .gte("reply_sent_at", since)
    .limit(1);
  return Array.isArray(data) && data.length > 0;
}

async function loadLearnedExamples(supabase: any, topic: string | null, language: string): Promise<LearnedExample[]> {
  // Prefer same-topic+lang, then same-topic any-lang, then same-lang general
  let q = supabase
    .from("autoresponder_learned")
    .select("topic,language,source_subject,source_body,approved_subject,approved_body,use_count")
    .eq("is_active", true)
    .order("use_count", { ascending: false })
    .limit(20);
  const { data } = await q;
  const all = (data || []) as LearnedExample[];
  const byScore = (ex: LearnedExample) => {
    let s = 0;
    if (topic && ex.topic === topic) s += 10;
    if (ex.language === language) s += 3;
    return s;
  };
  return all
    .map((ex) => ({ ex, s: byScore(ex) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((x) => x.ex);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: settings, error: sErr } = await supabase
      .from("autoresponder_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (sErr) throw sErr;

    if (!settings?.enabled) {
      return json({ ok: true, skipped: "autoresponder_disabled" });
    }

    // Adaptive polling cadence (cron fires every minute):
    // - Night (Helsinki 22:00–06:59): run every minute → ~1 min latency
    // - Day  (Helsinki 07:00–21:59): run every 2 minutes → ~2 min latency, half the load
    // Manual / non-cron invocations always run.
    const isCronTrigger = (() => {
      try { /* body may be empty for manual invokes */ return true; } catch { return false; }
    })();
    let bodyTrigger: string | null = null;
    try {
      const bodyText = await req.clone().text();
      if (bodyText) bodyTrigger = JSON.parse(bodyText)?.trigger ?? null;
    } catch (_) { /* ignore */ }
    if (bodyTrigger === "cron") {
      const helsinkiHour = parseInt(new Intl.DateTimeFormat("fi-FI", { timeZone: "Europe/Helsinki", hour: "2-digit", hour12: false }).format(new Date()), 10);
      const helsinkiMin = parseInt(new Intl.DateTimeFormat("fi-FI", { timeZone: "Europe/Helsinki", minute: "2-digit" }).format(new Date()), 10);
      const isNight = helsinkiHour >= 22 || helsinkiHour < 7;
      if (!isNight && helsinkiMin % 2 !== 0) {
        return json({ ok: true, skipped: "daytime_2min_cadence", helsinkiHour, helsinkiMin });
      }
    }

    // Backfill enabled_at if missing (e.g. enabled before this column existed)
    if (!settings.enabled_at) {
      const nowIso = new Date().toISOString();
      await supabase.from("autoresponder_settings").update({ enabled_at: nowIso }).eq("id", 1);
      settings.enabled_at = nowIso;
    }

    await supabase.from("autoresponder_settings").update({ last_poll_at: new Date().toISOString() }).eq("id", 1);

    const { data: rules, error: rErr } = await supabase
      .from("autoresponder_rules")
      .select("*")
      .eq("is_active", true);
    if (rErr) throw rErr;
    if (!rules || rules.length === 0) {
      return json({ ok: true, processed: 0, note: "no_active_rules" });
    }

    // Only fetch messages that arrived AFTER the auto-responder was enabled.
    // Gmail's `after:` operator uses unix seconds.
    const enabledAtMs = new Date(settings.enabled_at).getTime();
    const enabledAtSec = Math.floor(enabledAtMs / 1000);
    const gmailQuery = `is:unread after:${enabledAtSec}`;
    const messages = await listUnreadMessages(gmailQuery, 20);

    const results: any[] = [];

    const inAutoWindow = isInAutoSendWindow(settings.auto_send_hours_start || "22:00", settings.auto_send_hours_end || "07:00");
    const inAwayWindow = isInAutoSendWindow(settings.away_hours_start || "22:00", settings.away_hours_end || "07:00");
    const awayOnlyInWindow = !!settings.away_only_in_window;
    const awayWindowOk = !awayOnlyInWindow || inAwayWindow;
    const autoSendTopics: string[] = (settings.auto_send_topics || []).map((t: string) => t.toLowerCase());
    const requireApprovalAlways = !!settings.always_require_approval;
    const awayEnabled = !!settings.away_send_outside_topics;
    // GLOBAL AWAY MODE: if away message is enabled AND we're inside the away window,
    // send the away message to EVERYONE and do NOT send AI replies at all.
    const globalAwayActive = awayEnabled && awayWindowOk;

    for (const m of messages) {
      try {
        if (await alreadyHandled(supabase, m.id)) continue;

        const full = await getMessage(m.id);
        const headers = full.payload?.headers || [];
        const fromHeader = getHeader(headers, "From");
        const subject = getHeader(headers, "Subject") || "(no subject)";
        const messageIdHeader = getHeader(headers, "Message-ID");
        const referencesHeader = getHeader(headers, "References");
        const { email: fromEmail, domain: fromDomain, name: fromName } = parseFromAddress(fromHeader);
        const body = extractPlainTextBody(full.payload).slice(0, 8000);

        // Hard guard: skip (and LOG) anything that arrived BEFORE the auto-responder was enabled.
        const internalMs = parseInt(full.internalDate || "0", 10);
        if (internalMs && internalMs < enabledAtMs) {
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail || "(unknown)",
            from_domain: fromDomain || "(unknown)",
            subject,
            action: "skipped_before_enabled",
          });
          continue;
        }

        if (!fromEmail || isSkippableSender(fromEmail)) {
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail || "(unknown)",
            from_domain: fromDomain || "(unknown)",
            subject,
            action: "skipped_noreply_sender",
          });
          continue;
        }

        const incoming: IncomingEmail = {
          from_email: fromEmail,
          from_domain: fromDomain,
          from_name: fromName,
          subject,
          body,
        };

        // Test mode: only respond to whitelisted addresses
        if (settings.test_mode) {
          const whitelist = (settings.test_recipients || []).map((s: string) => s.toLowerCase());
          if (!whitelist.includes(fromEmail.toLowerCase())) {
            await supabase.from("autoresponder_log").insert({
              gmail_message_id: m.id,
              gmail_thread_id: m.threadId,
              from_email: fromEmail,
              from_domain: fromDomain,
              subject,
              action: "skipped_test_mode",
            });
            continue;
          }
        }

        // GLOBAL AWAY: if enabled and inside the away window, send away message to EVERYONE.
        // No rule matching, no topic detection, no AI reply.
        if (globalAwayActive) {
          if (await inCooldown(supabase, fromEmail, settings.global_cooldown_hours || 24)) {
            await supabase.from("autoresponder_log").insert({
              gmail_message_id: m.id,
              gmail_thread_id: m.threadId,
              from_email: fromEmail,
              from_domain: fromDomain,
              subject,
              action: "skipped_cooldown",
            });
            continue;
          }
          const away = buildAwayReply(settings.away_subject || {}, settings.away_body || {}, incoming, settings.default_language);
          const finalBody = away.body + (settings.signature_html ? `\n\n${settings.signature_html.replace(/<[^>]+>/g, "")}` : "");
          await sendReply({
            to: fromEmail,
            subject: away.subject,
            bodyText: finalBody,
            threadId: m.threadId,
            inReplyTo: messageIdHeader || undefined,
            references: referencesHeader ? `${referencesHeader} ${messageIdHeader}` : (messageIdHeader || undefined),
          });
          try { await markAsRead(m.id); } catch (_) {}
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail,
            from_domain: fromDomain,
            subject,
            action: "auto_away_sent",
            reply_subject: away.subject,
            reply_body: finalBody,
            reply_sent_at: new Date().toISOString(),
          });
          results.push({ id: m.id, action: "auto_away_sent_global", to: fromEmail });
          continue;
        }

        const rule = findMatchingRule(rules as AutoResponderRule[], incoming);
        if (!rule) {
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail,
            from_domain: fromDomain,
            subject,
            action: "skipped_no_matching_rule",
          });
          continue;
        }

        if (await inCooldown(supabase, fromEmail, rule.cooldown_hours)) {
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail,
            from_domain: fromDomain,
            subject,
            matched_rule_id: rule.id,
            matched_rule_name: rule.name,
            action: "skipped_cooldown",
          });
          continue;
        }

        const detectedLang = detectLanguage(`${subject}\n${body}`) || settings.default_language || "en";
        const detectedTopic = detectTopic(`${subject}\n${body}`);
        const detectedProperty = detectProperty(`${subject}\n${body}`);
        const propertyFacts: PropertyFacts | null = detectedProperty
          ? await loadPropertyFacts(supabase, detectedProperty.slug)
          : null;
        const isWhitelistTopic = !!detectedTopic && autoSendTopics.includes(detectedTopic);

        // Decide path (away mode is handled globally above before rule matching):
        // 1) Whitelist topic + in auto-window + no force-approval → send AI reply automatically
        // 2) Whitelist topic but outside auto-window → AI draft for approval
        // 3) Non-whitelist topic → AI draft for approval
        const learned = await loadLearnedExamples(supabase, detectedTopic, detectedLang);

        // Path 3: not a whitelisted topic → always create AI draft for approval
        if (!isWhitelistTopic) {
          const reply = await generateReply(rule, incoming, settings.default_language, settings.ai_system_prompt, learned, propertyFacts).catch(() => null);
          await supabase.from("autoresponder_drafts").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            in_reply_to: messageIdHeader || null,
            references_header: referencesHeader || null,
            from_email: fromEmail,
            from_domain: fromDomain,
            from_name: fromName || null,
            incoming_subject: subject,
            incoming_body: body,
            detected_topic: detectedTopic,
            detected_language: detectedLang,
            matched_rule_id: rule.id,
            matched_rule_name: rule.name,
            ai_subject: reply?.subject || null,
            ai_body: reply?.body || null,
            status: "pending",
          });
          results.push({ id: m.id, action: "draft_created", topic: detectedTopic });
          continue;
        }

        // Whitelisted topic → generate AI reply
        const reply = await generateReply(rule, incoming, settings.default_language, settings.ai_system_prompt, learned, propertyFacts);
        if (!reply) {
          // Fall back to away
          const away = buildAwayReply(settings.away_subject || {}, settings.away_body || {}, incoming, settings.default_language);
          await supabase.from("autoresponder_drafts").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            in_reply_to: messageIdHeader || null,
            references_header: referencesHeader || null,
            from_email: fromEmail,
            from_domain: fromDomain,
            from_name: fromName || null,
            incoming_subject: subject,
            incoming_body: body,
            detected_topic: detectedTopic,
            detected_language: detectedLang,
            matched_rule_id: rule.id,
            matched_rule_name: rule.name,
            ai_subject: away.subject,
            ai_body: away.body,
            status: "pending",
          });
          continue;
        }

        const finalSubject = /^re:/i.test(reply.subject) ? reply.subject : `Re: ${reply.subject}`;
        const finalBody = reply.body + (settings.signature_html ? `\n\n${settings.signature_html.replace(/<[^>]+>/g, "")}` : "");

        if (!requireApprovalAlways && inAutoWindow) {
          // Path 1: send automatically
          await sendReply({
            to: fromEmail,
            subject: finalSubject,
            bodyText: finalBody,
            threadId: m.threadId,
            inReplyTo: messageIdHeader || undefined,
            references: referencesHeader ? `${referencesHeader} ${messageIdHeader}` : (messageIdHeader || undefined),
          });
          try { await markAsRead(m.id); } catch (_) {}
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail,
            from_domain: fromDomain,
            subject,
            matched_rule_id: rule.id,
            matched_rule_name: rule.name,
            action: "auto_sent",
            reply_subject: finalSubject,
            reply_body: finalBody,
            reply_sent_at: new Date().toISOString(),
          });
          results.push({ id: m.id, action: "auto_sent", to: fromEmail, topic: detectedTopic });
        } else {
          // Path 2: create draft for approval
          await supabase.from("autoresponder_drafts").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            in_reply_to: messageIdHeader || null,
            references_header: referencesHeader || null,
            from_email: fromEmail,
            from_domain: fromDomain,
            from_name: fromName || null,
            incoming_subject: subject,
            incoming_body: body,
            detected_topic: detectedTopic,
            detected_language: detectedLang,
            matched_rule_id: rule.id,
            matched_rule_name: rule.name,
            ai_subject: finalSubject,
            ai_body: finalBody,
            status: "pending",
          });
          results.push({ id: m.id, action: "draft_created", topic: detectedTopic });
        }
      } catch (innerErr) {
        console.error("Process message error", m.id, innerErr);
        await supabase.from("autoresponder_log").insert({
          gmail_message_id: m.id,
          gmail_thread_id: m.threadId,
          from_email: "(error)",
          from_domain: "(error)",
          subject: "(error)",
          action: "error",
          error_message: innerErr instanceof Error ? innerErr.message : String(innerErr),
        });
      }
    }

    return json({ ok: true, processed: messages.length, results, in_auto_window: inAutoWindow });
  } catch (err) {
    console.error("autoresponder-poll error", err);
    return json({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
