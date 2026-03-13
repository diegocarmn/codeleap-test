"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type AnimationVariant = "fadeUp" | "fadeIn" | "scale";

type AnimateProps = {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
};

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function Animate({
  children,
  variant = "fadeIn",
  delay = 0,
  className,
}: AnimateProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants[variant]}
      transition={{ duration: 0.1, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
