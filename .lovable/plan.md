## Yhteenveto

Rakennetaan admin-paneeliin uusi **"Auto-vastaaja"**-välilehti, joka lukee `info@leville.net` -postilaatikkoa Gmail-connectorin kautta ja vastaa saapuneisiin viesteihin sääntöjen mukaan. Vastaukset ovat **aina lopullisia** — botti ei koskaan kysy lisätietoa, vaan antaa suoran vastauksen + linkin oikealle leville.net-sivulle. Lisäksi tulee **testitila**, jossa voit lisätä omat testisähköpostit ja saada niihin todellisia AI-vastauksia ennen julkaisua.

Gmail-yhteys on jo linkitetty projektiin ja kaikki tarvittavat scopet (readonly + send + modify) on myönnetty — ei lisätoimia tarvita.

## Toiminnan periaatteet (käyttötapaukset)

| Tilanne | Mitä botti tekee |
|---|---|
| Kysytään saunan käytöstä | Vastaa "Saunan ajastin lämmittää 30–45 min", lähettää linkin `https://leville.net/sauna` |
| Kysytään check-in-ohjeet aukioloajan ulkopuolella | Lähettää self-check-in-ohjeet + maininta: "Jos tämä ei auta, palaamme asiaan toimistoaikana ma–pe 9–17. Hätätilanteessa (vesivuoto, tuli, ei lämmintä) soita huoltoyhtiölle +358 44 13 13 13" |
| Booking.com-vieraan viesti | Vahvistaa vastaanoton ja vastaa heti oikealla linkillä |
| Yöllä (22–07) saapunut viesti | Yövastaaja-sääntö: vastaa ilta-aikaan ja lupaa toimistoseurannan aamulla |
| Spam / no-reply / bounce | Ohitetaan, ei vastausta |

**Ehdoton sääntö**: vastaus on aina lopullinen — botti ei koskaan kysy "voitko tarkentaa?". Jos tarkkaa vastausta ei tiedetä, annetaan paras yleisohje + tieto että toimisto seuraa.

## Tietokanta (uusi migraatio)

Kolme uutta taulua, kaikki RLS päällä eikä julkisia policy-rivejä → vain edge-funktiot pääsevät käsiksi service-role-keylla.

- **`autoresponder_settings`** (yksi rivi): `enabled`, `last_poll_at`, `signature_html`, `default_language`, **`test_mode` (bool)**, **`test_recipients` (text[])**
- **`autoresponder_rules`**: `name`, `is_active`, `priority`, `match_domain` (esim. `guest.booking.com` tai `*`), `match_keywords[]`, `active_days[]` (0=su…6=la), `active_hours_start/end`, `response_mode` (`template`/`ai`), `template_subject/body` (JSONB per kieli), `ai_extra_instructions`, `cooldown_hours`
- **`autoresponder_log`**: `gmail_message_id` (unique), `gmail_thread_id`, `from_email`, `from_domain`, `subject`, `matched_rule_id`, `action`, `reply_subject/body`, `reply_sent_at`, `is_test`, `error_message`

Seedataan 2 valmista sääntöä: Booking.com-vahvistus + yövastaaja 22–07.

## Edge-funktiot

1. **`autoresponder-poll`** (cron 5 min välein):
   - Hakee uudet lukemattomat viestit (`is:unread newer_than:1d`)
   - Skippaa noreply/mailer-daemon/bounce-osoitteet
   - Tarkistaa `autoresponder_log` — jättää väliin jos sama viesti jo käsitelty tai sama lähettäjä saanut vastauksen cooldown-ajan sisällä
   - Etsii ensimmäisen matchaavan säännön (priority + domain + päivä + kellonaika Helsinki-aikaa)
   - Jos `test_mode=ON`: vastaa vain jos `from_email` on `test_recipients`-listalla — muut logitetaan toimenpiteellä `skipped_test_mode`
   - **AI-vastaus**: kutsuu Lovable AI Gateway → `google/gemini-2.5-flash` järjestelmäviestillä joka sisältää koko knowledge-base-kontekstin (sauna, lämmitys, check-in, wifi, aktiviteetit jne. + URL:t). Pakottaa: "anna aina suora vastaus + linkki, älä koskaan kysy lisätietoa". Tunnistaa kielen viestistä ja vastaa samalla kielellä.
   - **Template-vastaus**: täyttää `{{sender_name}}`, `{{date}}` placeholderit valitulla kielellä
   - Lähettää vastauksen samaan ketjuun (`In-Reply-To`, `References`, `threadId`)
   - Merkitsee alkuperäisen viestin luetuksi
   - Logittaa rivin

2. **`autoresponder-manage`** (admin CRUD):
   - `list_rules`, `upsert_rule`, `delete_rule`, `toggle_rule`
   - `get_settings`, `update_settings` (sis. test_mode + test_recipients lisäys/poisto)
   - `list_log` (paginated, suodatus domainilla, päivämäärävälillä, action-tyypillä)
   - Suojattu admin-salasanalla (sama pattern kuin `manage-tickets`)

3. **`autoresponder-test`** (manuaalinen testaus admin-UI:sta):
   - Input: `subject`, `body`, `from_email` (oletus: ensimmäinen test_recipients), `language` (auto-detect tai pakotettu), `rule_id` (valinnainen)
   - Generoi AI-vastauksen samalla logiikalla kuin oikea polling
   - Lähettää vastauksen valittuun testisähköpostiin oikeasti Gmailin kautta
   - Palauttaa generoidun tekstin myös admin-UI:lle preview-näkymään
   - Logittaa rivin `is_test=true`

## Knowledge base AI:lle

Uusi tiedosto `supabase/functions/_shared/autoresponderKnowledge.ts` sisältää:

- 14 aihealuetta täsmäavainsanoineen ja URL:eineen (sauna, takka, lämmitys, wifi, check-in/out, ohjaus, aktiviteetit, ravintolat, sää, hissiliput, majoitukset, varausehdot, yritys, asiakaspalvelu)
- Toimistoajat (ma–pe 9–17 EET)
- Hätätilanneohje (huoltoyhtiö +358 44 13 13 13 — vain kriittiset hätätilanteet)
- Pohja-systeemiprompt jossa 10 ehdotonta sääntöä:
  1. Aina lopullinen vastaus, ei koskaan kysy lisää
  2. Sisällytä aina koko `https://leville.net/...`-URL kun aihe löytyy KB:sta
  3. Jos vastaus epävarma → paras yleisohje + lupaus jatkokäsittelystä toimistoaikana + hätänumero
  4. Vastaa viestin kielellä (auto-detect, default englanti)
  5. Lämmin ja ammattimainen sävy, max ~180 sanaa
  6. Pelkkää tekstiä (ei markdownia)
  7. Allekirjoita "Leville guest support" (käännetty)
  8. Älä koskaan paljasta että olet AI
  9. Älä lupaa hyvityksiä/alennuksia
  10. Jos viesti on spam/bounce → vastaa pelkkä `SKIP`

## Admin UI – uusi `AutoResponderAdmin.tsx`

Välilehti **"Auto-vastaaja"** (ikoni: Mail) Adminiin. Sisältää 3 alavälilehteä:

### 1. Yleisasetukset
- Pää on/off
- **Testitila-toggle + sähköpostilista** (chip-input: lisää/poista omia testisähköposteja kuten `kayttaja@gmail.com`)
- Allekirjoitus (HTML)
- Oletuskieli
- Viimeisin polling-aika (read-only)

### 2. Säännöt
- Lista priority-järjestyksessä, päälle/pois -toggle, järjestyksen muokkaus
- Sääntöeditori-dialog:
  - Nimi, prioriteetti, domain (`*` tai `guest.booking.com` tai `gmail.com`)
  - Aktiiviset päivät (su–la-checkbox)
  - Aktiiviset kellonajat (esim. 22:00–07:00)
  - Vastaustyyppi: Template / AI
  - Template-tab: aihe + body per kieli (fi, en, sv, de, fr, es, nl)
  - AI-tab: lisäohjeet (esim. "Sender is a Booking.com guest…")
  - Cooldown-tunnit
  - **"Testaa tällä säännöllä" -nappi** → avaa testaus-dialogin

### 3. Testaus
- Lomake: Lähettäjä (dropdown test_recipients-listasta), Aihe, Viesti, Pakotettu kieli (auto/fi/en/sv/de…)
- "Lähetä testivastaus" -nappi → kutsuu `autoresponder-test`
- Näyttää generoidun vastaustekstin previewinä **ja** lähettää sen oikeasti valittuun testisähköpostiin
- Pikamallit-painikkeet: "Kysy saunaohje", "Kysy check-in-koodi", "Booking.com-vahvistus"

### 4. Loki
- Taulukko viimeisimmistä käsitellyistä viesteistä (lähettäjä, domain, aihe, sääntö, toimenpide, aika, testi-rivi-merkki)
- Suodatin domainilla / päivämäärällä / action-tyypillä
- Klikkaamalla riviä näkee koko vastauksen tekstin

## Cron + julkaistu polling

Lisätään `pg_cron`-job 5 min välein joka kutsuu `autoresponder-poll`-funktiota. Tämä asetetaan SQL:llä insert-työkalulla (sis. funktion URLin + anon-keyn → ei mene git-historiaan eri remixien kesken). Käyttäjä voi pause-napilla pysäyttää koko järjestelmän yleisasetuksista.

## Turvallisuus

- Cooldown estää loop-vastaukset (sama from-osoite → max 1 vastaus / cooldown_hours)
- Ei vastata `noreply@*`, `no-reply@*`, `mailer-daemon@*`, `postmaster@*`, `bounces+*` -osoitteisiin
- **Testitila on oletuksena PÄÄLLÄ** — botti ei vastaa ulkopuolisiin ennen kuin admin sammuttaa testitilan
- Pidetään alkuperäisen viestin `Message-ID` `In-Reply-To`/`References`-headereissa että vastaus pysyy ketjussa
- Lokitus näyttää aina mitä lähetettiin, manuaalinen pause-nappi yleisasetuksissa
- Admin-salasanatarkistus kaikissa management-edge-funktioissa

## Toteutusvaiheet

1. Migraatio: 3 taulua + 2 esiseed-sääntöä + RLS päälle
2. Edge-funktiot: `_shared/autoresponderKnowledge.ts`, `_shared/gmail.ts`, `autoresponder-poll`, `autoresponder-manage`, `autoresponder-test`
3. pg_cron-job (5 min välein) — insert-työkalulla
4. Admin-UI: `src/components/admin/AutoResponderAdmin.tsx` + uusi tab `Admin.tsx`-tiedostoon (ikoni Mail)
5. Muistitiedosto `mem://features/admin/auto-vastaaja-gmail` järjestelmän dokumentointia varten
6. **Käyttäjän testaus**: testitila päällä → lisää oma sähköposti → lähetä testiviesti adminin testilomakkeesta → tarkista että vastaus saapuu omaan postiin oikealla sisällöllä → kun OK, sammuta testitila → live

## Tekninen huomio

Tässä keskustelukierroksessa olin plan-modessa, joten kirjoitustyökalut on lukittu. Kun hyväksyt suunnitelman, agentti vaihtaa build-modeen ja toteuttaa kaikki yllä olevat osat yhdessä syklissä. Migraatio + 5 edge-funktiotiedostoa + admin-komponentti + tab-rekisteröinti + cron + muistitiedosto.

Hyväksy suunnitelma niin toteutan välittömästi.