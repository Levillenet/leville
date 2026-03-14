import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MarkCleanedRequest {
  propertyId: string;
  checkInDate: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  bookingId?: string;
  sendNotification?: boolean;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { 
      propertyId, 
      checkInDate, 
      guestName, 
      guestEmail, 
      guestPhone, 
      bookingId,
      sendNotification = true 
    }: MarkCleanedRequest = await req.json();

    console.log("Mark cleaned request:", { propertyId, checkInDate, guestEmail, sendNotification });

    if (!propertyId || !checkInDate) {
      return new Response(
        JSON.stringify({ error: "propertyId and checkInDate are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const cleanedAt = new Date().toISOString();

    // Get property name - priority: property_settings.marketing_name -> moder_property_mapping -> fallback
    let propertyName = `Huoneisto ${propertyId}`;
    
    // First try property_settings (marketing name from admin)
    const { data: settingsData } = await supabase
      .from("property_settings")
      .select("marketing_name")
      .eq("property_id", propertyId)
      .maybeSingle();
    
    if (settingsData?.marketing_name) {
      propertyName = settingsData.marketing_name;
    } else {
      // Fallback to moder_property_mapping
      const { data: mappingData } = await supabase
        .from("moder_property_mapping")
        .select("property_name")
        .eq("beds24_room_id", propertyId)
        .maybeSingle();
      
      if (mappingData?.property_name) {
        propertyName = mappingData.property_name;
      }
    }

    // Upsert cleaning status
    const { data: cleaningData, error: cleaningError } = await supabase
      .from("cleaning_status")
      .upsert({
        property_id: propertyId,
        check_in_date: checkInDate,
        booking_id: bookingId,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        cleaned_at: cleanedAt,
        cleaned_by: "admin",
        updated_at: cleanedAt
      }, {
        onConflict: "property_id,check_in_date"
      })
      .select()
      .single();

    if (cleaningError) {
      console.error("Error updating cleaning status:", cleaningError);
      throw cleaningError;
    }

    console.log("Cleaning status updated:", cleaningData);

    // Send notification email if enabled and guest email exists
    let notificationSent = false;
    if (sendNotification && guestEmail && resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .highlight { background: #e8f5e9; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏠 Huoneistonne on valmis!</h1>
    </div>
    <div class="content">
      <p>Hei${guestName ? ` ${guestName}` : ''},</p>
      
      <div class="highlight">
        <h2 style="margin: 0; color: #2e7d32;">✨ ${propertyName}</h2>
        <p style="margin: 10px 0 0; font-size: 18px;">Sisäänkirjautuminen <strong>klo 16:00</strong> alkaen</p>
      </div>
      
      <p>Huoneistonne on nyt siivottu ja valmis vastaanottamaan teidät. Voitte saapua sisäänkirjautumisajan jälkeen.</p>
      
      <p><strong>Sisäänkirjautumisohjeet:</strong></p>
      <ul>
        <li>Avainkoodi on lähetetty varausvahvistuksessa</li>
        <li>Pysäköinti talon edessä</li>
        <li>Wi-Fi-salasana löytyy huoneistosta</li>
      </ul>
      
      <p>Mukavaa lomaa Levillä!</p>
      
      <p>Ystävällisin terveisin,<br>
      <strong>Leville.net</strong></p>
    </div>
    <div class="footer">
      <p>Leville.net | Majoituspalvelut Levillä<br>
      info@leville.net | +358 44 131 313</p>
    </div>
  </div>
</body>
</html>
        `;

        const emailResult = await resend.emails.send({
          from: "Leville.net <admin@m.leville.net>",
          to: [guestEmail],
          subject: `✨ ${propertyName} on valmis - Tervetuloa!`,
          html: emailHtml,
        });

        console.log("Email sent successfully:", emailResult);
        notificationSent = true;

        // Update notification_sent_at
        await supabase
          .from("cleaning_status")
          .update({ notification_sent_at: new Date().toISOString() })
          .eq("property_id", propertyId)
          .eq("check_in_date", checkInDate);

      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
        // Don't throw - cleaning was still marked, just notification failed
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        cleanedAt,
        propertyName,
        notificationSent,
        guestEmail: guestEmail || null
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in mark-cleaned function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
