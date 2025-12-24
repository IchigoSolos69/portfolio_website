import * as React from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "../../lib/utils" // Ensure this path matches your project
import { LucideIcon } from "lucide-react"

// --- Hook: Track Active Section on Scroll ---
const useActiveSection = (ids: string[]) => {
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when section is in middle of viewport
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
};

// --- Interfaces ---
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
  isActive?: boolean // Added prop
  onClick?: () => void
  className?: string
}

// --- Animation Variants ---
const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// --- Icon Component ---
const DockIconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, DockIconButtonProps>(
  ({ icon: Icon, label, href, onClick, isActive, className }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Combine Hover and Active states for the styling
    const isActiveOrHovered = isHovered || isActive;

    const content = (
      <>
        <Icon className={cn(
          "w-5 h-5 transition-all duration-300",
          isActiveOrHovered 
            ? "text-[#EBD5AB] drop-shadow-[0_0_8px_rgba(235,213,171,0.6)]" // Glow on active
            : "text-[#8BAE66]/60"
        )} />
        
        {/* Active Indicator Dot (Optional: Shows a tiny dot below active icon) */}
        {isActive && !isHovered && (
           <motion.div 
             layoutId="activeDockDot"
             className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#EBD5AB]"
           />
        )}

        <AnimatePresence>
          {isHovered && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pt-3 pointer-events-none">
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 12, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="w-[1px] bg-gradient-to-b from-[#8BAE66] to-transparent mb-1"
              />
              <motion.div 
                initial={{ y: -4, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -4, opacity: 0, scale: 0.9 }}
                className="bg-[#1B211A]/90 border border-[#8BAE66]/20 px-3 py-1 rounded-full backdrop-blur-md shadow-xl"
              >
                {/* Kept sans-serif for readability at small size */}
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#EBD5AB] whitespace-nowrap block">
                  {label}
                </span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );

    const commonClasses = cn(
      "relative group p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-500",
      isActive ? "bg-white/10 border border-[#EBD5AB]/10" : "hover:bg-white/5 border border-transparent",
      className
    );

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={commonClasses}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as any}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        className={commonClasses}
      >
        {content}
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

// --- Main Dock Component ---
const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    // 1. Extract IDs from hrefs (e.g., "#projects" -> "projects")
    const sectionIds = React.useMemo(() => 
      items
        .map(item => item.href?.replace('#', ''))
        .filter((id): id is string => !!id),
      [items]
    );

    // 2. Get currently active section
    const activeSection = useActiveSection(sectionIds);

    return (
      <div ref={ref} className={cn("fixed top-6 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none", className)}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          className={cn(
            "flex items-center gap-2 p-2 rounded-[24px] pointer-events-auto",
            "bg-[#1B211A]/60 backdrop-blur-md", 
            "border border-[#EBD5AB]/5",
            "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
            "hover:border-[#8BAE66]/20 hover:bg-[#1B211A]/80 transition-colors duration-500"
          )}
        >
          {items.map((item) => {
            // Check if this item matches the active section
            const itemId = item.href?.replace('#', '');
            const isActive = itemId === activeSection;

            return (
              <DockIconButton 
                key={item.label} 
                {...item} 
                isActive={isActive}
              />
            );
          })}
        </motion.div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock }