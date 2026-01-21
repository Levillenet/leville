import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Language } from "@/translations";

interface BookingTerm {
  id: string;
  section_key: string;
  sort_order: number;
  title: string;
  content: string;
}

export const useBookingTerms = (lang: Language = "fi") => {
  return useQuery({
    queryKey: ["booking-terms", lang],
    queryFn: async (): Promise<BookingTerm[]> => {
      const { data, error } = await supabase
        .from("booking_terms")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      // Map to correct language
      return (data || []).map((term) => {
        const titleKey = `title_${lang}` as keyof typeof term;
        const contentKey = `content_${lang}` as keyof typeof term;
        
        return {
          id: term.id,
          section_key: term.section_key,
          sort_order: term.sort_order,
          // Fall back to Finnish if translation not available
          title: (term[titleKey] as string) || term.title_fi,
          content: (term[contentKey] as string) || term.content_fi,
        };
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
