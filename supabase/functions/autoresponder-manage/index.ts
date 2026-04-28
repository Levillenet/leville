import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

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
    const { action, password } = body;

    const adminPw = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPw || password !== adminPw) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    switch (action) {
      case "get_settings": {
        const { data, error } = await supabase
          .from("autoresponder_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();
        if (error) throw error;
        return json({ settings: data });
      }

      case "update_settings": {
        const { settings } = body;
        const allowed = (({
          enabled, enabled_at, mailbox_label, poll_interval_minutes, signature_html,
          default_language, test_mode, test_recipients, ai_system_prompt,
          auto_send_hours_start, auto_send_hours_end, auto_send_topics,
          always_require_approval, away_subject, away_body, away_send_outside_topics,
          away_hours_start, away_hours_end, away_only_in_window,
        }) => ({
          enabled, enabled_at, mailbox_label, poll_interval_minutes, signature_html,
          default_language, test_mode, test_recipients, ai_system_prompt,
          auto_send_hours_start, auto_send_hours_end, auto_send_topics,
          always_require_approval, away_subject, away_body, away_send_outside_topics,
          away_hours_start, away_hours_end, away_only_in_window,
        }))(settings || {});
        // strip undefined keys so we don't blank out unrelated fields
        const clean: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(allowed)) if (v !== undefined) clean[k] = v;
        const { data, error } = await supabase
          .from("autoresponder_settings")
          .update(clean)
          .eq("id", 1)
          .select("*")
          .maybeSingle();
        if (error) throw error;
        return json({ settings: data });
      }

      case "list_rules": {
        const { data, error } = await supabase
          .from("autoresponder_rules")
          .select("*")
          .order("priority", { ascending: true })
          .order("created_at", { ascending: false });
        if (error) throw error;
        return json({ rules: data });
      }

      case "upsert_rule": {
        const { rule } = body;
        if (!rule?.name) return json({ error: "rule.name required" }, 400);
        const payload = {
          name: rule.name,
          is_active: rule.is_active ?? true,
          priority: rule.priority ?? 100,
          match_domain: rule.match_domain || "*",
          match_keywords: rule.match_keywords || [],
          active_days: rule.active_days?.length ? rule.active_days : [0,1,2,3,4,5,6],
          active_hours_start: rule.active_hours_start || "00:00",
          active_hours_end: rule.active_hours_end || "23:59",
          response_mode: rule.response_mode === "template" ? "template" : "ai",
          template_subject: rule.template_subject || {},
          template_body: rule.template_body || {},
          ai_extra_instructions: rule.ai_extra_instructions || null,
          cooldown_hours: rule.cooldown_hours ?? 24,
        };
        if (rule.id) {
          const { data, error } = await supabase
            .from("autoresponder_rules")
            .update(payload)
            .eq("id", rule.id)
            .select("*")
            .maybeSingle();
          if (error) throw error;
          return json({ rule: data });
        } else {
          const { data, error } = await supabase
            .from("autoresponder_rules")
            .insert(payload)
            .select("*")
            .maybeSingle();
          if (error) throw error;
          return json({ rule: data });
        }
      }

      case "delete_rule": {
        const { id } = body;
        const { error } = await supabase.from("autoresponder_rules").delete().eq("id", id);
        if (error) throw error;
        return json({ ok: true });
      }

      case "toggle_rule": {
        const { id, is_active } = body;
        const { data, error } = await supabase
          .from("autoresponder_rules")
          .update({ is_active })
          .eq("id", id)
          .select("*")
          .maybeSingle();
        if (error) throw error;
        return json({ rule: data });
      }

      case "list_log": {
        const { limit = 100, only_test } = body;
        let q = supabase
          .from("autoresponder_log")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(Math.min(500, Math.max(10, limit)));
        if (typeof only_test === "boolean") q = q.eq("is_test", only_test);
        const { data, error } = await q;
        if (error) throw error;
        return json({ log: data });
      }

      case "list_drafts": {
        const { status = "pending", limit = 100 } = body;
        let q = supabase
          .from("autoresponder_drafts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(Math.min(500, Math.max(10, limit)));
        if (status && status !== "all") q = q.eq("status", status);
        const { data, error } = await q;
        if (error) throw error;
        return json({ drafts: data });
      }

      case "approve_draft": {
        const { id, edited_subject, edited_body, decided_by } = body;
        if (!id) return json({ error: "id required" }, 400);
        const { data: draft, error: dErr } = await supabase
          .from("autoresponder_drafts")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (dErr) throw dErr;
        if (!draft) return json({ error: "Draft not found" }, 404);
        if (draft.status !== "pending") return json({ error: `Draft is ${draft.status}` }, 400);

        const { data: settings } = await supabase
          .from("autoresponder_settings").select("*").eq("id", 1).maybeSingle();

        const finalSubject = (edited_subject ?? draft.ai_subject ?? `Re: ${draft.incoming_subject || ""}`).trim();
        const finalBodyRaw = (edited_body ?? draft.ai_body ?? "").trim();
        if (!finalBodyRaw) return json({ error: "Reply body is empty" }, 400);
        const finalBody = finalBodyRaw + (settings?.signature_html ? `\n\n${settings.signature_html.replace(/<[^>]+>/g, "")}` : "");
        const wasEdited =
          (edited_subject !== undefined && edited_subject !== draft.ai_subject) ||
          (edited_body !== undefined && edited_body !== draft.ai_body);

        // Send via Gmail
        const { sendReply, markAsRead } = await import("../_shared/gmail.ts");
        await sendReply({
          to: draft.from_email,
          subject: /^re:/i.test(finalSubject) ? finalSubject : `Re: ${finalSubject}`,
          bodyText: finalBody,
          threadId: draft.gmail_thread_id || undefined,
          inReplyTo: draft.in_reply_to || undefined,
          references: draft.references_header
            ? `${draft.references_header} ${draft.in_reply_to || ""}`.trim()
            : (draft.in_reply_to || undefined),
        });
        try { await markAsRead(draft.gmail_message_id); } catch (_) {}

        await supabase.from("autoresponder_drafts").update({
          edited_subject: edited_subject ?? null,
          edited_body: edited_body ?? null,
          status: wasEdited ? "edited_sent" : "approved_sent",
          was_edited: wasEdited,
          decided_by: decided_by || "admin",
          decided_at: new Date().toISOString(),
          sent_at: new Date().toISOString(),
        }).eq("id", id);

        await supabase.from("autoresponder_log").insert({
          gmail_message_id: draft.gmail_message_id,
          gmail_thread_id: draft.gmail_thread_id,
          from_email: draft.from_email,
          from_domain: draft.from_domain,
          subject: draft.incoming_subject,
          matched_rule_id: draft.matched_rule_id,
          matched_rule_name: draft.matched_rule_name,
          action: wasEdited ? "edited_sent" : "approved_sent",
          reply_subject: finalSubject,
          reply_body: finalBody,
          reply_sent_at: new Date().toISOString(),
        });

        // Persist as learned example so AI improves over time
        await supabase.from("autoresponder_learned").insert({
          topic: draft.detected_topic,
          language: draft.detected_language || "en",
          source_subject: draft.incoming_subject,
          source_body: (draft.incoming_body || "").slice(0, 2000),
          approved_subject: finalSubject,
          approved_body: finalBodyRaw,
          was_edited: wasEdited,
        });

        return json({ ok: true, edited: wasEdited });
      }

      case "discard_draft": {
        const { id, decided_by } = body;
        if (!id) return json({ error: "id required" }, 400);
        const { error } = await supabase.from("autoresponder_drafts").update({
          status: "discarded",
          decided_by: decided_by || "admin",
          decided_at: new Date().toISOString(),
        }).eq("id", id);
        if (error) throw error;
        return json({ ok: true });
      }

      case "list_learned": {
        const { limit = 200 } = body;
        const { data, error } = await supabase
          .from("autoresponder_learned")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(Math.min(500, Math.max(10, limit)));
        if (error) throw error;
        return json({ learned: data });
      }

      case "delete_learned": {
        const { id } = body;
        if (!id) return json({ error: "id required" }, 400);
        const { error } = await supabase.from("autoresponder_learned").delete().eq("id", id);
        if (error) throw error;
        return json({ ok: true });
      }

      case "toggle_learned": {
        const { id, is_active } = body;
        const { error } = await supabase.from("autoresponder_learned").update({ is_active }).eq("id", id);
        if (error) throw error;
        return json({ ok: true });
      }

      case "translate_away": {
        const { source_lang = "fi", target_langs = ["en", "sv", "de", "fr", "es", "nl"] } = body;
        const { data: cur } = await supabase
          .from("autoresponder_settings").select("away_subject, away_body").eq("id", 1).maybeSingle();
        const srcSubject = cur?.away_subject?.[source_lang] || "";
        const srcBody = cur?.away_body?.[source_lang] || "";
        if (!srcSubject.trim() && !srcBody.trim()) {
          return json({ error: `No ${source_lang} content to translate. Fill in the ${source_lang.toUpperCase()} version first and click outside the field to save.` }, 400);
        }
        const apiKey = Deno.env.get("LOVABLE_API_KEY");
        if (!apiKey) return json({ error: "LOVABLE_API_KEY missing" }, 500);

        const langNames: Record<string, string> = { en: "English", sv: "Swedish", de: "German", fr: "French", es: "Spanish", nl: "Dutch", fi: "Finnish" };
        const targets = (target_langs as string[]).filter((l) => l !== source_lang);

        // Build per-language explicit fields (Gemini handles named keys far better than additionalProperties)
        const properties: Record<string, any> = {};
        const required: string[] = [];
        for (const lang of targets) {
          properties[`${lang}_subject`] = { type: "string", description: `Translation of subject in ${langNames[lang] || lang}` };
          properties[`${lang}_body`] = { type: "string", description: `Translation of body in ${langNames[lang] || lang}, preserve paragraph breaks` };
          required.push(`${lang}_subject`, `${lang}_body`);
        }

        const prompt = `Translate the following hospitality out-of-office email from ${langNames[source_lang] || source_lang} to ALL of these target languages: ${targets.map((t) => `${t} (${langNames[t] || t})`).join(", ")}.

Rules:
- Keep tone warm, professional, concise.
- Preserve paragraph breaks (\\n\\n).
- Do NOT translate URLs, brand names ("Leville", "Leville.net"), or phone numbers.
- Return ALL languages via the save_translations tool. Do not skip any.

SOURCE SUBJECT:
${srcSubject}

SOURCE BODY:
${srcBody}`;

        const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: "You are a professional translator. Always call save_translations with ALL requested target languages filled in." },
              { role: "user", content: prompt },
            ],
            tools: [{
              type: "function",
              function: {
                name: "save_translations",
                description: "Save translations for every requested target language. All fields are required.",
                parameters: { type: "object", properties, required, additionalProperties: false },
              },
            }],
            tool_choice: { type: "function", function: { name: "save_translations" } },
          }),
        });
        if (!aiResp.ok) {
          const errTxt = await aiResp.text();
          console.error("translate_away AI gateway error", aiResp.status, errTxt);
          return json({ error: `AI gateway ${aiResp.status}: ${errTxt}` }, 500);
        }
        const aiData = await aiResp.json();
        const args = aiData.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
        if (!args) {
          console.error("translate_away no tool call", JSON.stringify(aiData));
          return json({ error: "AI returned no translations (no tool call)" }, 500);
        }
        let parsed: Record<string, string> = {};
        try { parsed = JSON.parse(args); } catch (e) {
          console.error("translate_away parse error", args);
          return json({ error: "AI returned invalid JSON" }, 500);
        }

        const newSubject = { ...(cur?.away_subject || {}) };
        const newBody = { ...(cur?.away_body || {}) };
        const translatedLangs: string[] = [];
        for (const lang of targets) {
          const subj = parsed[`${lang}_subject`];
          const bod = parsed[`${lang}_body`];
          if (subj && bod) {
            newSubject[lang] = subj;
            newBody[lang] = bod;
            translatedLangs.push(lang);
          }
        }
        if (translatedLangs.length === 0) {
          return json({ error: "AI did not return any translations. Try again or use a longer source text.", debug: parsed }, 500);
        }
        const { data: updated } = await supabase.from("autoresponder_settings")
          .update({ away_subject: newSubject, away_body: newBody })
          .eq("id", 1).select("*").maybeSingle();
        return json({ ok: true, settings: updated, translated: translatedLangs });
      }

      case "save_test_as_learned": {
        const { incoming_subject, incoming_body, approved_subject, approved_body, topic, language } = body;
        if (!approved_body || !approved_subject) return json({ error: "approved_subject and approved_body required" }, 400);
        const { data, error } = await supabase.from("autoresponder_learned").insert({
          topic: topic || null,
          language: language || "en",
          source_subject: incoming_subject || null,
          source_body: (incoming_body || "").slice(0, 2000),
          approved_subject,
          approved_body,
          was_edited: false,
        }).select("*").maybeSingle();
        if (error) throw error;
        return json({ ok: true, learned: data });
      }

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err) {
    console.error("autoresponder-manage error", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
