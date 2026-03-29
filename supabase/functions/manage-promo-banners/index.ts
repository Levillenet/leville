import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { action, password, data, id } = body;

    // Verify admin password
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!password || password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "list") {
      const { data: banners, error } = await supabase
        .from("promo_banners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(banners), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create") {
      const { error } = await supabase.from("promo_banners").insert(data);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update") {
      const { error } = await supabase
        .from("promo_banners")
        .update(data)
        .eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const { error } = await supabase
        .from("promo_banners")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "translate") {
      const { heading_fi, subtext_fi, button_text_fi } = body;

      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) {
        throw new Error("LOVABLE_API_KEY not configured");
      }

      const prompt = `Translate the following Finnish promotional banner texts to English, German, Swedish, French, Spanish, and Dutch. Keep them short and punchy — these are marketing headlines for a holiday accommodation website in Levi, Finnish Lapland.

Finnish texts:
- Heading: "${heading_fi || ""}"
- Subtext: "${subtext_fi || ""}"
- Button text: "${button_text_fi || ""}"

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "en": { "heading": "...", "subtext": "...", "button_text": "..." },
  "de": { "heading": "...", "subtext": "...", "button_text": "..." },
  "sv": { "heading": "...", "subtext": "...", "button_text": "..." },
  "fr": { "heading": "...", "subtext": "...", "button_text": "..." },
  "es": { "heading": "...", "subtext": "...", "button_text": "..." },
  "nl": { "heading": "...", "subtext": "...", "button_text": "..." }
}`;

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are a professional translator. Return only valid JSON." },
            { role: "user", content: prompt },
          ],
          temperature: 0.3,
        }),
      });

      if (!aiResponse.ok) {
        throw new Error(`AI Gateway error: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      let content = aiData.choices?.[0]?.message?.content || "";

      // Strip markdown fences if present
      content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

      const translations = JSON.parse(content);

      return new Response(JSON.stringify(translations), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
