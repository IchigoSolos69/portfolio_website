import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import bleachLogo from '@/assets/bleach-logo.jpg';
import soulSocietyBg from '@/assets/soul-society-bg.jpg';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${soulSocietyBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      
      {/* Floating spiritual particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-spiritual-energy rounded-full spiritual-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
        {/* Logo */}
        <div className="mb-8 flash-step">
          <img 
            src={bleachLogo} 
            alt="Portfolio Logo" 
            className="w-64 h-32 mx-auto object-contain reiatsu-glow"
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-spiritual leading-tight">
          <span className="block font-light text-foreground">Soul</span>
          <span className="gradient-spiritual bg-clip-text text-transparent">Reaper</span>
        </h1>
        
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            <span className="text-reiatsu">護廷十三隊</span> • Spiritual Developer
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wielding the power of code like a Zanpakuto, I bring digital worlds to life 
            with the precision of a Soul Reaper and the creativity of the spirit world.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-spiritual-energy hover:bg-accent text-background font-medium px-8 py-4 reiatsu-glow text-lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Techniques
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-spiritual bg-transparent text-foreground hover:bg-spiritual-energy/10 px-8 py-4 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-spiritual-energy" />
        </div>
      </div>

      {/* Animated sword slash divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-spiritual-energy to-transparent sword-slash" />
    </section>
  );
};