import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkLimit, recordFailure } from "../_shared/persistentRateLimit.ts";

const ALLOWED_ORIGINS = [
  "https://leville.net",
  "https://www.leville.net",
  "https://leville.lovable.app",
  "http://localhost:8080",
];

const buildCors = (origin: string | null) => ({
  "Access-Control-Allow-Origin":
    origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"))
      ? origin
      : "https://leville.net",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  Vary: "Origin",
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const GROUP_TYPES: Record<string, string> = {
  seura: "Urheiluseura / treenileiri",
  yritys: "Yritys",
  perhe: "Perhe tai suku",
  muu: "Muu",
};

Deno.serve(async (req) => {
  const corsHeaders = buildCors(req.headers.get("origin"));
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const clientKey =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const wait = await checkLimit("group-inquiry", clientKey, 5, 3600);
    if (wait) {
      return json({ error: "Liian monta lähetystä. Yritä myöhemmin uudelleen." }, 429);
    }

    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const groupType = String(body?.groupType ?? "muu").trim();
    const groupSize = String(body?.groupSize ?? "").trim();
    const arrival = String(body?.arrival ?? "").trim();
    const departure = String(body?.departure ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const building = String(body?.building ?? "").trim().slice(0, 100) || "Tuntematon kohde";
    const language = String(body?.language ?? "fi").trim().slice(0, 5);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      name.length < 2 || name.length > 100 ||
      !emailRegex.test(email) || email.length > 255 ||
      phone.length > 30 ||
      !Object.keys(GROUP_TYPES).includes(groupType) ||
      groupSize.length < 1 || groupSize.length > 10 ||
      message.length > 2000
    ) {
      return json({ error: "Tarkista lomakkeen tiedot." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase.from("group_inquiries").insert({
      building,
      language,
      name,
      email,
      phone: phone || null,
      group_type: groupType,
      group_size: groupSize,
      arrival: arrival || null,
      departure: departure || null,
      message: message || null,
    });
    if (dbError) console.error("group_inquiries insert failed:", dbError.message);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return json({ error: "Sähköpostipalvelua ei ole määritetty" }, 500);
    }

    const rows: [string, string][] = [
      ["Kohde", building],
      ["Nimi", name],
      ["Sähköposti", email],
      ["Puhelin", phone || "-"],
      ["Ryhmän tyyppi", GROUP_TYPES[groupType]],
      ["Henkilömäärä", groupSize],
      ["Saapuminen", arrival || "-"],
      ["Lähtö", departure || "-"],
      ["Kieli", language],
    ];

    const emailHtml = `
<!DOCTYPE html>
<html lang="fi"><head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:24px;">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:24px;margin:0 auto;">
    <tr><td>
      <h1 style="color:#0d4a6e;font-size:20px;margin:0 0 16px;">Uusi ryhmätarjouspyyntö – ${escapeHtml(building)}</h1>
      <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#111827;">
        ${rows.map(([k, v]) => `<tr><td style="color:#6b7280;">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
      </table>
      ${message ? `<div style="margin-top:16px;background:#f9fafb;border-radius:8px;padding:16px;font-size:14px;white-space:pre-wrap;">${escapeHtml(message)}</div>` : ""}
      <p style="margin-top:24px;font-size:12px;color:#6b7280;">Lähetetty leville.net-sivuston ryhmätarjouslomakkeelta.</p>
    </td></tr>
  </table>
</body></html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Leville Ryhmätarjous <info@m.leville.net>",
        to: ["info@leville.net"],
        reply_to: email,
        subject: `Ryhmätarjouspyyntö: ${building} – ${groupSize} hlö`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error(`Resend failed [${resendResponse.status}]: ${details}`);
      await recordFailure("group-inquiry", clientKey, 3600);
      return json({ error: "Sähköpostin lähetys epäonnistui" }, 502);
    }

    return json({ success: true });
  } catch (error) {
    console.error("send-group-inquiry error:", error instanceof Error ? error.message : error);
    return json({ error: "Virhe lomakkeen lähetyksessä" }, 500);
  }
});
