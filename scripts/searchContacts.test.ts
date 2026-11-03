import { test, expect } from "bun:test";
import { recentContacts, buildDemand, type SearchRow } from "../src/lib/searchDemand";
const row = (p: Partial<SearchRow>): SearchRow => ({ t: "haku", at: "2026-11-03T09:00:00Z", id: "a", s: null, l: null, n: null, h: null, ti: null, ...p });
const rows = [
  row({ s: "2026-11-27", l: "2026-12-06", h: 5, n: 9 }),
  row({ t: "haku_email_click", at: "2026-11-03T09:39:00Z" }),
];
test("a 9-night search spanning two weeks yields one contact press", () => {
  const c = recentContacts(rows);
  expect(c.length).toBe(1);
  expect(c[0]).toMatchObject({ channel: "email", s: "2026-11-27", l: "2026-12-06", h: 5 });
});
test("weekly table still shows it on both weeks", () => {
  const d = buildDemand(rows, Date.parse("2026-11-03T10:00:00Z"), "all", "all");
  expect(d.filter((w) => w.contacts > 0).length).toBe(2);
});
