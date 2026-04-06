import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { action, password } = body;

    // Verify admin
    const adminPw = Deno.env.get("ADMIN_PASSWORD");
    if (password !== adminPw) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    switch (action) {
      // ── TICKETS ──
      case "list_tickets": {
        const { data, error } = await supabase
          .from("tickets")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return json(data);
      }

      case "create_ticket": {
        const { ticket } = body;
        const { data, error } = await supabase
          .from("tickets")
          .insert(ticket)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "update_ticket": {
        const { id, updates } = body;
        const { data, error } = await supabase
          .from("tickets")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "delete_ticket": {
        const { id } = body;
        const { error } = await supabase.from("tickets").delete().eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      // ── MAINTENANCE COMPANIES ──
      case "list_companies": {
        const { data, error } = await supabase
          .from("maintenance_companies")
          .select("*")
          .order("name");
        if (error) throw error;

        // Also fetch apartment assignments
        const { data: assignments } = await supabase
          .from("apartment_maintenance")
          .select("*");

        return json({ companies: data, assignments: assignments || [] });
      }

      case "create_company": {
        const { company } = body;
        const { data, error } = await supabase
          .from("maintenance_companies")
          .insert(company)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "update_company": {
        const { id, updates } = body;
        const { data, error } = await supabase
          .from("maintenance_companies")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "delete_company": {
        const { id } = body;
        const { error } = await supabase
          .from("maintenance_companies")
          .delete()
          .eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      // ── APARTMENT ASSIGNMENTS ──
      case "assign_apartment": {
        const { assignment } = body;
        const { data, error } = await supabase
          .from("apartment_maintenance")
          .insert(assignment)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "unassign_apartment": {
        const { id } = body;
        const { error } = await supabase
          .from("apartment_maintenance")
          .delete()
          .eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      case "update_assignment": {
        const { id, updates } = body;
        const { data, error } = await supabase
          .from("apartment_maintenance")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      // ── EMAIL LOG ──
      case "get_email_log": {
        const { ticket_id } = body;
        const { data, error } = await supabase
          .from("ticket_email_log")
          .select("*")
          .eq("ticket_id", ticket_id)
          .order("sent_at", { ascending: false });
        if (error) throw error;
        return json(data);
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
