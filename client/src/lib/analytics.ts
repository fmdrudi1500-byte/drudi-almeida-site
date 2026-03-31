/**
 * analytics.ts — Utilitário centralizado de rastreamento
 *
 * Envia eventos para:
 *  - Google Analytics GA4 (G-X3TM41VL1E) via gtag()
 *  - Google Ads (AW-17598191636) via gtag()
 *  - Meta Pixel (1829566917408954) via fbq()
 *
 * Eventos de conversão configurados:
 *  - whatsapp_click: clique em qualquer link de WhatsApp
 *  - agendar_online_click: clique no botão "Agendar Online"
 *  - phone_click: clique em botão de telefone
 *  - appointment_completed: agendamento concluído com sucesso
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

// ── Google Analytics / Ads ─────────────────────────────────

/** Envia um evento personalizado para o GA4 */
function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// ── Meta Pixel ─────────────────────────────────────────────

/** Envia um evento para o Meta Pixel */
function trackFbEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

// ── Eventos de Conversão ───────────────────────────────────

/**
 * Rastreia clique em link de WhatsApp.
 * GA4: whatsapp_click | Meta: Lead
 * @param source - Identificador da origem do clique (ex: "hero", "cta_final", "header")
 * @param page - Página onde ocorreu o clique (ex: "/instituto/catarata")
 */
export function trackWhatsAppClick(source?: string, page?: string) {
  const pagePath = page ?? (typeof window !== "undefined" ? window.location.pathname : "");

  // GA4
  trackEvent("whatsapp_click", {
    event_category: "conversao",
    event_label: source ?? "desconhecido",
    page_path: pagePath,
  });

  // Meta Pixel — Lead (contato via WhatsApp é um lead)
  trackFbEvent("Lead", {
    content_name: "WhatsApp Click",
    content_category: source ?? "desconhecido",
  });
}

/**
 * Rastreia clique no botão "Agendar Online".
 * GA4: agendar_online_click | Meta: InitiateCheckout
 * @param source - Identificador da origem do clique (ex: "hero", "cta_final", "navbar")
 * @param page - Página onde ocorreu o clique
 */
export function trackAgendarOnlineClick(source?: string, page?: string) {
  const pagePath = page ?? (typeof window !== "undefined" ? window.location.pathname : "");

  // GA4
  trackEvent("agendar_online_click", {
    event_category: "conversao",
    event_label: source ?? "desconhecido",
    page_path: pagePath,
  });

  // Meta Pixel — InitiateCheckout (início do processo de agendamento)
  trackFbEvent("InitiateCheckout", {
    content_name: "Agendar Online Click",
    content_category: source ?? "desconhecido",
  });
}

/**
 * Rastreia clique em botão de telefone.
 * GA4: phone_click | Meta: Contact
 * @param source - Identificador da origem do clique
 */
export function trackPhoneClick(source?: string) {
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

  // GA4
  trackEvent("phone_click", {
    event_category: "conversao",
    event_label: source ?? "desconhecido",
    page_path: pagePath,
  });

  // Meta Pixel — Contact
  trackFbEvent("Contact", {
    content_name: "Phone Click",
    content_category: source ?? "desconhecido",
  });
}

/**
 * Rastreia agendamento concluído com sucesso.
 * GA4: appointment_completed + Google Ads conversion
 * Meta: Schedule
 *
 * @param unit - Unidade selecionada (ex: "Santana", "Guarulhos")
 * @param specialty - Especialidade (ex: "Catarata", "Retina")
 */
export function trackAppointmentCompleted(unit: string, specialty?: string) {
  // GA4 — evento personalizado
  trackEvent("appointment_completed", {
    event_category: "conversao",
    event_label: unit,
    appointment_unit: unit,
    appointment_specialty: specialty ?? "geral",
  });

  // Google Ads — conversão (o label será configurado no Google Ads)
  trackEvent("conversion", {
    send_to: "AW-17598191636/appointment",
    value: 1.0,
    currency: "BRL",
  });

  // Meta Pixel — Schedule (evento padrão para agendamentos)
  trackFbEvent("Schedule", {
    content_name: "Agendamento Online",
    content_category: unit,
  });
}

/**
 * Rastreia visualização da página de agendamento.
 * Meta: ViewContent
 */
export function trackAgendarPageView() {
  trackFbEvent("ViewContent", {
    content_name: "Página de Agendamento",
    content_category: "agendar",
  });
}
