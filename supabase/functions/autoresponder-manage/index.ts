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
          enabled, mailbox_label, poll_interval_minutes, signature_html,
          default_language, test_mode, test_recipients, ai_system_prompt,
        }) => ({
          enabled, mailbox_label, poll_interval_minutes, signature_html,
          default_language, test_mode, test_recipients, ai_system_prompt,
        }))(settings || {});
        const { data, error } = await supabase
          .from("autoresponder_settings")
          .update(allowed)
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

      default:
        return json({ error: `Unknown action: ${action}` }, 400);
    }
  } catch (err) {
    console.error("autoresponder-manage error", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
