@ -1,242 +1,196 @@
import { useState, useEffect, useRef, useCallback } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Cpu, Github, Zap, Mail, Sword, Award, Trophy, ChevronDown, Linkedin } from 'lucide-react'

const roles = [
  '学生 (Student)',
  'デベロッパー (Developer)',
  'パートナーシップマネージャー (Partnership Manager)',
  'ブリーチファン (Bleach Fan)',
]

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showSwordSlash, setShowSwordSlash] = useState(false)
  const [specialBankaiMode, setSpecialBankaiMode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mouseVelocity, setMouseVelocity] = useState(0)
  const mouseTrailRef = useRef<Array<{ x: number, y: number, timestamp: number }>>([])
  const mouseTrailRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([])
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  
  const roles = ['学生 (Student)', 'デベロッパー (Developer)', 'パートナーシップマネージャー (Partnership Manager)', 'ブリーチファン (Bleach Fan)']

  // Loading & Sword Slash animations
  useEffect(() => {
    // Enhanced cinematic loading sequence (5 seconds total)
    const loadingTimer = setTimeout(() => {
      // Scene 2: Sword slash transition starts at 3 seconds
      setShowSwordSlash(true)
      setTimeout(() => {
        // Scene 3: Reveal website at 5 seconds
        setIsLoading(false)
        setIsVisible(true)
      }, 2000) // 2 seconds for sword slash + reveal
    }, 3000) // 3 seconds for initial loading phase
    
    // 10-second timer for special Bankai mode
      }, 2000) // Slash + reveal duration
    }, 3000) // Initial loading duration

    const bankaiTimer = setTimeout(() => {
      if (!isLoading) {
        setSpecialBankaiMode(true)
        setTimeout(() => setSpecialBankaiMode(false), 5000)
      }
    }, 10000)
    

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(bankaiTimer)
    }
  }, []) // Remove isLoading dependency
  }, [isLoading])

  // Separate effect for mouse trail system
  // Mouse Trail System with velocity & smoothing
  useEffect(() => {
    if (isLoading) return

    // Enhanced mouse trail system with velocity detection
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now()
      const deltaX = e.clientX - lastMousePosition.current.x
      const deltaY = e.clientY - lastMousePosition.current.y
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      setMousePosition({ x: e.clientX, y: e.clientY })
      setMouseVelocity(velocity)
      
      // Add to trail array
      mouseTrailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: currentTime
      })
      
      // Keep only last 10 positions
      if (mouseTrailRef.current.length > 10) {
        mouseTrailRef.current.shift()
      }
      
      mouseTrailRef.current.push({ x: e.clientX, y: e.clientY, timestamp: currentTime })
      if (mouseTrailRef.current.length > 10) mouseTrailRef.current.shift()
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }
    
    // Animate trail with requestAnimationFrame

    const animateTrail = () => {
      const trails = document.querySelectorAll('.mouse-trail')
      trails.forEach((trail, index) => {
        const trailElement = trail as HTMLElement
        const targetPos = mouseTrailRef.current[mouseTrailRef.current.length - 1 - index]
        
        if (targetPos) {
          trailElement.style.transform = `translate3d(${targetPos.x - 4}px, ${targetPos.y - 4}px, 0)`
          trailElement.style.opacity = `${Math.max(0, 1 - (index * 0.1))}`
          trailElement.style.transform = `translate3d(${targetPos.x - 8}px, ${targetPos.y - 8}px, 0)`
          trailElement.style.opacity = `${Math.max(0, 1 - index * 0.13)}`
          // Smaller size on further trail
          trailElement.style.width = `${12 - index}px`
          trailElement.style.height = `${12 - index}px`
          trailElement.style.boxShadow = `0 0 ${8 + Math.random() * 4}px rgba(255,112,0,${1 - index * 0.15})`
        }
      })
      
      animationFrameRef.current = requestAnimationFrame(animateTrail)
    }
    
    // Create trail elements

    const createTrailElements = () => {
      for (let i = 0; i < 8; i++) {
      for (let i = 0; i < 10; i++) {
        const trail = document.createElement('div')
        trail.className = 'mouse-trail'
        trail.className = 'mouse-trail fixed pointer-events-none rounded-full bg-spiritual-energy/80 z-[9999] transition-all duration-300 will-change-transform'
        trail.style.width = '12px'
        trail.style.height = '12px'
        trail.style.transform = 'translate3d(-100px, -100px, 0)'
        document.body.appendChild(trail)
      }
    }
    

    createTrailElements()
    animationFrameRef.current = requestAnimationFrame(animateTrail)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    

    // Intersection Observer for .about-skill-box animations with smooth entry
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
        if (entry.isIntersecting) entry.target.classList.add('animate-in')
      })
    }, observerOptions)
    
    // Observe skill boxes when they exist

    setTimeout(() => {
      const skillBoxes = document.querySelectorAll('.about-skill-box')
      skillBoxes.forEach(box => observer.observe(box))
      document.querySelectorAll('.about-skill-box').forEach(box => observer.observe(box))
    }, 100)
    

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      observer.disconnect()
      // Clean up trail elements
      const trails = document.querySelectorAll('.mouse-trail')
      trails.forEach(trail => trail.remove())
      document.querySelectorAll('.mouse-trail').forEach(trail => trail.remove())
    }
  }, [isLoading])

  // Enhanced typing effect for roles
  // Enhanced Typing Effect
  useEffect(() => {
    if (isLoading) return
    
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
    }, isDeleting ? 50 : Math.random() * 100 + 80)

    return () => clearInterval(typeInterval)
  }, [currentRoleIndex, roles, isLoading])
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex <= roles[currentRoleIndex].length) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex))
      timer = setTimeout(() => setCharIndex(charIndex + 1), Math.random() * 100 + 80)
    } else if (!isDeleting && charIndex > roles[currentRoleIndex].length) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex >= 0) {
      setTypingText(roles[currentRoleIndex].substring(0, charIndex))
      timer = setTimeout(() => setCharIndex(charIndex - 1), 50)
    }

    if (isDeleting && charIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false)
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        setCharIndex(0)
      }, 500)
    }

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, currentRoleIndex, isLoading])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900/20 flex items-center justify-center z-50">
        {/* Dynamic background for depth */}
        <div className="dynamic-background"></div>
        
        {/* Optimized particle field */}
        <div className="optimized-particle-field">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="optimized-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }} 
            <div
              key={i}
              className="optimized-particle"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        {/* Scene 1: Loading Content (0-3 seconds) */}
        <div className={`relative z-10 text-center transition-opacity duration-500 ${showSwordSlash ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-8">
            {/* Loading Spinner */}
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="loading-spinner animate-spin-slow">
              <div className="loading-spinner animate-spin-slow ">
                <div className="w-16 h-16 border-4 border-spiritual-energy/30 border-t-spiritual-energy rounded-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-spiritual-energy/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Japanese Loading Text */}
            <p className="text-spiritual-energy text-xl mb-2 animate-pulse">読み込み中...</p>
            <p className="text-gray-400 text-sm">(Loading...)</p>
          </div>
          
          {/* Progress bar */}

          <div className="w-80 h-1 bg-gray-800 rounded-full mx-auto mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-spiritual-energy to-reiatsu-glow animate-loading-progress rounded-full" />
          </div>
        </div>

        {/* Scene 2: Enhanced Sword Slash Animation */}
        {showSwordSlash && (
          <>
            {/* Dramatic pause overlay */}
            <div className="absolute inset-0 z-30 bg-black animate-dramatic-pause" />
            
            {/* Enhanced sword slash container */}
            <div className="absolute inset-0 z-40">
              {/* Main slash with trailing glow */}
              <div className="slash-curtain animate-slash-curtain">
                <div className="slash-trail animate-slash-trail" />
                <div className="slash-line animate-slash-line" />
                <div className="slash-glow animate-slash-glow" />
              </div>
              
              {/* Enhanced Katana SVG */}

              <div className="katana-container animate-katana-appear">
                <svg className="katana-svg" viewBox="0 0 200 20" fill="none">
                <svg className="katana-svg" viewBox="0 0 200 20" fill="none" aria-label="Sword Slash">
                  <rect x="0" y="8" width="160" height="4" fill="url(#blade-gradient)" />
                  <rect x="0" y="9" width="160" height="2" fill="#ffffff" opacity="0.9" />
                  <rect x="160" y="6" width="8" height="8" fill="#333" />
@ -260,67 +214,49 @@ const Home = () => {

  return (
    <div className={`min-h-screen bg-black text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Ultra-smooth Background Effects */}
      {/* Background layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Dynamic background for depth */}
        <div className="dynamic-background"></div>
        
        {/* Optimized particle field (15 particles instead of 100) */}
        <div className="dynamic-background" />
        <div className="optimized-particle-field">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="optimized-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }} 
            <div
              key={i}
              className="optimized-particle"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        
        {/* Floating spiritual orbs */}
        <div className="spiritual-orbs">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="spiritual-orb animate-float-slow" 
            <div
              key={i}
              className="spiritual-orb animate-float-slow"
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 12}s`
              }} 
                animationDuration: `${8 + Math.random() * 12}s`,
              }}
            />
          ))}
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-spiritual-energy/3 to-black/60" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern animate-pulse" />
        </div>
      </div>

      {/* Special Bankai Mode Overlay */}
      {/* Special Bankai Mode */}
      {specialBankaiMode && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-radial from-spiritual-energy/20 via-reiatsu-glow/10 to-transparent animate-pulse" />
          <div className="expanding-rings">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="expanding-ring" 
                style={{animationDelay: `${i * 0.2}s`}}
              />
              <div key={i} className="expanding-ring" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-8xl font-bold text-spiritual-energy animate-spiritual-pulse opacity-20">
              卍解
            </div>
            <div className="text-8xl font-bold text-spiritual-energy animate-spiritual-pulse opacity-20">卍解</div>
          </div>
        </div>
      )}
@ -334,19 +270,31 @@ const Home = () => {
                Adi Rajendra Maitre
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center">
              <span className="border-r-2 border-spiritual-energy animate-blink pr-1">
                {typingText}
            <div className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center overflow-hidden">
              <span className="border-r-2 border-spiritual-energy animate-blink pr-1 bg-spiritual-gradient bg-clip-text text-transparent animate-gradient-move flex items-center">
                {typingText.split('').map((char, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-all duration-200 ${
                      i === typingText.length - 1 ? 'text-spiritual-glow animate-spiritual-pulse' : ''
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences with the precision of a Soul Reaper's blade. 
              Crafting digital experiences with the precision of a Soul Reaper's blade.
              <span className="text-spiritual-energy japanese-text block mt-2">死神開発者</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <button 
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <button
              onClick={() => scrollToSection('about')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50 animate-reiatsu-glow sword-trail group"
            >
@ -355,7 +303,7 @@ const Home = () => {
                About Me
              </span>
            </button>
            <button 
            <button
              onClick={() => scrollToSection('projects')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25 group hollow-mask-overlay"
            >
@ -372,275 +320,7 @@ const Home = () => {
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle-field">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="spiritual-particle animate-float-random" style={{animationDelay: `${i * 0.3}s`}} />
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
              <div key={project.title} className="project-card group relative bg-gradient-to-br from-hollow-mask/15 to-soul-society/10 rounded-xl p-6 border border-spiritual-energy/20 hover:border-reiatsu-glow transition-all duration-500 animate-fade-in-up" style={{animationDelay: `${idx * 0.15}s`}}>
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
                        }`}>{project.status}</span>
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
