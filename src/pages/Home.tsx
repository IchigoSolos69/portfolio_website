import { useState, useEffect } from 'react'
import { ChevronDown, Sword, Mail, Github, Linkedin, ExternalLink, Zap, Shield, Target } from 'lucide-react'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-spiritual-energy/20 sword-trail">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-spiritual-energy/20 rounded-lg flex items-center justify-center animate-reiatsu-glow kido-circle">
                <Sword className="w-6 h-6 text-spiritual-energy animate-zanpakuto-shine" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-spiritual-energy text-spiritual-glow">Soul Reaper</h1>
                <p className="text-xs text-reiatsu-glow japanese-text">護廷十三隊</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                About <span className="text-xs ml-1">私</span>
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                Projects <span className="text-xs ml-1">技</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                Contact <span className="text-xs ml-1">連</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Animated sword slashes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zanpakuto-steel to-transparent animate-sword-slash" style={{animationDelay: '1s'}} />
          <div className="absolute top-3/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-zanpakuto-steel to-transparent animate-sword-slash" style={{animationDelay: '3s'}} />
        </div>
        
        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute energy-particle animate-floating ${
                i % 3 === 0 ? 'bg-spiritual-energy' : 
                i % 3 === 1 ? 'bg-reiatsu-glow' : 'bg-kido-purple'
              } rounded-full animate-spiritual-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>
        
        {/* Energy wave rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 border border-spiritual-energy/20 rounded-full animate-energy-wave" />
          <div className="absolute w-64 h-64 border border-reiatsu-glow/30 rounded-full animate-energy-wave" style={{animationDelay: '1s'}} />
          <div className="absolute w-32 h-32 border border-kido-purple/40 rounded-full animate-energy-wave" style={{animationDelay: '2s'}} />
        </div>

        {/* Main content */}
        <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'animate-bankai-release' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight bankai-burst">
            <span className="block font-light text-gray-100 text-spiritual-glow animate-floating">Soul</span>
            <span className="bg-spiritual-gradient bg-clip-text text-transparent text-reiatsu-glow animate-spiritual-pulse">Reaper</span>
          </h1>
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light animate-fade-in-up">
              <span className="text-reiatsu-glow japanese-text text-reiatsu-glow animate-spiritual-pulse">護廷十三隊</span> • <span className="text-spiritual-glow">Spiritual Developer</span>
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up hollow-mask-overlay" style={{animationDelay: '0.5s'}}>
              Wielding the power of code like a <span className="text-zanpakuto-steel font-semibold">Zanpakuto</span>, I bring digital worlds to life 
              with the precision of a <span className="text-spiritual-energy font-semibold">Soul Reaper</span> and the creativity of the spirit world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50 animate-reiatsu-glow sword-trail group"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:animate-zanpakuto-shine" />
                View My Techniques
                <span className="text-sm japanese-text">技術</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25 group hollow-mask-overlay"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:animate-spiritual-pulse" />
                Contact Me
                <span className="text-sm japanese-text">連絡</span>
              </span>
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-spiritual-energy animate-spiritual-pulse spiritual-glow" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        {/* Background spiritual energy */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-spiritual-energy rounded-full blur-3xl animate-floating" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-kido-purple rounded-full blur-3xl animate-floating" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy text-spiritual-glow animate-fade-in-up">
            About Me <span className="text-2xl japanese-text text-reiatsu-glow ml-4">私について</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-2xl font-semibold mb-6 text-reiatsu-glow text-reiatsu-glow animate-spiritual-pulse">
                The Developer's Journey <span className="text-lg japanese-text ml-2">開発者の旅</span>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed hollow-mask-overlay">
                Like <span className="text-spiritual-energy font-semibold">Ichigo</span> mastering his <span className="text-zanpakuto-steel font-semibold">Zanpakuto</span>, I've honed my skills in the digital realm. 
                My journey began in the world of frontend development, where I learned to channel 
                <span className="text-reiatsu-glow font-semibold"> spiritual energy</span> into clean, efficient code.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed hollow-mask-overlay">
                With expertise in modern web technologies, I create applications that not only function flawlessly 
                but also inspire users with their design and <span className="text-spiritual-energy font-semibold">spiritual pressure</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Next.js'].map((skill, index) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-spiritual-energy/20 text-spiritual-energy rounded-full text-sm hover:bg-spiritual-energy/30 transition-all duration-300 animate-flash-step sword-trail"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-spiritual-energy/20 to-reiatsu-glow/20 rounded-full flex items-center justify-center relative kido-circle bankai-burst">
                <Sword className="w-32 h-32 text-spiritual-energy animate-zanpakuto-shine spiritual-glow" />
                
                {/* Floating spiritual orbs around the sword */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-reiatsu-glow rounded-full animate-floating"
                    style={{
                      top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-800/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-2 h-32 bg-gradient-to-b from-spiritual-energy to-transparent animate-sword-slash" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-20 right-1/4 w-2 h-32 bg-gradient-to-t from-reiatsu-glow to-transparent animate-sword-slash" style={{animationDelay: '4s'}} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy text-spiritual-glow animate-fade-in-up">
            My Techniques <span className="text-2xl japanese-text text-reiatsu-glow ml-4">私の技術</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Getsuga Tensho",
                subtitle: "E-Commerce Platform",
                description: "A powerful full-stack solution that cuts through complexity with React and Node.js",
                tech: ["React", "Node.js", "MongoDB"],
                link: "#",
                icon: Zap,
                color: "spiritual-energy"
              },
              {
                title: "Bankai Release",
                subtitle: "Task Management App",
                description: "Ultimate form of project management with real-time spiritual pressure monitoring",
                tech: ["Next.js", "TypeScript", "Prisma"],
                link: "#",
                icon: Shield,
                color: "reiatsu-glow"
              },
              {
                title: "Kido Mastery",
                subtitle: "Weather Dashboard",
                description: "Mystical weather predictions using advanced spiritual energy detection",
                tech: ["React", "API Integration", "Charts"],
                link: "#",
                icon: Target,
                color: "kido-purple"
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-spiritual-energy/50 transition-all duration-500 group animate-fade-in-up hollow-mask-overlay sword-trail"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-${project.color}/20 rounded-lg flex items-center justify-center group-hover:animate-reiatsu-glow`}>
                    <project.icon className={`w-6 h-6 text-${project.color} group-hover:animate-zanpakuto-shine`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold text-${project.color} group-hover:text-spiritual-glow transition-colors japanese-text`}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400">{project.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-spiritual-energy/10 text-spiritual-energy text-xs rounded hover:bg-spiritual-energy/20 transition-all duration-300 animate-flash-step"
                      style={{animationDelay: `${techIndex * 0.1}s`}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-2 text-spiritual-energy hover:text-reiatsu-glow transition-all duration-300 group-hover:animate-spiritual-pulse"
                >
                  <span>Release Technique</span>
                  <span className="text-xs japanese-text">技術解放</span>
                  <ExternalLink className="w-4 h-4 group-hover:animate-zanpakuto-shine" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        {/* Spiritual energy background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-reiatsu-radial" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-spiritual-energy/30 rounded-full animate-energy-wave" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-reiatsu-glow/40 rounded-full animate-energy-wave" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-spiritual-energy text-spiritual-glow animate-fade-in-up bankai-burst">
            Contact Me <span className="text-2xl japanese-text text-reiatsu-glow ml-4">連絡先</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 animate-fade-in-up hollow-mask-overlay" style={{animationDelay: '0.3s'}}>
            Ready to channel some <span className="text-spiritual-energy font-semibold">spiritual energy</span> into your next project?
            <br />
            <span className="text-lg japanese-text text-reiatsu-glow mt-2 block">次のプロジェクトに霊力を注ぎ込む準備はできていますか？</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a 
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/20 hover:bg-spiritual-energy/30 rounded-lg transition-all duration-300 group animate-fade-in-up sword-trail hover:animate-reiatsu-glow"
              style={{animationDelay: '0.6s'}}
            >
              <Mail className="w-6 h-6 text-spiritual-energy group-hover:animate-spiritual-pulse" />
              <div className="text-left">
                <span className="text-gray-100 font-medium block">Email</span>
                <span className="text-xs japanese-text text-reiatsu-glow">メール</span>
              </div>
            </a>
            <a 
              href="https://github.com"
              className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/20 hover:bg-spiritual-energy/30 rounded-lg transition-all duration-300 group animate-fade-in-up sword-trail hover:animate-reiatsu-glow"
              style={{animationDelay: '0.8s'}}
            >
              <Github className="w-6 h-6 text-spiritual-energy group-hover:animate-zanpakuto-shine" />
              <div className="text-left">
                <span className="text-gray-100 font-medium block">GitHub</span>
                <span className="text-xs japanese-text text-reiatsu-glow">ギットハブ</span>
              </div>
            </a>
            <a 
              href="https://linkedin.com"
              className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/20 hover:bg-spiritual-energy/30 rounded-lg transition-all duration-300 group animate-fade-in-up sword-trail hover:animate-reiatsu-glow"
              style={{animationDelay: '1s'}}
            >
              <Linkedin className="w-6 h-6 text-spiritual-energy group-hover:animate-floating" />
              <div className="text-left">
                <span className="text-gray-100 font-medium block">LinkedIn</span>
                <span className="text-xs japanese-text text-reiatsu-glow">リンクトイン</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-gray-800/20 relative overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-spiritual-energy to-transparent animate-sword-slash" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-gray-400 text-sm mb-2 animate-fade-in-up">
            © 2024 Soul Reaper Developer • <span className="text-reiatsu-glow japanese-text animate-spiritual-pulse">護廷十三隊</span>
          </p>
          <p className="text-xs text-gray-500 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Built with the spiritual energy of <span className="text-spiritual-energy">React</span>, <span className="text-zanpakuto-steel">TypeScript</span>, and <span className="text-reiatsu-glow">Tailwind CSS</span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="w-2 h-2 bg-spiritual-energy rounded-full animate-spiritual-pulse spiritual-glow" />
            <span className="text-xs text-spiritual-energy">Spiritual Pressure: </span>
            <span className="text-xs text-reiatsu-glow font-semibold animate-spiritual-pulse">Maximum</span>
            <span className="text-xs japanese-text text-kido-purple ml-2">霊圧最大</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
