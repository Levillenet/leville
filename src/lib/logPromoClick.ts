import { supabase } from "@/integrations/supabase/client";

export interface PromoClickPayload {
  banner_id: string | null;
  banner_title: string | null;
  placement: string | null;
  language: string | null;
  target_url: string | null;
}

/**
 * Fire-and-forget logging of a promo banner click.
 * Never blocks navigation; failures are silent.
 */
export function logPromoClick(payload: PromoClickPayload) {
  try {
    const session_id =
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem("session_id") || crypto.randomUUID()
        : null;
    if (session_id && typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("session_id", session_id);
    }
    const referrer = typeof document !== "undefined" ? document.referrer || null : null;

    // Fire-and-forget — don't await
    void supabase.from("promo_banner_clicks" as any).insert({
      ...payload,
      session_id,
      referrer,
    });
  } catch {
    // ignore
  }
}
