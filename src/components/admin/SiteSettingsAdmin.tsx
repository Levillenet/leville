import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, CalendarDays, Eye } from 'lucide-react';
import { useAdminSettingsManager } from '@/hooks/useAdminSettings';

interface SiteSettingsAdminProps {
  isViewer?: boolean;
}

const SiteSettingsAdmin = ({ isViewer = false }: SiteSettingsAdminProps) => {
  const { settings, isLoading, updateSiteSetting, isSaving } = useAdminSettingsManager();
  const [dealsDaysAhead, setDealsDaysAhead] = useState<number>(14);
  const [dealsEnabled, setDealsEnabled] = useState<boolean>(true);
  
  // Load current values from settings
  useEffect(() => {
    if (settings?.siteSettings) {
      const daysSetting = settings.siteSettings.find(s => s.id === 'deals_days_ahead');
      if (daysSetting?.value !== undefined) {
        const value = typeof daysSetting.value === 'number' 
          ? daysSetting.value 
          : parseInt(String(daysSetting.value), 10);
        if (!isNaN(value)) {
          setDealsDaysAhead(value);
        }
      }
      const enabledSetting = settings.siteSettings.find(s => s.id === 'deals_enabled');
      if (enabledSetting?.value !== undefined) {
        setDealsEnabled(enabledSetting.value !== false);
      }
    }
  }, [settings?.siteSettings]);

  const handleQuickSelect = (days: number) => {
    setDealsDaysAhead(days);
    updateSiteSetting({ settingId: 'deals_days_ahead', value: days });
  };

  const handleToggleEnabled = (checked: boolean) => {
    setDealsEnabled(checked);
    updateSiteSetting({ settingId: 'deals_enabled', value: checked });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Äkkilähtöjen näkyvyys
          </CardTitle>
          <CardDescription>
            Kytke äkkilähtötarjousten näyttäminen sivustolla päälle tai pois
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="deals-enabled-toggle" className="text-base font-medium">
                Näytä äkkilähdöt sivustolla
              </Label>
              <p className="text-sm text-muted-foreground">
                {dealsEnabled
                  ? 'Päällä: /akkilahdot näyttää kaikki saatavilla olevat tarjoukset.'
                  : 'Pois: sivulla näkyy tiedote pääsesongista ja suora varauslinkki.'}
              </p>
            </div>
            <Switch
              id="deals-enabled-toggle"
              checked={dealsEnabled}
              onCheckedChange={handleToggleEnabled}
              disabled={isSaving}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Yleiset asetukset
          </CardTitle>
          <CardDescription>
            Hallitse, kuinka monta päivää eteenpäin äkkilähtöjä näytetään sivulla
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Näytä äkkilähtöjä {dealsDaysAhead} päivää etukäteen
            </Label>
            
            <div className="flex flex-wrap gap-2">
              {[7, 14, 21, 28].map(days => (
                <Button
                  key={days}
                  type="button"
                  size="lg"
                  variant={dealsDaysAhead === days ? "default" : "outline"}
                  className="h-12 px-6 text-lg"
                  onClick={() => handleQuickSelect(days)}
                  disabled={isSaving}
                >
                  {days} pv
                </Button>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              Esim. 14 päivää tarkoittaa, että sivuilla näytetään vain ne äkkilähdöt, joiden 
              sisäänkirjautumispäivä on korkeintaan 14 päivän kuluttua tästä päivästä.
            </p>
          </div>

          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Tallennetaan...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsAdmin;
