import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
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
  const lastQueryRef = useRef<string>("");

  // Filter pages for current language
  const langPages = searchPages.filter((p) => p.lang === currentLang);

  const isDevEnvironment = (): boolean => {
    const host = window.location.hostname;
    return host.includes("lovable.app") || host.includes("lovableproject.com") || host === "localhost" || host === "127.0.0.1";
  };

  const logSearch = useCallback((query: string, selectedPath: string) => {
    if (isDevEnvironment() || !query.trim()) return;
    try {
      const sessionId = sessionStorage.getItem("_lv_sid") || "unknown";
      supabase.from("page_views").insert({
        path: `/event/site-search`,
        referrer: query.trim().substring(0, 200),
        device_type: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
        language: navigator.language?.split("-")[0] || null,
        session_id: sessionId,
        utm_source: selectedPath,
      }).then(() => {});
    } catch {}
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      logSearch(lastQueryRef.current, path);
      onOpenChange(false);
      navigate(path);
    },
    [navigate, onOpenChange, logSearch]
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
    <CommandDialog open={open} onOpenChange={onOpenChange} commandProps={{ filter: customFilter }}>
      <CommandInput placeholder={labels.placeholder} onValueChange={(v) => { lastQueryRef.current = v; }} />
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
    </CommandDialog>
  );
};

export default SiteSearch;
