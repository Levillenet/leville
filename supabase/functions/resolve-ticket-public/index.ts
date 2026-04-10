import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token || token.length < 10) {
      return htmlResponse("❌ Virheellinen linkki", "Token puuttuu tai on virheellinen.", 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find ticket by resolve_token
    const { data: ticket, error } = await supabase
      .from("tickets")
      .select("id, title, status, apartment_id, resolve_token")
      .eq("resolve_token", token)
      .maybeSingle();

    if (error || !ticket) {
      return htmlResponse("❌ Tikettiä ei löytynyt", "Linkki on vanhentunut tai virheellinen.", 404);
    }

    if (ticket.status === "resolved") {
      return htmlResponse("ℹ️ Tiketti on jo merkitty tehdyksi", `Tiketti "${ticket.title}" on jo ratkaistu.`, 200);
    }

    // Update ticket status
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
      return htmlResponse("❌ Virhe", "Tiketin päivitys epäonnistui.", 500);
    }

    // Log to history
    try {
      await supabase.from("ticket_history").insert({
        ticket_id: ticket.id,
        changed_by: "suorittaja (sähköposti)",
        field_changed: "status",
        old_value: ticket.status,
        new_value: "resolved",
        action_type: "resolved",
      });
    } catch (e) {
      console.error("History log error:", e);
    }

    // Handle recurrence (same logic as manage-tickets)
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
    } catch (e) {
      console.error("Recurrence error:", e);
    }

    return htmlResponse("✅ Tiketti merkitty tehdyksi!", `Tiketti "${ticket.title}" on nyt ratkaistu. Kiitos!`, 200);
  } catch (error) {
    console.error("Error:", error);
    return htmlResponse("❌ Virhe", "Jotain meni pieleen.", 500);
  }
});

function htmlResponse(title: string, message: string, status: number) {
  const html = `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f9fafb; }
    .card { background: white; border-radius: 12px; padding: 40px; max-width: 500px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    h1 { font-size: 24px; color: #1a1a1a; margin-bottom: 12px; }
    p { font-size: 16px; color: #666; line-height: 1.5; }
    .logo { font-size: 14px; color: #999; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <p class="logo">Leville.net</p>
  </div>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
