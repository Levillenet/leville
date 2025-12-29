import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

type SocialType = "whatsapp" | "facebook" | "instagram" | null;

const contactInfo = [
  {
    icon: Mail,
    title: "Sähköposti",
    value: "info@leville.net",
    href: "mailto:info@leville.net",
    socialType: null as SocialType,
  },
  {
    icon: Phone,
    title: "Puhelin",
    value: "+358 44 131 313",
    href: "tel:+35844131313",
    socialType: null as SocialType,
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    value: "+358 44 131 313",
    href: "https://wa.me/35844131313",
    socialType: "whatsapp" as SocialType,
  },
  {
    icon: "facebook",
    title: "Facebook",
    value: "Leville.net",
    href: "https://facebook.com/leville.net",
    socialType: "facebook" as SocialType,
  },
  {
    icon: "instagram",
    title: "Instagram",
    value: "@leville.net",
    href: "https://instagram.com/leville.net",
    socialType: "instagram" as SocialType,
  },
  {
    icon: MapPin,
    title: "Osoite",
    value: "Leville.net\nLevin keskusta\n99130 Sirkka",
    href: null,
    socialType: null as SocialType,
  },
  {
    icon: Clock,
    title: "Asiakaspalvelu",
    value: "Ma-Pe 9:00-17:00\nLa-Su 10:00-16:00",
    href: null,
    socialType: null as SocialType,
  },
];

const getSocialIcon = (socialType: SocialType, className: string) => {
  switch (socialType) {
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
    case "facebook":
      return <FacebookIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    default:
      return null;
  }
};

const getSocialColor = (socialType: SocialType) => {
  switch (socialType) {
    case "whatsapp":
      return { bg: "bg-green-500/20", text: "text-green-500", hover: "hover:text-green-400" };
    case "facebook":
      return { bg: "bg-blue-600/20", text: "text-blue-500", hover: "hover:text-blue-400" };
    case "instagram":
      return { bg: "bg-pink-500/20", text: "text-pink-500", hover: "hover:text-pink-400" };
    default:
      return { bg: "bg-primary/20", text: "text-primary", hover: "hover:text-primary" };
  }
};

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
              {contactInfo.map((info) => {
                const colors = getSocialColor(info.socialType);
                const isSocial = info.socialType !== null;
                
                return (
                  <Card key={info.title} className="glass-card border-border/30 text-center">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 ${colors.bg}`}>
                        {isSocial ? (
                          getSocialIcon(info.socialType, `w-7 h-7 ${colors.text}`)
                        ) : (
                          typeof info.icon !== 'string' && <info.icon className={`w-7 h-7 ${colors.text}`} />
                        )}
                      </div>
                      <CardTitle className="text-lg text-foreground">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          target={isSocial ? "_blank" : undefined}
                          rel={isSocial ? "noopener noreferrer" : undefined}
                          className={`transition-colors whitespace-pre-line ${isSocial ? `${colors.text} ${colors.hover}` : 'text-muted-foreground hover:text-primary'}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
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
