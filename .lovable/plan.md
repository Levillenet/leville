
# Leville.net -- Suorituskyvyn ja kayttokokemuksen optimointi

Clarity-analyysista nousseiden havaintojen perusteella tama suunnitelma kattaa nelja osa-aluetta: LCP-nopeus, kuolleet klikkaukset, sisainen navigointi ja mobiilioptimointi.

---

## 1. LCP-nopeuden parantaminen (4.658s -> tavoite alle 2.5s)

LCP-elementti on todennakoisesti Hero-osion taustakuva tai Moder-widgetin lataus. Suurimmat pullonkaulat:

### 1a. Hero-kuvien optimointi
- Lisataan `<link rel="preload">` ensimmaiselle hero-kuvalle (heroChalet) index.html:iin, jotta selain alkaa ladata sita heti
- Muutetaan Hero-komponentti renderoimaan ensimmainen kuva valittomasti ilman `imagesLoaded`-tilaa -- nain kuva nakkyy heti, ja loput kuvat esiladataan taustalla
- Ensimmaisen kuvan `fetchPriority="high"` on jo kaytosse, mika on hyva

### 1b. Kolmannen osapuolen skriptien viivastaminen
- Siirretaan Microsoft Clarity -skripti latautumaan vasta `requestIdleCallback` tai `setTimeout`-viiveella (esim. 3s)
- Siirretaan Google Fonts -lataus kayttamaan `font-display: swap` (jo kaytosse display=swap-parametrilla) ja lisataan `<link rel="preload">` kriittisille fonteille
- Moder-widgetin skripti ladataan jo `defer+async`, mika on ok

### 1c. Framer Motion -kirjaston vaikutuksen pienentaminen
- ScrollReveal- ja TiltCard-komponentit kayttavat framer-motionia, joka on iso kirjasto (~30kB gzip). Etusivun above-the-fold -sisalto (Hero) ei kayta naita, joten vaikutus on kohtuullinen
- Lisataan `React.lazy()` About- ja Features-komponenteille, jotta ne ladataan vasta tarvittaessa (code splitting)

### 1d. Kuvien lazy-loading ja koko
- About-komponentti esilataa 15 kuvaa heti mount-vaiheessa -- muutetaan esilataamaan vain ensimmainen kuva ja loput vasta kun karuselli pyorii niihin
- Varmistetaan etta kaikki kuvat kayttavat Viten kuvaoptimointia (jo src/assets -kansiossa, joten Vite kasittelee ne)

---

## 2. Kuolleiden klikkausten poistaminen (9.47%)

### 2a. Potentiaaliset ongelmakohteet
- **TiltCard-komponentti**: Kaytossa Majoitukset-sivulla korttien ymparilla. Framer Motion -animaatio saattaa "syoda" klikkaustapahtumia, koska se luo ylimaaraisen `motion.div`-kerroksen
- **Testimoniaalien karuselli**: Sisaltaa tekstia joka nayttaa luettavalta mutta ei ole klikattava -- lisataan `cursor: default` selkeasti
- **About-osion kuvakaruselli**: Kuvien paalla ei ole selkeaa CTA:ta -- kuviin klikkaaminen ei tee mitaan
- **Scroll indicator** (Hero-osion alaosassa): Palloelainen elementti joka nayttaa interaktiiviselta mutta ei ole klikattava

### 2b. Korjaukset
- Lisataan `pointer-events-none` scroll-indikattoriin (osittain jo tehty)
- Lisataan About-osion kuviin hover-tila joka osoittaa etta kyseessa on karuselli (nuolipainikkeet ovat jo kaytosse)
- Varmistetaan etta kaikki linkit ja painikkeet antavat visuaalisen hover-palautteen (cursor-pointer, varit)
- Lisataan `role="img"` ja `aria-hidden` puhtaasti koristeellisiin elementteihin (glow-efektit)

---

## 3. Sivuston sisaisen liikkumisen parantaminen (1 sivu/istunto)

### 3a. CTA-painikkeet sivujen loppuun
- Lisataan jokaiselle alasivulle (Majoitukset, Levi-opas, Ajankohtaista, UKK jne.) footer-ylapuolelle CTA-osio:
  - Teksti: "Loydatko unelmamajoituksesi?" / "Etsiitko majoitusta?"
  - Painike: "Katso vapaat majoitukset" -> linkki Moder-varaukseen
  - Toinen painike: "Ota yhteytta" -> /yhteystiedot
- Toteutetaan uutena `PageCTA`-komponenttina joka saa kieliprop:n

### 3b. Etusivun navigointivirran parantaminen
- About-osion CTA "Katso majoitukset" on jo olemassa -- hyva
- Lisataan Features-osion (testimonials) jalkeen CTA-painike varaussivulle
- NewsHighlight-komponentissa on jo "Kaikki uutiset" -linkki -- hyva

### 3c. Ristiinlinkitys
- Majoitukset-sivun loppuun lisataan "Tutustu myos" -osio joka linkittaa Levi-oppaaseen ja Akkilahtoihin

---

## 4. Mobiilioptimointi (Facebook-sovellus + mobiiliselaimet = 55%)

### 4a. Kosketusalueiden koko
- StickyBookingBar: `py-3` on riittava (48px+), OK
- WhatsApp-painike: 56px (w-14 h-14), OK
- Header-mobiilivalikko: linkkien kosketusalue `py-2` on liian pieni -- kasvatetaan `py-3`:ksi (vahintaan 44px)

### 4b. Facebook In-App Browser -yhteensopivuus
- Varmistetaan etta `target="_blank"` linkit (Moder, WhatsApp) kayttavat `rel="noopener noreferrer"` -- jo kaytosse
- Lisataan fallback-kasittely Moder-widgetille: jos widget ei lataudu 5s kuluessa, naytetaan suora "Varaa tasta" -linkki

### 4c. Hitaan yhteyden optimointi
- Edella mainittu lazy loading ja code splitting auttaa myos mobiililla
- Lisataan `<meta name="theme-color">` index.html:iin, jotta selaimen osoitepalkki nayttaa brändivarilta heti

---

## 5. Reitityksen tarkistus

Kaikki reitit ovat maaritelty App.tsx:ssa ja kaytosse. Tarkistettujen sivujen perusteella:
- `/majoitukset` -- OK, komponentti olemassa
- `/latuinfo` -- OK, komponentti olemassa  
- `/akkilahdot` -- OK, komponentti olemassa
- `/en` -- OK, oma komponentti
- Kielen vaihto kayittaa `routeConfig`-objektia -- toimii

Ei tarvita korjauksia reitityksen.

---

## Tekninen toteutus -- yhteenveto muutettavista tiedostoista

| Tiedosto | Muutos |
|---|---|
| `index.html` | Preload hero-kuva, viivasta Clarity, lisaa theme-color |
| `src/components/Hero.tsx` | Renderoi 1. kuva heti ilman imagesLoaded-odotusta |
| `src/components/About.tsx` | Esilataa vain 1. kuva, loput on-demand |
| `src/pages/Index.tsx` | Lazy-load About + Features |
| **Uusi: `src/components/PageCTA.tsx`** | Monikielinen CTA-komponentti sivujen loppuun |
| `src/pages/Majoitukset.tsx` | Lisaa PageCTA ennen Footeria |
| `src/pages/Levi.tsx` | Lisaa PageCTA ennen Footeria |
| `src/pages/Ajankohtaista.tsx` | Lisaa PageCTA ennen Footeria |
| `src/pages/UKK.tsx` | Lisaa PageCTA ennen Footeria |
| `src/components/Features.tsx` | Lisaa CTA testimonaalien jalkeen |
| `src/components/Header.tsx` | Mobiilivalikon linkkien py-2 -> py-3 |
| `src/components/WhatsAppChat.tsx` | Siirra pois StickyBookingBarin paalta mobiililla (bottom-20) |
