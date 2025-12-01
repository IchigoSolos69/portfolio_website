import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-white to-blue-50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Hi, I'm <span className="text-gradient">Adi Rajendra Maitre</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl text-dark mb-6"
            >
              Full Stack Developer & AI Enthusiast
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. 
              Even if you don't hire me, these qualities are always in my work.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#contact" className="btn-primary flex items-center justify-center">
                <FiMail className="mr-2" /> Contact Me
              </a>
              <a href="#" className="btn-secondary flex items-center justify-center">
                <FiDownload className="mr-2" /> Download CV
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center lg:justify-start space-x-6 mt-8"
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
                <FiGithub className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
                <FiLinkedin className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-primary text-white py-2 px-6 rounded-lg shadow-lg">
              <span className="font-bold">5+ Years</span> Experience
            </div>
            
            <div className="absolute -top-4 -left-4 bg-accent text-white py-2 px-6 rounded-lg shadow-lg animate-float">
              <span className="font-bold">100+ Projects</span> Completed
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
