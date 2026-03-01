/* ============================================================
   MobileCTABar — Sticky bottom CTA bar for mobile devices
   Baseado no modelo do Claude:
   • Fundo navy + borda dourada
   • Status online/offline em tempo real
   • Headline contextual por página
   • Botão WhatsApp + botão Ligar
   • Lógica inteligente de scroll:
       - Escondido acima de 400px do topo
       - Aparece ao rolar para baixo
       - Esconde ao rolar para cima (>60px acumulados)
       - Reaparece ao parar de rolar
   • Só visível em mobile (< 768px)
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

// ============================================================
// CONFIGURAÇÃO
// ============================================================
const PHONE = "5511916544653";
const SCROLL_THRESHOLD = 400;
const HIDE_ON_SCROLL_UP_DELTA = 60;

const MENSAGENS: Record<string, string> = {
  "/instituto/catarata": "Olá! Gostaria de saber mais sobre cirurgia de catarata.",
  "/instituto/ceratocone": "Olá! Tenho interesse no tratamento de ceratocone.",
  "/instituto/glaucoma": "Olá! Gostaria de informações sobre acompanhamento de glaucoma.",
  "/instituto/retina": "Olá! Gostaria de saber mais sobre tratamento de retina.",
  "/instituto/estrabismo": "Olá! Gostaria de informações sobre cirurgia de estrabismo.",
  "/convenios": "Olá! Gostaria de saber se meu convênio é aceito.",
  "/contato": "Olá! Qual unidade é mais próxima de mim para agendar?",
  "/tecnologia": "Olá! Gostaria de saber mais sobre os exames disponíveis.",
  "/agendamento": "Olá! Gostaria de agendar uma consulta.",
};

const HEADLINES: Record<string, string> = {
  "/instituto/catarata": "Cirurgia de catarata? <strong>Fale conosco</strong>",
  "/instituto/ceratocone": "Tratamento de ceratocone <strong>aqui</strong>",
  "/instituto/glaucoma": "Cuide do glaucoma <strong>agora</strong>",
  "/instituto/retina": "Especialistas em retina <strong>aqui</strong>",
  "/instituto/estrabismo": "Correção de estrabismo <strong>aqui</strong>",
  "/convenios": "Confira seu convênio <strong>agora</strong>",
};

const HEADLINE_PADRAO = 'Agende sua consulta <strong>agora</strong>';
const MENSAGEM_PADRAO = "Olá! Gostaria de agendar uma consulta.";

function getForPath<T>(map: Record<string, T>, path: string, fallback: T): T {
  for (const [route, value] of Object.entries(map)) {
    if (path.includes(route)) return value;
  }
  return fallback;
}

function isOnline(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  if (day === 0) return false;
  if (day === 6) return hour >= 8 && hour < 12;
  return hour >= 8 && hour < 18;
}

// ============================================================
// COMPONENT
// ============================================================
export default function MobileCTABar() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const [online, setOnline] = useState(isOnline());

  const lastScrollY = useRef(0);
  const scrollUpAccumulator = useRef(0);
  const isBarVisible = useRef(false);
  const ticking = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived values from location
  const headline = getForPath(HEADLINES, location, HEADLINE_PADRAO);
  const message = getForPath(MENSAGENS, location, MENSAGEM_PADRAO);
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  function showBar() {
    if (isBarVisible.current) return;
    isBarVisible.current = true;
    setVisible(true);
  }

  function hideBar() {
    if (!isBarVisible.current) return;
    isBarVisible.current = false;
    setVisible(false);
  }

  // Scroll logic
  useEffect(() => {
    // Reset on route change
    hideBar();
    lastScrollY.current = window.scrollY;
    scrollUpAccumulator.current = 0;

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;

        // Desktop: always hidden
        if (window.innerWidth > 768) {
          hideBar();
          ticking.current = false;
          lastScrollY.current = currentScrollY;
          return;
        }

        // Above threshold: hide
        if (currentScrollY < SCROLL_THRESHOLD) {
          hideBar();
          scrollUpAccumulator.current = 0;
          ticking.current = false;
          lastScrollY.current = currentScrollY;
          return;
        }

        // Scrolling down: show
        if (scrollDelta > 0) {
          scrollUpAccumulator.current = 0;
          showBar();
        }

        // Scrolling up: accumulate and hide if exceeded delta
        if (scrollDelta < 0) {
          scrollUpAccumulator.current += Math.abs(scrollDelta);
          if (scrollUpAccumulator.current > HIDE_ON_SCROLL_UP_DELTA) {
            hideBar();
          }
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    }

    function onScrollEnd() {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (window.scrollY > SCROLL_THRESHOLD && window.innerWidth <= 768) {
          scrollUpAccumulator.current = 0;
          showBar();
        }
      }, 150);
    }

    function onResize() {
      if (window.innerWidth > 768) hideBar();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScrollEnd, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollEnd);
      window.removeEventListener("resize", onResize);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [location]);

  // Update online status every minute
  useEffect(() => {
    const interval = setInterval(() => setOnline(isOnline()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        #drudi-sticky-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 99998;
          background: #0A1628;
          padding-bottom: env(safe-area-inset-bottom, 0px);
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        #drudi-sticky-bar.visible {
          transform: translateY(0);
        }
        @media (min-width: 769px) {
          #drudi-sticky-bar { display: none !important; }
        }
        #drudi-sticky-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            #C9A86C 20%,
            #E8D5AB 50%,
            #C9A86C 80%,
            transparent 100%
          );
        }
        .sticky-bar-inner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
        }
        .sticky-bar-info { flex: 1; min-width: 0; }
        .sticky-bar-status {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 2px;
        }
        .sticky-bar-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .sticky-bar-dot.online {
          background: #25D366;
          box-shadow: 0 0 6px rgba(37,211,102,0.5);
          animation: sticky-dot-pulse 2s infinite;
        }
        .sticky-bar-dot.offline { background: #6B7280; }
        @keyframes sticky-dot-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .sticky-bar-status-text {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }
        .sticky-bar-status-text.online { color: #25D366; }
        .sticky-bar-status-text.offline { color: #6B7280; }
        .sticky-bar-headline {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sticky-bar-headline strong { color: #C9A86C; font-weight: 700; }
        .sticky-bar-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .sticky-btn-wa {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
          box-shadow: 0 2px 8px rgba(37,211,102,0.3);
        }
        .sticky-btn-wa:hover, .sticky-btn-wa:active {
          background: #20BD5A;
          transform: scale(0.97);
        }
        .sticky-btn-wa svg { width: 18px; height: 18px; fill: white; flex-shrink: 0; }
        .sticky-btn-call {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
          flex-shrink: 0;
        }
        .sticky-btn-call:hover, .sticky-btn-call:active {
          background: rgba(255,255,255,0.15);
          transform: scale(0.97);
        }
        .sticky-btn-call svg { width: 18px; height: 18px; fill: white; }
      `}</style>

      <div id="drudi-sticky-bar" className={visible ? "visible" : ""}>
        <div className="sticky-bar-inner">
          {/* Info à esquerda */}
          <div className="sticky-bar-info">
            <div className="sticky-bar-status">
              <span className={`sticky-bar-dot ${online ? "online" : "offline"}`} />
              <span className={`sticky-bar-status-text ${online ? "online" : "offline"}`}>
                {online ? "Online — respondemos agora" : "Responderemos em horário comercial"}
              </span>
            </div>
            <div
              className="sticky-bar-headline"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
          </div>

          {/* Botões à direita */}
          <div className="sticky-bar-actions">
            {/* WhatsApp */}
            <a
              href={waUrl}
              className="sticky-btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.612-1.474A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.6-5.92-1.64l-.425-.254-2.735.875.875-2.61-.278-.442A9.77 9.77 0 012.182 12c0-5.412 4.406-9.818 9.818-9.818S21.818 6.588 21.818 12s-4.406 9.818-9.818 9.818z" />
              </svg>
              Agendar
            </a>

            {/* Ligar */}
            <a
              href="tel:+551150268521"
              className="sticky-btn-call"
              title="Ligar para a clínica"
            >
              <svg viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
