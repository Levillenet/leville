import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  Clock, Phone, Mail, Wifi, Flame, Droplets, Car, ShieldCheck,
  ChefHat, WashingMachine, Thermometer, ArrowRight,
  Users, Bath, Mountain, CheckCircle2, AlertTriangle,
  Volume2, Cigarette, Dog, Ruler, BedDouble, Baby,
  UtensilsCrossed, Snowflake
} from "lucide-react";
import livingFireplace from "@/assets/bearlodge/living-fireplace.jpg";
import kitchenPhoto from "@/assets/bearlodge/kitchen.jpg";

const BASE = "https://www.leville.net";

const i18n = {
  en: {
    metaTitle: "Bearlodge Guest Guide – Karhupirtti Log Cabin in Levi | Leville.net",
    metaDesc: "Everything you need to know about your stay at Bearlodge (Karhupirtti), a 220m² luxury log cabin with 7 bedrooms, outdoor jacuzzi and sauna in Levi, Finnish Lapland. Check-in info, amenities, house rules and more.",
    canonical: `${BASE}/accommodations/guides/bearlodge`,
    sections: [
      { id: "about", label: "About" },
      { id: "check-in", label: "Check-in" },
      { id: "kitchen", label: "Kitchen" },
      { id: "amenities", label: "Amenities" },
      { id: "jacuzzi", label: "Jacuzzi" },
      { id: "rules", label: "Rules" },
      { id: "checkout", label: "Checkout" },
      { id: "contact", label: "Contact" },
    ],
    quickFacts: [
      { icon: Mountain, label: "Front Slope Area" },
      { icon: Ruler, label: "220 m²" },
      { icon: BedDouble, label: "7 Bedrooms" },
      { icon: Users, label: "Up to 14 Guests" },
      { icon: Bath, label: "5 Bathrooms + Sauna" },
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Flame, label: "Fireplace & Jacuzzi" },
      { icon: Dog, label: "Pets Allowed" },
    ],
    heroLabel: "GUEST GUIDE",
    heroTitle: "Welcome to Bearlodge – Karhupirtti",
    heroSubtitle: "Your complete guide to enjoying our spacious 220m² log cabin in the heart of Levi, Finnish Lapland. Built in 1989 and fully renovated in 2023, Bearlodge combines authentic Lappish log cabin charm with modern comfort for up to 14 guests.",
    bookBtn: "Book Bearlodge",
    aboutTitle: "About the Lodge",
    aboutP1: "Bearlodge (Karhupirtti) is a spacious 220m² log cabin located in the front slope area of Levi ski resort — one of the few, if not the only, log cabin of this size with such a central location.",
    aboutP2: "The cabin was built in 1989 and was originally in private use. In the early days, you could ski directly from the cabin's yard down to the front slope — there were no buildings in between. The area has grown since then, but Bearlodge still enjoys an unbeatable location just steps from the slopes.",
    aboutP3: "In summer 2023, we completed a full renovation — new kitchen, modern bathrooms, updated furnishings and a stylish interior, all while preserving the authentic log cabin character.",
    layoutCards: [
      { title: "Downstairs", text: "3 en-suite bedrooms, each with their own shower. Spacious living area with fireplace, fully equipped kitchen, and dining for up to 14." },
      { title: "Upstairs", text: "4 bedrooms with connecting doors and a shared toilet. Perfect for families or groups who want their own wing." },
      { title: "Extras", text: "Utility/laundry room, ski storage and maintenance room, charcoal grill in the yard available for use, and a private outdoor jacuzzi." },
    ],
    highlightsTitle: "Highlights",
    highlights: [
      { icon: Flame, label: "Wood-burning fireplace" },
      { icon: Thermometer, label: "Water-circulated radiator heating + heat pump" },
      { icon: Snowflake, label: "Electric sauna" },
      { icon: WashingMachine, label: "Washing machine & drying cabinet" },
      { icon: ChefHat, label: "Full kitchen with dishwasher" },
      { icon: Baby, label: "Crib & baby safety gates available" },
    ],
    arrivalTitle: "Arrival & Check-in",
    checkinLabel: "Check-in",
    checkinTime: "From 5:00 PM",
    checkinDesc: "We prepare the cabin so that everything is ready for your arrival from 5:00 PM onwards. You can arrive anytime during the evening. You will receive the door lock code via text message on the day of arrival.",
    checkoutLabel: "Check-out",
    checkoutTime: "By 11:00 AM",
    checkoutDesc: "Please follow the checkout checklist posted in the lobby. We keep it simple — just a few things to help us prepare for the next guests.",
    smartLock: "No need to pick up keys — we use a smart lock system. Your personal code arrives by SMS on your arrival day.",
    locationNote: "Bearlodge is located right in Levi centre. It's a 3-minute walk to the supermarket, souvenir shops, restaurants, front slopes, and kids' land. You can easily walk everywhere in the centre and to the pickup points for safari activities. The closest snowmobile track is approximately 150 metres away.",
    kitchenTitle: "The Kitchen",
    kitchenIntro: "The kitchen has everything you need to cook full meals for your group — from a quick breakfast to a feast for 14. You'll find basic spices, and often coffee, tea, cocoa and other dry ingredients left by previous guests. Feel free to use everything in the kitchen. If you have leftover dry ingredients when you leave, you're welcome to leave them in the cupboard for the next guests.",
    kitchenListTitle: "Appliances & Cookware",
    kitchenItems: [
      "Refrigerator & Freezer", "Oven & Stove", "Dishwasher", "Coffee Maker",
      "Toaster", "Microwave", "Electric Kettle", "Blender & Hand Mixer",
      "Ice Maker", "Pots / Pans / Bakeware", "Dishes & Cutlery for 14 guests",
      "Variety of Glassware", "Oils & Spices provided",
    ],
    amenitiesTitle: "Amenities & Equipment",
    amenities: [
      { icon: Flame, title: "Fireplace", desc: "Firewood is provided. Open the chimney valve before lighting. Add wood a maximum of two times per session — the fireplace gets very hot with more. Close the valve only when the fire is completely extinguished. Open the front door briefly during ignition to get fresh air flowing." },
      { icon: Droplets, title: "Outdoor Jacuzzi", desc: "Heated to 37.5°C year-round. Lights and bubbles controlled from switches on the jacuzzi. Maximum 5 people at a time. Swimwear required. Always close the cover after use to prevent freezing." },
      { icon: Snowflake, title: "Electric Sauna", desc: "The cabin has an electric sauna for your use. A perfect way to warm up after a day on the slopes. If you're new to Finnish sauna or want tips for the best experience, check out our guide.", link: { text: "Read our Sauna Guide →", to: "/sauna" } },
      { icon: WashingMachine, title: "Washer & Dryer", desc: "Washing machine and a drying cabinet for outdoor clothes. The drying cabinet works best at 40°C for about one hour. A drying rack is also available for regular laundry." },
      { icon: Thermometer, title: "Heating", desc: "The common areas (living room, kitchen) are heated by an air heat pump — adjust the temperature using the white Mitsubishi remote control. The bedrooms have water-circulated radiator heating — adjust the temperature from the thermostat on each radiator. The fireplace also provides excellent warmth for the living area." },
      { icon: Droplets, title: "Tap Water", desc: "Lapland tap water comes straight from the fells. It's exceptionally clean, cold and fresh — drink it straight from the tap." },
      { icon: Car, title: "Parking", desc: "Free parking in the cabin's yard with plenty of space for multiple vehicles." },
      { icon: Dog, title: "Pets Welcome", desc: "Pets are allowed at Bearlodge. Please keep the cabin clean and report any pet-related issues." },
      { icon: Baby, title: "Family Friendly", desc: "A crib and baby safety gates are available. Just let us know in advance if you need them set up." },
      { icon: ShieldCheck, title: "Safety", desc: "Equipped with fire extinguisher, fire blanket, smoke alarms and carbon monoxide detector. Fire extinguishers are in the hallway." },
    ],
    jacuzziTitle: "Jacuzzi – How to Use",
    jacuzziIntro: "The outdoor jacuzzi is one of the highlights of Bearlodge. Here's everything you need to know to enjoy it safely.",
    jacuzziSteps: [
      "Open the cover by first turning the piece on the cabin side over the steel pipe (the cover is cut in half), then lifting the steel pipe with the other hand to prop the cover up behind the pool.",
      "Use the switches on the jacuzzi to turn on lights and bubbles. The temperature is fixed at a comfortable 37.5°C.",
      "Rinse yourself in the shower with water only before entering. Soap residue causes foam and unhygienic conditions, requiring a full water change.",
      "Always close the cover when you're finished. Forgetting to close it overnight can cause the pool to freeze.",
    ],
    jacuzziRulesTitle: "Important Rules",
    jacuzziRules: [
      "Maximum 5 people at the same time — more lowers the water level and risks freezing.",
      "Water level must reach the LED light line when no one is in the pool.",
      "If water spills over, use the hose in the technical room (next to the main door) to refill. Collect the hose immediately — it will freeze and break if left out.",
      "Swimwear is required at all times.",
      "Keep noise to a minimum when using the jacuzzi at night out of respect for neighbors.",
      "Freezing and breakage due to failure to maintain water level or close the cover is the guest's responsibility.",
    ],
    rulesTitle: "House Rules",
    houseRules: [
      { icon: Cigarette, title: "No Smoking", desc: "No smoking or vaping inside the cabin. Please smoke outside and use the ashtray provided." },
      { icon: Volume2, title: "Noise & Quiet Time", desc: "Inside the cabin, the sound level is entirely up to you — the cabin is yours. If you use the outdoor jacuzzi at night, please keep noise to a minimum for the neighbors." },
      { icon: ShieldCheck, title: "Damage", desc: "Please report any damage or malfunction to us right away so we can repair or replace items quickly." },
      { icon: Phone, title: "Emergencies", desc: "In case of emergency, call 112 (Finnish emergency number). Fire extinguishers and a fire blanket are in the hallway. For non-urgent issues, reach us at +358 44 131 3131 or info@leville.net." },
    ],
    checkoutTitle: "Before You Go – Checkout Checklist",
    checkoutIntro: "To help us prepare for the next guests, we appreciate your help with these simple things before you leave by 11:00 AM.",
    checkoutItems: [
      { title: "Linens", desc: "Leave beds unmade. Place used towels and dishcloths in the hallway." },
      { title: "Dishes", desc: "Rinse dishes and load the dishwasher. Please start the dishwasher before you leave." },
      { title: "Food", desc: "Empty the fridge of all open and perishable items. Unopened items and dry ingredients can stay." },
      { title: "Lights & Electronics", desc: "Make sure all lights, appliances and electronics are switched off." },
      { title: "Windows & Doors", desc: "Check that all windows and doors are properly closed and locked." },
      { title: "Checkout", desc: "Complete checkout according to the instructions posted in the lobby." },
    ],
    contactTitle: "Need Anything During Your Stay?",
    contactNote: "Whether it's a maintenance issue, a question about the area, or you've run out of toilet paper or soap — just send us a message and we'll take care of it.",
    browseBtn: "Browse All Our Accommodations",
    guideBtn: "Explore Levi Travel Guide",
    readNextTitle: "Read Next",
    readNext: [
      { to: "/guide/travel-to-levi", label: "Complete Levi Travel Guide" },
      { to: "/guide/restaurants-and-services-in-levi", label: "Restaurants & Dining in Levi" },
      { to: "/travel/how-to-get-to-levi-from-helsinki-and-abroad", label: "How to Get to Levi" },
    ],
    accLink: "/en/accommodations",
    guideLink: "/guide/travel-to-levi",
    bookLink: "/en/accommodations",
  },
  fi: {
    metaTitle: "Bearlodge vierasopas – Karhupirtti hirsimökki Levillä | Leville.net",
    metaDesc: "Kaikki mitä tarvitset tietää majoittumisestasi Bearlodgessa (Karhupirtti), 220m² luksus hirsimökissä 7 makuuhuoneella, ulkoporealtaalla ja saunalla Levillä, Suomen Lapissa. Sisäänkirjautuminen, varusteet, järjestyssäännöt ja paljon muuta.",
    canonical: `${BASE}/majoitukset/oppaat/bearlodge`,
    sections: [
      { id: "about", label: "Tietoa" },
      { id: "check-in", label: "Saapuminen" },
      { id: "kitchen", label: "Keittiö" },
      { id: "amenities", label: "Varusteet" },
      { id: "jacuzzi", label: "Poreallas" },
      { id: "rules", label: "Säännöt" },
      { id: "checkout", label: "Lähtö" },
      { id: "contact", label: "Yhteystiedot" },
    ],
    quickFacts: [
      { icon: Mountain, label: "Eturinteen alue" },
      { icon: Ruler, label: "220 m²" },
      { icon: BedDouble, label: "7 makuuhuonetta" },
      { icon: Users, label: "Jopa 14 vierasta" },
      { icon: Bath, label: "5 kylpyhuonetta + sauna" },
      { icon: Wifi, label: "Nopea WiFi" },
      { icon: Flame, label: "Takka & poreallas" },
      { icon: Dog, label: "Lemmikit sallittu" },
    ],
    heroLabel: "VIERASOPAS",
    heroTitle: "Tervetuloa Bearlodgeen – Karhupirttiin",
    heroSubtitle: "Täydellinen opas 220m² hirsimökkiimme Levin keskustassa, Suomen Lapissa. Rakennettu vuonna 1989 ja täysin remontoitu vuonna 2023. Bearlodge yhdistää aidon lappilaisen hirsimökin tunnelman nykyaikaiseen mukavuuteen jopa 14 vieraalle.",
    bookBtn: "Varaa Bearlodge",
    aboutTitle: "Tietoa mökistä",
    aboutP1: "Bearlodge (Karhupirtti) on tilava 220m² hirsimökki Levin hiihtokeskuksen eturinteen alueella — yksi harvoista, ellei ainoa, tämän kokoinen hirsimökki näin keskeisellä sijainnilla.",
    aboutP2: "Mökki rakennettiin vuonna 1989 ja se oli alun perin yksityiskäytössä. Alkuaikoina mökin pihalta pystyi laskemaan suoraan eturinteeseen — välissä ei ollut rakennuksia. Alue on kasvanut siitä lähtien, mutta Bearlodge nauttii yhä lyömättömästä sijainnista aivan rinteiden vieressä.",
    aboutP3: "Kesällä 2023 teimme täydellisen remontin — uusi keittiö, modernit kylpyhuoneet, päivitetyt kalusteet ja tyylikäs sisustus, kaikki säilyttäen aidon hirsimökin luonteen.",
    layoutCards: [
      { title: "Alakerta", text: "3 makuuhuonetta omilla suihkuilla. Tilava olohuone takalla, täysin varustettu keittiö ja ruokailutila jopa 14 hengelle." },
      { title: "Yläkerta", text: "4 makuuhuonetta yhdysovin ja yhteinen WC. Täydellinen perheille tai ryhmille, jotka haluavat oman siipensä." },
      { title: "Lisäksi", text: "Kodinhoitohuone, suksivarasto ja huoltohuone, hiiligrilli pihalla käytettävissä sekä yksityinen ulkoporeallas." },
    ],
    highlightsTitle: "Kohokohdat",
    highlights: [
      { icon: Flame, label: "Puulämmitteinen takka" },
      { icon: Thermometer, label: "Vesikiertoinen patterilämmitys + ilmalämpöpumppu" },
      { icon: Snowflake, label: "Sähkösauna" },
      { icon: WashingMachine, label: "Pesukone ja kuivauskaappi" },
      { icon: ChefHat, label: "Täysin varustettu keittiö astianpesukoneella" },
      { icon: Baby, label: "Pinnasänky ja turvaportit saatavilla" },
    ],
    arrivalTitle: "Saapuminen & sisäänkirjautuminen",
    checkinLabel: "Sisäänkirjautuminen",
    checkinTime: "Klo 17:00 alkaen",
    checkinDesc: "Valmistelemme mökin niin, että kaikki on valmiina saapumiseesi klo 17:00 alkaen. Voit saapua milloin tahansa illan aikana. Saat oven lukituskoodin tekstiviestillä saapumispäivänä.",
    checkoutLabel: "Uloskirjautuminen",
    checkoutTime: "Klo 11:00 mennessä",
    checkoutDesc: "Noudata eteisessä olevaa uloskirjautumislistaa. Pidämme sen yksinkertaisena — vain muutama asia, jotka auttavat meitä valmistelemaan mökin seuraaville vieraille.",
    smartLock: "Ei tarvetta noutaa avaimia — käytämme älylukitusjärjestelmää. Henkilökohtainen koodisi saapuu tekstiviestillä saapumispäivänä.",
    locationNote: "Bearlodge sijaitsee aivan Levin keskustassa. Supermarkettiin, matkamuistomyymälöihin, ravintoloihin, eturinteille ja lasten maahan on 3 minuutin kävelymatka. Keskustassa ja safareiden noutopaikoille pääsee helposti kävellen. Lähin moottorikelkkaura on noin 150 metrin päässä.",
    kitchenTitle: "Keittiö",
    kitchenIntro: "Keittiöstä löytyy kaikki mitä tarvitset kokkailuun ryhmällesi — aamupalasta 14 hengen juhla-aterialle. Löydät perusmausteet, ja usein myös kahvia, teetä, kaakaota ja muita kuiva-aineita edellisiltä vierailta. Käytä vapaasti kaikkea keittiössä olevaa. Jos sinulle jää ylijäämä kuiva-aineita lähtiessäsi, voit jättää ne kaappiin seuraaville vieraille.",
    kitchenListTitle: "Laitteet ja keittiövälineet",
    kitchenItems: [
      "Jääkaappi ja pakastin", "Uuni ja liesi", "Astianpesukone", "Kahvinkeitin",
      "Leivänpaahdin", "Mikroaaltouuni", "Vedenkeitin", "Tehosekoitin ja sähkövatkain",
      "Jääpalakone", "Kattilat / pannut / uunivuoat", "Astiat ja aterimet 14 vieraalle",
      "Monipuolinen lasivalikoima", "Öljyt ja mausteet mukana",
    ],
    amenitiesTitle: "Varusteet ja tarvikkeet",
    amenities: [
      { icon: Flame, title: "Takka", desc: "Polttopuut ovat valmiina. Avaa savupelti ennen sytyttämistä. Lisää puita enintään kaksi kertaa — takka kuumenee erittäin kuumaksi. Sulje pelti vasta kun tuli on täysin sammunut. Avaa ulko-ovi hetkeksi sytytyksen aikana ilmanvaihdon varmistamiseksi." },
      { icon: Droplets, title: "Ulkoporeallas", desc: "Lämmitetty 37,5°C:een ympäri vuoden. Valot ja poresuihkut ohjataan porealtaan kytkimistä. Enintään 5 henkilöä kerrallaan. Uima-asu pakollinen. Sulje kansi aina käytön jälkeen jäätymisen estämiseksi." },
      { icon: Snowflake, title: "Sähkösauna", desc: "Mökissä on sähkösauna käyttöösi. Täydellinen tapa lämmetä rinteiden jälkeen. Jos olet ensikertalainen tai haluat vinkkejä parhaaseen saunakokemukseen, tutustu oppaaseemme.", link: { text: "Lue saunaopas →", to: "/sauna" } },
      { icon: WashingMachine, title: "Pesukone ja kuivaus", desc: "Pesukone ja kuivauskaappi ulkovaatteille. Kuivauskaappi toimii parhaiten 40°C:ssa noin tunnin. Kuivausteline on myös käytettävissä tavallisille pyykeille." },
      { icon: Thermometer, title: "Lämmitys", desc: "Yleiset tilat (olohuone, keittiö) lämpeävät ilmalämpöpumpulla — säädä lämpötilaa vaalealla Mitsubishi-kaukosäätimellä. Makuuhuoneissa on vesikiertoinen patterilämmitys — säädä lämpötilaa kunkin patterin termostaatista. Takka lämmittää myös tehokkaasti oleskelutilaa." },
      { icon: Droplets, title: "Hanavesi", desc: "Lapin hanavesi tulee suoraan tuntureilta. Se on poikkeuksellisen puhdasta, kylmää ja raikasta — juo suoraan hanasta." },
      { icon: Car, title: "Pysäköinti", desc: "Ilmainen pysäköinti mökin pihalla, tilaa useille autoille." },
      { icon: Dog, title: "Lemmikit tervetulleita", desc: "Lemmikit ovat sallittuja Bearlodgessa. Pidä mökki siistinä ja ilmoita mahdollisista lemmikkeihin liittyvistä ongelmista." },
      { icon: Baby, title: "Lapsiystävällinen", desc: "Pinnasänky ja turvaportit ovat saatavilla. Ilmoita meille etukäteen, jos tarvitset ne valmiiksi asennettuna." },
      { icon: ShieldCheck, title: "Turvallisuus", desc: "Varustettu sammuttimella, sammutuspeitteellä, palovaroittimilla ja häkävaroittimella. Sammuttimet ovat eteisessä." },
    ],
    jacuzziTitle: "Poreallas – käyttöohjeet",
    jacuzziIntro: "Ulkoporeallas on yksi Bearlodgen kohokohdista. Tässä kaikki mitä tarvitset tietää nauttiaksesi siitä turvallisesti.",
    jacuzziSteps: [
      "Avaa kansi kääntämällä ensin mökin puoleinen osa teräsputken yli (kansi on halaistu kahtia), nosta sitten teräsputki toisella kädellä tukemaan kansi altaan taakse.",
      "Käytä porealtaan kytkimiä valojen ja porekuplien käynnistämiseen. Lämpötila on säädetty mukavaan 37,5°C:een.",
      "Huuhtele itsesi suihkussa pelkällä vedellä ennen altaaseen menoa. Saippuajäämät aiheuttavat vaahtoa ja epähygieenisiä olosuhteita, mikä vaatii koko veden vaihdon.",
      "Sulje kansi aina kun olet valmis. Kannen sulkematta jättäminen yön yli voi aiheuttaa altaan jäätymisen.",
    ],
    jacuzziRulesTitle: "Tärkeät säännöt",
    jacuzziRules: [
      "Enintään 5 henkilöä samanaikaisesti — enemmän laskee vedenpintaa ja riskeeraa jäätymisen.",
      "Vedenpinnan tulee yltää LED-valoriville kun kukaan ei ole altaassa.",
      "Jos vettä läikkyy yli, käytä letkua teknisessä tilassa (pääoven vieressä) täyttöön. Kerää letku heti pois — se jäätyy ja hajoaa jos jätetään ulos.",
      "Uima-asu pakollinen koko ajan.",
      "Pidä äänentaso minimissä käyttäessäsi poreallasta yöllä naapureiden kunnioittamiseksi.",
      "Jäätyminen ja rikkoutuminen vedenpinnan ylläpidon tai kannen sulkemisen laiminlyönnistä johtuen on vieraan vastuulla.",
    ],
    rulesTitle: "Järjestyssäännöt",
    houseRules: [
      { icon: Cigarette, title: "Tupakointi kielletty", desc: "Tupakointi tai sähkötupakointi sisätiloissa on kielletty. Tupakoi ulkona ja käytä tuhkakuppia." },
      { icon: Volume2, title: "Melu ja hiljaisuus", desc: "Mökin sisällä äänentaso on täysin teidän päätettävissänne — mökki on teidän. Jos käytätte ulkoporeallasta yöllä, pidä melu minimissä naapureiden vuoksi." },
      { icon: ShieldCheck, title: "Vahingot", desc: "Ilmoita kaikista vahingoista tai toimintahäiriöistä meille heti, jotta voimme korjata tai vaihtaa nopeasti." },
      { icon: Phone, title: "Hätätilanteet", desc: "Hätätilanteessa soita 112. Sammuttimet ja sammutuspeite ovat eteisessä. Ei-kiireellisissä asioissa tavoitat meidät numerosta +358 44 131 3131 tai info@leville.net." },
    ],
    checkoutTitle: "Ennen lähtöä – lähtömuistilista",
    checkoutIntro: "Auttaaksesi meitä valmistelemaan mökin seuraaville vieraille, arvostamme apuasi näissä yksinkertaisissa asioissa ennen klo 11:00 lähtöä.",
    checkoutItems: [
      { title: "Liinavaatteet", desc: "Jätä sängyt petaamatta. Laita käytetyt pyyhkeet ja tiskipyyhkeet eteiseen." },
      { title: "Astiat", desc: "Huuhtele astiat ja lataa astianpesukone. Käynnistä astianpesukone ennen lähtöä." },
      { title: "Ruoka", desc: "Tyhjennä jääkaappi kaikista avatuista ja pilaantuvista tuotteista. Avaamattomat ja kuiva-aineet voivat jäädä." },
      { title: "Valot ja elektroniikka", desc: "Varmista, että kaikki valot, laitteet ja elektroniikka on sammutettu." },
      { title: "Ikkunat ja ovet", desc: "Tarkista, että kaikki ikkunat ja ovet ovat kunnolla suljetut ja lukitut." },
      { title: "Uloskirjautuminen", desc: "Suorita uloskirjautuminen eteisessä olevien ohjeiden mukaisesti." },
    ],
    contactTitle: "Tarvitsetko jotain oleskelusi aikana?",
    contactNote: "Olipa kyseessä huoltoasia, kysymys alueesta tai vessapaperi tai saippua on loppunut — lähetä meille viesti niin hoidamme asian.",
    browseBtn: "Selaa kaikkia majoituksiamme",
    guideBtn: "Tutustu Levi-matkaoppaaseen",
    readNextTitle: "Lue seuraavaksi",
    readNext: [
      { to: "/opas/matkaopas-levi", label: "Täydellinen Levi-matkaopas" },
      { to: "/opas/ravintolat-ja-palvelut-levilla", label: "Ravintolat ja palvelut Levillä" },
      { to: "/matka/miten-paasee-leville-helsingista", label: "Miten pääsee Leville" },
    ],
    accLink: "/majoitukset",
    guideLink: "/opas/matkaopas-levi",
    bookLink: "/majoitukset",
  },
};

interface BearlodgeGuideProps {
  lang?: "fi" | "en";
}

const BearlodgeGuide = ({ lang = "en" }: BearlodgeGuideProps) => {
  const t = i18n[lang];
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const enUrl = `${BASE}/accommodations/guides/bearlodge`;
  const fiUrl = `${BASE}/majoitukset/oppaat/bearlodge`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.metaTitle,
    description: t.metaDesc,
    author: { "@type": "Organization", name: "Leville.net" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: lang === "en" ? [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/en` },
      { "@type": "ListItem", position: 2, name: "Accommodations", item: `${BASE}/en/accommodations` },
      { "@type": "ListItem", position: 3, name: "Bearlodge", item: enUrl },
      { "@type": "ListItem", position: 4, name: "Guest Guide", item: enUrl },
    ] : [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Majoitukset", item: `${BASE}/majoitukset` },
      { "@type": "ListItem", position: 3, name: "Bearlodge", item: fiUrl },
      { "@type": "ListItem", position: 4, name: "Vierasopas", item: fiUrl },
    ],
  };

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Bearlodge – Karhupirtti",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Levi Centre",
      addressLocality: "Kittilä",
      addressRegion: "Lapland",
      postalCode: "99130",
      addressCountry: "FI",
    },
    telephone: "+35844131313",
    url: enUrl,
    numberOfRooms: 7,
    floorSize: { "@type": "QuantitativeValue", value: 220, unitCode: "MTK" },
    petsAllowed: true,
    amenityFeature: [
      "Outdoor Jacuzzi", "Wood Fireplace", "Electric Sauna", "Free WiFi",
      "Free Parking", "Full Kitchen", "Washing Machine", "Drying Cabinet",
      "Ski Storage", "Charcoal Grill", "Crib", "Baby Safety Gates",
      "Carbon Monoxide Detector", "Smoke Alarm", "Fire Extinguisher",
    ].map(f => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
  };

  return (
    <>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDesc} />
        <link rel="canonical" href={t.canonical} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={t.canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.metaTitle} />
        <meta name="twitter:description" content={t.metaDesc} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="fi" href={fiUrl} />
        <link rel="alternate" hrefLang="x-default" href={enUrl} />
      </Helmet>

      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={lodgingSchema} />

      <Header />

      {/* Sticky jump-nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#2D2D2D" }}
      >
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 py-2 min-w-max">
            {t.sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors"
                style={{ color: "#F9F6F1" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(184,134,11,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="min-h-screen" style={{ color: "#2D2D2D" }}>
        {/* SECTION 1: Hero */}
        <section className="relative min-h-[70vh] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${livingFireplace})` }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(30,25,20,0.85) 0%, rgba(30,25,20,0.4) 50%, rgba(30,25,20,0.15) 100%)"
          }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16 pt-32 w-full">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: "#B8860B" }}>
              {t.heroLabel}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#F9F6F1" }}>
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-lg max-w-2xl mb-8 leading-relaxed" style={{ color: "rgba(249,246,241,0.85)" }}>
              {t.heroSubtitle}
            </p>
            <Link
              to={t.bookLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: "#B8860B", color: "#F9F6F1" }}
            >
              {t.bookBtn}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* SECTION 2: Quick Info Bar */}
        <section style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {t.quickFacts.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5">
                  <f.icon size={22} style={{ color: "#B8860B" }} />
                  <span className="text-xs font-medium leading-tight" style={{ color: "#2D2D2D" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: About The Lodge */}
        <section id="about" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>
              {t.aboutTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-10 mb-12">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={livingFireplace}
                  alt="Bearlodge living room with fireplace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#444" }}>
                <p>{t.aboutP1}</p>
                <p>{t.aboutP2}</p>
                <p>{t.aboutP3}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {t.layoutCards.map((card, i) => (
                <div key={i} className="rounded-xl p-6 border" style={{ backgroundColor: "#F9F6F1", borderColor: "rgba(184,134,11,0.2)" }}>
                  <h4 className="font-semibold mb-2" style={{ color: "#B8860B" }}>{card.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{card.text}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4" style={{ color: "#2D2D2D" }}>{t.highlightsTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {t.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "#F9F6F1" }}>
                  <h.icon size={20} style={{ color: "#B8860B" }} />
                  <span className="text-sm font-medium" style={{ color: "#2D2D2D" }}>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Check-in & Check-out */}
        <section id="check-in" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>
              {t.arrivalTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl p-8 bg-white shadow-sm border" style={{ borderColor: "rgba(184,134,11,0.15)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} style={{ color: "#B8860B" }} />
                  <span className="text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "#B8860B" }}>{t.checkinLabel}</span>
                </div>
                <p className="text-3xl font-bold mb-3" style={{ color: "#2D2D2D" }}>{t.checkinTime}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.checkinDesc}</p>
              </div>

              <div className="rounded-2xl p-8 bg-white shadow-sm border" style={{ borderColor: "rgba(184,134,11,0.15)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} style={{ color: "#B8860B" }} />
                  <span className="text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "#B8860B" }}>{t.checkoutLabel}</span>
                </div>
                <p className="text-3xl font-bold mb-3" style={{ color: "#2D2D2D" }}>{t.checkoutTime}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{t.checkoutDesc}</p>
              </div>
            </div>

            <div className="rounded-xl p-5 flex items-start gap-3 mb-6" style={{ backgroundColor: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}>
              <ShieldCheck size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{t.smartLock}</p>
            </div>

            <div className="rounded-xl p-5 flex items-start gap-3" style={{ backgroundColor: "rgba(184,134,11,0.04)", border: "1px solid rgba(184,134,11,0.12)" }}>
              <Mountain size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#B8860B" }} />
              <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{t.locationNote}</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: The Kitchen */}
        <section id="kitchen" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#2D2D2D" }}>{t.kitchenTitle}</h2>
            <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#444" }}>{t.kitchenIntro}</p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <UtensilsCrossed size={20} style={{ color: "#B8860B" }} />
                  <h3 className="text-lg font-semibold" style={{ color: "#2D2D2D" }}>{t.kitchenListTitle}</h3>
                </div>
                <ul className="space-y-2.5">
                  {t.kitchenItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: "#B8860B" }} />
                      <span className="text-sm" style={{ color: "#444" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={kitchenPhoto}
                  alt="Bearlodge fully equipped kitchen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Amenities & Equipment */}
        <section id="amenities" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>{t.amenitiesTitle}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.amenities.map((a, i) => (
                <div key={i} className="rounded-xl p-6 bg-white border shadow-sm" style={{ borderColor: "rgba(184,134,11,0.12)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <a.icon size={20} style={{ color: "#B8860B" }} />
                    <h3 className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{a.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{a.desc}</p>
                  {(a as any).link && (
                    <Link to={(a as any).link.to} className="inline-block mt-2 text-sm font-medium hover:underline" style={{ color: "#B8860B" }}>
                      {(a as any).link.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Jacuzzi Instructions */}
        <section id="jacuzzi" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>{t.jacuzziTitle}</h2>
            <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#444" }}>{t.jacuzziIntro}</p>

            <div className="space-y-4 mb-10">
              {t.jacuzziSteps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: "#B8860B", color: "#F9F6F1" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed pt-1" style={{ color: "#444" }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Warning card */}
            <div className="rounded-xl p-6 border-2" style={{ borderColor: "#B8860B", backgroundColor: "rgba(184,134,11,0.05)" }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} style={{ color: "#B8860B" }} />
                <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: "#B8860B" }}>{t.jacuzziRulesTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {t.jacuzziRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#B8860B" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#444" }}>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: House Rules */}
        <section id="rules" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "#2D2D2D" }}>{t.rulesTitle}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.houseRules.map((r, i) => (
                <div key={i} className="rounded-xl p-6 bg-white border shadow-sm" style={{ borderColor: "rgba(184,134,11,0.12)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <r.icon size={20} style={{ color: "#B8860B" }} />
                    <h3 className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{r.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Checkout Checklist */}
        <section id="checkout" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>{t.checkoutTitle}</h2>
            <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: "#444" }}>{t.checkoutIntro}</p>

            <div className="space-y-4 max-w-2xl">
              {t.checkoutItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                  <div>
                    <span className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{item.title}: </span>
                    <span className="text-sm" style={{ color: "#444" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: Contact & CTA */}
        <section id="contact" className="scroll-mt-16 py-16 md:py-24" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#2D2D2D" }}>{t.contactTitle}</h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <a href="tel:+35844131313" className="flex items-center gap-2 text-base font-medium hover:underline" style={{ color: "#2D2D2D" }}>
                <Phone size={18} style={{ color: "#B8860B" }} />
                +358 44 131 313
              </a>
              <a href="mailto:info@leville.net" className="flex items-center gap-2 text-base font-medium hover:underline" style={{ color: "#2D2D2D" }}>
                <Mail size={18} style={{ color: "#B8860B" }} />
                info@leville.net
              </a>
            </div>

            <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#555" }}>{t.contactNote}</p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link
                to={t.accLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
                style={{ backgroundColor: "#B8860B", color: "#F9F6F1" }}
              >
                {t.browseBtn}
                <ArrowRight size={16} />
              </Link>
              <Link
                to={t.guideLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-colors hover:bg-black/5"
                style={{ borderColor: "#2D2D2D", color: "#2D2D2D" }}
              >
                {t.guideBtn}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Read Next */}
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-5" style={{ color: "#2D2D2D" }}>{t.readNextTitle}</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {t.readNext.map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className="rounded-xl p-5 bg-white border shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow group"
                    style={{ borderColor: "rgba(184,134,11,0.12)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "#2D2D2D" }}>{item.label}</span>
                    <ArrowRight size={16} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "#B8860B" }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="py-4" style={{ backgroundColor: "#F9F6F1" }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="border-t" style={{ borderColor: "rgba(184,134,11,0.15)" }} />
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
};

export default BearlodgeGuide;
