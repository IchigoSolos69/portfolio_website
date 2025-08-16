import React, { useState, useEffect } from 'react';
import { Cpu, Github, Zap, Mail, Award, Trophy, ChevronDown, Linkedin } from 'lucide-react';

const roles = [
  '学生 | Student',
  'デベロッパー | Developer', 
  'パートナーシップマネージャー | Partnership Manager',
  'ブリーチファン | Bleach Fan',
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(1);

  useEffect(() => {
    const resumeAudio = () => {
      if (window.AudioContext) {
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') ctx.resume();
      }
      window.removeEventListener('pointerdown', resumeAudio);
    };
    window.addEventListener('pointerdown', resumeAudio, { once: true });
  }, []);
  
  // Fixed Loading Phase Management
  useEffect(() => {
    if (!isLoading) return;
  
    if (loadingPhase === 1) {
      const timer = setTimeout(() => {
        setLoadingPhase(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    if (loadingPhase === 2) {
      // FORCE AUDIO PLAY - Multiple attempts
      const playSlashSound = async () => {
        try {
          const slashAudio = new Audio('https://raw.githubusercontent.com/IchigoSolos69/portfolio_website/7e5783adb55f55d4ed317b643826b458ad824700/public/sounds/sword-slash.mp3');
          slashAudio.volume = 0.7;
          slashAudio.preload = 'auto';
          
          // Force play immediately
          const playPromise = slashAudio.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Audio autoplay failed, but continuing animation:', error);
              // Continue anyway - some browsers block autoplay
            });
          }
        } catch (error) {
          console.log('Audio failed to load:', error);
        }
      };
      
      // Play sound immediately when phase 2 starts
      playSlashSound();
      
      const timer = setTimeout(() => {
        setLoadingPhase(3);
      }, 1400);
      return () => clearTimeout(timer);
    }
    
    if (loadingPhase === 3) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loadingPhase, isLoading]);

  // Fixed Typing Effect
  useEffect(() => {
    if (isLoading) return;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= roles[currentRoleIndex].length) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex));
      timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, Math.random() * 100 + 80);
    } else if (!isDeleting && charIndex > roles[currentRoleIndex].length) {
      // Pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex));
      timer = setTimeout(() => {
        setCharIndex(prev => prev - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      // Move to next role
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex(prev => (prev + 1) % roles.length);
        setCharIndex(0);
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
      <div className="cinematic-loading-overlay">
        {/* Phase 1: Loading Screen */}
        {loadingPhase === 1 && (
          <div className="loading-screen">
            <div className="loading-background"></div>
            
            {/* Energy Particles */}
            <div className="energy-particles">
              {[...Array(25)].map((_, i) => (
                <div 
                  key={i} 
                  className="energy-particle" 
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }} 
                />
              ))}
            </div>
            
            {/* Glowing Circular Loader */}
            <div className="loader-container">
              <div className="circular-loader">
                <div className="loader-ring"></div>
                <div className="loader-core"></div>
              </div>
              
              {/* Japanese Loading Text */}
              <div className="loading-text">
                <div className="japanese-loading">読み込み中...</div>
                <div className="english-loading">Loading...</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Phase 2: Sword Slash */}
        {loadingPhase === 2 && (
  <div className="sword-slash-phase">
    {/* Dramatic pause */}
    <div className="dramatic-pause"></div>
    
    {/* Diagonal slash line from bottom-left to top-right */}
    <div className="diagonal-slash-container">
      <div className="diagonal-slash-line"></div>
      <div className="diagonal-slash-glow"></div>
      
      {/* Trailing particles along the slash */}
      <div className="slash-particles">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="diagonal-particle" 
            style={{
              animationDelay: `${0.3 + i * 0.08}s`
            }}
          />
        ))}
      </div>
    </div>
    
    {/* Katana at the end point */}
    <div className="katana-end-point">
      <svg className="katana-icon" viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M4 20L20 4" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
)}
        
        {/* Phase 3: Curtain Reveal */}
        {loadingPhase === 3 && (
          <div className="curtain-reveal-phase">
            <div className="diagonal-curtain"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fixed Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="dynamic-background" />
        <div className="optimized-particle-field">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="optimized-particle"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent animate-gradient-text">
                Adi Rajendra Maitre
              </span>
            </h1>
            
            {/* Fixed Typing Display */}
            <div className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center overflow-hidden">
              <span className="border-r-2 border-spiritual-energy animate-blink pr-1">
                {typingText}
              </span>
            </div>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences with precision and passion.
              <span className="text-spiritual-energy japanese-text block mt-2">開発者</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <button
              onClick={() => scrollToSection('about')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Award className="w-5 h-5" /> About Me
              </span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" /> View Projects
              </span>
            </button>
          </div>

          <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
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
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="moving-particle" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${8 + Math.random() * 12}s`
                }} 
              />
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
  {[
    { name: 'JavaScript', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Python', level: 'Expert' },
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Java', level: 'Advanced' },
    { name: 'C++', level: 'Intermediate' },
    { name: 'Go', level: 'Learning' }
  ].map((lang, idx) => (
    <div 
      key={lang.name} 
      className="programming-lang-box group relative bg-gradient-to-br from-hollow-mask/20 to-soul-society/10 rounded-xl p-6 border border-spiritual-energy/20 hover:border-reiatsu-glow transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-spiritual-energy/30 text-center"
      style={{
        animation: `langBoxFloat 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.15 + idx * 0.15}s forwards`,
        opacity: 0,
        transform: 'translateY(30px) scale(0.8) rotateX(15deg)'
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-reiatsu-glow/0 via-reiatsu-glow/10 to-reiatsu-glow/0 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-spiritual-energy/5 via-transparent to-kido-purple/5 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
      
      <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
        <h4 className="text-spiritual-energy font-bold text-lg mb-3 group-hover:text-reiatsu-glow transition-all duration-500 group-hover:scale-105 text-center">
          {lang.name}
        </h4>
        <span className={`text-sm px-3 py-2 rounded-full font-medium transition-all duration-500 group-hover:scale-105 text-center ${
          lang.level === 'Expert' ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' :
          lang.level === 'Advanced' ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30' :
          lang.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30' :
          'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30'
        }`}>
          {lang.level}
        </span>
      </div>
    </div>
  ))}
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="moving-particle" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${8 + Math.random() * 12}s`
                }} 
              />
            ))}
          </div>
        </div>
        
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
           {[...Array(40)].map((_, i) => (
             <div 
               key={i} 
               className="moving-particle" 
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${i * 0.15}s`,
                 animationDuration: `${8 + Math.random() * 12}s`
               }} 
             />
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="moving-particle" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${8 + Math.random() * 12}s`
                }} 
              />
            ))}
          </div>
        </div>
        
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

        /* Animations */
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
        
        /* Programming Language Box Animation */
        @keyframes langBoxFloat {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9) rotateX(10deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }
        
        .programming-lang-box {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        
        .programming-lang-box:hover {
          transform: translateY(-8px) scale(1.05) rotateY(5deg);
          box-shadow: 0 15px 35px -5px rgba(255, 165, 0, 0.2), 0 10px 15px -5px rgba(255, 165, 0, 0.1);
        }
        
        /* Moving Background Particles */
        .moving-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: radial-gradient(circle, #FFA500 0%, #FF6B00 70%, transparent 100%);
          border-radius: 50%;
          animation: moveParticle linear infinite;
          box-shadow: 0 0 4px rgba(255, 165, 0, 0.5);
        }
        
        @keyframes moveParticle {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) translateX(10px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) translateX(-20px) scale(1.2);
          }
          90% {
            opacity: 1;
            transform: translateY(10vh) translateX(15px) scale(1);
          }
          100% {
            transform: translateY(-10vh) translateX(0) scale(0);
            opacity: 0;
          }
        }
        
        /* Cinematic Loading Overlay */
        .cinematic-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10000;
          overflow: hidden;
        }
        
        /* Phase 1: Loading Screen */
        .loading-screen {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease-out;
        }
        
        .loading-background {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, #0a0a1a 0%, #1a1a2e 40%, #16213e 70%, #000 100%);
        }
        
        /* Energy Particles */
        .energy-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .energy-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, #FFA500 0%, #FF8C00 50%, transparent 100%);
          border-radius: 50%;
          animation: energyFloat linear infinite;
          box-shadow: 0 0 8px rgba(255, 165, 0, 0.6);
        }
        
        @keyframes energyFloat {
          0% {
            transform: translateY(100vh) translateX(0) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) translateX(10px) scale(1) rotate(45deg);
          }
          50% {
            opacity: 1;
            transform: translateY(50vh) translateX(-20px) scale(1.2) rotate(180deg);
          }
          90% {
            opacity: 1;
            transform: translateY(10vh) translateX(15px) scale(1) rotate(315deg);
          }
          100% {
            transform: translateY(-10vh) translateX(0) scale(0) rotate(360deg);
            opacity: 0;
          }
        }
        
        /* Glowing Circular Loader */
        .loader-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        
        .circular-loader {
          position: relative;
          width: 100px;
          height: 100px;
        }
        
        .loader-ring {
          position: absolute;
          inset: 0;
          border: 4px solid transparent;
          border-top: 4px solid #FFA500;
          border-right: 4px solid #FF8C00;
          border-radius: 50%;
          animation: loaderSpin 1.5s linear infinite;
          filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8));
        }
        
        .loader-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #FFA500 0%, #FF8C00 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: loaderPulse 2s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(255, 165, 0, 0.9);
        }
        
        @keyframes loaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes blink {
          0%, 50% { border-color: hsl(var(--spiritual-energy)); }
          51%, 100% { border-color: transparent; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
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
        
        @keyframes loaderPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 20px rgba(255, 165, 0, 0.9);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.3);
            box-shadow: 0 0 30px rgba(255, 165, 0, 1);
          }
        }
        
        /* Japanese Loading Text */
        .loading-text {
          text-align: center;
        }
        
        .japanese-loading {
          font-size: 1.8rem;
          font-weight: 500;
          color: #FFA500;
          text-shadow: 0 0 15px rgba(255, 165, 0, 0.9), 0 0 30px rgba(255, 165, 0, 0.5);
          animation: textGlow 2.5s ease-in-out infinite alternate;
          margin-bottom: 0.5rem;
          font-family: 'Noto Sans JP', sans-serif;
        }
        
        .english-loading {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          letter-spacing: 2px;
        }
        
        @keyframes textGlow {
          0% {
            text-shadow: 0 0 15px rgba(255, 165, 0, 0.9), 0 0 30px rgba(255, 165, 0, 0.5);
          }
          100% {
            text-shadow: 0 0 25px rgba(255, 165, 0, 1), 0 0 50px rgba(255, 165, 0, 0.7);
          }
        }
        
        /* Phase 2: Sword Slash */
        .sword-slash-phase {
          position: absolute;
          inset: 0;
          background: #000;
        }
        
        .dramatic-pause {
          position: absolute;
          inset: 0;
          background: #000;
          animation: fadeOut 0.1s ease-out 0.1s forwards;
        }
        
        .katana-sword {
          position: absolute;
          bottom: 10%;
          left: 5%;
          width: 80px;
          height: 320px;
          animation: swordSlash 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
          transform-origin: bottom center;
        }
        
        .sword-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.9));
        }
        
        @keyframes swordSlash {
          0% {
            transform: rotate(-45deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: rotate(-45deg) scale(1);
          }
          100% {
            transform: rotate(45deg) translateX(90vw) translateY(-80vh) scale(1.2);
            opacity: 0.8;
          }
        }
        
        /* Glowing Trail */
        .slash-trail {
          position: absolute;
          bottom: 10%;
          left: 5%;
          width: 4px;
          height: 100vh;
          background: linear-gradient(45deg, transparent 0%, #FFA500 20%, #FFFFFF 50%, #FFA500 80%, transparent 100%);
          transform-origin: bottom left;
          animation: trailGrow 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s forwards;
          opacity: 0;
          box-shadow: 0 0 20px rgba(255, 165, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.4);
        }
        
        @keyframes trailGrow {
          0% {
            transform: rotate(45deg) scaleY(0) scaleX(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: rotate(45deg) scaleY(0.3) scaleX(1);
          }
          60% {
            transform: rotate(45deg) scaleY(1.2) scaleX(3);
            opacity: 1;
            box-shadow: 0 0 30px rgba(255, 165, 0, 1), 0 0 60px rgba(255, 255, 255, 0.6);
          }
          100% {
            transform: rotate(45deg) scaleY(1.4) scaleX(5);
            opacity: 0;
          }
        }
        
        /* Spark Particles */
        .spark-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .spark-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #FFFFFF 0%, #FFA500 50%, transparent 100%);
          border-radius: 50%;
          bottom: 20%;
          left: 15%;
          animation: sparkFly 1s ease-out forwards;
          opacity: 0;
          box-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
        }
        
        @keyframes sparkFly {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(20vw, -10vh) scale(1) rotate(90deg);
          }
          100% {
            transform: translate(80vw, -70vh) scale(0.3) rotate(360deg);
            opacity: 0;
          }
        }
        
        /* Phase 3: Curtain Reveal */
        .curtain-reveal-phase {
          position: absolute;
          inset: 0;
          background: #000;
        }
        
        .diagonal-curtain {
          position: absolute;
          inset: 0;
          background: #000;
          animation: curtainWipe 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        }
        
        @keyframes curtainWipe {
          0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 0 100%, 0 100%);
            opacity: 0;
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
      `}</style>
    </div>
  );
};

export default Home;
