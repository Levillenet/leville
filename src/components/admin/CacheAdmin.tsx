import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Database, Clock, Check } from "lucide-react";

interface CacheStatus {
  availabilityCachedAt: string | null;
  pricesCachedAt: string | null;
  fromCache: {
    availability: boolean;
    prices: boolean;
  };
}

interface CacheAdminProps {
  isViewer?: boolean;
}

const CacheAdmin = ({ isViewer = false }: CacheAdminProps) => {
  const [isRefreshing, setIsRefreshing] = useState<'all' | 'availability' | 'prices' | null>(null);
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null);
  const { toast } = useToast();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Ei tiedossa";
    return new Date(dateStr).toLocaleString('fi-FI');
  };

  const refreshCache = async (type: 'all' | 'availability' | 'prices') => {
    setIsRefreshing(type);
    try {
      const { data, error } = await supabase.functions.invoke('beds24-availability', {
        body: {},
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Add force_refresh query parameter by calling with POST and query params
      const response = await fetch(
        `https://jcvxklzcxngctyqmknax.supabase.co/functions/v1/beds24-availability?force_refresh=${type}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdnhrbHpjeG5nY3R5cW1rbmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNDA5OTYsImV4cCI6MjA4MjYxNjk5Nn0.3nPNA-xWyfUtrsVq-DF_ztrWmLVtTh9UMtozKHLUDh8',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdnhrbHpjeG5nY3R5cW1rbmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNDA5OTYsImV4cCI6MjA4MjYxNjk5Nn0.3nPNA-xWyfUtrsVq-DF_ztrWmLVtTh9UMtozKHLUDh8'
          }
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Välimuistin päivitys epäonnistui');
      }

      setCacheStatus({
        availabilityCachedAt: result.availabilityCachedAt,
        pricesCachedAt: result.pricesCachedAt,
        fromCache: result.fromCache
      });

      const refreshedItems = type === 'all' 
        ? 'Saatavuus ja hinnat' 
        : type === 'availability' 
          ? 'Saatavuus' 
          : 'Hinnat';

      toast({
        title: "Välimuisti päivitetty",
        description: `${refreshedItems} haettu Beds24:stä.`
      });
    } catch (error) {
      console.error('Cache refresh error:', error);
      toast({
        title: "Virhe",
        description: "Välimuistin päivitys epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(null);
    }
  };

  const fetchCacheStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('beds24-availability');
      
      if (data) {
        setCacheStatus({
          availabilityCachedAt: data.availabilityCachedAt,
          pricesCachedAt: data.pricesCachedAt,
          fromCache: data.fromCache
        });
      }
    } catch (error) {
      console.error('Error fetching cache status:', error);
    }
  };

  // Fetch cache status on mount
  useState(() => {
    fetchCacheStatus();
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Beds24 Välimuisti</h2>
        <p className="text-muted-foreground">
          Hallitse Beds24 API:n välimuistia. Saatavuus päivittyy automaattisesti 2 tunnin välein, 
          hinnat klo 9:00 Suomen aikaa.
        </p>
      </div>

      {/* Cache Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Saatavuus
            </CardTitle>
            <CardDescription>
              Huoneistojen vapaat päivät
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Haettu:</span>
                <span className="font-medium">{formatDate(cacheStatus?.availabilityCachedAt || null)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tila:</span>
                <span className="flex items-center gap-1">
                  {cacheStatus?.fromCache?.availability ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Välimuistissa</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </span>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => refreshCache('availability')}
                disabled={isRefreshing !== null}
              >
                {isRefreshing === 'availability' ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Päivitä saatavuus
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="w-5 h-5" />
              Hinnat
            </CardTitle>
            <CardDescription>
              Varaushinnat Beds24:stä
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Haettu:</span>
                <span className="font-medium">{formatDate(cacheStatus?.pricesCachedAt || null)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tila:</span>
                <span className="flex items-center gap-1">
                  {cacheStatus?.fromCache?.prices ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Välimuistissa</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </span>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => refreshCache('prices')}
                disabled={isRefreshing !== null}
              >
                {isRefreshing === 'prices' ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Päivitä hinnat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Refresh */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Täysi päivitys</CardTitle>
          <CardDescription>
            Tyhjennä koko välimuisti ja hae kaikki tiedot uudelleen Beds24:stä. 
            Tämä voi kestää useita sekunteja.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => refreshCache('all')}
            disabled={isRefreshing !== null}
            className="w-full sm:w-auto"
          >
            {isRefreshing === 'all' ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Päivitä kaikki
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CacheAdmin;
