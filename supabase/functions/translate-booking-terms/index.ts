import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://leville.net",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TranslationResult {
  title: string;
  content: string;
}

interface AllTranslations {
  en: TranslationResult;
  sv: TranslationResult;
  de: TranslationResult;
  es: TranslationResult;
  fr: TranslationResult;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    const authHeader = req.headers.get("authorization");

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { sectionId, titleFi, contentFi } = await req.json();

    if (!sectionId || !titleFi || !contentFi) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use Lovable AI Gateway for translation
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are a professional translator specializing in legal and commercial texts. Translate the given Finnish accommodation booking terms text into five languages: English (en), Swedish (sv), German (de), Spanish (es), and French (fr).

IMPORTANT INSTRUCTIONS:
- Maintain legal accuracy and professional style
- Keep numbers, amounts (€), and percentages as is
- Use established legal terms for the target country
- Preserve bullet points and paragraph structure
- DO NOT translate company names (LeVILLE.NET)

Return translations in JSON format:
{
  "en": { "title": "...", "content": "..." },
  "sv": { "title": "...", "content": "..." },
  "de": { "title": "...", "content": "..." },
  "es": { "title": "...", "content": "..." },
  "fr": { "title": "...", "content": "..." }
}`;

    const userPrompt = `Translate the following booking terms section:

TITLE: ${titleFi}

CONTENT:
${contentFi}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your workspace" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI translation failed", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResult = await aiResponse.json();
    let translationsText = aiResult.choices?.[0]?.message?.content || "";

    if (!translationsText) {
      return new Response(
        JSON.stringify({ error: "Empty AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract JSON from response (may be wrapped in markdown code blocks)
    let jsonStr = translationsText;
    const jsonMatch = translationsText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    let translations: AllTranslations;
    try {
      translations = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", translationsText);
      return new Response(
        JSON.stringify({ error: "Invalid AI response format", raw: translationsText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update database with translations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: updateError } = await supabase
      .from("booking_terms")
      .update({
        title_fi: titleFi,
        content_fi: contentFi,
        title_en: translations.en?.title || null,
        content_en: translations.en?.content || null,
        title_sv: translations.sv?.title || null,
        content_sv: translations.sv?.content || null,
        title_de: translations.de?.title || null,
        content_de: translations.de?.content || null,
        title_es: translations.es?.title || null,
        content_es: translations.es?.content || null,
        title_fr: translations.fr?.title || null,
        content_fr: translations.fr?.content || null,
        translations_updated_at: new Date().toISOString(),
      })
      .eq("id", sectionId);

    if (updateError) {
      console.error("Database update error:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to save translations", details: updateError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        translations,
        message: "Käännökset tallennettu onnistuneesti" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
