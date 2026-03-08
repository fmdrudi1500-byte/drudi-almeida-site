/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Renderizado via createPortal diretamente no document.body
   - Aparece APENAS enquanto o usuário está rolando a tela
   - Desaparece 1.2s após parar de rolar
   - Centralizado horizontalmente (left: 50%, translateX(-50%))
   - Quando barra WhatsApp visível no mobile: bottom = 80px
   - Quando barra oculta / desktop: bottom = 24px
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";

const BAR_HEIGHT_PX = 80;
const HIDE_DELAY_MS = 1200; // tempo após parar de rolar para esconder

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [ctaBarVisible, setCtaBarVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(window.scrollY);

  // --- Efeito 1: aparece durante scroll, desaparece ao parar ---
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // Só mostrar se passou de 300px do topo
      if (currentY > 300) {
        setVisible(true);

        // Cancelar timer anterior e iniciar novo
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
          setVisible(false);
        }, HIDE_DELAY_MS);
      } else {
        // Abaixo de 300px: sempre esconder
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // --- Efeito 2: detecta a barra do WhatsApp via MutationObserver ---
  useEffect(() => {
    let observer: MutationObserver | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;

    const checkBar = (el: Element) => {
      setCtaBarVisible(el.classList.contains("visible"));
    };

    const attachObserver = (el: Element) => {
      checkBar(el);
      observer = new MutationObserver(() => checkBar(el));
      observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    };

    const bar = document.getElementById("drudi-sticky-bar");
    if (bar) {
      attachObserver(bar);
    } else {
      poll = setInterval(() => {
        const el = document.getElementById("drudi-sticky-bar");
        if (el) {
          if (poll) clearInterval(poll);
          poll = null;
          attachObserver(el);
        }
      }, 300);
    }

    return () => {
      if (poll) clearInterval(poll);
      observer?.disconnect();
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bottomPx = ctaBarVisible ? BAR_HEIGHT_PX : 24;

  const button = (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      className="fixed z-[99997] flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-white/95 dark:bg-navy/95 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
      style={{
        bottom: `${bottomPx}px`,
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(12px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 0.25s ease-out, transform 0.25s ease-out, bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <ChevronUp className="w-4 h-4" />
      <span className="hidden md:inline">Topo</span>
    </button>
  );

  return createPortal(button, document.body);
}
