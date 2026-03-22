import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import Breadcrumbs from "@/components/Breadcrumbs";
import HreflangTags from "@/components/HreflangTags";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Language, routeConfig } from "@/translations";
import { useLocation } from "react-router-dom";

interface TietosuojaProps {
  lang?: Language;
}

const content: Record<Language, {
  title: string;
  metaTitle: string;
  metaDescription: string;
  sections: { heading: string; text: string }[];
}> = {
  fi: {
    title: "Tietosuojaseloste",
    metaTitle: "Tietosuojaseloste | Leville.net",
    metaDescription: "Leville.net:n tietosuojaseloste. Lue, miten käsittelemme henkilötietojasi.",
    sections: [
      {
        heading: "Rekisterinpitäjä",
        text: "Leville.net (y-tunnus: 2965553-7)\nLevin keskusta, 99130 Sirkka\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Kerättävät tiedot",
        text: "Keräämme vain varauksen käsittelyyn tarvittavat tiedot: nimi, sähköposti, puhelinnumero ja varaustiedot. Revontulihälytysten tilauksessa tallennamme sähköpostiosoitteen."
      },
      {
        heading: "Tietojen käyttötarkoitus",
        text: "Tietoja käytetään ainoastaan varausten käsittelyyn, asiakaspalveluun ja tilattujen ilmoitusten lähettämiseen. Emme käytä tietoja markkinointiin ilman erillistä suostumusta."
      },
      {
        heading: "Tietojen säilytys ja suojaus",
        text: "Tiedot säilytetään EU/ETA-alueella sijaitsevissa suojatuissa palvelimissa. Varauksen tiedot säilytetään kirjanpitolainsäädännön edellyttämän ajan. Pääsy tietoihin on rajattu vain tarvittavalle henkilökunnalle."
      },
      {
        heading: "Evästeet",
        text: "Käytämme analytiikkaevästeitä (Google Analytics, Microsoft Clarity) sivuston kehittämiseksi. Voit estää evästeet selaimesi asetuksista."
      },
      {
        heading: "Rekisteröidyn oikeudet",
        text: "Sinulla on oikeus tarkastaa, oikaista tai pyytää poistamaan tietosi. Ota yhteyttä info@leville.net."
      }
    ]
  },
  en: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Leville.net",
    metaDescription: "Leville.net privacy policy. Learn how we handle your personal data.",
    sections: [
      {
        heading: "Data Controller",
        text: "Leville.net (Business ID: 2965553-7)\nLevi Center, 99130 Sirkka, Finland\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Data Collected",
        text: "We collect only data necessary for processing bookings: name, email, phone number, and booking details. For aurora alerts subscription, we store your email address."
      },
      {
        heading: "Purpose of Data Processing",
        text: "Data is used solely for processing bookings, customer service, and sending requested notifications. We do not use data for marketing without separate consent."
      },
      {
        heading: "Data Storage and Security",
        text: "Data is stored on secure servers within the EU/EEA. Booking information is retained for the period required by accounting legislation. Access is restricted to necessary personnel only."
      },
      {
        heading: "Cookies",
        text: "We use analytics cookies (Google Analytics, Microsoft Clarity) to improve the website. You can block cookies in your browser settings."
      },
      {
        heading: "Your Rights",
        text: "You have the right to access, correct, or request deletion of your data. Contact info@leville.net."
      }
    ]
  },
  sv: {
    title: "Integritetspolicy",
    metaTitle: "Integritetspolicy | Leville.net",
    metaDescription: "Leville.net integritetspolicy. Läs hur vi hanterar dina personuppgifter.",
    sections: [
      {
        heading: "Personuppgiftsansvarig",
        text: "Leville.net (FO-nummer: 2965553-7)\nLevi Centrum, 99130 Sirkka, Finland\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Insamlade uppgifter",
        text: "Vi samlar endast in uppgifter som behövs för bokning: namn, e-post, telefonnummer och bokningsuppgifter. För norrskensnotiser lagrar vi din e-postadress."
      },
      {
        heading: "Syfte med behandlingen",
        text: "Uppgifterna används endast för bokningshantering, kundservice och att skicka begärda meddelanden. Vi använder inte uppgifter för marknadsföring utan separat samtycke."
      },
      {
        heading: "Lagring och säkerhet",
        text: "Uppgifterna lagras på säkra servrar inom EU/EES. Bokningsinformation sparas enligt bokföringslagstiftningen. Tillgång begränsas till nödvändig personal."
      },
      {
        heading: "Cookies",
        text: "Vi använder analyskakor (Google Analytics, Microsoft Clarity) för att förbättra webbplatsen. Du kan blockera kakor i webbläsarinställningarna."
      },
      {
        heading: "Dina rättigheter",
        text: "Du har rätt att få tillgång till, korrigera eller begära radering av dina uppgifter. Kontakta info@leville.net."
      }
    ]
  },
  de: {
    title: "Datenschutzerklärung",
    metaTitle: "Datenschutzerklärung | Leville.net",
    metaDescription: "Datenschutzerklärung von Leville.net. Erfahren Sie, wie wir Ihre personenbezogenen Daten verarbeiten.",
    sections: [
      {
        heading: "Verantwortlicher",
        text: "Leville.net (Handelsregister-Nr.: 2965553-7)\nLevi Zentrum, 99130 Sirkka, Finnland\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Erhobene Daten",
        text: "Wir erheben nur für die Buchung erforderliche Daten: Name, E-Mail, Telefonnummer und Buchungsdetails. Für Polarlicht-Benachrichtigungen speichern wir Ihre E-Mail-Adresse."
      },
      {
        heading: "Zweck der Datenverarbeitung",
        text: "Daten werden ausschließlich für die Buchungsabwicklung, Kundenservice und den Versand angeforderter Benachrichtigungen verwendet. Wir nutzen Daten nicht für Marketing ohne gesonderte Zustimmung."
      },
      {
        heading: "Datenspeicherung und Sicherheit",
        text: "Daten werden auf sicheren Servern innerhalb der EU/EWR gespeichert. Buchungsinformationen werden gemäß den Buchhaltungsvorschriften aufbewahrt. Der Zugang ist auf erforderliches Personal beschränkt."
      },
      {
        heading: "Cookies",
        text: "Wir verwenden Analyse-Cookies (Google Analytics, Microsoft Clarity) zur Verbesserung der Website. Sie können Cookies in Ihren Browsereinstellungen blockieren."
      },
      {
        heading: "Ihre Rechte",
        text: "Sie haben das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten. Kontaktieren Sie info@leville.net."
      }
    ]
  },
  es: {
    title: "Política de privacidad",
    metaTitle: "Política de privacidad | Leville.net",
    metaDescription: "Política de privacidad de Leville.net. Conozca cómo tratamos sus datos personales.",
    sections: [
      {
        heading: "Responsable del tratamiento",
        text: "Leville.net (CIF: 2965553-7)\nCentro de Levi, 99130 Sirkka, Finlandia\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Datos recopilados",
        text: "Solo recopilamos datos necesarios para procesar reservas: nombre, correo electrónico, teléfono y detalles de la reserva. Para las alertas de auroras boreales, almacenamos su correo electrónico."
      },
      {
        heading: "Finalidad del tratamiento",
        text: "Los datos se utilizan únicamente para procesar reservas, atención al cliente y envío de notificaciones solicitadas. No usamos datos para marketing sin consentimiento separado."
      },
      {
        heading: "Almacenamiento y seguridad",
        text: "Los datos se almacenan en servidores seguros dentro de la UE/EEE. La información de reservas se conserva según la legislación contable. El acceso está restringido al personal necesario."
      },
      {
        heading: "Cookies",
        text: "Usamos cookies de análisis (Google Analytics, Microsoft Clarity) para mejorar el sitio. Puede bloquear cookies en la configuración de su navegador."
      },
      {
        heading: "Sus derechos",
        text: "Tiene derecho a acceder, rectificar o solicitar la eliminación de sus datos. Contacte a info@leville.net."
      }
    ]
  },
  fr: {
    title: "Politique de confidentialité",
    metaTitle: "Politique de confidentialité | Leville.net",
    metaDescription: "Politique de confidentialité de Leville.net. Découvrez comment nous traitons vos données personnelles.",
    sections: [
      {
        heading: "Responsable du traitement",
        text: "Leville.net (SIRET : 2965553-7)\nCentre de Levi, 99130 Sirkka, Finlande\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Données collectées",
        text: "Nous collectons uniquement les données nécessaires au traitement des réservations : nom, email, téléphone et détails de réservation. Pour les alertes aurores boréales, nous conservons votre adresse email."
      },
      {
        heading: "Finalité du traitement",
        text: "Les données sont utilisées uniquement pour le traitement des réservations, le service client et l'envoi des notifications demandées. Nous n'utilisons pas les données à des fins marketing sans consentement séparé."
      },
      {
        heading: "Stockage et sécurité",
        text: "Les données sont stockées sur des serveurs sécurisés au sein de l'UE/EEE. Les informations de réservation sont conservées conformément à la législation comptable. L'accès est limité au personnel nécessaire."
      },
      {
        heading: "Cookies",
        text: "Nous utilisons des cookies d'analyse (Google Analytics, Microsoft Clarity) pour améliorer le site. Vous pouvez bloquer les cookies dans les paramètres de votre navigateur."
      },
      {
        heading: "Vos droits",
        text: "Vous avez le droit d'accéder, de rectifier ou de demander la suppression de vos données. Contactez info@leville.net."
      }
    ]
  },
  nl: {
    title: "Privacybeleid",
    metaTitle: "Privacybeleid | Leville.net",
    metaDescription: "Privacybeleid van Leville.net. Lees hoe wij uw persoonsgegevens verwerken.",
    sections: [
      {
        heading: "Verwerkingsverantwoordelijke",
        text: "Leville.net (KvK-nummer: 2965553-7)\nLevi Centrum, 99130 Sirkka, Finland\ninfo@leville.net\n+358 44 13 13 13"
      },
      {
        heading: "Verzamelde gegevens",
        text: "Wij verzamelen alleen gegevens die nodig zijn voor het verwerken van boekingen: naam, e-mail, telefoonnummer en boekingsgegevens. Voor noorderlichtmeldingen slaan wij uw e-mailadres op."
      },
      {
        heading: "Doel van de verwerking",
        text: "Gegevens worden uitsluitend gebruikt voor het verwerken van boekingen, klantenservice en het verzenden van gevraagde meldingen. Wij gebruiken gegevens niet voor marketing zonder aparte toestemming."
      },
      {
        heading: "Opslag en beveiliging",
        text: "Gegevens worden opgeslagen op beveiligde servers binnen de EU/EER. Boekingsinformatie wordt bewaard volgens de boekhoudwetgeving. Toegang is beperkt tot noodzakelijk personeel."
      },
      {
        heading: "Cookies",
        text: "Wij gebruiken analytische cookies (Google Analytics, Microsoft Clarity) om de website te verbeteren. U kunt cookies blokkeren in uw browserinstellingen."
      },
      {
        heading: "Uw rechten",
        text: "U hebt het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem contact op via info@leville.net."
      }
    ]
  }
};

const Tietosuoja = ({ lang = "fi" }: TietosuojaProps) => {
  const location = useLocation();
  const c = content[lang];

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href={`https://leville.net${routeConfig.privacyPolicy[lang]}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://leville.net${routeConfig.privacyPolicy[lang]}`} />
        <meta property="og:title" content={c.metaTitle} />
        <meta property="og:description" content={c.metaDescription} />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:locale" content={lang === "fi" ? "fi_FI" : lang === "en" ? "en_US" : lang === "sv" ? "sv_SE" : lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "nl" ? "nl_NL" : "fr_FR"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.metaTitle} />
        <meta name="twitter:description" content={c.metaDescription} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
      </Helmet>

      <SubpageBackground />
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs />
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 mt-6">
            {c.title}
          </h1>

          <div className="space-y-8">
            {c.sections.map((section, index) => (
              <section key={index} className="bg-card/50 rounded-xl p-6 border border-border/30">
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer lang={lang} />
      <WhatsAppChat lang={lang} />
      <StickyBookingBar lang={lang} />
    </>
  );
};

export default Tietosuoja;
