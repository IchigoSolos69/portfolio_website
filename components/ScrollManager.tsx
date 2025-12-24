import React, { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    // 1. Initialize Lenis with "Premium" Physics
    const lenis = new Lenis({
      duration: 1.5, // The sweet spot for "luxury" weight (Standard is 1.0)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // "Expo Out" easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Keep this 1 for natural trackpad feel
      touchMultiplier: 2, // Makes mobile scrolling feel snappier
    });
    lenisRef.current = lenis;

    // 2. Connect to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. The Perfect Ticker
    // We bind the function to ensure the correct context is maintained
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Add to GSAP's ticker (priority 0) to ensure it runs before animations
    gsap.ticker.add(update);

    // 4. Critical: Disable native lag smoothing
    // This stops GSAP from trying to "catch up" frames, which fights Lenis
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup Function
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="lenis-wrapper">
      {children}
    </div>
  );
};