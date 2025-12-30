import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomerServiceChat from "@/components/CustomerServiceChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock, FileText, Wifi, Key, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Asiakaspalvelu() {
  return (
    <>
      <Helmet>
        <title>Asiakaspalvelu | Leville</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Tervetuloa Leville! 🏔️
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Täältä löydät tärkeimmät ohjeet majoitustasi varten. 
              Voit myös keskustella AI-avustajamme kanssa tai ottaa meihin yhteyttä.
            </p>
          </div>

          {/* Quick contact cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <Phone className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Puhelin</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+35844131313" className="text-primary hover:underline font-medium">
                  +358 44 131 313
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <MessageCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://wa.me/35844131313" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-medium"
                >
                  +358 44 131 313
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <Mail className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Sähköposti</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@leville.net" className="text-primary hover:underline font-medium">
                  info@leville.net
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Important info cards */}
          <h2 className="text-2xl font-display font-semibold mb-6">Tärkeät ohjeet</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Clock className="w-6 h-6 text-primary mb-2" />
                <CardTitle>Sisään- ja uloskirjautuminen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Check-in:</strong> Viimeistään klo 17, mutta yleensä huoneistot ovat valmiita aiemmin.</p>
                <p><strong>Check-out:</strong> Viimeistään klo 11</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Key className="w-6 h-6 text-primary mb-2" />
                <CardTitle>Avaimet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Suurimmassa osassa huoneistoista on koodilukko ja joissakin on avainboksi, jossa on 1 avain.</p>
                <p>Koodi lähetetään tekstiviestillä saapumispäivänä klo 16.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wifi className="w-6 h-6 text-primary mb-2" />
                <CardTitle>WiFi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>WiFi on koko talon yhteinen verkko.</p>
                <p>Verkkonimi ja salasana löytyvät huoneistosta.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Car className="w-6 h-6 text-primary mb-2" />
                <CardTitle>Pysäköinti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Pysäköinti talon edessä merkityillä paikoilla.</p>
                <p>Lämmitystolpat käytettävissä talviaikaan.</p>
              </CardContent>
            </Card>
          </div>

          {/* Downloadable documents */}
          <h2 className="text-2xl font-display font-semibold mb-6">Ladattavat ohjeet</h2>
          
          <div className="grid md:grid-cols-1 gap-4 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center gap-4 p-4">
                <FileText className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold">Saunaohjeet (Skistar-huoneistot)</h3>
                  <p className="text-sm text-muted-foreground">Saunan käyttö ja ajastin Skistar-huoneistoissa</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href="/docs/sauna-ohjeet.pdf" target="_blank">Lataa PDF</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tarvitsetko apua?</h3>
              <p className="text-muted-foreground mb-4">
                Klikkaa oikeassa alakulmassa olevaa chat-kuvaketta keskustellaksesi AI-avustajamme kanssa. 
                Botti osaa vastata yleisimpiin kysymyksiin majoituksesta ja laitteista.
              </p>
              <p className="text-sm text-muted-foreground">
                Kiireellisissä asioissa tavoitat meidät parhaiten WhatsAppilla.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer lang="fi" />
      <CustomerServiceChat />
    </>
  );
}
