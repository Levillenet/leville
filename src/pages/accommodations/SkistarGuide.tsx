import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import {
  Clock, Phone, Mail, Wifi, Droplets, Car, ShieldCheck,
  WashingMachine, Thermometer, Download, ArrowRight, Home, Users,
  Mountain, CheckCircle2, Volume2, Cigarette,
  Ruler, BedDouble, Lock, UtensilsCrossed, Snowflake, Package,
  Baby, DoorOpen, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import buildingExterior from "@/assets/skistar/building-exterior.jpg";
import livingKitchen from "@/assets/skistar/living-kitchen.jpg";
import studioKitchen from "@/assets/skistar/studio-kitchen.jpg";
import studioBedroom from "@/assets/skistar/studio-bedroom.jpg";
import bedroomDetail from "@/assets/skistar/bedroom-detail.jpg";
import bedroomPillows2br from "@/assets/skistar/bedroom-pillows-2br.jpg";

interface SkistarGuideProps {
  lang?: "fi" | "en";
}

const i18n = {
  en: {
    guestGuide: "GUEST GUIDE",
    h1: "Welcome to Skistar Apartments – Levi Centre",
    subtitle: "Your complete guide to our modern apartments on Postintie, right in the heart of Levi. Built in 2021, these state-of-the-art apartments feature underfloor geothermal heating, private saunas, and everything you need for an effortless Lapland holiday.",
    bookApartment: "Book an Apartment",
    downloadPdf: "Download PDF Guide",
    qiLocation: "Levi City Centre",
    qiType: "Studios to 2BR",
    qiSize: "24–54 m²",
    qiGuests: "1–6 Guests",
    qiSauna: "Private Sauna",
    qiWifi: "Free WiFi",
    navAbout: "About",
    navApartments: "Apartments",
    navCheckin: "Check-in",
    navKitchen: "Kitchen",
    navAmenities: "Amenities",
    navSauna: "Sauna",
    navRules: "Rules",
    navCheckout: "Checkout",
    navContact: "Contact",
    aboutTitle: "About Skistar Apartments",
    aboutP1: "Our Skistar apartments are located on Postintie in the centre of Levi, in a modern building completed in 2021. The building features state-of-the-art construction with geothermal underfloor heating throughout every room.",
    aboutP2: "We offer a range of apartment sizes — from compact 24m² studios perfect for couples, to spacious 54m² two-bedroom apartments that comfortably fit families or groups of up to 6. Most apartments include a private electric sauna, a balcony, and thoughtfully designed interiors that make your Lapland holiday feel like home.",
    aboutP3: "All services in Levi are within walking distance — the supermarket, restaurants, souvenir shops, front slopes and kids' land are just a few minutes on foot. The closest snowmobile track is approximately 200 metres away.",
    apartmentsTitle: "Our Apartments",
    studioTitle: "Studio (24–28 m²)",
    studioDesc: "Cosy studios for 1–3 guests. Open-plan layout with kitchen, sleeping area, bathroom, and most with a private sauna. Sofa bed for an extra guest. Perfect for couples or solo travellers.",
    studioApts: "Apartments: 102, 104, 319, 320, 321",
    studioBtn: "Book Now",
    oneBrTitle: "1-Bedroom Suite (43–44 m²)",
    oneBrDesc: "Comfortable apartments with a separate bedroom, living room with kitchen, sauna and bathroom. Sleeps 2 in the bedroom plus 1–2 on the sofa bed. Ideal for small families or couples who want more space.",
    oneBrApts: "Apartments: 209, 210",
    oneBrBtn: "Book Now",
    twoBrTitle: "2-Bedroom Suite (54 m²)",
    twoBrDesc: "Spacious apartments with 2 bedrooms, living room-kitchen, sauna, bathroom and balcony. Sleeps up to 6 guests. End apartments offer forest views and extra privacy. Great for families or groups of friends.",
    twoBrApts: "Apartments: 211, 212",
    twoBrBtn: "Book Now",
    apartmentsNote: "All apartments feature underfloor heating, fully equipped kitchen, private sauna (most apartments), free WiFi, and free parking. The interiors have been carefully designed with attention to comfort and Lappish atmosphere.",
    checkinTitle: "Arrival & Check-in",
    checkinLabel: "CHECK-IN",
    checkinTime: "From 5:00 PM",
    checkinDesc: "We prepare the apartment so that everything is ready from 5:00 PM onwards. You can arrive anytime during the evening. You will receive the door lock code by text message on the day of arrival.",
    checkoutLabel: "CHECK-OUT",
    checkoutTime: "By 11:00 AM",
    checkoutDesc: "Please follow the checkout instructions posted on the apartment door. A simple checklist helps you leave the apartment ready for the next guests.",
    doorLockTitle: "Door Lock",
    doorLockDesc: "The apartments use a code lock with small buttons built into the door handle — there is no physical key. Enter the code you receive by SMS directly on the small buttons on the handle to unlock. Important: the key box mounted next to the apartment door is for emergency use only and should not be used for regular entry.",
    infoSignTitle: "Info Sign on Your Door",
    infoSignDesc: "On your apartment door you will find an info sign with important details including the WiFi network name and password, your personal ski storage locker code, and other practical information.",
    parkingNote: "Parking lots 1–25 in the front yard are reserved for Skistar apartment guests. Choose any available spot.",
    wasteNote: "Waste Disposal: The waste bin is located in the front yard — exit through the main door, turn left, and walk about 30 metres. You'll see a large round container.",
    // Kitchen
    kitchenTitle: "The Kitchen",
    kitchenIntro: "Every apartment has a fully equipped kitchen with everything you need to cook meals during your stay. You'll often find basic spices, coffee, tea, cocoa and other dry ingredients left by previous guests — feel free to use everything. If you have leftover dry ingredients when you leave, you're welcome to leave them in the cupboard for the next guests.",
    kitchenListTitle: "Appliances & Cookware",
    kitchenItems: ["Refrigerator", "Oven & Stove", "Dishwasher", "Coffee Maker", "Microwave", "Electric Kettle", "Toaster", "Pots / Pans / Bakeware", "Dishes & Cutlery", "Variety of Glassware"],
    // Amenities
    amenitiesTitle: "Amenities & Building Facilities",
    amenHeatingTitle: "Geothermal Underfloor Heating",
    amenHeatingDesc: "The entire building is heated by geothermal energy through underfloor heating. Temperature is adjusted from the thermostat on the wall in each room. However, because the system heats the entire concrete floor mass, temperature changes happen very slowly — it can easily take several hours or even overnight for the temperature to adjust. If a previous guest preferred a cooler setting, it will take a long time for the temperature to rise back up. We recommend only making small adjustments to avoid cooling down the entire floor mass unnecessarily. If you're unsure, contact us and we'll help.",
    amenSaunaTitle: "Private Sauna",
    amenSaunaDesc: "Most apartments have their own private electric sauna — the perfect way to warm up after a day on the slopes or under the northern lights. If you're new to Finnish sauna culture, or want to get the most out of your sessions, check out our complete guide.",
    amenSaunaLink: "Read our Sauna Guide →",
    amenLaundryTitle: "Laundry Room",
    amenLaundryDesc: "The building has a shared laundry room with washing machines and a dryer in the basement. Some apartments also have their own washing machine in the bathroom. The drying cabinet is designed for drying outdoor clothes and works best at 40°C for about one hour. A drying rack is also available for regular laundry.",
    amenStorageTitle: "Storage & Ski Maintenance",
    amenStorageDesc: "In the basement you'll find storage rooms for luggage, bicycles, skis and other equipment you may have with you. The ski maintenance room has a rack and ventilation — perfect for waxing and tuning your skis. Each storage locker is numbered to match your apartment. You'll find the lock code for your storage locker on the info sign posted on your apartment door.",
    amenWaterTitle: "Tap Water",
    amenWaterDesc: "Lapland tap water comes straight from the fells. It's exceptionally clean, cold and fresh — drink it straight from the tap without any worries.",
    amenParkingTitle: "Free Parking",
    amenParkingDesc: "Parking lots 1–25 in the front yard are reserved for Skistar apartment guests. Choose any available spot.",
    amenWifiTitle: "Free WiFi",
    amenWifiDesc: "High-speed WiFi is available throughout the building. You'll find the network name and password on the info sign posted on your apartment door.",
    amenFamilyTitle: "Family Friendly",
    amenFamilyDesc: "Cribs and high chairs are available on request. Let us know in advance if you need them set up for your arrival.",
    // Sauna section
    saunaTitle: "The Finnish Sauna Experience",
    saunaText: "A private sauna is one of the highlights of staying in a Finnish apartment. Whether you're a first-timer or a seasoned sauna-goer, we've written a complete guide covering etiquette, temperatures, and tips for an authentic Finnish sauna experience.",
    saunaCta: "Read Our Sauna Guide",
    // House Rules
    rulesTitle: "House Rules",
    ruleSmokingTitle: "No Smoking",
    ruleSmokingDesc: "No smoking or vaping inside the building. Please use the designated smoking area outside and the ashtray provided.",
    ruleQuietTitle: "Quiet Time from 11 PM",
    ruleQuietDesc: "Quiet hours begin at 11:00 PM. Please — no excessive noise, loud music or rowdy behaviour. This is a shared building and disturbances to neighbours will not be tolerated.",
    ruleDamageTitle: "Damage",
    ruleDamageDesc: "Please report any damage or malfunction to us immediately so we can repair or replace items quickly. A damage deposit of up to €300 may apply.",
    ruleEmergencyTitle: "Emergencies",
    ruleEmergencyDesc: "In case of emergency, call 112 (Finnish emergency number). Fire extinguishers and a fire blanket are located in the hallway cabinet. For non-urgent issues, contact us at +358 44 13 13 13 or info@leville.net.",
    // Checkout checklist
    checkoutTitle: "Before You Go – Checkout Checklist",
    checkoutIntro: "Please complete these simple steps before leaving by 11:00 AM. The checkout instructions are also posted on the apartment door.",
    checkoutItems: [
      "Linens: Leave beds unmade. Place used towels and dishcloths in the hallway.",
      "Dishes: Rinse dishes and load the dishwasher. Please start the dishwasher before you leave.",
      "Food: Empty the fridge and cupboards of all open and perishable food. Dry ingredients and unopened items can stay.",
      "Waste: Take your rubbish to the large round waste container in the front yard — exit the main door, turn left, approximately 30 metres.",
      "Lights & Electronics: Make sure all lights, appliances and electronics are switched off.",
      "Windows & Doors: Check that all windows and doors are properly closed and locked.",
      "Door: The door locks automatically when you close it. Simply pull the door shut when you leave.",
    ],
    // Contact
    contactTitle: "Need Anything During Your Stay?",
    contactNote: "Whether it's a maintenance issue, a question about Levi, or you've run out of toilet paper or dishwashing detergent — just send us a message and we'll take care of it.",
    ctaBrowse: "Browse All Our Accommodations",
    ctaGuide: "Explore Levi Travel Guide",
    readNext: "Read Next",
    readSauna: "Finnish Sauna Guide",
    readRestaurants: "Restaurants & Dining in Levi",
    readTravel: "How to Get to Levi",
    metaTitle: "Skistar Apartments Guest Guide – Modern Apartments in Levi Centre | Leville.net",
    metaDesc: "Guest guide for Leville.net Skistar apartments in Levi centre. Studios and 1–2 bedroom apartments built in 2021 with private sauna, underfloor heating and ski storage. Check-in info, amenities, house rules.",
  },
  fi: {
    guestGuide: "VIERASOPAS",
    h1: "Tervetuloa Skistar-huoneistoihin – Levin keskustassa",
    subtitle: "Täydellinen opas moderneihin huoneistoihimme Postintiellä, aivan Levin sydämessä. Vuonna 2021 rakennetut huoneistot tarjoavat maalämpöisen lattialämmityksen, omat saunat ja kaiken tarvittavan vaivattomaan Lapin lomaan.",
    bookApartment: "Varaa huoneisto",
    downloadPdf: "Lataa PDF-opas",
    qiLocation: "Levin keskusta",
    qiType: "Studiot – 2h+k",
    qiSize: "24–54 m²",
    qiGuests: "1–6 vierasta",
    qiSauna: "Oma sauna",
    qiWifi: "Ilmainen WiFi",
    navAbout: "Tietoa",
    navApartments: "Huoneistot",
    navCheckin: "Saapuminen",
    navKitchen: "Keittiö",
    navAmenities: "Varusteet",
    navSauna: "Sauna",
    navRules: "Säännöt",
    navCheckout: "Lähtö",
    navContact: "Yhteystiedot",
    aboutTitle: "Tietoa Skistar-huoneistoista",
    aboutP1: "Skistar-huoneistomme sijaitsevat Postintiellä Levin keskustassa, vuonna 2021 valmistuneessa modernissa rakennuksessa. Rakennus on varustettu maalämpöisellä lattialämmityksellä kaikissa tiloissa.",
    aboutP2: "Tarjoamme erikokoisia huoneistoja — kompakteista 24 m² studioista tilaville 54 m² kahden makuuhuoneen huoneistoihin, joihin mahtuu mukavasti perhe tai jopa 6 hengen ryhmä. Useimmissa huoneistoissa on oma sähkösauna, parveke ja huolella suunniteltu sisustus.",
    aboutP3: "Kaikki Levin palvelut ovat kävelymatkan päässä — kauppa, ravintolat, matkamuistomyymälät, eturinteet ja lastenalue ovat vain muutaman minuutin kävelyn päässä. Lähin moottorikelkkareitti on noin 200 metrin päässä.",
    apartmentsTitle: "Huoneistomme",
    studioTitle: "Studio (24–28 m²)",
    studioDesc: "Viihtyisät studiot 1–3 hengelle. Avoin pohjaratkaisu keittiöllä, nukkuma-alueella, kylpyhuoneella ja useimmissa oma sauna. Vuodesohva lisävieraalle. Täydellinen pareille tai yksinmatkaaville.",
    studioApts: "Huoneistot: 102, 104, 319, 320, 321",
    studioBtn: "Varaa nyt",
    oneBrTitle: "1 makuuhuone (43–44 m²)",
    oneBrDesc: "Mukavat huoneistot erillisellä makuuhuoneella, olohuone-keittiöllä, saunalla ja kylpyhuoneella. Makuuhuoneessa nukkuu 2 + vuodesohvalla 1–2. Ihanteellinen pienille perheille tai pareille, jotka haluavat enemmän tilaa.",
    oneBrApts: "Huoneistot: 209, 210",
    oneBrBtn: "Varaa nyt",
    twoBrTitle: "2 makuuhuonetta (54 m²)",
    twoBrDesc: "Tilavat huoneistot kahdella makuuhuoneella, olohuone-keittiöllä, saunalla, kylpyhuoneella ja parvekkeella. Nukkuu jopa 6 vierasta. Päätyhuoneistoissa metsänäkymät ja enemmän yksityisyyttä. Loistava perheille tai ystäväporukoille.",
    twoBrApts: "Huoneistot: 211, 212",
    twoBrBtn: "Varaa nyt",
    apartmentsNote: "Kaikissa huoneistoissa on lattialämmitys, täysin varustettu keittiö, oma sauna (useimmissa), ilmainen WiFi ja ilmainen pysäköinti. Sisustus on suunniteltu huolella mukavuutta ja lappilaista tunnelmaa ajatellen.",
    checkinTitle: "Saapuminen & Check-in",
    checkinLabel: "SAAPUMINEN",
    checkinTime: "Klo 17:00 alkaen",
    checkinDesc: "Valmistelemme huoneiston siten, että kaikki on valmiina klo 17:00 alkaen. Voit saapua milloin tahansa illan aikana. Saat ovikoodin tekstiviestillä saapumispäivänä.",
    checkoutLabel: "LÄHTÖ",
    checkoutTime: "Klo 11:00 mennessä",
    checkoutDesc: "Seuraa huoneiston oveen kiinnitettyä lähtöohjetta. Yksinkertainen muistilista auttaa jättämään huoneiston valmiiksi seuraavalle vieraalle.",
    doorLockTitle: "Ovien lukitus",
    doorLockDesc: "Huoneistoissa on koodilukko, jossa pienet painikkeet oven kahvassa — fyysistä avainta ei ole. Syötä saamasi koodin suoraan kahvan painikkeisiin. Tärkeää: oven vieressä oleva avainlipas on vain hätäkäyttöön eikä sitä saa käyttää normaaliin kulkuun.",
    infoSignTitle: "Infotaulu ovellasi",
    infoSignDesc: "Huoneistosi ovessa on infotaulu, josta löydät tärkeät tiedot: WiFi-verkon nimen ja salasanan, henkilökohtaisen suksivaraston koodin sekä muita käytännön tietoja.",
    parkingNote: "Pysäköintipaikat 1–25 etupihalla on varattu Skistar-huoneistojen vieraille. Valitse vapaa paikka.",
    wasteNote: "Jätehuolto: Jäteastia sijaitsee etupihalla — poistu pääovesta, käänny vasemmalle ja kävele noin 30 metriä. Näet pyöreän jätesäiliön.",
    kitchenTitle: "Keittiö",
    kitchenIntro: "Jokaisessa huoneistossa on täysin varustettu keittiö, jossa on kaikki tarvittava ruoanlaittoon loman aikana. Kaapista löytyy usein perusmausteet, kahvia, teetä, kaakaota ja muita kuivatuotteita, jotka edelliset vieraat ovat jättäneet — voit vapaasti käyttää kaikkea. Jos sinulle jää kuivatuotteita loman päättyessä, voit jättää ne kaappiin seuraavia vieraita varten.",
    kitchenListTitle: "Laitteet ja keittiövarusteet",
    kitchenItems: ["Jääkaappi", "Uuni ja liesi", "Astianpesukone", "Kahvinkeitin", "Mikroaaltouuni", "Vedenkeitin", "Leivänpaahdin", "Kattilat / pannut / uunivuoat", "Astiat ja aterimet", "Erilaisia laseja"],
    amenitiesTitle: "Varusteet ja talon palvelut",
    amenHeatingTitle: "Maalämpö ja lattialämmitys",
    amenHeatingDesc: "Koko rakennus lämpiää maalämmöllä lattialämmityksen kautta. Lämpötilaa säädetään kunkin huoneen seinällä olevasta termostaatista. Koska järjestelmä lämmittää koko betonilaatan, lämpötilamuutokset tapahtuvat hyvin hitaasti — voi helposti kestää useita tunteja tai jopa yön yli, ennen kuin lämpötila mukautuu. Jos edellinen vieras piti viileämpää asetusta, lämpötilan nousu kestää kauan. Suosittelemme vain pieniä säätöjä, jotta lattiamassan turhalta viilentämiseltä vältytään. Jos olet epävarma, ota meihin yhteyttä niin autamme.",
    amenSaunaTitle: "Oma sauna",
    amenSaunaDesc: "Useimmissa huoneistoissa on oma sähkösauna — täydellinen tapa lämmetä rinteiden tai revontulten jälkeen. Jos olet ensikertalainen tai haluat saada saunakokemuksestasi kaiken irti, tutustu täydelliseen oppaaseemme.",
    amenSaunaLink: "Lue saunaopas →",
    amenLaundryTitle: "Pesutupa",
    amenLaundryDesc: "Talon kellarikkerroksessa on yhteinen pesutupa pesukoneilla ja kuivausrummulla. Osassa huoneistoja on myös oma pesukone kylpyhuoneessa. Kuivauskaappi on tarkoitettu ulkovaatteiden kuivaamiseen ja toimii parhaiten 40°C:ssa noin tunnin ajan. Tavallisille vaatteille on myös kuivausteline.",
    amenStorageTitle: "Säilytys ja suksihuolto",
    amenStorageDesc: "Kellarissa on säilytystilat matkatavaroille, polkupyörille, suksille ja muille varusteille. Suksihuoltotilassa on teline ja tuuletus — täydellinen voiteluun ja virittelyyn. Jokainen säilytyskaappi on numeroitu huoneiston mukaan. Kaapin koodin löydät huoneistosi oven infotaulusta.",
    amenWaterTitle: "Hanavesi",
    amenWaterDesc: "Lapin hanavesi tulee suoraan tuntureilta. Se on poikkeuksellisen puhdasta, kylmää ja raikasta — juo sitä suoraan hanasta huoletta.",
    amenParkingTitle: "Ilmainen pysäköinti",
    amenParkingDesc: "Pysäköintipaikat 1–25 etupihalla on varattu Skistar-huoneistojen vieraille. Valitse vapaa paikka.",
    amenWifiTitle: "Ilmainen WiFi",
    amenWifiDesc: "Nopea WiFi on käytettävissä koko rakennuksessa. Verkon nimen ja salasanan löydät huoneistosi oven infotaulusta.",
    amenFamilyTitle: "Lapsiystävällinen",
    amenFamilyDesc: "Pinnasänkyjä ja syöttötuoleja on saatavilla pyydettäessä. Ilmoita meille etukäteen, jos tarvitset ne valmiiksi saapuessasi.",
    saunaTitle: "Suomalainen saunaelämys",
    saunaText: "Oma sauna on yksi suomalaisen huoneistoloman kohokohdista. Olitpa ensikertalainen tai kokenut saunoja, olemme kirjoittaneet täydellisen oppaan saunaetiketistä, lämpötiloista ja vinkeistä aitoon saunakokemukseen.",
    saunaCta: "Lue saunaopas",
    rulesTitle: "Järjestyssäännöt",
    ruleSmokingTitle: "Tupakointi kielletty",
    ruleSmokingDesc: "Tupakointi ja sähkötupakka ovat kiellettyjä rakennuksen sisällä. Käytä ulkona olevaa tupakointipaikkaa ja tuhkakuppia.",
    ruleQuietTitle: "Hiljaisuus klo 23 alkaen",
    ruleQuietDesc: "Hiljaisuus alkaa klo 23:00. Vältä liiallista melua, kovaa musiikkia ja häiriökäyttäytymistä. Tämä on kerrostalo ja naapurien häiritsemistä ei suvaita.",
    ruleDamageTitle: "Vahingot",
    ruleDamageDesc: "Ilmoita mahdollisista vahingoista tai toimintahäiriöistä meille välittömästi, jotta voimme korjata tai korvata nopeasti. Vahinkotakuu on enintään 300 €.",
    ruleEmergencyTitle: "Hätätilanteet",
    ruleEmergencyDesc: "Hätätapauksessa soita 112. Sammuttimet ja sammutuspeitto löytyvät käytävän kaapista. Ei-kiireellisissä asioissa ota yhteyttä numeroon +358 44 13 13 13 tai info@leville.net.",
    checkoutTitle: "Ennen lähtöä – Lähtömuistilista",
    checkoutIntro: "Tee nämä yksinkertaiset toimenpiteet ennen lähtöä klo 11:00 mennessä. Lähtöohjeet ovat myös huoneiston ovessa.",
    checkoutItems: [
      "Liinavaatteet: Jätä vuoteet petaamatta. Laita käytetyt pyyhkeet ja keittiöpyyhkeet käytävään.",
      "Astiat: Huuhtele astiat ja lataa astianpesukone. Käynnistä astianpesukone ennen lähtöä.",
      "Ruoat: Tyhjennä jääkaappi ja kaapit kaikista avoimista ja pilaantuvista ruoista. Kuivatuotteet ja avaamattomat pakkaukset voivat jäädä.",
      "Jätteet: Vie roskat etupihan pyöreään jäteastiaan — poistu pääovesta, käänny vasemmalle, noin 30 metriä.",
      "Valot ja elektroniikka: Varmista, että kaikki valot, laitteet ja elektroniikka on sammutettu.",
      "Ikkunat ja ovet: Tarkista, että kaikki ikkunat ja ovet ovat kunnolla kiinni ja lukittu.",
      "Ovi: Ovi lukittuu automaattisesti, kun vedät sen kiinni. Sulje ovi vetämällä se perässäsi.",
    ],
    contactTitle: "Tarvitsetko jotain loman aikana?",
    contactNote: "Olipa kyseessä huoltoasia, kysymys Levistä tai vessapaperi loppunut — lähetä meille viesti ja hoidamme asian.",
    ctaBrowse: "Selaa kaikkia majoituksiamme",
    ctaGuide: "Tutustu Levi-oppaaseen",
    readNext: "Lue seuraavaksi",
    readSauna: "Saunaopas",
    readRestaurants: "Ravintolat ja ruokailu Levillä",
    readTravel: "Näin pääset Leville",
    metaTitle: "Skistar-huoneistojen vierasopas – Modernit huoneistot Levin keskustassa | Leville.net",
    metaDesc: "Vierasopas Leville.net Skistar-huoneistoihin Levin keskustassa. Studiot ja 1–2 makuuhuoneen huoneistot, rakennettu 2021, oma sauna, lattialämmitys ja suksivarasto.",
  },
};

const allSections = (t: typeof i18n.en) => [
  { id: "about", label: t.navAbout },
  { id: "apartments", label: t.navApartments },
  { id: "check-in", label: t.navCheckin },
  { id: "kitchen", label: t.navKitchen },
  { id: "amenities", label: t.navAmenities },
  { id: "sauna", label: t.navSauna },
  { id: "rules", label: t.navRules },
  { id: "checkout", label: t.navCheckout },
  { id: "contact", label: t.navContact },
];

const SkistarGuide = ({ lang = "en" }: SkistarGuideProps) => {
  const t = i18n[lang];
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);

  const canonicalUrl = lang === "en"
    ? "https://leville.net/accommodations/guides/skistar-apartments"
    : "https://leville.net/majoitukset/oppaat/skistar-huoneistot";

  const accomLink = lang === "fi" ? "/majoitukset" : "/en/accommodations";

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 400);
      const secs = allSections(t);
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(secs[i].id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Skistar Apartments Guest Guide – Modern Apartments in Levi Centre",
    description: t.metaDesc,
    author: { "@type": "Organization", name: "Leville.net" },
    publisher: { "@type": "Organization", name: "Leville.net" },
    datePublished: "2025-06-01",
    dateModified: "2026-03-03",
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "fi" ? "Etusivu" : "Home", item: `https://leville.net${lang === "fi" ? "" : "/en"}` },
      { "@type": "ListItem", position: 2, name: lang === "fi" ? "Majoitukset" : "Accommodations", item: `https://leville.net${accomLink}` },
      { "@type": "ListItem", position: 3, name: lang === "fi" ? "Oppaat" : "Guides", item: `https://leville.net${lang === "fi" ? "/majoitukset/oppaat" : "/accommodations/guides"}` },
      { "@type": "ListItem", position: 4, name: "Skistar Apartments", item: canonicalUrl },
    ],
  };

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Leville.net Skistar Apartments",
    description: t.metaDesc,
    url: "https://leville.net/accommodations/guides/skistar-apartments",
    telephone: "+35844131313",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Postintie",
      addressLocality: "Kittilä",
      addressRegion: "Lapland",
      postalCode: "99130",
      addressCountry: "FI",
    },
    geo: { "@type": "GeoCoordinates", latitude: 67.8039, longitude: 24.8141 },
    petsAllowed: false,
    amenityFeature: [
      "Electric Sauna", "Free WiFi", "Free Parking", "Full Kitchen",
      "Underfloor Heating", "Geothermal Heating", "Ski Storage",
      "Ski Maintenance Room", "Laundry Room", "Drying Cabinet",
      "Balcony", "Dishwasher", "Crib", "High Chair", "Iron",
      "Hair Dryer", "Smoke Alarm",
    ].map((f) => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
  };

  const quickInfo = [
    { icon: Mountain, label: t.qiLocation },
    { icon: Home, label: t.qiType },
    { icon: Ruler, label: t.qiSize },
    { icon: Users, label: t.qiGuests },
    { icon: Snowflake, label: t.qiSauna },
    { icon: Wifi, label: t.qiWifi },
  ];

  const apartmentTypes = [
    { title: t.studioTitle, desc: t.studioDesc, apts: t.studioApts, btn: t.studioBtn, icon: BedDouble, img: studioBedroom },
    { title: t.oneBrTitle, desc: t.oneBrDesc, apts: t.oneBrApts, btn: t.oneBrBtn, icon: Home, img: bedroomDetail },
    { title: t.twoBrTitle, desc: t.twoBrDesc, apts: t.twoBrApts, btn: t.twoBrBtn, icon: Users, img: bedroomPillows2br },
  ];

  const amenities = [
    { icon: Thermometer, title: t.amenHeatingTitle, desc: t.amenHeatingDesc },
    { icon: Snowflake, title: t.amenSaunaTitle, desc: t.amenSaunaDesc, link: { text: t.amenSaunaLink, to: "/sauna" } },
    { icon: WashingMachine, title: t.amenLaundryTitle, desc: t.amenLaundryDesc },
    { icon: Package, title: t.amenStorageTitle, desc: t.amenStorageDesc },
    { icon: Droplets, title: t.amenWaterTitle, desc: t.amenWaterDesc },
    { icon: Car, title: t.amenParkingTitle, desc: t.amenParkingDesc },
    { icon: Wifi, title: t.amenWifiTitle, desc: t.amenWifiDesc },
    { icon: Baby, title: t.amenFamilyTitle, desc: t.amenFamilyDesc },
  ];

  const houseRules = [
    { icon: Cigarette, title: t.ruleSmokingTitle, desc: t.ruleSmokingDesc },
    { icon: Volume2, title: t.ruleQuietTitle, desc: t.ruleQuietDesc },
    { icon: ShieldCheck, title: t.ruleDamageTitle, desc: t.ruleDamageDesc },
    { icon: Phone, title: t.ruleEmergencyTitle, desc: t.ruleEmergencyDesc },
  ];

  const readNextLinks = [
    { to: "/sauna", label: t.readSauna },
    { to: "/guide/restaurants-and-services-in-levi", label: t.readRestaurants },
    { to: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", label: t.readTravel },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9F6F1" }}>
      <SeoMeta
        title={t.metaTitle}
        description={t.metaDesc}
        canonicalUrl={canonicalUrl}
        lang={lang}
        ogType="article"
      />
      <Helmet>
        <link rel="alternate" hrefLang="en" href="https://leville.net/accommodations/guides/skistar-apartments" />
        <link rel="alternate" hrefLang="fi" href="https://leville.net/majoitukset/oppaat/skistar-huoneistot" />
        <link rel="alternate" hrefLang="x-default" href="https://leville.net/accommodations/guides/skistar-apartments" />
      </Helmet>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={lodgingSchema} />

      <Header />

      {/* Sticky Jump Nav */}
      {showNav && (
        <nav className="fixed top-16 sm:top-20 left-0 right-0 z-40 border-b shadow-sm" style={{ backgroundColor: "#F9F6F1", borderColor: "#E8E0D4" }}>
          <div className="container mx-auto px-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 py-2 min-w-max">
              {allSections(t).map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    activeSection === s.id ? "text-white" : "hover:bg-[#E8E0D4]"
                  }`}
                  style={activeSection === s.id ? { backgroundColor: "#B8860B", color: "#fff" } : { color: "#2D2D2D" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src={buildingExterior} alt="Skistar Apartments building exterior in winter" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,45,45,0.75) 0%, rgba(45,45,45,0.4) 100%)" }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-xs tracking-[0.3em] font-medium mb-4 block" style={{ color: "#B8860B" }}>{t.guestGuide}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.h1}</h1>
          <p className="text-base sm:text-lg text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
              <Link to={accomLink}>{t.bookApartment} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 px-8">
              <a href="#" /* Replace with actual PDF URL */><Download className="mr-2 w-4 h-4" /> {t.downloadPdf}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section className="border-b" style={{ backgroundColor: "#2D2D2D", borderColor: "#444" }}>
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {quickInfo.map((qi) => (
              <div key={qi.label} className="flex flex-col items-center gap-1.5">
                <qi.icon className="w-5 h-5" style={{ color: "#B8860B" }} />
                <span className="text-xs sm:text-sm font-medium text-white/90">{qi.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>{t.aboutTitle}</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={livingKitchen} alt="Skistar apartment living room and kitchen" className="w-full h-80 object-cover" />
            </div>
            <div className="space-y-4" style={{ color: "#2D2D2D" }}>
              <p className="leading-relaxed">{t.aboutP1}</p>
              <p className="leading-relaxed">{t.aboutP2}</p>
              <p className="leading-relaxed">{t.aboutP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENTS */}
      <section id="apartments" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>{t.apartmentsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {apartmentTypes.map((apt) => (
              <div key={apt.title} className="rounded-xl overflow-hidden shadow-md border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
                <img src={apt.img} alt={apt.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <apt.icon className="w-5 h-5" style={{ color: "#B8860B" }} />
                    <h3 className="text-lg font-bold" style={{ color: "#2D2D2D" }}>{apt.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>{apt.desc}</p>
                  <p className="text-xs font-medium mb-4" style={{ color: "#B8860B" }}>{apt.apts}</p>
                  <Button asChild variant="outline" size="sm" className="w-full" style={{ borderColor: "#B8860B", color: "#B8860B" }}>
                    <a href="https://app.moder.fi/levillenet" target="_blank" rel="noopener noreferrer">
                      {apt.btn} <ArrowRight className="ml-2 w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-center max-w-3xl mx-auto leading-relaxed" style={{ color: "#777" }}>{t.apartmentsNote}</p>
        </div>
      </section>

      {/* CHECK-IN & CHECK-OUT */}
      <section id="check-in" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>{t.checkinTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {[
              { label: t.checkinLabel, time: t.checkinTime, desc: t.checkinDesc },
              { label: t.checkoutLabel, time: t.checkoutTime, desc: t.checkoutDesc },
            ].map((c) => (
              <div key={c.label} className="rounded-xl p-6 border text-center" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
                <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: "#B8860B" }} />
                <span className="text-xs tracking-[0.2em] font-semibold block mb-2" style={{ color: "#B8860B" }}>{c.label}</span>
                <span className="text-2xl font-bold block mb-3" style={{ color: "#2D2D2D" }}>{c.time}</span>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-5 border-l-4 mb-4" style={{ backgroundColor: "#FFFDF9", borderColor: "#B8860B" }}>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: "#2D2D2D" }}>{t.doorLockTitle}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.doorLockDesc}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-5 border-l-4 mb-6" style={{ backgroundColor: "#FFFDF9", borderColor: "#B8860B" }}>
            <div className="flex items-start gap-3">
              <DoorOpen className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: "#2D2D2D" }}>{t.infoSignTitle}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.infoSignDesc}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg p-4" style={{ backgroundColor: "#FFFDF9" }}>
              <Car className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.parkingNote}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-4" style={{ backgroundColor: "#FFFDF9" }}>
              <Trash2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.wasteNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* KITCHEN */}
      <section id="kitchen" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: "#2D2D2D" }}>{t.kitchenTitle}</h2>
          <p className="text-center max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: "#555" }}>{t.kitchenIntro}</p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="rounded-xl p-6 border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-5 h-5" style={{ color: "#B8860B" }} />
                <h3 className="text-lg font-bold" style={{ color: "#2D2D2D" }}>{t.kitchenListTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {t.kitchenItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#555" }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#B8860B" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              {/* Replace with Skistar kitchen photo */}
              <img src={studioKitchen} alt="Skistar apartment kitchen" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>{t.amenitiesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((a) => (
              <div key={a.title} className="rounded-xl p-6 border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
                <a.icon className="w-6 h-6 mb-3" style={{ color: "#B8860B" }} />
                <h3 className="font-bold mb-2" style={{ color: "#2D2D2D" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{a.desc}</p>
                {a.link && (
                  <Link to={a.link.to} className="inline-block mt-2 text-sm font-medium hover:underline" style={{ color: "#B8860B" }}>
                    {a.link.text}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAUNA CALLOUT */}
      <section id="sauna" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Snowflake className="w-10 h-10 mx-auto mb-4" style={{ color: "#B8860B" }} />
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "#2D2D2D" }}>{t.saunaTitle}</h2>
          <p className="leading-relaxed mb-8" style={{ color: "#555" }}>{t.saunaText}</p>
          <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
            <Link to="/sauna">{t.saunaCta} <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* HOUSE RULES */}
      <section id="rules" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center" style={{ color: "#2D2D2D" }}>{t.rulesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {houseRules.map((r) => (
              <div key={r.title} className="rounded-xl p-6 border" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4" }}>
                <r.icon className="w-6 h-6 mb-3" style={{ color: "#B8860B" }} />
                <h3 className="font-bold mb-2" style={{ color: "#2D2D2D" }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT CHECKLIST */}
      <section id="checkout" className="py-16 sm:py-20 scroll-mt-32" style={{ backgroundColor: "#F3EDE4" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center" style={{ color: "#2D2D2D" }}>{t.checkoutTitle}</h2>
          <p className="text-center mb-10 leading-relaxed" style={{ color: "#555" }}>{t.checkoutIntro}</p>
          <div className="space-y-4">
            {t.checkoutItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-4" style={{ backgroundColor: "#FFFDF9" }}>
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                <p className="text-sm leading-relaxed" style={{ color: "#2D2D2D" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & CTA */}
      <section id="contact" className="py-16 sm:py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#2D2D2D" }}>{t.contactTitle}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
            <a href="tel:+35844131313" className="flex items-center gap-2 text-lg font-medium hover:underline" style={{ color: "#B8860B" }}>
              <Phone className="w-5 h-5" /> +358 44 13 13 13
            </a>
            <a href="mailto:info@leville.net" className="flex items-center gap-2 text-lg font-medium hover:underline" style={{ color: "#B8860B" }}>
              <Mail className="w-5 h-5" /> info@leville.net
            </a>
          </div>
          <p className="leading-relaxed mb-10" style={{ color: "#555" }}>{t.contactNote}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "#B8860B" }}>
              <Link to={accomLink}>{t.ctaBrowse} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8" style={{ borderColor: "#B8860B", color: "#B8860B" }}>
              <Link to={lang === "fi" ? "/levi" : "/en/levi"}>{t.ctaGuide} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          {/* Read Next */}
          <h3 className="text-lg font-bold mb-6" style={{ color: "#2D2D2D" }}>{t.readNext}</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {readNextLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl p-5 border text-center font-medium text-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#FFFDF9", borderColor: "#E8E0D4", color: "#B8860B" }}
              >
                {link.label}
                <ArrowRight className="w-4 h-4 mx-auto mt-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkistarGuide;
