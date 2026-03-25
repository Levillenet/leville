

## Plan: 5 Security Fixes

### Fix 1: Add .env to .gitignore
Append environment variable entries to `.gitignore`.

### Fix 2: Remove hardcoded Supabase key from CacheAdmin.tsx
Replace hardcoded JWT strings on lines 48-49 with `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`.

### Fix 3: Remove Mapbox token fallback
In `src/pages/guide/LeviInteractiveMap.tsx` line 17, replace the hardcoded fallback token with empty string.

### Fix 4: Disallow /admin in robots.txt
Add `Disallow: /admin` before the Sitemap line in `public/robots.txt`.

### Fix 5: Sanitize AI chat output with DOMPurify
- Install `dompurify` + `@types/dompurify`
- In both `CustomerServiceChat.tsx` and `InlineChat.tsx`, import DOMPurify and wrap the HTML passed to `dangerouslySetInnerHTML` with `DOMPurify.sanitize()`

### Files
| File | Change |
|------|--------|
| `.gitignore` | Add .env entries |
| `src/components/admin/CacheAdmin.tsx` | Use env var instead of hardcoded key |
| `src/pages/guide/LeviInteractiveMap.tsx` | Remove token fallback |
| `public/robots.txt` | Add Disallow: /admin |
| `src/components/CustomerServiceChat.tsx` | Add DOMPurify sanitization |
| `src/components/InlineChat.tsx` | Add DOMPurify sanitization |
| `package.json` | Add dompurify dependency |

