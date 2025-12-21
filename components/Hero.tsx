import React from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { EtheralShadow } from './ui/etheral-shadow';
import { motion } from 'framer-motion';
import { MouseFollowingEyes } from './ui/mouse-following-eyes';

const Hero: React.FC = () => {
  const profileImage = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800";

  return (
    <section 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#1B211A]"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <EtheralShadow
          color="rgba(98, 129, 65, 0.15)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
        >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 tracking-tight text-[#EBD5AB]">
              Hi, I'm {PORTFOLIO_DATA.name}.
            </h1>
            
            <motion.div 
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center gap-4 mb-10"
            >
                <div className="w-6 md:w-10 h-[1px] bg-[#EBD5AB]/40"></div>
                <p className="text-lg md:text-xl text-[#EBD5AB] font-light italic border-b border-[#EBD5AB]/20 pb-1 px-2">
                  "Building the plane while I fly it."
                </p>
                <div className="w-6 md:w-10 h-[1px] bg-[#EBD5AB]/40"></div>
            </motion.div>

            {/* Centralized Photo with Interactive Eyes */}
            <div className="relative mb-12">
              <MouseFollowingEyes 
                imageUrl={profileImage} 
                className="flex items-center justify-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                    href="#projects"
                    className="group relative px-10 py-4 overflow-hidden rounded-full border border-[#EBD5AB]/20 hover:border-[#EBD5AB] transition-all duration-500"
                >
                    <span className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase text-[#EBD5AB]">
                        Explore Work
                    </span>
                    <div className="absolute inset-0 bg-[#EBD5AB] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="absolute inset-0 flex items-center justify-center z-20 text-xs font-bold tracking-[0.3em] uppercase text-[#1B211A] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        Explore Work
                    </span>
                </a>
            </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 group">
         <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#EBD5AB]">Scroll</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-[#EBD5AB] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;