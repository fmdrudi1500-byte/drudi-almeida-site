/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Renderizado via createPortal diretamente no document.body
     → imune a qualquer stacking context criado por will-change,
       transform, filter ou perspective em elementos ancestrais
   - Aparece ao rolar > 300px para baixo
   - Desaparece quando scrollY ≤ 300 (comportamento simples)
   - Posicionado no canto DIREITO da tela (right: 16px)
   - Detecta o MobileCTABar via getBoundingClientRect (mais confiável)
   - Quando barra visível no mobile: bottom = altura da barra + 8px
   - Quando barra oculta: bottom = 24px
   - SEM timer automático de ocultação
   ============================================================ */
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    // Calcular o offset do bottom baseado na altura real da barra
    const updateBottomOffset = () => {
      const bar = document.getElementById("drudi-sticky-bar");
      if (bar && bar.classList.contains("visible")) {
        const rect = bar.getBoundingClientRect();
        const barHeight = window.innerHeight - rect.top;
        setBottomOffset(barHeight + 8);
      } else {
        setBottomOffset(24);
      }
    };

    // --- MutationObserver: detecta mudanças na classe do banner em tempo real ---
    let observer: MutationObserver | null = null;

    const attachObserver = (el: Element) => {
      updateBottomOffset();
      observer = new MutationObserver(() => updateBottomOffset());
      observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    };

    const bar = document.getElementById("drudi-sticky-bar");
    if (bar) {
      attachObserver(bar);
    } else {
      // Banner ainda não montado — aguarda com polling leve
      const poll = setInterval(() => {
        const el = document.getElementById("drudi-sticky-bar");
        if (el) {
          attachObserver(el);
          clearInterval(poll);
        }
      }, 300);
      return () => clearInterval(poll);
    }

    // --- Scroll: controla visibilidade do botão ---
    const onScroll = () => {
      setVisible(window.scrollY > 300);
      updateBottomOffset();
    };

    // Verificar posição inicial
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const button = (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      className="fixed z-[99997] flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-white/95 dark:bg-navy/95 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
      style={{
        bottom: `${bottomOffset}px`,
        right: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
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
