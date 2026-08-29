import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsFor } from "../_shared/authGuard.ts";

// Public by design: guests open their guide page and need the WiFi details.
// Access is limited to our own origins so other sites cannot harvest them.
Deno.serve(async (req: Request): Promise<Response> => {
  const corsHeaders = corsFor(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );


    const { slug } = await req.json();

    if (!slug || typeof slug !== "string") {
      return new Response(
        JSON.stringify({ error: "slug is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const { data, error } = await supabase
      .from("guide_properties")
      .select("wifi_name, wifi_password")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) throw error;

    return new Response(
      JSON.stringify({
        wifi_name: data?.wifi_name ?? null,
        wifi_password: data?.wifi_password ?? null,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (error) {
    console.error("get-guide-wifi failed");
    return new Response(
      JSON.stringify({ error: "Failed to load WiFi details" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
});
