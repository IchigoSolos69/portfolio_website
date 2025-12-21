
import React, { useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass } from 'lucide-react';

const Journey: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
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
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-6">Chronicles</h2>
          <div className="flex items-center gap-4 mb-8">
              <Compass className="text-[#8BAE66]" size={32} />
              <h3 className="text-4xl md:text-5xl font-bold font-heading text-[#EBD5AB]">My Journey</h3>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-16 relative">
          {/* Animated path line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-[#EBD5AB]/10" />
          <motion.div 
            style={{ scaleY: lineScaleY, originY: 0 }}
            className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#8BAE66] to-[#EBD5AB]" 
          />
          
          {PORTFOLIO_DATA.journey.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative pl-12 group"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 border-[#8BAE66] bg-[#1B211A] group-hover:bg-[#EBD5AB] group-hover:border-[#EBD5AB] transition-all duration-500 shadow-[0_0_10px_rgba(139,174,102,0.3)] group-hover:shadow-[0_0_20px_rgba(235,213,171,0.5)] z-10" 
              />
              
              <span className="text-xs font-bold tracking-widest text-[#8BAE66] uppercase mb-2 block">{item.year}</span>
              <h4 className="text-2xl font-bold text-[#EBD5AB] mb-1">{item.title}</h4>
              <p className="text-[#8BAE66]/80 font-medium mb-3 text-sm">{item.company}</p>
              <p className="text-[#EBD5AB]/50 font-light leading-relaxed max-w-2xl">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
