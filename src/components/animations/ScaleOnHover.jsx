"use client";

import { motion } from "framer-motion";
import { useAnimationConfig } from "./AnimationProvider";

export default function ScaleOnHover({ children, className = "", scale = 1.02, as = "div" }) {
  const { shouldAnimate } = useAnimationConfig();

  if (!shouldAnimate) {
    // If we have to render a specific tag, handle it here (fallback)
    const Component = as;
    return <Component className={`transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${className}`}>{children}</Component>;
  }

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      whileHover={{ 
        scale: scale,
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
