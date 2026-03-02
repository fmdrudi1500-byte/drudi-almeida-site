/**
 * appointment.test.ts
 * Unit tests for the scheduling business logic.
 */

import { describe, it, expect } from "vitest";

// ─── Replicate the business logic functions for testing ───────────────────────

const WEEKDAY_SLOTS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const SATURDAY_SLOTS = [9, 10, 11, 12];

function getSlotsForDate(dateStr: string): number[] {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const dow = d.getDay();
  if (dow === 0) return [];
  if (dow === 6) return SATURDAY_SLOTS;
  return WEEKDAY_SLOTS;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("getSlotsForDate", () => {
  it("returns weekday slots (9-17) for a Monday", () => {
    // 2025-03-03 is a Monday
    const slots = getSlotsForDate("2025-03-03");
    expect(slots).toEqual(WEEKDAY_SLOTS);
    expect(slots).toContain(9);
    expect(slots).toContain(17);
    expect(slots).not.toContain(18);
  });

  it("returns weekday slots for a Friday", () => {
    // 2025-03-07 is a Friday
    const slots = getSlotsForDate("2025-03-07");
    expect(slots).toEqual(WEEKDAY_SLOTS);
  });

  it("returns Saturday slots (9-12) for a Saturday", () => {
    // 2025-03-08 is a Saturday
    const slots = getSlotsForDate("2025-03-08");
    expect(slots).toEqual(SATURDAY_SLOTS);
    expect(slots).toContain(9);
    expect(slots).toContain(12);
    expect(slots).not.toContain(13);
  });

  it("returns empty array for Sunday (clinic closed)", () => {
    // 2025-03-09 is a Sunday
    const slots = getSlotsForDate("2025-03-09");
    expect(slots).toEqual([]);
  });

  it("returns 9 slots for weekdays", () => {
    const slots = getSlotsForDate("2025-03-04"); // Tuesday
    expect(slots).toHaveLength(9);
  });

  it("returns 4 slots for Saturday", () => {
    const slots = getSlotsForDate("2025-03-08");
    expect(slots).toHaveLength(4);
  });
});

describe("slot conflict logic", () => {
  it("correctly identifies a taken slot", () => {
    const allSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    const takenHours = new Set([9, 11, 14]);
    const available = allSlots.filter((h) => !takenHours.has(h));
    expect(available).toEqual([10, 12, 13, 15, 16, 17]);
    expect(available).not.toContain(9);
    expect(available).not.toContain(11);
    expect(available).not.toContain(14);
  });

  it("returns all slots when none are taken", () => {
    const allSlots = [9, 10, 11, 12];
    const takenHours = new Set<number>();
    const available = allSlots.filter((h) => !takenHours.has(h));
    expect(available).toEqual(allSlots);
  });

  it("returns empty when all slots are taken", () => {
    const allSlots = [9, 10, 11, 12];
    const takenHours = new Set([9, 10, 11, 12]);
    const available = allSlots.filter((h) => !takenHours.has(h));
    expect(available).toEqual([]);
  });
});

describe("input validation", () => {
  it("validates that hour 9 is valid on a weekday", () => {
    const slots = getSlotsForDate("2025-03-03");
    expect(slots.includes(9)).toBe(true);
  });

  it("validates that hour 17 is valid on a weekday", () => {
    const slots = getSlotsForDate("2025-03-03");
    expect(slots.includes(17)).toBe(true);
  });

  it("validates that hour 13 is NOT valid on Saturday", () => {
    const slots = getSlotsForDate("2025-03-08");
    expect(slots.includes(13)).toBe(false);
  });

  it("validates that no hour is valid on Sunday", () => {
    const slots = getSlotsForDate("2025-03-09");
    expect(slots.includes(9)).toBe(false);
    expect(slots.length).toBe(0);
  });
});
