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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const beds24Token = Deno.env.get("BEDS24_API_TOKEN");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!beds24Token || !resendApiKey) {
      return json({ error: "Missing API keys" });
    }

    // Only run between 8-22 Helsinki time
    const now = new Date();
    const helsinkiTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Helsinki" }));
    const currentHour = helsinkiTime.getHours();
    
    if (currentHour < 8 || currentHour >= 22) {
      return json({ message: "Outside operating hours (8-22)", skipped: true });
    }

    // Fetch all open changeover tickets
    const { data: changeoverTickets, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("type", "changeover")
      .in("status", ["open", "in_progress"]);

    if (error) throw error;
    if (!changeoverTickets || changeoverTickets.length === 0) {
      return json({ message: "No open changeover tickets", checked: 0 });
    }

    console.log(`Checking booking changes for ${changeoverTickets.length} changeover tickets`);

    let updatedCount = 0;
    const results: any[] = [];

    for (const ticket of changeoverTickets) {
      try {
        // Fetch current booking situation from Beds24 for the main apartment
        const guestSchedule = await getNextGuestChangeover(beds24Token, ticket.apartment_id);
        if (!guestSchedule) {
          results.push({ ticket_id: ticket.id, action: "skipped", reason: "No bookings found" });
          continue;
        }

        const oldDeparture = ticket.guest_departure_date;
        const oldArrival = ticket.next_guest_arrival_date;
        const newDeparture = guestSchedule.departure;
        const newArrival = guestSchedule.nextArrival;

        // Check if anything changed on parent ticket
        const departureChanged = oldDeparture !== newDeparture;
        const arrivalChanged = oldArrival !== newArrival;

        if (departureChanged || arrivalChanged) {
          // Update ticket with new dates
          await supabase
            .from("tickets")
            .update({
              guest_departure_date: newDeparture,
              next_guest_arrival_date: newArrival,
              updated_at: new Date().toISOString(),
            })
            .eq("id", ticket.id);

          const oldDepStr = oldDeparture ? formatFinnishDate(oldDeparture) : "–";
          const newDepStr = newDeparture ? formatFinnishDate(newDeparture) : "–";
          const oldArrStr = oldArrival ? formatFinnishDate(oldArrival) : "–";
          const newArrStr = newArrival ? formatFinnishDate(newArrival) : "–";

          let changeDesc = "Varaustilanteen muutos: ";
          if (departureChanged) changeDesc += `Lähtö: ${oldDepStr} → ${newDepStr}. `;
          if (arrivalChanged) changeDesc += `Saapuminen: ${oldArrStr} → ${newArrStr}. `;

          await supabase.from("ticket_history").insert({
            ticket_id: ticket.id,
            changed_by: "system",
            field_changed: "booking_change",
            old_value: `Lähtö: ${oldDepStr}, Saapuminen: ${oldArrStr}`,
            new_value: `Lähtö: ${newDepStr}, Saapuminen: ${newArrStr}`,
            action_type: "booking_updated",
          });

          // Resolve recipient email from ticket's maintenance_company_id
          let recipientEmail: string | null = null;
          if (ticket.maintenance_company_id) {
            const { data: company } = await supabase
              .from("maintenance_companies")
              .select("email")
              .eq("id", ticket.maintenance_company_id)
              .single();
            recipientEmail = company?.email || null;
          }
          if (!recipientEmail && ticket.email_override) {
            recipientEmail = ticket.email_override;
          }

          // Update scheduled changeover reminders if departure date changed
          if (departureChanged && newDeparture) {
            await supabase
              .from("ticket_email_log")
              .update({ status: "cancelled", error_message: "Varaustilanteen muutos – ajastettu muistutus peruttu" })
              .eq("ticket_id", ticket.id)
              .eq("status", "scheduled")
              .eq("email_type", "changeover_reminder");

            if (recipientEmail) {
              const reminderTime = new Date(newDeparture + "T05:50:00Z");
              await supabase.from("ticket_email_log").insert({
                ticket_id: ticket.id,
                sent_to: recipientEmail,
                status: "scheduled",
                email_type: "changeover_reminder",
                scheduled_for: reminderTime.toISOString(),
              });
            }
          }

          // Send email notification about the change
          if (recipientEmail) {
            const { data: mapping } = await supabase
              .from("moder_property_mapping")
              .select("property_name")
              .eq("beds24_room_id", ticket.apartment_id)
              .maybeSingle();
            const apartmentName = mapping?.property_name || ticket.apartment_id;

            const htmlBody = `
              <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:16px;">
                <h2 style="margin:0 0 8px 0;font-size:18px;">⚠️ Varaustilanteen muutos – ${apartmentName}</h2>
                <p style="margin:4px 0;font-size:15px;"><strong>${ticket.title}</strong></p>
                ${ticket.description ? `<p style="margin:4px 0;font-size:14px;color:#444;">${ticket.description}</p>` : ""}
                
                <div style="background:#fff3e0;border:1px solid #ffb74d;border-radius:8px;padding:12px;margin:12px 0;">
                  <p style="margin:0 0 8px 0;font-weight:bold;color:#e65100;">📅 Uusi aikataulu</p>
                  ${departureChanged ? `<p style="margin:2px 0;font-size:14px;">Asiakas lähtee: <s style="color:#999;">${oldDepStr}</s> → <strong style="color:#e65100;">${newDepStr}</strong></p>` : `<p style="margin:2px 0;font-size:14px;">Asiakas lähtee: <strong>${newDepStr}</strong></p>`}
                  ${arrivalChanged ? `<p style="margin:2px 0;font-size:14px;">Seuraava asiakas: <s style="color:#999;">${oldArrStr}</s> → <strong style="color:#e65100;">${newArrStr}</strong></p>` : newArrival ? `<p style="margin:2px 0;font-size:14px;">Seuraava asiakas: <strong>${newArrStr}</strong></p>` : `<p style="margin:2px 0;font-size:14px;color:#388e3c;">Ei seuraavaa varausta.</p>`}
                </div>
                
                <p style="color:#aaa;font-size:11px;margin-top:24px;">Leville.net – automaattinen ilmoitus</p>
              </div>
            `;

            const emailResponse = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
              body: JSON.stringify({
                from: "leville.net tehtävä <admin@m.leville.net>",
                to: [recipientEmail],
                subject: `[Muutos] ${apartmentName} – ${ticket.title} – uusi aikataulu`,
                html: htmlBody,
              }),
            });

            await supabase.from("ticket_email_log").insert({
              ticket_id: ticket.id,
              sent_to: recipientEmail,
              status: emailResponse.ok ? "sent" : "failed",
              email_type: "booking_change",
            });
          }

          updatedCount++;
          results.push({ ticket_id: ticket.id, action: "updated", changes: changeDesc });
        } else {
          results.push({ ticket_id: ticket.id, action: "no_change" });
        }

        // Also update per-apartment rows in ticket_apartments
        const { data: ticketApts } = await supabase
          .from("ticket_apartments")
          .select("*")
          .eq("ticket_id", ticket.id);

        if (ticketApts && ticketApts.length > 0) {
          for (const ta of ticketApts) {
            try {
              const aptSchedule = await getNextGuestChangeover(beds24Token, ta.apartment_id);
              if (aptSchedule) {
                const aptDepChanged = ta.guest_departure_date !== aptSchedule.departure;
                const aptArrChanged = ta.next_guest_arrival_date !== aptSchedule.nextArrival;
                if (aptDepChanged || aptArrChanged) {
                  await supabase
                    .from("ticket_apartments")
                    .update({
                      guest_departure_date: aptSchedule.departure,
                      next_guest_arrival_date: aptSchedule.nextArrival,
                    })
                    .eq("id", ta.id);
                }
              }
            } catch (aptErr) {
              console.error(`Error updating apt ${ta.apartment_id}:`, aptErr);
            }
          }
        }
      } catch (err) {
        console.error(`Error checking ticket ${ticket.id}:`, err);
        results.push({ ticket_id: ticket.id, action: "error", error: err.message });
      }
    }

    console.log(`Booking change check complete. Updated: ${updatedCount}/${changeoverTickets.length}`);
    return json({ checked: changeoverTickets.length, updated: updatedCount, results });
  } catch (error) {
    console.error("Check booking changes error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

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


function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatFinnishDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fi-FI", { weekday: "short", day: "numeric", month: "numeric" });
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
