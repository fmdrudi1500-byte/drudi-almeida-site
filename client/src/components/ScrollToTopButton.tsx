/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Aparece ao rolar > 300px
   - Posicionado no centro inferior da tela (left-1/2 -translate-x-1/2)
   - Some automaticamente após 3s de inatividade no scroll
   - Reaparece ao rolar novamente
   - No mobile: sobe acima do MobileCTABar (~72px) quando banner visível
   - Animação via CSS transitions (sem framer-motion no caminho crítico)
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  // Detecta se o MobileCTABar está visível para ajustar o bottom
  const [ctaBarVisible, setCtaBarVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);

        // Reinicia o timer de auto-ocultamento a cada scroll
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => {
          setVisible(false);
        }, 3000); // some após 3s sem scroll
      } else {
        setVisible(false);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      }

      // Verifica se o MobileCTABar está visível no DOM
      const bar = document.getElementById("drudi-sticky-bar");
      if (bar) {
        setCtaBarVisible(bar.classList.contains("visible"));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
  };

  // No mobile (< 769px), quando o banner CTA está visível, sobe 80px do fundo
  // No desktop, mantém bottom-8 (32px)
  const bottomValue = ctaBarVisible ? "80px" : "32px";

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 16px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.22s ease-out, transform 0.22s ease-out, bottom 0.3s ease",
        bottom: bottomValue,
      }}
      className="fixed left-1/2 z-[99999] flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 dark:bg-navy/90 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
    >
      <ChevronUp className="w-4 h-4" />
      <span>Topo</span>
    </button>
  );
}
