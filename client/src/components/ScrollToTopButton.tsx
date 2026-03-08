/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Renderizado via createPortal diretamente no document.body
     → imune a qualquer stacking context criado por will-change,
       transform, filter ou perspective em elementos ancestrais
   - Aparece ao rolar > 300px para baixo
   - Desaparece quando scrollY ≤ 300 (comportamento simples)
   - Posicionado no canto DIREITO da tela (right: 16px)
   - Detecta o MobileCTABar via MutationObserver (tempo real)
   - Quando barra visível no mobile: bottom = 80px
     (barra tem ~62px de altura + 18px de margem de segurança)
   - Quando barra oculta: bottom = 24px
   - SEM timer automático de ocultação
   ============================================================ */
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";

// Altura fixa da barra MobileCTABar:
// padding 10px top + 42px botões + 10px bottom = 62px
// + margem de segurança de 18px = 80px total
const BAR_HEIGHT_PX = 80;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [ctaBarVisible, setCtaBarVisible] = useState(false);

  useEffect(() => {
    // --- MutationObserver: detecta mudanças na classe do banner em tempo real ---
    let observer: MutationObserver | null = null;

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

  // Quando a barra do WhatsApp está visível, sobe para BAR_HEIGHT_PX
  // Quando a barra está oculta (ou no desktop onde não aparece): 24px
  const bottomPx = ctaBarVisible ? BAR_HEIGHT_PX : 24;

  const button = (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      className="fixed z-[99997] flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-white/95 dark:bg-navy/95 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
      style={{
        bottom: `${bottomPx}px`,
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
