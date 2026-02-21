import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminPassword = Deno.env.get("ADMIN_PASSWORD")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const { password, action, ...params } = body;

    // Verify admin access
    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let result;

    switch (action) {
      case "list_properties": {
        const { data, error } = await supabase
          .from("guide_properties")
          .select("*")
          .order("name");
        if (error) throw error;
        result = data;
        break;
      }

      case "get_property": {
        const { data, error } = await supabase
          .from("guide_properties")
          .select("*")
          .eq("id", params.property_id)
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "upsert_property": {
        const { data, error } = await supabase
          .from("guide_properties")
          .upsert(params.property, { onConflict: "id" })
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "delete_property": {
        const { error } = await supabase
          .from("guide_properties")
          .delete()
          .eq("id", params.property_id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case "list_sections": {
        const { data, error } = await supabase
          .from("guide_sections")
          .select("*")
          .eq("property_id", params.property_id)
          .order("sort_order");
        if (error) throw error;
        result = data;
        break;
      }

      case "upsert_section": {
        const { data, error } = await supabase
          .from("guide_sections")
          .upsert(params.section, { onConflict: "id" })
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "delete_section": {
        const { error } = await supabase
          .from("guide_sections")
          .delete()
          .eq("id", params.section_id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case "list_images": {
        const { data, error } = await supabase
          .from("guide_images")
          .select("*")
          .eq("property_id", params.property_id)
          .order("sort_order");
        if (error) throw error;
        result = data;
        break;
      }

      case "upsert_image": {
        const { data, error } = await supabase
          .from("guide_images")
          .upsert(params.image, { onConflict: "id" })
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "delete_image": {
        const { error } = await supabase
          .from("guide_images")
          .delete()
          .eq("id", params.image_id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: "Unknown action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(
      JSON.stringify(result),
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
