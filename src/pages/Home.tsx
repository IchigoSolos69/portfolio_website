import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  Cpu, 
  Trophy, 
  Award, 
  Zap, 
  Monitor, 
  TestTube, 
  Hash, 
  Archive, 
  Globe, 
  Heart, 
  Cloud,
  Users,
  Calendar,
  Shield,
  Lightbulb,
  Code 
} from 'lucide-react';

// TypeScript interfaces
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const roles = [
  '学生 | Lifelong Learner',
  'デベロッパー | Full-Stack Architect',
  'AI研究者 | AI/ML Enthusiast',
  '連携担当 | Community Builder',
  '技術オタク | Tech Explorer',
  'デザイン愛好家 | Design Lover',
  'アニメファン | Anime Nerd',
  'ゲーマー | Competitive Gamer',
  '執筆者 | Technical Writer'
];


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showGlitch] = useState(false);

  // Auto-detect viewport coordinates for slash animation
  useEffect(() => {
    const calculateSlashCoords = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate diagonal distance from bottom-left to top-right
      const diagonalLength = Math.sqrt(vw * vw + vh * vh);
      // Calculate proper angle for bottom-left to top-right diagonal
      const angle = Math.atan2(vh, vw) * (180 / Math.PI);
      
      // Set CSS variables for responsive diagonal slash
      document.documentElement.style.setProperty('--diagonal-length', `${diagonalLength}px`);
      document.documentElement.style.setProperty('--diagonal-angle', `${angle}deg`);
      document.documentElement.style.setProperty('--slash-width', `${diagonalLength}px`);
      document.documentElement.style.setProperty('--slash-height', '6px');
    };

    calculateSlashCoords();
    window.addEventListener('resize', calculateSlashCoords);
    return () => window.removeEventListener('resize', calculateSlashCoords);
  }, []);

  // Fixed Loading Phase Management
  useEffect(() => {
    if (!isLoading) return;

    if (loadingPhase === 0) {
      // Phase 0: Click to start - no timer, wait for user interaction
      return;
    }

    if (loadingPhase === 1) {
      // Phase 1: Loading screen (1 second)
      const timer = setTimeout(() => {
        setLoadingPhase(2);
      }, 1000);
      
      return () => {
        clearTimeout(timer);
      };
    }
    
    if (loadingPhase === 2) {
      // Phase 2: Slash animation with audio (4 seconds for slower, more cinematic pace)
      let slashAudio: HTMLAudioElement | null = null;
      
      // Initialize audio immediately when slash phase starts
      const initAudio = () => {
        slashAudio = new Audio('https://github.com/IchigoSolos69/portfolio_website/raw/06e98219d3d081a4e5648ae439dc9432f5ca8e46/public/sounds/sword-slash.mp3');
        slashAudio.volume = 0.6;
        slashAudio.currentTime = 0;
        
        // Attempt to play audio
        const playAudio = () => {
          if (slashAudio) {
            slashAudio.play().catch(() => {
              // If autoplay fails, wait for user interaction
              const handleInteraction = () => {
                if (slashAudio) {
                  slashAudio.play().catch(() => {});
                }
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
              };
              
              document.addEventListener('click', handleInteraction, { once: true });
              document.addEventListener('touchstart', handleInteraction, { once: true });
            });
          }
        };
        
        // Play audio immediately
        playAudio();
      };
      
      // Start audio right away
      initAudio();
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsVisible(true);
      }, 4000); // 4 seconds total for slower animation
      
      // Cleanup function
      return () => {
        clearTimeout(timer);
        if (slashAudio) {
          slashAudio.pause();
          slashAudio.currentTime = 0;
        }
      };
    }
  }, [loadingPhase, isLoading]);

  // Enhanced Typing Effect with Character Animations
  useEffect(() => {
    if (isLoading) return;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= roles[currentRoleIndex].length) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex));
      timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, Math.random() * 120 + 60);
    } else if (!isDeleting && charIndex > roles[currentRoleIndex].length) {
      // Pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && charIndex > 0) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex));
      timer = setTimeout(() => {
        setCharIndex(prev => prev - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      // Move to next role
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex(prev => (prev + 1) % roles.length);
        setCharIndex(0);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentRoleIndex, isLoading]);

  // Render individual characters with staggered animations
  const renderTypingText = () => {
    return typingText.split('').map((char: string, index: number) => (
      <span 
        key={`${currentRoleIndex}-${index}`}
        className="char-reveal"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartExperience = () => {
    setLoadingPhase(1);
  };

  if (isLoading) {
    return (
      <div className="cinematic-loading-overlay">
        {/* Phase 0: Click to Start */}
        {loadingPhase === 0 && (
          <div className="click-to-start-screen">
            <div className="click-background">
              <div className="floating-orbs">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`floating-orb orb-${i + 1}`}></div>
                ))}
              </div>
              <div className="energy-waves"></div>
            </div>
            <div className="click-content">
              <div className="soul-reaper-emblem">
                <div className="emblem-ring"></div>
                <div className="emblem-center">魂</div>
              </div>
              <h1 className="click-title">
                <span className="title-line-1">Enter the</span>
                <span className="title-line-2">Soul Society</span>
              </h1>
              <p className="click-subtitle">Click anywhere to unleash your spiritual pressure</p>
              <div className="click-indicator">
                <div className="pulse-ring"></div>
                <div className="cursor-icon">⚔️</div>
              </div>
            </div>
            <div className="click-overlay" onClick={handleStartExperience}></div>
          </div>
        )}
        
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
        
        {/* Phase 2: Glow Trail Animation */}
        {loadingPhase === 2 && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Glow trail effect */}
            <div className="glow-trail"></div>
            
            {/* Diagonal split panels */}
            <div className="split-panels">
              <div className="panel panel-top"></div>
              <div className="panel panel-bottom"></div>
            </div>
            
            {/* Name reveal removed */}
            
            {/* Content reveal */}
            <div className="content-reveal">
              {!isLoading && (
                <div className="main-content">
                  {/* Main content goes here */}
                </div>
              )}
            </div>
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
            
            {/* Enhanced Typing Display */}
            <div className="text-2xl md:text-3xl mb-6 h-16 flex items-center justify-center overflow-hidden">
              <div className={`typing-container ${showGlitch ? 'typing-glitch' : ''}`}>
                <span className="typing-text">
                  {renderTypingText()}
                </span>
                <span className="typing-cursor"></span>
              </div>
            </div>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences with precision and passion.
              <span className="text-spiritual-energy japanese-text block mt-2">開発者 - Developer</span>
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
              Just a code Shinigami - Adi, B.Tech IT student, slicing bugs across the digital Soul Society. 🗡️<br />
              Blending tech wizardry with community spirit. At AuraSide, I wrangle partnerships, test new features, and help keep things running (or respawning).<br />
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Forever building, breaking, and remixing projects - always chasing the bankai of perfect UI. ✨<br/>
              ⚡ Fueled by caffeine, Ctrl+Z, and way too many unfinished side quests.<br/>
              ☁️ Legacy plan: GitHub, drifting in the cloud.<br/>
              <span className="italic">“If it runs, it’s bankai.”</span>
            </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                    { name: 'Python', level: 'Expert' },
                    { name: 'HTML', level: 'Advanced' },
                    { name: 'Java', level: 'Intermediate' },
                    { name: 'C', level: 'Intermediate' },
                    { name: 'C++', level: 'Intermediate' },
                    { name: 'CSS', level: 'Intermediate' },
                    { name: 'JavaScript', level: 'Learning' },
                    { name: 'TypeScript', level: 'Learning' },
                    { name: 'React', level: 'Learning' },
                    { name: 'Node.js', level: 'Learning' }                  
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
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="space-y-4">
                {/* Sorted in ascending order by percentage */}
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">🧠 AI/ML Research</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">35%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-reiatsu-glow/30">
                    <div className="bg-gradient-to-r from-reiatsu-glow to-kido-purple h-full rounded-full skill-progress group-hover:from-kido-purple group-hover:to-reiatsu-glow transition-all duration-500" style={{'--target-width': '35%', animationDelay: '0.7s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">📚 Consistency</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">69%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-spiritual-energy/30">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-full rounded-full skill-progress group-hover:from-reiatsu-glow group-hover:to-spiritual-energy transition-all duration-500" style={{'--target-width': '69%', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">🎨 UI/UX Design Sense</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">80%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-spiritual-energy/30">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-full rounded-full skill-progress group-hover:from-reiatsu-glow group-hover:to-spiritual-energy transition-all duration-500" style={{'--target-width': '80%', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">🌌 Full-Stack Development</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-spiritual-energy/30">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-full rounded-full skill-progress group-hover:from-reiatsu-glow group-hover:to-spiritual-energy transition-all duration-500" style={{'--target-width': '87%', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">🌐 Community Building</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-spiritual-energy/30">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-full rounded-full skill-progress group-hover:from-reiatsu-glow group-hover:to-spiritual-energy transition-all duration-500" style={{'--target-width': '87%', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">🤝 Programming Languages</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">92%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-kido-purple/30">
                    <div className="bg-gradient-to-r from-kido-purple to-spiritual-energy h-full rounded-full skill-progress group-hover:from-spiritual-energy group-hover:to-kido-purple transition-all duration-500" style={{'--target-width': '92%', animationDelay: '0.9s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="skill-bar group cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="text-spiritual-energy font-medium group-hover:text-reiatsu-glow transition-colors duration-300">🔋 Energy</span>
                    <span className="text-gray-400 group-hover:text-spiritual-energy transition-colors duration-300">∞</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden group-hover:h-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-spiritual-energy/30">
                    <div className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow h-full rounded-full skill-progress group-hover:from-reiatsu-glow group-hover:to-spiritual-energy transition-all duration-500" style={{'--target-width': '100%', animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse rounded-full"></div>
                  </div>
                </div>
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
                title: "Portfolio Website",
                description: "Fast, responsive personal portfolio built with Vite, React, and Tailwind CSS",
                icon: <Monitor className="w-8 h-8" />,
                tech: ["Vite", "React", "TypeScript", "Tailwind CSS"],
                github: "https://github.com/IchigoSolos69/portfolio_website",
                status: "Completed"
              },
              {
                title: "Chemistry Manual Digitizer",
                description: "Python tool for digitizing and managing chemistry experiment manuals using structured JSON data",
                icon: <TestTube className="w-8 h-8" />,
                tech: ["Python", "JSON"],
                github: "https://github.com/IchigoSolos69/Chemistry-Manual-Digitizer",
                status: "Completed"
              },
              {
                title: "IRC: Data Analyzer",
                description: "CLI & GUI toolkit for scanning, sorting, and visualizing Instagram hashtag and user data",
                icon: <Hash className="w-8 h-8" />,
                tech: ["Python", "PyQt5", "pandas", "qrcode", "matplotlib"],
                github: "https://github.com/IchigoSolos69/IRC",
                status: "Research"
              },
              {
                title: "Inventory Management System",
                description: "Desktop GUI for tracking stock, pricing, and expiry dates with CSV import/export",
                icon: <Archive className="w-8 h-8" />,
                tech: ["Python", "PyQt5", "CSV"],
                github: "https://github.com/IchigoSolos69/Inventory-Management-System",
                status: "Completed"
              },
              {
                title: "Number Guessing Game",
                description: "Interactive CLI game where the computer deduces your chosen number using bitwise magic",
                icon: <Cpu className="w-8 h-8" />,
                tech: ["Python"],
                github: "https://github.com/IchigoSolos69/Computer-Guesses-your-the-Number",
                status: "Completed"
              },
              {
                title: "PyQt5 Web Browser",
                description: "Lightweight custom browser with tabbed browsing, ad blocking, and download management using PyQt5 and QtWebEngine",
                icon: <Globe className="w-8 h-8" />,
                tech: ["Python", "PyQt5", "QtWebEngine"],
                github: "https://github.com/IchigoSolos69/Web-Browser",
                status: "Research"
              },
              {
                title: "Hospital Management System (C++)",
                description: "Console-based patient queue management system using singly linked list, designed for emergency room workflows",
                icon: <Heart className="w-8 h-8" />,
                tech: ["C++", "Data Structures", "Linked List"],
                github: "https://github.com/IchigoSolos69/Hospital-Management",
                status: "Active"
              },
              {
                title: "Weather System",
                description: "Live desktop weather dashboard with AQI, icons, and detailed forecasts using Python, PyQt5, and Open-Meteo API",
                icon: <Cloud className="w-8 h-8" />,
                tech: ["Python", "PyQt5", "requests", "Open-Meteo API"],
                github: "https://github.com/IchigoSolos69/Weather-System",
                status: "Completed"
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
                organization: "AuraSide Product (Hone.gg & Ghast.io)",
                description: "Driving strategic partnerships, product testing, and platform growth for a global competitive gaming ecosystem.",
                icon: <Trophy className="w-8 h-8" />,
                type: "Professional"
              },
              {
                title: "NDA Product Tester",
                organization: "AuraSide Product (Hone.gg)",
                description: "Conducted early-stage product testing, feature validation, and user experience feedback to refine gaming and community platforms.",
                icon: <Shield className="w-8 h-8" />,
                type: "Professional"
              },
              {
                title: "Full-Stack Developer",
                organization: "Independent & Collaborative Projects",
                description: "Designed and deployed scalable web applications using modern frameworks, APIs, and cloud-based technologies.",
                icon: <Zap className="w-8 h-8" />,
                type: "Technical"
              },
              {
                title: "Open Source Contributor",
                organization: "Programming Ecosystem",
                description: "Enhanced widely used front-end libraries with bug fixes, performance improvements, and feature contributions.",
                icon: <Code className="w-8 h-8" />,
                type: "Technical"
              },
              {
                title: "Community Events Coordinator",
                organization: "IT Student Association (ITSA), International Relations Cell (IRC), Spectrum Team - PCCOE",
                description: "Planned and executed campus events, workshops, and cultural exchanges, significantly increasing student participation and cross-community engagement.",
                icon: <Calendar className="w-8 h-8" />,
                type: "Leadership"
              },
              {
                title: "Community Builder",
                organization: "Discord & Online Gaming Spaces",
                description: "Grew and managed digital communities of 70k+ members, maintaining engagement, moderating activity, and fostering collaboration.",
                icon: <Users className="w-8 h-8" />,
                type: "Leadership"
              },
              {
                title: "Creative Project Developer",
                organization: "Personal & Academic Projects",
                description: "Built interactive applications including a digitized chemistry manual with TTS, search functionality, and experiment-wise modular design.",
                icon: <Lightbulb className="w-8 h-8" />,
                type: "Creative"
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
            <a href="https://github.com/IchigoSolos69" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Github className="w-6 h-6 text-spiritual-energy" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/adimaitre" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Linkedin className="w-6 h-6 text-spiritual-energy" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-soul-society/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
          © 2025 Adi R. Maitre | Portals crafted through code, empowered by spirit
            <span className="text-spiritual-energy japanese-text block mt-2">革新は魂から生まれる - Innovation is born from the soul</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
