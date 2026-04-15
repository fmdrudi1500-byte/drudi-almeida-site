/**
 * Testes do roteador GEO — Dashboard de Visibilidade em IAs
 */
import { describe, it, expect } from "vitest";
import { GEO_PROMPTS } from "./geo-router";

describe("GEO Prompts", () => {
  it("should have exactly 30 strategic prompts", () => {
    expect(GEO_PROMPTS).toHaveLength(30);
  });

  it("should have all required categories", () => {
    const categories = [...new Set(GEO_PROMPTS.map((p) => p.category))];
    expect(categories).toContain("catarata");
    expect(categories).toContain("retina");
    expect(categories).toContain("glaucoma");
    expect(categories).toContain("ceratocone");
    expect(categories).toContain("estrabismo");
    expect(categories).toContain("geral");
  });

  it("should have unique IDs for all prompts", () => {
    const ids = GEO_PROMPTS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(GEO_PROMPTS.length);
  });

  it("should have non-empty prompts in Portuguese", () => {
    GEO_PROMPTS.forEach((p) => {
      expect(p.prompt.length).toBeGreaterThan(20);
      // Should contain Portuguese characters or common Portuguese words
      expect(p.prompt).toMatch(/[aeiouáéíóúâêîôûãõç]/i);
    });
  });

  it("should have at least 4 prompts per specialty", () => {
    const byCategory = GEO_PROMPTS.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    Object.entries(byCategory).forEach(([cat, count]) => {
      expect(count, `Category ${cat} should have at least 4 prompts`).toBeGreaterThanOrEqual(4);
    });
  });

  it("should include brand-related prompts in geral category", () => {
    const geralPrompts = GEO_PROMPTS.filter((p) => p.category === "geral");
    const hasBrandPrompt = geralPrompts.some(
      (p) => p.prompt.toLowerCase().includes("drudi") || p.prompt.toLowerCase().includes("almeida")
    );
    expect(hasBrandPrompt).toBe(true);
  });
});
