import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
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
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    const viewerPassword = Deno.env.get("VIEWER_PASSWORD");

    if (!password || (password !== adminPassword && password !== viewerPassword)) {
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
