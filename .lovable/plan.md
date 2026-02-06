

# Takan kayttoohje -sivu (leville.net-tyylinen)

## Yhteenveto

Luodaan kaksikielinen (FI/EN) takan kayttoohje-sivu, joka noudattaa leville.net-sivuston nykyista tummaa Lappi-teemaa (aurora-taustat, glass-card-kortit, turkoosit korostusvarit). Sivu on piilotettu alasivu, johon ei linkiteta navigaatiosta -- kuten nykyinen Sauna-sivu.

Sivulla on 3-vaiheinen wizard: opastvideo, turvallisuusohjeet ja avauskoodi. Lisatty pyydetyt ohjeet: kuumaa tuhkaa ei saa poistaa takasta, ja savupelti on suljettava sammumisen jalkeen huoneen lammon sailyttamiseksi.

---

## Sivun rakenne

Sivu kayttaa samoja komponentteja kuin muut leville.net-alasivut:
- `Header` -- sivuston vakioylapalkki (navigaatio, logo, kielivalitsin)
- `SubpageBackground` -- aurora-revontulitausta
- `Footer` -- vakioalatunniste
- `glass-card` -- lasimainen korttityyli kaikille korteille
- Varilinja: tumma pohja, turkoosi/aurora-vihrea korostukset, oranssi varoituksille

Kielivalinta tapahtuu sivuston yleisella `LanguageSelector`-komponentilla Headerissa -- ei erillistä FI/EN-kytkinta.

---

## Luotavat tiedostot

### 1. `src/pages/FireplaceInstructions.tsx` (paasivu)

Rakenteeltaan vastaava kuin `Sauna.tsx`:

```text
<Helmet>
  - noindex, nofollow
  - kielikohtainen title ja description
</Helmet>
<SubpageBackground />
<Header />
<main>
  - Otsikko-osio (Flame-ikoni, otsikko, alaotsikko)
  - Progress stepper (3 vaihetta)
  - Aktiivisen vaiheen sisalto
</main>
<Footer />
```

Ottaa vastaan `lang`-propin (oletus "fi"), kuten muut sivut.

#### Progress Stepper
- Kolme ympyraa: 1 Video / 2 Ohjeet / 3 Koodi
- Aktiivinen vaihe korostettu turkoosilla (`bg-primary`)
- Valmis vaihe vihrealla tarkistussymbolilla

#### Vaihe 1: Video
- YouTube-upotus IFrame Player API:lla
- "Jatka"-painike estetty kunnes video paattyy TAI fallback-ajastin
- Kaytetaan `glass-card`-korttia videon ymparilla

#### Vaihe 2: Ohjeet (8 korttia -- paivitetty sisalto)
- Jokainen kortti: `glass-card`, numero, ikoni, otsikko, teksti, valintaruutu
- Edistymislaskuri
- "Jatka" aktiivinen vasta kun kaikki 8 valittu

**8 ohjetta (paivitetty sisalto):**

1. **Avaa savupelti** -- Vedä varsi auki-asentoon. Muuten savu tulee huoneistoon.

2. **Avaa tuhkalaatikko hieman** -- Avaa raolleen ilmankierron varmistamiseksi.

3. **Aseta puut ja sytykkeet** -- Polttopuut tulipesaan, sanomalehti/tuohi sytykkeeksi.

4. **Ilmanvaihto sytyttaessa** -- Parvekkeen ovi raolleen. Liesituuletin enintaan teholla 1.

5. **Sytyta takka** -- Sytyta tuli, pida lasiluukkua raollaan kunnes veto paranee.

6. **Ala polta liikaa** -- Enintaan 2 pesallistä. Ylikuormitus vaurioittaa takkaa.

7. **Ala poista kuumaa tuhkaa** (UUSI) -- FI: "Ala koskaan poista kuumaa tai hehkuvaa tuhkaa takasta. Kuuma tuhka aiheuttaa palovaaran. Anna tuhkan jaahtyä täysin ennen kasittelya." / EN: "Never remove hot or glowing ash from the fireplace. Hot ash is a fire hazard. Allow ash to cool completely before handling."

8. **Kun takka on sammunut** (PAIVITETTY) -- FI: "Varmista, etta tuli on taysin sammunut eika hiilloksia ole nakyvissa. Vasta sen jalkeen tyonna varsi takaisin sisaan ja sulje savupelti. Savupelti on hyvä sulkea sammumisen jalkeen, koska avoin pelti paastaa lammon huoneistosta ulos ja kylmentaa asuntoa. Peldin sulkeminen liian aikaisin on kuitenkin hengenvaarallista -- häkä voi tayttaa huoneiston!" / EN: "Make sure the fire is completely out and no embers are visible. Only then push the handle back in to close the flue. It is important to close the flue after the fire is out, as an open flue lets heat escape and cools down the apartment. However, closing the flue too early is life-threatening -- carbon monoxide can fill the apartment!"

#### Vaihe 3: Avauskoodi
- Iso koodiboksi `glass-card`-tyylilla, `primary`-varilla
- Kopioi leikepöydälle -painike
- Turvamuistutuslaatikko (keltainen/oranssi varoitustyyli)
- Kiitosviesti ja alaviite

### 2. `src/components/fireplace/FireplaceVideoPhase.tsx`

YouTube IFrame Player API -integraatio:
- Ladataan `https://www.youtube.com/iframe_api` dynaamisesti
- `onStateChange` -> `YT.PlayerState.ENDED` tunnistaa videon paattymisen
- Fallback-ajastin varatoimintona
- Kaytetaan `glass-card`-korttia

### 3. `src/components/fireplace/FireplaceInstructionsPhase.tsx`

8 ohjekorttia `glass-card`-tyylilla:
- Jokainen kortti: numero, Lucide-ikoni, otsikko, selitys, valintaruutu
- Kielikohtainen sisalto
- Edistymislaskuri ("3/8 kohtaa luettu")
- Varoituskortit (kohdat 7 ja 8) erottuvat oranssilla/punaisella reunuksella

### 4. `src/components/fireplace/FireplaceCodePhase.tsx`

Avauskoodin naytto:
- Iso koodiboksi
- Kopioi leikepöydälle -toiminto
- Turvamuistutuslaatikko
- Alaviite

### 5. `src/components/fireplace/FireplaceAdminPanel.tsx`

Piilotettu admin-paneeli (`?admin=true`):
- Erillinen `glass-card` vaaleansinisella reunuksella
- Kentat: YouTube-URL, avauskoodi, fallback-ajastin
- Varoitusteksti: asetukset sailyvat vain muistissa
- Naytetaan sivun ylaosassa ennen wizard-sisaltoa

---

## Reitit (App.tsx)

Lisataan kaksi reittia:

```text
/takka-ohje          -> FireplaceInstructions (oletus FI)
/en/fireplace        -> FireplaceInstructions lang="en"
```

Sivua ei lisata Headerin navigaatioon eika Footerin linkkeihin. Se on piilotettu sivu kuten `/sauna`.

---

## Visuaalinen tyyli

Sivu noudattaa leville.net-vakiotyylia:

- **Tausta**: `SubpageBackground` (aurora/revontuli-animaatio)
- **Kortit**: `glass-card border-border/30` (sama kuin Sauna-sivu)
- **Korostusvarit**: `primary` (turkoosi), `orange-500` (varoitukset)
- **Ikonit**: Lucide React -ikonit (Flame, Wind, TreePine, DoorOpen, Sparkles, AlertTriangle, Ban, ShieldCheck)
- **Fontit**: DM Sans (runko), Cormorant Garamond (otsikot)
- **SEO**: `noindex, nofollow` metatagi
- **Helmet**: kielikohtainen `<html lang="fi">` / `<html lang="en">`

---

## Tekninen yksityiskohta

### YouTube IFrame Player API

```text
1. Ladataan script: https://www.youtube.com/iframe_api
2. Luodaan YT.Player containeriin
3. Kuunnellaan onStateChange -> YT.PlayerState.ENDED
4. Fallback: setTimeout(enableButton, fallbackSeconds * 1000)
5. Cleanup: poistetaan player ja timeout unmountissa
```

### Kaannokset

Kaannokset maaritellaan sivukomponentin sisalla sanakirja-objektina (`Record<'fi' | 'en', {...}>`), kuten Sauna-sivulla. Sivu tukee vain FI ja EN.

### Admin-asetukset

```text
Oletusarvot: VIDEO_URL, UNLOCK_CODE, FALLBACK_TIMER
Tallennetaan React stateen (ei localStoragea)
Admin-paneeli nakyy kun URL:ssa on ?admin=true
```

