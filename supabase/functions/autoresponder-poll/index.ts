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
  type AutoResponderRule,
  type IncomingEmail,
} from "../_shared/autoresponderEngine.ts";

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
  const { data } = await supabase
    .from("autoresponder_log")
    .select("id")
    .eq("gmail_message_id", gmailMessageId)
    .maybeSingle();
  return !!data;
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Load settings
    const { data: settings, error: sErr } = await supabase
      .from("autoresponder_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (sErr) throw sErr;

    if (!settings?.enabled) {
      return json({ ok: true, skipped: "autoresponder_disabled" });
    }

    // Update poll timestamp early so we never hammer Gmail in tight loops
    await supabase.from("autoresponder_settings").update({ last_poll_at: new Date().toISOString() }).eq("id", 1);

    // Load rules
    const { data: rules, error: rErr } = await supabase
      .from("autoresponder_rules")
      .select("*")
      .eq("is_active", true);
    if (rErr) throw rErr;
    if (!rules || rules.length === 0) {
      return json({ ok: true, processed: 0, note: "no_active_rules" });
    }

    const messages = await listUnreadMessages("is:unread newer_than:1d", 20);
    const results: any[] = [];

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

        const reply = await generateReply(rule, incoming, settings.default_language, settings.ai_system_prompt);
        if (!reply) {
          await supabase.from("autoresponder_log").insert({
            gmail_message_id: m.id,
            gmail_thread_id: m.threadId,
            from_email: fromEmail,
            from_domain: fromDomain,
            subject,
            matched_rule_id: rule.id,
            matched_rule_name: rule.name,
            action: "skipped_ai_skip",
          });
          continue;
        }

        const finalSubject = /^re:/i.test(reply.subject) ? reply.subject : `Re: ${reply.subject}`;
        const finalBody = reply.body + (settings.signature_html ? `\n\n${settings.signature_html.replace(/<[^>]+>/g, "")}` : "");

        await sendReply({
          to: fromEmail,
          subject: finalSubject,
          bodyText: finalBody,
          threadId: m.threadId,
          inReplyTo: messageIdHeader || undefined,
          references: referencesHeader ? `${referencesHeader} ${messageIdHeader}` : (messageIdHeader || undefined),
        });

        // Best-effort mark as read; don't fail the whole flow if it errors
        try { await markAsRead(m.id); } catch (e) { console.error("markAsRead failed", e); }

        await supabase.from("autoresponder_log").insert({
          gmail_message_id: m.id,
          gmail_thread_id: m.threadId,
          from_email: fromEmail,
          from_domain: fromDomain,
          subject,
          matched_rule_id: rule.id,
          matched_rule_name: rule.name,
          action: "replied",
          reply_subject: finalSubject,
          reply_body: finalBody,
          reply_sent_at: new Date().toISOString(),
        });

        results.push({ id: m.id, action: "replied", to: fromEmail, rule: rule.name });
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
        }).onConflict?.("gmail_message_id");
      }
    }

    return json({ ok: true, processed: messages.length, results });
  } catch (err) {
    console.error("autoresponder-poll error", err);
    return json({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
