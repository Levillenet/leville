## Korjataan SkiStar-huoneistojen sijaintikuvaukset

Tavoite: Poistetaan kaikki virheelliset viittaukset siihen, että SkiStar-huoneistot olisivat hissien vieressä. Korvataan tarkalla tiedolla: noin 700 metriä hisseille, keskeinen sijainti Levin keskustassa palveluiden ja kauppojen lähellä.

### 1. InlineBookingLink.tsx — skiSlopeside-intentin teksti
Nykyinen teksti viittaa "hissien vieressä" / "right next to the lifts". Korjataan:
- FI: "Vinkki: nauti laskettelupäivästä – majoitu keskustan modernissa SkiStar-rakennuksessa, noin 700 metriä hisseiltä"
- EN: "Tip: enjoy your ski day — stay in a modern downtown apartment at Skistar Postintie 3, about 700 metres from the lifts"

### 2. SkistarGuide.tsx — aboutP3 (FI + EN)
Nykyinen teksti: "eturinteet ja lastenalue ovat vain muutaman minuutin kävelyn päässä" / "front slopes and kids' land are just a few minutes on foot".
Korjataan:
- FI: "Kaikki Levin keskustan palvelut ovat kävelymatkan päässä — kauppa, ravintolat, matkamuistomyymälät ja lastenalue ovat vain muutaman minuutin kävelyn päässä. Päärinteet ja hissit ovat noin 700 metrin päässä (noin 8–10 minuutin kävely). Lähin moottorikelkkareitti on noin 200 metrin päässä."
- EN: "All Levi centre services are within walking distance — supermarket, restaurants, souvenir shops and kids' land are just a few minutes on foot. The front slopes and lifts are about 700 metres away (approx. 8–10 min walk). The closest snowmobile track is approximately 200 metres away."

### 3. SkiingInLevi.tsx — inline-linkkien tarkistus
Tarkistetaan, etteivät Skistariin viittaavat inline-linkit väitä hissien vieressä olemista. Korjataan tarvittaessa.

### 4. street-hubs.ts — Skistar Postintie 3 hub
Tarkistetaan hubin intro ja subtitle. Poistetaan mahdolliset viittaukset hissien välittömään läheisyyteen. Lisätään "noin 700 metriä hisseille".

### 5. properties.ts — Skistar-kohteiden shortDescription
Tarkistetaan, että shortDescription-kentissä ei ole "ski-in" tai "hissien vieressä" -tyyppisiä väitteitä. Korjataan tarvittaessa.

### 6. Majoitukset.tsx / LevinKeskustahuoneistot.tsx
Etsitään Skistar-viittaukset ja varmistetaan, että sijainti kuvataan oikein (~700 m hisseille).

### 7. propertyTranslationsFi.ts / propertyTranslationsEn.ts
Tarkistetaan, että longDescription-kuvaukset ovat jo oikein (nykyisellään jo sanotaan "noin 700 metrin päässä").

### 8. llms.txt ja llms-full.txt
Tarkistetaan, etteivät knowledge-base-tiedostot sisällä virheellistä tietoa SkiStarin sijainnista.