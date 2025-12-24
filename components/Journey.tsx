import React, { useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass } from 'lucide-react';

const Journey: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineScaleY = useTransform(pathLength, [0, 1], [0, 1]);

  return (
    <section id="journey" ref={sectionRef} className="py-32 bg-[#1B211A] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8BAE66]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-6"
          >
            The Chronicles
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <Compass className="text-[#8BAE66]" size={32} />
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-[#EBD5AB]">My Journey</h3>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="max-w-4xl w-full mx-auto relative pl-4 md:pl-0">
          
          {/* THE TRACK (Gray Line) */}
          <div 
            className="absolute left-[11px] top-[12px] bottom-[24px] w-[1px] bg-[#EBD5AB]/10" 
            aria-hidden="true"
          />
          
          {/* THE PROGRESS BAR (Green Line) */}
          <motion.div 
            style={{ scaleY: lineScaleY, originY: 0 }}
            className="absolute left-[11px] top-[12px] bottom-[24px] w-[1px] bg-gradient-to-b from-[#8BAE66] via-[#8BAE66] to-[#EBD5AB] z-10 shadow-[0_0_10px_#8BAE66]" 
          />

          <div className="space-y-16 relative">
            {PORTFOLIO_DATA.journey.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-12 group"
              >
                
                {/* THE NODE (Circle) */}
                <div className="absolute left-0 top-0 w-[24px] h-[24px] rounded-full border-2 border-[#8BAE66] bg-[#1B211A] z-20 transition-all duration-500 shadow-[0_0_10px_rgba(139,174,102,0.2)] group-hover:bg-[#EBD5AB] group-hover:border-[#EBD5AB] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(235,213,171,0.6)]" />

                {/* CONTENT */}
                <div className="flex flex-col">
                  <span className="text-[#8BAE66] text-xs font-bold uppercase tracking-[0.2em] leading-6 mb-1">
                    {item.year}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-[#EBD5AB] group-hover:text-[#FFF4B7]/90 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <span className="text-[#EBD5AB]/60 font-medium italic mb-4 block">
                    {item.company}
                  </span>
                  
                  <p className="text-[#EBD5AB]/70 font-light leading-relaxed max-w-2xl border-l-2 border-[#EBD5AB]/5 pl-4 group-hover:border-[#8BAE66]/30 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;