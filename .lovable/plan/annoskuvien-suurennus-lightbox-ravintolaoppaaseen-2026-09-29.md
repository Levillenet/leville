# Annoskuvien suurennus (lightbox) ravintolaoppaaseen

## Tavoite
Klikkaamalla annoskuvaa ravintolaoppaassa (/opas/levin-ravintolat-ja-annokset ja /guide/levi-restaurants-and-dishes) kuva aukeaa suurena koko näytölle.

## Nykytila
- Gallerian kuvat (`LeviRestaurantGuide.tsx`) eivät reagoi klikkaukseen.
- Asuntosivulla (`PropertyDetail.tsx`) on jo toimiva suurennusmalli: klikkaus avaa tumman koko näytön katselun, jossa on sulje- ja nuolipainikkeet, näppäimistöohjaus (Esc, nuolet) ja kuvien selaus sormella.

## Toteutus
1. Luodaan uusi uudelleenkäytettävä komponentti `src/components/guide/ImageLightbox.tsx`, joka noudattaa asuntosivun mallia: tumma tausta, kuva isona, sulje-X, edellinen/seuraava-nuolet, kuvan numero, Esc/nuolinäppäimet ja sormella pyyhkäisy.
2. Ravintolaoppaan gallerian jokainen kuva saa klikkausalueen: klikkaus avaa suurennuksen kyseisestä kuvasta, ja samaa ravintolan muiden kuvia voi selata suurennuksessa. Kursori muuttuu suurennuslasimerkiksi ja kuville lisätään selkeä avausmerkintä (aria-label + hover-merkki), mutta muutosten selaus, kuvien järjestys ja viivästetty lataus säilyvät ennallaan.
3. Suurennus käyttää samoja optimoituja WebP-kuvia — ei uusia tiedostoja.

## Rajaus
Vain ravintolaoppaan galleria. Muiden sivujen sisältöä ei muuteta, eikä asuntosivun toimintoon kosketa.
