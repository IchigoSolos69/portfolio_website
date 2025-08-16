import { useState, useEffect } from 'react'
import { ChevronDown, Sword, Mail, Github, Linkedin, Zap, BookOpen, Cpu, Users } from 'lucide-react'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [swordClicks, setSwordClicks] = useState(0)
  const [showBankai, setShowBankai] = useState(false)
  const [specialBankaiMode, setSpecialBankaiMode] = useState(false)
  
  const roles = ['学生 (Student)', 'デベロッパー (Developer)', 'パートナーシップマネージャー (Partnership Manager)', 'ブリーチファン (Bleach Fan)']

  useEffect(() => {
    setIsVisible(true)
    
    // Mouse trail effect
    const createMouseTrail = (e: MouseEvent) => {
      const trail = document.createElement('div')
      trail.className = 'mouse-trail'
      trail.style.left = e.clientX + 'px'
      trail.style.top = e.clientY + 'px'
      document.body.appendChild(trail)
      
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail)
        }
      }, 800)
    }
    
    // 10-second timer for special Bankai mode
    const timer = setTimeout(() => {
      setSpecialBankaiMode(true)
      setTimeout(() => setSpecialBankaiMode(false), 5000)
    }, 10000)
    
    window.addEventListener('mousemove', createMouseTrail)
    return () => {
      window.removeEventListener('mousemove', createMouseTrail)
      clearTimeout(timer)
    }
  }, [])

  // Enhanced typing effect for roles
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    let charIndex = 0
    let isDeleting = false
    setTypingText('')
    
    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        // Typing forward
        setTypingText(currentRole.substring(0, charIndex + 1))
        charIndex++
      } else if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        setTimeout(() => {
          isDeleting = true
        }, 2000)
      } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        charIndex--
        setTypingText(currentRole.substring(0, charIndex))
      } else if (isDeleting && charIndex === 0) {
        // Move to next role
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentRoleIndex((prev: number) => (prev + 1) % roles.length)
        }, 500)
      }
    }, isDeleting ? 50 : Math.random() * 100 + 80) // Faster deletion, variable typing speed

    return () => clearInterval(typeInterval)
  }, [currentRoleIndex, roles])

  // Sword click easter egg
  const handleSwordClick = () => {
    setSwordClicks((prev: number) => prev + 1)
    if (swordClicks >= 4) {
      setShowBankai(true)
      setSwordClicks(0)
      playBankaiSound()
      setTimeout(() => setShowBankai(false), 2000)
    }
  }

  const playBankaiSound = () => {
    // Create dramatic Bankai sound effect
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Deep bass note followed by ascending spiritual energy
    const bankaiSequence = [
      { freq: 110, duration: 0.3, gain: 0.2 }, // Deep bass
      { freq: 220, duration: 0.2, gain: 0.15 }, // Rising
      { freq: 440, duration: 0.2, gain: 0.1 }, // Higher
      { freq: 880, duration: 0.3, gain: 0.08 }, // Spiritual peak
      { freq: 1760, duration: 0.2, gain: 0.05 } // Final release
    ]
    
    bankaiSequence.forEach((note, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime)
        oscillator.type = 'sawtooth' // More dramatic than sine
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(note.gain, audioContext.currentTime + 0.05)
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + note.duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + note.duration)
      }, index * 200)
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Play Japanese sound effect for section switching
      playJapaneseSoundEffect(sectionId)
    }
  }

  const playJapaneseSoundEffect = (section: string) => {
    // Create audio context for Japanese sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Different frequencies for different sections (simulating Japanese sound effects)
    const soundMap: { [key: string]: number[] } = {
      'gallery': [440, 554, 659], // A-C#-E chord (gallery sound)
      'projects': [523, 659, 784], // C-E-G chord (projects sound)
      'about': [392, 494, 587], // G-B-D chord (about sound)
      'contact': [349, 440, 523] // F-A-C chord (contact sound)
    }
    
    const frequencies = soundMap[section] || [440, 554, 659]
    
    // Play a quick Japanese-style chime
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      oscillator.type = 'sine'
      
      // Quick fade in/out for Japanese chime effect
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05 + index * 0.1)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2 + index * 0.1)
      
      oscillator.start(audioContext.currentTime + index * 0.1)
      oscillator.stop(audioContext.currentTime + 0.3 + index * 0.1)
    })
  }

  return (
    <div className={`min-h-screen bg-black text-foreground ${specialBankaiMode ? 'special-bankai-mode' : ''}`}>
      {/* Bankai Easter Egg */}
      {showBankai && (
        <div className="bankai-unleashed">
          BANKAI UNLEASHED! 卍解!
        </div>
      )}
      
      {/* Special Konami Bankai Mode */}
      {specialBankaiMode && (
        <div className="konami-bankai-mode">
          <div className="absolute inset-0 bg-gradient-to-r from-spiritual-energy/20 via-reiatsu-glow/20 to-kido-purple/20 animate-pulse z-50 pointer-events-none" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-spiritual-energy z-50 animate-bounce">
            ULTIMATE BANKAI! 最終卍解!
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-soul-society/80 backdrop-blur-md border-b border-reiatsu-glow/30 sword-trail">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 bg-spiritual-energy/30 rounded-lg flex items-center justify-center animate-reiatsu-glow kido-circle cursor-pointer"
              onClick={handleSwordClick}
            >
              <Sword className="w-6 h-6 text-spiritual-energy animate-zanpakuto-shine" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-spiritual-energy text-spiritual-glow">Adi Maitre Portfolio</h1>
              <p className="text-xs text-reiatsu-glow japanese-text">死神デベロッパー</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['projects','about','contact'].map((sec) => (
              <button 
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                {sec.charAt(0).toUpperCase()+sec.slice(1)} <span className="text-xs ml-1">
                  {sec === 'projects' ? 'プロジェクト' : sec === 'about' ? 'あなた' : '連絡先'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background and effects omitted for brevity (same as before) */}

        {/* Main content */}
        <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'animate-bankai-release' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight bankai-burst">
            <span className="block font-light text-gray-100 text-spiritual-glow animate-floating">ADI MAITRE</span>
            <span className="bg-spiritual-gradient bg-clip-text text-transparent text-reiatsu-glow animate-spiritual-pulse">Portfolio</span>
            <span className="text-3xl block text-kido-purple japanese-text mt-2 animate-spiritual-pulse">死神図鑑</span>
          </h1>
          <div className="mb-8">
            <div className="text-xl md:text-2xl text-gray-300 mb-4 font-light animate-fade-in-up">
              <span className="typing-text">{typingText}</span>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              Building worlds with <span className="text-spiritual-energy font-semibold">Python</span>, 
              <span className="text-reiatsu-glow font-semibold"> React</span>, and 
              <span className="text-kido-purple font-semibold"> creativity</span>. 
              Inspired by anime, driven by code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50 animate-reiatsu-glow sword-trail group"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:animate-zanpakuto-shine" />
                View My Projects
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25 group hollow-mask-overlay"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:animate-spiritual-pulse" />
                Contact Me
              </span>
            </button>
          </div>

          <div className="animate-bounce mt-4">
            <ChevronDown className="w-8 h-8 mx-auto text-spiritual-energy animate-spiritual-pulse spiritual-glow" />
          </div>
        </div>
      </section>

      {/* Floating Spiritual Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating cherry blossoms or spiritual particles */}
        <div className="particle-field">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="spiritual-particle animate-float-random" />
          ))}
        </div>
        
        {/* Animated spiritual pressure waves */}
        <div className="spiritual-waves">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="spiritual-particle animate-float-random" style={{animationDelay: `${i * 0.2}s`}} />
            ))}
          </div>
        </div>
        
        <h2 className="text-5xl font-bold text-center mb-16 relative z-10">
          <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent animate-gradient-text">
            My Projects
          </span>
          <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">プロジェクト</span>
        </h2>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
          {[
            {
              name:"Chemistry Manual Digitizer",
              desc:"Advanced PyQt5 application featuring text-to-speech synthesis, intelligent search algorithms, and interactive digital experiment windows for enhanced learning.",
              icon:<BookOpen className="w-8 h-8"/>,
              tech:["PyQt5", "Python", "TTS"],
              github:"#",
              demo:"#",
              status:"Completed"
            },
            {
              name:"Event Analysis Tool",
              desc:"Comprehensive Python analytics suite processing CSV data to generate attendance visualizations, automated QR code email distribution, and certificate generation.",
              icon:<Users className="w-8 h-8"/>,
              tech:["Python", "Pandas", "Matplotlib"],
              github:"#",
              demo:"#",
              status:"Active"
            },
            {
              name:"Hemoglobin Report Classifier",
              desc:"AI-powered medical data extraction system converting PNG/PDF reports to structured JSON, with machine learning classification and interactive data visualization.",
              icon:<Cpu className="w-8 h-8"/>,
              tech:["AI/ML", "OpenCV", "Scikit-learn"],
              github:"#",
              demo:"#",
              status:"Research"
            },
            {
              name:"Hone.gg Platform Contributions",
              desc:"Strategic leadership in community management and partnership development, driving user engagement and platform growth through innovative collaboration initiatives.",
              icon:<Zap className="w-8 h-8"/>,
              tech:["Management", "Strategy", "Community"],
              github:"#",
              demo:"https://hone.gg",
              status:"Ongoing"
            }
          ].map((proj,idx)=>(
            <div key={proj.name} className="project-card group relative bg-gradient-to-br from-hollow-mask/20 to-soul-society/10 rounded-2xl p-6 border border-spiritual-energy/20 hover:border-spiritual-energy transition-all duration-700 animate-fade-in-up overflow-hidden" style={{animationDelay:`${idx*0.2}s`}}>
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-spiritual-energy/0 via-spiritual-energy/20 to-spiritual-energy/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
              
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${proj.status === 'Completed' ? 'bg-green-400' : proj.status === 'Active' ? 'bg-blue-400' : proj.status === 'Research' ? 'bg-purple-400' : 'bg-orange-400'} animate-pulse`} />
                <span className="text-xs text-gray-400">{proj.status}</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-spiritual-energy/30 to-reiatsu-glow/20 rounded-xl text-spiritual-energy group-hover:scale-110 transition-transform duration-300">
                    {proj.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-spiritual-energy mb-2 group-hover:text-reiatsu-glow transition-colors duration-300">{proj.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{proj.desc}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((tech,techIdx)=>(
                    <span key={tech} className="skill-tag px-3 py-1 bg-spiritual-energy/10 text-spiritual-energy rounded-full text-xs border border-spiritual-energy/20 hover:bg-spiritual-energy/20 hover:scale-105 transition-all duration-300" style={{animationDelay:`${techIdx*0.1}s`}}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a href={proj.github} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-spiritual-energy/20 to-reiatsu-glow/20 rounded-lg text-sm text-spiritual-energy hover:from-spiritual-energy/30 hover:to-reiatsu-glow/30 transition-all duration-300 group-hover:scale-105">
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a href={proj.demo} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-reiatsu-glow/20 to-kido-purple/20 rounded-lg text-sm text-reiatsu-glow hover:from-reiatsu-glow/30 hover:to-kido-purple/30 transition-all duration-300 group-hover:scale-105">
                    <Zap className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="spiritual-particle animate-float-random" style={{animationDelay: `${i * 0.3}s`}} />
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-kido-purple bg-clip-text text-transparent animate-gradient-text">
              About Me
            </span>
            <span className="text-2xl japanese-text text-reiatsu-glow ml-4 block mt-2">プロフィール</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up" style={{animationDelay:'0.2s'}}>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                I'm <span className="text-spiritual-energy font-semibold">Adi Rajendra Maitre</span>, 
                a BTech IT student at PCCOE Akurdi. I work as a <span className="text-reiatsu-glow font-semibold">Staff & Partnership Manager at Hone.gg</span>, 
                combining technical expertise with strategic leadership.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                I've built projects in <span className="text-spiritual-energy">Python</span>, 
                <span className="text-reiatsu-glow"> React</span>, 
                <span className="text-kido-purple"> TypeScript</span>, and more — merging anime creativity with real-world problem solving.
              </p>
              
              {/* Circular Skill Progress Bars */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                {[
                  {skill: 'React/TypeScript', level: 85, color: 'spiritual-energy'},
                  {skill: 'Python/AI', level: 90, color: 'reiatsu-glow'},
                  {skill: 'Leadership', level: 80, color: 'kido-purple'},
                  {skill: 'Problem Solving', level: 95, color: 'spiritual-energy'}
                ].map((item, index) => (
                  <div key={item.skill} className="text-center animate-fade-in-up" style={{animationDelay:`${0.4 + index*0.1}s`}}>
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50" cy="50" r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-700"
                        />
                        <circle
                          cx="50" cy="50" r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - item.level / 100)}`}
                          className={`text-${item.color} transition-all duration-2000 ease-out animate-pulse-glow`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg font-bold text-${item.color}`}>{item.level}%</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-300">{item.skill}</h4>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {['React','TypeScript','Node.js','Tailwind CSS','Next.js','Python','C','Java','PyQt5','AI/DS'].map((skill,index)=>(
                  <span key={skill} className="skill-tag px-3 py-1 bg-spiritual-energy/10 text-spiritual-energy rounded-full text-sm border border-spiritual-energy/20 hover:bg-spiritual-energy/20 transition-all duration-300 animate-flash-step" style={{animationDelay:`${index*0.1}s`}}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{animationDelay:'0.5s'}}>
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-spiritual-energy/20 to-reiatsu-glow/20 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Animated rings */}
                <div className="absolute inset-4 border-2 border-spiritual-energy/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-8 border-2 border-reiatsu-glow/30 rounded-full animate-reverse-spin"></div>
                <div className="absolute inset-12 border-2 border-kido-purple/30 rounded-full animate-spin-slow"></div>
                
                <Sword className="w-32 h-32 text-spiritual-energy animate-zanpakuto-shine relative z-10" />
                
                {/* Floating orbs */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 bg-spiritual-energy/60 rounded-full animate-float-random"
                    style={{
                      top: `${20 + Math.sin(i * Math.PI / 3) * 30}%`,
                      left: `${50 + Math.cos(i * Math.PI / 3) * 35}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '4s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-spiritual-energy animate-fade-in-up">
            Connect With Me <span className="text-2xl japanese-text text-reiatsu-glow ml-4">連絡</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a href="mailto:adimaitre123@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Mail className="w-6 h-6 text-spiritual-energy" /> Email
            </a>
            <a href="https://github.com/adimaitre" target="_blank" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Github className="w-6 h-6 text-spiritual-energy" /> GitHub
            </a>
            <a href="https://linkedin.com/in/adi-maitre" target="_blank" className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg border border-spiritual-energy/20 hover:border-spiritual-energy/40 transition-all duration-500">
              <Linkedin className="w-6 h-6 text-spiritual-energy" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-soul-society/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-2">© 2025 Adi Rajendra Maitre • <span className="text-reiatsu-glow japanese-text">死神開発者</span></p>
          <p className="text-xs text-gray-500">Made with spirit using React, TypeScript, Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
