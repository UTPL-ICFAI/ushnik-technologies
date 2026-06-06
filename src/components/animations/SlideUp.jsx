"use client";

import { motion } from "framer-motion";
import { useAnimationConfig } from "./AnimationProvider";

export default function SlideUp({ children, delay = 0, duration = null, className = "", id = "" }) {
  const { shouldAnimate, enableScrollReveal, animationSpeed } = useAnimationConfig();

  // If animations are globally disabled OR scroll reveal is specifically disabled,
  // we render a static div instead of a motion.div to save performance.
  if (!shouldAnimate || !enableScrollReveal) {
    return <div className={className} id={id}>{children}</div>;
  }

  // Determine duration based on global speed settings
  let resolvedDuration = 0.5;
  if (duration) {
    resolvedDuration = duration;
  } else {
    if (animationSpeed === "fast") resolvedDuration = 0.3;
    if (animationSpeed === "slow") resolvedDuration = 0.8;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: resolvedDuration, delay, ease: "easeOut" }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}
