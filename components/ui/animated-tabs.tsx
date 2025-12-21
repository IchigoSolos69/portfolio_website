
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    id: "tab1",
    label: "Tab 1",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?q=80&w=1200&auto=format&fit=crop"
          alt="Tab 1"
          className="rounded-2xl w-full h-60 object-cover shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />
        <div className="flex flex-col justify-center gap-y-2">
          <h2 className="text-2xl font-bold text-white">Tab 1 Content</h2>
          <p className="text-sm text-[#EBD5AB]/70">
            Showcasing how the animated tabs work with a clean two-column layout for details.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?q=80&w=1200&auto=format&fit=crop"
          alt="Tab 2"
          className="rounded-2xl w-full h-60 object-cover shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />
        <div className="flex flex-col justify-center gap-y-2">
          <h2 className="text-2xl font-bold text-white">Tab 2 Content</h2>
          <p className="text-sm text-[#EBD5AB]/70">
            Beautifully integrated transitions for a high-end portfolio feel.
          </p>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-6", className)}>
      <div className="flex gap-2 flex-wrap bg-[#11111198] bg-opacity-50 backdrop-blur-sm p-1.5 rounded-2xl w-fit self-center lg:self-start border border-[#EBD5AB]/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl text-[#EBD5AB]/60 outline-none transition-colors hover:text-[#EBD5AB]",
              activeTab === tab.id && "text-[#EBD5AB]"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#628141]/30 shadow-[0_0_20px_rgba(98,129,65,0.2)] backdrop-blur-md rounded-xl border border-[#8BAE66]/20"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-1 min-h-[400px]">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.98,
                  y: 10,
                  filter: "blur(4px)",
                }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, y: 10, filter: "blur(4px)" }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
