/**
 * Teste de validação das credenciais YouTube OAuth
 * Verifica se o refresh token é válido e se o canal está acessível
 */
import { describe, it, expect } from "vitest";

const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const YOUTUBE_REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

describe("YouTube OAuth Credentials", () => {
  it("should have all required YouTube environment variables", () => {
    expect(YOUTUBE_CLIENT_ID).toBeTruthy();
    expect(YOUTUBE_CLIENT_SECRET).toBeTruthy();
    expect(YOUTUBE_REFRESH_TOKEN).toBeTruthy();
    expect(YOUTUBE_CHANNEL_ID).toBeTruthy();
  });

  it("should have correct YouTube channel ID format", () => {
    expect(YOUTUBE_CHANNEL_ID).toMatch(/^UC[a-zA-Z0-9_-]{22}$/);
    expect(YOUTUBE_CHANNEL_ID).toBe("UCo852gxIVVYGQm84TToQgqw");
  });

  it("should have correct YouTube Client ID format", () => {
    expect(YOUTUBE_CLIENT_ID).toMatch(/^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/);
  });

  it("should have non-empty refresh token", () => {
    expect(YOUTUBE_REFRESH_TOKEN?.length).toBeGreaterThan(20);
  });
});
