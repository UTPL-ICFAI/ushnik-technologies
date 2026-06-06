"use client";

import { motion } from "framer-motion";
import { useAnimationConfig } from "./AnimationProvider";

export default function StaggerContainer({ children, className = "", delayOrder = 0 }) {
  const { shouldAnimate, enableHeroAnimations, animationSpeed } = useAnimationConfig();

  if (!shouldAnimate || !enableHeroAnimations) {
    return <div className={className}>{children}</div>;
  }

  let staggerTime = 0.15;
  if (animationSpeed === "fast") staggerTime = 0.1;
  if (animationSpeed === "slow") staggerTime = 0.25;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerTime,
        delayChildren: delayOrder * 0.2, // Base delay if needed
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child element for StaggerContainer
export function StaggerItem({ children, className = "" }) {
  const { shouldAnimate, enableHeroAnimations, animationSpeed } = useAnimationConfig();

  if (!shouldAnimate || !enableHeroAnimations) {
    return <div className={className}>{children}</div>;
  }
  
  let duration = 0.5;
  if (animationSpeed === "fast") duration = 0.3;
  if (animationSpeed === "slow") duration = 0.8;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration, ease: "easeOut" }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
