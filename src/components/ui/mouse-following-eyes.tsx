"use client"

import * as React from "react";
import { useRef, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import useMobileDetection from "@/hooks/useMobileDetection";

interface MouseFollowingEyesProps {
  imageUrl: string;
  className?: string;
  maxMove?: number;
  eyeSize?: number;
}

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({
  imageUrl,
  className = '',
  maxMove = 5,
  eyeSize = 1
}) => {
  const isMobile = useMobileDetection();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  
  // Motion values for eye 1 with optimized spring settings
  const eye1X = useMotionValue(0);
  const eye1Y = useMotionValue(0);
  const eye1SpringX = useSpring(eye1X, { 
    stiffness: 500, 
    damping: 30,
    restDelta: 0.001
  });
  const eye1SpringY = useSpring(eye1Y, { 
    stiffness: 500, 
    damping: 30,
    restDelta: 0.001
  });
  
  // Motion values for eye 2 with optimized spring settings
  const eye2X = useMotionValue(0);
  const eye2Y = useMotionValue(0);
  const eye2SpringX = useSpring(eye2X, { 
    stiffness: 500, 
    damping: 30,
    restDelta: 0.001
  });
  const eye2SpringY = useSpring(eye2Y, { 
    stiffness: 500, 
    damping: 30,
    restDelta: 0.001
  });

  // Memoized eye update function to prevent recreation on each render
  const updateEyePositions = useCallback((e: MouseEvent) => {
    if (isMobile || shouldReduceMotion || !eye1Ref.current || !eye2Ref.current) return;
    
    const updateEye = (
      eyeRef: React.RefObject<HTMLDivElement>,
      x: typeof eye1X,
      y: typeof eye1Y
    ) => {
      if (!eyeRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      // Limit the movement range based on props
      const clampedDistance = Math.min(distance, maxMove * 3);
      const moveDistance = (clampedDistance / (maxMove * 3)) * maxMove * eyeSize;
      
      x.set(Math.cos(angle) * moveDistance);
      y.set(Math.sin(angle) * moveDistance);
    };
    
    updateEye(eye1Ref, eye1X, eye1Y);
    updateEye(eye2Ref, eye2X, eye2Y);
  }, [isMobile, shouldReduceMotion, maxMove, eyeSize]);

  // Add/remove mousemove event listener with passive: true for better performance
  React.useEffect(() => {
    if (isMobile || shouldReduceMotion) return;
    
    window.addEventListener('mousemove', updateEyePositions, { passive: true });
    return () => window.removeEventListener('mousemove', updateEyePositions);
  }, [updateEyePositions, isMobile, shouldReduceMotion]);

  // Memoized Eye component to prevent unnecessary re-renders
  const Eye = React.useMemo(() => {
    return React.forwardRef<HTMLDivElement, { x: any; y: any }>(({ x, y }, ref) => (
      <div 
        ref={ref}
        className="relative bg-white border-[1.5px] border-gray-800 rounded-full h-2.5 w-2.5 sm:h-1 sm:w-4.5 md:h-2.5 md:w-5 flex items-center justify-center overflow-hidden"
        style={{ 
          contain: 'layout style',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)'
        }}
      >
        <motion.div 
          className="absolute w-1.5 h-1.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 bg-gray-800 rounded-full"
          style={{
            x,
            y,
            willChange: 'transform',
            transform: 'translate3d(0,0,0)'
          }}
          aria-hidden="true"
        />
      </div>
    ));
  }, []);

  // Memoize the eye components to prevent unnecessary re-renders
  const leftEye = useMemo(() => (
    <Eye x={eye1SpringX} y={eye1SpringY} ref={eye1Ref} />
  ), [eye1SpringX, eye1SpringY]);

  const rightEye = useMemo(() => (
    <Eye x={eye2SpringX} y={eye2SpringY} ref={eye2Ref} />
  ), [eye2SpringX, eye2SpringY]);

  // Skip rendering if motion is reduced
  if (shouldReduceMotion) {
    return (
      <div className={`relative ${className}`}>
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
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      aria-hidden="true"
    >
      {/* Profile image with eye cutouts */}
      <div 
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#8BAE66]/55 shadow-2xl"
        style={{
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          contain: 'paint layout style'
        }}
      >
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
          style={{
            transform: 'scale(1.4)',
            transformOrigin: 'center center',
            objectPosition: 'center 35%',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            contentVisibility: 'auto'
          }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* Eye containers positioned over the actual eyes in the image */}
        <div 
          className="absolute top-[28.5%] left-[37.5%] transform -translate-x-1/2 -translate-y-1/2"
          style={{ contain: 'layout style' }}
        >
          {leftEye}
        </div>
        <div 
          className="absolute top-[28.5%] right-[41.5%] transform translate-x-1/2 -translate-y-1/2"
          style={{ contain: 'layout style' }}
        >
          {rightEye}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MouseFollowingEyes);