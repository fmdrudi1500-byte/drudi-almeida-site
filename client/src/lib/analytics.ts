/**
 * analytics.ts — Utilitário centralizado de rastreamento GA4
 *
 * Envia eventos personalizados para o Google Analytics GA4 via gtag().
 * Todos os eventos de conversão do site devem passar por este módulo.
 *
 * Eventos de conversão configurados:
 *  - whatsapp_click: clique em qualquer link de WhatsApp
 *  - agendar_online_click: clique no botão "Agendar Online"
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Envia um evento personalizado para o GA4 */
function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Rastreia clique em link de WhatsApp.
 * @param source - Identificador da origem do clique (ex: "hero", "cta_final", "header")
 * @param page - Página onde ocorreu o clique (ex: "/instituto/catarata")
 */
export function trackWhatsAppClick(source?: string, page?: string) {
  trackEvent("whatsapp_click", {
    event_category: "conversao",
    event_label: source ?? "desconhecido",
    page_path: page ?? (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Rastreia clique no botão "Agendar Online".
 * @param source - Identificador da origem do clique (ex: "hero", "cta_final", "navbar")
 * @param page - Página onde ocorreu o clique
 */
export function trackAgendarOnlineClick(source?: string, page?: string) {
  trackEvent("agendar_online_click", {
    event_category: "conversao",
    event_label: source ?? "desconhecido",
    page_path: page ?? (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/**
 * Rastreia clique em botão de telefone.
 * @param source - Identificador da origem do clique
 */
export function trackPhoneClick(source?: string) {
  trackEvent("phone_click", {
    event_category: "conversao",
    event_label: source ?? "desconhecido",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}
