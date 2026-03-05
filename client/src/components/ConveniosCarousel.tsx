/* ============================================================
   ConveniosCarousel — Seção de convênios para a home
   • Carrossel infinito com CSS animation (sem rAF constante)
   • Pausa no hover / drag/swipe do usuário
   • Logo em grayscale → colorido no hover
   ============================================================ */
import { useRef, useCallback, useState, useEffect } from "react";

const PHONE = "5511916544653";
const WA_MSG = encodeURIComponent("Olá! Gostaria de saber se meu convênio é aceito.");
const WA_URL = `https://wa.me/${PHONE}?text=${WA_MSG}`;

// Logos otimizados para 188x80px (2x retina para display de 94x40px)
const CONVENIOS = [
  {
    nome: "Prevent Senior",
    logo: `/images/prevent-senior-188w_60641e66.webp`,
  },
  {
    nome: "Bradesco Saúde",
    logo: `/images/bradesco-188w_b58e35a5.webp`,
  },
  {
    nome: "Mediservice",
    logo: `/images/tech-mediservice-188w_ba541991.webp`,
  },
  {
    nome: "Instituto Pró-PM",
    logo: `/images/logo-propm-188w_44c9af21.webp`,
  },
  {
    nome: "Amil",
    logo: `/images/amil-188w_94445080.webp`,
  },
  {
    nome: "Unimed Seguros",
    logo: `/images/unimed-188w_3728f5a6.webp`,
  },
  {
    nome: "Ameplam",
    logo: `/images/ameplam-188w_df6e92d3.webp`,
  },
];

// Duplicar apenas 1x para loop infinito (2 cópias)
const ALL_ITEMS = [...CONVENIOS, ...CONVENIOS];

const CARD_W_DESKTOP = 170 + 28; // 198px
const CARD_W_MOBILE = 120 + 16;  // 136px
const RESUME_DELAY = 2000;

export default function ConveniosCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Drag state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardWidth = isMobile ? CARD_W_MOBILE : CARD_W_DESKTOP;
  const blockWidth = CONVENIOS.length * cardWidth;
  // CSS animation duration: blockWidth / speed (speed = 36px/s)
  const duration = blockWidth / 36;

  const resumeAnim = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false);
      dragOffsetRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = "";
      }
    }, RESUME_DELAY);
  }, []);

  /* ---- Mouse drag ---- */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragOffsetRef.current = currentOffsetRef.current;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    const newOffset = dragOffsetRef.current + delta;
    currentOffsetRef.current = newOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newOffset}px)`;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    resumeAnim();
  }, [resumeAnim]);

  /* ---- Touch drag ---- */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragOffsetRef.current = currentOffsetRef.current;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    const newOffset = dragOffsetRef.current + delta;
    currentOffsetRef.current = newOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newOffset}px)`;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    resumeAnim();
  }, [resumeAnim]);

  return (
    <>
      <style>{`
        @keyframes conv-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${blockWidth}px); }
        }

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
        .drudi-convenios::after { bottom: 0; }

        .conv-carousel-wrapper {
          position: relative;
          margin-bottom: 28px;
          user-select: none;
        }
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
          gap: 0;
          width: max-content;
          cursor: grab;
          will-change: transform;
          animation: conv-scroll ${duration}s linear infinite;
        }
        .conv-track.paused {
          animation-play-state: paused;
        }
        .conv-track:active {
          cursor: grabbing;
        }

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
          pointer-events: none;
        }
        .conv-track:not(:active) .conv-logo-card {
          pointer-events: auto;
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
          filter: none;
          transition: transform 0.3s ease;
          pointer-events: none;
          -webkit-user-drag: none;
        }

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
          <h2
            className="font-display text-2xl md:text-[36px] font-semibold leading-snug text-navy"
          >
            Atendemos os principais convênios
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Trabalhamos com os principais planos de saúde para facilitar o acesso ao cuidado oftalmológico.
          </p>
        </div>

        {/* Carrossel */}
        <div
          className="conv-carousel-wrapper"
          ref={wrapperRef}
          onMouseLeave={onMouseUp}
        >
          <div className="conv-track-container">
            <div
              ref={trackRef}
              className={`conv-track${paused ? " paused" : ""}`}
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
                    // Primeira cópia (i < 7): eager para aparecer imediatamente
                    // Segunda cópia (i >= 7): lazy pois só entra em cena depois do loop
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
