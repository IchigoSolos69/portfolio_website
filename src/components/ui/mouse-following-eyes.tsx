"use client"

import * as React from "react"
import { useRef, useEffect, useCallback, useState } from "react";

interface MouseFollowingEyesProps {
  imageUrl: string;
  className?: string;
}

// Global mouse position tracker for better performance
let globalMouseX = 0;
let globalMouseY = 0;

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({ imageUrl, className }) => {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const lastUpdateTime = useRef<number>(0);
  const throttleDelay = 16; // ~60fps

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip mouse tracking on mobile devices for better performance
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      globalMouseX = e.clientX;
      globalMouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const updateEyes = useCallback(() => {
    // Skip updates on mobile for better performance
    if (isMobile) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
      return;
    }

    // Throttle updates for better performance
    const now = performance.now();
    if (now - lastUpdateTime.current < throttleDelay) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
      return;
    }
    lastUpdateTime.current = now;

    if (!eye1Ref.current || !eye2Ref.current) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
      return;
    }

    const updateEye = (eyeRef: React.RefObject<HTMLDivElement>, pupilRef: React.RefObject<HTMLDivElement>) => {
      if (!eyeRef.current || !pupilRef.current) return;

      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = globalMouseX - centerX;
      const dy = globalMouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Reduced max movement range for smaller eyes
      const maxMove = 5;
      const clampedDistance = Math.min(distance, maxMove * 3);
      const moveDistance = (clampedDistance / (maxMove * 3)) * maxMove;

      const pupilX = Math.cos(angle) * moveDistance;
      const pupilY = Math.sin(angle) * moveDistance;

      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    const pupil1Ref = eye1Ref.current.querySelector('.pupil') as HTMLElement;
    const pupil2Ref = eye2Ref.current.querySelector('.pupil') as HTMLElement;

    if (pupil1Ref && pupil2Ref) {
      updateEye(eye1Ref, { current: pupil1Ref } as React.RefObject<HTMLDivElement>);
      updateEye(eye2Ref, { current: pupil2Ref } as React.RefObject<HTMLDivElement>);
    }

    animationFrameRef.current = requestAnimationFrame(updateEyes);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateEyes, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ''}`}
    >
      {/* Profile image with eye cutouts */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
          style={{
            transform: 'scale(1.4)',
            transformOrigin: 'center center',
            objectPosition: 'center 35%'
          }}
        />

        {/* Eye containers positioned over the actual eyes in the image - smaller and closer together */}
        <div
          ref={eye1Ref}
          className="absolute top-[28.5%] left-[37.5%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <Eye />
        </div>
        <div
          ref={eye2Ref}
          className="absolute top-[28.5%] right-[41.5%] transform translate-x-1/2 -translate-y-1/2"
        >
          <Eye />
        </div>
      </div>
    </div>
  );
};

const Eye: React.FC = () => {
  return (
    // --- CHANGE 1: Made outer eye smaller at all breakpoints and reduced border width ---
    // Added overflow-hidden to ensure pupil doesn't bleed out
    <div className="relative bg-white border-[1.5px] border-gray-800 rounded-full h-2.5 w-2.5 sm:h-1 sm:w-4.5 md:h-2.5 md:w-5 flex items-center justify-center overflow-hidden">
       {/* --- CHANGE 1: Made pupil smaller at all breakpoints --- */}
      <div className="pupil absolute bg-gray-900 rounded-full h-[1.5px] w-[1.5px] sm:h-2.5 sm:w-2.5 md:h-3 md:w-3">
        {/* --- CHANGE 2: Natural Glint ---
            - Moved to top-right (top-[15%] right-[20%]) for overhead light effect.
            - Sized relatively using percentages (w-[30%] h-[30%]) instead of fixed pixels.
            - Added opacity-80 for softer look.
        */}
        <div className="absolute top-[15%] right-[20%] w-[30%] h-[30%] bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };