import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Dock } from "@/components/ui/dock-two";
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Trophy, 
  Mail 
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dockItems = [
    { 
      icon: Home, 
      label: "Home", 
      onClick: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    },
    { 
      icon: User, 
      label: "About", 
      onClick: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    },
    { 
      icon: Code, 
      label: "Skills", 
      onClick: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    },
    { 
      icon: Briefcase, 
      label: "Projects", 
      onClick: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    },
    { 
      icon: Trophy, 
      label: "Experience", 
      onClick: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    },
    { 
      icon: Mail, 
      label: "Contact", 
      onClick: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold text-white">
              Adi<span className="text-accent">Maitre</span>
            </a>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:block">
            <Dock 
              items={dockItems} 
              className="h-20" 
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark/90 backdrop-blur-lg py-4">
          <Dock 
            items={dockItems} 
            className="h-24 flex-wrap justify-center" 
          />
        </div>
      )}
    </header>
  );
};

export default Header;
