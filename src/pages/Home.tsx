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
  const [slashCoords, setSlashCoords] = useState({ width: '100vw', height: '100vh', angle: 45 });

  // Auto-detect viewport coordinates for slash animation
  useEffect(() => {
    const calculateSlashCoords = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate diagonal distance from bottom-left to top-right
      const diagonalLength = Math.sqrt(vw * vw + vh * vh);
      // Fixed angle for bottom-left to top-right diagonal
      const angle = 45; // Always 45 degrees for perfect diagonal
      
      // Set CSS variables for consistent styling
      document.documentElement.style.setProperty('--slash-width', `${diagonalLength}px`);
      document.documentElement.style.setProperty('--slash-height', '6px');
      document.documentElement.style.setProperty('--slash-angle', `${angle}deg`);
      
      setSlashCoords({
        width: `${diagonalLength}px`,
        height: `6px`, // Fixed height for the slash line
        angle: angle
      });
    };

    calculateSlashCoords();
    window.addEventListener('resize', calculateSlashCoords);
    return () => window.removeEventListener('resize', calculateSlashCoords);
  }, []);

  // Fixed Loading Phase Management
  useEffect(() => {
    if (!isLoading) return;

    if (loadingPhase === 1) {
      // Phase 1: Loading screen (3 seconds)
      const timer = setTimeout(() => {
        setLoadingPhase(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    if (loadingPhase === 2) {
      // Phase 2: Sword slash with synchronized sound
      const playSlashSound = () => {
        try {
          const slashAudio = new Audio('https://raw.githubusercontent.com/IchigoSolos69/portfolio_website/da0030ba1ecfc2a8b6f7e7a2127da7cdea1e62b3/public/sounds/sword-slash.mp3');
          slashAudio.volume = 0.3;
          slashAudio.loop = false; // Ensure no looping
          slashAudio.preload = 'auto';
          
          // Play sound after 300ms delay to match slash animation start
          setTimeout(() => {
            slashAudio.play().catch(() => {
              // Silently fail if audio can't play due to browser policies
              console.log('Audio autoplay prevented by browser');
            });
          }, 300); // Match the 0.3s animation delay
        } catch (e) {
          console.log('Audio setup failed:', e);
        }
      };
      
      // Start audio timing immediately when phase 2 begins
      playSlashSound();
      
      const timer = setTimeout(() => {
        setLoadingPhase(3);
      }, 1400); // Sword slash duration
      return () => clearTimeout(timer);
    }
    
    if (loadingPhase === 3) {
      // Phase 3: Curtain reveal
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsVisible(true);
      }, 1000); // Curtain reveal duration
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
            <div className="dramatic-pause"></div>
            
            <div className="diagonal-slash-container">
              <div className="diagonal-slash-line"></div>
              <div className="diagonal-slash-glow"></div>
            </div>
            
            {/* Slash Particles */}
            <div className="slash-particles">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="diagonal-particle" 
                  style={{
                    left: `${20 + i * 5}%`,
                    top: `${80 - i * 5}%`,
                    animationDelay: `${0.6 + i * 0.05}s`
                  }}
                />
              ))}
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
        {/* Small Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="small-particles">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="small-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        <div className="text-center max-w-4xl mx-auto relative z-10">
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
        {/* Small Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="small-particles">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="small-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
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
            <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">私について</span>
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
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">Full-Stack Development</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-spiritual-energy/30">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-full rounded-full skill-progress group-hover:from-reiatsu-glow group-hover:to-spiritual-energy transition-all duration-500" style={{'--target-width': '90%', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">AI/ML Research</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-reiatsu-glow/30">
                    <div className="bg-gradient-to-r from-reiatsu-glow to-kido-purple h-full rounded-full skill-progress group-hover:from-kido-purple group-hover:to-reiatsu-glow transition-all duration-500" style={{'--target-width': '85%', animationDelay: '0.7s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">Partnership Management</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-kido-purple/30">
                    <div className="bg-gradient-to-r from-kido-purple to-spiritual-energy h-full rounded-full skill-progress group-hover:from-spiritual-energy group-hover:to-kido-purple transition-all duration-500" style={{'--target-width': '95%', animationDelay: '0.9s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
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
        {/* Small Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="small-particles">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="small-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent animate-gradient-text">
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
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-spiritual-energy/20 to-reiatsu-glow/20 rounded-lg text-sm text-spiritual-energy hover:from-spiritual-energy/30 hover:to-reiatsu-glow/30 transition-all duration-300 group-hover:scale-105">
                          <Github className="w-4 h-4" /> View Code
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
        {/* Small Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="small-particles">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="small-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
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
        {/* Small Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="small-particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="small-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-spiritual-energy">Connect With Me
            <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">連絡</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a href="mailto:adimaitre56@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Mail className="w-6 h-6 text-spiritual-energy" /> Email
            </a>
            <a href="https://github.com/adimaitre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Github className="w-6 h-6 text-spiritual-energy" /> GitHub
            </a>
            <a href="https://linkedin.com/in/adi-maitre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Linkedin className="w-6 h-6 text-spiritual-energy" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-soul-society/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Adi Rajendra Maitre. Crafted with spiritual energy and code.
            <span className="text-spiritual-energy japanese-text block mt-2">魂の力で作られた</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;