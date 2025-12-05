import React from 'react';
import { motion } from 'framer-motion';

interface SmoothPageTransitionProps {
  children: React.ReactNode;
  currentPage: string;
  backgroundColors: Record<string, string>;
}

const SmoothPageTransition: React.FC<SmoothPageTransitionProps> = ({ 
  children, 
  currentPage,
  backgroundColors
}) => {
  const currentColor = backgroundColors[currentPage] || '#0f172a';

  return (
    <motion.div
      className="relative min-h-screen"
      style={{
        backgroundColor: currentColor,
      }}
      animate={{
        backgroundColor: currentColor,
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default SmoothPageTransition;

