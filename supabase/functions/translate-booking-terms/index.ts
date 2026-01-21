import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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

    // Use Supabase AI Session for translation
    const session = new Supabase.ai.Session('mistral');

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

    const output = await session.run(
      {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      },
      {
        mode: "openaicompatible",
        stream: false,
      }
    );

    let translationsText = "";
    if (typeof output === "string") {
      translationsText = output;
    } else if (output && typeof output === "object") {
      // Handle different response formats
      if ("message" in output && output.message?.content) {
        translationsText = output.message.content;
      } else if ("choices" in output && output.choices?.[0]?.message?.content) {
        translationsText = output.choices[0].message.content;
      } else {
        translationsText = JSON.stringify(output);
      }
    }

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
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
