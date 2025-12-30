import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Leville.net asiakaspalvelubotin tietopohja
const knowledgeBase = `
# LEVILLE.NET ASIAKASPALVELUBOTTI - TIETOPOHJA

Olet Leville.netin ystävällinen asiakaspalvelubotti. Vastaat asiakkaiden kysymyksiin suomeksi (ja englanniksi jos asiakas kysyy englanniksi).

## TÄRKEÄ: KYSY AINA MAJOITUSKOHDE

Ennen kuin annat laitekohtaisia ohjeita (astianpesukone, uuni, liesi, sauna), KYSY AINA missä asunnossa asiakas majoittuu:
- Skistar-huoneistot (Modernit huoneistot) - 2-6 henkilöä
- Tilavat perheasunnot - 4-10 henkilöä
- Karhupirtti (Bear Lodge) - jopa 14 henkilöä
- Levi Glacier Apartments - jopa 10 henkilöä, mahdollisuus varata 4-10 yksikköä

## SKISTAR-HUONEISTOJEN LAITTEET

### ASTIANPESUKONE CANDY TRIO:
- Avaa astianpesukoneen hana (keittiön hanan takana) ennen käyttöä
- HUOM! Astianpesukonetta ja uunia EI voi käyttää samanaikaisesti!
- Sammuta astianpesukone virtanapista käytön jälkeen jotta uuni toimii

Ohjelmat:
- P1 (65°): Normaalilikaisille astioille (suositusohjelma)
- P2 (75°): Kattiloille ja hyvin likaisille astioille
- P3 (45°): Energiansäästöohjelma
- P4 (50°): Pikapesu
- P5: Lyhyt kylmä esipesu

Käyttö: 1. Avaa hana 2. Avaa luukku 3. Virta päälle 4. Lisää pesuaine 5. Valitse ohjelma 6. Sulje luukku

### UUNI CANDY TRIO:
- HUOM! Uunia ja astianpesukonetta EI voi käyttää samanaikaisesti!
- Sammuta astianpesukone jotta uuni toimii

Toiminnot: Tavallinen kypsennys (65-230°C), Grilli (230°C), Kiertoilmagrillaus (190-210°C), Kiertoilmakypsennys (65-210°C)

Käyttö: 1. Valitse kypsennysmenetelmä 2. Aseta lämpötila 3. Käännä ajastinta (1-120 min) tai käytä Käsiasentoa

Esilämmitysajat: 210-230°C: 20 min, 140-190°C: 15 min, 65-115°C: 10 min

### LIESI CANDY TRIO:
- Highlight-levyt: tasainen kypsennys
- Halolight-levyt: nopea paisto

ÄLKÄÄ: käytä pintaa leikkuualustana, vedä kattiloita, laita alumiinifoliota/muovia

### SAUNA (SKISTAR):
Lämmitysaika: 30-45 minuuttia

Ajastin:
- Alue A (0-4h): Välitön lämmitys
- Alue B (0-8h): Viivelämmitys

Esimerkki: 3h ulkoilu → aseta B-alue kohtaan 2 → sauna valmis palatessasi

## YLEISET OHJEET (KAIKKI MAJOITUKSET)

### CHECK-IN JA CHECK-OUT:
- Check-in: huoneisto valmis tyypillisesti klo 14-15 (ei tarkka aika)
- Aikainen check-in: mahdollinen jos siivous valmis aiemmin, lähetä viesti saapumispäivänä
- Check-out: klo 11
- Myöhäinen check-out: ei yleensä mahdollinen sesonkiaikoina

### AVAIMET:
- 2 avainta lukollisessa avainboksissa oven läheisyydessä
- Koodi lähetetään tekstiviestillä saapumispäivänä

### VARUSTELU (SISÄLTYY HINTAAN):
- Liinavaatteet: peitot, tyynyt, lakanat, tyynyliinat
- Pyyhkeet kaikille henkilöille
- Yksityinen keittiö ja kylpyhuone
- Polttopuita takkaan

### LÄMMITYS:
- Keskuslämmitys + vesikiertoinen lattialämmitys
- Termostaatista voi säätää 1-2 astetta
- Joissain huoneistoissa ilmalämpöpumppu

### WIFI:
- Koko talon yhteinen verkko
- Jos ei toimi: irrota laite virrasta ja kytke uudelleen

### PESULA:
- Kellarissa pesukone ja kuivausrumpu
- Hinta: n. 2€/pesukerta (korttimaksu)
- Pesuaine sisältyy

### MATKATAVARASÄILYTYS:
- Kellaritiloissa, opasteet paikan päällä

### KAUPAT JA RUOKAILU:
- K-ruoka-sovelluksella voi tilata Levi Marketiin (sesonkina ajat täyttyvät nopeasti)
- Levi Delivery toimittaa majoitukseen
- Levimarket auki yleensä klo 22 asti
- Juhlapyhinä ravintolat sulkevat aikaisin

### PULKAT:
- Eivät sisälly hintaan, mutta usein edelliset asiakkaat jättäneet
- Kaupoista n. 10-15€

### VARAUKSET:
- Paras hinta: ota yhteyttä suoraan info@leville.net
- Jos Booking.com-varaus peruuntui: yleensä vanhentunut kortti/epäonnistunut veloitus
- Huijausvaroitus: varmista yksityishenkilöltä ostettu varaus aina suoraan majoittajalta

## YHTEYSTIEDOT:
- Sähköposti: info@leville.net
- WhatsApp: +358 40 1234567
- Vastaamme saman päivän aikana, myös lomilla

## KÄYTTÄYTYMINEN:
1. Ole ystävällinen ja avulias
2. KYSY AINA majoituskohde ennen laiteohjeita
3. Vastaa suomeksi, englanniksi jos asiakas kysyy englanniksi
4. Jos et tiedä vastausta, ohjaa ottamaan yhteyttä WhatsAppilla tai sähköpostilla
5. Pidä vastaukset selkeinä ja ytimekkäinä
`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received messages:", JSON.stringify(messages, null, 2));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: knowledgeBase 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Palvelu on hetkellisesti ruuhkautunut. Yritä hetken kuluttua uudelleen." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Palvelussa on tekninen ongelma. Ota yhteyttä WhatsAppilla." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI-palvelussa tapahtui virhe. Yritä uudelleen." }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Customer service chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Tuntematon virhe" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
