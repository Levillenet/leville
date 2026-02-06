import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminSettings {
  videoUrl: string;
  unlockCode: string;
  fallbackTimer: number;
}

interface FireplaceAdminPanelProps {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
}

const FireplaceAdminPanel = ({
  settings,
  onSave,
}: FireplaceAdminPanelProps) => {
  const [localSettings, setLocalSettings] = useState<AdminSettings>(settings);

  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-blue-500/30 bg-blue-500/5 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Settings className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Admin Settings / Ylläpitoasetukset
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* Video URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            YouTube Video URL
          </label>
          <Input
            value={localSettings.videoUrl}
            onChange={(e) =>
              setLocalSettings((s) => ({ ...s, videoUrl: e.target.value }))
            }
            placeholder="https://www.youtube.com/watch?v=..."
            className="bg-background/50 border-border/50"
          />
        </div>

        {/* Unlock Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Avauskoodi / Unlock Code
          </label>
          <Input
            value={localSettings.unlockCode}
            onChange={(e) =>
              setLocalSettings((s) => ({ ...s, unlockCode: e.target.value }))
            }
            placeholder="1234"
            className="bg-background/50 border-border/50"
          />
        </div>

        {/* Fallback Timer */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Fallback-ajastin (sekuntia) / Fallback timer (seconds)
          </label>
          <Input
            type="number"
            value={localSettings.fallbackTimer}
            onChange={(e) =>
              setLocalSettings((s) => ({
                ...s,
                fallbackTimer: parseInt(e.target.value) || 60,
              }))
            }
            min={10}
            className="bg-background/50 border-border/50 w-32"
          />
        </div>

        {/* Save button */}
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Tallenna / Save
        </Button>

        {/* Warning note */}
        <p className="text-xs text-muted-foreground mt-3 italic">
          ⚠️ Nämä asetukset tallentuvat vain selaimen muistiin ja nollautuvat
          sivun uudelleenlatauksessa. Pysyvät muutokset tehdään lähdekoodiin.
          <br />
          ⚠️ These settings are stored in browser memory only and will reset
          when the page is reloaded. For permanent changes, update the default
          values in the source code.
        </p>
      </div>
    </div>
  );
};

export default FireplaceAdminPanel;
