import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock blog-db to test getRelatedPosts logic
vi.mock("./blog-db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./blog-db")>();
  return {
    ...actual,
  };
});

import { getDb } from "./db";

describe("getRelatedPosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty array when db is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValue(null as any);

    // Dynamically import to get fresh module with mocked db
    const { getRelatedPosts } = await import("./blog-db");
    const result = await getRelatedPosts(1, null, 3);
    expect(result).toEqual([]);
  });

  it("blog getRelated tRPC procedure is registered", async () => {
    // Import the router and check the procedure exists
    const { blogRouter } = await import("./blog-router");
    // The router should have a getRelated procedure
    expect(blogRouter).toBeDefined();
    // Check that the procedure key exists in the router definition
    const routerDef = blogRouter._def;
    expect(routerDef).toBeDefined();
    expect(routerDef.procedures).toBeDefined();
    expect(routerDef.procedures.getRelated).toBeDefined();
  });
});
