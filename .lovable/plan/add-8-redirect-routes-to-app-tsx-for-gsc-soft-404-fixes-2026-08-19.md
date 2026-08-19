# Add 8 redirect routes to App.tsx for GSC Soft 404 fixes

## What to do

Add the following `<Navigate replace />` redirect routes to `src/App.tsx`, placing them inside the existing "Soft 404 -korjaukset" block immediately before the catch-all `*` route. Do not modify or remove any existing routes.

```text
/guide        -> /en
/opas         -> /
/tietoa       -> /
/latukartta   -> /opas/hiihtoladut-levi
/de/news      -> /
/hiihtajankuja-5-b-2 -> /majoitukset
/es/alojamiento -> /
/fr/hebergement -> /
```

## Notes

- `Navigate` is already imported in `src/App.tsx` from `react-router-dom`.
- The route `/accommodations/guides -> /en/accommodations` already exists in the same block, so it will be left untouched.
- No page files, components, translations, styling, or `sitemap.xml` will be modified.
- The redirect routes will be inserted after all existing content routes and before the catch-all `NotFound` route, as requested.
