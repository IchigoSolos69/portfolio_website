import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sword, Home, User, Briefcase, Zap, Mail } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, japanese: '家' },
    { id: 'about', label: 'About', icon: User, japanese: '私' },
    { id: 'projects', label: 'Projects', icon: Briefcase, japanese: '技' },
    { id: 'skills', label: 'Skills', icon: Zap, japanese: '力' },
    { id: 'contact', label: 'Contact', icon: Mail, japanese: '連' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-spiritual/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className="w-10 h-10 bg-spiritual-energy/20 rounded-lg flex items-center justify-center group-hover:bg-spiritual-energy/30 transition-colors">
                <Sword className="w-6 h-6 text-spiritual-energy" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-spiritual">Soul Reaper</h1>
                <p className="text-xs text-muted-foreground">護廷十三隊</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-spiritual bg-spiritual-energy/10'
                      : 'text-muted-foreground hover:text-spiritual hover:bg-spiritual-energy/5'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                  <span className="ml-2 text-xs opacity-60">{item.japanese}</span>
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-spiritual-energy rounded-full" />
                  )}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-spiritual"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
        
        <div className="relative h-full flex flex-col justify-center items-center">
          <div className="space-y-6">
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-4 px-8 py-4 text-lg transition-all duration-300 flash-step ${
                  activeSection === item.id
                    ? 'text-spiritual bg-spiritual-energy/10'
                    : 'text-muted-foreground hover:text-spiritual'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
                <span className="text-spiritual text-2xl">{item.japanese}</span>
              </Button>
            ))}
          </div>
          
          {/* Mobile menu decorative elements */}
          <div className="absolute top-20 left-10">
            <div className="w-32 h-px bg-gradient-to-r from-spiritual-energy to-transparent" />
          </div>
          <div className="absolute bottom-20 right-10">
            <div className="w-32 h-px bg-gradient-to-l from-spiritual-energy to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
};