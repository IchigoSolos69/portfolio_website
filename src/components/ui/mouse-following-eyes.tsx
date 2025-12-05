"use client" 

import * as React from "react"
import { useState, useRef, useEffect } from "react";

interface MouseFollowingEyesProps {
  imageUrl: string;
  className?: string;
}

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({ imageUrl, className }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className || ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Profile image with eye cutouts */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img 
          src={imageUrl} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
        
        {/* Eye containers positioned over the actual eyes in the image */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <Eye
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            selfRef={eye1Ref as React.RefObject<HTMLDivElement>}
            otherRef={eye2Ref as React.RefObject<HTMLDivElement>}
          />
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <Eye
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            selfRef={eye2Ref as React.RefObject<HTMLDivElement>}
            otherRef={eye1Ref as React.RefObject<HTMLDivElement>}
          />
        </div>
      </div>
    </div>
  );
};

interface EyeProps {
  mouseX: number;
  mouseY: number;
  selfRef: React.RefObject<HTMLDivElement>;
  otherRef: React.RefObject<HTMLDivElement>;
}

const Eye: React.FC<EyeProps> = ({ mouseX, mouseY, selfRef, otherRef }) => {
  const pupilRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const updateCenter = () => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    setCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  useEffect(() => {
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  useEffect(() => {
    updateCenter();

    const isInside = (ref: React.RefObject<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return false;
      return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      );
    };

    if (isInside(selfRef) || isInside(otherRef)) return;

    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const angle = Math.atan2(dy, dx);

    const maxMove = 5; // Reduced movement for smaller eyes
    const pupilX = Math.cos(angle) * maxMove;
    const pupilY = Math.sin(angle) * maxMove;

    if (pupilRef.current) {
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }
  }, [mouseX, mouseY, center, selfRef, otherRef]);

  return (
    <div
      ref={selfRef}
      className="relative bg-white border-2 border-gray-800 rounded-full h-6 w-6 flex items-center justify-center"
    >
      <div
        ref={pupilRef}
        className="absolute bg-gray-900 rounded-full h-2 w-2 transition-all duration-[5ms]"
      >
        <div className="w-1 h-1 bg-white rounded-full absolute bottom-0 right-0"></div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };

