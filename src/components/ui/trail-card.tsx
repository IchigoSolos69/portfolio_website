'use client';

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, TrendingUp, Clock, MoveUpRight } from "lucide-react"; // Install lucide-react if needed

interface TrailCardProps extends React.HTMLAttributes<HTMLDivElement> {
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

const StatItem = ({ icon: Icon, label, value }: { icon: any, label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1.5 text-[#E2E2B6]/60">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold text-[#E2E2B6]">{value}</span>
  </div>
);

export function TrailCard({
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
  onContactClick: _onContactClick
}: TrailCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt effect
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center (from -0.5 to 0.5)
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative w-full max-w-[380px] rounded-3xl bg-[#021526] perspective-1000",
        "border border-[#E2E2B6]/10",
        className
      )}
    >
      {/* Glow Effect behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#6EACDA]/20 to-[#E2E2B6]/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full w-full rounded-3xl overflow-hidden bg-[#021526]/80 backdrop-blur-sm shadow-2xl">
        
        {/* Image Section */}
        <div className="relative h-72 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021526]/20 to-[#021526]" z-index={10} />
          <motion.img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            style={{ scale: 1.1 }} // Slight zoom to prevent edge clipping on tilt
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Floating Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#021526]/50 backdrop-blur-md border border-[#E2E2B6]/20 text-xs font-medium text-white">
            {creators}
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-[#021526] to-transparent">
            <h3 className="text-2xl font-bold text-[#E2E2B6] mb-1">{title}</h3>
            <div className="flex items-center gap-2 text-[#6EACDA]">
              <MapPin className="w-4 h-4" />
              <p className="text-sm font-medium">{difficulty}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 pt-2 grid gap-6 relative z-20">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#03346E]/30 border border-[#6EACDA]/10">
            <StatItem icon={TrendingUp} label="Education" value={distance} />
            <StatItem icon={MoveUpRight} label="Focus" value={elevation} />
            <StatItem icon={Clock} label="Status" value={duration} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
               <p className="text-xs text-[#E2E2B6]/60 uppercase tracking-widest mb-1">Current Base</p>
               <p className="text-sm font-medium text-[#E2E2B6]">{location}</p>
            </div>
            
            <div className="h-12 w-24 rounded-lg overflow-hidden border border-[#E2E2B6]/10 relative group/map">
               <img src={mapImageUrl} alt="Mini Map" className="w-full h-full object-cover grayscale group-hover/map:grayscale-0 transition-all duration-300" />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}