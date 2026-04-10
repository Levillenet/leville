import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const siteUrl = Deno.env.get("SITE_URL") || "https://id-preview--965c8e14-cb63-4d51-9c89-2e41dfb8e866.lovable.app";

function redirectResponse(status: "success" | "already" | "invalid" | "error", title?: string) {
  const redirectUrl = new URL("/tiketti-ratkaistu", siteUrl);
  redirectUrl.searchParams.set("status", status);

  if (title) {
    redirectUrl.searchParams.set("title", title);
  }

  return new Response(null, {
    status: 303,
    headers: {
      ...corsHeaders,
      "Cache-Control": "no-store",
      Location: redirectUrl.toString(),
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token || token.length < 10) {
      return redirectResponse("invalid");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: ticket, error } = await supabase
      .from("tickets")
      .select("id, title, status")
      .eq("resolve_token", token)
      .maybeSingle();

    if (error || !ticket) {
      return redirectResponse("invalid");
    }

    if (ticket.status === "resolved") {
      return redirectResponse("already", ticket.title);
    }

    const { error: updateError } = await supabase
      .from("tickets")
      .update({
        status: "resolved",
        resolved_at: new Date().toISOString(),
        resolved_by: "email_link",
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticket.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return redirectResponse("error", ticket.title);
    }

    // Cancel any scheduled (future) email reminders
    try {
      await supabase
        .from("ticket_email_log")
        .update({ status: "cancelled", error_message: "Tiketti ratkaistu sähköpostilinkillä – ajastetut viestit peruttu" })
        .eq("ticket_id", ticket.id)
        .eq("status", "scheduled");
    } catch (cancelErr) {
      console.error("Cancel scheduled emails error:", cancelErr);
    }

    try {
      await supabase.from("ticket_history").insert({
        ticket_id: ticket.id,
        changed_by: "suorittaja (sähköposti)",
        field_changed: "status",
        old_value: ticket.status,
        new_value: "resolved",
        action_type: "resolved",
      });
    } catch (historyError) {
      console.error("History log error:", historyError);
    }

    try {
      const { data: fullTicket } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", ticket.id)
        .single();

      if (fullTicket?.recurrence_months && fullTicket.recurrence_months > 0) {
        const newTicketData = {
          apartment_id: fullTicket.apartment_id,
          title: fullTicket.title,
          description: fullTicket.description,
          type: fullTicket.type,
          priority: fullTicket.priority,
          send_email: false,
          target_type: fullTicket.target_type,
          category_id: fullTicket.category_id,
          property_id: fullTicket.property_id,
          email_override: fullTicket.email_override,
          recurrence_months: fullTicket.recurrence_months,
          recurrence_source_id: fullTicket.recurrence_source_id || fullTicket.id,
          recurrence_note: fullTicket.recurrence_note,
          assignment_type: fullTicket.assignment_type || "kiinteistohuolto",
        };

        const { data: newTicket } = await supabase
          .from("tickets")
          .insert(newTicketData)
          .select()
          .single();

        if (newTicket) {
          await supabase.from("ticket_history").insert({
            ticket_id: newTicket.id,
            changed_by: "system",
            action_type: "created",
            new_value: `Toistuva tiketti luotu automaattisesti (${fullTicket.recurrence_months} kk välein). Edellinen: ${fullTicket.id.slice(0, 8)}`,
          });
        }
      }
    } catch (recurrenceError) {
      console.error("Recurrence error:", recurrenceError);
    }

    return redirectResponse("success", ticket.title);
  } catch (error) {
    console.error("Error:", error);
    return redirectResponse("error");
  }
});
