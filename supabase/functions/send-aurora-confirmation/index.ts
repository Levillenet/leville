import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Language = "fi" | "en" | "sv" | "de" | "es" | "fr";

const confirmationContent: Record<Language, {
  subject: string;
  greeting: string;
  thankYou: string;
  confirmed: string;
  whatNext: string;
  waitingText: string;
  howItWorks: string;
  step1: string;
  step2: string;
  step3: string;
  threshold: string;
  unsubscribeNote: string;
  unsubscribeText: string;
  footer: string;
}> = {
  fi: {
    subject: "✅ Revontulihälytys aktivoitu!",
    greeting: "Tervetuloa revontulien metsästäjäksi!",
    thankYou: "Kiitos tilauksestasi!",
    confirmed: "Revontulihälytyksesi on nyt aktiivinen.",
    whatNext: "Mitä seuraavaksi?",
    waitingText: "Nyt vain odotellaan! Lähetämme sinulle sähköpostin heti kun revontuliennuste näyttää hyvältä Levillä.",
    howItWorks: "Näin palvelu toimii:",
    step1: "Seuraamme päivittäin NOAA:n aurinkoaktiviteettiennusteita",
    step2: "Kun Kp-indeksi ennustetaan nousevan yli 4, lähetämme sinulle hälytyksen",
    step3: "Saat sähköpostin iltapäivällä, jotta ehdit valmistautua illan revontulimetsästykseen",
    threshold: "Hälytyskynnys: Kp ≥ 4 (hyvä todennäköisyys revontulille Levillä)",
    unsubscribeNote: "Voit peruuttaa tilauksen milloin tahansa sähköpostissa olevan linkin kautta.",
    unsubscribeText: "Peruuta tilaus",
    footer: "Leville.net - Revontulihälytyspalvelu"
  },
  en: {
    subject: "✅ Aurora Alert Activated!",
    greeting: "Welcome, aurora hunter!",
    thankYou: "Thank you for subscribing!",
    confirmed: "Your aurora alert is now active.",
    whatNext: "What's next?",
    waitingText: "Now we wait! We'll send you an email as soon as the aurora forecast looks promising for Levi.",
    howItWorks: "How the service works:",
    step1: "We monitor NOAA's solar activity forecasts daily",
    step2: "When the Kp-index is predicted to rise above 4, we'll send you an alert",
    step3: "You'll receive the email in the afternoon, so you have time to prepare for the evening's aurora hunt",
    threshold: "Alert threshold: Kp ≥ 4 (good probability of Northern Lights in Levi)",
    unsubscribeNote: "You can unsubscribe at any time via the link in the email.",
    unsubscribeText: "Unsubscribe",
    footer: "Leville.net - Aurora Alert Service"
  },
  sv: {
    subject: "✅ Norrskensvarning aktiverad!",
    greeting: "Välkommen, norrskensjägare!",
    thankYou: "Tack för din prenumeration!",
    confirmed: "Din norrskensvarning är nu aktiv.",
    whatNext: "Vad händer nu?",
    waitingText: "Nu väntar vi! Vi skickar dig ett e-postmeddelande så snart norrskensprognosen ser lovande ut för Levi.",
    howItWorks: "Så fungerar tjänsten:",
    step1: "Vi övervakar NOAAs solaktivitetsprognoser dagligen",
    step2: "När Kp-indexet förväntas stiga över 4 skickar vi dig en varning",
    step3: "Du får e-postmeddelandet på eftermiddagen, så du har tid att förbereda dig för kvällens norrskensjakt",
    threshold: "Varningströskel: Kp ≥ 4 (god sannolikhet för norrsken i Levi)",
    unsubscribeNote: "Du kan avsluta prenumerationen när som helst via länken i e-postmeddelandet.",
    unsubscribeText: "Avsluta prenumeration",
    footer: "Leville.net - Norrskensvarning"
  },
  de: {
    subject: "✅ Nordlicht-Benachrichtigung aktiviert!",
    greeting: "Willkommen, Nordlichtjäger!",
    thankYou: "Vielen Dank für Ihre Anmeldung!",
    confirmed: "Ihre Nordlicht-Benachrichtigung ist jetzt aktiv.",
    whatNext: "Was kommt als nächstes?",
    waitingText: "Jetzt heißt es warten! Wir senden Ihnen eine E-Mail, sobald die Nordlichtvorhersage für Levi vielversprechend aussieht.",
    howItWorks: "So funktioniert der Service:",
    step1: "Wir überwachen täglich die Sonnenaktivitätsprognosen der NOAA",
    step2: "Wenn der Kp-Index voraussichtlich über 4 steigt, senden wir Ihnen eine Benachrichtigung",
    step3: "Sie erhalten die E-Mail am Nachmittag, damit Sie Zeit haben, sich auf die abendliche Nordlichtjagd vorzubereiten",
    threshold: "Benachrichtigungsschwelle: Kp ≥ 4 (gute Wahrscheinlichkeit für Nordlichter in Levi)",
    unsubscribeNote: "Sie können sich jederzeit über den Link in der E-Mail abmelden.",
    unsubscribeText: "Abmelden",
    footer: "Leville.net - Nordlicht-Alarmdienst"
  },
  es: {
    subject: "✅ ¡Alerta de Aurora Activada!",
    greeting: "¡Bienvenido, cazador de auroras!",
    thankYou: "¡Gracias por suscribirte!",
    confirmed: "Tu alerta de auroras está ahora activa.",
    whatNext: "¿Qué sigue?",
    waitingText: "¡Ahora solo queda esperar! Te enviaremos un email tan pronto como el pronóstico de auroras sea prometedor para Levi.",
    howItWorks: "Cómo funciona el servicio:",
    step1: "Monitoreamos diariamente los pronósticos de actividad solar de la NOAA",
    step2: "Cuando se predice que el índice Kp superará 4, te enviaremos una alerta",
    step3: "Recibirás el email por la tarde, para que tengas tiempo de prepararte para la caza de auroras nocturna",
    threshold: "Umbral de alerta: Kp ≥ 4 (buena probabilidad de auroras boreales en Levi)",
    unsubscribeNote: "Puedes cancelar la suscripción en cualquier momento a través del enlace en el email.",
    unsubscribeText: "Cancelar suscripción",
    footer: "Leville.net - Servicio de Alerta de Auroras"
  },
  fr: {
    subject: "✅ Alerte Aurora Activée!",
    greeting: "Bienvenue, chasseur d'aurores!",
    thankYou: "Merci de vous être abonné!",
    confirmed: "Votre alerte aurore est maintenant active.",
    whatNext: "Et maintenant?",
    waitingText: "Maintenant, on attend! Nous vous enverrons un email dès que les prévisions d'aurores seront prometteuses pour Levi.",
    howItWorks: "Comment fonctionne le service:",
    step1: "Nous surveillons quotidiennement les prévisions d'activité solaire de la NOAA",
    step2: "Lorsque l'indice Kp est prévu de dépasser 4, nous vous enverrons une alerte",
    step3: "Vous recevrez l'email dans l'après-midi, pour avoir le temps de vous préparer pour la chasse aux aurores du soir",
    threshold: "Seuil d'alerte: Kp ≥ 4 (bonne probabilité d'aurores boréales à Levi)",
    unsubscribeNote: "Vous pouvez vous désabonner à tout moment via le lien dans l'email.",
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

function createConfirmationEmailHtml(lang: Language, unsubscribeToken: string): string {
  const content = confirmationContent[lang] || confirmationContent.fi;
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
    
    <!-- Header with success gradient -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 16px;">🌌</div>
      <h1 style="margin: 0; font-size: 24px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        ${content.thankYou}
      </h1>
      <p style="margin: 10px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.9);">
        ${content.confirmed}
      </p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; margin: 0 0 20px 0; color: #10b981; font-weight: 600;">
        ${content.greeting}
      </p>
      
      <!-- What's next section -->
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 12px; padding: 24px; margin: 0 0 30px 0;">
        <h3 style="margin: 0 0 12px 0; font-size: 18px; color: white;">
          ⏳ ${content.whatNext}
        </h3>
        <p style="margin: 0; font-size: 16px; color: rgba(255,255,255,0.9); line-height: 1.6;">
          ${content.waitingText}
        </p>
      </div>
      
      <!-- How it works -->
      <div style="background: #1e293b; border-radius: 12px; padding: 24px; margin: 0 0 30px 0; border: 1px solid #334155;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #10b981;">
          ⚙️ ${content.howItWorks}
        </h3>
        <ol style="margin: 0; padding: 0 0 0 20px; color: #94a3b8; line-height: 2;">
          <li>${content.step1}</li>
          <li>${content.step2}</li>
          <li>${content.step3}</li>
        </ol>
      </div>
      
      <!-- Threshold info -->
      <div style="background: #10b981; background: linear-gradient(90deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%); border-left: 4px solid #10b981; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 0 0 30px 0;">
        <p style="margin: 0; font-size: 14px; color: #10b981; font-weight: 500;">
          📊 ${content.threshold}
        </p>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 0 0 30px 0;">
        <a href="${pageUrl}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          🌌 ${lang === 'fi' ? 'Katso reaaliaikainen ennuste' : lang === 'en' ? 'View real-time forecast' : lang === 'sv' ? 'Se realtidsprognos' : lang === 'de' ? 'Echtzeit-Vorhersage anzeigen' : lang === 'es' ? 'Ver pronóstico en tiempo real' : 'Voir les prévisions en temps réel'} →
        </a>
      </div>
      
      <p style="font-size: 13px; color: #64748b; text-align: center; margin: 0;">
        ${content.unsubscribeNote}
      </p>
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

interface ConfirmationRequest {
  email: string;
  language: Language;
  unsubscribe_token: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Aurora confirmation email request received");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, language, unsubscribe_token }: ConfirmationRequest = await req.json();
    
    console.log(`Sending confirmation to ${email} in ${language}`);
    
    if (!email || !unsubscribe_token) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const lang = (language as Language) || "fi";
    const content = confirmationContent[lang] || confirmationContent.fi;
    
    const emailHtml = createConfirmationEmailHtml(lang, unsubscribe_token);
    
    const { error: emailError } = await resend.emails.send({
      from: "Leville Revontulet <onboarding@resend.dev>",
      to: [email],
      subject: content.subject,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      return new Response(
        JSON.stringify({ error: emailError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Confirmation email sent successfully to ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation email sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in confirmation email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
