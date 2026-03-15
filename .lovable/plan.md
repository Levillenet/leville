

# Kartan parannukset: tietä pitkin reititys + majoitusten nimet ja varauslinkit

## Ongelma
1. **Etäisyydet mitataan linnuntietä** (Haversine) → pitää mitata tietä pitkin
2. **Majoitusten nimet eivät näy kartalla** markkerien kohdalla
3. **Varauslinkki pitää näkyä paremmin** kun klikkaa majoitusta

## Ratkaisu

### 1. Tietä pitkin reititys — Mapbox Directions API
Korvataan Haversine-laskenta Mapbox Directions API:lla:
- Kun molemmat pisteet (A ja B) on valittu, haetaan `https://api.mapbox.com/directions/v5/mapbox/driving/{A};{B}?access_token=...`
- API palauttaa todellisen ajoreitin etäisyyden ja geometrian
- Piirretään todellinen reitti kartalle (ei suoraa viivaa)
- Taksilaskelman ja kävelyajan pohjaksi tulee API:n palauttama etäisyys
- Haversine jää fallbackiksi (esim. jos API-kutsu epäonnistuu) ja "etäisyys keskustaan" -tietoihin (nämä voivat jäädä linnuntietä koska ovat vain suuntaa-antavia)

### 2. Majoitusten nimet näkyviin kartalle
- Lisätään jokaiseen majoitusmarkkeriin teksti-label (HTML-elementti markkerissa) jossa majoituksen nimi näkyy
- Label on pieni, pyöristetty badge majoitusmarkkerin vieressä/alla

### 3. Majoituksen popup parannukset
- Popup näyttää jo nyt "Book Now →" -linkin — varmistetaan että se on selkeä ja toimii
- Nimeä korostetaan isommaksi popupissa

## Tekniset muutokset — `src/pages/guide/LeviInteractiveMap.tsx`

1. **Uusi async-funktio `fetchRoute`**: hakee Mapbox Directions API:sta reitin kahden pisteen välillä, palauttaa `{ distance_km, geometry }`
2. **`handleMapClick` päivitetään**: toisen klikkauksen jälkeen kutsutaan `fetchRoute`, piirretään reitti geometriasta (ei suora viiva), käytetään API:n etäisyyttä laskelmiin
3. **`createAccommodationMarkerEl`**: lisätään nimi-label markkerin alle
4. **Comparison panel**: lisätään "⚠️ Etäisyys tietä pitkin" -teksti selventämään

