import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Language, routeConfig } from "@/translations";

export interface PromoBanner {
  id: string;
  title: string;
  heading_fi: string | null;
  heading_en: string | null;
  heading_de: string | null;
  heading_sv: string | null;
  heading_fr: string | null;
  heading_es: string | null;
  heading_nl: string | null;
  subtext_fi: string | null;
  subtext_en: string | null;
  subtext_de: string | null;
  subtext_sv: string | null;
  subtext_fr: string | null;
  subtext_es: string | null;
  subtext_nl: string | null;
  button_text_fi: string | null;
  button_text_en: string | null;
  button_text_de: string | null;
  button_text_sv: string | null;
  button_text_fr: string | null;
  button_text_es: string | null;
  button_text_nl: string | null;
  target_url: string;
  theme: string;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  route_key: string | null;
  redirect_localized: boolean;
}

export function usePromoBanner(lang: Language = "fi") {
  const [banner, setBanner] = useState<PromoBanner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("promo_banners" as any)
        .select("*")
        .eq("is_active", true)
        .lte("starts_at", new Date().toISOString())
        .gte("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setBanner(data[0] as unknown as PromoBanner);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const getHeading = (b: PromoBanner): string => {
    const key = `heading_${lang}` as keyof PromoBanner;
    return (b[key] as string) || (b.heading_fi as string) || "";
  };

  const getSubtext = (b: PromoBanner): string => {
    const key = `subtext_${lang}` as keyof PromoBanner;
    return (b[key] as string) || (b.subtext_fi as string) || "";
  };

  const getButtonText = (b: PromoBanner): string => {
    const key = `button_text_${lang}` as keyof PromoBanner;
    return (b[key] as string) || (b.button_text_fi as string) || "Lue lisää";
  };

  const getTargetUrl = (b: PromoBanner): string => {
    if (b.redirect_localized && b.route_key) {
      const routes = (routeConfig as Record<string, Record<string, string>>)[b.route_key];
      if (routes) {
        return routes[lang] || routes.fi || b.target_url;
      }
    }
    return b.target_url;
  };

  return { banner, loading, getHeading, getSubtext, getButtonText, getTargetUrl };
}
