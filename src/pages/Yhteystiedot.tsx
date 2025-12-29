import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

// WhatsApp official brand icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    title: "Sähköposti",
    value: "info@leville.net",
    href: "mailto:info@leville.net",
    isWhatsApp: false,
  },
  {
    icon: Phone,
    title: "Puhelin",
    value: "+358 44 131 313",
    href: "tel:+35844131313",
    isWhatsApp: false,
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    value: "+358 44 131 313",
    href: "https://wa.me/35844131313",
    isWhatsApp: true,
  },
  {
    icon: MapPin,
    title: "Osoite",
    value: "Leville.net\nLevin keskusta\n99130 Sirkka",
    href: null,
    isWhatsApp: false,
  },
  {
    icon: Clock,
    title: "Asiakaspalvelu",
    value: "Ma-Pe 9:00-17:00\nLa-Su 10:00-16:00",
    href: null,
    isWhatsApp: false,
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
            <section className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
              {contactInfo.map((info) => (
                <Card key={info.title} className="glass-card border-border/30 text-center">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 ${info.isWhatsApp ? 'bg-green-500/20' : 'bg-primary/20'}`}>
                      {info.isWhatsApp ? (
                        <WhatsAppIcon className="w-7 h-7 text-green-500" />
                      ) : (
                        <info.icon className="w-7 h-7 text-primary" />
                      )}
                    </div>
                    <CardTitle className="text-lg text-foreground">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        target={info.isWhatsApp ? "_blank" : undefined}
                        rel={info.isWhatsApp ? "noopener noreferrer" : undefined}
                        className={`transition-colors whitespace-pre-line ${info.isWhatsApp ? 'text-green-500 hover:text-green-400' : 'text-muted-foreground hover:text-primary'}`}
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
