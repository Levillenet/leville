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

    // Fetch all open Priority 2 tickets
    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("priority", "2")
      .in("status", ["open", "in_progress"]);

    if (error) throw error;
    if (!tickets || tickets.length === 0) {
      return json({ message: "No priority 2 tickets found", sent: 0 });
    }

    console.log(`Found ${tickets.length} priority 2 open tickets`);

    const today = formatDate(helsinkiTime);
    const tomorrow = formatDate(
      new Date(helsinkiTime.getTime() + 24 * 60 * 60 * 1000)
    );

    let sentCount = 0;
    const results: any[] = [];

    for (const ticket of tickets) {
      try {
        // Get empty nights for this apartment
        const emptyNights = await getEmptyNightsForApartment(
          beds24Token,
          ticket.apartment_id
        );

        const hasEmptyTonight = emptyNights.includes(today);
        const hasEmptyTomorrow = emptyNights.includes(tomorrow);

        let shouldSend = false;

        // Morning run: send if tonight is empty
        if (isMorningRun && hasEmptyTonight) {
          shouldSend = true;
        }

        // Evening run: send if tomorrow is empty
        if (isEveningRun && hasEmptyTomorrow) {
          shouldSend = true;
        }

        if (!shouldSend) {
          results.push({
            ticket_id: ticket.id,
            apartment: ticket.apartment_id,
            action: "skipped",
            reason: `No matching empty night (tonight=${hasEmptyTonight}, tomorrow=${hasEmptyTomorrow})`,
          });
          continue;
        }

        // Check if we already sent a reminder today for this ticket
        const todayStart = `${today}T00:00:00`;
        const todayEnd = `${today}T23:59:59`;
        const { data: recentLogs } = await supabase
          .from("ticket_email_log")
          .select("id")
          .eq("ticket_id", ticket.id)
          .gte("sent_at", todayStart)
          .lte("sent_at", todayEnd)
          .eq("status", "sent");

        if (recentLogs && recentLogs.length > 0) {
          results.push({
            ticket_id: ticket.id,
            apartment: ticket.apartment_id,
            action: "skipped",
            reason: "Already sent reminder today",
          });
          continue;
        }

        // Resolve recipient email
        const { email } = await resolveRecipientEmail(
          supabase,
          ticket.apartment_id
        );

        if (!email) {
          results.push({
            ticket_id: ticket.id,
            apartment: ticket.apartment_id,
            action: "skipped",
            reason: "No email configured",
          });
          continue;
        }

        // Get apartment name
        const { data: mapping } = await supabase
          .from("moder_property_mapping")
          .select("property_name")
          .eq("beds24_room_id", ticket.apartment_id)
          .maybeSingle();

        const apartmentName = mapping?.property_name || ticket.apartment_id;
        const emptyDate = isMorningRun ? today : tomorrow;
        const typeLabel =
          ticket.type === "urgent" ? "Kiireellinen" : "Kausihuolto";

        const htmlBody = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#e65100;border-bottom:2px solid #e65100;padding-bottom:10px;">
              🔔 Huoltomuistutus – Tyhjä yö ${emptyDate}
            </h2>
            <p style="color:#e65100;font-weight:bold;">
              Huoneistossa <strong>${apartmentName}</strong> on tyhjä yö ${emptyDate}.
              Avoin huoltotiketti olisi hyvä hoitaa tänä aikana.
            </p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr>
                <td style="padding:8px 12px;font-weight:bold;color:#666;width:140px;">Kohde:</td>
                <td style="padding:8px 12px;">${apartmentName}</td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:8px 12px;font-weight:bold;color:#666;">Tiketti:</td>
                <td style="padding:8px 12px;">${ticket.title}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-weight:bold;color:#666;">Tyyppi:</td>
                <td style="padding:8px 12px;">${typeLabel}</td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:8px 12px;font-weight:bold;color:#666;">Kuvaus:</td>
                <td style="padding:8px 12px;">${ticket.description || "–"}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-weight:bold;color:#666;">Tyhjä yö:</td>
                <td style="padding:8px 12px;font-weight:bold;color:#e65100;">${emptyDate}</td>
              </tr>
            </table>
            <p style="margin-top:20px;">
              <a href="https://leville.net/admin" style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block;">
                Avaa admin-paneeli
              </a>
            </p>
            <p style="color:#999;font-size:12px;margin-top:30px;">Tämä muistutus on lähetetty automaattisesti Leville.net-tikettijärjestelmästä.</p>
          </div>
        `;

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Leville.net Muistutus <noreply@leville.net>",
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
        });

        if (emailResponse.ok) {
          sentCount++;
          results.push({
            ticket_id: ticket.id,
            apartment: ticket.apartment_id,
            action: "sent",
            email,
            emptyDate,
          });
        } else {
          results.push({
            ticket_id: ticket.id,
            apartment: ticket.apartment_id,
            action: "failed",
            error: emailResult,
          });
        }
      } catch (ticketErr) {
        console.error(
          `Error processing ticket ${ticket.id}:`,
          ticketErr
        );
        results.push({
          ticket_id: ticket.id,
          apartment: ticket.apartment_id,
          action: "error",
          error: ticketErr.message,
        });
      }
    }

    console.log(`Reminder run complete. Sent ${sentCount} reminders.`);
    return json({ sent: sentCount, total: tickets.length, results });
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

    if (!response.ok) {
      const text = await response.text();
      console.error(`Beds24 availability error for ${apartmentId}:`, text);
      return [];
    }

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

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
