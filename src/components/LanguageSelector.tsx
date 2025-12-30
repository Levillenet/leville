import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Language, 
  languageConfig, 
  getRouteForLanguage, 
  detectLanguageFromPath 
} from "@/translations";

const LanguageSelector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = detectLanguageFromPath(location.pathname);
  const currentConfig = languageConfig[currentLang];

  const handleLanguageChange = (lang: Language) => {
    if (lang === currentLang) return;
    const newPath = getRouteForLanguage(location.pathname, lang);
    navigate(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 px-2"
        >
          <span className="text-lg leading-none">{currentConfig.flag}</span>
          <span>{currentLang.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[160px] bg-background border border-border shadow-lg z-50"
      >
        {(Object.keys(languageConfig) as Language[]).map((lang) => {
          const config = languageConfig[lang];
          const isActive = lang === currentLang;
          
          return (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center gap-3 cursor-pointer ${
                isActive ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              <span className="text-lg">{config.flag}</span>
              <span className="flex-1">{config.label}</span>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
