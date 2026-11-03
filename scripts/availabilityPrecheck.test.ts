import { describe, it, expect } from "bun:test";
import { createPrecheck, offerMessage, whatsappUrl, mailtoUrl, moderSearchUrl, periodLabel, situationOf, selectionKey, type Selection } from "../src/lib/availabilityPrecheck";

const A: Selection = { start: "2026-12-28", end: "2027-01-04", adults: 8, children: 0, flex: 0 };
const B: Selection = { start: "2027-01-10", end: "2027-01-16", adults: 4, children: 0, flex: 0 };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("precheck", () => {
  it("debounces: only the last selection is fetched", async () => {
    const calls: string[] = [];
    const p = createPrecheck(async (s) => { calls.push(selectionKey(s)); return 1; }, 30);
    p.update(A); p.update(B);
    await sleep(60);
    expect(calls).toEqual([selectionKey(B)]);
  });
  it("discards a stale response", async () => {
    const p = createPrecheck(async (s) => { await sleep(s === A ? 60 : 5); return s === A ? 0 : 2; }, 0);
    p.update(A); await sleep(5); p.update(B);
    await sleep(100);
    expect(p.get(selectionKey(A))).toBeUndefined();
    expect(p.get(selectionKey(B))).toBe(2);
  });
  it("waitFor gives up after the time limit", async () => {
    const p = createPrecheck(async () => { await sleep(300); return 0; }, 0);
    p.update(A);
    const t = Date.now();
    expect(await p.waitFor(selectionKey(A), 100)).toBeUndefined();
    expect(Date.now() - t).toBeLessThan(250);
  });
  it("failure resolves to null (normal navigation)", async () => {
    const p = createPrecheck(async () => { throw new Error("down"); }, 0);
    p.update(A);
    expect(await p.waitFor(selectionKey(A), 200)).toBeNull();
  });
  it("zero is reported as zero", async () => {
    const p = createPrecheck(async () => 0, 0);
    p.update(A);
    expect(await p.waitFor(selectionKey(A), 200)).toBe(0);
  });
});

describe("offer message", () => {
  const o = { start: "2026-12-28", end: "2027-01-04", adults: 6, children: 2 };
  it("FI with children", () => {
    expect(offerMessage(o, "fi")).toBe("Hei! Etsimme majoitusta Leviltä 28.12.2026–04.01.2027 8 hengelle (joista 2 lasta). Voisitteko tehdä meille tarjouksen, jos sopiva kohde löytyy?");
  });
  it("EN with children", () => {
    expect(offerMessage(o, "en")).toBe("Hi! We're looking for accommodation in Levi from 28 December 2026 to 4 January 2027 for 8 guests (including 2 children). Could you send us an offer if you find a suitable place?");
  });
  it("no children text without children", () => {
    expect(offerMessage({ ...o, adults: 8, children: 0 }, "fi")).not.toContain("lasta");
  });
  it("links are URL-encoded", () => {
    const wa = whatsappUrl(o, "fi");
    expect(wa.startsWith("https://wa.me/35844131313?text=")).toBe(true);
    expect(decodeURIComponent(wa.split("text=")[1])).toBe(offerMessage(o, "fi"));
    expect(mailtoUrl(o, "en")).toContain("subject=Offer%20request");
    expect(mailtoUrl(o, "fi").startsWith("mailto:info@leville.net?subject=Tarjouspyynt%C3%B6")).toBe(true);
  });
  it("situation B message has original dates and nights", () => {
    const b = { start: "2026-12-28", end: "2027-01-01", adults: 4, children: 0 };
    expect(offerMessage(b, "fi", "B")).toBe("Hei! Toivoisimme majoitusta Leviltä 28.12.2026–01.01.2027 (4 yötä) 4 hengelle. Voisitteko tarkistaa, onnistuuko tämä jakso, ja tehdä meille tarjouksen?");
    expect(offerMessage(b, "en", "B")).toContain("(4 nights), 4 guests.");
  });
  it("see link uses exact dates, calendar link keeps the customer's flex", () => {
    expect(moderSearchUrl(o, "fi")).toContain("flexible_date_search=0");
    expect(moderSearchUrl(o, "en", 7)).toContain("flexible_date_search=7");
  });
});

describe("alternative rows", () => {
  const a = { start: "2026-12-26", end: "2027-01-02", nights: 7, shift: -2, available: 3, minPrice: 2583 };
  it("FI row", () => expect(periodLabel(a, "fi")).toBe("la 26.12. – la 2.1. (7 yötä): 3 kohdetta, alkaen 2 583 € / 7 yötä"));
  it("EN row", () => expect(periodLabel(a, "en")).toBe("Sat 26 Dec – Sat 2 Jan (7 nights): 3 properties, from €2,583 / 7 nights"));
  it("unknown price leaves the property count only", () => {
    expect(periodLabel({ ...a, minPrice: null }, "fi")).toBe("la 26.12. – la 2.1. (7 yötä): 3 kohdetta");
  });
  it("situations", () => {
    expect(situationOf(null)).toBe("C");
    expect(situationOf({ alternatives: [], minimi_oita: 0 })).toBe("C");
    expect(situationOf({ alternatives: [a], minimi_oita: 0 })).toBe("A");
    expect(situationOf({ alternatives: [a], minimi_oita: 7 })).toBe("B");
    expect(situationOf({ alternatives: [], minimi_oita: 6 })).toBe("B");
  });
});

describe("unpriced dates", () => {
  it("FI message has dates and guests incl. children", () => {
    expect(offerMessage({ start: "2027-05-08", end: "2027-05-12", adults: 2, children: 1 }, "fi", "ei_hinnoiteltu"))
      .toBe("Hei! Olemme kiinnostuneita majoituksesta Leviltä 08.05.2027–12.05.2027 3 hengelle (joista 1 lasta). Voisitteko tehdä meille tarjouksen?");
  });
  it("precheck keeps the unpriced marker", async () => {
    const { UNPRICED } = await import("../src/lib/availabilityPrecheck");
    const p = createPrecheck(async () => UNPRICED, 0);
    p.update(A); await sleep(20);
    expect(p.get(selectionKey(A))).toBe(-1);
  });
});
