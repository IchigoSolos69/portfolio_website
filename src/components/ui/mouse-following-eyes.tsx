"use client"

import * as React from "react"
import { useRef, useEffect, useCallback, useState } from "react";

interface MouseFollowingEyesProps {
  imageUrl: string;
  className?: string;
}

// Global mouse position tracker for better performance (shared across instances)
let globalMouseX = 0;
let globalMouseY = 0;
let mouseUpdateFrame: number | null = null;
let mouseListeners = 0;

// Throttled mouse position update using requestAnimationFrame
const updateMousePosition = (e: MouseEvent) => {
  if (mouseUpdateFrame === null) {
    mouseUpdateFrame = requestAnimationFrame(() => {
      globalMouseX = e.clientX;
      globalMouseY = e.clientY;
      mouseUpdateFrame = null;
    });
  }
};

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({ imageUrl, className }) => {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const lastUpdateTime = useRef<number>(0);
  const throttleDelay = 16; // ~60fps
  const eyePositionsRef = useRef<{ eye1: { centerX: number; centerY: number } | null; eye2: { centerX: number; centerY: number } | null }>({
    eye1: null,
    eye2: null,
  });

  // Memoize mobile detection
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [checkMobile]);

  // Optimized mouse tracking with proper cleanup
  useEffect(() => {
    if (isMobile) return;

    mouseListeners++;
    document.addEventListener("mousemove", updateMousePosition, { passive: true });
    
    return () => {
      mouseListeners--;
      document.removeEventListener("mousemove", updateMousePosition);
      if (mouseListeners === 0 && mouseUpdateFrame !== null) {
        cancelAnimationFrame(mouseUpdateFrame);
        mouseUpdateFrame = null;
      }
    };
  }, [isMobile]);

  // Cache eye positions to avoid repeated getBoundingClientRect calls
  const updateEyePositions = useCallback(() => {
    if (eye1Ref.current && eye2Ref.current) {
      const rect1 = eye1Ref.current.getBoundingClientRect();
      const rect2 = eye2Ref.current.getBoundingClientRect();
      eyePositionsRef.current = {
        eye1: {
          centerX: rect1.left + rect1.width / 2,
          centerY: rect1.top + rect1.height / 2,
        },
        eye2: {
          centerX: rect2.left + rect2.width / 2,
          centerY: rect2.top + rect2.height / 2,
        },
      };
    }
  }, []);

  // Update eye positions on mount and resize
  useEffect(() => {
    if (isMobile) return;
    
    updateEyePositions();
    const handleResize = () => {
      updateEyePositions();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, updateEyePositions]);

  const updateEyes = useCallback(() => {
    // Skip updates on mobile for better performance
    if (isMobile) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Throttle updates using performance.now() for better frame timing
    const now = performance.now();
    if (now - lastUpdateTime.current < throttleDelay) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
      return;
    }
    lastUpdateTime.current = now;

    if (!eye1Ref.current || !eye2Ref.current || !eyePositionsRef.current.eye1 || !eyePositionsRef.current.eye2) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
      return;
    }

    const updateEye = (
      eyePosition: { centerX: number; centerY: number },
      pupilElement: HTMLElement
    ) => {
      const dx = globalMouseX - eyePosition.centerX;
      const dy = globalMouseY - eyePosition.centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Reduced max movement range for smaller eyes
      const maxMove = 5;
      const clampedDistance = Math.min(distance, maxMove * 3);
      const moveDistance = (clampedDistance / (maxMove * 3)) * maxMove;

      const pupilX = Math.cos(angle) * moveDistance;
      const pupilY = Math.sin(angle) * moveDistance;

      // Use transform3d for hardware acceleration
      pupilElement.style.transform = `translate3d(${pupilX}px, ${pupilY}px, 0)`;
    };

    const pupil1Ref = eye1Ref.current.querySelector('.pupil') as HTMLElement;
    const pupil2Ref = eye2Ref.current.querySelector('.pupil') as HTMLElement;

    if (pupil1Ref && pupil2Ref && eyePositionsRef.current.eye1 && eyePositionsRef.current.eye2) {
      updateEye(eyePositionsRef.current.eye1, pupil1Ref);
      updateEye(eyePositionsRef.current.eye2, pupil2Ref);
    }

    animationFrameRef.current = requestAnimationFrame(updateEyes);
  }, [isMobile, throttleDelay]);

  useEffect(() => {
    if (!isMobile) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
    }
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [updateEyes, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ''}`}
    >
      {/* Profile image with eye cutouts */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#8BAE66]/55 shadow-2xl">
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

const Eye: React.FC = React.memo(() => {
  return (
    // --- CHANGE 1: Made outer eye smaller at all breakpoints and reduced border width ---
    // Added overflow-hidden to ensure pupil doesn't bleed out
    <div 
      className="relative bg-white border-[1.5px] border-gray-800 rounded-full h-2.5 w-2.5 sm:h-1 sm:w-4.5 md:h-2.5 md:w-5 flex items-center justify-center overflow-hidden"
      style={{ contain: 'layout style' }}
    >
       {/* --- CHANGE 1: Made pupil smaller at all breakpoints --- */}
      <div 
        className="pupil absolute bg-gray-900 rounded-full h-[1.5px] w-[1.5px] sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
        style={{ 
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)', // Force GPU layer
        }}
      >
        {/* --- CHANGE 2: Natural Glint ---
            - Moved to top-right (top-[15%] right-[20%]) for overhead light effect.
            - Sized relatively using percentages (w-[30%] h-[30%]) instead of fixed pixels.
            - Added opacity-80 for softer look.
        */}
        <div className="absolute top-[15%] right-[20%] w-[30%] h-[30%] bg-white rounded-full opacity-80"></div>
      </div>
    </div>
  );
});
Eye.displayName = "Eye";

export { MouseFollowingEyes };