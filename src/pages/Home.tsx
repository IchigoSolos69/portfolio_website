import { useState, useEffect } from 'react'
import { ChevronDown, Sword, Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-spiritual-energy/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-spiritual-energy/20 rounded-lg flex items-center justify-center">
                <Sword className="w-6 h-6 text-spiritual-energy" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-spiritual-energy">Soul Reaper</h1>
                <p className="text-xs text-gray-400">護廷十三隊</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-spiritual-energy transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-300 hover:text-spiritual-energy transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-spiritual-energy transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-spiritual-energy rounded-full animate-spiritual-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="block font-light text-gray-100">Soul</span>
            <span className="bg-gradient-to-r from-spiritual-energy to-reiatsu-glow bg-clip-text text-transparent">Reaper</span>
          </h1>
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
              <span className="text-reiatsu-glow">護廷十三隊</span> • Spiritual Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Wielding the power of code like a Zanpakuto, I bring digital worlds to life 
              with the precision of a Soul Reaper and the creativity of the spirit world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-spiritual-energy hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/25"
            >
              View My Techniques
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/10 px-8 py-4 rounded-lg text-lg transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-spiritual-energy" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-reiatsu-glow">The Developer's Journey</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Like Ichigo mastering his Zanpakuto, I've honed my skills in the digital realm. 
                My journey began in the world of frontend development, where I learned to channel 
                spiritual energy into clean, efficient code.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With expertise in React, TypeScript, and modern web technologies, I create 
                applications that not only function flawlessly but also inspire users with 
                their design and user experience.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Next.js'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-spiritual-energy/20 text-spiritual-energy rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-spiritual-energy/20 to-reiatsu-glow/20 rounded-full flex items-center justify-center">
                <Sword className="w-32 h-32 text-spiritual-energy animate-spiritual-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy">My Techniques</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution with React and Node.js",
                tech: ["React", "Node.js", "MongoDB"],
                link: "#"
              },
              {
                title: "Task Management App",
                description: "Collaborative project management tool with real-time updates",
                tech: ["Next.js", "TypeScript", "Prisma"],
                link: "#"
              },
              {
                title: "Weather Dashboard",
                description: "Beautiful weather app with location-based forecasts",
                tech: ["React", "API Integration", "Charts"],
                link: "#"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-spiritual-energy/50 transition-all duration-300 group">
                <h3 className="text-xl font-semibold mb-3 text-reiatsu-glow group-hover:text-spiritual-energy transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-spiritual-energy/10 text-spiritual-energy text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-2 text-spiritual-energy hover:text-reiatsu-glow transition-colors"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-spiritual-energy">Contact Me</h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to channel some spiritual energy into your next project?
          </p>
          
          <div className="flex justify-center gap-8 mb-12">
            <a 
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 px-6 py-3 bg-spiritual-energy/20 hover:bg-spiritual-energy/30 rounded-lg transition-colors"
            >
              <Mail className="w-6 h-6 text-spiritual-energy" />
              <span className="text-gray-100">Email</span>
            </a>
            <a 
              href="https://github.com"
              className="flex items-center gap-3 px-6 py-3 bg-spiritual-energy/20 hover:bg-spiritual-energy/30 rounded-lg transition-colors"
            >
              <Github className="w-6 h-6 text-spiritual-energy" />
              <span className="text-gray-100">GitHub</span>
            </a>
            <a 
              href="https://linkedin.com"
              className="flex items-center gap-3 px-6 py-3 bg-spiritual-energy/20 hover:bg-spiritual-energy/30 rounded-lg transition-colors"
            >
              <Linkedin className="w-6 h-6 text-spiritual-energy" />
              <span className="text-gray-100">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-gray-800/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-2">
            © 2024 Soul Reaper Developer • <span className="text-reiatsu-glow">護廷十三隊</span>
          </p>
          <p className="text-xs text-gray-500">
            Built with the spiritual energy of React, TypeScript, and Tailwind CSS
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-spiritual-energy rounded-full animate-spiritual-pulse" />
            <span className="text-xs text-spiritual-energy">Spiritual Pressure: Active</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
