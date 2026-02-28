

## Analysis

After thorough comparison, **almost all 27 pages already exist** in sitemap.xml (added in previous session). The actual remaining work is minimal:

### Bug fix
- **Line 1281**: NL skiing entry `x-default` points to `/opas/laskettelu-levilla` instead of `/opas/laskettelu-levi`

### Missing hreflang updates on existing NL entries
- **NL vs Ylläs** (lines 1370-1378): Missing `de`, `fr`, `es` hreflang links
- **NL vs Rovaniemi** (lines 1379-1386): Missing `de`, `fr`, `es` hreflang links

### Christmas Dinner missing hreflang
- **Lines 1914-1919**: Missing `hreflang="en"` and `hreflang="x-default"` links

### Implementation steps

1. Fix line 1281: change `laskettelu-levilla` to `laskettelu-levi`
2. Add `de`, `fr`, `es` hreflang links to NL vs-yllas entry (lines 1370-1378)
3. Add `de`, `fr`, `es` hreflang links to NL vs-rovaniemi entry (lines 1379-1386)
4. Add `hreflang="en"` and `hreflang="x-default"` to Christmas Dinner entry (lines 1914-1919)

Only 1 file modified: `public/sitemap.xml` with 4 small edits.

