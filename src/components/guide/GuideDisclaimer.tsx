import { Info } from "lucide-react";
import { Language } from "@/translations";

interface GuideDisclaimerProps {
  lang?: Language;
}

const disclaimerText: Record<Language, string> = {
  fi: "Tämän sivun tiedot on tarkoitettu yleisiksi vinkeiksi ja inspiraatioksi Levi-lomasi suunnitteluun. Aktiviteettien saatavuus, hinnat, aukioloajat ja yritysten tiedot voivat muuttua ilman erillistä ilmoitusta. Suosittelemme tarkistamaan ajankohtaiset tiedot suoraan palveluntarjoajilta ennen varauksen tekemistä. Leville.net ei vastaa kolmansien osapuolien palveluista tai niiden muutoksista.",
  en: "The information on this page is intended as general tips and inspiration for planning your Levi holiday. Availability, prices, opening hours and business details may change without notice. We recommend verifying current information directly with service providers before making any bookings. Leville.net is not responsible for third-party services or any changes to their offerings.",
  sv: "Informationen på denna sida är avsedd som allmänna tips och inspiration för att planera din Levi-semester. Tillgänglighet, priser, öppettider och företagsuppgifter kan ändras utan förvarning. Vi rekommenderar att du kontrollerar aktuell information direkt hos tjänsteleverantörerna innan du bokar. Leville.net ansvarar inte för tredjepartstjänster eller eventuella ändringar.",
  de: "Die Informationen auf dieser Seite dienen als allgemeine Tipps und Inspiration für die Planung Ihres Levi-Urlaubs. Verfügbarkeit, Preise, Öffnungszeiten und Unternehmensangaben können sich ohne Vorankündigung ändern. Wir empfehlen, aktuelle Informationen direkt bei den Anbietern zu überprüfen, bevor Sie eine Buchung vornehmen. Leville.net ist nicht verantwortlich für Drittanbieterdienste oder deren Änderungen.",
  es: "La información de esta página está destinada a servir como consejos generales e inspiración para planificar tus vacaciones en Levi. La disponibilidad, los precios, los horarios y los datos de las empresas pueden cambiar sin previo aviso. Recomendamos verificar la información actualizada directamente con los proveedores de servicios antes de realizar cualquier reserva. Leville.net no se responsabiliza de los servicios de terceros ni de sus posibles cambios.",
  fr: "Les informations de cette page sont fournies à titre de conseils généraux et d'inspiration pour planifier vos vacances à Levi. La disponibilité, les prix, les horaires d'ouverture et les informations sur les entreprises peuvent changer sans préavis. Nous vous recommandons de vérifier les informations actuelles directement auprès des prestataires de services avant de réserver. Leville.net n'est pas responsable des services tiers ni de leurs modifications.",
  nl: "De informatie op deze pagina is bedoeld als algemene tips en inspiratie voor het plannen van je Levi-vakantie. Beschikbaarheid, prijzen, openingstijden en bedrijfsgegevens kunnen zonder voorafgaande kennisgeving wijzigen. We raden aan om actuele informatie rechtstreeks bij de dienstverleners te controleren voordat je een boeking maakt. Leville.net is niet verantwoordelijk voor diensten van derden of eventuele wijzigingen.",
};

const GuideDisclaimer = ({ lang = "fi" }: GuideDisclaimerProps) => {
  const text = disclaimerText[lang] || disclaimerText.en;

  return (
    <div className="mt-8 pt-4 pb-2 border-t border-border/20">
      <div className="flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground/70 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default GuideDisclaimer;
