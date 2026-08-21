# Joulupukkisivun laajennus: "Millainen joulupukkikokemus sopii teille?"

Laajennetaan olemassa oleva sivu `src/pages/guide/SantaClausLevi.tsx` (446 riviä, kaksikielinen fi/en). Uutta sivua tai uutta URLia ei luoda.

URLit pysyvät ennallaan:
- FI `https://leville.net/opas/joulupukki-levilla`
- EN `https://leville.net/guide/santa-claus-in-levi`

## Miksi juuri tämä sivu

Semrushin (UK) mukaan sivu sijoittuu jo hakusanoille "santa claus village levi" (210/kk, sija 25), "levi santa village" (140/kk, sija 27) ja "santa village levi" (110/kk, sija 33) — eli kynnyksen alapuolella. Hakuvaikeus on vain 14/100, ja kärkituloksissa ovat palveluntarjoajat itse sekä matkanjärjestäjät (levi-tours.com, elvesvillage.fi, Inghams, Viator). Sivumme häviää, koska se on yleisluontoinen opas ilman konkreettista palveluvalikoimaa ja varauspolkua. Palvelukohtaiset osiot korjaavat juuri tämän.

## Sisältörakenne (uusi)

1. **H1 + intro** — uudelleen muotoiltu: joulupukin tapaaminen Levillä, kokemukset ovat keskenään hyvin erilaisia.
2. **"Millainen joulupukkikokemus sopii teidän perheellenne?"** — sivun kantava näkökulma. 4 lyhyttä profiilia ikonikortteina: rauhallinen ja perinteinen · tonttujen maailma ja tekeminen · safari ja porot · yksityinen VIP. Jokainen ohjaa alempaan palvelukorttiin.
3. **Palvelukortit (4 kpl)** — yhtenäinen korttikomponentti: nimi, tunnelmakuvaus, vahvistetut sisältökohdat listana, "kenelle sopii" -rivi, virallinen linkki (`target="_blank"`).
4. **Huomiolaatikko** — nämä ovat esimerkkejä; valikoima muuttuu kausittain ja Leviltä löytyy myös muita joulupukkipalveluita sekä yksityisiä vaihtoehtoja. Linkki Visit Levin aktiviteettilistaukseen.
5. **Nykyiset osiot säilyvät**: Joulupukin mökki tunturilla, muut jouluelämykset, Levi vs Rovaniemi -vertailu, vinkit perheille.
6. **Uusi osio: "Santa Claus Village — Levi vai Rovaniemi?"** — vastaa suoraan hakusekaannukseen (Rovaniemen Santa Claus Village on eri paikka, n. 170 km Leviltä) ja hakuun "how far is santa claus village from levi".
7. **Laajennettu FAQ + FAQPage JSON-LD** (rakenne on jo olemassa).
8. **ReadNext + majoitus-CTA** säilyvät; varmistetaan EN-polku `/en/accommodations`.

## Palvelutiedot — vain vahvistetut faktat

Kaikki alla oleva on tarkistettu palveluntarjoajien omilta sivuilta 21.8.2026. Mitään muuta ei kirjoiteta; hintoja ei julkaista.

**Santa's Secret Hideaway — Santa & Mrs. Claus** (levi-tours.com / Scandinavian Travel Group)
Lähde: levi-tours.com/santa-hideaway-levi
- Noin 100 vuotta vanha lappilainen poromiehen mökki metsässä
- Sama joulupukki vuodesta 1998
- 1,5 h ohjelmaa joulupukin ja joulumuorin kanssa, koko ohjelma n. 2,5 h
- Piparkakkupaja joulumuorin kanssa (marraskuu–helmikuun alku)
- Tonttuopas, henkilökohtainen lahja jokaiselle lapselle, rajattomasti omia valokuvia
- Kuljetus Levin keskustasta sisältyy (n. 15 min ajomatka)
- Enintään 23 hengen ryhmä; yksityinen versio saatavilla erikseen
- Kausi 19.11.2026–6.3.2027
Kenelle: perinteistä, kiireetöntä ja henkilökohtaista kohtaamista arvostavalle perheelle.

**Tokka Safaris — Santa visits** (tokkasafaris.fi)
Lähde: tokkasafaris.fi/en/safaris/santa-visits/
- Kaksi vaihtoehtoa: moottorikelkalla (n. 30 km safari, 4 h) tai minibussilla (2 h)
- Molempiin sisältyy lyhyt poroajelu ja lämmin juoma + pulla
- Tontun vastaanotto, joulupukin tapaaminen mökissä, aikaa lahjatoiveille
- Lapset matkustavat lämmitetyssä kelkkakärryssä (kelkkavaihtoehto)
- Ohjelma pyörii joulukuun alusta tammikuun ensimmäiselle viikolle
- Ohjeet kirjeen/lahjan toimittamiseen lähetetään n. 2 viikkoa ennen vierailua
Kenelle: perheelle, joka haluaa yhdistää joulupukin ja Lapin safarielämyksen.

**Arcandia — The Elf Court** (arcandia-en.com)
Lähde: arcandia-en.com/elfcourt
- Osa Arcandian Arctic Adventure Park -elämyspuistoa, joka rakentuu vuoden 2009 elokuvalavasteille (Nicholas North)
- Tarinallinen kokonaisuus: tontut kutsuvat vieraat kirjeellä, portilla jokainen saa oman "Ring of Truth" -sormuksen
- Matkalla kylään tavataan hovin porot, joita voi valokuvata ja ruokkia
- Ulkona hovin huvituksia: kyläpelit, Knockerball-pallot Arctic Colosseumilla, mäenlasku, hämähäkkikeinut
- Majassa tontut koristelevat joulukuusta ja piparkakkuja; joulupukki lukee kirjeitä ja kirjoittaa hovin kirjaan perheiden kanssa yksi kerrallaan
- Lopuksi jokainen saa oman hovin päätöksen: kiltti vai tuhma
- Vierailu jatkuu puistoalueelle pimeän tultua
Kenelle: perheelle, joka haluaa tonttujen maailmaa, tarinaa ja tekemistä pelkän tapaamisen sijaan.

**Arctic Shaman Adventures — Santa Claus Daytime VIP**
Lähteet: arcticshamanadventures.com/experiences/ ja jälleenmyyjän tuotesivu lapplandlivsstil.com/tour/santa-claus-daytime-vip
- Yksityinen joulupukin tapaaminen lappilaisessa majassa Arctic Shaman Adventuresin alueella
- Kesto 2,5 h
- Lasten nimet muistetaan, lahjat, valokuvat ja todistukset
- Joulukauden ohjelma; paikat varataan yleensä hyvissä ajoin täyteen
Kenelle: perheelle, joka arvostaa yksityisyyttä ja rauhallista, täysin omaa vuoroa.

Jos jotain yllä olevaa ei voida enää toteutushetkellä vahvistaa lähteestä, kohta jätetään pois.

## SEO-toimenpiteet

- **Meta title FI**: "Joulupukki Levillä — joulupukin tapaaminen ja jouluelämykset | Leville.net"
- **Meta title EN**: "Santa Claus in Levi — Santa Experiences & Christmas Activities" (Santa Claus Village -muoto tuodaan H2:een ja leipätekstiin)
- **Meta description**: molemmilla kielillä mainitaan joulupukin tapaaminen, yksityiset vaihtoehdot ja Levi vs Rovaniemi
- H2/H3-rakenne kattaa luonnollisesti: joulupukin tapaaminen Levi, Santa visit Levi, private Santa Levi, Christmas activities Levi, Santa experience Lapland
- Kuvien alt-tekstit kuvaavina ja avainsanoja sisältävinä
- FAQ-osio (fi/en) + olemassa oleva `getFAQSchema`: Where can I meet Santa Claus in Levi? · What kind of Santa experiences are available? · Are private Santa experiences available? · Can families combine Santa with other Lapland activities? · When should I book?
- Sisäiset linkit sivulle lisätään jouluaiheisilta sivuilta: `JouluLapissa.tsx`, `ChristmasDinnerLevi.tsx` / `ChristmasDinnerLeviFI.tsx`, `LeviForKids.tsx`, `MonthlyGuideLevi` (joulukuu)
- Canonical, hreflang ja reitit pysyvät ennallaan; sitemapiin ei muutoksia

## Visuaalinen toteutus

- Käytetään sivun nykyistä `glass-card` + lucide-ikoni -tyyliä; ei uutta designkieltä
- Palvelukortit yhtenäisenä ruudukkona (1 sarake mobiilissa, 2 desktopissa), jokaisella oma ikoni ja aksenttiväri teeman tokeneista
- "Kenelle sopii" -profiilit kompaktina ikonirivinä ennen kortteja
- **Kuvat**: käytetään vain projektin omia olemassa olevia joulu-/talvikuvia `src/assets`-kansiosta. Palveluntarjoajien kuvia ei kopioida (tekijänoikeus). Jos sopivaa kuvaa ei ole, kortit toteutetaan ilman kuvaa ikonipohjaisesti.

## Tekniset yksityiskohdat

- Muokataan vain `src/pages/guide/SantaClausLevi.tsx`: `fi`- ja `en`-käännösobjektit (alkavat riveiltä 36 ja 119) sekä JSX-runko. Palvelutiedot omana `providers`-taulukkona käännösobjektin sisällä, jotta rakenne pysyy siistinä.
- Ulkoiset varauslinkit: `target="_blank" rel="noopener noreferrer"`.
- Neljä pientä linkkilisäystä yllä mainittuihin jouluaiheisiin sivuihin.
- Tarkistus: `tsgo`-typecheck ja Playwright-renderöinti molemmille URLeille (H1, meta, JSON-LD).

## Rajaukset
- Ei hintoja millekään palvelulle.
- Ei väitetä, että nämä neljä olisivat Levin koko tarjonta.
- Ei arvailtuja kestoja, kuljetuksia, ikärajoja, kieliä tai saatavuutta.
