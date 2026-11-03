// Same-building apartment combinations for large groups (empty-search rescue).
// Pure code: shared by find-alternatives and the bun tests.

/**
 * BUILDINGS: edit this table to change which Moder properties may be combined.
 * Units are only ever combined inside one building, never across buildings.
 * `unit(name)` returns the unit label shown to guests, or null when the card is not in the building.
 */
export const BUILDINGS: { key: string; label: string; unit: (name: string) => string | null }[] = [
  {
    key: "skistar",
    label: "Skistar",
    // Moder card names vary ("Skistar Superior huoneisto 310", "Levi centre studio apartment 321"):
    // the apartment number identifies the unit.
    unit: (name) => {
      if (/Glacier/i.test(name)) return null;
      const m = name.match(/\b(209|210|211|212|310|104|319|320|321)\b/);
      return m ? m[1] : null;
    },
  },
  {
    key: "glacier",
    label: "Glacier",
    unit: (name) => {
      if (!/Levi Glacier Apartments/i.test(name)) return null;
      const m = name.match(/\b([AB][1-6])\b/);
      return m ? m[1] : null;
    },
  },
];

export type FreeUnit = { name: string; id: string | null; capacity: number; price: number | null };
export type ComboUnit = { unit: string; id: string | null; capacity: number; price: number | null };
export type Combo = { talo: string; label: string; units: ComboUnit[]; capacity: number; price: number | null };

/** Best combinations of 2–3 free units from one building whose capacity covers the group. */
export function findCombos(free: FreeUnit[], guests: number, maxShown = 2): Combo[] {
  const best: Combo[] = [];
  for (const b of BUILDINGS) {
    const units: ComboUnit[] = [];
    const seen = new Set<string>();
    for (const f of free) {
      const u = b.unit(f.name);
      if (!u || seen.has(u) || !(f.capacity > 0)) continue;
      seen.add(u);
      units.push({ unit: u, id: f.id, capacity: f.capacity, price: f.price });
    }
    const cands: Combo[] = [];
    const add = (us: ComboUnit[]) => {
      const capacity = us.reduce((s, u) => s + u.capacity, 0);
      if (capacity < guests) return;
      const price = us.every((u) => u.price !== null) ? us.reduce((s, u) => s + (u.price as number), 0) : null;
      cands.push({ talo: b.key, label: b.label, units: us, capacity, price });
    };
    for (let i = 0; i < units.length; i++)
      for (let j = i + 1; j < units.length; j++) {
        add([units[i], units[j]]);
        for (let k = j + 1; k < units.length; k++) add([units[i], units[j], units[k]]);
      }
    cands.sort(compareCombos);
    if (cands[0]) best.push(cands[0]);
  }
  return best.sort(compareCombos).slice(0, maxShown);
}

/** Fewest apartments, then least spare capacity, then cheapest (unknown price last). */
export function compareCombos(a: Combo, b: Combo): number {
  return a.units.length - b.units.length ||
    a.capacity - b.capacity ||
    (a.price ?? Infinity) - (b.price ?? Infinity);
}
