/* ============================================================
   AnimateOnScroll — CSS-only scroll-triggered animations
   Uses IntersectionObserver + CSS transitions (no framer-motion)
   Supports: fade-up, fade-left, fade-right, scale, blur, stagger
   ============================================================ */
import { useEffect, useRef, ReactNode } from "react";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}s`;
            el.classList.add("aos-visible");
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove("aos-visible");
          }
        });
      },
      { rootMargin: "-50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once]);

  // Build initial transform based on direction
  const dirTransform = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  }[direction];

  const initialStyle: React.CSSProperties = {
    opacity: 0,
    transform: dirTransform !== "none" ? dirTransform : undefined,
    filter: variant === "blur" ? "blur(8px)" : undefined,
    scale: variant === "scale" ? "0.92" : undefined,
    transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1), transform ${duration}s cubic-bezier(0.22,1,0.36,1), filter ${duration}s ease, scale ${duration}s ease`,
    willChange: "opacity, transform",
  };

  return (
    <div
      ref={ref}
      className={`aos-element ${className}`}
      style={initialStyle}
    >
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
  staggerDelay = 0.08,
  initialDelay = 0,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger children
            const children = el.querySelectorAll<HTMLElement>(".stagger-item");
            children.forEach((child, i) => {
              child.style.transitionDelay = `${initialDelay + i * staggerDelay}s`;
              child.classList.add("aos-visible");
            });
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "-50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerDelay, initialDelay]);

  return (
    <div ref={ref} className={className}>
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
  const dirTransform = {
    up: "translateY(30px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
    none: "none",
  }[direction];

  const initialStyle: React.CSSProperties = {
    opacity: 0,
    transform: dirTransform !== "none" ? dirTransform : undefined,
    transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)`,
    willChange: "opacity, transform",
  };

  return (
    <div className={`stagger-item ${className}`} style={initialStyle}>
      {children}
    </div>
  );
}
