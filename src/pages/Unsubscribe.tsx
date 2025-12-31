import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Bell, BellOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "invalid">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const unsubscribe = async () => {
      try {
        const { error } = await supabase
          .from("aurora_alerts")
          .update({ is_active: false })
          .eq("unsubscribe_token", token);

        if (error) {
          console.error("Unsubscribe error:", error);
          setStatus("error");
        } else {
          setStatus("success");
        }
      } catch (err) {
        console.error("Unsubscribe error:", err);
        setStatus("error");
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Revontulihälytykset - Tilauksen peruutus | Leville.net</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="bg-card/50 backdrop-blur-sm border-border/30">
              <CardContent className="pt-8 pb-8 text-center">
                {status === "loading" && (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                    <p className="text-muted-foreground">Käsitellään...</p>
                  </div>
                )}
                
                {status === "success" && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Tilaus peruutettu</h1>
                    <p className="text-muted-foreground">
                      Olet peruuttanut revontulihälytysten tilauksen. Et saa enää sähköposti-ilmoituksia.
                    </p>
                    <Button asChild className="mt-4">
                      <a href="/revontulet">Takaisin revontulisivulle</a>
                    </Button>
                  </div>
                )}
                
                {status === "error" && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Virhe</h1>
                    <p className="text-muted-foreground">
                      Tilauksen peruutus epäonnistui. Yritä uudelleen tai ota yhteyttä asiakaspalveluun.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                      <a href="/yhteystiedot">Ota yhteyttä</a>
                    </Button>
                  </div>
                )}
                
                {status === "invalid" && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
                      <BellOff className="w-8 h-8 text-amber-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Virheellinen linkki</h1>
                    <p className="text-muted-foreground">
                      Peruutuslinkki on virheellinen tai vanhentunut.
                    </p>
                    <Button asChild className="mt-4">
                      <a href="/revontulet">Revontulisivulle</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
