import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    onClick?: () => void
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-1, 1, -1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Memoized icon button to prevent unnecessary re-renders
const DockIconButton = React.memo(React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className }, ref) => {
    const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick?.();
    }, [onClick]);

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={cn(
          // Larger touch targets on mobile for clarity (minimum 44x44px for accessibility)
          "relative group p-3 sm:p-3 rounded-lg flex flex-col items-center tap-target focus-ring",
          "hover:bg-blue-400/20 transition-colors",
          "min-w-[44px] min-h-[44px] touch-manipulation", // Better touch handling
          className
        )}
        aria-label={label}
        style={{
          willChange: 'transform',
          touchAction: 'manipulation', // Optimize touch interactions
        }}
      >
        <Icon className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
        <span className={cn(
          "absolute top-full mt-2 sm:mt-2 left-1/2 -translate-x-1/2",
          "px-2 py-1 rounded text-xs",
          "bg-popover text-popover-foreground",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity whitespace-nowrap pointer-events-none",
          "z-20"
        )}>
          {label}
        </span>
      </motion.button>
    )
  }
))
DockIconButton.displayName = "DockIconButton"

const Dock = React.memo(React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    const [isMobile, setIsMobile] = React.useState(false);

    const checkMobile = React.useCallback(() => {
      setIsMobile(window.innerWidth < 768);
    }, []);

    React.useEffect(() => {
      checkMobile();
      const handleResize = () => checkMobile();
      window.addEventListener('resize', handleResize, { passive: true });
      return () => window.removeEventListener('resize', handleResize);
    }, [checkMobile]);

    // Memoize items to prevent unnecessary re-renders
    const memoizedItems = React.useMemo(() => items, [items]);

    return (
      <div 
        ref={ref} 
        className={cn("w-full flex items-center justify-center p-2", className)}
        style={{ contain: 'layout style' }}
      >
        <div className="w-full max-w-4xl rounded-2xl flex items-center justify-center relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={floatingAnimation}
            className={cn(
              "flex items-center gap-1 p-2 rounded-2xl",
              "backdrop-blur-lg border shadow-lg",
              "bg-dark/80 border-blue-500/30",
              "hover:shadow-xl transition-shadow duration-300",
              // Keep full scale on mobile so icons stay readable
              isMobile ? "scale-100" : ""
            )}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            }}
          >
            {memoizedItems.map((item) => (
              <DockIconButton key={item.label} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
))
Dock.displayName = "Dock"

export { Dock }
