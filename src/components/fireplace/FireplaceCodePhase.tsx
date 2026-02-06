import { useState } from "react";
import { Copy, Check, Flame, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FireplaceCodePhaseProps {
  lang: "fi" | "en";
  unlockCode: string;
}

const t = {
  fi: {
    stepTitle: "Vaihe 3: Takan avauskoodi",
    success:
      "Kiitos! Olet käynyt läpi takan käyttöohjeet. Alla on koodi, jolla saat takan lukon avattua. Nautinnollisia takkailtoja! 🔥",
    codeLabel: "Avauskoodi",
    copy: "Kopioi koodi",
    copied: "Kopioitu!",
    reminder:
      "🔥 Muista aina: Savupelti auki kun tuli palaa · Parvekkeen ovi raolleen sytyttäessä · Liesituuletin enintään teholla 1 · Enintään 2 pesällistä puita · Älä poista kuumaa tuhkaa · Sulje pelti vasta kun takka on täysin sammunut · Jos olet epävarma, ota yhteyttä majoittajaan!",
    footer:
      "Tämä ohje on tehty sinun turvallisuutesi vuoksi – kiitos kun käytät takkaa vastuullisesti!",
  },
  en: {
    stepTitle: "Step 3: Fireplace unlock code",
    success:
      "Thank you! You have completed the fireplace instructions. Below is the code to unlock the fireplace. Enjoy cozy fireplace evenings! 🔥",
    codeLabel: "Unlock code",
    copy: "Copy code",
    copied: "Copied!",
    reminder:
      "🔥 Always remember: Keep the flue open while fire burns · Keep balcony door ajar when lighting · Kitchen fan max level 1 · Maximum 2 loads of wood · Never remove hot ash · Close flue only when fire is completely out · If unsure, contact your host!",
    footer:
      "These instructions are for your safety – thank you for using the fireplace responsibly!",
  },
};

const FireplaceCodePhase = ({
  lang,
  unlockCode,
}: FireplaceCodePhaseProps) => {
  const [copied, setCopied] = useState(false);
  const strings = t[lang];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(unlockCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = unlockCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground text-center">
        {strings.stepTitle}
      </h2>

      {/* Success message */}
      <div className="glass-card border-green-500/30 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/20 mb-4">
          <ShieldCheck className="w-7 h-7 text-green-400" />
        </div>
        <p className="text-foreground leading-relaxed">{strings.success}</p>
      </div>

      {/* Code box */}
      <div className="glass-card border-primary/40 rounded-xl p-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
          {strings.codeLabel}
        </p>
        <div className="text-5xl md:text-6xl font-bold text-primary tracking-[0.3em] font-mono">
          {unlockCode}
        </div>
        <Button
          variant="outline"
          onClick={handleCopy}
          className="border-primary/30 hover:bg-primary/10"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-400" />
              {strings.copied}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              {strings.copy}
            </>
          )}
        </Button>
      </div>

      {/* Safety reminder */}
      <div className="rounded-xl p-5 border border-orange-500/30 bg-orange-500/5">
        <div className="flex gap-3">
          <Flame className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {strings.reminder}
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground italic">
        {strings.footer}
      </p>
    </div>
  );
};

export default FireplaceCodePhase;
