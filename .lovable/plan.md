

# Korjaus: `/opas/paras-aika-vierailla-levilla` 404 → 200 alias

## Juurisyy
Prerenderoitu snapshot on tallennettu 404-tilassa, koska Navigate-komponentti lisättiin App.tsx:ään JÄLKEEN snapshotin luomista. Vaikka koodi on nyt oikein, Lovablen prerenderer ei ole päivittänyt snapshotia.

Lisäksi: valittu strategia on **200 alias** (ei 301), jolloin vanha URL palvelee sisältöä suoraan ja canonical osoittaa uuteen URLiin.

## Muutokset

### 1. App.tsx: Vaihda Navigate → suora komponentti
Rivi 520–521: korvaa Navigate-redirect staattisella reitillä joka renderöi saman komponentin:
```tsx
// Ennen:
<Route path="/opas/paras-aika-vierailla-levilla" element={<Navigate to="/opas/paras-aika-matkustaa-leville" replace />} />
<Route path="/opas/paras-aika-vierailla-levilla/*" element={<Navigate to="/opas/paras-aika-matkustaa-leville" replace />} />

// Jälkeen:
<Route path="/opas/paras-aika-vierailla-levilla" element={<BestTimeToVisitLevi />} />
```
BestTimeToVisitLevi-komponentti asettaa jo canonical-tagin `https://leville.net/opas/paras-aika-matkustaa-leville` → Google ymmärtää kumpi on pääsivu.

### 2. _redirects: Vaihda 301 → 200
Rivi 49: muuta `301` → `200` jotta palvelin palauttaa sisällön 200-statuksella eikä uudelleenohjaa:
```
/opas/paras-aika-vierailla-levilla  /opas/paras-aika-matkustaa-leville  200
```
Tämä on Lovable-hostauksen rewrite-sääntö (ei redirect), joten sisältö palvellaan suoraan.

### 3. Julkaise → Prerender-snapshotin päivitys
Julkaisun yhteydessä Lovable luo uuden snapshotin jossa sivu palauttaa 200 + oikea sisältö + canonical.

## Miksi tämä toimii
- **Vanha URL**: palauttaa 200 + BestTimeToVisitLevi-sisältö + `<link rel="canonical" href=".../paras-aika-matkustaa-leville">`
- **Uusi URL**: palauttaa 200 + sama sisältö + self-referencing canonical
- **Google**: näkee sisällön molemmissa, indeksoi vain canonical-URLin
- **Ei 301-ketjua**: vanha URL lataa sisällön suoraan

