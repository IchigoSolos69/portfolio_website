"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import {
  Clock,
  GitBranch,
  Github,
  MessageSquare,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress as ProgressBar } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  contributors: Array<{ name: string; image?: string }>;
  tasks: Array<{ title: string; completed: boolean }>;
  githubStars: number;
  openIssues: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}

// Memoized progress bar component for better performance
const OptimizedProgressBar = React.memo(({ value }: { value: number }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress', `${value}%`);
    }
  }, [value]);

  return (
    <div 
      ref={progressRef}
      className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800"
      style={{ 
        contain: 'layout style',
        willChange: 'contents'
      }}
    >
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{
          width: `${value}%`,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
});
OptimizedProgressBar.displayName = "OptimizedProgressBar";

// Memoized contributor avatar component
const ContributorAvatar = React.memo(({ 
  contributor
}: { 
  contributor: { name: string; image?: string };
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar 
          className="border-2 border-slate-900 tap-target focus-ring"
          style={{ willChange: 'transform' }}
        >
          <AvatarImage
            src={
              contributor.image ||
              `/placeholder.svg?height=32&width=32&text=${contributor.name[0]}`
            }
            alt={contributor.name}
          />
          <AvatarFallback>
            {contributor.name[0]}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>
        <p>{contributor.name}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
));
ContributorAvatar.displayName = "ContributorAvatar";

const ProjectStatusCardComponent = ({
  title,
  progress,
  dueDate,
  contributors,
  tasks,
  githubStars,
  openIssues,
  isExpanded,
  onToggle,
}: ProjectStatusCardProps) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const expanded = typeof isExpanded === "boolean" ? isExpanded : internalExpanded;
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Desktop-optimized spring physics: stiffer springs, less damping for snappier animations
  const scaleY = useSpring(0, { 
    stiffness: isMobile ? 280 : 500,  // Increased from 400 to 500 for desktop
    damping: isMobile ? 35 : 20,      // Reduced from 25 to 20 for desktop
    mass: isMobile ? 1 : 0.6,          // Reduced from 0.8 to 0.6 for faster response
    restDelta: 0.001,                  // Higher precision for smoother animations
  });

  // Transform scaleY to opacity for content fade
  const opacity = useTransform(scaleY, [0, 1], [0, 1]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const targetScale = expanded ? 1 : 0;
      scaleY.set(targetScale);
    }
  }, [expanded, scaleY]);

  const handleToggle = useCallback(() => {
    if (typeof isExpanded === "boolean") {
      onToggle?.();
    } else {
      setInternalExpanded((prev) => !prev);
      onToggle?.();
    }
  }, [isExpanded, onToggle]);

  // Memoize expanded content to prevent unnecessary re-renders
  const expandedContent = useMemo(() => (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>Due {dueDate}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            <span>{githubStars}</span>
          </div>
          <div className="flex items-center">
            <GitBranch className="h-4 w-4 mr-1" />
            <span>{openIssues} issues</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-sm flex items-center text-slate-200">
          <Users className="h-4 w-4 mr-2" />
          Contributors
        </h4>
        <div className="flex -space-x-2">
          {contributors.map((contributor, index) => (
            <ContributorAvatar key={index} contributor={contributor} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-sm text-slate-200">Recent Tasks</h4>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-slate-300">{task.title}</span>
            {task.completed && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Button 
          className="w-full bg-primary text-white hover:bg-primary/90 tap-target focus-ring"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          View Discussion
        </Button>
      </div>
    </div>
  ), [dueDate, githubStars, openIssues, contributors, tasks]);

  return (
    <Card
      ref={containerRef}
      className="w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg bg-slate-900/80 border border-slate-700 text-slate-100 touch-action-pan-y focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${title} project card, ${expanded ? 'expanded' : 'collapsed'}. Click to ${expanded ? 'collapse' : 'expand'}.`}
      style={{
        contain: 'layout style',
        willChange: expanded ? 'transform' : 'auto',
      }}
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className={
                progress === 100
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-blue-500/20 text-blue-200"
              }
            >
              {progress === 100 ? "Completed" : "In Progress"}
            </Badge>
            <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-slate-700 text-slate-200 hover:bg-slate-800 tap-target focus-ring"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-300">
              <span>{progress}%</span>
            </div>
            <OptimizedProgressBar value={progress} />
          </div>

          {/* Transform-based scaleY animation instead of height for GPU acceleration */}
          <motion.div
            style={{
              scaleY,
              opacity,
              transformOrigin: 'top',
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
              contain: 'layout style',
              willChange: 'transform, opacity',
            }}
            className="overflow-hidden"
          >
            <div 
              ref={contentRef}
              style={{
                transform: 'translate3d(0, 0, 0)', // Force GPU layer
              }}
            >
              <AnimatePresence mode="wait">
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: isMobile ? 0.3 : 0.2,
                        ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smoother animation
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -10,
                      transition: {
                        duration: isMobile ? 0.25 : 0.15,
                        ease: [0.4, 0, 1, 1],
                      }
                    }}
                    style={{
                      transform: 'translate3d(0, 0, 0)',
                      willChange: 'transform, opacity',
                    }}
                    className="space-y-4 pt-2"
                  >
                    {expandedContent}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between w-full text-sm text-slate-400">
          <span>Last updated: 2 hours ago</span>
          <span>{openIssues} open issues</span>
        </div>
      </CardFooter>
    </Card>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export const ProjectStatusCard = React.memo(ProjectStatusCardComponent, (prevProps, nextProps) => {
  // Custom comparison function for better memoization
  return (
    prevProps.title === nextProps.title &&
    prevProps.progress === nextProps.progress &&
    prevProps.dueDate === nextProps.dueDate &&
    prevProps.githubStars === nextProps.githubStars &&
    prevProps.openIssues === nextProps.openIssues &&
    prevProps.isExpanded === nextProps.isExpanded &&
    JSON.stringify(prevProps.contributors) === JSON.stringify(nextProps.contributors) &&
    JSON.stringify(prevProps.tasks) === JSON.stringify(nextProps.tasks)
  );
});
