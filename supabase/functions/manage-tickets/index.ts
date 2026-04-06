import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

        // Send email if requested
        let emailResult = null;
        if (ticket.send_email) {
          emailResult = await sendTicketEmail(supabase, data, "creation");
        }

        return json({ ticket: data, emailResult });
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

      // ── SEND REMINDER (manual) ──
      case "send_reminder": {
        const { ticket_id } = body;
        const { data: ticket, error } = await supabase
          .from("tickets")
          .select("*")
          .eq("id", ticket_id)
          .single();
        if (error) throw error;

        const result = await sendTicketEmail(supabase, ticket, "reminder");
        return json(result);
      }

      // ── GET NEXT EMPTY NIGHT ──
      case "get_next_empty_night": {
        const { apartment_id } = body;
        const result = await getNextEmptyNight(apartment_id);
        return json(result);
      }

      // ── RESOLVE EMAIL ──
      case "resolve_email": {
        const { apartment_id } = body;
        const result = await resolveRecipientEmail(supabase, apartment_id);
        return json(result);
      }

      // ── MAINTENANCE COMPANIES ──
      case "list_companies": {
        const { data, error } = await supabase
          .from("maintenance_companies")
          .select("*")
          .order("name");
        if (error) throw error;

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

// ── HELPER: Resolve recipient email ──
async function resolveRecipientEmail(
  supabase: any,
  apartmentId: string
): Promise<{ email: string | null; source: string }> {
  // 1. Check apartment_maintenance for override
  const { data: assignment } = await supabase
    .from("apartment_maintenance")
    .select("contact_email_override, maintenance_company_id")
    .eq("apartment_id", apartmentId)
    .maybeSingle();

  if (assignment?.contact_email_override) {
    return { email: assignment.contact_email_override, source: "override" };
  }

  // 2. Check maintenance company email
  if (assignment?.maintenance_company_id) {
    const { data: company } = await supabase
      .from("maintenance_companies")
      .select("email")
      .eq("id", assignment.maintenance_company_id)
      .single();

    if (company?.email) {
      return { email: company.email, source: "company" };
    }
  }

  return { email: null, source: "none" };
}

// ── HELPER: Send ticket email via Resend ──
async function sendTicketEmail(
  supabase: any,
  ticket: any,
  emailType: "creation" | "reminder"
): Promise<{ sent: boolean; error?: string; email?: string }> {
  const { email, source } = await resolveRecipientEmail(
    supabase,
    ticket.apartment_id
  );

  if (!email) {
    return { sent: false, error: "no_email_found" };
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return { sent: false, error: "resend_api_key_missing" };
  }

  // Get apartment name from moder_property_mapping or use ID
  const { data: mapping } = await supabase
    .from("moder_property_mapping")
    .select("property_name")
    .eq("beds24_room_id", ticket.apartment_id)
    .maybeSingle();

  const apartmentName = mapping?.property_name || ticket.apartment_id;
  const typeLabel = ticket.type === "urgent" ? "Kiireellinen" : "Kausihuolto";
  const priorityLabel = ticket.priority === "1" ? "1 – Normaali" : "2 – Muistutus tarvitaan";
  const createdDate = new Date(ticket.created_at).toLocaleString("fi-FI", {
    timeZone: "Europe/Helsinki",
  });

  const isReminder = emailType === "reminder";
  const subject = isReminder
    ? `[Leville Muistutus] ${apartmentName} – ${ticket.title}`
    : `[Leville Tiketti] ${apartmentName} – ${ticket.title}`;

  const reminderNote = isReminder
    ? `<p style="color:#e65100;font-weight:bold;">⚠️ Tämä on muistutus avoimesta tiketistä. Huoneistossa on tyhjä yö lähiaikoina – huolto olisi hyvä suorittaa.</p>`
    : "";

  const adminUrl = `https://leville.net/admin`;

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#1a1a1a;border-bottom:2px solid #2563eb;padding-bottom:10px;">
        ${isReminder ? "🔔 Huoltomuistutus" : "📋 Uusi huoltotiketti"}
      </h2>
      ${reminderNote}
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr>
          <td style="padding:8px 12px;font-weight:bold;color:#666;width:140px;">Kohde:</td>
          <td style="padding:8px 12px;">${apartmentName}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px 12px;font-weight:bold;color:#666;">Tyyppi:</td>
          <td style="padding:8px 12px;">${typeLabel}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;color:#666;">Prioriteetti:</td>
          <td style="padding:8px 12px;">${priorityLabel}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px 12px;font-weight:bold;color:#666;">Kuvaus:</td>
          <td style="padding:8px 12px;">${ticket.description || "–"}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;color:#666;">Luotu:</td>
          <td style="padding:8px 12px;">${createdDate}</td>
        </tr>
      </table>
      <p style="margin-top:20px;">
        <a href="${adminUrl}" style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block;">
          Avaa admin-paneeli
        </a>
      </p>
      <p style="color:#999;font-size:12px;margin-top:30px;">Tämä viesti on lähetetty automaattisesti Leville.net-järjestelmästä.</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Leville.net Tiketöinti <noreply@leville.net>",
        to: [email],
        subject,
        html: htmlBody,
      }),
    });

    const result = await response.json();

    // Log to ticket_email_log
    await supabase.from("ticket_email_log").insert({
      ticket_id: ticket.id,
      sent_to: email,
      status: response.ok ? "sent" : "failed",
      error_message: response.ok ? null : JSON.stringify(result),
    });

    if (!response.ok) {
      console.error("Resend error:", result);
      return { sent: false, error: JSON.stringify(result), email };
    }

    return { sent: true, email };
  } catch (err) {
    console.error("Email send error:", err);

    await supabase.from("ticket_email_log").insert({
      ticket_id: ticket.id,
      sent_to: email,
      status: "failed",
      error_message: err.message,
    });

    return { sent: false, error: err.message, email };
  }
}

// ── HELPER: Get next empty night from Beds24 ──
async function getNextEmptyNight(
  apartmentId: string
): Promise<{ emptyNights: string[]; nextEmpty: string | null }> {
  const apiToken = Deno.env.get("BEDS24_API_TOKEN");
  if (!apiToken) {
    return { emptyNights: [], nextEmpty: null };
  }

  try {
    const today = new Date();
    const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const startDate = formatDate(today);
    const endDate = formatDate(twoWeeksLater);

    // Get bookings for this room
    const bookingsUrl = `https://api.beds24.com/v2/bookings?roomId=${apartmentId}&arrival=${startDate}&departure=${endDate}`;
    const response = await fetch(bookingsUrl, {
      headers: { token: apiToken, accept: "application/json" },
    });

    if (!response.ok) {
      // Fallback: try availability endpoint
      const availUrl = `https://api.beds24.com/v2/inventory/rooms/availability?roomId=${apartmentId}&arrivalFrom=${startDate}&arrivalTo=${endDate}`;
      const availResponse = await fetch(availUrl, {
        headers: { token: apiToken, accept: "application/json" },
      });

      if (!availResponse.ok) {
        const text = await availResponse.text();
        console.error("Beds24 availability error:", text);
        return { emptyNights: [], nextEmpty: null };
      }

      const availJson = await availResponse.json();
      const rooms = Array.isArray(availJson) ? availJson : availJson?.data || [];

      const emptyNights: string[] = [];
      for (const room of rooms) {
        const avail = room?.availability || {};
        if (typeof avail === "object" && !Array.isArray(avail)) {
          for (const [date, isAvailable] of Object.entries(avail)) {
            if (isAvailable === true) emptyNights.push(date);
          }
        }
      }

      emptyNights.sort();
      return { emptyNights, nextEmpty: emptyNights[0] || null };
    }

    const bookingsJson = await response.json();
    const bookings = Array.isArray(bookingsJson) ? bookingsJson : bookingsJson?.data || [];

    // Build set of occupied dates
    const occupiedDates = new Set<string>();
    for (const booking of bookings) {
      const checkIn = booking.arrival || booking.checkIn;
      const checkOut = booking.departure || booking.checkOut;
      if (!checkIn || !checkOut) continue;

      const start = new Date(checkIn);
      const end = new Date(checkOut);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        occupiedDates.add(formatDate(d));
      }
    }

    // Find empty nights in next 14 days
    const emptyNights: string[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = formatDate(d);
      if (!occupiedDates.has(dateStr)) {
        emptyNights.push(dateStr);
      }
    }

    return { emptyNights, nextEmpty: emptyNights[0] || null };
  } catch (err) {
    console.error("getNextEmptyNight error:", err);
    return { emptyNights: [], nextEmpty: null };
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
