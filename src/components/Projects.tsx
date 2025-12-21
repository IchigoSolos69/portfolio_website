
import React, { useMemo, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { AnimatedTabs } from './ui/animated-tabs';

const ProjectCard: React.FC<{ project: typeof PORTFOLIO_DATA.projects[0] }> = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative glass rounded-[40px] overflow-hidden border-[#EBD5AB]/5 hover:border-[#8BAE66]/30 transition-all duration-700 flex flex-col lg:flex-row min-h-[400px]"
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
    >
      <div className="lg:w-1/2 overflow-hidden h-64 lg:h-auto">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
        />
      </div>

      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-transparent to-[#628141]/5">
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
          <a 
            href={project.link} 
            className="group/btn flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-[#8BAE66] hover:text-[#EBD5AB] transition-colors"
          >
            Launch Prototype
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#EBD5AB]/30 hover:text-[#EBD5AB] transition-colors">
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotateShard = useTransform(scrollYProgress, [0, 1], [0, 45]);

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
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      )
    }));
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-[#1B211A] relative overflow-hidden">
      {/* Subtle background parallax elements */}
      <motion.div 
        style={{ y: bgY, rotate: rotateShard }}
        className="absolute top-1/3 -right-20 w-96 h-96 border border-[#8BAE66]/5 rounded-[80px] pointer-events-none opacity-20" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        className="absolute bottom-1/4 -left-10 w-64 h-64 border border-[#EBD5AB]/5 rounded-full pointer-events-none opacity-10" 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8 border-b border-[#EBD5AB]/5 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-6">The Legacy</h2>
            <h3 className="text-5xl md:text-7xl font-bold font-heading text-[#EBD5AB]">
                Selected <span className="italic text-[#8BAE66]">Works</span>.
            </h3>
          </div>
          <p className="text-[#EBD5AB]/40 max-w-sm font-light leading-relaxed text-lg">
            A curated intersection of industrial engineering and organic human interaction.
          </p>
        </div>

        <AnimatedTabs tabs={tabs} />
      </div>
    </section>
  );
};

export default Projects;
