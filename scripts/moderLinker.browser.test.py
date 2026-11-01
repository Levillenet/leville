"""Run with python3 scripts/moderLinker.browser.test.py against the preview.

Simulate Google's mousedown decoration without sending test traffic to GA4.
Exercise the real widget, delegated handlers, callback and 150 ms fallback.
"""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright


async def check(browser, consent, callback):
    context = await browser.new_context(viewport={"width": 1280, "height": 1800})
    await context.route("**/googletagmanager.com/**", lambda route: route.abort())
    await context.route("https://app.moder.fi/**", lambda route: route.fulfill(
        content_type="text/html", body="<h1>Moder test destination</h1>"))
    page = await context.new_page()
    await page.goto("http://localhost:8080")
    await page.get_by_role("button", name="Hyväksy kaikki" if consent else "Vain välttämättömät", exact=True).click()
    await page.wait_for_function("window.Moder && document.querySelector('.moder-bar__search-button')")
    await page.evaluate("""({consent, callback}) => {
      window.__linkerTest = {events: [], clicks: 0, downs: 0, waits: 0, destinations: []};
      const result = window.__linkerTest;
      const timeout = window.setTimeout;
      window.setTimeout = function(fn, ms, ...args) {
        if (ms === 150) result.waits++;
        return timeout.call(window, fn, ms, ...args);
      };
      window.gtag = (...args) => {
        if (args[0] === 'event') {
          result.events.push(args[1]);
          if (callback && args[1] === 'majoitushaku') args[2].event_callback();
        }
      };
      document.addEventListener('mousedown', event => {
        const a = event.target.closest('a[data-lv-nav]');
        if (!a) return;
        result.downs++;
        if (consent) {
          const url = new URL(a.href);
          url.searchParams.set('_gl', 'test-mousedown-linker');
          a.href = url.href;
        }
      });
      document.addEventListener('click', event => {
        const a = event.target.closest('a[data-lv-nav]');
        if (!a) return;
        result.clicks++;
        result.destinations.push(a.href);
      });
      window.Moder.fromDate = '2027-03-08';
      window.Moder.toDate = '2027-03-15';
      window.Moder.fromSelection = new Date('2027-03-08T12:00:00');
      window.Moder.toSelection = new Date('2027-03-15T12:00:00');
      window.Moder.personsAdults = 2;
      window.Moder.personsChildren = 1;
    }""", {"consent": consent, "callback": callback})
    await page.wait_for_function("window.Moder.searchReady")
    evidence = []
    await page.expose_function("captureLinkerResult", lambda value: evidence.append(value))
    await page.evaluate("window.addEventListener('beforeunload', () => window.captureLinkerResult(window.__linkerTest))")
    folder = Path("/tmp/browser/moder-linker")
    folder.mkdir(parents=True, exist_ok=True)
    await page.locator('.moder-bar').screenshot(path=str(folder / f"search-{consent}-{callback}.png"))
    await page.locator('.moder-bar__search-button').click()
    await page.wait_for_url("https://app.moder.fi/**")
    await page.wait_for_timeout(300)
    assert evidence, "Missing navigation evidence"
    result = evidence[0]
    from urllib.parse import urlparse, parse_qs
    params = parse_qs(urlparse(page.url).query)
    assert {key: params[key] for key in ['start', 'end', 'adults', 'children']} == {
        'start': ['2027-03-08'], 'end': ['2027-03-15'], 'adults': ['2'], 'children': ['1']}
    if consent:
        assert params['_gl'] == ['test-mousedown-linker']
        assert result['downs'] == 1 and result['clicks'] == 1
        assert result['events'].count('majoitushaku') == 1
        assert result['events'].count('varaa_click') == 0
        assert result['waits'] == 1, "Synthetic click must not add another delay"
        assert parse_qs(urlparse(result['destinations'][0]).query)['_gl'] == ['test-mousedown-linker']
    else:
        assert '_gl' not in params
        assert result['downs'] == 0 and result['clicks'] == 0
        assert result['events'] == [] and result['waits'] == 0
    print(f"PASS consent={consent}, callback={callback}: preserved search, single navigation, events={result['events']}")
    await context.close()


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for consent, callback in [(True, True), (True, False), (False, False)]:
            await check(browser, consent, callback)
        await browser.close()


asyncio.run(main())