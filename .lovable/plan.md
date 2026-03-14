

## Analytiikan istunnon keston korjaus

### Ongelma

Istunnon kesto lasketaan session_id:n ensimmäisen ja viimeisen sivukatselun välisenä aikana. Tämä vääristyy kun:

1. Käyttäjä käy sivulla, siirtyy /admin-näkymään tunneiksi, palaa sivulle -- kesto näyttää tunteja vaikka todellinen selaus oli lyhyt
2. Preview/dev-istunnot (lovable.app) ovat mukana datassa
3. Käyttäjä jättää välilehden auki ja palaa myöhemmin -- sama session_id, valtava aikaväli

### Ratkaisu

**Edge functioniin (`get-page-view-stats/index.ts`) kaksi muutosta:**

1. **Maksimikesto sivujen välillä**: Sen sijaan että lasketaan (viimeinen - ensimmäinen), lasketaan kumulatiivinen kesto peräkkäisten sivukatselujen väleistä ja ohitetaan yli 30 minuutin välit (= käyttäjä oli poissa). Tämä poistaa /admin-istuntojen ja "jätetty auki" -tapausten vääristymän.

2. **Referrer-suodatus**: Ohitetaan rivit joiden referrer sisältää "lovable.app" tai "localhost" -- nämä ovat dev-istuntoja. Myös session-laskennasta pois.

### Tekninen toteutus

Istunnon keston laskenta muutetaan:
```
// Nykyinen: viimeinen - ensimmäinen timestamp
// Uusi: summa peräkkäisistä väleistä, max 30 min per väli
const MAX_GAP_MS = 30 * 60 * 1000; // 30 min
for each consecutive pair of timestamps:
  gap = t[i+1] - t[i]
  if gap < MAX_GAP_MS: duration += gap
```

Referrer-suodatus lisätään data-looppiin: ohitetaan rivit joissa referrer sisältää "lovable.app" tai "localhost".

Muutokset tehdään vain edge functioniin, UI-komponenttiin ei tarvita muutoksia.

