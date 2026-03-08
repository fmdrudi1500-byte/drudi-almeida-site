/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Aparece ao rolar > 300px para baixo
   - Desaparece quando scrollY ≤ 300 (comportamento simples e consistente)
   - Posicionado no canto DIREITO da tela (não centralizado)
     → evita conflito visual com badges/elementos do carrossel
   - Detecta o MobileCTABar via MutationObserver (tempo real)
   - Quando barra visível no mobile: bottom = 72px (acima da barra de ~64px)
   - Quando barra oculta: bottom = 24px
   - No mobile: apenas ícone (compacto, não sobrepõe nada)
   - No desktop: ícone + texto "Topo"
   - SEM timer automático de ocultação
   ============================================================ */
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

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

  // No mobile: quando a barra do WhatsApp está visível, sobe para 72px
  // (barra tem ~64px de altura + 8px de margem)
  // No desktop: sempre 24px (barra não aparece no desktop)
  const bottomPx = ctaBarVisible ? 72 : 24;

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      style={{
        bottom: `${bottomPx}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.25s ease-out, transform 0.25s ease-out, bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="fixed right-4 z-[99997] flex items-center gap-1.5 px-3 py-2.5 md:px-4 rounded-full bg-white/95 dark:bg-navy/95 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
    >
      <ChevronUp className="w-4 h-4" />
      <span className="hidden md:inline">Topo</span>
    </button>
  );
}
