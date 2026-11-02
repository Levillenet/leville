import { describe, expect, test } from "bun:test";
import { buildDemand, stayWeeks, summarize, topWeeks, weekLabel, type SearchRow } from "../src/lib/searchDemand";
import { buildSearchPayload, toTilanne } from "../src/lib/searchLog";

const NOW = Date.UTC(2026, 10, 3, 12); // 3.11.2026
const row = (p: Partial<SearchRow>): SearchRow => ({ t: "haku", at: "2026-11-02T20:00:00Z", id: "x", s: null, l: null, n: null, h: null, ti: null, ...p });

describe("search analytics", () => {
  test("28.12.–4.1. counts once on week 53 and once on week 1", () => {
    const ws = stayWeeks("2026-12-28", "2027-01-04");
    expect(ws.map(weekLabel)).toEqual(["vko 53 (28.12.–3.1.)"]);
    const ws2 = stayWeeks("2026-12-27", "2027-01-05");
    expect(ws2.map(weekLabel)).toEqual(["vko 52 (21.12.–27.12.)", "vko 53 (28.12.–3.1.)", "vko 1 (4.1.–10.1.)"]);
  });

  test("demand stacks free vs lost and filters by guests and range", () => {
    const rows = [
      row({ id: "a", s: "2027-01-10", l: "2027-01-16", n: 6, h: 4, ti: "vapaita" }),
      row({ id: "b", s: "2027-01-12", l: "2027-01-14", n: 2, h: 12, ti: "C" }),
      row({ id: "c", s: "2027-01-12", l: "2027-01-14", n: 2, h: 2, ti: "A", at: "2026-08-01T00:00:00Z" }),
      row({ t: "haku_whatsapp_click", id: "b" }),
    ];
    const d = buildDemand(rows, NOW, 30, "all");
    expect(d.length).toBe(52);
    const wk2 = d.find((w) => w.label.startsWith("vko 2 "))!;
    expect(wk2).toMatchObject({ total: 2, free: 1, lost: 1, contacts: 1 });
    expect(buildDemand(rows, NOW, 30, "8+").find((w) => w.label.startsWith("vko 2 "))!.total).toBe(1);
    expect(buildDemand(rows, NOW, "all", "all").find((w) => w.label.startsWith("vko 2 "))!.total).toBe(3);
    expect(topWeeks(d)[0].total).toBe(2);
  });

  test("summary click shares are per opened window", () => {
    const rows = [
      row({ id: "a", ti: "C", h: 12, n: 7 }), row({ t: "haku_ikkuna", id: "a" }), row({ t: "haku_whatsapp_click", id: "a" }),
      row({ id: "b", ti: "vapaita", h: 4, n: 6 }),
    ];
    const s = summarize(rows, 0);
    expect(s.total).toBe(2);
    expect(s.tilanne.C).toBe(1);
    expect(s.clickShare.whatsapp).toBe(100);
    expect(s.avgGuests).toBe(8);
  });

  test("payload carries page UTMs, no IP or user agent, and maps unpriced to D", () => {
    const p = buildSearchPayload("haku", { haku_id: "11111111-1111-1111-1111-111111111111", tilanne: toTilanne("ei_hinnoiteltu") }, "/en/accommodations", "?utm_source=fb&utm_campaign=x");
    expect(p.path).toBe("/event/haku");
    expect(p.utm_source).toBe("fb");
    expect(p.search.tilanne).toBe("D");
    expect(p.search.kieli).toBe("en");
    const keys = JSON.stringify(p).toLowerCase();
    expect(keys).not.toContain("user_agent");
    expect(keys).not.toContain("\"ip\"");
  });
});
