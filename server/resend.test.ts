import { describe, it, expect } from "vitest";
import { Resend } from "resend";

describe("Resend API Key", () => {
  it("should have a valid API key configured", () => {
    const key = process.env.RESEND_API_KEY;
    expect(key).toBeDefined();
    expect(key).not.toBe("");
    expect(key?.startsWith("re_")).toBe(true);
  });

  it("should be able to instantiate Resend client", () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    expect(resend).toBeDefined();
    expect(resend.emails).toBeDefined();
  });
});
