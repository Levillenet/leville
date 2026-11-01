import { getSupabase } from "@/lib/getSupabase";
import { hasConsent } from "./cookieConsent";

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
  if (!hasConsent("analytics")) return;
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
    void getSupabase().then((supabase) =>
      hasConsent("analytics") ? supabase.from("promo_banner_clicks" as any).insert({
        ...payload,
        session_id,
        referrer,
      }) : undefined
    ).catch(() => {});
  } catch {
    // ignore
  }
}
