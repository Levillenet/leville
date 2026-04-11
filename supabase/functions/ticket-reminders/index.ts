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

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return json({ error: "RESEND_API_KEY not configured" });
    }

    const beds24Token = Deno.env.get("BEDS24_API_TOKEN");
    if (!beds24Token) {
      return json({ error: "BEDS24_API_TOKEN not configured" });
    }

    // Determine current time in Helsinki
    const now = new Date();
    const helsinkiTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Helsinki" })
    );
    const currentHour = helsinkiTime.getHours();
    const currentMinute = helsinkiTime.getMinutes();

    // Determine which run this is: morning (06:50) or evening (17:50)
    const isMorningRun = currentHour >= 6 && currentHour < 12;
    const isEveningRun = currentHour >= 17 && currentHour < 23;

    console.log(
      `Ticket reminders running at ${helsinkiTime.toISOString()} (Helsinki: ${currentHour}:${currentMinute}), morning=${isMorningRun}, evening=${isEveningRun}`
    );

    // ── PART 0: Auto-recurrence check ──
    let recurrenceCreated = 0;
    try {
      const { data: dueTickets } = await supabase
        .from("tickets")
        .select("*")
        .not("next_recurrence_at", "is", null)
        .lte("next_recurrence_at", now.toISOString())
        .gt("recurrence_months", 0);

      if (dueTickets && dueTickets.length > 0) {
        console.log(`Found ${dueTickets.length} tickets due for recurrence`);
        for (const ticket of dueTickets) {
          try {
            // Fetch ticket_apartments for the original
            const { data: origApts } = await supabase
              .from("ticket_apartments")
              .select("*")
              .eq("ticket_id", ticket.id);

            const newTicketData: any = {
              apartment_id: ticket.apartment_id,
              title: ticket.title,
              description: ticket.description,
              type: ticket.type,
              send_email: true,
              target_type: ticket.target_type,
              category_id: ticket.category_id,
              property_id: ticket.property_id,
              email_override: ticket.email_override,
              recurrence_months: ticket.recurrence_months,
              recurrence_source_id: ticket.recurrence_source_id || ticket.id,
              recurrence_note: ticket.recurrence_note,
              assignment_type: ticket.assignment_type || "kiinteistohuolto",
            };

            // Set next_recurrence_at for the NEW ticket
            const nextDate = new Date();
            nextDate.setMonth(nextDate.getMonth() + ticket.recurrence_months);
            newTicketData.next_recurrence_at = nextDate.toISOString();

            // For changeover tickets, fetch fresh Beds24 data
            if (ticket.type === "changeover") {
              try {
                const schedule = await getNextGuestChangeover(beds24Token, ticket.apartment_id);
                if (schedule) {
                  newTicketData.guest_departure_date = schedule.departure;
                  newTicketData.next_guest_arrival_date = schedule.nextArrival;
                }
              } catch (e) {
                console.error("Recurrence changeover fetch error:", e);
              }
            }

            const { data: newTicket, error: newErr } = await supabase
              .from("tickets")
              .insert(newTicketData)
              .select()
              .single();

            if (newErr || !newTicket) {
              console.error("Failed to create recurring ticket:", newErr);
              continue;
            }

            // Create ticket_apartments for the new ticket
            if (origApts && origApts.length > 0) {
              const newAptRows = origApts.map((oa: any) => ({
                ticket_id: newTicket.id,
                apartment_id: oa.apartment_id,
                apartment_name: oa.apartment_name,
              }));
              await supabase.from("ticket_apartments").insert(newAptRows);

              // Fetch per-apartment changeover data for the new ticket
              if (newTicket.type === "changeover") {
                for (const oa of origApts) {
                  try {
                    const aptSchedule = await getNextGuestChangeover(beds24Token, oa.apartment_id);
                    if (aptSchedule) {
                      await supabase
                        .from("ticket_apartments")
                        .update({
                          guest_departure_date: aptSchedule.departure,
                          next_guest_arrival_date: aptSchedule.nextArrival,
                        })
                        .eq("ticket_id", newTicket.id)
                        .eq("apartment_id", oa.apartment_id);
                    }
                  } catch (e) {
                    console.error(`Recurrence apt changeover error ${oa.apartment_id}:`, e);
                  }
                }
              }
            }

            // Log history
            await supabase.from("ticket_history").insert({
              ticket_id: newTicket.id,
              changed_by: "system",
              action_type: "created",
              new_value: `[Toistuva] Tiketti luotu automaattisesti (${ticket.recurrence_months} kk välein). Edellinen: ${ticket.id.slice(0, 8)}`,
            });

            await supabase.from("ticket_history").insert({
              ticket_id: ticket.id,
              changed_by: "system",
              action_type: "recurrence_created",
              new_value: `Uusi toistuva tiketti luotu: ${newTicket.id.slice(0, 8)}`,
            });

            // Clear next_recurrence_at on OLD ticket so it doesn't fire again
            await supabase
              .from("tickets")
              .update({ next_recurrence_at: null })
              .eq("id", ticket.id);

            // Send email for the new recurring ticket
            try {
              const { data: newTicketApts } = await supabase
                .from("ticket_apartments")
                .select("*")
                .eq("ticket_id", newTicket.id);

              let recipientEmail: string | null = null;
              if (newTicket.maintenance_company_id) {
                const { data: mc } = await supabase.from("maintenance_companies").select("email").eq("id", newTicket.maintenance_company_id).single();
                recipientEmail = mc?.email || null;
              }
              if (!recipientEmail && newTicket.email_override) recipientEmail = newTicket.email_override;

              if (recipientEmail && newTicketApts) {
                await sendRecurringEmail(supabase, resendApiKey, newTicket, recipientEmail, newTicketApts);
              }
            } catch (emailErr) {
              console.error("Recurrence email error:", emailErr);
            }

            recurrenceCreated++;
          } catch (recErr) {
            console.error(`Recurrence error for ticket ${ticket.id}:`, recErr);
          }
        }
      }
    } catch (recurrenceErr) {
      console.error("Recurrence check error:", recurrenceErr);
    }

    // ── PART 1: Process manually scheduled reminders ──
    const { data: scheduledReminders } = await supabase
      .from("ticket_email_log")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_for", now.toISOString());

    let scheduledSentCount = 0;
    if (scheduledReminders && scheduledReminders.length > 0) {
      console.log(`Found ${scheduledReminders.length} scheduled reminders to process`);
      for (const reminder of scheduledReminders) {
        try {
          const { data: ticket } = await supabase
            .from("tickets")
            .select("*")
            .eq("id", reminder.ticket_id)
            .single();
          
          if (!ticket || ticket.status === "resolved") {
            await supabase.from("ticket_email_log")
              .update({ status: "cancelled", error_message: "Tiketti ratkaistu ennen lähetystä" })
              .eq("id", reminder.id);
            continue;
          }

          // Skip reminders for seasonal tickets
          if (ticket.type === "seasonal") {
            await supabase.from("ticket_email_log")
              .update({ status: "cancelled", error_message: "Kausihuoltotiketeille ei lähetetä muistutuksia" })
              .eq("id", reminder.id);
            continue;
          }

          let apartmentName: string | undefined;
          if (reminder.error_message?.startsWith("__apt_name__:")) {
            apartmentName = reminder.error_message.replace("__apt_name__:", "");
          }
          if (!apartmentName) {
            // Try ticket_apartments first for the friendly name
            const { data: ticketAptForName } = await supabase
              .from("ticket_apartments")
              .select("apartment_name")
              .eq("ticket_id", ticket.id)
              .limit(1)
              .maybeSingle();
            if (ticketAptForName?.apartment_name) {
              apartmentName = ticketAptForName.apartment_name;
            } else {
              const { data: mapping } = await supabase
                .from("moder_property_mapping")
                .select("property_name")
                .eq("beds24_room_id", ticket.apartment_id)
                .maybeSingle();
              apartmentName = mapping?.property_name || ticket.apartment_id;
            }
          }

          // Fetch per-apartment changeover info for the email
          const { data: ticketApts } = await supabase
            .from("ticket_apartments")
            .select("*")
            .eq("ticket_id", ticket.id);

          const typeLabel = ticket.type === "urgent" ? "Hoidettava mahdollisimman pian" : ticket.type === "changeover" ? "Vaihdon yhteydessä" : "Kausihuolto";
          const targetDateFormatted = reminder.scheduled_for
            ? new Date(new Date(reminder.scheduled_for).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Helsinki" })
            : "";

          // Build per-apartment changeover block
          let changeoverBlock = "";
          if (ticketApts && ticketApts.length > 1 && ticketApts.some((ta: any) => ta.guest_departure_date)) {
            const aptLines = ticketApts.map((ta: any) => {
              if (!ta.guest_departure_date) return `<p style="margin:2px 0;font-size:14px;"><strong>${ta.apartment_name}:</strong> Ei varaustietoja</p>`;
              const dep = new Date(ta.guest_departure_date).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" });
              const arr = ta.next_guest_arrival_date 
                ? new Date(ta.next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })
                : null;
              return `<p style="margin:2px 0;font-size:14px;"><strong>${ta.apartment_name}:</strong> lähtö ${dep}${arr ? `, seuraava ${arr}` : " – ei seuraavaa"}</p>`;
            }).join("");
            changeoverBlock = `
              <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:8px;padding:12px;margin:12px 0;">
                <p style="margin:0 0 4px 0;font-weight:bold;color:#1565c0;">📅 Asiakastilanne kohteittain</p>
                ${aptLines}
              </div>
            `;
          } else if (ticket.guest_departure_date) {
            const depDate = new Date(ticket.guest_departure_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" });
            const arrDate = ticket.next_guest_arrival_date
              ? new Date(ticket.next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })
              : null;
            changeoverBlock = `
              <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:8px;padding:12px;margin:12px 0;">
                <p style="margin:0 0 4px 0;font-weight:bold;color:#1565c0;">📅 Vaihtojakso</p>
                <p style="margin:2px 0;font-size:14px;">Asiakas lähtee: <strong>${depDate}</strong></p>
                ${arrDate ? `<p style="margin:2px 0;font-size:14px;">Seuraava asiakas saapuu: <strong>${arrDate}</strong></p>` : `<p style="margin:2px 0;font-size:14px;color:#388e3c;">Ei seuraavaa varausta.</p>`}
              </div>
            `;
          }

          const htmlBody = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
              <h2 style="color:#e65100;border-bottom:2px solid #e65100;padding-bottom:10px;">
                🔔 Huoltomuistutus – ${apartmentName}
              </h2>
              <p style="color:#e65100;font-weight:bold;">
                Huoneistossa <strong>${apartmentName}</strong> on tyhjä yö ${targetDateFormatted}.
                Avoin huoltotiketti olisi hyvä hoitaa tänä aikana.
              </p>
              <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                <tr><td style="padding:8px 12px;font-weight:bold;color:#666;width:140px;">Kohde:</td><td style="padding:8px 12px;">${apartmentName}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:bold;color:#666;">Tiketti:</td><td style="padding:8px 12px;">${ticket.title}</td></tr>
                <tr><td style="padding:8px 12px;font-weight:bold;color:#666;">Tyyppi:</td><td style="padding:8px 12px;">${typeLabel}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:bold;color:#666;">Kuvaus:</td><td style="padding:8px 12px;">${ticket.description || "–"}</td></tr>
                <tr><td style="padding:8px 12px;font-weight:bold;color:#666;">Tyhjä yö:</td><td style="padding:8px 12px;font-weight:bold;color:#e65100;">${targetDateFormatted}</td></tr>
              </table>
              ${changeoverBlock}
              <p style="margin-top:20px;">
                <a href="https://leville.net/admin" style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block;">Avaa admin-paneeli</a>
              </p>
              <p style="color:#999;font-size:12px;margin-top:30px;">Tämä muistutus on lähetetty automaattisesti Leville.net-tikettijärjestelmästä.</p>
            </div>
          `;

          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "leville.net tehtävä <admin@m.leville.net>",
              to: [reminder.sent_to],
              subject: `[Leville Muistutus] ${apartmentName} – ${ticket.title} (${targetDateFormatted})`,
              html: htmlBody,
            }),
          });

          const emailResult = await emailResponse.json();
          await supabase.from("ticket_email_log")
            .update({ 
              status: emailResponse.ok ? "sent" : "failed", 
              sent_at: new Date().toISOString(),
              error_message: emailResponse.ok ? null : JSON.stringify(emailResult),
            })
            .eq("id", reminder.id);

          if (emailResponse.ok) {
            scheduledSentCount++;
            await supabase.from("ticket_history").insert({
              ticket_id: ticket.id,
              changed_by: "system",
              action_type: "email_sent",
              new_value: `Ajastettu muistutus lähetetty: ${reminder.sent_to}`,
            });
          }
        } catch (err) {
          console.error(`Error processing scheduled reminder ${reminder.id}:`, err);
          await supabase.from("ticket_email_log")
            .update({ status: "failed", error_message: err.message })
            .eq("id", reminder.id);
        }
      }
    }

    // ── PART 2: Auto-reminders for open tickets with empty nights ──
    // Fetch open non-changeover tickets (seasonal, urgent)
    // Only urgent tickets get auto-reminders (not seasonal/kausihuolto)
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .in("type", ["urgent"])
      .in("status", ["open", "in_progress"]);

    let sentCount = 0;

    if (tickets && tickets.length > 0) {
      console.log(`Found ${tickets.length} open seasonal/urgent tickets`);

      const today = formatDate(helsinkiTime);
      const tomorrow = formatDate(
        new Date(helsinkiTime.getTime() + 24 * 60 * 60 * 1000)
      );

      for (const ticket of tickets) {
        try {
          const emptyNights = await getEmptyNightsForApartment(beds24Token, ticket.apartment_id);
          const hasEmptyTonight = emptyNights.includes(today);
          const hasEmptyTomorrow = emptyNights.includes(tomorrow);

          let shouldSend = false;
          if (isMorningRun && hasEmptyTonight) shouldSend = true;
          if (isEveningRun && hasEmptyTomorrow) shouldSend = true;

          if (!shouldSend) continue;

          const todayStart = `${today}T00:00:00`;
          const todayEnd = `${today}T23:59:59`;
          const { data: recentLogs } = await supabase
            .from("ticket_email_log")
            .select("id")
            .eq("ticket_id", ticket.id)
            .gte("sent_at", todayStart)
            .lte("sent_at", todayEnd)
            .eq("status", "sent");

          if (recentLogs && recentLogs.length > 0) continue;

          let email: string | null = null;
          if (ticket.maintenance_company_id) {
            const { data: mc } = await supabase.from("maintenance_companies").select("email").eq("id", ticket.maintenance_company_id).single();
            email = mc?.email || null;
          }
          if (!email && ticket.email_override) email = ticket.email_override;
          if (!email) continue;

          // Try ticket_apartments first for friendly name
          const { data: ticketAptName } = await supabase
            .from("ticket_apartments")
            .select("apartment_name")
            .eq("ticket_id", ticket.id)
            .limit(1)
            .maybeSingle();
          let apartmentName: string;
          if (ticketAptName?.apartment_name) {
            apartmentName = ticketAptName.apartment_name;
          } else {
            const { data: mapping } = await supabase
              .from("moder_property_mapping")
              .select("property_name")
              .eq("beds24_room_id", ticket.apartment_id)
              .maybeSingle();
            apartmentName = mapping?.property_name || ticket.apartment_id;
          }
          const emptyDate = isMorningRun ? today : tomorrow;
          const typeLabel = ticket.type === "urgent" ? "Hoidettava mahdollisimman pian" : "Kausihuolto";

          const htmlBody = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
              <h2 style="color:#e65100;border-bottom:2px solid #e65100;padding-bottom:10px;">🔔 Huoltomuistutus – Tyhjä yö ${emptyDate}</h2>
              <p style="color:#e65100;font-weight:bold;">Huoneistossa <strong>${apartmentName}</strong> on tyhjä yö ${emptyDate}.</p>
              <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                <tr><td style="padding:8px 12px;font-weight:bold;color:#666;width:140px;">Kohde:</td><td style="padding:8px 12px;">${apartmentName}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:bold;color:#666;">Tiketti:</td><td style="padding:8px 12px;">${ticket.title}</td></tr>
                <tr><td style="padding:8px 12px;font-weight:bold;color:#666;">Tyyppi:</td><td style="padding:8px 12px;">${typeLabel}</td></tr>
                <tr style="background:#f9fafb;"><td style="padding:8px 12px;font-weight:bold;color:#666;">Kuvaus:</td><td style="padding:8px 12px;">${ticket.description || "–"}</td></tr>
                <tr><td style="padding:8px 12px;font-weight:bold;color:#666;">Tyhjä yö:</td><td style="padding:8px 12px;font-weight:bold;color:#e65100;">${emptyDate}</td></tr>
              </table>
              <p style="margin-top:20px;"><a href="https://leville.net/admin" style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block;">Avaa admin-paneeli</a></p>
              <p style="color:#999;font-size:12px;margin-top:30px;">Tämä muistutus on lähetetty automaattisesti Leville.net-tikettijärjestelmästä.</p>
            </div>
          `;

          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "leville.net tehtävä <admin@m.leville.net>",
              to: [email],
              subject: `[Leville Muistutus] ${apartmentName} – ${ticket.title} (tyhjä yö ${emptyDate})`,
              html: htmlBody,
            }),
          });

          const emailResult = await emailResponse.json();
          await supabase.from("ticket_email_log").insert({
            ticket_id: ticket.id,
            sent_to: email,
            status: emailResponse.ok ? "sent" : "failed",
            error_message: emailResponse.ok ? null : JSON.stringify(emailResult),
            email_type: "auto_reminder",
          });

          if (emailResponse.ok) sentCount++;
        } catch (ticketErr) {
          console.error(`Error processing ticket ${ticket.id}:`, ticketErr);
        }
      }
    }

    console.log(`Reminder run complete. Recurrence: ${recurrenceCreated}, Scheduled: ${scheduledSentCount}, Auto: ${sentCount}`);
    return json({ recurrenceCreated, scheduledSent: scheduledSentCount, autoSent: sentCount });
  } catch (error) {
    console.error("Ticket reminders error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// ── HELPER: Send email for recurring ticket ──
async function sendRecurringEmail(
  supabase: any,
  resendApiKey: string,
  ticket: any,
  email: string,
  ticketApartments: any[]
) {
  const siteBase = Deno.env.get("SITE_URL") || "https://leville.lovable.app";

  // Get apartment name
  let apartmentName: string;
  if (ticketApartments.length === 1) {
    apartmentName = ticketApartments[0].apartment_name;
  } else {
    const { data: mapping } = await supabase
      .from("moder_property_mapping")
      .select("property_name")
      .eq("beds24_room_id", ticket.apartment_id)
      .maybeSingle();
    apartmentName = mapping?.property_name || `${ticketApartments.length} kohdetta`;
  }

  // Ensure resolve_token
  let resolveToken = ticket.resolve_token;
  if (!resolveToken) {
    resolveToken = crypto.randomUUID();
    await supabase.from("tickets").update({ resolve_token: resolveToken }).eq("id", ticket.id);
  }

  // Per-apartment changeover info
  let changeoverBlock = "";
  if (ticketApartments.length > 1 && ticketApartments.some((ta: any) => ta.guest_departure_date)) {
    const aptLines = ticketApartments.map((ta: any) => {
      if (!ta.guest_departure_date) return `<p style="margin:2px 0;font-size:14px;"><strong>${ta.apartment_name}:</strong> Ei varaustietoja</p>`;
      const dep = new Date(ta.guest_departure_date).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" });
      const arr = ta.next_guest_arrival_date
        ? new Date(ta.next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" })
        : null;
      return `<p style="margin:2px 0;font-size:14px;"><strong>${ta.apartment_name}:</strong> lähtö ${dep}${arr ? `, seuraava ${arr}` : " – ei seuraavaa"}</p>`;
    }).join("");
    changeoverBlock = `
      <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:8px;padding:12px;margin:12px 0;">
        <p style="margin:0 0 4px 0;font-weight:bold;color:#1565c0;">📅 Asiakastilanne kohteittain</p>
        ${aptLines}
      </div>
    `;
  } else if (ticket.guest_departure_date) {
    const depDate = new Date(ticket.guest_departure_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" });
    const arrDate = ticket.next_guest_arrival_date
      ? new Date(ticket.next_guest_arrival_date).toLocaleDateString("fi-FI", { weekday: "long", day: "numeric", month: "long" })
      : null;
    changeoverBlock = `
      <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:8px;padding:12px;margin:12px 0;">
        <p style="margin:0 0 4px 0;font-weight:bold;color:#1565c0;">📅 Vaihtojakso</p>
        <p style="margin:2px 0;font-size:14px;">Asiakas lähtee: <strong>${depDate}</strong></p>
        ${arrDate ? `<p style="margin:2px 0;font-size:14px;">Seuraava asiakas saapuu: <strong>${arrDate}</strong></p>` : `<p style="margin:2px 0;font-size:14px;color:#388e3c;">Ei seuraavaa varausta.</p>`}
      </div>
    `;
  }

  // Resolve buttons
  let resolveButtons = "";
  if (ticketApartments.length > 1) {
    resolveButtons = `
      <p style="font-size:14px;font-weight:bold;margin:16px 0 8px 0;">Kuittaa kohteittain:</p>
      ${ticketApartments.map((ta: any) => {
        const resolveUrl = `${siteBase}/tiketti-ratkaistu?token=${ta.resolve_token}&apt=1`;
        return `<div style="margin:6px 0;">
          <a href="${resolveUrl}" style="background:#16a34a;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block;font-size:14px;font-weight:bold;">
            ✅ ${ta.apartment_name}
          </a>
        </div>`;
      }).join("")}
    `;
  } else {
    const resolveUrl = `${siteBase}/tiketti-ratkaistu?token=${resolveToken}`;
    resolveButtons = `
      <div style="text-align:center;">
        <a href="${resolveUrl}" style="background:#16a34a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;display:inline-block;font-size:16px;font-weight:bold;">
          ✅ Merkitse tehdyksi
        </a>
      </div>
    `;
  }

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:16px;">
      <h2 style="margin:0 0 8px 0;font-size:18px;">[Toistuva] ${apartmentName}</h2>
      <p style="margin:4px 0;font-size:15px;"><strong>${ticket.title}</strong></p>
      ${ticket.description ? `<p style="margin:4px 0;font-size:14px;color:#444;">${ticket.description}</p>` : ""}
      ${ticket.recurrence_note ? `<p style="margin:4px 0;font-size:13px;color:#666;">📝 ${ticket.recurrence_note}</p>` : ""}
      ${changeoverBlock}
      ${resolveButtons}
      <p style="color:#aaa;font-size:11px;margin-top:24px;">Leville.net – toistuva tehtävä (${ticket.recurrence_months} kk välein)</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "leville.net tehtävä <admin@m.leville.net>",
        to: [email],
        subject: `[Toistuva] ${apartmentName} – ${ticket.title}`,
        html: htmlBody,
      }),
    });

    await supabase.from("ticket_email_log").insert({
      ticket_id: ticket.id,
      sent_to: email,
      status: response.ok ? "sent" : "failed",
      email_type: "recurrence",
    });

    if (response.ok) {
      await supabase.from("ticket_history").insert({
        ticket_id: ticket.id,
        changed_by: "system",
        action_type: "email_sent",
        new_value: `[Toistuva] Sähköposti lähetetty: ${email}`,
      });
    }
  } catch (err) {
    console.error("Recurring email error:", err);
  }
}

// ── HELPER: Get next guest changeover from Beds24 ──
async function getNextGuestChangeover(
  apiToken: string,
  apartmentId: string
): Promise<{ departure: string; nextArrival: string | null } | null> {
  try {
    const today = new Date();
    const endDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    const lookbackDate = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);

    const bookingsUrl = `https://api.beds24.com/v2/bookings?roomId=${apartmentId}&arrivalFrom=${formatDate(lookbackDate)}&arrivalTo=${formatDate(endDate)}&departureFrom=${formatDate(today)}`;
    const response = await fetch(bookingsUrl, {
      headers: { token: apiToken, accept: "application/json" },
    });

    if (!response.ok) return null;

    const bookingsJson = await response.json();
    const bookings = (Array.isArray(bookingsJson) ? bookingsJson : bookingsJson?.data || [])
      .map((b: any) => ({
        arrival: b.arrival || b.checkIn,
        departure: b.departure || b.checkOut,
      }))
      .filter((b: any) => b.arrival && b.departure)
      .sort((a: any, b: any) => a.departure.localeCompare(b.departure));

    if (bookings.length === 0) return null;

    const todayStr = formatDate(today);
    const currentBooking = bookings.find((b: any) => b.departure >= todayStr);
    if (!currentBooking) return null;

    const nextBooking = bookings.find((b: any) => b.arrival >= currentBooking.departure && b !== currentBooking);

    return {
      departure: currentBooking.departure,
      nextArrival: nextBooking?.arrival || null,
    };
  } catch (err) {
    console.error("getNextGuestChangeover error:", err);
    return null;
  }
}

// ── HELPER: Get empty nights from Beds24 ──
async function getEmptyNightsForApartment(
  apiToken: string,
  apartmentId: string
): Promise<string[]> {
  try {
    const today = new Date();
    const twoWeeksLater = new Date(
      today.getTime() + 14 * 24 * 60 * 60 * 1000
    );
    const startDate = formatDate(today);
    const endDate = formatDate(twoWeeksLater);

    const availUrl = `https://api.beds24.com/v2/inventory/rooms/availability?roomId=${apartmentId}&arrivalFrom=${startDate}&arrivalTo=${endDate}`;
    const response = await fetch(availUrl, {
      headers: { token: apiToken, accept: "application/json" },
    });

    if (!response.ok) return [];

    const availJson = await response.json();
    const rooms = Array.isArray(availJson)
      ? availJson
      : availJson?.data || [];

    const emptyNights: string[] = [];
    for (const room of rooms) {
      const avail = room?.availability || {};
      if (typeof avail === "object" && !Array.isArray(avail)) {
        for (const [date, isAvailable] of Object.entries(avail)) {
          if (isAvailable === true) emptyNights.push(date);
        }
      }
    }

    return emptyNights.sort();
  } catch (err) {
    console.error(`getEmptyNightsForApartment error:`, err);
    return [];
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
