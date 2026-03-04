/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   - Aparece ao rolar > 300px
   - Posicionado no centro inferior da tela (left-1/2 -translate-x-1/2)
   - Some automaticamente após 3s de inatividade no scroll
   - Reaparece ao rolar novamente
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top-btn"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 dark:bg-navy/90 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Topo</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
