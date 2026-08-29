# Vierastietojen poisto käytöstä ja tietokannan siivous

Tavoite: sivusto ei enää hae, näytä eikä tallenna vieraiden nimiä, sähköposteja tai puhelinnumeroita. Vanhat arvot tyhjennetään tietokannasta, mutta sarakkeet jäävät paikoilleen.

## 1. Vieraiden viestintä (Beds24-vierashaku)

- Piilotetaan admin-paneelin "Viestintä"-välilehti ja sen sisältö. Tiedostot (`MessagingAdmin.tsx`) jäävät talteen, mutta niitä ei enää renderöidä.
- `get-current-guests` -taustapalvelu poistetaan käytöstä: se ei enää hae Beds24:stä nimiä, puhelinnumeroita eikä sähköposteja, vaan palauttaa tyhjän listan.
- `log-message` lopettaa vieraan nimen ja puhelinnumeron tallentamisen.
- Siivousmerkintä (`mark-cleaned`) ei enää tallenna vieraan nimeä, sähköpostia eikä puhelinnumeroa, eikä lähetä vieraalle sähköposti-ilmoitusta. Siivousstatus (huoneisto, päivä, siivottu-aika) toimii ennallaan.
- Ylläpidon huoltonäkymä lähettää jatkossa vain huoneisto- ja päivätiedot.

## 2. Automaattivastaaja (saapuvat sähköpostit)

- Automaattivastaaja kytketään pois päältä ja sen välilehti piilotetaan admin-paneelista.
- Sähköpostilaatikon säännöllinen tarkistus (`autoresponder-poll`) lopetetaan, jotta saapuvien viestien lähettäjätietoja ja sisältöjä ei enää tallenneta.
- Koodi säilytetään, mutta se ei aja mitään ilman erillistä uudelleenkäyttöönottoa.

## 3. Chatbot-lokit

- Asiakaspalvelubotti lakkaa tallentamasta käyttäjän viestejä ja vastauksia `chatbot_logs`-tauluun.
- Admin-paneelin chatbot-tilastonäkymä piilotetaan, koska dataa ei enää kerry.

## 4. Tietokannan siivous

Ajetaan datan tyhjennys (rakennetta ei muuteta):

- `cleaning_status`: `guest_name`, `guest_email`, `guest_phone`, `booking_id` → tyhjäksi
- `message_logs`: kaikki rivit poistetaan (8 riviä; sisältävät nimiä ja peitettyjä puhelinnumeroita)
- `autoresponder_log`: kaikki rivit poistetaan (84 riviä; lähettäjän sähköposti ja viestisisältö)
- `autoresponder_drafts`: kaikki rivit poistetaan (4 riviä)
- `autoresponder_learned`: kaikki rivit poistetaan (opitut viestipohjat perustuvat asiakasviesteihin)
- `chatbot_logs`: kaikki rivit poistetaan (14 riviä)

Revontulihälytysten tilaajasähköpostit (`aurora_alerts`, 44 kpl) jätetään koskematta, koska ne eivät kuuluneet valittuun laajuuteen.

## Mitä EI muuteta

- Sivuston julkinen sisältö, ulkoasu, SEO-tagit tai varausjärjestelmän linkitykset.
- Beds24-saatavuus ja hinnat, huoltotiketit, lämpöpumput, analytiikka.
- Yhteydenottolomake (`send-property-inquiry`), joka lähettää viestin suoraan sähköpostiin tallentamatta sitä tietokantaan.

## Tekniset yksityiskohdat

- Muokattavat tiedostot: `src/pages/Admin.tsx` (välilehdet), `src/components/admin/MaintenanceAdmin.tsx` (mark-cleaned-kutsu), `supabase/functions/get-current-guests/index.ts`, `supabase/functions/log-message/index.ts`, `supabase/functions/mark-cleaned/index.ts`, `supabase/functions/autoresponder-poll/index.ts`, `supabase/functions/customer-service-chat/index.ts`.
- Datan tyhjennys tehdään `UPDATE`/`DELETE`-ajona, ei skeemamuutoksena.
- Muutetut edge-funktiot deployataan, minkä jälkeen tarkistetaan build ja julkaistaan sivusto.
