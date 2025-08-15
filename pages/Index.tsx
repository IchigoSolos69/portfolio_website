import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { AnimatedDivider } from '@/components/AnimatedDivider';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>
      
      {/* Animated Divider */}
      <AnimatedDivider variant="sword" />
      
      {/* About Section */}
      <section id="about">
        <About />
      </section>
      
      {/* Animated Divider */}
      <AnimatedDivider variant="energy" />
      
      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>
      
      {/* Animated Divider */}
      <AnimatedDivider variant="mask" />
      
      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>
      
      {/* Animated Divider */}
      <AnimatedDivider variant="sword" />
      
      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-spiritual/20 bg-card/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-2">
            © 2024 Soul Reaper Developer • <span className="text-reiatsu">護廷十三隊</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Built with the spiritual energy of React, TypeScript, and Tailwind CSS
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-spiritual-energy rounded-full spiritual-pulse" />
            <span className="text-xs text-spiritual">Spiritual Pressure: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
