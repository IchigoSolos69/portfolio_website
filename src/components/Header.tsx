import { Dock } from "@/components/ui/dock-two";
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Trophy, 
  Mail 
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const dockItems = [
    { 
      icon: Home, 
      label: "Home", 
      onClick: () => handleNavigation('home')
    },
    { 
      icon: User, 
      label: "About", 
      onClick: () => handleNavigation('about')
    },
    { 
      icon: Code, 
      label: "Skills", 
      onClick: () => handleNavigation('skills')
    },
    { 
      icon: Briefcase, 
      label: "Projects", 
      onClick: () => handleNavigation('projects')
    },
    { 
      icon: Trophy, 
      label: "Experience", 
      onClick: () => handleNavigation('experience')
    },
    { 
      icon: Mail, 
      label: "Contact", 
      onClick: () => handleNavigation('contact')
    }
  ];

  return (
    <header className="fixed w-full z-50 pointer-events-none">
      <div className="flex justify-center items-center w-full h-full">
        <div className="pointer-events-auto">
          <Dock 
            items={dockItems} 
            className={isMobile ? "h-16 scale-90" : "h-20"}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
