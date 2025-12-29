import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Clock, Timer, Download, ThermometerSun } from "lucide-react";

const Sauna = () => {
  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>Saunan lämmitysohjeet | Leville.net</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Sähkösaunan lämmitysohjeet majoituskohteissamme." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Hero Section */}
            <section className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 mb-6">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Saunan lämmitysohjeet
              </h1>
              <p className="text-lg text-muted-foreground">
                Ohje sähkösaunan lämmittämiseen
              </p>
            </section>

            {/* Download PDF */}
            <section className="mb-8">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="/docs/sauna-ohjeet.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Lataa ohjeet PDF-muodossa
                </a>
              </Button>
            </section>

            {/* Heating Time */}
            <Card className="glass-card border-border/30 mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <ThermometerSun className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Lämmitysaika</CardTitle>
                    <p className="text-sm text-muted-foreground">Heating time</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-foreground mb-2">🇫🇮 Suomi</p>
                    <p className="text-muted-foreground">
                      Sauna lämpenee noin <strong className="text-foreground">30-45 minuutissa</strong>. 
                      Löylyt ovat parhaimmillaan kun sauna on lämmennyt kunnolla.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-foreground mb-2">🇬🇧 English</p>
                    <p className="text-muted-foreground">
                      The sauna takes about <strong className="text-foreground">30-45 minutes</strong> to heat up. 
                      You'll get good steam once it's ready.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timer Instructions */}
            <Card className="glass-card border-border/30 mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Timer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Ajastimen käyttö</CardTitle>
                    <p className="text-sm text-muted-foreground">Using the timer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-foreground mb-3">🇫🇮 Esimerkki</p>
                    <p className="text-muted-foreground mb-3">
                      Jos menet ulkoilemaan <strong className="text-foreground">3 tunniksi</strong> ja haluat saunan lämpimäksi palatessasi:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">1</span>
                        Käytä ajastimen aluetta <strong className="text-foreground">B</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">2</span>
                        Aseta ajastin noin <strong className="text-foreground">2 tunnin</strong> kohdalle
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">3</span>
                        Sauna alkaa lämmetä 2 tunnin kuluttua ja on valmis palatessasi
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-foreground mb-3">🇬🇧 Example</p>
                    <p className="text-muted-foreground mb-3">
                      If you go out for <strong className="text-foreground">3 hours</strong> and want the sauna warm when you return:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">1</span>
                        Use timer area <strong className="text-foreground">B</strong>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">2</span>
                        Set it to the <strong className="text-foreground">2-hour</strong> mark
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">3</span>
                        The sauna will start heating after 2 hours and be ready when you arrive
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Timer Visual */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-orange-500/10 to-primary/10 border border-orange-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <p className="font-medium text-foreground">Ajastimen alueet / Timer areas</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded bg-background/50">
                      <p className="font-medium text-foreground">Alue A / Area A</p>
                      <p className="text-muted-foreground">Lämmitysaika / Heating duration</p>
                    </div>
                    <div className="p-3 rounded bg-background/50">
                      <p className="font-medium text-foreground">Alue B / Area B</p>
                      <p className="text-muted-foreground">Viiveajastin / Delay timer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Sauna;
