import React, { useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const ScrollManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useLayoutEffect(() => {
    // 1. Initialize Lenis for momentum scrolling
    const lenis = new Lenis({
      duration: 1.2, // The "weight" of the scroll (higher = heavier/smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // 2. Sync Lenis scroll with GSAP's ScrollTrigger
    // This ensures GSAP animations know exactly where the scroll is
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Add Lenis to GSAP's animation ticker
    // This prevents lag by updating scroll logic on every GSAP frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP's default lag smoothing to avoid jumps during heavy scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};