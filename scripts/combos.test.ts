import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { findCombos, type FreeUnit } from "../supabase/functions/_shared/combos";
import { parseFreeUnits } from "../supabase/functions/_shared/moderResult";
import { comboLabel, comboMessage, combosFor } from "../src/lib/availabilityPrecheck";

const u = (name: string, capacity: number, price: number | null = 500): FreeUnit => ({ name, id: "1", capacity, price });
const offer = { start: "2027-01-11", end: "2027-01-14", adults: 6, children: 0 };

describe("same-building combinations", () => {
  it("11.–14.1.2027, 6 adults: Skistar 310 + 209, 8 guests, 1 128 €", () => {
    const [c] = findCombos([u("Skistar Superior huoneisto 310", 4, 564), u("Levi Centre Superior 1 makuuhuoneen asunto 209", 4, 564)], 6);
    expect(c.units.map((x) => x.unit)).toEqual(["310", "209"]);
    expect(c.capacity).toBe(8);
    expect(c.price).toBe(1128);
    expect(comboLabel(c, offer, "fi")).toBe("Skistar: 2 saunallista huoneistoa (yht. 8 hlö) – 1 128 € / 3 yötä");
    expect(comboMessage(c, offer, "fi")).toBe("Hei, haluaisimme varata 11.–14.1.2027 6 hengelle Skistar-huoneistot 310 + 209.");
  });
  it("never combines units from different buildings", () => {
    expect(findCombos([u("Skistar Superior huoneisto 310", 4), u("Levi Glacier Apartments A2 67m2", 6)], 6)).toEqual([]);
  });
  it("one free unit in a building gives no combination", () => {
    expect(findCombos([u("Skistar Superior huoneisto 310", 4), u("Karhunvartija 3", 4)], 6)).toEqual([]);
  });
  it("other properties are never combined", () => {
    expect(findCombos([u("Alppitalohuoneisto eturinteellä 5A2", 6), u("Levin keskusta studio huoneisto 102", 3)], 6)).toEqual([]);
  });
  it("prefers fewest units, then least spare capacity, then cheapest; max 3 units", () => {
    const [c] = findCombos([u("Levi Glacier Apartments A1", 8, 684), u("Levi Glacier Apartments A2", 6, 573), u("Levi Glacier Apartments B1", 10, 861)], 14);
    expect(c.units.map((x) => x.unit).sort()).toEqual(["A1", "A2"]);
    expect(findCombos([u("Skistar 104", 3), u("Skistar 319", 3), u("Skistar 320", 3), u("Skistar 321", 3)], 12)).toEqual([]);
  });
  it("shown only in situations A and C with 5+ guests", () => {
    const r = { alternatives: [], minimi_oita: 0, yhdistelmat: [{ talo: "skistar", label: "Skistar", units: [], capacity: 8, price: 1 }] };
    expect(combosFor(r, "C", 6).length).toBe(1);
    expect(combosFor(r, "B", 6).length).toBe(0);
    expect(combosFor(r, "C", 4).length).toBe(0);
  });
});

describe("Moder card parsing", () => {
  it("reads free cards only, with capacity and stay total excluding cleaning fee", () => {
    const card = (name: string, free: boolean) => `<div class="room-card x">${free ? "<span>Saatavilla</span>" : "<span>Kohde on varattu</span>"}
      <h2 class="t"><a href="https://app.moder.fi/levillenet/11960?start=x">${name}</a></h2>
      <p>Loppusiivous 59 € lisätään hintaan</p><!-- Rates --><div><span class="w"> 564 € </span></div><!-- Info -->
      <span class="whitespace-nowrap">1–4 hlö</span></div>`;
    const units = parseFreeUnits(card("Skistar Superior huoneisto 310", true) + card("Skistar 211", false));
    expect(units).toEqual([{ name: "Skistar Superior huoneisto 310", id: "11960", capacity: 4, price: 564 }]);
  });
});
