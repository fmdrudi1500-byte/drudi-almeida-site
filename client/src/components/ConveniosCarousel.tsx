/* ============================================================
   ConveniosCarousel — Seção de convênios para a home
   • Carrossel infinito com drag/swipe do usuário
   • Retoma loop automático 2s após soltar
   • Logo em grayscale → colorido no hover
   ============================================================ */
import { useRef, useEffect, useCallback, useState } from "react";
import { Link } from "wouter";

const PHONE = "5511916544653";
const WA_MSG = encodeURIComponent("Olá! Gostaria de saber se meu convênio é aceito.");
const WA_URL = `https://wa.me/${PHONE}?text=${WA_MSG}`;

const CONVENIOS = [
  {
    nome: "Prevent Senior",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ULBqqsZkuiKBoDrv.png",
  },
  {
    nome: "Bradesco Saúde",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/iwnJMoCNnwopchUF.png",
  },
  {
    nome: "Mediservice",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/rPLmRznRbIQEDeuV.png",
  },
  {
    nome: "Instituto Pró-PM",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-propm_eea209fd.png",
  },
  {
    nome: "Amil",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/vRtJJHZyrxFGQNnx.png",
  },
  {
    nome: "Unimed Seguros",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/mvWRpZFYQZpqvVDK.png",
  },
  {
    nome: "Ameplam",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ZZpmIoRpTNvSnOWl.jpg",
  },
];

// Triplicar para scroll infinito contínuo
const ALL_ITEMS = [...CONVENIOS, ...CONVENIOS, ...CONVENIOS];

// Largura de cada card (incluindo margin)
const CARD_WIDTH_DESKTOP = 170 + 28; // 198px
const CARD_WIDTH_MOBILE = 120 + 16;  // 136px
const AUTO_SPEED = 0.6; // px por frame (~36px/s a 60fps)
const RESUME_DELAY = 2000; // ms após soltar para retomar

export default function ConveniosCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const isAutoPlayingRef = useRef(true);
  const [isMobile, setIsMobile] = useState(false);

  const getCardWidth = useCallback(() => {
    return isMobile ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  }, [isMobile]);

  // Largura total de um bloco (7 convênios)
  const getBlockWidth = useCallback(() => {
    return CONVENIOS.length * getCardWidth();
  }, [getCardWidth]);

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  }, []);

  const normalizePos = useCallback(() => {
    const blockWidth = getBlockWidth();
    // Mantém posição dentro do bloco do meio (índice 1)
    if (posRef.current <= -blockWidth * 2) {
      posRef.current += blockWidth;
    } else if (posRef.current >= 0) {
      posRef.current -= blockWidth;
    }
  }, [getBlockWidth]);

  const startAutoPlay = useCallback(() => {
    isAutoPlayingRef.current = true;
    const tick = () => {
      if (!isAutoPlayingRef.current) return;
      posRef.current -= AUTO_SPEED;
      normalizePos();
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [normalizePos, applyTransform]);

  const stopAutoPlay = useCallback(() => {
    isAutoPlayingRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      startAutoPlay();
    }, RESUME_DELAY);
  }, [startAutoPlay]);

  // Inicializa posição no bloco do meio
  useEffect(() => {
    const blockWidth = getBlockWidth();
    posRef.current = -blockWidth;
    applyTransform();
    startAutoPlay();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Recalcula posição ao mudar de mobile/desktop
  useEffect(() => {
    const blockWidth = getBlockWidth();
    posRef.current = -blockWidth;
    applyTransform();
  }, [isMobile, getBlockWidth, applyTransform]);

  /* ---- Mouse drag ---- */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    stopAutoPlay();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  }, [stopAutoPlay]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    posRef.current = dragStartPosRef.current + delta;
    normalizePos();
    applyTransform();
  }, [normalizePos, applyTransform]);

  const onMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    scheduleResume();
  }, [scheduleResume]);

  /* ---- Touch drag ---- */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    stopAutoPlay();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = posRef.current;
  }, [stopAutoPlay]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    posRef.current = dragStartPosRef.current + delta;
    normalizePos();
    applyTransform();
  }, [normalizePos, applyTransform]);

  const onTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    scheduleResume();
  }, [scheduleResume]);

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
            className="font-display text-2xl md:text-[30px] font-normal leading-snug mb-2"
            style={{ color: "#0A1628" }}
          >
            Seu plano de saúde é aceito aqui
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Atendemos os <strong className="text-navy font-semibold">principais convênios</strong> de São Paulo para consultas, exames e cirurgias.
          </p>
        </div>

        {/* Carrossel */}
        <div className="conv-carousel-wrapper">
          <div className="conv-track-container">
            <div
              ref={trackRef}
              className="conv-track"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {ALL_ITEMS.map((conv, i) => (
                <div key={i} className="conv-logo-card" title={conv.nome}>
                  <img src={conv.logo} alt={conv.nome} loading="lazy" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center px-6">
          <div className="conv-count">
            <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ fill: "#C9A86C" }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span>
              Atendemos <span className="conv-count-number">+7</span> convênios
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 flex-wrap mt-1">
            <Link
              href="/convenios"
              className="font-ui text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors hover:text-gold"
              style={{ color: "#0A1628", borderBottom: "1px solid rgba(10,22,40,0.2)", paddingBottom: "1px" }}
            >
              Ver lista completa
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <span className="w-1 h-1 rounded-full bg-gray-300" />

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui text-[13px] font-semibold inline-flex items-center gap-1.5 transition-opacity hover:opacity-75"
              style={{ color: "#25D366" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.612-1.474A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.6-5.92-1.64l-.425-.254-2.735.875.875-2.61-.278-.442A9.77 9.77 0 012.182 12c0-5.412 4.406-9.818 9.818-9.818S21.818 6.588 21.818 12s-4.406 9.818-9.818 9.818z" />
              </svg>
              Meu convênio é aceito?
            </a>
          </div>
        </div>

        <p className="font-body text-[11px] text-muted-foreground mt-4 text-center px-6">
          A cobertura pode variar por plano e procedimento. Confirme ao agendar.
        </p>
      </section>
    </>
  );
}
