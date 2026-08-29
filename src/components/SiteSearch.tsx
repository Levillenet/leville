import { useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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

const searchLabels: Record<Language, { placeholder: string; noResults: string; otherLang: string }> = {
  fi: { placeholder: "Hae sivuilta…", noResults: "Ei tuloksia.", otherLang: "Myös englanniksi" },
  en: { placeholder: "Search pages…", noResults: "No results found.", otherLang: "Also in Finnish" },
  sv: { placeholder: "Sök sidor…", noResults: "Inga resultat.", otherLang: "Även på engelska" },
  de: { placeholder: "Seiten suchen…", noResults: "Keine Ergebnisse.", otherLang: "Auch auf Englisch" },
  es: { placeholder: "Buscar páginas…", noResults: "Sin resultados.", otherLang: "También en inglés" },
  fr: { placeholder: "Rechercher…", noResults: "Aucun résultat.", otherLang: "Aussi en anglais" },
  nl: { placeholder: "Zoeken…", noResults: "Geen resultaten.", otherLang: "Ook in het Engels" },
};

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Pienet kirjaimet + skandien normalisointi (ä→a, ö→o, é→e). */
const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Sallii yhden merkin eron (kirjoitusvirhe) pidemmissä sanoissa. */
const isNearMatch = (word: string, token: string) => {
  if (token.length < 5) return false;
  if (Math.abs(word.length - token.length) > 1) return false;
  let i = 0;
  let j = 0;
  let diffs = 0;
  while (i < word.length && j < token.length) {
    if (word[i] === token[j]) {
      i++;
      j++;
      continue;
    }
    diffs++;
    if (diffs > 1) return false;
    if (word.length > token.length) i++;
    else if (token.length > word.length) j++;
    else {
      i++;
      j++;
    }
  }
  return diffs + (word.length - i) + (token.length - j) <= 1;
};

const SiteSearch = ({ open, onOpenChange }: SiteSearchProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = detectLanguageFromPath(location.pathname);
  const labels = searchLabels[currentLang] || searchLabels.fi;
  const catLabels = categoryLabels[currentLang] || categoryLabels.fi;
  const lastQueryRef = useRef<string>("");

  const fallbackLang: Language = currentLang === "en" ? "fi" : "en";

  const { grouped, otherLangPages } = useMemo(() => {
    const langPages = searchPages.filter((p) => p.lang === currentLang);
    const groups: Record<string, SearchPage[]> = {};
    for (const page of langPages) {
      (groups[page.category] ||= []).push(page);
    }
    return {
      grouped: Object.entries(groups),
      otherLangPages: searchPages.filter((p) => p.lang === fallbackLang),
    };
  }, [currentLang, fallbackLang]);

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

  const logAbandon = useCallback((query: string) => {
    if (isDevEnvironment() || !query.trim() || query.trim().length < 2) return;
    try {
      const sessionId = sessionStorage.getItem("_lv_sid") || "unknown";
      supabase.from("page_views").insert({
        path: `/event/site-search-abandon`,
        referrer: query.trim().substring(0, 200),
        device_type: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
        language: navigator.language?.split("-")[0] || null,
        session_id: sessionId,
        utm_source: null,
      }).then(() => {});
    } catch {}
  }, []);

  const selectedRef = useRef(false);

  const handleSelect = useCallback(
    (page: SearchPage) => {
      selectedRef.current = true;
      logSearch(lastQueryRef.current, page.path);
      onOpenChange(false);
      if (page.type === "download") {
        window.open(page.path, "_blank", "noopener,noreferrer");
        return;
      }
      navigate(page.path);
    },
    [navigate, onOpenChange, logSearch]
  );

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen && !selectedRef.current && lastQueryRef.current.trim().length >= 2) {
      logAbandon(lastQueryRef.current);
    }
    if (newOpen) {
      selectedRef.current = false;
      lastQueryRef.current = "";
    }
    onOpenChange(newOpen);
  }, [onOpenChange, logAbandon]);

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

  // Match query against title, description and keywords. Multi-word queries
  // require ALL tokens to match somewhere (substring, word prefix or 1-char typo).
  const customFilter = useCallback((value: string, search: string) => {
    const s = normalize(search).trim();
    if (!s) return 0;
    const [title = "", desc = "", kw = "", flag = ""] = normalize(value).split("|");
    const haystack = `${title} ${desc} ${kw}`;
    const words = haystack.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    const tokens = s.split(/\s+/).filter(Boolean);

    const matchesToken = (token: string) =>
      haystack.includes(token) ||
      words.some((w) => w.startsWith(token) || isNearMatch(w, token));

    if (!tokens.every(matchesToken)) return 0;

    let score: number;
    if (title.startsWith(s)) score = 1;
    else if (title.includes(s)) score = 0.85;
    else if (kw.includes(s)) score = 0.7;
    else if (desc.includes(s)) score = 0.55;
    else score = 0.4;

    // Toisen kielen tulokset viimeisenä
    if (flag === "alt") score *= 0.2;
    return score;
  }, []);

  const renderItem = (page: SearchPage, alt = false) => (
    <CommandItem
      key={`${page.lang}-${page.path}-${page.title}`}
      value={`${page.title}|${page.description}|${(page.keywords || []).join(" ")}|${alt ? "alt" : ""}`}
      onSelect={() => handleSelect(page)}
      className="cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="font-medium">
          {page.title}
          {page.type === "download" && " ↓"}
        </span>
        <span className="text-xs text-muted-foreground">{page.description}</span>
      </div>
    </CommandItem>
  );

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange} commandProps={{ filter: customFilter }}>
      <CommandInput placeholder={labels.placeholder} onValueChange={(v) => { lastQueryRef.current = v; }} />
      <CommandList>
        <CommandEmpty>{labels.noResults}</CommandEmpty>
        {grouped.map(([category, pages]) => (
          <CommandGroup key={category} heading={catLabels[category] || category}>
            {pages.map((page) => renderItem(page))}
          </CommandGroup>
        ))}
        <CommandGroup heading={labels.otherLang}>
          {otherLangPages.map((page) => renderItem(page, true))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SiteSearch;
