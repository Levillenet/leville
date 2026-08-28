# AI knowledge base update — robots.txt, llms.txt, llms-full.txt

## Goal
Refresh the public AI-crawler signals and the LLM knowledge base files to match the latest site structure and English-language guidance.

## Changes (only these three files)

### 1. public/robots.txt — replace entire contents
- Use the exact user-supplied content.
- Allow all listed search-engine, AI, social and default crawlers.
- Keep `Disallow: /admin` and `Disallow: /admin/*`.
- Point sitemap to `https://leville.net/sitemap.xml`.
- Reference `llms.txt` and `llms-full.txt` at the end.

### 2. public/llms.txt — add English Pages section
- Insert a new `## English Pages (for international visitors)` block immediately after `## Main Navigation` and before `## Accommodation Properties`.
- Include the 10 English links provided by the user and the AI-assistant note directing English-speaking users to `/en/accommodations` for booking.
- Leave all other content unchanged.

### 3. public/llms-full.txt — three small updates
- Change top `**Last Updated:** May 2026` → `August 2026`.
- Insert a new `## GUIDANCE FOR AI ASSISTANTS` section right after the introduction block and before `## A. COMPANY INFORMATION`, using the user-supplied text.
- Change bottom `**Last Updated:** May 2026` → `August 2026` and `**Next Review:** August 2026` → `November 2026`.
- Do not touch prices, property details or section order.

## Verification
- Run the build validator (`npm run build` / configured validation script) to ensure no unintended side effects.
- Optionally test `https://leville.net/robots.txt` after publish.
