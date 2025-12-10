'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { TrailCard } from "@/components/ui/trail-card";
import { Code2, Terminal, Cpu } from "lucide-react"; // Icons for Bento blocks

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const currentYear = new Date().getFullYear();
  const Years = currentYear - 2006;
  const Value = `version ~ ${Years}`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#021526] overflow-hidden">
      
      {/* Background Pattern - Subtle & Technical */}
      <AnimatedGridPattern
        numSquares={isMobile ? 20 : 40}
        maxOpacity={0.05} // Reduced opacity for a cleaner look
        duration={4}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-20%] h-[150%] skew-y-6 opacity-40 text-[#6EACDA]",
        )}
      />

      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header - Centered & Bold */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E2E2B6]">
              About Me
            </h2>
            <div className="w-20 h-1 bg-[#6EACDA] mx-auto"></div>
          </motion.div>
        </div>

        {/* Main Content: Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative (Span 7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Bento Block 1: Who Am I */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-[#03346E]/20 border border-[#6EACDA]/10 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[#6EACDA]/10 flex items-center justify-center mb-4 text-[#6EACDA]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#E2E2B6]">Who am I?</h3>
              <p className="text-[#6EACDA]/90 leading-relaxed text-lg">
                I am a B.Tech IT student and Front-End Developer with a focus on crafting intuitive, 
                pixel-perfect user interfaces. My approach blends <span className="text-[#E2E2B6] font-medium">technical precision</span> with a community-first mindset.
              </p>
            </motion.div>

            {/* Bento Block 3: Philosophy */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl border border-[#6EACDA]/5 bg-gradient-to-br from-[#03346E]/10 to-transparent"
            >
              <div className="flex items-start gap-4">
                 <Code2 className="w-6 h-6 text-[#E2E2B6] mt-1" />
                 <div>
                    <p className="text-[#6EACDA]/80 italic font-light text-lg">
                      "I am constantly iterating on my craft—building, breaking, and remixing—to stay ahead of modern web standards."
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Trail Card (Span 5/12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end lg:sticky lg:top-24">
            <TrailCard
              className="w-full"
              imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
              mapImageUrl="https://i.pinimg.com/1200x/b4/ee/ff/b4eeffec2fcee08a09d1871ccef096e6.jpg"
              title="Adi Maitre"
              creators={Value}
              location="Front-End Developer"
              difficulty="Pune, India"
              distance="B.Tech IT"
              elevation="Learning"
              duration="Patially Available"
              onContactClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;