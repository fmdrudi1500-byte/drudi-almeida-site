/* ============================================================
   ScrollToTopButton — Drudi e Almeida
   Floating button that appears after 300px of scroll and
   smoothly returns the user to the top of the page.
   Positioned above the WhatsApp widget (bottom-24).
   ============================================================ */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top-btn"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
          className="fixed bottom-24 right-5 z-40 w-11 h-11 rounded-full bg-navy dark:bg-gold shadow-lg border border-white/10 flex items-center justify-center text-cream dark:text-navy hover:bg-navy/90 dark:hover:bg-gold-light transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
