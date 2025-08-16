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
  const mouseTrailRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([])
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  // Loading & Sword Slash animations
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowSwordSlash(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsVisible(true)
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
  }, [isLoading])

  // Mouse Trail System with velocity & smoothing
  useEffect(() => {
    if (isLoading) return

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now()
      const deltaX = e.clientX - lastMousePosition.current.x
      const deltaY = e.clientY - lastMousePosition.current.y
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      setMousePosition({ x: e.clientX, y: e.clientY })
      setMouseVelocity(velocity)
      mouseTrailRef.current.push({ x: e.clientX, y: e.clientY, timestamp: currentTime })
      if (mouseTrailRef.current.length > 10) mouseTrailRef.current.shift()
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const animateTrail = () => {
      const trails = document.querySelectorAll('.mouse-trail')
      trails.forEach((trail, index) => {
        const trailElement = trail as HTMLElement
        const targetPos = mouseTrailRef.current[mouseTrailRef.current.length - 1 - index]
        if (targetPos) {
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

    const createTrailElements = () => {
      for (let i = 0; i < 10; i++) {
        const trail = document.createElement('div')
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

    // Intersection Observer for .about-skill-box animations with smooth entry
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in')
      })
    }, observerOptions)

    setTimeout(() => {
      document.querySelectorAll('.about-skill-box').forEach(box => observer.observe(box))
    }, 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      observer.disconnect()
      document.querySelectorAll('.mouse-trail').forEach(trail => trail.remove())
    }
  }, [isLoading])

  // Enhanced Typing Effect
  useEffect(() => {
    if (isLoading) return

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
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900/20 flex items-center justify-center z-50">
        <div className="dynamic-background"></div>
        <div className="optimized-particle-field">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="optimized-particle"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <div className={`relative z-10 text-center transition-opacity duration-500 ${showSwordSlash ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="loading-spinner animate-spin-slow ">
                <div className="w-16 h-16 border-4 border-spiritual-energy/30 border-t-spiritual-energy rounded-full"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-spiritual-energy/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-spiritual-energy text-xl mb-2 animate-pulse">読み込み中...</p>
            <p className="text-gray-400 text-sm">(Loading...)</p>
          </div>

          <div className="w-80 h-1 bg-gray-800 rounded-full mx-auto mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-spiritual-energy to-reiatsu-glow animate-loading-progress rounded-full" />
          </div>
        </div>

        {showSwordSlash && (
          <>
            <div className="absolute inset-0 z-30 bg-black animate-dramatic-pause" />
            <div className="absolute inset-0 z-40">
              <div className="slash-curtain animate-slash-curtain">
                <div className="slash-trail animate-slash-trail" />
                <div className="slash-line animate-slash-line" />
                <div className="slash-glow animate-slash-glow" />
              </div>

              <div className="katana-container animate-katana-appear">
                <svg className="katana-svg" viewBox="0 0 200 20" fill="none" aria-label="Sword Slash">
                  <rect x="0" y="8" width="160" height="4" fill="url(#blade-gradient)" />
                  <rect x="0" y="9" width="160" height="2" fill="#ffffff" opacity="0.9" />
                  <rect x="160" y="6" width="8" height="8" fill="#333" />
                  <rect x="168" y="7" width="30" height="6" fill="#1a1a1a" />
                  <rect x="168" y="8" width="30" height="4" fill="#333" />
                  <defs>
                    <linearGradient id="blade-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#f0f0f0" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background layers */}
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
        <div className="spiritual-orbs">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="spiritual-orb animate-float-slow"
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 12}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-spiritual-energy/3 to-black/60" />
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern animate-pulse" />
        </div>
      </div>

      {/* Special Bankai Mode */}
      {specialBankaiMode && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-radial from-spiritual-energy/20 via-reiatsu-glow/10 to-transparent animate-pulse" />
          <div className="expanding-rings">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="expanding-ring" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-8xl font-bold text-spiritual-energy animate-spiritual-pulse opacity-20">卍解</div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-spiritual-energy via-reiatsu-glow to-spiritual-energy bg-clip-text text-transparent animate-gradient-text">
                Adi Rajendra Maitre
              </span>
            </h1>
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
              <span className="text-spiritual-energy japanese-text block mt-2">死神開発者</span>
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <button
              onClick={() => scrollToSection('about')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50 animate-reiatsu-glow sword-trail group"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:animate-zanpakuto-shine" />
                About Me
              </span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25 group hollow-mask-overlay"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:animate-zanpakuto-shine" />
                View Projects
              </span>
            </button>
          </div>

          <div className="animate-bounce mt-4">
            <ChevronDown className="w-8 h-8 mx-auto text-spiritual-energy animate-spiritual-pulse spiritual-glow" />
          </div>
        </div>
      </section>

      {/* About, Projects, Achievements & Contact sections unchanged - keep your existing code for those */}

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
