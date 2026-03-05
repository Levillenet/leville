import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InlineChat from "@/components/InlineChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock, FileText, Wifi, Key, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/translations";

const content = {
  fi: {
    title: "Asiakaspalvelu | Leville",
    heroTitle: "Kysyttävää majoituksesta? 🏔️",
    heroDesc: "Kysy AI-avustajaltamme – se tuntee huoneistomme, laitteet ja Levin alueen. Voit myös ottaa meihin yhteyttä suoraan.",
    chatGreeting: "Hei! Olen Levillen AI-avustaja. Kysy mitä vain majoituksestasi, laitteista tai Levin palveluista! 🏔️",
    chatPlaceholder: "Kysy esim. saunasta, lämmityksestä, avaimista, aktiviteeteista...",
    chatSubtitle: "AI-avustaja • Levin paikallisopas",
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
    urgentNote: "Kiireellisissä asioissa tavoitat meidät parhaiten WhatsAppilla.",
  },
  en: {
    title: "Guest Support | Leville",
    heroTitle: "Questions about your stay? 🏔️",
    heroDesc: "Ask our AI assistant — it knows our apartments, appliances, and the Levi area. You can also contact us directly.",
    chatGreeting: "Hi! I'm your local Levi expert. Ask me anything about your stay, appliances, or activities in Levi! 🏔️",
    chatPlaceholder: "Ask about sauna, heating, keys, activities...",
    chatSubtitle: "AI assistant • Your Levi travel guide",
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
    urgentNote: "For urgent matters, reach us fastest via WhatsApp.",
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
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              {t.heroTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.heroDesc}
            </p>
          </div>

          {/* Main layout: Chat + Contact side by side on desktop */}
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Chat - takes more space */}
            <div className="lg:col-span-3">
              <InlineChat
                greeting={t.chatGreeting}
                placeholder={t.chatPlaceholder}
                subtitle={t.chatSubtitle}
              />
            </div>

            {/* Contact + urgent info sidebar */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <MessageCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <CardTitle className="text-lg">WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://wa.me/358441313131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline font-medium text-lg"
                  >
                    +358 44 131 3131
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">{t.urgentNote}</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Phone className="w-8 h-8 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">{t.phone}</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+358441313131" className="text-primary hover:underline font-medium">
                    +358 44 131 3131
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
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
