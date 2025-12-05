"use client" 

import * as React from "react"
import { useRef, useEffect, useCallback } from "react";

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouseX = e.clientX;
      globalMouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const updateEyes = useCallback(() => {
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

      // Increased max movement for better visibility and responsiveness
      const maxMove = 7;
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
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateEyes);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateEyes]);

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
        
        {/* Eye containers positioned over the actual eyes in the image - moved up */}
        <div 
          ref={eye1Ref}
          className="absolute top-[35%] left-[28%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <Eye />
        </div>
        <div 
          ref={eye2Ref}
          className="absolute top-[35%] right-[28%] transform translate-x-1/2 -translate-y-1/2"
        >
          <Eye />
        </div>
      </div>
    </div>
  );
};

const Eye: React.FC = () => {
  return (
    <div className="relative bg-white border-2 border-gray-800 rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex items-center justify-center">
      <div className="pupil absolute bg-gray-900 rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full absolute bottom-0 right-0"></div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };
