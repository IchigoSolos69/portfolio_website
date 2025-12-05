import React from 'react';
import { motion } from 'framer-motion';

interface SectionSeparatorProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ 
  children, 
  id,
  className = ''
}) => {
  return (
    <motion.section
      id={id}
      className={`relative py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionSeparator;

