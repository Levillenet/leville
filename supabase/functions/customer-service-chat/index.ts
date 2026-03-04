import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received messages:", JSON.stringify(messages, null, 2));

    // Fetch the knowledge base dynamically
    let knowledgeBase = "";
    try {
      const llmsResponse = await fetch("https://leville.net/llms-full.txt");
      if (llmsResponse.ok) {
        knowledgeBase = await llmsResponse.text();
      } else {
        console.error("Failed to fetch llms-full.txt:", llmsResponse.status);
      }
    } catch (fetchErr) {
      console.error("Error fetching llms-full.txt:", fetchErr);
    }

    // Build system prompt
    const systemPrompt = `You are a helpful local expert assistant for Leville.net, a holiday accommodation rental service in Levi, Finnish Lapland.

BEHAVIOR RULES:
- Always respond in the same language the user writes in (fi/en/sv/de/fr/es/nl)
- Be warm, practical and honest — like a knowledgeable local friend
- Never invent information — if unsure, direct to info@leville.net or +358 44 131 3131
- Keep answers concise (2-4 sentences) unless detailed step-by-step instructions are needed
- For booking availability and pricing always direct to: https://app.moder.fi/levillenet
- Never quote exact prices — they vary by season and availability
- For door codes and WiFi passwords: always tell the guest to check the info sign on their apartment door

CRITICAL — PROPERTY-SPECIFIC QUESTIONS:
When a guest asks about ANY of the following topics, you MUST first ask which property/apartment they are staying in BEFORE answering:
- Heating, thermostat, floor heating, heat pump, air conditioning
- Fireplace, wood stove
- Sauna (electric sauna, wood-fired sauna, how to use)
- Appliances (dishwasher, washing machine, oven, coffee maker, TV)
- WiFi, internet
- Parking
- Check-in / check-out procedures
- Hot tub
- Any other property-specific equipment or instructions

Ask politely, e.g.: "Jotta osaan antaa sinulle tarkat ohjeet, voisitko kertoa missä asunnossa majoitut?" or in English: "To give you the right instructions, could you tell me which apartment you're staying in?"

Our properties include:
- SkiStar Lodge apartments (e.g. 211, 212, 210, 209, 320, 321, 104, 102) — Levin keskusta, SkiStar Lodge rakennus
- Glacier apartments — Glacier-rakennus Levin keskustassa
- Levin keskustan perheasunnot (family apartments in Levi center)
- Karhupirtti / Bear Lodge — Skimbaajankuja, hirsimökki
- Frontslope chalets — rinteen edessä sijaitsevat chaletit

Once the guest tells you their property, give SPECIFIC instructions from the knowledge base for that exact property. Do not give generic answers when property-specific information is available.

If the guest's property is not in our portfolio, let them know politely and suggest contacting info@leville.net.

FULL KNOWLEDGE BASE:
${knowledgeBase}
`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: systemPrompt 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Palvelu on hetkellisesti ruuhkautunut. Yritä hetken kuluttua uudelleen." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Palvelussa on tekninen ongelma. Ota yhteyttä WhatsAppilla." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI-palvelussa tapahtui virhe. Yritä uudelleen." }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Customer service chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Tuntematon virhe" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
