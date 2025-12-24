import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ tabs }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              relative px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-colors duration-300
              ${activeTabId === tab.id ? 'text-[#1B211A]' : 'text-[#EBD5AB]/60 hover:text-[#EBD5AB]'}
            `}
          >
            {activeTabId === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#8BAE66] rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find((t) => t.id === activeTabId)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};