import React, { useMemo, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import { AnimatedTabs } from './ui/animated-tabs';

const ProjectCard: React.FC<{ project: typeof PORTFOLIO_DATA.projects[0] }> = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      style={{ perspective: "1000px" }}
      className="w-full"
    >
      <motion.div
        className="group relative glass rounded-[40px] overflow-hidden border border-[#EBD5AB]/5 hover:border-[#8BAE66]/30 bg-[#EBD5AB]/5 transition-colors duration-500 flex flex-col lg:flex-row min-h-[400px]"
        whileHover={{ y: -5, rotateX: 1, rotateY: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Image Section */}
        <div className="lg:w-1/2 overflow-hidden h-64 lg:h-auto relative">
          <div className="absolute inset-0 bg-[#1B211A]/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#1B211A]/80 to-[#628141]/5 backdrop-blur-md">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full border border-[#8BAE66]/20 bg-[#628141]/10 text-[#8BAE66] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            
            <h4 className="text-3xl font-bold font-heading mb-4 text-[#EBD5AB] leading-tight">
              {project.title}
            </h4>
            <p className="text-[#EBD5AB]/60 mb-10 font-light leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-8">

            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#EBD5AB]/30 hover:text-[#EBD5AB] transition-colors">
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamic Parallax Values
  const glowY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const shard1Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const shard2Y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const shard3Y = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const shardRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const tabs = useMemo(() => {
    const categories = Array.from(new Set(PORTFOLIO_DATA.projects.map(p => p.category)));
    const allCategories = ["All", ...categories];

    return allCategories.map(cat => ({
      id: cat.toLowerCase(),
      label: cat,
      content: (
        <div className="grid grid-cols-1 gap-12 pt-8">
          {PORTFOLIO_DATA.projects
            .filter(p => cat === "All" || p.category === cat)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      )
    }));
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-[#1B211A] relative overflow-hidden">
          
          {/* 1. Background Elements with Vignette Mask*/}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
               // Soft fade mask for edges so parallax elements fade out gently
               maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
            }}
          >
             {/* Parallax Layers */}
             <motion.div
               style={{ y: glowY, willChange: 'transform' }}
               className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#628141]/5 blur-[150px] rounded-full"
             />
             <motion.div
               style={{ y: shard1Y, rotate: shardRotate, willChange: 'transform' }}
               className="absolute top-20 right-[15%] w-32 h-32 border border-[#8BAE66]/10 rounded-[40px] opacity-20"
             />
             <motion.div
               style={{ y: shard2Y, rotate: useTransform(scrollYProgress, [0, 1], [0, -90]), willChange: 'transform' }}
               className="absolute bottom-40 left-[5%] w-48 h-48 border border-[#EBD5AB]/5 rounded-full opacity-10"
             />
             <motion.div
               style={{ y: shard3Y, willChange: 'transform' }}
               className="absolute top-1/2 right-[5%] w-16 h-16 border-l border-[#8BAE66]/20"
             />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-6 text-center lg:text-left">The Legacy</h2>
                <h3 className="text-4xl md:text-5xl font-bold font-heading text-[#EBD5AB] text-center lg:text-left">
                  Selected <span className="text-[#8BAE66]">Works</span>.
                </h3>
              </motion.div>
            </div>

        <AnimatedTabs tabs={tabs} />
      </div>
    </section>
  );
};

export default Projects;