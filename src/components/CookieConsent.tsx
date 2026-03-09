import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie_consent";

const translations = {
  fi: {
    text: "Käytämme evästeitä (Google Analytics, Microsoft Clarity) sivuston kehittämiseksi.",
    privacy: "Tietosuojaseloste",
    accept: "Hyväksy",
    reject: "Hylkää",
  },
  en: {
    text: "We use cookies (Google Analytics, Microsoft Clarity) to improve the website.",
    privacy: "Privacy Policy",
    accept: "Accept",
    reject: "Reject",
  },
};

function getLanguage(pathname: string): "fi" | "en" {
  if (pathname.startsWith("/en") || pathname.startsWith("/accommodations") || pathname.startsWith("/contact") || pathname.startsWith("/about") || pathname.startsWith("/terms")) {
    return "en";
  }
  return "fi";
}

function loadGA4() {
  if (document.getElementById("ga4-script")) return;
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-6BR1JFF2Q8";
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) { window.dataLayer.push(args); }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-6BR1JFF2Q8");
  };
}

function loadClarity() {
  if (document.getElementById("clarity-script")) return;
  (function (c: any, l: any, a: string, r: string, i: string) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    const t = l.createElement(r) as HTMLScriptElement;
    t.id = "clarity-script";
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "utrphfjqd1");
}

export function loadTrackingScripts() {
  loadGA4();
  loadClarity();
}

export function getConsent(): string | null {
  return localStorage.getItem(CONSENT_KEY);
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const lang = getLanguage(location.pathname);
  const t = translations[lang];

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") {
      loadTrackingScripts();
    } else if (!consent) {
      setVisible(true);
    }
    // "rejected" → do nothing
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadTrackingScripts();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  const privacyPath = lang === "fi" ? "/tietosuoja" : "/en/privacy";

  return (
    <div className="fixed bottom-14 md:bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto max-w-2xl rounded-xl border border-border/50 bg-card/95 backdrop-blur-md shadow-lg p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
          {t.text}{" "}
          <a href={privacyPath} className="underline text-foreground hover:text-primary transition-colors">
            {t.privacy}
          </a>
        </p>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="flex-1 sm:flex-initial"
          >
            {t.reject}
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1 sm:flex-initial"
          >
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
