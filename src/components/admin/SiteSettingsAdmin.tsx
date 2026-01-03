import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, CalendarDays, Save } from 'lucide-react';
import { useAdminSettingsManager } from '@/hooks/useAdminSettings';

const SiteSettingsAdmin = () => {
  const { settings, isLoading, updateSiteSetting, isSaving } = useAdminSettingsManager();
  const [dealsDaysAhead, setDealsDaysAhead] = useState<number>(14);
  
  // Load current value from settings
  useEffect(() => {
    if (settings?.siteSettings) {
      const setting = settings.siteSettings.find(s => s.id === 'deals_days_ahead');
      if (setting?.value !== undefined) {
        const value = typeof setting.value === 'number' 
          ? setting.value 
          : parseInt(String(setting.value), 10);
        if (!isNaN(value)) {
          setDealsDaysAhead(value);
        }
      }
    }
  }, [settings?.siteSettings]);

  const handleQuickSelect = (days: number) => {
    setDealsDaysAhead(days);
    updateSiteSetting({ settingId: 'deals_days_ahead', value: days });
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
            <CalendarDays className="w-5 h-5" />
            Äkkilähdöt
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
