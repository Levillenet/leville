# Siivoussivu: oma viesti "Kirjattu"-ilmoitukseen

Muutetaan vain tiedostoa `public/siivous.html`, ja siinäkin vain kuittauksen tilaa `none`. Muu sivu pysyy ennallaan.

## Muutos
- Jos Apps Scriptin vastauksessa on kenttä `r.viesti`, vihreässä ok-laatikossa näytetään sen teksti. Teksti tulee nykyisen "Siivous kirjattu." -tekstin tilalle.
- Jos `r.viesti` puuttuu tai on tyhjä, laatikossa näkyy edelleen "Siivous kirjattu.".
- Laatikon otsikko pysyy ennallaan. Sivulla otsikko on nyt pelkkä "Kirjattu", ei "Kirjattu · Logged", eikä sitä muuteta.

## Tekniset yksityiskohdat
`case 'none': status('ok','Kirjattu', r.viesti || 'Siivous kirjattu.'); break;`
Teksti asetetaan textContentin kautta, joten Apps Scriptin viestissä oleva HTML ei voi suoritua sivulla.
