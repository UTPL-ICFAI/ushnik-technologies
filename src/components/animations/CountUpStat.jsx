"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef } from "react";
import { useAnimationConfig } from "./AnimationProvider";

export default function CountUpStat({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 2,
  className = "" 
}) {
  const { shouldAnimate, enableCounterAnimations, animationSpeed } = useAnimationConfig();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract the numeric value
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const count = useMotionValue(0);
  
  // Format the animated number
  const rounded = useTransform(count, (latest) => {
    // If original value has decimals, keep 1 decimal place, otherwise round to integer
    if (value.toString().includes('.')) {
      return latest.toFixed(1);
    }
    return Math.round(latest);
  });

  // Determine speed
  let resolvedDuration = duration;
  if (animationSpeed === "fast") resolvedDuration = duration * 0.6;
  if (animationSpeed === "slow") resolvedDuration = duration * 1.5;

  useEffect(() => {
    if (!shouldAnimate || !enableCounterAnimations) return;
    
    if (isInView) {
      const controls = animate(count, numericValue, { 
        duration: resolvedDuration, 
        ease: "easeOut" 
      });
      return controls.stop;
    }
  }, [isInView, shouldAnimate, enableCounterAnimations, numericValue, resolvedDuration, count]);

  // Fallback for when animations are disabled
  if (!shouldAnimate || !enableCounterAnimations) {
    return <span className={className}>{prefix}{value}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
