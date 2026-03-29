import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TimedNotice {
  id: string;
  title: string;
  content_fi: string | null;
  content_en: string | null;
  content_de: string | null;
  content_sv: string | null;
  content_fr: string | null;
  content_es: string | null;
  content_nl: string | null;
  target_pages: string[];
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  style: string;
  created_at: string;
}

export const useTimedNotices = (pageId: string, lang: string = "fi") => {
  const { data: notices = [] } = useQuery({
    queryKey: ["timed-notices", pageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timed_notices" as any)
        .select("*")
        .eq("is_active", true)
        .lte("starts_at", new Date().toISOString())
        .gte("expires_at", new Date().toISOString())
        .contains("target_pages", [pageId]);

      if (error) {
        console.error("Error fetching timed notices:", error);
        return [];
      }
      return (data || []) as unknown as TimedNotice[];
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
    refetchOnWindowFocus: false,
  });

  const getContent = (notice: TimedNotice): string | null => {
    const key = `content_${lang}` as keyof TimedNotice;
    return (notice[key] as string | null) || notice.content_en || notice.content_fi;
  };

  return { notices, getContent };
};
