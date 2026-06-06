"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const AnimationContext = createContext({
  enableAnimations: true,
  animationSpeed: 'normal',
  enableCounterAnimations: true,
  enableScrollReveal: true,
  enableHeroAnimations: true,
  enableChatbotAnimations: true,
  shouldAnimate: true, // Master flag taking accessibility into account
});

export function AnimationProvider({ settings, children }) {
  const prefersReducedMotion = useReducedMotion();

  // If the user has reduced motion set at the OS level, or if the admin disabled it, disable all animations.
  const enableAnimations = settings?.enable_animations ?? true;
  const shouldAnimate = enableAnimations && !prefersReducedMotion;

  const contextValue = useMemo(() => ({
    enableAnimations,
    animationSpeed: settings?.animation_speed || 'normal',
    enableCounterAnimations: settings?.enable_counter_animations ?? true,
    enableScrollReveal: settings?.enable_scroll_reveal ?? true,
    enableHeroAnimations: settings?.enable_hero_animations ?? true,
    enableChatbotAnimations: settings?.enable_chatbot_animations ?? true,
    shouldAnimate,
  }), [settings, enableAnimations, shouldAnimate]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationConfig() {
  return useContext(AnimationContext);
}
