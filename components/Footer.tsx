
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
                { name: 'Twitter', icon: 'x', url: `https://${PORTFOLIO_DATA.contact.twitter}` },
                { name: 'Instagram', icon: 'instagram', url: `https://${PORTFOLIO_DATA.contact.instagram}` }
              ].map(social => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#8BAE66]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EBD5AB]/5 group-hover:bg-[#8BAE66]/20 transition-all duration-500">
                    {social.name === 'LinkedIn' && (
                      <svg className="w-6 h-6 text-[#EBD5AB] opacity-60 group-hover:opacity-100 group-hover:text-[#8BAE66]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                      </svg>
                    )}

                    {social.name === 'Instagram' && (
                      <svg className="w-6 h-6 text-[#EBD5AB] opacity-60 group-hover:opacity-100 group-hover:text-[#8BAE66]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                      </svg>
                    )}

                    {social.name === 'Github' && (
                      <svg className="w-6 h-6 text-[#EBD5AB] opacity-60 group-hover:opacity-100 group-hover:text-[#8BAE66]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
                      </svg>
                    )}

                    {social.name === 'Twitter' && (
                      <svg className="w-6 h-6 text-[#EBD5AB] opacity-60 group-hover:opacity-100 group-hover:text-[#8BAE66]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-bold text-sm uppercase tracking-widest text-[#EBD5AB]/40 group-hover:text-[#EBD5AB] transition-colors">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-32 pt-10 border-t border-[#EBD5AB]/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.3em] text-[#EBD5AB]/30 font-bold">
          <p>© {new Date().getFullYear()} <span className="font-motterdam font-bold text-[14px] tracking-[0.05em] text-[#EBD5AB]/80">
  {PORTFOLIO_DATA.name}
</span>. Organic Systems V3.0</p>
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
