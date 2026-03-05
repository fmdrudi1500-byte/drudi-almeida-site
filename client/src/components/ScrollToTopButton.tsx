/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Aparece ao rolar > 300px para baixo
   - Bolinha circular centralizada na parte inferior
   - Detecta o MobileCTABar via MutationObserver (tempo real)
   - Quando banner visível: bottom = 80px (acima do banner)
   - Quando banner oculto: bottom = 24px
   - No mobile: apenas bolinha (sem texto)
   - No desktop: bolinha + texto "Topo"
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [ctaBarVisible, setCtaBarVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // --- MutationObserver: detecta mudanças na classe do banner em tempo real ---
    const bar = document.getElementById("drudi-sticky-bar");
    let observer: MutationObserver | null = null;

    const checkBar = (el: Element | null) => {
      if (el) setCtaBarVisible(el.classList.contains("visible"));
    };

    if (bar) {
      checkBar(bar);
      observer = new MutationObserver(() => checkBar(bar));
      observer.observe(bar, { attributes: true, attributeFilter: ["class"] });
    } else {
      // Banner ainda não montado — aguarda com polling leve
      const poll = setInterval(() => {
        const el = document.getElementById("drudi-sticky-bar");
        if (el) {
          checkBar(el);
          observer = new MutationObserver(() => checkBar(el));
          observer.observe(el, { attributes: true, attributeFilter: ["class"] });
          clearInterval(poll);
        }
      }, 300);
      return () => clearInterval(poll);
    }

    // --- Scroll: controla visibilidade do botão ---
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setVisible(false), 3000);
      } else {
        setVisible(false);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
  };

  // Posição dinâmica: acima do banner quando visível
  const bottomPx = ctaBarVisible ? 80 : 24;

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      style={{
        bottom: `${bottomPx}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.22s ease-out, transform 0.22s ease-out, bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="fixed left-1/2 z-[99999] flex items-center gap-1.5 px-3 py-2.5 md:px-4 rounded-full bg-white/95 dark:bg-navy/95 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
    >
      <ChevronUp className="w-4 h-4" />
      <span className="hidden md:inline">Topo</span>
    </button>
  );
}
