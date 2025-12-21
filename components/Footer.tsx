
import React, { useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const blobY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [180, 0]);
  
  // Extra subtle grid backdrop parallax
  const bgGridY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <footer id="contact" ref={containerRef} className="py-32 border-t border-[#EBD5AB]/5 bg-[#1B211A] relative overflow-hidden">
      {/* Footer Parallax Background Elements */}
      <motion.div 
        style={{ y: blobY }}
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#8BAE66]/5 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-150, 150]) }}
        className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-[#EBD5AB]/3 blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* Decorative Parallax Grid Backdrop */}
      {/* Fixed: Moved 'sx' styles to 'style' prop as 'sx' is not a valid prop for motion.div */}
      <motion.div 
        style={{ 
          y: bgGridY,
          backgroundImage: `linear-gradient(#EBD5AB 1px, transparent 1px), linear-gradient(90deg, #EBD5AB 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div style={{ y: contentY }} className="max-w-md">
            <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-8">The Dialogue</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading mb-10 leading-tight">
                Let's initiate a <span className="italic text-[#8BAE66]">collaboration</span>.
            </h3>
            <p className="text-[#EBD5AB]/50 text-lg mb-12 font-light">
              Always open to discussing new frontiers, emerging technologies, and organic design systems.
            </p>
            <div className="space-y-6">
              <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="group flex items-center space-x-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-[#8BAE66]/20 group-hover:bg-[#8BAE66]/10 transition-all duration-500">
                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8BAE66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span className="text-2xl font-bold tracking-tight text-[#EBD5AB] group-hover:text-[#8BAE66] transition-colors">{PORTFOLIO_DATA.contact.email}</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: gridY }}
            className="glass p-12 rounded-[40px] border-[#8BAE66]/10 relative overflow-hidden shadow-2xl shadow-black/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8BAE66]/5 to-transparent pointer-events-none" />
            
            <h3 className="relative z-10 text-xs font-bold uppercase tracking-[0.4em] text-[#8BAE66] mb-10">Connected Networks</h3>
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { name: 'Github', icon: 'github', url: `https://${PORTFOLIO_DATA.contact.github}` },
                { name: 'LinkedIn', icon: 'linkedin', url: `https://${PORTFOLIO_DATA.contact.linkedin}` },
                { name: 'Twitter', icon: 'twitter', url: `https://${PORTFOLIO_DATA.contact.twitter}` },
                { name: 'Instagram', icon: 'instagram', url: '#' }
              ].map(social => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#8BAE66]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EBD5AB]/5 group-hover:bg-[#8BAE66]/20 transition-all duration-500">
                    <img src={`https://cdn.simpleicons.org/${social.icon}/EBD5AB`} alt={social.name} className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-widest text-[#EBD5AB]/40 group-hover:text-[#EBD5AB] transition-colors">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-32 pt-10 border-t border-[#EBD5AB]/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.3em] text-[#EBD5AB]/30 font-bold">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.name}. Organic Systems V3.0</p>
          <div className="flex items-center space-x-10">
             <a href="#" className="hover:text-[#8BAE66] transition-colors">Manifesto</a>
             <a href="#" className="hover:text-[#8BAE66] transition-colors">Digital Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
