import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://leville.net",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminPassword = Deno.env.get("ADMIN_PASSWORD")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");

    if (!firecrawlKey) {
      return new Response(
        JSON.stringify({ error: "Firecrawl not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { password, url } = body;

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Scraping booking URL:", url);

    // Scrape the page with Firecrawl
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${firecrawlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url.trim(),
        formats: ["markdown"],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error("Firecrawl error:", scrapeData);
      return new Response(
        JSON.stringify({ error: "Failed to scrape page" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const markdown = scrapeData?.data?.markdown || scrapeData?.markdown || "";
    const metadata = scrapeData?.data?.metadata || scrapeData?.metadata || {};

    console.log("Scraped content length:", markdown.length);

    // Use Lovable AI to extract structured data from the scraped content
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      // Fallback: return raw markdown for manual parsing
      return new Response(
        JSON.stringify({
          success: true,
          raw: true,
          markdown,
          metadata,
          property: {
            name: metadata.title || "",
            address: "",
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use AI to extract structured property data
    const aiResponse = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You extract property/accommodation details from booking page content. Return ONLY valid JSON with these fields (use null if not found):
{
  "name": "property name",
  "address": "full address",
  "description": "short property description",
  "max_guests": number or null,
  "bedrooms": "number or description",
  "bathrooms": "number or description",
  "amenities": ["list of amenities"],
  "check_in_time": "HH:MM format or null",
  "check_out_time": "HH:MM format or null",
  "wifi_available": true/false/null,
  "parking_info": "parking details or null",
  "highlights": ["notable features"],
  "nearby": ["nearby places/distances"]
}`
          },
          {
            role: "user",
            content: `Extract property details from this booking page content:\n\nPage title: ${metadata.title || ""}\nURL: ${url}\n\nContent:\n${markdown.substring(0, 8000)}`
          }
        ],
        temperature: 0.1,
      }),
    });

    if (!aiResponse.ok) {
      console.error("AI extraction failed, returning raw data");
      return new Response(
        JSON.stringify({
          success: true,
          raw: true,
          markdown,
          metadata,
          property: { name: metadata.title || "", address: "" },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content || "";
    
    // Parse the JSON from AI response
    let extractedData;
    try {
      // Try to extract JSON from the response (may be wrapped in ```json blocks)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      extractedData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch (parseErr) {
      console.error("Failed to parse AI response:", parseErr);
      extractedData = { name: metadata.title || "" };
    }

    console.log("Extracted property data:", JSON.stringify(extractedData));

    return new Response(
      JSON.stringify({
        success: true,
        property: extractedData,
        metadata,
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