/* ============================================================
   WhatsApp FAB — Drudi e Almeida Oftalmologia
   Convertido do HTML/CSS/JS original para React.
   Preserva 100% da lógica: mensagens contextuais, status
   online/offline, tooltip com balão, badge "1", pulse periódico.
   ============================================================ */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

// ============================================================
// CONFIGURAÇÃO
// ============================================================
const CONFIG = {
  phone: "5511916544653",
  showDelay: 3000,
  showDelayInstituto: 500,
  tooltipDelay: 5000,
  pulseInterval: 10000,
  horarioInicio: 8,
  horarioFimSemana: 18,
  horarioFimSab: 12,
  mensagens: {
    "/instituto/catarata": "Olá! Gostaria de saber mais sobre cirurgia de catarata.",
    "/instituto/ceratocone": "Olá! Tenho interesse no tratamento de ceratocone.",
    "/instituto/glaucoma": "Olá! Gostaria de informações sobre acompanhamento de glaucoma.",
    "/instituto/retina": "Olá! Gostaria de saber mais sobre tratamento de retina.",
    "/instituto/estrabismo": "Olá! Gostaria de informações sobre cirurgia de estrabismo.",
    "/convenios": "Olá! Gostaria de saber se meu convênio é aceito.",
    "/contato": "Olá! Qual unidade é mais próxima de mim para agendar?",
    "/tecnologia": "Olá! Gostaria de saber mais sobre os exames disponíveis.",
    "/sobre": "Olá! Gostaria de conhecer melhor a clínica e agendar uma consulta.",
    "/agendamento": "Olá! Gostaria de agendar uma consulta.",
    "/blog": "Olá! Li um artigo do blog e gostaria de tirar uma dúvida.",
  } as Record<string, string>,
  mensagemPadrao: "Olá! Gostaria de agendar uma consulta.",
  tooltips: {
    "/instituto/catarata": "Olá! 👋 Quer saber mais sobre cirurgia de catarata? Fale com a gente!",
    "/instituto/ceratocone": "Olá! 👋 Tem dúvidas sobre ceratocone? Estamos aqui para ajudar!",
    "/instituto/glaucoma": "Olá! 👋 Precisa de informações sobre glaucoma? Fale conosco!",
    "/instituto/retina": "Olá! 👋 Dúvidas sobre doenças da retina? Estamos aqui!",
    "/instituto/estrabismo": "Olá! 👋 Quer saber sobre correção de estrabismo? Fale com a gente!",
    "/convenios": "Olá! 👋 Quer saber se atendemos seu convênio? Pergunte aqui!",
    "/contato": "Olá! 👋 Precisa de ajuda para encontrar a unidade mais perto de você?",
  } as Record<string, string>,
  tooltipPadrao: "Olá! 👋 Quer agendar uma consulta ou tirar alguma dúvida? Fale com a gente!",
};

// ============================================================
// HELPERS
// ============================================================
function getCurrentMessage(path: string): string {
  for (const [route, msg] of Object.entries(CONFIG.mensagens)) {
    if (path.includes(route)) return msg;
  }
  return CONFIG.mensagemPadrao;
}

function getCurrentTooltip(path: string): string {
  for (const [route, tip] of Object.entries(CONFIG.tooltips)) {
    if (path.includes(route)) return tip;
  }
  return CONFIG.tooltipPadrao;
}

function isOnline(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  if (day === 0) return false;
  if (day === 6) return hour >= CONFIG.horarioInicio && hour < CONFIG.horarioFimSab;
  return hour >= CONFIG.horarioInicio && hour < CONFIG.horarioFimSemana;
}

// ============================================================
// COMPONENT
// ============================================================
export default function WhatsAppButton() {
  const [location] = useLocation();
  const floatRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const statusDotRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const tooltipMsgRef = useRef<HTMLDivElement>(null);

  // Track state across renders without causing re-renders
  const stateRef = useRef({ tooltipClosed: false, pulseTimer: null as ReturnType<typeof setInterval> | null });

  function updateStatus() {
    const online = isOnline();
    if (statusDotRef.current) {
      statusDotRef.current.className = `status-dot ${online ? "online" : "offline"}`;
    }
    if (statusTextRef.current) {
      statusTextRef.current.textContent = online ? "Online agora" : "Responde em horário comercial";
      statusTextRef.current.style.color = online ? "#16a34a" : "#9CA3AF";
    }
  }

  function closeTooltip() {
    tooltipRef.current?.classList.remove("show");
    stateRef.current.tooltipClosed = true;
  }

  function showTooltip() {
    if (stateRef.current.tooltipClosed) return;
    tooltipRef.current?.classList.add("show");
    setTimeout(() => {
      if (!stateRef.current.tooltipClosed) closeTooltip();
    }, 5000);
  }

  function openChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const message = encodeURIComponent(getCurrentMessage(location));
    const url = `https://wa.me/${CONFIG.phone}?text=${message}`;
    if (badgeRef.current) badgeRef.current.style.display = "none";
    closeTooltip();
    // Use anchor click to reliably open WhatsApp in new tab
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Expose openChat globally for the inline onclick (kept for safety)
  useEffect(() => {
    (window as any).drudiWA = { openChat, closeTooltip };
  });

  // Main init effect — runs once on mount
  useEffect(() => {
    const path = window.location.pathname;
    const isInstituto = path.includes("/instituto/");
    const delay = isInstituto ? CONFIG.showDelayInstituto : CONFIG.showDelay;

    // Update tooltip message for current page
    if (tooltipMsgRef.current) {
      tooltipMsgRef.current.textContent = getCurrentTooltip(path);
    }

    // Update status
    updateStatus();
    const statusInterval = setInterval(updateStatus, 60000);

    // Show button after delay
    const showTimer = setTimeout(() => {
      floatRef.current?.classList.add("visible");

      // Show tooltip after additional delay
      const tooltipTimer = setTimeout(() => {
        if (!stateRef.current.tooltipClosed) showTooltip();
      }, CONFIG.tooltipDelay);

      return () => clearTimeout(tooltipTimer);
    }, delay);

    // Periodic pulse
    stateRef.current.pulseTimer = setInterval(() => {
      const pulse = pulseRef.current;
      if (pulse) {
        pulse.classList.remove("animate");
        void pulse.offsetWidth; // force reflow
        pulse.classList.add("animate");
      }
    }, CONFIG.pulseInterval);

    return () => {
      clearTimeout(showTimer);
      clearInterval(statusInterval);
      if (stateRef.current.pulseTimer) clearInterval(stateRef.current.pulseTimer);
    };
  }, []);

  // On every route change: update tooltip message and show it again after a short delay
  useEffect(() => {
    // Update tooltip message for the new page
    if (tooltipMsgRef.current) {
      tooltipMsgRef.current.textContent = getCurrentTooltip(location);
    }

    // Reset closed state so tooltip can appear again on the new page
    stateRef.current.tooltipClosed = false;

    // Hide tooltip immediately (in case it was showing from previous page)
    tooltipRef.current?.classList.remove("show");

    // Show tooltip after a short delay on the new page
    const timer = setTimeout(() => {
      showTooltip();
    }, 1500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {/* ===== STYLES ===== */}
      <style>{`
        #drudi-wa-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          opacity: 0;
          transform: scale(0.5) translateY(20px);
          transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        }
        #drudi-wa-float.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }
        #drudi-wa-tooltip {
          background: #ffffff;
          border-radius: 12px;
          padding: 12px 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          max-width: 260px;
          opacity: 0;
          transform: translateY(8px) scale(0.95);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
          position: relative;
        }
        #drudi-wa-tooltip.show {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        #drudi-wa-tooltip::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 28px;
          width: 12px;
          height: 12px;
          background: #ffffff;
          transform: rotate(45deg);
          box-shadow: 3px 3px 6px rgba(0,0,0,0.04);
        }
        .wa-tooltip-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .wa-tooltip-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A1628, #1a3055);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wa-tooltip-avatar svg {
          width: 18px;
          height: 18px;
        }
        .wa-tooltip-name {
          font-size: 13px;
          font-weight: 600;
          color: #1F2937;
          line-height: 1.2;
        }
        .wa-tooltip-status {
          font-size: 11px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        .status-dot.online { background: #25D366; }
        .status-dot.offline { background: #9CA3AF; }
        .wa-tooltip-msg {
          background: #F0F0F0;
          border-radius: 0 10px 10px 10px;
          padding: 8px 12px;
          font-size: 13px;
          color: #374151;
          line-height: 1.45;
        }
        .wa-tooltip-close {
          position: absolute;
          top: 8px;
          right: 10px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: none;
          background: #F3F4F6;
          color: #9CA3AF;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          line-height: 1;
        }
        .wa-tooltip-close:hover {
          background: #E5E7EB;
          color: #6B7280;
        }
        #drudi-wa-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 16px rgba(37,211,102,0.35);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          -webkit-tap-highlight-color: transparent;
        }
        #drudi-wa-btn:hover {
          background: #20BD5A;
          transform: scale(1.08);
          box-shadow: 0 6px 24px rgba(37,211,102,0.35);
        }
        #drudi-wa-btn:active { transform: scale(0.95); }
        #drudi-wa-btn svg {
          width: 28px;
          height: 28px;
          fill: white;
          flex-shrink: 0;
        }
        .wa-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: #EF4444;
          border-radius: 50%;
          border: 2.5px solid white;
          font-size: 10px;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          animation: drudi-badge-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes drudi-badge-bounce {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .wa-pulse {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 50%;
          border: 2px solid #25D366;
          opacity: 0;
          pointer-events: none;
        }
        .wa-pulse.animate {
          animation: drudi-pulse 1.8s ease-out;
        }
        @keyframes drudi-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        @media (max-width: 768px) {
          #drudi-wa-float { bottom: 16px; right: 16px; }
          #drudi-wa-btn { width: 52px; height: 52px; }
          #drudi-wa-btn svg { width: 26px; height: 26px; }
          #drudi-wa-tooltip { max-width: 230px; }
          .wa-tooltip-msg { font-size: 12px; }
        }
      `}</style>

      {/* ===== HTML ===== */}
      <div id="drudi-wa-float" ref={floatRef}>
        {/* Tooltip */}
        <div id="drudi-wa-tooltip" ref={tooltipRef}>
          <button className="wa-tooltip-close" onClick={closeTooltip} aria-label="Fechar">✕</button>
          <div className="wa-tooltip-header">
            <div className="wa-tooltip-avatar">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#C9A86C"/>
              </svg>
            </div>
            <div>
              <div className="wa-tooltip-name">Drudi e Almeida</div>
              <div className="wa-tooltip-status">
                <span className="status-dot" ref={statusDotRef}></span>
                <span ref={statusTextRef}></span>
              </div>
            </div>
          </div>
          <div className="wa-tooltip-msg" ref={tooltipMsgRef}>
            Olá! 👋 Quer agendar uma consulta ou tirar alguma dúvida? Fale com a gente!
          </div>
        </div>

        {/* Botão principal */}
        <button id="drudi-wa-btn" onClick={openChat} aria-label="Falar pelo WhatsApp">
          <span className="wa-pulse" ref={pulseRef}></span>
          <span className="wa-badge" ref={badgeRef}>1</span>
          <svg viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.612-1.474A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.6-5.92-1.64l-.425-.254-2.735.875.875-2.61-.278-.442A9.77 9.77 0 012.182 12c0-5.412 4.406-9.818 9.818-9.818S21.818 6.588 21.818 12s-4.406 9.818-9.818 9.818z"/>
          </svg>
        </button>
      </div>
    </>
  );
}
