/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Aparece ao rolar > 300px
   - Posicionado no centro inferior da tela (left-1/2 -translate-x-1/2)
   - Some automaticamente após 3s de inatividade no scroll
   - Reaparece ao rolar novamente
   - No mobile: OCULTO quando o MobileCTABar está visível (evita duplicação)
   - No desktop: sempre visível (bottom-8)
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  // Detecta se o MobileCTABar está visível para ocultar o botão no mobile
  const [ctaBarVisible, setCtaBarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Detecta mobile
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

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
      window.removeEventListener("resize", checkMobile);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
  };

  // No mobile: ocultar completamente quando o banner CTA estiver visível
  // No desktop: sempre mostrar em bottom-8 (32px)
  const shouldShow = visible && !(isMobile && ctaBarVisible);

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      style={{
        opacity: shouldShow ? 1 : 0,
        transform: shouldShow ? "translate(-50%, 0)" : "translate(-50%, 16px)",
        pointerEvents: shouldShow ? "auto" : "none",
        transition: "opacity 0.22s ease-out, transform 0.22s ease-out",
        bottom: "32px",
      }}
      className="fixed left-1/2 z-[99999] flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 dark:bg-navy/90 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors active:scale-95"
    >
      <ChevronUp className="w-4 h-4" />
      <span>Topo</span>
    </button>
  );
}
