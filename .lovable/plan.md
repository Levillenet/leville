## Plan D: MajoitusCallout-laajennus oppaisiin

Komponentti `src/components/MajoitusCallout.tsx` on jo olemassa (default + compact -variantit, fi/en). Käytössä vain 3 sivulla: `Sauna.tsx`, `Revontulet.tsx`, `guide/RestaurantsAndServices.tsx`.

### Lisätään callout (default-variantti, ennen Read-Also-osiota)

**Hub-sivut (korkein liikenne):**
1. `src/pages/Levi.tsx` — pääinfosivu
2. `src/pages/guide/ActivitiesHub.tsx`
3. `src/pages/guide/SeasonsHub.tsx`
4. `src/pages/guide/TravelHub.tsx`
5. `src/pages/guide/ComparisonHub.tsx`

**Korkean konversiopotentiaalin oppaat:**
6. `src/pages/guide/CabinVsApartmentLevi.tsx` (suora vertailu → majoitus)
7. `src/pages/guide/SkiHolidayLevi.tsx`
8. `src/pages/guide/SkiingInLevi.tsx`
9. `src/pages/guide/BestTimeToVisitLevi.tsx`
10. `src/pages/guide/PackingListLapland.tsx`
11. `src/pages/guide/LeviFAQ.tsx`
12. `src/pages/guide/LeviWithChildren.tsx`
13. `src/pages/guide/RomanticLeviGetaway.tsx`

**Kausiopassit:**
14. `src/pages/guide/WinterInLevi.tsx`
15. `src/pages/guide/SummerInLevi.tsx`
16. `src/pages/guide/SpringInLevi.tsx`
17. `src/pages/guide/AutumnRuskaInLevi.tsx`
18. `src/pages/guide/ChristmasDinnerLeviFI.tsx`
19. `src/pages/guide/NewYearsEveLevi.tsx`

**Travel/Practical:**
20. `src/pages/travel/HowToGetToLevi.tsx`
21. `src/pages/guide/GettingAroundLevi.tsx`
22. `src/pages/guide/LeviWithoutCar.tsx`

**Aktiviteetit (compact-variantti) — vain top 3:**
23. `src/pages/activities/TopWinterActivities.tsx`
24. `src/pages/activities/HuskySafariTips.tsx`
25. `src/pages/activities/ReindeerSafariLevi.tsx`

Yhteensä **25 sivua**. Käytetään olemassa olevaa default-tekstiä eli ei tarvita uutta kopiointia – komponentti hoitaa fi/en automaattisesti `lang`-propin perusteella.

### Toteutus
- Import: `import MajoitusCallout from "@/components/MajoitusCallout";`
- Sijoitus: ennen "Lue myös" / "Read also" -osiota, tai jos sellaista ei ole, ennen Footeria
- Default-variantti hub- ja oppaissivuilla, compact aktiviteeteissa
- `lang`-propi välitetään sivun nykyisestä lang-arvosta

### Vahvistus
OK 25 sivua, vai haluatko karsia (esim. vain hub-sivut + top-oppaat = ~12) tai laajentaa (kaikki ~50 opassivua)?
