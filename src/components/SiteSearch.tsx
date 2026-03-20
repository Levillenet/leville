import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { searchPages, categoryLabels, type SearchPage } from "@/data/searchIndex";
import { detectLanguageFromPath, type Language } from "@/translations";

const searchLabels: Record<Language, { placeholder: string; noResults: string }> = {
  fi: { placeholder: "Hae sivuilta…", noResults: "Ei tuloksia." },
  en: { placeholder: "Search pages…", noResults: "No results found." },
  sv: { placeholder: "Sök sidor…", noResults: "Inga resultat." },
  de: { placeholder: "Seiten suchen…", noResults: "Keine Ergebnisse." },
  es: { placeholder: "Buscar páginas…", noResults: "Sin resultados." },
  fr: { placeholder: "Rechercher…", noResults: "Aucun résultat." },
  nl: { placeholder: "Zoeken…", noResults: "Geen resultaten." },
};

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SiteSearch = ({ open, onOpenChange }: SiteSearchProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = detectLanguageFromPath(location.pathname);
  const labels = searchLabels[currentLang] || searchLabels.fi;
  const catLabels = categoryLabels[currentLang] || categoryLabels.fi;

  // Filter pages for current language
  const langPages = searchPages.filter((p) => p.lang === currentLang);

  // Group by category
  const grouped = langPages.reduce<Record<string, SearchPage[]>>((acc, page) => {
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category].push(page);
    return acc;
  }, {});

  const handleSelect = useCallback(
    (path: string) => {
      onOpenChange(false);
      navigate(path);
    },
    [navigate, onOpenChange]
  );

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={labels.placeholder} />
      <CommandList>
        <CommandEmpty>{labels.noResults}</CommandEmpty>
        {Object.entries(grouped).map(([category, pages]) => (
          <CommandGroup key={category} heading={catLabels[category] || category}>
            {pages.map((page) => (
              <CommandItem
                key={page.path}
                value={`${page.title} ${page.description}`}
                onSelect={() => handleSelect(page.path)}
                className="cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{page.title}</span>
                  <span className="text-xs text-muted-foreground">{page.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default SiteSearch;
