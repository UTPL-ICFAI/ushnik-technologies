"use client";

import { motion } from "framer-motion";
import { useAnimationConfig } from "./AnimationProvider";

export default function FadeIn({ children, delay = 0, duration = null, className = "" }) {
  const { shouldAnimate, animationSpeed } = useAnimationConfig();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  let resolvedDuration = 0.5;
  if (duration) {
    resolvedDuration = duration;
  } else {
    if (animationSpeed === "fast") resolvedDuration = 0.3;
    if (animationSpeed === "slow") resolvedDuration = 0.8;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: resolvedDuration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
