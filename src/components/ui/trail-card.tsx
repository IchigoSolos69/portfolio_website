// components/ui/trail-card.tsx
import * as React from "react";
import { motion, type HTMLMotionProps, useMotionValue, useTransform } from "framer-motion";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// Define the props interface for type safety and reusability
interface TrailCardProps extends HTMLMotionProps<"div"> {
  imageUrl: string;
  mapImageUrl: string;
  title: string;
  location: string;
  difficulty: string;
  creators: string;
  distance: string;
  elevation: string;
  duration: string;
  onContactClick?: () => void;
}

// Define stat item component for DRY principle
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const TrailCard = React.forwardRef<HTMLDivElement, TrailCardProps>(
  (
    {
      className,
      imageUrl,
      mapImageUrl,
      title,
      location,
      difficulty,
      creators,
      distance,
      elevation,
      duration,
      onContactClick,
      ...props
    },
    ref
  ) => {
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotateAmountX = ((y - midY) / midY) * -4;
      const rotateAmountY = ((x - midX) / midX) * 4;

      rotateX.set(rotateAmountX);
      rotateY.set(rotateAmountY);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY }}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl bg-transparent text-card-foreground shadow-xl",
          "transition-transform duration-300 will-change-transform",
          className
        )}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Top section with background image and content */}
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
            <div className="text-white">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-white/90">{location}</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={onContactClick}
                aria-label={`Contact ${title}`}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md"
              >
                Contact Me
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom section with details */}
        <div className="p-5 bg-slate-900/70 backdrop-blur-md border border-white/10 border-t-0 rounded-b-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-foreground">{difficulty}</p>
              <p className="text-xs text-muted-foreground">{creators}</p>
            </div>
          </div>
          <div className="my-4 h-px w-full bg-border" />
          <div className="flex justify-between">
            <StatItem label="Education" value={distance} />
            <StatItem label="Focus" value={elevation} />
            <StatItem label="Availability" value={duration} />
          </div>
        </div>
      </motion.div>
    );
  }
);

TrailCard.displayName = "TrailCard";

export { TrailCard };
