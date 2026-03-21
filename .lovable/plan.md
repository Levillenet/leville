

## Trust Badges footeriin — Booking.com & Airbnb arviot

### Muutokset

**Tiedosto: `src/components/Footer.tsx`**

1. **Poista "Guest Support" -sarake** (rivit 238-280) — tukisivulinkit, Headset-ikoni, WhatsApp ja puhelin siirtyvät pois kolmannesta sarakkeesta. WhatsApp ja puhelin säilyvät Contact-sarakkeessa.

2. **Korvaa poistettu sarake "Trust Badges" -sarakkeella:**
   - Otsikko: "Arvioitu erinomaiseksi" / "Rated Excellent" / kieliversiot
   - **Booking.com badge**: logo (SVG inline tai kuva `public/`-kansioon) + teksti "Fabulous 9.0" + pieni tähtirivistö
   - **Airbnb badge**: logo (SVG inline tai kuva) + teksti "Exceptional" 
   - Molemmat tyylitelty hillitysti footerin designiin sopiviksi (tumma tausta, vaalea teksti, logot harmaa/valkoinen)

3. **Siirrä WhatsApp ja puhelin Contact-sarakkeeseen** (4. sarake) — lisätään nykyisten email/location-rivien jälkeen

4. **Logot**: Käytetään inline SVG:tä Booking.com ja Airbnb logoille (yksinkertaiset, tunnistettavat versiot). Vaihtoehtoisesti lisätään PNG-tiedostot `public/`-kansioon. SVG on parempi koska ei vaadi erillistä latausta.

5. **Kieliversiot** otsikkotekstille (kaikki 7 kieltä), arviopisteet ja platformien nimet pysyvät englanniksi.

### Grid-rakenne (ennallaan 4 saraketta)
```text
[Brand/Logo] [Quick Links] [Trust Badges] [Contact + WhatsApp/Phone]
```

### Muokattavat tiedostot
- `src/components/Footer.tsx`

