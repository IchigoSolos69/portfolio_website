import React, { forwardRef, memo } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  className?: string;
}

// 1. Use forwardRef to allow animations from parent
const StatCard = forwardRef<HTMLDivElement, StatCardProps>(({ label, value, className }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`p-6 bg-gray-800 rounded-lg shadow-lg ${className}`}
    >
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );
});

StatCard.displayName = "StatCard";

// 2. Export with memo to prevent unnecessary re-renders
export default memo(StatCard);