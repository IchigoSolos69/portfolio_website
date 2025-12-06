"use client";

import { useEffect, useId, useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
}

interface Square {
  id: number;
  pos: [number, number];
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
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Memoize mobile detection
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [checkMobile]);

  // Memoize position calculation
  const getPos = useCallback((): [number, number] => {
    if (!dimensions.width || !dimensions.height) return [0, 0];
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }, [dimensions, width, height]);

  // Memoize square generation
  const generateSquares = useCallback((count: number): Square[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }, [getPos]);

  // Optimize: Reduce number of squares on mobile
  const optimizedNumSquares = useMemo(() => {
    return isMobile ? Math.floor(numSquares * 0.6) : numSquares;
  }, [isMobile, numSquares]);

  const [squares, setSquares] = useState<Square[]>([]);

  // Batch square position updates using requestAnimationFrame
  const updateSquarePosition = useCallback((id: number) => {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(() => {
        setSquares((currentSquares) =>
          currentSquares.map((sq) =>
            sq.id === id
              ? {
                  ...sq,
                  pos: getPos(),
                }
              : sq,
          ),
        );
        animationFrameRef.current = null;
      });
    }
  }, [getPos]);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(optimizedNumSquares));
    }
  }, [dimensions, optimizedNumSquares, generateSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to batch dimension updates
      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(() => {
          for (let entry of entries) {
            setDimensions({
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            });
          }
          animationFrameRef.current = null;
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  // Reduce animation intensity on mobile
  const reducedDuration = useMemo(() => isMobile ? duration * 1.5 : duration, [isMobile, duration]);
  const reducedMaxOpacity = useMemo(() => isMobile ? maxOpacity * 0.7 : maxOpacity, [isMobile, maxOpacity]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      style={{
        contain: 'layout style paint',
        willChange: 'contents',
      }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: reducedMaxOpacity }}
            transition={{
              duration: reducedDuration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse" as const,
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${id}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="currentColor"
            strokeWidth="0"
            style={{
              willChange: 'opacity',
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            }}
          />
        ))}
      </svg>
    </svg>
  );
}
