import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, User, Code, Briefcase, Trophy, Mail } from 'lucide-react';

// Components
import { ScrollManager } from './components/ScrollManager';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Footer from './components/Footer';
import { OrganizationsMarquee } from './components/OrganizationsMarquee';
// 👇 Fixed import (was dock-two)
import { Dock } from './components/ui/dock-two'; 

// Global Background Animation
const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[10%] left-[5%] w-64 h-64 border border-[#8BAE66]/5 rounded-[60px] opacity-20 blur-[1px]"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[40%] right-[10%] w-96 h-96 border border-[#EBD5AB]/5 rounded-full opacity-10 blur-[1px]"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-[20%] left-[15%] w-48 h-48 border border-[#8BAE66]/5 rotate-12 opacity-15 blur-[1px]"
      />
      {/* Global Vignette Overlay to focus eyes on center content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1B211A]/20 to-[#1B211A]/80 pointer-events-none" />
    </div>
  );
};

const App: React.FC = () => {
  const navItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: User, label: "About", href: "#about" },
    { icon: Code, label: "Skills", href: "#skills" },
    { icon: Briefcase, label: "Work", href: "#projects" },
    { icon: Trophy, label: "Journey", href: "#journey" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <ScrollManager>
      <div className="relative min-h-screen bg-[#1B211A] text-[#EBD5AB] selection:bg-[#8BAE66]/30 selection:text-[#EBD5AB] font-sans">
        
        <ParallaxBackground />
        <Dock items={navItems} />
    
        <main className="relative z-10 flex flex-col">
          <Hero />         
          <About />
          <Skills />
          <Projects />
          <Journey />                  
          <OrganizationsMarquee /> 
        </main>
        
        <Footer />
      </div>
    </ScrollManager> 
  );
};

export default App;