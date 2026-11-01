import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import { Button } from "@/components/ui/button";
import { openCookieSettings } from "@/lib/cookieConsent";

export default function Evasteet({ lang = "fi" }: { lang?: "fi" | "en" }) {
  const fi = lang === "fi";
  const title = fi ? "Evästeseloste" : "Cookie policy";
  const path = fi ? "/evasteet" : "/en/cookies";
  const rows = fi ? [
    ["Välttämättömät", "lv_cookie_consent, lv_consent_history", "Paikallinen tallennus: valinta, ajankohta, suostumustekstin versio ja aiemmat valinnat. Valinta on voimassa 12 kuukautta; aiempi hyväksyntä säilytetään myös perumisen jälkeen."],
    ["lv-kävijämittaus", "_lv_sid", "Istuntotallennus: satunnainen kävijätunniste. Tilastointisuostumuksella mittaamme sivukäyntejä, laitetta, kieltä, sivulla vietettyä aikaa, vieritystä ja sivustohakuja. Säilyy selaimen istunnon ajan."],
    ["Markkinointi", "_lv_utm_source, _lv_utm_medium, _lv_utm_campaign", "Istuntotallennus: kampanjan lähde, kanava ja nimi. Markkinointisuostumuksella kampanjatunnisteet ja mainosklikkauksen tunnisteet siirtyvät Moder-varauslinkkeihin mainonnan tuloksellisuuden mittaamiseksi."],
    ["Google Analytics (kun käytössä)", "_ga, _ga_*", "Tilastointievästeet: satunnainen kävijä- ja istuntotunniste, sivukäynnit ja laitetiedot. Google Analytics käynnistyy vain tilastointisuostumuksella ja määritetyllä mittaustunnuksella. Googlen oletussäilytysaika on enintään 2 vuotta."],
    ["Meta (myöhemmin)", "_fbp, _fbc", "Ei käytössä tässä toteutuksessa. Jos Meta otetaan myöhemmin käyttöön, markkinointisuostumus vaaditaan ja seloste päivitetään ennen käyttöönottoa."],
  ] : [
    ["Necessary", "lv_cookie_consent, lv_consent_history", "Local storage: your choices, timestamp, notice version and previous choices. Your choice is valid for 12 months; acceptance evidence is retained after withdrawal."],
    ["lv visitor measurement", "_lv_sid", "Session storage: a random visitor identifier. With statistics consent we measure page visits, device, language, time on page, scrolling and site searches. Retained for the browser session."],
    ["Marketing", "_lv_utm_source, _lv_utm_medium, _lv_utm_campaign", "Session storage: campaign source, medium and name. With marketing consent, campaign and advertising click identifiers are forwarded to Moder booking links to measure advertising effectiveness."],
    ["Google Analytics (when enabled)", "_ga, _ga_*", "Statistics cookies: random visitor and session identifiers, page visits and device details. Google Analytics starts only with statistics consent and a configured measurement ID. Google's default cookie lifetime is up to 2 years."],
    ["Meta (future)", "_fbp, _fbc", "Not enabled in this implementation. If Meta is added later, marketing consent will be required and this policy will be updated before activation."],
  ];
  return <>
    <Helmet><html lang={lang} /><title>{title} | Leville.net</title><meta name="description" content={fi ? "Leville.netin evästeet, kävijämittaus ja suostumusasetukset." : "Leville.net cookies, visitor measurement and consent settings."} /><link rel="canonical" href={`https://leville.net${path}`} /><link rel="alternate" hrefLang="fi" href="https://leville.net/evasteet" /><link rel="alternate" hrefLang="en" href="https://leville.net/en/cookies" /></Helmet>
    <SubpageBackground /><Header />
    <main className="min-h-screen pt-28 pb-16"><div className="container max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-serif mb-6">{title}</h1>
      <p className="text-muted-foreground leading-relaxed mb-6">{fi ? "Välttämätön tallennus säilyttää suostumusvalintasi. Tilastointi ja markkinointi ovat vapaaehtoisia ja pois päältä ennen valintaasi kaikissa maissa. Suostumus voidaan perua milloin tahansa alatunnisteen Evästeasetukset-linkistä. Asetusten avaaminen ei muuta voimassa olevaa valintaa." : "Necessary storage remembers your consent choices. Statistics and marketing are optional and disabled before your choice in every country. You can withdraw consent at any time using Cookie settings in the footer. Opening settings does not change your current choice."}</p>
      <Button onClick={openCookieSettings}>{fi ? "Evästeasetukset" : "Cookie settings"}</Button>
      <div className="mt-8 divide-y divide-border">{rows.map(([category, names, text]) => <section key={category} className="py-6"><h2 className="text-2xl mb-2">{category}</h2><p className="text-primary text-sm break-words mb-2">{names}</p><p className="text-muted-foreground leading-relaxed">{text}</p></section>)}</div>
      <p className="text-muted-foreground leading-relaxed mt-6">{fi ? "Rekisterinpitäjä on Leville.net. Kävijämittauksen tiedot käsittelee Leville.netin Lovable Cloud -palvelu. Google käsittelee sille suostumuksella lähetettyjä tietoja omien ehtojensa mukaisesti; tietoja voi siirtyä ETA-alueen ulkopuolelle soveltuvin suojatoimin. Moder saa varauslinkin kampanjatunnisteet markkinointisuostumuksella. Emme lähetä sähköpostiosoitteita tai muita asiakastunnisteita Googlelle tai Metalle tässä toteutuksessa. Yhteydenotot: info@leville.net." : "Leville.net is the data controller. Visitor measurement is processed in Leville.net's Lovable Cloud service. Google processes consented data under its terms; data may be transferred outside the EEA with applicable safeguards. Moder receives booking-link campaign parameters with marketing consent. This implementation does not send email addresses or other customer matching identifiers to Google or Meta. Contact: info@leville.net."}</p>
      <a className="inline-block mt-6 text-primary underline" href={fi ? "/tietosuoja" : "/en/privacy"}>{fi ? "Tietosuojaseloste" : "Privacy policy"}</a>
    </div></main><Footer lang={lang} />
  </>;
}