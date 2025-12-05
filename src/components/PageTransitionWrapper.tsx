import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  backgroundColor: string;
  pageKey: string;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ 
  children, 
  backgroundColor,
  pageKey
}) => {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: { 
          duration: 0.6,
          ease: "easeInOut"
        }
      }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.4 }
      }}
      className="w-full"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;

