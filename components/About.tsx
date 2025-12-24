import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code2, Cpu, Globe, Zap } from 'lucide-react';

// --- Utility Hook for Media Query ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

// --- Optimized StatCard Component ---
const StatCard = React.memo(({ icon: Icon, label, value, delay }: { icon: any, label: string, value: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-4 p-4 rounded-2xl bg-[#EBD5AB]/5 border border-[#EBD5AB]/10 hover:bg-[#EBD5AB]/10 transition-colors duration-300"
  >
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#8BAE66]/20 text-[#8BAE66]">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-[10px] uppercase tracking-widest text-[#EBD5AB]/40 font-bold">{label}</div>
      <div className="text-[#EBD5AB] font-medium">{value}</div>
    </div>
  </motion.div>
));

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // 1. Track Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Starts when section enters view, ends when it leaves
  });

  // 2. Smooth the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Define Transforms (Top Level - No conditionals here)
  // We increased the range [150, -150] to make the effect more obvious
  const y1 = useTransform(smoothProgress, [0, 1], [150, -150]);
  const y2 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 5]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 bg-[#1B211A] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
           className="absolute inset-0 opacity-[0.03]"
        />
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#EBD5AB]/5 blur-[120px] will-change-transform" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#8BAE66]/5 blur-[120px] will-change-transform" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Narrative */}
          <motion.div 
            style={{ y: isMobile ? 0 : y1 }} // Conditional Parallax
            className="lg:col-span-7"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-8"
            >
              The Persona
            </motion.h2>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold font-heading mb-10 leading-[1.1] text-[#EBD5AB]"
            >
              Blending <span className="italic text-[#8BAE66]">logic</span> with <br />
              visual <span className="font-serif italic font-light">storytelling</span>.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl text-[#EBD5AB]/70 font-light leading-relaxed">
                I am an IT student and a self-described "Code Shinigami" solely dedicated to slicing through complex bugs and bringing order to the digital Soul Society.
              </p>
              
              <div className="pl-6 border-l-2 border-[#8BAE66]/30">
                <p className="text-lg text-[#EBD5AB]/60 italic leading-relaxed">
                  "I am a builder by nature, constantly breaking and remixing projects in the pursuit of a true <span className="text-[#8BAE66] font-bold not-italic">BANKAI</span> of perfect UI, where high-level functionality meets seamless aesthetics."
                </p>
              </div>

              <p className="text-lg text-[#EBD5AB]/50">
                ~ When the logic is flawless and the execution is peak, that's my Bankai.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Character Stats */}
          <motion.div 
            style={{ y: isMobile ? 0 : y2 }} // Conditional Parallax
            className="lg:col-span-5 relative"
          >
            <motion.div 
              style={{ rotate: isMobile ? 0 : rotate }} // Conditional Rotation
              className="relative z-10 bg-[#1B211A]/80 backdrop-blur-xl border border-[#EBD5AB]/10 p-8 rounded-[40px] shadow-2xl shadow-black/20"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-[#EBD5AB]/10 pb-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[#EBD5AB]/40 uppercase">System Status</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8BAE66] animate-pulse" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4">
                <StatCard icon={Code2} label="Class" value="Squad 12 - R&D" delay={0.4} />
                <StatCard icon={Zap} label="Ability" value="Shunpo - Rapid Dev" delay={0.5} />
                <StatCard icon={Globe} label="Location" value="Pune, IN" delay={0.6} />
                <StatCard icon={Cpu} label="Current Focus" value="Achieving Bankai" delay={0.7} />
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-[#EBD5AB]/10 flex justify-between items-end opacity-50">
                 <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5b/Barcode_EAN8.svg')] bg-repeat-x bg-contain opacity-50 grayscale invert" />
                 <span className="text-[14px] font-mono text-[#8BAE66]">ID: SHINIGAMI-{new Date().getFullYear()-2006}{" "}</span>
              </div>
            </motion.div>
            
            {/* Background Accent */}
            <div className="absolute top-10 -right-10 w-full h-full border border-[#8BAE66]/10 rounded-[40px] -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;