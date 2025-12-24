import React from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { EtheralShadow } from './ui/etheral-shadow';
import { motion } from 'framer-motion';
import { MouseFollowingEyes } from './ui/mouse-following-eyes';

const Hero: React.FC = () => {
  const profileImage = "/assets/avatars/avatar.png";

  return (
    <section 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#1B211A]"
    >
      {/* 1. Background Layer - Adjusted speed for a more "organic" feel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <EtheralShadow
          color="rgba(139, 174, 102, 0.12)" // Slightly more green to match #8BAE66
          animation={{ scale: 120, speed: 60 }} // Slower speed is less distracting for text
          noise={{ opacity: 0.8, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center max-w-4xl"
        >
          {/* 2. Headline - Added responsive tracking and leading */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-heading mb-6 tracking-tighter text-[#EBD5AB] leading-none">
            Hi, I'm {PORTFOLIO_DATA.name}.
          </h1>
          
          {/* 3. Quote Section - Refined for better legibility */}
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="hidden sm:block w-12 h-[1px] bg-[#EBD5AB]/20"></div>
            <p className="text-base md:text-lg text-[#EBD5AB]/70 font-light italic tracking-wide">
              "Tactics without strategy is the noise before defeat." 
              <span className="ml-2 non-italic font-bold text-[#8BAE66]">— Sun Tzu</span>
            </p>
            <div className="hidden sm:block w-12 h-[1px] bg-[#EBD5AB]/20"></div>
          </motion.div>

          {/* 4. Interactive Avatar - Added a subtle glow behind the eyes */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-[#8BAE66]/10 blur-3xl rounded-full scale-75 pointer-events-none" />
            <MouseFollowingEyes 
              imageUrl={profileImage} 
              className="flex items-center justify-center z-10"
            />
          </div>

          {/* 5. Call to Action - Unified button style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#projects"
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-[#EBD5AB]/10 hover:border-[#8BAE66] transition-all duration-700 bg-white/5 backdrop-blur-sm"
            >
              <span className="relative z-10 text-[10px] font-bold tracking-[0.4em] uppercase text-[#EBD5AB] group-hover:text-[#1B211A] transition-colors duration-500">
                Explore Work
              </span>
              <div className="absolute inset-0 bg-[#8BAE66] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]"></div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 6. Scroll Indicator - Matches the Journey timeline line style */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-bold tracking-[0.6em] uppercase text-[#EBD5AB]">Scroll</span>
        <div className="relative w-[1px] h-16 bg-[#EBD5AB]/10 overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#8BAE66] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;