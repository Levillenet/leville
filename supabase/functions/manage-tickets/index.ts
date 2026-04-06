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
        const { ticket, changed_by } = body;
        const { data, error } = await supabase
          .from("tickets")
          .insert(ticket)
          .select()
          .single();
        if (error) throw error;

        // Log creation to history
        await addHistory(supabase, data.id, changed_by || "admin", null, null, null, "created");

        // Send email if requested
        let emailResult = null;
        if (ticket.send_email) {
          emailResult = await sendTicketEmail(supabase, data, "creation");
          if (emailResult.sent) {
            await addHistory(supabase, data.id, changed_by || "admin", null, null, `Lähetetty: ${emailResult.email}`, "email_sent");
          }
        }

        return json({ ticket: data, emailResult });
      }

      case "update_ticket": {
        const { id, updates, changed_by } = body;

        // Get old values for history
        const { data: oldTicket } = await supabase.from("tickets").select("*").eq("id", id).single();

        const { data, error } = await supabase
          .from("tickets")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;

        // Log changes to history
        if (oldTicket) {
          const fields = ["status", "priority", "type", "category_id", "notes", "email_override", "target_type", "property_id"];
          for (const field of fields) {
            if (updates[field] !== undefined && String(oldTicket[field]) !== String(updates[field])) {
              const actionType = field === "status" && updates[field] === "resolved" ? "resolved" : "updated";
              await addHistory(supabase, id, changed_by || "admin", field, String(oldTicket[field] ?? ""), String(updates[field] ?? ""), actionType);
            }
          }
        }

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
        const { ticket_id, changed_by } = body;
        const { data: ticket, error } = await supabase
          .from("tickets")
          .select("*")
          .eq("id", ticket_id)
          .single();
        if (error) throw error;

        const result = await sendTicketEmail(supabase, ticket, "reminder");
        if (result.sent) {
          await addHistory(supabase, ticket_id, changed_by || "admin", null, null, `Muistutus lähetetty: ${result.email}`, "email_sent");
        }
        return json(result);
      }

      // ── GET NEXT EMPTY NIGHT ──
      case "get_next_empty_night": {
        const { apartment_id } = body;
        const result = await getNextEmptyNight(apartment_id);
        return json(result);
      }

      // ── GET APARTMENT AVAILABILITY ──
      case "get_apartment_availability": {
        const { apartment_id, days = 30, force_refresh = false } = body;
        const result = await getApartmentAvailability(supabase, apartment_id, days, force_refresh);
        return json(result);
      }

      // ── GET AVAILABILITY INDICATORS ──
      case "get_availability_indicators": {
        const { apartment_ids } = body;
        const result = await getAvailabilityIndicators(supabase, apartment_ids || []);
        return json(result);
      }

      // ── RESOLVE EMAIL ──
      case "resolve_email": {
        const { apartment_id, ticket_email_override } = body;
        // If ticket-level override exists, return it
        if (ticket_email_override) {
          return json({ email: ticket_email_override, source: "ticket_override" });
        }
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

      // ── TICKET CATEGORIES ──
      case "list_categories": {
        const { data, error } = await supabase
          .from("ticket_categories")
          .select("*")
          .order("name");
        if (error) throw error;
        return json(data);
      }

      case "create_category": {
        const { category } = body;
        const { data, error } = await supabase
          .from("ticket_categories")
          .insert(category)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "update_category": {
        const { id, updates } = body;
        const { data, error } = await supabase
          .from("ticket_categories")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "delete_category": {
        const { id } = body;
        // Remove category_id from tickets that use it
        await supabase.from("tickets").update({ category_id: null }).eq("category_id", id);
        const { error } = await supabase.from("ticket_categories").delete().eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      // ── PROPERTIES (KIINTEISTÖT) ──
      case "list_properties": {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .order("name");
        if (error) throw error;
        return json(data);
      }

      case "create_property": {
        const { property } = body;
        const { data, error } = await supabase
          .from("properties")
          .insert(property)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "update_property": {
        const { id, updates } = body;
        const { data, error } = await supabase
          .from("properties")
          .update(updates)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "delete_property": {
        const { id } = body;
        // Remove property_id from apartments and tickets
        await supabase.from("apartment_maintenance").update({ property_id: null }).eq("property_id", id);
        await supabase.from("tickets").update({ property_id: null }).eq("property_id", id);
        const { error } = await supabase.from("properties").delete().eq("id", id);
        if (error) throw error;
        return json({ success: true });
      }

      case "assign_apartment_to_property": {
        const { assignment_id, property_id } = body;
        const { data, error } = await supabase
          .from("apartment_maintenance")
          .update({ property_id })
          .eq("id", assignment_id)
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "assign_apartment_to_property_direct": {
        const { apartment_id, property_id } = body;
        // Create an apartment_maintenance record for property-only assignment (no company)
        const { data, error } = await supabase
          .from("apartment_maintenance")
          .insert({ apartment_id, maintenance_company_id: null, property_id })
          .select()
          .single();
        if (error) throw error;
        return json(data);
      }

      case "get_ticket_history": {
        const { ticket_id } = body;
        const { data, error } = await supabase
          .from("ticket_history")
          .select("*")
          .eq("ticket_id", ticket_id)
          .order("changed_at", { ascending: true });
        if (error) throw error;
        return json(data);
      }

      // ── SCHEDULE DATE REMINDER ──
      case "schedule_date_reminder": {
        const { ticket_id, target_date, changed_by } = body;
        const { data: ticket, error } = await supabase
          .from("tickets")
          .select("*")
          .eq("id", ticket_id)
          .single();
        if (error) throw error;

        const result = await sendTicketEmail(supabase, ticket, "reminder", target_date);
        if (result.sent) {
          await addHistory(supabase, ticket_id, changed_by || "admin", null, null, `Päivämäärämuistutus lähetetty (${target_date}): ${result.email}`, "email_sent");
        }
        return json(result);
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

// ── HELPER: Add history entry ──
async function addHistory(
  supabase: any,
  ticketId: string,
  changedBy: string,
  fieldChanged: string | null,
  oldValue: string | null,
  newValue: string | null,
  actionType: string
) {
  try {
    await supabase.from("ticket_history").insert({
      ticket_id: ticketId,
      changed_by: changedBy,
      field_changed: fieldChanged,
      old_value: oldValue,
      new_value: newValue,
      action_type: actionType,
    });
  } catch (e) {
    console.error("Failed to add history:", e);
  }
}

// ── HELPER: Resolve recipient email ──
async function resolveRecipientEmail(
  supabase: any,
  apartmentId: string
): Promise<{ email: string | null; source: string }> {
  const { data: assignment } = await supabase
    .from("apartment_maintenance")
    .select("contact_email_override, maintenance_company_id")
    .eq("apartment_id", apartmentId)
    .maybeSingle();

  if (assignment?.contact_email_override) {
    return { email: assignment.contact_email_override, source: "override" };
  }

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
  // 1. Ticket-level override
  if (ticket.email_override) {
    const email = ticket.email_override;
    return await doSendEmail(supabase, ticket, email, "ticket_override", emailType);
  }

  // 2-3. Apartment/company fallback
  const { email, source } = await resolveRecipientEmail(supabase, ticket.apartment_id);

  if (!email) {
    return { sent: false, error: "no_email_found" };
  }

  return await doSendEmail(supabase, ticket, email, source, emailType);
}

async function doSendEmail(
  supabase: any,
  ticket: any,
  email: string,
  _source: string,
  emailType: "creation" | "reminder"
): Promise<{ sent: boolean; error?: string; email?: string }> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return { sent: false, error: "resend_api_key_missing" };
  }

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

// ── HELPER: Get apartment availability day-by-day ──
async function getApartmentAvailability(
  supabase: any,
  apartmentId: string,
  days: number,
  forceRefresh: boolean
): Promise<{ dates: Record<string, { booked: boolean; checkIn?: boolean; checkOut?: boolean }>; backToBackWindows: string[]; emptyNights: string[]; cachedAt: string | null }> {
  const cacheKey = `ticket_avail_${apartmentId}`;
  
  if (!forceRefresh) {
    const { data: cached } = await supabase
      .from("beds24_cache")
      .select("*")
      .eq("id", cacheKey)
      .maybeSingle();
    
    if (cached) {
      const cacheAge = Date.now() - new Date(cached.fetched_at).getTime();
      if (cacheAge < 60 * 60 * 1000) {
        return { ...cached.data, cachedAt: cached.fetched_at };
      }
    }
  }

  const apiToken = Deno.env.get("BEDS24_API_TOKEN");
  if (!apiToken) {
    return { dates: {}, backToBackWindows: [], emptyNights: [], cachedAt: null };
  }

  try {
    const today = new Date();
    const endDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    const startStr = formatDate(today);
    const endStr = formatDate(endDate);

    // Query bookings that overlap with our date range:
    // - arrivalFrom: 60 days back to catch ongoing stays that started before today
    // - arrivalTo: end of our range
    // - departureFrom: today to only get bookings that haven't fully passed
    const lookbackDate = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
    const lookbackStr = formatDate(lookbackDate);
    const bookingsUrl = `https://api.beds24.com/v2/bookings?roomId=${apartmentId}&arrivalFrom=${lookbackStr}&arrivalTo=${endStr}&departureFrom=${startStr}`;
    const response = await fetch(bookingsUrl, {
      headers: { token: apiToken, accept: "application/json" },
    });

    const dates: Record<string, { booked: boolean; checkIn?: boolean; checkOut?: boolean }> = {};
    
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates[formatDate(d)] = { booked: false };
    }

    const bookings: Array<{ arrival: string; departure: string }> = [];

    if (response.ok) {
      const bookingsJson = await response.json();
      const rawBookings = Array.isArray(bookingsJson) ? bookingsJson : bookingsJson?.data || [];

      for (const booking of rawBookings) {
        const checkIn = booking.arrival || booking.checkIn;
        const checkOut = booking.departure || booking.checkOut;
        if (!checkIn || !checkOut) continue;

        bookings.push({ arrival: checkIn, departure: checkOut });

        if (dates[checkIn]) dates[checkIn].checkIn = true;
        if (dates[checkOut]) dates[checkOut].checkOut = true;

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          const ds = formatDate(d);
          if (dates[ds]) dates[ds].booked = true;
        }
      }
    } else {
      const availUrl = `https://api.beds24.com/v2/inventory/rooms/availability?roomId=${apartmentId}&arrivalFrom=${startStr}&arrivalTo=${endStr}`;
      const availResponse = await fetch(availUrl, {
        headers: { token: apiToken, accept: "application/json" },
      });

      if (availResponse.ok) {
        const availJson = await availResponse.json();
        const rooms = Array.isArray(availJson) ? availJson : availJson?.data || [];
        for (const room of rooms) {
          const avail = room?.availability || {};
          if (typeof avail === "object" && !Array.isArray(avail)) {
            for (const [date, isAvailable] of Object.entries(avail)) {
              if (dates[date]) {
                dates[date].booked = isAvailable !== true;
              }
            }
          }
        }
      }
    }

    const backToBackWindows: string[] = [];
    for (const [date, info] of Object.entries(dates)) {
      if (info.checkIn && info.checkOut) {
        backToBackWindows.push(date);
      }
    }

    bookings.sort((a, b) => a.arrival.localeCompare(b.arrival));
    for (let i = 0; i < bookings.length - 1; i++) {
      const currentCheckout = bookings[i].departure;
      const nextCheckin = bookings[i + 1].arrival;
      if (currentCheckout === nextCheckin && !backToBackWindows.includes(currentCheckout)) {
        backToBackWindows.push(currentCheckout);
      }
    }
    backToBackWindows.sort();

    const emptyNights = Object.entries(dates)
      .filter(([, info]) => !info.booked)
      .map(([date]) => date)
      .sort();

    const result = { dates, backToBackWindows, emptyNights };

    await supabase.from("beds24_cache").upsert({
      id: cacheKey,
      data: result,
      fetched_at: new Date().toISOString(),
    });

    return { ...result, cachedAt: new Date().toISOString() };
  } catch (err) {
    console.error("getApartmentAvailability error:", err);
    return { dates: {}, backToBackWindows: [], emptyNights: [], cachedAt: null };
  }
}

// ── HELPER: Get availability indicators for multiple apartments ──
async function getAvailabilityIndicators(
  supabase: any,
  apartmentIds: string[]
): Promise<Record<string, { indicator: "back_to_back" | "empty" | "full" }>> {
  const result: Record<string, { indicator: "back_to_back" | "empty" | "full" }> = {};
  
  const BATCH = 5;
  for (let i = 0; i < apartmentIds.length; i += BATCH) {
    const batch = apartmentIds.slice(i, i + BATCH);
    const promises = batch.map(async (id) => {
      const avail = await getApartmentAvailability(supabase, id, 7, false);
      
      if (avail.backToBackWindows.length > 0) {
        result[id] = { indicator: "back_to_back" };
      } else if (avail.emptyNights.length > 0) {
        result[id] = { indicator: "empty" };
      } else {
        result[id] = { indicator: "full" };
      }
    });
    await Promise.all(promises);
  }
  
  return result;
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

    const lookbackDate = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
    const lookbackStr = formatDate(lookbackDate);
    const bookingsUrl = `https://api.beds24.com/v2/bookings?roomId=${apartmentId}&arrivalFrom=${lookbackStr}&arrivalTo=${endDate}&departureFrom=${startDate}`;
    const response = await fetch(bookingsUrl, {
      headers: { token: apiToken, accept: "application/json" },
    });

    if (!response.ok) {
      const availUrl = `https://api.beds24.com/v2/inventory/rooms/availability?roomId=${apartmentId}&arrivalFrom=${startDate}&arrivalTo=${endDate}`;
      const availResponse = await fetch(availUrl, {
        headers: { token: apiToken, accept: "application/json" },
      });

      if (!availResponse.ok) {
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
    const bookingsList = Array.isArray(bookingsJson) ? bookingsJson : bookingsJson?.data || [];
    const occupiedDates = new Set<string>();
    for (const booking of bookingsList) {
      const checkIn = booking.arrival || booking.checkIn;
      const checkOut = booking.departure || booking.checkOut;
      if (!checkIn || !checkOut) continue;
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        occupiedDates.add(formatDate(d));
      }
    }

    const emptyNights: string[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = formatDate(d);
      if (!occupiedDates.has(dateStr)) emptyNights.push(dateStr);
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
