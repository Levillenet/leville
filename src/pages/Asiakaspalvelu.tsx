import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomerServiceChat from "@/components/CustomerServiceChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock, FileText, Wifi, Key, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/translations";

const content = {
  fi: {
    title: "Asiakaspalvelu | Leville",
    heroTitle: "Tervetuloa Leville! 🏔️",
    heroDesc: "Täältä löydät tärkeimmät ohjeet majoitustasi varten. Voit myös keskustella AI-avustajamme kanssa tai ottaa meihin yhteyttä.",
    phone: "Puhelin",
    email: "Sähköposti",
    importantTitle: "Tärkeät ohjeet",
    checkinTitle: "Sisään- ja uloskirjautuminen",
    checkinText: "Viimeistään klo 17, mutta yleensä huoneistot ovat valmiita aiemmin.",
    checkoutText: "Viimeistään klo 11",
    keysTitle: "Avaimet",
    keysText1: "Suurimmassa osassa huoneistoista on koodilukko ja joissakin on avainboksi, jossa on 1 avain.",
    keysText2: "Koodi lähetetään tekstiviestillä saapumispäivänä klo 16.",
    wifiTitle: "WiFi",
    wifiText1: "WiFi on koko talon yhteinen verkko.",
    wifiText2: "Verkkonimi ja salasana löytyvät huoneistosta.",
    parkingTitle: "Pysäköinti",
    parkingText1: "Pysäköinti talon edessä merkityillä paikoilla.",
    parkingText2: "Lämmitystolpat käytettävissä talviaikaan.",
    docsTitle: "Ladattavat ohjeet",
    saunaTitle: "Saunaohjeet (Skistar-huoneistot)",
    saunaDesc: "Saunan käyttö ja ajastin Skistar-huoneistoissa",
    download: "Lataa PDF",
    helpTitle: "Tarvitsetko apua?",
    helpText: "Klikkaa oikeassa alakulmassa olevaa chat-kuvaketta keskustellaksesi AI-avustajamme kanssa. Botti osaa vastata yleisimpiin kysymyksiin majoituksesta ja laitteista.",
    helpUrgent: "Kiireellisissä asioissa tavoitat meidät parhaiten WhatsAppilla.",
  },
  en: {
    title: "Guest Support | Leville",
    heroTitle: "Welcome to Levi! 🏔️",
    heroDesc: "Here you'll find the most important instructions for your stay. You can also chat with our AI assistant or contact us directly.",
    phone: "Phone",
    email: "Email",
    importantTitle: "Important information",
    checkinTitle: "Check-in & Check-out",
    checkinText: "Check-in by 17:00 at the latest, but apartments are usually ready earlier.",
    checkoutText: "Check-out by 11:00",
    keysTitle: "Keys & Access",
    keysText1: "Most apartments have a code lock, and some have a key box with 1 key.",
    keysText2: "The access code is sent via SMS on the day of arrival at 16:00.",
    wifiTitle: "WiFi",
    wifiText1: "WiFi is a shared network for the whole building.",
    wifiText2: "Network name and password can be found in your apartment.",
    parkingTitle: "Parking",
    parkingText1: "Parking is available in marked spaces in front of the building.",
    parkingText2: "Heating poles available during winter.",
    docsTitle: "Downloadable guides",
    saunaTitle: "Sauna instructions (Skistar apartments)",
    saunaDesc: "Sauna usage and timer in Skistar apartments",
    download: "Download PDF",
    helpTitle: "Need help?",
    helpText: "Click the chat icon in the bottom-right corner to talk with our AI assistant. It can answer the most common questions about accommodation and appliances.",
    helpUrgent: "For urgent matters, reach us fastest via WhatsApp.",
  },
};

export default function Asiakaspalvelu({ lang = "fi" }: { lang?: Language }) {
  const isEn = lang === "en";
  const t = isEn ? content.en : content.fi;

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.heroDesc}
            </p>
          </div>

          {/* Quick contact cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <Phone className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">{t.phone}</CardTitle>
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
                <CardTitle className="text-lg">{t.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@leville.net" className="text-primary hover:underline font-medium">
                  info@leville.net
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Important info cards */}
          <h2 className="text-2xl font-display font-semibold mb-6">{t.importantTitle}</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Clock className="w-6 h-6 text-primary mb-2" />
                <CardTitle>{t.checkinTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Check-in:</strong> {t.checkinText}</p>
                <p><strong>Check-out:</strong> {t.checkoutText}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Key className="w-6 h-6 text-primary mb-2" />
                <CardTitle>{t.keysTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{t.keysText1}</p>
                <p>{t.keysText2}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wifi className="w-6 h-6 text-primary mb-2" />
                <CardTitle>{t.wifiTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{t.wifiText1}</p>
                <p>{t.wifiText2}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Car className="w-6 h-6 text-primary mb-2" />
                <CardTitle>{t.parkingTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{t.parkingText1}</p>
                <p>{t.parkingText2}</p>
              </CardContent>
            </Card>
          </div>

          {/* Downloadable documents */}
          <h2 className="text-2xl font-display font-semibold mb-6">{t.docsTitle}</h2>
          
          <div className="grid md:grid-cols-1 gap-4 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center gap-4 p-4">
                <FileText className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold">{t.saunaTitle}</h3>
                  <p className="text-sm text-muted-foreground">{t.saunaDesc}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href="/docs/sauna-ohjeet.pdf" target="_blank">{t.download}</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.helpTitle}</h3>
              <p className="text-muted-foreground mb-4">{t.helpText}</p>
              <p className="text-sm text-muted-foreground">{t.helpUrgent}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer lang={lang} />
      <CustomerServiceChat />
    </>
  );
}
