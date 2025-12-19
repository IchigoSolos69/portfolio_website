"use client";

import { useEffect, useId, useRef, useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import useMobileDetection from "@/hooks/useMobileDetection";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  shouldAnimate?: boolean;
}

type Position = [number, number];

interface Square {
  id: number;
  pos: Position;
  delay: number;
  duration: number;
  opacity: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  shouldAnimate = true,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useMobileDetection();
  const shouldReduceMotion = useReducedMotion();
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const updateInterval = 1000 / 30; // 30fps

  // Memoize position calculation with boundary checks
  const getPos = useCallback((): Position => {
    if (!dimensions.width || !dimensions.height) return [0, 0];
    
    const maxX = Math.max(1, Math.floor(dimensions.width / width) - 1);
    const maxY = Math.max(1, Math.floor(dimensions.height / height) - 1);
    
    return [
      Math.min(maxX, Math.max(0, Math.floor((Math.random() * dimensions.width) / width))),
      Math.min(maxY, Math.max(0, Math.floor((Math.random() * dimensions.height) / height))),
    ];
  }, [dimensions, width, height]);

  // Generate stable square positions with animation properties
  const squares = useMemo<Square[]>(() => {
    const count = isMobile ? Math.max(5, Math.floor(numSquares * 0.4)) : numSquares;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
      delay: Math.random() * 0.5,
      duration: duration * 0.5 + Math.random() * duration * 0.5,
      opacity: maxOpacity * 0.7 + Math.random() * maxOpacity * 0.3,
    }));
  }, [isMobile, numSquares, getPos, duration, maxOpacity]);

  // Handle container resize with debounce and ResizeObserver
  useEffect(() => {
    let mounted = true;
    
    const updateDimensions = () => {
      if (!mounted || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    // Initial update
    updateDimensions();

    // Use ResizeObserver for more efficient resize handling
    if (typeof ResizeObserver !== 'undefined') {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      
      resizeObserverRef.current = new ResizeObserver((entries) => {
        if (!mounted || !Array.isArray(entries) || !entries.length) return;
        
        const now = performance.now();
        if (now - lastUpdateTime.current > 100) { // 100ms debounce
          lastUpdateTime.current = now;
          updateDimensions();
        }
      });

      if (containerRef.current) {
        resizeObserverRef.current.observe(containerRef.current);
      }
    }

    // Fallback for browsers without ResizeObserver
    const handleResize = () => {
      if (!mounted) return;
      
      const now = performance.now();
      if (now - lastUpdateTime.current > 100) {
        lastUpdateTime.current = now;
        updateDimensions();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      mounted = false;
      
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  // Skip animation if reduced motion is preferred or on mobile
  if (shouldReduceMotion || !shouldAnimate) {
    return (
      <svg
        ref={containerRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full",
          "[mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={`static-grid-${id}`}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <rect
              width={width}
              height={height}
              fill="currentColor"
              className="text-[#8BAE66]/10"
            />
            <path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[#8BAE66]/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#static-grid-${id})`} />
      </svg>
    );
  }

  // Render the animated grid pattern
  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        "[mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={`grid-pattern-${id}`}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <rect
            width={width}
            height={height}
            fill="currentColor"
            className="text-[#8BAE66]/10"
          />
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[#8BAE66]/20"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#grid-pattern-${id})`} />

      {/* Animated squares */}
      {squares.map((square) => (
        <motion.rect
          key={square.id}
          x={square.pos[0] * width}
          y={square.pos[1] * height}
          width={width - 1}
          height={height - 1}
          fill="currentColor"
          className="text-[#8BAE66]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, square.opacity, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: square.duration,
            delay: square.delay,
            repeat: Infinity,
            repeatDelay: repeatDelay,
            ease: "easeInOut",
          }}
          style={{
            willChange: 'opacity, transform',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
          }}
        />
      ))}
    </svg>
  );
}
