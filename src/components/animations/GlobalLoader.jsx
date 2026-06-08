"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimationConfig } from "./AnimationProvider";

export default function GlobalLoader() {
  const pathname = usePathname();
  const { shouldAnimate } = useAnimationConfig();
  const [isLoading, setIsLoading] = useState(true); // Start true for initial load
  const [currentPath, setCurrentPath] = useState(pathname);

  // Trigger loader on initial mount and on path changes
  useEffect(() => {
    if (!shouldAnimate) {
      setIsLoading(false);
      return;
    }

    if (pathname !== currentPath) {
      setIsLoading(true);
      setCurrentPath(pathname);
    }

    // Artificially keep the loader visible to ensure premium feel and allow content to mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms duration for the loader to shine

    return () => clearTimeout(timer);
  }, [pathname, currentPath, shouldAnimate]);

  if (!shouldAnimate) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: ["drop-shadow(0px 0px 0px rgba(220, 38, 38, 0))", "drop-shadow(0px 0px 20px rgba(220, 38, 38, 0.4))", "drop-shadow(0px 0px 0px rgba(220, 38, 38, 0))"]
            }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              filter: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 0.2
              }
            }}
            className="relative flex flex-col items-center"
          >
            <img 
              src="/logo-2.png" 
              alt="Ushnik Technologies" 
              className="w-[100px] sm:w-[140px] md:w-[160px] lg:w-[200px] h-auto mb-8"
            />
            <div className="w-48 md:w-64 h-[3px] bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-red"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
