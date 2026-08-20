# Levin tulevat tapahtumat tapahtumakalenteriin

Lähde: levi.fi/tapahtumat (haettu 20.8.2026). Sivulta löytyi 34 tapahtumaa, joista suurin osa on yksittäisiä keikkoja (Eini, Yölintu, Paperitähdet jne.). Kalenterimme on kuratoitu matkailijan vuosikello, joten lisätään matkailullisesti merkittävät tapahtumat — ei jokaista pubikeikkaa.

## Tarkennus nykytietoon
- Kalenterissamme World Cup on **14.–15.11.2026**, mutta levi.fi ilmoittaa nyt **13.–15.11.2026** (perjantai mukaan lukien). Päivitetään sekä kalenteri että World Cup -oppaan `WORLD_CUP`-konstanttilohko (`src/pages/guide/WorldCupLevi.tsx`).
- Talvikauden avajaiset ovat kalenterissa 2025-kaudelta (3.–5.10.2025). Päivitetään: **2.–4.10.2026**.
- Ruskamaraton on jo kalenterissa oikealla päivällä (12.9.2026), lisätään vain virallinen levi.fi-linkki rinnalle säilyttäen ruskamaraton.com.

## Lisättävät tapahtumat (`src/components/guide/EventTimeline.tsx`)
Jokaiselle FI+EN nimi ja kuvaus, päivämäärät ja suora linkki levi.fi-tapahtumasivulle:

1. **Yhteiset avoimet ovet** – 22.8.2026
2. **Levi Friends & Bike** – 29.8.2026 (pyöräilytapahtuma)
3. **Suopunginheiton MM-kilpailut, Reindeer Manor** – 29.8.2026
4. **Pieni pyhiinvaellus ruskan aikana** – 3.–5.9. ja 8.–10.9.2026 (yksi kortti, molemmat jaksot mainittu)
5. **Tuikun ruska / Ruskakarkelot -keikkaviikonloput** – 4.–11.9.2026 (yksi kooste-kortti "Ruskan konserttiviikot", linkki levi.fi-tapahtumalistaukseen; ei nimetä yksittäisiä artisteja, koska ne vaihtuvat vuosittain)

Kaikki uudet tapahtumat merkitään kategoriaan (sports / family / entertainment) ja `free`-tieto vain jos levi.fi sen kertoo — muuten `free: false`.

## Lisäksi
- Kalenterin disclaimeriin lisätään suora linkki `levi.fi/tapahtumat` (FI) ja `levi.fi/en/events` (EN), jotta lukija näkee koko listauksen.
- `src/pages/guide/WorldCupLevi.tsx`: lisätään linkki Levin viralliselle World Cup -tapahtumasivulle (`https://www.levi.fi/tapahtumat/fis-ski-alpine-world-cup-levi/`), ja World Cup -kortin "Lue lisää" ohjaa omalle oppaallemme (FI `/opas/world-cup-levi`, EN `/guide/levi-world-cup`) — tämä oli edellisen suunnitelman kohta, joka toteutetaan samalla.

## Tekninen huomio
- `LeviEvent.url` muutetaan kielitietoiseksi (`{ fi, en }`), jotta oma opas voi olla eri osoitteessa kielittäin ja levi.fi:n FI/EN-sivut osuvat oikein. `EventCard` päivitetään vastaavasti.
- Ulkoiset linkit `target="_blank" rel="noopener noreferrer"`, sisäiset `<Link>`.
- Lopuksi `bunx tsc --noEmit` ja sivun renderöinnin tarkistus.
