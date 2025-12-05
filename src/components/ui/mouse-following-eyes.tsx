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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const pupil1Ref = useRef<HTMLDivElement>(null);
  const pupil2Ref = useRef<HTMLDivElement>(null);
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
    if (!eye1Ref.current || !eye2Ref.current || !pupil1Ref.current || !pupil2Ref.current) {
      animationFrameRef.current = requestAnimationFrame(updateEyes);
      return;
    }

    const updateEye = (
      eyeRef: React.RefObject<HTMLDivElement>,
      pupilRef: React.RefObject<HTMLDivElement>
    ) => {
      if (!eyeRef.current || !pupilRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      // Calculate angle using Math.atan2
      const dx = globalMouseX - eyeCenterX;
      const dy = globalMouseY - eyeCenterY;
      const angle = Math.atan2(dy, dx);

      // Calculate distance from center
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Eye socket radius (clamp distance so pupil never leaves socket)
      const pupilSize = pupilRef.current.getBoundingClientRect().width;
      const socketRadius = (eyeRect.width / 2) - (pupilSize / 2) - 2; // 2px padding
      const maxDistance = Math.min(distance, socketRadius);

      // Calculate pupil position
      const pupilX = Math.cos(angle) * maxDistance;
      const pupilY = Math.sin(angle) * maxDistance;

      // Apply transform
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    };

    updateEye(eye1Ref, pupil1Ref);
    updateEye(eye2Ref, pupil2Ref);

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
      {/* Profile image with SVG mask for eye cutouts */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
        <img 
          ref={imageRef}
          src={imageUrl} 
          alt="Profile" 
          className="w-full h-full object-cover"
          style={{ 
            transform: 'scale(1.4)',
            transformOrigin: 'center center',
            objectPosition: 'center 35%'
          }}
        />
        
        {/* Eye hit boxes - transparent containers positioned exactly where eyes are */}
        {/* Left Eye Socket */}
        <div 
          ref={eye1Ref}
          className="absolute rounded-full"
          style={{
            left: '23%',
            top: '34%',
            width: '8%',
            height: '8%',
            minWidth: '24px',
            minHeight: '24px',
            clipPath: 'circle(50% at 50% 50%)',
            pointerEvents: 'none',
          }}
        >
          {/* Left Pupil */}
          <div 
            ref={pupil1Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900"
            style={{
              width: '35%',
              height: '35%',
              minWidth: '10px',
              minHeight: '10px',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Pupil highlight */}
            <div 
              className="absolute rounded-full bg-white opacity-90"
              style={{
                width: '30%',
                height: '30%',
                bottom: '15%',
                right: '15%',
              }}
            ></div>
          </div>
        </div>

        {/* Right Eye Socket */}
        <div 
          ref={eye2Ref}
          className="absolute rounded-full"
          style={{
            left: '69%',
            top: '34%',
            width: '8%',
            height: '8%',
            minWidth: '24px',
            minHeight: '24px',
            clipPath: 'circle(50% at 50% 50%)',
            pointerEvents: 'none',
          }}
        >
          {/* Right Pupil */}
          <div 
            ref={pupil2Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900"
            style={{
              width: '35%',
              height: '35%',
              minWidth: '10px',
              minHeight: '10px',
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Pupil highlight */}
            <div 
              className="absolute rounded-full bg-white opacity-90"
              style={{
                width: '30%',
                height: '30%',
                bottom: '15%',
                right: '15%',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };
