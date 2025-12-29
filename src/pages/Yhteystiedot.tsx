import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Sähköposti",
    value: "info@leville.net",
    href: "mailto:info@leville.net",
  },
  {
    icon: Phone,
    title: "Puhelin",
    value: "+358 40 123 4567",
    href: "tel:+358401234567",
  },
  {
    icon: MapPin,
    title: "Osoite",
    value: "Leville.net\nLevin keskusta\n99130 Sirkka",
    href: null,
  },
  {
    icon: Clock,
    title: "Asiakaspalvelu",
    value: "Ma-Pe 9:00-17:00\nLa-Su 10:00-16:00",
    href: null,
  },
];

const Yhteystiedot = () => {
  return (
    <>
      <Helmet>
        <title>Yhteystiedot | Leville.net – Ota yhteyttä</title>
        <meta 
          name="description" 
          content="Ota yhteyttä Leville.net asiakaspalveluun. Autamme sinua majoitusvarauksissa ja vastaamme kysymyksiisi Levin lomasta." 
        />
        <meta name="keywords" content="Leville yhteystiedot, Levi majoitus yhteystiedot, Levi varaus" />
        <link rel="canonical" href="https://leville.net/yhteystiedot" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Yhteystiedot
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Autamme sinua mielellämme! Ota yhteyttä ja kerro, miten voimme auttaa lomasuunnitelmissasi.
              </p>
            </section>

            {/* Contact Cards */}
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactInfo.map((info) => (
                <Card key={info.title} className="glass-card border-border/30 text-center">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Map Section */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground text-center mb-8">Sijainti</h2>
              <div className="glass-card border-border/30 rounded-lg overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14269.254901538582!2d24.80!3d67.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45d28a3a3a3a3a3a%3A0x0!2sLevi%2C%20Finland!5e0!3m2!1sen!2sfi!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Leville.net sijainti kartalla"
                />
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Yhteystiedot;
