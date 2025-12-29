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

// Facebook official brand icon
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Instagram official brand icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
);

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
