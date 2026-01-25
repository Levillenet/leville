import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PropertyInquiry {
  name: string;
  email: string;
  phone?: string;
  address: string;
  propertyType: "loma-asunto" | "talo" | "muu";
  message?: string;
}

const propertyTypeLabels: Record<string, string> = {
  "loma-asunto": "Loma-asunto",
  "talo": "Talo",
  "muu": "Muu",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Email service not configured");
    }

    const body: PropertyInquiry = await req.json();
    console.log("Received property inquiry:", { 
      name: body.name, 
      email: body.email, 
      address: body.address,
      propertyType: body.propertyType 
    });

    // Validate required fields
    if (!body.name || !body.email || !body.address || !body.propertyType) {
      return new Response(
        JSON.stringify({ error: "Pakolliset kentät puuttuvat" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: "Virheellinen sähköpostiosoite" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const propertyTypeLabel = propertyTypeLabels[body.propertyType] || body.propertyType;

    const emailHtml = `
<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Uusi loma-asuntotarjous</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d4a6e 0%, #1a6b5a 100%); padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                🏠 Uusi loma-asuntotarjous
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Uusi yhteydenotto loma-asunnon myyntiin liittyen on saapunut leville.net-sivustolta.
              </p>
              
              <!-- Property Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #166534; margin: 0 0 16px; font-size: 18px;">Kohteen tiedot</h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">Kohteen tyyppi:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${propertyTypeLabel}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Osoite/sijainti:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${body.address}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Contact Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #1e40af; margin: 0 0 16px; font-size: 18px;">Yhteystiedot</h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 140px;">Nimi:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${body.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Sähköposti:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                          <a href="mailto:${body.email}" style="color: #2563eb; text-decoration: none;">${body.email}</a>
                        </td>
                      </tr>
                      ${body.phone ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Puhelin:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                          <a href="tel:${body.phone}" style="color: #2563eb; text-decoration: none;">${body.phone}</a>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              ${body.message ? `
              <!-- Message Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf5ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #7c3aed; margin: 0 0 16px; font-size: 18px;">Lisätiedot</h2>
                    <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${body.message}</p>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <!-- Quick Actions -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <a href="mailto:${body.email}?subject=RE: Loma-asunnon myynti - ${body.address}" style="display: inline-block; background-color: #0d4a6e; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Vastaa asiakkaalle
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Tämä viesti lähetettiin automaattisesti leville.net-sivuston "Myy loma-asuntosi" -lomakkeelta.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    console.log("Sending email to info@leville.net...");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Leville Yhteydenotto <info@m.leville.net>",
        to: ["info@leville.net"],
        reply_to: body.email,
        subject: `Uusi loma-asuntotarjous: ${body.address} (${propertyTypeLabel})`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();
    console.log("Resend response:", resendData);

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      throw new Error(resendData.message || "Failed to send email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Yhteydenotto lähetetty onnistuneesti" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-property-inquiry:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Virhe lomakkeen lähetyksessä" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
