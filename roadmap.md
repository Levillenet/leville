# Tehtävät
- [x] Korjaa admin-paneelin tilastojen lataus ja kirjautumisyritysten rajoitus.
- [x] Käännä Coloradon nachokuva oikein päin ja tarkista molemmissa kielissä.
- [x] Lisää Ravintola Kammi porobuffet-esittelyineen ja käyttäjän kuvineen suomeksi ja englanniksi.
- [x] Lisää King Crab House: suomen- ja englanninkielinen esittely sekä neljä optimoitua kuvaa.
- [x] Lisää Stefan’s Steakhouse: suomen- ja englanninkielinen esittely sekä kolme optimoitua kuvaa.
- [x] Tarkista molemmat sivut ja kuvien lataus.

## EN accommodation optimization (Oct 2026)
- [x] Phase 1 validate /en/accommodations, /en/apartments, EN guide links — present texts
- [x] Phase 2 implement after approval (A–E)

## Core Web Vitals / LCP (Oct 2026)
- [x] Heavy libraries (framer-motion, charts) out of startup path; WhatsApp chat, site search and weather widget deferred
- [x] Hero image preload only on / and /en
- [x] A: SubpageBackground static gradient on mobile, animated layers after idle on desktop, reduced-motion support
- [x] B: shared layout components in one `layout` chunk (preloaded automatically by Vite)
- [x] C: backend client loaded on first use (getSupabase); SEO pages fetched with plain fetch at idle
- [x] Before/after throttled mobile measurement
