import { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

type Lang = "fi" | "en";

interface QA {
  q: string;
  a: string;
  /** Inline link rendered at end of answer */
  link?: { href: string; label: string; external?: boolean };
}

interface Category {
  id: string;
  title: string;
  items: QA[];
}

const moderUrl = "https://app.moder.fi/levillenet";

const buildContent = (lang: Lang): { categories: Category[]; readNext: { title: string; href: string }[] } => {
  const isFi = lang === "fi";

  const accommodationsHref = isFi ? "/majoitukset" : "/en/accommodations";
  const companyHref = isFi ? "/yritys" : "/en/company";
  const skiingHref = isFi ? "/opas/laskettelu-levi" : "/guide/skiing-in-levi";
  const xcSkiingHref = isFi ? "/opas/hiihtoladut-levi" : "/guide/cross-country-skiing-in-levi";
  const weatherHref = isFi ? "/levi/saatieto-levilta" : "/en/levi/weather-in-levi";
  const snowHref = "/snowreport";
  const auroraHref = isFi ? "/revontulet" : "/en/northern-lights";
  const restaurantsHref = isFi
    ? "/opas/ravintolat-ja-palvelut-levilla"
    : "/guide/restaurants-and-services-in-levi";
  const transportHref = isFi
    ? "/matka/miten-paasee-leville-helsingista"
    : "/guide/how-to-get-to-levi";
  const gettingAroundHref = isFi ? "/opas/liikkuminen-levilla" : "/guide/getting-around-levi";
  const summerHref = isFi ? "/opas/kesa-levi" : "/guide/summer-in-levi";
  const kidsHref = isFi ? "/opas/lapsiperheet-levilla" : "/guide/levi-with-children";
  const bearlodgeHref = "/majoitukset/oppaat/bearlodge";

  const readMore = isFi ? "Lue lisää" : "Read more";

  const categories: Category[] = [
    {
      id: "leville-net",
      title: isFi ? "Leville.net ja varaaminen" : "About Leville.net & Booking",
      items: [
        {
          q: isFi ? "Mikä on Leville.net?" : "What is Leville.net?",
          a: isFi
            ? "Leville.net on paikallinen majoituspalvelu joka tarjoaa 27 huoneistoa ja mökkiä Levin keskustassa. Hallinnoimme kohteita itse ja tunnemme jokaisen asunnon henkilökohtaisesti. Olemme toimineet Levillä vuodesta 2019."
            : "Leville.net is a local accommodation service offering 27 apartments and cabins in Levi centre. We manage all properties ourselves and know each unit personally. We've been operating in Levi since 2019.",
          link: { href: companyHref, label: readMore },
        },
        {
          q: isFi
            ? "Miksi varata suoraan Leville.netistä eikä Booking.comista?"
            : "Why book directly through Leville.net instead of Booking.com?",
          a: isFi
            ? "Varaamalla suoraan meiltä saat aina parhaan hinnan, koska emme maksa välityspalkkiota. Samat kohteet löytyvät myös Booking.comista nimillä kuten Levillenet Glacier Alpine Chalets ja Levillenet Bearlodge, mutta suoraan varaamalla säästät ja saat henkilökohtaista palvelua."
            : "By booking directly with us you always get the best price, as there's no commission fee. The same properties are also listed on Booking.com under names like Levillenet Glacier Alpine Chalets and Levillenet Bearlodge, but direct booking saves you money and gives you personal service.",
          link: { href: moderUrl, label: isFi ? "Varaa suoraan" : "Book directly", external: true },
        },
        {
          q: isFi ? "Miten varaaminen toimii?" : "How does booking work?",
          a: isFi
            ? "Valitse kohde ja päivämäärät varausjärjestelmässämme, täytä tietosi ja maksa Paytrailin kautta. Saat vahvistuksen ja sisäänkirjautumisohjeet sähköpostitse. Voit myös soittaa tai lähettää WhatsApp-viestin numeroon +358 44 13 13 13."
            : "Choose your property and dates in our booking system, fill in your details and pay via Paytrail. You'll receive confirmation and check-in instructions by email. You can also call or WhatsApp us at +358 44 13 13 13.",
        },
        {
          q: isFi ? "Mitä maksutapoja hyväksytte?" : "What payment methods do you accept?",
          a: isFi
            ? "Maksu tapahtuu Paytrailin kautta, joka tukee kaikkia suomalaisia pankkeja, luottokortteja (Visa, Mastercard) ja MobilePaytä."
            : "Payment is processed through Paytrail, which supports all Finnish banks, credit cards (Visa, Mastercard) and MobilePay.",
        },
        {
          q: isFi ? "Mitkä ovat peruutusehdot?" : "What is your cancellation policy?",
          a: isFi
            ? "Peruutusehdot vaihtelevat kohteen ja ajankohdan mukaan. Tarkista ehdot varausvahvistuksesta tai ota yhteyttä info@leville.net."
            : "Cancellation terms vary by property and dates. Check the terms in your booking confirmation or contact info@leville.net.",
        },
        {
          q: isFi ? "Sisältyykö liinavaatteet ja pyyhkeet?" : "Are bed linen and towels included?",
          a: isFi
            ? "Kyllä, kaikissa kohteissamme liinavaatteet, pyyhkeet ja loppusiivous sisältyvät hintaan."
            : "Yes, all our properties include bed linen, towels and final cleaning in the price.",
        },
        {
          q: isFi ? "Miten saan avaimet?" : "How do I get the keys?",
          a: isFi
            ? "Sisäänkirjautumisohjeet ja kulkukoodit lähetetään sähköpostitse ennen saapumista. Useimmissa kohteissa on koodilukko, joten voit saapua joustavasti."
            : "Check-in instructions and access codes are sent by email before arrival. Most properties have keypad locks, so you can arrive flexibly.",
        },
        {
          q: isFi ? "Miten otan teihin yhteyttä?" : "How can I contact you?",
          a: isFi
            ? "Puhelin ja WhatsApp: +358 44 13 13 13. Sähköposti: info@leville.net. Vastaamme yleensä tunnin sisällä."
            : "Phone and WhatsApp: +358 44 13 13 13. Email: info@leville.net. We typically respond within an hour.",
          link: { href: companyHref, label: readMore },
        },
      ],
    },
    {
      id: "accommodation",
      title: isFi ? "Majoitus" : "Accommodation",
      items: [
        {
          q: isFi ? "Minkälaisia majoituksia teillä on?" : "What types of accommodation do you offer?",
          a: isFi
            ? "Tarjoamme studiohuoneistoja 2 hengelle, perheasuntoja 4–6 hengelle, isoja huoneistoja 8–10 hengelle ja Karhupirtti-hirsimökin jopa 14 hengelle. Kaikki sijaitsevat Levin keskustassa kävelymatkan päässä rinteistä."
            : "We offer studios for 2 guests, family apartments for 4–6 guests, large apartments for 8–10 guests, and the Karhupirtti log cabin for up to 14 guests. All located in Levi centre within walking distance of the slopes.",
          link: { href: accommodationsHref, label: readMore },
        },
        {
          q: isFi
            ? "Kuinka kaukana rinteet ovat majoituksistanne?"
            : "How far are the slopes from your properties?",
          a: isFi
            ? "Lähimmät kohteemme (Hiihtäjänkuja, Front Slope Chalets) ovat suoraan eturinteen vieressä — hiihtokengillä rinteiden juurelle. Glacier-huoneistot ovat 150 metrin päässä ja Skistar 600 metrin päässä rinteistä."
            : "Our closest properties (Hiihtäjänkuja, Front Slope Chalets) are right at the front slope — ski-in/ski-out. Glacier apartments are 150 metres and Skistar 600 metres from the slopes.",
        },
        {
          q: isFi ? "Onko majoituksissa oma sauna?" : "Do your properties have a sauna?",
          a: isFi
            ? "Kyllä, lähes kaikissa kohteissamme on oma sauna. Karhupirtissä on perinteinen puulämmitteinen sauna."
            : "Yes, nearly all our properties have their own sauna. Karhupirtti has a traditional wood-fired sauna.",
        },
        {
          q: isFi ? "Voiko lemmikkien kanssa majoittua?" : "Are pets allowed?",
          a: isFi
            ? "Karhupirtti (Bearlodge) hyväksyy lemmikit. Muissa kohteissa lemmikkejä ei valitettavasti sallita."
            : "Karhupirtti (Bearlodge) welcomes pets. Unfortunately, pets are not allowed in our other properties.",
          link: isFi ? { href: bearlodgeHref, label: readMore } : undefined,
        },
        {
          q: isFi ? "Onko majoituksissa WiFi ja pysäköinti?" : "Is there WiFi and parking?",
          a: isFi
            ? "Kyllä, kaikissa kohteissamme on ilmainen WiFi ja ilmainen pysäköintipaikka."
            : "Yes, all our properties have free WiFi and free parking.",
        },
        {
          q: isFi
            ? "Mille ryhmäkoolle majoitukset sopivat?"
            : "What group sizes do your properties accommodate?",
          a: isFi
            ? "Pienin kohteemme on studio 2 hengelle ja suurin Karhupirtti 14 hengelle. Glacier B1 ja B2 majoittavat 10 henkeä. Isommille ryhmille voimme varata useita kohteita vierekkäin."
            : "Our smallest property is a studio for 2 guests and the largest is Karhupirtti for 14 guests. Glacier B1 and B2 accommodate 10 guests. For larger groups, we can book multiple properties nearby.",
        },
      ],
    },
    {
      id: "slopes",
      title: isFi ? "Rinteet ja laskettelu" : "Slopes & Skiing",
      items: [
        {
          q: isFi ? "Montako rinnettä Levillä on?" : "How many slopes does Levi have?",
          a: isFi
            ? "Levillä on 43 rinnettä ja 28 hissiä. Rinnepituutta on yhteensä noin 44 kilometriä. Se on Suomen suurin hiihtokeskus."
            : "Levi has 43 slopes and 28 lifts. Total slope length is about 44 kilometres. It's Finland's largest ski resort.",
          link: { href: skiingHref, label: readMore },
        },
        {
          q: isFi ? "Mikä on Levin pisin rinne?" : "What is the longest slope in Levi?",
          a: isFi
            ? "Levin pisin rinne on noin 2 500 metriä pitkä."
            : "The longest slope in Levi is approximately 2,500 metres.",
          link: { href: skiingHref, label: readMore },
        },
        {
          q: isFi ? "Mikä on Levin korkeusero?" : "What is Levi's vertical drop?",
          a: isFi
            ? "Levin korkeusero on 325 metriä. Tunturin huippu on 531 metriä merenpinnasta ja laaksotaso noin 206 metriä."
            : "Levi's vertical drop is 325 metres. The summit is 531 metres above sea level and the base is about 206 metres.",
        },
        {
          q: isFi ? "Milloin Levin rinteet avataan?" : "When do Levi's slopes open?",
          a: isFi
            ? "Rinteet avataan yleensä lokakuun puolivälissä lumitykkien avulla. Täysi kausi alkaa marraskuussa ja jatkuu toukokuun alkuun."
            : "Slopes usually open in mid-October with snow cannons. The full season starts in November and continues until early May.",
        },
        {
          q: isFi ? "Milloin Levin rinteet suljetaan?" : "When do Levi's slopes close?",
          a: isFi
            ? "Rinteet suljetaan yleensä vapun jälkeen, toukokuun alussa. Tarkat päivämäärät vaihtelevat lumitilanteen mukaan."
            : "Slopes typically close after May Day, in early May. Exact dates depend on snow conditions.",
        },
        {
          q: isFi ? "Sopiiko Levi aloittelijoille?" : "Is Levi suitable for beginners?",
          a: isFi
            ? "Kyllä, Levi on erinomainen aloittelijoille. Laajat viherrinteet, hiihtokoulu ja lastenmaa tekevät aloittamisesta helppoa. Noin kolmannes rinteistä on helppoja."
            : "Yes, Levi is excellent for beginners. Wide green slopes, ski school and children's areas make learning easy. About a third of the slopes are easy.",
          link: { href: skiingHref, label: readMore },
        },
      ],
    },
    {
      id: "xc-skiing",
      title: isFi ? "Hiihtoladut" : "Cross-Country Skiing",
      items: [
        {
          q: isFi ? "Kuinka pitkät ladut Levillä on?" : "How long are the ski trails in Levi?",
          a: isFi
            ? "Levin latuverkosto on noin 230 kilometriä. Ladut vaihtelevat helpoista perheladuista vaativiin reitteihin Pallas-Yllästunturin kansallispuistoon."
            : "Levi's trail network is about 230 kilometres. Trails range from easy family routes to challenging routes into Pallas-Yllästunturi National Park.",
          link: { href: xcSkiingHref, label: readMore },
        },
        {
          q: isFi ? "Mistä näen latujen kunnon?" : "Where can I check trail conditions?",
          a: isFi
            ? "Reaaliaikainen latukartta ja kuntotiedot löytyvät osoitteesta infogis.fi/levi. Sieltä näet mitkä ladut on kunnostettu ja milloin."
            : "Real-time trail map and conditions are available at infogis.fi/levi. You can see which trails have been groomed and when.",
          link: { href: "https://www.infogis.fi/levi", label: "infogis.fi/levi", external: true },
        },
        {
          q: isFi
            ? "Onko Levillä helpohkoja latuja aloittelijoille?"
            : "Are there easy trails for beginners in Levi?",
          a: isFi
            ? "Kyllä, Levin keskustan läheltä lähtee useita helppoja 2–5 km latuja jotka sopivat aloittelijoille ja perheille. Zero Point -alueelta lähtevät ladut ovat suosituimpia."
            : "Yes, there are several easy 2–5 km trails starting near Levi centre, suitable for beginners and families. Trails from the Zero Point area are the most popular.",
          link: { href: xcSkiingHref, label: readMore },
        },
      ],
    },
    {
      id: "snow-weather",
      title: isFi ? "Lumi ja sää" : "Snow & Weather",
      items: [
        {
          q: isFi ? "Onko Levillä lunta?" : "Does Levi have snow?",
          a: isFi
            ? "Lumikausi Levillä kestää tyypillisesti lokakuun lopusta toukokuuhun. Paras lumitilanne on helmi–maaliskuussa jolloin lumensyvyys on 60–90 cm. Tarkista ajankohtainen lumitilanne sivultamme."
            : "Snow season in Levi typically lasts from late October to May. Best snow conditions are in February–March with 60–90 cm depth. Check current snow depth on our page.",
          link: { href: snowHref, label: readMore },
        },
        {
          q: isFi ? "Onko Levillä lunta jouluna?" : "Does Levi have snow at Christmas?",
          a: isFi
            ? "Kyllä, Levillä on lähes aina lunta joulun aikaan. Joulukuun lumensyvyys on tyypillisesti 40–70 cm. Lumitykit takaavat rinteiden toiminnan."
            : "Yes, Levi almost always has snow at Christmas. December snow depth is typically 40–70 cm. Snow cannons ensure slopes are operational.",
        },
        {
          q: isFi ? "Onko Levillä lunta huhtikuussa?" : "Does Levi have snow in April?",
          a: isFi
            ? "Kyllä, huhtikuu on yksi parhaista kuukausista Levillä. Lunta on vielä runsaasti (50–70 cm), päivät ovat pitkiä ja aurinkoiset kelit ovat yleisiä. Kevätlatu on parhaimmillaan."
            : "Yes, April is one of the best months in Levi. There's still plenty of snow (50–70 cm), days are long and sunny weather is common. Spring skiing is at its best.",
        },
        {
          q: isFi ? "Kuinka kylmää Levillä on talvella?" : "How cold does it get in Levi in winter?",
          a: isFi
            ? "Tammi–helmikuussa keskiölämpötila on noin -14°C. Kylmimmillään voi olla -30°C tai alle. Joulukuussa tyypillisesti -10 – -20°C. Oikealla pukeutumisella pakkasesta nauttii."
            : "In January–February average temperature is about -14°C. It can drop to -30°C or below. December is typically -10 to -20°C. With proper clothing, the cold is enjoyable.",
          link: { href: weatherHref, label: readMore },
        },
      ],
    },
    {
      id: "ski-passes",
      title: isFi ? "Hissiliput" : "Ski Passes",
      items: [
        {
          q: isFi ? "Paljonko hissiliput maksavat?" : "How much do ski passes cost?",
          a: isFi
            ? "Hissilippujen hinnat vaihtelevat kauden ja lipun keston mukaan. Emme julkaise tarkkoja hintoja koska ne voivat muuttua. Tarkista ajankohtaiset hinnat Levin viralliselta sivulta tai kysy meiltä majoitus + hissiliput -pakettitarjousta."
            : "Ski pass prices vary by season and duration. We don't publish exact prices as they may change. Check current prices on Levi's official website, or ask us about accommodation + ski pass package deals.",
          link: { href: skiingHref, label: readMore },
        },
        {
          q: isFi
            ? "Saako teiltä majoitus + hissiliput -paketin?"
            : "Can I get an accommodation + ski pass package?",
          a: isFi
            ? "Kyllä, tarjoamme räätälöityjä paketteja jotka sisältävät majoituksen ja hissiliput. Kysy tarjous sähköpostilla info@leville.net tai WhatsAppilla +358 44 13 13 13."
            : "Yes, we offer customised packages including accommodation and ski passes. Ask for a quote at info@leville.net or WhatsApp +358 44 13 13 13.",
        },
      ],
    },
    {
      id: "transport",
      title: isFi ? "Kulkeminen" : "Getting There & Around",
      items: [
        {
          q: isFi ? "Miten Leville pääsee?" : "How do I get to Levi?",
          a: isFi
            ? "Leville pääsee lentäen Kittilän lentokentälle (15 min bussilla), junalla Kolariin (1h bussilla) tai autolla. Helsingistä lentäen noin 1,5 tuntia."
            : "You can reach Levi by flying to Kittilä airport (15 min by bus), by train to Kolari (1h by bus), or by car. Flying from Helsinki takes about 1.5 hours.",
          link: { href: transportHref, label: readMore },
        },
        {
          q: isFi ? "Pääseekö junalla Leville?" : "Can I get to Levi by train?",
          a: isFi
            ? "Suoraa junaa Leville ei ole. Lähin juna-asema on Kolari, josta on noin 80 km ja 1 tunti bussilla Leville. Yöjuna Helsingistä Kolariin kestää noin 14 tuntia ja on suosittu vaihtoehto."
            : "There's no direct train to Levi. The nearest station is Kolari, about 80 km and 1 hour by bus. The overnight train from Helsinki to Kolari takes about 14 hours and is a popular option.",
          link: { href: transportHref, label: readMore },
        },
        {
          q: isFi ? "Tarvitseeko Levillä autoa?" : "Do I need a car in Levi?",
          a: isFi
            ? "Ei välttämättä. Levin keskusta on kompakti ja rinteet, ravintolat ja kaupat ovat kävelymatkan päässä. Pidemmille retkille (kansallispuistot, Ylläs) auto on kätevä, mutta myös busseja ja takseja on saatavilla."
            : "Not necessarily. Levi centre is compact and slopes, restaurants and shops are within walking distance. For longer trips (national parks, Ylläs), a car is handy, but buses and taxis are also available.",
          link: { href: gettingAroundHref, label: readMore },
        },
      ],
    },
    {
      id: "restaurants",
      title: isFi ? "Ravintolat ja palvelut" : "Restaurants & Services",
      items: [
        {
          q: isFi ? "Mitä ravintoloita Levillä on?" : "What restaurants are there in Levi?",
          a: isFi
            ? "Levillä on yli 40 ravintolaa laidasta laitaan: lappalaista keittiötä, pizzeriaa, aasialaista, burgereita ja fine diningia. Katso paikallisen suositukset ravintolaoppaastamme."
            : "Levi has over 40 restaurants covering everything: Lappish cuisine, pizzerias, Asian food, burgers and fine dining. Check our restaurant guide for local recommendations.",
          link: { href: restaurantsHref, label: readMore },
        },
        {
          q: isFi ? "Onko Levillä ruokakauppoja?" : "Are there grocery stores in Levi?",
          a: isFi
            ? "Kyllä, keskustassa on K-Market ja S-Market. Molemmat ovat avoinna päivittäin. K-Market on aivan rinteiden juurella ja S-Market parin sadan metrin päässä."
            : "Yes, there's a K-Market and S-Market in the centre. Both are open daily. K-Market is right at the base of the slopes and S-Market is a couple of hundred metres away.",
        },
        {
          q: isFi ? "Mistä saa alkoholia?" : "Where can I buy alcohol?",
          a: isFi
            ? "Alko (valtion alkoholimonopoli) sijaitsee S-Marketin yhteydessä Levin keskustassa. Ruokakaupat myyvät mietoja alkoholijuomia (olut, siideri, lonkero). Alko on avoinna arkisin ja lauantaisin, suljettu sunnuntaisin."
            : "Alko (state alcohol monopoly) is located next to S-Market in Levi centre. Grocery stores sell mild alcoholic beverages (beer, cider, lonkero). Alko is open on weekdays and Saturdays, closed on Sundays.",
        },
      ],
    },
    {
      id: "northern-lights",
      title: isFi ? "Revontulet" : "Northern Lights",
      items: [
        {
          q: isFi ? "Näkyykö Levillä revontulia?" : "Can you see the northern lights in Levi?",
          a: isFi
            ? "Kyllä, Levi sijaitsee revontulivyöhykkeellä ja revontulia näkyy noin 200 yönä vuodessa. Paras aika on syyskuusta maaliskuuhun kirkkaana pimeänä yönä."
            : "Yes, Levi is located in the aurora zone and northern lights are visible about 200 nights per year. The best time is September to March on a clear, dark night.",
          link: { href: auroraHref, label: readMore },
        },
        {
          q: isFi
            ? "Milloin on paras aika nähdä revontulia Levillä?"
            : "When is the best time to see northern lights in Levi?",
          a: isFi
            ? "Tilastollisesti parhaat kuukaudet ovat syys–lokakuu ja helmi–maaliskuu. Joulukuussa on pisin pimeä aika mutta usein pilvistä. Maaliskuussa yhdistyvät pimeys ja kirkkaat taivaat."
            : "Statistically the best months are September–October and February–March. December has the longest darkness but is often cloudy. March combines darkness with clear skies.",
          link: isFi ? undefined : { href: "/guide/best-time-for-northern-lights-levi", label: readMore },
        },
        {
          q: isFi ? "Miten revontulet syntyvät?" : "How are northern lights formed?",
          a: isFi
            ? "Revontulet syntyvät kun aurinkotuulen varautuneet hiukkaset törmäävät ilmakehän kaasumolekyyleihin magneettisten napojen lähellä. Törmäys saa kaasut hehkumaan vihreänä, violettina ja punaisena."
            : "Northern lights form when charged particles from the solar wind collide with gas molecules in the atmosphere near the magnetic poles. The collisions make gases glow green, violet and red.",
          link: isFi ? undefined : { href: "/guide/how-northern-lights-form", label: readMore },
        },
      ],
    },
    {
      id: "summer-activities",
      title: isFi ? "Kesä ja aktiviteetit" : "Summer & Activities",
      items: [
        {
          q: isFi ? "Mitä Levillä voi tehdä kesällä?" : "What can you do in Levi in summer?",
          a: isFi
            ? "Vaellus, maastopyöräily, golf, kalastus, melonta, SUP-lautailu, kesäkelkkarata ja yötön yö. Kesä on Levin edullisin matkustusaika ja luonto on vehreimmillään."
            : "Hiking, mountain biking, golf, fishing, canoeing, SUP, summer toboggan and midnight sun. Summer is Levi's most affordable travel season and nature is at its greenest.",
          link: { href: summerHref, label: readMore },
        },
        {
          q: isFi ? "Mitä Levillä voi tehdä lasten kanssa?" : "What can you do in Levi with kids?",
          a: isFi
            ? "Levi on erinomainen lapsiperhekohde: hiihtokoulu lapsille, lastenmaa Kid's Land, eläinpuisto, huskyajelu, porovierailu ja sisäleikkipuisto. Talvella laskettelu ja kelkkailu, kesällä pyöräily ja luontoretket."
            : "Levi is an excellent family destination: ski school for kids, Kid's Land, animal park, husky rides, reindeer visits and indoor play park. Skiing and sledging in winter, cycling and nature trips in summer.",
          link: { href: kidsHref, label: readMore },
        },
        {
          q: isFi ? "Onko Levi tunturi vai vaara?" : "Is Levi a fell or a hill?",
          a: isFi
            ? "Levi on tunturi. Sen korkeus on 531 metriä merenpinnasta. Tunturiksi luokitellaan yli 500 metriä korkeat, puuttomat laet omaavat vaarat."
            : "Levi is a fell (tunturi in Finnish). Its height is 531 metres above sea level. A fell is classified as a hill over 500 metres with a treeless summit.",
        },
        {
          q: isFi ? "Onko Levi kaupunki vai kylä?" : "Is Levi a city or a village?",
          a: isFi
            ? "Levi on matkailukeskus Kittilän kunnassa. Se on Suomen suurin ja tunnetuin hiihtokeskus, mutta hallinnollisesti osa Sirkan kylää. Vakituisia asukkaita on noin 800, mutta sesonkiaikana Levillä voi olla yli 25 000 matkailijaa."
            : "Levi is a tourism centre in the municipality of Kittilä. It's Finland's largest and most well-known ski resort, but administratively part of Sirkka village. There are about 800 permanent residents, but during peak season Levi can have over 25,000 visitors.",
        },
      ],
    },
  ];

  const readNext = isFi
    ? [
        { title: "Majoitus Levillä", href: accommodationsHref },
        { title: "Laskettelu Levillä", href: skiingHref },
        { title: "Revontulet Levillä", href: auroraHref },
        { title: "Säätietoa Leviltä", href: weatherHref },
      ]
    : [
        { title: "Accommodation in Levi", href: accommodationsHref },
        { title: "Skiing in Levi", href: skiingHref },
        { title: "Northern Lights in Levi", href: auroraHref },
        { title: "Weather in Levi", href: weatherHref },
      ];

  return { categories, readNext };
};

interface LeviFAQProps {
  lang?: Lang;
}

const LeviFAQ = ({ lang = "fi" }: LeviFAQProps) => {
  const isFi = lang === "fi";
  const year = new Date().getFullYear();

  const { categories, readNext } = useMemo(() => buildContent(lang), [lang]);

  const title = isFi
    ? `Levi UKK ${year} — vastaukset 60+ kysymykseen Levin lomasta`
    : `Levi FAQ ${year} — 60+ Answers About Your Levi Holiday`;
  const description = isFi
    ? "Kaikki mitä sinun tarvitsee tietää Levin lomasta: rinteet, ladut, sää, majoitus, kulkeminen ja hinnat. Paikallisen vastaukset kysymyksiisi."
    : "Everything you need to know about Levi ski resort: slopes, trails, weather, accommodation, transport and prices. Local expert answers.";
  const canonical = isFi
    ? "https://leville.net/levi/ukk"
    : "https://leville.net/en/levi/faq";

  const hreflangUrls = {
    fi: "https://leville.net/levi/ukk",
    en: "https://leville.net/en/levi/faq",
  };

  // FAQPage JSON-LD with all Q&A pairs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  const breadcrumbItems = isFi
    ? [
        { label: "Levi", href: "/levi" },
        { label: "UKK", href: "/levi/ukk" },
      ]
    : [
        { label: "Levi", href: "/en/levi" },
        { label: "FAQ", href: "/en/levi/faq" },
      ];

  const ctaHeading = isFi ? "Varaa Levin lomasi" : "Book Your Levi Holiday";
  const ctaText = isFi
    ? "Tutustu kohteisiimme ja varaa suoraan — saat parhaan hinnan ilman välikäsiä."
    : "Browse our properties and book directly — get the best price with no middlemen.";
  const ctaButton = isFi ? "Katso vapaat majoitukset" : "Check Available Accommodation";

  const renderAnswer = (item: QA) => (
    <div className="text-muted-foreground leading-relaxed">
      <p>{item.a}</p>
      {item.link && (
        <p className="mt-3">
          {item.link.external ? (
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              {item.link.label} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              to={item.link.href}
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              {item.link.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </p>
      )}
    </div>
  );

  return (
    <>
      <SeoMeta
        title={title}
        description={description}
        canonicalUrl={canonical}
        lang={lang}
        ogType="article"
      />
      <HreflangTags currentPath={isFi ? "/levi/ukk" : "/en/levi/faq"} currentLang={lang} customUrls={hreflangUrls} />
      <JsonLd data={faqSchema} />

      <SubpageBackground />
      <Header />

      <main className="relative z-10">
        <Breadcrumbs lang={lang} items={breadcrumbItems} />

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {isFi
                ? "Usein kysytyt kysymykset Levistä"
                : "Frequently Asked Questions About Levi"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isFi
                ? "Tältä sivulta löydät vastaukset yleisimpiin kysymyksiin Levin lomasta. Jos et löydä vastausta, ota yhteyttä — autamme mielellämme!"
                : "Find answers to the most common questions about your Levi holiday. If you can't find what you're looking for, contact us — we're happy to help!"}
            </p>
          </header>

          {/* Sticky table of contents */}
          <nav
            aria-label={isFi ? "Sisällysluettelo" : "Table of contents"}
            className="sticky top-20 z-20 mb-10 bg-background/80 backdrop-blur-md border border-border/40 rounded-xl p-4"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {isFi ? "Aiheet" : "Topics"}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="inline-block px-3 py-1.5 text-sm rounded-full bg-white/5 border border-border/40 hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories with accordions */}
          {categories.map((cat) => (
            <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-5">
                {cat.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {cat.items.map((item, idx) => (
                  <AccordionItem
                    key={`${cat.id}-${idx}`}
                    value={`${cat.id}-${idx}`}
                    className="border-border/40"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent>{renderAnswer(item)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}

          {/* Booking CTA */}
          <section className="my-12 bg-white/5 border border-border/40 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              {ctaHeading}
            </h2>
            <p className="text-muted-foreground mb-6">{ctaText}</p>
            <a
              href={moderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-xl transition-colors"
            >
              {ctaButton} <ArrowRight className="w-4 h-4" />
            </a>
          </section>

          {/* Read Next */}
          <section className="mt-12 pt-8 border-t border-border/30">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {isFi ? "Lue myös" : "Read next"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {readNext.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white/5 border border-border/40 hover:border-primary/50 transition-colors group"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        </article>

        <PageCTA lang={lang} />
      </main>

      <Footer lang={lang} />
      <StickyBookingBar lang={lang} />
      <WhatsAppChat />
    </>
  );
};

export default LeviFAQ;
