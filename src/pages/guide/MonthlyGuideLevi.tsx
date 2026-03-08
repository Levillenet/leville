import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getArticleSchema, getFAQSchema, getBreadcrumbSchema } from "@/utils/structuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Sun, Snowflake, Users, Calendar, ArrowRight, Mountain, Star } from "lucide-react";
import ReadNextSection, { ReadNextLink } from "@/components/guide/ReadNextSection";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MonthlyGuideLeviProps {
  lang?: string;
}

// Derive month number from URL path
const monthFromPath: Record<string, number> = {
  "tammikuussa": 1, "january": 1,
  "helmikuussa": 2, "february": 2,
  "maaliskuussa": 3, "march": 3,
  "huhtikuussa": 4, "april": 4,
  "toukokuussa": 5, "may": 5,
  "kesakuussa": 6, "june": 6,
  "heinakuussa": 7, "july": 7,
  "elokuussa": 8, "august": 8,
  "syyskuussa": 9, "september": 9,
  "lokakuussa": 10, "october": 10,
  "marraskuussa": 11, "november": 11,
  "joulukuussa": 12, "december": 12,
};

interface QuickFact {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface MonthData {
  meta: { title: string; description: string; canonical: string };
  h1: string;
  subtitle: string;
  quickFacts: QuickFact[];
  whatItsLike: { title: string; text: string };
  whatToDo: { title: string; items: string[] };
  events: { title: string; items: string[]; disclaimer: string };
  tips: { title: string; items: string[] };
  faqs: { question: string; answer: string }[];
  readNext: ReadNextLink[];
  cta: { text: string; href: string };
  hreflang: Record<string, string>;
  breadcrumbs: { name: string; url: string }[];
}

function getMonthData(month: number, lang: string): MonthData | null {
  const isFi = lang === "fi";

  const monthNames: Record<string, Record<number, string>> = {
    fi: { 1: "tammikuu", 2: "helmikuu", 3: "maaliskuu", 4: "huhtikuu", 5: "toukokuu", 6: "kesäkuu", 7: "heinäkuu", 8: "elokuu", 9: "syyskuu", 10: "lokakuu", 11: "marraskuu", 12: "joulukuu" },
    en: { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" },
  };

  const fiPaths: Record<number, string> = {
    1: "/opas/levi-tammikuussa", 2: "/opas/levi-helmikuussa", 3: "/opas/levi-maaliskuussa", 4: "/opas/levi-huhtikuussa",
    5: "/opas/levi-toukokuussa", 6: "/opas/levi-kesakuussa", 7: "/opas/levi-heinakuussa", 8: "/opas/levi-elokuussa",
    9: "/opas/levi-syyskuussa", 10: "/opas/levi-lokakuussa", 11: "/opas/levi-marraskuussa", 12: "/opas/levi-joulukuussa",
  };
  const enPaths: Record<number, string> = {
    1: "/guide/levi-in-january", 2: "/guide/levi-in-february", 3: "/guide/levi-in-march", 4: "/guide/levi-in-april",
    5: "/guide/levi-in-may", 6: "/guide/levi-in-june", 7: "/guide/levi-in-july", 8: "/guide/levi-in-august",
    9: "/guide/levi-in-september", 10: "/guide/levi-in-october", 11: "/guide/levi-in-november", 12: "/guide/levi-in-december",
  };

  const base = "https://leville.net";
  const hreflang = { fi: fiPaths[month], en: enPaths[month] };
  const canonical = isFi ? `${base}${fiPaths[month]}` : `${base}${enPaths[month]}`;

  const seasonPage = isFi ? "/opas/talvi-levi" : "/guide/winter-in-levi";
  const weatherPage = isFi ? "/levi/saatieto-levilta" : "/guide/weather-in-levi";
  const accommodationsPage = isFi ? "/majoitukset" : "/en/accommodations";

  const guideBreadcrumb = isFi
    ? { name: "Opas", url: `${base}/opas` }
    : { name: "Guide", url: `${base}/guide` };

  switch (month) {
    case 1: {
      const mName = monthNames[lang]?.[1] || "January";
      return {
        meta: isFi
          ? { title: "Levi tammikuussa — Kaamos, revontulet ja rauha | Leville.net", description: "Millaista Levillä on tammikuussa? Kaamos päättyy, revontulet loistavat, rinteet ovat tyhjiä ja hinnat edullisia. Paikallisen opas.", canonical }
          : { title: "Levi in January — Polar Night, Northern Lights & Peace | Leville.net", description: "What is Levi like in January? Polar night ends, northern lights shine, slopes are empty and prices are low. A local's guide.", canonical },
        h1: isFi ? "Levi tammikuussa — kun kaamos väistyy ja valo palaa" : "Levi in January — When the Polar Night Fades and Light Returns",
        subtitle: isFi ? "Rauhallinen, edullinen ja revontulien valaisema" : "Peaceful, affordable and illuminated by Northern Lights",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "-10…-25 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: isFi ? "2–6 h" : "2–6 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Runsas, kuohkea" : "Deep, powdery" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Rauhallinen" : "Quiet" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on tammikuussa?" : "What is Levi like in January?",
          text: isFi
            ? "Tammikuu on Levin parhaita salaisuuksia. Joulusesonki on ohi, rinteet ovat lähes tyhjiä ja majoituksen saa edullisesti. Kaamos päättyy tammikuun alussa ja sen jälkeen valo lisääntyy joka päivä — muutos pimeästä valoon on koskettava. Revontulille tammikuu on erinomainen kuukausi: pitkät pimeät yöt ja usein kirkas taivas. Pakkanen voi olla kova, mutta oikein pukeutuneena se on osa kokemusta."
            : "January is one of Levi's best-kept secrets. The Christmas rush is over, slopes are nearly empty and accommodation is affordable. The polar night ends in early January and after that, daylight increases every day — the transition from darkness to light is moving. January is excellent for northern lights: long dark nights and often clear skies. The cold can be intense, but properly dressed it's part of the experience.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä tammikuussa?" : "What to do in January?",
          items: isFi
            ? [
                "Laskettelu ja hiihto — rinteet valaistuja, ladut erinomaisessa kunnossa, ei jonoja",
                "Revontulien katselu — parhaat olosuhteet vuodesta (pitkät yöt, usein kirkas sää)",
                "Huskyajelu ja porosafari — safarit pyörivät mutta turisteja vähemmän → intiimimpi kokemus",
                "Moottorikelkkasafari — paksulla hangella pääsee kaikkialle",
                "Avantouinti + sauna — arktisimmillaan tammikuussa",
                "Hiljaisuus ja rauhoittuminen — tammikuu on Levin meditatiivisin kuukausi",
              ]
            : [
                "Skiing and snowboarding — slopes are lit, trails in excellent condition, no queues",
                "Northern Lights viewing — best conditions of the year (long nights, often clear skies)",
                "Husky and reindeer safaris — tours run with fewer tourists → more intimate experience",
                "Snowmobile safari — thick snow cover lets you go anywhere",
                "Ice swimming + sauna — at its most arctic in January",
                "Silence and relaxation — January is Levi's most meditative month",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Tammikuussa ei tyypillisesti ole suuria tapahtumia — se on osa kuukauden viehätystä. Rauhallinen aika."]
            : ["January typically has no major events — that's part of the month's charm. A peaceful time."],
          disclaimer: isFi ? "Tarkista ajantasainen tapahtumakalenteri: levi.fi" : "Check the up-to-date event calendar: levi.fi",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Pukeudu erittäin lämpimästi — tammikuu on vuoden kylmimpiä kuukausia (-20…-35 °C mahdollista)",
                "Akku tyhjenee nopeasti pakkasessa — pidä puhelin ja varavirtalähde sisätaskussa",
                "Varaa autoon lohkolämmitin (vuokra-autoissa yleensä mukana)",
                "Majoitus ja lennot edullisimmillaan — tammikuu on Levin \"low season\"",
              ]
            : [
                "Dress extremely warmly — January is one of the coldest months (-20…-35 °C possible)",
                "Batteries drain quickly in the cold — keep your phone and power bank in an inside pocket",
                "Book a block heater for your car (rental cars usually include one)",
                "Accommodation and flights at their cheapest — January is Levi's low season",
              ],
        },
        faqs: isFi
          ? [
              { question: "Onko tammikuussa tarpeeksi valoa lasketteluun?", answer: "Kyllä — rinteet ovat valaistuja klo 9–19. Päivänvalo lisääntyy nopeasti kuun loppua kohti." },
              { question: "Onko liian kylmää?", answer: "Voi olla kylmä (-25…-35 °C), mutta oikein pukeutuneena se on hallittavissa. Tuulettomat päivät ovat miellyttäviä kovemmassakin pakkasessa." },
              { question: "Näkeekö revontulia?", answer: "Tammikuu on yksi parhaista kuukausista — pitkät yöt ja usein kirkas sää." },
            ]
          : [
              { question: "Is there enough light for skiing in January?", answer: "Yes — slopes are illuminated from 9 AM to 7 PM. Daylight increases rapidly towards the end of the month." },
              { question: "Is it too cold?", answer: "It can be cold (-25…-35 °C), but with proper clothing it's manageable. Windless days are pleasant even in heavy frost." },
              { question: "Can you see the Northern Lights?", answer: "January is one of the best months — long nights and often clear skies." },
            ],
        readNext: isFi
          ? [
              { title: "Talvi Levillä", desc: "Kaikki talvikauden olosuhteet ja aktiviteetit", href: "/opas/talvi-levi" },
              { title: "Revontulet", desc: "Revontuliopas ja ennuste", href: "/revontulet" },
              { title: "Hinnat Levillä", desc: "Mitä Levi-loma maksaa?", href: "/opas/hinnat-levilla" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Winter in Levi", desc: "All winter season conditions and activities", href: "/guide/winter-in-levi" },
              { title: "Northern Lights", desc: "Aurora guide and forecast", href: "/revontulet" },
              { title: "Prices in Levi", desc: "What does a Levi holiday cost?", href: "/guide/prices-in-levi" },
              { title: "Accommodations", desc: "Find the right accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Tammikuu on Levin edullisin ja rauhaisin aika — varaa majoitus.", href: "/majoitukset" }
          : { text: "January is Levi's most affordable and peaceful time — book accommodation.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 2: {
      const mName = monthNames[lang]?.[2] || "February";
      return {
        meta: isFi
          ? { title: "Levi helmikuussa — Hiihtoloma, laskettelu ja pitkät päivät | Leville.net", description: "Millaista Levillä on helmikuussa? Hiihtolomakausi, erinomaiset olosuhteet, kasvava valo ja paljon tekemistä. Paikallisen opas.", canonical }
          : { title: "Levi in February — Ski Holiday, Slopes & Growing Light | Leville.net", description: "What is Levi like in February? Finnish ski holiday season, excellent conditions, growing daylight and plenty to do.", canonical },
        h1: isFi ? "Levi helmikuussa — hiihtoloman paratiisi" : "Levi in February — Ski Holiday Paradise",
        subtitle: isFi ? "Valo palaa, lumi parhaimmillaan, tunnelma huipussaan" : "Light returns, snow at its best, atmosphere at its peak",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "-8…-20 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "7–9 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Parhaimmillaan" : "At its best" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Vilkas → huippu" : "Busy → peak" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on helmikuussa?" : "What is Levi like in February?",
          text: isFi
            ? "Helmikuu on Levin suosituin kuukausi. Valo on palannut toden teolla — aurinko nousee jo korkealle ja tunturimaisemat kylpevät kultaisessa valossa. Lumi on parhaimmillaan ja olosuhteet ovat erinomaiset sekä lasketteluun että hiihtoon. Hiihtolomaviikot (vk 8–10) tuovat suomalaisperheitä Leville — tunnelma on iloinen ja energinen. Helmikuu on kalliimpi ja vilkkaampi, mutta syystä: olosuhteet ovat täydelliset."
            : "February is Levi's most popular month. Light has truly returned — the sun rises high and fell landscapes bathe in golden light. Snow is at its best and conditions are excellent for both downhill and cross-country skiing. Finnish ski holiday weeks (weeks 8–10) bring families to Levi — the atmosphere is joyful and energetic. February is pricier and busier, but for good reason: conditions are perfect.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä helmikuussa?" : "What to do in February?",
          items: isFi
            ? [
                "Laskettelu ja hiihto — kauden parhaat olosuhteet, kaikki rinteet ja ladut auki",
                "Kaikki safarit täydessä vauhdissa (husky, poro, moottorikelkka)",
                "Lasten aktiviteetit (Leevilandia, laskettelukoulu, minikelkat)",
                "Revontulet — vielä mahdollisia helmikuussa (yöt pimenevät klo 18 jälkeen)",
                "Lumikenkäily ja fatbike auringonpaisteessa",
              ]
            : [
                "Skiing and snowboarding — best conditions of the season, all slopes and trails open",
                "All safaris in full swing (husky, reindeer, snowmobile)",
                "Kids' activities (Leevilandia, ski school, mini snowmobiles)",
                "Northern Lights — still possible in February (nights darken after 6 PM)",
                "Snowshoeing and fatbiking in the sunshine",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Hiihtolomaviikot (vk 8, 9, 10) — erityisohjelmaa perheille, tapahtumia kylässä"]
            : ["Finnish ski holiday weeks (weeks 8, 9, 10) — special programmes for families, village events"],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "VARAA AJOISSA — hiihtolomaviikkojen majoitus täyttyy kuukausia etukäteen",
                "Hissilippu ennakkoon verkosta (halvempi + ei jonotusta)",
                "Välinevuokraus ennakkoon — suositut koot voivat loppua",
                "Ravintolat: varaa pöytä etukäteen hiihtolomaviikoille",
                "Rinteet: vältä ruuhka laskemalla aamulla (9–10) tai iltapäivällä (15–17)",
              ]
            : [
                "BOOK EARLY — ski holiday week accommodation fills up months in advance",
                "Buy your lift pass online in advance (cheaper + no queuing)",
                "Reserve equipment rental in advance — popular sizes can run out",
                "Restaurants: book a table in advance for ski holiday weeks",
                "Slopes: avoid crowds by skiing early morning (9–10) or late afternoon (15–17)",
              ],
        },
        faqs: isFi
          ? [
              { question: "Milloin ovat hiihtolomaviikot?", answer: "Viikot 8, 9 ja 10 (helmi–maaliskuu). Alue vaihtelee vuosittain." },
              { question: "Onko helmikuussa ruuhkaa?", answer: "Hiihtolomaviikoilla kyllä. Viikot ennen ja jälkeen ovat rauhallisempia." },
              { question: "Paljonko helmikuun loma maksaa?", answer: "Kalliimpi kuin tammikuu. Katso hintaopas." },
            ]
          : [
              { question: "When are the Finnish ski holiday weeks?", answer: "Weeks 8, 9 and 10 (February–March). The exact region varies each year." },
              { question: "Is it crowded in February?", answer: "During ski holiday weeks, yes. Weeks before and after are calmer." },
              { question: "How much does a February holiday cost?", answer: "More expensive than January. Check the price guide." },
            ],
        readNext: isFi
          ? [
              { title: "Talvi Levillä", desc: "Talvikauden kokonaisopas", href: "/opas/talvi-levi" },
              { title: "Laskettelu Levillä", desc: "Rinteet, hissit ja vinkit", href: "/opas/laskettelu-levi" },
              { title: "Lapsiperheet Levillä", desc: "Opas perheille", href: "/opas/lapsiperheet-levilla" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Winter in Levi", desc: "Complete winter guide", href: "/guide/winter-in-levi" },
              { title: "Skiing in Levi", desc: "Slopes, lifts and tips", href: "/guide/skiing-in-levi" },
              { title: "Levi for Kids", desc: "Family guide", href: "/activities/levi-for-kids" },
              { title: "Accommodations", desc: "Find the right accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Hiihtolomaviikot täyttyvät nopeasti — varaa majoitus ajoissa.", href: "/majoitukset" }
          : { text: "Ski holiday weeks fill up fast — book accommodation early.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 3: {
      const mName = monthNames[lang]?.[3] || "March";
      return {
        meta: isFi
          ? { title: "Levi maaliskuussa — Kevätaurinko, paras lumi ja rento tunnelma | Leville.net", description: "Millaista Levillä on maaliskuussa? Kevätaurinko, eniten lunta, edullisemmat hinnat ja rento tunnelma. Monien suosikkikuukausi.", canonical }
          : { title: "Levi in March — Spring Sun, Best Snow & Relaxed Vibes | Leville.net", description: "What is Levi like in March? Spring sun, most snow of the season, lower prices and a relaxed atmosphere. Many locals' favorite month.", canonical },
        h1: isFi ? "Levi maaliskuussa — monien mielestä paras kuukausi" : "Levi in March — Many Say It's the Best Month",
        subtitle: isFi ? "Kevätaurinko, eniten lunta ja rento tunnelma" : "Spring sun, most snow and relaxed vibes",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "-5…-15 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "10–14 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Eniten koko vuodesta" : "Most of the entire year" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Rauhallinen" : "Calm" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on maaliskuussa?" : "What is Levi like in March?",
          text: isFi
            ? "Maaliskuu on monien paikallisten suosikki. Hiihtolomaruuhka on ohi, mutta lunta on enemmän kuin koskaan ja aurinko paistaa jo pitkään. Terassit aukeavat, tunnelma on rento ja Levi on parhaimmillaan. Hinnat laskevat hiihtolomalta ja majoitusta on saatavilla hyvin. Olosuhteet ovat erinomaiset sekä rinteissä että laduilla."
            : "March is many locals' favorite. The ski holiday rush is over, but there's more snow than ever and the sun shines for long hours. Terraces open up, the atmosphere is relaxed and Levi is at its best. Prices drop from the ski holiday peak and accommodation is readily available. Conditions are excellent on both slopes and trails.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä maaliskuussa?" : "What to do in March?",
          items: isFi
            ? [
                "Kevätlaskettelu auringonpaisteessa — terassilaskettelu on maaliskuun parasta",
                "Hiihto: ladut parhaimmillaan, kantava hanki aamuisin, pehmittyvä iltapäivisin",
                "Fatbike hangella — aamupäivällä pääsee melkein minne vain",
                "Lumikenkäily auringossa",
                "Revontulet: vielä mahdollisia maaliskuun alussa (yöt pimenevät ~klo 20)",
                "Safarit jatkuvat — mutta rennommassa tahdissa",
              ]
            : [
                "Spring skiing in the sunshine — terrace skiing is March's highlight",
                "Cross-country skiing: trails at their best, firm crust in mornings, softening in afternoons",
                "Fatbiking on the crust — in the morning you can go almost anywhere",
                "Snowshoeing in the sun",
                "Northern Lights: still possible in early March (nights darken around 8 PM)",
                "Safaris continue — at a more relaxed pace",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Viimeisimmät hiihtolomaviikot (vk 10) voivat osua maaliskuun alkuun"]
            : ["The last Finnish ski holiday week (week 10) may fall in early March"],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Aurinkovoide! Maaliskuun aurinko on voimakas ja lumi heijastaa UV-säteilyä",
                "Aurinkolasit välttämättömät — hangelta heijastuva valo on kirkas",
                "Olosuhteet vaihtelevat: aamulla kova hanki, iltapäivällä pehmeä sohjo → hyödynnä aamu",
                "Edullisempi kuin helmikuu — hyvä hinta-laatusuhde",
              ]
            : [
                "Sunscreen! The March sun is strong and snow reflects UV radiation",
                "Sunglasses are essential — the light reflecting off the snow is intense",
                "Conditions vary: firm crust in the morning, soft slush in the afternoon → take advantage of mornings",
                "Cheaper than February — excellent value for money",
              ],
        },
        faqs: isFi
          ? [
              { question: "Onko maaliskuussa vielä lunta?", answer: "Kyllä, enemmän kuin koskaan. Maaliskuu on Levin lumisinta aikaa." },
              { question: "Voiko maaliskuussa nähdä revontulia?", answer: "Alkukuussa kyllä. Loppukuussa yöt ovat jo liian valoisia." },
              { question: "Onko maaliskuu edullinen?", answer: "Kyllä, selvästi halvempi kuin helmikuu. Erinomainen hinta-laatusuhde." },
            ]
          : [
              { question: "Is there still snow in March?", answer: "Yes, more than ever. March is Levi's snowiest time." },
              { question: "Can you see the Northern Lights in March?", answer: "In early March, yes. By late March the nights are too bright." },
              { question: "Is March affordable?", answer: "Yes, significantly cheaper than February. Excellent value for money." },
            ],
        readNext: isFi
          ? [
              { title: "Kevät Levillä", desc: "Kevätkauden olosuhteet ja aktiviteetit", href: "/opas/kevat-levi" },
              { title: "Sää Levillä", desc: "Sääolosuhteet kuukausittain", href: "/levi/saatieto-levilta" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Spring in Levi", desc: "Spring season conditions and activities", href: "/guide/spring-in-levi" },
              { title: "Weather in Levi", desc: "Weather conditions by month", href: "/guide/weather-in-levi" },
              { title: "Accommodations", desc: "Find the right accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Maaliskuu on paikallisten suosikki — varaa oma kevätlomasi.", href: "/majoitukset" }
          : { text: "March is locals' favorite — book your spring holiday.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 4: {
      const mName = monthNames[lang]?.[4] || "April";
      return {
        meta: isFi
          ? { title: "Levi huhtikuussa — Kevätlaskettelu, pitkät päivät ja kauden päätös | Leville.net", description: "Millaista Levillä on huhtikuussa? Kevätlaskettelu parhaimmillaan, pitkät päivät, Ylläs-Levi hiihto ja kauden päätösjuhlat.", canonical }
          : { title: "Levi in April — Spring Skiing, Long Days & Season Finale | Leville.net", description: "What is Levi like in April? Spring skiing at its best, long days, Ylläs-Levi ski race and end-of-season celebrations.", canonical },
        h1: isFi ? "Levi huhtikuussa — kevätlaskettelun huippu" : "Levi in April — Peak Spring Skiing",
        subtitle: isFi ? "Aurinko, pitkät päivät ja kauden päätösjuhlat" : "Sunshine, long days and end-of-season celebrations",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "-5…+5 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "15–20 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Runsas, pehmenee" : "Plentiful, softening" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Rauhallinen" : "Quiet" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on huhtikuussa?" : "What is Levi like in April?",
          text: isFi
            ? "Huhtikuu on Levin \"secret season\". Lunta on vielä runsaasti mutta aurinko paistaa jo lähes ympäri vuorokauden. Rinteet ovat auki (tyypillisesti huhtikuun loppuun, joskus toukokuulle), ladut loistavassa kunnossa ja tunnelma on rento kauden päätösjuhlan tyyliin. T-paitalaskettelu on mahdollista aurinkoisina päivinä. Hinnat ovat vuoden edullisimpia."
            : "April is Levi's \"secret season\". There's still plenty of snow but the sun shines almost around the clock. Slopes are open (typically until late April, sometimes into May), trails are in great shape and the vibe is relaxed, end-of-season style. T-shirt skiing is possible on sunny days. Prices are among the lowest of the year.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä huhtikuussa?" : "What to do in April?",
          items: isFi
            ? [
                "Kevätlaskettelu — terassilaskettelu parhaimmillaan, aurinko lämmittää",
                "Hiihto: Ylläs-Levi hiihto (55 km ja 70 km) järjestetään tyypillisesti huhtikuussa",
                "Fatbike kantavalla hangella — aamuisin pääsee tunturin huipulle",
                "Lumikenkäily kevätauringossa",
                "Ensimmäiset kevään merkit: lintuja, sulamisvesiä jokivarsilla",
              ]
            : [
                "Spring skiing — terrace skiing at its finest, the sun warms you",
                "Cross-country: Ylläs-Levi ski race (55 km and 70 km) is typically held in April",
                "Fatbiking on the firm crust — mornings take you to the fell tops",
                "Snowshoeing in the spring sun",
                "First signs of spring: birds returning, meltwater in the river valleys",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? [
                "Ylläs-Levi hiihto (huhtikuu) — perinteinen pitkän matkan hiihtotapahtuma, myös harrastajille",
                "Kauden päätöstapahtumat rinteillä",
              ]
            : [
                "Ylläs-Levi ski race (April) — traditional long-distance skiing event, open to amateurs too",
                "End-of-season events on the slopes",
              ],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Aurinkovoide ja aurinkolasit pakollisia — UV voimakas",
                "Olosuhteet vaihtelevat päivän aikana rajusti: aamulla -5 °C ja kova hanki, iltapäivällä +5 °C ja pehmeä lumi",
                "Rinteiden sulkemispäivä vaihtelee vuosittain — tarkista levi.fi",
                "Vuoden edullisinta aikaa majoituksessa ja lennoissa",
              ]
            : [
                "Sunscreen and sunglasses are mandatory — UV is strong",
                "Conditions change dramatically during the day: -5 °C and firm crust in the morning, +5 °C and soft snow in the afternoon",
                "Slope closing date varies each year — check levi.fi",
                "Among the most affordable times of year for accommodation and flights",
              ],
        },
        faqs: isFi
          ? [
              { question: "Ovatko rinteet vielä auki huhtikuussa?", answer: "Kyllä, tyypillisesti huhtikuun loppuun. Tarkista aina levi.fi." },
              { question: "Voiko hiihtää huhtikuussa?", answer: "Kyllä, ladut ovat auki yleensä vappuun asti. Olosuhteet erinomaiset." },
              { question: "Onko huhtikuussa jo lämmintä?", answer: "Auringossa tuntuu lämpimältä (+5…+10 °C tuntu), mutta varjossa ja aamuisin on vielä pakkasta." },
            ]
          : [
              { question: "Are the slopes still open in April?", answer: "Yes, typically until late April. Always check levi.fi." },
              { question: "Can you cross-country ski in April?", answer: "Yes, trails are usually open until May Day. Conditions are excellent." },
              { question: "Is it already warm in April?", answer: "It feels warm in the sun (+5…+10 °C perceived), but in shade and mornings it's still below zero." },
            ],
        readNext: isFi
          ? [
              { title: "Kevät Levillä", desc: "Kevätkauden kokonaisopas", href: "/opas/kevat-levi" },
              { title: "Sää Levillä", desc: "Sääolosuhteet kuukausittain", href: "/levi/saatieto-levilta" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Spring in Levi", desc: "Spring season guide", href: "/guide/spring-in-levi" },
              { title: "Weather in Levi", desc: "Weather conditions by month", href: "/guide/weather-in-levi" },
              { title: "Accommodations", desc: "Find the right accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Huhtikuu on Levin edullisinta ja aurinkoisinta aikaa — varaa nyt.", href: "/majoitukset" }
          : { text: "April is Levi's most affordable and sunniest time — book now.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 5: {
      const mName = monthNames[lang]?.[5] || "May";
      return {
        meta: isFi
          ? { title: "Levi toukokuussa — Kevät, sulamisvedet ja hiljaisuus | Leville.net", description: "Millaista Levillä on toukokuussa? Rinteet sulkeutuvat, luonto herää ja hiljaisuus laskeutuu tunturiin. Siirtymäkauden opas.", canonical }
          : { title: "Levi in May — Spring Thaw, Silence & Renewal | Leville.net", description: "What is Levi like in May? Slopes close, nature awakens and silence descends on the fells. A guide to the transition season.", canonical },
        h1: isFi ? "Levi toukokuussa — kevään ja kesän välissä" : "Levi in May — Between Spring and Summer",
        subtitle: isFi ? "Siirtymäkausi, hiljaisuus ja luonnon herääminen" : "Transition season, silence and nature awakening",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "0…+10 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "18–22 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Sulaa nopeasti" : "Melting fast" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Hyvin rauhallinen" : "Very quiet" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on toukokuussa?" : "What is Levi like in May?",
          text: isFi
            ? "Toukokuu on Levin siirtymäkautta. Rinteet ja ladut sulkeutuvat yleensä vapun tienoilla. Lumi sulaa nopeasti etenkin kylässä, mutta tunturin huipulla voi olla lunta pitkälle toukokuuhun. Monet ravintolat ja safariyrittäjät pitävät taukoa ennen kesäsesonkia. Luonto herää — muuttolinnut palaavat, purot virtaavat, koivut silmukoivat. Toukokuu on hiljaista ja edullista, mutta palveluvalikoima on rajallisempi."
            : "May is Levi's transition season. Slopes and trails usually close around May Day. Snow melts quickly especially in the village, but fell tops may have snow well into May. Many restaurants and safari operators take a break before summer season. Nature awakens — migratory birds return, streams flow, birch trees bud. May is quiet and affordable, but the range of services is more limited.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä toukokuussa?" : "What to do in May?",
          items: isFi
            ? [
                "Vaellus ja kävely — tunturireitit aukeavat lumen sulettua (loppukuussa)",
                "Lintujen tarkkailu — muuttolinnut palaavat Lappiin",
                "Kalastus — Ounasjoki vapautuu jäästä, kalastuskausi alkaa",
                "Pyöräily — maantiepyöräily mahdollista kun tiet kuivuvat",
                "Hiljaisuus ja luonnon heräämisen seuraaminen",
              ]
            : [
                "Hiking and walking — fell trails open as snow melts (late month)",
                "Birdwatching — migratory birds return to Lapland",
                "Fishing — Ounasjoki river breaks free from ice, fishing season begins",
                "Cycling — road cycling possible as roads dry out",
                "Silence and watching nature awaken",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Toukokuussa ei tyypillisesti ole suuria tapahtumia — siirtymäkausi palvelujen välillä."]
            : ["May typically has no major events — it's a transition period between seasons."],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Tarkista etukäteen mitkä palvelut ovat auki — siirtymäkaudella valikoima rajoitettu",
                "Kelirikkotilanteen vuoksi maastopolut voivat olla mutaisia — kumisaappaat hyödylliset",
                "Hyttyset eivät vielä vaivaa toukokuussa",
                "Edullisinta aikaa majoituksessa",
              ]
            : [
                "Check in advance which services are open — limited selection during transition season",
                "Trails can be muddy due to thaw — rubber boots are useful",
                "Mosquitoes are not yet an issue in May",
                "Most affordable time for accommodation",
              ],
        },
        faqs: isFi
          ? [
              { question: "Voiko toukokuussa lasketella?", answer: "Yleensä ei — rinteet sulkeutuvat vapun tienoilla. Tarkista levi.fi." },
              { question: "Onko toukokuussa tekemistä?", answer: "Kyllä luontoaktiviteetteja, mutta safarit ja osa ravintoloista pitävät taukoa. Rauhallista ja edullista." },
              { question: "Onko toukokuussa lunta?", answer: "Kylässä ei juuri. Tunturin huipulla mahdollisesti. Lumi sulaa nopeasti." },
            ]
          : [
              { question: "Can you ski in May?", answer: "Usually not — slopes close around May Day. Check levi.fi." },
              { question: "Is there anything to do in May?", answer: "Yes, nature activities, but safaris and some restaurants take a break. Quiet and affordable." },
              { question: "Is there snow in May?", answer: "Barely any in the village. Possibly on fell tops. Snow melts quickly." },
            ],
        readNext: isFi
          ? [
              { title: "Kevät Levillä", desc: "Kevätkauden opas", href: "/opas/kevat-levi" },
              { title: "Kesä Levillä", desc: "Kesäkauden opas", href: "/opas/kesa-levi" },
              { title: "Sää Levillä", desc: "Sääolosuhteet kuukausittain", href: "/levi/saatieto-levilta" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Spring in Levi", desc: "Spring season guide", href: "/guide/spring-in-levi" },
              { title: "Summer in Levi", desc: "Summer season guide", href: "/guide/summer-in-levi" },
              { title: "Weather in Levi", desc: "Weather by month", href: "/guide/weather-in-levi" },
              { title: "Accommodations", desc: "Find accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Toukokuu on hiljaista ja edullista — täydellinen luonnon ystäville.", href: "/majoitukset" }
          : { text: "May is quiet and affordable — perfect for nature lovers.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 6: {
      const mName = monthNames[lang]?.[6] || "June";
      return {
        meta: isFi
          ? { title: "Levi kesäkuussa — Yötön yö, vaellus ja keskiyön aurinko | Leville.net", description: "Millaista Levillä on kesäkuussa? Yötön yö alkaa, luonto kukoistaa ja kesäaktiviteetit käynnistyvät.", canonical }
          : { title: "Levi in June — Midnight Sun, Hiking & Summer Begins | Leville.net", description: "What is Levi like in June? Midnight sun starts, nature blooms and summer activities begin.", canonical },
        h1: isFi ? "Levi kesäkuussa — yötön yö ja luonnon herääminen" : "Levi in June — Midnight Sun and Nature in Bloom",
        subtitle: isFi ? "Aurinko ei laske — luonto räjähtää vihreäksi" : "The sun doesn't set — nature explodes into green",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "+5…+20 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "24 h ☀️" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Sulanut" : "Melted" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Kasvava" : "Growing" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on kesäkuussa?" : "What is Levi like in June?",
          text: isFi
            ? "Kesäkuu on Lapin kesän alku. Yötön yö alkaa — aurinko ei laske lainkaan kesäkuun alusta heinäkuun alkuun. Luonto räjähtää vihreäksi muutamassa viikossa. Tunturiniityt kukkivat, joet virtaavat ja lintujen laulu täyttää metsät. Kesäaktiviteetit (vaellus, pyöräily, kalastus, melonta) käynnistyvät täysillä. Hyttyset ilmestyvät loppukuussa."
            : "June marks the beginning of Lapland summer. The midnight sun starts — the sun doesn't set at all from early June to early July. Nature explodes into green within weeks. Fell meadows bloom, rivers flow and birdsong fills the forests. Summer activities (hiking, cycling, fishing, canoeing) launch in full. Mosquitoes appear towards the end of the month.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä kesäkuussa?" : "What to do in June?",
          items: isFi
            ? [
                "Vaellus tunturiin — reitit aukeavat, pitkät päivät mahdollistavat myöhäiset retket",
                "Keskiyön aurinko -golf — pelaa klo 23 tai klo 2 yöllä",
                "Maastopyöräily ja fatbike — Levi Bike Park aukeaa",
                "Kalastus Ounasjoella — perhokalastuskausi alkaa",
                "Melonta ja SUP Immeljärvellä",
                "Keskiyön auringon ihastelu — se ei koskaan vanhene",
              ]
            : [
                "Hiking into the fells — trails open, long days allow late trips",
                "Midnight sun golf — play at 11 PM or 2 AM",
                "Mountain biking and fatbiking — Levi Bike Park opens",
                "Fishing on Ounasjoki river — fly fishing season begins",
                "Canoeing and SUP on Lake Immeljärvi",
                "Admiring the midnight sun — it never gets old",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Kesäsesongin avajaiset ja ensimmäiset kesätapahtumat — tarkista ohjelma etukäteen."]
            : ["Summer season opening and first summer events — check the programme in advance."],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Hyttyssuoja! Kesäkuun loppu on hyttyskauden alkua — ota mukaan hyttysverkko ja suojavoide",
                "Yöt ovat valoisia → pimennysverhot tai unimaski avuksi nukkumiseen",
                "Sää vaihtelee — voi olla +20 °C auringossa mutta +5 °C tuulisena päivänä. Kerrospukeutuminen.",
              ]
            : [
                "Mosquito repellent! Late June marks the start of mosquito season — bring nets and repellent",
                "Nights are bright → blackout curtains or a sleep mask help with sleeping",
                "Weather varies — can be +20 °C in sun but +5 °C on a windy day. Layer up.",
              ],
        },
        faqs: isFi
          ? [
              { question: "Onko kesäkuussa ihan valoisaa yöllä?", answer: "Kyllä, aurinko ei laske lainkaan." },
              { question: "Ovatko hyttyset ongelma?", answer: "Loppukuussa alkavat. Ota hyttyssuoja mukaan." },
              { question: "Mitä lämpötilaa odottaa?", answer: "Vaihteleva, +5…+20 °C. Valmistaudu molempiin." },
            ]
          : [
              { question: "Is it truly light all night in June?", answer: "Yes, the sun doesn't set at all." },
              { question: "Are mosquitoes a problem?", answer: "They start appearing towards the end of June. Bring repellent." },
              { question: "What temperatures to expect?", answer: "Variable, +5…+20 °C. Be prepared for both." },
            ],
        readNext: isFi
          ? [
              { title: "Kesä Levillä", desc: "Kesäkauden kokonaisopas", href: "/opas/kesa-levi" },
              { title: "Vaellus ja pyöräily", desc: "Reitit ja vinkit", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Summer in Levi", desc: "Complete summer guide", href: "/guide/summer-in-levi" },
              { title: "Hiking & Biking", desc: "Trails and tips", href: "/activities/hiking-and-biking-levi" },
              { title: "Accommodations", desc: "Find accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Kesäloma Levillä — yötön yö, vaellus ja keskiyön golf.", href: "/majoitukset" }
          : { text: "Summer holiday in Levi — midnight sun, hiking and midnight golf.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 7: {
      const mName = monthNames[lang]?.[7] || "July";
      return {
        meta: isFi
          ? { title: "Levi heinäkuussa — Keskikesä, vaellus ja vesistöt | Leville.net", description: "Millaista Levillä on heinäkuussa? Lapin kesän huippu — lämpimintä, valoisinta ja eniten aktiviteetteja.", canonical }
          : { title: "Levi in July — Midsummer, Hiking & Lake Activities | Leville.net", description: "What is Levi like in July? Peak Lapland summer — warmest, brightest and most activities.", canonical },
        h1: isFi ? "Levi heinäkuussa — keskikesän huippu" : "Levi in July — Peak Midsummer",
        subtitle: isFi ? "Lämpimin kuukausi, kaikki aktiviteetit täydessä vauhdissa" : "Warmest month, all activities in full swing",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "+10…+25 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "22–24 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Ei lainkaan" : "None" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Kesähuippu" : "Summer peak" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on heinäkuussa?" : "What is Levi like in July?",
          text: isFi
            ? "Heinäkuu on Levin lämpimin ja vilkkain kesäkuukausi. Suomalaisten kesälomakausi tuo perheitä pohjoiseen. Kaikki kesäaktiviteetit ovat täydessä vauhdissa. Luonto on vehreimmillään, marjat kypsyvät (mustikka ja puolukka myöhemmin) ja vesistöt ovat lämpimimmillään. Hyttyset ovat aktiivisimmillaan heinäkuussa."
            : "July is Levi's warmest and busiest summer month. The Finnish summer holiday season brings families north. All summer activities are in full swing. Nature is at its lushest, berries are ripening (blueberries and lingonberries later) and waters are at their warmest. Mosquitoes are most active in July.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä heinäkuussa?" : "What to do in July?",
          items: isFi
            ? [
                "Vaellus kansallispuistossa (Pallas-Yllästunturi)",
                "Maastopyöräily ja Levi Bike Park",
                "SUP ja melonta Immeljärvellä ja Ounasjoella",
                "Kalastus — paras aika kesäkalastukselle",
                "Golf keskiyön auringossa",
                "Uiminen ja rantapäivä Immeljärvellä (Saunabar-ravintola)",
                "Marjojen poiminta (loppukuussa mustikkaa)",
              ]
            : [
                "Hiking in Pallas-Yllästunturi National Park",
                "Mountain biking and Levi Bike Park",
                "SUP and canoeing on Lake Immeljärvi and Ounasjoki",
                "Fishing — best time for summer fishing",
                "Golf under the midnight sun",
                "Swimming and beach day at Lake Immeljärvi (Saunabar restaurant)",
                "Berry picking (blueberries towards end of month)",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Musiikkitapahtumat ja festivaalit — vaihtelee vuosittain. Tarkista ohjelma."]
            : ["Music events and festivals — varies by year. Check the programme."],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Hyttyset ovat pahimmillaan — suojavoide, verkko ja pitkähihaiset vaatteet",
                "Uiminen: Lapin vedet ovat viileitä (+15–18 °C) mutta virkistäviä",
                "Majoitukset voivat olla kysyttyjä suomalaisten lomaviikkoina (vk 27–30)",
              ]
            : [
                "Mosquitoes are at their worst — repellent, nets and long sleeves recommended",
                "Swimming: Lapland waters are cool (+15–18 °C) but refreshing",
                "Accommodation can be in demand during Finnish holiday weeks (weeks 27–30)",
              ],
        },
        faqs: isFi
          ? [
              { question: "Kuinka lämmintä heinäkuussa on?", answer: "Tyypillisesti +15…+25 °C, parhaimmillaan jopa +30 °C. Lapin ennätys on yli +35 °C." },
              { question: "Onko heinäkuussa hyttysiä?", answer: "Kyllä, heinäkuu on hyttyssesongin huippua. Varaudu hyvin." },
              { question: "Voiko uida?", answer: "Kyllä, Immeljärvellä ja Ounasjoella. Vesi on viileää mutta virkistävää." },
            ]
          : [
              { question: "How warm is it in July?", answer: "Typically +15…+25 °C, sometimes up to +30 °C. Lapland's record is over +35 °C." },
              { question: "Are there mosquitoes in July?", answer: "Yes, July is peak mosquito season. Be well prepared." },
              { question: "Can you swim?", answer: "Yes, in Lake Immeljärvi and Ounasjoki. Water is cool but refreshing." },
            ],
        readNext: isFi
          ? [
              { title: "Kesä Levillä", desc: "Kesäkauden kokonaisopas", href: "/opas/kesa-levi" },
              { title: "Melonta ja SUP", desc: "Vesillä Levillä", href: "/aktiviteetit/melonta-ja-sup-levi" },
              { title: "Vaellus ja pyöräily", desc: "Reitit ja vinkit", href: "/aktiviteetit/vaellus-ja-maastopyoraily-levi" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Summer in Levi", desc: "Complete summer guide", href: "/guide/summer-in-levi" },
              { title: "Canoeing & SUP", desc: "Water activities in Levi", href: "/activities/canoeing-and-sup-levi" },
              { title: "Hiking & Biking", desc: "Trails and tips", href: "/activities/hiking-and-biking-levi" },
              { title: "Accommodations", desc: "Find accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Heinäkuu on Lapin kesän huippu — varaa kesälomasi Leville.", href: "/majoitukset" }
          : { text: "July is the peak of Lapland summer — book your summer holiday.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    case 8: {
      const mName = monthNames[lang]?.[8] || "August";
      return {
        meta: isFi
          ? { title: "Levi elokuussa — Kesän loppu, marjat ja pimeät yöt palaavat | Leville.net", description: "Millaista Levillä on elokuussa? Kesän jatkoa, marjakausi huipussaan, ensimmäiset revontulet ja syksyn esimaku.", canonical }
          : { title: "Levi in August — Late Summer, Berries & Dark Nights Return | Leville.net", description: "What is Levi like in August? Summer continues, berry season peaks, first northern lights and a hint of autumn.", canonical },
        h1: isFi ? "Levi elokuussa — kesän loppu ja syksyn esimaku" : "Levi in August — Late Summer and a Taste of Autumn",
        subtitle: isFi ? "Marjat, hiljaisuus ja ensimmäiset revontulet" : "Berries, silence and the first Northern Lights",
        quickFacts: [
          { icon: <Thermometer className="w-5 h-5" />, label: isFi ? "Lämpötila" : "Temperature", value: "+8…+18 °C" },
          { icon: <Sun className="w-5 h-5" />, label: isFi ? "Päivänvalo" : "Daylight", value: "16–20 h" },
          { icon: <Snowflake className="w-5 h-5" />, label: isFi ? "Lumi" : "Snow", value: isFi ? "Ei vielä" : "Not yet" },
          { icon: <Users className="w-5 h-5" />, label: isFi ? "Sesonki" : "Season", value: isFi ? "Rauhallinen" : "Quiet" },
        ],
        whatItsLike: {
          title: isFi ? "Millaista Levillä on elokuussa?" : "What is Levi like in August?",
          text: isFi
            ? "Elokuu on Lapin aliarvostetuin kuukausi. Kesä jatkuu mutta yöt pimenevät — ja se tarkoittaa revontulien paluuta! Ensimmäiset aurora-havainnot ovat mahdollisia elokuun lopussa. Marjakausi on huipussaan: mustikat, puolukat ja lakat kypsyvät tunturien rinteillä. Hyttyset vähenevät merkittävästi. Luonto alkaa valmistautua syksyyn — ensimmäiset keltaiset lehdet ilmestyvät kuun lopussa."
            : "August is Lapland's most underrated month. Summer continues but nights darken — meaning the Northern Lights return! First aurora sightings are possible in late August. Berry season is at its peak: blueberries, lingonberries and cloudberries ripen on the fell slopes. Mosquitoes decrease significantly. Nature starts preparing for autumn — first yellow leaves appear at month's end.",
        },
        whatToDo: {
          title: isFi ? "Mitä tehdä elokuussa?" : "What to do in August?",
          items: isFi
            ? [
                "Marjojen poiminta — mustikka ja puolukka parhaimmillaan",
                "Vaellus — reitit tyhjempiä kuin heinäkuussa, hyttyset vähenevät",
                "Revontulien katselu — ensimmäiset mahdolliset havainnot loppukuussa",
                "Kalastus — edelleen hyvää",
                "Pyöräily ja maastopyöräily",
                "Sienien poiminta — herkkutatit ja kantarellit",
              ]
            : [
                "Berry picking — blueberries and lingonberries at their best",
                "Hiking — trails are emptier than July, mosquitoes decreasing",
                "Northern Lights watching — first possible sightings in late August",
                "Fishing — still good",
                "Cycling and mountain biking",
                "Mushroom foraging — porcini and chanterelles",
              ],
        },
        events: {
          title: isFi ? "Tapahtumat" : "Events",
          items: isFi
            ? ["Elokuussa ei tyypillisesti suuria tapahtumia — rauhallinen aika ennen ruskakautta."]
            : ["August typically has no major events — a peaceful time before the ruska season."],
          disclaimer: isFi ? "Tarkista: levi.fi/tapahtumat" : "Check: levi.fi/tapahtumat",
        },
        tips: {
          title: isFi ? "Käytännön vinkit" : "Practical Tips",
          items: isFi
            ? [
                "Hyttyset vähenevät elokuussa merkittävästi — helpompi olla ulkona",
                "Yöt viilenevät — ota villapaitoja ja lämmin takki mukaan iltoihin",
                "Jokamiehenoikeus: saat poimia marjoja ja sieniä vapaasti metsistä",
                "Rauhallinen ja edullinen aika — hyvä hinta-laatusuhde",
              ]
            : [
                "Mosquitoes decrease significantly in August — easier to be outdoors",
                "Evenings get cooler — bring warm layers for the nights",
                "Everyman's right: you can freely pick berries and mushrooms in the forests",
                "Quiet and affordable time — excellent value",
              ],
        },
        faqs: isFi
          ? [
              { question: "Näkeekö elokuussa revontulia?", answer: "Mahdollisesti loppukuussa kun yöt pimenevät. Ei taattua." },
              { question: "Milloin marjakausi on?", answer: "Mustikka ja puolukka tyypillisesti elo–syyskuussa. Lakka heinä–elokuussa." },
              { question: "Onko elokuussa hyttysiä?", answer: "Selvästi vähemmän kuin heinäkuussa. Suojavoide silti mukaan." },
            ]
          : [
              { question: "Can you see the Northern Lights in August?", answer: "Possibly in late August when nights darken. Not guaranteed." },
              { question: "When is berry season?", answer: "Blueberries and lingonberries typically August–September. Cloudberries July–August." },
              { question: "Are there mosquitoes in August?", answer: "Significantly fewer than July. Still bring repellent." },
            ],
        readNext: isFi
          ? [
              { title: "Kesä Levillä", desc: "Kesäkauden opas", href: "/opas/kesa-levi" },
              { title: "Ruska Levillä", desc: "Syksyn väriloisto", href: "/opas/syksy-ruska-levi" },
              { title: "Revontulet", desc: "Revontuliopas", href: "/revontulet" },
              { title: "Majoitukset", desc: "Löydä sopiva majoitus", href: "/majoitukset" },
            ]
          : [
              { title: "Summer in Levi", desc: "Summer season guide", href: "/guide/summer-in-levi" },
              { title: "Autumn Ruska", desc: "Fall colors in Levi", href: "/guide/autumn-ruska-in-levi" },
              { title: "Northern Lights", desc: "Aurora guide", href: "/revontulet" },
              { title: "Accommodations", desc: "Find accommodation", href: "/en/accommodations" },
            ],
        cta: isFi
          ? { text: "Elokuu on Levin aliarvostetuin aika — marjat, hiljaisuus ja ensimmäiset revontulet.", href: "/majoitukset" }
          : { text: "August is Levi's most underrated time — berries, silence and the first Northern Lights.", href: "/en/accommodations" },
        hreflang,
        breadcrumbs: [
          { name: isFi ? "Etusivu" : "Home", url: isFi ? base : `${base}/en` },
          guideBreadcrumb,
          { name: isFi ? `Levi ${mName}` : `Levi in ${mName}`, url: canonical },
        ],
      };
    }

    default:
      return null;
  }
}

const MonthlyGuideLevi = ({ lang = "fi" }: MonthlyGuideLeviProps) => {
  const location = useLocation();
  const isFi = lang === "fi";

  // Derive month from URL
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1] || "";
  // Extract the month keyword: "levi-tammikuussa" → "tammikuussa", "levi-in-january" → "january"
  const monthKey = lastSegment.replace("levi-", "").replace("in-", "");
  const month = monthFromPath[monthKey] || 1;

  const data = getMonthData(month, lang);
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Content coming soon.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9F6F1" }}>
      <Header />

      <SeoMeta
        title={data.meta.title}
        description={data.meta.description}
        canonicalUrl={data.meta.canonical}
        lang={lang}
        ogType="article"
      />

      <HreflangTags
        currentPath={location.pathname}
        currentLang={lang as any}
        customUrls={data.hreflang}
      />

      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getArticleSchema({ title: data.meta.title.split(" | ")[0], description: data.meta.description, url: data.meta.canonical, lang, datePublished: "2025-06-01", dateModified: "2026-03-01" })} />
      <JsonLd data={getBreadcrumbSchema(data.breadcrumbs)} />
      <JsonLd data={getFAQSchema(data.faqs)} />

      <main id="main-content">
        <SubpageBackground />

        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Breadcrumbs
              items={data.breadcrumbs.map((b) => ({
                label: b.name,
                href: b.url.replace("https://leville.net", ""),
              }))}
            />
            <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4" style={{ color: "#2D2D2D" }}>
              {data.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">{data.subtitle}</p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.quickFacts.map((fact, i) => (
              <Card key={i} className="border-border/30 text-center shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div style={{ color: "#B8860B" }}>{fact.icon}</div>
                  <p className="text-xs" style={{ color: "#666" }}>{fact.label}</p>
                  <p className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{fact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What it's like */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>{data.whatItsLike.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{data.whatItsLike.text}</p>
        </section>

        {/* What to do */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>{data.whatToDo.title}</h2>
          <ul className="space-y-3">
            {data.whatToDo.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Star className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "#B8860B" }} />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Events */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>{data.events.title}</h2>
          {data.events.items.map((item, i) => (
            <p key={i} className="text-muted-foreground mb-2">{item}</p>
          ))}
          <p className="text-sm italic text-muted-foreground mt-3">📅 {data.events.disclaimer}</p>
        </section>

        {/* Tips */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#2D2D2D" }}>{data.tips.title}</h2>
          <ul className="space-y-3">
            {data.tips.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary font-bold">→</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#2D2D2D" }}>
            {isFi ? "Usein kysyttyä" : "Frequently Asked Questions"}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
                <AccordionTrigger className="text-left font-semibold" style={{ color: "#2D2D2D" }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Read Next */}
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <ReadNextSection
            title={isFi ? "Lue myös" : "Read also"}
            links={data.readNext}
          />
        </div>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <Card className="border-0 shadow-lg" style={{ background: "linear-gradient(135deg, #2D2D2D, #3d3d3d)" }}>
            <CardContent className="p-8 text-center">
              <p className="text-lg mb-6" style={{ color: "#F9F6F1" }}>{data.cta.text}</p>
              <Link to={data.cta.href}>
                <Button size="lg" className="text-white font-semibold" style={{ backgroundColor: "#B8860B" }}>
                  {isFi ? "Katso majoitukset" : "View accommodations"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
      <WhatsAppChat />
      <StickyBookingBar />
    </div>
  );
};

export default MonthlyGuideLevi;
