import { useBookingTerms } from "@/hooks/useBookingTerms";
import type { Language } from "@/translations";
import { Loader2 } from "lucide-react";

interface BookingTermsContentProps {
  lang: Language;
}

export const BookingTermsContent = ({ lang }: BookingTermsContentProps) => {
  const { data: terms, isLoading, error } = useBookingTerms(lang);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Sisällön lataaminen epäonnistui
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {terms?.map((term) => (
        <section key={term.id} className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-primary mb-4">{term.title}</h2>
          <div className="text-foreground/80 whitespace-pre-line leading-relaxed">
            {term.content}
          </div>
        </section>
      ))}
    </div>
  );
};
