"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
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

export function ProjectStatusCard({
  title,
  progress,
  dueDate,
  contributors,
  tasks,
  githubStars,
  openIssues,
  isExpanded,
  onToggle,
}: ProjectStatusCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const animatedHeight = useSpring(0, { stiffness: 300, damping: 30 });
  const expanded = typeof isExpanded === "boolean" ? isExpanded : internalExpanded;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded, animatedHeight]);

  const handleToggle = () => {
    if (typeof isExpanded === "boolean") {
      onToggle?.();
    } else {
      setInternalExpanded((prev) => !prev);
      onToggle?.();
    }
  };

  return (
    <Card
      className="w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg bg-slate-900/80 border border-slate-700 text-slate-100"
      onClick={handleToggle}
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
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-slate-700 text-slate-200 hover:bg-slate-800"
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
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} className="h-2 bg-slate-800" />
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-2"
                  >
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
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                  <Avatar className="border-2 border-slate-900">
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
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Discussion
                      </Button>
                    </div>
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
}
