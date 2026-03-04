/* ============================================================
   ScrollToTopButton — CSS-only (no framer-motion)
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 dark:bg-navy/90 backdrop-blur-sm shadow-lg border border-border/40 text-navy dark:text-cream font-ui text-xs font-semibold hover:bg-white dark:hover:bg-navy transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0" : "16px"})`,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.22s ease-out, transform 0.22s ease-out",
      }}
    >
      <ChevronUp className="w-4 h-4" />
      <span>Topo</span>
    </button>
  );
}
