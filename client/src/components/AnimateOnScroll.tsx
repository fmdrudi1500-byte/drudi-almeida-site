/* ============================================================
   AnimateOnScroll — Rich scroll-triggered animations
   Supports: fade-up, fade-left, fade-right, scale, blur, stagger
   ============================================================ */
import { motion, Variants, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  variant?: "fade" | "scale" | "blur" | "slide";
  duration?: number;
  once?: boolean;
}

const buildVariants = (
  direction: "up" | "left" | "right" | "none",
  variant: "fade" | "scale" | "blur" | "slide"
): Variants => {
  const dirMap = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };
  const { x, y } = dirMap[direction];

  const baseHidden: TargetAndTransition = { opacity: 0, x, y };
  const baseVisible: TargetAndTransition = { opacity: 1, x: 0, y: 0 };

  if (variant === "scale") {
    (baseHidden as Record<string, unknown>).scale = 0.92;
    (baseVisible as Record<string, unknown>).scale = 1;
  }
  if (variant === "blur") {
    (baseHidden as Record<string, unknown>).filter = "blur(8px)";
    (baseVisible as Record<string, unknown>).filter = "blur(0px)";
  }

  return {
    hidden: baseHidden as TargetAndTransition,
    visible: baseVisible as TargetAndTransition,
  } as Variants;
};

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  variant = "fade",
  duration = 0.65,
  once = true,
}: Props) {
  const variants = buildVariants(direction, variant);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: staggerDelay, delayChildren: initialDelay }}
      className={className}
    >
      {children}
    </motion.div>
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
  const dirMap = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
    none: { y: 0, x: 0 },
  };
  const { x, y } = dirMap[direction];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x, y, scale: 0.96 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
