
import * as React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "../../lib/utils"
import { LucideIcon } from "lucide-react"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    href?: string
    onClick?: () => void
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
  className?: string
}

// Added explicit Variants type to prevent string widening for the 'ease' property
const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const DockIconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, DockIconButtonProps>(
  ({ icon: Icon, label, href, onClick, className }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const content = (
      <>
        <Icon className={cn(
          "w-5 h-5 transition-colors duration-300",
          isHovered ? "text-[#EBD5AB]" : "text-[#8BAE66]"
        )} />
        
        <AnimatePresence>
          {isHovered && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pt-2 pointer-events-none">
              {/* Separator */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                className="w-8 h-[1px] bg-[#8BAE66] mb-1.5"
              />
              {/* Label */}
              <motion.span 
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#EBD5AB] whitespace-nowrap"
              >
                {label}
              </motion.span>
            </div>
          )}
        </AnimatePresence>
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={cn(
            "relative group p-4 rounded-xl flex flex-col items-center justify-center",
            "hover:bg-[#628141]/20 transition-all duration-300",
            className
          )}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as any}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        className={cn(
          "relative group p-4 rounded-xl flex flex-col items-center justify-center",
          "hover:bg-[#628141]/20 transition-all duration-300",
          className
        )}
      >
        {content}
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("fixed top-8 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none", className)}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          className={cn(
            "flex items-center gap-2 p-2 rounded-2xl pointer-events-auto",
            "glass border-[#EBD5AB]/10 shadow-2xl shadow-black/40",
            "bg-[#1B211A]/90 backdrop-blur-xl",
            "hover:border-[#8BAE66]/30 transition-all duration-500"
          )}
        >
          {items.map((item) => (
            <DockIconButton key={item.label} {...item} />
          ))}
        </motion.div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock }
