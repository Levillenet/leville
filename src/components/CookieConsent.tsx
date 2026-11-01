import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CONSENT_NOTICE, readConsent, saveConsent } from "@/lib/cookieConsent";

export default function CookieConsent() {
  const location = useLocation();
  const lang = /^\/(en|sv|de|es|fr|nl)(\/|$)/.test(location.pathname) || /^\/(guide|activities|travel)(\/|$)/.test(location.pathname) ? "en" : "fi";
  const fi = lang === "fi";
  const [visible, setVisible] = useState(() => !readConsent());
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    const open = () => {
      const choice = readConsent();
      setAnalytics(choice?.analytics ?? false); setMarketing(choice?.marketing ?? false);
      setSettings(false); setVisible(true);
    };
    const changed = () => { if (!readConsent()) setVisible(true); };
    window.addEventListener("lv-cookie-settings", open);
    window.addEventListener("lv-consent-change", changed);
    return () => { window.removeEventListener("lv-cookie-settings", open); window.removeEventListener("lv-consent-change", changed); };
  }, []);
  if (!visible || location.pathname.startsWith("/admin")) return null;
  const save = (stats: boolean, ads: boolean) => { saveConsent(stats, ads, lang); setVisible(false); setSettings(false); };
  return (
    <section role="region" aria-label={fi ? "Evästeasetukset" : "Cookie settings"} className="fixed bottom-0 inset-x-0 z-[10000] border-t border-border bg-card text-card-foreground shadow-elegant">
      <div className="container mx-auto px-4 py-4 md:py-5 max-h-[70dvh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <div className="flex-1">
            <p className="text-sm leading-relaxed">{CONSENT_NOTICE[lang]}</p>
            <a href={fi ? "/evasteet" : "/en/cookies"} className="text-primary text-xs underline underline-offset-4">{fi ? "Evästeseloste" : "Cookie policy"}</a>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center lg:shrink-0">
            <Button className="h-11 w-full lg:w-44 px-2 whitespace-normal leading-tight" onClick={() => save(true, true)}>{fi ? "Hyväksy kaikki" : "Accept all"}</Button>
            <Button variant="secondary" className="h-11 w-full lg:w-44 px-2 whitespace-normal leading-tight bg-foreground text-background hover:bg-foreground/90" onClick={() => save(false, false)}>{fi ? "Vain välttämättömät" : "Necessary only"}</Button>
            <Button variant="link" className="col-span-2 h-8 lg:h-11" aria-expanded={settings} onClick={() => {
              const choice = readConsent(); setAnalytics(choice?.analytics ?? false); setMarketing(choice?.marketing ?? false); setSettings(!settings);
            }}>{fi ? "Asetukset" : "Settings"}</Button>
          </div>
        </div>
        {settings && <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-4">
          <label className="flex items-center gap-3 text-sm" htmlFor="consent-analytics">{fi ? "Tilastointi" : "Statistics"}<Switch id="consent-analytics" checked={analytics} onCheckedChange={setAnalytics} /></label>
          <label className="flex items-center gap-3 text-sm" htmlFor="consent-marketing">{fi ? "Markkinointi" : "Marketing"}<Switch id="consent-marketing" checked={marketing} onCheckedChange={setMarketing} /></label>
          <Button onClick={() => save(analytics, marketing)}>{fi ? "Tallenna" : "Save"}</Button>
        </div>}
      </div>
    </section>
  );
}