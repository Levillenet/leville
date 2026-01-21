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

    // Use Lovable AI for translation
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Olet ammattikääntäjä, joka on erikoistunut juridisiin ja kaupallisiin teksteihin. Käännä annettu suomenkielinen majoituksen varausehdot-teksti viiteen kieleen: englanti (en), ruotsi (sv), saksa (de), espanja (es) ja ranska (fr).

TÄRKEÄT OHJEET:
- Säilytä juridinen tarkkuus ja ammattimainen tyyli
- Säilytä numerot, summat (€) ja prosentit sellaisenaan
- Käytä kohdemaan vakiintuneita juridisia termejä
- Säilytä luettelomerkit ja kappalejako
- ÄLÄ käännä yritysnimiä (LeVILLE.NET)

Palauta käännökset JSON-muodossa:
{
  "en": { "title": "...", "content": "..." },
  "sv": { "title": "...", "content": "..." },
  "de": { "title": "...", "content": "..." },
  "es": { "title": "...", "content": "..." },
  "fr": { "title": "...", "content": "..." }
}`;

    const userPrompt = `Käännä seuraava varausehtojen osio:

OTSIKKO: ${titleFi}

SISÄLTÖ:
${contentFi}`;

    const aiResponse = await fetch("https://api.lovable.dev/v1/chat/completions", {
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
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", errorText);
      return new Response(
        JSON.stringify({ error: "AI translation failed", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResult = await aiResponse.json();
    const translationsText = aiResult.choices?.[0]?.message?.content;
    
    if (!translationsText) {
      return new Response(
        JSON.stringify({ error: "Empty AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let translations: AllTranslations;
    try {
      translations = JSON.parse(translationsText);
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
