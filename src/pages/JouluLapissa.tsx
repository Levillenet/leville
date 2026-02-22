import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Snowflake, 
  Gift, 
  Star, 
  TreePine, 
  Sparkles, 
  Heart,
  ExternalLink,
  Camera,
  Moon,
  Bell,
  UtensilsCrossed
} from "lucide-react";
import { Link } from "react-router-dom";
import { Language } from "@/translations";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import OptimizedImage from "@/components/OptimizedImage";
import santaSitting from "@/assets/santa-sitting.jpg";
import santaWaving from "@/assets/santa-waving.png";
import santaCabin from "@/assets/santa-cabin.webp";
import christmasCozy from "@/assets/christmas-cozy.png";

interface JouluLapissakProps {
  lang?: Language;
}

const translations: Record<Language, {
  meta: { title: string; description: string; keywords: string; canonical: string };
  title: string;
  subtitle: string;
  intro: string;
  experiencesTitle: string;
  experiences: { title: string; description: string; icon: string }[];
  whyTitle: string;
  whyPoints: string[];
  tipsTitle: string;
  tips: { title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  backToLevi: string;
  linksTitle: string;
  santaHome: string;
  didYouKnow: string;
  didYouKnowText: string;
}> = {
  fi: {
    meta: {
      title: "Joulu Lapissa – Maaginen joulukokemus Levillä | Leville.net",
      description: "Koe ainutlaatuinen joulu Lapissa! Joulupukki, revontulet, porot ja luminen talvimaisema. Varaa joulumajoitus Levillä ajoissa.",
      keywords: "joulu Lapissa, joulu Levi, Levi joulupukki, Lappi joululoma, joulunvietto Lappi",
      canonical: "https://leville.net/levi/joulu-lapissa"
    },
    title: "Joulu Lapissa",
    subtitle: "Koe taianmainen joulu lumisessa Lapissa – joulupukin kotimaassa",
    intro: "Lappi on joulun synnyinpaikka, ja Levi tarjoaa täydellisen miljöön unohtumattomaan joulukokemukseen. Luminen maisema, revontulet, porot ja joulupukin läheisyys tekevät Levin joulusta ainutlaatuisen.",
    experiencesTitle: "Jouluiset elämykset Levillä",
    experiences: [
      { title: "Joulupukin tapaaminen", description: "Tapaa aito joulupukki Levin alueella. Lapset ja aikuiset pääsevät keskustelemaan joulupukin kanssa ja ottamaan kuvia tonttujen seurassa.", icon: "gift" },
      { title: "Poroajelut", description: "Perinteinen poroajelu lumisessa maisemassa on unohtumaton kokemus. Porot kuljettavat sinut hiljaisuuden keskelle Lapin luontoon.", icon: "star" },
      { title: "Revontulet", description: "Joulukuun pimeät yöt ovat erinomaista aikaa revontulten ihailuun. Aurora Borealis tuo taianomaisen lisän jouluun.", icon: "moon" },
      { title: "Huskyajelut", description: "Huskyvaljakkoajelut tarjoavat vauhdin ja seikkailun Lapin metsiin. Koirat vetävät sinut lumisen maiseman halki.", icon: "sparkles" },
      { title: "Joulusaunat", description: "Suomalainen sauna kuuluu jouluun. Majoituksissamme on omat saunat, joissa voit rentoutua joulupyhien aikana.", icon: "heart" },
      { title: "Talviaktiviteetit", description: "Laskettelu, hiihto, lumikenkailu ja moottorikelkkailu – Levillä on tekemistä koko perheelle joulunakin.", icon: "snowflake" }
    ],
    whyTitle: "Miksi viettää joulu Levillä?",
    whyPoints: [
      "Taattu lumi – Levillä on aina valkoinen joulu",
      "Joulupukin kotimaa – aitojen joulutraditioiden äärellä",
      "Revontulet – maaginen valoshow taivaalla",
      "Rauhallinen tunnelma – irti arjen kiireistä",
      "Aktiviteetteja kaikenikäisille – laskettelu, hiihto, porosafarit",
      "Laadukkaat majoitukset – kodikas jouluasunto Levin sydämessä"
    ],
    tipsTitle: "Vinkkejä joulun viettoon",
    tips: [
      { title: "Varaa ajoissa", text: "Joulusesonki on erittäin kysytty. Varaa majoitus vähintään 6–12 kuukautta etukäteen." },
      { title: "Pakkaa lämpimästi", text: "Joulukuussa lämpötila voi laskea jopa -35°C. Kerrokselliset vaatteet, villa-alusasu ja hyvät talvikengät ovat välttämättömät." },
      { title: "Varaudu pimeyteen", text: "Joulun aikaan päivä on lyhyt, mutta pimeys tuo esiin revontulet ja jouluvalot." }
    ],
    ctaTitle: "Varaa joulumajoituksesi",
    ctaText: "Joulukuu 2026 on nyt avattu myyntiin. Varaa ajoissa ja varmista unelmiesi joulukohde Levillä!",
    ctaButton: "Tutustu majoituksiin",
    backToLevi: "Takaisin Levi-sivulle",
    linksTitle: "Hyödyllisiä linkkejä",
    santaHome: "Joulupukin kotimaa",
    didYouKnow: "Tiesitkö?",
    didYouKnowText: "Joulupukin mökki löytyy Levin rinteiltä! Pääset sinne Levi Black gondolihissillä ja se on jännittävä retki koko perheelle."
  },
  en: {
    meta: {
      title: "Christmas in Lapland – Magical Holiday Experience in Levi | Leville.net",
      description: "Experience a unique Christmas in Lapland! Santa Claus, northern lights, reindeer and snowy winter landscapes. Book your Levi Christmas accommodation early.",
      keywords: "Christmas in Lapland, Christmas Levi, Levi Santa Claus, Lapland Christmas holiday, Christmas Finland",
      canonical: "https://leville.net/en/levi/christmas-in-lapland"
    },
    title: "Christmas in Lapland",
    subtitle: "Experience a magical Christmas in snowy Lapland – the home of Santa Claus",
    intro: "Lapland is the birthplace of Christmas, and Levi offers the perfect setting for an unforgettable Christmas experience. Snowy landscapes, northern lights, reindeer and the proximity of Santa Claus make Christmas in Levi truly unique.",
    experiencesTitle: "Christmas Experiences in Levi",
    experiences: [
      { title: "Meeting Santa Claus", description: "Meet the real Santa Claus in the Levi area. Children and adults can chat with Santa and take photos with his elves.", icon: "gift" },
      { title: "Reindeer Safaris", description: "A traditional reindeer ride through snowy landscapes is an unforgettable experience. Reindeer will take you into the peaceful Lapland nature.", icon: "star" },
      { title: "Northern Lights", description: "The dark nights of December are excellent for viewing the northern lights. Aurora Borealis adds a magical touch to Christmas.", icon: "moon" },
      { title: "Husky Safaris", description: "Husky sled rides offer speed and adventure into Lapland forests. Dogs pull you through the snowy landscape.", icon: "sparkles" },
      { title: "Christmas Saunas", description: "Finnish sauna is part of Christmas tradition. Our accommodations have private saunas where you can relax during the holidays.", icon: "heart" },
      { title: "Winter Activities", description: "Skiing, cross-country skiing, snowshoeing and snowmobiling – Levi has activities for the whole family even at Christmas.", icon: "snowflake" }
    ],
    whyTitle: "Why Spend Christmas in Levi?",
    whyPoints: [
      "Guaranteed snow – Levi always has a white Christmas",
      "Santa's homeland – authentic Christmas traditions",
      "Northern lights – magical light show in the sky",
      "Peaceful atmosphere – escape from everyday stress",
      "Activities for all ages – skiing, reindeer safaris, snowmobiling",
      "Quality accommodations – cozy Christmas apartment in Levi center"
    ],
    tipsTitle: "Tips for Your Christmas Visit",
    tips: [
      { title: "Book Early", text: "Christmas season is extremely popular. Book accommodation at least 6–12 months in advance." },
      { title: "Pack Warmly", text: "In December temperatures can drop to -35°C. Layered clothing, wool base layers and good winter boots are essential." },
      { title: "Embrace the Darkness", text: "During Christmas, daylight is short, but darkness reveals the northern lights and beautiful Christmas decorations." }
    ],
    ctaTitle: "Book Your Christmas Accommodation",
    ctaText: "December 2026 is now open for bookings. Book early and secure your dream Christmas destination in Levi!",
    ctaButton: "Browse accommodations",
    backToLevi: "Back to Levi page",
    linksTitle: "Useful Links",
    santaHome: "The home of Santa Claus",
    didYouKnow: "Did you know?",
    didYouKnowText: "Santa's cabin is located on the slopes of Levi! You can reach it by the Levi Black gondola lift – it's an exciting adventure for the whole family."
  },
  sv: {
    meta: {
      title: "Jul i Lappland – Magisk julupplevelse i Levi | Leville.net",
      description: "Upplev en unik jul i Lappland! Jultomten, norrsken, renar och snöiga vinterlandskap. Boka ditt julboende i Levi i god tid.",
      keywords: "jul i Lappland, jul Levi, Levi jultomten, Lappland julsemester, jul Finland",
      canonical: "https://leville.net/sv/levi/jul-i-lappland"
    },
    title: "Jul i Lappland",
    subtitle: "Upplev en magisk jul i snöiga Lappland – jultomtens hemland",
    intro: "Lappland är julens födelseplats, och Levi erbjuder den perfekta miljön för en oförglömlig julupplevelse. Snöiga landskap, norrsken, renar och närheten till jultomten gör julen i Levi verkligt unik.",
    experiencesTitle: "Julupplevelser i Levi",
    experiences: [
      { title: "Möt jultomten", description: "Möt den riktiga jultomten i Levi-området. Barn och vuxna kan prata med tomten och ta bilder med hans tomtenissar.", icon: "gift" },
      { title: "Rensafari", description: "En traditionell renfärd genom snöiga landskap är en oförglömlig upplevelse. Renarna tar dig in i den fridfulla lappländska naturen.", icon: "star" },
      { title: "Norrsken", description: "Decembers mörka nätter är utmärkta för att se norrsken. Aurora Borealis ger julen en magisk touch.", icon: "moon" },
      { title: "Huskysafari", description: "Hundspannsåkning erbjuder fart och äventyr in i Lapplands skogar. Hundarna drar dig genom det snöiga landskapet.", icon: "sparkles" },
      { title: "Julbastun", description: "Finsk bastu är en del av jultraditionen. Våra boenden har privata bastur där du kan koppla av under helgerna.", icon: "heart" },
      { title: "Vinteraktiviteter", description: "Skidåkning, längdskidåkning, snöskovandring och snöskoter – Levi har aktiviteter för hela familjen även under julen.", icon: "snowflake" }
    ],
    whyTitle: "Varför fira jul i Levi?",
    whyPoints: [
      "Garanterad snö – Levi har alltid en vit jul",
      "Jultomtens hemland – äkta jultraditioner",
      "Norrsken – magiskt ljusspel på himlen",
      "Fridfull atmosfär – bort från vardagens stress",
      "Aktiviteter för alla åldrar – skidåkning, rensafari, snöskoter",
      "Kvalitetsboenden – mysig jullägenhet i Levi centrum"
    ],
    tipsTitle: "Tips för ditt julbesök",
    tips: [
      { title: "Boka tidigt", text: "Julsäsongen är extremt populär. Boka boende minst 6–12 månader i förväg." },
      { title: "Packa varmt", text: "I december kan temperaturen sjunka till -35°C. Lagerkläder, ullunderkläder och bra vinterstövlar är nödvändiga." },
      { title: "Omfamna mörkret", text: "Under julen är dagljuset kort, men mörkret avslöjar norrskenet och vackra juldekorationer." }
    ],
    ctaTitle: "Boka ditt julboende",
    ctaText: "December 2026 är nu öppet för bokningar. Boka tidigt och säkra din drömjuldestination i Levi!",
    ctaButton: "Se boenden",
    backToLevi: "Tillbaka till Levi-sidan",
    linksTitle: "Användbara länkar",
    santaHome: "Jultomtens hemland",
    didYouKnow: "Visste du?",
    didYouKnowText: "Jultomtens stuga ligger på Levis backar! Du kan nå den med Levi Black gondolliften – det är ett spännande äventyr för hela familjen."
  },
  de: {
    meta: {
      title: "Weihnachten in Lappland – Magisches Weihnachtserlebnis in Levi | Leville.net",
      description: "Erleben Sie ein einzigartiges Weihnachten in Lappland! Weihnachtsmann, Nordlichter, Rentiere und verschneite Winterlandschaften. Buchen Sie Ihre Levi-Weihnachtsunterkunft frühzeitig.",
      keywords: "Weihnachten in Lappland, Weihnachten Levi, Levi Weihnachtsmann, Lappland Weihnachtsurlaub, Weihnachten Finnland",
      canonical: "https://leville.net/de/levi/weihnachten-in-lappland"
    },
    title: "Weihnachten in Lappland",
    subtitle: "Erleben Sie ein magisches Weihnachten im verschneiten Lappland – der Heimat des Weihnachtsmanns",
    intro: "Lappland ist der Geburtsort von Weihnachten, und Levi bietet die perfekte Kulisse für ein unvergessliches Weihnachtserlebnis. Verschneite Landschaften, Nordlichter, Rentiere und die Nähe zum Weihnachtsmann machen Weihnachten in Levi wirklich einzigartig.",
    experiencesTitle: "Weihnachtserlebnisse in Levi",
    experiences: [
      { title: "Den Weihnachtsmann treffen", description: "Treffen Sie den echten Weihnachtsmann in der Levi-Region. Kinder und Erwachsene können mit dem Weihnachtsmann plaudern und Fotos mit seinen Elfen machen.", icon: "gift" },
      { title: "Rentier-Safaris", description: "Eine traditionelle Rentierfahrt durch verschneite Landschaften ist ein unvergessliches Erlebnis. Rentiere bringen Sie in die friedliche lappländische Natur.", icon: "star" },
      { title: "Nordlichter", description: "Die dunklen Dezembernächte eignen sich hervorragend zur Beobachtung von Nordlichtern. Aurora Borealis verleiht Weihnachten eine magische Note.", icon: "moon" },
      { title: "Husky-Safaris", description: "Hundeschlittenfahrten bieten Tempo und Abenteuer in den lappländischen Wäldern. Die Hunde ziehen Sie durch die verschneite Landschaft.", icon: "sparkles" },
      { title: "Weihnachtssauna", description: "Die finnische Sauna gehört zur Weihnachtstradition. Unsere Unterkünfte haben private Saunen, in denen Sie während der Feiertage entspannen können.", icon: "heart" },
      { title: "Winteraktivitäten", description: "Skifahren, Langlauf, Schneeschuhwandern und Schneemobilfahren – Levi hat auch zu Weihnachten Aktivitäten für die ganze Familie.", icon: "snowflake" }
    ],
    whyTitle: "Warum Weihnachten in Levi verbringen?",
    whyPoints: [
      "Garantierter Schnee – Levi hat immer weiße Weihnachten",
      "Heimat des Weihnachtsmanns – authentische Weihnachtstraditionen",
      "Nordlichter – magische Lichtshow am Himmel",
      "Friedliche Atmosphäre – Flucht aus dem Alltagsstress",
      "Aktivitäten für alle Altersgruppen – Skifahren, Rentier-Safaris, Schneemobil",
      "Qualitätsunterkünfte – gemütliche Weihnachtswohnung im Zentrum von Levi"
    ],
    tipsTitle: "Tipps für Ihren Weihnachtsbesuch",
    tips: [
      { title: "Früh buchen", text: "Die Weihnachtssaison ist extrem beliebt. Buchen Sie Ihre Unterkunft mindestens 6–12 Monate im Voraus." },
      { title: "Warm einpacken", text: "Im Dezember können die Temperaturen auf -35°C sinken. Schichtkleidung, Wollunterwäsche und gute Winterstiefel sind unerlässlich." },
      { title: "Die Dunkelheit genießen", text: "Zu Weihnachten ist das Tageslicht kurz, aber die Dunkelheit enthüllt die Nordlichter und schöne Weihnachtsdekorationen." }
    ],
    ctaTitle: "Buchen Sie Ihre Weihnachtsunterkunft",
    ctaText: "Dezember 2026 ist jetzt buchbar. Buchen Sie frühzeitig und sichern Sie sich Ihr Traumweihnachtsziel in Levi!",
    ctaButton: "Unterkünfte ansehen",
    backToLevi: "Zurück zur Levi-Seite",
    linksTitle: "Nützliche Links",
    santaHome: "Die Heimat des Weihnachtsmanns",
    didYouKnow: "Wussten Sie?",
    didYouKnowText: "Die Hütte des Weihnachtsmanns befindet sich an den Hängen von Levi! Sie erreichen sie mit der Levi Black Gondelbahn – ein aufregendes Abenteuer für die ganze Familie."
  },
  es: {
    meta: {
      title: "Navidad en Laponia – Experiencia navideña mágica en Levi | Leville.net",
      description: "¡Vive una Navidad única en Laponia! Papá Noel, auroras boreales, renos y paisajes invernales nevados. Reserva tu alojamiento navideño en Levi con antelación.",
      keywords: "Navidad en Laponia, Navidad Levi, Levi Papá Noel, vacaciones Navidad Laponia, Navidad Finlandia",
      canonical: "https://leville.net/es/levi/navidad-en-laponia"
    },
    title: "Navidad en Laponia",
    subtitle: "Vive una Navidad mágica en la nevada Laponia – el hogar de Papá Noel",
    intro: "Laponia es la cuna de la Navidad, y Levi ofrece el escenario perfecto para una experiencia navideña inolvidable. Paisajes nevados, auroras boreales, renos y la cercanía de Papá Noel hacen que la Navidad en Levi sea verdaderamente única.",
    experiencesTitle: "Experiencias navideñas en Levi",
    experiences: [
      { title: "Conocer a Papá Noel", description: "Conoce al auténtico Papá Noel en la zona de Levi. Niños y adultos pueden charlar con Papá Noel y hacerse fotos con sus elfos.", icon: "gift" },
      { title: "Safari de renos", description: "Un paseo tradicional en reno por paisajes nevados es una experiencia inolvidable. Los renos te llevarán a la pacífica naturaleza lapona.", icon: "star" },
      { title: "Auroras boreales", description: "Las noches oscuras de diciembre son excelentes para ver auroras boreales. Aurora Borealis añade un toque mágico a la Navidad.", icon: "moon" },
      { title: "Safari de huskies", description: "Los paseos en trineo de huskies ofrecen velocidad y aventura en los bosques de Laponia. Los perros te arrastran por el paisaje nevado.", icon: "sparkles" },
      { title: "Saunas navideñas", description: "La sauna finlandesa forma parte de la tradición navideña. Nuestros alojamientos tienen saunas privadas donde puedes relajarte durante las fiestas.", icon: "heart" },
      { title: "Actividades de invierno", description: "Esquí, esquí de fondo, raquetas de nieve y moto de nieve – Levi tiene actividades para toda la familia incluso en Navidad.", icon: "snowflake" }
    ],
    whyTitle: "¿Por qué pasar la Navidad en Levi?",
    whyPoints: [
      "Nieve garantizada – Levi siempre tiene Navidad blanca",
      "El hogar de Papá Noel – tradiciones navideñas auténticas",
      "Auroras boreales – espectáculo de luces mágico en el cielo",
      "Atmósfera tranquila – escapar del estrés cotidiano",
      "Actividades para todas las edades – esquí, safari de renos, moto de nieve",
      "Alojamientos de calidad – acogedor apartamento navideño en el centro de Levi"
    ],
    tipsTitle: "Consejos para tu visita navideña",
    tips: [
      { title: "Reserva con antelación", text: "La temporada navideña es extremadamente popular. Reserva alojamiento con al menos 6–12 meses de antelación." },
      { title: "Abrígate bien", text: "En diciembre las temperaturas pueden bajar hasta -35°C. Ropa en capas, ropa interior de lana y buenas botas de invierno son esenciales." },
      { title: "Abraza la oscuridad", text: "Durante la Navidad, la luz del día es corta, pero la oscuridad revela las auroras boreales y las hermosas decoraciones navideñas." }
    ],
    ctaTitle: "Reserva tu alojamiento navideño",
    ctaText: "¡Diciembre 2026 ya está abierto para reservas! Reserva pronto y asegura tu destino navideño soñado en Levi.",
    ctaButton: "Ver alojamientos",
    backToLevi: "Volver a la página de Levi",
    linksTitle: "Enlaces útiles",
    santaHome: "El hogar de Papá Noel",
    didYouKnow: "¿Sabías que?",
    didYouKnowText: "¡La cabaña de Papá Noel está en las laderas de Levi! Puedes llegar con el teleférico Levi Black – es una aventura emocionante para toda la familia."
  },
  fr: {
    meta: {
      title: "Noël en Laponie – Expérience magique de Noël à Levi | Leville.net",
      description: "Vivez un Noël unique en Laponie ! Père Noël, aurores boréales, rennes et paysages enneigés. Réservez votre hébergement de Noël à Levi tôt.",
      keywords: "Noël en Laponie, Noël Levi, Levi Père Noël, vacances Noël Laponie, Noël Finlande",
      canonical: "https://leville.net/fr/levi/noel-en-laponie"
    },
    title: "Noël en Laponie",
    subtitle: "Vivez un Noël magique dans la Laponie enneigée – le pays du Père Noël",
    intro: "La Laponie est le berceau de Noël, et Levi offre le cadre parfait pour une expérience de Noël inoubliable. Paysages enneigés, aurores boréales, rennes et proximité du Père Noël font de Noël à Levi une expérience vraiment unique.",
    experiencesTitle: "Expériences de Noël à Levi",
    experiences: [
      { title: "Rencontrer le Père Noël", description: "Rencontrez le vrai Père Noël dans la région de Levi. Enfants et adultes peuvent discuter avec le Père Noël et prendre des photos avec ses lutins.", icon: "gift" },
      { title: "Safari en rennes", description: "Une promenade traditionnelle en renne à travers des paysages enneigés est une expérience inoubliable. Les rennes vous emmèneront dans la paisible nature lapone.", icon: "star" },
      { title: "Aurores boréales", description: "Les nuits sombres de décembre sont excellentes pour observer les aurores boréales. Aurora Borealis ajoute une touche magique à Noël.", icon: "moon" },
      { title: "Safari en huskies", description: "Les promenades en traîneau à huskies offrent vitesse et aventure dans les forêts de Laponie. Les chiens vous tirent à travers le paysage enneigé.", icon: "sparkles" },
      { title: "Saunas de Noël", description: "Le sauna finlandais fait partie de la tradition de Noël. Nos hébergements ont des saunas privés où vous pouvez vous détendre pendant les fêtes.", icon: "heart" },
      { title: "Activités d'hiver", description: "Ski, ski de fond, raquettes et motoneige – Levi a des activités pour toute la famille même à Noël.", icon: "snowflake" }
    ],
    whyTitle: "Pourquoi passer Noël à Levi ?",
    whyPoints: [
      "Neige garantie – Levi a toujours un Noël blanc",
      "Le pays du Père Noël – traditions de Noël authentiques",
      "Aurores boréales – spectacle de lumières magique dans le ciel",
      "Atmosphère paisible – échapper au stress quotidien",
      "Activités pour tous les âges – ski, safari en rennes, motoneige",
      "Hébergements de qualité – appartement de Noël confortable au centre de Levi"
    ],
    tipsTitle: "Conseils pour votre visite de Noël",
    tips: [
      { title: "Réservez tôt", text: "La saison de Noël est extrêmement populaire. Réservez votre hébergement au moins 6–12 mois à l'avance." },
      { title: "Habillez-vous chaudement", text: "En décembre, les températures peuvent descendre jusqu'à -35°C. Vêtements en couches, sous-vêtements en laine et bonnes bottes d'hiver sont essentiels." },
      { title: "Profitez de l'obscurité", text: "Pendant Noël, la lumière du jour est courte, mais l'obscurité révèle les aurores boréales et les belles décorations de Noël." }
    ],
    ctaTitle: "Réservez votre hébergement de Noël",
    ctaText: "Décembre 2026 est maintenant ouvert aux réservations. Réservez tôt et sécurisez votre destination de Noël de rêve à Levi !",
    ctaButton: "Voir les hébergements",
    backToLevi: "Retour à la page Levi",
    linksTitle: "Liens utiles",
    santaHome: "Le pays du Père Noël",
    didYouKnow: "Le saviez-vous ?",
    didYouKnowText: "La cabane du Père Noël se trouve sur les pentes de Levi ! Vous pouvez y accéder par le téléphérique Levi Black – c'est une aventure passionnante pour toute la famille."
  },
  nl: {
    meta: {
      title: "Kerst in Lapland – Magische kerstervaring in Levi | Leville.net",
      description: "Beleef een unieke kerst in Lapland! Kerstman, noorderlicht, rendieren en besneeuwde winterlandschappen. Boek je kerstaccommodatie in Levi op tijd.",
      keywords: "Kerst in Lapland, Kerst Levi, Levi Kerstman, Lapland kerstvakantie, Kerst Finland",
      canonical: "https://leville.net/nl/levi/kerst-in-lapland"
    },
    title: "Kerst in Lapland",
    subtitle: "Beleef een magische kerst in het besneeuwde Lapland – het thuisland van de Kerstman",
    intro: "Lapland is de geboorteplaats van Kerstmis, en Levi biedt het perfecte decor voor een onvergetelijke kerstervaring. Besneeuwde landschappen, noorderlicht, rendieren en de nabijheid van de Kerstman maken kerst in Levi werkelijk uniek.",
    experiencesTitle: "Kerstervaringen in Levi",
    experiences: [
      { title: "De Kerstman ontmoeten", description: "Ontmoet de echte Kerstman in het Levi-gebied. Kinderen en volwassenen kunnen met de Kerstman praten en foto's maken met zijn elfjes.", icon: "gift" },
      { title: "Rendiersafari", description: "Een traditionele rendierrit door besneeuwde landschappen is een onvergetelijke ervaring. Rendieren brengen je naar de vredige Laplandse natuur.", icon: "star" },
      { title: "Noorderlicht", description: "De donkere decembernachten zijn uitstekend voor het bekijken van noorderlicht. Aurora Borealis voegt een magisch tintje toe aan Kerstmis.", icon: "moon" },
      { title: "Huskysafari", description: "Hondesleeritjes bieden snelheid en avontuur in de bossen van Lapland. De honden trekken je door het besneeuwde landschap.", icon: "sparkles" },
      { title: "Kerstsauna", description: "De Finse sauna hoort bij de kersttraditie. Onze accommodaties hebben privésauna's waar je kunt ontspannen tijdens de feestdagen.", icon: "heart" },
      { title: "Winteractiviteiten", description: "Skiën, langlaufen, sneeuwschoenwandelen en sneeuwscooteren – Levi heeft activiteiten voor het hele gezin, ook met Kerst.", icon: "snowflake" }
    ],
    whyTitle: "Waarom Kerst vieren in Levi?",
    whyPoints: [
      "Gegarandeerde sneeuw – Levi heeft altijd een witte kerst",
      "Thuisland van de Kerstman – authentieke kerttradities",
      "Noorderlicht – magisch lichtspel aan de hemel",
      "Vredige sfeer – ontsnappen aan de dagelijkse stress",
      "Activiteiten voor alle leeftijden – skiën, rendiersafari, sneeuwscooter",
      "Kwaliteitsaccommodaties – gezellig kerstappartement in het centrum van Levi"
    ],
    tipsTitle: "Tips voor je kerstbezoek",
    tips: [
      { title: "Boek op tijd", text: "Het kerstseizoen is enorm populair. Boek accommodatie minstens 6–12 maanden van tevoren." },
      { title: "Kleed je warm", text: "In december kunnen temperaturen dalen tot -35°C. Laagjeskleding, wollen ondergoed en goede winterlaarzen zijn essentieel." },
      { title: "Omarm de duisternis", text: "Tijdens Kerst is het daglicht kort, maar de duisternis onthult het noorderlicht en prachtige kerstversieringen." }
    ],
    ctaTitle: "Boek je kerstaccommodatie",
    ctaText: "December 2026 is nu geopend voor boekingen. Boek vroeg en verzeker je droomkerstbestemming in Levi!",
    ctaButton: "Bekijk accommodaties",
    backToLevi: "Terug naar Levi-pagina",
    linksTitle: "Nuttige links",
    santaHome: "Het thuisland van de Kerstman",
    didYouKnow: "Wist je dat?",
    didYouKnowText: "De hut van de Kerstman bevindt zich op de hellingen van Levi! Je kunt er komen met de Levi Black gondellift – het is een spannend avontuur voor het hele gezin."
  }
};

const usefulLinks: Record<Language, { name: string; url: string }[]> = {
  fi: [
    { name: "Joulupukin Pajakylä", url: "https://santaclausvillage.info/fi/" },
    { name: "Levi.fi – Joulun tapahtumat", url: "https://www.levi.fi/" },
    { name: "Visit Finland – Joulu", url: "https://www.visitfinland.com/fi/" }
  ],
  en: [
    { name: "Santa Claus Village", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Christmas Events", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Christmas", url: "https://www.visitfinland.com/" }
  ],
  sv: [
    { name: "Jultomtens by", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Julevenemang", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Jul", url: "https://www.visitfinland.com/" }
  ],
  de: [
    { name: "Weihnachtsmanndorf", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Weihnachtsveranstaltungen", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Weihnachten", url: "https://www.visitfinland.com/" }
  ],
  es: [
    { name: "Aldea de Papá Noel", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Eventos navideños", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Navidad", url: "https://www.visitfinland.com/" }
  ],
  fr: [
    { name: "Village du Père Noël", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Événements de Noël", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Noël", url: "https://www.visitfinland.com/" }
  ],
  nl: [
    { name: "Dorp van de Kerstman", url: "https://santaclausvillage.info/" },
    { name: "Levi.fi – Kerstevenementen", url: "https://www.levi.fi/en" },
    { name: "Visit Finland – Kerst", url: "https://www.visitfinland.com/" }
  ]
};

// Internal link targets for experience cards (by icon key)
const experienceLinks: Record<Language, Record<string, string>> = {
  fi: {
    moon: "/revontulet",
    sparkles: "/aktiviteetit/koiravaljakkoajelu-levi",
    heart: "/opas/sauna-levilla",
    snowflake: "/aktiviteetit/parhaat-talviaktiviteetit-levi",
  },
  en: {
    moon: "/en/northern-lights",
    sparkles: "/activities/husky-safari-levi",
    heart: "/guide/finnish-sauna-in-levi",
    snowflake: "/activities/top-winter-activities-in-levi-lapland",
  },
  sv: { moon: "/sv/norrsken", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  de: { moon: "/de/nordlichter", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  es: { moon: "/es/auroras-boreales", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  fr: { moon: "/fr/aurores-boreales", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
  nl: { moon: "/nl/noorderlicht", sparkles: "/activities/husky-safari-levi", heart: "/guide/finnish-sauna-in-levi", snowflake: "/activities/top-winter-activities-in-levi-lapland" },
};

const readMoreLabels: Record<Language, string> = {
  fi: "Lue lisää",
  en: "Read more",
  sv: "Läs mer",
  de: "Mehr erfahren",
  es: "Leer más",
  fr: "En savoir plus",
  nl: "Lees meer",
};

const accommodationLinks: Record<Language, string> = {
  fi: "/majoitukset",
  en: "/en/accommodations",
  sv: "/sv/boenden",
  de: "/de/unterkuenfte",
  es: "/es/alojamientos",
  fr: "/fr/hebergements",
  nl: "/nl/accommodaties"
};

const leviLinks: Record<Language, string> = {
  fi: "/levi",
  en: "/en/levi",
  sv: "/sv/levi",
  de: "/de/levi",
  es: "/es/levi",
  fr: "/fr/levi",
  nl: "/nl/levi"
};

const localeMap: Record<Language, string> = {
  fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  star: Star,
  moon: Moon,
  sparkles: Sparkles,
  heart: Heart,
  snowflake: Snowflake
};

const JouluLapissa = ({ lang = "fi" }: JouluLapissakProps) => {
  const t = translations[lang];
  const links = usefulLinks[lang];
  const location = useLocation();

  return (
    <>
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <link rel="canonical" href={t.meta.canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:locale" content={localeMap[lang]} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": t.title + " - Levi",
            "description": t.meta.description,
            "url": t.meta.canonical,
            "touristType": ["Family", "Couples", "Adventure seekers"],
            "includesAttraction": [
              { "@type": "TouristAttraction", "name": t.experiences[0].title },
              { "@type": "TouristAttraction", "name": t.experiences[2].title },
              { "@type": "TouristAttraction", "name": t.experiences[1].title }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <SubpageBackground />
        
        {/* Floating Christmas Decorations */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <Snowflake className="absolute top-32 left-4 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 text-primary/40 animate-pulse" style={{ animationDelay: '0s' }} />
          <Bell className="absolute top-52 left-6 sm:left-16 w-5 h-5 sm:w-7 sm:h-7 text-amber-500/35 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-80 left-3 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 text-amber-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <Snowflake className="absolute top-[28rem] left-8 sm:left-20 w-5 h-5 sm:w-6 sm:h-6 text-primary/35 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <TreePine className="absolute top-[36rem] left-4 sm:left-12 w-6 h-6 sm:w-8 sm:h-8 text-green-500/25 animate-pulse" style={{ animationDelay: '2s' }} />
          <Bell className="absolute top-[48rem] left-6 sm:left-8 w-5 h-5 sm:w-6 sm:h-6 text-amber-500/30 animate-pulse" style={{ animationDelay: '2.5s' }} />
          
          <Star className="absolute top-40 right-4 sm:right-12 w-6 h-6 sm:w-8 sm:h-8 text-amber-400/35 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Snowflake className="absolute top-64 right-6 sm:right-8 w-5 h-5 sm:w-7 sm:h-7 text-primary/40 animate-pulse" style={{ animationDelay: '0.8s' }} />
          <Bell className="absolute top-96 right-4 sm:right-16 w-6 h-6 sm:w-7 sm:h-7 text-amber-500/30 animate-pulse" style={{ animationDelay: '1.3s' }} />
          <TreePine className="absolute top-[30rem] right-6 sm:right-10 w-6 h-6 sm:w-8 sm:h-8 text-green-500/25 animate-pulse" style={{ animationDelay: '1.8s' }} />
          <Snowflake className="absolute top-[42rem] right-8 sm:right-20 w-5 h-5 sm:w-6 sm:h-6 text-primary/35 animate-pulse" style={{ animationDelay: '2.3s' }} />
          <Star className="absolute top-[54rem] right-4 sm:right-8 w-6 h-6 sm:w-7 sm:h-7 text-amber-400/25 animate-pulse" style={{ animationDelay: '2.8s' }} />
        </div>
        
        <Header />
        <Breadcrumbs lang={lang} />
        
        <main className="pt-8 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="text-center mb-12 sm:mb-16 px-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Snowflake className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse" />
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60 absolute -top-2 -right-2" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                {t.subtitle}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t.intro}
              </p>
            </section>

            {/* Santa Image Section */}
            <section className="mb-12 sm:mb-16">
              <div className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto">
                <OptimizedImage 
                  src={santaSitting}
                  alt={t.santaHome}
                  className="w-full h-64 sm:h-80 md:h-96"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground font-medium text-center">
                    {t.santaHome}
                  </p>
                </div>
              </div>
            </section>

            {/* Christmas Dinner Guide Link */}
            <section className="mb-12 sm:mb-20">
              <Link to="/en/guide/christmas-dinner-in-levi" className="block">
                <Card className="glass-card border-primary/30 hover:border-primary/60 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-5 sm:p-7 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <UtensilsCrossed className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {lang === "fi" ? "Jouluillallinen Levillä – Ravintolat, menut ja mökkiin tilattavat ateriat" : lang === "sv" ? "Julmiddag i Levi – Restauranger, menyer och catering till stugan" : lang === "de" ? "Weihnachtsessen in Levi – Restaurants, Menüs & Lieferung zur Hütte" : lang === "es" ? "Cena de Navidad en Levi – Restaurantes, menús y catering" : lang === "fr" ? "Dîner de Noël à Levi – Restaurants, menus et livraison au chalet" : lang === "nl" ? "Kerstdiner in Levi – Restaurants, menu's en bezorging" : "Christmas Dinner in Levi – Restaurants, Menus & Cabin Delivery"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === "fi" ? "Kattava opas jouluaaton illallisvaihtoehtoihin Levillä. Ravintoloiden joulumenut, mökkiin tilattavat catering-ateriat ja käytännön vinkit varaamiseen." : lang === "sv" ? "Komplett guide till julaftonens middagsalternativ i Levi. Restaurangmenyer, catering och bokningstips." : lang === "de" ? "Kompletter Guide für das Weihnachtsessen in Levi. Restaurantmenüs, Catering und Buchungstipps." : lang === "es" ? "Guía completa de opciones de cena de Nochebuena en Levi. Menús, catering y consejos." : lang === "fr" ? "Guide complet des options de dîner du réveillon à Levi. Menus, traiteur et conseils." : lang === "nl" ? "Complete gids voor kerstdineropties in Levi. Restaurantmenu's, catering en boekingstips." : "Complete guide to Christmas Eve dining in Levi. Restaurant menus, cabin catering options, traditional Finnish Christmas food, and practical booking tips."}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-2">
                        {readMoreLabels[lang]} →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>

            {/* Christmas Experiences */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {t.experiencesTitle}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {t.experiences.map((exp, index) => {
                  const IconComponent = iconMap[exp.icon];
                  const linkTarget = experienceLinks[lang]?.[exp.icon];
                  const cardContent = (
                    <Card className={`glass-card border-border/30 hover:border-primary/50 transition-all duration-300 h-full ${linkTarget ? 'cursor-pointer group' : ''}`}>
                      <CardHeader className="p-4 sm:p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl text-foreground">{exp.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <p className="text-sm sm:text-base text-muted-foreground">{exp.description}</p>
                        {linkTarget && (
                          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3">
                            {readMoreLabels[lang]} →
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  );
                  return linkTarget ? (
                    <Link key={index} to={linkTarget} className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl">
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={index}>{cardContent}</div>
                  );
                })}
              </div>
            </section>

            {/* Why Levi Section */}
            <section className="mb-12 sm:mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    {t.whyTitle}
                  </h2>
                  <ul className="space-y-3">
                    {t.whyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <TreePine className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <OptimizedImage 
                    src={santaWaving}
                    alt={t.santaHome}
                    className="w-full h-64 sm:h-80"
                  />
                </div>
              </div>
            </section>

            {/* Santa's Cabin Section */}
            <section className="mb-12 sm:mb-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden">
                  <OptimizedImage 
                    src={santaCabin}
                    alt={t.didYouKnow}
                    className="w-full h-64 sm:h-80"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {t.didYouKnow}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t.didYouKnowText}
                  </p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                {t.tipsTitle}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {t.tips.map((tip, index) => (
                  <Card key={index} className="glass-card border-border/30">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                        <Camera className="w-5 h-5 text-primary" />
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-sm text-muted-foreground">{tip.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12 sm:mb-20">
              <Card className="glass-card border-primary/30 bg-primary/5 relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
                <div 
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    backgroundImage: `url(${christmasCozy})`,
                    backgroundSize: '55%',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    maskImage: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)',
                    WebkitMaskImage: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,1) 100%)',
                  }}
                />
                <CardContent className="p-6 sm:p-8 md:p-12 text-center relative z-10">
                  <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t.ctaTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                    {t.ctaText}
                  </p>
                  <Button asChild size="lg" className="text-sm sm:text-base">
                    <Link to={accommodationLinks[lang]}>
                      {t.ctaButton}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Useful Links */}
            <section className="mb-12 sm:mb-20 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">{t.linksTitle}</h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {links.map((link) => (
                  <Button key={link.name} asChild variant="secondary" className="text-xs sm:text-sm">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name} <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                    </a>
                  </Button>
                ))}
              </div>
            </section>

            {/* Back to Levi */}
            <section className="text-center">
              <Button asChild variant="outline">
                <Link to={leviLinks[lang]}>
                  ← {t.backToLevi}
                </Link>
              </Button>
            </section>
          </div>
        </main>
        
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default JouluLapissa;
