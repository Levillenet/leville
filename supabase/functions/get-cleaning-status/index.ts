import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { resolveAdminRole } from "../_shared/adminCredential.ts";

const STATIC_ALLOWED_ORIGINS = [
  "https://leville.net",
  "https://www.leville.net",
  "https://leville.lovable.app",
];

function originFor(req: Request): string {
  const origin = req.headers.get("origin") ?? "";
  if (STATIC_ALLOWED_ORIGINS.includes(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)) return origin;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return origin;
  return "https://leville.net";
}

function corsFor(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": originFor(req),
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };
}

serve(async (req: Request): Promise<Response> => {
  const corsHeaders = corsFor(req);
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { date, password } = await req.json();

    // Verify admin/viewer password before returning any data
    if (!(await resolveAdminRole(password))) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!date) {
      return new Response(
        JSON.stringify({ error: "date is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get cleaning status for the given date (no guest PII returned)
    const { data: cleaningData, error } = await supabase
      .from("cleaning_status")
      .select("property_id, check_in_date, cleaned_at, notification_sent_at")
      .eq("check_in_date", date);

    if (error) {
      console.error("Error fetching cleaning status:", error);
      throw error;
    }

    // Create a map by property_id for easy lookup
    const statusMap: Record<string, unknown> = {};
    for (const status of (cleaningData || [])) {
      statusMap[status.property_id] = status;
    }


    console.log("Cleaning status found:", Object.keys(statusMap).length);

    return new Response(
      JSON.stringify({ statusMap }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in get-cleaning-status function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
