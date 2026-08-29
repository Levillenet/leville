import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { corsFor, readJsonBody, isAdminRequest, unauthorized } from "../_shared/authGuard.ts";

interface MarkCleanedRequest {
  propertyId: string;
  checkInDate: string;
}

// Privacy: guest names, emails and phone numbers are never received or stored.
// Guest notification emails have been disabled.
serve(async (req: Request): Promise<Response> => {
  const corsHeaders = corsFor(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const body = await readJsonBody(req);
  if (!isAdminRequest(req, body, { allowViewer: false })) {
    return unauthorized(req);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { propertyId, checkInDate } = body as unknown as MarkCleanedRequest;


    console.log("Mark cleaned request:", { propertyId, checkInDate });

    if (!propertyId || !checkInDate) {
      return new Response(
        JSON.stringify({ error: "propertyId and checkInDate are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const cleanedAt = new Date().toISOString();

    // Get property name - priority: property_settings.marketing_name -> moder_property_mapping -> fallback
    let propertyName = `Huoneisto ${propertyId}`;

    const { data: settingsData } = await supabase
      .from("property_settings")
      .select("marketing_name")
      .eq("property_id", propertyId)
      .maybeSingle();

    if (settingsData?.marketing_name) {
      propertyName = settingsData.marketing_name;
    } else {
      const { data: mappingData } = await supabase
        .from("moder_property_mapping")
        .select("property_name")
        .eq("beds24_room_id", propertyId)
        .maybeSingle();

      if (mappingData?.property_name) {
        propertyName = mappingData.property_name;
      }
    }

    const { error: cleaningError } = await supabase
      .from("cleaning_status")
      .upsert({
        property_id: propertyId,
        check_in_date: checkInDate,
        cleaned_at: cleanedAt,
        cleaned_by: "admin",
        updated_at: cleanedAt,
      }, {
        onConflict: "property_id,check_in_date",
      });

    if (cleaningError) {
      console.error("Error updating cleaning status:", cleaningError);
      throw cleaningError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        cleanedAt,
        propertyName,
        notificationSent: false,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (error) {
    console.error("Error in mark-cleaned function:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
});
