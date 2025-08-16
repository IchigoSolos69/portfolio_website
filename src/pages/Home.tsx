import { useState, useEffect } from 'react'
import { ChevronDown, Sword, Mail, Github, Linkedin, ExternalLink, Zap, Shield, Target } from 'lucide-react'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-soul-society/80 backdrop-blur-md border-b border-reiatsu-glow/30 sword-trail">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-spiritual-energy/30 rounded-lg flex items-center justify-center animate-reiatsu-glow kido-circle">
                <Sword className="w-6 h-6 text-spiritual-energy animate-zanpakuto-shine" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-spiritual-energy text-spiritual-glow">BLEACH Ref Portfolio</h1>
                <p className="text-xs text-reiatsu-glow japanese-text">死神デベロッパー</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                Gallery <span className="text-xs ml-1">画廊</span>
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                About <span className="text-xs ml-1">あなた</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-spiritual-energy transition-all duration-300 hover:text-spiritual-glow animate-flash-step japanese-text"
              >
                Contact <span className="text-xs ml-1">連絡先</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dramatic Bleach anime background effect */}
        <div className="absolute inset-0 opacity-95 z-0" style={{
          background: `
            linear-gradient(135deg, #111114 60%, #1a1a1a 100%),
            repeating-linear-gradient(14deg, transparent 0%, transparent 90%, #FF700022 93%, transparent 100%),
            radial-gradient(circle at 70% 12%, #d4d4d420 0%, transparent 80%),
            radial-gradient(ellipse 80% 20% at 30% 90%, #40404022 0%, transparent 60%)
          `,
          backgroundSize: "cover"
        }} />
        
        {/* Sword slashes: Bleach gate opening */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zanpakuto-steel to-transparent animate-sword-slash" style={{animationDelay: '1s'}} />
          <div className="absolute top-3/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-zanpakuto-steel to-transparent animate-sword-slash" style={{animationDelay: '3s'}} />
        </div>
        
        {/* Anime spiritual particles */}
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
            <span className="block font-light text-gray-100 text-spiritual-glow animate-floating">BLEACH</span>
            <span className="bg-spiritual-gradient bg-clip-text text-transparent text-reiatsu-glow animate-spiritual-pulse">Reference</span>
            <span className="text-4xl block text-kido-purple japanese-text mt-2 animate-spiritual-pulse">死神図鑑</span>
          </h1>
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light animate-fade-in-up">
              <span className="text-reiatsu-glow japanese-text text-reiatsu-glow animate-spiritual-pulse">護廷十三隊</span> • <span className="text-spiritual-glow">Digital Fan & Artist</span>
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up hollow-mask-overlay" style={{animationDelay: '0.5s'}}>
              Creating web worlds inspired by <span className="text-spiritual-energy font-semibold">Soul Society</span>, coded with the precision of a <span className="text-zanpakuto-steel font-semibold">zanpakuto</span> and the spirit of Bleach.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('gallery')}
              className="bg-spiritual-gradient hover:bg-reiatsu-glow text-gray-900 font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-spiritual-energy/50 animate-reiatsu-glow sword-trail group"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:animate-zanpakuto-shine" />
                View Reference Gallery
                <span className="text-sm japanese-text">参考</span>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-spiritual-energy bg-transparent text-gray-100 hover:bg-spiritual-energy/20 px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-spiritual-energy/25 group hollow-mask-overlay"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5 group-hover:animate-spiritual-pulse" />
                Contact Soul Reaper
                <span className="text-sm japanese-text">死神連絡</span>
              </span>
            </button>
          </div>

          <div className="animate-bounce mt-4">
            <ChevronDown className="w-8 h-8 mx-auto text-spiritual-energy animate-spiritual-pulse spiritual-glow" />
          </div>
        </div>
      </section>

      {/* Reference Gallery Section */}
      <section id="gallery" className="py-20 px-6 relative overflow-hidden">
        {/* Bleach reference gallery - placeholder for now */}
        <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy text-spiritual-glow animate-fade-in-up">
          Bleach Character Gallery <span className="text-2xl japanese-text text-reiatsu-glow ml-4">キャラクター</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              name: "Ichigo Kurosaki",
              description: "Substitute Shinigami, Bankai Master, Hollow powers.",
              image: "https://i.ibb.co/JKWpqxg/ichigo-bleach.png",
            },
            {
              name: "Rukia Kuchiki",
              description: "13 Court Guard Squad, ice kido, elegant and wise.",
              image: "https://i.ibb.co/nBrjZyd/rukia-bleach.png",
            },
            {
              name: "Sosuke Aizen",
              description: "Villainous mastermind, Kyoka Suigetsu illusion.",
              image: "https://i.ibb.co/y6MThWG/aizen-bleach.png",
            }
          ].map((char, idx) => (
            <div key={char.name} className="bg-hollow-mask/60 rounded-xl p-6 sword-trail backdrop-blur-sm border border-zanpakuto-steel/30 hover:border-spiritual-energy/70 transition-all duration-500 animate-fade-in-up" style={{animationDelay: `${idx * 0.15}s`}}>
              <img src={char.image} alt={char.name} className="w-full h-64 object-cover rounded-lg mb-4 bankai-burst zanpakuto-shine spiritual-glow" />
              <h3 className="text-xl font-bold text-spiritual-energy japanese-text mb-2">{char.name}</h3>
              <p className="text-gray-300">{char.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-spiritual-energy rounded-full blur-3xl animate-floating" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-kido-purple rounded-full blur-3xl animate-floating" style={{animationDelay: '1s'}} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-spiritual-energy text-spiritual-glow animate-fade-in-up">
            About The Soul Reaper <span className="text-2xl japanese-text text-reiatsu-glow ml-4">プロフィール</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-2xl font-semibold mb-6 text-reiatsu-glow text-reiatsu-glow animate-spiritual-pulse">
                My Bleach Journey <span className="text-lg japanese-text ml-2">旅路</span>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed hollow-mask-overlay">
                Just like <span className="text-spiritual-energy font-semibold">Ichigo</span> confronting his inner Hollow, I've united the worlds of code and anime. 
                From my base in Maharashtra, I sketch, code, and design anime reference for Bleach fans.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed hollow-mask-overlay">
                My stack includes: <span className="text-reiatsu-glow font-semibold">React</span>, <span className="text-spiritual-energy font-semibold">Tailwind CSS</span>, <span className="text-kido-purple font-semibold">TypeScript</span>, and more. 
                I strive for spiritual pressure in every web element!
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'Python'].map((skill, index) => (
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
            <div className="relative animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="w-72 h-72 mx-auto bg-gradient-to-br from-spiritual-energy/20 to-reiatsu-glow/20 rounded-full flex items-center justify-center relative kido-circle bankai-burst">
                <Sword className="w-32 h-32 text-spiritual-energy animate-zanpakuto-shine spiritual-glow" />
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-reiatsu-glow rounded-full animate-floating"
                    style={{
                      top: `${50 + 37 * Math.cos((i * Math.PI * 2) / 6)}%`,
                      left: `${50 + 37 * Math.sin((i * Math.PI * 2) / 6)}%`,
                      animationDelay: `${i * 0.18}s`,
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
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute inset-0 bg-reiatsu-radial" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-spiritual-energy/30 rounded-full animate-energy-wave" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-spiritual-energy animate-fade-in-up">
            Connect With Me <span className="text-2xl japanese-text text-reiatsu-glow ml-4">連絡</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Ready to boost your spiritual pressure with frontend magic? Let's create a world worthy of Seireitei!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a 
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg transition-all duration-500 group animate-panel-slide-left border border-spiritual-energy/20 hover:border-spiritual-energy/40"
              style={{animationDelay: '0.6s'}}
            >
              <Mail className="w-6 h-6 text-spiritual-energy group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <span className="text-gray-100 font-medium block group-hover:text-spiritual-energy transition-colors duration-300">Email</span>
                <span className="text-xs japanese-text text-reiatsu-glow">メール</span>
              </div>
            </a>
            <a 
              href="https://github.com"
              className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg transition-all duration-500 group animate-fade-in-up border border-spiritual-energy/20 hover:border-spiritual-energy/40"
              style={{animationDelay: '0.8s'}}
            >
              <Github className="w-6 h-6 text-spiritual-energy group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <span className="text-gray-100 font-medium block group-hover:text-spiritual-energy transition-colors duration-300">GitHub</span>
                <span className="text-xs japanese-text text-reiatsu-glow">ギットハブ</span>
              </div>
            </a>
            <a 
              href="https://linkedin.com"
              className="flex items-center gap-3 px-8 py-4 bg-spiritual-energy/10 hover:bg-spiritual-energy/20 rounded-lg transition-all duration-500 group animate-panel-slide-right border border-spiritual-energy/20 hover:border-spiritual-energy/40"
              style={{animationDelay: '1s'}}
            >
              <Linkedin className="w-6 h-6 text-spiritual-energy group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <span className="text-gray-100 font-medium block group-hover:text-spiritual-energy transition-colors duration-300">LinkedIn</span>
                <span className="text-xs japanese-text text-reiatsu-glow">リンクトイン</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-spiritual-energy/20 bg-soul-society/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-spiritual-energy to-transparent animate-sword-slash" />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-gray-400 text-sm mb-2 animate-fade-in-up">
            © 2025 BLEACH Reference Portfolio • <span className="text-reiatsu-glow japanese-text animate-spiritual-pulse">死神開発者</span>
          </p>
          <p className="text-xs text-gray-500 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Made with animish spirit using <span className="text-spiritual-energy">React</span>, <span className="text-zanpakuto-steel">TypeScript</span>, <span className="text-reiatsu-glow">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
