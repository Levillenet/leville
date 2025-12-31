import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Language = "fi" | "en" | "sv" | "de" | "es" | "fr";

const emailContent: Record<Language, {
  subject: string;
  greeting: string;
  alertText: string;
  kpText: string;
  viewingTips: string;
  tip1: string;
  tip2: string;
  tip3: string;
  linkText: string;
  unsubscribeText: string;
  footer: string;
}> = {
  fi: {
    subject: "🌌 Revontulimahdollisuus tänä iltana Levillä!",
    greeting: "Hei revontulien ystävä!",
    alertText: "Ennusteemme mukaan tänään illalla on hyvä mahdollisuus nähdä revontulia Levillä.",
    kpText: "Ennustettu Kp-indeksi",
    viewingTips: "Katseluvinkit:",
    tip1: "Parasta katseluaikaa on klo 21-02 välillä",
    tip2: "Hakeudu pois katuvalosta, tunturin laelle tai järven rannalle",
    tip3: "Muista pukeutua lämpimästi!",
    linkText: "Katso reaaliaikainen ennuste",
    unsubscribeText: "Peruuta tilaus",
    footer: "Leville.net - Revontulihälytyspalvelu"
  },
  en: {
    subject: "🌌 Northern Lights possible tonight in Levi!",
    greeting: "Hello aurora enthusiast!",
    alertText: "According to our forecast, there's a good chance to see the Northern Lights in Levi tonight.",
    kpText: "Predicted Kp-index",
    viewingTips: "Viewing tips:",
    tip1: "Best viewing time is between 9 PM and 2 AM",
    tip2: "Move away from street lights, to a hilltop or lakeside",
    tip3: "Remember to dress warmly!",
    linkText: "View real-time forecast",
    unsubscribeText: "Unsubscribe",
    footer: "Leville.net - Aurora Alert Service"
  },
  sv: {
    subject: "🌌 Norrskensmöjlighet ikväll i Levi!",
    greeting: "Hej norrskensentusiast!",
    alertText: "Enligt vår prognos finns det goda chanser att se norrsken i Levi ikväll.",
    kpText: "Förutspått Kp-index",
    viewingTips: "Visningstips:",
    tip1: "Bästa visningstid är mellan 21:00 och 02:00",
    tip2: "Gå bort från gatubelysning, till en kulle eller sjöstrand",
    tip3: "Kom ihåg att klä dig varmt!",
    linkText: "Se realtidsprognos",
    unsubscribeText: "Avsluta prenumeration",
    footer: "Leville.net - Norrskensvarning"
  },
  de: {
    subject: "🌌 Nordlichter heute Abend in Levi möglich!",
    greeting: "Hallo Nordlicht-Fan!",
    alertText: "Laut unserer Vorhersage besteht heute Abend eine gute Chance, Nordlichter in Levi zu sehen.",
    kpText: "Vorhergesagter Kp-Index",
    viewingTips: "Beobachtungstipps:",
    tip1: "Beste Beobachtungszeit ist zwischen 21:00 und 02:00 Uhr",
    tip2: "Gehen Sie weg von Straßenlaternen, auf einen Hügel oder ans Seeufer",
    tip3: "Denken Sie daran, sich warm anzuziehen!",
    linkText: "Echtzeit-Vorhersage anzeigen",
    unsubscribeText: "Abmelden",
    footer: "Leville.net - Nordlicht-Alarmdienst"
  },
  es: {
    subject: "🌌 ¡Posibles auroras boreales esta noche en Levi!",
    greeting: "¡Hola entusiasta de las auroras!",
    alertText: "Según nuestro pronóstico, hay buenas posibilidades de ver auroras boreales en Levi esta noche.",
    kpText: "Índice Kp previsto",
    viewingTips: "Consejos de observación:",
    tip1: "El mejor momento de observación es entre las 21:00 y las 02:00",
    tip2: "Aléjese de las luces de la calle, vaya a una colina o a la orilla del lago",
    tip3: "¡Recuerde abrigarse bien!",
    linkText: "Ver pronóstico en tiempo real",
    unsubscribeText: "Cancelar suscripción",
    footer: "Leville.net - Servicio de Alerta de Auroras"
  },
  fr: {
    subject: "🌌 Aurores boréales possibles ce soir à Levi!",
    greeting: "Bonjour amateur d'aurores!",
    alertText: "Selon nos prévisions, il y a de bonnes chances de voir des aurores boréales à Levi ce soir.",
    kpText: "Indice Kp prévu",
    viewingTips: "Conseils d'observation:",
    tip1: "Le meilleur moment d'observation est entre 21h et 2h",
    tip2: "Éloignez-vous des réverbères, montez sur une colline ou allez au bord du lac",
    tip3: "N'oubliez pas de vous habiller chaudement!",
    linkText: "Voir les prévisions en temps réel",
    unsubscribeText: "Se désabonner",
    footer: "Leville.net - Service d'Alerte Aurores"
  }
};

function getLanguageUrl(lang: Language): string {
  const baseUrl = "https://leville.net";
  switch (lang) {
    case "fi": return `${baseUrl}/revontulet`;
    case "en": return `${baseUrl}/en/northern-lights`;
    case "sv": return `${baseUrl}/sv/norrsken`;
    case "de": return `${baseUrl}/de/nordlichter`;
    case "es": return `${baseUrl}/es/auroras-boreales`;
    case "fr": return `${baseUrl}/fr/aurores-boreales`;
    default: return `${baseUrl}/revontulet`;
  }
}

function createEmailHtml(lang: Language, kpIndex: number, unsubscribeToken: string): string {
  const content = emailContent[lang] || emailContent.fi;
  const pageUrl = getLanguageUrl(lang);
  const unsubscribeUrl = `https://leville.net/unsubscribe?token=${unsubscribeToken}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #e2e8f0; padding: 40px 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
    
    <!-- Header with aurora gradient -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        ✨ ${content.subject.replace("🌌 ", "")}
      </h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; margin: 0 0 20px 0; color: #94a3b8;">
        ${content.greeting}
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; color: #e2e8f0;">
        ${content.alertText}
      </p>
      
      <!-- Kp Index Card -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 20px; margin: 0 0 30px 0; text-align: center;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px;">
          ${content.kpText}
        </p>
        <p style="margin: 0; font-size: 48px; font-weight: bold; color: white;">
          Kp ${kpIndex}
        </p>
      </div>
      
      <!-- Tips -->
      <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin: 0 0 30px 0; border: 1px solid #334155;">
        <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #10b981;">
          💡 ${content.viewingTips}
        </h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #94a3b8; line-height: 1.8;">
          <li>${content.tip1}</li>
          <li>${content.tip2}</li>
          <li>${content.tip3}</li>
        </ul>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 0 0 30px 0;">
        <a href="${pageUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          ${content.linkText} →
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background: #0f172a; padding: 20px 30px; text-align: center; border-top: 1px solid #334155;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b;">
        ${content.footer}
      </p>
      <a href="${unsubscribeUrl}" style="color: #64748b; font-size: 12px; text-decoration: underline;">
        ${content.unsubscribeText}
      </a>
    </div>
    
  </div>
</body>
</html>
  `;
}

async function fetchAuroraForecast(): Promise<{ time: string; kp: number }[]> {
  try {
    const response = await fetch(
      "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json"
    );
    const data = await response.json();
    
    // Skip header row and parse data
    const forecasts: { time: string; kp: number }[] = [];
    for (let i = 1; i < data.length; i++) {
      const [timeStr, kpStr] = data[i];
      forecasts.push({
        time: timeStr,
        kp: parseFloat(kpStr)
      });
    }
    return forecasts;
  } catch (error) {
    console.error("Error fetching aurora forecast:", error);
    return [];
  }
}

function getEveningKpPeak(forecasts: { time: string; kp: number }[]): number {
  const now = new Date();
  const today18 = new Date(now);
  today18.setHours(18, 0, 0, 0);
  
  const tomorrow06 = new Date(now);
  tomorrow06.setDate(tomorrow06.getDate() + 1);
  tomorrow06.setHours(6, 0, 0, 0);
  
  let maxKp = 0;
  
  for (const forecast of forecasts) {
    const forecastTime = new Date(forecast.time);
    if (forecastTime >= today18 && forecastTime <= tomorrow06) {
      if (forecast.kp > maxKp) {
        maxKp = forecast.kp;
      }
    }
  }
  
  return maxKp;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Aurora alert check started");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch aurora forecast
    const forecasts = await fetchAuroraForecast();
    console.log(`Fetched ${forecasts.length} forecast entries`);
    
    if (forecasts.length === 0) {
      return new Response(
        JSON.stringify({ message: "Could not fetch aurora forecast" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get peak Kp for tonight (18:00 - 06:00)
    const peakKp = getEveningKpPeak(forecasts);
    console.log(`Peak Kp for tonight: ${peakKp}`);

    // Check if Kp >= 4 threshold is met
    const KP_THRESHOLD = 4;
    if (peakKp < KP_THRESHOLD) {
      console.log(`Kp ${peakKp} is below threshold ${KP_THRESHOLD}, no alerts sent`);
      return new Response(
        JSON.stringify({ 
          message: `Kp index ${peakKp} is below threshold ${KP_THRESHOLD}`,
          peakKp,
          alertsSent: 0 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get active subscribers who haven't received alert in last 12 hours
    const twelveHoursAgo = new Date();
    twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

    const { data: subscribers, error: fetchError } = await supabase
      .from("aurora_alerts")
      .select("*")
      .eq("is_active", true)
      .or(`last_alert_sent.is.null,last_alert_sent.lt.${twelveHoursAgo.toISOString()}`);

    if (fetchError) {
      console.error("Error fetching subscribers:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch subscribers" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${subscribers?.length || 0} eligible subscribers`);

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: "No eligible subscribers to notify",
          peakKp,
          alertsSent: 0 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send emails to all eligible subscribers
    let sentCount = 0;
    const errors: string[] = [];

    for (const subscriber of subscribers) {
      const lang = (subscriber.language as Language) || "fi";
      const content = emailContent[lang] || emailContent.fi;
      
      try {
        const emailHtml = createEmailHtml(lang, peakKp, subscriber.unsubscribe_token);
        
        const { error: emailError } = await resend.emails.send({
          from: "Leville Revontulet <revontulet@m.leville.net>",
          to: [subscriber.email],
          subject: content.subject,
          html: emailHtml,
        });

        if (emailError) {
          console.error(`Failed to send to ${subscriber.email}:`, emailError);
          errors.push(`${subscriber.email}: ${emailError.message}`);
        } else {
          console.log(`Email sent to ${subscriber.email}`);
          
          // Update last_alert_sent
          await supabase
            .from("aurora_alerts")
            .update({ last_alert_sent: new Date().toISOString() })
            .eq("id", subscriber.id);
          
          sentCount++;
        }
      } catch (err) {
        console.error(`Error processing ${subscriber.email}:`, err);
        errors.push(`${subscriber.email}: ${err}`);
      }
    }

    console.log(`Aurora alert check complete. Sent ${sentCount} emails.`);

    return new Response(
      JSON.stringify({ 
        message: "Aurora alert check complete",
        peakKp,
        alertsSent: sentCount,
        errors: errors.length > 0 ? errors : undefined
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in aurora alert function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
