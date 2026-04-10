import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import jsPDF from "jspdf";
import type { Language } from "@/translations";

const languageLabels: Record<string, string> = {
  fi: "Suomi",
  en: "English",
  sv: "Svenska",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  nl: "Nederlands",
};

const headingByLang: Record<string, string> = {
  fi: "Varausehdot",
  en: "Booking Terms",
  sv: "Bokningsvillkor",
  de: "Buchungsbedingungen",
  es: "Términos de Reserva",
  fr: "Conditions de Réservation",
  nl: "Boekingsvoorwaarden",
};

interface BookingTermsPdfDownloadProps {
  currentLang: Language;
}

export const BookingTermsPdfDownload = ({ currentLang }: BookingTermsPdfDownloadProps) => {
  const [selectedLang, setSelectedLang] = useState<string>(currentLang);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase
        .from("booking_terms")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      const terms = (data || []).map((term) => {
        const titleKey = `title_${selectedLang}` as keyof typeof term;
        const contentKey = `content_${selectedLang}` as keyof typeof term;
        return {
          title: (term[titleKey] as string) || term.title_fi,
          content: (term[contentKey] as string) || term.content_fi,
        };
      });

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;
      let pageNum = 1;

      const checkPage = (needed: number) => {
        if (y + needed > pageHeight - 20) {
          // Footer
          doc.setFontSize(7);
          doc.setTextColor(150);
          doc.text("leville.net", pageWidth / 2, pageHeight - 8, { align: "center" });
          doc.addPage();
          pageNum++;
          y = margin;
        }
      };

      // Header
      doc.setFontSize(18);
      doc.setTextColor(30, 64, 175);
      doc.text("LEVILLE.NET", margin, y + 6);
      y += 12;

      doc.setFontSize(14);
      doc.setTextColor(30);
      doc.text(headingByLang[selectedLang] || "Booking Terms", margin, y + 6);
      y += 10;

      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(`${languageLabels[selectedLang]} — ${new Date().toLocaleDateString(selectedLang === "fi" ? "fi-FI" : selectedLang)}`, margin, y);
      y += 8;

      // Separator
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // Sections
      for (const term of terms) {
        checkPage(20);

        // Section title
        doc.setFontSize(11);
        doc.setTextColor(30, 64, 175);
        const titleLines = doc.splitTextToSize(term.title, contentWidth);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 5 + 3;

        // Section content
        doc.setFontSize(9);
        doc.setTextColor(50);
        const contentLines = doc.splitTextToSize(term.content, contentWidth);

        for (const line of contentLines) {
          checkPage(4.5);
          doc.text(line, margin, y);
          y += 4;
        }

        y += 6;
      }

      // Final footer
      doc.setFontSize(7);
      doc.setTextColor(150);
      doc.text("leville.net", pageWidth / 2, pageHeight - 8, { align: "center" });

      // Page numbers
      const totalPages = pageNum;
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(150);
        doc.text(`${p} / ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
      }

      const langSuffix = selectedLang === "fi" ? "" : `_${selectedLang}`;
      doc.save(`varausehdot${langSuffix}.pdf`);
      toast.success(selectedLang === "fi" ? "PDF ladattu" : "PDF downloaded");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF:n luonti epäonnistui");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select value={selectedLang} onValueChange={setSelectedLang}>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languageLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={generatePdf} disabled={isGenerating} variant="outline" size="sm">
        {isGenerating ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        {currentLang === "fi" ? "Lataa PDF" : "Download PDF"}
      </Button>
    </div>
  );
};
