import React, { useState, useEffect } from 'react';
import { Cpu, Github, Zap, Mail, Award, Trophy, ChevronDown, Linkedin } from 'lucide-react';

const roles = [
  '学生 | Student ',
  'デベロッパー | Developer ',
  'パートナーシップマネージャー | Partnership Manager ',
  'ブリーチファン | Bleach Fan ',
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(1);

  // Loading sequence with sound effects
  useEffect(() => {
    const phase2Timer = setTimeout(() => {
      setLoadingPhase(2);
      // Play sword slash sound effect with precise timing
      setTimeout(() => {
        const audio = new Audio('/sounds/sword-slash.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Handle autoplay restrictions gracefully
          console.log('Audio autoplay prevented');
        });
      }, 400); // Sync with slash animation start
    }, 3000);
    
    const phase3Timer = setTimeout(() => setLoadingPhase(3), 4500);
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 5500);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(completeTimer);
    };
  }, []);


  // Typing effect
  useEffect(() => {
    if (isLoading) return;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= roles[currentRoleIndex].length) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex));
      timer = setTimeout(() => setCharIndex(charIndex + 1), Math.random() * 100 + 80);
    } else if (!isDeleting && charIndex > roles[currentRoleIndex].length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex));
      timer = setTimeout(() => setCharIndex(charIndex - 1), 50);
    } else if (isDeleting && charIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentRoleIndex, isLoading]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="enhanced-cinematic-loading">
        {/* Phase 1: Cinematic Loading with Spiritual Particles */}
        {loadingPhase === 1 && (
          <div className="loading-phase-1">
            <div className="loading-background"></div>
            
            {/* Spiritual Energy Particles */}
            <div className="spiritual-particles">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="spiritual-particle" 
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }} 
                />
              ))}
            </div>
            
            {/* Spiritual Pulses */}
            <div className="spiritual-pulses">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="spiritual-pulse" 
                  style={{
                    animationDelay: `${i * 0.8}s`
                  }} 
                />
              ))}
            </div>
            
            {/* Loading Content */}
            <div className="loading-content">
              {/* Circular Spinner with Orange Gradient */}
              <div className="spiritual-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-core"></div>
              </div>
              
              {/* Animated Japanese Text */}
              <div className="loading-text">
                <div className="japanese-text glowing">読み込み中...</div>
                <div className="english-text faded">Loading...</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Phase 2: Sword Slash Transition */}
        {loadingPhase === 2 && (
          <div className="slash-phase">
            {/* Dramatic Black Pause */}
            <div className="black-pause"></div>
            
            {/* Diagonal Sword Slash */}
            <div className="sword-slash">
              <div className="slash-line"></div>
              <div className="slash-glow"></div>
              <div className="slash-particles">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="slash-particle" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Phase 3: Reveal with SVG Katana */}
        {loadingPhase === 3 && (
          <div className="reveal-phase">
            {/* Curtain Split Reveal */}
            <div className="curtain-reveal">
              <div className="curtain-left"></div>
              <div className="curtain-right"></div>
            </div>
            
            {/* SVG Katana */}
            <div className="katana-container">
              <svg className="katana-svg" viewBox="0 0 400 40" fill="none">
                <defs>
                  <linearGradient id="katanaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C0C0C0" />
                    <stop offset="30%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FF6B00" />
                  </linearGradient>
                  <filter id="katanaGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Blade */}
                <path d="M60 20 L360 20 L370 15 L380 20 L370 25 L360 20" 
                      stroke="url(#katanaGradient)" 
                      strokeWidth="4" 
                      fill="url(#katanaGradient)" 
                      filter="url(#katanaGlow)"
                      strokeLinecap="round"/>
                
                {/* Handle */}
                <rect x="20" y="15" width="45" height="10" 
                      fill="#2C1810" 
                      rx="3"/>
                
                {/* Guard */}
                <rect x="58" y="12" width="6" height="16" 
                      fill="#8B4513" 
                      rx="2"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent">
                Adi Rajendra Maitre
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center overflow-hidden">
              <span className="border-r-2 border-spiritual-energy animate-blink pr-1 bg-spiritual-gradient bg-clip-text text-transparent flex items-center">
                {typingText}
              </span>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences with precision and passion.
              <span className="text-spiritual-energy japanese-text block mt-2">開発者</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection('about')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50"
            >
              <span className="relative z-10 flex items-center gap-2"><Award className="w-5 h-5" /> About Me</span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25"
            >
              <span className="relative z-10 flex items-center gap-2"><Zap className="w-5 h-5" /> View Projects</span>
            </button>
          </div>

          <div className="mt-12">
            <ChevronDown
              className="w-8 h-8 mx-auto text-spiritual-energy animate-bounce cursor-pointer"
              onClick={() => scrollToSection('about')}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="spiritual-particle animate-float-random" style={{animationDelay: `${i * 0.2}s`}} />
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent animate-gradient-text">
              About Me
            </span>
            <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">私について (About Me)</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Greetings! I'm Adi, a passionate developer wielding the power of code like a Soul Reaper's zanpakuto. 
                Currently pursuing my BTech in Information Technology at PCCOE Akurdi, I balance my studies with my role 
                as Staff & Partnership Manager at Hone.gg.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                My journey spans full-stack development, AI/ML research, and partnership management. Like Ichigo mastering 
                his spiritual pressure, I continuously evolve my technical skills while maintaining strong collaborative relationships.
              </p>
              
              <div className="space-y-4">
                <div className="skill-bar">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium">Full-Stack Development</span>
                    <span className="text-gray-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-2 rounded-full animate-skill-fill" style={{width: '90%'}}></div>
                  </div>
                </div>
                
                <div className="skill-bar">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium">AI/ML Research</span>
                    <span className="text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-reiatsu-glow to-kido-purple h-2 rounded-full animate-skill-fill" style={{width: '85%', animationDelay: '0.2s'}}></div>
                  </div>
                </div>
                
                <div className="skill-bar">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium">Partnership Management</span>
                    <span className="text-gray-400">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-kido-purple to-spiritual-energy h-2 rounded-full animate-skill-fill" style={{width: '95%', animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="grid grid-cols-2 gap-4">
                {['React', 'TypeScript', 'Python', 'Node.js', 'PyQt5', 'Machine Learning', 'Data Analysis', 'Partnership Strategy'].map((skill, idx) => (
                {['React', 'TypeScript', 'Python', 'Node.js', 'PyQt5', 'Machine Learning', 'Data Analysis', 'Partnership Strategy'].map((skill) => (
                  <div key={skill} className="about-skill-box skill-tag group bg-gradient-to-br from-hollow-mask/20 to-soul-society/10 rounded-lg p-4 border border-spiritual-energy/20 hover:border-reiatsu-glow">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent">
              My Projects
            </span>
            <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">プロジェクト</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Chemistry Manual Digitizer",
                description: "PyQt5 application for digitizing chemistry lab manuals with automated data extraction",
                icon: <Cpu className="w-8 h-8" />,
                tech: ["Python", "PyQt5", "Data Processing"],
                github: "https://github.com/adimaitre/chemistry-digitizer",
                status: "Completed"
              },
              {
                title: "Event Analysis Tool",
                description: "Comprehensive data analysis platform for event management and performance metrics",
                icon: <Zap className="w-8 h-8" />,
                tech: ["Python", "Pandas", "Data Visualization"],
                github: "https://github.com/adimaitre/event-analyzer",
                status: "Active"
              },
              {
                title: "Hemoglobin Report Classifier",
                description: "AI-powered medical data classification system for hemoglobin analysis reports",
                icon: <Cpu className="w-8 h-8" />,
                tech: ["Machine Learning", "Python", "Medical AI"],
                github: "https://github.com/adimaitre/hb-classifier",
                status: "Research"
              },
              {
                title: "Hone.gg Platform",
                description: "Gaming platform enhancements and partnership integrations for competitive esports",
                icon: <Trophy className="w-8 h-8" />,
                tech: ["Full-Stack", "Partnership APIs", "Gaming"],
                github: "https://github.com/hone-gg",
                status: "Professional"
              }
            ].map((project, idx) => (
              <div 
                key={project.title} 
                className="project-card group relative bg-gradient-to-br from-hollow-mask/15 to-soul-society/10 rounded-xl p-6 border border-spiritual-energy/20 hover:border-reiatsu-glow transition-all duration-500"
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.1 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-reiatsu-glow/0 via-reiatsu-glow/10 to-reiatsu-glow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-reiatsu-glow/30 to-kido-purple/20 rounded-lg text-reiatsu-glow group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-reiatsu-glow group-hover:text-spiritual-energy transition-colors duration-300">{project.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                          project.status === 'Research' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map(tech => (
                          <span key={tech} className="text-xs px-2 py-1 bg-spiritual-energy/10 text-spiritual-energy rounded border border-spiritual-energy/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <a href={project.github} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-spiritual-energy/20 to-reiatsu-glow/20 rounded-lg text-sm text-spiritual-energy hover:from-spiritual-energy/30 hover:to-reiatsu-glow/30 transition-all duration-300 group-hover:scale-105">
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Achievements Section */}
       <section id="achievements" className="py-20 px-6 relative overflow-hidden">
       <div className="absolute inset-0 pointer-events-none">
         <div className="particle-field">
           {[...Array(25)].map((_, i) => (
             <div key={i} className="spiritual-particle animate-float-random" style={{animationDelay: `${i * 0.25}s`}} />
           ))}
         </div>
       </div>
       
       <h2 className="text-5xl font-bold text-center mb-16 relative z-10">
         <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent animate-gradient-text">
           Achievements
         </span>
         <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">実績</span>
       </h2>
       
       <div className="max-w-6xl mx-auto relative z-10">
         <div className="grid md:grid-cols-2 gap-8">
           {[
             {
               title: "Staff & Partnership Manager",
               organization: "Hone.gg",
               description: "Leading strategic partnerships and platform development for competitive gaming ecosystem",
               icon: <Trophy className="w-8 h-8" />,
               year: "2024",
               type: "Professional"
             },
             {
               title: "BTech Information Technology",
               organization: "PCCOE Akurdi",
               description: "Pursuing advanced studies in IT with focus on software development and emerging technologies",
               icon: <Award className="w-8 h-8" />,
               year: "2022-2026",
               type: "Academic"
             },
             {
               title: "Full-Stack Developer",
               organization: "Multiple Projects",
               description: "Developed comprehensive web applications using modern frameworks and technologies",
               icon: <Zap className="w-8 h-8" />,
               year: "2023-2024",
               type: "Technical"
             },
             {
               title: "AI/ML Research",
               organization: "Medical Data Classification",
               description: "Built machine learning models for medical data classification and analysis",
               icon: <Cpu className="w-8 h-8" />,
               year: "2024",
               type: "Research"
             }
           ].map((achievement, idx) => (
             <div key={achievement.title} className="achievement-card group relative bg-gradient-to-br from-hollow-mask/15 to-soul-society/10 rounded-xl p-6 border border-spiritual-energy/20 hover:border-reiatsu-glow transition-all duration-500 animate-fade-in-up" style={{animationDelay:`${idx*0.15}s`}}>
               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-reiatsu-glow/0 via-reiatsu-glow/10 to-reiatsu-glow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10">
                 <div className="flex items-start gap-4 mb-4">
                   <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-reiatsu-glow/30 to-kido-purple/20 rounded-lg text-reiatsu-glow group-hover:scale-110 transition-transform duration-300">
                     {achievement.icon}
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center justify-between mb-2">
                       <h3 className="text-lg font-bold text-reiatsu-glow group-hover:text-spiritual-energy transition-colors duration-300">{achievement.title}</h3>
                       <span className="text-xs text-gray-400 bg-spiritual-energy/10 px-2 py-1 rounded">{achievement.type}</span>
                     </div>
                     <p className="text-spiritual-energy font-medium text-sm mb-2">{achievement.organization}</p>
                     <p className="text-gray-300 text-sm mb-3 leading-relaxed">{achievement.description}</p>
                     <span className="text-xs text-reiatsu-glow bg-reiatsu-glow/10 px-2 py-1 rounded border border-reiatsu-glow/20">{achievement.year}</span>
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-spiritual-energy">
            Connect With Me
            <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">連絡</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8"></div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a href="mailto:adimaitre56@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Mail className="w-6 h-6 text-spiritual-energy" />
              Email
            </a>
            <a href="https://github.com/adimaitre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Github className="w-6 h-6 text-spiritual-energy" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/adi-maitre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Linkedin className="w-6 h-6 text-spiritual-energy" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-soul-society/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Adi Rajendra Maitre. Crafted with spiritual energy and code.
            <span className="text-spiritual-energy japanese-text block mt-2">魂の力で作られた</span>
          </p>
        </div>
      </footer>

      <style jsx global>{`
        /* Enhanced Cinematic Loading Styles */
        .enhanced-cinematic-loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10000;
          overflow: hidden;
        }

        /* Phase 1: Loading Phase */
        .loading-phase-1 {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease-out;
        }

        .loading-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0f0f23 0%, #16213e 50%, #1a1a2e 100%);
          opacity: 0.9;
        }

        .spiritual-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .spiritual-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, #FFA500 0%, #FF6B00 70%, transparent 100%);
          border-radius: 50%;
          animation: floatParticle linear infinite;
          box-shadow: 0 0 6px #FFA500;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-10vh) scale(1);
          }
          100% {
            transform: translateY(-20vh) scale(0);
            opacity: 0;
          }
        }

        .spiritual-pulses {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spiritual-pulse {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(255, 165, 0, 0.3);
          border-radius: 50%;
          animation: spiritualPulse 2.4s ease-out infinite;
        }

        @keyframes spiritualPulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .loading-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .spiritual-spinner {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .spinner-ring {
          position: absolute;
          inset: 0;
          border: 3px solid transparent;
          border-top: 3px solid #FFA500;
          border-right: 3px solid #FF6B00;
          border-radius: 50%;
          animation: spinRing 1.2s linear infinite;
          filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.5));
        }

        .spinner-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #FFA500 0%, #FF6B00 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulseCore 1.5s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(255, 165, 0, 0.7);
        }

        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulseCore {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        .loading-text {
          text-align: center;
        }

        .japanese-text.glowing {
          font-size: 1.5rem;
          font-weight: 500;
          color: #FFA500;
          text-shadow: 0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.4);
          animation: textGlow 2s ease-in-out infinite alternate;
          margin-bottom: 0.5rem;
        }

        .english-text.faded {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
        }

        @keyframes textGlow {
          0% {
            text-shadow: 0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.4);
          }
          100% {
            text-shadow: 0 0 15px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 165, 0, 0.6);
          }
        }

        /* Phase 2: Sword Slash */
        .slash-phase {
          position: absolute;
          inset: 0;
          background: #000;
        }

        .black-pause {
          position: absolute;
          inset: 0;
          background: #000;
          animation: fadeOut 0.2s ease-out 0.2s forwards;
        }

        .sword-slash {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .slash-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, transparent 0%, transparent 49%, #FFA500 50%, #FFFFFF 51%, transparent 52%, transparent 100%);
          transform: translateX(-100%) translateY(-100%) rotate(45deg) scale(1.5);
          animation: slashMove 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
          filter: blur(0.5px);
        }

        .slash-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, transparent 0%, transparent 48%, rgba(255, 165, 0, 0.8) 50%, rgba(255, 255, 255, 0.9) 51%, rgba(255, 165, 0, 0.8) 52%, transparent 54%, transparent 100%);
          transform: translateX(-100%) translateY(-100%) rotate(45deg) scale(1.5);
          animation: slashMove 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s forwards;
          filter: blur(2px);
        }

        @keyframes slashMove {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg) scale(1.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateX(20%) translateY(20%) rotate(45deg) scale(1.5);
            opacity: 0.8;
          }
        }

        .slash-particles {
          position: absolute;
          inset: 0;
        }

        .slash-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFA500;
          border-radius: 50%;
          top: 20%;
          left: 10%;
          animation: slashParticleMove 1s ease-out forwards;
          box-shadow: 0 0 8px #FFA500;
        }

        @keyframes slashParticleMove {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(10vw, -5vh) scale(1);
          }
          100% {
            transform: translate(80vw, -60vh) scale(0);
            opacity: 0;
          }
        }

        /* Phase 3: Reveal */
        .reveal-phase {
          position: absolute;
          inset: 0;
          background: #000;
        }

        .curtain-reveal {
          position: absolute;
          inset: 0;
        }

        .curtain-left, .curtain-right {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: #000;
          z-index: 10;
        }

        .curtain-left {
          left: 0;
          animation: curtainSlideLeft 1s ease-in-out forwards;
        }

        .curtain-right {
          right: 0;
          animation: curtainSlideRight 1s ease-in-out forwards;
        }

        @keyframes curtainSlideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @keyframes curtainSlideRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }

        .katana-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .katana-svg {
          width: 300px;
          height: 40px;
          animation: katanaAppear 2s ease-out forwards;
          filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.8));
        }

        @keyframes katanaAppear {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) rotate(0deg);
          }
          80% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(1) rotate(0deg);
          }
        }

        /* General Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        /* About Me Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-skill-fill {
          animation: skillFill 1.5s ease-out forwards;
          transform: scaleX(0);
          transform-origin: left;
        }
        
        @keyframes skillFill {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        .particle-field {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .animate-float-random {
          animation: float-random 15s ease-in-out infinite;
        }
        
        @keyframes float-random {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        
        .about-skill-box {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .about-skill-box:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(255, 112, 0, 0.1), 0 10px 10px -5px rgba(255, 112, 0, 0.04);
        }
      `}</style>
    </div>
  );
};

export default Home;
