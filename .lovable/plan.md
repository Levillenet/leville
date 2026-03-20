

## Hakutilastojen varmistaminen CSV-viennissä ja dashboardissa

### Nykytilanne

Hakutapahtumat (`/event/site-search`) tallentuvat jo `page_views`-tauluun ja näkyvät CSV-viennissä riveinä. **Mutta:**

1. **REPORT_DESCRIPTION** (LLM-selite) ei dokumentoi `site-search`-tapahtumatyyppiä — LLM ei osaa tulkita hakudataa
2. **Dashboard** näyttää vain 4 booking-konversiota — hakutilastot eivät näy lainkaan
3. **Haut ilman klikkausta** eivät tallennu — jos käyttäjä hakee mutta sulkee dialogin, data menetetään

### Muutokset

**1. `src/components/SiteSearch.tsx`** — Lisää "tyhjän haun" logitus
- Kun dialogi suljetaan JA hakukenttään on kirjoitettu vähintään 2 merkkiä mutta tulosta ei valittu, logitetaan `/event/site-search-abandon`
- referrer = hakusana, utm_source = tyhjä (ei valintaa)
- Tämä kertoo mitä käyttäjät yrittävät etsiä mutta eivät löydä

**2. `src/components/admin/PageViewsAdmin.tsx`** — Näytä hakutilastot dashboardissa
- Lisää `EVENT_LABELS`-mappiin: `"/event/site-search": "Sivuhaku (klikkaus)"` ja `"/event/site-search-abandon": "Sivuhaku (ei tulosta)"`
- Nämä näkyvät automaattisesti konversio-osiossa top-lähtösivujen kanssa
- Hakujen `referrer`-kenttä sisältää hakusanan → näkyy "Suosituimmat lähtösivut" -listassa (= suosituimmat hakusanat)

**3. `src/components/admin/PageViewsAdmin.tsx`** — Päivitä REPORT_DESCRIPTION
- Lisää site-search ja site-search-abandon tapahtumatyyppien dokumentaatio
- Selitä että referrer = hakusana, utm_source = valittu sivu
- Lisää hakuanalyysiohjeita (suosituimmat hakusanat, hakujen konversio, epäonnistuneet haut)

### Muutettavat tiedostot
- `src/components/SiteSearch.tsx` — abandon-logitus dialogin sulkeutuessa
- `src/components/admin/PageViewsAdmin.tsx` — EVENT_LABELS + REPORT_DESCRIPTION päivitys

