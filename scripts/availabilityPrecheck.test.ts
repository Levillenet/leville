import { describe, it, expect } from "bun:test";
import { createPrecheck, offerMessage, whatsappUrl, mailtoUrl, nearestDatesUrl, selectionKey, type Selection } from "../src/lib/availabilityPrecheck";

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
  it("nearest dates uses ±3 days", () => {
    expect(nearestDatesUrl(o, "fi")).toContain("flexible_date_search=3");
  });
});
