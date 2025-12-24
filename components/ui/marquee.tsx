import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
  className?: string
  fadeWidth?: string // New prop to control fade size
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  fadeWidth = "10%", // Default 10% fade on edges
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("w-full overflow-hidden z-10", className)}
      style={{
        // 1. mask-image creates the soft fade effect on left/right
        maskImage: `linear-gradient(to right, transparent, black ${fadeWidth}, black calc(100% - ${fadeWidth}), transparent)`,
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeWidth}, black calc(100% - ${fadeWidth}), transparent)`,
      }}
      {...props}
    >
      <div 
        className={cn(
          "flex w-max min-w-full shrink-0 items-center gap-8 animate-marquee", 
          pauseOnHover && "hover:[animation-play-state:paused]",
          direction === "right" && "animate-marquee-reverse"
        )}
        style={{ 
          "--duration": `${speed}s`,
          // 2. Performance hint for browsers
          willChange: "transform" 
        } as React.CSSProperties}
      >
          {children}
          {children}
      </div>
    </div>
  )
}