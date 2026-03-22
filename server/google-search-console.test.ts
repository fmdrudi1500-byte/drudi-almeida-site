/**
 * Tests for google-search-console.ts helpers
 * Uses vi.mock to stub fetch so no real HTTP calls are made.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the ENV module so tests don't depend on real credentials
vi.mock("./_core/env", () => ({
  ENV: {
    googleClientId: "test-client-id",
    googleClientSecret: "test-client-secret",
    googleRefreshToken: "test-refresh-token",
  },
}));

// We import after mocking so the module picks up the mocked ENV
const { submitSitemapToGSC, getSitemapStatus, listSitemaps } = await import("./google-search-console");

const SITEMAP_URL = "https://institutodrudiealmeida.com.br/sitemap.xml";

// Helper to create a mock fetch response
function mockFetch(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
    json: async () => body,
  });
}

describe("submitSitemapToGSC", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return success when Google returns 204", async () => {
    // First call: token endpoint, second call: GSC submit endpoint
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ access_token: "mock-token" }),
          text: async () => JSON.stringify({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 204,
          text: async () => "",
          json: async () => ({}),
        })
    );

    const result = await submitSitemapToGSC();

    expect(result.success).toBe(true);
    expect(result.sitemapUrl).toBe(SITEMAP_URL);
    expect(result.statusCode).toBe(204);
  });

  it("should return failure when GSC returns 403", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ access_token: "mock-token" }),
          text: async () => JSON.stringify({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 403,
          text: async () => "Forbidden",
          json: async () => ({ error: "forbidden" }),
        })
    );

    const result = await submitSitemapToGSC();

    expect(result.success).toBe(false);
    expect(result.statusCode).toBe(403);
    expect(result.message).toContain("403");
  });

  it("should return failure when token refresh fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
        json: async () => ({ error: "invalid_grant" }),
      })
    );

    const result = await submitSitemapToGSC();

    expect(result.success).toBe(false);
    expect(result.message).toContain("Failed to refresh");
  });

  it("should return failure when fetch throws a network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    const result = await submitSitemapToGSC();

    expect(result.success).toBe(false);
    expect(result.message).toContain("Network error");
  });
});

describe("getSitemapStatus", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return sitemap info on success", async () => {
    const mockInfo = {
      path: SITEMAP_URL,
      lastSubmitted: "2026-03-22T00:00:00Z",
      isPending: false,
      warnings: 0,
      errors: 0,
    };

    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ access_token: "mock-token" }),
          text: async () => JSON.stringify({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockInfo,
          text: async () => JSON.stringify(mockInfo),
        })
    );

    const result = await getSitemapStatus();

    expect(result).not.toBeNull();
    expect(result?.path).toBe(SITEMAP_URL);
    expect(result?.errors).toBe(0);
  });

  it("should return null on API error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ access_token: "mock-token" }),
          text: async () => JSON.stringify({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          json: async () => ({ error: "not found" }),
          text: async () => "not found",
        })
    );

    const result = await getSitemapStatus();
    expect(result).toBeNull();
  });
});

describe("listSitemaps", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return array of sitemaps on success", async () => {
    const mockList = {
      sitemap: [
        { path: SITEMAP_URL, lastSubmitted: "2026-03-22T00:00:00Z" },
      ],
    };

    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ access_token: "mock-token" }),
          text: async () => JSON.stringify({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockList,
          text: async () => JSON.stringify(mockList),
        })
    );

    const result = await listSitemaps();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].path).toBe(SITEMAP_URL);
  });

  it("should return empty array on API error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ access_token: "mock-token" }),
          text: async () => JSON.stringify({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ error: "server error" }),
          text: async () => "server error",
        })
    );

    const result = await listSitemaps();
    expect(result).toEqual([]);
  });
});
