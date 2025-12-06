"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
}

// Memoized timeline item component for better performance
const TimelineItem = React.memo(({ 
  item, 
  isMobile 
}: { 
  item: TimelineEntry; 
  isMobile: boolean;
}) => (
  <div
    className={`flex justify-start pt-8 sm:pt-10 md:pt-20 md:gap-10 ${isMobile ? 'px-4' : ''}`}
    style={{ contain: 'layout style' }}
  >
    <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 sm:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
      <div className="h-8 sm:h-10 absolute left-3 md:left-3 w-8 sm:w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
        <div className="h-3 sm:h-4 w-3 sm:w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-1.5 sm:p-2" />
      </div>
      <h3 className="hidden md:block text-lg sm:text-xl md:pl-20 md:text-3xl lg:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
        {item.title}
      </h3>
    </div>

    <div className="relative pl-16 sm:pl-20 pr-4 md:pl-4 w-full">
      <h3 className="md:hidden block text-xl sm:text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
        {item.title}
      </h3>
      {item.content}
    </div>
  </div>
));
TimelineItem.displayName = "TimelineItem";

export const Timeline = React.memo(({ data, title, description }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [checkMobile]);

  // Use ResizeObserver for more efficient height tracking
  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    resizeObserverRef.current = new ResizeObserver(() => {
      // Use requestAnimationFrame to batch updates
      requestAnimationFrame(updateHeight);
    });

    resizeObserverRef.current.observe(ref.current);
    updateHeight(); // Initial measurement

    return () => {
      if (resizeObserverRef.current && ref.current) {
        resizeObserverRef.current.unobserve(ref.current);
      }
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Memoize data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  return (
    <div 
      className="w-full font-sans md:px-10" 
      ref={containerRef}
      style={{ contain: 'layout style' }}
    >
      {(title || description) && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          {title && (
            <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-16 sm:pb-20">
        {memoizedData.map((item, index) => (
          <TimelineItem 
            key={`${item.title}-${index}`}
            item={item} 
            isMobile={isMobile}
          />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              willChange: 'height, opacity',
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
});
Timeline.displayName = "Timeline";

