
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Compass } from 'lucide-react';

const About: React.FC = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 bg-[#1B211A] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#EBD5AB] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#8BAE66] blur-[120px]" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mb-32">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.6em] uppercase text-[#8BAE66] mb-8"
          >
            The Persona
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-heading mb-12 leading-[1.1] text-[#EBD5AB]"
          >
            Blending <span className="italic text-[#8BAE66]">logic</span> with <br />
            visual <span className="font-light">storytelling</span>.
          </motion.h3>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl text-[#EBD5AB]/70 font-light leading-relaxed max-w-3xl"
          >
            I am a IT student and a self described "Code Shinigami" solely dedicated to slicing through all the complex bugs and bringing order to t the digital Soul Society. I am a builder by nature, constantly breaking and remixing projects in the pursuit of true <span className="italic text-[#8BAE66]">"BANKAI"</span> of perfect UI, where high level functionality meets seamless aesthetics.
            <br /><br />
            I am here to leave a lasting imprint on the cloud. 
            <br />
            ~ When the logic is flawless and the execution is peak, that's my Bankai.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
