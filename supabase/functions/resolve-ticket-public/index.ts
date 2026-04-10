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
    const isApartmentToken = url.searchParams.get("apt") === "1";

    if (!token || token.length < 10) {
      return redirectResponse("invalid");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Try per-apartment token first if apt=1
    if (isApartmentToken) {
      const { data: ta, error: taErr } = await supabase
        .from("ticket_apartments")
        .select("id, ticket_id, apartment_name, status")
        .eq("resolve_token", token)
        .maybeSingle();

      if (taErr || !ta) {
        return redirectResponse("invalid");
      }

      if (ta.status === "resolved") {
        return redirectResponse("already", ta.apartment_name);
      }

      // Resolve this apartment
      await supabase
        .from("ticket_apartments")
        .update({ status: "resolved", resolved_at: new Date().toISOString() })
        .eq("id", ta.id);

      // Log history
      try {
        await supabase.from("ticket_history").insert({
          ticket_id: ta.ticket_id,
          changed_by: "suorittaja (sähköposti)",
          field_changed: "apartment_resolved",
          old_value: null,
          new_value: ta.apartment_name,
          action_type: "resolved",
        });
      } catch (e) {
        console.error("History log error:", e);
      }

      // Check if all apartments are resolved → auto-resolve ticket
      const { data: allTa } = await supabase
        .from("ticket_apartments")
        .select("status")
        .eq("ticket_id", ta.ticket_id);

      if (allTa && allTa.every((a: any) => a.status === "resolved")) {
        const { data: ticket } = await supabase
          .from("tickets")
          .select("id, status")
          .eq("id", ta.ticket_id)
          .single();

        if (ticket && ticket.status !== "resolved") {
          await supabase
            .from("tickets")
            .update({
              status: "resolved",
              resolved_at: new Date().toISOString(),
              resolved_by: "email_link",
              updated_at: new Date().toISOString(),
            })
            .eq("id", ta.ticket_id);

          // Cancel scheduled reminders
          try {
            await supabase
              .from("ticket_email_log")
              .update({ status: "cancelled", error_message: "Kaikki kohteet kuitattu sähköpostista – tiketti ratkaistu" })
              .eq("ticket_id", ta.ticket_id)
              .eq("status", "scheduled");
          } catch (e) {
            console.error("Cancel error:", e);
          }

          try {
            await supabase.from("ticket_history").insert({
              ticket_id: ta.ticket_id,
              changed_by: "suorittaja (sähköposti)",
              field_changed: "status",
              old_value: ticket.status,
              new_value: "resolved",
              action_type: "resolved",
            });
          } catch (e) {
            console.error("History error:", e);
          }
        }
      }

      return redirectResponse("success", ta.apartment_name);
    }

    // Fallback: whole-ticket token resolution (single apartment tickets)
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

    // Also resolve all ticket_apartments
    try {
      await supabase
        .from("ticket_apartments")
        .update({ status: "resolved", resolved_at: new Date().toISOString() })
        .eq("ticket_id", ticket.id)
        .neq("status", "resolved");
    } catch (e) {
      console.error("Resolve apartments error:", e);
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
