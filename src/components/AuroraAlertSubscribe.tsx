import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

type Language = "fi" | "en" | "sv" | "de" | "es" | "fr";

interface AuroraAlertSubscribeProps {
  lang?: Language;
}

const emailSchema = z.string().trim().email().max(255);

const content: Record<Language, {
  title: string;
  description: string;
  placeholder: string;
  subscribe: string;
  subscribing: string;
  success: string;
  successDescription: string;
  errorInvalidEmail: string;
  errorAlreadySubscribed: string;
  errorGeneric: string;
  privacyNote: string;
}> = {
  fi: {
    title: "Tilaa revontulihälytykset",
    description: "Saat sähköpostiviestin kun revontulia on odotettavissa Levillä (Kp ≥ 4).",
    placeholder: "Sähköpostiosoitteesi",
    subscribe: "Tilaa hälytykset",
    subscribing: "Tilataan...",
    success: "Tilaus onnistui!",
    successDescription: "Saat sähköpostin kun revontulia on luvassa.",
    errorInvalidEmail: "Tarkista sähköpostiosoite",
    errorAlreadySubscribed: "Olet jo tilannut hälytykset",
    errorGeneric: "Tilaus epäonnistui, yritä uudelleen",
    privacyNote: "Voit peruuttaa tilauksen milloin tahansa sähköpostissa olevan linkin kautta."
  },
  en: {
    title: "Subscribe to Aurora Alerts",
    description: "Get an email notification when Northern Lights are expected in Levi (Kp ≥ 4).",
    placeholder: "Your email address",
    subscribe: "Subscribe to alerts",
    subscribing: "Subscribing...",
    success: "Subscription successful!",
    successDescription: "You'll receive an email when Northern Lights are expected.",
    errorInvalidEmail: "Please enter a valid email",
    errorAlreadySubscribed: "You're already subscribed",
    errorGeneric: "Subscription failed, please try again",
    privacyNote: "You can unsubscribe at any time via the link in the email."
  },
  sv: {
    title: "Prenumerera på norrskensvarningar",
    description: "Få ett e-postmeddelande när norrsken förväntas i Levi (Kp ≥ 4).",
    placeholder: "Din e-postadress",
    subscribe: "Prenumerera på varningar",
    subscribing: "Prenumererar...",
    success: "Prenumerationen lyckades!",
    successDescription: "Du får ett e-postmeddelande när norrsken förväntas.",
    errorInvalidEmail: "Ange en giltig e-postadress",
    errorAlreadySubscribed: "Du prenumererar redan",
    errorGeneric: "Prenumerationen misslyckades, försök igen",
    privacyNote: "Du kan avsluta prenumerationen när som helst via länken i e-postmeddelandet."
  },
  de: {
    title: "Nordlicht-Benachrichtigungen abonnieren",
    description: "Erhalten Sie eine E-Mail-Benachrichtigung, wenn Nordlichter in Levi erwartet werden (Kp ≥ 4).",
    placeholder: "Ihre E-Mail-Adresse",
    subscribe: "Benachrichtigungen abonnieren",
    subscribing: "Wird abonniert...",
    success: "Abonnement erfolgreich!",
    successDescription: "Sie erhalten eine E-Mail, wenn Nordlichter erwartet werden.",
    errorInvalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    errorAlreadySubscribed: "Sie haben bereits abonniert",
    errorGeneric: "Abonnement fehlgeschlagen, bitte versuchen Sie es erneut",
    privacyNote: "Sie können das Abonnement jederzeit über den Link in der E-Mail kündigen."
  },
  es: {
    title: "Suscríbete a las alertas de auroras",
    description: "Recibe un email cuando se esperen auroras boreales en Levi (Kp ≥ 4).",
    placeholder: "Tu dirección de email",
    subscribe: "Suscribirse a alertas",
    subscribing: "Suscribiendo...",
    success: "¡Suscripción exitosa!",
    successDescription: "Recibirás un email cuando se esperen auroras boreales.",
    errorInvalidEmail: "Por favor, introduce un email válido",
    errorAlreadySubscribed: "Ya estás suscrito",
    errorGeneric: "La suscripción falló, inténtalo de nuevo",
    privacyNote: "Puedes cancelar la suscripción en cualquier momento a través del enlace en el email."
  },
  fr: {
    title: "Abonnez-vous aux alertes aurores",
    description: "Recevez un email quand des aurores boréales sont attendues à Levi (Kp ≥ 4).",
    placeholder: "Votre adresse email",
    subscribe: "S'abonner aux alertes",
    subscribing: "Abonnement...",
    success: "Abonnement réussi!",
    successDescription: "Vous recevrez un email quand des aurores boréales sont attendues.",
    errorInvalidEmail: "Veuillez entrer un email valide",
    errorAlreadySubscribed: "Vous êtes déjà abonné",
    errorGeneric: "L'abonnement a échoué, veuillez réessayer",
    privacyNote: "Vous pouvez vous désabonner à tout moment via le lien dans l'email."
  }
};

export function AuroraAlertSubscribe({ lang = "fi" }: AuroraAlertSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const t = content[lang] || content.fi;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(t.errorInvalidEmail);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("aurora_alerts")
        .insert({
          email: result.data,
          language: lang,
          is_active: true
        })
        .select("unsubscribe_token")
        .single();

      if (error) {
        if (error.code === "23505") { // Unique violation
          toast.error(t.errorAlreadySubscribed);
        } else {
          console.error("Subscription error:", error);
          toast.error(t.errorGeneric);
        }
        return;
      }

      // Send confirmation email
      if (data?.unsubscribe_token) {
        supabase.functions.invoke("send-aurora-confirmation", {
          body: {
            email: result.data,
            language: lang,
            unsubscribe_token: data.unsubscribe_token
          }
        }).catch(err => console.error("Confirmation email error:", err));
      }

      setIsSubscribed(true);
      toast.success(t.success);
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error(t.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-emerald-500/10 border-emerald-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-400">{t.success}</h3>
              <p className="text-sm text-muted-foreground">{t.successDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading || !email}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.subscribing}
                </>
              ) : (
                t.subscribe
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{t.privacyNote}</p>
        </form>
      </CardContent>
    </Card>
  );
}
