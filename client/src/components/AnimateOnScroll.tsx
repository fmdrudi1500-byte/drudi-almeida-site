/* ============================================================
   AnimateOnScroll — CSS-only scroll-triggered animations
   Uses a SHARED IntersectionObserver (one per rootMargin) instead
   of one observer per element — dramatically reduces JS overhead
   on pages with many animated elements (e.g., Home with 53 items).
   ============================================================ */
import { ReactNode, useRef, useEffect, useState, useCallback } from "react";

// Shared observer registry: rootMargin -> IntersectionObserver + callbacks map
const observerMap = new Map<string, {
  observer: IntersectionObserver;
  callbacks: Map<Element, (visible: boolean) => void>;
}>();

function getSharedObserver(rootMargin: string) {
  if (!observerMap.has(rootMargin)) {
    const callbacks = new Map<Element, (visible: boolean) => void>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cb = callbacks.get(entry.target);
          if (cb) cb(entry.isIntersecting);
        });
      },
      { rootMargin }
    );
    observerMap.set(rootMargin, { observer, callbacks });
  }
  return observerMap.get(rootMargin)!;
}

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  variant?: "fade" | "scale" | "blur" | "slide";
  duration?: number;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  variant = "fade",
  duration = 0.65,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = useCallback(
    (visible: boolean) => {
      if (visible) {
        setIsVisible(true);
        if (once && ref.current) {
          const { observer, callbacks } = getSharedObserver("-50px");
          observer.unobserve(ref.current);
          callbacks.delete(ref.current);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    },
    [once]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { observer, callbacks } = getSharedObserver("-50px");
    callbacks.set(el, handleVisibility);
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [handleVisibility]);

  const dirMap = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  };

  const hiddenTransform = dirMap[direction];
  const scaleVal = variant === "scale" ? " scale(0.92)" : "";
  const blurVal = variant === "blur" ? " blur(8px)" : "";

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateY(0) translateX(0) scale(1)"
      : `${hiddenTransform}${scaleVal}`,
    filter: variant === "blur" ? (isVisible ? "blur(0px)" : blurVal.trim()) : undefined,
    transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/* ============================================================
   StaggerContainer — wraps children that animate in sequence
   ============================================================ */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
}: StaggerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/* ============================================================
   StaggerItem — child of StaggerContainer
   ============================================================ */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = useCallback((visible: boolean) => {
    if (visible) {
      setIsVisible(true);
      if (ref.current) {
        const { observer, callbacks } = getSharedObserver("-50px");
        observer.unobserve(ref.current);
        callbacks.delete(ref.current);
      }
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { observer, callbacks } = getSharedObserver("-50px");
    callbacks.set(el, handleVisibility);
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [handleVisibility]);

  const dirMap = {
    up: "translateY(30px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
    none: "none",
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateY(0) translateX(0) scale(1)"
      : `${dirMap[direction]} scale(0.96)`,
    transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
