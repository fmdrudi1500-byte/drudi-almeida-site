/* ============================================================
   ConveniosCarousel — Seção de convênios para a home
   • Auto-scroll via requestAnimationFrame (sem CSS animation)
   • Pausa no hover / drag / swipe / botões de seta
   • Loop infinito suave
   ============================================================ */
import { useRef, useState, useEffect, useCallback } from "react";

const PHONE = "5511916544653";
const WA_MSG = encodeURIComponent("Olá! Gostaria de saber se meu convênio é aceito.");
const WA_URL = `https://wa.me/${PHONE}?text=${WA_MSG}`;

const CONVENIOS = [
  { nome: "Prevent Senior",   logo: `/images/prevent-senior-188w_60641e66.webp` },
  { nome: "Bradesco Saúde",   logo: `/images/bradesco-188w_b58e35a5.webp` },
  { nome: "Mediservice",      logo: `/images/tech-mediservice-188w_ba541991.webp` },
  { nome: "Instituto Pró-PM", logo: `/images/logo-propm-188w_44c9af21.webp` },
  { nome: "Amil",             logo: `/images/amil-188w_94445080.webp` },
  { nome: "Unimed Seguros",   logo: `/images/unimed-188w_3728f5a6.webp` },
  { nome: "Ameplam",          logo: `/images/ameplam-188w_df6e92d3.webp` },
];

// Triplicar para garantir loop infinito suave em qualquer largura de tela
const ALL_ITEMS = [...CONVENIOS, ...CONVENIOS, ...CONVENIOS];

const SPEED = 0.5; // px por frame (~30px/s a 60fps)
const RESUME_DELAY = 1800; // ms após interação para retomar

export default function ConveniosCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Drag state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardWidth = isMobile ? 136 : 198; // card + gap
  const blockWidth = CONVENIOS.length * cardWidth;

  // Aplicar transform diretamente no DOM (sem re-render)
  const applyTransform = useCallback((x: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  // Loop de animação via rAF
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current -= SPEED;
        // Reset quando passou um bloco completo (loop infinito)
        if (Math.abs(posRef.current) >= blockWidth) {
          posRef.current += blockWidth;
        }
        applyTransform(posRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [blockWidth, applyTransform]);

  const pauseScroll = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const resumeScroll = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  }, []);

  /* ---- Botões de seta ---- */
  const handleArrow = useCallback((direction: "left" | "right") => {
    pauseScroll();
    const step = cardWidth * 2;
    posRef.current += direction === "left" ? step : -step;
    // Manter dentro dos limites do loop
    if (posRef.current > 0) posRef.current -= blockWidth;
    if (posRef.current < -blockWidth * 2) posRef.current += blockWidth;
    applyTransform(posRef.current);
    resumeScroll();
  }, [cardWidth, blockWidth, pauseScroll, resumeScroll, applyTransform]);

  /* ---- Mouse drag ---- */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    pauseScroll();
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  }, [pauseScroll]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    posRef.current = dragStartPosRef.current + delta;
    applyTransform(posRef.current);
  }, [applyTransform]);

  const onMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    resumeScroll();
  }, [resumeScroll]);

  /* ---- Touch drag ---- */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    pauseScroll();
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = posRef.current;
  }, [pauseScroll]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    posRef.current = dragStartPosRef.current + delta;
    applyTransform(posRef.current);
  }, [applyTransform]);

  const onTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    resumeScroll();
  }, [resumeScroll]);

  return (
    <>
      <style>{`
        .drudi-convenios {
          background: #FAFBFC;
          padding: 48px 0 40px;
          overflow: hidden;
          position: relative;
        }
        .drudi-convenios::before,
        .drudi-convenios::after {
          content: '';
          position: absolute;
          left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(201,168,108,0.2) 30%,
            rgba(201,168,108,0.3) 50%,
            rgba(201,168,108,0.2) 70%,
            transparent
          );
        }
        .drudi-convenios::before { top: 0; }
        .drudi-convenios::after  { bottom: 0; }

        .conv-carousel-wrapper {
          position: relative;
          margin-bottom: 28px;
          user-select: none;
        }
        /* Fade nas bordas */
        .conv-carousel-wrapper::before,
        .conv-carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .conv-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(90deg, #FAFBFC, transparent);
        }
        .conv-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(-90deg, #FAFBFC, transparent);
        }

        .conv-track-container {
          overflow: hidden;
          width: 100%;
        }

        .conv-track {
          display: flex;
          width: max-content;
          cursor: grab;
          will-change: transform;
        }
        .conv-track:active { cursor: grabbing; }

        .conv-logo-card {
          flex-shrink: 0;
          width: 150px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 12px;
          background: white;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.05);
          padding: 12px 16px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .conv-logo-card:hover {
          border-color: rgba(201,168,108,0.35);
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }
        .conv-logo-card img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          pointer-events: none;
          -webkit-user-drag: none;
        }

        .conv-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(201,168,108,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .conv-arrow-btn:hover {
          border-color: #C9A86C;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          background: #fffbf4;
        }
        .conv-arrow-btn.left  { left: 12px; }
        .conv-arrow-btn.right { right: 12px; }

        .conv-count {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0A1628;
          color: white;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 100px;
          margin-bottom: 14px;
          line-height: 1;
        }
        .conv-count-number {
          font-weight: 800;
          color: #C9A86C;
          font-size: 15px;
        }

        @media (max-width: 480px) {
          .drudi-convenios { padding: 36px 0 32px; }
          .conv-logo-card { width: 120px; height: 62px; margin: 0 8px; padding: 10px 12px; }
        }
        @media (min-width: 769px) {
          .conv-logo-card { width: 170px; height: 84px; margin: 0 14px; }
          .conv-carousel-wrapper::before,
          .conv-carousel-wrapper::after { width: 120px; }
        }
      `}</style>

      <section className="drudi-convenios" id="secao-convenios">
        {/* Header */}
        <div className="text-center px-6 mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-gold/50" />
            <span
              className="font-ui text-[11px] font-bold tracking-[2.5px] uppercase"
              style={{ color: "#C9A86C" }}
            >
              Convênios Aceitos
            </span>
            <span className="w-5 h-px bg-gold/50" />
          </div>
          <h2 className="font-display text-2xl md:text-[36px] font-semibold leading-snug text-navy">
            Atendemos os principais convênios
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Trabalhamos com os principais planos de saúde para facilitar o acesso ao cuidado oftalmológico.
          </p>
        </div>

        {/* Carrossel */}
        <div
          className="conv-carousel-wrapper"
          ref={containerRef}
          onMouseLeave={onMouseUp}
        >
          {/* Botão esquerda */}
          <button
            className="conv-arrow-btn left"
            onClick={() => handleArrow("left")}
            aria-label="Anterior"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Botão direita */}
          <button
            className="conv-arrow-btn right"
            onClick={() => handleArrow("right")}
            aria-label="Próximo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="conv-track-container">
            <div
              ref={trackRef}
              className="conv-track"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {ALL_ITEMS.map((conv, i) => (
                <div key={`${conv.nome}-${i}`} className="conv-logo-card">
                  <img
                    src={conv.logo}
                    alt={conv.nome}
                    loading={i < CONVENIOS.length ? "eager" : "lazy"}
                    decoding="async"
                    width={140}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center px-6">
          <div className="conv-count">
            <span className="conv-count-number">7+</span>
            convênios aceitos
          </div>
          <p className="font-body text-xs text-muted-foreground mt-3">
            Não encontrou seu plano?{" "}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy font-semibold hover:text-gold transition-colors underline underline-offset-2"
            >
              Consulte pelo WhatsApp
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
