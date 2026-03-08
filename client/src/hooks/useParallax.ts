/* ============================================================
   useParallax — CSS-only parallax scroll hook
   Replaces framer-motion useScroll + useTransform
   Returns a ref to attach to the element and a style object
   ============================================================ */
import { useRef, useEffect, useState, RefObject } from "react";

interface ParallaxStyle {
  transform: string;
  willChange: string;
}

export function useParallax(speed = 0.3): {
  ref: RefObject<HTMLElement | null>;
  bgStyle: ParallaxStyle;
} {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top * speed;
      setOffset(scrolled);
    };

    // Use passive listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return {
    ref,
    bgStyle: {
      transform: `translateY(${offset}px) scale(1.15)`,
      willChange: "transform",
    },
  };
}
