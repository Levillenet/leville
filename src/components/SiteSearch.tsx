import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { searchPages, type SearchPage } from "@/data/searchIndex";
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

  const customFilter = useCallback((value: string, search: string) => {
    const s = search.toLowerCase();
    const [title, desc] = value.toLowerCase().split('|');
    if (title.startsWith(s)) return 1;
    if (title.includes(s)) return 0.8;
    if (desc?.includes(s)) return 0.5;
    return 0;
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command filter={customFilter} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <CommandInput placeholder={labels.placeholder} />
        <CommandList>
          <CommandEmpty>{labels.noResults}</CommandEmpty>
          {langPages.map((page) => (
            <CommandItem
              key={page.path}
              value={`${page.title}|${page.description}`}
              onSelect={() => handleSelect(page.path)}
              className="cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-medium">{page.title}</span>
                <span className="text-xs text-muted-foreground">{page.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SiteSearch;
