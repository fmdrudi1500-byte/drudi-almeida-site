/**
 * analytics.test.ts — Testa a presença do Meta Pixel e GA4 no index.html
 * e verifica que as funções de analytics exportam corretamente.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Analytics & Tracking Tags", () => {
  const indexHtml = readFileSync(
    resolve(__dirname, "../client/index.html"),
    "utf-8"
  );

  it("should include GA4 measurement ID in index.html", () => {
    expect(indexHtml).toContain("G-X3TM41VL1E");
  });

  it("should include Google Ads conversion ID in index.html", () => {
    expect(indexHtml).toContain("AW-17598191636");
  });

  it("should include Meta Pixel ID (Fernando Drudi Pixel) in index.html", () => {
    expect(indexHtml).toContain("1829566917408954");
  });

  it("should include fbq init call in index.html", () => {
    expect(indexHtml).toContain("fbq('init'");
  });

  it("should include Meta Pixel noscript fallback in body of index.html", () => {
    expect(indexHtml).toContain("facebook.com/tr?id=1829566917408954");
    // noscript should be in body, not head
    const bodyStart = indexHtml.indexOf("<body>");
    const noscriptPos = indexHtml.indexOf("facebook.com/tr?id=1829566917408954");
    expect(noscriptPos).toBeGreaterThan(bodyStart);
  });

  it("should preconnect to Facebook domain", () => {
    expect(indexHtml).toContain("connect.facebook.net");
  });
});

describe("Analytics module exports", () => {
  it("should export all tracking functions", async () => {
    // We can't import the client module directly in vitest server context,
    // but we can verify the file exists and contains the expected exports
    const analyticsCode = readFileSync(
      resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );

    expect(analyticsCode).toContain("export function trackWhatsAppClick");
    expect(analyticsCode).toContain("export function trackAgendarOnlineClick");
    expect(analyticsCode).toContain("export function trackPhoneClick");
    expect(analyticsCode).toContain("export function trackAppointmentCompleted");
    expect(analyticsCode).toContain("export function trackAgendarPageView");
  });

  it("should include Meta Pixel tracking in WhatsApp click", async () => {
    const analyticsCode = readFileSync(
      resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );

    // Verify Meta Pixel Lead event is fired on WhatsApp click
    expect(analyticsCode).toContain('trackFbEvent("Lead"');
  });

  it("should include Meta Pixel Schedule event in appointment completed", async () => {
    const analyticsCode = readFileSync(
      resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );

    expect(analyticsCode).toContain('trackFbEvent("Schedule"');
  });

  it("should include Google Ads conversion in appointment completed", async () => {
    const analyticsCode = readFileSync(
      resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );

    expect(analyticsCode).toContain("AW-17598191636/appointment");
  });
});
