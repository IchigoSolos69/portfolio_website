import { useState, useEffect } from 'react'
import { ChevronDown, Sword, Mail, Github, Linkedin, Zap, BookOpen, Cpu, Users } from 'lucide-react'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [swordClicks, setSwordClicks] = useState(0)
  const [showBankai, setShowBankai] = useState(false)
  
  const roles = ['Student', 'Developer', 'Partnership Manager', 'Bleach Fan']

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Typing effect for roles
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    let charIndex = 0
    setTypingText('')
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentRole.length) {
        setTypingText(currentRole.substring(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentRoleIndex((prev: number) => (prev + 1) % roles.length)
        }, 2000)
      }
    }, 100)

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
    <div className="min-h-screen bg-black text-foreground">
      {/* Bankai Easter Egg */}
      {showBankai && (
        <div className="bankai-unleashed">
          BANKAI UNLEASHED! 卍解!
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
            {['gallery','projects','about','contact'].map((sec) => (
              <button 
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                {sec.charAt(0).toUpperCase()+sec.slice(1)} <span className="text-xs ml-1">
                  {sec === 'gallery' ? '画廊' : sec === 'projects' ? 'プロジェクト' : sec === 'about' ? 'あなた' : '連絡先'}
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy text-spiritual-glow">
          Split Gallery <span className="text-2xl japanese-text text-reiatsu-glow ml-4">ギャラリー</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Anime Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-reiatsu-glow text-center">
              Bleach Characters <span className="text-lg japanese-text ml-2">キャラクター</span>
            </h3>
            <div className="grid gap-6">
              {[
                {name:"Ichigo Kurosaki",desc:"Substitute Shinigami with Hollow powers",role:"主人公"},
                {name:"Rukia Kuchiki",desc:"Soul Society's ice-wielding noble",role:"死神"},
                {name:"Sosuke Aizen",desc:"Former Captain, master of illusions",role:"裏切り者"}
              ].map((char,idx)=>(
                <div key={char.name} className="bg-hollow-mask/40 rounded-xl p-4 border border-reiatsu-glow/30 hover:border-spiritual-energy/70 transition-all duration-500 animate-fade-in-up zanpakuto-hover" style={{animationDelay:`${idx*0.2}s`}}>
                  <h4 className="text-lg font-bold text-spiritual-energy mb-1">{char.name}</h4>
                  <p className="text-gray-300 text-sm mb-2">{char.desc}</p>
                  <span className="text-xs japanese-text text-kido-purple">{char.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-reiatsu-glow text-center">
              My Projects <span className="text-lg japanese-text ml-2">プロジェクト</span>
            </h3>
            <div className="grid gap-6">
              {[
                {name:"Chemistry Manual Digitizer",desc:"PyQt5 app with text-to-speech, search, and digital experiment windows.",icon:<BookOpen className="w-6 h-6"/>,tech:"PyQt5"},
                {name:"Event Analysis Tool",desc:"Python + CSV program creating attendance graphs, QR code emails, and certificates.",icon:<Users className="w-6 h-6"/>,tech:"Python"},
                {name:"Hemoglobin Report Classifier",desc:"Extracts data from PNG/PDF reports, converts to JSON, classifies, and visualizes.",icon:<Cpu className="w-6 h-6"/>,tech:"AI/ML"},
                {name:"Hone.gg Contributions",desc:"Staff & Partnership Manager role with community management and strategic partnerships.",icon:<Zap className="w-6 h-6"/>,tech:"Management"}
              ].map((proj,idx)=>(
                <div key={proj.name} className="bg-hollow-mask/40 rounded-xl p-4 border border-zanpakuto-steel/30 hover:border-spiritual-energy/70 transition-all duration-500 animate-fade-in-up zanpakuto-hover" style={{animationDelay:`${idx*0.2}s`}}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-spiritual-energy/20 rounded-full text-spiritual-energy flex-shrink-0">
                      {proj.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-spiritual-energy mb-1">{proj.name}</h4>
                      <p className="text-gray-300 text-sm mb-2">{proj.desc}</p>
                      <span className="text-xs bg-reiatsu-glow/20 text-reiatsu-glow px-2 py-1 rounded">{proj.tech}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy text-spiritual-glow">About Me <span className="text-2xl japanese-text text-reiatsu-glow ml-4">プロフィール</span></h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up" style={{animationDelay:'0.2s'}}>
              <p className="text-gray-300 mb-6 leading-relaxed hollow-mask-overlay">
                I’m <span className="text-spiritual-energy font-semibold">Adi Rajendra Maitre</span>, 
                a BTech IT student at PCCOE Akurdi. I work as a <span className="text-reiatsu-glow font-semibold">Staff & Partnership Manager at Hone.gg</span>, 
                and previously as NDA Tester.  
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed hollow-mask-overlay">
                I’ve built projects in <span className="text-spiritual-energy">Python</span>, 
                <span className="text-reiatsu-glow"> React</span>, 
                <span className="text-kido-purple"> TypeScript</span>, and more — merging anime creativity with real-world problem solving.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React','TypeScript','Node.js','Tailwind CSS','Next.js','Python','C','Java','PyQt5','AI/DS'].map((skill,index)=>(
                  <span key={skill} className="px-3 py-1 bg-spiritual-energy/20 text-spiritual-energy rounded-full text-sm hover:bg-spiritual-energy/30 transition-all duration-300 animate-flash-step zanpakuto-hover" style={{animationDelay:`${index*0.1}s`}}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in-up" style={{animationDelay:'0.5s'}}>
              <div className="w-72 h-72 mx-auto bg-gradient-to-br from-spiritual-energy/20 to-reiatsu-glow/20 rounded-full flex items-center justify-center relative kido-circle bankai-burst">
                <Sword className="w-32 h-32 text-spiritual-energy animate-zanpakuto-shine spiritual-glow" />
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
