"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAnimationConfig } from "./AnimationProvider";

export function PageTransitionWrapper({ children }) {
  const pathname = usePathname();
  const { shouldAnimate, animationSpeed } = useAnimationConfig();

  if (!shouldAnimate) {
    return <>{children}</>;
  }

  let duration = 0.4;
  if (animationSpeed === "fast") duration = 0.25;
  if (animationSpeed === "slow") duration = 0.6;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration, ease: "easeInOut" }}
        className="flex-1 w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
