import React, { useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Helper Component for Social Icons ---
const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'LinkedIn':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case 'Github':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'Twitter':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'Instagram':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
        </svg>
      );
    default:
      return null;
  }
};

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const blobY = useTransform(smoothProgress, [0, 1], [150, -150]);
  const contentY = useTransform(smoothProgress, [0, 1], [80, 0]);
  const gridY = useTransform(smoothProgress, [0, 1], [120, 0]);
  const bgGridY = useTransform(smoothProgress, [0, 1], [50, -50]);

  return (
    <footer 
      id="contact" 
      ref={containerRef} 
      className="py-32 border-t border-[#EBD5AB]/5 bg-[#1B211A] relative overflow-hidden"
    >
      {/* 1. Background Parallax Elements */}
      <motion.div 
        style={{ y: blobY }}
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#8BAE66]/5 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(smoothProgress, [0, 1], [-150, 150]) }}
        className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-[#EBD5AB]/3 blur-[120px] rounded-full pointer-events-none"
      />
      
      {/* 2. Decorative Grid Mesh */}
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
          
          {/* 3. Left Side: The Dialogue (Email) */}
          <motion.div style={{ y: contentY }} className="max-w-md relative">
            <h2 className="text-sm font-bold tracking-[0.5em] uppercase text-[#8BAE66] mb-8">
              The Dialogue
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading mb-10 leading-tight text-[#EBD5AB]">
              Let's initiate a <span className="italic text-[#8BAE66] font-serif">collaboration</span>.
            </h3>
            <p className="text-[#EBD5AB]/50 text-lg mb-12 font-light">
              Always open to discussing new frontiers, emerging technologies, and organic design systems.
            </p>
            
            <a 
              href={`mailto:${PORTFOLIO_DATA.contact.email}`} 
              className="group flex items-center space-x-6 w-fit cursor-pointer"
            >
              <div className="relative w-16 h-16">
                 {/* Glow effect behind button */}
                 <div className="absolute inset-0 bg-[#8BAE66] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                 
                 <div className="relative w-full h-full rounded-2xl flex items-center justify-center border border-[#8BAE66]/30 bg-white/5 backdrop-blur-sm group-hover:border-[#EBD5AB]/50 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBD5AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#8BAE66] transition-colors duration-500">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                 </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#EBD5AB] group-hover:text-[#8BAE66] transition-colors duration-300">
                {PORTFOLIO_DATA.contact.email}
              </span>
            </a>
          </motion.div>

          {/* 4. Right Side: Social Grid Card */}
          <motion.div 
            style={{ y: gridY }}
            className="group relative bg-[#1B211A]/80 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-[#8BAE66]/10 overflow-hidden shadow-2xl shadow-black/40 hover:border-[#8BAE66]/30 transition-colors duration-700"
          >
            {/* Inner Card Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8BAE66]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#8BAE66]/20 transition-all duration-700" />
            
            <h3 className="relative z-10 text-xs font-bold uppercase tracking-[0.4em] text-[#8BAE66] mb-10 flex items-center gap-4">
              Connected Networks
              <span className="h-[1px] flex-1 bg-[#8BAE66]/20" />
            </h3>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Github', url: `https://${PORTFOLIO_DATA.contact.github}` },
                { name: 'LinkedIn', url: `https://${PORTFOLIO_DATA.contact.linkedin}` },
                { name: 'Twitter', url: `https://${PORTFOLIO_DATA.contact.twitter}` },
                { name: 'Instagram', url: `https://${PORTFOLIO_DATA.contact.instagram}` }
              ].map(social => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group/item border border-transparent hover:border-[#EBD5AB]/10"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EBD5AB]/5 group-hover/item:bg-[#8BAE66]/20 transition-all duration-300">
                    <SocialIcon 
                      name={social.name} 
                      className="w-5 h-5 text-[#EBD5AB]/60 group-hover/item:text-[#EBD5AB] transition-colors" 
                    />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-widest text-[#EBD5AB]/40 group-hover/item:text-[#EBD5AB] transition-colors">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* 5. Footer Signature (Using the Custom Font) */}
        <div className="mt-32 pt-10 border-t border-[#EBD5AB]/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xl uppercase tracking-[0.3em] text-[#EBD5AB]/30 font-bold">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-motterdam text-[69px] tracking-[0.02em] text-[#EBD5AB] normal-case ml-5">
              {PORTFOLIO_DATA.name}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;